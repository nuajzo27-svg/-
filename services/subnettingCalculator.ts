import { SubnettingQuestion, SubnettingSolution, QuestionType } from '../types';

function ipToLong(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join('.');
}

export function calculateSubnetDetails(ip: string, cidr: number): SubnettingSolution {
  const ipLong = ipToLong(ip);
  const maskLong = (0xffffffff << (32 - cidr)) >>> 0;
  
  const networkAddressLong = (ipLong & maskLong) >>> 0;
  const broadcastAddressLong = (networkAddressLong | ~maskLong) >>> 0;
  
  const numberOfHosts = Math.pow(2, 32 - cidr) - 2;

  const firstUsableHostLong = numberOfHosts > 0 ? networkAddressLong + 1 : networkAddressLong;
  const lastUsableHostLong = numberOfHosts > 0 ? broadcastAddressLong - 1 : broadcastAddressLong;
  
  const ipClass = ip.split('.')[0];
  const classfulMask = parseInt(ipClass) < 128 ? 8 : parseInt(ipClass) < 192 ? 16 : 24;
  const totalSubnets = Math.pow(2, cidr - classfulMask);

  return {
    networkAddress: longToIp(networkAddressLong),
    broadcastAddress: longToIp(broadcastAddressLong),
    firstUsableHost: longToIp(firstUsableHostLong),
    lastUsableHost: longToIp(lastUsableHostLong),
    numberOfHosts: numberOfHosts < 0 ? 0 : numberOfHosts,
    subnetMask: longToIp(maskLong),
    wildcardMask: longToIp(~maskLong >>> 0),
    totalSubnets: cidr > classfulMask ? totalSubnets : 1,
  };
}


export function calculateCidrForHosts(hosts: number): number {
    if (hosts <= 0) return 32;
    let hostBits = 0;
    while ((Math.pow(2, hostBits) - 2) < hosts) {
        hostBits++;
    }
    // Network can't be smaller than /30 to have usable hosts
    if (hostBits < 2) hostBits = 2; 
    return 32 - hostBits;
}

export interface VlsmSubnetInfo {
  requirement: number;
  cidr: number;
  networkAddress: string;
}

export function calculateVlsmLayout(baseIp: string, baseCidr: number, requirements: number[]): VlsmSubnetInfo[] | null {
  const sortedReqs = [...requirements].sort((a, b) => b - a);
  const layout: VlsmSubnetInfo[] = [];
  let currentIpLong = ipToLong(baseIp);
  const baseNetworkMask = (0xffffffff << (32 - baseCidr)) >>> 0;
  const baseNetworkEndLong = (currentIpLong | ~baseNetworkMask) >>> 0;

  for (const req of sortedReqs) {
    const cidr = calculateCidrForHosts(req);
    const hostBits = 32 - cidr;
    const subnetSize = Math.pow(2, hostBits);

    const maskLong = (0xffffffff << hostBits) >>> 0;
    if ((currentIpLong & maskLong) !== currentIpLong) {
        currentIpLong = (currentIpLong + subnetSize) & maskLong;
    }

    const broadcastAddressLong = currentIpLong + subnetSize - 1;

    if (broadcastAddressLong > baseNetworkEndLong) {
      return null; // Not enough space
    }
    
    layout.push({
      requirement: req,
      cidr: cidr,
      networkAddress: longToIp(currentIpLong),
    });

    currentIpLong = broadcastAddressLong + 1;
  }

  return layout;
}

// --- Data for new question types ---

const protocolQuestions = [
    { text: 'ما هو البروتوكول الذي يُستخدم لترجمة أسماء النطاقات (مثل google.com) إلى عناوين IP؟', options: ['DNS', 'DHCP', 'HTTP', 'FTP'], answer: 'DNS' },
    { text: 'أي بروتوكول يوفر اتصالاً موثوقًا وموجهًا بالاتصال (Connection-Oriented)؟', options: ['TCP', 'UDP', 'IP', 'ICMP'], answer: 'TCP' },
    { text: 'ما هو البروتوكول المسؤول عن تعيين عناوين IP للأجهزة تلقائيًا في الشبكة؟', options: ['DHCP', 'ARP', 'DNS', 'SMTP'], answer: 'DHCP' },
    { text: 'أي بروتوكول يُستخدم لإرسال رسائل التشخيص والأخطاء، وهو أساس أداة `ping`؟', options: ['ICMP', 'IGMP', 'SNMP', 'TCP'], answer: 'ICMP' },
    { text: 'ما هو البروتوكول الذي يربط عنوان IP (الطبقة 3) بعنوان MAC (الطبقة 2) داخل الشبكة المحلية؟', options: ['ARP', 'RARP', 'IP', 'Ethernet'], answer: 'ARP' },
];

function generateRandomMac() {
    return '00:1A:2B:' + Array(3).fill(0).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()).join(':');
}

export function generateRandomQuestion(): SubnettingQuestion {
    const questionTypes = [
        QuestionType.FULL_DETAILS,
        QuestionType.HOW_MANY_HOSTS,
        QuestionType.SCENARIO_CIDR_FOR_HOSTS,
        QuestionType.VLSM_SCENARIO,
        QuestionType.ACL_EVALUATION,
        QuestionType.STP_ROOT_BRIDGE,
        QuestionType.PROTOCOL_IDENTIFICATION,
    ];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    const id = Date.now() + Math.random();

    switch (type) {
        case QuestionType.HOW_MANY_HOSTS:
        case QuestionType.HOW_MANY_SUBNETS:
        case QuestionType.FULL_DETAILS: {
            const firstOctet = Math.floor(Math.random() * 223) + 1;
            if (firstOctet === 127) { return generateRandomQuestion(); }
            const ipAddress = `${firstOctet}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
            const cidr = Math.floor(Math.random() * (30 - 8 + 1)) + 8;
            return { id, type, ipAddress, cidr };
        }
        case QuestionType.SCENARIO_CIDR_FOR_HOSTS: {
            const requiredHosts = Math.floor(Math.random() * 10000) + 5;
            return { id, type, requiredHosts };
        }
        case QuestionType.VLSM_SCENARIO: {
            const baseCidrOptions = [16, 20, 21, 22, 23, 24];
            const baseCidr = baseCidrOptions[Math.floor(Math.random() * baseCidrOptions.length)];
            let baseNetworkLong = ipToLong(`172.${16 + Math.floor(Math.random()*16)}.0.0`);
            if (baseCidr >= 24) {
                 baseNetworkLong = ipToLong(`192.168.${Math.floor(Math.random() * 256)}.0`);
            }
            const mask = (0xffffffff << (32 - baseCidr)) >>> 0;
            const baseNetwork = longToIp(baseNetworkLong & mask);
            const numRequirements = Math.floor(Math.random() * 3) + 3;
            const vlsmHostRequirements: number[] = [];
            for (let i = 0; i < numRequirements; i++) {
                vlsmHostRequirements.push(Math.floor(Math.random() * 100) + 2);
            }
            if (!calculateVlsmLayout(baseNetwork, baseCidr, vlsmHostRequirements)) {
                return generateRandomQuestion();
            }
            const vlsmTargetRequirement = vlsmHostRequirements[Math.floor(Math.random() * vlsmHostRequirements.length)];
            return { id, type, baseNetwork, baseCidr, vlsmHostRequirements, vlsmTargetRequirement };
        }
        case QuestionType.ACL_EVALUATION: {
             const acl = {
                rules: [
                    'access-list 101 deny tcp any host 10.1.1.10 eq 80',
                    'access-list 101 permit tcp any any eq 80',
                    'access-list 101 permit tcp any any eq 443',
                ],
                packet: {
                    srcIp: '192.168.1.5',
                    dstIp: '10.1.1.10',
                    protocol: 'TCP' as 'TCP' | 'UDP',
                    dstPort: 80,
                },
             };
             return { id, type, acl };
        }
        case QuestionType.STP_ROOT_BRIDGE: {
            const priorities = [32768, 28672, 32768, 24576, 4096];
            const switches = [
                { name: 'SW-A', priority: priorities[Math.floor(Math.random() * priorities.length)], mac: generateRandomMac() },
                { name: 'SW-B', priority: priorities[Math.floor(Math.random() * priorities.length)], mac: generateRandomMac() },
                { name: 'SW-C', priority: priorities[Math.floor(Math.random() * priorities.length)], mac: generateRandomMac() },
            ];
             // Ensure at least one priority is unique to avoid ambiguity in test, unless all are same
            if (new Set(switches.map(s => s.priority)).size < 2 && new Set(switches.map(s => s.priority)).size !== 1) {
                switches[0].priority = 4096;
            }
            return { id, type, stp: { switches } };
        }
        case QuestionType.PROTOCOL_IDENTIFICATION: {
             const protoQ = protocolQuestions[Math.floor(Math.random() * protocolQuestions.length)];
             // Shuffle options
             const options = [...protoQ.options].sort(() => Math.random() - 0.5);
             return { id, type, protocol: { text: protoQ.text, options } };
        }
        default: {
            const ipAddress = `192.168.1.1`;
            const cidr = 26;
            return { id, type: QuestionType.FULL_DETAILS, ipAddress, cidr };
        }
    }
}

// --- Calculation/Logic for new question types ---

export function evaluateAcl(acl: SubnettingQuestion['acl']): 'Permit' | 'Deny' {
    if (!acl) return 'Deny';
    const { rules, packet } = acl;

    for (const rule of rules) {
        const parts = rule.split(' ');
        // access-list 101 [permit|deny] [protocol] [src] [dst] eq [port]
        const action = parts[2] as 'permit' | 'deny';
        const ruleProto = parts[3];
        const ruleDst = parts[5];
        const rulePort = parts[7] ? parseInt(parts[7]) : -1;
        
        const protoMatch = ruleProto.toLowerCase() === packet.protocol.toLowerCase() || ruleProto === 'ip';
        const portMatch = rulePort === -1 || rulePort === packet.dstPort;
        const dstMatch = ruleDst === 'any' || (ruleDst === 'host' && parts[6] === packet.dstIp);

        if (protoMatch && portMatch && dstMatch) {
            return action === 'permit' ? 'Permit' : 'Deny';
        }
    }
    return 'Deny'; // Implicit deny
}

export function findStpRootBridge(switches: SubnettingQuestion['stp']['switches']): string {
    if (!switches || switches.length === 0) return '';
    
    let rootBridge = switches[0];
    for (let i = 1; i < switches.length; i++) {
        if (switches[i].priority < rootBridge.priority) {
            rootBridge = switches[i];
        } else if (switches[i].priority === rootBridge.priority) {
            if (switches[i].mac.replace(/:/g, '') < rootBridge.mac.replace(/:/g, '')) {
                 rootBridge = switches[i];
            }
        }
    }
    return rootBridge.name;
}

export function getProtocolAnswer(questionText: string): string | undefined {
    return protocolQuestions.find(q => q.text === questionText)?.answer;
}
