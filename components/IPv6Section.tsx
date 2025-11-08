import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-950 border border-gray-700 rounded-md p-4 my-4 text-left dir-ltr text-cyan-300 font-mono text-sm overflow-x-auto">
        <code>{children}</code>
    </pre>
);

const IPv6Section: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">شرح IPv6: مستقبل الإنترنت</h2>

            <div className="space-y-10 text-gray-300 leading-loose">
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">1. لماذا IPv6؟ وداعًا لنفاد العناوين</h3>
                    <p>
                        الإصدار الرابع من بروتوكول الإنترنت (IPv4) الذي نستخدمه منذ عقود يوفر حوالي 4.3 مليار عنوان فقط. مع الانفجار الهائل في عدد الأجهزة المتصلة بالإنترنت (هواتف، حواسيب، ساعات ذكية، أجهزة منزلية)، بدأت هذه العناوين في النفاد.
                    </p>
                    <p className="mt-4">
                        يأتي IPv6 كحل جذري لهذه المشكلة، حيث يوفر عددًا هائلاً من العناوين يصل إلى <strong className="text-yellow-400">340 أوندسيليون (3.4 × 10<sup>38</sup>)</strong>. هذا الرقم فلكي لدرجة أنه يمكن تخصيص مليارات العناوين لكل حبة رمل على كوكب الأرض!
                    </p>
                     <ul className="list-disc list-inside my-4 bg-gray-900 p-4 rounded-md">
                        <li><strong className="text-cyan-400">مساحة عناوين شبه لا نهائية:</strong> حل مشكلة النقص بشكل دائم.</li>
                        <li><strong className="text-cyan-400">أمان أفضل:</strong> بروتوكول IPSec مدمج بشكل أساسي لتشفير البيانات.</li>
                        <li><strong className="text-cyan-400">رأس أبسط (Simplified Header):</strong> يقلل من الحمل على أجهزة التوجيه (Routers) ويجعل معالجة البيانات أسرع.</li>
                        <li><strong className="text-cyan-400">لا حاجة لـ NAT:</strong> كل جهاز يمكن أن يحصل على عنوان عام فريد، مما يسهل الاتصالات من نوع (end-to-end).</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">2. بنية عنوان IPv6: كيف يبدو؟</h3>
                    <p>
                        على عكس IPv4 (32 بت)، يتكون عنوان IPv6 من <strong className="text-yellow-400">128 بت</strong>. ويُكتب باستخدام النظام السداسي عشري (Hexadecimal) لتسهيل قراءته.
                    </p>
                    <p className="mt-2">
                        يتم تقسيمه إلى 8 مجموعات، كل مجموعة تتكون من 4 أرقام سداسية عشرية، وتُفصل بينها بنقطتين رأسيتين (:).
                    </p>
                    <p className="mt-4"><strong>مثال على عنوان IPv6 كامل:</strong></p>
                    <CodeBlock>2001:0db8:85a3:0000:0000:8a2e:0370:7334</CodeBlock>
                </section>
                
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">3. قواعد الاختصار السحرية</h3>
                    <p>
                        نظرًا لطول العناوين، هناك قاعدتان بسيطتان لجعلها أقصر وأسهل في القراءة والكتابة.
                    </p>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500 mt-4">
                        <h4 className="font-bold text-xl text-white">القاعدة الأولى: إزالة الأصفار البادئة</h4>
                        <p className="mt-2">في أي مجموعة، يمكنك إزالة الأصفار التي تأتي في البداية.</p>
                        <ul className="list-disc list-inside my-2">
                            <li><code className="text-yellow-400">0db8</code>  تصبح  <code className="text-green-400">db8</code></li>
                            <li><code className="text-yellow-400">0370</code>  تصبح  <code className="text-green-400">370</code></li>
                            <li><code className="text-yellow-400">0000</code>  تصبح  <code className="text-green-400">0</code></li>
                        </ul>
                        <p>بتطبيق هذه القاعدة على مثالنا السابق:</p>
                        <CodeBlock>
{`  2001:0db8:85a3:0000:0000:8a2e:0370:7334
        ↓     ↓     ↓      ↓     ↓
  2001:db8:85a3:0:0:8a2e:370:7334`}
                        </CodeBlock>
                    </div>

                     <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-500 mt-6">
                        <h4 className="font-bold text-xl text-white">القاعدة الثانية: الضغط المزدوج (::)</h4>
                        <p className="mt-2">يمكنك استبدال مجموعة واحدة <strong className="text-yellow-400">متتالية</strong> من الأصفار بنقطتين رأسيتين مزدوجتين (::).</p>
                        <p className="text-red-400 font-bold mt-2">ملاحظة هامة: يمكنك استخدام هذه القاعدة مرة واحدة فقط في العنوان الواحد!</p>
                        <p>بالاستمرار على مثالنا:</p>
                         <CodeBlock>
{`  2001:db8:85a3:0:0:8a2e:370:7334
                  ↓
  2001:db8:85a3::8a2e:370:7334  (الشكل النهائي المختصر)`}
                        </CodeBlock>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">4. أنواع عناوين IPv6</h3>
                    <p>
                        تمامًا مثل IPv4 الذي يحتوي على عناوين عامة وخاصة، يمتلك IPv6 أنواعًا مختلفة من العناوين أحادية البث (Unicast) المصممة لأغراض مختلفة. فهم هذه الأنواع أساسي للتعامل مع IPv6.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-gray-700 bg-gray-800">
                                <h4 className="text-xl font-bold text-cyan-400 text-center">Global Unicast (GUA)</h4>
                            </div>
                            <div className="p-4 text-gray-300 leading-relaxed space-y-3 flex-grow flex flex-col">
                                <p className="text-sm flex-grow"><strong>الغرض:</strong> عنوان عام وفريد عالميًا، يمكن توجيهه عبر الإنترنت. هذا هو المكافئ للعنوان العام (Public IP) في IPv4.</p>
                                <div className="mt-auto pt-3 border-t border-gray-700/50">
                                    <p className="text-xs text-gray-400">البادئة النموذجية:</p>
                                    <p className="font-mono text-yellow-400 text-center text-lg">2000::/3</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-gray-700 bg-gray-800">
                                <h4 className="text-xl font-bold text-cyan-400 text-center">Unique Local (ULA)</h4>
                            </div>
                            <div className="p-4 text-gray-300 leading-relaxed space-y-3 flex-grow flex flex-col">
                                <p className="text-sm flex-grow"><strong>الغرض:</strong> عنوان خاص يستخدم داخل الشبكات المحلية فقط. لا يتم توجيهه على الإنترنت. هذا هو المكافئ للعناوين الخاصة في IPv4.</p>
                                <div className="mt-auto pt-3 border-t border-gray-700/50">
                                    <p className="text-xs text-gray-400">البادئة دائمًا:</p>
                                    <p className="font-mono text-yellow-400 text-center text-lg">fd00::/8</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-gray-700 bg-gray-800">
                                <h4 className="text-xl font-bold text-cyan-400 text-center">Link-Local (LLA)</h4>
                            </div>
                            <div className="p-4 text-gray-300 leading-relaxed space-y-3 flex-grow flex flex-col">
                                <p className="text-sm flex-grow"><strong>الغرض:</strong> عنوان يتم تكوينه تلقائيًا ويُستخدم للتواصل فقط مع الأجهزة على نفس الرابط المحلي. لا تقوم أجهزة التوجيه بتمريره.</p>
                                <div className="mt-auto pt-3 border-t border-gray-700/50">
                                    <p className="text-xs text-gray-400">البادئة دائمًا:</p>
                                    <p className="font-mono text-yellow-400 text-center text-lg">fe80::/10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">5. تقسيم الشبكات في IPv6: البساطة هي المفتاح</h3>
                    <p>
                        تقسيم الشبكات في IPv6 يختلف جذريًا عن IPv4. الهدف هنا ليس الحفاظ على العناوين (لأنها وفيرة جدًا)، بل <strong className="text-cyan-400">التنظيم وإنشاء هيكلية واضحة للشبكة</strong>.
                    </p>
                    <p className="mt-4">
                        الطريقة القياسية هي تقسيم العنوان إلى جزأين رئيسيين:
                    </p>
                     <ul className="list-disc list-inside my-4 bg-gray-900 p-4 rounded-md">
                        <li><strong>معرف الشبكة (Network Prefix):</strong> أول 64 بت من العنوان.</li>
                        <li><strong>معرف الواجهة (Interface ID):</strong> آخر 64 بت من العنوان، وعادة ما يتم إنشاؤه تلقائيًا بواسطة الجهاز نفسه.</li>
                    </ul>
                    
                    <h4 className="text-xl font-semibold text-white mt-6 mb-3">سيناريو عملي:</h4>
                    <p>
                        لنفترض أن مزود خدمة الإنترنت (ISP) أعطاك بادئة التوجيه العالمية (Global Routing Prefix) التالية:
                    </p>
                     <CodeBlock>2001:0db8:acad::/48</CodeBlock>
                    <p>هذا يعني أن أول 48 بت ثابتة لشبكتك بأكملها. البنية القياسية تمنحك الـ 16 بت التالية لإنشاء شبكاتك الفرعية.</p>
                    
                    <div className="overflow-x-auto mt-4">
                         <table className="w-full text-sm text-center text-gray-300 bg-gray-950 rounded-lg">
                            <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Global Routing Prefix (48 bits)</th>
                                    <th scope="col" className="px-6 py-3">Subnet ID (16 bits)</th>
                                    <th scope="col" className="px-6 py-3">Interface ID (64 bits)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700 font-mono">
                                    <td className="px-6 py-4 bg-blue-900/50">2001:0db8:acad</td>
                                    <td className="px-6 py-4 bg-green-900/50">[XXXX]</td>
                                    <td className="px-6 py-4 bg-purple-900/50">[Interface ID]</td>
                                </tr>
                                 <tr className="border-b border-gray-700">
                                    <td className="px-6 py-4">مقدمة من مزود الخدمة (ثابتة)</td>
                                    <td className="px-6 py-4">هذه هي المساحة الخاصة بك لإنشاء الشبكات!</td>
                                    <td className="px-6 py-4">يتم تحديدها بواسطة الأجهزة</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <p className="mt-6">
                        بما أن لديك 16 بت لمعرف الشبكة الفرعية (Subnet ID)، يمكنك إنشاء:
                    </p>
                    <p className="text-center font-bold text-3xl my-4 p-4 bg-gray-950 rounded-md text-yellow-400">
                        2<sup>16</sup> = 65,536 شبكة فرعية!
                    </p>
                     <p>
                        كل شبكة من هذه الشبكات ستحصل على قناع <code className="text-yellow-400">/64</code>، وهو حجم الشبكة القياسي في IPv6، وكل منها يمكن أن يحتوي على عدد شبه لا نهائي من الأجهزة.
                    </p>
                    
                    <p><strong>كيف تبدو شبكاتك الفرعية؟</strong></p>
                     <CodeBlock>
{`الشبكة الفرعية الأولى:  2001:0db8:acad:0000::/64  (أو ::/64)
الشبكة الفرعية الثانية: 2001:0db8:acad:0001::/64
الشبكة الفرعية الثالثة: 2001:0db8:acad:0002::/64
...
الشبكة رقم 4096:       2001:0db8:acad:1000::/64
...
آخر شبكة فرعية:      2001:0db8:acad:ffff::/64`}
                     </CodeBlock>
                     <p className="mt-4">
                        الأمر بهذه البساطة. أنت فقط تقوم بالعد في خانة "Subnet ID" لإنشاء شبكات جديدة ومنظمة.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default IPv6Section;
