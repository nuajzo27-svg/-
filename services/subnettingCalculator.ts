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
        QuestionType.VLSM_SCENARIO, // Weight VLSM more heavily
    ];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    const id = Date.now();

    switch (type) {
        case QuestionType.HOW_MANY_HOSTS:
        case QuestionType.HOW_MANY_SUBNETS:
        case QuestionType.FULL_DETAILS: {
            // Generate more varied and realistic public/private IP scenarios
            const firstOctet = Math.floor(Math.random() * 223) + 1; // 1-223, avoiding 0.x, loopback, multicast
            if (firstOctet === 127) { return generateRandomQuestion(); } // Avoid loopback, regenerate

            const ipAddress = `${firstOctet}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
            
            // Generate a wider, more challenging range of CIDRs, not tied to classful assumptions
            const cidr = Math.floor(Math.random() * (30 - 8 + 1)) + 8; // /8 to /30
            
            return { id, type, ipAddress, cidr };
        }
        case QuestionType.SCENARIO_CIDR_FOR_HOSTS: {
            // Increase the complexity by asking for a much larger range of hosts
            const requiredHosts = Math.floor(Math.random() * 10000) + 5; // 5 to 10,005 hosts
            return { id, type, requiredHosts };
        }
        case QuestionType.VLSM_SCENARIO: {
            // 1. Generate a more varied base network
            const baseCidrOptions = [16, 20, 21, 22, 23, 24];
            const baseCidr = baseCidrOptions[Math.floor(Math.random() * baseCidrOptions.length)];
            
            // Generate a base network address that aligns with the CIDR boundary
            let baseNetworkLong = ipToLong(`172.${16 + Math.floor(Math.random()*16)}.0.0`);
            if (baseCidr >= 24) {
                 baseNetworkLong = ipToLong(`192.168.${Math.floor(Math.random() * 256)}.0`);
            }
            const mask = (0xffffffff << (32 - baseCidr)) >>> 0;
            const baseNetwork = longToIp(baseNetworkLong & mask);

            // 2. Generate a more varied number and size of requirements
            const numRequirements = Math.floor(Math.random() * 3) + 3; // 3 to 5 requirements
            const vlsmHostRequirements: number[] = [];
            for (let i = 0; i < numRequirements; i++) {
                const sizeProfile = Math.random();
                if (sizeProfile > 0.9 && i === 0) { // Very large requirement (rare, and only as the first one)
                    vlsmHostRequirements.push(Math.floor(Math.random() * 750) + 250); // 250-1000
                } else if (sizeProfile > 0.6) { // Medium
                    vlsmHostRequirements.push(Math.floor(Math.random() * 100) + 20); // 20-120
                } else if (sizeProfile > 0.2) { // Small
                    vlsmHostRequirements.push(Math.floor(Math.random() * 15) + 5); // 5-20
                } else { // Point-to-point
                    vlsmHostRequirements.push(2);
                }
            }
            
            // 3. Ensure the scenario is solvable, regenerate if not
            if (!calculateVlsmLayout(baseNetwork, baseCidr, vlsmHostRequirements)) {
                return generateRandomQuestion(); // Try again with a new question
            }

            // 4. Shuffle requirements and pick a target
            for (let i = vlsmHostRequirements.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [vlsmHostRequirements[i], vlsmHostRequirements[j]] = [vlsmHostRequirements[j], vlsmHostRequirements[i]];
            }
            const vlsmTargetRequirement = vlsmHostRequirements[Math.floor(Math.random() * vlsmHostRequirements.length)];
            
            return { id, type, baseNetwork, baseCidr, vlsmHostRequirements, vlsmTargetRequirement };
        }
        default: {
            // Fallback, should not be reached
            const ipAddress = `192.168.1.1`;
            const cidr = 26;
            return { id, type: QuestionType.FULL_DETAILS, ipAddress, cidr };
        }
    }
}