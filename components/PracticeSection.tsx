import React, { useState, useEffect, useCallback } from 'react';
import { QuestionType, SubnettingQuestion, SubnettingSolution, CurriculumLevel } from '../types';
import { generateRandomQuestion, calculateSubnetDetails, calculateCidrForHosts, calculateVlsmLayout, evaluateAcl, findStpRootBridge, getProtocolAnswer } from '../services/subnettingCalculator';

// --- State Types ---
type UserSubnettingAnswers = { [K in keyof Omit<SubnettingSolution, 'wildcardMask' | 'totalSubnets'>]?: string; };
type SubnettingFeedback = { [K in keyof UserSubnettingAnswers]?: boolean; };
type PracticeMode = 'test' | 'calculator';

const PracticeSection: React.FC = () => {
    // --- Mode State ---
    const [practiceMode, setPracticeMode] = useState<PracticeMode>('test');
    const [activeCurriculum, setActiveCurriculum] = useState<CurriculumLevel>('ccna1');

    // --- Test Mode State ---
    const [question, setQuestion] = useState<SubnettingQuestion | null>(null);
    const [showSolution, setShowSolution] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

    // Subnetting State
    const [subnettingSolution, setSubnettingSolution] = useState<SubnettingSolution | null>(null);
    const [correctSingleAnswer, setCorrectSingleAnswer] = useState<string | number>('');
    const [vlsmCorrectAnswer, setVlsmCorrectAnswer] = useState({ networkAddress: '', cidr: '' });
    const [userSubnettingAnswers, setUserSubnettingAnswers] = useState<UserSubnettingAnswers>({});
    const [userSingleAnswer, setUserSingleAnswer] = useState('');
    const [vlsmUserAnswer, setVlsmUserAnswer] = useState({ networkAddress: '', cidr: '' });
    const [subnettingFeedback, setSubnettingFeedback] = useState<SubnettingFeedback>({});
    const [singleFeedback, setSingleFeedback] = useState<boolean | undefined>(undefined);
    const [vlsmFeedback, setVlsmFeedback] = useState<{ networkAddress?: boolean; cidr?: boolean }>({});
    
    // New Question Types State
    const [correctAclAnswer, setCorrectAclAnswer] = useState<'Permit' | 'Deny' | null>(null);
    const [userAclAnswer, setUserAclAnswer] = useState<'Permit' | 'Deny' | null>(null);
    const [aclFeedback, setAclFeedback] = useState<boolean | undefined>(undefined);

    const [correctStpAnswer, setCorrectStpAnswer] = useState<string | null>(null);
    const [userStpAnswer, setUserStpAnswer] = useState<string | null>(null);
    const [stpFeedback, setStpFeedback] = useState<boolean | undefined>(undefined);

    const [correctProtocolAnswer, setCorrectProtocolAnswer] = useState<string | null>(null);
    const [userProtocolAnswer, setUserProtocolAnswer] = useState<string | null>(null);
    const [protocolFeedback, setProtocolFeedback] = useState<boolean | undefined>(undefined);

    // --- Calculator Mode State ---
    const [customIp, setCustomIp] = useState('192.168.1.77');
    const [customCidr, setCustomCidr] = useState('27');
    const [customSolution, setCustomSolution] = useState<SubnettingSolution | null>(null);
    const [customError, setCustomError] = useState<string | null>(null);


    // --- Effects ---
    useEffect(() => {
        const savedStats = localStorage.getItem('subnetting-stats');
        if (savedStats) setStats(JSON.parse(savedStats));
    }, []);

    const newQuestion = useCallback((curriculum: CurriculumLevel) => {
        const q = generateRandomQuestion(curriculum);
        setQuestion(q);

        // Reset all states
        setShowSolution(false);
        setIsAnswered(false);
        
        // Reset subnetting
        setSubnettingSolution(null);
        setCorrectSingleAnswer('');
        setVlsmCorrectAnswer({ networkAddress: '', cidr: '' });
        setUserSubnettingAnswers({});
        setUserSingleAnswer('');
        setVlsmUserAnswer({ networkAddress: '', cidr: '' });
        setSubnettingFeedback({});
        setSingleFeedback(undefined);
        setVlsmFeedback({});

        // Reset new types
        setCorrectAclAnswer(null);
        setUserAclAnswer(null);
        setAclFeedback(undefined);
        setCorrectStpAnswer(null);
        setUserStpAnswer(null);
        setStpFeedback(undefined);
        setCorrectProtocolAnswer(null);
        setUserProtocolAnswer(null);
        setProtocolFeedback(undefined);


        // Calculate solutions for the new question
        switch (q.type) {
            case QuestionType.FULL_DETAILS:
            case QuestionType.HOW_MANY_HOSTS:
            case QuestionType.HOW_MANY_SUBNETS:
                if (q.ipAddress && typeof q.cidr !== 'undefined') {
                    const sol = calculateSubnetDetails(q.ipAddress, q.cidr);
                    setSubnettingSolution(sol);
                    if (q.type === QuestionType.HOW_MANY_HOSTS) setCorrectSingleAnswer(sol.numberOfHosts);
                    else if (q.type === QuestionType.HOW_MANY_SUBNETS) setCorrectSingleAnswer(sol.totalSubnets);
                }
                break;
            case QuestionType.SCENARIO_CIDR_FOR_HOSTS:
                if(q.requiredHosts) setCorrectSingleAnswer(`/${calculateCidrForHosts(q.requiredHosts)}`);
                break;
            case QuestionType.VLSM_SCENARIO:
                if (q.baseNetwork && typeof q.baseCidr !== 'undefined' && q.vlsmHostRequirements && typeof q.vlsmTargetRequirement !== 'undefined') {
                    const layout = calculateVlsmLayout(q.baseNetwork, q.baseCidr, q.vlsmHostRequirements);
                    const solutionForTarget = layout?.find(l => l.requirement === q.vlsmTargetRequirement);
                    if (solutionForTarget) {
                        setVlsmCorrectAnswer({ networkAddress: solutionForTarget.networkAddress, cidr: `/${solutionForTarget.cidr}` });
                    }
                }
                break;
            case QuestionType.ACL_EVALUATION:
                if (q.acl) setCorrectAclAnswer(evaluateAcl(q.acl));
                break;
            case QuestionType.STP_ROOT_BRIDGE:
                if (q.stp) setCorrectStpAnswer(findStpRootBridge(q.stp.switches));
                break;
            case QuestionType.PROTOCOL_IDENTIFICATION:
                 if (q.protocol) setCorrectProtocolAnswer(getProtocolAnswer(q.protocol.text));
                break;
        }
    }, []);

    useEffect(() => {
        if (practiceMode === 'test') {
            newQuestion(activeCurriculum);
        }
    }, [newQuestion, practiceMode, activeCurriculum]);

    // --- Handlers ---
    const checkAnswers = () => {
        if (!question || isAnswered) return;
        setShowSolution(false);
        let isCorrect = false;

        switch (question.type) {
            case QuestionType.FULL_DETAILS:
                if (!subnettingSolution) return;
                const newFeedback: SubnettingFeedback = {};
                const keys: (keyof UserSubnettingAnswers)[] = ['networkAddress', 'subnetMask', 'firstUsableHost', 'lastUsableHost', 'broadcastAddress', 'numberOfHosts'];
                keys.forEach(key => {
                    const isCorrect = String(userSubnettingAnswers[key] || '').trim().toLowerCase() === String(subnettingSolution[key]).toLowerCase();
                    newFeedback[key] = isCorrect;
                });
                setSubnettingFeedback(newFeedback);
                isCorrect = keys.every(key => newFeedback[key]);
                break;
            case QuestionType.HOW_MANY_HOSTS:
            case QuestionType.HOW_MANY_SUBNETS:
            case QuestionType.SCENARIO_CIDR_FOR_HOSTS:
                isCorrect = String(userSingleAnswer).trim().toLowerCase() === String(correctSingleAnswer).toLowerCase();
                setSingleFeedback(isCorrect);
                break;
            case QuestionType.VLSM_SCENARIO:
                const feedback = {
                    networkAddress: vlsmUserAnswer.networkAddress.trim() === vlsmCorrectAnswer.networkAddress,
                    cidr: vlsmUserAnswer.cidr.trim() === vlsmCorrectAnswer.cidr
                };
                setVlsmFeedback(feedback);
                isCorrect = feedback.networkAddress && feedback.cidr;
                break;
            case QuestionType.ACL_EVALUATION:
                isCorrect = userAclAnswer === correctAclAnswer;
                setAclFeedback(isCorrect);
                break;
            case QuestionType.STP_ROOT_BRIDGE:
                isCorrect = userStpAnswer === correctStpAnswer;
                setStpFeedback(isCorrect);
                break;
            case QuestionType.PROTOCOL_IDENTIFICATION:
                isCorrect = userProtocolAnswer === correctProtocolAnswer;
                setProtocolFeedback(isCorrect);
                break;
        }
        
        const newStats = { correct: stats.correct + (isCorrect ? 1 : 0), incorrect: stats.incorrect + (isCorrect ? 0 : 1) };
        setStats(newStats);
        localStorage.setItem('subnetting-stats', JSON.stringify(newStats));
        setIsAnswered(true);
    };

    const resetStats = () => {
        const newStats = { correct: 0, incorrect: 0 };
        setStats(newStats);
        localStorage.setItem('subnetting-stats', JSON.stringify(newStats));
    };

    const handleCalculate = () => {
        const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (!ipRegex.test(customIp.trim())) {
            setCustomError('الرجاء إدخال عنوان IP صالح.');
            setCustomSolution(null);
            return;
        }
        const cidrNum = parseInt(customCidr);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
            setCustomError('الرجاء إدخال رقم CIDR صالح بين 0 و 32.');
            setCustomSolution(null);
            return;
        }
        
        setCustomError(null);
        const solution = calculateSubnetDetails(customIp.trim(), cidrNum);
        setCustomSolution(solution);
    };


    // --- RENDER FUNCTIONS ---
    const getDetailedFeedback = (key: keyof SubnettingFeedback): string | null => {
        if (!isAnswered || subnettingFeedback[key] === true || !subnettingSolution) return null;

        switch(key) {
            case 'networkAddress': return 'عنوان الشبكة هو أول عنوان في النطاق.';
            case 'broadcastAddress': return 'عنوان البث هو آخر عنوان في النطاق.';
            case 'firstUsableHost': return 'أول عنوان صالح هو عنوان الشبكة + 1.';
            case 'lastUsableHost': return 'آخر عنوان صالح هو عنوان البث - 1.';
            case 'numberOfHosts': return `تذكر الصيغة: 2^(32-CIDR) - 2.`;
            case 'subnetMask': return 'تحقق من تحويل CIDR إلى قناع شبكة عشري.';
            default: return 'الإجابة غير صحيحة.';
        }
    }

    const getVlsmFeedback = (key: 'networkAddress' | 'cidr'): string | null => {
        if (!isAnswered || !vlsmFeedback[key]) return null;

        switch (key) {
            case 'networkAddress': return 'تذكر أن تبدأ بالمتطلب الأكبر وتخصص الشبكات بالتسلسل.';
            case 'cidr': return 'تأكد من حساب عدد بتات المضيف الصحيح للمتطلب المحدد.';
            default: return 'الإجابة غير صحيحة.';
        }
    }

    
    const renderFullDetailsQuestion = () => {
        if (!question || !subnettingSolution || !question.ipAddress || typeof question.cidr === 'undefined') return null;
        
        const inputFields: { key: keyof UserSubnettingAnswers; label: string }[] = [
            { key: 'networkAddress', label: 'عنوان الشبكة' },
            { key: 'subnetMask', label: 'قناع الشبكة' },
            { key: 'firstUsableHost', label: 'أول IP صالح' },
            { key: 'lastUsableHost', label: 'آخر IP صالح' },
            { key: 'broadcastAddress', label: 'عنوان البث' },
            { key: 'numberOfHosts', label: 'عدد الأجهزة المتاحة' },
        ];

        return (
            <>
                <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-cyan-500/30">
                    <p className="text-lg text-gray-400 mb-2">أوجد معلومات الشبكة للعنوان التالي:</p>
                    <p className="text-4xl font-mono text-center text-yellow-400 tracking-wider">{question.ipAddress}/{question.cidr}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inputFields.map(({ key, label }) => (
                        <div key={key}>
                            <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
                            <input
                                type="text"
                                id={key}
                                name={key}
                                value={userSubnettingAnswers[key] || ''}
                                onChange={(e) => !isAnswered && setUserSubnettingAnswers(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                readOnly={isAnswered}
                                className={`w-full p-3 bg-gray-700 border rounded-lg text-white font-mono text-lg focus:ring-2 transition-all ${
                                    isAnswered && subnettingFeedback[key] === true ? 'border-green-500 bg-green-500/10' : 
                                    isAnswered && subnettingFeedback[key] === false ? 'border-red-500 bg-red-500/10' : 
                                    'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                                }`}
                            />
                             {isAnswered && subnettingFeedback[key] === false && <p className="mt-1 text-xs text-red-400">{getDetailedFeedback(key)}</p>}
                             {showSolution && <p className="mt-2 text-sm text-green-400 font-mono">{subnettingSolution[key as keyof SubnettingSolution]}</p>}
                        </div>
                    ))}
                </div>
            </>
        );
    }
    const renderSingleAnswerQuestion = (questionText: string) => {
        return (
            <div className="max-w-md mx-auto">
                <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-cyan-500/30">
                    <p className="text-xl text-gray-200 text-center leading-relaxed">{questionText}</p>
                </div>
                <div>
                    <label htmlFor="singleAnswer" className="block mb-2 text-sm font-medium text-gray-300 text-center">أدخل إجابتك هنا</label>
                    <input
                        type="text"
                        id="singleAnswer"
                        name="singleAnswer"
                        value={userSingleAnswer}
                        onChange={(e) => !isAnswered && setUserSingleAnswer(e.target.value)}
                        readOnly={isAnswered}
                        className={`w-full p-3 bg-gray-700 border rounded-lg text-white font-mono text-2xl text-center focus:ring-2 transition-all ${
                            isAnswered && singleFeedback === true ? 'border-green-500 bg-green-500/10' : 
                            isAnswered && singleFeedback === false ? 'border-red-500 bg-red-500/10' : 
                            'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                        }`}
                        aria-label="إجابة السؤال"
                    />
                     {isAnswered && singleFeedback === false && question?.type === QuestionType.SCENARIO_CIDR_FOR_HOSTS && <p className="mt-1 text-xs text-red-400 text-center">تذكر الصيغة: 2^H - 2 &gt;= عدد الأجهزة.</p>}
                     {showSolution && <p className="mt-2 text-lg text-center text-green-400 font-mono">{correctSingleAnswer}</p>}
                </div>
            </div>
        );
    }
    const renderVlsmQuestion = () => {
         if (!question || !question.baseNetwork || typeof question.baseCidr === 'undefined' || !question.vlsmHostRequirements || typeof question.vlsmTargetRequirement === 'undefined') return null;

        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-cyan-500/30 text-center">
                    <p className="text-lg text-gray-400 mb-2">لديك الشبكة الرئيسية:</p>
                    <p className="text-3xl font-mono text-yellow-400 tracking-wider">{question.baseNetwork}/{question.baseCidr}</p>
                    <p className="text-lg text-gray-400 mt-4 mb-2">والمطلوب إنشاء شبكات فرعية للمتطلبات التالية:</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {question.vlsmHostRequirements.map((req, i) => (
                            <span key={`${req}-${i}`} className={`bg-gray-700 text-sm font-medium me-2 px-2.5 py-0.5 rounded ${req === question.vlsmTargetRequirement ? 'text-yellow-300 ring-2 ring-yellow-400' : 'text-gray-200'}`}>
                                {req} جهاز
                            </span>
                        ))}
                    </div>
                </div>
                <p className="text-xl text-center text-gray-200 mb-6">
                    باستخدام VLSM، ما هو <strong className="text-cyan-400">عنوان الشبكة</strong> و <strong className="text-cyan-400">CIDR</strong> للشبكة المخصصة لمتطلب <strong className="text-yellow-400">{question.vlsmTargetRequirement} جهاز</strong>؟
                    <br/>
                    <span className="text-sm text-gray-500">(تذكر: في VLSM، ابدأ دائمًا بالمتطلب الأكبر)</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="networkAddress" className="block mb-2 text-sm font-medium text-gray-300">عنوان الشبكة</label>
                        <input
                            type="text"
                            id="networkAddress"
                            name="networkAddress"
                            value={vlsmUserAnswer.networkAddress}
                            onChange={(e) => !isAnswered && setVlsmUserAnswer(prev => ({...prev, networkAddress: e.target.value}))}
                            readOnly={isAnswered}
                             className={`w-full p-3 bg-gray-700 border rounded-lg text-white font-mono text-lg focus:ring-2 transition-all ${
                                isAnswered && vlsmFeedback.networkAddress === true ? 'border-green-500 bg-green-500/10' : 
                                isAnswered && vlsmFeedback.networkAddress === false ? 'border-red-500 bg-red-500/10' : 
                                'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                            }`}
                        />
                         {isAnswered && vlsmFeedback.networkAddress === false && <p className="mt-1 text-xs text-red-400">{getVlsmFeedback('networkAddress')}</p>}
                         {showSolution && <p className="mt-2 text-sm text-green-400 font-mono">{vlsmCorrectAnswer.networkAddress}</p>}
                    </div>
                     <div>
                        <label htmlFor="cidr" className="block mb-2 text-sm font-medium text-gray-300">CIDR (مثال: /26)</label>
                        <input
                            type="text"
                            id="cidr"
                            name="cidr"
                            value={vlsmUserAnswer.cidr}
                            onChange={(e) => !isAnswered && setVlsmUserAnswer(prev => ({...prev, cidr: e.target.value}))}
                            readOnly={isAnswered}
                             className={`w-full p-3 bg-gray-700 border rounded-lg text-white font-mono text-lg focus:ring-2 transition-all ${
                                isAnswered && vlsmFeedback.cidr === true ? 'border-green-500 bg-green-500/10' : 
                                isAnswered && vlsmFeedback.cidr === false ? 'border-red-500 bg-red-500/10' : 
                                'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                            }`}
                        />
                        {isAnswered && vlsmFeedback.cidr === false && <p className="mt-1 text-xs text-red-400">{getVlsmFeedback('cidr')}</p>}
                         {showSolution && <p className="mt-2 text-sm text-green-400 font-mono">{vlsmCorrectAnswer.cidr}</p>}
                    </div>
                </div>
            </div>
        );
    }
    const renderAclQuestion = () => {
        if (!question?.acl) return null;
        const { rules, packet } = question.acl;
        return (
            <div className="max-w-2xl mx-auto">
                <p className="text-xl text-center text-gray-200 mb-4">بالنظر إلى قائمة التحكم (ACL) أدناه، هل سيتم السماح أم رفض الحزمة التالية؟</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <h4 className="font-bold text-lg text-cyan-400 mb-2">قائمة التحكم</h4>
                        <pre className="bg-black text-cyan-300 p-3 rounded-md font-mono text-sm">{rules.join('\n')}<br/><span className="text-red-500/50">(implicit deny any)</span></pre>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                         <h4 className="font-bold text-lg text-cyan-400 mb-2">الحزمة</h4>
                         <ul className="font-mono text-sm space-y-1">
                             <li><span className="text-gray-400">Src IP:</span> <span className="text-yellow-300">{packet.srcIp}</span></li>
                             <li><span className="text-gray-400">Dst IP:</span> <span className="text-yellow-300">{packet.dstIp}</span></li>
                             <li><span className="text-gray-400">Protocol:</span> <span className="text-yellow-300">{packet.protocol}</span></li>
                             <li><span className="text-gray-400">Dst Port:</span> <span className="text-yellow-300">{packet.dstPort}</span></li>
                         </ul>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    {(['Permit', 'Deny'] as const).map(answer => (
                        <button key={answer} onClick={() => !isAnswered && setUserAclAnswer(answer)} disabled={isAnswered} className={`px-8 py-3 font-bold text-lg rounded-lg transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 ${userAclAnswer === answer ? 'ring-2 ring-offset-2 ring-offset-gray-800' : ''} ${
                            isAnswered ? (correctAclAnswer === answer ? 'bg-green-600 text-white ring-green-400' : 'bg-red-600 text-white ring-red-400') 
                                       : (answer === 'Permit' ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600')
                        } ${userAclAnswer === answer && !isAnswered ? 'ring-cyan-400' : 'ring-transparent'}`}>
                            {answer === 'Permit' ? 'السماح' : 'الرفض'}
                        </button>
                    ))}
                </div>
                {isAnswered && aclFeedback === false && <p className="mt-2 text-center text-red-400 text-sm">تذكر أن القواعد تعالج بالترتيب وتتوقف عند أول تطابق.</p>}
                {showSolution && <p className="mt-4 text-lg text-center font-bold" style={{color: correctAclAnswer === 'Permit' ? '#4ade80' : '#f87171'}}>الحل الصحيح: {correctAclAnswer === 'Permit' ? 'السماح' : 'الرفض'}</p>}
            </div>
        );
    };

    const renderStpQuestion = () => {
        if (!question?.stp) return null;
        const { switches } = question.stp;
        return (
            <div className="max-w-3xl mx-auto">
                <p className="text-xl text-center text-gray-200 mb-6">بالنظر إلى المحولات التالية، أي منها سيتم انتخابه كـ <strong className="text-cyan-400">جسر جذري (Root Bridge)</strong>؟</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {switches.map(sw => (
                        <div key={sw.name} className={`p-4 rounded-lg text-center border-2 transition-all ${userStpAnswer === sw.name ? 'border-cyan-400 bg-cyan-900/50' : 'border-gray-700 bg-gray-900'}`}>
                            <h4 className="font-bold text-2xl text-white">{sw.name}</h4>
                            <div className="mt-2 font-mono text-sm">
                                <p><span className="text-gray-400">Priority:</span> <span className="text-yellow-300">{sw.priority}</span></p>
                                <p><span className="text-gray-400">MAC:</span> <span className="text-yellow-300">{sw.mac}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="flex justify-center gap-4 mt-6">
                    {switches.map(sw => (
                        <button key={sw.name} onClick={() => !isAnswered && setUserStpAnswer(sw.name)} disabled={isAnswered} className={`px-8 py-3 font-bold text-lg rounded-lg transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 ${userStpAnswer === sw.name ? 'ring-2 ring-offset-2 ring-offset-gray-800' : ''} ${
                            isAnswered ? (correctStpAnswer === sw.name ? 'bg-green-600 text-white ring-green-400' : 'bg-gray-700') 
                                       : 'bg-cyan-700 hover:bg-cyan-600'
                        } ${userStpAnswer === sw.name && !isAnswered ? 'ring-cyan-400' : 'ring-transparent'}`}>
                            {sw.name}
                        </button>
                    ))}
                </div>
                 {isAnswered && stpFeedback === false && <p className="mt-2 text-center text-red-400 text-sm">يتم انتخاب الجسر الجذري بناءً على أقل أولوية، ثم أقل عنوان MAC في حالة التعادل.</p>}
                {showSolution && <p className="mt-4 text-lg text-center font-bold text-green-400">الحل الصحيح: {correctStpAnswer}</p>}
            </div>
        );
    };

    const renderProtocolIdQuestion = () => {
        if (!question?.protocol) return null;
        const { text, options } = question.protocol;
        return (
            <div className="max-w-xl mx-auto">
                <p className="text-xl text-center text-gray-200 mb-6">{text}</p>
                <div className="grid grid-cols-2 gap-4">
                    {options.map(option => (
                        <button key={option} onClick={() => !isAnswered && setUserProtocolAnswer(option)} disabled={isAnswered} className={`p-4 font-semibold text-lg rounded-lg text-center transition-all disabled:cursor-not-allowed ${userProtocolAnswer === option ? 'ring-2 ring-offset-2 ring-offset-gray-800' : ''} ${
                            isAnswered ? (correctProtocolAnswer === option ? 'bg-green-600 text-white ring-green-400' : 'bg-gray-700') 
                                       : 'bg-gray-700 hover:bg-cyan-800'
                        } ${userProtocolAnswer === option && !isAnswered ? 'ring-cyan-400' : 'ring-transparent'}`}>
                            {option}
                        </button>
                    ))}
                </div>
                {isAnswered && protocolFeedback === false && <p className="mt-2 text-center text-red-400 text-sm">الإجابة الصحيحة هي: {correctProtocolAnswer}</p>}
                 {showSolution && <p className="mt-4 text-lg text-center font-bold text-green-400">الحل الصحيح: {correctProtocolAnswer}</p>}
            </div>
        );
    };

    const renderTestMode = () => {
        if (!question) {
            return <div className="text-center p-8">جاري تحميل السؤال...</div>;
        }
        
        const curriculumTabs: { id: CurriculumLevel; label: string }[] = [
            { id: 'ccna1', label: 'CCNA 1' },
            { id: 'ccna2', label: 'CCNA 2' },
            { id: 'ccna3', label: 'CCNA 3' },
        ];

        return (
            <div>
                <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">اختبر معلوماتك</h2>

                <div className="flex justify-center border-b border-gray-600 mb-6">
                    {curriculumTabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveCurriculum(tab.id)}
                            className={`py-2 px-6 font-semibold transition-colors duration-300 focus:outline-none ${
                                activeCurriculum === tab.id
                                ? 'border-b-2 border-yellow-400 text-yellow-400'
                                : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto bg-gray-900/50 rounded-lg p-3 mb-6 flex justify-around items-center">
                    <div className="text-center"><span className="text-sm text-gray-400">صحيحة</span><p className="text-2xl font-bold text-green-400">{stats.correct}</p></div>
                    <div className="text-center"><span className="text-sm text-gray-400">خاطئة</span><p className="text-2xl font-bold text-red-400">{stats.incorrect}</p></div>
                    <button onClick={resetStats} className="text-xs bg-gray-700 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-md transition-colors">تصفير</button>
                </div>
                
                <div className="min-h-[300px] flex flex-col justify-center">
                    {
                        (() => {
                            if (!question) return null;
                            switch (question.type) {
                                case QuestionType.FULL_DETAILS: return renderFullDetailsQuestion();
                                case QuestionType.HOW_MANY_SUBNETS: return renderSingleAnswerQuestion(`بالنسبة للشبكة ${question.ipAddress}/${question.cidr}، كم عدد الشبكات الفرعية التي يمكن إنشاؤها؟`);
                                case QuestionType.HOW_MANY_HOSTS: return renderSingleAnswerQuestion(`بالنسبة للشبكة ${question.ipAddress}/${question.cidr}، كم عدد الأجهزة الصالحة للاستخدام في كل شبكة فرعية؟`);
                                case QuestionType.SCENARIO_CIDR_FOR_HOSTS: return renderSingleAnswerQuestion(`شركة تحتاج إلى شبكة تتسع لـ ${question.requiredHosts} موظفًا. ما هو أفضل وأكفأ قناع شبكة بصيغة CIDR (مثال: /26) يمكن استخدامه؟`);
                                case QuestionType.VLSM_SCENARIO: return renderVlsmQuestion();
                                case QuestionType.ACL_EVALUATION: return renderAclQuestion();
                                case QuestionType.STP_ROOT_BRIDGE: return renderStpQuestion();
                                case QuestionType.PROTOCOL_IDENTIFICATION: return renderProtocolIdQuestion();
                                default: return <p>حدث خطأ غير متوقع.</p>;
                            }
                        })()
                    }
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                     <button onClick={checkAnswers} disabled={isAnswered} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100">تحقق من الإجابة</button>
                    <button onClick={() => setShowSolution(!showSolution)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">{showSolution ? 'إخفاء الحل' : 'أظهر الحل'}</button>
                    <button onClick={() => newQuestion(activeCurriculum)} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">سؤال جديد</button>
                </div>
            </div>
        )
    }

    const renderCalculatorMode = () => {
        const solutionEntries = customSolution ? [
            { label: 'عنوان الشبكة', value: customSolution.networkAddress },
            { label: 'قناع الشبكة', value: customSolution.subnetMask },
            { label: 'عنوان البث', value: customSolution.broadcastAddress },
            { label: 'CIDR', value: `/${customCidr}` },
            { label: 'قناع الوايلد كارد', value: customSolution.wildcardMask },
            { label: 'عدد الأجهزة المتاحة', value: customSolution.numberOfHosts },
            { label: 'أول IP صالح', value: customSolution.firstUsableHost },
            { label: 'آخر IP صالح', value: customSolution.lastUsableHost },
        ] : [];

        return (
            <div>
                <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">حاسبة الشبكات الفرعية</h2>
                <p className="text-center text-gray-400 mb-8">أدخل عنوان IP و CIDR لحساب تفاصيل الشبكة الفرعية.</p>
                
                <div className="max-w-xl mx-auto bg-gray-900/50 p-6 rounded-lg">
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        <input
                            type="text"
                            value={customIp}
                            onChange={(e) => setCustomIp(e.target.value)}
                            placeholder="192.168.1.1"
                            className="flex-grow w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:border-cyan-500 focus:ring-cyan-500/50 font-mono text-lg"
                        />
                        <span className="text-2xl text-gray-400 font-sans">/</span>
                        <input
                            type="number"
                            value={customCidr}
                            onChange={(e) => setCustomCidr(e.target.value)}
                            placeholder="24"
                            className="w-full sm:w-24 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:border-cyan-500 focus:ring-cyan-500/50 font-mono text-lg text-center"
                            min="0"
                            max="32"
                        />
                    </div>
                    <button onClick={handleCalculate} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                        احسب
                    </button>
                </div>

                {customError && <p className="text-red-400 text-center mt-4 bg-red-500/10 p-3 rounded-lg max-w-xl mx-auto">{customError}</p>}

                {customSolution && (
                    <div className="mt-8 max-w-3xl mx-auto animate-fade-in">
                        <h3 className="text-2xl font-semibold text-white mb-4 text-center">النتائج لـ <span className="text-yellow-400 font-mono">{customIp}/{customCidr}</span></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 p-6 rounded-lg">
                            {solutionEntries.map(entry => (
                                <div key={entry.label} className="bg-gray-800 p-3 rounded-md">
                                    <span className="text-gray-400 text-sm">{entry.label}:</span>
                                    <p className="text-yellow-400 font-mono text-lg break-words">{String(entry.value)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
             <div className="flex justify-center border-b border-gray-700 mb-8">
                <button
                    onClick={() => setPracticeMode('test')}
                    className={`py-3 px-6 text-lg font-medium transition-colors duration-300 focus:outline-none ${
                        practiceMode === 'test' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    اختبر معلوماتك
                </button>
                 <button
                    onClick={() => setPracticeMode('calculator')}
                    className={`py-3 px-6 text-lg font-medium transition-colors duration-300 focus:outline-none ${
                        practiceMode === 'calculator' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    حاسبة الشبكات
                </button>
            </div>
            {practiceMode === 'test' ? renderTestMode() : renderCalculatorMode()}
        </div>
    );
};

export default PracticeSection;