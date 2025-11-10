import React from 'react';
import { useI18n } from '../hooks/useI18n';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-950 border border-gray-700 rounded-md p-4 my-4 text-left dir-ltr text-cyan-300 font-mono text-sm overflow-x-auto">
        <code>{children}</code>
    </pre>
);

const IPv6Section: React.FC = () => {
    const { t } = useI18n();
    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">{t('ipv6.title')}</h2>

            <div className="space-y-10 text-gray-300 leading-loose">
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('ipv6.section1.title')}</h3>
                    <p>{t('ipv6.section1.p1')}</p>
                    <p className="mt-4">{t('ipv6.section1.p2')}</p>
                     <ul className="list-disc list-inside my-4 bg-gray-900 p-4 rounded-md">
                        <li><strong className="text-cyan-400">{t('ipv6.section1.feature1_title')}:</strong> {t('ipv6.section1.feature1_desc')}</li>
                        <li><strong className="text-cyan-400">{t('ipv6.section1.feature2_title')}:</strong> {t('ipv6.section1.feature2_desc')}</li>
                        <li><strong className="text-cyan-400">{t('ipv6.section1.feature3_title')}:</strong> {t('ipv6.section1.feature3_desc')}</li>
                        <li><strong className="text-cyan-400">{t('ipv6.section1.feature4_title')}:</strong> {t('ipv6.section1.feature4_desc')}</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('ipv6.section2.title')}</h3>
                    <p>{t('ipv6.section2.p1')}</p>
                    <p className="mt-2">{t('ipv6.section2.p2')}</p>
                    <p className="mt-4"><strong>{t('ipv6.section2.exampleTitle')}</strong></p>
                    <CodeBlock>2001:0db8:85a3:0000:0000:8a2e:0370:7334</CodeBlock>
                </section>
                
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('ipv6.section3.title')}</h3>
                    <p>{t('ipv6.section3.p1')}</p>
                    
                    <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500 mt-4">
                        <h4 className="font-bold text-xl text-white">{t('ipv6.section3.rule1_title')}</h4>
                        <p className="mt-2">{t('ipv6.section3.rule1_desc')}</p>
                        <ul className="list-disc list-inside my-2">
                            <li><code className="text-yellow-400">0db8</code>  {t('ipv6.becomes')}  <code className="text-green-400">db8</code></li>
                            <li><code className="text-yellow-400">0370</code>  {t('ipv6.becomes')}  <code className="text-green-400">370</code></li>
                            <li><code className="text-yellow-400">0000</code>  {t('ipv6.becomes')}  <code className="text-green-400">0</code></li>
                        </ul>
                        <p>{t('ipv6.section3.rule1_example')}</p>
                        <CodeBlock>
{`  2001:0db8:85a3:0000:0000:8a2e:0370:7334
        ↓     ↓     ↓      ↓     ↓
  2001:db8:85a3:0:0:8a2e:370:7334`}
                        </CodeBlock>
                    </div>

                     <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500 mt-6">
                        <h4 className="font-bold text-xl text-white">{t('ipv6.section3.rule2_title')}</h4>
                        <p className="mt-2">{t('ipv6.section3.rule2_desc')}</p>
                        <p className="text-red-400 font-bold mt-2">{t('ipv6.section3.rule2_note')}</p>
                        <p>{t('ipv6.section3.rule2_example')}</p>
                         <CodeBlock>
{`  2001:db8:85a3:0:0:8a2e:370:7334
                  ↓
  2001:db8:85a3::8a2e:370:7334  (${t('ipv6.section3.finalForm')})`}
                        </CodeBlock>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('ipv6.section4.title')}</h3>
                    <p>{t('ipv6.section4.p1')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-gray-700 bg-gray-800">
                                <h4 className="text-xl font-bold text-cyan-400 text-center">Global Unicast (GUA)</h4>
                            </div>
                            <div className="p-4 text-gray-300 leading-relaxed space-y-3 flex-grow flex flex-col">
                                <p className="text-sm flex-grow"><strong>{t('purpose')}:</strong> {t('ipv6.section4.gua_desc')}</p>
                                <div className="mt-auto pt-3 border-t border-gray-700/50">
                                    <p className="text-xs text-gray-400">{t('ipv6.section4.prefix')}:</p>
                                    <p className="font-mono text-yellow-400 text-center text-lg">2000::/3</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-gray-700 bg-gray-800">
                                <h4 className="text-xl font-bold text-cyan-400 text-center">Unique Local (ULA)</h4>
                            </div>
                            <div className="p-4 text-gray-300 leading-relaxed space-y-3 flex-grow flex flex-col">
                                <p className="text-sm flex-grow"><strong>{t('purpose')}:</strong> {t('ipv6.section4.ula_desc')}</p>
                                <div className="mt-auto pt-3 border-t border-gray-700/50">
                                    <p className="text-xs text-gray-400">{t('ipv6.section4.prefix')}:</p>
                                    <p className="font-mono text-yellow-400 text-center text-lg">fd00::/8</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-gray-700 bg-gray-800">
                                <h4 className="text-xl font-bold text-cyan-400 text-center">Link-Local (LLA)</h4>
                            </div>
                            <div className="p-4 text-gray-300 leading-relaxed space-y-3 flex-grow flex flex-col">
                                <p className="text-sm flex-grow"><strong>{t('purpose')}:</strong> {t('ipv6.section4.lla_desc')}</p>
                                <div className="mt-auto pt-3 border-t border-gray-700/50">
                                    <p className="text-xs text-gray-400">{t('ipv6.section4.prefix')}:</p>
                                    <p className="font-mono text-yellow-400 text-center text-lg">fe80::/10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('ipv6.section5.title')}</h3>
                    <p>{t('ipv6.section5.p1')}</p>
                    <p className="mt-4">{t('ipv6.section5.p2')}</p>
                     <ul className="list-disc list-inside my-4 bg-gray-900 p-4 rounded-md">
                        <li><strong>{t('ipv6.section5.networkPrefix')}:</strong> {t('ipv6.section5.networkPrefix_desc')}</li>
                        <li><strong>{t('ipv6.section5.interfaceId')}:</strong> {t('ipv6.section5.interfaceId_desc')}</li>
                    </ul>
                    
                    <h4 className="text-xl font-semibold text-white mt-6 mb-3">{t('ipv6.section5.scenarioTitle')}</h4>
                    <p>{t('ipv6.section5.scenario_p1')}</p>
                     <CodeBlock>2001:0db8:acad::/48</CodeBlock>
                    <p>{t('ipv6.section5.scenario_p2')}</p>
                    
                    <div className="overflow-x-auto mt-4">
                         <table className="w-full text-sm text-center text-gray-300 bg-gray-950 rounded-lg">
                            <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('ipv6.section5.table.header1')}</th>
                                    <th scope="col" className="px-6 py-3">{t('ipv6.section5.table.header2')}</th>
                                    <th scope="col" className="px-6 py-3">{t('ipv6.section5.table.header3')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700 font-mono">
                                    <td className="px-6 py-4 bg-blue-900/50">2001:0db8:acad</td>
                                    <td className="px-6 py-4 bg-green-900/50">[XXXX]</td>
                                    <td className="px-6 py-4 bg-purple-900/50">[Interface ID]</td>
                                </tr>
                                 <tr className="border-b border-gray-700">
                                    <td className="px-6 py-4">{t('ipv6.section5.table.desc1')}</td>
                                    <td className="px-6 py-4">{t('ipv6.section5.table.desc2')}</td>
                                    <td className="px-6 py-4">{t('ipv6.section5.table.desc3')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <p className="mt-6">{t('ipv6.section5.scenario_p3')}</p>
                    <p className="text-center font-bold text-3xl my-4 p-4 bg-gray-950 rounded-md text-yellow-400">2<sup>16</sup> = 65,536 {t('ipv6.subnets')}</p>
                     <p>{t('ipv6.section5.scenario_p4')}</p>
                    
                    <p><strong>{t('ipv6.section5.subnetsLookLike')}</strong></p>
                     <CodeBlock>
{`${t('ipv6.subnet1')}:  2001:0db8:acad:0000::/64  (or ::/64)
${t('ipv6.subnet2')}: 2001:0db8:acad:0001::/64
${t('ipv6.subnet3')}: 2001:0db8:acad:0002::/64
...
${t('ipv6.subnetN', { num: 4096 })}:       2001:0db8:acad:1000::/64
...
${t('ipv6.lastSubnet')}:      2001:0db8:acad:ffff::/64`}
                     </CodeBlock>
                     <p className="mt-4">{t('ipv6.section5.conclusion')}</p>
                </section>
            </div>
        </div>
    );
};

export default IPv6Section;