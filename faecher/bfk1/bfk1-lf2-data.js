/* BfK-1 · Lernfeld 2 – Beschaffung und Lagerung (Thu mua & lưu kho)
 * Quelle chính: faecher/bfk1/notes/sla-lf2.md  (Bfk-SLA-lf2, 63 trang)
 * Câu hỏi bổ sung: quellen/_bfk_1_notes/fk_exel  (ánh xạ theo skill lernfeld-klassifikation)
 *
 * Nội dung 10 LS được chép trong các file phần bfk1-lf2-p1.js … p5.js
 * (mỗi file: window.__LF2 = (window.__LF2||[]).concat([ …items… ]) ).
 * Các file phần phải load TRƯỚC file này. File này chỉ gom lại.
 *
 * Schema mỗi LS:
 *   { id, icon, name, nameVi, desc,
 *     source,                       // note nguồn LÝ THUYẾT (file · trang)
 *     theory,                       // HTML chép nguyên văn DE + dịch VN
 *     qa:[{q,qVi,a,aVi,why,src}],   // Q&A, src = nguồn từng câu để đối chiếu
 *     qaNote,                       // ghi chú khi chưa có câu hỏi
 *     quiz:[{q,options,answer,explain}],
 *     vokabeln:[{de,vi}],
 *     pages:{folder,from,to,prefix} // scan Arbeitsblätter (optional)
 *   }
 */
window.BFK1_LF2 = {
  id: "lf2", label: "Lernfeld 2", badge: "LF 2",
  title: "Beschaffung und Lagerung",
  titleVi: "Thu mua & lưu kho",
  items: (window.__LF2 || [])
};
