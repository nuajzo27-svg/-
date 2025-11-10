import React, { useState, useEffect, useCallback } from 'react';
import { QuestionType, SubnettingQuestion, SubnettingSolution } from '../types';
import { generateRandomQuestion, calculateSubnetDetails, calculateCidrForHosts, calculateVlsmLayout } from '../services/subnettingCalculator';

type UserAnswers = {
    [K in keyof Omit<SubnettingSolution, 'wildcardMask' | 'totalSubnets'>]?: string;
};

type Feedback = {
    [K in keyof UserAnswers]?: boolean;
};

const PracticeSection: React.FC = () => {
    const [question, setQuestion] = useState<SubnettingQuestion | null>(null);
    const [solution, setSolution] = useState<SubnettingSolution | null>(null);
    const [correctSingleAnswer, setCorrectSingleAnswer] = useState<string | number>('');
    const [vlsmCorrectAnswer, setVlsmCorrectAnswer] = useState({ networkAddress: '', cidr: '' });

    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [userSingleAnswer, setUserSingleAnswer] = useState('');
    const [vlsmUserAnswer, setVlsmUserAnswer] = useState({ networkAddress: '', cidr: '' });

    const [feedback, setFeedback] = useState<Feedback>({});
    const [singleFeedback, setSingleFeedback] = useState<boolean | undefined>(undefined);
    const [vlsmFeedback, setVlsmFeedback] = useState<{ networkAddress?: boolean; cidr?: boolean }>({});

    const [showSolution, setShowSolution] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

    useEffect(() => {
        const savedStats = localStorage.getItem('subnetting-stats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
    }, []);

    const newQuestion = useCallback(() => {
        const q = generateRandomQuestion();
        setQuestion(q);

        // Reset all states for the new question
        setSolution(null);
        setCorrectSingleAnswer('');
        setVlsmCorrectAnswer({ networkAddress: '', cidr: '' });
        setUserAnswers({});
        setUserSingleAnswer('');
        setVlsmUserAnswer({ networkAddress: '', cidr: '' });
        setFeedback({});
        setSingleFeedback(undefined);
        setVlsmFeedback({});
        setShowSolution(false);
        setIsAnswered(false);

        if (q.ipAddress && typeof q.cidr !== 'undefined') {
            const sol = calculateSubnetDetails(q.ipAddress, q.cidr);
            setSolution(sol);
            if (q.type === QuestionType.HOW_MANY_HOSTS) {
                setCorrectSingleAnswer(sol.numberOfHosts);
            } else if (q.type === QuestionType.HOW_MANY_SUBNETS) {
                setCorrectSingleAnswer(sol.totalSubnets);
            }
        } else if (q.type === QuestionType.SCENARIO_CIDR_FOR_HOSTS && q.requiredHosts) {
            const answer = calculateCidrForHosts(q.requiredHosts);
            setCorrectSingleAnswer(`/${answer}`);
        } else if (q.type === QuestionType.VLSM_SCENARIO && q.baseNetwork && typeof q.baseCidr !== 'undefined' && q.vlsmHostRequirements && typeof q.vlsmTargetRequirement !== 'undefined') {
            const layout = calculateVlsmLayout(q.baseNetwork, q.baseCidr, q.vlsmHostRequirements);
            if (layout) {
                const solutionForTarget = layout.find(l => l.requirement === q.vlsmTargetRequirement);
                if (solutionForTarget) {
                    setVlsmCorrectAnswer({
                        networkAddress: solutionForTarget.networkAddress,
                        cidr: `/${solutionForTarget.cidr}`
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        newQuestion();
    }, [newQuestion]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isAnswered) return;
        const { name, value } = e.target;
        setUserAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleVlsmInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isAnswered) return;
        const { name, value } = e.target;
        setVlsmUserAnswer(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSingleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isAnswered) return;
        setUserSingleAnswer(e.target.value);
    };

    const checkAnswers = () => {
        if (!question || isAnswered) return;
        setShowSolution(false);

        let isCorrect = false;

        switch (question.type) {
            case QuestionType.FULL_DETAILS: {
                if (!solution) return; // FIX: Prevent crash if solution is not ready
                const newFeedback: Feedback = {};
                const keysToCheck: (keyof UserAnswers)[] = ['networkAddress', 'subnetMask', 'firstUsableHost', 'lastUsableHost', 'broadcastAddress', 'numberOfHosts'];
                for (const key of keysToCheck) {
                    newFeedback[key] = String(userAnswers[key] || '').trim().toLowerCase() === String(solution[key]).toLowerCase();
                }
                setFeedback(newFeedback);
                isCorrect = keysToCheck.every(key => newFeedback[key]);
                break;
            }
            case QuestionType.HOW_MANY_HOSTS:
            case QuestionType.HOW_MANY_SUBNETS:
            case QuestionType.SCENARIO_CIDR_FOR_HOSTS: {
                const correct = String(userSingleAnswer).trim().toLowerCase() === String(correctSingleAnswer).toLowerCase();
                setSingleFeedback(correct);
                isCorrect = correct;
                break;
            }
            case QuestionType.VLSM_SCENARIO: {
                const feedback = {
                    networkAddress: vlsmUserAnswer.networkAddress.trim() === vlsmCorrectAnswer.networkAddress,
                    cidr: vlsmUserAnswer.cidr.trim() === vlsmCorrectAnswer.cidr
                };
                setVlsmFeedback(feedback);
                isCorrect = feedback.networkAddress && feedback.cidr;
                break;
            }
        }
        
        const newStats = { ...stats };
        if (isCorrect) {
            newStats.correct += 1;
        } else {
            newStats.incorrect += 1;
        }
        setStats(newStats);
        localStorage.setItem('subnetting-stats', JSON.stringify(newStats));
        setIsAnswered(true);
    };

    const resetStats = () => {
        const newStats = { correct: 0, incorrect: 0 };
        setStats(newStats);
        localStorage.setItem('subnetting-stats', JSON.stringify(newStats));
    };

    const renderFullDetailsQuestion = () => {
        if (!question || !solution || !question.ipAddress || typeof question.cidr === 'undefined') return null;
        
        const inputFields: { key: keyof UserAnswers; label: string }[] = [
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
                                value={userAnswers[key] || ''}
                                onChange={handleInputChange}
                                readOnly={isAnswered}
                                className={`w-full p-3 bg-gray-700 border rounded-lg text-white font-mono text-lg focus:ring-2 transition-all ${
                                    isAnswered && feedback[key] === true ? 'border-green-500 bg-green-500/10' : 
                                    isAnswered && feedback[key] === false ? 'border-red-500 bg-red-500/10' : 
                                    'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                                }`}
                            />
                             {showSolution && <p className="mt-2 text-sm text-green-400 font-mono">{solution[key as keyof SubnettingSolution]}</p>}
                        </div>
                    ))}
                </div>
            </>
        );
    };

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
                        onChange={handleSingleInputChange}
                        readOnly={isAnswered}
                        className={`w-full p-3 bg-gray-700 border rounded-lg text-white font-mono text-2xl text-center focus:ring-2 transition-all ${
                            isAnswered && singleFeedback === true ? 'border-green-500 bg-green-500/10' : 
                            isAnswered && singleFeedback === false ? 'border-red-500 bg-red-500/10' : 
                            'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                        }`}
                        aria-label="إجابة السؤال"
                    />
                     {showSolution && <p className="mt-2 text-lg text-center text-green-400 font-mono">{correctSingleAnswer}</p>}
                </div>
            </div>
        );
    };

    const renderVlsmQuestion = () => {
        if (!question || !question.baseNetwork || typeof question.baseCidr === 'undefined' || !question.vlsmHostRequirements || typeof question.vlsmTargetRequirement === 'undefined') return null;

        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-cyan-500/30 text-center">
                    <p className="text-lg text-gray-400 mb-2">لديك الشبكة الرئيسية:</p>
                    <p className="text-3xl font-mono text-yellow-400 tracking-wider">{question.baseNetwork}/{question.baseCidr}</p>
                    <p className="text-lg text-gray-400 mt-4 mb-2">والمطلوب إنشاء شبكات فرعية للمتطلبات التالية:</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {question.vlsmHostRequirements.map(req => (
                            <span key={req} className={`bg-gray-700 text-sm font-medium me-2 px-2.5 py-0.5 rounded ${req === question.vlsmTargetRequirement ? 'text-yellow-300 ring-2 ring-yellow-400' : 'text-gray-200'}`}>
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
                            onChange={handleVlsmInputChange}
                            readOnly={isAnswered}
                             className={`w-full p-3 bg-gray-700 border rounded-lg text-white font-mono text-lg focus:ring-2 transition-all ${
                                isAnswered && vlsmFeedback.networkAddress === true ? 'border-green-500 bg-green-500/10' : 
                                isAnswered && vlsmFeedback.networkAddress === false ? 'border-red-500 bg-red-500/10' : 
                                'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                            }`}
                        />
                         {showSolution && <p className="mt-2 text-sm text-green-400 font-mono">{vlsmCorrectAnswer.networkAddress}</p>}
                    </div>
                     <div>
                        <label htmlFor="cidr" className="block mb-2 text-sm font-medium text-gray-300">CIDR (مثال: /26)</label>
                        <input
                            type="text"
                            id="cidr"
                            name="cidr"
                            value={vlsmUserAnswer.cidr}
                            onChange={handleVlsmInputChange}
                            readOnly={isAnswered}
                             className={`w-full p-3 bg-gray-700 border rounded-lg text-white font-mono text-lg focus:ring-2 transition-all ${
                                isAnswered && vlsmFeedback.cidr === true ? 'border-green-500 bg-green-500/10' : 
                                isAnswered && vlsmFeedback.cidr === false ? 'border-red-500 bg-red-500/10' : 
                                'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                            }`}
                        />
                         {showSolution && <p className="mt-2 text-sm text-green-400 font-mono">{vlsmCorrectAnswer.cidr}</p>}
                    </div>
                </div>
            </div>
        );
    }
    
    const renderQuestion = () => {
        if (!question) return null;

        switch (question.type) {
            case QuestionType.FULL_DETAILS:
                return renderFullDetailsQuestion();
            case QuestionType.HOW_MANY_SUBNETS:
                return renderSingleAnswerQuestion(`بالنسبة للشبكة ${question.ipAddress}/${question.cidr}، كم عدد الشبكات الفرعية التي يمكن إنشاؤها؟`);
            case QuestionType.HOW_MANY_HOSTS:
                return renderSingleAnswerQuestion(`بالنسبة للشبكة ${question.ipAddress}/${question.cidr}، كم عدد الأجهزة الصالحة للاستخدام في كل شبكة فرعية؟`);
            case QuestionType.SCENARIO_CIDR_FOR_HOSTS:
                return renderSingleAnswerQuestion(`شركة تحتاج إلى شبكة تتسع لـ ${question.requiredHosts} موظفًا. ما هو أفضل وأكفأ قناع شبكة بصيغة CIDR (مثال: /26) يمكن استخدامه؟`);
            case QuestionType.VLSM_SCENARIO:
                return renderVlsmQuestion();
            default:
                return <p>حدث خطأ غير متوقع.</p>
        }
    }

    if (!question) {
        return <div className="text-center p-8">جاري تحميل السؤال...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">اختبر معلوماتك</h2>
            <div className="max-w-md mx-auto bg-gray-900/50 rounded-lg p-3 mb-6 flex justify-around items-center">
                <div className="text-center">
                    <span className="text-sm text-gray-400">صحيحة</span>
                    <p className="text-2xl font-bold text-green-400">{stats.correct}</p>
                </div>
                 <div className="text-center">
                    <span className="text-sm text-gray-400">خاطئة</span>
                    <p className="text-2xl font-bold text-red-400">{stats.incorrect}</p>
                </div>
                <button onClick={resetStats} className="text-xs bg-gray-700 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-md transition-colors">
                    تصفير
                </button>
            </div>
            
            {renderQuestion()}
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                 <button onClick={checkAnswers} disabled={isAnswered} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100">
                    تحقق من الإجابة
                </button>
                <button onClick={() => setShowSolution(!showSolution)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                    {showSolution ? 'إخفاء الحل' : 'أظهر الحل'}
                </button>
                <button onClick={newQuestion} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                    سؤال جديد
                </button>
            </div>
        </div>
    );
};

export default PracticeSection;