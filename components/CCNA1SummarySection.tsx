
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
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: الشبكات في حياتنا</h4>
            <p>تؤثر الشبكات على كل جانب من جوانب حياتنا اليومية، من التواصل مع الأصدقاء إلى العمل والتعلم والترفيه. لقد حولت العالم إلى "قرية عالمية بلا حدود".</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مكونات الشبكة الأساسية</h4>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">الأجهزة الطرفية (End Devices):</strong> هي مصدر أو وجهة الرسائل (البيانات). <span className="text-yellow-400 font-mono">مثال:</span> حاسوب، هاتف ذكي، طابعة شبكية، خادم (Server).</li>
                <li><strong className="text-cyan-400">الأجهزة الوسيطة (Intermediary Devices):</strong> تربط الأجهزة الطرفية ببعضها وتوجه البيانات عبر الشبكة. <span className="text-yellow-400 font-mono">مثال:</span> موجه (Router)، محول (Switch).</li>
                <li><strong className="text-cyan-400">وسائط الشبكة (Network Media):</strong> توفر القناة التي تنتقل عبرها البيانات. <span className="text-yellow-400 font-mono">مثال:</span> كابلات نحاسية، ألياف ضوئية، موجات لاسلكية.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع الشبكات</h4>
            <p>يتم تصنيف الشبكات بناءً على حجمها:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>LAN (Local Area Network):</strong> شبكة محلية تغطي منطقة جغرافية صغيرة (مكتب، منزل).</li>
                <li><strong>WAN (Wide Area Network):</strong> شبكة واسعة تربط الشبكات المحلية (LANs) عبر مناطق جغرافية شاسعة. الإنترنت هو أكبر مثال على شبكة WAN.</li>
                <li><strong>Intranet, Extranet, Internet:</strong>
                    <ul className="list-inside list-[circle] mr-5 mt-1">
                        <li><strong>الإنترنت (Internet):</strong> شبكة عالمية من الشبكات المترابطة.</li>
                        <li><strong>الإنترانت (Intranet):</strong> شبكة خاصة داخلية لمنظمة واحدة.</li>
                        <li><strong>الإكسترانت (Extranet):</strong> توفر وصولاً آمنًا لشبكة الإنترانت لجهات خارجية (عملاء، موردين).</li>
                    </ul>
                </li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الشبكة المتقاربة (Converged Network)</h4>
            <p><strong className="text-cyan-400">التعريف:</strong> هي بنية تحتية واحدة للشبكة يمكنها حمل أنواع مختلفة من حركة المرور (بيانات، صوت، فيديو) معًا.</p>
            <p><strong className="text-cyan-400">مثال:</strong> بدلاً من وجود شبكة منفصلة للهواتف وأخرى لأجهزة الكمبيوتر، تقوم الشبكة المتقاربة بدمج كل هذه الخدمات على شبكة IP واحدة، مما يقلل التكلفة والتعقيد.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">خصائص الشبكة الموثوقة</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">1. تحمل الأخطاء (Fault Tolerance)</h5>
                    <p className="text-sm">القدرة على الحد من تأثير الفشل عن طريق توفير مسارات بديلة (Redundancy). إذا انقطع كابل، يتم إعادة توجيه حركة المرور تلقائيًا عبر مسار آخر.</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">2. قابلية التوسع (Scalability)</h5>
                    <p className="text-sm">القدرة على النمو وإضافة مستخدمين وخدمات جديدة دون التأثير سلبًا على أداء الشبكة.</p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">3. جودة الخدمة (Quality of Service - QoS)</h5>
                    <p className="text-sm">إعطاء الأولوية لحركة المرور الهامة. <span className="text-yellow-400">مثال:</span> يتم إعطاء الأولوية لمكالمات الفيديو على تنزيل الملفات لضمان عدم حدوث تقطيع.</p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-cyan-400">4. الأمن (Security)</h5>
                    <p className="text-sm">حماية البنية التحتية للشبكة والبيانات من الوصول غير المصرح به. يشمل السرية والسلامة والتوافر.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الاتجاهات الحديثة في الشبكات</h4>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>BYOD (أحضر جهازك الخاص):</strong> السماح للموظفين باستخدام أجهزتهم الشخصية للوصول إلى شبكة الشركة.</li>
                <li><strong>الحوسبة السحابية (Cloud Computing):</strong> تخزين البيانات وتشغيل التطبيقات على خوادم عبر الإنترنت بدلاً من الخوادم المحلية.</li>
                <li><strong>إنترنت الأشياء (Internet of Things - IoT):</strong> توصيل الأشياء اليومية (مثل الثلاجات والأضواء) بالإنترنت.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الأول</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما الفرق بين الشبكة المحلية (LAN) والشبكة الواسعة (WAN) من حيث النطاق الجغرافي؟</li>
                <li>هاتف IP، حاسوب محمول، وخادم ويب، كلها أمثلة على أي نوع من مكونات الشبكة؟</li>
                <li>ما هو الهدف الرئيسي من "جودة الخدمة" (QoS) في الشبكة؟ أعط مثالاً.</li>
                <li>أثناء تصميمك لشبكة، تريد التأكد من أنه إذا فشل اتصال واحد، يمكن للبيانات أن تصل إلى وجهتها عبر مسار آخر. ما هي خاصية الشبكة التي تقوم بتطبيقها؟</li>
                <li>ما الفرق بين شبكة الإنترانت (Intranet) والإكسترانت (Extranet)؟</li>
            </ol>
        </section>
    </>
);

const Chapter2: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: الوصول إلى نظام التشغيل IOS</h4>
            <p>نظام تشغيل Cisco IOS (Internetwork Operating System) هو البرنامج الذي يعمل على معظم أجهزة سيسكو. واجهة سطر الأوامر (CLI) هي الطريقة الأساسية لإعداد وإدارة هذه الأجهزة.</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                 <li><strong className="text-cyan-400">Console:</strong> اتصال مباشر بالجهاز باستخدام كابل خاص. يُستخدم للإعداد الأولي عندما لا يكون للجهاز عنوان IP.</li>
                 <li><strong className="text-cyan-400">SSH (Secure Shell):</strong> الطريقة الآمنة والموصى بها للوصول إلى الجهاز عن بعد عبر الشبكة. البيانات تكون مشفرة.</li>
                 <li><strong className="text-cyan-400">Telnet:</strong> طريقة قديمة للوصول عن بعد. غير آمنة لأن البيانات (بما في ذلك كلمات المرور) تُرسل كنص واضح.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">التنقل في أوضاع الأوامر (CLI Modes)</h4>
            <p>يحتوي IOS على هيكلية أوامر هرمية. كل وضع يوفر مجموعة مختلفة من الأوامر.</p>
             <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left text-gray-300 bg-gray-950 rounded-lg">
                    <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">الوضع (Mode)</th>
                            <th scope="col" className="px-6 py-3">شكل الموجه (Prompt)</th>
                            <th scope="col" className="px-6 py-3">الوصف</th>
                            <th scope="col" className="px-6 py-3">كيفية الوصول</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-700">
                            <td className="px-6 py-4">User EXEC Mode</td>
                            <td className="px-6 py-4 font-mono text-yellow-400">Switch&gt;</td>
                            <td className="px-6 py-4">وضع عرض محدود. يسمح بأوامر المراقبة الأساسية فقط.</td>
                            <td className="px-6 py-4">الوضع الافتراضي عند الاتصال.</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="px-6 py-4">Privileged EXEC Mode</td>
                            <td className="px-6 py-4 font-mono text-yellow-400">Switch#</td>
                            <td className="px-6 py-4">يوفر وصولاً كاملاً لجميع أوامر المراقبة واستكشاف الأخطاء.</td>
                            <td className="px-6 py-4 font-mono">enable</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="px-6 py-4">Global Configuration Mode</td>
                            <td className="px-6 py-4 font-mono text-yellow-400">Switch(config)#</td>
                            <td className="px-6 py-4">يُستخدم لتغيير الإعدادات التي تؤثر على الجهاز بأكمله.</td>
                            <td className="px-6 py-4 font-mono">configure terminal</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">Specific Config Modes</td>
                            <td className="px-6 py-4 font-mono text-yellow-400">Switch(config-if)#<br/>Switch(config-line)#</td>
                            <td className="px-6 py-4">يُستخدم لضبط إعدادات معينة (واجهة، خط اتصال).</td>
                            <td className="px-6 py-4 font-mono">interface fa0/1<br/>line console 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mt-4"><strong className="text-cyan-400">ملاحظات هامة:</strong> استخدم الأمر <code className="text-yellow-400 font-mono">exit</code> للعودة إلى الوضع السابق، أو <code className="text-yellow-400 font-mono">end</code> (أو Ctrl+Z) للعودة مباشرة إلى وضع Privileged EXEC.</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الإعدادات الأساسية للجهاز</h4>
            <p>هذه هي الخطوات الأولى والأساسية لتأمين وإعداد أي محول أو موجه سيسكو.</p>
            <CodeBlock>
{`! 1. Enter global configuration mode
Switch> enable
Switch# configure terminal

! 2. Set a unique hostname for the device
Switch(config)# hostname SW-Floor-1

! 3. Secure the privileged EXEC mode (use 'secret' as it's encrypted)
SW-Floor-1(config)# enable secret class

! 4. Secure the console line
SW-Floor-1(config)# line console 0
SW-Floor-1(config-line)# password cisco
SW-Floor-1(config-line)# login

! 5. Secure remote access lines (VTY for Telnet/SSH)
SW-Floor-1(config)# line vty 0 15
SW-Floor-1(config-line)# password cisco
SW-Floor-1(config-line)# login

! 6. Encrypt all plaintext passwords in the configuration
SW-Floor-1(config)# service password-encryption

! 7. Set a legal warning banner
SW-Floor-1(config)# banner motd # Unauthorized Access is Strictly Prohibited! #`}
            </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">حفظ الإعدادات</h4>
            <p>الإعدادات التي تقوم بتغييرها يتم تطبيقها على <strong className="text-cyan-400">running-config</strong> (الموجود في ذاكرة RAM). إذا تم إعادة تشغيل الجهاز، ستفقد هذه التغييرات. لحفظها بشكل دائم، يجب نسخها إلى <strong className="text-cyan-400">startup-config</strong> (الموجود في ذاكرة NVRAM).</p>
            <p><strong className="text-cyan-400">الأمر:</strong> يتم تنفيذه من وضع Privileged EXEC Mode.</p>
            <CodeBlock>SW-Floor-1# copy running-config startup-config</CodeBlock>
            <p><strong className="text-cyan-400">الاختصار الشائع:</strong></p>
            <CodeBlock>SW-Floor-1# wr</CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين عنوان IP للإدارة</h4>
            <p>بشكل افتراضي، المحولات لا تحتاج لعنوان IP لتعمل في الطبقة الثانية. لكن لكي نتمكن من إدارتها عن بعد (عبر SSH أو Telnet)، يجب أن نعطيها عنوان IP. يتم ذلك عبر واجهة افتراضية تسمى <strong className="text-cyan-400">Switch Virtual Interface (SVI)</strong>.</p>
            <CodeBlock>
{`! Assign an IP address to the default SVI (VLAN 1)
SW-Floor-1(config)# interface vlan 1
SW-Floor-1(config-if)# ip address 192.168.1.2 255.255.255.0
SW-Floor-1(config-if)# no shutdown

! To reach devices outside its local network, the switch needs a default gateway
SW-Floor-1(config)# ip default-gateway 192.168.1.1`}
            </CodeBlock>
        </section>
        
         <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثاني</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الأمر الذي ينقلك من وضع User EXEC (<code className="text-yellow-400 font-mono">&gt;</code>) إلى وضع Privileged EXEC (<code className="text-yellow-400 font-mono">#</code>)؟</li>
                <li>لماذا يُفضل استخدام الأمر <code className="text-yellow-400 font-mono">enable secret</code> بدلاً من <code className="text-yellow-400 font-mono">enable password</code> لتأمين الوصول إلى وضع الامتيازات؟</li>
                <li>أنت في وضع (config-if)# وتريد حفظ الإعدادات. ما هي الخطوات التي يجب عليك اتخاذها؟</li>
                <li>ما هو الغرض من الأمر <code className="text-yellow-400 font-mono">ip default-gateway</code> على المحول (Switch)؟</li>
                <li>ما الفرق بين ملف <code className="text-yellow-400 font-mono">running-config</code> وملف <code className="text-yellow-400 font-mono">startup-config</code> من حيث مكان التخزين ومتى يتم استخدامهما؟</li>
            </ol>
        </section>
    </>
);


const CCNA1SummarySection: React.FC = () => {
    const [openChapter, setOpenChapter] = useState<number | null>(1);

    const chapters = [
        { id: 1, title: 'الفصل 1: الشبكات اليوم (Networking Today)', content: <Chapter1 /> },
        { id: 2, title: 'الفصل 2: الإعدادات الأساسية للمحول والجهاز الطرفي', content: <Chapter2 /> },
        // Add more chapters here in the future
    ];
    
    const handleToggle = (id: number) => {
        setOpenChapter(openChapter === id ? null : id);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">ملخصات CCNA1 v7</h2>
            <p className="text-gray-400 mb-8">
                مرجع سريع ومركّز لأهم المفاهيم والملاحظات في كل فصل من فصول منهج CCNAv7 الأول: مقدمة إلى الشبكات.
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
                 {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i + 3} className="border border-gray-700 rounded-lg overflow-hidden mb-4">
                        <div className="w-full text-right p-5 bg-gray-800/50 flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-500">الفصل {i + 3}: قريبًا...</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CCNA1SummarySection;