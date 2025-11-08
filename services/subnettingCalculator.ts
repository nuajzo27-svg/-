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


export function generateRandomQuestion(): SubnettingQuestion {
    const questionTypes = [
        QuestionType.FULL_DETAILS,
        QuestionType.FULL_DETAILS, 
        QuestionType.HOW_MANY_HOSTS,
        QuestionType.HOW_MANY_SUBNETS,
        QuestionType.SCENARIO_CIDR_FOR_HOSTS,
        QuestionType.VLSM_SCENARIO,
    ];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    const id = Date.now();

    switch (type) {
        case QuestionType.HOW_MANY_HOSTS:
        case QuestionType.HOW_MANY_SUBNETS:
        case QuestionType.FULL_DETAILS: {
            const classType = Math.floor(Math.random() * 3);
            let ipAddress: string;
            let cidr: number;
            
            if (classType === 0) { // Class A private
                ipAddress = `10.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
                cidr = Math.floor(Math.random() * (30 - 9 + 1)) + 9; // /9 to /30
            } else if (classType === 1) { // Class B private
                 ipAddress = `172.${Math.floor(Math.random() * 16) + 16}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
                 cidr = Math.floor(Math.random() * (30 - 17 + 1)) + 17; // /17 to /30
            } else { // Class C private
                ipAddress = `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
                cidr = Math.floor(Math.random() * (30 - 25 + 1)) + 25; // /25 to /30
            }
            return { id, type, ipAddress, cidr };
        }
        case QuestionType.SCENARIO_CIDR_FOR_HOSTS: {
            const requiredHosts = Math.floor(Math.random() * 500) + 5;
            return { id, type, requiredHosts };
        }
        case QuestionType.VLSM_SCENARIO: {
            const baseCidr = 24;
            const baseNetwork = `192.168.${Math.floor(Math.random() * 256)}.0`;

            const reqs = new Set<number>();
            while(reqs.size < 3) {
                if (reqs.size === 0) reqs.add(Math.floor(Math.random() * 40) + 20); // 20-60 hosts
                if (reqs.size === 1) reqs.add(Math.floor(Math.random() * 8) + 5);   // 5-13 hosts
                if (reqs.size === 2) reqs.add(2);
            }
            const vlsmHostRequirements = Array.from(reqs);

            // Shuffle to make it non-obvious which order to solve in
             for (let i = vlsmHostRequirements.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [vlsmHostRequirements[i], vlsmHostRequirements[j]] = [vlsmHostRequirements[j], vlsmHostRequirements[i]];
            }
            
            const vlsmTargetRequirement = vlsmHostRequirements[Math.floor(Math.random() * vlsmHostRequirements.length)];

            // Verify a solution is possible
            if (!calculateVlsmLayout(baseNetwork, baseCidr, vlsmHostRequirements)) {
                // If impossible, generate a simpler question instead
                return generateRandomQuestion();
            }
            
            return { id, type, baseNetwork, baseCidr, vlsmHostRequirements, vlsmTargetRequirement };
        }
        default: {
            const ipAddress = `192.168.1.1`;
            const cidr = 26;
            return { id, type: QuestionType.FULL_DETAILS, ipAddress, cidr };
        }
    }
}