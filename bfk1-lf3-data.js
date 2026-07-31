/* BfK-1 · Lernfeld 3 – Küche und Ernährung (Bếp & Dinh dưỡng)
 * Quelle chính: _bfk_1_notes/sla-lf3.md  (Bfk-SLA-lf3, 112 trang)
 * Câu hỏi bổ sung: _bfk_1_notes/fk_exel  (KT Bắt buộc, Thema 2, 5, 6, 7)
 *
 * Nội dung 10 LS được chép trong các file phần bfk1-lf3-p1.js … p5.js
 * (mỗi file: window.__LF3 = (window.__LF3||[]).concat([ …items… ]) ).
 * Các file phần phải load TRƯỚC file này. File này chỉ gom lại.
 *
 * Schema mỗi LS:
 *   { id, icon, name, nameVi, desc,
 *     source,                       // note nguồn LÝ THUYẾT (file · trang)
 *     theory,                       // HTML chép nguyên văn DE + dịch VN
 *     qa:[{q,qVi,a,aVi,why,src}],   // Q&A, src = nguồn từng câu để đối chiếu
 *     qaNote,                       // ghi chú khi chưa có câu hỏi
 *     quiz:[{q,options,answer,explain}],
 *     vokabeln:[{de,vi}]
 *   }
 */
window.BFK1_LF3 = {
  id: "lf3", label: "Lernfeld 3", badge: "LF 3",
  title: "Küche und Ernährung",
  titleVi: "Bếp & Dinh dưỡng",
  items: (window.__LF3 || [])
};
