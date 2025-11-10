import React from 'react';
import { useI18n } from '../hooks/useI18n';

const TrickCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300 ease-in-out hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
        <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-cyan-400">{title}</h3>
        </div>
        <div className="p-6 text-gray-300 leading-relaxed space-y-2">{children}</div>
    </div>
);


const CidrTable = () => {
    const { t } = useI18n();
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
            <table className="w-full text-sm text-left rtl:text-right text-gray-300 bg-gray-950 rounded-lg">
                <thead className="text-xs text-cyan-300 uppercase bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-3">CIDR</th>
                        <th scope="col" className="px-6 py-3">{t('tricks.table.header2')}</th>
                        <th scope="col" className="px-6 py-3">{t('tricks.table.header3')}</th>
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
    const { t } = useI18n();
    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">{t('tricks.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TrickCard title={t('tricks.card1.title')}>
                    <p>{t('tricks.card1.p1')}</p>
                    <p>{t('tricks.card1.p2')}</p>
                    <p><strong>{t('tricks.example')}:</strong> {t('tricks.card1.example_p1')}</p>
                    <p>{t('tricks.card1.example_p2')}
                    <br />
                    {t('tricks.card1.example_p3')}</p>
                    <p>{t('tricks.card1.example_p4')}</p>
                </TrickCard>

                <TrickCard title={t('tricks.card2.title')}>
                     <p>{t('tricks.card2.p1')}</p>
                     <ul className="list-disc list-inside my-2">
                         <li>{t('tricks.card2.li1')}</li>
                         <li>{t('tricks.card2.li2')}</li>
                    </ul>
                    <p>{t('tricks.card2.p2')}</p>
                </TrickCard>
                
                <div className="md:col-span-2">
                    <TrickCard title={t('tricks.card3.title')}>
                        <p>{t('tricks.card3.p1')}</p>
                         <ul className="space-y-4 mt-4 list-none">
                            <li>
                                <strong className="text-white text-lg">{t('tricks.card3.q1_title')}</strong>
                                <p className="font-mono text-cyan-400 mt-1">{t('tricks.card3.q1_formula')}</p>
                                <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg">← 2 <sup>(26-24)</sup> = 2<sup>2</sup> = {t('tricks.card3.q1_result')}</span>
                                </p>
                            </li>
                             <li>
                                <strong className="text-white text-lg">{t('tricks.card3.q2_title')}</strong>
                                <p className="font-mono text-cyan-400 mt-1">{t('tricks.card3.q2_formula')}</p>
                                <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg">← 2 <sup>(32-26)</sup> - 2 = 2<sup>6</sup> - 2 = {t('tricks.card3.q2_result')}</span>
                                </p>
                            </li>
                            <li>
                                <strong className="text-white text-lg">{t('tricks.card3.q3_title')}</strong>
                                <p className="font-mono text-cyan-400 mt-1">{t('tricks.card3.q3_formula')}</p>
                                <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg font-mono">← 256 - 192 = 64. {t('tricks.card3.q3_result')}</span>
                                </p>
                            </li>
                             <li>
                                <strong className="text-white text-lg">{t('tricks.card3.q4_title')}</strong>
                                <p className="font-mono text-cyan-400 mt-1">{t('tricks.card3.q4_formula')}</p>
                                <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg font-mono">← {t('tricks.card3.q4_result')}</span>
                                </p>
                            </li>
                             <li>
                                <strong className="text-white text-lg">{t('tricks.card3.q5_title')}</strong>
                                <p className="font-mono text-cyan-400 mt-1">{t('tricks.card3.q5_formula')}</p>
                                 <p className="text-gray-300">
                                    <span className="font-bold text-green-400 text-lg font-mono">← {t('tricks.card3.q5_result')}</span>
                                </p>
                            </li>
                        </ul>
                    </TrickCard>
                </div>

                <TrickCard title={t('tricks.card4.title')}>
                    <p>{t('tricks.card4.p1')}</p>
                    <p className="text-center font-bold text-xl my-4 p-4 bg-gray-950 rounded-md text-yellow-400">{t('tricks.card4.rule')}</p>
                    <p>{t('tricks.card4.p2')}</p>
                </TrickCard>
                
                <div className="md:col-span-2">
                    <TrickCard title={t('tricks.card5.title')}>
                        <p>{t('tricks.card5.p1')}</p>
                        <div className="mt-4">
                            <CidrTable />
                        </div>
                    </TrickCard>
                </div>

                <TrickCard title={t('tricks.card6.title')}>
                    <p>{t('tricks.card6.p1')}</p>
                    <p>{t('tricks.card6.p2')}</p>
                    <p className="font-mono text-yellow-400 text-center tracking-widest text-lg p-4 bg-gray-950 rounded-md">
                        128 &nbsp; 64 &nbsp; 32 &nbsp; 16 &nbsp; 8 &nbsp; 4 &nbsp; 2 &nbsp; 1
                    </p>
                    <p>{t('tricks.card6.p3')}
                    <br/>
                    {t('tricks.card6.p4')}</p>
                </TrickCard>
            </div>
        </div>
    );
};

export default TricksSection;