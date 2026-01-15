
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Play, Pause, RotateCcw, Timer, BellRing } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const Stopwatch: React.FC<Props> = ({ onBack }) => {
  const [secondsLeft, setSecondsLeft] = useState(60); // Default 1 min
  const [isActive, setIsActive] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(60);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      playAlarm();
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const playAlarm = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
    
    // Play a sequence
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2); gain2.connect(ctx.destination);
      osc2.type = 'sine'; osc2.frequency.setValueAtTime(554.37, ctx.currentTime); // C#5
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc2.start(); osc2.stop(ctx.currentTime + 1.5);
    }, 500);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setTimer = (mins: number) => {
    setIsActive(false);
    const s = mins * 60;
    setSecondsLeft(s);
    setInitialSeconds(s);
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(initialSeconds);
  };

  const progress = ((initialSeconds - secondsLeft) / initialSeconds) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium">
        <ChevronLeft className="w-5 h-5 mr-1" /> 홈으로 돌아가기
      </button>

      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <div className="bg-orange-500 p-2 rounded-lg text-white"><Timer className="w-5 h-5" /></div>
          집중 타이머
        </h2>

        <div className="relative w-72 h-72 flex items-center justify-center mb-10">
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="144" cy="144" r="130"
              className="stroke-slate-100 fill-none"
              strokeWidth="12"
            />
            <circle
              cx="144" cy="144" r="130"
              className="stroke-orange-500 fill-none transition-all duration-1000 ease-linear"
              strokeWidth="12"
              strokeDasharray={816.8}
              strokeDashoffset={816.8 - (816.8 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center">
            <div className="text-7xl font-mono font-black text-slate-800 tracking-tighter">
              {formatTime(secondsLeft)}
            </div>
            <p className="text-slate-400 mt-2 font-semibold">MIN : SEC</p>
          </div>
        </div>

        <div className="flex gap-4 mb-10">
          <button
            onClick={toggleTimer}
            className={`w-20 h-20 flex items-center justify-center rounded-full transition-all shadow-lg ${
              isActive ? 'bg-slate-100 text-slate-600' : 'bg-orange-500 text-white shadow-orange-200'
            }`}
          >
            {isActive ? <Pause className="w-8 h-8" fill="currentColor" /> : <Play className="w-8 h-8 ml-1" fill="currentColor" />}
          </button>
          <button
            onClick={resetTimer}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 w-full">
          {[1, 5, 10, 20, 30, 40, 50, 60].map((m) => (
            <button
              key={m}
              onClick={() => setTimer(m)}
              className={`py-3 rounded-xl font-bold transition-all border ${
                initialSeconds === m * 60
                  ? 'bg-orange-50 border-orange-200 text-orange-600'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-orange-200 hover:text-orange-400'
              }`}
            >
              {m}분
            </button>
          ))}
        </div>
        
        {secondsLeft === 0 && !isActive && (
          <div className="mt-8 p-4 bg-orange-50 text-orange-600 rounded-2xl flex items-center gap-3 animate-bounce">
            <BellRing className="w-6 h-6" />
            <span className="font-bold">시간이 종료되었습니다!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
