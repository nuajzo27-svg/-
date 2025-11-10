import React, { useState, useEffect, useRef } from 'react';

// Define types for clarity
type CliMode = 'user' | 'privileged' | 'global' | 'interface' | 'line';

interface CommandStep {
  command: string | string[]; // The exact command(s) to match
  nextMode: CliMode;
  nextPrompt: (hostname: string) => string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  steps: CommandStep[];
}

// --- All Scenarios (Tasks) Data ---
const allTasks: Task[] = [
  {
    id: 1,
    title: "المهمة 1: الإعدادات الأولية وتغيير الاسم",
    description: "ابدأ بالدخول إلى وضع التكوين العام، ثم قم بتغيير اسم الموجه الافتراضي 'Router' إلى 'R1'.",
    steps: [
      { command: 'enable', nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
      { command: ['configure terminal', 'conf t'], nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#` },
      { command: 'hostname R1', nextMode: 'global', nextPrompt: () => 'R1(config)#' },
    ]
  },
  {
    id: 2,
    title: "المهمة 2: تأمين الجهاز",
    description: "الآن، قم بتأمين الجهاز بكلمة سر مشفرة لوضع الامتيازات (enable secret)، ثم قم بتأمين خطوط console و vty بكلمة مرور.",
    steps: [
      { command: 'enable secret class', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
      { command: 'line console 0', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'password cisco', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'login', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
      { command: 'line vty 0 4', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'password cisco', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'login', nextMode: 'line', nextPrompt: (hostname) => `${hostname}(config-line)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
    ]
  },
  {
    id: 3,
    title: "المهمة 3: إعداد وتفعيل واجهة",
    description: "قم بإعداد الواجهة GigabitEthernet0/0 بعنوان IP '192.168.1.1 255.255.255.0' ثم قم بتفعيلها.",
    steps: [
      { command: ['interface GigabitEthernet0/0', 'int g0/0'], nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'ip address 192.168.1.1 255.255.255.0', nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'no shutdown', nextMode: 'interface', nextPrompt: (hostname) => `${hostname}(config-if)#'` },
      { command: 'exit', nextMode: 'global', nextPrompt: (hostname) => `${hostname}(config)#'` },
    ]
  },
  {
    id: 4,
    title: "المهمة 4: حفظ الإعدادات",
    description: "أخيرًا، اخرج إلى وضع الامتيازات واحفظ الإعدادات الحالية في ذاكرة NVRAM.",
    steps: [
      { command: ['end', 'exit'], nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
      { command: ['copy running-config startup-config', 'copy run start', 'wr'], nextMode: 'privileged', nextPrompt: (hostname) => `${hostname}#` },
    ]
  },
];


const MiniCliSimulatorSection: React.FC = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [command, setCommand] = useState('');
  const [currentMode, setCurrentMode] = useState<CliMode>('user');
  const [currentPrompt, setCurrentPrompt] = useState('Router>');
  const [hostname, setHostname] = useState('Router');
  const [feedback, setFeedback] = useState({ message: '', type: 'info' });
  const [inputStatus, setInputStatus] = useState<'default' | 'correct' | 'incorrect'>('default');


  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (currentTaskIndex >= allTasks.length) return;
      const typedCommand = command.trim().toLowerCase();
      if (!typedCommand) return;
      const expectedStep = allTasks[currentTaskIndex].steps[currentStepIndex];
      const expectedCommands = Array.isArray(expectedStep.command) ? expectedStep.command : [expectedStep.command];
      const match = expectedCommands.find(cmd => cmd.toLowerCase().startsWith(typedCommand));
      if (match) {
        setCommand(match);
      }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
            const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex]);
        } else {
            setHistoryIndex(-1); // Go to the "new command" line
            setCommand('');
        }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCommand = command.trim();
    
    if (!trimmedCommand) {
      setHistory(prev => [...prev, `${currentPrompt}`]);
      setCommand('');
      return;
    }

    const newHistory = [...history, `${currentPrompt} ${command}`];
    const newCommandHistory = [...commandHistory, trimmedCommand];
    setCommandHistory(newCommandHistory);
    setHistoryIndex(-1); // Reset for next arrow key usage
    
    // --- Check for completion first ---
    if (currentTaskIndex >= allTasks.length) {
      setHistory([...newHistory, '% تهانينا! لقد أكملت جميع السيناريوهات.']);
      setCommand('');
      return;
    }
    
    const currentTask = allTasks[currentTaskIndex];
    const expectedStep = currentTask.steps[currentStepIndex];
    const expectedCommands = Array.isArray(expectedStep.command) ? expectedStep.command.map(c => c.toLowerCase()) : [expectedStep.command.toLowerCase()];
    
    if (expectedCommands.includes(trimmedCommand.toLowerCase())) {
      // Correct command
      setInputStatus('correct');
      let newHostname = hostname;
      const isHostnameChange = trimmedCommand.toLowerCase().startsWith('hostname ');
      if (isHostnameChange) {
        newHostname = trimmedCommand.split(' ')[1].toUpperCase();
        setHostname(newHostname);
      }

      const newStepIndex = currentStepIndex + 1;
      let newHistoryWithOutput = [...newHistory];

      if (trimmedCommand.toLowerCase() === 'no shutdown') {
        newHistoryWithOutput.push('%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up', '%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up');
      }
      
      // Check if task is complete
      if (newStepIndex >= currentTask.steps.length) {
        const newTaskIndex = currentTaskIndex + 1;
        if (newTaskIndex >= allTasks.length) {
          setHistory([...newHistoryWithOutput, '\n% جميع المهام اكتملت بنجاح!']);
          setFeedback({ message: 'رائع! لقد أكملت جميع السيناريوهات بنجاح.', type: 'success' });
          setCurrentTaskIndex(newTaskIndex);
        } else {
          setHistory([...newHistoryWithOutput, `\n% المهمة "${currentTask.title}" اكتملت. الانتقال للمهمة التالية...`]);
          setFeedback({ message: 'مهمة مكتملة!', type: 'success' });
          setCurrentTaskIndex(newTaskIndex);
          setCurrentStepIndex(0);
        }
      } else {
         setCurrentStepIndex(newStepIndex);
      }
      
      setHistory(newHistoryWithOutput);
      setCurrentMode(expectedStep.nextMode);
      setCurrentPrompt(expectedStep.nextPrompt(newHostname));

    } else {
      // Incorrect command
      setInputStatus('incorrect');
      setHistory([...newHistory, '% Invalid input detected at \'^\' marker.']);
    }

    setCommand('');
    setTimeout(() => setInputStatus('default'), 500);
  };

  const currentTask = allTasks[currentTaskIndex];
  const statusClasses = {
    default: 'border-transparent',
    correct: 'border-green-500 bg-green-500/10',
    incorrect: 'border-red-500 bg-red-500/10',
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">محاكي سطر الأوامر (CLI)</h2>
      
      {currentTask ? (
        <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-cyan-500/30">
          <h3 className="text-2xl font-semibold text-white mb-3">{currentTask.title}</h3>
          <p className="text-gray-300">{currentTask.description}</p>
        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-green-500/30 text-center">
            <h3 className="text-2xl font-semibold text-green-300">لقد أكملت جميع المهام بنجاح!</h3>
        </div>
      )}

      <div 
        className="bg-black text-white font-mono text-base p-4 rounded-lg h-80 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div ref={terminalEndRef} />
      </div>
      
      <form onSubmit={handleCommandSubmit} className="mt-4">
        <div className={`flex items-center bg-black p-2 rounded-lg border ${statusClasses[inputStatus]} transition-all duration-200`}>
          <span className="text-green-400 pl-2">{currentPrompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent text-white font-mono border-none focus:outline-none focus:ring-0 pl-2"
            autoComplete="off"
            spellCheck="false"
            disabled={currentTaskIndex >= allTasks.length}
          />
        </div>
      </form>
      
      {feedback.message && currentTaskIndex > 0 && (
        <div className={`mt-4 p-3 rounded-lg text-center font-bold ${
            feedback.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
        }`}>
            {feedback.message}
        </div>
      )}
    </div>
  );
};

export default MiniCliSimulatorSection;