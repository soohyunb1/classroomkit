
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { ChevronLeft, Download, RefreshCw } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const QRGenerator: React.FC<Props> = ({ onBack }) => {
  const [url, setUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState('');

  const generateQR = () => {
    setActiveUrl(url);
  };

  const downloadQR = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'classroom-qr.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium">
        <ChevronLeft className="w-5 h-5 mr-1" /> 홈으로 돌아가기
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-lg text-white"><RefreshCw className="w-5 h-5" /></div>
          QR 생성기
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">URL 또는 텍스트 입력</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && generateQR()}
              />
              <button
                onClick={generateQR}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                생성
              </button>
            </div>
          </div>

          {activeUrl && (
            <div className="flex flex-col items-center bg-slate-50 p-10 rounded-2xl animate-in fade-in zoom-in duration-300">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <QRCodeCanvas value={activeUrl} size={256} level="H" />
              </div>
              <p className="mt-4 text-sm text-slate-400 break-all text-center">{activeUrl}</p>
              
              <button
                onClick={downloadQR}
                className="mt-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"
              >
                <Download className="w-5 h-5" /> 이미지 다운로드
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
