import React from 'react';

const TrickCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300 ease-in-out hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
        <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-cyan-400">{title}</h3>
        </div>
        <div className="p-6 text-gray-300 leading-relaxed space-y-2">{children}</div>
    </div>
);


const CidrTable = () => {
    const data = [
        { cidr: '/24', mask: '255.255.255.0', hosts: 254 },
        { cidr: '/25', mask: '255.255.255.128', hosts: 126 },
        { cidr: '/26', mask: '255.255.255.192', hosts: 62 },
        { cidr: '/27', mask: '255.255.255.224', hosts: 30 },
        { cidr: '/28', mask: '255.255.255.240', hosts: 14 },
        { cidr: '/29', mask: '255.255.255.248', hosts: 6 },
        { cidr: '/30', mask: '255.255.255.252', hosts: 2 },
    ];
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300 bg-gray-950 rounded-lg">
                <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-3">CIDR</th>
                        <th scope="col" className="px-6 py-3">Subnet Mask</th>
                        <th scope="col" className="px-6 py-3">Usable Hosts</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.cidr} className="border-b border-gray-700 hover:bg-gray-800/50">
                            <td className="px-6 py-4 font-mono font-bold">{row.cidr}</td>
                            <td className="px-6 py-4 font-mono">{row.mask}</td>
                            <td className="px-6 py-4 font-mono">{row.hosts}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TricksSection: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">أسرار الحل السريع (بمجرد النظر)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TrickCard title="1. الرقم السحري (Magic Number)">
                    <p>الرقم السحري هو مفتاحك لإيجاد عناوين الشبكات بسرعة. إنه ببساطة <strong>256</strong>.</p>
                    <p>لحساب حجم البلوك (Block Size) أو القفزة بين كل شبكة وأخرى، اطرح قيمة الخانة المثيرة للاهتمام في قناع الشبكة من 256.</p>
                    <p><strong>مثال:</strong> قناع شبكة <span className="font-mono text-yellow-400">/26</span> هو <span className="font-mono text-yellow-400">255.255.255.192</span>.</p>
                    <p>الخانة المثيرة للاهتمام هي 192.
                    <br />
                    حجم البلوك = <span className="font-mono text-green-400">256 - 192 = 64</span>.</p>
                    <p>هذا يعني أن الشبكات ستبدأ من 0, 64, 128, 192.</p>
                </TrickCard>

                <TrickCard title="2. تحديد الخانة المثيرة للاهتمام">
                     <p>هي الخانة (Octet) في قناع الشبكة التي قيمتها ليست 255 وليست 0.</p>
                     <ul className="list-disc list-inside my-2">
                         <li>قناع <span className="font-mono text-yellow-400">255.255.192.0</span>  (<span className="font-mono text-yellow-400">/18</span>): الخانة المثيرة هي الثالثة (192).</li>
                         <li>قناع <span className="font-mono text-yellow-400">255.255.255.240</span> (<span className="font-mono text-yellow-400">/28</span>): الخانة المثيرة هي الرابعة (240).</li>
                    </ul>
                    <p>هذه هي الخانة التي ستتغير فيها عناوين الشبكات الفرعية.</p>
                </TrickCard>
                
                <div className="md:col-span-2">
                    <TrickCard title="3. ورقة الغش: الإجابات السحرية الخمس">
                        <p>لكل سؤال في تقسيم الشبكات، هناك صيغة سحرية. مثالنا الدائم: شبكة Class C بقناع <span className="font-mono text-yellow-400">/26</span>.</p>
                         <ul className="space-y-4 mt-4 list-none">
                            <li>
                                <strong className="text-white text-lg">1. كم عدد الشبكات؟ (How many networks)</strong>
                                <p className="font-mono text-cyan-400 mt-1">الصيغة السحرية: 2 <sup>(البتات المستعارة)</sup></p>
                                <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg">← 2 <sup>(26-24)</sup> = 2<sup>2</sup> = 4 شبكات</span>
                                </p>
                            </li>
                             <li>
                                <strong className="text-white text-lg">2. كم عدد الأجهزة؟ (How many hosts)</strong>
                                <p className="font-mono text-cyan-400 mt-1">الصيغة السحرية: 2 <sup>(بتات المضيف)</sup> - 2</p>
                                <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg">← 2 <sup>(32-26)</sup> - 2 = 2<sup>6</sup> - 2 = 62 جهاز</span>
                                </p>
                            </li>
                            <li>
                                <strong className="text-white text-lg">3. ما هي الشبكات الصالحة؟ (Valid subnets)</strong>
                                <p className="font-mono text-cyan-400 mt-1">الصيغة السحرية: 256 - الخانة المثيرة = حجم البلوك</p>
                                <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg font-mono">← 256 - 192 = 64. الشبكات: .0, .64, .128, .192</span>
                                </p>
                            </li>
                             <li>
                                <strong className="text-white text-lg">4. ما هو عنوان البث؟ (Broadcast address)</strong>
                                <p className="font-mono text-cyan-400 mt-1">الصيغة السحرية: عنوان الشبكة التالية - 1</p>
                                <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg font-mono">← لشبكة .64، البث هو .127</span>
                                </p>
                            </li>
                             <li>
                                <strong className="text-white text-lg">5. ما هي الأجهزة الصالحة؟ (Valid hosts)</strong>
                                <p className="font-mono text-cyan-400 mt-1">الصيغة السحرية: (عنوان الشبكة + 1) إلى (عنوان البث - 1)</p>
                                 <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg font-mono">← لشبكة .64، الأجهزة هي من .65 إلى .126</span>
                                </p>
                            </li>
                        </ul>
                    </TrickCard>
                </div>

                <TrickCard title="4. القاعدة الذهبية لتخطيط VLSM">
                    <p>عندما تحتاج إلى تقسيم شبكة لتلبية متطلبات مختلفة الأحجام (مثل قسم يحتاج 100 جهاز وآخر يحتاج 10)، استخدم دائمًا هذه القاعدة:</p>
                    <p className="text-center font-bold text-xl my-4 p-4 bg-gray-950 rounded-md text-yellow-400">ابدأ دائمًا بالشبكة الأكبر أولاً!</p>
                    <p>قم بتخصيص الشبكة الفرعية التي تتطلب أكبر عدد من الأجهزة أولاً، ثم انتقل إلى الأصغر فالأصغر. هذا الأسلوب يضمن عدم تداخل الشبكات ويجعل عملية التخطيط منظمة وسهلة.</p>
                </TrickCard>
                
                <div className="md:col-span-2">
                    <TrickCard title="5. جدول CIDR السريع (لشبكات Class C)">
                        <p>احفظ هذا الجدول عن ظهر قلب، وسوف تتمكن من حل معظم أسئلة Class C بمجرد النظر.</p>
                        <div className="mt-4">
                            <CidrTable />
                        </div>
                    </TrickCard>
                </div>

                <TrickCard title="6. طريقة الأصابع (Finger Method)">
                    <p>يمكنك استخدام أصابعك لتذكر قوى العدد 2 بسرعة.</p>
                    <p>ابدأ من اليمين إلى اليسار، كل إصبع يمثل قوة للرقم 2:</p>
                    <p className="font-mono text-yellow-400 text-center tracking-widest text-lg p-4 bg-gray-950 rounded-md">
                        128 &nbsp; 64 &nbsp; 32 &nbsp; 16 &nbsp; 8 &nbsp; 4 &nbsp; 2 &nbsp; 1
                    </p>
                    <p>للحصول على قيمة قناع الشبكة مثل <span className="font-mono text-yellow-400">/27</span>، فأنت تحتاج 3 بتات في الخانة الأخيرة (لأن 24 بت في الخانات الثلاث الأولى).
                    <br/>
                    هذا يعني أول 3 بتات من اليسار: <span className="font-mono text-green-400">128 + 64 + 32 = 224</span>. إذن القناع هو <span className="font-mono text-green-400">255.255.255.224</span>.</p>
                </TrickCard>
            </div>
        </div>
    );
};

export default TricksSection;
