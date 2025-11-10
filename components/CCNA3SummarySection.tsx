import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
}

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-950 border border-gray-700 rounded-md p-4 my-2 text-left dir-ltr text-cyan-300 font-mono text-sm overflow-x-auto">
        <code>{children}</code>
    </pre>
);

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, setIsOpen }) => (
    <div className="border border-gray-700 rounded-lg overflow-hidden mb-4">
        <button
            onClick={setIsOpen}
            className="w-full text-right p-5 bg-gray-900 hover:bg-gray-950 flex justify-between items-center transition-colors"
        >
            <h3 className="text-xl font-semibold text-cyan-400">{title}</h3>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
        </button>
        <div className={`transition-all duration-500 ease-in-out overflow-y-auto ${isOpen ? 'max-h-[70vh] visible' : 'max-h-0 invisible'}`}>
             <div className="p-6 text-gray-300 leading-loose space-y-6 border-t border-gray-700">
                {children}
            </div>
        </div>
    </div>
);

const Chapter1: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: خصائص OSPF</h4>
            <p>
                بروتوكول OSPF (Open Shortest Path First) هو بروتوكول توجيه من نوع <strong className="text-cyan-400">حالة الارتباط (Link-State)</strong>. على عكس بروتوكولات متجه المسافة (مثل RIP)، لا يتبادل الموجهات جداول التوجيه الكاملة، بل تتبادل معلومات حول حالة روابطها (Link States). كل موجه يبني صورة كاملة لطوبولوجيا الشبكة ويحسب أفضل مسار بشكل مستقل باستخدام خوارزمية Dijkstra.
            </p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">بروتوكول قياسي مفتوح:</strong> يعمل على أجهزة من مختلف الشركات المصنعة.</li>
                <li><strong className="text-cyan-400">يستخدم التكلفة (Cost) كمقياس:</strong> التكلفة تعتمد بشكل عكسي على عرض النطاق الترددي (Bandwidth) للرابط، مما يعني أن الروابط الأسرع لها تكلفة أقل وتكون مفضلة.</li>
                <li><strong className="text-cyan-400">تقارب سريع (Fast Convergence):</strong> عند حدوث تغيير في الشبكة، يتم إرسال تحديثات محفزة على الفور، مما يسمح للموجهات بتحديث طوبولوجيا الشبكة بسرعة.</li>
                <li><strong className="text-cyan-400">يدعم VLSM والتوجيه غير الصنفي (Classless):</strong> يرسل قناع الشبكة مع تحديثات التوجيه.</li>
                <li><strong className="text-cyan-400">تصميم هرمي (Hierarchical):</strong> يستخدم مفهوم المناطق (Areas) لتقسيم الشبكات الكبيرة، مما يقلل من حجم جداول التوجيه وعبء المعالجة.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">آلية عمل OSPF</h4>
            <p>يمر OSPF بخمس خطوات رئيسية لبناء جدول التوجيه:</p>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-yellow-400">إقامة علاقات الجوار (Neighbor Adjacencies):</strong> ترسل الموجهات حزم <strong className="text-cyan-400">Hello</strong> على واجهاتها لتبادل المعلومات واكتشاف الجيران على نفس الرابط.</li>
                <li><strong className="text-yellow-400">تبادل إعلانات حالة الارتباط (LSAs):</strong> بعد إقامة علاقة الجوار، تتبادل الموجهات <strong className="text-cyan-400">LSAs (Link-State Advertisements)</strong>، وهي حزم صغيرة تحتوي على معلومات حول روابط الموجه وحالتها.</li>
                <li><strong className="text-yellow-400">بناء قاعدة بيانات حالة الارتباط (LSDB):</strong> يقوم كل موجه بتجميع كل LSAs التي يستلمها في قاعدة بيانات تسمى <strong className="text-cyan-400">LSDB (Link-State Database)</strong>. في منطقة واحدة، يجب أن تكون LSDB متطابقة على جميع الموجهات.</li>
                <li><strong className="text-yellow-400">تنفيذ خوارزمية SPF:</strong> يقوم كل موجه بتشغيل خوارزمية <strong className="text-cyan-400">Dijkstra's SPF (Shortest Path First)</strong> على LSDB الخاصة به لإنشاء شجرة SPF، والتي تمثل أفضل مسار خالٍ من الحلقات إلى كل وجهة.</li>
                <li><strong className="text-yellow-400">اختيار أفضل المسارات:</strong> يتم إدراج أفضل المسارات من شجرة SPF في <strong className="text-cyan-400">جدول التوجيه (Routing Table)</strong>.</li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">حزم OSPF</h4>
            <p>يستخدم OSPF أنواعًا مختلفة من الحزم لإدارة عملياته، كلها مغلفة مباشرة في حزم IP:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Type 1 (Hello Packet):</strong> لاكتشاف الجيران والحفاظ على علاقات الجوار.</li>
                <li><strong>Type 2 (Database Description - DBD):</strong> لوصف محتويات LSDB بشكل موجز أثناء المزامنة.</li>
                <li><strong>Type 3 (Link-State Request - LSR):</strong> لطلب LSAs محددة من جار.</li>
                <li><strong>Type 4 (Link-State Update - LSU):</strong> لإرسال LSAs المطلوبة.</li>
                <li><strong>Type 5 (Link-State Acknowledgment - LSAck):</strong> لتأكيد استلام LSU.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">معرف الموجه (Router ID)</h4>
            <p>
                معرف الموجه (RID) هو عنوان IP فريد مكون من 32 بت يُستخدم لتعريف كل موجه OSPF بشكل فريد. إنه ضروري لعمل البروتوكول. يتم تحديد RID تلقائيًا بواسطة الموجه باستخدام التسلسل الهرمي التالي:
            </p>
             <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                 <li><strong className="text-green-400">الأولوية الأولى:</strong> استخدام المعرف الذي تم تكوينه يدويًا باستخدام الأمر <code className="text-yellow-400 font-mono">router-id [id]</code>. (الطريقة الموصى بها).</li>
                 <li><strong className="text-orange-400">الأولوية الثانية:</strong> إذا لم يتم تكوينه يدويًا، يتم استخدام <strong className="text-yellow-400">أعلى عنوان IP لواجهة loopback نشطة</strong>.</li>
                 <li><strong className="text-red-400">الأولوية الثالثة:</strong> إذا لم تكن هناك واجهات loopback، يتم استخدام <strong className="text-yellow-400">أعلى عنوان IP لواجهة مادية نشطة</strong>.</li>
            </ol>
             <p className="mt-2"><strong className="text-cyan-400">ملاحظة:</strong> بمجرد تحديد RID، فإنه لا يتغير حتى يتم إعادة تشغيل عملية OSPF (باستخدام الأمر <code className="text-yellow-400 font-mono">clear ip ospf process</code>) أو إعادة تشغيل الموجه.</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الأول (CCNA 3)</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو نوع بروتوكول التوجيه OSPF، وما هي الخوارزمية التي يستخدمها لحساب أفضل مسار؟</li>
                <li>ما هي قطعة المعلومات الأساسية التي يتبادلها موجهات OSPF لبناء صورة الطوبولوجيا؟</li>
                <li>ما هو الغرض من حزمة OSPF Hello؟</li>
                <li>صف التسلسل الهرمي الذي يستخدمه موجه OSPF لتحديد معرف الموجه (Router ID) الخاص به.</li>
                <li>ماذا يجب أن تكون حالة قاعدة بيانات حالة الارتباط (LSDB) لجميع الموجهات داخل منطقة OSPF واحدة؟</li>
            </ol>
        </section>
    </>
);

const Chapter2: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: تكوين OSPF الأساسي</h4>
            <p>
                يركز هذا الفصل على الأوامر العملية لتفعيل وتكوين OSPFv2 في شبكة ذات منطقة واحدة (Single-Area). التكوين الأساسي بسيط نسبيًا ولكنه قوي جدًا.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أوامر التكوين الأساسية</h4>
            <CodeBlock>
{`! 1. Enter OSPF router configuration mode
! The process ID (e.g., 10) is locally significant and can be different on each router
R1(config)# router ospf 10

! 2. (Recommended) Manually configure the Router ID
! This ensures stability and predictability
R1(config-router)# router-id 1.1.1.1

! 3. Use the 'network' command to enable OSPF on interfaces and advertise networks
! Syntax: network [ip-address] [wildcard-mask] area [area-id]
! This command enables OSPF on any interface with an IP in the 10.1.1.0/24 range
R1(config-router)# network 10.1.1.0 0.0.0.255 area 0`}
            </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">فهم قناع الوايلد كارد (Wildcard Mask)</h4>
            <p>
                على عكس قناع الشبكة الفرعية، يعمل قناع الوايلد كارد بشكل عكسي.
            </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">الصفر (0):</strong> يعني "يجب أن يتطابق".</li>
                <li><strong className="text-cyan-400">الواحد (1):</strong> يعني "لا يهمني".</li>
            </ul>
             <p><strong className="text-yellow-400">مثال:</strong> <code className="font-mono">10.1.1.0 0.0.0.255</code> تعني "تطابق مع أي عنوان IP يبدأ بـ 10.1.1".</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقياس التكلفة (Cost)</h4>
            <p>
                يستخدم OSPF التكلفة كمقياس. <strong className="text-cyan-400">التكلفة الأقل هي الأفضل</strong>. يتم حسابها تلقائيًا بناءً على عرض النطاق الترددي للواجهة، ولكن يمكن تعديلها يدويًا.
            </p>
            <p><strong className="text-cyan-400">الصيغة:</strong> <code className="font-mono">Cost = Reference Bandwidth / Interface Bandwidth</code></p>
            <CodeBlock>
{`! The default reference bandwidth is 100 Mbps. For modern networks, this should be increased.
! This command should be applied on ALL routers for consistency.
R1(config-router)# auto-cost reference-bandwidth 1000

! Manually setting the cost on a specific interface
R1(config)# interface Serial0/1/0
R1(config-if)# ip ospf cost 1562`}
            </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">التحقق من OSPF</h4>
             <ul className="list-disc list-inside space-y-2">
                <li><code className="text-yellow-400 font-mono">show ip ospf neighbor</code>: يعرض جيران OSPF وحالة علاقة الجوار (يجب أن تكون FULL).</li>
                <li><code className="text-yellow-400 font-mono">show ip protocols</code>: يعرض معلومات حول بروتوكولات التوجيه التي تعمل على الموجه.</li>
                <li><code className="text-yellow-400 font-mono">show ip ospf interface</code>: يعرض معلومات OSPF الخاصة بالواجهات.</li>
                <li><code className="text-yellow-400 font-mono">show ip route ospf</code>: يعرض مسارات OSPF فقط في جدول التوجيه.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثاني</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الغرض من رقم العملية (Process ID) في أمر `router ospf 10`؟ هل يجب أن يتطابق على جميع الموجهات؟</li>
                <li>ماذا يعني قناع الوايلد كارد `0.0.0.0`؟</li>
                <li>ما الأمر الذي تستخدمه للتحقق من أن موجّهين OSPF قد شكلا علاقة جوار كاملة؟</li>
                <li>لماذا من المهم تعديل `auto-cost reference-bandwidth` في الشبكات الحديثة؟</li>
                <li>كيف يمكنك منع OSPF من إرسال حزم Hello عبر واجهة معينة؟</li>
            </ol>
        </section>
    </>
);

const Chapter3: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: مفاهيم أمان الشبكات</h4>
            <p>
                يركز هذا الفصل على فهم مشهد التهديدات الحالي، من هم المهاجمون، وما هي نقاط الضعف التي يستغلونها. فهم هذه المفاهيم هو الخطوة الأولى نحو بناء دفاعات فعالة.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">المهاجمون (Threat Actors)</h4>
            <p>يمكن تصنيف المهاجمين إلى فئات مختلفة بناءً على دوافعهم ومستوى مهارتهم:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Script Kiddies:</strong> مبتدئون يستخدمون أدوات وقوالب جاهزة لشن هجمات دون فهم عميق.</li>
                <li><strong className="text-cyan-400">Hacktivists:</strong> يخترقون الأنظمة لأسباب سياسية أو اجتماعية.</li>
                <li><strong className="text-cyan-400">Cybercriminals:</strong> مجرمون دوافعهم مالية بحتة (سرقة بيانات، برامج الفدية).</li>
                <li><strong className="text-cyan-400">State-Sponsored Hackers:</strong> يعملون لصالح حكومات لسرقة أسرار أو التجسس أو تخريب البنية التحتية.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">نقاط الضعف الشائعة</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-yellow-400">نقاط ضعف تكنولوجية:</strong> ثغرات في البروتوكولات (TCP/IP)، أنظمة التشغيل، أو أجهزة الشبكة.</li>
                <li><strong className="text-yellow-400">نقاط ضعف في التكوين:</strong> إعدادات غير آمنة، كلمات مرور افتراضية، حسابات غير مستخدمة.</li>
                <li><strong className="text-yellow-400">نقاط ضعف في السياسات الأمنية:</strong> عدم وجود سياسات واضحة أو عدم تطبيقها.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">البرامج الضارة (Malware)</h4>
            <p>برامج مصممة لإحداث ضرر أو سرقة معلومات. الأنواع تشمل الفيروسات، الديدان، أحصنة طروادة، برامج الفدية (Ransomware)، وبرامج التجسس (Spyware).</p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">هجمات الشبكات الشائعة</h4>
            <p>تنقسم الهجمات عادة إلى ثلاث فئات:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Reconnaissance Attacks (هجمات الاستطلاع):</strong> جمع المعلومات عن الهدف (فحص المنافذ، Ping sweeps).</li>
                <li><strong className="text-cyan-400">Access Attacks (هجمات الوصول):</strong> محاولة الوصول غير المصرح به (تخمين كلمات المرور، استغلال الثغرات، الهندسة الاجتماعية).</li>
                <li><strong className="text-cyan-400">Denial-of-Service (DoS) Attacks (هجمات الحرمان من الخدمة):</strong> جعل الخدمة غير متاحة للمستخدمين الشرعيين.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثالث</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الدافع الرئيسي لمجرمي الإنترنت (Cybercriminals)؟</li>
                <li>ما الفرق بين الفيروس والدودة من حيث آلية الانتشار؟</li>
                <li>ما هو الهدف من هجوم الاستطلاع؟ أعط مثالاً.</li>
                <li>ماذا يعني مصطلح "الهندسة الاجتماعية" في سياق أمن المعلومات؟</li>
                <li>ما هو الهدف من هجوم DoS؟</li>
            </ol>
        </section>
    </>
);

const Chapter4: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي قائمة التحكم في الوصول (ACL)؟</h4>
            <p>
                قائمة التحكم في الوصول (Access Control List - ACL) هي سلسلة من الأوامر التي تحدد <strong className="text-cyan-400">ما هي أنواع حركة المرور التي يُسمح لها بالمرور وما هي التي يجب حظرها</strong>. تعمل كمرشح (فلتر) على واجهات الموجه.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">كيف تعمل قوائم التحكم في الوصول؟</h4>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">معالجة تسلسلية:</strong> تتم معالجة الأوامر في القائمة من الأعلى إلى الأسفل.</li>
                <li><strong className="text-cyan-400">توقف عند أول تطابق:</strong> بمجرد أن تتطابق الحزمة مع أحد الشروط في القائمة، يتم تنفيذ الإجراء (permit أو deny) ويتوقف البحث.</li>
                <li><strong className="text-cyan-400">رفض ضمني في النهاية (Implicit Deny):</strong> يوجد أمر <code className="font-mono">deny any</code> غير مرئي في نهاية كل قائمة. هذا يعني أن أي حركة مرور لا تتطابق بشكل صريح مع أمر <code className="font-mono">permit</code> سيتم رفضها.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع قوائم التحكم في الوصول</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-green-400">Standard ACLs (قياسية)</h5>
                    <p className="text-sm mt-2">
                        بسيطة. تقوم بالتصفية بناءً على <strong className="text-yellow-400">عنوان IP المصدر فقط</strong>.
                        <br/><br/>
                        <strong className="text-cyan-400">القاعدة العامة:</strong> ضعها في أقرب مكان ممكن من الوجهة.
                    </p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-orange-400">Extended ACLs (موسعة)</h5>
                    <p className="text-sm mt-2">
                        متقدمة. تقوم بالتصفية بناءً على معايير متعددة: <strong className="text-yellow-400">IP المصدر، IP الوجهة، البروتوكول (TCP/UDP)، والمنافذ</strong>.
                         <br/><br/>
                       <strong className="text-cyan-400">القاعدة العامة:</strong> ضعها في أقرب مكان ممكن من المصدر.
                    </p>
                </div>
            </div>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">قناع الوايلد كارد (Wildcard Mask) في قوائم التحكم</h4>
            <p>يُستخدم قناع الوايلد كارد مع عنوان IP لتحديد نطاق من العناوين.</p>
             <ul className="list-disc list-inside space-y-2">
                <li><code className="text-yellow-400 font-mono">host 192.168.1.1</code>  تكافئ  <code className="text-yellow-400 font-mono">192.168.1.1 0.0.0.0</code> (تطابق هذا المضيف بالضبط).</li>
                <li><code className="text-yellow-400 font-mono">any</code>  تكافئ  <code className="text-yellow-400 font-mono">0.0.0.0 255.255.255.255</code> (تطابق أي عنوان).</li>
                <li><code className="text-yellow-400 font-mono">192.168.1.0 0.0.0.255</code> تعني "تطابق أي شيء يبدأ بـ 192.168.1".</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الرابع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ماذا يحدث لحزمة لا تتطابق مع أي شرط في قائمة التحكم بالوصول؟</li>
                <li>ما هو الفرق الرئيسي بين قائمة التحكم القياسية والموسعة من حيث معايير التصفية؟</li>
                <li>أين يجب وضع قائمة التحكم القياسية بشكل عام؟ ولماذا؟</li>
                <li>ماذا يعني قناع الوايلد كارد `0.0.0.0`؟</li>
                <li>لماذا يجب وضع الشروط الأكثر تحديدًا في بداية قائمة التحكم بالوصول؟</li>
            </ol>
        </section>
    </>
);

const Chapter5: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: تطبيق قوائم التحكم</h4>
            <p>
                يركز هذا الفصل على الأوامر الفعلية لتكوين قوائم التحكم في الوصول القياسية والموسعة على موجهات سيسكو وتطبيقها على الواجهات لتصفية حركة المرور.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين قوائم التحكم القياسية (Standard ACLs)</h4>
            <p>تستخدم أرقامًا من 1 إلى 99 أو أسماء.</p>
            <h5 className="font-bold text-lg text-white mt-4">مثال: السماح لشبكة معينة ورفض الباقي</h5>
            <CodeBlock>
{`! Scenario: Allow traffic from 192.168.10.0/24 network only.

! 1. Create the numbered standard ACL
R1(config)# access-list 10 permit 192.168.10.0 0.0.0.255
! The 'deny any' is implicit but can be added for clarity
! R1(config)# access-list 10 deny any

! 2. Apply the ACL to an interface
! Apply it outbound on the interface leading to the destination
R1(config)# interface g0/0/1
R1(config-if)# ip access-group 10 out`}
            </CodeBlock>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين قوائم التحكم الموسعة (Extended ACLs)</h4>
            <p>تستخدم أرقامًا من 100 إلى 199 أو أسماء.</p>
            <h5 className="font-bold text-lg text-white mt-4">مثال: السماح بحركة مرور الويب والـ ICMP فقط</h5>
            <CodeBlock>
{`! Scenario: Allow network 192.168.10.0/24 to browse the web (HTTP/HTTPS)
! and use ping (ICMP) to any destination. Deny everything else.

! 1. Create the named extended ACL
R1(config)# ip access-list extended WEB-AND-ICMP-ONLY

! 2. Add permit statements for specific traffic
R1(config-ext-nacl)# permit tcp 192.168.10.0 0.0.0.255 any eq 80
R1(config-ext-nacl)# permit tcp 192.168.10.0 0.0.0.255 any eq 443
R1(config-ext-nacl)# permit icmp 192.168.10.0 0.0.0.255 any

! 3. Apply the ACL to an interface
! Apply it inbound on the interface where the source traffic enters the router
R1(config)# interface g0/0/0
R1(config-if)# ip access-group WEB-AND-ICMP-ONLY in`}
            </CodeBlock>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تأمين الوصول إلى VTY</h4>
            <p>يمكن استخدام قوائم التحكم القياسية لتحديد من يمكنه الوصول إلى الموجه عن بعد عبر Telnet/SSH.</p>
            <CodeBlock>
{`! Scenario: Only allow administrators from the 192.168.200.0/24 network
! to manage this router.

! 1. Create a standard ACL to permit the admin network
R1(config)# access-list 22 permit 192.168.200.0 0.0.0.255

! 2. Apply the ACL to the VTY lines
R1(config)# line vty 0 4
R1(config-line)# access-class 22 in`}
            </CodeBlock>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الخامس</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الأمر المستخدم لتطبيق قائمة تحكم بالوصول على واجهة؟</li>
                <li>ما الفرق بين الكلمة المفتاحية `in` و `out` عند تطبيق قائمة التحكم؟</li>
                <li>ما هو الأمر الذي تستخدمه لتحديد المنفذ 80 (HTTP) في قائمة تحكم موسعة؟</li>
                <li>لماذا تعتبر قوائم التحكم المسماة (Named ACLs) أفضل من المرقمة (Numbered ACLs)؟</li>
                <li>ما هو الأمر الذي تستخدمه لربط قائمة تحكم بخطوط VTY؟</li>
            </ol>
        </section>
    </>
);

const Chapter6: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي ترجمة عنوان الشبكة (NAT)؟</h4>
            <p>
                NAT هي عملية تعديل معلومات عنوان IP في ترويسة الحزمة أثناء عبورها لجهاز توجيه. تُستخدم بشكل أساسي <strong className="text-cyan-400">لترجمة عناوين IP الخاصة (Private)</strong> المستخدمة داخل شبكة محلية إلى <strong className="text-cyan-400">عنوان IP عام (Public)</strong> واحد (أو مجموعة من العناوين) قبل إرسالها إلى الإنترنت.
            </p>
            <p><strong>الفوائد الرئيسية:</strong> الحفاظ على عناوين IPv4 العامة الشحيحة، وإضافة طبقة من الأمان عن طريق إخفاء بنية الشبكة الداخلية.</p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع NAT</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-green-400">Static NAT (ثابت)</h5>
                    <p className="text-sm">ربط واحد لواحد (one-to-one) بين عنوان محلي وعنوان عام. يُستخدم عادةً للسماح بالوصول إلى خادم داخلي (مثل خادم ويب) من الإنترنت.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-orange-400">Dynamic NAT (ديناميكي)</h5>
                    <p className="text-sm">ربط مجموعة من العناوين المحلية بمجموعة (pool) من العناوين العامة المتاحة. (many-to-many).</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">PAT (Port Address Translation)</h5>
                    <p className="text-sm">يُعرف أيضًا بـ NAT Overload. هو النوع الأكثر شيوعًا. يقوم بربط العديد من العناوين المحلية بعنوان عام واحد باستخدام أرقام منافذ مختلفة للتمييز بين المحادثات. (many-to-one).</p>
                </div>
            </div>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين PAT (النوع الأكثر شيوعًا)</h4>
            <p>هذا هو التكوين النموذجي الذي ستجده في معظم الشبكات الصغيرة والمتوسطة.</p>
            <CodeBlock>
{`! Scenario: Translate all traffic from the 192.168.0.0/16 network to the
! public IP address of the GigabitEthernet0/0/1 interface.

! 1. Define which addresses need to be translated using an ACL
R1(config)# access-list 1 permit 192.168.0.0 0.0.255.255

! 2. Define the inside and outside interfaces
R1(config)# interface g0/0/0
R1(config-if)# ip nat inside
R1(config-if)# exit
R1(config)# interface g0/0/1
R1(config-if)# ip nat outside
R1(config-if)# exit

! 3. Configure the NAT statement
! 'overload' is the keyword that enables PAT
R1(config)# ip nat inside source list 1 interface g0/0/1 overload

! 4. Verify NAT
R1# show ip nat translations
R1# show ip nat statistics`}
            </CodeBlock>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل السادس</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الفائدة الرئيسية لـ NAT فيما يتعلق بعناوين IPv4؟</li>
                <li>ما هو الفرق بين Static NAT و Dynamic NAT؟</li>
                <li>ما هي الميزة الرئيسية لـ PAT (NAT Overload)؟</li>
                <li>ما هو الغرض من أوامر `ip nat inside` و `ip nat outside`؟</li>
                <li>ما هي الكلمة المفتاحية في أمر تكوين NAT التي تقوم بتفعيل PAT؟</li>
            </ol>
        </section>
    </>
);

const Chapter7: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي الشبكة الواسعة (WAN)؟</h4>
            <p>
                الشبكة الواسعة (Wide Area Network) هي شبكة اتصالات تمتد على منطقة جغرافية واسعة، مثل ربط مكاتب الشركة في مدن مختلفة أو توفير اتصال بالإنترنت. على عكس الشبكات المحلية (LANs) التي نمتلكها ونديرها، غالبًا ما نعتمد على <strong className="text-cyan-400">مزودي الخدمة (Service Providers)</strong> لتوفير اتصالات WAN.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تقنيات WAN الشائعة</h4>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">الخطوط المؤجرة (Leased Lines):</strong> اتصال مخصص ومباشر (من نقطة إلى نقطة) بين موقعين. موثوقة وآمنة ولكنها مكلفة.</li>
                <li><strong className="text-cyan-400">Ethernet WAN:</strong> استخدام تقنية الإيثرنت لتوفير اتصالات WAN، مما يبسط التكامل مع الشبكات المحلية. (مثل Metro Ethernet).</li>
                <li><strong className="text-cyan-400">MPLS (Multiprotocol Label Switching):</strong> تقنية شائعة لمزودي الخدمة توجه حركة المرور بناءً على "العلامات" بدلاً من عناوين IP، مما يوفر المرونة وجودة الخدمة (QoS).</li>
                <li><strong className="text-cyan-400">الإنترنت كـ WAN:</strong> استخدام اتصالات الإنترنت التجارية (مثل DSL, Cable, Fiber) مع تقنيات VPN لإنشاء اتصالات WAN آمنة وفعالة من حيث التكلفة.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">بروتوكولات WAN للطبقة الثانية</h4>
            <p>عند استخدام الخطوط المؤجرة، يتم استخدام بروتوكولات تغليف محددة على الرابط التسلسلي:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-yellow-400">HDLC (High-Level Data Link Control):</strong> بروتوكول قديم، نسخة سيسكو منه خاصة بأجهزتها فقط.</li>
                <li><strong className="text-yellow-400">PPP (Point-to-Point Protocol):</strong> بروتوكول قياسي مفتوح، وهو الأكثر شيوعًا. يوفر ميزات إضافية مثل المصادقة (CHAP, PAP) وضغط البيانات.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل السابع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الفرق الرئيسي بين LAN و WAN من حيث الملكية والإدارة؟</li>
                <li>ما هي الميزة الرئيسية لاستخدام الإنترنت مع VPN كحل WAN مقارنة بالخطوط المؤجرة التقليدية؟</li>
                <li>ما هو البروتوكول القياسي المفتوح الذي يوفر المصادقة على روابط WAN من نقطة إلى نقطة؟</li>
                <li>لماذا تعتبر تقنية MPLS شائعة لدى مزودي الخدمة؟</li>
                <li>ماذا يعني مصطلح "اتصال مخصص" عند الحديث عن الخطوط المؤجرة؟</li>
            </ol>
        </section>
    </>
);

const Chapter8: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي الشبكة الخاصة الافتراضية (VPN)؟</h4>
            <p>
                VPN هي تقنية تنشئ اتصالاً آمنًا ومشفّرًا عبر شبكة عامة غير آمنة، مثل الإنترنت. إنها تنشئ "نفقًا" خاصًا لحركة المرور الخاصة بك، مما يحميها من التنصت والتلاعب.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">فوائد VPN</h4>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">توفير التكاليف:</strong> استخدام الإنترنت الرخيص بدلاً من روابط WAN المخصصة والمكلفة.</li>
                <li><strong className="text-cyan-400">الأمان:</strong> توفير السرية والسلامة والمصادقة لحركة المرور.</li>
                <li><strong className="text-cyan-400">قابلية التوسع:</strong> من السهل إضافة مواقع أو مستخدمين جدد.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع VPN</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-green-400">Site-to-Site VPN</h5>
                    <p className="text-sm mt-2">
                       تربط شبكتين كاملتين معًا (مثل ربط مكتب الشركة الرئيسي بفرعها). تكون العملية شفافة تمامًا للمستخدمين.
                    </p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-orange-400">Remote Access VPN</h5>
                    <p className="text-sm mt-2">
                        تربط مستخدمًا فرديًا (مثل موظف يعمل من المنزل) بشبكة الشركة. يتطلب برنامج عميل VPN على جهاز المستخدم.
                    </p>
                </div>
            </div>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">بروتوكول IPsec</h4>
            <p>
                IPsec هو إطار عمل من البروتوكولات المفتوحة لتأمين الاتصالات عبر شبكات IP. إنه يوفر الوظائف الأمنية الأساسية التي تحتاجها VPN:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-yellow-400">Confidentiality (السرية):</strong> عن طريق تشفير البيانات باستخدام خوارزميات مثل AES.</li>
                <li><strong className="text-yellow-400">Integrity (السلامة):</strong> عن طريق استخدام خوارزميات التجزئة (Hashing) مثل SHA للتأكد من عدم تغيير البيانات أثناء النقل.</li>
                <li><strong className="text-yellow-400">Authentication (المصادقة):</strong> للتحقق من هوية الأطراف المتصلة، باستخدام مفتاح مشترك مسبقًا (PSK) أو شهادات رقمية.</li>
                <li><strong className="text-yellow-400">Diffie-Hellman (DH):</strong> خوارزمية تستخدم لتبادل مفاتيح التشفير بشكل آمن عبر قناة غير آمنة.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثامن</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الوظيفة الأساسية لشبكة VPN؟</li>
                <li>ما الفرق بين Site-to-Site VPN و Remote Access VPN؟</li>
                <li>ما هي خدمة الأمان التي يوفرها تشفير AES في سياق IPsec؟</li>
                <li>ما هي خدمة الأمان التي توفرها خوارزمية SHA في سياق IPsec؟</li>
                <li>ما هو الغرض من خوارزمية Diffie-Hellman (DH)؟</li>
            </ol>
        </section>
    </>
);

const Chapter9: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي جودة الخدمة (QoS)؟</h4>
            <p>
                QoS هي مجموعة من التقنيات التي تسمح للشبكة بإدارة مواردها لتقديم <strong className="text-cyan-400">معاملة تفضيلية لأنواع معينة من حركة المرور</strong> على حساب أنواع أخرى أقل أهمية. الهدف هو ضمان الأداء المطلوب للتطبيقات الحساسة حتى في أوقات ازدحام الشبكة.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">لماذا نحتاج إلى QoS؟</h4>
            <p>تواجه حزم البيانات في الشبكة أربعة تحديات رئيسية:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Bandwidth (عرض النطاق الترددي):</strong> سعة الرابط.</li>
                <li><strong className="text-cyan-400">Delay (التأخير):</strong> الوقت الذي تستغرقه الحزمة للانتقال من المصدر إلى الوجهة.</li>
                <li><strong className="text-cyan-400">Jitter (الارتجاف):</strong> التباين في التأخير بين الحزم. يسبب تقطيعًا في الصوت والفيديو.</li>
                <li><strong className="text-cyan-400">Loss (الفقدان):</strong> فقدان الحزم بسبب الازدحام.</li>
            </ul>
            <p>التطبيقات مثل مكالمات VoIP وبث الفيديو حساسة جدًا للتأخير والارتجاف، بينما تطبيقات مثل نقل الملفات يمكنها تحمل التأخير ولكنها حساسة لفقدان الحزم. QoS تساعد في تلبية هذه المتطلبات المختلفة.</p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">آليات QoS</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-yellow-400">Classification and Marking (التصنيف والتعليم):</strong> الخطوة الأولى. يتم تصنيف حركة المرور إلى فئات مختلفة (صوت، فيديو، بيانات) ثم يتم "تعليم" الحزم بعلامة (مثل علامة DSCP) تشير إلى مستوى أولويتها.</li>
                <li><strong className="text-yellow-400">Congestion Management (إدارة الازدحام):</strong> تتعامل مع كيفية إدارة قوائم الانتظار (Queues) على واجهة الموجه المزدحمة. التقنيات تشمل إعطاء الأولوية لقائمة انتظار الصوت على قائمة انتظار البيانات.</li>
                <li><strong className="text-yellow-400">Congestion Avoidance (تجنب الازدحام):</strong> تقنيات مثل WRED تقوم بإسقاط بعض الحزم ذات الأولوية المنخفضة بشكل استباقي قبل أن تمتلئ قائمة الانتظار بالكامل، لتجنب الازدحام الشديد.</li>
                <li><strong className="text-yellow-400">Policing and Shaping (المراقبة والتشكيل):</strong> تستخدم للتحكم في معدل حركة المرور. Policing يسقط الحزم الزائدة، بينما Shaping يؤخرها في قائمة انتظار.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل التاسع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الهدف الرئيسي من تطبيق QoS في الشبكة؟</li>
                <li>ما هو "الارتجاف" (Jitter)، ولماذا يؤثر بشكل خاص على تطبيقات الصوت والفيديو؟</li>
                <li>ما هي الخطوة الأولى في أي سياسة QoS؟</li>
                <li>ما الفرق بين Policing و Shaping من حيث كيفية التعامل مع حركة المرور الزائدة؟</li>
                <li>أي نوع من حركة المرور (الصوت أم نقل الملفات) سيحصل على أولوية أعلى في شبكة تم تكوين QoS عليها بشكل صحيح؟</li>
            </ol>
        </section>
    </>
);

const Chapter10: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: لماذا إدارة الشبكة؟</h4>
            <p>
                إدارة الشبكة هي عملية مراقبة وصيانة وتحسين البنية التحتية للشبكة لضمان عملها بكفاءة وموثوقية. هذا الفصل يغطي البروتوكولات والأدوات المستخدمة لتحقيق ذلك.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">NTP (Network Time Protocol)</h4>
            <p>
                يضمن NTP أن تكون الساعات على جميع أجهزة الشبكة (الموجهات، المحولات، الخوادم) متزامنة. هذا أمر حيوي جدًا لتحليل سجلات الأحداث (Logs) وتحديد تسلسل الأحداث بدقة عند استكشاف الأخطاء وإصلاحها.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">SNMP (Simple Network Management Protocol)</h4>
            <p>
                هو بروتوكول قياسي يستخدم لمراقبة وإدارة أجهزة الشبكة. يتكون من ثلاثة عناصر:
            </p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">SNMP Manager (NMS):</strong> برنامج يعمل على خادم يستخدم لمراقبة الأجهزة.</li>
                <li><strong className="text-cyan-400">SNMP Agent:</strong> برنامج يعمل على أجهزة الشبكة (العملاء) يجمع المعلومات ويرسلها إلى المدير.</li>
                <li><strong className="text-cyan-400">MIB (Management Information Base):</strong> قاعدة بيانات هرمية على الجهاز العميل تخزن المعلومات التي يمكن مراقبتها.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">Syslog</h4>
            <p>
                هو بروتوكول قياسي يسمح لأجهزة الشبكة بإرسال رسائل سجل الأحداث (Log Messages) إلى خادم مركزي يسمى خادم Syslog. هذا يسهل تجميع وتحليل السجلات من أجهزة متعددة.
            </p>
            <p>كل رسالة Syslog لها <strong className="text-yellow-400">مستوى خطورة (Severity Level)</strong> من 0 (الأكثر خطورة) إلى 7 (معلومات تصحيح الأخطاء).</p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل العاشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>لماذا يعتبر تزامن الوقت باستخدام NTP مهمًا في إدارة الشبكة؟</li>
                <li>في SNMP، ما هو دور MIB؟</li>
                <li>ما هي الفائدة الرئيسية لاستخدام خادم Syslog مركزي؟</li>
                <li>إذا رأيت رسالة Syslog بمستوى خطورة 0، ماذا يعني ذلك؟</li>
                <li>ما هو البروتوكول الذي ستستخدمه لمراقبة استخدام وحدة المعالجة المركزية (CPU) على موجه عن بعد؟</li>
            </ol>
        </section>
    </>
);

const Chapter11: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: أهمية تصميم الشبكات</h4>
            <p>
                تصميم الشبكة بشكل جيد هو أساس بناء شبكة موثوقة وقابلة للتطوير وسهلة الإدارة. التصميم العشوائي يؤدي إلى مشاكل في الأداء وصعوبات في استكشاف الأخطاء والتوسع المستقبلي.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">نموذج التصميم الهرمي (Hierarchical Design)</h4>
            <p>
                هو نهج معياري يقسم الشبكة إلى ثلاث طبقات وظيفية، لكل منها دورها المحدد. هذا يسهل التصميم والتنفيذ والإدارة.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-blue-500/50">
                    <h5 className="font-bold text-lg text-blue-400">Access Layer (طبقة الوصول)</h5>
                    <p className="text-sm">هي الطبقة التي تتصل بها الأجهزة النهائية (أجهزة الكمبيوتر، الهواتف، الطابعات). وظيفتها هي توفير الوصول إلى الشبكة.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-green-500/50">
                    <h5 className="font-bold text-lg text-green-400">Distribution Layer (طبقة التوزيع)</h5>
                    <p className="text-sm">تعمل كحدود بين طبقتي الوصول والنواة. وظيفتها هي تجميع حركة المرور من طبقة الوصول، تطبيق السياسات (ACLs, QoS)، وتحديد نطاقات البث.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-red-500/50">
                    <h5 className="font-bold text-lg text-red-400">Core Layer (طبقة النواة)</h5>
                    <p className="text-sm">هي العمود الفقري عالي السرعة للشبكة. وظيفتها الوحيدة هي نقل كميات هائلة من حركة المرور بسرعة وموثوقية. يجب أن تكون بسيطة وسريعة للغاية.</p>
                </div>
            </div>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">اعتبارات التصميم</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-cyan-400">Scalability (قابلية التوسع):</strong> تصميم الشبكة لتنمو بسهولة دون إعادة تصميم كبيرة.</li>
                <li><strong className="text-cyan-400">Redundancy (التكرار):</strong> توفير مسارات وأجهزة بديلة لضمان عدم وجود نقاط فشل واحدة.</li>
                <li><strong className="text-cyan-400">Security (الأمان):</strong> دمج الأمان في كل طبقة من طبقات التصميم.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الحادي عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الطبقات الثلاث في نموذج التصميم الهرمي؟</li>
                <li>في أي طبقة يتم تطبيق سياسات مثل قوائم التحكم في الوصول (ACLs) عادةً؟</li>
                <li>ما هي الوظيفة الأساسية لطبقة النواة (Core)؟</li>
                <li>لماذا يعتبر التصميم الهرمي جيدًا لقابلية التوسع؟</li>
                <li>أين تتصل الأجهزة النهائية مثل أجهزة الكمبيوتر المكتبية في هذا النموذج؟</li>
            </ol>
        </section>
    </>
);

const Chapter12: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: استكشاف أخطاء الشبكة وإصلاحها</h4>
            <p>
                يركز هذا الفصل على تطبيق منهجيات منظمة وأدوات فعالة لتشخيص وحل مشكلات الشبكة. الهدف هو الانتقال من التخمين العشوائي إلى عملية تحليل منطقية.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">خطوات عملية استكشاف الأخطاء</h4>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">تحديد المشكلة:</strong> جمع المعلومات من المستخدمين وأدوات المراقبة.</li>
                <li><strong className="text-cyan-400">وضع فرضية للسبب المحتمل:</strong> بناءً على الأعراض والمعلومات المتاحة.</li>
                <li><strong className="text-cyan-400">اختبار الفرضية:</strong> استخدام أدوات التشخيص لتأكيد أو نفي الفرضية.</li>
                <li><strong className="text-cyan-400">وضع خطة عمل لحل المشكلة:</strong> إذا تم تأكيد الفرضية.</li>
                <li><strong className="text-cyan-400">تنفيذ الخطة.</strong></li>
                <li><strong className="text-cyan-400">التحقق من أن المشكلة قد تم حلها بالكامل.</strong></li>
                <li><strong className="text-cyan-400">توثيق المشكلة والحل:</strong> للمساعدة في حل المشكلات المستقبلية.</li>
            </ol>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الأدوات والأوامر المفيدة (مراجعة)</h4>
             <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-yellow-400">ping, traceroute:</strong> لاختبار الاتصال والمسار.</li>
                <li><strong className="text-yellow-400">show commands:</strong> (`show ip interface brief`, `show ip route`, `show running-config`) لفحص حالة وتكوين الأجهزة.</li>
                <li><strong className="text-yellow-400">debug commands:</strong> لعرض معلومات التشخيص في الوقت الفعلي (استخدمها بحذر).</li>
                <li><strong className="text-yellow-400">Syslog and SNMP:</strong> لمراجعة سجلات الأحداث ومراقبة الأداء.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثاني عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الخطوة الأولى في أي عملية منهجية لاستكشاف الأخطاء؟</li>
                <li>ما الأمر الذي تستخدمه للتحقق من أن واجهات الموجه نشطة وتعمل؟</li>
                <li>إذا كنت تشك في وجود خطأ في تكوين OSPF، فما هو الأمر الذي سيعطيك نظرة عامة على حالة العملية؟</li>
                <li>ما هي المخاطرة المحتملة لاستخدام أوامر `debug` على جهاز في بيئة إنتاج؟</li>
                <li>لماذا يعتبر توثيق المشكلات والحلول خطوة مهمة؟</li>
            </ol>
        </section>
    </>
);

const Chapter13: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي المحاكاة الافتراضية للشبكة؟</h4>
            <p>
                المحاكاة الافتراضية هي تقنية تسمح بإنشاء نسخ افتراضية من الموارد المادية، مثل الخوادم، وحدات التخزين، أو الشبكات. في سياق الشبكات، تسمح لنا المحاكاة الافتراضية بإنشاء <strong className="text-cyan-400">شبكات منطقية متعددة تعمل على بنية تحتية مادية واحدة</strong>.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الحوسبة السحابية (Cloud Computing)</h4>
            <p>
                هي نتيجة مباشرة للمحاكاة الافتراضية. بدلاً من امتلاك وإدارة البنية التحتية الخاصة بك، يمكنك استئجار الموارد (حوسبة، تخزين، شبكات) من مزود سحابي مثل Amazon Web Services (AWS) أو Microsoft Azure.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الشبكات المعرفة بالبرمجيات (SDN)</h4>
            <p>
                SDN هو نهج ثوري في تصميم الشبكات يفصل بين وظائف الشبكة. في الشبكات التقليدية، يتم دمج وظيفتي التحكم والتوجيه في كل جهاز على حدة.
            </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">مستوى التحكم (Control Plane):</strong> هو "عقل" الجهاز. يتخذ قرارات التوجيه (مثل حسابات OSPF).</li>
                <li><strong className="text-cyan-400">مستوى البيانات (Data Plane):</strong> هو "عضلات" الجهاز. يقوم بإعادة توجيه الحزم بناءً على القرارات التي يتخذها مستوى التحكم.</li>
            </ul>
            <p>في SDN، يتم <strong className="text-yellow-400">فصل مستوى التحكم ومركزيته</strong> في جهاز يسمى <strong className="text-cyan-400">المتحكم (Controller)</strong>. يتخذ المتحكم جميع قرارات التوجيه ويدفعها إلى أجهزة الشبكة، التي تصبح مجرد أجهزة بسيطة لإعادة توجيه الحزم.</p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثالث عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الفكرة الأساسية وراء المحاكاة الافتراضية؟</li>
                <li>ما الفرق بين مستوى التحكم ومستوى البيانات في جهاز شبكة؟</li>
                <li>كيف يغير SDN بنية الشبكة التقليدية؟</li>
                <li>ما هو الدور الرئيسي للمتحكم (Controller) في بنية SDN؟</li>
                <li>ما هي إحدى الفوائد الرئيسية لاستخدام SDN؟</li>
            </ol>
        </section>
    </>
);

const Chapter14: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي أتمتة الشبكات؟</h4>
            <p>
                أتمتة الشبكات هي عملية استخدام البرامج النصية (Scripts) والأدوات لأتمتة المهام المتكررة في إدارة الشبكة وتكوينها. الهدف هو <strong className="text-cyan-400">تقليل التدخل البشري، زيادة الكفاءة، تقليل الأخطاء، والسماح بتنفيذ التغييرات على نطاق واسع بسرعة</strong>.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">واجهات برمجة التطبيقات (APIs)</h4>
            <p>
                API هي واجهة تسمح للتطبيقات المختلفة بالتحدث مع بعضها البعض. في سياق الشبكات، تسمح واجهات برمجة التطبيقات (مثل REST APIs) للبرامج النصية بالتفاعل مع أجهزة الشبكة أو المتحكمات (مثل Cisco DNA Center) لقراءة المعلومات أو دفع التكوينات.
            </p>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تنسيقات البيانات الشائعة</h4>
            <p>عند التفاعل مع واجهات برمجة التطبيقات، يتم تبادل البيانات عادةً بأحد التنسيقات التالية سهلة القراءة للآلة والإنسان:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-yellow-400">JSON (JavaScript Object Notation):</strong> الأكثر شيوعًا. يستخدم أزواج المفتاح-القيمة.</li>
                <li><strong className="text-yellow-400">YAML (YAML Ain't Markup Language):</strong> أبسط في القراءة للإنسان، يستخدم المسافات البادئة لتحديد البنية.</li>
                <li><strong className="text-yellow-400">XML (eXtensible Markup Language):</strong> يستخدم علامات (tags) لوصف البيانات، مشابه لـ HTML.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أدوات إدارة التكوين</h4>
            <p>
                هي أدوات برمجية مصممة لأتمتة عملية تكوين وإدارة أعداد كبيرة من الخوادم وأجهزة الشبكة. أشهرها:
            </p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Ansible:</strong> بسيط جدًا، لا يتطلب تثبيت أي عميل على الأجهزة المدارة (agentless).</li>
                <li><strong className="text-cyan-400">Puppet:</strong> يستخدم لغة تعريفية لوصف الحالة المطلوبة للنظام.</li>
                <li><strong className="text-cyan-400">Chef:</strong> يستخدم نهجًا إجرائيًا، حيث تكتب "وصفات" (recipes) لتكوين الأنظمة.</li>
            </ul>
        </section>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الرابع عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الفائدة الرئيسية لأتمتة الشبكات؟</li>
                <li>ما هو الغرض من API في سياق الشبكات؟</li>
                <li>ما هو تنسيق البيانات الأكثر شيوعًا المستخدم في REST APIs الحديثة؟</li>
                <li>ما هي الميزة الرئيسية لـ Ansible مقارنة بـ Puppet و Chef؟</li>
                <li>إذا كنت تريد أتمتة تكوين 100 محول بنفس تكوين VLANs، فأي نوع من الأدوات ستستخدم؟</li>
            </ol>
        </section>
    </>
);


const CCNA3SummarySection: React.FC = () => {
    const [openChapter, setOpenChapter] = useState<number | null>(1);

    const chapters = [
        { id: 1, title: 'الفصل 1: مفاهيم OSPFv2 للمنطقة الواحدة', content: <Chapter1 /> },
        { id: 2, title: 'الفصل 2: تكوين OSPFv2 للمنطقة الواحدة', content: <Chapter2 /> },
        { id: 3, title: 'الفصل 3: مفاهيم أمان الشبكات', content: <Chapter3 /> },
        { id: 4, title: 'الفصل 4: مفاهيم قوائم التحكم في الوصول (ACL)', content: <Chapter4 /> },
        { id: 5, title: 'الفصل 5: تكوين قوائم التحكم في الوصول لـ IPv4', content: <Chapter5 /> },
        { id: 6, title: 'الفصل 6: ترجمة عنوان الشبكة (NAT) لـ IPv4', content: <Chapter6 /> },
        { id: 7, title: 'الفصل 7: مفاهيم الشبكات الواسعة (WAN)', content: <Chapter7 /> },
        { id: 8, title: 'الفصل 8: مفاهيم VPN و IPsec', content: <Chapter8 /> },
        { id: 9, title: 'الفصل 9: مفاهيم جودة الخدمة (QoS)', content: <Chapter9 /> },
        { id: 10, title: 'الفصل 10: إدارة الشبكة', content: <Chapter10 /> },
        { id: 11, title: 'الفصل 11: تصميم الشبكة', content: <Chapter11 /> },
        { id: 12, title: 'الفصل 12: استكشاف أخطاء الشبكة وإصلاحها', content: <Chapter12 /> },
        { id: 13, title: 'الفصل 13: المحاكاة الافتراضية للشبكة', content: <Chapter13 /> },
        { id: 14, title: 'الفصل 14: أتمتة الشبكة', content: <Chapter14 /> },
    ];
    
    const handleToggle = (id: number) => {
        setOpenChapter(openChapter === id ? null : id);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">ملخصات CCNA3 v7: ENSA</h2>
            <p className="text-gray-400 mb-8">
                مرجع سريع لأهم المفاهيم في منهج CCNAv7 الثالث: شبكات المؤسسات والأمن والأتمتة.
            </p>
            <div>
                {chapters.map(chapter => (
                    <AccordionItem
                        key={chapter.id}
                        title={chapter.title}
                        isOpen={openChapter === chapter.id}
                        setIsOpen={() => handleToggle(chapter.id)}
                    >
                        {chapter.content}
                    </AccordionItem>
                ))}
            </div>
        </div>
    );
};

export default CCNA3SummarySection;
