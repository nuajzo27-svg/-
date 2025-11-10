import React, { useState, useMemo } from 'react';

// --- Helper Component for Interactive Headers ---
const HeaderTooltip: React.FC<{ title: string; color: string; details: { [key: string]: string } }> = ({ title, color, details }) => (
    <div className="relative group">
        <div className={`text-white p-4 text-center ${color}`}>
            <div className="font-bold text-lg">{title}</div>
        </div>
        <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 w-max bg-gray-950 text-white text-xs rounded-md p-3 shadow-lg border border-gray-600 z-10 transition-opacity duration-300">
            <div className="font-bold text-cyan-400 text-sm mb-2">{title} Details</div>
            {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                    <span className="text-gray-400 mr-4">{key}:</span>
                    <span className="font-mono text-yellow-300">{value}</span>
                </div>
            ))}
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-950 transform rotate-45 border-b border-r border-gray-600"></div>
        </div>
    </div>
);

// --- Data for each step ---
const steps = [
  // Encapsulation Phase
  {
    phase: 'Encapsulation',
    layer: "7. طبقة التطبيقات",
    osiLayerNum: 7,
    pdu: "Data (بيانات)",
    description: "تبدأ الرحلة هنا. تقوم طبقة التطبيقات (مثل متصفح الويب) بإعداد بياناتك الأولية للإرسال عبر الشبكة.",
    visual: (data: string) => (
      <div className="bg-green-500 text-white p-4 rounded-md text-center shadow-lg transform transition-all duration-500">
        <div className="font-bold text-lg">Data</div>
        <div className="font-mono break-all text-sm mt-1">"{data}"</div>
      </div>
    ),
  },
  {
    phase: 'Encapsulation',
    layer: "4. طبقة النقل",
    osiLayerNum: 4,
    pdu: "Segment (قطعة)",
    description: "تتم إضافة ترويسة TCP. مرر الفأرة فوق الترويسة لرؤية أرقام المنافذ التي تحدد التطبيق المرسل (عشوائي) والمستقبل (e.g., 443 for HTTPS).",
    visual: (data: string, netData: any) => (
      <div className="flex shadow-lg transform transition-all duration-500 rounded-md overflow-hidden">
        <HeaderTooltip title="TCP Hdr" color="bg-orange-500" details={{ "Source Port": netData.srcPort, "Dest Port": netData.dstPort }} />
        <div className="bg-green-500 text-white p-4 text-center flex-grow">
          <div className="font-bold text-lg">Data</div>
        </div>
      </div>
    ),
  },
  {
    phase: 'Encapsulation',
    layer: "3. طبقة الشبكة",
    osiLayerNum: 3,
    pdu: "Packet (حزمة)",
    description: "تتم إضافة ترويسة IP. مرر الفأرة فوقها لرؤية العناوين المنطقية: عنوان IP المصدر (جهازك) وعنوان IP الوجهة (الخادم).",
    visual: (data: string, netData: any) => (
      <div className="flex shadow-lg transform transition-all duration-500 rounded-md overflow-hidden">
        <HeaderTooltip title="IP Hdr" color="bg-blue-500" details={{ "Source IP": netData.srcIp, "Dest IP": netData.dstIp }} />
        <HeaderTooltip title="TCP Hdr" color="bg-orange-500" details={{ "Source Port": netData.srcPort, "Dest Port": netData.dstPort }} />
        <div className="bg-green-500 text-white p-4 text-center flex-grow">
          <div className="font-bold text-lg">Data</div>
        </div>
      </div>
    ),
  },
  {
    phase: 'Encapsulation',
    layer: "2. طبقة ربط البيانات",
    osiLayerNum: 2,
    pdu: "Frame (إطار)",
    description: "تتم إضافة ترويسة وذيل الإيثرنت. مرر الفأرة فوق ترويسة L2 لرؤية العناوين المادية (MAC) للمصدر والقفزة التالية (الراوتر).",
    visual: (data: string, netData: any) => (
      <div className="flex shadow-lg transform transition-all duration-500 rounded-md overflow-hidden">
        <HeaderTooltip title="L2 Hdr" color="bg-purple-500" details={{ "Source MAC": netData.srcMac, "Dest MAC": netData.dstMac }} />
        <HeaderTooltip title="IP Hdr" color="bg-blue-500" details={{ "Source IP": netData.srcIp, "Dest IP": netData.dstIp }} />
        <HeaderTooltip title="TCP Hdr" color="bg-orange-500" details={{ "Source Port": netData.srcPort, "Dest Port": netData.dstPort }} />
        <div className="bg-green-500 text-white p-4 text-center flex-grow"><div className="font-bold text-lg">Data</div></div>
        <div className="bg-red-500 text-white p-4 text-center"><div className="font-bold text-lg">FCS</div></div>
      </div>
    ),
  },
  {
    phase: 'Encapsulation',
    layer: "1. الطبقة المادية",
    osiLayerNum: 1,
    pdu: "Bits (بتات)",
    description: "أخيرًا، يتم تحويل الإطار إلى إشارات كهربائية أو ضوئية (بتات: 0 و 1) ليتم إرسالها عبر وسائط الشبكة.",
    visual: () => (
      <div className="bg-gray-950 p-4 rounded-md text-center shadow-lg font-mono text-green-400 break-all text-sm animate-pulse transform transition-all duration-500">
        0110100001100101011011000110110001101111...
      </div>
    ),
  },
  // Decapsulation Phase
  {
    phase: 'Decapsulation',
    layer: "1. الطبقة المادية",
    osiLayerNum: 1,
    pdu: "Bits (بتات)",
    description: "تصل الإشارات إلى جهاز الوجهة ويتم تجميعها من الطبقة المادية وتحويلها مرة أخرى إلى إطار.",
    visual: () => (
       <div className="bg-gray-950 p-4 rounded-md text-center shadow-lg font-mono text-green-400 break-all text-sm animate-pulse transform transition-all duration-500">
        ...0110100001100101011011000110110001101111
      </div>
    ),
  },
  {
    phase: 'Decapsulation',
    layer: "2. طبقة ربط البيانات",
    osiLayerNum: 2,
    pdu: "Frame (إطار)",
    description: "تتم إزالة ترويسة وذيل الإيثرنت. يتم التحقق من عنوان MAC الوجهة وقيمة FCS. إذا كان كل شيء صحيحًا، يتم تمرير الحزمة إلى الطبقة الأعلى.",
    visual: (data: string, netData: any) => (
       <div className="flex shadow-lg transform transition-all duration-500 rounded-md overflow-hidden">
        <div className="bg-purple-500/30 text-white p-4 text-center"><div className="font-bold text-lg">L2 Hdr</div></div>
        <HeaderTooltip title="IP Hdr" color="bg-blue-500" details={{ "Source IP": netData.srcIp, "Dest IP": netData.dstIp }} />
        <HeaderTooltip title="TCP Hdr" color="bg-orange-500" details={{ "Source Port": netData.srcPort, "Dest Port": netData.dstPort }} />
        <div className="bg-green-500 text-white p-4 text-center flex-grow"><div className="font-bold text-lg">Data</div></div>
        <div className="bg-red-500/30 text-white p-4 text-center"><div className="font-bold text-lg">FCS</div></div>
      </div>
    ),
  },
  {
    phase: 'Decapsulation',
    layer: "3. طبقة الشبكة",
    osiLayerNum: 3,
    pdu: "Packet (حزمة)",
    description: "تتم إزالة ترويسة IP. يتم التحقق من عنوان IP الوجهة. يتم تمرير القطعة المتبقية إلى الطبقة الأعلى بناءً على البروتوكول المحدد في الترويسة.",
    visual: (data: string, netData: any) => (
      <div className="flex shadow-lg transform transition-all duration-500 rounded-md overflow-hidden">
        <div className="bg-blue-500/30 text-white p-4 text-center"><div className="font-bold text-lg">IP Hdr</div></div>
        <HeaderTooltip title="TCP Hdr" color="bg-orange-500" details={{ "Source Port": netData.srcPort, "Dest Port": netData.dstPort }} />
        <div className="bg-green-500 text-white p-4 text-center flex-grow"><div className="font-bold text-lg">Data</div></div>
      </div>
    ),
  },
    {
    phase: 'Decapsulation',
    layer: "4. طبقة النقل",
    osiLayerNum: 4,
    pdu: "Segment (قطعة)",
    description: "تتم إزالة ترويسة TCP. يتم استخدام رقم المنفذ الوجهة لتوجيه البيانات إلى التطبيق الصحيح (خادم الويب). يتم إعادة تجميع البيانات إذا تم تقسيمها.",
    visual: (data: string) => (
       <div className="flex shadow-lg transform transition-all duration-500 rounded-md overflow-hidden">
        <div className="bg-orange-500/30 text-white p-4 text-center"><div className="font-bold text-lg">TCP Hdr</div></div>
        <div className="bg-green-500 text-white p-4 text-center flex-grow">
          <div className="font-bold text-lg">Data</div>
          <div className="font-mono break-all text-sm mt-1 opacity-75">"{data}"</div>
        </div>
      </div>
    ),
  },
  {
    phase: 'Decapsulation',
    layer: "7. طبقة التطبيقات",
    osiLayerNum: 7,
    pdu: "Data (بيانات)",
    description: "أخيرًا، تصل البيانات الأصلية إلى التطبيق على جهاز الوجهة، جاهزة للمعالجة والعرض للمستخدم. لقد اكتملت الرحلة بنجاح!",
    visual: (data: string) => (
      <div className="bg-green-500 text-white p-4 rounded-md text-center shadow-lg transform transition-all duration-500">
        <div className="font-bold text-lg">Data</div>
        <div className="font-mono break-all text-sm mt-1">"{data}"</div>
      </div>
    ),
  },
];

const OsiLayers = [
    { num: 7, name: "Application" },
    { num: 6, name: "Presentation" },
    { num: 5, name: "Session" },
    { num: 4, name: "Transport" },
    { num: 3, name: "Network" },
    { num: 2, name: "Data Link" },
    { num: 1, name: "Physical" },
];

const OsiVisualizerSection: React.FC = () => {
  const [userData, setUserData] = useState('مرحباً');
  const [currentStep, setCurrentStep] = useState(0);

  const networkData = useMemo(() => ({
    srcIp: '192.168.1.101',
    dstIp: '203.0.113.55',
    srcMac: 'AA:BB:CC:11:22:33',
    dstMac: 'DD:EE:FF:44:55:66',
    srcPort: '49152',
    dstPort: '443',
  }), []);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const handleReset = () => setCurrentStep(0);

  const stepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const currentPhase = stepData.phase;
  const activeOsiLayer = stepData.osiLayerNum;

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-2 text-center">متصور التغليف التفاعلي</h2>
      <p className="text-gray-400 mb-8 text-center max-w-3xl mx-auto">
        أدخل رسالة، ثم مرر الفأرة فوق الترويسات لاستكشاف التفاصيل أثناء رحلة البيانات الكاملة.
      </p>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          value={userData}
          onChange={(e) => setUserData(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono focus:ring-2 focus:border-cyan-500 focus:ring-cyan-500/50"
          aria-label="أدخل رسالتك هنا"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* OSI Model Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-900 rounded-xl border border-gray-700 p-4">
            <h3 className="text-lg font-bold text-white text-center mb-4">نموذج OSI</h3>
            <div className="space-y-2">
                {OsiLayers.map(layer => (
                    <div key={layer.num} className={`p-3 rounded-md text-center font-semibold transition-all duration-300 ${activeOsiLayer === layer.num ? 'bg-cyan-500 text-gray-900 scale-105' : 'bg-gray-800 text-gray-300'}`}>
                        {layer.num}. {layer.name}
                    </div>
                ))}
            </div>
        </div>

        {/* Main Visualizer Content */}
        <div className="w-full md:w-3/4 bg-gray-900 rounded-xl border border-gray-700 p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-semibold text-white">
                {currentPhase === 'Encapsulation' ? 'المرحلة 1: التغليف' : 'المرحلة 2: فك التغليف'}
              </h3>
              <span className="text-lg font-bold text-gray-400">{currentStep + 1} / {steps.length}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold text-white">{stepData.layer}</h4>
            <p className="text-md text-yellow-400 font-mono">PDU: {stepData.pdu}</p>
          </div>

          <div className="min-h-[120px] flex items-center justify-center my-6 transition-all duration-500 ease-in-out" style={{ direction: 'ltr' }}>
            {stepData.visual(userData, networkData)}
          </div>

          <p className="text-gray-300 text-center leading-relaxed mt-6 max-w-2xl mx-auto bg-gray-950 p-4 rounded-md">{stepData.description}</p>
        
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={handlePrev} disabled={currentStep === 0} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed">السابق</button>
            <button onClick={handleNext} disabled={currentStep === steps.length - 1} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed">التالي</button>
            <button onClick={handleReset} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">إعادة</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OsiVisualizerSection;
