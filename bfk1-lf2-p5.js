/* BfK-1 · LF2 · LS09–LS10 (nguồn: sla-lf2.md trang 51–57) */
window.__LF2 = (window.__LF2||[]).concat([
  {
    id: "lf2-ls09",
    icon: "⏰",
    name: "LS09 · Auf Nicht-Rechtzeitig-Lieferung reagieren",
    nameVi: "Xử lý khi giao hàng trễ (Lieferverzug)",
    desc: "Lieferverzug §286 BGB: 2 điều kiện, Fixkauf/Zweckkauf/Terminkauf, Verschulden, 4 quyền của người mua.",
    source: "sla-lf2.md · trang 51–55",
    theory: `
<h3>Grundidee / Ý chính</h3>
<p><b>LS08</b> = Schlechtleistung (hàng có lỗi). <b>LS09</b> = <b>Lieferverzug</b> (hàng <b>không giao đúng hạn</b>) theo <b>§ 286 BGB</b>.</p>

<div class="note">⚠️ <b>HỌC THUỘC – 2 Voraussetzungen für den Lieferverzug:</b>
<ol>
  <li><b>Fälligkeit überschritten</b>: hàng không được giao hoặc giao muộn (quá hạn phải giao).</li>
  <li><b>Verschulden des Lieferanten</b>: nhà cung cấp <b>có lỗi</b> (không phải bất khả kháng).</li>
</ol>
Chỉ có <b>2</b> điều kiện. Mahnung/Fristsetzung KHÔNG phải điều kiện thứ 3 — chúng nằm trong điều kiện 1.</div>

<h3>Zu 1. – Die Fälligkeit: cần Mahnung hay không? ⚠️</h3>
<table>
<tr><th>Fall</th><th>Ví dụ</th><th>Mahnung?</th></tr>
<tr><td><b>Fixkauf</b> / <b>Zweckkauf</b><br>(kalendermäßig festgelegt)</td><td>Fixkauf: giao đúng <b>ngày 22.6</b>. Zweckkauf: hàng <b>cho Noel</b> (mục đích quyết định ngày).</td><td><b>Nein</b> — quá ngày là <b>tự động</b> Verzug, không cần nhắc.</td></tr>
<tr><td><b>Terminkauf</b><br>(kalendermäßig unbestimmt)</td><td>Giao <b>„khoảng 4 tuần nữa“</b> (không rõ ngày).</td><td><b>Ja</b> — phải <b>mahnen</b> + đặt <b>Nachfrist</b>, sau đó mới có Verzug.</td></tr>
</table>
<div class="note">⚠️ <b>Mẹo nhớ:</b> Fix/Zweck = có <b>ngày trong lịch</b> → Verzug tự động, không cần Mahnung. Termin = chỉ „circa/khoảng“ → phải mahnen trước.</div>

<h3>Zu 2. – Das Verschulden (lỗi)</h3>
<ul>
  <li><b>fahrlässig</b> (vô ý): không theo dõi cẩn thận các hạn giao hàng.</li>
  <li><b>vorsätzlich</b> (cố ý): giao quầy bar đặt riêng cho khách sạn sang một khách khác trả nhiều tiền hơn.</li>
  <li><b>Kein Verschulden</b> = <b>höhere Gewalt</b> (bất khả kháng: đình công, cháy, lũ lụt) → <b>không có Lieferverzug</b>, người mua không đòi được gì.</li>
</ul>

<h3>Rechte des Käufers – 4 quyền (chọn 1) ⚠️ HỌC THUỘC</h3>
<table>
<tr><th>#</th><th>Recht</th><th>Nghĩa</th></tr>
<tr><td>1</td><td><b>Erfüllung des Vertrags</b></td><td>Vẫn đòi <b>giao hàng</b> (chỉ muộn).</td></tr>
<tr><td>2</td><td>Erfüllung <b>+ Schadensersatz wegen Verzögerung</b></td><td>Giao hàng + <b>đền bù thiệt hại do chậm</b> (vd. phòng không cho thuê được → lợi nhuận mất đi).</td></tr>
<tr><td>3</td><td><b>Rücktritt vom Vertrag</b></td><td><b>Rút hợp đồng</b>; hàng giao muộn không phải nhận, đã trả thì hoàn lại.</td></tr>
<tr><td>4</td><td>Rücktritt <b>+ Schadensersatz wegen Nichterfüllung</b></td><td>Đền bù <b>thay cho việc giao</b> (vd. lợi nhuận mất tới khi mua được từ nhà cung cấp khác).</td></tr>
</table>
<div class="note">⚠️ Trước khi đòi quyền phải <b>mahnen + đặt Nachfrist</b> — <b>NGOẠI LỆ: Fixkauf và Zweckkauf</b> thì không cần.</div>

<h3>Zwei Begriffe ⚠️</h3>
<ul>
  <li><b>Vertragsstrafe / Konventionalstrafe</b> = tiền phạt hợp đồng thỏa thuận trước (vì thiệt hại thật khó tính/khó chứng minh).</li>
  <li><b>Deckungskauf</b> = mua thay thế chỗ khác đắt hơn → được đòi <b>phần chênh lệch giá</b>.</li>
</ul>

<h3>Fall Kochschürzen (bài giải mẫu, trang 53–54)</h3>
<p>25 Kochschürzen, in logo + tên (Spezialanfertigung), hạn giao <b>bis zum 20.03.2026</b> → là <b>Fixkauf</b>.</p>
<ul>
  <li>① Fälligkeit: <b>Fixkauf → Liefertermin không được giữ</b>. Mahnung + Fristsetzung: <b>entfällt, da Fixkauf</b>.</li>
  <li>② Verschulden: <b>liegt vor</b> (fahrlässig/vorsätzlich, keine höhere Gewalt).</li>
  <li>→ Kết luận: <b>Wir dürfen unsere Rechte beanspruchen!</b></li>
</ul>
<div class="note">💡 <b>Cách ăn điểm:</b> tách 2 nhánh <b>„sofern rechtzeitig“</b> (quyền 1–2, vẫn nhận hàng) và <b>„wenn nicht rechtzeitig“</b> (quyền 3–4, không nhận nữa). Luôn nêu <b>thiệt hại cụ thể</b>: Preisdifferenz (Deckungskauf) hoặc hoàn một phần học phí — nói chung chung „Schaden“ là mất điểm.</div>`,
    qa: [
      { q: "Welche zwei Voraussetzungen müssen für einen Lieferverzug erfüllt sein?", qVi: "Hai điều kiện nào phải có để xảy ra Lieferverzug?", a: "1) Die Fälligkeit ist überschritten (nicht/nicht rechtzeitig geliefert). 2) Es liegt ein Verschulden des Lieferanten vor.", aVi: "1) Đã quá hạn giao (không giao hoặc giao muộn). 2) Nhà cung cấp có lỗi.", why: "Mahnung/Fristsetzung không phải điều kiện thứ 3 — chúng nằm trong điều kiện Fälligkeit và chỉ cần khi là Terminkauf.", src: "sla-lf2.md trang 52 · Anlage 1 A" },
      { q: "Wann kommt der Lieferant OHNE Mahnung in Verzug?", qVi: "Khi nào nhà cung cấp bị Verzug mà KHÔNG cần Mahnung?", a: "Beim Fixkauf und Zweckkauf – der Termin ist kalendermäßig festgelegt.", aVi: "Với Fixkauf và Zweckkauf — hạn giao được ấn định rõ theo lịch.", why: "Terminkauf (nur „circa“) → phải mahnen + đặt Nachfrist trước.", src: "sla-lf2.md trang 52 · Anlage 1 B" },
      { q: "Nennen Sie die 4 Rechte des Käufers bei Lieferverzug.", qVi: "Kể 4 quyền của người mua khi có Lieferverzug.", a: "1) Erfüllung des Vertrags. 2) Erfüllung + Schadensersatz wegen Verzögerung. 3) Rücktritt vom Vertrag. 4) Rücktritt + Schadensersatz wegen Nichterfüllung.", aVi: "1) Đòi giao hàng. 2) Giao hàng + đền bù do chậm. 3) Rút hợp đồng. 4) Rút hợp đồng + đền bù do không thực hiện.", why: "Quyền 1–2 = vẫn nhận hàng; quyền 3–4 = không nhận nữa.", src: "sla-lf2.md trang 52 · Anlage 1 D" },
      { q: "Was bedeutet höhere Gewalt und welche Folge hat sie?", qVi: "Höhere Gewalt là gì và hệ quả?", a: "Ereignisse wie Streik, Brand, Hochwasser – der Lieferant hat kein Verschulden, also liegt kein Lieferverzug vor.", aVi: "Sự kiện như đình công, cháy, lũ lụt — nhà cung cấp không có lỗi, nên không có Lieferverzug và người mua không đòi được quyền gì.", why: "Verschulden là điều kiện 2; höhere Gewalt loại bỏ nó.", src: "sla-lf2.md trang 52 · Anlage 1 C" },
      { q: "Warum ist der Kauf der Kochschürzen ein Fixkauf?", qVi: "Vì sao vụ đặt tạp dề là Fixkauf?", a: "Weil im Bestellformular ein konkretes Kalenderdatum steht: „bis zum 20.03.2026“. Deshalb entfallen Mahnung und Fristsetzung.", aVi: "Vì đơn đặt ghi rõ ngày cụ thể theo lịch (20.03.2026). Do đó Mahnung và Fristsetzung entfällt.", why: "Ngày rõ theo lịch = Fixkauf → Verzug tự động.", src: "sla-lf2.md trang 53 · Anlage 2" }
    ],
    quiz: [
      { q: "Wie viele Voraussetzungen braucht ein Lieferverzug?", options: ["1", "2", "3", "4"], answer: 1, explain: "Genau 2: Fälligkeit überschritten + Verschulden des Lieferanten." },
      { q: "Bei welchem Kauf braucht man KEINE Mahnung?", options: ["Terminkauf", "Fixkauf", "Ratenkauf", "Barkauf"], answer: 1, explain: "Fixkauf (und Zweckkauf) sind kalendermäßig festgelegt → Verzug automatisch." },
      { q: "„Der Lieferant überwacht seine Liefertermine nicht sorgfältig.“ Welche Art Verschulden?", options: ["vorsätzlich", "fahrlässig", "höhere Gewalt", "kein Verschulden"], answer: 1, explain: "Aus Unaufmerksamkeit = fahrlässig." },
      { q: "Streik und Hochwasser sind …", options: ["fahrlässig", "vorsätzlich", "höhere Gewalt → kein Verzug", "Fixkauf"], answer: 2, explain: "Höhere Gewalt = kein Verschulden = kein Lieferverzug." },
      { q: "Was ist ein Deckungskauf?", options: ["Kauf mit Anzahlung", "Ersatzkauf teurer woanders, Differenz als Schaden", "Kauf auf Raten", "Rückgabe der Ware"], answer: 1, explain: "Muss der Käufer teurer besorgen, kann er die Preisdifferenz verlangen." },
      { q: "Recht Nr. 4 des Käufers ist …", options: ["Erfüllung des Vertrags", "Rücktritt + Schadensersatz wegen Nichterfüllung", "nur Schadensersatz wegen Verzögerung", "Vertragsstrafe"], answer: 1, explain: "Rücktritt vom Vertrag mit Schadensersatz wegen Nichterfüllung." }
    ],
    vokabeln: [
      { de: "der Lieferverzug", vi: "chậm giao hàng" },
      { de: "die Fälligkeit", vi: "hạn phải thực hiện/giao" },
      { de: "überschreiten", vi: "vượt quá (hạn)" },
      { de: "das Verschulden", vi: "lỗi (chịu trách nhiệm)" },
      { de: "fahrlässig", vi: "vô ý, bất cẩn" },
      { de: "vorsätzlich", vi: "cố ý" },
      { de: "die höhere Gewalt", vi: "bất khả kháng" },
      { de: "der Fixkauf", vi: "mua có ngày giao cố định" },
      { de: "der Zweckkauf", vi: "mua theo mục đích/dịp" },
      { de: "der Terminkauf", vi: "mua có hạn ước lượng" },
      { de: "die Mahnung / mahnen", vi: "nhắc, đôn hàng" },
      { de: "die Nachfrist", vi: "thời hạn gia hạn" },
      { de: "vom Vertrag zurücktreten", vi: "rút khỏi hợp đồng" },
      { de: "der Schadensersatz", vi: "đền bù thiệt hại" },
      { de: "der entgangene Gewinn", vi: "lợi nhuận bị mất" },
      { de: "die Vertragsstrafe", vi: "tiền phạt hợp đồng" },
      { de: "der Deckungskauf", vi: "mua thay thế (đòi chênh lệch)" },
      { de: "geltend machen", vi: "đòi/thực thi quyền" }
    ]
  },
  {
    id: "lf2-ls10",
    icon: "📋",
    name: "LS10 · Warenbestand erfassen (Inventur)",
    nameVi: "Kiểm kê kho (Inventur)",
    desc: "Inventur trước Jahresabschluss: Soll-Endbestand, Ist-Bestand, Bestandsabweichung (Schwund) và nguyên nhân.",
    source: "sla-lf2.md · trang 56–57",
    theory: `
<h3>Grundidee / Ý chính</h3>
<p><b>Inventur</b> = đếm hàng thực tế trong kho trước <b>Jahresabschluss</b> (quyết toán năm). So sánh số đếm được (Ist) với số phải có theo sổ sách (Soll).</p>

<div class="note">⚠️ <b>HỌC THUỘC – hai công thức:</b>
<ul>
  <li><b>Soll-Endbestand = Anfangsbestand + Zugänge − Abgänge</b><br>Tồn cuối (trên giấy) = tồn đầu + nhập − xuất.</li>
  <li><b>Bestandsabweichung = Ist-Bestand − Soll-Endbestand</b><br>Chênh lệch = số đếm thực tế − số phải có.</li>
</ul>
Kết quả <b>âm (−)</b> = <b>thiếu hàng</b> (Fehlbestand/Schwund); <b>dương (+)</b> = thừa hàng.</div>

<h3>Beispiel-Rechnung / Ví dụ tính</h3>
<table>
<tr><th>Produkt</th><th>Einheit</th><th>Anfang</th><th>Zugänge</th><th>Abgänge</th><th>Soll</th><th>Ist</th><th>Abweichung</th></tr>
<tr><td>Kaffee</td><td>1 kg</td><td>5</td><td>65</td><td>62</td><td>8</td><td>3</td><td>−5</td></tr>
<tr><td>Mehl</td><td>5 kg</td><td>25</td><td>240</td><td>220</td><td>45</td><td>46</td><td>+1</td></tr>
<tr><td>Kartoffeln</td><td>10 kg</td><td>8</td><td>120</td><td>115</td><td>13</td><td>10</td><td>−3</td></tr>
<tr><td>Zucker</td><td>20 kg</td><td>3</td><td>25</td><td>18</td><td>10</td><td>5</td><td>−5</td></tr>
<tr><td>Kakaopulver</td><td>1 kg</td><td>2</td><td>30</td><td>28</td><td>4</td><td>4</td><td>0</td></tr>
<tr><td>Milch</td><td>1 l</td><td>10</td><td>150</td><td>145</td><td>15</td><td>11</td><td>−4</td></tr>
<tr><td>Sahne</td><td>1 kg</td><td>4</td><td>35</td><td>30</td><td>9</td><td>7</td><td>−2</td></tr>
<tr><td>Butter</td><td>1 kg</td><td>9</td><td>42</td><td>38</td><td>13</td><td>12</td><td>−1</td></tr>
<tr><td>Joghurt</td><td>1 kg</td><td>4</td><td>32</td><td>25</td><td>11</td><td>3</td><td>−8</td></tr>
<tr><td>Quark</td><td>1 kg</td><td>3</td><td>40</td><td>22</td><td>21</td><td>12</td><td>−9</td></tr>
</table>
<p>Mẫu (Kaffee): <code>5 + 65 − 62 = 8</code> (Soll) → <code>3 − 8 = −5</code> → thiếu 5 kg. Quark: <code>3 + 40 − 22 = 21</code> → <code>12 − 21 = −9</code> → thiếu nhiều nhất.</p>
<div class="note">⚠️ <b>Ist-Bestand không tự tính</b> — là <b>số đếm thực tế</b>. Con số „46 × 5 kg“ nghĩa là 46 đơn vị (ghi 46, cột Einheit ghi 5 kg), đừng nhân ra kg. Thứ tự sản phẩm ở trang đếm và trang liệt kê <b>khác nhau</b> — dò theo tên, không theo dòng!</div>

<h3>Mögliche Ursachen für Bestandsabweichungen ⚠️</h3>
<ul>
  <li><b>Fehler bei der Erfassung der Warenannahme</b> — ghi nhận sai khi nhận hàng.</li>
  <li><b>Beschädigte Waren</b> — hàng hư hỏng/bể vỡ.</li>
  <li><b>Diebstahl</b> (auch durch Mitarbeiter) — trộm/mất hàng.</li>
  <li><b>Falsche Sortierung bei der Lagerung</b> — sắp xếp/để lẫn chỗ khác.</li>
  <li><b>Nicht eingehaltene Lagerbedingungen</b> — không đúng điều kiện bảo quản → hàng hỏng.</li>
</ul>
<div class="note">💡 Nếu KA hỏi „Nennen Sie mögliche Ursachen“, 3 cái an toàn: <b>Diebstahl · Verderb/beschädigte Waren · Erfassungsfehler</b>. Phần hao hụt gọi chung là <b>Schwund</b> hoặc <b>Inventurdifferenz</b>.</div>`,
    qa: [
      { q: "Wie berechnet man den Soll-Endbestand?", qVi: "Tính Soll-Endbestand thế nào?", a: "Soll-Endbestand = Anfangsbestand + Zugänge − Abgänge.", aVi: "Tồn cuối theo sổ = tồn đầu + nhập − xuất.", why: "Đây là số „phải có trên giấy“, dùng để so với Ist.", src: "sla-lf2.md trang 57" },
      { q: "Wie berechnet man die Bestandsabweichung?", qVi: "Tính Bestandsabweichung thế nào?", a: "Bestandsabweichung = Ist-Bestand − Soll-Endbestand. Negativ = Fehlbestand, positiv = Überbestand.", aVi: "Chênh lệch = số đếm thực tế − số phải có. Âm = thiếu, dương = thừa.", why: "Ist lấy từ số đếm kiểm kê, không tính ra được.", src: "sla-lf2.md trang 57" },
      { q: "Nennen Sie drei mögliche Ursachen für Bestandsabweichungen.", qVi: "Kể 3 nguyên nhân chênh lệch kho.", a: "Diebstahl, beschädigte/verdorbene Waren, Erfassungsfehler bei der Warenannahme.", aVi: "Trộm cắp, hàng hư/hỏng, ghi nhận sai khi nhận hàng.", why: "Còn có: sắp xếp sai, không giữ điều kiện bảo quản.", src: "sla-lf2.md trang 57" },
      { q: "Was bedeutet die Angabe „46 × 5 kg“ in der Inventurliste?", qVi: "„46 × 5 kg“ trong Inventurliste nghĩa là gì?", a: "46 Einheiten (Menge = 46), die Einheit ist 5 kg. Man trägt 46 ein, nicht 230 kg.", aVi: "46 đơn vị, mỗi đơn vị 5 kg. Ghi 46 vào cột số lượng, cột Einheit ghi 5 kg — không nhân ra kg.", why: "Nhân ra kg là lỗi thường gặp trong KA.", src: "sla-lf2.md trang 56" }
    ],
    quiz: [
      { q: "Soll-Endbestand = ?", options: ["Anfang + Zugänge − Abgänge", "Ist − Anfang", "Zugänge − Abgänge", "Anfang + Abgänge"], answer: 0, explain: "Anfangsbestand + Zugänge − Abgänge." },
      { q: "Bestandsabweichung = ?", options: ["Soll − Ist", "Ist − Soll", "Ist + Soll", "Zugänge − Abgänge"], answer: 1, explain: "Ist-Bestand − Soll-Endbestand. Negativ = Fehlbestand." },
      { q: "Kaffee: Anfang 5, Zugänge 65, Abgänge 62, Ist 3. Abweichung?", options: ["0", "−5", "+5", "−3"], answer: 1, explain: "Soll = 5+65−62 = 8; 3 − 8 = −5." },
      { q: "Ein negativer Wert bei der Bestandsabweichung bedeutet …", options: ["Überbestand", "Fehlbestand/Schwund", "kein Fehler", "Zugang"], answer: 1, explain: "Weniger da als laut Soll → Fehlbestand (Schwund)." },
      { q: "Wozu dient die Inventur?", options: ["Preise festlegen", "tatsächlichen Warenbestand erfassen (vor Jahresabschluss)", "Lieferanten wählen", "Menü planen"], answer: 1, explain: "Ist-Bestand zählen und mit dem Soll vergleichen." },
      { q: "Wie nennt man die Differenz zwischen Soll und Ist auch?", options: ["Rabatt", "Schwund / Inventurdifferenz", "Skonto", "Umsatz"], answer: 1, explain: "Der Schwund bzw. die Inventurdifferenz." }
    ],
    vokabeln: [
      { de: "die Inventur", vi: "kiểm kê kho" },
      { de: "der Jahresabschluss", vi: "quyết toán năm" },
      { de: "der Warenbestand", vi: "lượng hàng tồn" },
      { de: "der Anfangsbestand", vi: "tồn đầu kỳ" },
      { de: "die Zugänge", vi: "hàng nhập" },
      { de: "die Abgänge", vi: "hàng xuất" },
      { de: "der Soll-Endbestand", vi: "tồn cuối theo sổ sách" },
      { de: "der Ist-Bestand", vi: "tồn thực tế (đếm được)" },
      { de: "die Bestandsabweichung", vi: "chênh lệch tồn kho" },
      { de: "die Inventurdifferenz", vi: "sai lệch kiểm kê" },
      { de: "der Schwund", vi: "hao hụt kho" },
      { de: "der Diebstahl", vi: "trộm cắp" },
      { de: "beschädigt", vi: "bị hư hỏng" },
      { de: "die Erfassung", vi: "việc ghi nhận số liệu" },
      { de: "vervollständigen", vi: "hoàn thiện, điền đủ" },
      { de: "die Einheit", vi: "đơn vị" }
    ]
  }
]);
