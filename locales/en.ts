export default {
  appTitle: 'Subnetting Trainer',
  appSubtitle: 'Your comprehensive companion for mastering networking & CCNA',
  language: 'Language',
  arabic: 'العربية',
  english: 'English',
  searchPlaceholder: 'Search for a protocol, command, or concept...',
  searchResultsTitle: 'Search results for "{query}"',
  navigateToSection: 'Go to Section',
  noResults: 'No matching results found.',
  footerText: 'Developed by a Network Expert © 2024',
  function: 'Function',
  info: 'Info',
  example: 'Example',
  purpose: 'Purpose',
  nav: {
    fundamentals: 'Fundamentals',
    learnAndExplain: 'Learn & Explain',
    quickTricks: 'Quick Tricks',
    interactiveTraining: 'Interactive Training',
    practiceAndTest: 'Test Your Knowledge',
    flashcards: 'Flashcards',
    cliSimulator: 'CLI Simulator',
    osiVisualizer: 'OSI Visualizer',
    ccnaSummaries: 'CCNA Summaries',
    ccna1Summary: 'CCNA 1 Summary (ITN)',
    ccna2Summary: 'CCNA 2 Summary (SRWE)',
    ccna3Summary: 'CCNA 3 Summary (ENSA)',
    references: 'References',
    protocolsExplain: 'Protocols Explained',
    ipv6Explain: 'IPv6 Explained',
    commandList: 'Command List',
  },
  learn: {
    mainTitle: 'Learn & Explain: Theoretical Foundation',
    means: 'means',
    ones: 'ones',
    networkAddress: 'Network Address',
    broadcastAddress: 'Broadcast Address',
    firstHost: 'First Usable Host',
    lastHost: 'Last Usable Host',
    notApplicable: 'N/A',
    chart: {
      title: 'Resulting Subnets Chart',
      network: 'Network',
      usableHosts: 'Usable Range',
      broadcast: 'Broadcast'
    },
    section1: {
      title: '1. What is an IP Address?',
      p1: 'An IP address (IPv4) is a numerical identifier for any device on a network. It consists of 32 bits, usually written as 4 decimal numbers separated by dots (e.g., 192.168.1.1).',
      p2: 'IP addresses are divided into main "Classes":',
      p3: 'There are also "Private IPs" used within local networks that cannot connect directly to the internet (like your home network):',
      note: 'Note: 127.0.0.0/8 is reserved for loopback self-testing.',
      table: {
        header1: 'Class', header2: 'Range (1st Octet)', header3: 'Usage', header4: 'Default Mask',
        row1_desc: 'For very large networks (millions of devices).',
        row2_desc: 'For medium to large networks.',
        row3_desc: 'For small networks (most common in homes/small offices).',
        row4_desc: 'For Multicast - sending data to a specific group.',
        row5_desc: 'Reserved for research and experiments.',
      }
    },
    section2: {
      title: '2. What is a Subnet Mask?',
      p1: 'A subnet mask is a "filter" that tells the computer which part of the IP address is the "network name" and which part is the "device number" within it.',
      p2: 'It also consists of 4 numbers. 255 means "this part is for the network", and 0 means "this part is for devices".',
      p3: 'In binary (computer language), 255 is eight ones (11111111).',
    },
    section3: {
      title: '3. CIDR Notation (/)',
      p1: 'Instead of writing the long subnet mask (like 255.255.255.0), we use a shortcut by putting a forward slash (/) followed by the count of "ones" in the mask.',
    },
    section4: {
      title: '4. How does a computer calculate the Network Address? (ANDing Process)',
      p1: 'When a computer sends data, it performs a mathematical operation called "AND" between its IP address and the subnet mask to find out the network address it belongs to.',
      step1: 'The AND rule is very simple:',
      step1_desc: '1 AND 1 = 1 (Anything else equals 0).',
      step2: 'Practical Example:',
      step2_desc: 'Let\'s calculate the network address for 192.168.1.150/24',
      step3: 'Convert to binary and apply AND:',
      step3_desc: '',
      step3_result: 'So, the Network Address is: 192.168.10.128',
      step4: 'To calculate the Broadcast Address:',
      step4_desc: 'Take the network address, and turn all "host bits" (which were 0 in the mask) into 1s.',
      step4_result: 'So, the Broadcast Address is: 192.168.10.191',
      step5: 'Usable Host Range:',
      firstHost: 'First Host',
      lastHost: 'Last Host',
    },
    section5: {
      title: '5. Subnetting Steps Made Simple',
      p1: 'Subnetting means taking a large network and cutting it into smaller sub-networks.',
      p2: 'Imagine you have a large piece of land (network) and you want to divide it into smaller lots to build houses (devices).',
      stepsTitle: 'Golden Steps:',
      step1: 'Determine the number of subnets you need, or the number of devices per subnet.',
      step2: 'Use the formula: 2^n >= Required Number (where n is the number of bits we will borrow from the host part).',
      step3: 'Calculate the new mask (Old Mask + n).',
      step4: 'Calculate the "Magic Number" (Jump) = 256 - the new number in the decimal mask.',
      step5: 'Write down the subnets sequentially by adding the "Jump" amount.',
      scenarioTitle: 'Comprehensive Example (VLSM):',
      scenarioP1: 'You have network 192.168.1.0/24 and want to divide it to fit these departments (ordered from largest to smallest):',
      req1_dept: 'Sales Dept', req1_hosts: '100 hosts',
      req2_dept: 'Management Dept', req2_hosts: '50 hosts',
      req3_dept: 'IT Dept', req3_hosts: '20 hosts',
      req4_dept: 'Router Link', req4_hosts: '2 hosts',
      applyTitle: 'Application:',
      sub1_title: '1. Sales (100 hosts):',
      sub1_desc: 'We need 100 addresses. Closest power of 2 is 128 (2^7). So we need 7 host bits. Remaining for network: 32 - 7 = 25. New mask: /25.',
      sub1_code: 'Network: 192.168.1.0/25 (covers .0 to .127)',
      sub2_title: '2. Management (50 hosts):',
      sub2_desc: 'Start where we left off (.128). Need 50 addresses. Closest power of 2 is 64 (2^6). Need 6 host bits. Mask: 32 - 6 = /26.',
      sub2_code: 'Network: 192.168.1.128/26 (covers .128 to .191)',
      sub3_title: '3. IT (20 hosts):',
      sub3_desc: 'Start from (.192). Need 20 addresses. Closest power is 32 (2^5). Mask: 32 - 5 = /27.',
      sub3_code: 'Network: 192.168.1.192/27 (covers .192 to .223)',
      sub4_title: '4. Link (2 hosts):',
      sub4_desc: 'Start from (.224). Need only 2 addresses. Closest power is 4 (2^2) (2 for net/broadcast + 2 for hosts). Mask: 32 - 2 = /30.',
      sub4_code: 'Network: 192.168.1.224/30 (covers .224 to .227)',
      summaryTitle: 'Final Table:',
      sumTable: {
        header1: 'Department', header2: 'Network Address/Mask', header3: 'Broadcast Address', header4: 'Usable Range', header5: 'Available Hosts'
      },
      conclusion: 'We have efficiently divided the network without much waste using VLSM (Variable Length Subnet Mask).',
    },
    section6: {
      title: '6. Basic Rules (Quick Reminder)',
      p1: 'Golden rules to memorize:',
      q1_title: 'Q1: How do I know the number of available hosts in a network?',
      q1_rule: 'Rule: (2 to the power of the number of zeros in the mask) - 2',
      q1_p1: 'Example: A /24 mask has 8 zeros (32 - 24 = 8).',
      q1_p2: '2^8 - 2 = 256 - 2 = 254 hosts.',
      q1_result: '(We subtract 2 because the first is network address and last is broadcast).',
      q2_title: 'Q2: How do I know the number of subnets?',
      q2_rule: 'Rule: 2 to the power of the number of ones we "borrowed" from the host part.',
      q2_p1: 'Example: We had /24 and it became /26. We borrowed 2 bits (26 - 24 = 2).',
      q2_p2: '2^2 = 4 subnets.',
      q2_note: 'Note: As the CIDR number increases (/24 -> /25 -> /26), the number of subnets increases and hosts per subnet decreases.',
      q3_title: 'Q3: What is the "Magic Number" (Jump) and how does it help?',
      q3_p1: 'The jump is the number that tells you how to move from one subnet to the next.',
      q3_p2: 'Calculation: 256 - (Decimal value of the last non-zero octet in the mask).',
      q3_p3: 'Example: /26 mask is 255.255.255.192. Jump = 256 - 192 = 64. Subnets are: 0, 64, 128, 192.',
      q4_title: 'Q4: What is a /30 mask and what is it used for?',
      q4_rule: 'Used for "direct links" between two routers (Point-to-Point) because it gives exactly 2 usable addresses.',
      q4_net1: 'Network Address',
      q4_net2: 'First Router IP',
      q4_net3: 'Second Router IP',
      q4_net4: 'Broadcast Address',
      q5_title: 'Q5: What is a /32 mask?',
      q5_rule: 'Used for a single specific device address (Host Route). Useful for routing traffic to a specific device or for Loopback interface on a router.',
      q5_net1: 'Network Address = Device Address',
      q5_net2: 'No separate broadcast',
      q5_net3: 'No range',
      q5_net4: 'Number of hosts = 1',
    }
  },
  practice: {
    testMode: 'Test Your Knowledge',
    calculatorMode: 'Subnet Calculator',
    loading: 'Loading new question...',
    enterAnswer: 'Enter answer here',
    correctSolution: 'Correct Solution',
    stats: {
      correct: 'Correct',
      incorrect: 'Incorrect',
      reset: 'Reset'
    },
    questions: {
      full_details_prompt: 'Find the network details for the following address:',
      how_many_subnets: 'How many subnets does the /{cidr} mask provide for a Class {ip} network?',
      how_many_hosts: 'How many usable hosts are in the {ip}/{cidr} network?',
      scenario_cidr_for_hosts: 'You need to design a network for at least {hosts} hosts. What is the smallest CIDR mask that meets this requirement?',
    },
    vlsm: {
      mainNetwork: 'Main Network',
      requirements: 'Department Requirements (hosts)',
      hosts: 'hosts',
      prompt: 'Calculate VLSM for the network above, then enter details for the subnet meeting the requirement: {requirement}',
    },
    acl: {
      prompt: 'Will the router permit this packet based on the listed ACL?',
      aclTitle: 'Access Control List (ACL)',
      packetTitle: 'Packet Details',
      implicitDeny: 'Implicit Deny',
      permit: 'Permit',
      deny: 'Deny',
    },
    stp: {
      prompt: 'Based on priorities and MAC addresses, which switch will be elected as the Root Bridge?',
    },
    protocolQuestions: {
      dns: 'Which protocol is responsible for resolving website names (like www.google.com) to IP addresses?',
      tcp: 'Which Transport layer protocol provides reliable connection and ensures ordered data delivery?',
      dhcp: 'A new PC connected to the network needs to get an IP address automatically. Which protocol will it use?',
      icmp: 'What protocol does the "ping" tool use to test connectivity?',
      arp: 'A device wants to send data to another on the same LAN, knows its IP but needs its MAC address. What does it use?',
    },
    fields: {
      networkAddress: 'Network Address',
      subnetMask: 'Subnet Mask',
      firstUsable: 'First Usable Host',
      lastUsable: 'Last Usable Host',
      broadcastAddress: 'Broadcast Address',
      numHosts: 'Number of Usable Hosts',
      cidrLabel: 'CIDR Mask (e.g., /26)',
      wildcard: 'Wildcard Mask',
    },
    buttons: {
      check: 'Check Answer',
      showSolution: 'Show Solution',
      hideSolution: 'Hide Solution',
      newQuestion: 'New Question',
    },
    feedback: {
      networkAddress: 'Incorrect. Remember Network Address is IP ANDed with Mask.',
      subnetMask: 'Incorrect subnet mask for the given CIDR.',
      firstUsable: 'First usable is Network Address + 1.',
      lastUsable: 'Last usable is Broadcast Address - 1.',
      broadcastAddress: 'Broadcast is the last address in range, all host bits are 1.',
      numberOfHosts: 'Check the formula: 2^(host bits) - 2.',
      cidr_for_hosts: 'Think of powers of 2 sufficient to cover required hosts + 2 (net/bcast).',
      vlsm_networkAddress: 'Wrong subnet address. Ensure you started with largest requirements first.',
      vlsm_cidr: 'Wrong CIDR mask for this requirement.',
      acl: 'Incorrect. Remember ACLs process top-down, and there is an implicit deny at the end.',
      stp: 'Incorrect. Root bridge is elected based on lowest priority, then lowest MAC in case of a tie.',
      protocol: 'Incorrect. The right answer is {answer}.',
    },
    calculator: {
        title: 'Subnet Calculator',
        subtitle: 'Quick tool to calculate network details. Enter IP and CIDR to get results instantly.',
        calculateButton: 'Calculate Details',
        resultsTitle: 'Network Analysis Results:',
        errors: {
            invalidIp: 'Please enter a valid IPv4 address (e.g., 192.168.1.1)',
            invalidCidr: 'Please enter a valid CIDR mask between 0 and 32',
        }
    }
  },
  tricks: {
    title: 'Quick Subnetting Tricks',
    example: 'Example',
    card1: {
        title: '1. "Finger Rule" for quick CIDR calculation',
        p1: 'Want to know decimal mask for /26 without paper? Use your fingers!',
        p2: 'Keep in mind each octet has 8 bits. /26 means we finished 3 octets (8+8+8=24). Remainder? 26 - 24 = 2 bits.',
        example_p1: 'Raise two fingers.',
        example_p2: 'Remember their values: First finger is 128, second is 64.',
        example_p3: 'Add them: 128 + 64 = 192.',
        example_p4: 'Mask is: 255.255.255.192. Magic! ✨'
    },
    card2: {
        title: '2. Secret to finding "Jump" (Block Size) in seconds',
        p1: 'The Jump is the most important number in subnetting, telling you where next subnet starts.',
        li1: 'If decimal mask ends in .192 for example.',
        li2: 'Jump is always = 256 - last number in mask.',
        p2: 'Jump = 256 - 192 = 64. Your subnets are 0, 64, 128, 192. Done!'
    },
    card3: {
        title: '3. Quick memorization of multiples (powers of 2)',
        p1: 'This small table makes you fastest. Memorize it like your name:',
        q1_title: 'How many subnets in /26?',
        q1_formula: 'Borrowed 2 bits over /24.',
        q1_result: '4 subnets',
        q2_title: 'How many hosts in /26?',
        q2_formula: 'Remaining 6 bits (32-26).',
        q2_result: '62 hosts',
        q3_title: 'What is the jump for /26 (.192)?',
        q3_formula: '256 - 192',
        q3_result: 'Jump is 64',
        q4_title: '2^7 (for /25 network)?',
        q4_formula: '128',
        q4_result: '128 (jump, or 126 hosts)',
        q5_title: '2^5 (for /27 network)?',
        q5_formula: '32',
        q5_result: '32 (jump, or 30 hosts)',
    },
    card4: {
        title: '4. "Odd or Even" trick for quick verification',
        p1: 'Doubt if 192.168.1.33 is a network address in a /27 (jump 32) split?',
        rule: 'Rule: Subnet addresses are (almost) always even. Broadcast addresses often odd.',
        p2: '(Except for rare odd jumps in huge networks). .33 is odd? Likely first host in network starting at .32!'
    },
    card5: {
        title: '5. Magic CIDR Table (for common small networks)',
        p1: 'Most used networks in questions and real life. Memorize this line and relax:',
    },
    card6: {
        title: '6. Place values for 8 bits',
        p1: 'Always draw this line mentally when converting:',
        p2: '128 - 64 - 32 - 16 - 8 - 4 - 2 - 1',
        p3: 'Need number 10? It is 8 + 2 ← means 00001010',
        p4: 'Need number 224? It is 128 + 64 + 32 ← means 11100000'
    },
    table: {
        header2: 'Last Mask Octet',
        header3: 'Usable Hosts'
    }
  },
  protocols: {
    title: 'Core Protocols Explained',
    subtitle: 'Your quick guide to understanding networking language. Classified by OSI layer.',
    layers: {
        application: 'Application Layer (Layer 7)',
        transport: 'Transport Layer (Layer 4)',
        network: 'Network Layer (Layer 3)',
        data_link: 'Data Link Layer (Layer 2)',
    },
    http: {
        func: 'Web browsing. Transfers web pages (unencrypted).',
        info: 'Uses TCP port 80.',
    },
    https: {
        func: 'Secure web browsing. Transfers web pages encrypted.',
        info: 'Uses TCP port 443. Relies on SSL/TLS.',
    },
    dns: {
        func: 'Resolves names (like google.com) to IP addresses.',
        info: 'Uses UDP 53 (for standard queries) and TCP 53 (zone transfers).',
    },
    dhcp: {
        func: 'Automatically assigns IP addresses and network settings to devices.',
        info: 'Uses UDP 67 (Server) and UDP 68 (Client).',
    },
    ftp: {
        func: 'Transfers files between devices.',
        info: 'Uses TCP 20 (Data) and TCP 21 (Control).',
    },
    ssh: {
        func: 'Secure remote access for device management (encrypted alternative to Telnet).',
        info: 'Uses TCP port 22.',
    },
    telnet: {
        func: 'Remote access for device management (insecure, sends data as clear text).',
        info: 'Uses TCP port 23.',
    },
    smtp: {
        func: 'Sends email between servers.',
        info: 'Uses TCP port 25.',
    },
    pop3: {
        func: 'Retrieves email from server (downloads and usually deletes from server).',
        info: 'Uses TCP port 110.',
    },
    imap: {
        func: 'Retrieves and manages email on server (keeps copy on server).',
        info: 'Uses TCP port 143.',
    },
    ntp: {
        func: 'Synchronizes time between network devices.',
        info: 'Uses UDP port 123. Vital for log analysis.',
    },
    snmp: {
        func: 'Remote monitoring and management of network devices.',
        info: 'Uses UDP 161 (queries) and UDP 162 (traps).',
    },
    syslog: {
        func: 'Sends log messages to a central server.',
        info: 'Usually uses UDP port 514.',
    },
    tcp: {
        func: 'Reliable data transfer. Guarantees delivery and order (Connection-oriented).',
        info: 'Uses "Three-way handshake" (SYN, SYN-ACK, ACK) to start connection. Slower than UDP but more accurate.',
    },
    udp: {
        func: 'Fast, unreliable data transfer (Connectionless). Does not guarantee delivery.',
        info: 'Suitable for live streaming, VoIP, and online gaming where speed > accuracy of every byte.',
    },
    ip: {
        func: 'Logical addressing and routing of packets between different networks.',
        info: 'Connectionless, Best Effort protocol.',
    },
    icmp: {
        func: 'Sends error and diagnostic messages (like Ping and Traceroute).',
        info: 'Works directly over IP. Does not use port numbers.',
    },
    nat: {
        func: 'Translates private IP addresses to public ones (and vice versa) for internet access.',
        info: 'Allows an entire network to use one public IP (via PAT).',
    },
    ipsec: {
        func: 'Suite of protocols to secure IP communications (encryption, authentication).',
        info: 'Foundation for VPNs. Uses protocols like AH and ESP.',
    },
    ospf: {
        func: 'Internal dynamic routing protocol (IGP) of Link-State type.',
        info: 'Uses Dijkstra algorithm for shortest path. Fast convergence, uses Cost as metric.',
    },
    eigrp: {
        func: 'Advanced Cisco dynamic routing protocol (Advanced Distance Vector).',
        info: 'Uses DUAL algorithm. Combines ease of Distance Vector with speed of Link-State.',
    },
    rip: {
        func: 'Old, simple Distance Vector routing protocol.',
        info: 'Uses Hop Count as metric. Max limit 15 hops.',
    },
    bgp: {
        func: 'Main External Gateway Protocol (EGP) for the Internet.',
        info: 'Connects different Autonomous Systems (AS). Slow but very stable and scalable.',
    },
    hsrp: {
        func: 'Gateway redundancy protocol (Cisco proprietary). Provides virtual gateway to ensure connectivity if main router fails.',
        info: 'Works by electing Active and Standby routers.',
    },
    ethernet: {
        func: 'Most common LAN technology. Defines physical addressing (MAC) and media access.',
        info: 'Defined by IEEE 802.3 standards.',
    },
    arp: {
        func: 'Maps logical IP address to physical MAC address.',
        info: 'Sends broadcast request "Who has this IP?" and target replies with its MAC.',
    },
    stp: {
        func: 'Prevents loops in switched networks.',
        info: 'Blocks some ports redundantly to ensure single active path. (IEEE 802.1D/w/s).',
    },
    vlan_tagging: {
        func: 'Tags frames belonging to different VLANs when passing through a Trunk link.',
        info: 'Adds a "Tag" to Ethernet frame containing VLAN ID.',
    },
    ppp: {
        func: 'Protocol for direct links (WAN Point-to-Point).',
        info: 'Supports authentication (CHAP/PAP) and compression, works on various media (serial, fiber).',
    },
    lacp: {
        func: 'Bundles multiple physical links into one logical link for speed and redundancy (EtherChannel).',
        info: 'Standard protocol (IEEE 802.3ad). Cisco alternative is PAgP.',
    },
    cdp_lldp: {
        func: 'Discovery of directly connected neighboring devices and their basic info.',
        info: 'CDP is Cisco proprietary, LLDP is open standard.',
    },
  },
  ipv6: {
    title: 'IPv6 Explained: Future of Internet',
    becomes: 'becomes',
    subnets: 'subnets',
    subnet1: 'Subnet 1',
    subnet2: 'Subnet 2',
    subnet3: 'Subnet 3',
    subnetN: 'Subnet {num}',
    lastSubnet: 'Last Subnet',
    subnetsLookLike: 'What do subnets look like?',
    section1: {
        title: '1. Why do we need IPv6?',
        p1: 'Simply: IPv4 addresses ran out! The world now has more internet-connected devices than available addresses in v4 (about 4.3 billion).',
        p2: 'IPv6 came to solve this by providing a massive, almost infinite number of addresses (340 undecillion! A number with 36 zeros).',
        feature1_title: 'Massive Address Space', feature1_desc: '128-bit instead of 32-bit.',
        feature2_title: 'No need for NAT', feature2_desc: 'Every device can have a real public address.',
        feature3_title: 'Easier Auto-configuration', feature3_desc: 'Devices can self-assign addresses automatically (SLAAC).',
        feature4_title: 'Simpler Header', feature4_desc: 'Improved router processing efficiency.',
    },
    section2: {
        title: '2. What does an IPv6 address look like?',
        p1: 'IPv6 address is long (128 bits), so we write it in Hexadecimal to be a bit shorter.',
        p2: 'Consists of 8 groups, each having 4 hex digits, separated by colons (:).',
        exampleTitle: 'Example full address:',
    },
    section3: {
        title: '3. Address Abbreviation Rules (Very Important!)',
        p1: 'Since it\'s long, there are two rules to simplify it:',
        rule1_title: 'Rule 1: Omit Leading Zeros',
        rule1_desc: 'In any group, you can remove zeros on the left only.',
        rule1_example: 'After applying Rule 1:',
        rule2_title: 'Rule 2: Consecutive Zeros (::)',
        rule2_desc: 'You can replace one or more consecutive groups containing only zeros with double colons (::).',
        rule2_note: 'Warning: (::) can be used only ONCE in an address!',
        rule2_example: 'After applying Rule 2:',
        finalForm: 'Final Abbreviated Form',
    },
    section4: {
        title: '4. Important IPv6 Address Types',
        p1: 'Just like IPv4 has private and public addresses, IPv6 has specialized types:',
        gua_desc: 'This is the Public IP used on the internet. Must be globally unique. Usually starts with 2000::/3 (meaning first digit is 2 or 3).',
        prefix: 'Common Prefix',
        ula_desc: 'Similar to Private IPs in IPv4. Used within local networks only and not routed on the internet.',
        lla_desc: 'Mandatory address for every IPv6 interface! Used only for communication with devices on same link (same cable/LAN). Routers never forward it.',
    },
    section5: {
        title: '5. Subnetting in IPv6 (Easier than you think!)',
        p1: 'Subnetting IPv6 is much simpler because we don\'t care about "conserving addresses". We have plenty!',
        p2: 'Typically, ISP gives you a /48 prefix. This leaves you a full 16 bits to create subnets.',
        networkPrefix: 'Global Routing Prefix', networkPrefix_desc: 'First 48 bits (given by ISP).',
        interfaceId: 'Interface ID', interfaceId_desc: 'Last 64 bits (for device itself).',
        scenario_p1: 'Imagine your company got prefix:',
        scenario_p2: 'The part for you to subnet (Subnet ID) is the next 16 bits (4th group).',
        scenario_p3: 'How many subnets can you create?',
        scenario_p4: 'Each of these subnets can hold 18 quintillion devices (/64)!',
        table: {
            header1: 'Global Routing Prefix (/48)',
            header2: 'Subnet ID (16 bit)',
            header3: 'Interface ID (64 bit)',
            desc1: 'Fixed from ISP',
            desc2: 'Change numbers here to create subnets (0000 to FFFF)',
            desc3: 'Device address itself',
        },
        conclusion: 'IPv6 subnetting is just counting in hex in the Subnet ID field. No complex jump or weird mask calculations needed!',
    }
  },
  commands: {
    title: 'Common Network Command List',
    subtitle: 'Quick reference for essential commands you\'ll need on different OS (Windows/Linux) and Cisco devices (IOS).',
    setupSteps: 'Setup Steps',
    exampleOutput: 'Example Output',
    os: {
        groupTitle: 'OS Commands (Windows / Linux / macOS)',
        ping: { desc: 'Tests connectivity to another device by sending ICMP Echo messages. Measures response time and checks availability.' },
        tracert: { desc: 'Traces path taken by packet to reach destination. Shows every router it passes through.' },
        ipconfig: { desc: 'Displays current network settings (IP, Subnet Mask, Default Gateway). On Linux/macOS use `ifconfig` or `ip a`.' },
        nslookup: { desc: 'Queries DNS. Gives IP address for a domain name (like google.com) or vice versa.' },
    },
    ios: {
        groupTitle: 'Cisco IOS Commands',
        basic_group: 'Basic Settings',
        router_adv_group: 'Advanced Router Settings',
        wan_group: 'WAN Technologies',
        nat_group: 'Network Address Translation (NAT)',
        routing_group: 'Routing Protocols',
        acl_group: 'Access Control Lists (ACLs)',
        switch_adv_group: 'Advanced Switch Settings',
        discovery_group: 'Discovery Protocols',
        show_group: 'Verification (Show) Commands',
        helper_group: 'Useful Helper Commands',

        first_setup: {
            title: 'First-Time Router Setup',
            desc: 'Complete sequence for first time powering up a new router: hostname, secure passwords, enable management.',
            example: `Router> enable
Router# configure terminal
! 1. Set Hostname
Router(config)# hostname R1
! 2. Set Enable Secret (encrypted privileged mode password)
R1(config)# enable secret cisco123
! 3. Secure Console Line
R1(config)# line console 0
R1(config-line)# password conpass
R1(config-line)# login
R1(config-line)# exit
! 4. Secure VTY Lines (Telnet/SSH)
R1(config)# line vty 0 4
R1(config-line)# password vtypass
R1(config-line)# login
R1(config-line)# exit
! 5. Encrypt all clear-text passwords
R1(config)# service password-encryption
! 6. Set a Warning Banner
R1(config)# banner motd # Unauthorized access prohibited! #
! 7. Save Configuration
R1(config)# end
R1# copy running-config startup-config`
        },
        shared_basic: {
            title: 'Shared Basic Commands (Router & Switch)',
            desc: 'Fundamental commands used on both routers and switches for name and passwords.',
            example: `hostname Device1
enable secret class
line console 0
 password cisco
 login
service password-encryption`
        },
        save_config: {
            title: 'Save Configuration',
            desc: 'Saves changes from RAM (running-config) to NVRAM (startup-config) so they are not lost on reboot.',
        },
        router_interfaces: {
            title: 'Router Interface Setup',
            desc: 'Configuring IP address and enabling router port. Essential step for router to work.',
            example: `R1(config)# interface g0/0/1
R1(config-if)# description Connected to LAN
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# no shutdown`
        },
        router_on_stick: {
            title: 'Router-on-a-Stick (Inter-VLAN)',
            desc: 'Configuring subinterfaces on router to allow routing between different VLANs.',
            example: `R1(config)# interface g0/0/1.10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0
R1(config)# interface g0/0/1.20
R1(config-subif)# encapsulation dot1Q 20
R1(config-subif)# ip address 192.168.20.1 255.255.255.0`
        },
        ppp_auth: {
            title: 'PPP Setup with CHAP Authentication',
            desc: 'Configuring PPP on a serial link with secure CHAP authentication enabled.',
            example: `! On Router 1 (R1)
R1(config)# username R2 password cisco_secure
R1(config)# interface serial 0/1/0
R1(config-if)# encapsulation ppp
R1(config-if)# ppp authentication chap`
        },
        frame_relay: {
            title: 'Frame Relay Setup (Point-to-Point)',
            desc: 'Configuring legacy Frame Relay connection using subinterfaces.',
            example: `R1(config)# interface serial 0/1/0
R1(config-if)# encapsulation frame-relay
R1(config-if)# no shutdown
R1(config)# interface serial 0/1/0.102 point-to-point
R1(config-subif)# ip address 10.1.1.1 255.255.255.252
R1(config-subif)# frame-relay interface-dlci 102`
        },
        static_routes: {
            title: 'Static Routes',
            desc: 'Manually defining path to remote network. Syntax: ip route [dest_net] [mask] [next_hop or exit_if].',
            example: `! Default route (for any unknown network)
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2
! Specific route
R1(config)# ip route 192.168.20.0 255.255.255.0 Serial0/1/0`
        },
        ripv2: {
            title: 'RIPv2 Setup',
            desc: 'Configuring simple RIP version 2 routing protocol.',
            example: `R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# no auto-summary
R1(config-router)# network 192.168.10.0`
        },
        ospf: {
            title: 'OSPF Setup (Single Area)',
            desc: 'Configuring robust OSPF protocol. Requires defining Process ID and Area.',
            example: `R1(config)# router ospf 10
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.10.0 0.0.0.255 area 0
R1(config-router)# passive-interface g0/0/1`
        },
        eigrp: {
            title: 'EIGRP Setup',
            desc: 'Configuring Cisco\'s EIGRP. AS Number must match on all routers.',
            example: `R1(config)# router eigrp 100
R1(config-router)# no auto-summary
R1(config-router)# network 192.168.10.0
R1(config-router)# network 10.0.0.0`
        },
        std_acl: {
            desc: 'Simple ACL based on source address only. Numbers 1-99.',
            example: `! Allow only one host, deny rest
R1(config)# access-list 10 permit host 192.168.10.5
! Apply outbound on interface
R1(config)# interface g0/0/1
R1(config-if)# ip access-group 10 out`
        },
        ext_acl: {
            desc: 'Advanced ACL specifying source, dest, protocol, and port. Numbers 100-199.',
            example: `! Allow web browsing only from specific network
R1(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 any eq 80
R1(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 any eq 443
! Apply inbound on interface (from LAN)
R1(config)# interface g0/0/0
R1(config-if)# ip access-group 100 in`
        },
        named_acl: {
            desc: 'Using names instead of numbers for ACLs, easier to manage.',
            example: `R1(config)# ip access-list extended BLOCK_SOCIAL
R1(config-ext-nacl)# deny tcp any host 10.5.5.5 eq 80
R1(config-ext-nacl)# permit ip any any`
        },
        static_nat: {
            desc: 'Permanent one-to-one mapping of private to public address (for servers).',
            example: `R1(config)# ip nat inside source static 192.168.10.10 209.165.200.225
! Don't forget to define inside/outside interfaces
R1(config)# interface g0/0/0
R1(config-if)# ip nat inside`
        },
        dyn_nat: {
            desc: 'PAT (Overload): Allow entire network to share one public IP for internet access.',
            example: `! 1. Define addresses allowed to go out
R1(config)# access-list 1 permit 192.168.0.0 0.0.255.255
! 2. Enable PAT on outside interface
R1(config)# ip nat inside source list 1 interface serial0/1/0 overload`
        },
        switch_ip: {
            title: 'Switch Management IP (SVI)',
            desc: 'Giving switch an IP address so you can manage it remotely (SSH/Telnet).',
            example: `SW1(config)# interface vlan 1
SW1(config-if)# ip address 192.168.1.2 255.255.255.0
SW1(config-if)# no shutdown
SW1(config)# ip default-gateway 192.168.1.1`
        },
        vlan_trunk: {
            title: 'VLAN & Trunk Setup',
            desc: 'Creating virtual networks (VLANs) and configuring links between switches to carry them (Trunk).',
            example: `! Create VLAN
SW1(config)# vlan 10
SW1(config-vlan)# name Sales
! Assign port to VLAN
SW1(config)# interface fa0/5
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10
! Configure Trunk port
SW1(config)# interface g0/1
SW1(config-if)# switchport mode trunk`
        },
        port_security: {
            title: 'Port Security',
            desc: 'Restricting number of devices that can connect to a port based on MAC address.',
            example: `SW1(config-if)# switchport mode access
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 1
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# switchport port-security violation shutdown`
        },
        vtp: {
            title: 'VTP (VLAN Trunking Protocol)',
            desc: 'Protocol to automatically propagate VLAN configs between Cisco switches. (Use with caution!)',
            example: `SW1(config)# vtp domain CCNA_LAB
SW1(config)# vtp mode server
SW1(config)# vtp password cisco`
        },
        stp_etherchannel: {
            title: 'STP & EtherChannel',
            desc: 'Modifying Spanning Tree Protocol and bundling links (LACP).',
            example: `! Make this switch root for VLAN 1
SW1(config)# spanning-tree vlan 1 root primary
! Configure EtherChannel (LACP)
SW1(config)# interface range fa0/1 - 2
SW1(config-if-range)# channel-group 1 mode active`
        },
        cdp_settings: {
            title: 'CDP/LLDP Settings',
            desc: 'Enabling or disabling neighbor discovery protocols.',
            example: `! Disable CDP globally
R1(config)# no cdp run
! Enable LLDP (standard alternative)
R1(config)# lldp run`
        },
        show_general: {
            title: 'General Important Show Commands',
            desc: 'Indispensable commands to know device status and diagnose issues.',
        },
        show_ip_route: { desc: 'Shows routing table. Most important router command.' },
        show_ospf: { desc: 'Verifies OSPF neighbors and settings.' },
        show_eigrp: { desc: 'Verifies EIGRP neighbors and topology table.' },
        show_switch: {
            title: 'Switch Show Commands',
            desc: 'To verify VLANs, Trunks, and STP.',
        },
        show_mac: { desc: 'Shows MAC address table built by the switch.' },
        show_cdp: { desc: 'Discover directly connected devices (type, name, IPs).' },
        show_wan: {
            desc: 'Verify serial interfaces and WAN protocols.',
            example: `show interfaces serial 0/1/0
show frame-relay map
show ppp multilink`
        },
        alias: { desc: 'Create shortcuts for long commands to speed up work.' },
        debug: { desc: 'Shows router operations in real-time. (Warning: can slow down device!). Use `undebug all` to stop.' },
    }
  }
};