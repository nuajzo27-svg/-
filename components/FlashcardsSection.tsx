import React, { useState, useEffect } from 'react';

// Data for flashcards
const predefinedFlashcardData = {
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

type PredefinedCategory = keyof typeof predefinedFlashcardData;
type Category = PredefinedCategory | 'My Cards';
type Card = { front: string; back: string };

const FlashcardsSection: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>('Port Numbers');
  const [cards, setCards] = useState<Card[]>(predefinedFlashcardData['Port Numbers']);
  const [customCards, setCustomCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState<Card>({ front: '', back: '' });

  // Load custom cards from localStorage on initial render
  useEffect(() => {
    try {
      const savedCards = localStorage.getItem('customFlashcards');
      if (savedCards) {
        setCustomCards(JSON.parse(savedCards));
      }
    } catch (error) {
      console.error("Failed to load custom cards from localStorage", error);
    }
  }, []);

  // Save custom cards to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('customFlashcards', JSON.stringify(customCards));
    } catch (error) {
      console.error("Failed to save custom cards to localStorage", error);
    }
  }, [customCards]);

  useEffect(() => {
    let newCards: Card[] = [];
    if (currentCategory === 'My Cards') {
      newCards = [...customCards];
    } else {
      newCards = [...predefinedFlashcardData[currentCategory as PredefinedCategory]];
    }
    setCards(newCards.length > 0 ? newCards.sort(() => Math.random() - 0.5) : []);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowAddForm(false);
  }, [currentCategory, customCards]);

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

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.front.trim() && newCard.back.trim()) {
      setCustomCards(prev => [...prev, newCard]);
      setNewCard({ front: '', back: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteCard = (indexToDelete: number) => {
    setCustomCards(prev => prev.filter((_, i) => i !== indexToDelete));
  };
  
  const currentCard = cards[currentIndex];
  
  const categories: Category[] = [...(Object.keys(predefinedFlashcardData) as PredefinedCategory[]), 'My Cards'];

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">بطاقات المراجعة السريعة</h2>
      
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`py-2 px-5 font-semibold rounded-lg transition-colors duration-300 ${
              currentCategory === category
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category === 'Port Numbers' ? 'أرقام المنافذ' : category === 'Administrative Distance' ? 'المسافة الإدارية' : category === 'Acronyms' ? 'الاختصارات' : 'بطاقاتي الخاصة'}
          </button>
        ))}
      </div>

      {currentCategory === 'My Cards' && !showAddForm && (
        <div className="text-center mb-6">
          <button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            + إضافة بطاقة جديدة
          </button>
        </div>
      )}

      {showAddForm && (
        <form onSubmit={handleAddCard} className="max-w-lg mx-auto mb-8 bg-gray-900 p-4 rounded-lg space-y-4">
          <input type="text" placeholder="محتوى الوجه الأمامي" value={newCard.front} onChange={e => setNewCard({...newCard, front: e.target.value})} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white" required />
          <input type="text" placeholder="محتوى الوجه الخلفي" value={newCard.back} onChange={e => setNewCard({...newCard, back: e.target.value})} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white" required />
          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md">حفظ البطاقة</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">إلغاء</button>
          </div>
        </form>
      )}
      
      {cards.length > 0 ? (
        <>
          <div className="w-full max-w-lg mx-auto h-64" style={{ perspective: '1000px' }}>
            <div 
              className="relative w-full h-full cursor-pointer"
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front Face */}
              <div className="absolute w-full h-full bg-gray-700 border border-gray-600 rounded-xl flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: 'hidden' }}>
                <p className="text-3xl font-bold text-white">{currentCard?.front}</p>
                 {currentCategory === 'My Cards' && !isFlipped && (
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteCard(currentIndex); }} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">X</button>
                )}
              </div>
              {/* Back Face */}
              <div className="absolute w-full h-full bg-cyan-800 border border-cyan-600 rounded-xl flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <p className="text-4xl font-bold text-white font-mono">{currentCard?.back}</p>
                 {currentCategory === 'My Cards' && (
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteCard(currentIndex); }} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{transform: 'scaleX(-1)'}}>X</button>
                )}
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
        </>
      ) : (
        <div className="text-center text-gray-400 p-10 bg-gray-800 rounded-lg">
          <p>لا توجد بطاقات في هذه الفئة بعد.</p>
          {currentCategory === 'My Cards' && <p className="mt-2">انقر على "إضافة بطاقة جديدة" للبدء!</p>}
        </div>
      )}
    </div>
  );
};

export default FlashcardsSection;