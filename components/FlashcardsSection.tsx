import React, { useState, useEffect } from 'react';

// Data for flashcards
const flashcardData = {
  'Port Numbers': [
    { front: 'FTP (Control)', back: '21' },
    { front: 'SSH', back: '22' },
    { front: 'Telnet', back: '23' },
    { front: 'SMTP', back: '25' },
    { front: 'DNS', back: '53' },
    { front: 'DHCP (Server)', back: '67' },
    { front: 'DHCP (Client)', back: '68' },
    { front: 'HTTP', back: '80' },
    { front: 'POP3', back: '110' },
    { front: 'IMAP', back: '143' },
    { front: 'HTTPS', back: '443' },
  ],
  'Administrative Distance': [
    { front: 'Connected', back: '0' },
    { front: 'Static Route', back: '1' },
    { front: 'EIGRP (Summary)', back: '5' },
    { front: 'External BGP', back: '20' },
    { front: 'EIGRP (Internal)', back: '90' },
    { front: 'OSPF', back: '110' },
    { front: 'IS-IS', back: '115' },
    { front: 'RIP', back: '120' },
    { front: 'EIGRP (External)', back: '170' },
    { front: 'Internal BGP', back: '200' },
  ],
  'Acronyms': [
    { front: 'VLAN', back: 'Virtual Local Area Network' },
    { front: 'STP', back: 'Spanning Tree Protocol' },
    { front: 'OSPF', back: 'Open Shortest Path First' },
    { front: 'EIGRP', back: 'Enhanced Interior Gateway Routing Protocol' },
    { front: 'NAT', back: 'Network Address Translation' },
    { front: 'PAT', back: 'Port Address Translation' },
    { front: 'ACL', back: 'Access Control List' },
    { front: 'VPN', back: 'Virtual Private Network' },
    { front: 'DHCP', back: 'Dynamic Host Configuration Protocol' },
    { front: 'DNS', back: 'Domain Name System' },
  ],
};

type Category = keyof typeof flashcardData;

const FlashcardsSection: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>('Port Numbers');
  const [cards, setCards] = useState(flashcardData[currentCategory]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // When category changes, shuffle cards and reset state
    const newCards = [...flashcardData[currentCategory]].sort(() => Math.random() - 0.5);
    setCards(newCards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [currentCategory]);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentCard = cards[currentIndex];
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">بطاقات المراجعة السريعة</h2>
      
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {(Object.keys(flashcardData) as Category[]).map(category => (
          <button
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`py-2 px-5 font-semibold rounded-lg transition-colors duration-300 ${
              currentCategory === category
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category === 'Port Numbers' ? 'أرقام المنافذ' : category === 'Administrative Distance' ? 'المسافة الإدارية' : 'الاختصارات'}
          </button>
        ))}
      </div>
      
      <div className="w-full max-w-lg mx-auto h-64" style={{ perspective: '1000px' }}>
        <div 
          className="relative w-full h-full cursor-pointer"
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front Face */}
          <div className="absolute w-full h-full bg-gray-700 border border-gray-600 rounded-xl flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: 'hidden' }}>
            <p className="text-3xl font-bold text-white">{currentCard?.front}</p>
          </div>
          {/* Back Face */}
          <div className="absolute w-full h-full bg-cyan-800 border border-cyan-600 rounded-xl flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <p className="text-4xl font-bold text-white font-mono">{currentCard?.back}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-gray-400 font-semibold">{currentIndex + 1} / {cards.length}</p>
        <div className="flex justify-center items-center gap-4">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-800 disabled:text-gray-500">
            السابق
          </button>
          <button onClick={handleShuffle} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            خلط
          </button>
          <button onClick={handleNext} disabled={currentIndex === cards.length - 1} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-800 disabled:text-gray-500">
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsSection;