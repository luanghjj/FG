import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Key, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  Bot, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import { 
  getStoredGeminiKey, 
  setStoredGeminiKey, 
  getStoredModel, 
  setStoredModel, 
  testGeminiConnection 
} from '../services/geminiService';

interface GeminiApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeminiApiKeyModal: React.FC<GeminiApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredGeminiKey());
      setModel(getStoredModel());
      setTestResult(null);
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredGeminiKey(apiKey);
    setStoredModel(model);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestResult({
        success: false,
        message: 'Vui lòng nhập API Key trước khi kiểm tra kết nối!'
      });
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    const res = await testGeminiConnection(apiKey, model);
    setIsTesting(false);
    setTestResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
            <Bot className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase mb-0.5">
              <Sparkles className="w-3 h-3" />
              Google Skills Integration
            </div>
            <h3 className="text-xl font-extrabold font-display text-white">
              Cấu Hình Google Gemini AI
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Tích hợp trí tuệ nhân tạo từ <strong>Google Agent Skills</strong> để tự động chấm bài viết Schreiben chuẩn TELC/Goethe, luyện nói Speaking tương tác và giải thích ngữ pháp A1-C1 chuyên sâu.
        </p>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                Gemini API Key
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Lấy Key Miễn Phí <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-sm text-slate-100 placeholder:text-slate-600 font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              * API Key được lưu bảo mật cục bộ trên trình duyệt (LocalStorage) của bạn.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Chọn Model Gemini
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none text-sm text-slate-100 font-sans cursor-pointer"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Nhanh & Tối Ưu Nhất - Khuyên Dùng)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Siêu Tốc)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Suy Luận Sâu B2-C1)</option>
            </select>
          </div>

          {/* Test connection alert */}
          {testResult && (
            <div
              className={`p-3.5 rounded-2xl border text-xs font-medium flex items-start gap-2.5 ${
                testResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <X className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold">{testResult.success ? 'Thành công!' : 'Lỗi kết nối:'}</p>
                <p className="mt-0.5 leading-relaxed">{testResult.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleTest}
            disabled={isTesting}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Đang thử...' : 'Kiểm Tra Key'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Đã Lưu!</span>
                </>
              ) : (
                <span>Lưu Cấu Hình</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
