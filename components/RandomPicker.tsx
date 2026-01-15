
import React, { useState, useEffect } from 'react';
import { ChevronLeft, UserPlus, RefreshCcw, UserCheck, Trash2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const RandomPicker: React.FC<Props> = ({ onBack }) => {
  const [inputText, setInputText] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [remainingNames, setRemainingNames] = useState<string[]>([]);
  const [pickedNames, setPickedNames] = useState<string[]>([]);
  const [currentPicked, setCurrentPicked] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const setupNames = () => {
    const list = inputText
      .split('\n')
      .map(n => n.trim())
      .filter(n => n.length > 0);
    setNames(list);
    setRemainingNames(list);
    setPickedNames([]);
    setCurrentPicked(null);
  };

  const pickRandom = () => {
    if (remainingNames.length === 0) return;

    setIsPicking(true);
    let count = 0;
    const interval = setInterval(() => {
      const tempIdx = Math.floor(Math.random() * remainingNames.length);
      setCurrentPicked(remainingNames[tempIdx]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        finalizePick();
      }
    }, 60);
  };

  const finalizePick = () => {
    const randomIndex = Math.floor(Math.random() * remainingNames.length);
    const picked = remainingNames[randomIndex];
    
    setCurrentPicked(picked);
    setRemainingNames(prev => prev.filter((_, i) => i !== randomIndex));
    setPickedNames(prev => [picked, ...prev]);
    setIsPicking(false);
  };

  const resetSession = () => {
    setRemainingNames(names);
    setPickedNames([]);
    setCurrentPicked(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium">
        <ChevronLeft className="w-5 h-5 mr-1" /> 홈으로 돌아가기
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-500" /> 명단 입력
            </h3>
            <textarea
              className="w-full h-64 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm leading-relaxed"
              placeholder="엑셀에서 명단을 복사해서 여기에 붙여넣으세요. (한 줄에 한 명)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={setupNames}
              className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              목록 적용하기
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">랜덤 뽑기</h2>
              <div className="text-sm font-medium text-slate-500">
                남은 인원: <span className="text-emerald-600 font-bold">{remainingNames.length}</span> / {names.length}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              {currentPicked ? (
                <div className={`text-center transition-all duration-300 ${isPicking ? 'scale-110' : 'scale-100'}`}>
                  <p className="text-slate-400 text-lg mb-2">{isPicking ? '두구두구...' : '당첨자!'}</p>
                  <h1 className="text-6xl md:text-8xl font-black text-emerald-600 tracking-tight">
                    {currentPicked}
                  </h1>
                </div>
              ) : (
                <div className="text-slate-300 text-center">
                  <UserCheck className="w-20 h-20 mx-auto mb-4 opacity-20" />
                  <p className="text-xl">준비가 되면 뽑기 버튼을 누르세요</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                disabled={remainingNames.length === 0 || isPicking}
                onClick={pickRandom}
                className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-emerald-700 disabled:bg-slate-200 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-100"
              >
                {remainingNames.length === 0 ? '전원 선발 완료' : '지금 뽑기!'}
              </button>
              <button
                onClick={resetSession}
                className="p-5 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-emerald-600 transition-colors"
                title="다시 뽑기"
              >
                <RefreshCcw className="w-6 h-6" />
              </button>
            </div>
          </div>

          {pickedNames.length > 0 && (
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="font-bold text-slate-500 mb-4 flex items-center gap-2">선발된 명단 (최근 순)</h3>
              <div className="flex flex-wrap gap-2">
                {pickedNames.map((name, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomPicker;
