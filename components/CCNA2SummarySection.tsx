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
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: تكوين الشبكة المحولة</h4>
            <p>
                في الشبكات الحديثة، تلعب المحولات (Switches) دورًا محوريًا في بناء شبكات محلية (LANs) عالية الأداء. تعمل المحولات في الطبقة الثانية (Data Link Layer) وتستخدم عناوين MAC لاتخاذ قرارات إعادة توجيه ذكية، مما يقلل من الازدحام ويزيد من كفاءة الشبكة.
            </p>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">إعادة توجيه الإطارات (Frame Forwarding)</h4>
            <p>عندما يستقبل المحول إطارًا، يجب أن يقرر ماذا يفعل به. يبني المحول <strong className="text-cyan-400">جدول عناوين MAC</strong> ديناميكيًا عن طريق فحص عنوان MAC المصدر لكل إطار وارد. بناءً على عنوان MAC الوجهة، يتخذ المحول أحد الإجراءات التالية:</p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">Forward (توجيه):</strong> إذا كان عنوان MAC الوجهة موجودًا في الجدول، يرسل المحول الإطار فقط إلى المنفذ المحدد.</li>
                <li><strong className="text-cyan-400">Flood (إغراق):</strong> إذا كان عنوان MAC الوجهة غير معروف، يرسل المحول الإطار إلى جميع المنافذ باستثناء المنفذ الذي استقبله منه.</li>
                <li><strong className="text-cyan-400">Filter (تصفية/تجاهل):</strong> إذا كان المنفذ الوجهة هو نفسه المنفذ المصدر، يتجاهل المحول الإطار.</li>
            </ul>
             <p className="mt-4">تستخدم المحولات طريقتين لمعالجة الإطارات (مراجعة من CCNA 1):</p>
             <ul className="list-disc list-inside space-y-2 mt-2">
                 <li><strong className="text-yellow-400">Store-and-Forward:</strong> الأكثر شيوعًا. ينتظر وصول الإطار بالكامل، يتحقق من الأخطاء (FCS)، ثم يوجهه. موثوق ولكنه أبطأ قليلاً.</li>
                 <li><strong className="text-yellow-400">Cut-Through:</strong> يبدأ في توجيه الإطار بمجرد قراءة عنوان MAC الوجهة. أسرع ولكنه قد يمرر إطارات تالفة.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">نطاقات التصادم والبث (مراجعة وتعميق)</h4>
            <p>فهم هذه المفاهيم أساسي لفهم فوائد المحولات.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-red-500/50">
                    <h5 className="font-bold text-lg text-red-400">نطاق التصادم (Collision Domain)</h5>
                    <p className="text-sm mt-2">
                       هو أي جزء من الشبكة حيث يمكن أن تتصادم الإشارات المرسلة. في الأجهزة القديمة مثل الموزعات (Hubs)، كانت الشبكة بأكملها نطاق تصادم واحد.
                       <br/><br/>
                       <strong className="text-green-400">المحولات تحل هذه المشكلة:</strong> كل منفذ على المحول هو نطاق تصادم منفصل. هذا يعني أنه لا يمكن حدوث تصادمات في شبكة محولات حديثة تعمل بوضع Full-duplex.
                    </p>
                </div>
                 <div className="bg-gray-900 p-4 rounded-lg border border-blue-500/50">
                    <h5 className="font-bold text-lg text-blue-400">نطاق البث (Broadcast Domain)</h5>
                    <p className="text-sm mt-2">
                        هو نطاق الشبكة الذي تصل إليه رسالة البث (Broadcast). المحولات، بشكل افتراضي، <strong className="text-yellow-400">تمرر</strong> رسائل البث إلى جميع المنافذ.
                         <br/><br/>
                       <strong className="text-red-400">الأجهزة التي توقف البث:</strong> الموجهات (Routers) فقط هي التي تقوم بتقسيم نطاقات البث. كل واجهة على الراوتر هي نطاق بث منفصل. لاحقًا، سنتعلم كيف يمكن لـ VLANs أن تقسم نطاقات البث على مستوى المحول.
                    </p>
                </div>
            </div>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">تخفيف ازدحام الشبكة</h4>
            <p>تساهم المحولات في تحسين أداء الشبكة وتقليل الازدحام بشكل كبير من خلال:</p>
             <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">تقسيم نطاقات التصادم:</strong> القضاء على التصادمات يسمح باتصالات أكثر كفاءة.</li>
                <li><strong className="text-cyan-400">توفير نطاق ترددي مخصص:</strong> كل منفذ يحصل على النطاق الترددي الكامل المتاح له.</li>
                <li><strong className="text-cyan-400">إعادة توجيه ذكية:</strong> إرسال الإطارات فقط إلى حيث يجب أن تذهب، بدلاً من إغراق الشبكة بحركة مرور غير ضرورية.</li>
                <li><strong className="text-cyan-400">دعم السرعات العالية وأوضاع Duplex المختلفة:</strong> التكيف مع قدرات الأجهزة المتصلة لتوفير أفضل أداء ممكن.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الأول (CCNA 2)</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هي قطعة المعلومات التي يستخدمها المحول لبناء جدول عناوين MAC الخاص به؟</li>
                <li>ماذا يفعل المحول بإطار إذا كان عنوان MAC الوجهة غير موجود في جدوله؟</li>
                <li>ما هو الفرق الرئيسي في الأداء بين طريقة التوجيه Store-and-Forward و Cut-Through؟</li>
                <li>إذا قمت بتوصيل 5 محولات ببعضها البعض، كم عدد نطاقات البث التي لديك (بدون استخدام راوتر أو VLANs)؟</li>
                <li>كيف يساهم المحول في تقليل ازدحام الشبكة مقارنة بالموزع (Hub)؟</li>
            </ol>
        </section>
    </>
);


const CCNA2SummarySection: React.FC = () => {
    const [openChapter, setOpenChapter] = useState<number | null>(1);

    const chapters = [
        { id: 1, title: 'الفصل 1: مفاهيم التحويل الأساسية', content: <Chapter1 /> },
        // More chapters will be added here
    ];
    
    const handleToggle = (id: number) => {
        setOpenChapter(openChapter === id ? null : id);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">ملخصات CCNA2 v7: SRWE</h2>
            <p className="text-gray-400 mb-8">
                مرجع سريع لأهم المفاهيم في منهج CCNAv7 الثاني: أساسيات التحويل والتوجيه والشبكات اللاسلكية.
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

export default CCNA2SummarySection;