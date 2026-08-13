import React, { useState } from 'react';
import { 
  FolderDown, 
  FileText, 
  ExternalLink, 
  Download, 
  Search, 
  Folder, 
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import materialsData from '../data/kho_tai_lieu_giao_trinh_va_drive_A1_C1.json';

interface DirectDownload {
  name: string;
  url: string;
}

interface MainFolders {
  [key: string]: string;
}

export const MaterialsDriveHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const pdfList: DirectDownload[] = materialsData.directPdfDownloads || [];
  const mainFolders: MainFolders = materialsData.mainDriveFolders || {};

  const driveItems = [
    { key: 'a1', title: 'Tài Liệu & Giáo Trình Trình Độ A1', level: 'A1', url: mainFolders.a1 },
    { key: 'a2', title: 'Tài Liệu & Giáo Trình Trình Độ A2', level: 'A2', url: mainFolders.a2 },
    { key: 'b1', title: 'Tài Liệu Ôn Thi Chứng Chỉ B1 (Goethe & TELC)', level: 'B1', url: mainFolders.b1 },
    { key: 'b2_tu_vung', title: 'Kho Từ Vựng Chuyên Sâu B2 & Điều Dưỡng', level: 'B2', url: mainFolders.b2_tu_vung },
    { key: 'b2_ngu_phap', title: 'Ngữ Pháp Nâng Cao B2 & Cụm Nomen-Verb', level: 'B2', url: mainFolders.b2_ngu_phap },
    { key: 'b2_telc', title: 'Kho Đề Thi TELC B2 & Bài Mẫu Thư', level: 'B2', url: mainFolders.b2_telc },
    { key: 'b2_goethe', title: 'Bộ Đề Thi Thật Goethe B2 (4 Kỹ Năng)', level: 'B2', url: mainFolders.b2_goethe },
    { key: 'c1', title: 'Tài Liệu C1 Học Thuật & Đại Học (C1 Hochschule)', level: 'C1', url: mainFolders.c1 },
    { key: 'giaotrinh', title: 'Kho Giáo Trình Schritte, Studio d & Aspekte Neu', level: 'ALL', url: mainFolders.giaotrinh },
    { key: 'driveUrl', title: 'Thư Mục Tổng Hợp Toàn Bộ Khóa Học', level: 'ALL', url: mainFolders.driveUrl },
  ];

  const filteredPdfs = pdfList.filter((pdf) => {
    const matchSearch = pdf.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = filterLevel === 'ALL' || pdf.name.toUpperCase().includes(filterLevel);
    return matchSearch && matchLevel;
  });

  const filteredDrives = driveItems.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = filterLevel === 'ALL' || d.level.toUpperCase().includes(filterLevel);
    return matchSearch && matchLevel;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase mb-2">
            <FolderDown className="w-3.5 h-3.5" />
            Kho Tài Liệu Giáo Trình Miễn Phí (Free Materials)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            24 Sách PDF Đã Tải Về Máy & 66 Folder Google Drive
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Giáo trình gốc (Schritte Plus, Aspekte Neu, Studio d), tuyển tập đề thi thật kèm Audio, bảng từ vựng và bài tập ngữ pháp từ A1 đến C1.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-300">24/24 PDF Đã Tải Offline</span>
        </div>
      </div>

      {/* Offline Storage Notice Box */}
      <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-300">
              Đã tải trọn bộ 24 File PDF Giáo Trình gốc về ổ cứng của bạn
            </h4>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              📁 Vị trí lưu trên máy: <strong>KHO_FILE_PDF_GIAO_TRINH_A1_B2/</strong> (hơn 400 MB)
            </p>
          </div>
        </div>
      </div>

      {/* Search & Level Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm sách giáo trình hoặc thư mục ôn thi (Schritte, B1, Audio, Grammatik)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterLevel === lvl
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Direct Download PDF Books Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-500" />
            <span>24 Sách & Giáo Trình PDF (Tải Trực Tiếp & Đọc Offline)</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">
            {filteredPdfs.length} tài liệu
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPdfs.map((pdf, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    PDF EBOOK
                  </span>
                  <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Đã có offline
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {pdf.name}
                </h4>
              </div>

              <a
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-amber-500"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Mở / Tải Lại Link Gốc</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Google Drive Folders Section */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Folder className="w-4 h-4 text-amber-500" />
            <span>66 Thư Mục Google Drive Theo Cấp Độ (Kho Tài Nguyên)</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">
            {filteredDrives.length} thư mục
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrives.map((drive, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-sm hover:border-indigo-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {drive.level}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    Drive Folder
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-2">
                  {drive.title}
                </h4>
              </div>

              <a
                href={drive.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-500/10 hover:bg-indigo-600 text-indigo-300 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-indigo-500/20 hover:border-indigo-600"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở Google Drive</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
