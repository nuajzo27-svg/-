import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-950 border border-gray-700 rounded-md p-4 mt-2 text-left dir-ltr text-cyan-300 font-mono text-sm overflow-x-auto">
        <code>{children}</code>
    </pre>
);

interface CommandCardProps {
  command: string;
  environment: 'Windows/Linux' | 'Cisco IOS';
  description: string;
  example: string;
  output?: string;
  isMultiStep?: boolean;
}

const CommandCard: React.FC<CommandCardProps> = ({ command, environment, description, example, output, isMultiStep }) => {
    const isCisco = environment === 'Cisco IOS';
    const envColor = isCisco ? 'bg-purple-900 text-purple-200' : 'bg-green-900 text-green-200';

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{command}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${envColor}`}>
                        {environment}
                    </span>
                </div>
            </div>
            <div className="p-5 text-gray-300 leading-relaxed space-y-3 flex-grow">
                <p><strong>الوظيفة:</strong> {description}</p>
                <div>
                    <p><strong>{isMultiStep ? 'خطوات الإعداد:' : 'مثال:'}</strong></p>
                    <CodeBlock>{example}</CodeBlock>
                </div>
                {output && (
                    <div>
                        <p><strong>مثال على المخرجات:</strong></p>
                        <CodeBlock>{output}</CodeBlock>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Data Arrays for Commands ---

const osCommands: CommandCardProps[] = [
    {
        command: 'ping',
        environment: 'Windows/Linux',
        description: 'يرسل حزم ICMP لاختبار إمكانية الوصول إلى جهاز آخر على الشبكة وقياس زمن الاستجابة.',
        example: 'ping 8.8.8.8',
        output: `Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=15ms TTL=116
...`
    },
    {
        command: 'tracert / traceroute',
        environment: 'Windows/Linux',
        description: 'يعرض المسار (قائمة أجهزة التوجيه) الذي تسلكه الحزم للوصول إلى وجهة معينة. (tracert في ويندوز, traceroute في لينكس).',
        example: 'tracert google.com',
        output: `Tracing route to google.com [142.250.186.78]
over a maximum of 30 hops:
  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2     8 ms     7 ms     9 ms  [ISP Router]
  ...`
    },
    {
        command: 'ipconfig / ifconfig',
        environment: 'Windows/Linux',
        description: 'يعرض إعدادات الشبكة الحالية لواجهات الجهاز، مثل عنوان IP وقناع الشبكة والبوابة الافتراضية. (ipconfig في ويندوز, ifconfig/ip addr في لينكس).',
        example: 'ipconfig',
        output: `Ethernet adapter Ethernet:
   IPv4 Address. . . . . . . . . . . : 192.168.1.100
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1`
    },
    {
        command: 'nslookup',
        environment: 'Windows/Linux',
        description: 'يستخدم للاستعلام عن خوادم DNS للحصول على عنوان IP المرتبط باسم نطاق معين، أو العكس.',
        example: 'nslookup www.cisco.com',
        output: `Server:  dns.google
Address:  8.8.8.8

Name:    e2867.dsca.akamaiedge.net
Address: 23.211.13.120`
    },
];

const ciscoSharedBasicCommands: CommandCardProps[] = [
     {
        command: 'الإعدادات الأساسية المشتركة',
        environment: 'Cisco IOS',
        description: 'تشمل الأوامر الأساسية لإعداد أي جهاز سيسكو (راوتر أو سويتش)، مثل تغيير الاسم، تأمين الوصول بكلمات مرور مشفرة، تأمين المنافذ، إعداد لافتة تحذيرية، وتفعيل SSH للوصول الآمن.',
        example: `! 1. Set hostname
Device(config)# hostname MyDevice
! 2. Secure privileged mode
MyDevice(config)# enable secret cisco
! 3. Secure Console and VTY lines
MyDevice(config)# line con 0
MyDevice(config-line)# password cisco
MyDevice(config-line)# login
MyDevice(config)# line vty 0 4
MyDevice(config-line)# password cisco
MyDevice(config-line)# login
! 4. Encrypt all clear-text passwords
MyDevice(config)# service password-encryption
! 5. Set a warning banner
MyDevice(config)# banner motd # Unauthorized Access Prohibited #
! 6. Basic SSH Setup
MyDevice(config)# ip domain-name mynetwork.local
MyDevice(config)# username admin secret cisco
MyDevice(config)# crypto key generate rsa
...
MyDevice(config)# line vty 0 4
MyDevice(config-line)# login local
MyDevice(config-line)# transport input ssh`,
        isMultiStep: true,
    },
     {
        command: 'حفظ الإعدادات',
        environment: 'Cisco IOS',
        description: 'يحفظ الإعدادات الحالية (running-config) إلى إعدادات بدء التشغيل (startup-config) في NVRAM. الأمر `wr` هو اختصار شائع.',
        example: 'MyDevice# copy running-config startup-config\n\nMyDevice# wr',
    },
];

const ciscoRouterAdvancedCommands: CommandCardProps[] = [
    {
        command: 'إعداد واجهات الراوتر',
        environment: 'Cisco IOS',
        description: 'تكوين واجهات الراوتر، سواء كانت للشبكة المحلية (LAN) مثل FastEthernet أو للشبكات الواسعة (WAN) مثل Serial. ملاحظة: أمر `clock rate` يستخدم فقط على جانب DCE من الاتصال (عادةً من جهة مزود الخدمة).',
        example: `! 1. Configuring a LAN interface
R1(config)# interface fastEthernet 0/0
R1(config-if)# description LINK_TO_LOCAL_LAN
R1(config-if)# ip address 172.16.1.1 255.255.255.0
R1(config-if)# no shutdown

! 2. Configuring a WAN interface (as DCE)
R1(config)# interface serial 0/1/0
R1(config-if)# description WAN_CONNECTION_TO_R2
R1(config-if)# ip address 10.1.1.1 255.255.255.252
R1(config-if)# clock rate 128000
R1(config-if)# no shutdown`,
        isMultiStep: true
    },
    {
        command: 'إعداد Router-on-a-Stick',
        environment: 'Cisco IOS',
        description: 'تقنية تستخدم لتمكين التوجيه بين شبكات VLANs مختلفة عبر واجهة راوتر واحدة مادية، عن طريق إنشاء واجهات فرعية (sub-interfaces) لكل VLAN.',
        example: `! Main interface must be up
R1(config)# interface fastEthernet 0/0
R1(config-if)# no shutdown

! Sub-interface for VLAN 10
R1(config)# interface fastEthernet 0/0.10
R1(config-subif)# encapsulation dot1q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0

! Sub-interface for VLAN 20
R1(config)# interface fastEthernet 0/0.20
R1(config-subif)# encapsulation dot1q 20
R1(config-subif)# ip address 192.168.20.1 255.255.255.0`,
        isMultiStep: true
    }
];

const ciscoWanCommands: CommandCardProps[] = [
    {
        command: 'إعداد PPP والمصادقة',
        environment: 'Cisco IOS',
        description: 'تكوين تغليف PPP على الواجهات التسلسلية وتأمين الاتصال باستخدام مصادقة CHAP (الأكثر أمانًا) أو PAP.',
        example: `! 1. Enable PPP encapsulation
R1(config)# interface serial 0/0
R1(config-if)# encapsulation ppp

! 2. Configure CHAP Authentication (on ALPHA router)
ALPHA(config)# username BETA password XYZ
ALPHA(config)# interface serial 0/0
ALPHA(config-if)# ppp authentication chap

! 3. Configure PAP Authentication (on ALPHA router)
ALPHA(config)# interface serial 0/0
ALPHA(config-if)# ppp authentication pap
ALPHA(config-if)# ppp pap sent-username ALPHA password XYZ`,
        isMultiStep: true
    },
    {
        command: 'إعداد Frame Relay',
        environment: 'Cisco IOS',
        description: 'تكوين Frame Relay على واجهة تسلسلية. طريقة Multipoint تستخدم واجهة واحدة لعدة اتصالات، بينما Point-to-Point تستخدم واجهة فرعية لكل اتصال وهي الأفضل لتجنب مشاكل Split Horizon.',
        example: `! --- Method 1: Multipoint (Single Subnet) ---
R1(config)# interface serial 0/0
R1(config-if)# encapsulation frame-relay
R1(config-if)# frame-relay map ip 1.1.1.2 102 broadcast
R1(config-if)# frame-relay map ip 1.1.1.3 103 broadcast

! --- Method 2: Point-to-Point (Subinterfaces) ---
! On R1 (Hub Router)
R1(config)# interface serial 0/0
R1(config-if)# encapsulation frame-relay
R1(config)# interface serial 0/0.102 point-to-point
R1(config-subif)# ip address 1.1.1.1 255.255.255.0
R1(config-subif)# frame-relay interface-dlci 102
! On R2 (Spoke Router)
R2(config)# interface serial 0/0.201 point-to-point
R2(config-subif)# ip address 1.1.1.2 255.255.255.0
R2(config-subif)# frame-relay interface-dlci 201`,
        isMultiStep: true
    }
];


const ciscoRoutingCommands: CommandCardProps[] = [
    {
        command: 'المسارات الثابتة والافتراضية',
        environment: 'Cisco IOS',
        description: 'تكوين مسارات ثابتة يدويًا لتوجيه حركة المرور إلى شبكات معينة. يمكن تحديد المسار باستخدام عنوان IP للقفزة التالية (next-hop) أو واجهة الخروج. المسار الافتراضي (Default Route) يوجه كل حركة المرور غير المعروفة.',
        example: `! Static route using next-hop IP
R1(config)# ip route 10.1.2.0 255.255.255.0 10.1.128.1

! Static route using exit interface (for point-to-point)
R1(config)# ip route 10.1.2.0 255.255.255.0 Serial0/0/0

! Default route
R1(config)# ip route 0.0.0.0 0.0.0.0 199.1.1.1`,
        isMultiStep: true
    },
    {
        command: 'إعداد بروتوكول RIPv2',
        environment: 'Cisco IOS',
        description: 'تكوين بروتوكول التوجيه RIPv2. يتم الإعلان عن الشبكات المتصلة مباشرة باستخدام عنوانها الصنفي (classful). `no auto-summary` ضروري في الشبكات غير المتجاورة، و `passive-interface` يمنع إرسال تحديثات عبر واجهة معينة.',
        example: `R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# network 10.0.0.0
R1(config-router)# no auto-summary
R1(config-router)# passive-interface Serial0/0/0`,
        isMultiStep: true
    },
    {
        command: 'إعداد بروتوكول OSPF',
        environment: 'Cisco IOS',
        description: 'تكوين بروتوكول التوجيه OSPF، وهو بروتوكول حالة الارتباط (link-state). يتضمن تحديد process ID، والإعلان عن الشبكات باستخدام wildcard masks، وتحديد مناطق OSPF. يمكن تحسين سلوكه من خلال تعديل التكلفة (cost)، والمصادقة (authentication)، وغيرها.',
        example: `! 1. Enter OSPF configuration mode
R1(config)# router ospf 10

! 2. Configure networks to be advertised (using wildcard mask)
R1(config-router)# network 10.0.0.0 0.255.255.255 area 0

! 3. (Optional) Manually set Router ID
R1(config-router)# router-id 1.1.1.1

! 4. (Optional) Fine-tune OSPF on an interface
R1(config)# interface Serial0/0/0
R1(config-if)# ip ospf cost 55

! 5. (Optional) Configure MD5 authentication
R1(config-if)# ip ospf authentication message-digest
R1(config-if)# ip ospf message-digest-key 1 md5 cisco`,
        isMultiStep: true
    },
    {
        command: 'إعداد بروتوكول EIGRP',
        environment: 'Cisco IOS',
        description: 'تكوين بروتوكول التوجيه EIGRP، وهو بروتوكول توجيه هجين (hybrid) خاص بشركة سيسكو. يتطلب تحديد رقم نظام مستقل (AS number).',
        example: `! 1. Enter EIGRP configuration mode
R1(config)# router eigrp 121

! 2. Configure networks to be advertised
R1(config-router)# network 10.0.0.0
R1(config-router)# network 192.168.1.0

! 3. (Optional) Disable auto summarization
R1(config-router)# no auto-summary

! 4. (Optional) Configure MD5 authentication
R1(config)# key chain MY_KEYS
R1(config-keychain)# key 1
R1(config-keychain-key)# key-string 1stKEY
R1(config)# interface Serial0/0/0
R1(config-if)# ip authentication mode eigrp 121 md5
R1(config-if)# ip authentication key-chain eigrp 121 MY_KEYS`,
        isMultiStep: true
    }
];

const ciscoAclCommands: CommandCardProps[] = [
    {
        command: 'Standard ACL',
        environment: 'Cisco IOS',
        description: 'قائمة تحكم بالوصول قياسية (1-99). تقوم بتصفية حركة المرور بناءً على عنوان IP المصدر فقط. القاعدة الأساسية هي وضعها في أقرب مكان ممكن من الوجهة.',
        example: `! 1. Create the access list (ACL 2)
R1(config)# access-list 2 remark --Block specific hosts--
R1(config)# access-list 2 deny 192.168.1.77
R1(config)# access-list 2 permit any

! 2. Apply the ACL to an interface
R1(config)# interface FastEthernet0/1
R1(config-if)# ip access-group 2 out

! --- Example for VTY lines ---
! Create an ACL to permit specific clients for Telnet/SSH
R1(config)# access-list 99 permit 192.168.1.128 0.0.0.15
R1(config)# line vty 0 4
R1(config-line)# access-class 99 in`,
        isMultiStep: true
    },
    {
        command: 'Extended ACL',
        environment: 'Cisco IOS',
        description: 'قائمة تحكم بالوصول موسعة (100-199). توفر تصفية دقيقة بناءً على IP المصدر والوجهة، البروتوكول (TCP/UDP)، والمنافذ. القاعدة الأساسية هي وضعها في أقرب مكان ممكن من المصدر.',
        example: `! 1. Create the extended access list (ACL 101)
R1(config)# access-list 101 remark --Complex filtering--
R1(config)# access-list 101 deny tcp 10.1.1.0 0.0.0.255 host 10.0.0.1 eq 80
R1(config)# access-list 101 deny udp host 10.1.1.7 eq 53 any
R1(config)# access-list 101 permit ip any any

! 2. Apply the ACL to an interface
R1(config)# interface FastEthernet0/0
R1(config-if)# ip access-group 101 in`,
        isMultiStep: true
    },
    {
        command: 'Named ACL',
        environment: 'Cisco IOS',
        description: 'تستخدم الأسماء بدلاً من الأرقام لتعريف قوائم التحكم، مما يجعلها أسهل في القراءة والإدارة. تتيح وضع التكوين الخاص بها تعديل القائمة بسهولة (حذف وإضافة سطور).',
        example: `! 1. Create a named standard ACL
R1(config)# ip access-list standard MY_STANDARD_ACL
R1(config-std-nacl)# remark --Allow specific subnet--
R1(config-std-nacl)# permit 10.1.1.0 0.0.0.255
R1(config-std-nacl)# deny any

! 2. Apply the named ACL to an interface
R1(config)# interface FastEthernet0/1
R1(config-if)# ip access-group MY_STANDARD_ACL out`,
        isMultiStep: true
    },
];

const ciscoNatCommands: CommandCardProps[] = [
    {
        command: 'Static NAT',
        environment: 'Cisco IOS',
        description: 'ترجمة عنوان الشبكة الثابت. يقوم بإنشاء ربط واحد لواحد (one-to-one) بين عنوان IP خاص محلي وعنوان IP عام.',
        example: `! 1. Define inside and outside interfaces
R1(config)# interface FastEthernet0/1
R1(config-if)# ip nat inside
R1(config)# interface Serial0/0/0
R1(config-if)# ip nat outside

! 2. Configure the static NAT statement
R1(config)# ip nat inside source static 192.168.1.10 200.1.1.1`,
        isMultiStep: true,
    },
    {
        command: 'Dynamic NAT',
        environment: 'Cisco IOS',
        description: 'ترجمة عنوان الشبكة الديناميكي. يقوم بربط مجموعة من العناوين الخاصة بمجموعة (pool) من العناوين العامة المتاحة.',
        example: `! 1. Define inside and outside interfaces (same as static)

! 2. Create an ACL to define which private IPs are allowed to be translated
R1(config)# access-list 3 permit 192.168.1.0 0.0.0.255

! 3. Create a pool of public IP addresses
R1(config)# ip nat pool PUB 200.1.1.1 200.1.1.6 netmask 255.255.255.248

! 4. Configure the dynamic NAT statement
R1(config)# ip nat inside source list 3 pool PUB`,
        isMultiStep: true,
    }
];

const ciscoSwitchAdvancedCommands: CommandCardProps[] = [
    {
        command: 'إعطاء IP للإدارة والبوابة',
        environment: 'Cisco IOS',
        description: 'يعين عنوان IP لواجهة VLAN افتراضية (SVI) ويحدد البوابة الافتراضية، للسماح بإدارة السويتش عن بعد عبر الشبكة.',
        example: `SW1(config)# interface vlan 1
SW1(config-if)# ip address 172.16.1.11 255.255.255.0
SW1(config-if)# no shutdown
SW1(config)# ip default-gateway 172.16.1.1`,
        isMultiStep: true
    },
    {
        command: 'إعداد VLAN و Trunking',
        environment: 'Cisco IOS',
        description: 'إنشاء VLANs، تعيين منافذ لها، إعداد Voice VLAN، وتكوين منافذ Trunk لتمرير حركة مرور VLANs متعددة بين السويتشات.',
        example: `! Create VLAN and assign port
SW1(config)# vlan 10
SW1(config-vlan)# name SALES
SW1(config)# interface fa0/5
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10

! Configure Trunk port
SW1(config)# interface fa0/1
SW1(config-if)# switchport mode trunk

! Configure Voice VLAN
SW1(config)# interface fa0/6
SW1(config-if)# switchport voice vlan 12`,
        isMultiStep: true
    },
    {
        command: 'إعداد أمان المنافذ',
        environment: 'Cisco IOS',
        description: 'تأمين منفذ السويتش عن طريق تحديد عدد عناوين MAC المسموح بها، والإجراء عند حدوث انتهاك، وتحديد العناوين المسموح بها.',
        example: `SW1(config)# interface FastEthernet0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 1
SW1(config-if)# switchport port-security violation shutdown
SW1(config-if)# switchport port-security mac-address sticky`,
        isMultiStep: true
    },
    {
        command: 'إعداد VTP',
        environment: 'Cisco IOS',
        description: 'تكوين بروتوكول VTP لمزامنة معلومات الـ VLANs تلقائيًا بين السويتشات في نفس النطاق.',
        example: `SW1(config)# vtp mode server
SW1(config)# vtp domain EXAMPLE
SW1(config)# vtp password cisco
SW1(config)# vtp version 2`,
        isMultiStep: true
    },
    {
        command: 'تحسين STP و EtherChannel',
        environment: 'Cisco IOS',
        description: 'أوامر للتحكم في STP (مثل تحديد الـ Root Bridge وتفعيل PortFast) وتجميع الواجهات في EtherChannel لزيادة السرعة.',
        example: `! Set as primary root for VLAN 1
SW1(config)# spanning-tree vlan 1 root primary

! Enable portfast and BPDU guard on an end-user port
SW1(config)# interface FastEthernet0/10
SW1(config-if)# spanning-tree portfast
SW1(config-if)# spanning-tree bpduguard enable

! Configure EtherChannel
SW1(config)# interface range FastEthernet0/23-24
SW1(config-if-range)# channel-group 1 mode on`,
        isMultiStep: true
    }
];

const ciscoDiscoveryProtocolCommands: CommandCardProps[] = [
     {
        command: 'إعدادات CDP',
        environment: 'Cisco IOS',
        description: 'أوامر لتفعيل بروتوكول اكتشاف سيسكو (CDP) على مستوى الجهاز بالكامل، أو تعطيله على واجهة معينة.',
        example: `! Enable CDP globally
SW1(config)# cdp run

! Disable CDP on a specific interface
SW1(config)# interface FastEthernet0/1
SW1(config-if)# no cdp enable`,
        isMultiStep: true,
    }
];

const ciscoShowCommands: CommandCardProps[] = [
    {
        command: 'أوامر التحقق العامة',
        environment: 'Cisco IOS',
        description: 'أوامر أساسية للتحقق من الحالة العامة للجهاز، بما في ذلك الواجهات، الإعدادات، ومعلومات النظام.',
        example: `show ip interface brief
show running-config
show startup-config
show version
show history`,
        isMultiStep: true
    },
    {
        command: 'show ip route',
        environment: 'Cisco IOS',
        description: 'يعرض جدول التوجيه الكامل. يمكن تصفيته لعرض مسارات بروتوكول معين (rip, ospf, eigrp) أو تفاصيل مسار لشبكة معينة.',
        example: 'R1# show ip route\nR1# show ip route ospf\nR1# show ip route eigrp'
    },
     {
        command: 'OSPF Verification',
        environment: 'Cisco IOS',
        description: 'أوامر للتحقق من حالة OSPF، بما في ذلك الجيران (neighbors)، قاعدة البيانات (database)، والواجهات.',
        example: `show ip protocols
show ip ospf neighbors
show ip ospf database
show ip ospf interface serial 0/0`,
        isMultiStep: true
    },
    {
        command: 'EIGRP Verification',
        environment: 'Cisco IOS',
        description: 'أوامر للتحقق من حالة EIGRP، بما في ذلك الجيران (neighbors)، جدول الطوبولوجيا (topology)، والواجهات.',
        example: `show ip eigrp neighbors
show ip eigrp topology
show ip eigrp interfaces
show ip eigrp traffic`,
        isMultiStep: true
    },
    {
        command: 'أوامر التحقق للسويتش (نظرة عامة)',
        environment: 'Cisco IOS',
        description: 'أوامر متخصصة للتحقق من إعدادات السويتش مثل VLANs, Trunks, VTP, Port Security, STP, و EtherChannel.',
        example: `show vlan brief
show interfaces trunk
show vtp status
show port-security interface fa0/1
show spanning-tree vlan 1
show etherchannel summary`,
        isMultiStep: true
    },
    {
        command: 'show mac-address-table',
        environment: 'Cisco IOS',
        description: 'يعرض جدول عناوين MAC الخاص بالسويتش، والذي يربط عناوين MAC الخاصة بالأجهزة بالمنافذ التي تتصل بها. هذا الأمر أساسي لفهم كيفية توجيه السويتش للإطارات (frames) داخل الشبكة المحلية.',
        example: 'SW1# show mac-address-table',
        output: `          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0001.42a4.a8b1    DYNAMIC     Fa0/1
   1    0001.961b.7802    DYNAMIC     Fa0/3
   1    00d0.ffb0.0c81    DYNAMIC     Fa0/2`
    },
    {
        command: 'show cdp neighbors',
        environment: 'Cisco IOS',
        description: 'يعرض معلومات حول أجهزة سيسكو المتصلة مباشرة (الجيران). `detail` يعطي معلومات أكثر.',
        example: 'SW1# show cdp neighbors\nSW1# show cdp neighbors detail'
    },
    {
        command: 'WAN & PPP Verification',
        environment: 'Cisco IOS',
        description: 'أوامر للتحقق من حالة تغليف الواجهة واستكشاف أخطاء مصادقة PPP وإعدادات Frame Relay.',
        example: `! For PPP
show interface s0/0
debug ppp authentication

! For Frame Relay
show frame-relay pvc
show frame-relay map
debug frame-relay lmi
debug frame-relay events`,
        isMultiStep: true
    },
];

const ciscoHelperCommands: CommandCardProps[] = [
    {
        command: 'alias',
        environment: 'Cisco IOS',
        description: 'يستخدم لإنشاء اختصارات للأوامر الطويلة والمتكررة لتسريع العمل على CLI.',
        example: `SW1(config)# alias exec c configure terminal
SW1(config)# alias exec sr show running-config`,
    },
    {
        command: 'debug',
        environment: 'Cisco IOS',
        description: 'أمر قوي جدًا لعرض رسائل استكشاف الأخطاء وإصلاحها في الوقت الفعلي. (تحذير: يمكن أن يسبب حملًا كبيرًا على المعالج، استخدمه بحذر في بيئات الإنتاج وقم بإيقافه بـ `no debug all` أو `undebug all`).',
        example: 'SW1# debug spanning-tree events',
    }
];

const CommandGroup: React.FC<{ title: string, commands: CommandCardProps[] }> = ({ title, commands }) => (
    <div>
        <h4 className="text-xl font-semibold text-cyan-300 mb-4 mt-8">{title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commands.map((cmd, index) => (
                <CommandCard key={`${cmd.command}-${index}`} {...cmd} />
            ))}
        </div>
    </div>
);


const CommandsSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">قائمة أوامر الشبكات</h2>
      <p className="text-gray-400 mb-8">
        مرجع سريع لأهم الأوامر التي تحتاجها لاستكشاف وإعداد الشبكات، سواء على جهاز الكمبيوتر الخاص بك أو على أجهزة سيسكو.
      </p>

      <div className="space-y-12">
        <div>
            <h3 className="text-2xl font-semibold text-white mb-6 border-b-2 border-green-500 pb-2">أوامر نظام التشغيل (Windows/Linux)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {osCommands.map((cmd) => (
                    <CommandCard key={cmd.command} {...cmd} />
                ))}
            </div>
        </div>
        
        <div>
            <h3 className="text-2xl font-semibold text-white mb-6 border-b-2 border-purple-500 pb-2">أوامر Cisco IOS</h3>
            <div className="space-y-10">
                <CommandGroup title="الإعدادات الأساسية (مشتركة للراوتر والسويتش)" commands={ciscoSharedBasicCommands} />
                <CommandGroup title="إعدادات الراوتر المتقدمة" commands={ciscoRouterAdvancedCommands} />
                <CommandGroup title="إعدادات WAN (PPP & Frame Relay)" commands={ciscoWanCommands} />
                 <CommandGroup title="إعدادات خدمات الشبكة (NAT)" commands={ciscoNatCommands} />
                <CommandGroup title="إعدادات بروتوكولات التوجيه (Routing)" commands={ciscoRoutingCommands} />
                <CommandGroup title="إعدادات قوائم التحكم بالوصول (ACLs)" commands={ciscoAclCommands} />
                <CommandGroup title="إعدادات السويتش المتقدمة" commands={ciscoSwitchAdvancedCommands} />
                <CommandGroup title="إعدادات بروتوكولات الاكتشاف (CDP)" commands={ciscoDiscoveryProtocolCommands} />
                <CommandGroup title="أوامر التحقق واستكشاف الأخطاء (Show Commands)" commands={ciscoShowCommands} />
                <CommandGroup title="أوامر مساعدة" commands={ciscoHelperCommands} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommandsSection;