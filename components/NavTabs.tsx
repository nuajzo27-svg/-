import React from 'react';
import { AppSection } from '../types';

interface NavTabsProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const NavTabs: React.FC<NavTabsProps> = ({ activeSection, setActiveSection }) => {
  const tabs = [
    { id: AppSection.Learn, label: 'التعلم والشرح' },
    { id: AppSection.Practice, label: 'الاختبار والتدريب' },
    { id: AppSection.FLASHCARDS, label: 'بطاقات المراجعة' },
    { id: AppSection.MINI_CLI_SIMULATOR, label: 'محاكي الأوامر' },
    { id: AppSection.OSI_VISUALIZER, label: 'متصور التغليف' },
    { id: AppSection.Tricks, label: 'أسرار الحل السريع' },
    { id: AppSection.Protocols, label: 'شرح البروتوكولات' },
    { id: AppSection.IPv6, label: 'شرح IPv6' },
    { id: AppSection.Commands, label: 'قائمة الأوامر' },
    { id: AppSection.CCNA_SUMMARY, label: 'تلخيص CCNA 1' },
    { id: AppSection.CCNA2_SUMMARY, label: 'تلخيص CCNA 2' },
    { id: AppSection.CCNA3_SUMMARY, label: 'تلخيص CCNA 3' },
  ];

  return (
    <div className="flex justify-center border-b border-gray-700 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveSection(tab.id)}
          className={`py-4 px-5 text-base sm:text-lg font-medium transition-colors duration-300 focus:outline-none ${
            activeSection === tab.id
              ? 'border-b-2 border-cyan-400 text-cyan-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavTabs;