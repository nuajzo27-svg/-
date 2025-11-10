import { AppSection, SearchableItem } from '../types';

// This is a manually created index of all the content in the app.
// In a real-world app, this might be generated automatically.
const data: SearchableItem[] = [
    // CCNA 1
    {
        id: 'ccna1-1',
        section: AppSection.CCNA_SUMMARY,
        sectionLabel: 'تلخيص CCNA 1',
        title: 'الفصل 1: الشبكات اليوم',
        content: `مكونات الشبكة الأساسية: الأجهزة الطرفية (End Devices) مثل الحاسوب والهاتف، الأجهزة الوسيطة (Intermediary Devices) مثل الموجه (Router) والمحول (Switch)، ووسائط الشبكة (Network Media) مثل الكابلات. أنواع الشبكات: LAN (شبكة محلية) و WAN (شبكة واسعة). خصائص الشبكة الموثوقة: تحمل الأخطاء (Fault Tolerance), قابلية التوسع (Scalability), جودة الخدمة (QoS), والأمن (Security).`
    },
    {
        id: 'ccna1-2',
        section: AppSection.CCNA_SUMMARY,
        sectionLabel: 'تلخيص CCNA 1',
        title: 'الفصل 2: الإعدادات الأساسية',
        content: `الوصول إلى نظام التشغيل IOS عبر Console, SSH, Telnet. أوضاع الأوامر: User EXEC (Switch>), Privileged EXEC (Switch#), Global Configuration (Switch(config)#). الإعدادات الأساسية: hostname, enable secret, line console, line vty, service password-encryption, banner motd. حفظ الإعدادات باستخدام copy running-config startup-config.`
    },
    {
        id: 'ccna1-3',
        section: AppSection.CCNA_SUMMARY,
        sectionLabel: 'تلخيص CCNA 1',
        title: 'الفصل 3: البروتوكولات والنماذج',
        content: `البروتوكولات هي قواعد الاتصال. النماذج المرجعية: OSI (7 طبقات) و TCP/IP (4 طبقات). تغليف البيانات (Data Encapsulation): Data -> Segment -> Packet -> Frame -> Bits. عناوين الشبكة: IP (منطقي) و MAC (مادي).`
    },
    // ... Add more CCNA 1 chapters ...

    // CCNA 2
    {
        id: 'ccna2-1',
        section: AppSection.CCNA2_SUMMARY,
        sectionLabel: 'تلخيص CCNA 2',
        title: 'الفصل 1: مفاهيم التحويل الأساسية',
        content: `إعادة توجيه الإطارات (Frame Forwarding) باستخدام جدول عناوين MAC. نطاقات التصادم والبث. كل منفذ على المحول هو نطاق تصادم منفصل. الموجهات هي التي تقسم نطاقات البث.`
    },
    {
        id: 'ccna2-2',
        section: AppSection.CCNA2_SUMMARY,
        sectionLabel: 'تلخيص CCNA 2',
        title: 'الفصل 2: شبكات VLAN',
        content: `الشبكة المحلية الافتراضية (VLAN) هي نطاق بث معزول منطقيًا. فوائدها تشمل الأمان، تقليل التكلفة، وتحسين الأداء. Trunk هو رابط يحمل حركة مرور أكثر من VLAN واحد باستخدام بروتوكول 802.1Q.`
    },
    {
        id: 'ccna2-16',
        section: AppSection.CCNA2_SUMMARY,
        sectionLabel: 'تلخيص CCNA 2',
        title: 'الفصل 16: مفاهيم OSPFv2',
        content: `بروتوكول OSPF (Open Shortest Path First) هو بروتوكول توجيه من نوع حالة الارتباط (Link-State). يستخدم التكلفة (Cost) كمقياس. يعتمد على بناء خريطة كاملة للشبكة باستخدام LSAs.`
    },
    // ... Add more CCNA 2 chapters ...

    // CCNA 3
    {
        id: 'ccna3-4',
        section: AppSection.CCNA3_SUMMARY,
        sectionLabel: 'تلخيص CCNA 3',
        title: 'الفصل 4: مفاهيم قوائم التحكم في الوصول (ACL)',
        content: `قائمة التحكم في الوصول (ACL) هي سلسلة من الأوامر لتصفية حركة المرور. تعمل بشكل تسلسلي وتتوقف عند أول تطابق. يوجد رفض ضمني (Implicit Deny) في النهاية. Standard ACLs تقوم بالتصفية بناءً على IP المصدر. Extended ACLs تقوم بالتصفية بناءً على IP المصدر والوجهة والمنافذ.`
    },
    {
        id: 'ccna3-6',
        section: AppSection.CCNA3_SUMMARY,
        sectionLabel: 'تلخيص CCNA 3',
        title: 'الفصل 6: ترجمة عنوان الشبكة (NAT)',
        content: `ترجمة عنوان الشبكة (NAT) تترجم العناوين الخاصة إلى عناوين عامة. الأنواع: Static NAT, Dynamic NAT, و PAT (Port Address Translation) وهو الأكثر شيوعًا.`
    },
    // ... Add more CCNA 3 chapters ...

    // Commands
    {
        id: 'cmd-ping',
        section: AppSection.Commands,
        sectionLabel: 'قائمة الأوامر',
        title: 'ping',
        content: `يرسل حزم ICMP لاختبار إمكانية الوصول إلى جهاز آخر على الشبكة وقياس زمن الاستجابة. مثال: ping 8.8.8.8`
    },
    {
        id: 'cmd-acl',
        section: AppSection.Commands,
        sectionLabel: 'قائمة الأوامر',
        title: 'Standard ACL',
        content: `قائمة تحكم بالوصول قياسية (1-99). تقوم بتصفية حركة المرور بناءً على عنوان IP المصدر فقط. access-list 10 permit 192.168.10.0 0.0.0.255`
    },
     {
        id: 'cmd-ospf',
        section: AppSection.Commands,
        sectionLabel: 'قائمة الأوامر',
        title: 'إعداد بروتوكول OSPF',
        content: `تكوين بروتوكول التوجيه OSPF. router ospf 10. network 10.0.0.0 0.255.255.255 area 0.`
    },
    // ... Add more commands ...

    // Protocols
    {
        id: 'proto-dns',
        section: AppSection.Protocols,
        sectionLabel: 'شرح البروتوكولات',
        title: 'DNS',
        content: `نظام أسماء النطاقات. يعمل مثل "دليل الهاتف" للإنترنت، حيث يقوم بترجمة أسماء النطاقات (مثل google.com) إلى عناوين IP المقابلة لها.`
    },
    {
        id: 'proto-dhcp',
        section: AppSection.Protocols,
        sectionLabel: 'شرح البروتوكولات',
        title: 'DHCP',
        content: `بروتوكول التكوين الديناميكي للمضيفين. يقوم بتعيين عناوين IP وإعدادات الشبكة الأخرى للأجهزة تلقائيًا عند اتصالها بالشبكة.`
    }
    // ... Add more protocols ...
];


export const getSearchableData = (): SearchableItem[] => {
    return data;
};
