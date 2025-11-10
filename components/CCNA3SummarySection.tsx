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
            <h4 className="text-2xl font-bold text-white mb-3">مقدمة: خصائص OSPF</h4>
            <p>
                بروتوكول OSPF (Open Shortest Path First) هو بروتوكول توجيه من نوع <strong className="text-cyan-400">حالة الارتباط (Link-State)</strong>. على عكس بروتوكولات متجه المسافة (مثل RIP)، لا يتبادل الموجهات جداول التوجيه الكاملة، بل تتبادل معلومات حول حالة روابطها (Link States). كل موجه يبني صورة كاملة لطوبولوجيا الشبكة ويحسب أفضل مسار بشكل مستقل باستخدام خوارزمية Dijkstra.
            </p>
            <ul className="list-disc list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-cyan-400">بروتوكول قياسي مفتوح:</strong> يعمل على أجهزة من مختلف الشركات المصنعة.</li>
                <li><strong className="text-cyan-400">يستخدم التكلفة (Cost) كمقياس:</strong> التكلفة تعتمد بشكل عكسي على عرض النطاق الترددي (Bandwidth) للرابط، مما يعني أن الروابط الأسرع لها تكلفة أقل وتكون مفضلة.</li>
                <li><strong className="text-cyan-400">تقارب سريع (Fast Convergence):</strong> عند حدوث تغيير في الشبكة، يتم إرسال تحديثات محفزة على الفور، مما يسمح للموجهات بتحديث طوبولوجيا الشبكة بسرعة.</li>
                <li><strong className="text-cyan-400">يدعم VLSM والتوجيه غير الصنفي (Classless):</strong> يرسل قناع الشبكة مع تحديثات التوجيه.</li>
                <li><strong className="text-cyan-400">تصميم هرمي (Hierarchical):</strong> يستخدم مفهوم المناطق (Areas) لتقسيم الشبكات الكبيرة، مما يقلل من حجم جداول التوجيه وعبء المعالجة.</li>
            </ul>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">آلية عمل OSPF</h4>
            <p>يمر OSPF بخمس خطوات رئيسية لبناء جدول التوجيه:</p>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                <li><strong className="text-yellow-400">إقامة علاقات الجوار (Neighbor Adjacencies):</strong> ترسل الموجهات حزم <strong className="text-cyan-400">Hello</strong> على واجهاتها لتبادل المعلومات واكتشاف الجيران على نفس الرابط.</li>
                <li><strong className="text-yellow-400">تبادل إعلانات حالة الارتباط (LSAs):</strong> بعد إقامة علاقة الجوار، تتبادل الموجهات <strong className="text-cyan-400">LSAs (Link-State Advertisements)</strong>، وهي حزم صغيرة تحتوي على معلومات حول روابط الموجه وحالتها.</li>
                <li><strong className="text-yellow-400">بناء قاعدة بيانات حالة الارتباط (LSDB):</strong> يقوم كل موجه بتجميع كل LSAs التي يستلمها في قاعدة بيانات تسمى <strong className="text-cyan-400">LSDB (Link-State Database)</strong>. في منطقة واحدة، يجب أن تكون LSDB متطابقة على جميع الموجهات.</li>
                <li><strong className="text-yellow-400">تنفيذ خوارزمية SPF:</strong> يقوم كل موجه بتشغيل خوارزمية <strong className="text-cyan-400">Dijkstra's SPF (Shortest Path First)</strong> على LSDB الخاصة به لإنشاء شجرة SPF، والتي تمثل أفضل مسار خالٍ من الحلقات إلى كل وجهة.</li>
                <li><strong className="text-yellow-400">اختيار أفضل المسارات:</strong> يتم إدراج أفضل المسارات من شجرة SPF في <strong className="text-cyan-400">جدول التوجيه (Routing Table)</strong>.</li>
            </ol>
        </section>

        <section>
            <h4 className="text-2xl font-bold text-white mb-3">حزم OSPF</h4>
            <p>يستخدم OSPF أنواعًا مختلفة من الحزم لإدارة عملياته، كلها مغلفة مباشرة في حزم IP:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Type 1 (Hello Packet):</strong> لاكتشاف الجيران والحفاظ على علاقات الجوار.</li>
                <li><strong>Type 2 (Database Description - DBD):</strong> لوصف محتويات LSDB بشكل موجز أثناء المزامنة.</li>
                <li><strong>Type 3 (Link-State Request - LSR):</strong> لطلب LSAs محددة من جار.</li>
                <li><strong>Type 4 (Link-State Update - LSU):</strong> لإرسال LSAs المطلوبة.</li>
                <li><strong>Type 5 (Link-State Acknowledgment - LSAck):</strong> لتأكيد استلام LSU.</li>
            </ul>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">معرف الموجه (Router ID)</h4>
            <p>
                معرف الموجه (RID) هو عنوان IP فريد مكون من 32 بت يُستخدم لتعريف كل موجه OSPF بشكل فريد. إنه ضروري لعمل البروتوكول. يتم تحديد RID تلقائيًا بواسطة الموجه باستخدام التسلسل الهرمي التالي:
            </p>
             <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-4 rounded-md">
                 <li><strong className="text-green-400">الأولوية الأولى:</strong> استخدام المعرف الذي تم تكوينه يدويًا باستخدام الأمر <code className="text-yellow-400 font-mono">router-id [id]</code>. (الطريقة الموصى بها).</li>
                 <li><strong className="text-orange-400">الأولوية الثانية:</strong> إذا لم يتم تكوينه يدويًا، يتم استخدام <strong className="text-yellow-400">أعلى عنوان IP لواجهة loopback نشطة</strong>.</li>
                 <li><strong className="text-red-400">الأولوية الثالثة:</strong> إذا لم تكن هناك واجهات loopback، يتم استخدام <strong className="text-yellow-400">أعلى عنوان IP لواجهة مادية نشطة</strong>.</li>
            </ol>
             <p className="mt-2"><strong className="text-cyan-400">ملاحظة:</strong> بمجرد تحديد RID، فإنه لا يتغير حتى يتم إعادة تشغيل عملية OSPF (باستخدام الأمر <code className="text-yellow-400 font-mono">clear ip ospf process</code>) أو إعادة تشغيل الموجه.</p>
        </section>
        
        <section>
            <h4 className="text-2xl font-bold text-white mb-3">أسئلة مراجعة للفصل الأول (CCNA 3)</h4>
             <ol className="list-decimal list-inside space-y-3 bg-gray-950 p-5 rounded-lg border border-gray-700">
                <li>ما هو نوع بروتوكول التوجيه OSPF، وما هي الخوارزمية التي يستخدمها لحساب أفضل مسار؟</li>
                <li>ما هي قطعة المعلومات الأساسية التي يتبادلها موجهات OSPF لبناء صورة الطوبولوجيا؟</li>
                <li>ما هو الغرض من حزمة OSPF Hello؟</li>
                <li>صف التسلسل الهرمي الذي يستخدمه موجه OSPF لتحديد معرف الموجه (Router ID) الخاص به.</li>
                <li>ماذا يجب أن تكون حالة قاعدة بيانات حالة الارتباط (LSDB) لجميع الموجهات داخل منطقة OSPF واحدة؟</li>
            </ol>
        </section>
    </>
);


const CCNA3SummarySection: React.FC = () => {
    const [openChapter, setOpenChapter] = useState<number | null>(1);

    const chapters = [
        { id: 1, title: 'الفصل 1: مفاهيم OSPFv2 للمنطقة الواحدة', content: <Chapter1 /> },
        // More chapters will be added here
    ];
    
    const handleToggle = (id: number) => {
        setOpenChapter(openChapter === id ? null : id);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">ملخصات CCNA3 v7: ENSA</h2>
            <p className="text-gray-400 mb-8">
                مرجع سريع لأهم المفاهيم في منهج CCNAv7 الثالث: شبكات المؤسسات والأمن والأتمتة.
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

export default CCNA3SummarySection;