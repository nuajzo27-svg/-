export default {
  appTitle: 'مدرب تقسيم الشبكات',
  appSubtitle: 'CCNA رفيقك الشامل لإتقان الشبكات ومنهج',
  language: 'اللغة',
  arabic: 'العربية',
  english: 'English',
  searchPlaceholder: 'ابحث عن بروتوكول، أمر، أو مفهوم...',
  searchResultsTitle: 'نتائج البحث عن "{query}"',
  navigateToSection: 'الانتقال إلى القسم',
  noResults: 'لم يتم العثور على نتائج مطابقة.',
  footerText: 'تم التطوير بواسطة خبير شبكات © 2024',
  function: 'الوظيفة',
  info: 'معلومات',
  example: 'مثال',
  purpose: 'الغرض',
  nav: {
    fundamentals: 'الأساسيات',
    learnAndExplain: 'الشرح والتعلم',
    quickTricks: 'أسرار الحل السريع',
    interactiveTraining: 'التدريب التفاعلي',
    practiceAndTest: 'اختبر معلوماتك',
    flashcards: 'بطاقات المراجعة',
    cliSimulator: 'محاكي الأوامر (CLI)',
    osiVisualizer: 'متصور التغليف (OSI)',
    ccnaSummaries: 'ملخصات CCNA',
    ccna1Summary: 'ملخص CCNA 1 (ITN)',
    ccna2Summary: 'ملخص CCNA 2 (SRWE)',
    ccna3Summary: 'ملخص CCNA 3 (ENSA)',
    references: 'المراجع',
    protocolsExplain: 'شرح البروتوكولات',
    ipv6Explain: 'شرح IPv6',
    commandList: 'قائمة الأوامر',
  },
  learn: {
    mainTitle: 'الشرح والتعلم: الأساس النظري',
    means: 'تعني',
    ones: 'واحد',
    networkAddress: 'عنوان الشبكة',
    broadcastAddress: 'عنوان البث',
    firstHost: 'أول عنوان صالح',
    lastHost: 'آخر عنوان صالح',
    notApplicable: 'لا ينطبق',
    chart: {
      title: 'مخطط الشبكات الفرعية الناتجة',
      network: 'الشبكة',
      usableHosts: 'المدى الصالح',
      broadcast: 'البث'
    },
    section1: {
      title: '1. ما هو عنوان IP؟',
      p1: 'عنوان IP (الإصدار 4) هو مُعرف رقمي لأي جهاز على الشبكة. يتكون من 32 بت، ونكتبه عادة على شكل 4 أرقام عشرية تفصل بينها نقاط (مثال: 192.168.1.1).',
      p2: 'تنقسم عناوين IP إلى "فئات" (Classes) رئيسية:',
      p3: 'توجد أيضًا "عناوين خاصة" (Private IPs) تُستخدم داخل الشبكات المحلية ولا يمكنها الاتصال بالإنترنت مباشرة (مثل شبكة منزلك):',
      note: 'ملاحظة: 127.0.0.0/8 محجوز للاختبار الذاتي (Loopback).',
      table: {
        header1: 'الفئة', header2: 'المدى (الرقم الأول)', header3: 'الاستخدام', header4: 'القناع الافتراضي',
        row1_desc: 'للشبكات الضخمة جدًا (ملايين الأجهزة).',
        row2_desc: 'للشبكات المتوسطة والكبيرة.',
        row3_desc: 'للشبكات الصغيرة (الأكثر شيوعًا في المنازل والمكاتب الصغيرة).',
        row4_desc: 'للبث المتعدد (Multicast) - إرسال بيانات لمجموعة محددة.',
        row5_desc: 'محجوز للأبحاث والتجارب.',
      }
    },
    section2: {
      title: '2. ما هو قناع الشبكة (Subnet Mask)؟',
      p1: 'قناع الشبكة هو "الفلتر" الذي يخبر الكمبيوتر أي جزء من عنوان IP هو "اسم الشبكة" وأي جزء هو "رقم الجهاز" فيها.',
      p2: 'يتكون أيضًا من 4 أرقام. الرقم 255 يعني "هذا الجزء للشبكة"، والرقم 0 يعني "هذا الجزء للأجهزة".',
      p3: 'في النظام الثنائي (لغة الكمبيوتر)، الـ 255 هي عبارة عن ثمانية وحايد (11111111).',
    },
    section3: {
      title: '3. نظام CIDR (/)',
      p1: 'بدلًا من كتابة قناع الشبكة الطويل (مثل 255.255.255.0)، نستخدم اختصارًا بوضع شرطة مائلة (/) متبوعة بعدد "الوحايد" في القناع.',
    },
    section4: {
      title: '4. كيف يحسب الكمبيوتر عنوان الشبكة؟ (Process ANDing)',
      p1: 'عندما يرسل الكمبيوتر بيانات، فإنه يقوم بعملية حسابية تسمى "AND" بين عنوان IP الخاص به وقناع الشبكة لمعرفة عنوان الشبكة التي ينتمي إليها.',
      step1: 'قاعدة AND بسيطة جدًا:',
      step1_desc: '1 AND 1 = 1 (أي شيء آخر يساوي 0).',
      step2: 'مثال عملي:',
      step2_desc: 'لنحسب عنوان الشبكة لـ 192.168.1.150/24',
      step3: 'نحول للنظام الثنائي ونطبق AND:',
      step3_desc: '',
      step3_result: 'إذن، عنوان الشبكة هو: 192.168.10.128',
      step4: 'لحساب عنوان البث (Broadcast):',
      step4_desc: 'نأخذ عنوان الشبكة، ونحول جميع "بتات الأجهزة" (التي كانت 0 في القناع) إلى 1.',
      step4_result: 'إذن، عنوان البث هو: 192.168.10.191',
      step5: 'نطاق العناوين الصالحة:',
      firstHost: 'أول عنوان',
      lastHost: 'آخر عنوان',
    },
    section5: {
      title: '5. خطوات تقسيم الشبكة (Subnetting) ببساطة',
      p1: 'التقسيم يعني أخذ شبكة كبيرة وتقطيعها إلى شبكات أصغر.',
      p2: 'تخيل أن لديك قطعة أرض كبيرة (شبكة) وتريد تقسيمها إلى قطع أصغر لبناء منازل (أجهزة).',
      stepsTitle: 'الخطوات الذهبية:',
      step1: 'حدد عدد الشبكات الفرعية التي تحتاجها، أو عدد الأجهزة في كل شبكة.',
      step2: 'استخدم القانون: 2^n >= العدد المطلوب (حيث n هو عدد البتات التي سنستلفها من جزء الأجهزة).',
      step3: 'احسب القناع الجديد (القناع القديم + n).',
      step4: 'احسب "القفزة" (Magic Number) = 256 - الرقم الجديد في القناع العشري.',
      step5: 'اكتب الشبكات تباعًا بزيادة مقدار "القفزة".',
      scenarioTitle: 'مثال شامل (VLSM):',
      scenarioP1: 'لديك الشبكة 192.168.1.0/24 وتريد تقسيمها لتناسب الأقسام التالية (مرتبة من الأكبر للأصغر):',
      req1_dept: 'قسم المبيعات', req1_hosts: '100 جهاز',
      req2_dept: 'قسم الإدارة', req2_hosts: '50 جهاز',
      req3_dept: 'قسم الـ IT', req3_hosts: '20 جهاز',
      req4_dept: 'رابط بين راوترين', req4_hosts: 'جهازين',
      applyTitle: 'التطبيق:',
      sub1_title: '1. المبيعات (100 جهاز):',
      sub1_desc: 'نحتاج 100 عنوان. أقرب قوى للعدد 2 هي 128 (2^7). إذن نحتاج 7 بتات للأجهزة. المتبقي للشبكة: 32 - 7 = 25. القناع الجديد: /25.',
      sub1_code: 'الشبكة: 192.168.1.0/25 (تغطي من .0 إلى .127)',
      sub2_title: '2. الإدارة (50 جهاز):',
      sub2_desc: 'نبدأ من حيث انتهينا (.128). نحتاج 50 عنوان. أقرب قوى للعدد 2 هي 64 (2^6). نحتاج 6 بتات للأجهزة. القناع: 32 - 6 = /26.',
      sub2_code: 'الشبكة: 192.168.1.128/26 (تغطي من .128 إلى .191)',
      sub3_title: '3. الـ IT (20 جهاز):',
      sub3_desc: 'نبدأ من (.192). نحتاج 20 عنوان. أقرب قوى هي 32 (2^5). القناع: 32 - 5 = /27.',
      sub3_code: 'الشبكة: 192.168.1.192/27 (تغطي من .192 إلى .223)',
      sub4_title: '4. الرابط (جهازين):',
      sub4_desc: 'نبدأ من (.224). نحتاج عنوانين فقط. أقرب قوى هي 4 (2^2) (عنوانان للشبكة والبث + 2 للأجهزة). القناع: 32 - 2 = /30.',
      sub4_code: 'الشبكة: 192.168.1.224/30 (تغطي من .224 إلى .227)',
      summaryTitle: 'الجدول النهائي:',
      sumTable: {
        header1: 'القسم', header2: 'عنوان الشبكة/القناع', header3: 'عنوان البث', header4: 'المدى الصالح', header5: 'عدد الأجهزة المتاحة'
      },
      conclusion: 'بهذا نكون قد قسمنا الشبكة بكفاءة عالية دون هدر كبير في العناوين باستخدام تقنية VLSM (قناع الشبكة متغير الطول).',
    },
    section6: {
      title: '6. القواعد الأساسية (تذكير سريع)',
      p1: 'قواعد ذهبية يجب حفظها:',
      q1_title: 'س1: كيف أعرف عدد الأجهزة المتاحة في شبكة معينة؟',
      q1_rule: 'القاعدة: (2 أس عدد الأصفار في القناع) - 2',
      q1_p1: 'مثال: قناع /24 يعني فيه 8 أصفار (32 - 24 = 8).',
      q1_p2: '2^8 - 2 = 256 - 2 = 254 جهاز.',
      q1_result: '(نطرح 2 لأن أول عنوان للشبكة وآخر عنوان للبث).',
      q2_title: 'س2: كيف أعرف عدد الشبكات الفرعية؟',
      q2_rule: 'القاعدة: 2 أس عدد الوحايد التي "استلفناها" من جزء الأجهزة.',
      q2_p1: 'مثال: كان عندنا /24 وأصبح /26. استلفنا 2 بت (26 - 24 = 2).',
      q2_p2: '2^2 = 4 شبكات فرعية.',
      q2_note: 'ملاحظة: كلما زاد رقم الـ CIDR (/24 -> /25 -> /26)، زاد عدد الشبكات وقل عدد الأجهزة في كل شبكة.',
      q3_title: 'س3: ما هو "Magic Number" (القفزة) وكيف يساعدني؟',
      q3_p1: 'القفزة هي الرقم الذي يخبرك كيف تنتقل من شبكة فرعية للتالية.',
      q3_p2: 'طريقة حسابه: 256 - (القيمة العشرية لآخر خانة غير صفرية في القناع).',
      q3_p3: 'مثال: قناع /26 هو 255.255.255.192. القفزة = 256 - 192 = 64. الشبكات ستكون: 0, 64, 128, 192.',
      q4_title: 'س4: ما هو قناع /30 وفيما يستخدم؟',
      q4_rule: 'يستخدم لـ "الروابط المباشرة" بين راوترين (Point-to-Point) لأنه يعطينا بالضبط عنوانين صالحين فقط.',
      q4_net1: 'عنوان الشبكة',
      q4_net2: 'عنوان IP للراوتر الأول',
      q4_net3: 'عنوان IP للراوتر الثاني',
      q4_net4: 'عنوان البث',
      q5_title: 'س5: ما هو قناع /32؟',
      q5_rule: 'يستخدم لعنوان جهاز واحد محدد (Host Route). يفيد في توجيه حركة المرور لجهاز معين أو في إعدادات Loopback interface على الراوتر.',
      q5_net1: 'عنوان الشبكة = عنوان الجهاز',
      q5_net2: 'لا يوجد عنوان بث منفصل',
      q5_net3: 'لا يوجد مدى',
      q5_net4: 'عدد الأجهزة = 1',
    }
  },
  practice: {
    testMode: 'اختبر معلوماتك',
    calculatorMode: 'آلة حاسبة للشبكات',
    loading: 'جاري تحميل سؤال جديد...',
    enterAnswer: 'أدخل الإجابة هنا',
    correctSolution: 'الإجابة الصحيحة',
    stats: {
      correct: 'إجابات صحيحة',
      incorrect: 'إجابات خاطئة',
      reset: 'تصفير'
    },
    questions: {
      full_details_prompt: 'أوجد تفاصيل الشبكة للعنوان التالي:',
      how_many_subnets: 'كم عدد الشبكات الفرعية التي يوفرها القناع /{cidr} لشبكة من الفئة {ip}؟',
      how_many_hosts: 'كم عدد الأجهزة الصالحة (Usable Hosts) في الشبكة {ip}/{cidr}؟',
      scenario_cidr_for_hosts: 'أنت بحاجة لتصميم شبكة تتسع لـ {hosts} جهازًا على الأقل. ما هو أصغر قناع (CIDR) يحقق هذا الشرط؟',
    },
    vlsm: {
      mainNetwork: 'الشبكة الرئيسية',
      requirements: 'احتياجات الأقسام (عدد الأجهزة)',
      hosts: 'جهاز',
      prompt: 'قم بحساب VLSM للشبكة أعلاه، ثم أدخل تفاصيل الشبكة الفرعية التي تلبي احتياج: {requirement}',
    },
    acl: {
      prompt: 'هل سيسمح الراوتر بمرور هذه الحزمة بناءً على قائمة التحكم (ACL) الموضحة؟',
      aclTitle: 'قائمة التحكم (ACL)',
      packetTitle: 'تفاصيل الحزمة',
      implicitDeny: 'Implicit Deny',
      permit: 'Permit (سماح)',
      deny: 'Deny (رفض)',
    },
    stp: {
      prompt: 'بناءً على قيم الأولوية وعناوين MAC، أي من هذه المحولات سيتم انتخابه كجسر جذري (Root Bridge)؟',
    },
    protocolQuestions: {
      dns: 'ما هو البروتوكول المسؤول عن تحويل أسماء المواقع (مثل www.google.com) إلى عناوين IP؟',
      tcp: 'أي بروتوكول من طبقة النقل يوفر اتصالاً موثوقًا ويضمن وصول البيانات بالترتيب؟',
      dhcp: 'جهاز كمبيوتر جديد اتصل بالشبكة ويحتاج للحصول على عنوان IP تلقائيًا. أي بروتوكول سيستخدم؟',
      icmp: 'ما هو البروتوكول الذي تستخدمه أداة "ping" لاختبار الاتصال؟',
      arp: 'جهاز يريد إرسال بيانات لجهاز آخر على نفس الشبكة المحلية، يعرف عنوان IP الخاص به لكنه يحتاج لمعرفة عنوان MAC. ماذا يستخدم؟',
    },
    fields: {
      networkAddress: 'عنوان الشبكة (Network Address)',
      subnetMask: 'قناع الشبكة (Subnet Mask)',
      firstUsable: 'أول عنوان صالح (First Usable)',
      lastUsable: 'آخر عنوان صالح (Last Usable)',
      broadcastAddress: 'عنوان البث (Broadcast Address)',
      numHosts: 'عدد الأجهزة الصالحة',
      cidrLabel: 'قناع CIDR (مثال: /26)',
      wildcard: 'قناع الوايلد كارد (Wildcard Mask)',
    },
    buttons: {
      check: 'تحقق من الإجابة',
      showSolution: 'إظهار الحل',
      hideSolution: 'إخفاء الحل',
      newQuestion: 'سؤال جديد',
    },
    feedback: {
      networkAddress: 'خطأ. تذكر أن عنوان الشبكة ينتج عن عملية AND بين الـ IP والقناع.',
      subnetMask: 'قناع الشبكة غير صحيح لـ CIDR المعطى.',
      firstUsable: 'أول عنوان صالح هو عنوان الشبكة + 1.',
      lastUsable: 'آخر عنوان صالح هو عنوان البث - 1.',
      broadcastAddress: 'عنوان البث هو آخر عنوان في النطاق، وتكون جميع بتات المضيف فيه 1.',
      numberOfHosts: 'تأكد من القانون: 2^(عدد بتات المضيف) - 2.',
      cidr_for_hosts: 'فكر في قوى العدد 2 التي تكفي لتغطية العدد المطلوب + 2 (للشبكة والبث).',
      vlsm_networkAddress: 'عنوان شبكة فرعية خاطئ. تأكد من أنك بدأت بالأقسام الأكبر أولاً.',
      vlsm_cidr: 'قناع CIDR خاطئ لهذا الاحتياج.',
      acl: 'خطأ. تذكر أن ACL تنفذ الأوامر بالترتيب، وتوجد قاعدة رفض ضمني في النهاية.',
      stp: 'خطأ. يتم انتخاب الجسر الجذري بناءً على أقل قيمة أولوية، ثم أقل عنوان MAC في حال التعادل.',
      protocol: 'خطأ. الإجابة الصحيحة هي {answer}.',
    },
    calculator: {
        title: 'حاسبة تقسيم الشبكات',
        subtitle: 'أداة سريعة لحساب تفاصيل أي شبكة. أدخل عنوان IP وقناع CIDR للحصول على النتائج فوراً.',
        calculateButton: 'احسب التفاصيل',
        resultsTitle: 'نتائج تحليل الشبكة:',
        errors: {
            invalidIp: 'يرجى إدخال عنوان IPv4 صحيح (مثال: 192.168.1.1)',
            invalidCidr: 'يرجى إدخال قناع CIDR صحيح بين 0 و 32',
        }
    }
  },
  tricks: {
    title: 'أسرار الحل السريع',
    example: 'مثال',
    card1: {
        title: '1. قاعدة "الأصابع" لحساب الـ CIDR بسرعة',
        p1: 'هل تريد معرفة القناع العشري لـ /26 بدون ورقة وقلم؟ استخدم أصابعك!',
        p2: 'ضع في ذهنك أن كل "أوكتت" (مجموعة) فيه 8 بتات. /26 يعني خلصنا أول 3 مجموعات (8+8+8=24). باقي كم؟ 26 - 24 = 2 بت.',
        example_p1: 'ارفع إصبعين.',
        example_p2: 'تذكر قيمهم: الإصبع الأول بـ 128، الثاني بـ 64.',
        example_p3: 'اجمعهم: 128 + 64 = 192.',
        example_p4: 'القناع هو: 255.255.255.192. سحر! ✨'
    },
    card2: {
        title: '2. سر معرفة "القفزة" (Block Size) في ثواني',
        p1: 'القفزة هي أهم رقم في التقسيم، وهي التي تخبرك أين تبدأ الشبكة التالية.',
        li1: 'إذا كان القناع العشري ينتهي بـ .192 مثلاً.',
        li2: 'القفزة دائمًا = 256 - الرقم الأخير في القناع.',
        p2: 'القفزة = 256 - 192 = 64. شبكاتك هي 0، 64، 128، 192. انتهى!'
    },
    card3: {
        title: '3. الحفظ السريع للمضاعفات (قوى 2)',
        p1: 'هذا الجدول الصغير سيجعلك الأسرع. احفظه مثل اسمك:',
        q1_title: 'كم شبكة فرعية في /26؟',
        q1_formula: 'استلفنا 2 بت فوق الـ /24.',
        q1_result: '4 شبكات',
        q2_title: 'كم جهاز في /26؟',
        q2_formula: 'بقي 6 بتات (32-26).',
        q2_result: '62 جهاز',
        q3_title: 'ما هي القفزة لـ /26 (.192)؟',
        q3_formula: '256 - 192',
        q3_result: 'القفزة 64',
        q4_title: '2^7 (لشبكة /25)؟',
        q4_formula: '128',
        q4_result: '128 (قفزة، أو 126 جهاز)',
        q5_title: '2^5 (لشبكة /27)؟',
        q5_formula: '32',
        q5_result: '32 (قفزة، أو 30 جهاز)',
    },
    card4: {
        title: '4. خدعة "فردي ولا زوجي" للتحقق السريع',
        p1: 'هل تشك إذا كان العنوان 192.168.1.33 هو عنوان شبكة أم لا في تقسيم /27 (قفزة 32)؟',
        rule: 'قاعدة: عناوين الشبكات الفرعية (تقريبًا) دائمًا زوجية. عناوين البث غالبًا فردية.',
        p2: '(باستثناء القفزات الفردية النادرة جداً في الشبكات الضخمة). .33 فردي؟ غالبًا هو أول عنوان جهاز في شبكة تبدأ بـ .32!'
    },
    card5: {
        title: '5. جدول CIDR السحري (للشبكات الصغيرة الشائعة)',
        p1: 'أكثر الشبكات استخداماً في الأسئلة والحياة الواقعية. احفظ هذا السطر وسترتاح:',
    },
    card6: {
        title: '6. القيم المكانية للبتات الثمانية',
        p1: 'ارسم هذا الخط في مخيلتك دائماً عند التحويل:',
        p2: '128 - 64 - 32 - 16 - 8 - 4 - 2 - 1',
        p3: 'تحتاج رقم 10؟ هو 8 + 2 ← يعني 00001010',
        p4: 'تحتاج رقم 224؟ هو 128 + 64 + 32 ← يعني 11100000'
    },
    table: {
        header2: 'القناع الأخير',
        header3: 'الأجهزة الصالحة'
    }
  },
  protocols: {
    title: 'شرح البروتوكولات الأساسية',
    subtitle: 'دليلك السريع لفهم لغة الشبكات. كل بروتوكول مصنف حسب الطبقة التي يعمل فيها في نموذج OSI.',
    layers: {
        application: 'طبقة التطبيقات (Layer 7)',
        transport: 'طبقة النقل (Layer 4)',
        network: 'طبقة الشبكة (Layer 3)',
        data_link: 'طبقة ربط البيانات (Layer 2)',
    },
    http: {
        func: 'تصفح الإنترنت. نقل صفحات الويب (غير مشفر).',
        info: 'يستخدم المنفذ TCP 80.',
    },
    https: {
        func: 'تصفح آمن. نقل صفحات الويب بشكل مشفر.',
        info: 'يستخدم المنفذ TCP 443. يعتمد على SSL/TLS.',
    },
    dns: {
        func: 'تحويل الأسماء (مثل google.com) إلى عناوين IP.',
        info: 'يستخدم المنفذ UDP 53 (للطلبات العادية) و TCP 53 (لنقل المناطق).',
    },
    dhcp: {
        func: 'توزيع عناوين IP وإعدادات الشبكة تلقائيًا للأجهزة.',
        info: 'يستخدم UDP 67 (للخادم) و UDP 68 (للعميل).',
    },
    ftp: {
        func: 'نقل الملفات بين الأجهزة.',
        info: 'يستخدم TCP 20 (للبيانات) و TCP 21 (للتحكم).',
    },
    ssh: {
        func: 'الوصول الآمن عن بعد لإدارة الأجهزة (بديل Telnet المشفر).',
        info: 'يستخدم المنفذ TCP 22.',
    },
    telnet: {
        func: 'الوصول عن بعد لإدارة الأجهزة (غير آمن، يرسل البيانات كنص واضح).',
        info: 'يستخدم المنفذ TCP 23.',
    },
    smtp: {
        func: 'إرسال البريد الإلكتروني بين الخوادم.',
        info: 'يستخدم المنفذ TCP 25.',
    },
    pop3: {
        func: 'استلام البريد الإلكتروني من الخادم (يقوم بتنزيله وحذفه من الخادم عادة).',
        info: 'يستخدم المنفذ TCP 110.',
    },
    imap: {
        func: 'استلام وإدارة البريد الإلكتروني على الخادم (يبقي نسخة على الخادم).',
        info: 'يستخدم المنفذ TCP 143.',
    },
    ntp: {
        func: 'مزامنة الوقت بين أجهزة الشبكة.',
        info: 'يستخدم المنفذ UDP 123. حيوي لتحليل السجلات (Logs).',
    },
    snmp: {
        func: 'مراقبة وإدارة أجهزة الشبكة عن بعد.',
        info: 'يستخدم المنفذ UDP 161 (للاستعلامات) و UDP 162 (للتنبيهات/Traps).',
    },
    syslog: {
        func: 'إرسال رسائل سجل الأحداث (Logs) إلى خادم مركزي.',
        info: 'يستخدم عادة المنفذ UDP 514.',
    },
    tcp: {
        func: 'نقل بيانات موثوق. يضمن الوصول والترتيب (Connection-oriented).',
        info: 'يستخدم "المصافحة الثلاثية" (SYN, SYN-ACK, ACK) لبدء الاتصال. أبطأ من UDP لكنه أدق.',
    },
    udp: {
        func: 'نقل بيانات سريع وغير موثوق (Connectionless). لا يضمن الوصول.',
        info: 'مناسب للبث المباشر، الصوت (VoIP)، والألعاب أونلاين حيث السرعة أهم من دقة كل بايت.',
    },
    ip: {
        func: 'العنونة المنطقية والتوجيه (Routing) للحزم بين الشبكات المختلفة.',
        info: 'بروتوكول غير متصل (Connectionless) ويعمل بأفضل جهد (Best Effort).',
    },
    icmp: {
        func: 'إرسال رسائل الأخطاء والتشخيص (مثل Ping و Traceroute).',
        info: 'يعمل فوق IP مباشرة. لا يستخدم أرقام منافذ.',
    },
    nat: {
        func: 'ترجمة عناوين IP الخاصة إلى عامة (والعكس) للوصول للإنترنت.',
        info: 'يسمح لشبكة كاملة باستخدام عنوان IP عام واحد (عبر PAT).',
    },
    ipsec: {
        func: 'مجموعة بروتوكولات لتأمين اتصالات IP (تشفير، مصادقة).',
        info: 'الأساس لشبكات VPN. يستخدم بروتوكولات مثل AH و ESP.',
    },
    ospf: {
        func: 'بروتوكول توجيه ديناميكي داخلي (IGP) من نوع حالة الارتباط (Link-State).',
        info: 'يستخدم خوارزمية Dijkstra لحساب أقصر مسار. سريع التقارب ويستخدم التكلفة (Cost) كمقياس.',
    },
    eigrp: {
        func: 'بروتوكول توجيه ديناميكي متطور من سيسكو (Advanced Distance Vector).',
        info: 'يستخدم خوارزمية DUAL. يجمع بين سهولة Distance Vector وسرعة Link-State.',
    },
    rip: {
        func: 'بروتوكول توجيه قديم وبسيط من نوع متجه المسافة (Distance Vector).',
        info: 'يستخدم عدد القفزات (Hop Count) كمقياس. أقصى حد 15 قفزة.',
    },
    bgp: {
        func: 'بروتوكول التوجيه الخارجي (EGP) الرئيسي للإنترنت.',
        info: 'يربط بين الأنظمة المستقلة (AS) المختلفة. بطيء ولكنه مستقر جدًا وقابل للتوسع.',
    },
    hsrp: {
        func: 'بروتوكول تكرار البوابة (خاص بسيسكو). يوفر بوابة افتراضية لضمان استمرار الاتصال إذا فشل الراوتر الرئيسي.',
        info: 'يعمل بانتخاب راوتر نشط (Active) وراوتر احتياطي (Standby).',
    },
    ethernet: {
        func: 'تقنية الشبكة المحلية (LAN) الأكثر شيوعًا. تحدد العنونة المادية (MAC) والوصول للوسائط.',
        info: 'تعمل بمعايير IEEE 802.3.',
    },
    arp: {
        func: 'الربط بين عنوان IP (المنطقي) وعنوان MAC (المادي).',
        info: 'يرسل طلب بث "من يملك هذا الـ IP؟" والجهاز المعني يرد بعنوان الـ MAC الخاص به.',
    },
    stp: {
        func: 'منع حلقات التكرار (Loops) في شبكات المحولات (Switches).',
        info: 'يقوم بإيقاف بعض المنافذ احتياطيًا لضمان مسار واحد نشط. (IEEE 802.1D/w/s).',
    },
    vlan_tagging: {
        func: 'تمييز الإطارات التي تنتمي لشبكات VLAN مختلفة عند مرورها عبر رابط Trunk.',
        info: 'يضيف "علامة" (Tag) لإطار الإيثرنت تحتوي على رقم الـ VLAN.',
    },
    ppp: {
        func: 'بروتوكول للروابط المباشرة (WAN Point-to-Point).',
        info: 'يدعم المصادقة (CHAP/PAP) والضغط، ويعمل على وسائط مختلفة (تسلسلي، ألياف).',
    },
    lacp: {
        func: 'تجميع عدة روابط مادية في رابط منطقي واحد لزيادة السرعة والتكرار (EtherChannel).',
        info: 'بروتوكول قياسي (IEEE 802.3ad). البديل الخاص بسيسكو هو PAgP.',
    },
    cdp_lldp: {
        func: 'اكتشاف الأجهزة المجاورة المتصلة مباشرة ومعلوماتها الأساسية.',
        info: 'CDP خاص بسيسكو، و LLDP بروتوكول قياسي مفتوح.',
    },
  },
  ipv6: {
    title: 'شرح IPv6: مستقبل الإنترنت',
    becomes: 'يصبح',
    subnets: 'شبكة فرعية',
    subnet1: 'الشبكة الفرعية 1',
    subnet2: 'الشبكة الفرعية 2',
    subnet3: 'الشبكة الفرعية 3',
    subnetN: 'الشبكة الفرعية {num}',
    lastSubnet: 'الشبكة الفرعية الأخيرة',
    subnetsLookLike: 'كيف تبدو الشبكات الفرعية؟',
    section1: {
        title: '1. لماذا نحتاج IPv6؟',
        p1: 'ببساطة: عناوين IPv4 نفدت! العالم أصبح فيه أجهزة متصلة بالإنترنت أكثر من عدد العناوين المتاحة في الإصدار الرابع (حوالي 4.3 مليار عنوان).',
        p2: 'IPv6 جاء ليحل هذه المشكلة بتوفير عدد هائل لا يكاد يُحصى من العناوين (340 أ undecillion عنوان! رقم أمامه 36 صفرًا).',
        feature1_title: 'مساحة عناوين ضخمة', feature1_desc: '128 بت بدلاً من 32 بت.',
        feature2_title: 'لا حاجة لـ NAT', feature2_desc: 'كل جهاز يمكنه الحصول على عنوان عام حقيقي.',
        feature3_title: 'إعداد تلقائي أسهل', feature3_desc: 'الأجهزة يمكنها إعطاء نفسها عنوانًا تلقائيًا (SLAAC).',
        feature4_title: 'رأس حزمة (Header) أبسط', feature4_desc: 'تحسين كفاءة معالجة الموجهات للحزم.',
    },
    section2: {
        title: '2. كيف يبدو عنوان IPv6؟',
        p1: 'عنوان IPv6 طويل (128 بت)، لذا نكتبه بالنظام السداسي عشري (Hexadecimal) ليكون أقصر قليلاً.',
        p2: 'يتكون من 8 مجموعات، كل مجموعة فيها 4 أرقام/حروف سداسية عشرية، وتفصل بينها نقطتان رأسيتان (:).',
        exampleTitle: 'مثال على عنوان كامل:',
    },
    section3: {
        title: '3. قواعد اختصار العنوان (مهم جداً!)',
        p1: 'لأن العنوان طويل، هناك قاعدتان لتبسيطه:',
        rule1_title: 'القاعدة 1: حذف الأصفار البادئة',
        rule1_desc: 'في أي مجموعة، يمكنك حذف الأصفار التي على اليسار فقط.',
        rule1_example: 'بعد تطبيق القاعدة 1:',
        rule2_title: 'القاعدة 2: الأصفار المتتالية (::)',
        rule2_desc: 'يمكنك استبدال مجموعة أو أكثر من المجموعات المتتالية التي تحتوي على أصفار فقط بنقطتين مزدوجتين (::).',
        rule2_note: 'تحذير: يمكن استخدام (::) مرة واحدة فقط في العنوان!',
        rule2_example: 'بعد تطبيق القاعدة 2:',
        finalForm: 'الشكل النهائي المختصر',
    },
    section4: {
        title: '4. أنواع عناوين IPv6 المهمة',
        p1: 'مثلما يوجد في IPv4 عناوين خاصة وعامة، IPv6 لديه أنواع مخصصة:',
        gua_desc: 'هو العنوان العام (Public IP) الذي تستخدمه على الإنترنت. يجب أن يكون فريدًا عالميًا. يبدأ عادة بـ 2000::/3 (يعني أول رقم يكون 2 أو 3).',
        prefix: 'البادئة الشائعة',
        ula_desc: 'يشبه العناوين الخاصة (Private IP) في IPv4. يستخدم داخل الشبكات المحلية فقط ولا يوجه عبر الإنترنت.',
        lla_desc: 'عنوان إلزامي لكل واجهة IPv6! يستخدم للتواصل فقط مع الأجهزة المتصلة بنفس الرابط (نفس الكابل أو الشبكة المحلية). الراوترات لا تمرره أبداً.',
    },
    section5: {
        title: '5. تقسيم الشبكات في IPv6 (أسهل مما تتخيل!)',
        p1: 'التقسيم في IPv6 أبسط بكثير لأننا لا نهتم "بالحفاظ على العناوين". لدينا وفرة!',
        p2: 'عادةً، يعطيك مزود الخدمة بادئة /48. هذا يترك لك 16 بت كاملة لإنشاء شبكات فرعية.',
        networkPrefix: 'بادئة التوجيه العالمي', networkPrefix_desc: 'أول 48 بت (يعطيها لك مزود الخدمة).',
        interfaceId: 'معرف الواجهة (Interface ID)', interfaceId_desc: 'آخر 64 بت (للجهاز نفسه).',
        scenario_p1: 'تخيل أن شركتك حصلت على البادئة:',
        scenario_p2: 'الجزء المخصص لك للتقسيم (Subnet ID) هو الـ 16 بت التالية (الرابع مجموعة).',
        scenario_p3: 'كم شبكة فرعية يمكنك إنشاؤها؟',
        scenario_p4: 'كل واحدة من هذه الشبكات تتسع لـ 18 كوينتيليون جهاز (/64)!',
        table: {
            header1: 'Global Routing Prefix (/48)',
            header2: 'Subnet ID (16 bit)',
            header3: 'Interface ID (64 bit)',
            desc1: 'ثابت من مزود الخدمة',
            desc2: 'هنا نغير الأرقام لإنشاء شبكات فرعية (من 0000 إلى FFFF)',
            desc3: 'عنوان الجهاز نفسه',
        },
        conclusion: 'التقسيم في IPv6 هو مجرد عد بالنظام السداسي عشري في خانة Subnet ID. لا حاجة لحسابات معقدة للقفزات أو الأقنعة الغريبة!',
    }
  },
  commands: {
    title: 'قائمة أوامر الشبكات الشائعة',
    subtitle: 'مرجع سريع لأهم الأوامر التي ستحتاجها في أنظمة التشغيل المختلفة (Windows/Linux) وعلى أجهزة سيسكو (IOS).',
    setupSteps: 'خطوات الإعداد',
    exampleOutput: 'مثال للمخرجات',
    os: {
        groupTitle: 'أوامر أنظمة التشغيل (Windows / Linux / macOS)',
        ping: { desc: 'اختبار الاتصال بجهاز آخر عن طريق إرسال رسائل صدى (ICMP Echo). يقيس وقت الاستجابة ويعرفك إذا كان الجهاز البعيد متاحًا.' },
        tracert: { desc: 'تتبع المسار الذي تسلكه الحزمة للوصول إلى وجهة معينة. يظهر لك كل موجه (Router) تمر به البيانات في طريقها.' },
        ipconfig: { desc: 'عرض إعدادات الشبكة الحالية لجهازك (عنوان IP، قناع الشبكة، البوابة الافتراضية). في Linux/macOS استخدم `ifconfig` أو `ip a`.' },
        nslookup: { desc: 'الاستعلام عن نظام أسماء النطاقات (DNS). يعطيك عنوان IP المقابل لاسم موقع (مثل google.com) أو العكس.' },
    },
    ios: {
        groupTitle: 'أوامر أجهزة سيسكو (Cisco IOS)',
        basic_group: 'الإعدادات الأساسية',
        router_adv_group: 'إعدادات الراوتر المتقدمة',
        wan_group: 'تقنيات الشبكات الواسعة (WAN)',
        nat_group: 'ترجمة عناوين الشبكة (NAT)',
        routing_group: 'بروتوكولات التوجيه (Routing)',
        acl_group: 'قوائم التحكم في الوصول (ACLs)',
        switch_adv_group: 'إعدادات المحول المتقدمة',
        discovery_group: 'بروتوكولات الاستكشاف',
        show_group: 'أوامر التحقق والعرض (Show)',
        helper_group: 'أوامر مساعدة مفيدة',

        first_setup: {
            title: 'إعداد الراوتر الأولي (First-Time Setup)',
            desc: 'التسلسل الكامل لأول مرة تقوم فيها بتشغيل موجه جديد: تعيين الاسم، تأمين كلمات المرور، وتفعيل الإدارة.',
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
            title: 'أوامر الإعداد المشتركة (Router & Switch)',
            desc: 'الأوامر الأساسية التي تستخدم على كل من الموجهات والمحولات لضبط الاسم وكلمات المرور.',
            example: `hostname Device1
enable secret class
line console 0
 password cisco
 login
service password-encryption`
        },
        save_config: {
            title: 'حفظ الإعدادات',
            desc: 'حفظ التغييرات من الذاكرة المؤقتة (RAM) إلى الذاكرة الدائمة (NVRAM) لكي لا تفقدها عند إعادة التشغيل.',
        },
        router_interfaces: {
            title: 'إعداد واجهات الراوتر',
            desc: 'تكوين عنوان IP وتفعيل المنفذ على الراوتر. خطوة ضرورية ليعمل الراوتر.',
            example: `R1(config)# interface g0/0/1
R1(config-if)# description Connected to LAN
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# no shutdown`
        },
        router_on_stick: {
            title: 'Router-on-a-Stick (Inter-VLAN)',
            desc: 'تكوين واجهات فرعية (Subinterfaces) على الراوتر للسماح بالتوجيه بين شبكات VLAN مختلفة.',
            example: `R1(config)# interface g0/0/1.10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0
R1(config)# interface g0/0/1.20
R1(config-subif)# encapsulation dot1Q 20
R1(config-subif)# ip address 192.168.20.1 255.255.255.0`
        },
        ppp_auth: {
            title: 'إعداد PPP مع مصادقة CHAP',
            desc: 'تكوين بروتوكول PPP على رابط تسلسلي مع تفعيل المصادقة الآمنة CHAP.',
            example: `! On Router 1 (R1)
R1(config)# username R2 password cisco_secure
R1(config)# interface serial 0/1/0
R1(config-if)# encapsulation ppp
R1(config-if)# ppp authentication chap`
        },
        frame_relay: {
            title: 'إعداد Frame Relay (نقطة لنقطة)',
            desc: 'تكوين اتصال Frame Relay القديم باستخدام واجهات فرعية.',
            example: `R1(config)# interface serial 0/1/0
R1(config-if)# encapsulation frame-relay
R1(config-if)# no shutdown
R1(config)# interface serial 0/1/0.102 point-to-point
R1(config-subif)# ip address 10.1.1.1 255.255.255.252
R1(config-subif)# frame-relay interface-dlci 102`
        },
        static_routes: {
            title: 'المسارات الثابتة (Static Routes)',
            desc: 'تعريف مسار يدويًا إلى شبكة بعيدة. الصيغة: ip route [الشبكة الوجهة] [القناع] [القفزة التالية أو واجهة الخروج].',
            example: `! Default route (لأي شبكة غير معروفة)
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2
! Specific route (لشبكة محددة)
R1(config)# ip route 192.168.20.0 255.255.255.0 Serial0/1/0`
        },
        ripv2: {
            title: 'إعداد RIPv2',
            desc: 'تكوين بروتوكول التوجيه البسيط RIP الإصدار الثاني.',
            example: `R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# no auto-summary
R1(config-router)# network 192.168.10.0`
        },
        ospf: {
            title: 'إعداد OSPF (منطقة واحدة)',
            desc: 'تكوين بروتوكول OSPF القوي. يتطلب تحديد معرف العملية (Process ID) والمنطقة (Area).',
            example: `R1(config)# router ospf 10
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.10.0 0.0.0.255 area 0
R1(config-router)# passive-interface g0/0/1`
        },
        eigrp: {
            title: 'إعداد EIGRP',
            desc: 'تكوين بروتوكول EIGRP الخاص بسيسكو. يجب أن يتطابق رقم النظام المستقل (AS Number) على جميع الموجهات.',
            example: `R1(config)# router eigrp 100
R1(config-router)# no auto-summary
R1(config-router)# network 192.168.10.0
R1(config-router)# network 10.0.0.0`
        },
        std_acl: {
            desc: 'قائمة تحكم بسيطة تعتمد على عنوان المصدر فقط. الأرقام من 1-99.',
            example: `! السماح لجهاز واحد فقط ورفض الباقي
R1(config)# access-list 10 permit host 192.168.10.5
! تطبيقها على الواجهة (تجاه الخارج)
R1(config)# interface g0/0/1
R1(config-if)# ip access-group 10 out`
        },
        ext_acl: {
            desc: 'قائمة تحكم متقدمة تحدد المصدر، الوجهة، البروتوكول، والمنفذ. الأرقام من 100-199.',
            example: `! السماح بتصفح الويب فقط من شبكة معينة
R1(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 any eq 80
R1(config)# access-list 100 permit tcp 192.168.10.0 0.0.0.255 any eq 443
! تطبيقها على الواجهة (تجاه الداخل من الشبكة المحلية)
R1(config)# interface g0/0/0
R1(config-if)# ip access-group 100 in`
        },
        named_acl: {
            desc: 'استخدام الأسماء بدلاً من الأرقام للقوائم، وهو أسهل في الإدارة.',
            example: `R1(config)# ip access-list extended BLOCK_SOCIAL
R1(config-ext-nacl)# deny tcp any host 10.5.5.5 eq 80
R1(config-ext-nacl)# permit ip any any`
        },
        static_nat: {
            desc: 'ربط عنوان خاص واحد بعنوان عام واحد بشكل دائم (للخوادم).',
            example: `R1(config)# ip nat inside source static 192.168.10.10 209.165.200.225
! لا تنس تحديد الواجهات الداخلية والخارجية
R1(config)# interface g0/0/0
R1(config-if)# ip nat inside`
        },
        dyn_nat: {
            desc: 'PAT (Overload): السماح لشبكة كاملة باستخدام عنوان عام واحد للوصول للإنترنت.',
            example: `! 1. تحديد العناوين المسموح لها بالخروج
R1(config)# access-list 1 permit 192.168.0.0 0.0.255.255
! 2. تفعيل PAT على الواجهة الخارجية
R1(config)# ip nat inside source list 1 interface serial0/1/0 overload`
        },
        switch_ip: {
            title: 'إعداد IP لإدارة المحول (SVI)',
            desc: 'إعطاء المحول عنوان IP لكي تتمكن من إدارته عن بعد (SSH/Telnet).',
            example: `SW1(config)# interface vlan 1
SW1(config-if)# ip address 192.168.1.2 255.255.255.0
SW1(config-if)# no shutdown
SW1(config)# ip default-gateway 192.168.1.1`
        },
        vlan_trunk: {
            title: 'إعداد VLAN و Trunk',
            desc: 'إنشاء شبكات افتراضية (VLANs) وتكوين الروابط بين المحولات لتمريرها (Trunk).',
            example: `! إنشاء VLAN
SW1(config)# vlan 10
SW1(config-vlan)# name Sales
! تعيين منفذ لـ VLAN
SW1(config)# interface fa0/5
SW1(config-if)# switchport mode access
SW1(config-if)# switchport access vlan 10
! إعداد منفذ Trunk
SW1(config)# interface g0/1
SW1(config-if)# switchport mode trunk`
        },
        port_security: {
            title: 'أمان المنافذ (Port Security)',
            desc: 'تقييد عدد الأجهزة التي يمكنها الاتصال بمنفذ معين بناءً على عنوان MAC.',
            example: `SW1(config-if)# switchport mode access
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 1
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# switchport port-security violation shutdown`
        },
        vtp: {
            title: 'VTP (VLAN Trunking Protocol)',
            desc: 'بروتوكول لنشر إعدادات VLAN تلقائيًا بين محولات سيسكو. (استخدمه بحذر!)',
            example: `SW1(config)# vtp domain CCNA_LAB
SW1(config)# vtp mode server
SW1(config)# vtp password cisco`
        },
        stp_etherchannel: {
            title: 'STP و EtherChannel',
            desc: 'تعديل بروتوكول الشجرة الممتدة وتجميع الروابط (LACP).',
            example: `! جعل هذا المحول هو الجذر لـ VLAN 1
SW1(config)# spanning-tree vlan 1 root primary
! تكوين EtherChannel (LACP)
SW1(config)# interface range fa0/1 - 2
SW1(config-if-range)# channel-group 1 mode active`
        },
        cdp_settings: {
            title: 'إعدادات CDP/LLDP',
            desc: 'تفعيل أو تعطيل بروتوكولات استكشاف الجيران.',
            example: `! تعطيل CDP على جهاز كامل
R1(config)# no cdp run
! تفعيل LLDP (البديل القياسي)
R1(config)# lldp run`
        },
        show_general: {
            title: 'أوامر Show عامة وهامة',
            desc: 'أوامر لا غنى عنها لمعرفة حالة الجهاز وتشخيص المشاكل.',
        },
        show_ip_route: { desc: 'عرض جدول التوجيه. أهم أمر للراوتر.' },
        show_ospf: { desc: 'التحقق من جيران OSPF وإعداداته.' },
        show_eigrp: { desc: 'التحقق من جيران EIGRP وجدول الطوبولوجيا.' },
        show_switch: {
            title: 'أوامر Show للمحولات',
            desc: 'للتحقق من VLANs، ومنافذ Trunk، و STP.',
        },
        show_mac: { desc: 'عرض جدول عناوين MAC الذي بناه المحول.' },
        show_cdp: { desc: 'معرفة الأجهزة المتصلة مباشرة (نوعها، اسمها، عناوين IPها).' },
        show_wan: {
            desc: 'التحقق من حالة الواجهات التسلسلية وبروتوكولات WAN.',
            example: `show interfaces serial 0/1/0
show frame-relay map
show ppp multilink`
        },
        alias: { desc: 'إنشاء اختصارات للأوامر الطويلة لتسريع العمل.' },
        debug: { desc: 'عرض عمليات الراوتر في الوقت الفعلي. (تحذير: قد يبطئ الجهاز!). استخدم `undebug all` لإيقافه.' },
    }
  }
};