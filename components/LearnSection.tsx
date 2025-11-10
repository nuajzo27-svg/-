import React from 'react';
import { useI18n } from '../hooks/useI18n';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-950 border border-gray-700 rounded-md p-4 my-4 text-left dir-ltr text-cyan-300 font-mono text-sm overflow-x-auto">
        <code>{children}</code>
    </pre>
);

const SubnetChart: React.FC = () => {
    const { t } = useI18n();
    const subnets = [
        { network: '192.168.10.0', usable: '.1 - .62', broadcast: '.63' },
        { network: '192.168.10.64', usable: '.65 - .126', broadcast: '.127' },
        { network: '192.168.10.128', usable: '.129 - .190', broadcast: '.191' },
        { network: '192.168.10.192', usable: '.193 - .254', broadcast: '.255' },
    ];
    return (
        <div className="my-6">
            <h4 className="text-xl font-semibold text-white mt-6 mb-3 text-center">{t('learn.chart.title')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subnets.map((subnet, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center font-mono">
                        <div className="bg-blue-900/50 text-blue-300 p-2 rounded-t-md">
                            <p className="text-xs uppercase">{t('learn.chart.network')}</p>
                            <p className="font-bold">{subnet.network}</p>
                        </div>
                        <div className="bg-green-900/50 text-green-300 p-3">
                             <p className="text-xs uppercase">{t('learn.chart.usableHosts')}</p>
                            <p className="font-bold">{subnet.usable}</p>
                        </div>
                        <div className="bg-red-900/50 text-red-300 p-2 rounded-b-md">
                             <p className="text-xs uppercase">{t('learn.chart.broadcast')}</p>
                            <p className="font-bold">{subnet.broadcast}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const LearnSection: React.FC = () => {
    const { t } = useI18n();

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">{t('learn.mainTitle')}</h2>

            <div className="space-y-10 text-gray-300 leading-loose">
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('learn.section1.title')}</h3>
                    <p>{t('learn.section1.p1')}</p>
                    <p className="mt-4">{t('learn.section1.p2')}</p>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-300 bg-gray-950 rounded-lg">
                            <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('learn.section1.table.header1')}</th>
                                    <th scope="col" className="px-6 py-3">{t('learn.section1.table.header2')}</th>
                                    <th scope="col" className="px-6 py-3">{t('learn.section1.table.header3')}</th>
                                    <th scope="col" className="px-6 py-3">{t('learn.section1.table.header4')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class A</td>
                                    <td className="px-6 py-4 font-mono">1 - 126</td>
                                    <td className="px-6 py-4">{t('learn.section1.table.row1_desc')}</td>
                                    <td className="px-6 py-4 font-mono">255.0.0.0 (/8)</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class B</td>
                                    <td className="px-6 py-4 font-mono">128 - 191</td>
                                    <td className="px-6 py-4">{t('learn.section1.table.row2_desc')}</td>
                                    <td className="px-6 py-4 font-mono">255.255.0.0 (/16)</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class C</td>
                                    <td className="px-6 py-4 font-mono">192 - 223</td>
                                    <td className="px-6 py-4">{t('learn.section1.table.row3_desc')}</td>
                                    <td className="px-6 py-4 font-mono">255.255.255.0 (/24)</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class D</td>
                                    <td className="px-6 py-4 font-mono">224 - 239</td>
                                    <td className="px-6 py-4">{t('learn.section1.table.row4_desc')}</td>
                                    <td className="px-6 py-4">{t('learn.notApplicable')}</td>
                                </tr>
                                <tr className="hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-white">Class E</td>
                                    <td className="px-6 py-4 font-mono">240 - 255</td>
                                    <td className="px-6 py-4">{t('learn.section1.table.row5_desc')}</td>
                                    <td className="px-6 py-4">{t('learn.notApplicable')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">{t('learn.section1.note')}</p>
                    
                    <p className="mt-4">{t('learn.section1.p3')}</p>
                     <ul className="list-disc list-inside my-2 bg-gray-900 p-4 rounded-md">
                        <li><span className="font-mono text-yellow-400">10.0.0.0</span> - <span className="font-mono text-yellow-400">10.255.255.255</span> (Class A)</li>
                        <li><span className="font-mono text-yellow-400">172.16.0.0</span> - <span className="font-mono text-yellow-400">172.31.255.255</span> (Class B)</li>
                        <li><span className="font-mono text-yellow-400">192.168.0.0</span> - <span className="font-mono text-yellow-400">192.168.255.255</span> (Class C)</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('learn.section2.title')}</h3>
                    <p>{t('learn.section2.p1')}</p>
                    <p>{t('learn.section2.p2')}</p>
                    <CodeBlock>11111111.11111111.11111111.00000000</CodeBlock>
                    <p>{t('learn.section2.p3')}</p>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('learn.section3.title')}</h3>
                    <p>{t('learn.section3.p1')}</p>
                    <ul className="list-disc list-inside my-2 bg-gray-900 p-4 rounded-md">
                        <li><span className="font-mono text-yellow-400">/8</span> {t('learn.means')} 8 {t('learn.ones')}: <span className="font-mono text-yellow-400">255.0.0.0</span></li>
                        <li><span className="font-mono text-yellow-400">/16</span> {t('learn.means')} 16 {t('learn.ones')}: <span className="font-mono text-yellow-400">255.255.0.0</span></li>
                        <li><span className="font-mono text-yellow-400">/24</span> {t('learn.means')} 24 {t('learn.ones')}: <span className="font-mono text-yellow-400">255.255.255.0</span></li>
                        <li><span className="font-mono text-yellow-400">/27</span> {t('learn.means')} 27 {t('learn.ones')}: <span className="font-mono text-yellow-400">255.255.255.224</span></li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('learn.section4.title')}</h3>
                    <p>{t('learn.section4.p1')}</p>
                    <p><strong>{t('learn.section4.step1')}</strong></p>
                    <p>{t('learn.section4.step1_desc')}</p>
                    <CodeBlock>11111111.11111111.11111111.11000000</CodeBlock>
                    
                    <p><strong>{t('learn.section4.step2')}</strong></p>
                    <p>{t('learn.section4.step2_desc')}</p>
                    <CodeBlock>11000000.10101000.00001010.10010110</CodeBlock>

                    <p><strong>{t('learn.section4.step3')}</strong></p>
                    <p>{t('learn.section4.step3_desc')}</p>
                    <CodeBlock>
{`  11000000.10101000.00001010.10010110   (IP: 192.168.10.150)
& 11111111.11111111.11111111.11000000   (Mask: 255.255.255.192)
-------------------------------------
  11000000.10101000.00001010.10000000   (Result: 192.168.10.128)`}
                    </CodeBlock>
                     <p>{t('learn.section4.step3_result')}</p>
                    
                    <SubnetChart />

                    <p><strong>{t('learn.section4.step4')}</strong></p>
                    <p>{t('learn.section4.step4_desc')}</p>
                     <CodeBlock>
{`  11000000.10101000.00001010.10000000   (Network Address)
  ... turn host bits (last 6 bits) to 1s ...
  11000000.10101000.00001010.10111111   (Result: 192.168.10.191)`}
                     </CodeBlock>
                    <p>{t('learn.section4.step4_result')}</p>
                     
                    <p><strong>{t('learn.section4.step5')}</strong></p>
                     <ul className="list-disc list-inside my-2 bg-gray-900 p-4 rounded-md">
                        <li><strong>{t('learn.section4.firstHost')}:</strong> {t('learn.networkAddress')} + 1 = <span className="font-mono text-green-400">192.168.10.129</span></li>
                        <li><strong>{t('learn.section4.lastHost')}:</strong> {t('learn.broadcastAddress')} - 1 = <span className="font-mono text-green-400">192.168.10.190</span></li>
                    </ul>
                </section>
                
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('learn.section5.title')}</h3>
                    <p>{t('learn.section5.p1')}</p>
                    <p className="mt-2">{t('learn.section5.p2')}</p>

                    <h4 className="text-xl font-semibold text-white mt-6 mb-3">{t('learn.section5.stepsTitle')}</h4>
                    <ol className="list-decimal list-inside my-2 bg-gray-900 p-4 rounded-md space-y-2">
                        <li>{t('learn.section5.step1')}</li>
                        <li>{t('learn.section5.step2')}</li>
                        <li>{t('learn.section5.step3')}</li>
                        <li>{t('learn.section5.step4')}</li>
                        <li>{t('learn.section5.step5')}</li>
                    </ol>
                    
                    <h4 className="text-xl font-semibold text-white mt-6 mb-3">{t('learn.section5.scenarioTitle')}</h4>
                    <p>{t('learn.section5.scenarioP1')}</p>
                     <ul className="list-disc list-inside my-2 bg-gray-900 p-4 rounded-md">
                        <li><strong>{t('learn.section5.req1_dept')}:</strong> {t('learn.section5.req1_hosts')}</li>
                        <li><strong>{t('learn.section5.req2_dept')}:</strong> {t('learn.section5.req2_hosts')}</li>
                        <li><strong>{t('learn.section5.req3_dept')}:</strong> {t('learn.section5.req3_hosts')}</li>
                        <li><strong>{t('learn.section5.req4_dept')}:</strong> {t('learn.section5.req4_hosts')}</li>
                    </ul>
                    
                    <p className="font-bold mt-4">{t('learn.section5.applyTitle')}</p>
                    
                    <div className="space-y-6 mt-4">
                        <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                            <h5 className="font-bold text-lg text-white">{t('learn.section5.sub1_title')}</h5>
                            <p className="mt-2 text-sm">{t('learn.section5.sub1_desc')}</p>
                            <CodeBlock>{t('learn.section5.sub1_code')}</CodeBlock>
                        </div>
                        
                         <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                             <h5 className="font-bold text-lg text-white">{t('learn.section5.sub2_title')}</h5>
                            <p className="mt-2 text-sm">{t('learn.section5.sub2_desc')}</p>
                             <CodeBlock>{t('learn.section5.sub2_code')}</CodeBlock>
                        </div>
                        
                        <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                            <h5 className="font-bold text-lg text-white">{t('learn.section5.sub3_title')}</h5>
                            <p className="mt-2 text-sm">{t('learn.section5.sub3_desc')}</p>
                             <CodeBlock>{t('learn.section5.sub3_code')}</CodeBlock>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                             <h5 className="font-bold text-lg text-white">{t('learn.section5.sub4_title')}</h5>
                            <p className="mt-2 text-sm">{t('learn.section5.sub4_desc')}</p>
                             <CodeBlock>{t('learn.section5.sub4_code')}</CodeBlock>
                        </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-white mt-6 mb-3">{t('learn.section5.summaryTitle')}</h4>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-300 bg-gray-950 rounded-lg">
                            <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('learn.section5.sumTable.header1')}</th>
                                    <th scope="col" className="px-6 py-3">{t('learn.section5.sumTable.header2')}</th>
                                    <th scope="col" className="px-6 py-3">{t('learn.section5.sumTable.header3')}</th>
                                    <th scope="col" className="px-6 py-3">{t('learn.section5.sumTable.header4')}</th>
                                    <th scope="col" className="px-6 py-3">{t('learn.section5.sumTable.header5')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50 font-mono">
                                    <td className="px-6 py-4">{t('learn.section5.req1_dept')}</td>
                                    <td className="px-6 py-4">192.168.1.0/25</td>
                                    <td className="px-6 py-4">192.168.1.127</td>
                                    <td className="px-6 py-4">.1 - .126</td>
                                    <td className="px-6 py-4">126</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50 font-mono">
                                    <td className="px-6 py-4">{t('learn.section5.req2_dept')}</td>
                                    <td className="px-6 py-4">192.168.1.128/26</td>
                                    <td className="px-6 py-4">192.168.1.191</td>
                                    <td className="px-6 py-4">.129 - .190</td>
                                    <td className="px-6 py-4">62</td>
                                </tr>
                                <tr className="border-b border-gray-700 hover:bg-gray-800/50 font-mono">
                                    <td className="px-6 py-4">{t('learn.section5.req3_dept')}</td>
                                    <td className="px-6 py-4">192.168.1.192/27</td>
                                    <td className="px-6 py-4">192.168.1.223</td>
                                    <td className="px-6 py-4">.193 - .222</td>
                                    <td className="px-6 py-4">30</td>
                                </tr>
                                <tr className="hover:bg-gray-800/50 font-mono">
                                    <td className="px-6 py-4">{t('learn.section5.req4_dept')}</td>
                                    <td className="px-6 py-4">192.168.1.224/30</td>
                                    <td className="px-6 py-4">192.168.1.227</td>
                                    <td className="px-6 py-4">.225 - .226</td>
                                    <td className="px-6 py-4">2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                     <p className="mt-4">{t('learn.section5.conclusion')}</p>
                </section>
                
                <section>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('learn.section6.title')}</h3>
                    <p>{t('learn.section6.p1')}</p>

                    <div className="space-y-6 mt-6">
                        <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">{t('learn.section6.q1_title')}</h4>
                            <p className="mt-2">{t('learn.section6.q1_rule')}</p>
                            <p>{t('learn.section6.q1_p1')}</p>
                            <p className="font-mono text-cyan-400 mt-2">{t('learn.section6.q1_p2')}</p>
                            <p className="mt-2">{t('learn.section6.q1_result')}</p>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">{t('learn.section6.q2_title')}</h4>
                            <p className="mt-2">{t('learn.section6.q2_rule')}</p>
                            <p>{t('learn.section6.q2_p1')}</p>
                             <p className="font-mono text-cyan-400 mt-2">{t('learn.section6.q2_p2')}</p>
                            <p className="mt-2">{t('learn.section6.q2_result')}</p>
                            <p className="text-sm text-gray-400">{t('learn.section6.q2_note')}</p>
                        </div>
                        
                        <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">{t('learn.section6.q3_title')}</h4>
                            <p className="mt-2">{t('learn.section6.q3_p1')}</p>
                             <p className="font-mono text-cyan-400 mt-2">{t('learn.section6.q3_p2')}</p>
                            <p className="mt-2">{t('learn.section6.q3_p3')}</p>
                             <ul className="list-decimal list-inside font-mono text-green-400 mt-2">
                                <li>192.168.10.0</li>
                                <li>192.168.10.64</li>
                                <li>192.168.10.128</li>
                                <li>192.168.10.192</li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">{t('learn.section6.q4_title')}</h4>
                            <p className="mt-2">{t('learn.section6.q4_rule')}</p>
                             <ul className="list-none font-mono text-green-400 mt-2 space-y-1">
                                <li>{t('learn.section6.q4_net1')}</li>
                                <li>{t('learn.section6.q4_net2')}</li>
                                <li>{t('learn.section6.q4_net3')}</li>
                                <li>{t('learn.section6.q4_net4')}</li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-900 p-4 rounded-lg border-s-4 border-cyan-500">
                            <h4 className="font-bold text-xl text-white">{t('learn.section6.q5_title')}</h4>
                            <p className="mt-2">{t('learn.section6.q5_rule')}</p>
                             <ul className="list-none font-mono text-green-400 mt-2 space-y-1">
                                <li>{t('learn.section6.q5_net1')}</li>
                                <li>{t('learn.section6.q5_net2')}</li>
                                <li>{t('learn.section6.q5_net3')}</li>
                                <li>{t('learn.section6.q5_net4')}</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LearnSection;