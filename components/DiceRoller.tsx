
import React, { useState } from 'react';
import { ChevronLeft, Dice5, Play } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const DiceRoller: React.FC<Props> = ({ onBack }) => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    // Simulate multi-roll animation effect
    let counter = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        setDiceValue(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    }, 80);
  };

  // Dice Dot Layout Component
  const renderDots = (value: number) => {
    const dots: { [key: number]: number[] } = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };

    return (
      <div className="grid grid-cols-3 gap-2 w-full h-full p-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            {dots[value].includes(i) && (
              <div className="w-4 h-4 bg-slate-800 rounded-full shadow-inner" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium">
        <ChevronLeft className="w-5 h-5 mr-1" /> 홈으로 돌아가기
      </button>

      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col items-center min-h-[500px]">
        <h2 className="text-2xl font-bold text-slate-800 mb-12 flex items-center gap-2">
          <div className="bg-purple-500 p-2 rounded-lg text-white"><Dice5 className="w-5 h-5" /></div>
          주사위 굴리기
        </h2>

        <div 
          className={`relative w-40 h-40 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1),inset_0_-8px_4px_rgba(0,0,0,0.05)] border-2 border-slate-50 transition-all duration-300 transform ${
            isRolling ? 'animate-bounce rotate-12 scale-110' : ''
          }`}
          onClick={rollDice}
        >
          {renderDots(diceValue)}
        </div>

        <div className="mt-20 space-y-4 w-full max-w-sm">
          <p className="text-slate-400 font-medium">
            {isRolling ? '주사위가 구르고 있어요!' : '주사위를 클릭하거나 아래 버튼을 누르세요'}
          </p>
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="w-full bg-purple-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-purple-700 disabled:bg-slate-200 transition-all shadow-lg shadow-purple-100 flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6 fill-white" /> 굴리기
          </button>
        </div>

        {diceValue > 0 && !isRolling && (
          <div className="mt-8 text-4xl font-black text-purple-600 animate-in slide-in-from-bottom-4 duration-500">
            {diceValue} 이(가) 나왔습니다!
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceRoller;
