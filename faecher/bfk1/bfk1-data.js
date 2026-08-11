/* BfK-1 · Aggregator
 * Nội dung học được tách ra 4 file (chép nguyên văn nên rất lớn):
 *   bfk1-lf2-data.js  → window.BFK1_LF2   (Beschaffung & Lagerung · sla-lf2.md)
 *   bfk1-lf6-data.js  → window.BFK1_LF6   (Speisen · Menüs · Ernährung · lf6.md)
 *   bfk1-lf9-data.js  → window.BFK1_LF9   (Zahlung · Recht · lf9.md)
 *   bfk1-extra-data.js→ window.BFK1_EXTRA (Abschlussprüfung 19 Thema · fk_exel – phần không khớp LF)
 * File này gộp chúng thành window.BFK1_THEMES = {lf2, lf6, lf9} + expose EXTRA,
 * và cung cấp helper bfk1AllItems / bfk1PageList cho index.html + faecher.js.
 *
 * Thứ tự <script> trong index.html: 4 file data phải load TRƯỚC file này.
 */
(function () {
  function emptyGroup(id, badge, title) {
    return { id: id, label: "Lernfeld " + id.replace("lf", ""), badge: badge, title: title, items: [] };
  }

  var lf2 = window.BFK1_LF2 || emptyGroup("lf2", "LF 2", "Beschaffung und Lagerung");
  var lf3 = window.BFK1_LF3 || emptyGroup("lf3", "LF 3", "Küche und Ernährung");
  var lf6 = window.BFK1_LF6 || emptyGroup("lf6", "LF 6", "Gerichte, Menüs und Produkte anbieten");
  var lf9 = window.BFK1_LF9 || emptyGroup("lf9", "LF 9", "Zahlungen mit dem Gast abwickeln");

  window.BFK1_THEMES = { lf2: lf2, lf3: lf3, lf6: lf6, lf9: lf9 };
  // Khu học song song (Abschlussprüfung Gast+Produktion) – không nằm trong các LF của KA
  window.BFK1_EXTRA = window.BFK1_EXTRA || emptyGroup("extra", "EXTRA", "Abschlussprüfung · Gast + Produktion");

  // Thứ tự nhóm để render hub + gom item
  window.BFK1_GROUPS = [lf2, lf3, lf6, lf9, window.BFK1_EXTRA];

  // Alias content = theory cho mỗi item, để code cũ (flashcards, training,
  // search-vocab) đọc .content vẫn chạy mà không phải sửa nhiều chỗ.
  window.BFK1_GROUPS.forEach(function (g) {
    (g && g.items ? g.items : []).forEach(function (it) {
      if (it && !it.content && it.theory) it.content = it.theory;
    });
  });

  window.bfk1AllItems = function bfk1AllItems() {
    var out = [];
    window.BFK1_GROUPS.forEach(function (g) {
      (g && g.items ? g.items : []).forEach(function (it) { out.push(it); });
    });
    return out;
  };

  // Nhóm chứa một item (để hiện "Lernfeld …" trên trang Thema)
  window.bfk1GroupOf = function bfk1GroupOf(themeId) {
    var found = null;
    window.BFK1_GROUPS.forEach(function (g) {
      if (found) return;
      if ((g.items || []).some(function (x) { return x.id === themeId; })) found = g;
    });
    return found;
  };

  window.bfk1PageList = function bfk1PageList(pages) {
    if (!pages) return [];
    var list = [];
    for (var i = pages.from; i <= pages.to; i++) {
      var n = String(i).padStart(2, "0");
      list.push("./" + pages.folder + "/" + pages.prefix + "-" + n + ".jpg");
    }
    return list;
  };
})();
