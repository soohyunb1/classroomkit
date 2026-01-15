
import React, { useState } from 'react';
import { Home, QrCode, UserPlus, Timer, Dice5, ChevronLeft } from 'lucide-react';
import QRGenerator from './components/QRGenerator';
import RandomPicker from './components/RandomPicker';
import Stopwatch from './components/Stopwatch';
import DiceRoller from './components/DiceRoller';

type AppMode = 'HOME' | 'QR' | 'PICKER' | 'TIMER' | 'DICE';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('HOME');

  const renderContent = () => {
    switch (mode) {
      case 'QR':
        return <QRGenerator onBack={() => setMode('HOME')} />;
      case 'PICKER':
        return <RandomPicker onBack={() => setMode('HOME')} />;
      case 'TIMER':
        return <Stopwatch onBack={() => setMode('HOME')} />;
      case 'DICE':
        return <DiceRoller onBack={() => setMode('HOME')} />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-indigo-700 mb-2">🏫 교실 도우미</h1>
              <p className="text-slate-500">선생님과 학생들을 위한 올인원 교실 도구함</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToolCard
                title="QR 생성기"
                description="URL을 넣으면 즉석에서 QR 코드를 생성합니다."
                icon={<QrCode className="w-8 h-8" />}
                color="bg-blue-500"
                onClick={() => setMode('QR')}
              />
              <ToolCard
                title="랜덤 이름 뽑기"
                description="명단을 입력하고 무작위로 학생을 뽑습니다."
                icon={<UserPlus className="w-8 h-8" />}
                color="bg-emerald-500"
                onClick={() => setMode('PICKER')}
              />
              <ToolCard
                title="타이머 & 스탑워치"
                description="활동 시간을 설정하고 알림을 받습니다."
                icon={<Timer className="w-8 h-8" />}
                color="bg-orange-500"
                onClick={() => setMode('TIMER')}
              />
              <ToolCard
                title="주사위 굴리기"
                description="무작위 숫자가 필요한 게임이나 활동에 사용하세요."
                icon={<Dice5 className="w-8 h-8" />}
                color="bg-purple-500"
                onClick={() => setMode('DICE')}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <main className="py-10">
        {renderContent()}
      </main>
    </div>
  );
};

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, color, onClick }) => (
  <button
    onClick={onClick}
    className="group flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-200 transition-all text-left"
  >
    <div className={`${color} p-4 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </button>
);

export default App;
