import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

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
            className="w-full text-start p-5 bg-gray-900 hover:bg-gray-950 flex justify-between items-center transition-colors"
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

// NOTE: Deep content is kept in original language for now as full translation is extensive.
// The structure is now ready for full translation by replacing text with t('key').

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
                    <ul className="list-inside list-[circle] ms-5 mt-1">
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-300 bg-gray-950 rounded-lg">
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

const Chapter3: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: قواعد الاتصال</h4>
            <p>لكي يتمكن جهازان من التواصل، يجب أن يتفقا على مجموعة من القواعد. هذه القواعد تسمى <strong className="text-cyan-400">بروتوكولات</strong>. تخيلها كلغات مشتركة؛ بدونها، سيكون الاتصال مجرد ضوضاء غير مفهومة.</p>
            <p>البروتوكولات تحدد كل شيء: كيفية تنسيق الرسالة، حجمها، توقيت إرسالها، وكيفية التعامل مع الأخطاء.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">النماذج المرجعية: OSI و TCP/IP</h4>
            <p>لفهم كيفية عمل البروتوكولات معًا، نستخدم نماذج مرجعية تقسم وظائف الشبكة إلى <strong className="text-cyan-400">طبقات (Layers)</strong>. كل طبقة لها وظيفة محددة وتخدم الطبقة التي فوقها.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <h5 className="font-bold text-xl text-center text-white mb-3">نموذج OSI (7 طبقات)</h5>
                    <p className="text-sm text-center text-gray-400 mb-4">نموذج مفاهيمي شامل، يستخدم كمرجع أساسي في الدراسة.</p>
                    <ol className="list-decimal list-inside space-y-2 text-start rtl:text-right">
                        <li><strong className="text-blue-300">Application (التطبيق):</strong> واجهة المستخدم للشبكة (المتصفح، البريد).</li>
                        <li><strong className="text-blue-300">Presentation (التقديم):</strong> تنسيق وتشفير البيانات (مثل JPEG, SSL).</li>
                        <li><strong className="text-blue-300">Session (الجلسة):</strong> فتح وإغلاق وإدارة الجلسات بين التطبيقات.</li>
                        <li><strong className="text-orange-300">Transport (النقل):</strong> توفير اتصال موثوق (TCP) أو سريع (UDP) وتقسيم البيانات.</li>
                        <li><strong className="text-green-300">Network (الشبكة):</strong> تحديد أفضل مسار وتوجيه البيانات باستخدام عناوين IP.</li>
                        <li><strong className="text-purple-300">Data Link (ربط البيانات):</strong> الوصول إلى الوسائط المادية وتوفير العنونة المادية (MAC).</li>
                        <li><strong className="text-red-300">Physical (المادية):</strong> إرسال البتات (0s and 1s) عبر الوسائط (كابلات، موجات).</li>
                    </ol>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <h5 className="font-bold text-xl text-center text-white mb-3">نموذج TCP/IP (4 طبقات)</h5>
                    <p className="text-sm text-center text-gray-400 mb-4">النموذج العملي المستخدم فعليًا في الإنترنت.</p>
                    <ol className="list-decimal list-inside space-y-2 text-start rtl:text-right">
                         <li><strong className="text-blue-300">Application:</strong> تجمع وظائف طبقات (Application, Presentation, Session) من OSI.</li>
                         <li><strong className="text-orange-300">Transport:</strong> تطابق طبقة النقل في OSI (TCP/UDP).</li>
                         <li><strong className="text-green-300">Internet:</strong> تطابق طبقة الشبكة في OSI (IP, ICMP).</li>
                         <li><strong className="text-purple-300">Network Access:</strong> تجمع وظائف طبقات (Data Link, Physical) من OSI.</li>
                    </ol>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تغليف البيانات (Data Encapsulation)</h4>
            <p>هي العملية الأساسية في الشبكات. عندما ترسل بيانات (مثل بريد إلكتروني)، فإنها تمر عبر كل طبقة من الأعلى إلى الأسفل. في كل طبقة، تتم إضافة معلومات تحكم خاصة بها تسمى <strong className="text-cyan-400">ترويسة (Header)</strong>. هذه العملية تشبه وضع رسالة في ظرف، ثم وضع هذا الظرف في صندوق أكبر، وهكذا.</p>
            
            <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-center text-gray-300 bg-gray-900 rounded-lg">
                    <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">الطبقة</th>
                            <th scope="col" className="px-6 py-3">اسم وحدة البيانات (PDU)</th>
                            <th scope="col" className="px-6 py-3">الوصف</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-700">
                            <td className="px-6 py-4 text-blue-300">Application</td>
                            <td className="px-6 py-4 font-mono">Data (بيانات)</td>
                            <td className="px-6 py-4">البيانات الأولية من المستخدم.</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="px-6 py-4 text-orange-300">Transport</td>
                            <td className="px-6 py-4 font-mono">Segment (قطعة)</td>
                            <td className="px-6 py-4">يتم إضافة ترويسة TCP أو UDP.</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="px-6 py-4 text-green-300">Network</td>
                            <td className="px-6 py-4 font-mono">Packet (حزمة)</td>
                            <td className="px-6 py-4">يتم إضافة ترويسة IP (تحتوي على IP المصدر والوجهة).</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                             <td className="px-6 py-4 text-purple-300">Data Link</td>
                            <td className="px-6 py-4 font-mono">Frame (إطار)</td>
                            <td className="px-6 py-4">يتم إضافة ترويسة وذيل (تحتوي على MAC المصدر والوجهة).</td>
                        </tr>
                        <tr>
                             <td className="px-6 py-4 text-red-300">Physical</td>
                            <td className="px-6 py-4 font-mono">Bits (بتات)</td>
                            <td className="px-6 py-4">يتم تحويل الإطار إلى إشارات كهربائية أو ضوئية.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mt-4"><strong className="text-cyan-400">ملاحظة:</strong> عند استقبال البيانات، تحدث عملية عكسية تسمى <strong className="text-cyan-400">De-encapsulation</strong>، حيث تتم إزالة الترويسات في كل طبقة من الأسفل إلى الأعلى حتى تصل البيانات الصافية إلى التطبيق.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الوصول إلى البيانات: العناوين</h4>
            <p>لإرسال البيانات بنجاح، نحتاج إلى نوعين من العناوين يعملان معًا:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">عنوان الشبكة (IP Address):</strong> عنوان منطقي، يحدد الشبكة التي يوجد بها الجهاز. يتغير عندما ينتقل الجهاز من شبكة إلى أخرى. <span className="text-yellow-400 font-mono">مثال:</span> عنوان منزلك البريدي، يستخدمه ساعي البريد لتوصيل الطرد إلى مدينتك.</li>
                <li><strong className="text-cyan-400">عنوان ربط البيانات (MAC Address):</strong> عنوان مادي، محفور على بطاقة الشبكة (NIC) وفريد عالميًا. يستخدم للتواصل داخل نفس الشبكة المحلية. <span className="text-yellow-400 font-mono">مثال:</span> اسمك على الطرد، يستخدمه ساعي البريد لتسليم الطرد لك شخصيًا بمجرد وصوله إلى منزلك.</li>
            </ul>
        </section>
        
         <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثالث</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما اسم وحدة البيانات (PDU) في طبقة النقل (Transport Layer)؟</li>
                <li>أي طبقة في نموذج OSI مسؤولة عن تحديد أفضل مسار للبيانات عبر الشبكة؟</li>
                <li>إذا كنت تتصفح موقع ويب آمن (HTTPS)، في أي طبقة من نموذج TCP/IP يعمل هذا البروتوكول؟</li>
                <li>ما هو الفرق الرئيسي في الغرض بين عنوان IP وعنوان MAC؟</li>
                <li>اشرح باختصار عملية تغليف البيانات (Encapsulation) كما لو كنت تشرحها لشخص غير تقني.</li>
            </ol>
        </section>
    </>
);

const Chapter4: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: الغرض من الطبقة المادية</h4>
            <p>الطبقة المادية هي أساس كل شيء. وظيفتها الوحيدة هي أخذ <strong className="text-cyan-400">الإطار (Frame)</strong> الكامل من طبقة ربط البيانات، وترميزه إلى سلسلة من <strong className="text-cyan-400">البتات (0s and 1s)</strong>، ثم إرسال هذه البتات كإشارات (كهربائية، ضوئية، أو راديوية) عبر وسائط الشبكة.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">خصائص الطبقة المادية</h4>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">النطاق الترددي (Bandwidth):</strong> السعة النظرية للوسيط لنقل البيانات، وتقاس بـ (bps). تخيلها كعدد الحارات على طريق سريع.</li>
                <li><strong className="text-cyan-400">الإنتاجية (Throughput):</strong> القياس الفعلي للبيانات المنقولة خلال فترة زمنية معينة. تكون دائمًا أقل من النطاق الترددي بسبب عوامل مثل الازدحام وزمن الوصول. تخيلها كعدد السيارات التي تعبر الطريق السريع فعليًا.</li>
                <li><strong className="text-cyan-400">التشفير (Encoding):</strong> طريقة تحويل البتات إلى إشارات.</li>
                <li><strong className="text-cyan-400">الإشارات (Signaling):</strong> كيفية تمثيل البتات كنبضات كهربائية أو ضوئية.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الكابلات النحاسية (Copper Cabling)</h4>
            <p>هي الأكثر شيوعًا في الشبكات المحلية (LANs) بسبب تكلفتها المنخفضة وسهولة تركيبها. النوع الأكثر استخدامًا هو <strong className="text-cyan-400">UTP (Unshielded Twisted-Pair)</strong>.</p>
            <p><strong>لماذا الأسلاك مجدولة (Twisted)?</strong></p>
            <p>يتم جدل أزواج الأسلاك معًا لإلغاء التداخل الكهرومغناطيسي (EMI) والتداخل الراديوي (RFI)، وهي ظاهرة تسمى <strong className="text-yellow-400">Crosstalk</strong>.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">معايير كابلات UTP: T568A و T568B</h4>
            <p>هذه المعايير تحدد ترتيب الأسلاك الملونة الثمانية داخل موصل RJ-45. من الضروري اتباع معيار واحد باستمرار في شبكتك.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-green-400 text-center">T568A</h5>
                    <p className="font-mono text-center text-sm tracking-tighter">أخضر-أبيض، أخضر، برتقالي-أبيض، أزرق، أزرق-أبيض، برتقالي، بني-أبيض، بني</p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-orange-400 text-center">T568B</h5>
                    <p className="font-mono text-center text-sm tracking-tighter">برتقالي-أبيض، برتقالي، أخضر-أبيض، أزرق، أزرق-أبيض، أخضر، بني-أبيض، بني</p>
                </div>
            </div>
             <p className="mt-4"><strong className="text-cyan-400">نوع الكابل يعتمد على كيفية ترتيب الأطراف:</strong></p>
             <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong className="text-cyan-400">Straight-through (مستقيم):</strong> كلا الطرفين يستخدمان نفس المعيار (مثلاً، B مع B). يُستخدم لربط أجهزة مختلفة (مثل كمبيوتر بـ سويتش).</li>
                <li><strong className="text-cyan-400">Crossover (معكوس):</strong> أحد الطرفين A والآخر B. يُستخدم لربط أجهزة متشابهة (مثل سويتش بـ سويتش). <em className="text-gray-400">(ملاحظة: معظم الأجهزة الحديثة تدعم Auto-MDIX التي تكتشف النوع تلقائيًا).</em></li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">كابلات الألياف الضوئية (Fiber-Optic)</h4>
            <p>تستخدم نبضات الضوء لنقل البيانات عبر خيوط زجاجية رقيقة جدًا. هي الخيار الأفضل للمسافات الطويلة والبيئات التي تعاني من تداخل كهرومغناطيسي عالٍ.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-yellow-500/50">
                    <h5 className="font-bold text-lg text-yellow-400">Single-mode Fiber (SMF)</h5>
                    <p className="text-sm mt-2">تستخدم ليزرًا قويًا ومكلفًا لإرسال شعاع ضوئي واحد. مثالية للمسافات الطويلة جدًا (كيلومترات)، وتستخدم لربط المدن والبلدان.</p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg border border-orange-500/50">
                    <h5 className="font-bold text-lg text-orange-400">Multimode Fiber (MMF)</h5>
                    <p className="text-sm mt-2">تستخدم LED أرخص لإرسال الضوء بزوايا متعددة. مثالية للمسافات الأقصر (داخل المبنى، بين الطوابق) وتكلفتها أقل.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الوسائط اللاسلكية (Wireless Media)</h4>
            <p>تنقل البيانات باستخدام موجات الراديو عبر الهواء. توفر مرونة كبيرة ولكنها تواجه تحديات فريدة.</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">منطقة التغطية (Coverage Area):</strong> الإشارة تضعف كلما ابتعدت عن المصدر.</li>
                <li><strong className="text-cyan-400">التداخل (Interference):</strong> يمكن أن تتأثر الإشارة بأجهزة لاسلكية أخرى (مثل الميكروويف) أو شبكات Wi-Fi مجاورة.</li>
                <li><strong className="text-cyan-400">الأمان (Security):</strong> الإشارة متاحة للجميع في نطاقها، مما يجعل التشفير القوي أمرًا حيويًا لحماية البيانات.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الرابع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الغرض الأساسي من جدل أزواج الأسلاك في كابل UTP؟</li>
                <li>تريد توصيل جهاز كمبيوتر مباشرة بمنفذ سويتش. أي نوع من الكابلات (Straight-through أو Crossover) يجب أن تستخدمه؟</li>
                <li>أي نوع من كابلات الألياف الضوئية (Single-mode أو Multimode) هو الأنسب لربط مبنيين تفصل بينهما مسافة 5 كيلومترات؟ ولماذا؟</li>
                <li>ما الفرق بين "النطاق الترددي" (Bandwidth) و "الإنتاجية" (Throughput)؟</li>
                <li>ما هي أكبر مشكلة أمنية تواجه الوسائط اللاسلكية مقارنة بالوسائط السلكية؟</li>
            </ol>
        </section>
    </>
);

const Chapter5: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: لماذا أنظمة الأرقام؟</h4>
            <p>تفهم أجهزة الكمبيوتر والشبكات لغة واحدة فقط: لغة الأصفار والآحاد (النظام الثنائي). لفهم كيفية عمل عناوين IP وتقسيم الشبكات، يجب أن نتمكن من التحدث بهذه اللغة. هذا الفصل هو الأساس الرياضي لكل ما يتعلق بالعنونة.</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">النظام الثنائي (Binary)</h4>
            <p>هو نظام عد أساسه 2، يستخدم الرقمين 0 و 1 فقط. كل خانة في عنوان IPv4 (octet) هي عبارة عن 8 بتات. قيمة كل بت تعتمد على موقعه (القيمة المكانية).</p>
            <p className="font-mono text-yellow-400 text-center tracking-widest text-lg p-4 bg-gray-950 rounded-md">
                128 &nbsp; 64 &nbsp; 32 &nbsp; 16 &nbsp; 8 &nbsp; 4 &nbsp; 2 &nbsp; 1
            </p>

            <h5 className="font-bold text-lg text-cyan-400 mt-4">التحويل من عشري إلى ثنائي</h5>
            <p>مثال: لنحول الرقم <strong className="text-yellow-400">192</strong> إلى ثنائي.</p>
            <p>نسأل: هل يمكننا طرح القيمة المكانية من الرقم؟</p>
            <ul className="list-decimal list-inside space-y-1 mt-2">
                <li>192 - 128 = 64. نعم. (البت الأول هو <strong className="text-green-400">1</strong>)</li>
                <li>64 - 64 = 0. نعم. (البت الثاني هو <strong className="text-green-400">1</strong>)</li>
                <li>الباقي هو 0، لذا كل البتات المتبقية هي 0.</li>
            </ul>
             <CodeBlock>النتيجة: 11000000</CodeBlock>

             <h5 className="font-bold text-lg text-cyan-400 mt-4">التحويل من ثنائي إلى عشري</h5>
             <p>مثال: لنحول الرقم الثنائي <strong className="text-yellow-400">10101000</strong> إلى عشري.</p>
             <p>نجمع القيم المكانية المقابلة لكل "1" في الرقم الثنائي.</p>
             <CodeBlock>128 + 0 + 32 + 0 + 8 + 0 + 0 + 0 = 168</CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">النظام السداسي عشري (Hexadecimal)</h4>
            <p>هو نظام عد أساسه 16. يستخدم الأرقام من 0 إلى 9 والحروف من A إلى F لتمثيل القيم من 10 إلى 15. أهميته تكمن في أنه طريقة مختصرة جدًا لكتابة الأرقام الثنائية، حيث أن كل رقم سداسي عشري واحد يمثل 4 بتات ثنائية.</p>
            <p><strong className="text-cyan-400">أين يستخدم؟</strong> بشكل أساسي في عناوين IPv6 وعناوين MAC.</p>

            <h5 className="font-bold text-lg text-cyan-400 mt-4">التحويل من ثنائي إلى سداسي عشري</h5>
            <p>مثال: لنحول <strong className="text-yellow-400">11011010</strong>.</p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>نقسم الرقم الثنائي إلى مجموعات من 4 بتات: <code className="text-yellow-400">1101</code> و <code className="text-yellow-400">1010</code>.</li>
                <li>نحول كل مجموعة على حدة:
                    <ul className="list-[circle] list-inside ms-5">
                        <li><code className="text-yellow-400">1101</code> = (8+4+0+1) = 13، وهو ما يمثله الحرف <strong className="text-green-400">D</strong>.</li>
                        <li><code className="text-yellow-400">1010</code> = (8+0+2+0) = 10، وهو ما يمثله الحرف <strong className="text-green-400">A</strong>.</li>
                    </ul>
                </li>
            </ol>
             <CodeBlock>النتيجة: DA</CodeBlock>

             <h5 className="font-bold text-lg text-cyan-400 mt-4">التحويل من سداسي عشري إلى ثنائي</h5>
             <p>مثال: لنحول <strong className="text-yellow-400">F2</strong>.</p>
             <p>نحول كل رقم على حدة إلى ما يقابله من 4 بتات:</p>
             <ul className="list-disc list-inside ms-5">
                <li><strong className="text-yellow-400">F</strong> = 15 = <strong className="text-green-400">1111</strong></li>
                <li><strong className="text-yellow-400">2</strong> = <strong className="text-green-400">0010</strong></li>
            </ul>
             <CodeBlock>النتيجة: 11110010</CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الخامس</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>حول الرقم العشري 224 إلى ثنائي.</li>
                <li>ما هي القيمة العشرية للرقم الثنائي 11101101؟</li>
                <li>لماذا يعتبر النظام السداسي عشري مفيدًا في تمثيل عناوين IPv6؟</li>
                <li>حول العنوان السداسي عشري A9:8B إلى ثنائي.</li>
                <li>كم عدد البتات التي يمثلها رقم سداسي عشري واحد؟</li>
            </ol>
        </section>
    </>
);

const Chapter6: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: الغرض من طبقة ربط البيانات</h4>
            <p>هذه الطبقة هي الجسر بين البرمجيات (طبقة الشبكة) والعتاد (الطبقة المادية). وظيفتها الأساسية هي التحكم في كيفية وضع البيانات على الوسائط المادية واستلامها منها. إنها مسؤولة عن الاتصالات <strong className="text-cyan-400">داخل نفس الشبكة المحلية (LAN)</strong>.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">الطبقات الفرعية لطبقة ربط البيانات</h4>
            <p>تنقسم هذه الطبقة إلى طبقتين فرعيتين لتنظيم مهامها:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">LLC (Logical Link Control):</strong> الطبقة العليا. تتواصل مع طبقة الشبكة (الطبقة 3). وظيفتها هي تحديد البروتوكول المستخدم في الطبقة 3 (مثل IPv4 أو IPv6) وتمرير الحزمة (Packet) إلى الطبقة الفرعية السفلية.</li>
                <li><strong className="text-cyan-400">MAC (Media Access Control):</strong> الطبقة السفلى. مسؤولة عن تغليف البيانات وإضافة العناوين المادية (MAC addresses) والوصول إلى الوسائط.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">عنوان MAC (العنوان المادي)</h4>
            <p>هو معرف فريد عالميًا مكون من 48 بت، يُكتب عادةً في 12 رقمًا سداسيًا عشريًا (مثل <code className="text-yellow-400">00-60-2F-3A-07-BC</code>). يتم حرقه في بطاقة الشبكة (NIC) من قبل الشركة المصنعة.</p>
            <p><strong className="text-cyan-400">بنية عنوان MAC:</strong></p>
             <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>أول 6 أرقام سداسية عشرية (24 بت):</strong> تسمى <strong className="text-yellow-400">OUI (Organizationally Unique Identifier)</strong>. تحدد الشركة المصنعة للبطاقة (مثل Cisco, Intel).</li>
                <li><strong>آخر 6 أرقام سداسية عشرية (24 بت):</strong> رقم تسلسلي فريد تخصصه الشركة المصنعة لضمان عدم تكرار العنوان.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">إطار الإيثرنت (Ethernet Frame)</h4>
            <p>هو "الغلاف" الذي تضعه طبقة ربط البيانات حول حزمة IP لتجهيزها للإرسال عبر الشبكة المحلية.</p>
            <CodeBlock>
{`[Destination MAC] [Source MAC] [Type] [   IP Packet (Data)   ] [FCS]`}
            </CodeBlock>
             <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong className="text-cyan-400">Destination/Source MAC:</strong> عناوين MAC للجهاز المرسل والمستقبل داخل الشبكة المحلية.</li>
                <li><strong className="text-cyan-400">Type/Length:</strong> يحدد نوع البروتوكول في طبقة الشبكة (مثلاً، 0x0800 لـ IPv4).</li>
                <li><strong className="text-cyan-400">FCS (Frame Check Sequence):</strong> يستخدم لاكتشاف الأخطاء. يقوم المرسل بحساب قيمة بناءً على محتويات الإطار ويضعها هنا. يقوم المستقبل بنفس الحساب، وإذا لم تتطابق القيمتان، يتم التخلص من الإطار.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">كيف يعمل المحول (Switch)؟</h4>
            <p>المحول هو جهاز ذكي في الطبقة الثانية يتخذ قرارات إعادة توجيه ذكية بناءً على عناوين MAC. وظيفته الأساسية هي إنشاء <strong className="text-cyan-400">جدول عناوين MAC (MAC Address Table)</strong>.</p>
            <h5 className="font-bold text-lg text-cyan-400 mt-4">خطوات عمل المحول:</h5>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-yellow-400">التعلم (Learning):</strong> عندما يستقبل المحول إطارًا على أحد منافذه، يقرأ <strong className="text-green-400">عنوان MAC المصدر</strong> ويسجله في جدوله بجانب رقم المنفذ الذي أتى منه. بهذه الطريقة، يتعلم المحول مكان كل جهاز على الشبكة.</li>
                <li><strong className="text-yellow-400">التوجيه/التصفية (Forwarding/Filtering):</strong> بعد ذلك، يقرأ المحول <strong className="text-red-400">عنوان MAC الوجهة</strong>.
                    <ul className="list-[circle] list-inside ms-5 mt-1">
                        <li>إذا كان يعرف المنفذ المرتبط بعنوان الوجهة من جدوله، فإنه يرسل الإطار <strong className="text-green-400">فقط</strong> إلى ذلك المنفذ. هذا يسمى التصفية (Filtering)، لأنه يمنع الإطار من الذهاب إلى المنافذ غير الضرورية.</li>
                        <li>إذا لم يكن عنوان الوجهة موجودًا في جدوله، فإنه يقوم بإغراق (Flooding) الإطار، أي إرساله إلى <strong className="text-orange-400">جميع المنافذ</strong> باستثناء المنفذ الذي أتى منه، على أمل أن يرد الجهاز المقصود ويعلم المحول بمكانه.</li>
                    </ul>
                </li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل السادس</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الطبقتان الفرعيتان لطبقة ربط البيانات، وما هي الوظيفة الرئيسية لكل منهما؟</li>
                <li>يستقبل محول إطارًا على المنفذ Fa0/1. كيف يتعلم المحول عنوان MAC الخاص بالجهاز المرسل؟</li>
                <li>ماذا يفعل المحول عندما يستقبل إطارًا بعنوان MAC وجهة غير موجود في جدوله؟</li>
                <li>ما هو الغرض من حقل FCS في إطار الإيثرنت؟</li>
                <li>ماذا يمثل جزء OUI في عنوان MAC؟</li>
            </ol>
        </section>
    </>
);

const Chapter7: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: آليات عمل محول الإيثرنت</h4>
            <p>بعد أن فهمنا أن المحول يبني جدول MAC، نتعمق الآن في كيفية معالجته للإطارات وكيف يحسن أداء الشبكة بشكل كبير مقارنة بالأجهزة القديمة مثل الموزع (Hub).</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أساليب إعادة توجيه الإطارات (Frame Forwarding)</h4>
            <p>يستخدم المحول إحدى طريقتين أساسيتين لاتخاذ قرار إعادة توجيه الإطار:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-cyan-500/50">
                    <h5 className="font-bold text-lg text-cyan-400">1. التخزين والتمرير (Store-and-Forward)</h5>
                    <p className="text-sm mt-2">
                        <strong className="text-green-400">كيف يعمل:</strong> يستقبل المحول الإطار <strong className="text-yellow-400">بأكمله</strong> في ذاكرة مؤقتة، ثم يقوم بفحص حقل FCS للتأكد من خلوه من الأخطاء. إذا كان الإطار سليمًا، يبحث عن عنوان الوجهة في جدول MAC ويعيد توجيهه.
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 mt-3">
                         <li><strong>الميزة:</strong> موثوقية عالية جدًا لأنه يتخلص من الإطارات التالفة.</li>
                         <li><strong>العيب:</strong> زمن وصول (latency) أعلى لأنه ينتظر وصول الإطار بالكامل.</li>
                    </ul>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg border border-orange-500/50">
                    <h5 className="font-bold text-lg text-orange-400">2. القطع (Cut-Through)</h5>
                    <p className="text-sm mt-2">
                         <strong className="text-green-400">كيف يعمل:</strong> يبدأ المحول في إعادة توجيه الإطار <strong className="text-yellow-400">بمجرد</strong> قراءة عنوان MAC الوجهة، دون انتظار وصول بقية الإطار.
                    </p>
                     <ul className="list-disc list-inside text-sm space-y-1 mt-3">
                         <li><strong>الميزة:</strong> زمن وصول منخفض جدًا وسرعة عالية.</li>
                         <li><strong>العيب:</strong> قد يقوم بتمرير إطارات تالفة لأنه لا يتحقق من حقل FCS.</li>
                    </ul>
                </div>
            </div>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">نطاقات التصادم والبث (Collision and Broadcast Domains)</h4>
            <p>هذا من أهم المفاهيم التي تميز المحولات عن الموزعات، والراوترات عن المحولات.</p>
             <ul className="list-disc list-inside space-y-3 mt-2">
                <li>
                    <strong className="text-cyan-400">نطاق التصادم (Collision Domain):</strong> هو الجزء من الشبكة حيث يمكن أن تتصادم الإشارات إذا حاول جهازان الإرسال في نفس الوقت.
                    <br/>
                    <strong className="text-green-400">الحل:</strong> المحولات (Switches) تقضي على هذه المشكلة. <strong className="text-yellow-400">كل منفذ على المحول هو نطاق تصادم منفصل بحد ذاته.</strong>
                </li>
                 <li>
                    <strong className="text-cyan-400">نطاق البث (Broadcast Domain):</strong> هو الجزء من الشبكة الذي تصل إليه رسالة البث (Broadcast Frame).
                     <br/>
                    <strong className="text-red-400">المشكلة:</strong> بشكل افتراضي، المحولات لا توقف رسائل البث. <strong className="text-yellow-400">الشبكة بأكملها المتصلة بمحول (أو عدة محولات) هي نطاق بث واحد كبير.</strong>
                    <br/>
                    <strong className="text-green-400">الحل:</strong> الموجهات (Routers) هي التي تقوم بتقسيم نطاقات البث.
                </li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">إعدادات السرعة والازدواج (Speed and Duplex)</h4>
            <p>يجب أن يتطابق إعداد السرعة والازدواج على طرفي الاتصال (مثل الكمبيوتر ومنفذ المحول) لضمان الأداء الأمثل.</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">السرعة (Speed):</strong> معدل نقل البيانات (10, 100, 1000 Mbps).</li>
                <li><strong className="text-cyan-400">الازدواج (Duplex):</strong>
                     <ul className="list-[circle] list-inside ms-5 mt-1">
                        <li><strong>نصف مزدوج (Half-duplex):</strong> يمكن الإرسال أو الاستقبال، ولكن ليس كليهما في نفس الوقت. (مثل جهاز اتصال لاسلكي).</li>
                        <li><strong>مزدوج كامل (Full-duplex):</strong> يمكن الإرسال والاستقبال في نفس الوقت. هذا يضاعف النطاق الترددي الفعال ويزيل التصادمات.</li>
                    </ul>
                </li>
            </ul>
             <p className="mt-4"><strong className="text-red-400">مشكلة عدم تطابق الازدواج (Duplex Mismatch):</strong> هي سبب شائع لمشاكل الأداء في الشبكات. تحدث عندما يكون أحد الطرفين full-duplex والآخر half-duplex، مما يؤدي إلى حدوث تصادمات وتدهور كبير في سرعة الشبكة.</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">Auto-MDIX</h4>
            <p>هي ميزة ذكية في المحولات الحديثة تكتشف تلقائيًا نوع الكابل المتصل (مستقيم أو معكوس) وتقوم بتعديل إعدادات المنفذ داخليًا ليعمل بشكل صحيح. بفضل هذه الميزة، لم نعد بحاجة للقلق بشأن استخدام النوع الصحيح من الكابلات عند توصيل الأجهزة.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل السابع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الميزة الرئيسية لطريقة "التخزين والتمرير" (Store-and-Forward) مقارنة بطريقة "القطع" (Cut-Through) في المحولات؟</li>
                <li>إذا قمت بتوصيل 8 أجهزة كمبيوتر بمحول يحتوي على 8 منافذ، فكم عدد نطاقات التصادم التي أنشأتها؟ وكم عدد نطاقات البث؟</li>
                <li>ما هي وظيفة الموجه (Router) فيما يتعلق بنطاقات البث؟</li>
                <li>ما هي المشكلة التي قد تحدث إذا تم تكوين منفذ محول على أنه "full-duplex" بينما تم تكوين بطاقة الشبكة في الكمبيوتر المتصل به على أنها "half-duplex"؟</li>
                <li>ما هي الفائدة العملية لميزة Auto-MDIX على منافذ المحول؟</li>
            </ol>
        </section>
    </>
);

const Chapter8: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: دور طبقة الشبكة</h4>
            <p>طبقة الشبكة هي "ساعي بريد" الإنترنت. وظيفتها الأساسية هي توصيل البيانات (الحزم) من جهاز المصدر إلى جهاز الوجهة، حتى لو كانا في شبكتين مختلفتين تمامًا في قارات متباعدة. تقوم بذلك من خلال أربع عمليات رئيسية:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">العنونة (Addressing):</strong> تزويد الأجهزة الطرفية بعنوان IP منطقي وفريد.</li>
                <li><strong className="text-cyan-400">التغليف (Encapsulation):</strong> تغليف قطعة طبقة النقل (Segment) داخل حزمة IP، مع إضافة ترويسة IP التي تحتوي على معلومات حيوية مثل عنوان IP المصدر والوجهة.</li>
                <li><strong className="text-cyan-400">التوجيه (Routing):</strong> اختيار أفضل مسار لتوجيه الحزم عبر الشبكة. هذه هي وظيفة الموجهات (Routers).</li>
                <li><strong className="text-cyan-400">فك التغليف (De-encapsulation):</strong> عند وصول الحزمة إلى الوجهة، تقوم طبقة الشبكة بإزالة ترويسة IP وتمرير القطعة إلى طبقة النقل.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">خصائص بروتوكول IP</h4>
            <p>بروتوكول الإنترنت (IP) هو البروتوكول الرئيسي في هذه الطبقة، وله ثلاث خصائص أساسية يجب فهمها:</p>
             <ul className="list-disc list-inside space-y-2 mt-2">
                 <li><strong className="text-cyan-400">بدون اتصال (Connectionless):</strong> لا يتم إنشاء اتصال مسبق مع الوجهة قبل إرسال الحزم. كل حزمة تُعامل بشكل مستقل. (مثل إرسال رسالة بريدية).</li>
                 <li><strong className="text-cyan-400">أفضل جهد (Best Effort):</strong> لا يضمن بروتوكول IP وصول الحزمة. إذا فقدت حزمة أو وصلت تالفة، فإن IP لا يقوم بإعادة إرسالها. هذه المهمة تُترك للبروتوكولات في الطبقات العليا (مثل TCP).</li>
                 <li><strong className="text-cyan-400">مستقل عن الوسائط (Media Independent):</strong> لا يهتم بروتوكول IP بنوع الوسائط المادية التي ستنتقل عبرها الحزم (نحاسية، ألياف ضوئية، لاسلكية).</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">ترويسة حزمة IPv4 (IPv4 Packet Header)</h4>
            <p>تحتوي ترويسة حزمة IPv4 على معلومات مهمة تستخدمها الموجهات لاتخاذ قرارات التوجيه. من أهم الحقول:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Source and Destination IP Address:</strong> أهم حقلين، يحددان المرسل والمستقبل.</li>
                <li><strong className="text-cyan-400">Time-to-Live (TTL):</strong> عداد يتم إنقاصه بمقدار 1 عند كل موجه. إذا وصل إلى 0، يتم التخلص من الحزمة. هذا يمنع الحزم من الدوران إلى الأبد في الشبكة في حالة وجود حلقة توجيه (routing loop).</li>
                <li><strong className="text-cyan-400">Protocol:</strong> يحدد بروتوكول الطبقة التالية (طبقة النقل) الذي يجب تسليم البيانات إليه. (مثلاً، 6 لـ TCP، 17 لـ UDP).</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">قرارات التوجيه</h4>
            <p>كيف يقرر جهاز أو موجه إلى أين يرسل الحزمة؟</p>
            <h5 className="font-bold text-lg text-cyan-400 mt-4">1. قرار الجهاز المضيف (Host)</h5>
            <p>يقوم الجهاز المضيف باتخاذ قرار بسيط جدًا:</p>
            <ol className="list-decimal list-inside space-y-2 mt-2">
                <li>يقارن عنوان IP الوجهة مع عنوان شبكته الخاصة.</li>
                <li><strong className="text-green-400">إذا كانت الوجهة في نفس الشبكة المحلية:</strong> يرسل الحزمة مباشرة إلى الجهاز المستهدف.</li>
                <li><strong className="text-red-400">إذا كانت الوجهة في شبكة بعيدة:</strong> يرسل الحزمة إلى <strong className="text-yellow-400">البوابة الافتراضية (Default Gateway)</strong>، وهو عنوان IP الخاص بالموجه المحلي.</li>
            </ol>

            <h5 className="font-bold text-lg text-cyan-400 mt-4">2. قرار الموجه (Router)</h5>
            <p>الراوتر هو جهاز متخصص في اتخاذ قرارات التوجيه المعقدة:</p>
            <ol className="list-decimal list-inside space-y-2 mt-2">
                <li>عندما يستقبل حزمة، ينظر إلى <strong className="text-yellow-400">عنوان IP الوجهة</strong> في الترويسة.</li>
                <li>يبحث عن هذا العنوان في <strong className="text-cyan-400">جدول التوجيه (Routing Table)</strong> الخاص به.</li>
                <li>إذا وجد مسارًا مطابقًا، فإنه يعيد توجيه الحزمة من الواجهة (Interface) المناسبة.</li>
                <li>إذا لم يجد مسارًا محددًا، فإنه يستخدم <strong className="text-cyan-400">المسار الافتراضي (Default Route)</strong> إن وجد، والذي يوجه كل حركة المرور غير المعروفة إلى القفزة التالية (next-hop).</li>
                 <li>إذا لم يجد أي مسار مطابق ولا يوجد مسار افتراضي، فسيتم التخلص من الحزمة.</li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثامن</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي العمليات الأربع الرئيسية التي تقوم بها طبقة الشبكة؟</li>
                <li>ماذا يعني عندما نقول أن بروتوكول IP هو بروتوكول "أفضل جهد" (Best Effort)؟</li>
                <li>ما هو الغرض من حقل TTL في ترويسة حزمة IPv4؟</li>
                <li>يريد جهاز كمبيوتر إرسال حزمة إلى خادم على شبكة مختلفة. إلى أي جهاز سيرسل الكمبيوتر الحزمة أولاً؟</li>
                <li>ما هي قطعة المعلومات الأساسية التي يستخدمها الموجه من ترويسة الحزمة لاتخاذ قرار إعادة التوجيه؟</li>
            </ol>
        </section>
    </>
);

const Chapter9: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: الحاجة إلى تحليل العنوان</h4>
            <p>لقد تعلمنا أن الأجهزة تحتاج إلى عنواني IP و MAC للتواصل. عنوان IP يوصلك إلى الشبكة الصحيحة، وعنوان MAC يوصلك إلى الجهاز الصحيح داخل تلك الشبكة. لكن كيف يربط الجهاز بين هذين العنوانين؟ هنا يأتي دور بروتوكول تحليل العنوان <strong className="text-cyan-400">(Address Resolution Protocol - ARP)</strong>.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">متى يتم استخدام ARP؟</h4>
            <p>يعمل ARP في حالتين رئيسيتين:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li>عندما يريد جهاز إرسال بيانات إلى جهاز آخر <strong className="text-green-400">على نفس الشبكة المحلية</strong>، فإنه يستخدم ARP للعثور على عنوان MAC الخاص بالجهاز المستهدف.</li>
                <li>عندما يريد جهاز إرسال بيانات إلى جهاز آخر <strong className="text-red-400">على شبكة بعيدة</strong>، فإنه يستخدم ARP للعثور على عنوان MAC الخاص بـ <strong className="text-yellow-400">البوابة الافتراضية (Default Gateway)</strong>، وليس الجهاز البعيد نفسه.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">آلية عمل ARP خطوة بخطوة</h4>
            <p>تخيل أن PC1 يريد إرسال بيانات إلى PC2 على نفس الشبكة:</p>
            <ol className="list-decimal list-inside space-y-2 mt-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">الخطوة 1 (التحقق من الذاكرة):</strong> يتحقق PC1 أولاً من <strong className="text-yellow-400">جدول ARP (ARP Cache)</strong> الخاص به لمعرفة ما إذا كان لديه بالفعل عنوان MAC الخاص بـ PC2.</li>
                <li><strong className="text-cyan-400">الخطوة 2 (إرسال طلب بث):</strong> إذا لم يجد الإدخال، يقوم PC1 بإنشاء رسالة <strong className="text-orange-400">ARP Request</strong>. هذه الرسالة تسأل "من يملك عنوان IP [IP_PC2]؟ من فضلك أرسل لي عنوان MAC الخاص بك". يتم إرسال هذا الطلب كـ <strong className="text-red-400">بث (Broadcast)</strong> إلى جميع الأجهزة على الشبكة المحلية (عنوان MAC الوجهة هو FF-FF-FF-FF-FF-FF).</li>
                <li><strong className="text-cyan-400">الخطوة 3 (معالجة الطلب):</strong> تستقبل جميع الأجهزة على الشبكة المحلية طلب ARP. يتجاهله الجميع باستثناء PC2، الذي يرى أن عنوان IP المستهدف هو عنوانه.</li>
                <li><strong className="text-cyan-400">الخطوة 4 (إرسال رد أحادي):</strong> يقوم PC2 بالرد برسالة <strong className="text-green-400">ARP Reply</strong>. هذه الرسالة تقول "أنا أملك عنوان IP [IP_PC2]، وهذا هو عنوان MAC الخاص بي [MAC_PC2]". يتم إرسال هذا الرد كـ <strong className="text-blue-400">إرسال أحادي (Unicast)</strong> مباشرة إلى PC1.</li>
                 <li><strong className="text-cyan-400">الخطوة 5 (تحديث الذاكرة والإرسال):</strong> يستقبل PC1 الرد، ويقوم بتحديث جدول ARP الخاص به بالمعلومات الجديدة. الآن بعد أن عرف عنوان MAC الخاص بـ PC2، يمكنه تغليف حزمة IP في إطار إيثرنت وإرسالها مباشرة.</li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">جدول ARP (ARP Cache)</h4>
            <p>تحتفظ الأجهزة بجدول في ذاكرتها لتخزين عناوين IP وعناوين MAC المقابلة لها التي تعلمتها مؤخرًا. هذا يمنع الجهاز من إرسال طلب ARP في كل مرة يريد فيها التواصل، مما يسرع العملية ويقلل من حركة المرور على الشبكة.</p>
            <p>يمكنك عرض جدول ARP على جهازك باستخدام الأمر:</p>
             <CodeBlock>
{`C:\\> arp -a`}
             </CodeBlock>
            <p><strong className="text-yellow-400">ملاحظة:</strong> يتم حذف الإدخالات من جدول ARP بعد فترة زمنية معينة (عادة بضع دقائق) لضمان أن المعلومات محدثة.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مشاكل ARP</h4>
            <p>بما أن طلبات ARP يتم بثها ويمكن لأي جهاز الرد، فهذا يفتح الباب أمام هجمات أمنية تسمى <strong className="text-red-400">ARP Spoofing</strong> أو <strong className="text-red-400">ARP Poisoning</strong>، حيث يمكن للمهاجم إرسال ردود ARP مزيفة لخداع الأجهزة وجعلها ترسل حركة المرور إليه بدلاً من الوجهة الصحيحة (مثل البوابة الافتراضية).</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تحليل العنوان في IPv6</h4>
            <p>لا يستخدم IPv6 بروتوكول ARP. بدلاً من ذلك، يستخدم بروتوكولًا أكثر تطورًا يسمى <strong className="text-cyan-400">Neighbor Discovery (ND)</strong>، وهو جزء من ICMPv6. يقوم ND بنفس وظيفة ARP بالإضافة إلى وظائف أخرى مثل اكتشاف الموجهات والتكوين التلقائي للعناوين.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل التاسع</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو الغرض الأساسي لبروتوكول ARP؟</li>
                <li>هل يتم إرسال طلب ARP (ARP Request) كرسالة بث (broadcast) أم إرسال أحادي (unicast)؟ وماذا عن رد ARP (ARP Reply)؟</li>
                <li>إذا أراد جهاز إرسال بيانات إلى جهاز آخر على شبكة بعيدة، فما هو عنوان MAC الذي سيحاول حله باستخدام ARP؟</li>
                <li>ماذا يحدث لجميع الأجهزة الأخرى على الشبكة المحلية عندما تستقبل طلب ARP غير موجه إليها؟</li>
                <li>ما هو البروتوكول الذي يحل محل ARP في شبكات IPv6؟</li>
            </ol>
        </section>
    </>
);

const Chapter10: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: وظيفة الموجه (الراوتر)</h4>
            <p>الموجه هو جهاز يعمل في الطبقة الثالثة (طبقة الشبكة) ووظيفته الأساسية هي <strong className="text-cyan-400">ربط شبكات IP مختلفة</strong>. كل واجهة (interface) على الموجه تنتمي إلى شبكة مختلفة.</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">يتخذ قرارات التوجيه:</strong> بناءً على عنوان IP الوجهة، يقرر الموجه من أي واجهة يجب إرسال الحزمة لتصل إلى وجهتها.</li>
                <li><strong className="text-cyan-400">يقسم نطاقات البث:</strong> على عكس المحول، لا يقوم الموجه بتمرير رسائل البث من شبكة إلى أخرى. كل واجهة على الموجه هي نطاق بث منفصل.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">خطوات الإعداد الأساسية للراوتر</h4>
            <p>تشبه الإعدادات الأولية للراوتر إلى حد كبير إعدادات المحول، مثل تعيين اسم وتأمين الوصول.</p>
            <CodeBlock>
{`! 1. Enter global configuration mode
Router> enable
Router# configure terminal

! 2. Set the hostname
Router(config)# hostname R1

! 3. Secure privileged EXEC mode
R1(config)# enable secret class

! 4. Secure console and VTY lines
R1(config)# line console 0
R1(config-line)# password cisco
R1(config-line)# login
R1(config)# line vty 0 4
R1(config-line)# password cisco
R1(config-line)# login

! 5. Set a banner
R1(config)# banner motd # Welcome to R1 #`}
            </CodeBlock>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تكوين الواجهات (Interfaces)</h4>
            <p>هذه هي أهم خطوة في إعداد الراوتر. يجب تكوين كل واجهة بعنوان IP وقناع شبكة صحيحين، ثم <strong className="text-red-400">تفعيلها</strong>.</p>
            <CodeBlock>
{`! Configure the first interface (e.g., connected to a LAN)
R1(config)# interface GigabitEthernet0/0/0
R1(config-if)# description Link to LAN-1
R1(config-if)# ip address 192.168.1.1 255.255.255.0

! Activate the interface - THIS STEP IS CRUCIAL!
R1(config-if)# no shutdown

! Configure the second interface (e.g., connected to another LAN)
R1(config-if)# exit
R1(config)# interface GigabitEthernet0/0/1
R1(config-if)# description Link to LAN-2
R1(config-if)# ip address 192.168.2.1 255.255.255.0
R1(config-if)# no shutdown`}
            </CodeBlock>
            <p><strong className="text-yellow-400">ملاحظة هامة:</strong> بشكل افتراضي، تكون واجهات الراوتر في حالة <strong className="text-red-500">shutdown</strong> (إيقاف تشغيل إداري). يجب عليك دائمًا استخدام الأمر <code className="text-green-400 font-mono">no shutdown</code> لتفعيلها.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">التحقق من الإعدادات (Verification)</h4>
            <p>بعد الإعداد، يجب دائمًا التحقق من أن كل شيء يعمل كما هو متوقع. هذان هما أهم أمرين للتحقق من واجهات الراوتر:</p>
             <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong className="text-cyan-400">show ip interface brief:</strong> يعرض ملخصًا سريعًا لجميع الواجهات، عنوان IP الخاص بها، وحالتها. هذا هو الأمر الأكثر استخدامًا للتحقق السريع.</li>
                <li><strong className="text-cyan-400">show running-config:</strong> يعرض ملف الإعدادات الحالي بالكامل.</li>
                <li><strong className="text-cyan-400">show ip route:</strong> يعرض جدول التوجيه الخاص بالراوتر.</li>
            </ul>
             <p><strong>مثال على مخرجات <code className="text-yellow-400 font-mono">show ip interface brief</code>:</strong></p>
            <CodeBlock>
{`R1# show ip interface brief
Interface              IP-Address      OK? Method Status           Protocol
GigabitEthernet0/0/0   192.168.1.1     YES manual up               up
GigabitEthernet0/0/1   192.168.2.1     YES manual up               up
Vlan1                  unassigned      YES unset  administratively down down`}
            </CodeBlock>
            <p>للتأكد من أن الواجهة تعمل بشكل صحيح، يجب أن تكون حالتا <strong className="text-green-400">Status</strong> و <strong className="text-green-400">Protocol</strong> كلتاهما <strong className="text-green-400">up</strong>.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">جدول التوجيه (Routing Table)</h4>
            <p>عندما تقوم بتكوين واجهة بعنوان IP وتفعيلها، يقوم الراوتر تلقائيًا بإضافة مدخلين إلى جدول التوجيه الخاص به:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                 <li><strong className="text-cyan-400">C (Connected):</strong> يمثل الشبكة المتصلة مباشرة بالواجهة.</li>
                 <li><strong className="text-cyan-400">L (Local):</strong> يمثل عنوان IP المحدد للواجهة نفسها.</li>
            </ul>
            <p>هذه المسارات المتصلة مباشرة هي أساس عمل أي راوتر.</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل العاشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الوظيفة الأساسية للموجه (Router) التي تميزه عن المحول (Switch)؟</li>
                <li>ما هو الأمر الذي يجب عليك استخدامه لتفعيل واجهة على الراوتر بعد تكوينها؟</li>
                <li>ماذا يعني إذا كانت حالة الواجهة في مخرجات <code className="text-yellow-400 font-mono">show ip interface brief</code> هي "administratively down"؟</li>
                <li>بعد تكوين واجهة بعنوان IP <code className="text-yellow-400 font-mono">10.10.10.1/24</code> وتفعيلها، ما هما نوعا المسارات اللذان سيضيفهما الراوتر تلقائيًا إلى جدول التوجيه؟</li>
                <li>لماذا لا يقوم الموجه بتمرير رسائل البث (Broadcasts)؟</li>
            </ol>
        </section>
    </>
);

const Chapter11: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: بنية عنوان IPv4</h4>
            <p>عنوان IPv4 هو عنوان منطقي هرمي مكون من 32 بت، مقسم إلى جزء للشبكة (Network Portion) وجزء للمضيف (Host Portion). قناع الشبكة (Subnet Mask) هو الذي يحدد أين ينتهي جزء الشبكة وأين يبدأ جزء المضيف. إتقان هذا الفصل هو مفتاح فهم تقسيم الشبكات.</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع العناوين داخل الشبكة</h4>
            <p>في أي شبكة، هناك ثلاثة أنواع من العناوين:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">عنوان الشبكة (Network Address):</strong> العنوان الأول في الشبكة. لا يمكن تعيينه لجهاز. يمثل الشبكة بأكملها (كل بتات المضيف تكون 0).</li>
                <li><strong className="text-cyan-400">عناوين المضيفين (Host Addresses):</strong> العناوين الصالحة التي يمكن تعيينها للأجهزة (كمبيوتر، طابعة، سيرفر).</li>
                <li><strong className="text-cyan-400">عنوان البث (Broadcast Address):</strong> العنوان الأخير في الشبكة. يستخدم لإرسال رسالة إلى جميع الأجهزة على تلك الشبكة (كل بتات المضيف تكون 1).</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أنواع الاتصال في IPv4</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-green-400">Unicast (أحادي)</h5>
                    <p className="text-sm">إرسال حزمة من جهاز مصدر واحد إلى جهاز وجهة واحد. (واحد لواحد).</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-red-400">Broadcast (بث)</h5>
                    <p className="text-sm">إرسال حزمة من جهاز مصدر واحد إلى جميع الأجهزة الأخرى على نفس الشبكة. (واحد للكل).</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h5 className="font-bold text-lg text-orange-400">Multicast (متعدد)</h5>
                    <p className="text-sm">إرسال حزمة من جهاز مصدر واحد إلى مجموعة محددة من الأجهزة المهتمة. (واحد لمجموعة).</p>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">العناوين الخاصة والعامة (RFC 1918)</h4>
            <p>بسبب نفاد عناوين IPv4، تم تخصيص نطاقات معينة من العناوين لتكون <strong className="text-cyan-400">خاصة (Private)</strong>. هذه العناوين يمكن استخدامها بحرية داخل الشبكات المحلية ولكن <strong className="text-red-400">لا يمكن توجيهها عبر الإنترنت</strong>. للوصول إلى الإنترنت، يجب ترجمتها إلى عنوان عام باستخدام NAT.</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong>Class A:</strong> <code className="text-yellow-400 font-mono">10.0.0.0 /8</code> (10.0.0.0 – 10.255.255.255)</li>
                <li><strong>Class B:</strong> <code className="text-yellow-400 font-mono">172.16.0.0 /12</code> (172.16.0.0 – 172.31.255.255)</li>
                <li><strong>Class C:</strong> <code className="text-yellow-400 font-mono">192.168.0.0 /16</code> (192.168.0.0 – 192.168.255.255)</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تقسيم الشبكات (Subnetting)</h4>
            <p>هي عملية أخذ شبكة كبيرة وتقسيمها إلى شبكات فرعية أصغر. <strong className="text-cyan-400">لماذا؟</strong></p>
             <ul className="list-disc list-inside space-y-2 mt-2">
                 <li><strong className="text-green-400">تحسين الأداء:</strong> كل شبكة فرعية هي نطاق بث منفصل، مما يقلل من حركة مرور البث غير الضرورية.</li>
                 <li><strong className="text-green-400">زيادة الأمان:</strong> يمكن تطبيق سياسات أمنية مختلفة على كل شبكة فرعية.</li>
                 <li><strong className="text-green-400">تنظيم العناوين:</strong> يسهل إدارة الشبكة وتحديد المشاكل.</li>
            </ul>
             <p>يتم ذلك عن طريق <strong className="text-yellow-400">"استعارة" بتات من جزء المضيف</strong> وإضافتها إلى جزء الشبكة، مما يطيل قناع الشبكة.</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مثال عملي على تقسيم شبكة Class C</h4>
            <p>لنفترض أن لدينا الشبكة <code className="text-yellow-400 font-mono">192.168.1.0/24</code> ونريد تقسيمها إلى شبكات فرعية أصغر، كل منها يتسع لـ 14 جهازًا على الأقل.</p>
            <ol className="list-decimal list-inside space-y-3 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">تحديد عدد بتات المضيف المطلوبة:</strong>
                    <br />
                    نستخدم الصيغة: <code className="text-yellow-400">2^H - 2 >= 14</code> (حيث H هو عدد بتات المضيف).
                    <br />
                    <code className="text-yellow-400">2^3 - 2 = 6</code> (غير كاف). <code className="text-yellow-400">2^4 - 2 = 14</code> (كاف).
                    <br />
                    إذن، نحتاج <strong className="text-green-400">4 بتات</strong> للمضيف.
                </li>
                 <li><strong className="text-cyan-400">حساب القناع الجديد:</strong>
                    <br />
                    إجمالي البتات 32. بتات المضيف 4. إذن بتات الشبكة = <code className="text-yellow-400">32 - 4 = 28</code>.
                    <br />
                    القناع الجديد هو <strong className="text-green-400">/28</strong>، والذي يساوي <code className="text-green-400">255.255.255.240</code>.
                </li>
                 <li><strong className="text-cyan-400">حساب عدد الشبكات الفرعية:</strong>
                    <br />
                    القناع الأصلي كان /24، والجديد /28. استعرنا <code className="text-yellow-400">28 - 24 = 4</code> بتات.
                    <br />
                    عدد الشبكات = <code className="text-yellow-400">2^4 = 16</code> شبكة فرعية.
                </li>
                 <li><strong className="text-cyan-400">تحديد الشبكات الفرعية الصالحة:</strong>
                    <br />
                    نستخدم "الرقم السحري": <code className="text-yellow-400">256 - 240 = 16</code>. هذا هو حجم البلوك أو القفزة.
                    <br />
                    الشبكات هي: <code className="text-green-400">192.168.1.0</code>, <code className="text-green-400">192.168.1.16</code>, <code className="text-green-400">192.168.1.32</code>, ... وهكذا حتى <code className="text-green-400">192.168.1.240</code>.
                </li>
                 <li><strong className="text-cyan-400">تفاصيل الشبكة الفرعية الثانية (مثال):</strong>
                    <br />
                    <strong>الشبكة:</strong> <code className="text-green-400">192.168.1.16/28</code>
                    <br />
                    <strong>أول عنوان صالح:</strong> <code className="text-green-400">192.168.1.17</code>
                    <br />
                    <strong>آخر عنوان صالح:</strong> <code className="text-green-400">192.168.1.30</code>
                    <br />
                    <strong>عنوان البث:</strong> <code className="text-green-400">192.168.1.31</code> (لأن الشبكة التالية تبدأ بـ .32)
                </li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الحادي عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما الفرق بين عنوان الشبكة وعنوان البث في شبكة IPv4؟</li>
                <li>ما هو نطاق العناوين الخاصة لـ Class B وفقًا لـ RFC 1918؟</li>
                <li>إذا قمت باستعارة 3 بتات من جزء المضيف في شبكة Class C، فكم عدد الشبكات الفرعية الصالحة التي تحصل عليها؟</li>
                <li>ما هو السبب الرئيسي الذي يدفعنا لتقسيم الشبكات (Subnetting)؟</li>
                <li>ما هو نوع الاتصال (unicast, broadcast, multicast) الذي يتم استخدامه عند إرسال بث فيديو مباشر لمجموعة من المشتركين؟</li>
            </ol>
        </section>
    </>
);

const Chapter12: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: ما هو ICMP؟</h4>
            <p>بروتوكول رسائل التحكم في الإنترنت (Internet Control Message Protocol - ICMP) هو جزء أساسي من حزمة بروتوكولات IP. وظيفته ليست نقل البيانات بين المستخدمين، بل <strong className="text-cyan-400">نقل رسائل التشخيص والتحكم والأخطاء</strong> بين أجهزة الشبكة. إنه يساعد مسؤولي الشبكات على فهم ما يحدث "خلف الكواليس".</p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">رسائل ICMP الشائعة</h4>
            <p>يستخدم ICMP أنواعًا مختلفة من الرسائل للإبلاغ عن حالات مختلفة. من أهمها:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Echo Request / Echo Reply:</strong> هي الرسائل المستخدمة بواسطة الأمر <code className="text-yellow-400 font-mono">ping</code>. يرسل المصدر طلب "صدى"، وإذا كانت الوجهة متاحة، فإنها ترد بـ "صدى"، مما يؤكد الاتصال.</li>
                <li><strong className="text-cyan-400">Destination Unreachable:</strong> يرسلها موجه عندما لا يتمكن من العثور على مسار لتوجيه حزمة إلى وجهتها، أو عندما يتم حظر الاتصال بواسطة جدار ناري.</li>
                <li><strong className="text-cyan-400">Time Exceeded:</strong> يرسلها موجه عندما يتخلص من حزمة لأن قيمة TTL الخاصة بها وصلت إلى الصفر. هذه هي الرسالة التي يعتمد عليها الأمر <code className="text-yellow-400 font-mono">traceroute</code>.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أدوات التشخيص: Ping و Traceroute</h4>
            <h5 className="font-bold text-lg text-cyan-400 mt-4">1. Ping</h5>
            <p><strong className="text-yellow-400">الغرض:</strong> اختبار الاتصال الأساسي بين جهازين.</p>
            <p><strong className="text-yellow-400">كيف يعمل:</strong> يرسل رسائل ICMP Echo Request إلى الوجهة وينتظر رسائل ICMP Echo Reply. إذا استلم الردود، فهذا يعني أن هناك مسارًا صالحًا بين الجهازين.</p>
            <CodeBlock>
{`C:\\> ping 8.8.8.8

Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=10ms TTL=118
Reply from 8.8.8.8: bytes=32 time=12ms TTL=118
...`}
            </CodeBlock>

            <h5 className="font-bold text-lg text-cyan-400 mt-6">2. Traceroute (tracert on Windows)</h5>
            <p><strong className="text-yellow-400">الغرض:</strong> عرض المسار (قائمة الموجهات) الذي تسلكه الحزمة للوصول إلى الوجهة.</p>
            <p><strong className="text-yellow-400">كيف يعمل:</strong> يعمل بذكاء عن طريق إرسال سلسلة من الحزم مع زيادة قيمة TTL تدريجيًا.
                <ul className="list-[circle] list-inside ms-5 mt-1 text-sm">
                    <li>يرسل أولاً حزمة بـ TTL=1. الموجه الأول في المسار يستلمها، ينقص TTL إلى 0، يتخلص من الحزمة، ويرسل رسالة ICMP "Time Exceeded" إلى المصدر.</li>
                    <li>يستلم المصدر الرسالة ويعرف عنوان IP الخاص بالموجه الأول.</li>
                    <li>ثم يرسل حزمة بـ TTL=2. الموجه الثاني يفعل نفس الشيء.</li>
                    <li>تتكرر هذه العملية حتى تصل الحزمة إلى الوجهة النهائية.</li>
                </ul>
            </p>
             <CodeBlock>
{`C:\\> tracert google.com

Tracing route to google.com [142.250.204.14]
over a maximum of 30 hops:

  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2     9 ms     8 ms     9 ms  [ISP Router 1]
  3    10 ms    10 ms    10 ms  [ISP Router 2]
  ...`}
             </CodeBlock>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">ICMPv6</h4>
            <p>في IPv6، يلعب ICMPv6 دورًا أكبر بكثير من نظيره في IPv4. بالإضافة إلى رسائل التشخيص، فهو مسؤول أيضًا عن وظائف حيوية مثل:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Neighbor Discovery (ND):</strong> يحل محل ARP لتحديد عناوين MAC.</li>
                <li><strong className="text-cyan-400">SLAAC (Stateless Address Autoconfiguration):</strong> يسمح للأجهزة بتكوين عناوين IPv6 الخاصة بها تلقائيًا.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثاني عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي الوظيفة الرئيسية لبروتوكول ICMP؟</li>
                <li>ما هما رسالتا ICMP اللتان يستخدمهما الأمر <code className="text-yellow-400 font-mono">ping</code>؟</li>
                <li>كيف يستفيد الأمر <code className="text-yellow-400 font-mono">traceroute</code> من حقل TTL ورسائل ICMP لتحديد المسار؟</li>
                <li>إذا استلمت رسالة ICMP "Destination Unreachable"، فماذا يمكن أن يعني ذلك؟</li>
                <li>ما هي إحدى الوظائف الإضافية الهامة التي يقوم بها ICMPv6 والتي لم تكن موجودة في ICMPv4؟</li>
            </ol>
        </section>
    </>
);

const Chapter13: React.FC = () => (
    <>
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: دور طبقة النقل</h4>
            <p>طبقة النقل هي الوسيط بين طبقة التطبيقات (التي تتعامل مع البيانات) وطبقة الشبكة (التي تتعامل مع التوجيه). وظيفتها الرئيسية هي إدارة المحادثات الفردية بين التطبيقات على الأجهزة المصدر والوجهة.</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">تتبع المحادثات:</strong> تمكين جهاز واحد من إجراء محادثات متعددة (تصفح ويب، بريد إلكتروني، دردشة) في نفس الوقت.</li>
                <li><strong className="text-cyan-400">تقسيم البيانات (Segmentation):</strong> تقسيم بيانات التطبيق الكبيرة إلى أجزاء (Segments) أصغر وأسهل في الإدارة.</li>
                <li><strong className="text-cyan-400">تحديد التطبيقات:</strong> استخدام <strong className="text-yellow-400">أرقام المنافذ (Port Numbers)</strong> لتوجيه كل قطعة بيانات إلى التطبيق الصحيح على جهاز الوجهة.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">مقارنة: TCP مقابل UDP</h4>
            <p>توفر طبقة النقل بروتوكولين رئيسيين، ولكل منهما خصائصه وحالات استخدامه:</p>
            <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-center text-gray-300 bg-gray-900 rounded-lg">
                    <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">الميزة</th>
                            <th scope="col" className="px-6 py-3">TCP (بروتوكول التحكم في الإرسال)</th>
                            <th scope="col" className="px-6 py-3">UDP (بروتوكول بيانات المستخدم)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-700">
                            <td className="px-6 py-4">الموثوقية</td>
                            <td className="px-6 py-4 text-green-400">عالية (يضمن وصول البيانات بالترتيب)</td>
                            <td className="px-6 py-4 text-red-400">منخفضة (لا يضمن الوصول أو الترتيب)</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="px-6 py-4">السرعة</td>
                            <td className="px-6 py-4">أبطأ (بسبب المصافحة الثلاثية والتحقق من الأخطاء)</td>
                            <td className="px-6 py-4">أسرع (ترويسة أصغر، لا يوجد تحقق)</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">حالات الاستخدام</td>
                            <td className="px-6 py-4">تصفح الويب (HTTP)، البريد الإلكتروني (SMTP)، نقل الملفات (FTP)</td>
                            <td className="px-6 py-4">بث الفيديو المباشر، الألعاب عبر الإنترنت، VoIP, DNS</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أرقام المنافذ (Port Numbers)</h4>
            <p>
                هي أرقام مكونة من 16 بت تستخدمها طبقة النقل لتحديد التطبيق المرسل والمستقبل. <strong className="text-cyan-400">مقبس (Socket)</strong> هو مزيج فريد من عنوان IP ورقم المنفذ (مثل <code className="text-yellow-400">192.168.1.1:80</code>).
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>المنافذ المعروفة (Well-Known Ports):</strong> 0 - 1023. مخصصة للخدمات الشائعة (HTTP:80, SSH:22).</li>
                <li><strong>المنافذ المسجلة (Registered Ports):</strong> 1024 - 49151. مخصصة للتطبيقات المسجلة.</li>
                <li><strong>المنافذ الخاصة/الديناميكية (Private/Dynamic Ports):</strong> 49152 - 65535. يستخدمها العميل بشكل عشوائي كمنفذ مصدر.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">المصافحة الثلاثية لـ TCP (Three-Way Handshake)</h4>
            <p>
                قبل أن يتمكن TCP من إرسال البيانات، يجب عليه إنشاء اتصال موثوق بين المصدر والوجهة. يتم ذلك من خلال عملية من ثلاث خطوات:
            </p>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-yellow-400">SYN:</strong> يرسل العميل قطعة (Segment) مع علم SYN (Synchronize) لطلب بدء اتصال.</li>
                <li><strong className="text-yellow-400">SYN-ACK:</strong> يرد الخادم بقطعة مع علمي SYN و ACK (Acknowledgment) للموافقة على الطلب.</li>
                <li><strong className="text-yellow-400">ACK:</strong> يرسل العميل قطعة أخيرة مع علم ACK لتأكيد إنشاء الاتصال. الآن يمكن بدء نقل البيانات.</li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الثالث عشر</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هما البروتوكolan الرئيسيان في طبقة النقل؟</li>
                <li>أي بروتوكول ستختاره لتطبيق بث فيديو مباشر، ولماذا؟</li>
                <li>ما هو "المقبس" (Socket)؟</li>
                <li>ما هي الخطوات الثلاث في عملية المصافحة الثلاثية لـ TCP؟</li>
                <li>ما هو نطاق أرقام المنافذ التي يستخدمها العميل عادةً كمنفذ مصدر؟</li>
            </ol>
        </section>
    </>
);

const CCNA1SummarySection: React.FC = () => {
    const { t } = useI18n();
    const [openChapter, setOpenChapter] = useState<number | null>(1);

    const chapters = [
        { id: 1, title: 'الفصل 1: الشبكات اليوم', content: <Chapter1 /> },
        { id: 2, title: 'الفصل 2: الإعدادات الأساسية لنظام التشغيل', content: <Chapter2 /> },
        { id: 3, title: 'الفصل 3: البروتوكولات والنماذج', content: <Chapter3 /> },
        { id: 4, title: 'الفصل 4: الطبقة المادية', content: <Chapter4 /> },
        { id: 5, title: 'الفصل 5: أنظمة الأرقام', content: <Chapter5 /> },
        { id: 6, title: 'الفصل 6: طبقة ربط البيانات', content: <Chapter6 /> },
        { id: 7, title: 'الفصل 7: الإيثرنت', content: <Chapter7 /> },
        { id: 8, title: 'الفصل 8: طبقة الشبكة', content: <Chapter8 /> },
        { id: 9, title: 'الفصل 9: تحليل العناوين (ARP)', content: <Chapter9 /> },
        { id: 10, title: 'الفصل 10: الإعدادات الأساسية للموجه', content: <Chapter10 /> },
        { id: 11, title: 'الفصل 11: عنونة IPv4', content: <Chapter11 /> },
        { id: 12, title: 'الفصل 12: بروتوكول ICMP', content: <Chapter12 /> },
        { id: 13, title: 'الفصل 13: طبقة النقل', content: <Chapter13 /> },
    ];
    
    const handleToggle = (id: number) => {
        setOpenChapter(openChapter === id ? null : id);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">{t('nav.ccna1Summary')}</h2>
            <p className="text-gray-400 mb-8">
                مرجع سريع لأهم المفاهيم في منهج CCNAv7 الأول: مقدمة إلى الشبكات.
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

export default CCNA1SummarySection;