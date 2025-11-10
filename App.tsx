import React, { useState, useEffect } from 'react';
import { AppSection, SearchResult } from './types';
import NavTabs from './components/NavTabs';
import LearnSection from './components/LearnSection';
import PracticeSection from './components/PracticeSection';
import TricksSection from './components/TricksSection';
import ProtocolsSection from './components/ProtocolsSection';
import IPv6Section from './components/IPv6Section';
import CommandsSection from './components/CommandsSection';
import CCNA1SummarySection from './components/CCNA1SummarySection';
import CCNA2SummarySection from './components/CCNA2SummarySection';
import CCNA3SummarySection from './components/CCNA3SummarySection';
import MiniCliSimulatorSection from './components/MiniCliSimulatorSection';
import OsiVisualizerSection from './components/OsiVisualizerSection';
import FlashcardsSection from './components/FlashcardsSection';
import { getSearchableData } from './services/searchData';

const searchableData = getSearchableData();

const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="bg-yellow-400 text-gray-900 font-bold px-1 rounded-sm">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Learn);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        const lowerCaseQuery = searchQuery.toLowerCase().trim();
        const results: SearchResult[] = [];
        
        searchableData.forEach(item => {
          const contentIndex = item.content.toLowerCase().indexOf(lowerCaseQuery);
          const titleIndex = item.title.toLowerCase().indexOf(lowerCaseQuery);

          if (contentIndex !== -1 || titleIndex !== -1) {
            const index = contentIndex !== -1 ? contentIndex : titleIndex;
            const start = Math.max(0, index - 50);
            const end = Math.min(item.content.length, index + 150);
            let snippet = item.content.substring(start, end);
            if (start > 0) snippet = "..." + snippet;
            if (end < item.content.length) snippet = snippet + "...";
            
            results.push({ item, snippet });
          }
        });
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  
  const navigateToSection = (section: AppSection) => {
    setActiveSection(section);
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.Practice: return <PracticeSection />;
      case AppSection.Tricks: return <TricksSection />;
      case AppSection.Protocols: return <ProtocolsSection />;
      case AppSection.IPv6: return <IPv6Section />;
      case AppSection.Commands: return <CommandsSection />;
      case AppSection.CCNA_SUMMARY: return <CCNA1SummarySection />;
      case AppSection.CCNA2_SUMMARY: return <CCNA2SummarySection />;
      case AppSection.CCNA3_SUMMARY: return <CCNA3SummarySection />;
      case AppSection.MINI_CLI_SIMULATOR: return <MiniCliSimulatorSection />;
      case AppSection.OSI_VISUALIZER: return <OsiVisualizerSection />;
      case AppSection.FLASHCARDS: return <FlashcardsSection />;
      case AppSection.Learn: default: return <LearnSection />;
    }
  };

  const hasSearchResults = searchQuery.trim().length > 1;

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <header className="bg-gray-800 shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-cyan-400 text-center">مدرب الشبكات الاحترافي</h1>
          <p className="text-center text-gray-400 mt-1 text-sm sm:text-base">أتقن تقسيم الشبكات، البروتوكولات، والأوامر الأساسية بسهولة</p>
          
          <div className="relative mt-4 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="ابحث عن OSPF, VLAN, ACL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:border-cyan-500 focus:ring-cyan-500/50"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {!hasSearchResults && <NavTabs activeSection={activeSection} setActiveSection={navigateToSection} />}
        
        <div className={`mt-8 ${!hasSearchResults ? 'bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700' : ''}`}>
          {hasSearchResults ? (
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">نتائج البحث عن: "{searchQuery}"</h2>
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  {searchResults.map(({ item, snippet }, index) => (
                    <div key={`${item.id}-${index}`} className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cyan-900 text-cyan-200">{item.sectionLabel}</span>
                          <h3 className="text-xl font-semibold text-white mt-2">
                            <Highlight text={item.title} highlight={searchQuery} />
                          </h3>
                        </div>
                        <button 
                          onClick={() => navigateToSection(item.section)}
                          className="bg-gray-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors whitespace-nowrap"
                        >
                          الانتقال للقسم
                        </button>
                      </div>
                      <p className="mt-3 text-gray-300 leading-relaxed text-sm">
                        <Highlight text={snippet} highlight={searchQuery} />
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-10">لم يتم العثور على نتائج.</p>
              )}
            </div>
          ) : (
            renderSection()
          )}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>تم التطوير بواسطة مهندس واجهات أمامية خبير.</p>
      </footer>
    </div>
  );
};

export default App;