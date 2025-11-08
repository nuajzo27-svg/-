import React, { useState } from 'react';
import { AppSection } from './types';
import NavTabs from './components/NavTabs';
import LearnSection from './components/LearnSection';
import PracticeSection from './components/PracticeSection';
import TricksSection from './components/TricksSection';
import ProtocolsSection from './components/ProtocolsSection';
import IPv6Section from './components/IPv6Section';
import CommandsSection from './components/CommandsSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Learn);

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.Practice:
        return <PracticeSection />;
      case AppSection.Tricks:
        return <TricksSection />;
      case AppSection.Protocols:
        return <ProtocolsSection />;
      case AppSection.IPv6:
        return <IPv6Section />;
      case AppSection.Commands:
        return <CommandsSection />;
      case AppSection.Learn:
      default:
        return <LearnSection />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-cyan-400 text-center">مدرب الشبكات الاحترافي</h1>
          <p className="text-center text-gray-400 mt-1">أتقن تقسيم الشبكات، البروتوكولات، والأوامر الأساسية بسهولة</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <NavTabs activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="mt-8 bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700">
          {renderSection()}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>تم التطوير بواسطة مهندس واجهات أمامية خبير.</p>
      </footer>
    </div>
  );
};

export default App;