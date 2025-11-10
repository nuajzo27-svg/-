// FIX: Import React to provide types for React.ReactNode used in TopologyNode and TopologyLink interfaces.
import React from 'react';

export enum AppSection {
  Learn = 'learn',
  Practice = 'practice',
  Tricks = 'tricks',
  Protocols = 'protocols',
  IPv6 = 'ipv6',
  Commands = 'commands',
  CCNA_SUMMARY = 'ccna_summary',
  CCNA2_SUMMARY = 'ccna2_summary',
  CCNA3_SUMMARY = 'ccna3_summary',
  MINI_CLI_SIMULATOR = 'mini_cli_simulator',
  OSI_VISUALIZER = 'osi_visualizer',
  FLASHCARDS = 'flashcards',
}

export type CurriculumLevel = 'ccna1' | 'ccna2' | 'ccna3';

export enum QuestionType {
  // Subnetting
  FULL_DETAILS,
  HOW_MANY_SUBNETS,
  HOW_MANY_HOSTS,
  SCENARIO_CIDR_FOR_HOSTS,
  VLSM_SCENARIO,
  // New Types
  ACL_EVALUATION,
  STP_ROOT_BRIDGE,
  PROTOCOL_IDENTIFICATION,
}

// Renamed in spirit to PracticeQuestion, but keeping original name for minimal changes.
export interface SubnettingQuestion {
  id: number;
  type: QuestionType;
  
  // --- Subnetting Fields ---
  ipAddress?: string;
  cidr?: number;
  requiredHosts?: number;
  baseNetwork?: string;
  baseCidr?: number;
  vlsmHostRequirements?: number[];
  vlsmTargetRequirement?: number;

  // --- New Question Type Fields ---
  acl?: {
    rules: string[];
    packet: { srcIp: string; dstIp: string; protocol: 'TCP' | 'UDP'; dstPort: number };
  };
  stp?: {
    switches: { name: string; priority: number; mac: string }[];
  };
  protocol?: {
    text: string;
    options: string[];
  };
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

// --- Search Interfaces ---
export interface SearchableItem {
  id: string;
  section: AppSection;
  sectionLabel: string;
  title: string;
  content: string; 
}

export interface SearchResult {
    item: SearchableItem;
    snippet: string; 
}

// --- Interactive Topology Interfaces ---
export interface TopologyNode {
  id: string;
  label: string;
  x: number;
  y: number;
  details?: React.ReactNode;
}

export interface TopologyLink {
  id: string;
  source: string;
  target: string;
  label?: string;
  details?: React.ReactNode;
  isBlocked?: boolean;
}