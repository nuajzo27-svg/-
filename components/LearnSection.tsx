import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-950 border border-gray-700 rounded-md p-4 my-4 text-left dir-ltr text-cyan-300 font-mono text-sm overflow-x-auto">
        <code>{children}</code>
    </pre>
);

const SubnetChart: React.FC = () => {
    const subnets = [
        { network: '192.168.10.0', usable: '.1 - .62', broadcast: '.63' },
        { network: '192.168.10.64', usable: '.65 - .126', broadcast: '.127' },
        { network: '192.168.10.128', usable: '.129 - .190', broadcast: '.191' },
        { network: '192.168.10.192', usable: '.193 - .254', broadcast: '.255' },
    ];
    return (
        <div className="my-6">
            <h4 className="text-xl font-semibold text-white mt-6 mb-3 text-center">خريطة الشبكات الفرعية الناتجة عن /26</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subnets.map((subnet, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center font-mono">
                        <div className="bg-blue-900/50 text-blue-300 p-2 rounded-t-md">
                            <p className="text-xs uppercase">Network</p>
                            <p className="font-bold">{subnet.network}</p>
                        </div>
                        <div className="bg-green-900/50 text-green-300 p-3">
                             <p className="text-xs uppercase">Usable Hosts</p>
                            <p className="font-bold">{subnet.usable}</p>
                        </div>
                        <div className="bg-red-900/50 text-red-300 p-2 rounded-b-md">
                             <p className="text-xs uppercase">Broadcast</p>
                            <p className="font-bold">{subnet.broadcast}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const LearnSection: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">أساسيات تقسيم الشبكات (Subnetting)</h2>

            <div className="space-y-10 text-gray-300 leading-loose">
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">1. ما هو عنوان IP؟</h3>
                    <p>
                        عنوان بروتوكول الإنترنت (IP) هو مُعرّف رقمي فريد يُخصص لكل جهاز متصل بشبكة الكمبيوتر. الإصدار الأكثر شيوعًا هو IPv4، والذي يتكون من 32 بت، وعادة ما يُكتب على شكل أربعة أرقام عشرية مفصولة بنقاط (مثل <span className="font-mono text-yellow-400">192.168.1.1</span>).
                    </p>
                    <p className="mt-4">تنقسم عناوين IPv4 تقليديًا إلى خمس فئات (Classes)، كل منها مصمم لخدمة أغراض مختلفة وحجم شبكات معين. يوضح الجدول التالي هذه الفئات:</p>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left text-gray-300 bg-gray-950 rounded-lg">
                            <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">الفئة</th>
                                    <th scope="col" className="px-6 py-3">نطاق البداية (الأوكتيت الأول)</th>
                                    <th scope="col" className="px-6 py-3">الاستخدام النموذجي</th>
                                    <th scope="col" className="px-6 py-3">القناع الافتراضي (CIDR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class A</td>
                                    <td className="px-6 py-4 font-mono">1 - 126</td>
                                    <td className="px-6 py-4">شبكات ضخمة جدًا (شركات عالمية، مزودو خدمة)</td>
                                    <td className="px-6 py-4 font-mono">255.0.0.0 (/8)</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class B</td>
                                    <td className="px-6 py-4 font-mono">128 - 191</td>
                                    <td className="px-6 py-4">شبكات كبيرة إلى متوسطة (جامعات، شركات كبيرة)</td>
                                    <td className="px-6 py-4 font-mono">255.255.0.0 (/16)</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class C</td>
                                    <td className="px-6 py-4 font-mono">192 - 223</td>
                                    <td className="px-6 py-4">شبكات صغيرة (شركات صغيرة، شبكات منزلية)</td>
                                    <td className="px-6 py-4 font-mono">255.255.255.0 (/24)</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class D</td>
                                    <td className="px-6 py-4 font-mono">224 - 239</td>
                                    <td className="px-6 py-4">محجوزة للبث المتعدد (Multicasting)</td>
                                    <td className="px-6 py-4">غير مطبق</td>
                                </tr>
                                <tr className="hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class E</td>
                                    <td className="px-6 py-4 font-mono">240 - 255</td>
                                    <td className="px-6 py-4">محجوزة للأغراض التجريبية والبحثية</td>
                                    <td className="px-6 py-4">غير مطبق</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">ملاحظة: النطاق <span className="font-mono text-yellow-400">127.x.x.x</span> محجوز لاختبارات الاسترجاع (Loopback)، وأشهر عنوان فيه هو <span className="font-mono text-yellow-400">127.0.0.1</span>.</p>
                    
                    <p className="mt-4">وهناك نطاقات عناوين خاصة (Private) محجوزة للاستخدام في الشبكات الداخلية ولا يمكن الوصول إليها من الإنترنت مباشرة، وهي:</p>
                     <ul className="list-disc list-inside my-2 bg-gray-900 p-4 rounded-md">
                        <li><span className="font-mono text-yellow-400">10.0.0.0</span> - <span className="font-mono text-yellow-400">10.255.255.255</span> (Class A)</li>
                        <li><span className="font-mono text-yellow-400">172.16.0.0</span> - <span className="font-mono text-yellow-400">172.31.255.255</span> (Class B)</li>
                        <li><span className="font-mono text-yellow-400">192.168.0.0</span> - <span className="font-mono text-yellow-400">192.168.255.255</span> (Class C)</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">2. ما هو قناع الشبكة (Subnet Mask)؟</h3>
                    <p>
                        قناع الشبكة هو رقم 32 بت آخر يُستخدم لتقسيم عنوان IP إلى جزأين: جزء الشبكة (Network) وجزء المضيف (Host). الهدف الأساسي من تقسيم الشبكات هو إنشاء شبكات فرعية (Subnets) أصغر وأكثر كفاءة من شبكة رئيسية كبيرة، مما يقلل من ازدحام الشبكة ويزيد من الأمان.
                    </p>
                    <p>على سبيل المثال, قناع الشبكة <span className="font-mono text-yellow-400">255.255.255.0</span> بالتمثيل الثنائي هو:</p>
                    <CodeBlock>11111111.11111111.11111111.00000000</CodeBlock>
                    <p>
                        الواحدات (1s) تمثل جزء الشبكة، والأصفار (0s) تمثل جزء المضيف.
                    </p>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">3. تدوين CIDR</h3>
                    <p>
                        تدوين CIDR (Classless Inter-Domain Routing) هو طريقة مختصرة لكتابة قناع الشبكة. يتم تمثيله بشرطة مائلة (/) متبوعة بعدد الواحدات (1s) في قناع الشبكة. هذه هي الطريقة الحديثة والأكثر شيوعًا.
                    </p>
                    <ul className="list-disc list-inside my-2 bg-gray-900 p-4 rounded-md">
                        <li><span className="font-mono text-yellow-400">/8</span> يعني 8 واحدات: <span className="font-mono text-yellow-400">255.0.0.0</span></li>
                        <li><span className="font-mono text-yellow-400">/16</span> يعني 16 واحدًا: <span className="font-mono text-yellow-400">255.255.0.0</span></li>
                        <li><span className="font-mono text-yellow-400">/24</span> يعني 24 واحدًا: <span className="font-mono text-yellow-400">255.255.255.0</span></li>
                        <li><span className="font-mono text-yellow-400">/27</span> يعني 27 واحدًا: <span className="font-mono text-yellow-400">255.255.255.224</span></li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">4. مثال عملي: حساب تفاصيل الشبكة</h3>
                    <p>
                        لنفترض أن لدينا العنوان <span className="font-mono text-yellow-400">192.168.10.150/26</span>. كيف نجد كل المعلومات؟
                    </p>
                    <p><strong>الخطوة 1: تحليل القناع</strong></p>
                    <p>القناع <span className="font-mono text-yellow-400">/26</span> يعني <span className="font-mono text-yellow-400">255.255.255.192</span>. بالتمثيل الثنائي:</p>
                    <CodeBlock>11111111.11111111.11111111.11000000</CodeBlock>
                    
                    <p><strong>الخطوة 2: تحويل IP إلى ثنائي</strong></p>
                    <p>العنوان <span className="font-mono text-yellow-400">192.168.10.150</span> بالتمثيل الثنائي:</p>
                    <CodeBlock>11000000.10101000.00001010.10010110</CodeBlock>

                    <p><strong>الخطوة 3: حساب عنوان الشبكة (Network Address)</strong></p>
                    <p>نقوم بعملية <span className="font-bold text-cyan-400">AND</span> منطقية بين IP والقناع:</p>
                    <CodeBlock>
{`  11000000.10101000.00001010.10010110   (IP: 192.168.10.150)
& 11111111.11111111.11111111.11000000   (Mask: 255.255.255.192)
-------------------------------------
  11000000.10101000.00001010.10000000   (Result: 192.168.10.128)`}
                    </CodeBlock>
                     <p>إذًا، عنوان الشبكة هو <span className="font-mono text-green-400">192.168.10.128</span>.</p>
                    
                    <SubnetChart />

                    <p><strong>الخطوة 4: حساب عنوان البث (Broadcast Address)</strong></p>
                    <p>نأخذ عنوان الشبكة ونقوم بقلب كل بتات جزء المضيف (الأصفار في القناع) إلى واحدات:</p>
                     <CodeBlock>
{`  11000000.10101000.00001010.10000000   (Network Address)
  ... turn host bits (last 6 bits) to 1s ...
  11000000.10101000.00001010.10111111   (Result: 192.168.10.191)`}
                     </CodeBlock>
                    <p>إذًا، عنوان البث هو <span className="font-mono text-green-400">192.168.10.191</span>.</p>
                     
                    <p><strong>الخطوة 5: تحديد العناوين الصالحة</strong></p>
                     <ul className="list-disc list-inside my-2 bg-gray-900 p-4 rounded-md">
                        <li><strong>أول عنوان صالح:</strong> عنوان الشبكة + 1 = <span className="font-mono text-green-400">192.168.10.129</span></li>
                        <li><strong>آخر عنوان صالح:</strong> عنوان البث - 1 = <span className="font-mono text-green-400">192.168.10.190</span></li>
                    </ul>
                </section>
                
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">5. VLSM: فن توفير العناوين</h3>
                    <p>
                        تخيل أنك تقسم شبكة كبيرة باستخدام قناع ثابت (Fixed Length Subnet Masking - FLSM). لو كنت تحتاج شبكة صغيرة لجهازين فقط، ستضطر لمنحها نفس حجم الشبكة المخصصة لـ 50 جهازًا، وهذا هدر كبير للعناوين.
                    </p>
                    <p className="mt-2">
                        هنا يأتي دور <strong>VLSM (Variable Length Subnet Masking)</strong>. إنها تقنية عبقرية تسمح لك باستخدام أقنعة شبكة <strong className="text-cyan-400">مختلفة الأحجام</strong> داخل نفس الشبكة الرئيسية. الهدف؟ تخصيص الحجم المناسب تمامًا لكل شبكة فرعية، مما يقلل هدر العناوين إلى أقصى حد ممكن.
                    </p>

                    <h4 className="text-xl font-semibold text-white mt-6 mb-3">خطوات تطبيق VLSM:</h4>
                    <ol className="list-decimal list-inside my-2 bg-gray-900 p-4 rounded-md space-y-2">
                        <li><strong>حدد المتطلبات:</strong> اكتب قائمة بكل الشبكات الفرعية التي تحتاجها وعدد الأجهزة في كل منها.</li>
                        <li><strong>رتب تنازليًا:</strong> قم بترتيب قائمتك من الشبكة التي تتطلب أكبر عدد من الأجهزة إلى الأصغر. هذه هي القاعدة الذهبية!</li>
                        <li><strong>احسب للشبكة الأكبر:</strong> ابدأ بالشبكة الأكبر، واحسب أصغر قناع شبكة يمكنه استيعاب عدد الأجهزة المطلوب.</li>
                        <li><strong>حدد الشبكة التالية:</strong> خصص تلك الشبكة، ثم انتقل إلى الشبكة التالية في قائمتك، وابدأ الحساب من أول عنوان IP متاح بعد الشبكة التي خصصتها للتو.</li>
                        <li><strong>كرر العملية:</strong> استمر في تكرار الخطوتين 3 و 4 حتى تنتهي من تخصيص جميع الشبكات.</li>
                    </ol>
                    
                    <h4 className="text-xl font-semibold text-white mt-6 mb-3">سيناريو عملي:</h4>
                    <p>شركة لديها الشبكة الرئيسية <span className="font-mono text-yellow-400">192.168.1.0/24</span> وتحتاج لتقسيمها للأقسام التالية:</p>
                     <ul className="list-disc list-inside my-2 bg-gray-900 p-4 rounded-md">
                        <li><strong>قسم الهندسة:</strong> يحتاج 100 جهاز.</li>
                        <li><strong>قسم المبيعات:</strong> يحتاج 50 جهازًا.</li>
                        <li><strong>قسم الإدارة:</strong> يحتاج 20 جهازًا.</li>
                        <li><strong>اتصال WAN:</strong> يحتاج عنوانين فقط (نقطة إلى نقطة).</li>
                    </ul>
                    
                    <p className="font-bold mt-4">التطبيق المفصل (نبدأ بالأكبر):</p>
                    
                    <div className="space-y-6 mt-4">
                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h5 className="font-bold text-lg text-white">1. قسم الهندسة (100 جهاز)</h5>
                            <p className="mt-2 text-sm">
                                <strong>التحليل:</strong> نحتاج شبكة تتسع لـ <code className="text-yellow-400">100</code> جهاز. نبحث عن أقرب قوة للرقم 2.
                                <br />
                                <code className="text-cyan-400">2<sup>H</sup> - 2 >= 100</code>  (حيث H هو عدد بتات المضيف)
                                <br />
                                <code className="text-cyan-400">2<sup>6</sup> - 2 = 62</code> (غير كاف). <code className="text-cyan-400">2<sup>7</sup> - 2 = 126</code> (كاف).
                                <br/>
                                إذن، نحتاج <strong className="text-green-400">7 بتات</strong> لجزء المضيف.
                                <br />
                                <strong>القناع (CIDR):</strong> 32 (إجمالي البتات) - 7 (بتات المضيف) = <strong className="text-green-400">/25</strong>.
                            </p>
                            <CodeBlock>
{`العنوان المتاح للبدء: 192.168.1.0
القناع: /25 (255.255.255.128)
عنوان الشبكة: 192.168.1.0
عنوان البث: 192.168.1.127
النطاق الصالح: 192.168.1.1 - 192.168.1.126 (126 جهاز)`}
                            </CodeBlock>
                        </div>
                        
                         <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                             <h5 className="font-bold text-lg text-white">2. قسم المبيعات (50 جهازًا)</h5>
                            <p className="mt-2 text-sm">
                                <strong>العنوان التالي المتاح:</strong> <code className="text-yellow-400">192.168.1.128</code>.
                                <br />
                                <strong>التحليل:</strong> <code className="text-cyan-400">2<sup>H</sup> - 2 >= 50</code>. <code className="text-cyan-400">2<sup>5</sup> - 2 = 30</code> (غير كاف). <code className="text-cyan-400">2<sup>6</sup> - 2 = 62</code> (كاف).
                                <br/>
                                إذن، نحتاج <strong className="text-green-400">6 بتات</strong> للمضيف.
                                <br />
                                <strong>القناع (CIDR):</strong> 32 - 6 = <strong className="text-green-400">/26</strong>.
                            </p>
                             <CodeBlock>
{`العنوان المتاح للبدء: 192.168.1.128
القناع: /26 (255.255.255.192)
عنوان الشبكة: 192.168.1.128
عنوان البث: 192.168.1.191
النطاق الصالح: 192.168.1.129 - 192.168.1.190 (62 جهاز)`}
                             </CodeBlock>
                        </div>
                        
                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h5 className="font-bold text-lg text-white">3. قسم الإدارة (20 جهازًا)</h5>
                            <p className="mt-2 text-sm">
                                <strong>العنوان التالي المتاح:</strong> <code className="text-yellow-400">192.168.1.192</code>.
                                <br />
                                <strong>التحليل:</strong> <code className="text-cyan-400">2<sup>H</sup> - 2 >= 20</code>. <code className="text-cyan-400">2<sup>4</sup> - 2 = 14</code> (غير كاف). <code className="text-cyan-400">2<sup>5</sup> - 2 = 30</code> (كاف).
                                <br/>
                                إذن، نحتاج <strong className="text-green-400">5 بتات</strong> للمضيف.
                                <br />
                                <strong>القناع (CIDR):</strong> 32 - 5 = <strong className="text-green-400">/27</strong>.
                            </p>
                             <CodeBlock>
{`العنوان المتاح للبدء: 192.168.1.192
القناع: /27 (255.255.255.224)
عنوان الشبكة: 192.168.1.192
عنوان البث: 192.168.1.223
النطاق الصالح: 192.168.1.193 - 192.168.1.222 (30 جهاز)`}
                             </CodeBlock>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                             <h5 className="font-bold text-lg text-white">4. اتصال WAN (جهازان)</h5>
                            <p className="mt-2 text-sm">
                                <strong>العنوان التالي المتاح:</strong> <code className="text-yellow-400">192.168.1.224</code>.
                                <br />
                                <strong>التحليل:</strong> <code className="text-cyan-400">2<sup>H</sup> - 2 >= 2</code>. <code className="text-cyan-400">2<sup>2</sup> - 2 = 2</code> (كاف).
                                <br/>
                                إذن، نحتاج <strong className="text-green-400">2 بت</strong> للمضيف.
                                <br />
                                <strong>القناع (CIDR):</strong> 32 - 2 = <strong className="text-green-400">/30</strong>.
                            </p>
                             <CodeBlock>
{`العنوان المتاح للبدء: 192.168.1.224
القناع: /30 (255.255.255.252)
عنوان الشبكة: 192.168.1.224
عنوان البث: 192.168.1.227
النطاق الصالح: 192.168.1.225 - 192.168.1.226 (جهازان)`}
                             </CodeBlock>
                        </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-white mt-6 mb-3">ملخص التخصيص:</h4>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left text-gray-300 bg-gray-950 rounded-lg">
                            <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">القسم</th>
                                    <th scope="col" className="px-6 py-3">الشبكة و CIDR</th>
                                    <th scope="col" className="px-6 py-3">عنوان البث</th>
                                    <th scope="col" className="px-6 py-3">النطاق الصالح</th>
                                    <th scope="col" className="px-6 py-3">الأجهزة المتاحة</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50 font-mono">
                                    <td className="px-6 py-4">الهندسة</td>
                                    <td className="px-6 py-4">192.168.1.0/25</td>
                                    <td className="px-6 py-4">192.168.1.127</td>
                                    <td className="px-6 py-4">.1 - .126</td>
                                    <td className="px-6 py-4">126</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50 font-mono">
                                    <td className="px-6 py-4">المبيعات</td>
                                    <td className="px-6 py-4">192.168.1.128/26</td>
                                    <td className="px-6 py-4">192.168.1.191</td>
                                    <td className="px-6 py-4">.129 - .190</td>
                                    <td className="px-6 py-4">62</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50 font-mono">
                                    <td className="px-6 py-4">الإدارة</td>
                                    <td className="px-6 py-4">192.168.1.192/27</td>
                                    <td className="px-6 py-4">192.168.1.223</td>
                                    <td className="px-6 py-4">.193 - .222</td>
                                    <td className="px-6 py-4">30</td>
                                </tr>
                                <tr className="hover:bg-gray-800/50 font-mono">
                                    <td className="px-6 py-4">WAN</td>
                                    <td className="px-6 py-4">192.168.1.224/30</td>
                                    <td className="px-6 py-4">192.168.1.227</td>
                                    <td className="px-6 py-4">.225 - .226</td>
                                    <td className="px-6 py-4">2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                     <p className="mt-4">
                        لاحظ كيف قمنا بتلبية جميع المتطلبات بكفاءة عالية، مع ترك جزء من العناوين (<span className="font-mono text-yellow-400">192.168.1.228</span> إلى <span className="font-mono text-yellow-400">192.168.1.255</span>) متاحًا للتوسع المستقبلي. هذا هو جمال وقوة VLSM.
                    </p>
                </section>
                
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">6. الإجابة على الأسئلة الخمسة الأساسية</h3>
                    <p>باستخدام نفس المثال <span className="font-mono text-yellow-400">192.168.10.0/26</span>، دعنا نجيب على الأسئلة الأساسية التي تواجه أي مهندس شبكات.</p>

                    <div className="space-y-6 mt-6">
                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">1. كم عدد الشبكات التي حصلنا عليها؟ (How many networks)</h4>
                            <p className="mt-2">القاعدة: <span className="font-bold">2<sup>S</sup></span> ، حيث <span className="text-yellow-400">'S'</span> هو عدد البتات "المستعارة" لجزء الشبكة.</p>
                            <p>في مثالنا، الشبكة الأصلية هي Class C بقناع <span className="font-mono text-yellow-400">/24</span>. قناعنا الجديد هو <span className="font-mono text-yellow-400">/26</span>.</p>
                            <p className="font-mono text-cyan-400 mt-2">S = 26 (الجديد) - 24 (الأصلي) = 2 بت مستعارة</p>
                            <p className="mt-2">← عدد الشبكات = 2<sup>2</sup> = <span className="font-bold text-2xl text-green-400">4</span> شبكات فرعية.</p>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">2. كم عدد الأجهزة في كل شبكة؟ (How many hosts)</h4>
                            <p className="mt-2">القاعدة: <span className="font-bold">2<sup>H</sup> - 2</span> ، حيث <span className="text-yellow-400">'H'</span> هو عدد البتات المتبقية لجزء المضيف.</p>
                            <p>إجمالي البتات في IPv4 هو 32. قناعنا يستخدم 26 بت للشبكة.</p>
                             <p className="font-mono text-cyan-400 mt-2">H = 32 (الإجمالي) - 26 (للشبكة) = 6 بت للمضيف</p>
                            <p className="mt-2">← عدد الأجهزة = 2<sup>6</sup> - 2 = 64 - 2 = <span className="font-bold text-2xl text-green-400">62</span> جهاز صالح للاستخدام.</p>
                            <p className="text-sm text-gray-400">(نطرح 2 لأن العنوان الأول محجوز للشبكة والأخير للبث).</p>
                        </div>
                        
                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">3. ما هي الشبكات الفرعية الصالحة؟ (Valid subnets)</h4>
                            <p className="mt-2">نستخدم "الرقم السحري" أو حجم البلوك. لقناع <span className="font-mono text-yellow-400">/26</span>، الخانة المثيرة هي 192.</p>
                             <p className="font-mono text-cyan-400 mt-2">حجم البلوك = 256 - 192 = 64</p>
                            <p className="mt-2">← نبدأ من الصفر ونضيف 64 في كل مرة. الشبكات هي:</p>
                             <ul className="list-decimal list-inside font-mono text-green-400 mt-2">
                                <li>192.168.10.0</li>
                                <li>192.168.10.64</li>
                                <li>192.168.10.128</li>
                                <li>192.168.10.192</li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">4. ما هو عنوان البث لكل شبكة؟ (Broadcast address)</h4>
                            <p className="mt-2">القاعدة: هو آخر عنوان في الشبكة، أي الرقم الذي يسبق عنوان الشبكة التالية مباشرة.</p>
                             <ul className="list-none font-mono text-green-400 mt-2 space-y-1">
                                <li>شبكة <span className="text-yellow-400">.0</span> ← البث هو <span className="text-green-400">.63</span> (لأن الشبكة التالية تبدأ بـ .64)</li>
                                <li>شبكة <span className="text-yellow-400">.64</span> ← البث هو <span className="text-green-400">.127</span> (لأن الشبكة التالية تبدأ بـ .128)</li>
                                <li>شبكة <span className="text-yellow-400">.128</span> ← البث هو <span className="text-green-400">.191</span> (لأن الشبكة التالية تبدأ بـ .192)</li>
                                <li>شبكة <span className="text-yellow-400">.192</span> ← البث هو <span className="text-green-400">.255</span> (لأنها آخر شبكة في النطاق)</li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">5. ما هي الأجهزة الصالحة في كل شبكة؟ (Valid hosts)</h4>
                            <p className="mt-2">القاعدة: هي العناوين الموجودة بين عنوان الشبكة وعنوان البث.</p>
                             <ul className="list-none font-mono text-green-400 mt-2 space-y-1">
                                <li>شبكة <span className="text-yellow-400">.0</span> ← الأجهزة الصالحة: <span className="text-green-400">.1</span> إلى <span className="text-green-400">.62</span></li>
                                <li>شبكة <span className="text-yellow-400">.64</span> ← الأجهزة الصالحة: <span className="text-green-400">.65</span> إلى <span className="text-green-400">.126</span></li>
                                <li>شبكة <span className="text-yellow-400">.128</span> ← الأجهزة الصالحة: <span className="text-green-400">.129</span> إلى <span className="text-green-400">.190</span></li>
                                <li>شبكة <span className="text-yellow-400">.192</span> ← الأجهزة الصالحة: <span className="text-green-400">.193</span> إلى <span className="text-green-400">.254</span></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LearnSection;
