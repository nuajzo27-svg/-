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
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: تكوين الشبكة المحولة</h4>
            <p>
                في الشبكات الحديثة، تلعب المحولات (Switches) دورًا محوريًا في بناء شبكات محلية (LANs) عالية الأداء. تعمل المحولات في الطبقة الثانية (Data Link Layer) وتستخدم عناوين MAC لاتخاذ قرارات إعادة توجيه ذكية، مما يقلل من الازدحام ويزيد من كفاءة الشبكة.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">إعادة توجيه الإطارات (Frame Forwarding)</h4>
            <p>عندما يستقبل المحول إطارًا، يجب أن يقرر ماذا يفعل به. يبني المحول <strong className="text-cyan-400">جدول عناوين MAC</strong> ديناميكيًا عن طريق فحص عنوان MAC المصدر لكل إطار وارد. بناءً على عنوان MAC الوجهة، يتخذ المحول أحد الإجراءات التالية:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Forward (توجيه):</strong> إذا كان عنوان MAC الوجهة موجودًا في الجدول، يرسل المحول الإطار فقط إلى المنفذ المحدد.</li>
                <li><strong className="text-cyan-400">Flood (إغراق):</strong> إذا كان عنوان MAC الوجهة غير معروف، يرسل المحول الإطار إلى جميع المنافذ باستثناء المنفذ الذي استقبله منه.</li>
                <li><strong className="text-cyan-400">Filter (تصفية/تجاهل):</strong> إذا كان المنفذ الوجهة هو نفسه المنفذ المصدر، يتجاهل المحول الإطار.</li>
            </ul>
             <p className="mt-4">تستخدم المحولات طريقتين لمعالجة الإطارات (مراجعة من CCNA 1):</p>
             <ul className="list-disc list-inside space-y-2 mt-2">
                 <li><strong className="text-yellow-400">Store-and-Forward:</strong> الأكثر شيوعًا. ينتظر وصول الإطار بالكامل، يتحقق من الأخطاء (FCS)، ثم يوجهه. موثوق ولكنه أبطأ قليلاً.</li>
                 <li><strong className="text-yellow-400">Cut-Through:</strong> يبدأ في توجيه الإطار بمجرد قراءة عنوان MAC الوجهة. أسرع ولكنه قد يمرر إطارات تالفة.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">نطاقات التصادم والبث (مراجعة وتعميق)</h4>
            <p>فهم هذه المفاهيم أساسي لفهم فوائد المحولات.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-red-500/50">
                    <h5 className="font-bold text-lg text-red-400">نطاق التصادم (Collision Domain)</h5>
                    <p className="text-sm mt-2">
                       هو أي جزء من الشبكة حيث يمكن أن تتصادم الإشارات المرسلة. في الأجهزة القديمة مثل الموزعات (Hubs)، كانت الشبكة بأكملها نطاق تصادم واحد.
                       <br/><br/>
                       <strong className="text-green-400">المحولات تحل هذه المشكلة:</strong> كل منفذ على المحول هو نطاق تصادم منفصل. هذا يعني أنه لا يمكن حدوث تصادمات في شبكة محولات حديثة تعمل بوضع Full-duplex.
                    </p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg border border-blue-500/50">
                    <h5 className="font-bold text-lg text-blue-400">نطاق البث (Broadcast Domain)</h5>
                    <p className="text-sm mt-2">
                        هو نطاق الشبكة الذي تصل إليه رسالة البث (Broadcast). المحولات، بشكل افتراضي، <strong className="text-yellow-400">تمرر</strong> رسائل البث إلى جميع المنافذ.
                         <br/><br/>
                       <strong className="text-red-400">الأجهزة التي توقف البث:</strong> الموجهات (Routers) فقط هي التي تقوم بتقسيم نطاقات البث. كل واجهة على الراوتر هي نطاق بث منفصل. لاحقًا، سنتعلم كيف يمكن لـ VLANs أن تقسم نطاقات البث على مستوى المحول.
                    </p>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تخفيف ازدحام الشبكة</h4>
            <p>تساهم المحولات في تحسين أداء الشبكة وتقليل الازدحام بشكل كبير من خلال:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">تقسيم نطاقات التصادم:</strong> القضاء على التصادمات يسمح باتصالات أكثر كفاءة.</li>
                <li><strong className="text-cyan-400">توفير نطاق ترددي مخصص:</strong> كل منفذ يحصل على النطاق الترددي الكامل المتاح له.</li>
                <li><strong className="text-cyan-400">إعادة توجيه ذكية:</strong> إرسال الإطارات فقط إلى حيث يجب أن تذهب، بدلاً من إغراق الشبكة بحركة مرور غير ضرورية.</li>
                <li><strong className="text-cyan-400">دعم السرعات العالية وأوضاع Duplex المختلفة:</strong> التكيف مع قدرات الأجهزة المتصلة لتوفير أفضل أداء ممكن.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الأول (CCNA 2)</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي قطعة المعلومات التي يستخدمها المحول لبناء جدول عناوين MAC الخاص به؟</li>
                <li>ماذا يفعل المحول بإطار إذا كان عنوان MAC الوجهة غير موجود في جدوله؟</li>
                <li>ما هو الفرق الرئيسي في الأداء بين طريقة التوجيه Store-and-Forward و Cut-Through؟</li>
                <li>إذا قمت بتوصيل 5 محولات ببعضها البعض، كم عدد نطاقات البث التي لديك (بدون استخدام راوتر أو VLANs)؟</li>
                <li>كيف يساهم المحول في تقليل ازدحام الشبكة مقارنة بالموزع (Hub)؟</li>
            </ol>
        </section>
    </>
);

const Chapter2: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي الـ VLAN؟</h4>
            <p>
                الشبكة المحلية الافتراضية (VLAN) هي أي نطاق بث (Broadcast Domain) يتم تقسيمه وعزله منطقيًا على محول شبكة. تسمح الـ VLANs للمسؤولين بتقسيم الشبكة بناءً على الوظيفة أو الفريق، بغض النظر عن الموقع المادي للمستخدمين. <strong className="text-cyan-400">كل VLAN هي شبكة IP فرعية منفصلة.</strong>
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">فوائد استخدام VLANs</h4>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">الأمان:</strong> يتم عزل حركة المرور لكل VLAN. لا يمكن للأجهزة في VLAN 10 رؤية حركة المرور في VLAN 20.</li>
                <li><strong className="text-cyan-400">تقليل التكلفة:</strong> لا حاجة لشراء محولات منفصلة لكل قسم.</li>
                <li><strong className="text-cyan-400">تحسين الأداء:</strong> تقليل حجم نطاقات البث يقلل من حركة المرور غير الضرورية.</li>
                <li><strong className="text-cyan-400">مرونة وإدارة أفضل:</strong> يمكن نقل المستخدمين بين الـ VLANs بسهولة عبر تغيير تكوين المنفذ.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع الـ VLANs</h4>
             <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-yellow-400">Data VLAN:</strong> مخصصة لحركة مرور بيانات المستخدم العادية.</li>
                <li><strong className="text-yellow-400">Default VLAN:</strong> هي VLAN 1. بشكل افتراضي، جميع منافذ المحول تكون في VLAN 1.</li>
                <li><strong className="text-yellow-400">Native VLAN:</strong> تُستخدم على روابط Trunk. حركة المرور على هذه الـ VLAN لا يتم "تعليمها" (Untagged).</li>
                <li><strong className="text-yellow-400">Management VLAN:</strong> مخصصة لإدارة المحول عن بعد (SSH/Telnet).</li>
                <li><strong className="text-yellow-400">Voice VLAN:</strong> مخصصة لضمان جودة الخدمة (QoS) لحركة مرور الصوت (VoIP).</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">روابط Trunk و 802.1Q</h4>
            <p>
                <strong className="text-cyan-400">Trunk:</strong> هو رابط من نقطة إلى نقطة بين جهازين شبكيين (عادة محولين) يحمل حركة مرور أكثر من VLAN واحد.
            </p>
            <p>
                لتمييز الإطارات التي تنتمي إلى كل VLAN على رابط Trunk، يتم استخدام بروتوكول <strong className="text-cyan-400">IEEE 802.1Q</strong>. يقوم هذا البروتوكول بإضافة "علامة" (Tag) بحجم 4 بايت إلى ترويسة إطار الإيثرنت. تحتوي هذه العلامة على معرف الـ VLAN (VLAN ID).
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أوامر تكوين VLAN و Trunk</h4>
            <CodeBlock>
{`! 1. Create VLANs
Switch(config)# vlan 10
Switch(config-vlan)# name Students
Switch(config)# vlan 20
Switch(config-vlan)# name Teachers

! 2. Assign a port to a VLAN (Access Port)
Switch(config)# interface fa0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10

! 3. Configure a Trunk port
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode trunk
! (Optional) Specify allowed VLANs
Switch(config-if)# switchport trunk allowed vlan 1,10,20
! (Optional) Specify the native VLAN
Switch(config-if)# switchport trunk native vlan 99

! 4. Verify configuration
Switch# show vlan brief
Switch# show interfaces trunk`}
            </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثاني</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الفائدة الأمنية الرئيسية لاستخدام VLANs؟</li>
                <li>ما هو الغرض من رابط Trunk بين محولين؟</li>
                <li>ما هو البروتوكول الذي يضيف علامة (Tag) إلى الإطارات على رابط Trunk لتحديد الـ VLAN التي تنتمي إليها؟</li>
                <li>ما هو الأمر الذي تستخدمه لتعيين منفذ محول إلى VLAN 10؟</li>
                <li>ماذا يحدث لحركة المرور التي تنتمي إلى الـ Native VLAN عند عبورها لرابط Trunk؟</li>
            </ol>
        </section>
    </>
);

const Chapter3: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: لماذا نحتاج للتوجيه بين الـ VLANs؟</h4>
            <p>
                بشكل افتراضي، الأجهزة في VLANs مختلفة لا يمكنها التواصل مع بعضها البعض لأن كل VLAN هي نطاق بث منفصل وشبكة فرعية مختلفة. لتمكين الاتصال بينها، نحتاج إلى جهاز من الطبقة الثالثة (موجه أو محول طبقة ثالثة) ليعمل كـ <strong className="text-cyan-400">"جسر"</strong> بين هذه الشبكات الافتراضية.
            </p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الطرق الثلاث للتوجيه بين الـ VLANs</h4>
            <ul className="list-disc list-inside space-y-3">
                 <li><strong className="text-yellow-400">الطريقة القديمة (Legacy):</strong> استخدام واجهة مادية منفصلة على الموجه لكل VLAN. هذه الطريقة غير فعالة ومكلفة ومهدرة للمنافذ. لم تعد تستخدم عمليًا.</li>
                 <li><strong className="text-yellow-400">Router-on-a-Stick:</strong> استخدام واجهة مادية واحدة على الموجه، وتقسيمها إلى واجهات فرعية منطقية (subinterfaces)، واحدة لكل VLAN. يتم توصيل هذه الواجهة بمنفذ Trunk على المحول.</li>
                 <li><strong className="text-yellow-400">محول الطبقة الثالثة (Multilayer Switch):</strong> استخدام محول متطور يمكنه أداء وظائف التوجيه. يتم ذلك عن طريق إنشاء واجهات افتراضية محولة (SVIs) لكل VLAN. هذه هي الطريقة الأسرع والأكثر قابلية للتطوير.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين Router-on-a-Stick</h4>
            <p>هذه الطريقة تتطلب إعدادات على كل من الموجه والمحول.</p>
            <p><strong className="text-cyan-400">على المحول (Switch):</strong></p>
            <CodeBlock>
{`! Assume VLAN 10 and 20 are already created
! Configure the port connected to the router as a trunk
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode trunk`}
            </CodeBlock>
            <p><strong className="text-cyan-400">على الموجه (Router):</strong></p>
            <CodeBlock>
{`! Enter the physical interface and enable it
Router(config)# interface fa0/0
Router(config-if)# no shutdown

! Create a subinterface for VLAN 10
Router(config)# interface fa0/0.10
! Specify the VLAN ID and encapsulation protocol
Router(config-subif)# encapsulation dot1q 10
! Assign the IP address (which will be the gateway for VLAN 10)
Router(config-subif)# ip address 192.168.10.1 255.255.255.0

! Create a subinterface for VLAN 20
Router(config)# interface fa0/0.20
Router(config-subif)# encapsulation dot1q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0`}
            </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين التوجيه باستخدام محول الطبقة الثالثة</h4>
            <p>هذه الطريقة أسهل وأكثر كفاءة لأن كل الإعدادات تتم على المحول نفسه.</p>
            <CodeBlock>
{`! 1. Enable Layer 3 routing capabilities
L3_Switch(config)# ip routing

! 2. Create the VLANs (if not already created)
L3_Switch(config)# vlan 10
L3_Switch(config)# vlan 20

! 3. Create Switched Virtual Interfaces (SVIs) for each VLAN
! This SVI acts as the default gateway for its VLAN
L3_Switch(config)# interface vlan 10
L3_Switch(config-if)# ip address 192.168.10.1 255.255.255.0

L3_Switch(config)# interface vlan 20
L3_Switch(config-if)# ip address 192.168.20.1 255.255.255.0

! 4. Assign physical ports to their respective VLANs
L3_Switch(config)# interface fa0/5
L3_Switch(config-if)# switchport mode access
L3_Switch(config-if)# switchport access vlan 10`}
            </CodeBlock>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثالث</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>لماذا تحتاج الأجهزة في VLANs مختلفة إلى جهاز من الطبقة الثالثة للتواصل؟</li>
                <li>ما هي الميزة الرئيسية لاستخدام محول الطبقة الثالثة للتوجيه بين VLANs مقارنة بطريقة Router-on-a-Stick؟</li>
                <li>في تكوين Router-on-a-Stick، ما هو الغرض من الأمر `encapsulation dot1q 10`؟</li>
                <li>ما هو الأمر الحاسم الذي يجب إدخاله على محول الطبقة الثالثة لتمكين قدرات التوجيه لديه؟</li>
                <li>ماذا تمثل واجهة SVI على محول الطبقة الثالثة؟</li>
            </ol>
        </section>
    </>
);

const Chapter4: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: مشكلة حلقات التكرار في الطبقة الثانية</h4>
            <p>
                التكرار (Redundancy) في الشبكات أمر جيد لأنه يوفر مسارات بديلة في حالة فشل رابط أو جهاز. لكن في شبكات الطبقة الثانية، يمكن أن يسبب التكرار مشاكل كارثية تسمى <strong className="text-cyan-400">حلقات التكرار (Layer 2 Loops)</strong>.
            </p>
            <p>عند وجود حلقة، يمكن لإطارات البث (Broadcast Frames) أن تدور إلى الأبد في الشبكة، مما يسبب:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-red-400">عواصف البث (Broadcast Storms):</strong> استهلاك كل عرض النطاق الترددي المتاح.</li>
                <li><strong className="text-red-400">عدم استقرار جدول MAC:</strong> المحولات تتلقى نفس الإطار على منافذ مختلفة، مما يؤدي إلى تحديث مستمر لجدول MAC.</li>
                <li><strong className="text-red-400">إرسال نسخ متعددة من الإطار:</strong> الجهاز النهائي يستقبل نسخًا مكررة من نفس الإطار.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">بروتوكول الشجرة الممتدة (Spanning Tree Protocol - STP)</h4>
            <p>
                STP هو بروتوكول من الطبقة الثانية يعمل على <strong className="text-cyan-400">منع حلقات التكرار</strong> عن طريق وضع بعض المنافذ في حالة حظر (Blocking State) منطقيًا. هذا يضمن وجود مسار واحد فقط نشط بين أي نقطتين في الشبكة في أي وقت، مع الحفاظ على المسارات المادية البديلة جاهزة للعمل في حالة فشل المسار الأساسي.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">آلية عمل STP</h4>
            <p>يعمل STP عن طريق عملية من ثلاث خطوات لإنشاء طوبولوجيا خالية من الحلقات:</p>
            <ol className="list-decimal list-inside space-y-3 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-yellow-400">انتخاب الجسر الجذري (Root Bridge):</strong> يتم انتخاب محول واحد في الشبكة ليكون "الجسر الجذري". يتم انتخاب المحول صاحب <strong className="text-cyan-400">أقل معرف جسر (Bridge ID)</strong>. معرف الجسر يتكون من (أولوية + عنوان MAC).</li>
                <li><strong className="text-yellow-400">انتخاب المنافذ الجذرية (Root Ports):</strong> على كل محول غير جذري، يتم تحديد منفذ واحد ليكون "المنفذ الجذري". هو المنفذ الذي لديه <strong className="text-cyan-400">أقل تكلفة مسار</strong> للوصول إلى الجسر الجذري.</li>
                <li><strong className="text-yellow-400">انتخاب المنافذ المعينة (Designated Ports):</strong> على كل قطعة شبكة (segment)، يتم تحديد منفذ واحد ليكون "المنفذ المعين". هو المنفذ الأقرب إلى الجسر الجذري على تلك القطعة.</li>
            </ol>
            <p className="mt-2"><strong className="text-red-400">النتيجة:</strong> أي منفذ لم يتم انتخابه كمنفذ جذري أو معين يصبح منفذًا <strong className="text-orange-400">محظورًا (Blocked/Alternate Port)</strong>. هذا المنفذ لا يمرر حركة مرور البيانات ولكنه يستمع لرسائل STP (BPDUs).</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تطورات STP</h4>
             <ul className="list-disc list-inside space-y-2">
                <li><strong>STP (802.1D):</strong> النسخة الأصلية، بطيئة جدًا في التقارب (30-50 ثانية).</li>
                <li><strong>PVST+:</strong> نسخة خاصة بسيسكو، تنشئ شجرة ممتدة منفصلة لكل VLAN.</li>
                <li><strong>RSTP (802.1w):</strong> بروتوكول الشجرة الممتدة السريع. يحسن التقارب بشكل كبير (أقل من 10 ثوان).</li>
                <li><strong>Rapid PVST+:</strong> نسخة سيسكو من RSTP، توفر شجرة ممتدة سريعة لكل VLAN. (الأكثر استخدامًا في شبكات سيسكو).</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الرابع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي المشكلة الرئيسية التي يحلها بروتوكول STP؟</li>
                <li>ما هما المكونان اللذان يشكلان معرف الجسر (Bridge ID) في STP؟</li>
                <li>كيف يختار محول غير جذري منفذه الجذري (Root Port)؟</li>
                <li>ماذا يحدث للمنافذ التي لا يتم اختيارها كمنافذ جذرية أو معينة في شبكة STP؟</li>
                <li>ما هي الميزة الرئيسية لـ RSTP مقارنة بـ STP الأصلي؟</li>
            </ol>
        </section>
    </>
);

const Chapter5: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: الحاجة إلى تجميع الروابط</h4>
            <p>
                في بعض الأحيان، لا يكون رابط واحد بين محولين كافيًا لتلبية متطلبات عرض النطاق الترددي. كما أن وجود رابط واحد يمثل نقطة فشل فردية (single point of failure). تقنية EtherChannel تحل هاتين المشكلتين عن طريق <strong className="text-cyan-400">تجميع عدة روابط مادية في رابط منطقي واحد</strong>.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">فوائد EtherChannel</h4>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">زيادة عرض النطاق الترددي:</strong> إذا قمت بتجميع 4 روابط بسرعة 1 جيجابت/ثانية، ستحصل على رابط منطقي بسعة 4 جيجابت/ثانية.</li>
                <li><strong className="text-cyan-400">التكرار (Redundancy):</strong> إذا فشل أحد الروابط المادية في المجموعة، تستمر حركة المرور في التدفق عبر الروابط المتبقية دون انقطاع.</li>
                <li><strong className="text-cyan-400">موازنة التحميل (Load Balancing):</strong> يتم توزيع حركة المرور عبر الروابط المادية في القناة، مما يحسن استخدام الموارد.</li>
                <li><strong className="text-cyan-400">بساطة STP:</strong> يرى بروتوكول STP قناة EtherChannel كرابط واحد، مما يبسط حساباته ويمنع حظر الروابط المكررة.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">بروتوكولات التفاوض</h4>
            <p>
                يمكن تكوين EtherChannel يدويًا (وضع "on")، ولكن من الأفضل استخدام بروتوكول تفاوض لإنشاء القناة ديناميكيًا وضمان تطابق الإعدادات على كلا الجانبين.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-purple-500/50">
                    <h5 className="font-bold text-lg text-purple-400">PAgP (Port Aggregation Protocol)</h5>
                    <p className="text-sm mt-2">
                        بروتوكول خاص بشركة سيسكو.
                    </p>
                     <ul className="list-disc list-inside text-sm space-y-1 mt-3">
                         <li><strong>Desirable:</strong> يبدأ التفاوض بنشاط.</li>
                         <li><strong>Auto:</strong> ينتظر الطرف الآخر ليبدأ التفاوض.</li>
                    </ul>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg border border-green-500/50">
                    <h5 className="font-bold text-lg text-green-400">LACP (Link Aggregation Control Protocol)</h5>
                    <p className="text-sm mt-2">
                        بروتوكول قياسي مفتوح (IEEE 802.3ad)، يعمل مع أجهزة من مختلف الشركات.
                    </p>
                     <ul className="list-disc list-inside text-sm space-y-1 mt-3">
                         <li><strong>Active:</strong> يبدأ التفاوض بنشاط.</li>
                         <li><strong>Passive:</strong> ينتظر الطرف الآخر ليبدأ التفاوض.</li>
                    </ul>
                </div>
            </div>
             <p className="mt-2"><strong className="text-yellow-400">ملاحظة هامة:</strong> لتشكيل قناة، يجب أن يكون أحد الجانبين على الأقل في وضع نشط (Desirable أو Active).</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أوامر تكوين EtherChannel (LACP)</h4>
            <p>
                <strong className="text-red-400">شرط أساسي:</strong> يجب أن تتطابق الإعدادات (السرعة، Duplex، VLANs) على جميع الواجهات المادية التي ستنضم إلى القناة.
            </p>
            <CodeBlock>
{`! 1. Select the range of physical interfaces
Switch(config)# interface range fa0/1 - 2

! 2. (Best Practice) Shut down the interfaces before configuration
Switch(config-if-range)# shutdown

! 3. Create the channel group using LACP
! Mode 'active' makes this switch actively try to form a channel
Switch(config-if-range)# channel-protocol lacp
Switch(config-if-range)# channel-group 1 mode active

! 4. Re-enable the interfaces
Switch(config-if-range)# no shutdown

! 5. Configure the logical Port-channel interface
Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20

! 6. Verify the configuration
Switch# show etherchannel summary`}
            </CodeBlock>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الخامس</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هما المشكلتان الرئيسيتان اللتان تحلهما تقنية EtherChannel؟</li>
                <li>ماذا يرى بروتوكول STP عند النظر إلى مجموعة من الروابط المادية المكونة كـ EtherChannel؟</li>
                <li>إذا كنت تقوم بتكوين EtherChannel بين محول سيسكو ومحول من شركة أخرى، فأي بروتوكول تفاوض يجب أن تستخدمه؟</li>
                <li>ما هي الشروط التي يجب أن تتطابق على الواجهات المادية قبل تجميعها في EtherChannel؟</li>
                <li>في LACP، هل يمكن تشكيل قناة إذا تم تكوين كلا الجانبين على أنهما "passive"؟ ولماذا؟</li>
            </ol>
        </section>
    </>
);

const Chapter6: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هو DHCP؟</h4>
            <p>
                بروتوكول التكوين الديناميكي للمضيفين (DHCP) هو بروتوكول من طبقة التطبيقات يقوم <strong className="text-cyan-400">بأتمتة عملية تعيين عناوين IP</strong> وإعدادات الشبكة الأخرى (مثل قناع الشبكة، البوابة الافتراضية، وخوادم DNS) للأجهزة عند اتصالها بالشبكة. هذا يوفر على مسؤولي الشبكات عناء تكوين كل جهاز يدويًا.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">آلية عمل DHCPv4 (DORA)</h4>
            <p>
                يعمل DHCP من خلال عملية تفاوض من أربع خطوات بين العميل (الجهاز الذي يحتاج عنوان IP) والخادم (الجهاز الذي يوزع العناوين):
            </p>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-yellow-400">Discover (اكتشاف):</strong> يرسل العميل رسالة بث (DHCPDISCOVER) ليسأل "هل يوجد أي خادم DHCP هنا؟".</li>
                <li><strong className="text-yellow-400">Offer (عرض):</strong> يرد خادم DHCP أو أكثر برسالة إرسال أحادي (DHCPOFFER) تعرض على العميل عنوان IP وإعدادات أخرى.</li>
                <li><strong className="text-yellow-400">Request (طلب):</strong> يختار العميل أحد العروض ويرسل رسالة بث (DHCPREQUEST) ليطلب رسميًا استخدام هذا العنوان.</li>
                <li><strong className="text-yellow-400">Acknowledge (إقرار):</strong> يرسل الخادم رسالة إرسال أحادي نهائية (DHCPACK) لتأكيد "استئجار" العنوان للعميل لفترة زمنية محددة.</li>
            </ol>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين راوتر سيسكو كخادم DHCP</h4>
            <p>
                يمكن تكوين موجه سيسكو ليعمل كخادم DHCP للشبكات المحلية المتصلة به مباشرة.
            </p>
            <CodeBlock>
{`! 1. Exclude addresses you want to reserve for static assignment (router, servers, printers)
Router(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.9

! 2. Create a DHCP pool with a name
Router(config)# ip dhcp pool LAN-POOL-10

! 3. Define the network and subnet mask for the pool
Router(dhcp-config)# network 192.168.10.0 255.255.255.0

! 4. Define the default gateway for the clients
Router(dhcp-config)# default-router 192.168.10.1

! 5. Define the DNS server for the clients
Router(dhcp-config)# dns-server 8.8.8.8

! 6. Verify the configuration
Router# show running-config | section dhcp
Router# show ip dhcp binding`}
            </CodeBlock>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">DHCP Relay Agent</h4>
            <p>
                رسائل اكتشاف DHCP هي رسائل بث، والموجهات لا تمرر البث. فماذا لو كان خادم DHCP في شبكة مختلفة عن العملاء؟
            </p>
            <p>
                الحل هو تكوين واجهة الموجه التي تستقبل طلبات البث كـ <strong className="text-cyan-400">DHCP Relay Agent</strong>. تقوم هذه الواجهة بتحويل رسالة البث إلى رسالة إرسال أحادي موجهة إلى عنوان IP الخاص بخادم DHCP الحقيقي.
            </p>
            <CodeBlock>
{`! On the router interface that receives DHCP Discover broadcasts
Router(config)# interface g0/0/0
! The helper-address is the IP of the actual DHCP server
Router(config-if)# ip helper-address 10.10.10.254`}
            </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل السادس</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الفائدة الرئيسية لاستخدام DHCP في الشبكة؟</li>
                <li>ما هي الخطوات الأربع في عملية DHCP، والمعروفة باسم DORA؟</li>
                <li>ما هو الغرض من الأمر `ip dhcp excluded-address` عند تكوين خادم DHCP على موجه سيسكو؟</li>
                <li>لماذا نحتاج إلى تكوين `ip helper-address` في بعض تصميمات الشبكات؟</li>
                <li>هل رسالة DHCPOFFER هي رسالة بث أم إرسال أحادي؟ ولماذا؟</li>
            </ol>
        </section>
    </>
);

const Chapter7: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: عنونة IPv6 الديناميكية</h4>
            <p>
                بسبب وفرة العناوين في IPv6، هناك طرق أكثر تطورًا ومرونة لتعيين العناوون للأجهزة ديناميكيًا مقارنة بـ IPv4. الطريقتان الرئيسيتان هما SLAAC و DHCPv6.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">رسائل ICMPv6 الحيوية</h4>
            <p>
                تعتمد عنونة IPv6 الديناميكية بشكل كبير على رسالتين من ICMPv6:
            </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Router Solicitation (RS):</strong> رسالة يرسلها العميل عندما يتصل بالشبكة لأول مرة، يسأل فيها "هل يوجد أي موجه هنا؟ أحتاج إلى معلومات الشبكة".</li>
                <li><strong className="text-cyan-400">Router Advertisement (RA):</strong> رسالة يرسلها الموجه بشكل دوري أو كرد على رسالة RS. تحتوي هذه الرسالة على معلومات حيوية مثل بادئة الشبكة (Network Prefix) وطول البادئة، وأحيانًا معلومات أخرى مثل عنوان DNS.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الطريقة الأولى: SLAAC</h4>
            <p>
                <strong className="text-cyan-400">SLAAC (Stateless Address Autoconfiguration)</strong> هي طريقة تسمح للجهاز بتكوين عنوان IPv6 العالمي الخاص به (GUA) بنفسه <strong className="text-yellow-400">بدون الحاجة إلى خادم DHCP</strong>.
            </p>
            <p><strong>كيف تعمل:</strong></p>
            <ol className="list-decimal list-inside space-y-2">
                <li>يرسل الجهاز رسالة RS.</li>
                <li>يستلم رسالة RA من الموجه، والتي تحتوي على بادئة الشبكة (أول 64 بت).</li>
                <li>يقوم الجهاز بإنشاء معرف الواجهة (Interface ID) الخاص به (آخر 64 بت) باستخدام إحدى طريقتين:
                    <ul className="list-[circle] list-inside ml-5 mt-1 text-sm">
                        <li><strong>EUI-64:</strong> طريقة قديمة تعتمد على عنوان MAC الخاص بالجهاز.</li>
                        <li><strong>Randomly Generated:</strong> الطريقة الحديثة والمفضلة لأسباب أمنية.</li>
                    </ul>
                </li>
                 <li>يجمع الجهاز بين بادئة الشبكة ومعرف الواجهة للحصول على عنوان GUA كامل وفريد.</li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الطريقة الثانية: DHCPv6</h4>
            <p>
                يعمل DHCPv6 عندما تحتاج الشبكة إلى تحكم أكبر في العناوين أو عندما لا توفر رسالة RA كل المعلومات المطلوبة (مثل عنوان DNS). له وضعان:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-green-400">Stateless DHCPv6 (بدون حالة)</h5>
                    <p className="text-sm mt-2">
                       يستخدم هذا الوضع <strong className="text-yellow-400">مزيجًا</strong>. يحصل الجهاز على بادئة الشبكة من رسالة RA (باستخدام SLAAC)، ولكنه يتصل بخادم DHCPv6 للحصول على معلومات إضافية فقط (مثل DNS).
                    </p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-orange-400">Stateful DHCPv6 (بحالة)</h5>
                    <p className="text-sm mt-2">
                        هذا الوضع هو الأقرب إلى DHCPv4. لا يستخدم الجهاز رسالة RA لتكوين عنوانه. بدلاً من ذلك، يتصل مباشرة بخادم DHCPv6 ليقوم الخادم <strong className="text-yellow-400">بتعيين وتتبع</strong> عنوان GUA الكامل للجهاز.
                    </p>
                </div>
            </div>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل السابع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي رسالتا ICMPv6 اللتان تشكلان أساس عنونة IPv6 الديناميكية؟</li>
                <li>ما هو الفرق الرئيسي بين SLAAC و DHCPv6 Stateful من حيث من المسؤول عن تكوين عنوان GUA الكامل للجهاز؟</li>
                <li>في أي سيناريو قد تحتاج إلى استخدام Stateless DHCPv6؟</li>
                <li>ما هي قطعة المعلومات الأساسية التي يحصل عليها العميل من رسالة RA ليتمكن من تكوين عنوانه باستخدام SLAAC؟</li>
                <li>كيف يقوم جهاز بتكوين معرف الواجهة (Interface ID) الخاص به في IPv6 (اذكر طريقتين)؟</li>
            </ol>
        </section>
    </>
);

const Chapter8: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: مشكلة نقطة الفشل الواحدة</h4>
            <p>
                في شبكة نموذجية، يتم تكوين جميع الأجهزة لاستخدام عنوان IP الخاص بالموجه كبوابة افتراضية (Default Gateway). ولكن ماذا يحدث إذا فشل هذا الموجه؟ ستفقد جميع الأجهزة في تلك الشبكة قدرتها على الوصول إلى الشبكات الخارجية، حتى لو كانت هناك موجهات أخرى متاحة. هذه مشكلة <strong className="text-red-400">نقطة الفشل الواحدة (Single Point of Failure)</strong>.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">حل FHRP</h4>
            <p>
                بروتوكولات تكرار القفزة الأولى (First Hop Redundancy Protocols - FHRPs) هي مجموعة من البروتوكولات المصممة لحل هذه المشكلة عن طريق إنشاء <strong className="text-cyan-400">بوابة افتراضية وهمية</strong> تشترك فيها عدة موجهات مادية.
            </p>
            <p>
                يتم تكوين الأجهزة النهائية لاستخدام عنوان IP الخاص بهذه البوابة الوهمية. في الخلفية، تتفق الموجهات المادية على أن يكون أحدها هو <strong className="text-green-400">الموجه النشط (Active Router)</strong> المسؤول عن توجيه حركة المرور، بينما يكون الآخر (أو الآخرون) في وضع <strong className="text-orange-400">الاستعداد (Standby Router)</strong>. إذا فشل الموجه النشط، يتولى الموجه الاحتياطي المسؤولية تلقائيًا وبشكل فوري، دون أن تشعر الأجهزة النهائية بأي انقطاع.
            </p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع بروتوكولات FHRP</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">HSRP (Hot Standby Router Protocol)</h5>
                    <p className="text-sm">بروتوكول خاص بشركة سيسكو. واحد نشط، واحد احتياطي، والباقي يستمع.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">VRRP (Virtual Router Redundancy Protocol)</h5>
                    <p className="text-sm">بروتوكول قياسي مفتوح. يعمل بشكل مشابه جدًا لـ HSRP.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">GLBP (Gateway Load Balancing Protocol)</h5>
                    <p className="text-sm">بروتوكول خاص بشركة سيسكو. يسمح بموازنة التحميل عن طريق السماح لجميع الموجهات في المجموعة بتوجيه حركة المرور في نفس الوقت.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">آلية عمل HSRP</h4>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">الموجه النشط (Active):</strong> يتم انتخابه بناءً على أعلى قيمة أولوية (priority)، وفي حالة التعادل، يتم استخدام أعلى عنوان IP. هو المسؤول عن الرد على طلبات ARP بعنوان MAC الوهمي وتوجيه حركة المرور.</li>
                <li><strong className="text-cyan-400">الموجه الاحتياطي (Standby):</strong> هو الموجه صاحب ثاني أعلى أولوية. يستمع لرسائل Hello من الموجه النشط، وإذا توقفت هذه الرسائل، فإنه يتولى دور النشط.</li>
                <li><strong className="text-cyan-400">Preemption:</strong> ميزة اختيارية تسمح لموجه ذي أولوية أعلى بأن يستعيد دور النشط إذا عاد للعمل بعد فشل.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثامن</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي المشكلة الأساسية التي تحلها بروتوكولات FHRP؟</li>
                <li>ما هو عنوان IP الذي يتم تكوينه كبوابة افتراضية على أجهزة الكمبيوتر عند استخدام HSRP؟</li>
                <li>في HSRP، كيف يتم انتخاب الموجه النشط؟</li>
                <li>ماذا يحدث إذا فشل الموجه النشط في مجموعة HSRP؟</li>
                <li>ما هي الميزة الرئيسية لبروتوكول GLBP مقارنة بـ HSRP؟</li>
            </ol>
        </section>
    </>
);

const Chapter9: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: نقاط الضعف في الشبكات المحلية</h4>
            <p>
                بينما نركز غالبًا على حماية الشبكة من التهديدات الخارجية (من الإنترنت)، فإن الشبكة المحلية (LAN) نفسها عرضة للعديد من الهجمات الداخلية التي يمكن أن تكون مدمرة بنفس القدر. هذا الفصل يركز على فهم وتأمين الطبقة الثانية.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أمان الأجهزة الطرفية (Endpoint Security)</h4>
            <p>
                الأجهزة الطرفية (أجهزة الكمبيوتر، الخوادم) غالبًا ما تكون أضعف حلقة. حمايتها تشمل:
            </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li>تثبيت برامج مكافحة الفيروسات والبرامج الضارة.</li>
                <li>استخدام جدران حماية شخصية (Host-based firewalls).</li>
                <li>تحديث أنظمة التشغيل والتطبيقات بانتظام لسد الثغرات الأمنية.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">التحكم في الوصول (Access Control)</h4>
            <p>
                من يجب أن يُسمح له بالوصول إلى الشبكة؟ تعتمد أنظمة التحكم في الوصول على ثلاثة مكونات (AAA):
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-cyan-400">Authentication (المصادقة):</strong> من أنت؟ (اسم مستخدم وكلمة مرور).</li>
                <li><strong className="text-cyan-400">Authorization (التفويض):</strong> ما الذي يُسمح لك بفعله؟ (صلاحيات القراءة/الكتابة).</li>
                <li><strong className="text-cyan-400">Accounting (المحاسبة):</strong> ماذا فعلت؟ (تسجيل الأنشطة).</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تهديدات الطبقة الثانية الشائعة</h4>
            <p>
                هذه الهجمات تستغل الآليات الأساسية لعمل المحولات وبروتوكولات الطبقة الثانية:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-red-400">MAC Address Table Flooding</h5>
                    <p className="text-sm mt-2">
                       يقوم المهاجم بإرسال آلاف الإطارات بعناوين MAC مصدر مزيفة لإغراق جدول MAC الخاص بالمحول. عندما يمتلئ الجدول، يبدأ المحول في التصرف مثل الموزع (Hub) ويرسل كل الإطارات إلى جميع المنافذ، مما يسمح للمهاجم بالتقاط حركة المرور.
                    </p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-red-400">DHCP Spoofing</h5>
                    <p className="text-sm mt-2">
                        يقوم المهاجم بتشغيل خادم DHCP مزيف على الشبكة. قد تستجيب الأجهزة لهذا الخادم وتحصل على إعدادات IP خاطئة، مثل بوابة افتراضية تشير إلى جهاز المهاجم، مما يسمح له بتنفيذ هجوم "رجل في المنتصف" (Man-in-the-Middle).
                    </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-red-400">ARP Spoofing/Poisoning</h5>
                    <p className="text-sm mt-2">
                        يرسل المهاجم ردود ARP مزيفة لربط عنوان IP لجهاز شرعي (مثل البوابة الافتراضية) بعنوان MAC الخاص به. هذا يخدع الأجهزة الأخرى لترسل حركة المرور الموجهة إلى البوابة إلى المهاجم بدلاً من ذلك.
                    </p>
                </div>
            </div>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل التاسع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي المكونات الثلاثة لنموذج التحكم في الوصول (AAA)؟</li>
                <li>ما هو الهدف النهائي لهجوم إغراق جدول MAC؟</li>
                <li>كيف يمكن لمهاجم استخدام هجوم DHCP Spoofing لتنفيذ هجوم رجل في المنتصف؟</li>
                <li>ما هي المعلومات التي يقوم المهاجم بتزييفها في هجوم ARP Spoofing؟</li>
                <li>لماذا تعتبر الأجهزة الطرفية (Endpoints) غالبًا الحلقة الأضعف في أمان الشبكة؟</li>
            </ol>
        </section>
    </>
);

const Chapter10: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: تطبيق حلول الأمان</h4>
            <p>
                بعد فهم التهديدات، يركز هذا الفصل على كيفية تكوين ميزات الأمان على محولات سيسكو للتخفيف من هجمات الطبقة الثانية الشائعة التي تعلمناها.
            </p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أمان المنافذ (Port Security)</h4>
            <p>
                هذه هي آلية الدفاع الأولى ضد هجمات إغراق جدول MAC والوصول غير المصرح به. <strong className="text-cyan-400">الوظيفة:</strong> تقييد الوصول إلى منفذ المحول بناءً على عناوين MAC.
            </p>
            <p>يمكن تكوينها لتحديد:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">الحد الأقصى للعناوين:</strong> تحديد عدد عناوين MAC المسموح بها على المنفذ (عادة 1).</li>
                <li><strong className="text-cyan-400">العناوين المسموح بها:</strong> يمكن تحديدها يدويًا أو جعل المحول يتعلمها ديناميكيًا (Sticky).</li>
                <li><strong className="text-cyan-400">إجراء الانتهاك (Violation Mode):</strong> ماذا يفعل المحول عند توصيل جهاز غير مصرح به؟
                     <ul className="list-[circle] list-inside ml-5 mt-1 text-sm">
                        <li><strong>Shutdown (الافتراضي):</strong> يغلق المنفذ بالكامل.</li>
                        <li><strong>Restrict:</strong> يمنع حركة المرور من الجهاز غير المصرح به ويرسل تنبيهًا.</li>
                        <li><strong>Protect:</strong> يمنع حركة المرور فقط، بدون تنبيه.</li>
                    </ul>
                </li>
            </ul>
             <h5 className="font-bold text-lg text-white mt-4">أوامر التكوين:</h5>
            <CodeBlock>
{`Switch(config)# interface fa0/1
! Enable Port Security on this access port
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security

! Set the maximum number of allowed MAC addresses
Switch(config-if)# switchport port-security maximum 1

! Set the violation mode to shut down the port
Switch(config-if)# switchport port-security violation shutdown

! Have the switch dynamically learn the MAC and "stick" it to the config
Switch(config-if)# switchport port-security mac-address sticky

! Verify
Switch# show port-security interface fa0/1`}
            </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">التخفيف من هجمات DHCP</h4>
            <p>
                <strong className="text-cyan-400">DHCP Snooping:</strong> هي ميزة أمان تقوم بتصنيف منافذ المحول إلى نوعين:
            </p>
             <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-green-400">Trusted (موثوق):</strong> منفذ يتصل به خادم DHCP شرعي.</li>
                <li><strong className="text-red-400">Untrusted (غير موثوق):</strong> أي منفذ آخر (عادة يتصل به المستخدمون).</li>
            </ul>
            <p>
                يقوم المحول <strong className="text-yellow-400">بحظر</strong> رسائل عرض DHCP (DHCPOFFER) التي تأتي من المنافذ غير الموثوقة، مما يمنع خوادم DHCP المزيفة من العمل.
            </p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">التخفيف من هجمات ARP</h4>
             <p>
                <strong className="text-cyan-400">Dynamic ARP Inspection (DAI):</strong> هي ميزة أمان تعترض جميع ردود ARP على المنافذ غير الموثوقة وتقارنها بالمعلومات الموجودة في جدول DHCP Snooping Binding Table. إذا كان ربط عنوان IP بـ MAC في رد ARP لا يتطابق مع ما تعلمه DHCP Snooping، يتم <strong className="text-yellow-400">التخلص</strong> من حزمة ARP المزيفة.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل العاشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الهجمة التي تهدف ميزة أمان المنافذ (Port Security) إلى التخفيف منها بشكل أساسي؟</li>
                <li>ماذا يفعل وضع الانتهاك "shutdown" إذا تم توصيل جهاز غير مصرح به بمنفذ مؤمن؟</li>
                <li>في DHCP Snooping، أي نوع من المنافذ (trusted أم untrusted) يجب تكوينه على المنفذ المتصل بخادم DHCP الشرعي؟</li>
                <li>على أي جدول أو قاعدة بيانات تعتمد ميزة Dynamic ARP Inspection (DAI) للتحقق من صحة حزم ARP؟</li>
                <li>ما هو الغرض من استخدام `mac-address sticky` في تكوين أمان المنافذ؟</li>
            </ol>
        </section>
    </>
);

const Chapter11: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هي الشبكات اللاسلكية؟</h4>
            <p>
                الشبكات المحلية اللاسلكية (WLANs) تستخدم موجات الراديو (RF) لنقل البيانات عبر الهواء، مما يوفر للأجهزة حرية الاتصال بالشبكة دون الحاجة إلى كابلات. تقنية Wi-Fi هي التطبيق الأكثر شيوعًا لمعايير IEEE 802.11 التي تحكم عمل الشبكات اللاسلكية.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مكونات الشبكة اللاسلكية</h4>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">نقطة الوصول (Access Point - AP):</strong> تربط الأجهزة اللاسلكية بالشبكة السلكية. تعمل كجسر بين العالمين السلكي واللاسلكي.</li>
                <li><strong className="text-cyan-400">متحكم الشبكة اللاسلكية (Wireless LAN Controller - WLC):</strong> جهاز مركزي يستخدم لإدارة وتكوين ومراقبة نقاط وصول متعددة في شبكات المؤسسات الكبيرة.</li>
                <li><strong className="text-cyan-400">العميل اللاسلكي (Wireless Client):</strong> أي جهاز مزود بمحول شبكة لاسلكي (مثل كمبيوتر محمول، هاتف ذكي).</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أوضاع تشغيل الشبكة اللاسلكية</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">Ad-hoc Mode</h5>
                    <p className="text-sm mt-2">
                       تتصل الأجهزة مباشرة ببعضها البعض دون الحاجة إلى نقطة وصول. تستخدم في حالات خاصة ومؤقتة.
                    </p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-orange-400">Infrastructure Mode</h5>
                    <p className="text-sm mt-2">
                        الوضع الأكثر شيوعًا. تتصل جميع الأجهزة اللاسلكية بنقطة وصول (AP)، والتي بدورها تتصل بالشبكة السلكية.
                    </p>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">معايير 802.11 الشائعة</h4>
            <p>
                تحدد هذه المعايير السرعة والنطاق الترددي الذي تعمل عليه الشبكة اللاسلكية.
            </p>
             <ul className="list-disc list-inside space-y-2">
                <li><strong>802.11n (Wi-Fi 4):</strong> يعمل على نطاقي 2.4 جيجاهرتز و 5 جيجاهرتز.</li>
                <li><strong>802.11ac (Wi-Fi 5):</strong> يعمل على نطاق 5 جيجاهرتز فقط، ويوفر سرعات أعلى بكثير.</li>
                <li><strong>802.11ax (Wi-Fi 6):</strong> أحدث معيار، يعمل على كلا النطاقين ويوفر كفاءة وسرعة أفضل في البيئات المزدحمة.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">عملية اتصال العميل بالشبكة اللاسلكية</h4>
            <p>
                تتضمن العملية ثلاث خطوات:
            </p>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-yellow-400">Discover (اكتشاف):</strong> يبحث العميل عن نقاط وصول قريبة عن طريق إرسال طلبات فحص (probe requests) أو الاستماع لإطارات المنارة (beacon frames) التي تبثها نقاط الوصول.</li>
                <li><strong className="text-yellow-400">Authenticate (مصادقة):</strong> يتحقق العميل ونقطة الوصول من هوية بعضهما البعض.</li>
                <li><strong className="text-yellow-400">Associate (ارتباط):</strong> بعد المصادقة الناجحة، يتم إنشاء ارتباط منطقي بين العميل ونقطة الوصول للسماح بمرور البيانات.</li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الحادي عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الوظيفة الأساسية لنقطة الوصول (AP) في شبكة لاسلكية؟</li>
                <li>ما هو الدور الذي يلعبه متحكم الشبكة اللاسلكية (WLC) في شبكة مؤسسة كبيرة؟</li>
                <li>ما هو الفرق بين وضع Ad-hoc ووضع Infrastructure في الشبكات اللاسلكية؟</li>
                <li>ما هو أحدث معيار Wi-Fi الذي يوفر أفضل أداء في البيئات المزدحمة؟</li>
                <li>ما هي الخطوة التي تلي المصادقة الناجحة في عملية اتصال العميل بالشبكة اللاسلكية؟</li>
            </ol>
        </section>
    </>
);

const Chapter12: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: إعداد شبكة لاسلكية</h4>
            <p>
                يركز هذا الفصل على الخطوات العملية لتكوين شبكة لاسلكية (WLAN) آمنة، سواء باستخدام موجه لاسلكي منزلي أو باستخدام بنية تحتية أكثر تعقيدًا تعتمد على متحكم الشبكة اللاسلكية (WLC).
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">إعداد موجه لاسلكي منزلي</h4>
            <p>
                تشمل الإعدادات الأساسية ما يلي:
            </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">SSID (Service Set Identifier):</strong> اسم الشبكة اللاسلكية الذي يراه المستخدمون.</li>
                <li><strong className="text-cyan-400">كلمة المرور (Password):</strong> لتأمين الشبكة. من الضروري استخدام طريقة تشفير قوية.</li>
                <li><strong className="text-cyan-400">وضع الشبكة (Network Mode):</strong> اختيار أحدث معيار 802.11 تدعمه أجهزتك.</li>
                <li><strong className="text-cyan-400">القناة (Channel):</strong> في نطاق 2.4 جيجاهرتز، اختر القنوات 1 أو 6 أو 11 لتجنب التداخل مع الشبكات المجاورة.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أمان الشبكة اللاسلكية</h4>
            <p>
                تأمين الشبكة اللاسلكية أمر حيوي. إليك تطور طرق المصادقة والتشفير:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-red-400">WEP (Wired Equivalent Privacy):</strong> طريقة قديمة وضعيفة للغاية. لا تستخدمها أبدًا.</li>
                <li><strong className="text-orange-400">WPA (Wi-Fi Protected Access):</strong> تحسين على WEP، ولكنه أيضًا به ثغرات.</li>
                <li><strong className="text-yellow-400">WPA2 (Wi-Fi Protected Access 2):</strong> المعيار القوي الذي كان مستخدمًا لسنوات عديدة. يستخدم تشفير AES.</li>
                <li><strong className="text-green-400">WPA3 (Wi-Fi Protected Access 3):</strong> أحدث وأقوى معيار أمان للشبكات اللاسلكية.</li>
            </ul>
            <p className="mt-2">
                هناك نوعان من مصادقة WPA2/WPA3:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-cyan-400">Personal (PSK - Pre-Shared Key):</strong> مناسب للشبكات المنزلية. يتم استخدام كلمة مرور واحدة مشتركة بين جميع المستخدمين.</li>
                <li><strong className="text-cyan-400">Enterprise:</strong> مناسب لشبكات الشركات. يتطلب خادم مصادقة (RADIUS) حيث يكون لكل مستخدم اسم مستخدم وكلمة مرور خاصة به.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين WLAN باستخدام WLC</h4>
            <p>
                في شبكات المؤسسات، يتم تكوين الشبكات اللاسلكية مركزيًا على WLC، ثم يتم دفع هذه الإعدادات إلى جميع نقاط الوصول (APs) المرتبطة به.
            </p>
            <p><strong>الخطوات العامة:</strong></p>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li>تسجيل الدخول إلى واجهة الويب الخاصة بـ WLC.</li>
                <li>إنشاء WLAN جديدة.</li>
                <li>تحديد اسم SSID وملف التعريف (Profile Name).</li>
                <li>ربط الـ WLAN بواجهة VLAN معينة (إذا لزم الأمر).</li>
                <li>تكوين إعدادات الأمان (مثل WPA2/WPA3 Personal أو Enterprise).</li>
                <li>تفعيل الـ WLAN.</li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثاني عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو SSID؟</li>
                <li>لماذا يجب تجنب استخدام القنوات المتداخلة (مثل 2، 3، 4) في نطاق 2.4 جيجاهرتز؟</li>
                <li>ما هي طريقة تشفير Wi-Fi التي تعتبر الأضعف ويجب عدم استخدامها أبدًا؟</li>
                <li>ما هو الفرق بين WPA2-Personal و WPA2-Enterprise؟</li>
                <li>ما هي الميزة الرئيسية لتكوين WLANs على WLC بدلاً من تكوين كل نقطة وصول على حدة؟</li>
            </ol>
        </section>
    </>
);

const Chapter13: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: إعادة النظر في وظائف الموجه</h4>
            <p>
                الراوتر هو جهاز من الطبقة الثالثة يقوم <strong className="text-cyan-400">بتوجيه الحزم بين الشبكات المختلفة</strong>. يتخذ قراراته بناءً على <strong className="text-cyan-400">عنوان IP الوجهة</strong> الموجود في ترويسة الحزمة. يقوم بالبحث في <strong className="text-cyan-400">جدول التوجيه (Routing Table)</strong> الخاص به لتحديد أفضل مسار لإرسال الحزمة.
            </p>
             <ul className="list-disc list-inside space-y-2 mt-2">
                <li>يقسم نطاقات البث.</li>
                <li>يربط بين تقنيات شبكات مختلفة (مثل Ethernet و WAN).</li>
                <li>يوفر اتصالاً بالإنترنت.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تشريح جدول التوجيه</h4>
            <p>
                جدول التوجيه هو خريطة الشبكة بالنسبة للراوتر. كل إدخال في الجدول يحتوي عادةً على:
            </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">مصدر المسار (Route Source):</strong> كيف تعلم الراوتر بهذا المسار؟ (C للمتصل مباشرة، S للثابت، O لـ OSPF، إلخ).</li>
                <li><strong className="text-cyan-400">شبكة الوجهة (Destination Network):</strong> الشبكة التي يمكن الوصول إليها عبر هذا المسار.</li>
                <li><strong className="text-cyan-400">المسافة الإدارية (Administrative Distance - AD):</strong> مقياس "موثوقية" مصدر المسار. الأرقام الأقل هي الأفضل. (المتصل مباشرة = 0، الثابت = 1، OSPF = 110).</li>
                <li><strong className="text-cyan-400">المقياس (Metric):</strong> القيمة التي يستخدمها بروتوكول التوجيه لتحديد أفضل مسار عندما يكون لديه مسارات متعددة لنفس الوجهة. (مثل عدد القفزات لـ RIP، أو التكلفة لـ OSPF).</li>
                <li><strong className="text-cyan-400">القفزة التالية (Next Hop):</strong> عنوان IP للراوتر التالي الذي يجب إرسال الحزمة إليه.</li>
                <li><strong className="text-cyan-400">واجهة الخروج (Exit Interface):</strong> الواجهة المحلية التي يجب إرسال الحزمة منها.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">التوجيه الثابت مقابل الديناميكي</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">التوجيه الثابت (Static Routing)</h5>
                    <p className="text-sm mt-2">
                       يقوم مسؤول الشبكة <strong className="text-yellow-400">بإدخال المسارات يدويًا</strong> في كل راوتر.
                    </p>
                     <ul className="list-disc list-inside text-sm space-y-1 mt-3">
                         <li><strong>المزايا:</strong> آمن، لا يستهلك موارد المعالج، سهل الإعداد في الشبكات الصغيرة.</li>
                         <li><strong>العيوب:</strong> لا يتكيف مع تغييرات الشبكة، ممل ومرهق في الشبكات الكبيرة.</li>
                    </ul>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-orange-400">التوجيه الديناميكي (Dynamic Routing)</h5>
                    <p className="text-sm mt-2">
                        تستخدم الموجهات <strong className="text-yellow-400">بروتوكولات التوجيه</strong> (مثل OSPF, EIGRP) لمشاركة معلومات الشبكة مع بعضها البعض واكتشاف أفضل المسارات تلقائيًا.
                    </p>
                     <ul className="list-disc list-inside text-sm space-y-1 mt-3">
                         <li><strong>المزايا:</strong> يتكيف تلقائيًا مع التغييرات، قابل للتطوير للشبكات الكبيرة.</li>
                         <li><strong>العيوب:</strong> يستهلك موارد المعالج والذاكرة، يتطلب فهمًا أعمق للتكوين.</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثالث عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي قطعة المعلومات الأساسية التي يستخدمها الراوتر لاتخاذ قرار التوجيه؟</li>
                <li>إذا كان لدى الراوتر مساران إلى نفس الوجهة، أحدهما تعلمه من OSPF (AD=110) والآخر مسار ثابت (AD=1)، فأي مسار سيستخدمه؟ ولماذا؟</li>
                <li>ما هي الميزة الرئيسية للتوجيه الديناميكي مقارنة بالتوجيه الثابت؟</li>
                <li>ماذا يعني الرمز "C" بجانب مسار في جدول التوجيه؟</li>
                <li>ما هو "المقياس" (Metric) في سياق بروتوكولات التوجيه؟</li>
            </ol>
        </section>
    </>
);

const Chapter14: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: متى نستخدم المسارات الثابتة؟</h4>
            <p>
                على الرغم من قوة بروتوكولات التوجيه الديناميكي، لا تزال المسارات الثابتة لها مكانة هامة في الشبكات الحديثة. يتم استخدامها بشكل شائع في:
            </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li>الشبكات الصغيرة التي لا يتغير تصميمها كثيرًا.</li>
                <li>توفير اتصال لشبكة طرفية (Stub Network) لديها مخرج واحد فقط.</li>
                <li>تحديد مسار افتراضي (Default Route) لتوجيه كل حركة المرور غير المعروفة.</li>
                <li>إنشاء مسار احتياطي (Floating Static Route).</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع المسارات الثابتة</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-cyan-400">Standard Static Route:</strong> مسار محدد لشبكة وجهة معينة.</li>
                <li><strong className="text-cyan-400">Default Static Route:</strong> مسار "كل شيء آخر". يطابق جميع الشبكات التي لا يوجد لها مسار أكثر تحديدًا في جدول التوجيه. (الوجهة: 0.0.0.0 0.0.0.0).</li>
                <li><strong className="text-cyan-400">Floating Static Route:</strong> مسار ثابت يتم تكوينه بمسافة إدارية (AD) أعلى من المسار الأساسي. هذا يجعله مسارًا احتياطيًا لا يظهر في جدول التوجيه إلا إذا فشل المسار الأساسي.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أوامر تكوين المسارات الثابتة (IPv4)</h4>
            <p>
                الصيغة العامة للأمر هي: <code className="text-yellow-400 font-mono">ip route [network-address] [subnet-mask] [next-hop-ip | exit-interface]</code>
            </p>
            <h5 className="font-bold text-lg text-white mt-4">1. استخدام عنوان القفزة التالية (Next-Hop IP)</h5>
            <p className="text-sm">الطريقة الأكثر شيوعًا. تحدد عنوان IP للراوتر التالي الذي يجب إرسال الحزمة إليه.</p>
            <CodeBlock>
{`! To reach network 172.16.1.0/24, send packets to router at 172.16.2.2
R1(config)# ip route 172.16.1.0 255.255.255.0 172.16.2.2`}
            </CodeBlock>

            <h5 className="font-bold text-lg text-white mt-4">2. استخدام واجهة الخروج (Exit Interface)</h5>
            <p className="text-sm">تستخدم عادة في الروابط من نقطة إلى نقطة (مثل الواجهات التسلسلية).</p>
            <CodeBlock>
{`R1(config)# ip route 172.16.1.0 255.255.255.0 Serial0/1/0`}
            </CodeBlock>

            <h5 className="font-bold text-lg text-white mt-4">3. تكوين مسار افتراضي</h5>
            <CodeBlock>
{`! Send all traffic for unknown networks to 172.16.2.2
R1(config)# ip route 0.0.0.0 0.0.0.0 172.16.2.2`}
            </CodeBlock>
             <h5 className="font-bold text-lg text-white mt-4">4. تكوين مسار عائم (Floating)</h5>
             <p className="text-sm">لاحظ المسافة الإدارية (5) المضافة في النهاية، وهي أعلى من المسافة الافتراضية (1).</p>
            <CodeBlock>
{`! This is a backup route
R1(config)# ip route 0.0.0.0 0.0.0.0 10.10.10.2 5`}
            </CodeBlock>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">المسارات الثابتة لـ IPv6</h4>
            <p>
                التكوين مشابه جدًا لـ IPv4، مع استخدام الأمر <code className="text-yellow-400 font-mono">ipv6 route</code>.
            </p>
            <CodeBlock>
{`! Standard IPv6 static route
R1(config)# ipv6 route 2001:db8:acad:1::/64 2001:db8:acad:3::2

! Default IPv6 static route (::/0 represents all networks)
R1(config)# ipv6 route ::/0 2001:db8:acad:3::2`}
            </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الرابع عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الغرض من المسار الافتراضي؟</li>
                <li>كيف تجعل مسارًا ثابتًا "عائمًا" (floating) ليصبح مسارًا احتياطيًا؟</li>
                <li>ما هو الأمر الذي تستخدمه لتكوين مسار ثابت لشبكة IPv6؟</li>
                <li>في أي نوع من الروابط يفضل استخدام واجهة الخروج بدلاً من عنوان IP للقفزة التالية عند تكوين مسار ثابت؟</li>
                <li>ما هي المسافة الإدارية الافتراضية للمسار الثابت؟</li>
            </ol>
        </section>
    </>
);

const Chapter15: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: منهجية استكشاف الأخطاء</h4>
            <p>
                عندما لا يعمل التوجيه كما هو متوقع، من المهم اتباع نهج منهجي بدلاً من تغيير الإعدادات بشكل عشوائي. العملية تبدأ بالتحقق من الاتصال طبقة تلو الأخرى.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">خطوات استكشاف الأخطاء وإصلاحها</h4>
            <ol className="list-decimal list-inside space-y-3 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">التحقق من الطبقة المادية:</strong> هل الكابلات موصولة بشكل صحيح؟ هل الواجهات في حالة "up/up"؟ استخدم الأمر <code className="text-yellow-400 font-mono">show ip interface brief</code>.</li>
                <li><strong className="text-cyan-400">التحقق من الاتصال المحلي:</strong> هل يمكنك عمل ping على عنوان IP للقفزة التالية؟ إذا لم تتمكن من ذلك، فالمشكلة تكمن في الطبقة الثانية (VLANs, Trunks, etc.) أو خطأ في عنونة IP.</li>
                <li><strong className="text-cyan-400">التحقق من جدول التوجيه:</strong> هل المسار الثابت يظهر في جدول التوجيه؟ استخدم <code className="text-yellow-400 font-mono">show ip route</code> أو <code className="text-yellow-400 font-mono">show ipv6 route</code>. إذا لم يكن موجودًا، تحقق من:
                    <ul className="list-[circle] list-inside ml-5 mt-1 text-sm">
                        <li>هل واجهة الخروج نشطة؟ (يجب أن تكون up/up).</li>
                        <li>هل هناك خطأ إملائي في أمر التكوين؟</li>
                    </ul>
                </li>
                 <li><strong className="text-cyan-400">التحقق من المسار العكسي:</strong> تذكر أن الاتصال هو طريق ذو اتجاهين. هل لدى الراوتر البعيد مسار للعودة إلى شبكتك؟ غالبًا ما يتم نسيان هذه الخطوة.</li>
            </ol>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أوامر التحقق الأساسية</h4>
             <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong className="text-cyan-400">ping:</strong>
                    <p className="text-sm">أول وأهم أداة. اختبر الاتصال بالقفزة التالية، ثم بالوجهة النهائية.</p>
                </li>
                <li>
                    <strong className="text-cyan-400">traceroute (tracert):</strong>
                    <p className="text-sm">يساعدك على تحديد النقطة التي يتوقف عندها الفشل في المسار.</p>
                </li>
                <li>
                    <strong className="text-cyan-400">show ip route [network]:</strong>
                    <p className="text-sm">يعرض تفاصيل المسار لشبكة معينة، ويوضح لك كيف تعلم الراوتر بهذا المسار.</p>
                </li>
                 <li>
                    <strong className="text-cyan-400">show running-config | section ip route:</strong>
                    <p className="text-sm">يعرض فقط أوامر المسارات الثابتة من التكوين الحالي، مما يسهل اكتشاف الأخطاء الإملائية.</p>
                </li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مشاكل شائعة في المسارات الثابتة</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-red-400">خطأ في شبكة الوجهة أو القناع</h5>
                    <p className="text-sm mt-2">
                       كتابة عنوان الشبكة أو قناع الشبكة بشكل غير صحيح في أمر <code className="font-mono">ip route</code>.
                    </p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-red-400">خطأ في عنوان القفزة التالية</h5>
                    <p className="text-sm mt-2">
                        تحديد عنوان IP للقفزة التالية لا يمكن الوصول إليه مباشرة من الراوتر.
                    </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-red-400">عدم وجود مسار عكسي</h5>
                    <p className="text-sm mt-2">
                        الراوتر الوجهة لا يعرف كيفية الرد على الشبكة المصدر.
                    </p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-red-400">واجهة الخروج غير نشطة</h5>
                    <p className="text-sm mt-2">
                        الواجهة المستخدمة للوصول إلى القفزة التالية في حالة down أو shutdown.
                    </p>
                </div>
            </div>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الخامس عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو أول شيء يجب عليك التحقق منه إذا كان المسار الثابت لا يعمل؟ (تلميح: يتعلق بالطبقات الدنيا).</li>
                <li>ماذا يعني إذا كان بإمكانك عمل ping على عنوان القفزة التالية ولكن ليس على جهاز في الشبكة النهائية؟</li>
                <li>ما هو الأمر الذي يظهر لك المسار الكامل الذي تسلكه الحزم إلى الوجهة؟</li>
                <li>لماذا من المهم التحقق من وجود مسار عكسي عند استكشاف أخطاء الاتصال وإصلاحها؟</li>
                <li>ماذا يشير الأمر `show ip route` إذا لم يكن المسار الثابت الذي قمت بتكوينه موجودًا في المخرجات؟</li>
            </ol>
        </section>
    </>
);

const Chapter16: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هو OSPF؟</h4>
            <p>
                بروتوكول OSPF (Open Shortest Path First) هو بروتوكول توجيه ديناميكي من نوع <strong className="text-cyan-400">حالة الارتباط (Link-State)</strong>. إنه أحد أكثر بروتوكولات التوجيه الداخلية (IGP) شيوعًا في شبكات المؤسسات الكبيرة.
            </p>
            <p>
                على عكس بروتوكولات متجه المسافة (مثل RIP) التي تعتمد على "الشائعات" من الجيران، يقوم كل موجه OSPF ببناء خريطة كاملة (طوبولوجيا) للشبكة. ثم يستخدم هذه الخريطة لحساب أفضل مسار إلى كل وجهة بشكل مستقل.
            </p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">خصائص OSPF</h4>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">غير صنفي (Classless):</strong> يرسل قناع الشبكة الفرعية مع تحديثاته، مما يسمح بدعم VLSM.</li>
                <li><strong className="text-cyan-400">كفاءة:</strong> لا يرسل تحديثات دورية. يتم إرسال التحديثات فقط عند حدوث تغيير في الشبكة.</li>
                <li><strong className="text-cyan-400">تقارب سريع:</strong> يتكيف بسرعة مع تغييرات طوبولوجيا الشبكة.</li>
                <li><strong className="text-cyan-400">قابلية للتوسع:</strong> يمكن استخدامه في الشبكات الصغيرة والكبيرة جدًا بفضل مفهوم المناطق (Areas).</li>
                <li><strong className="text-cyan-400">آمن:</strong> يدعم مصادقة التحديثات لضمان عدم قبول معلومات توجيه من مصادر غير موثوقة.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مكونات OSPF</h4>
            <p>يعتمد OSPF على ثلاث جداول رئيسية:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-yellow-400">جدول الجيران (Neighbor Table):</strong> قائمة بالموجهات المجاورة التي أقام معها علاقة جوار.</li>
                <li><strong className="text-yellow-400">جدول الطوبولوجيا (Topology Table):</strong> يحتوي على جميع معلومات حالة الارتباط (LSAs) التي تم جمعها من جميع الموجهات في المنطقة. هذه هي "الخريطة" الكاملة.</li>
                <li><strong className="text-yellow-400">جدول التوجيه (Routing Table):</strong> يحتوي على أفضل المسارات التي تم حسابها بواسطة خوارزمية SPF.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين OSPFv2 للمنطقة الواحدة</h4>
            <p>
                تكوين OSPF الأساسي بسيط ويتضمن خطوتين رئيسيتين:
            </p>
            <CodeBlock>
{`! 1. Enable the OSPF routing process
! The number '10' is a locally significant process ID
Router(config)# router ospf 10

! 2. Identify which interfaces will participate in OSPF
! The 'network' command tells OSPF which interfaces to enable and
! which networks to advertise. It uses a wildcard mask.
! This command enables OSPF on any interface in the 192.168.1.0/24 network
! and advertises that network.
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0

! (Optional but recommended) Set a static router ID
Router(config-router)# router-id 1.1.1.1

! (Optional) Make an interface passive so it doesn't send OSPF hellos
! Useful for interfaces connected to a LAN
Router(config-router)# passive-interface g0/0/0

! Verify the configuration
Router# show ip ospf neighbor
Router# show ip protocols
Router# show ip route ospf`}
            </CodeBlock>
        </section>
        
         <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقياس التكلفة (Cost Metric)</h4>
            <p>
                يستخدم OSPF <strong className="text-cyan-400">التكلفة (Cost)</strong> كمقياس لتحديد أفضل مسار. يتم حساب التكلفة بناءً على عرض النطاق الترددي للواجهة. الصيغة هي: <code className="text-yellow-400">Cost = Reference Bandwidth / Interface Bandwidth</code>.
            </p>
             <p>بشكل افتراضي، عرض النطاق الترددي المرجعي هو 100 ميجابت/ثانية، مما قد يسبب مشاكل في الشبكات الحديثة الأسرع. من الأفضل تعديله باستخدام الأمر <code className="text-yellow-400 font-mono">auto-cost reference-bandwidth [Mbps]</code>.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل السادس عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو نوع بروتوكول التوجيه OSPF؟</li>
                <li>ما هو المقياس الذي يستخدمه OSPF لتحديد أفضل مسار؟</li>
                <li>ما هو الغرض من الأمر `network` في تكوين OSPF؟</li>
                <li>ماذا يعني قناع الوايلد كارد `0.0.0.255`؟</li>
                <li>لماذا قد ترغب في تكوين واجهة على أنها `passive-interface` في OSPF؟</li>
            </ol>
        </section>
    </>
);

const CCNA2SummarySection: React.FC = () => {
    const [openChapter, setOpenChapter] = useState<number | null>(1);

    const chapters = [
        { id: 1, title: 'الفصل 1: مفاهيم التحويل الأساسية', content: <Chapter1 /> },
        { id: 2, title: 'الفصل 2: شبكات VLAN', content: <Chapter2 /> },
        { id: 3, title: 'الفصل 3: التوجيه بين شبكات VLAN', content: <Chapter3 /> },
        { id: 4, title: 'الفصل 4: مفاهيم STP', content: <Chapter4 /> },
        { id: 5, title: 'الفصل 5: قنوات EtherChannel', content: <Chapter5 /> },
        { id: 6, title: 'الفصل 6: بروتوكول DHCPv4', content: <Chapter6 /> },
        { id: 7, title: 'الفصل 7: SLAAC و DHCPv6', content: <Chapter7 /> },
        { id: 8, title: 'الفصل 8: مفاهيم FHRP', content: <Chapter8 /> },
        { id: 9, title: 'الفصل 9: مفاهيم أمان الشبكات المحلية', content: <Chapter9 /> },
        { id: 10, title: 'الفصل 10: تكوين أمان المحولات', content: <Chapter10 /> },
        { id: 11, title: 'الفصل 11: مفاهيم الشبكات اللاسلكية', content: <Chapter11 /> },
        { id: 12, title: 'الفصل 12: تكوين الشبكات اللاسلكية', content: <Chapter12 /> },
        { id: 13, title: 'الفصل 13: مفاهيم التوجيه', content: <Chapter13 /> },
        { id: 14, title: 'الفصل 14: التوجيه الثابت', content: <Chapter14 /> },
        { id: 15, title: 'الفصل 15: استكشاف أخطاء المسارات الثابتة', content: <Chapter15 /> },
        { id: 16, title: 'الفصل 16: مفاهيم OSPFv2 للمنطقة الواحدة', content: <Chapter16 /> },
    ];
    
    const handleToggle = (id: number) => {
        setOpenChapter(openChapter === id ? null : id);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">ملخصات CCNA2 v7: SRWE</h2>
            <p className="text-gray-400 mb-8">
                مرجع سريع لأهم المفاهيم في منهج CCNAv7 الثاني: أساسيات التحويل والتوجيه والشبكات اللاسلكية.
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

export default CCNA2SummarySection;