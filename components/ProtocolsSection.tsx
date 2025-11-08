import React from 'react';

interface ProtocolCardProps {
  name: string;
  layer: string;
  layerColor: string;
  children: React.ReactNode;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ name, layer, layerColor, children }) => (
  <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden h-full flex flex-col">
    <div className="p-5 border-b border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${layerColor}`}>
          {layer}
        </span>
      </div>
    </div>
    <div className="p-6 text-gray-300 leading-relaxed space-y-4 flex-grow">{children}</div>
  </div>
);

const protocols = [
  {
    name: 'HTTP',
    layer: 'Application Layer',
    layerColor: 'bg-blue-900 text-blue-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> بروتوكول نقل النص التشعبي. هو الأساس الذي بنيت عليه شبكة الويب العالمية (WWW) لنقل صفحات الويب.</p>
        <p><strong>أين يستخدم:</strong> عند تصفحك لأي موقع ويب غير مشفر (يبدأ بـ http://).</p>
        <p><strong>كيفية التفعيل:</strong> يعمل تلقائيًا في متصفحات الويب عند طلب موقع. المنفذ الافتراضي له هو 80.</p>
      </>
    ),
  },
  {
    name: 'HTTPS',
    layer: 'Application Layer',
    layerColor: 'bg-blue-900 text-blue-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> النسخة الآمنة من HTTP. يقوم بتشفير البيانات بين المتصفح والخادم لحماية المعلومات الحساسة مثل كلمات المرور.</p>
        <p><strong>أين يستخدم:</strong> في كل المواقع الحديثة التي تتطلب تسجيل دخول أو معاملات مالية (يبدأ بـ https://).</p>
        <p><strong>كيفية التفعيل:</strong> يتطلب شهادة SSL/TLS مثبتة على خادم الويب. المنفذ الافتراضي له هو 443.</p>
      </>
    ),
  },
  {
    name: 'DNS',
    layer: 'Application Layer',
    layerColor: 'bg-blue-900 text-blue-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> نظام أسماء النطاقات. يعمل مثل "دليل الهاتف" للإنترنت، حيث يقوم بترجمة أسماء النطاقات (مثل google.com) إلى عناوين IP المقابلة لها.</p>
        <p><strong>أين يستخدم:</strong> في كل مرة تكتب فيها اسم موقع في المتصفح.</p>
        <p><strong>كيفية التفعيل:</strong> يتم تكوين عنوان خادم DNS في إعدادات الشبكة على جهازك أو الراوتر (غالبًا ما يتم تلقائيًا من مزود الخدمة).</p>
      </>
    ),
  },
   {
    name: 'DHCP',
    layer: 'Application Layer',
    layerColor: 'bg-blue-900 text-blue-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> بروتوكول التكوين الديناميكي للمضيفين. يقوم بتعيين عناوين IP وإعدادات الشبكة الأخرى (مثل قناع الشبكة والبوابة) للأجهزة تلقائيًا عند اتصالها بالشبكة.</p>
        <p><strong>أين يستخدم:</strong> في معظم الشبكات المنزلية والمكتبية لتسهيل إضافة الأجهزة.</p>
        <p><strong>كيفية التفعيل:</strong> يتم تفعيله كخدمة (Server) على الراوتر أو خادم مخصص، وتكون الأجهزة مهيأة كـ (Clients) لطلب عنوان IP تلقائيًا.</p>
      </>
    ),
  },
  {
    name: 'TCP',
    layer: 'Transport Layer',
    layerColor: 'bg-orange-900 text-orange-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> بروتوكول التحكم في الإرسال. يوفر نقلًا موثوقًا للبيانات، ويتأكد من وصول جميع الحزم بالترتيب الصحيح وبدون أخطاء (Connection-Oriented).</p>
        <p><strong>أين يستخدم:</strong> في التطبيقات التي تتطلب موثوقية عالية مثل تصفح الويب، البريد الإلكتروني، ونقل الملفات.</p>
        <p><strong>كيفية التفعيل:</strong> يتم اختياره من قبل مطوري التطبيقات عند الحاجة إلى اتصال موثوق. يعمل في الخلفية.</p>
      </>
    ),
  },
  {
    name: 'UDP',
    layer: 'Transport Layer',
    layerColor: 'bg-orange-900 text-orange-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> بروتوكول بيانات المستخدم. يوفر نقلًا سريعًا جدًا للبيانات ولكنه غير موثوق (Connectionless). لا يضمن وصول الحزم أو ترتيبها.</p>
        <p><strong>أين يستخدم:</strong> في التطبيقات التي تكون فيها السرعة أهم من الدقة، مثل بث الفيديو المباشر، الألعاب عبر الإنترنت، والمكالمات الصوتية (VoIP).</p>
        <p><strong>كيفية التفعيل:</strong> يتم اختياره من قبل مطوري التطبيقات عند الحاجة إلى سرعة عالية وزمن وصول منخفض.</p>
      </>
    ),
  },
  {
    name: 'IP',
    layer: 'Network Layer',
    layerColor: 'bg-green-900 text-green-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> بروتوكول الإنترنت. هو المسؤول عن العنصر الأساسي في الشبكات: العنونة المنطقية (Logical Addressing) وتوجيه الحزم (Routing) من المصدر إلى الوجهة عبر شبكات متعددة.</p>
        <p><strong>أين يستخدم:</strong> هو أساس كل اتصال على الإنترنت. كل جهاز متصل بالشبكة لديه عنوان IP.</p>
        <p><strong>كيفية التفعيل:</strong> يعمل بشكل أساسي في جميع أجهزة الشبكة مثل أجهزة الكمبيوتر والراوترات.</p>
      </>
    ),
  },
  {
    name: 'ICMP',
    layer: 'Network Layer',
    layerColor: 'bg-green-900 text-green-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> بروتوكول رسائل التحكم في الإنترنت. يستخدم لإرسال رسائل التشخيص والأخطاء، مثل "الوجهة غير قابلة للوصول".</p>
        <p><strong>أين يستخدم:</strong> في أدوات الشبكات الشهيرة مثل <code className="text-yellow-300">ping</code> (لاختبار الاتصال) و <code className="text-yellow-300">traceroute</code> (لتتبع مسار الحزمة).</p>
        <p><strong>كيفية التفعيل:</strong> لا يتم "تفعيله" بشكل مباشر، بل هو جزء من حزمة بروتوكولات IP وتستخدمه أنظمة التشغيل وأجهزة الشبكة تلقائيًا.</p>
      </>
    ),
  },
  {
    name: 'Ethernet',
    layer: 'Data Link Layer',
    layerColor: 'bg-purple-900 text-purple-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> هو المعيار الأكثر شيوعًا لتقنيات الشبكات المحلية السلكية (LAN). يحدد كيفية تنسيق البيانات للإرسال عبر الوسائط المادية (الكابلات) والعنونة المادية (MAC Address).</p>
        <p><strong>أين يستخدم:</strong> في كل مرة تقوم فيها بتوصيل جهاز كمبيوتر بالشبكة باستخدام كابل شبكة.</p>
        <p><strong>كيفية التفعيل:</strong> مدعوم في جميع بطاقات الشبكة (NICs) والمحولات (Switches) الحديثة.</p>
      </>
    ),
  },
  {
    name: 'ARP',
    layer: 'Data Link Layer',
    layerColor: 'bg-purple-900 text-purple-200',
    content: (
      <>
        <p><strong>الوظيفة:</strong> بروتوكول تحليل العنوان. يقوم بمهمة حيوية وهي ربط عنوان IP (المنطقي) بعنوان MAC (المادي) المقابل له داخل نفس الشبكة المحلية.</p>
        <p><strong>أين يستخدم:</strong> عندما يحتاج جهاز لإرسال بيانات إلى جهاز آخر على نفس الشبكة، يرسل طلب ARP "من يملك عنوان IP هذا؟" ليعرف عنوان MAC الخاص به.</p>
        <p><strong>كيفية التفعيل:</strong> يعمل تلقائيًا في الخلفية على جميع الأجهزة المتصلة بالشبكة.</p>
      </>
    ),
  },
];

const ProtocolsSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">شرح بروتوكولات الشبكات الأساسية (CCNAv7)</h2>
      <p className="text-gray-400 mb-8">
        هنا ستجد شرحًا مبسطًا لأهم البروتوكولات التي تشكل أساس الإنترنت والشبكات. كل بروتوكول له دور محدد ويعمل في طبقة معينة من نموذج OSI/TCP-IP.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {protocols.map((proto) => (
          <ProtocolCard key={proto.name} name={proto.name} layer={proto.layer} layerColor={proto.layerColor}>
            {proto.content}
          </ProtocolCard>
        ))}
      </div>
    </div>
  );
};

export default ProtocolsSection;
