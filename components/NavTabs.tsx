import React, { useState, useEffect, useRef } from 'react';
import { AppSection } from '../types';

interface NavTabsProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const dropdownGroups = [
  {
    key: 'fundamentals',
    label: 'الأساسيات',
    items: [
      { id: AppSection.Learn, label: 'التعلم والشرح' },
      { id: AppSection.Tricks, label: 'أسرار الحل السريع' },
    ],
  },
  {
    key: 'interactive',
    label: 'التدريب التفاعلي',
    items: [
      { id: AppSection.Practice, label: 'الاختبار والتدريب' },
      { id: AppSection.FLASHCARDS, label: 'بطاقات المراجعة' },
      { id: AppSection.MINI_CLI_SIMULATOR, label: 'محاكي الأوامر' },
      { id: AppSection.OSI_VISUALIZER, label: 'متصور التغليف' },
    ],
  },
  {
    key: 'summaries',
    label: 'ملخصات CCNA',
    items: [
      { id: AppSection.CCNA_SUMMARY, label: 'تلخيص CCNA 1' },
      { id: AppSection.CCNA2_SUMMARY, label: 'تلخيص CCNA 2' },
      { id: AppSection.CCNA3_SUMMARY, label: 'تلخيص CCNA 3' },
    ],
  },
  {
    key: 'references',
    label: 'المراجع',
    items: [
      { id: AppSection.Protocols, label: 'شرح البروتوكولات' },
      { id: AppSection.IPv6, label: 'شرح IPv6' },
      { id: AppSection.Commands, label: 'قائمة الأوامر' },
    ],
  },
];

// Helper to find which group an active section belongs to
const sectionToGroupMap = new Map<AppSection, string>();
dropdownGroups.forEach(group => {
  group.items.forEach(item => {
    sectionToGroupMap.set(item.id, group.key);
  });
});


const NavTabs: React.FC<NavTabsProps> = ({ activeSection, setActiveSection }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const activeGroup = sectionToGroupMap.get(activeSection);

  const handleToggle = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleSelect = (section: AppSection) => {
    setActiveSection(section);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={navRef} className="flex justify-center border-b border-gray-700 flex-wrap relative">
      {dropdownGroups.map((group) => (
        <div key={group.key} className="relative">
          <button
            onClick={() => handleToggle(group.key)}
            className={`py-4 px-5 text-base sm:text-lg font-medium transition-colors duration-300 focus:outline-none flex items-center gap-2 ${
              activeGroup === group.key
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {group.label}
            <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === group.key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {openDropdown === group.key && (
            <div className="absolute top-full mt-1 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-64 z-30 animate-fade-in-down">
              <ul className="py-2">
                {group.items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSelect(item.id)}
                      className={`w-full text-right px-4 py-2 text-sm transition-colors duration-200 ${
                        activeSection === item.id ? 'bg-cyan-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NavTabs;
