import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
type CliMode = 'user' | 'privileged' | 'global' | 'interface' | 'line' | 'vlan' | 'router';

interface CommandStep {
  command: string | string[];
  nextMode: CliMode;
  nextPrompt: (hostname: string) => string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  steps: CommandStep[];
}

interface InterfaceState {
  ipAddress: string | null;
  subnetMask: string | null;
  status: 'up' | 'down' | 'administratively down';
  protocol: 'up' | 'down';
  switchportMode: 'access' | 'trunk' | null;
  accessVlan: number;
}

interface VlanState {
    name: string;
    ports: string[];
}

interface Route {
    type: 'C' | 'L' | 'S' | 'O' | 'R';
    network: string;
    mask: string;
    nextHop?: string;
    exitInterface?: string;
}

interface DeviceState {
  hostname: string;
  interfaces: {
    [key: string]: InterfaceState;
  };
  vlans: {
    [key: string]: VlanState;
  };
  enableSecret: string | null;
  ipRoutingEnabled: boolean;
  routingTable: Route[];
  ospf: { processId: number | null, routerId: string | null, networks: { network: string, wildcard: string, area: number }[] };
  rip: { enabled: boolean, version: number, networks: string[] };
}

// --- Data ---
const allTasks: Task[] = [
  {
    id: 1,
    title: "المهمة 1: الإعدادات الأولية وتغيير الاسم",
    description: "ابدأ بالدخول إلى وضع التكوين العام، ثم قم بتغيير اسم المحول الافتراضي 'Switch' إلى 'SW1'.",
    steps: [
      { command: 'enable', nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
      { command: ['configure terminal', 'conf t'], nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#` },
      { command: 'hostname SW1', nextMode: 'global', nextPrompt: () => 'SW1(config)#' },
    ]
  },
  {
    id: 2,
    title: "المهمة 2: تأمين الجهاز",
    description: "الآن، قم بتأمين الجهاز بكلمة سر مشفرة لوضع الامتيازات (enable secret)، ثم قم بتأمين خطوط console و vty بكلمة مرور.",
    steps: [
      { command: 'enable secret class', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
      { command: 'line console 0', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'password cisco', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'login', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
      { command: 'line vty 0 4', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'password cisco', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'login', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
    ]
  },
  {
    id: 3,
    title: "المهمة 3: إعداد واجهة الإدارة",
    description: "قم بإعداد واجهة الإدارة (VLAN 1) بعنوان IP '192.168.1.2 255.255.255.0' ثم قم بتفعيلها.",
    steps: [
      { command: 'interface vlan 1', nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'ip address 192.168.1.2 255.255.255.0', nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'no shutdown', nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
    ]
  },
  {
    id: 4,
    title: "المهمة 4: حفظ الإعدادات",
    description: "أخيرًا، اخرج إلى وضع الامتيازات واحفظ الإعدادات الحالية في ذاكرة NVRAM.",
    steps: [
      { command: 'end', nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
      { command: ['copy running-config startup-config', 'copy run start', 'wr'], nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
    ]
  },
   {
    id: 5,
    title: "المهمة 5: إنشاء VLANs",
    description: "الآن قم بإنشاء شبكتين VLAN جديدتين: VLAN 10 باسم 'Students' و VLAN 20 باسم 'Teachers'.",
    steps: [
      { command: 'configure terminal', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
      { command: 'vlan 10', nextMode: 'vlan', nextPrompt: (hostname) => `${hostname}(config-vlan)#'` },
      { command: 'name Students', nextMode: 'vlan', nextPrompt: (hostname) => `${hostname}(config-vlan)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
      { command: 'vlan 20', nextMode: 'vlan', nextPrompt: (hostname) => `${hostname}(config-vlan)#'` },
      { command: 'name Teachers', nextMode: 'vlan', nextPrompt: (hostname) => `${hostname}(config-vlan)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
    ]
  },
  {
    id: 6,
    title: "المهمة 6: تعيين منفذ وصول",
    description: "قم بتعيين المنفذ FastEthernet0/5 كمنفذ وصول (access port) لشبكة الطلاب (VLAN 10).",
    steps: [
      { command: ['interface FastEthernet0/5', 'int fa0/5'], nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'switchport mode access', nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'switchport access vlan 10', nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
    ]
  },
    {
    id: 7,
    title: "المهمة 7: تكوين منفذ Trunk",
    description: "قم بتكوين المنفذ FastEthernet0/1 كمنفذ trunk للسماح بمرور جميع شبكات VLAN إلى محول آخر.",
    steps: [
      { command: ['interface FastEthernet0/1', 'int fa0/1'], nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'switchport mode trunk', nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'end', nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
    ]
  },
  {
    id: 8,
    title: "المهمة 8: تفعيل التوجيه",
    description: "الآن، قم بتحويل المحول إلى جهاز توجيه من الطبقة الثالثة عن طريق تفعيل خاصية 'ip routing'.",
    steps: [
      { command: 'configure terminal', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
      { command: 'ip routing', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
    ]
  },
  {
    id: 9,
    title: "المهمة 9: تكوين مسار ثابت",
    description: "أضف مسارًا ثابتًا للوصول إلى الشبكة البعيدة '172.16.10.0/24' عبر القفزة التالية '192.168.1.1'.",
    steps: [
      { command: 'ip route 172.16.10.0 255.255.255.0 192.168.1.1', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
    ]
  },
  {
    id: 10,
    title: "المهمة 10: تكوين OSPF",
    description: "قم بإعداد عملية OSPF برقم '10'. ثم، قم بتعيين 'router-id' إلى '1.1.1.1' وأعلن عن شبكة '192.168.1.0/24' في المنطقة '0'.",
    steps: [
      { command: 'router ospf 10', nextMode: 'router', nextPrompt: (hostname) => `${hostname}(config-router)#'` },
      { command: 'router-id 1.1.1.1', nextMode: 'router', nextPrompt: (hostname) => `${hostname}(config-router)#'` },
      { command: 'network 192.168.1.0 0.0.0.255 area 0', nextMode: 'router', nextPrompt: (hostname) => `${hostname}(config-router)#'` },
      { command: 'end', nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
    ]
  },
   {
    id: 11,
    title: "المهمة 11: تكوين RIPv2",
    description: "قم بإعداد بروتوكول التوجيه RIP. ادخل إلى وضع التكوين، فعل 'router rip'، حدد 'version 2'، وأعلن عن شبكة '10.0.0.0'.",
    steps: [
      { command: 'configure terminal', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#` },
      { command: 'router rip', nextMode: 'router', nextPrompt: (hostname) => `${hostname}(config-router)#'` },
      { command: 'version 2', nextMode: 'router', nextPrompt: (hostname) => `${hostname}(config-router)#'` },
      { command: 'network 10.0.0.0', nextMode: 'router', nextPrompt: (hostname) => `${hostname}(config-router)#'` },
      { command: 'end', nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
    ]
  },
  {
    id: 12,
    title: "المهمة 12: التحقق من جدول التوجيه",
    description: "لقد قمت بتكوين مسارات ثابتة وديناميكية. الآن، استخدم الأمر 'show ip route' لعرض جدول التوجيه الكامل ورؤية جميع المسارات.",
    steps: [
      { command: 'show ip route', nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
    ]
  }
];

const commandsByMode: { [key in CliMode]: { command: string; description: string }[] } = {
    user: [
        { command: 'enable', description: 'Turn on privileged commands' },
        { command: 'exit', description: 'Exit from the EXEC' }
    ],
    privileged: [
        { command: 'configure terminal', description: 'Enter configuration mode' },
        { command: 'show', description: 'Show running system information' },
        { command: 'copy', description: 'Copy from one file to another' },
        { command: 'disable', description: 'Turn off privileged commands' },
        { command: 'exit', description: 'Exit from privileged mode' }
    ],
    global: [
        { command: 'hostname', description: 'Set network device hostname' },
        { command: 'enable secret', description: 'Modify enable password parameters' },
        { command: 'line', description: 'Configure a terminal line' },
        { command: 'interface', description: 'Select an interface to configure' },
        { command: 'vlan', description: 'Configure a VLAN' },
        { command: 'ip', description: 'Global IP configuration subcommands' },
        { command: 'router', description: 'Enable a routing process' },
        { command: 'exit', description: 'Exit from global configuration mode' },
    ],
    interface: [
        { command: 'ip address', description: 'Set the IP address of an interface' },
        { command: 'no shutdown', description: 'Administratively bring up an interface' },
        { command: 'shutdown', description: 'Administratively bring down an interface' },
        { command: 'switchport mode', description: 'Set trunking mode of an interface' },
        { command: 'switchport access', description: 'Set access mode characteristics of an interface' },
        { command: 'exit', description: 'Exit from interface configuration mode' }
    ],
    line: [
        { command: 'password', description: 'Set a password' },
        { command: 'login', description: 'Enable password checking at login' },
        { command: 'exit', description: 'Exit from line configuration mode' }
    ],
    vlan: [
        { command: 'name', description: 'Set VLAN name' },
        { command: 'exit', description: 'Exit from vlan configuration mode' }
    ],
    router: [
        { command: 'router-id', description: 'Set OSPF router ID' },
        { command: 'network', description: 'Enable routing on interfaces' },
        { command: 'version', description: 'Set routing protocol version (for RIP)' },
        { command: 'exit', description: 'Exit from router configuration mode' }
    ]
};


const MiniCliSimulatorSection: React.FC = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [command, setCommand] = useState('');
  const [currentMode, setCurrentMode] = useState<CliMode>('user');
  const [currentPrompt, setCurrentPrompt] = useState('Switch>');
  const [feedback, setFeedback] = useState({ message: '', type: 'info' });
  const [inputStatus, setInputStatus] = useState<'default' | 'correct' | 'incorrect'>('default');
  
  const initialDeviceState: DeviceState = {
    hostname: 'Switch',
    interfaces: {
      'FastEthernet0/1': { ipAddress: null, subnetMask: null, status: 'down', protocol: 'down', switchportMode: 'access', accessVlan: 1 },
      'FastEthernet0/5': { ipAddress: null, subnetMask: null, status: 'down', protocol: 'down', switchportMode: 'access', accessVlan: 1 },
      'Vlan1': { ipAddress: null, subnetMask: null, status: 'down', protocol: 'down', switchportMode: null, accessVlan: 1 },
    },
    vlans: {
        "1": { name: 'default', ports: ['Fa0/1', 'Fa0/5'] }
    },
    enableSecret: null,
    ipRoutingEnabled: false,
    routingTable: [],
    ospf: { processId: null, routerId: null, networks: [] },
    rip: { enabled: false, version: 1, networks: [] },
  };

  const [deviceState, setDeviceState] = useState<DeviceState>(initialDeviceState);
  const [configContext, setConfigContext] = useState<{ type: 'interface' | 'line' | 'vlan' | 'router'; id: string } | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (currentTaskIndex >= allTasks.length) return;
      const typedCommand = command.trim().toLowerCase();
      if (!typedCommand) return;
      const expectedStep = allTasks[currentTaskIndex].steps[currentStepIndex];
      const expectedCommands = Array.isArray(expectedStep.command) ? expectedStep.command : [expectedStep.command];
      const match = expectedCommands.find(cmd => cmd.toLowerCase().startsWith(typedCommand));
      if (match) setCommand(match);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
            const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex] || '');
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex] || '');
        } else {
            setHistoryIndex(-1);
            setCommand('');
        }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCommand = command.trim();
    
    if (trimmedCommand.endsWith('?')) {
        const partial = trimmedCommand.slice(0, -1).trim();
        const availableCommands = commandsByMode[currentMode];
        const helpOutput = availableCommands
            .filter(cmd => cmd.command.startsWith(partial))
            .map(cmd => `  ${cmd.command.padEnd(25)} ${cmd.description}`);
        
        const newHistory = [...history, `${currentPrompt} ${command}`];
        if (helpOutput.length > 0) {
           setHistory([...newHistory, ...helpOutput]);
        } else {
           setHistory([...newHistory, '% Unrecognized command']);
        }
        setCommand('');
        return; 
    }

    if (!trimmedCommand) {
      setHistory(prev => [...prev, `${currentPrompt}`]);
      setCommand('');
      return;
    }

    const newHistory = [...history, `${currentPrompt} ${command}`];
    if (trimmedCommand) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
    }
    setHistoryIndex(-1);
    
    const showMatchIp = trimmedCommand.toLowerCase().match(/^(s(h(o(w)?)?)?)\s+ip\s+int(erface)?\s+br(ief)?$/);
    const showMatchVlan = trimmedCommand.toLowerCase().match(/^(s(h(o(w)?)?)?)\s+vlan\s+br(ief)?$/);
    const showMatchIpRoute = trimmedCommand.toLowerCase().match(/^(s(h(o(w)?)?)?)\s+ip\s+route$/);


    if (showMatchIp) {
        if (currentMode !== 'privileged') {
            setHistory([...newHistory, '% Invalid input detected at \'^\' marker.']);
        } else {
            const outputHeader = 'Interface              IP-Address      OK? Method Status           Protocol';
            const outputLines = Object.entries(deviceState.interfaces).map(([name, intf]: [string, InterfaceState]) => {
                const ip = intf.ipAddress ?? 'unassigned';
                return `${name.padEnd(22)} ${ip.padEnd(15)} YES manual ${intf.status.padEnd(12)} ${intf.protocol}`;
            });
            setHistory([...newHistory, outputHeader, ...outputLines]);
        }
        setCommand('');
        // Also allow show command as a valid step if it's expected
        // This is a simplified check
        if(currentTaskIndex < allTasks.length && allTasks[currentTaskIndex].steps[currentStepIndex].command.includes('show ip interface brief')){
           // It's a valid step, continue logic below
        } else {
           return;
        }
    }

    if (showMatchVlan) {
        if (currentMode !== 'privileged') {
            setHistory([...newHistory, '% Invalid input detected at \'^\' marker.']);
        } else {
            const output = ['VLAN Name                             Status    Ports', '---- -------------------------------- --------- -------------------------------'];
            Object.entries(deviceState.vlans).forEach(([id, vlan]: [string, VlanState]) => {
                output.push(`${id.padEnd(4)} ${vlan.name.padEnd(32)} active    ${vlan.ports.join(', ')}`);
            });
            setHistory([...newHistory, ...output]);
        }
        setCommand('');
        return;
    }

    if (showMatchIpRoute) {
        if (currentMode !== 'privileged') {
             setHistory([...newHistory, '% Invalid input detected at \'^\' marker.']);
        } else {
             const output = [
                'Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP',
                '       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area',
                ' '
             ];
             const gateway = "Gateway of last resort is not set\n ";
             output.push(gateway);

            // Generate Connected routes
            Object.entries(deviceState.interfaces).forEach(([name, intf]: [string, InterfaceState]) => {
                if (intf.status === 'up' && intf.ipAddress && intf.subnetMask) {
                    const ipLong = intf.ipAddress.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
                    const maskLong = intf.subnetMask.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
                    const networkAddressLong = ipLong & maskLong;
                    const networkAddress = [(networkAddressLong >>> 24) & 255, (networkAddressLong >>> 16) & 255, (networkAddressLong >>> 8) & 255, networkAddressLong & 255].join('.');
                    const cidr = (maskLong.toString(2).match(/1/g) || []).length;

                    output.push(`C        ${networkAddress}/${cidr} is directly connected, ${name}`);
                    output.push(`L        ${intf.ipAddress}/32 is directly connected, ${name}`);
                }
            });

             // Add Static, OSPF and RIP routes
             deviceState.routingTable.forEach(route => {
                 const cidr = (route.mask.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0).toString(2).match(/1/g)?.length || 0;
                 const via = route.nextHop ? `via ${route.nextHop}`: `is directly connected, ${route.exitInterface}`;
                 if(route.type === 'S') {
                    output.push(`S        ${route.network}/${cidr} [1/0] ${via}`);
                 } else if (route.type === 'O') {
                    output.push(`O        ${route.network}/${cidr} [110/2] ${via}`);
                 } else if (route.type === 'R') {
                    output.push(`R        ${route.network}/${cidr} [120/1] ${via}`);
                 }
             });

             setHistory([...newHistory, ...output]);
        }
        // Allow show command as a valid step
        if(currentTaskIndex < allTasks.length && allTasks[currentTaskIndex].steps[currentStepIndex].command.includes('show ip route')){
           // It's a valid step, continue logic below
        } else {
           setCommand('');
           return;
        }
    }

    if (currentTaskIndex >= allTasks.length) {
      setHistory([...newHistory, '% تهانينا! لقد أكملت جميع السيناريوهات.']);
      setCommand('');
      return;
    }
    
    const currentTask = allTasks[currentTaskIndex];
    const expectedStep = currentTask.steps[currentStepIndex];
    const expectedCommands = Array.isArray(expectedStep.command) ? expectedStep.command.map(c => c.toLowerCase()) : [expectedStep.command.toLowerCase()];
    
    if (expectedCommands.includes(trimmedCommand.toLowerCase())) {
      setInputStatus('correct');
      let newHistoryWithOutput = [...newHistory];
      let newHostname = deviceState.hostname;

      setDeviceState(prevState => {
        const newState = JSON.parse(JSON.stringify(prevState)) as DeviceState;
        const cmdParts = trimmedCommand.toLowerCase().split(' ');
        
        switch(currentMode){
            case 'global':
                if (cmdParts[0] === 'hostname') {
                    newHostname = cmdParts[1].toUpperCase();
                    newState.hostname = newHostname;
                } else if (cmdParts[0] === 'enable' && cmdParts[1] === 'secret') {
                    newState.enableSecret = cmdParts[2];
                } else if (cmdParts[0].startsWith('int')) {
                     const intfId = cmdParts[1] === 'vlan' ? 'Vlan1' : 'FastEthernet0/' + cmdParts[1].split('/')[1];
                     setConfigContext({ type: 'interface', id: intfId });
                } else if (cmdParts[0] === 'line') {
                     setConfigContext({ type: 'line', id: cmdParts[1] + ' ' + cmdParts[2]});
                } else if (cmdParts[0] === 'vlan') {
                     setConfigContext({ type: 'vlan', id: cmdParts[1]});
                     if (!newState.vlans[cmdParts[1]]) {
                         newState.vlans[cmdParts[1]] = { name: `VLAN${cmdParts[1]}`, ports: [] };
                     }
                } else if (cmdParts[0] === 'ip' && cmdParts[1] === 'routing') {
                    newState.ipRoutingEnabled = true;
                } else if (cmdParts[0] === 'ip' && cmdParts[1] === 'route') {
                    newState.routingTable.push({ type: 'S', network: cmdParts[2], mask: cmdParts[3], nextHop: cmdParts[4] });
                } else if (cmdParts[0] === 'router' && cmdParts[1] === 'ospf') {
                    const processId = parseInt(cmdParts[2]);
                    newState.ospf.processId = processId;
                    setConfigContext({ type: 'router', id: `ospf ${processId}` });
                } else if (cmdParts[0] === 'router' && cmdParts[1] === 'rip') {
                    newState.rip.enabled = true;
                    setConfigContext({ type: 'router', id: 'rip' });
                }
                break;
            case 'interface':
                 if (cmdParts[0] === 'ip' && cmdParts[1] === 'address') {
                    if(configContext?.id) {
                        newState.interfaces[configContext.id].ipAddress = cmdParts[2];
                        newState.interfaces[configContext.id].subnetMask = cmdParts[3];
                    }
                } else if (trimmedCommand.toLowerCase() === 'no shutdown') {
                    if(configContext?.id) {
                      newState.interfaces[configContext.id].status = 'up';
                      newState.interfaces[configContext.id].protocol = 'up';
                      newHistoryWithOutput.push(`%LINK-5-CHANGED: Interface ${configContext.id}, changed state to up`, `%LINEPROTO-5-UPDOWN: Line protocol on Interface ${configContext.id}, changed state to up`);
                    }
                } else if (cmdParts[0] === 'switchport' && cmdParts[1] === 'mode') {
                    if(configContext?.id && ['access', 'trunk'].includes(cmdParts[2])) newState.interfaces[configContext.id].switchportMode = cmdParts[2] as 'access' | 'trunk';
                } else if (cmdParts[0] === 'switchport' && cmdParts[1] === 'access' && cmdParts[2] === 'vlan') {
                    if(configContext?.id) {
                        const newVlanId = parseInt(cmdParts[3]);
                        const oldVlanId = newState.interfaces[configContext.id].accessVlan;
                        const shortIntfName = 'Fa0/' + configContext!.id.split('/')[1];
                        // Remove from old vlan
                        if (newState.vlans[oldVlanId]) {
                            newState.vlans[oldVlanId].ports = newState.vlans[oldVlanId].ports.filter((p: string) => p !== shortIntfName);
                        }
                        // Add to new vlan
                        if (newState.vlans[newVlanId]) {
                             newState.vlans[newVlanId].ports.push(shortIntfName);
                        }
                        newState.interfaces[configContext.id].accessVlan = newVlanId;
                    }
                }
                break;
            case 'vlan':
                if (cmdParts[0] === 'name') {
                    if(configContext?.id) newState.vlans[parseInt(configContext.id)].name = cmdParts[1];
                }
                break;
             case 'router':
                if (configContext?.id.startsWith('ospf')) {
                    if (cmdParts[0] === 'router-id') {
                        newState.ospf.routerId = cmdParts[1];
                    } else if (cmdParts[0] === 'network') {
                        newState.ospf.networks.push({ network: cmdParts[1], wildcard: cmdParts[2], area: parseInt(cmdParts[4]) });
                        newState.routingTable.push({ type: 'O', network: cmdParts[1], mask: '255.255.255.0' /* simplified */, nextHop: '192.168.1.1' });
                    }
                } else if (configContext?.id === 'rip') {
                    if (cmdParts[0] === 'version' && cmdParts[1] === '2') {
                        newState.rip.version = 2;
                    } else if (cmdParts[0] === 'network') {
                        newState.rip.networks.push(cmdParts[1]);
                        newState.routingTable.push({ type: 'R', network: '10.0.0.0', mask: '255.0.0.0', nextHop: '192.168.1.1' });
                    }
                }
                break;
        }

        if (trimmedCommand.toLowerCase() === 'exit' || trimmedCommand.toLowerCase() === 'end') setConfigContext(null);

        return newState;
      });

      const newStepIndex = currentStepIndex + 1;
      if (newStepIndex >= currentTask.steps.length) {
        const newTaskIndex = currentTaskIndex + 1;
        if (newTaskIndex >= allTasks.length) {
          newHistoryWithOutput.push('\n% جميع المهام اكتملت بنجاح!');
          setFeedback({ message: 'رائع! لقد أكملت جميع السيناريوهات بنجاح.', type: 'success' });
          setCurrentTaskIndex(newTaskIndex);
        } else {
          newHistoryWithOutput.push(`\n% المهمة "${currentTask.title}" اكتملت. الانتقال للمهمة التالية...`);
          setFeedback({ message: 'مهمة مكتملة!', type: 'success' });
          setCurrentTaskIndex(newTaskIndex);
          setCurrentStepIndex(0);
        }
      } else {
         setCurrentStepIndex(newStepIndex);
      }
      
      setHistory(newHistoryWithOutput);
      setCurrentMode(expectedStep.nextMode);
      setCurrentPrompt(expectedStep.nextPrompt(newHostname));
    } else {
      setInputStatus('incorrect');
      setHistory([...newHistory, '% Invalid input detected at \'^\' marker.']);
    }

    setCommand('');
    setTimeout(() => setInputStatus('default'), 500);
  };

  const currentTask = allTasks[currentTaskIndex];
  const statusClasses = {
    default: 'border-transparent',
    correct: 'border-green-500 bg-green-500/10',
    incorrect: 'border-red-500 bg-red-500/10',
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">محاكي سطر الأوامر (CLI)</h2>
      
      {currentTask ? (
        <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-cyan-500/30">
          <h3 className="text-2xl font-semibold text-white mb-3">{currentTask.title}</h3>
          <p className="text-gray-300">{currentTask.description}</p>
        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-green-500/30 text-center">
            <h3 className="text-2xl font-semibold text-green-300">لقد أكملت جميع المهام بنجاح!</h3>
        </div>
      )}

      <div 
        className="bg-black text-white font-mono text-base p-4 rounded-lg h-80 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div ref={terminalEndRef} />
      </div>
      
      <form onSubmit={handleCommandSubmit} className="mt-4">
        <div className={`flex items-center bg-black p-2 rounded-lg border ${statusClasses[inputStatus]} transition-all duration-200`}>
          <span className="text-green-400 pl-2">{currentPrompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent text-white font-mono border-none focus:outline-none focus:ring-0 pl-2"
            autoComplete="off"
            spellCheck="false"
            disabled={currentTaskIndex >= allTasks.length}
          />
        </div>
      </form>
      
      {feedback.message && currentTaskIndex > 0 && (
        <div className={`mt-4 p-3 rounded-lg text-center font-bold ${
            feedback.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
        }`}>
            {feedback.message}
        </div>
      )}
    </div>
  );
};

export default MiniCliSimulatorSection;