export enum AppSection {
  Learn = 'learn',
  Practice = 'practice',
  Tricks = 'tricks',
  Protocols = 'protocols',
  IPv6 = 'ipv6',
  Commands = 'commands',
  CCNA_SUMMARY = 'ccna_summary',
}

export enum QuestionType {
  FULL_DETAILS,
  HOW_MANY_SUBNETS,
  HOW_MANY_HOSTS,
  SCENARIO_CIDR_FOR_HOSTS,
  VLSM_SCENARIO,
}

export interface SubnettingQuestion {
  id: number;
  type: QuestionType;
  // For types FULL_DETAILS, HOW_MANY_SUBNETS, HOW_MANY_HOSTS
  ipAddress?: string;
  cidr?: number;
  // For type SCENARIO_CIDR_FOR_HOSTS
  requiredHosts?: number;
  // For VLSM_SCENARIO
  baseNetwork?: string;
  baseCidr?: number;
  vlsmHostRequirements?: number[];
  vlsmTargetRequirement?: number;
}


export interface SubnettingSolution {
  networkAddress: string;
  broadcastAddress: string;
  firstUsableHost: string;
  lastUsableHost: string;
  numberOfHosts: number;
  subnetMask: string;
  wildcardMask: string;
  totalSubnets: number;
}