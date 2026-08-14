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
    <div className="space-y-4 pb-16">
      {/* Compact Header */}
      <div className="rounded-2xl bg-white border border-ios-line p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold font-display text-ios-ink flex items-center gap-2">
            <FolderDown className="w-4 h-4 text-ios-accent" />
            <span>24 Sách PDF & 66 Thư Mục Google Drive A1 - C1</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-ios-ok-soft px-3 py-1.5 rounded-lg border border-ios-ok/20 shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-ios-ok" />
          <span className="text-xs font-bold text-ios-ok">24 PDF Offline</span>
        </div>
      </div>

      {/* Offline Storage Notice Box */}
      <div className="p-5 rounded-2xl bg-ios-ok-soft border border-ios-ok/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-ios-ok border border-ios-ok/20 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-ios-ok">
              Đã tải trọn bộ 24 File PDF Giáo Trình gốc về ổ cứng của bạn
            </h4>
            <p className="text-xs text-ios-secondary font-mono mt-0.5">
              Vị trí lưu trên máy: <strong>KHO_FILE_PDF_GIAO_TRINH_A1_B2/</strong> (hơn 400 MB)
            </p>
          </div>
        </div>
      </div>

      {/* Search & Level Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-ios-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm sách giáo trình hoặc thư mục ôn thi (Schritte, B1, Audio, Grammatik)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-ios-line text-sm text-ios-ink focus:outline-none focus:ring-2 focus:ring-ios-accent/30 shadow-sm placeholder:text-ios-muted"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterLevel === lvl
                  ? 'bg-ios-accent text-white shadow-sm'
                  : 'bg-white text-ios-secondary border border-ios-line hover:bg-ios-bg'
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
          <h3 className="text-base font-bold text-ios-ink flex items-center gap-2">
            <FileText className="w-4 h-4 text-ios-bad" />
            <span>24 Sách & Giáo Trình PDF (Tải Trực Tiếp & Đọc Offline)</span>
          </h3>
          <span className="text-xs text-ios-muted font-semibold">
            {filteredPdfs.length} tài liệu
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPdfs.map((pdf, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-ios-line p-5 shadow-sm hover:border-ios-accent/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ios-bad-soft text-ios-bad border border-ios-bad/20">
                    PDF EBOOK
                  </span>
                  <span className="text-[11px] font-medium text-ios-ok flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Đã có offline
                  </span>
                </div>

                <h4 className="text-sm font-bold text-ios-ink line-clamp-2 group-hover:text-ios-accent transition-colors">
                  {pdf.name}
                </h4>
              </div>

              <a
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-ios-bg hover:bg-ios-accent text-ios-secondary hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-ios-line hover:border-ios-accent"
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
          <h3 className="text-base font-bold text-ios-ink flex items-center gap-2">
            <Folder className="w-4 h-4 text-ios-accent" />
            <span>66 Thư Mục Google Drive Theo Cấp Độ (Kho Tài Nguyên)</span>
          </h3>
          <span className="text-xs text-ios-muted font-semibold">
            {filteredDrives.length} thư mục
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrives.map((drive, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-ios-line p-5 shadow-sm hover:border-ios-indigo/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ios-indigo-soft text-ios-indigo border border-ios-indigo/20">
                    {drive.level}
                  </span>
                  <span className="text-[11px] font-medium text-ios-muted">
                    Drive Folder
                  </span>
                </div>

                <h4 className="text-sm font-bold text-ios-ink line-clamp-2">
                  {drive.title}
                </h4>
              </div>

              <a
                href={drive.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-ios-indigo-soft hover:bg-ios-indigo text-ios-indigo hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-ios-indigo/20 hover:border-ios-indigo"
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
