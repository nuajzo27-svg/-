import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
type CliMode = 'user' | 'privileged' | 'global' | 'interface' | 'line' | 'vlan' | 'router';
type SimulatorMode = 'guided' | 'challenge';

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

interface Challenge {
    id: number;
    title: string;
    description: string;
    validator: (state: DeviceState) => { success: boolean, feedback: string };
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

const allChallenges: Challenge[] = [
    {
        id: 1,
        title: "التحدي 1: إعداد OSPF أساسي",
        description: "الهدف: قم بتكوين OSPF برقم عملية '1'. عين معرف الموجه (Router ID) إلى '1.1.1.1'. ثم، قم بالإعلان عن شبكة واجهة 'Loopback0' (1.1.1.1/32) وشبكة واجهة 'Vlan1' (192.168.1.2/24) في المنطقة '0'.",
        validator: (state: DeviceState) => {
            if (state.ospf.processId !== 1) {
                return { success: false, feedback: "عملية OSPF غير صحيحة أو لم يتم تكوينها. استخدم 'router ospf 1'." };
            }
            if (state.ospf.routerId !== '1.1.1.1') {
                return { success: false, feedback: "لم يتم تعيين معرف الموجه (Router ID) بشكل صحيح." };
            }
            const net1 = state.ospf.networks.some(n => n.network === '1.1.1.1' && n.wildcard === '0.0.0.0' && n.area === 0);
            const net2 = state.ospf.networks.some(n => n.network === '192.168.1.0' && n.wildcard === '0.0.0.255' && n.area === 0);
            if (!net1) {
                return { success: false, feedback: "لم يتم الإعلان عن شبكة Loopback0 بشكل صحيح." };
            }
            if (!net2) {
                return { success: false, feedback: "لم يتم الإعلان عن شبكة Vlan1 بشكل صحيح." };
            }
            return { success: true, feedback: "تهانينا! لقد قمت بتكوين OSPF بنجاح." };
        }
    }
];

const commandsByMode: { [key in CliMode]: { command: string; description: string }[] } = {
    user: [ { command: 'enable', description: 'Turn on privileged commands' }, { command: 'exit', description: 'Exit from the EXEC' } ],
    privileged: [ { command: 'configure terminal', description: 'Enter configuration mode' }, { command: 'show', description: 'Show running system information' }, { command: 'copy', description: 'Copy from one file to another' }, { command: 'disable', description: 'Turn off privileged commands' }, { command: 'exit', description: 'Exit from privileged mode' } ],
    global: [ { command: 'hostname', description: 'Set network device hostname' }, { command: 'enable secret', description: 'Modify enable password parameters' }, { command: 'line', description: 'Configure a terminal line' }, { command: 'interface', description: 'Select an interface to configure' }, { command: 'vlan', description: 'Configure a VLAN' }, { command: 'ip', description: 'Global IP configuration subcommands' }, { command: 'router', description: 'Enable a routing process' }, { command: 'exit', description: 'Exit from global configuration mode' }, ],
    interface: [ { command: 'ip address', description: 'Set the IP address of an interface' }, { command: 'no shutdown', description: 'Administratively bring up an interface' }, { command: 'shutdown', description: 'Administratively bring down an interface' }, { command: 'switchport mode', description: 'Set trunking mode of an interface' }, { command: 'switchport access', description: 'Set access mode characteristics of an interface' }, { command: 'exit', description: 'Exit from interface configuration mode' } ],
    line: [ { command: 'password', description: 'Set a password' }, { command: 'login', description: 'Enable password checking at login' }, { command: 'exit', description: 'Exit from line configuration mode' } ],
    vlan: [ { command: 'name', description: 'Set VLAN name' }, { command: 'exit', description: 'Exit from vlan configuration mode' } ],
    router: [ { command: 'router-id', description: 'Set OSPF router ID' }, { command: 'network', description: 'Enable routing on interfaces' }, { command: 'version', description: 'Set routing protocol version (for RIP)' }, { command: 'exit', description: 'Exit from router configuration mode' } ]
};

const initialDeviceState: DeviceState = {
    hostname: 'Switch',
    interfaces: {
      'FastEthernet0/1': { ipAddress: null, subnetMask: null, status: 'down', protocol: 'down', switchportMode: 'access', accessVlan: 1 },
      'FastEthernet0/5': { ipAddress: null, subnetMask: null, status: 'down', protocol: 'down', switchportMode: 'access', accessVlan: 1 },
      'Vlan1': { ipAddress: null, subnetMask: null, status: 'down', protocol: 'down', switchportMode: null, accessVlan: 1 },
      'Loopback0': { ipAddress: '1.1.1.1', subnetMask: '255.255.255.255', status: 'up', protocol: 'up', switchportMode: null, accessVlan: 1 },
    },
    vlans: { "1": { name: 'default', ports: ['Fa0/1', 'Fa0/5'] } },
    enableSecret: null,
    ipRoutingEnabled: false,
    routingTable: [],
    ospf: { processId: null, routerId: null, networks: [] },
    rip: { enabled: false, version: 1, networks: [] },
};

const MiniCliSimulatorSection: React.FC = () => {
    const [mode, setMode] = useState<SimulatorMode>('guided');
    const [history, setHistory] = useState<string[]>([]);
    const [command, setCommand] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [inputStatus, setInputStatus] = useState<'default' | 'correct' | 'incorrect'>('default');
    
    // Guided mode state
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // Challenge mode state
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [challengeFeedback, setChallengeFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Shared device state
    const [deviceState, setDeviceState] = useState<DeviceState>(initialDeviceState);
    const [currentMode, setCurrentMode] = useState<CliMode>('user');
    const [currentPrompt, setCurrentPrompt] = useState('Switch>');
    const [configContext, setConfigContext] = useState<{ type: string; id: string } | null>(null);
    
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);
    useEffect(() => { inputRef.current?.focus(); }, []);

    const resetGuidedMode = () => {
        setCurrentTaskIndex(0);
        setCurrentStepIndex(0);
        setDeviceState(initialDeviceState);
        setCurrentMode('user');
        setCurrentPrompt('Switch>');
        setConfigContext(null);
        setHistory([]);
        setCommand('');
        setCommandHistory([]);
    };
    
    const resetChallengeMode = () => {
        setChallengeFeedback(null);
        setDeviceState(initialDeviceState);
        setCurrentMode('user');
        setCurrentPrompt('Switch>');
        setConfigContext(null);
        setHistory([]);
        setCommand('');
        setCommandHistory([]);
    };

    useEffect(() => {
        if (mode === 'guided') {
            resetGuidedMode();
        } else {
            resetChallengeMode();
        }
    }, [mode]);

    const processAndApplyCommand = (cmd: string) => {
        let output: string[] = [];
        let newMode = currentMode;
        let newPrompt = currentPrompt;
        let newConfigContext = configContext;
        
        const newState = JSON.parse(JSON.stringify(deviceState)) as DeviceState;
        const cmdParts = cmd.toLowerCase().split(' ').filter(p => p);
        
        const updateStateAndPrompt = (mode: CliMode, prompt: string, context: { type: string; id: string } | null = null) => {
            newMode = mode;
            newPrompt = prompt;
            newConfigContext = context;
        };

        const currentTask = allTasks[currentTaskIndex];
        const guidedStep = (mode === 'guided' && currentTask && currentTask.steps[currentStepIndex]) ? currentTask.steps[currentStepIndex] : null;

        // Process command based on current mode
        switch (currentMode) {
            case 'user':
                if (cmd === 'enable') {
                    updateStateAndPrompt('privileged', `${newState.hostname}#`);
                } else if (cmd === 'exit') {
                    output.push('% Session closed.');
                }
                break;
            case 'privileged':
                if (cmd.startsWith('conf t') || cmd === 'configure terminal') {
                    updateStateAndPrompt('global', `${newState.hostname}(config)#`);
                } else if (cmd === 'disable') {
                    updateStateAndPrompt('user', `${newState.hostname}>`);
                }
                break;
            case 'global':
                if (cmd.startsWith('hostname')) {
                    const newHostname = cmdParts[1]?.toUpperCase() || newState.hostname;
                    newState.hostname = newHostname;
                    newPrompt = `${newHostname}(config)#`;
                } else if (cmd.startsWith('enable secret')) {
                    newState.enableSecret = cmdParts[2];
                } else if (cmd.startsWith('interface') || cmd.startsWith('int')) {
                    const intfId = cmdParts[1].toLowerCase() === 'vlan' ? `Vlan${cmdParts[2]}` : 
                                 cmdParts[1].toLowerCase() === 'loopback' ? `Loopback${cmdParts[2]}` :
                                 `FastEthernet0/${cmdParts[1].split('/')[1]}`;
                    const properId = Object.keys(newState.interfaces).find(k => k.toLowerCase() === intfId.toLowerCase());
                    if (properId) {
                        updateStateAndPrompt('interface', `${newState.hostname}(config-if)#`, { type: 'interface', id: properId });
                    }
                } else if (cmd.startsWith('line')) {
                    const lineId = `${cmdParts[1]} ${cmdParts[2]}`;
                    updateStateAndPrompt('line', `${newState.hostname}(config-line)#`, { type: 'line', id: lineId });
                } else if (cmd.startsWith('vlan')) {
                    if (!newState.vlans[cmdParts[1]]) newState.vlans[cmdParts[1]] = { name: `VLAN${cmdParts[1]}`, ports: [] };
                    updateStateAndPrompt('vlan', `${newState.hostname}(config-vlan)#`, { type: 'vlan', id: cmdParts[1] });
                } else if (cmd === 'ip routing') {
                    newState.ipRoutingEnabled = true;
                } else if (cmd.startsWith('ip route')) {
                    newState.routingTable.push({ type: 'S', network: cmdParts[2], mask: cmdParts[3], nextHop: cmdParts[4] });
                } else if (cmd.startsWith('router ospf')) {
                    const processId = parseInt(cmdParts[2]);
                    newState.ospf.processId = processId;
                    updateStateAndPrompt('router', `${newState.hostname}(config-router)#`, { type: 'router', id: `ospf ${processId}` });
                } else if (cmd.startsWith('router rip')) {
                    newState.rip.enabled = true;
                    updateStateAndPrompt('router', `${newState.hostname}(config-router)#`, { type: 'router', id: 'rip' });
                } else if (cmd === 'exit') {
                     updateStateAndPrompt('privileged', `${newState.hostname}#`);
                }
                break;
            case 'interface':
                if (cmd.startsWith('ip address')) {
                    if (newConfigContext?.id) {
                        newState.interfaces[newConfigContext.id].ipAddress = cmdParts[2];
                        newState.interfaces[newConfigContext.id].subnetMask = cmdParts[3];
                    }
                } else if (cmd === 'no shutdown') {
                    if (newConfigContext?.id) {
                        newState.interfaces[newConfigContext.id].status = 'up';
                        newState.interfaces[newConfigContext.id].protocol = 'up';
                        output.push(`%LINK-5-CHANGED: Interface ${newConfigContext.id}, changed state to up`, `%LINEPROTO-5-UPDOWN: Line protocol on Interface ${newConfigContext.id}, changed state to up`);
                    }
                } else if (cmd.startsWith('switchport mode')) {
                    if (newConfigContext?.id) newState.interfaces[newConfigContext.id].switchportMode = cmdParts[2] as 'access' | 'trunk';
                } else if (cmd.startsWith('switchport access vlan')) {
                    if (newConfigContext?.id) {
                        const newVlanId = cmdParts[3];
                        const oldVlanId = newState.interfaces[newConfigContext.id].accessVlan;
                        newState.interfaces[newConfigContext.id].accessVlan = parseInt(newVlanId);
                        
                        const shortIntfName = 'Fa0/' + newConfigContext.id.split('/')[1];
                        if(newState.vlans[oldVlanId]) newState.vlans[oldVlanId].ports = newState.vlans[oldVlanId].ports.filter(p => p !== shortIntfName);
                        if(newState.vlans[newVlanId]) newState.vlans[newVlanId].ports.push(shortIntfName);
                    }
                } else if (cmd === 'exit') {
                    updateStateAndPrompt('global', `${newState.hostname}(config)#`);
                }
                break;
            case 'line':
                 if (cmd === 'exit') {
                    updateStateAndPrompt('global', `${newState.hostname}(config)#`);
                }
                break;
            case 'vlan':
                if (cmd.startsWith('name')) {
                    if (newConfigContext?.id) newState.vlans[newConfigContext.id].name = cmdParts[1];
                } else if (cmd === 'exit') {
                    updateStateAndPrompt('global', `${newState.hostname}(config)#`);
                }
                break;
            case 'router':
                 if (newConfigContext?.id.startsWith('ospf')) {
                    if (cmd.startsWith('router-id')) newState.ospf.routerId = cmdParts[1];
                    else if (cmd.startsWith('network')) newState.ospf.networks.push({ network: cmdParts[1], wildcard: cmdParts[2], area: parseInt(cmdParts[4]) });
                } else if (newConfigContext?.id === 'rip') {
                    if (cmd.startsWith('version')) newState.rip.version = parseInt(cmdParts[1]);
                    else if (cmd.startsWith('network')) newState.rip.networks.push(cmdParts[1]);
                }
                if (cmd === 'exit') {
                    updateStateAndPrompt('global', `${newState.hostname}(config)#`);
                }
                break;
        }

        if (cmd === 'end') {
            updateStateAndPrompt('privileged', `${newState.hostname}#`);
        }

        setDeviceState(newState);
        setCurrentMode(newMode);
        setCurrentPrompt(newPrompt);
        setConfigContext(newConfigContext);

        // Guided mode step validation
        if (mode === 'guided') {
            const expectedCommands = Array.isArray(guidedStep?.command) ? guidedStep?.command.map(c => c.toLowerCase()) : [guidedStep?.command.toLowerCase()];
            if (guidedStep && expectedCommands.includes(cmd)) {
                setInputStatus('correct');
                const newStepIndex = currentStepIndex + 1;
                if (newStepIndex >= currentTask.steps.length) {
                    const newTaskIndex = currentTaskIndex + 1;
                    if (newTaskIndex >= allTasks.length) {
                        output.push('\n% جميع المهام اكتملت بنجاح!');
                        setCurrentTaskIndex(newTaskIndex);
                    } else {
                        output.push(`\n% المهمة "${currentTask.title}" اكتملت. الانتقال للمهمة التالية...`);
                        setCurrentTaskIndex(newTaskIndex);
                        setCurrentStepIndex(0);
                    }
                } else {
                    setCurrentStepIndex(newStepIndex);
                }
                 setCurrentMode(guidedStep.nextMode);
                 setCurrentPrompt(guidedStep.nextPrompt(newState.hostname));

            } else {
                 setInputStatus('incorrect');
                 output.push('% Invalid input detected at \'^\' marker.');
            }
        }
        
        return output;
    };
    
    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedCommand = command.trim();
        const newHistory = [...history, `${currentPrompt} ${command}`];
        if (trimmedCommand) setCommandHistory(prev => [...prev, trimmedCommand]);
        setHistoryIndex(-1);

        if (!trimmedCommand) {
            setHistory(newHistory);
            setCommand('');
            return;
        }

        const output = processAndApplyCommand(trimmedCommand.toLowerCase());
        setHistory([...newHistory, ...output]);

        setCommand('');
        setTimeout(() => setInputStatus('default'), 500);
    };

    const handleCheckChallenge = () => {
        const currentChallenge = allChallenges[currentChallengeIndex];
        const result = currentChallenge.validator(deviceState);
        setChallengeFeedback({ message: result.feedback, type: result.success ? 'success' : 'error' });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && mode === 'guided' && currentTaskIndex < allTasks.length) {
            e.preventDefault();
            const typedCommand = command.trim().toLowerCase();
            if (!typedCommand) return;
            const expectedStep = allTasks[currentTaskIndex].steps[currentStepIndex];
            const expectedCommands = Array.isArray(expectedStep.command) ? expectedStep.command : [expectedStep.command];
            const match = expectedCommands.find(cmd => cmd.toLowerCase().startsWith(typedCommand));
            if (match) setCommand(match);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex <= 0 ? commandHistory.length - 1 : historyIndex - 1;
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
    
    const renderDescription = () => {
        if (mode === 'guided') {
            const task = allTasks[currentTaskIndex];
            return task ? (
                <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-cyan-500/30">
                    <h3 className="text-2xl font-semibold text-white mb-3">{task.title}</h3>
                    <p className="text-gray-300">{task.description}</p>
                </div>
            ) : (
                <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-green-500/30 text-center">
                    <h3 className="text-2xl font-semibold text-green-300">لقد أكملت جميع المهام الموجهة بنجاح!</h3>
                </div>
            );
        } else { // challenge mode
            const challenge = allChallenges[currentChallengeIndex];
            return (
                 <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-yellow-500/30">
                    <h3 className="text-2xl font-semibold text-white mb-3">{challenge.title}</h3>
                    <p className="text-gray-300">{challenge.description}</p>
                </div>
            )
        }
    };

    const statusClasses = { default: 'border-transparent', correct: 'border-green-500 bg-green-500/10', incorrect: 'border-red-500 bg-red-500/10' };

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">محاكي سطر الأوامر (CLI)</h2>
            
            <div className="flex justify-center border-b border-gray-700 mb-6">
                <button onClick={() => setMode('guided')} className={`py-2 px-6 font-semibold transition-colors duration-300 ${mode === 'guided' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>الوضع الموجه</button>
                <button onClick={() => setMode('challenge')} className={`py-2 px-6 font-semibold transition-colors duration-300 ${mode === 'challenge' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-white'}`}>وضع التحدي</button>
            </div>

            {renderDescription()}
            
            <div className="bg-black text-white font-mono text-base p-4 rounded-lg h-80 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
                {history.map((line, index) => (<div key={index} className="whitespace-pre-wrap">{line}</div>))}
                <div ref={terminalEndRef} />
            </div>
            
            <form onSubmit={handleCommandSubmit} className="mt-4">
                <div className={`flex items-center bg-black p-2 rounded-lg border ${statusClasses[inputStatus]} transition-all duration-200`}>
                    <span className="text-green-400 pl-2">{currentPrompt}</span>
                    <input ref={inputRef} type="text" value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={handleKeyDown} className="flex-grow bg-transparent text-white font-mono border-none focus:outline-none focus:ring-0 pl-2" autoComplete="off" spellCheck="false" />
                </div>
            </form>
            
            {mode === 'challenge' && (
                <div className="text-center mt-4">
                    <button onClick={handleCheckChallenge} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg text-lg">تحقق من الحل</button>
                    {challengeFeedback && (
                         <div className={`mt-4 p-3 rounded-lg text-center font-bold ${challengeFeedback.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-400'}`}>
                            {challengeFeedback.message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MiniCliSimulatorSection;
