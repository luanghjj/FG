/**
 * FACH: SYMBOLE & PIKTOGRAMME (GHS, Entsorgung, Arbeitsschutz, Textilpflege)
 * =========================================================================
 * Chuẩn form FachForm cho AzubiHub — mỗi symbol đều có hình cắt riêng,
 * tên tiếng Đức + tiếng Việt bên dưới và giải thích ý nghĩa / cách xử lý.
 */
(function (w) {
  "use strict";

  function symCard(img, badge, titleDe, titleVi, descDe, descVi) {
    return (
      '<div class="sym-card">' +
        '<div class="sym-img-box">' +
          '<img src="' + img + '" alt="' + titleDe.replace(/"/g, "&quot;") + '" loading="lazy">' +
        '</div>' +
        '<div class="sym-body">' +
          (badge ? '<span class="sym-badge">' + badge + '</span>' : '') +
          '<div class="sym-title">' + titleDe + '</div>' +
          '<div class="sym-de">' + descDe + '</div>' +
          '<div class="vi"><b>' + titleVi + ':</b> ' + descVi + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function servCard(img, badge, titleDe, titleVi, descDe, descVi) {
    return (
      '<div class="sym-card serv-card">' +
        '<div class="sym-img-box">' +
          '<img src="' + img + '" alt="' + titleDe.replace(/<[^>]+>/g, "").replace(/"/g, "&quot;") + '" loading="lazy">' +
        '</div>' +
        '<div class="sym-body">' +
          (badge ? '<span class="sym-badge">' + badge + '</span>' : '') +
          '<div class="sym-title">' + titleDe + '</div>' +
          '<div class="sym-de">' + descDe + '</div>' +
          '<div class="vi"><b>' + titleVi + ':</b> ' + descVi + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* =====================================================================
   * THEMA 1: GHS-Gefahrensymbole für den Umgang mit Chemikalien
   * ===================================================================== */
  const ghsContent = `
<div class="note">
  <b>Gesetzliche Grundlage (GHS):</b> Seit dem <b>1. Dezember 2012</b> müssen chemische Stoffe, von denen eine Gefahr ausgeht, mit den Symbolen des <span class="term" data-de="GHS" data-vi="Hệ thống phân loại và ghi nhãn hóa chất hài hòa toàn cầu">GHS</span> (<i>Globally Harmonised System of Classification and Labelling of Chemicals</i>) gekennzeichnet sein.
  <div class="vi">Từ ngày 01.12.2012, mọi hóa chất nguy hiểm (chất tẩy rửa, khử trùng trong bếp) bắt buộc phải dán nhãn biểu tượng theo chuẩn quốc tế <b>GHS</b> (hình thoi nền trắng, viền đỏ).</div>
</div>

<h3>A. Zwei Signalwörter beim GHS</h3>
<table>
  <tr><th>Signalwort</th><th>Bedeutung</th><th>Tiếng Việt</th></tr>
  <tr>
    <td><b><span class="term" data-de="Gefahr" data-vi="Nguy hiểm (mức độ nặng)">Gefahr</span></b></td>
    <td>Kennzeichnet <b>schwerwiegende</b> Gefahrenkategorien (z. B. stark ätzend, akut giftig, leicht entzündbar, explosiv).</td>
    <td><b>Nguy hiểm (Mức độ cao):</b> Dùng cho các hóa chất có nguy cơ gây tổn thương nặng hoặc tức thời (ăn mòn da/mắt, độc cấp tính, dễ cháy nổ).</td>
  </tr>
  <tr>
    <td><b><span class="term" data-de="Achtung" data-vi="Cảnh báo / Chú ý (mức độ trung bình)">Achtung</span></b></td>
    <td>Kennzeichnet <b>weniger schwerwiegende</b> Gefahrenkategorien (z. B. reizend, gesundheitsschädlich, Gase unter Druck).</td>
    <td><b>Cảnh báo / Chú ý (Mức độ vừa):</b> Dùng cho hóa chất gây kích ứng, dị ứng nhẹ hoặc bình khí nén.</td>
  </tr>
</table>

<h3>B. Physikalische Gefahren (5 Symbole)</h3>
<p>Chemikalien mit physikalischen Gefahren können durch Hitze, Funken, Druck oder chemische Reaktion Brände, Explosionen oder Materialschäden auslösen.</p>
<div class="vi">Nhóm nguy hiểm vật lý: Các chất có thể gây cháy, nổ, ăn mòn kim loại hoặc nổ bình khí nén khi gặp nhiệt độ cao, tia lửa.</div>

<div class="sym-grid">
  ${symCard(
    "./images/symbole/ghs-explosiv.png",
    "GHS01 · Gefahr",
    '<span class="term" data-de="Explosionsgefahr" data-vi="nguy cơ nổ">Explosionsgefahr</span> (Explosive Stoffe)',
    "Nguy cơ nổ (Chất nổ)",
    "Instabile explosive Stoffe, die durch Schlag, Reibung, Funken oder Hitze explodieren können. Von Wärmequellen fernhalten.",
    "Hóa chất không bền, có thể phát nổ khi va đập, ma sát, gặp tia lửa hoặc nhiệt độ cao. Tránh xa nguồn nhiệt."
  )}
  ${symCard(
    "./images/symbole/ghs-entzuendlich.png",
    "GHS02 · Gefahr / Warnung",
    '<span class="term" data-de="entzündlich" data-vi="dễ cháy">entzündlich</span> (Entzündbare / feuergefährliche Stoffe)',
    "Chất dễ cháy (Bắt lửa)",
    "Flüssigkeiten, Gase oder Aerosole (z. B. alkoholhaltige Desinfektionsmittel, Brennpaste), die sich leicht entzünden. Von offenen Flammen und heißen Oberflächen fernhalten!",
    "Chất lỏng, khí hoặc bình xịt dễ bắt lửa (vd: cồn sát khuẩn bề mặt, cồn thạch giữ nóng buffet). Tuyệt đối để xa lửa trần và bếp nóng!"
  )}
  ${symCard(
    "./images/symbole/ghs-gase.png",
    "GHS04 · Achtung",
    '<span class="term" data-de="komprimierte Gase" data-vi="khí nén dưới áp suất">komprimierte Gase</span> (Gase unter Druck)',
    "Khí nén dưới áp suất cao",
    "Verdichtete oder verflüssigte Gase (z. B. CO₂-/N₂O-Kapseln für Sahnesiphon, Zapfanlagen-Gasflaschen). Können bei Erwärmung bersten; vor Sonnenbestrahlung schützen.",
    "Bình chứa khí nén áp suất cao (vd: bình khí CO₂ quầy bar, viên gas bình xịt kem tươi). Có thể nổ nếu bị nung nóng; phải để nơi thoáng mát, tránh nắng."
  )}
  ${symCard(
    "./images/symbole/ghs-brandfoerdernd.png",
    "GHS03 · Achtung / Gefahr",
    '<span class="term" data-de="brandfördernd" data-vi="chất oxy hóa hỗ trợ cháy">brandfördernd</span> (Entzündend wirkende Stoffe)',
    "Chất hỗ trợ cháy (Oxy hóa mạnh)",
    "Stoffe (z. B. Sauerstoff- oder Chlorbleichmittel), die selbst nicht brennen müssen, aber bestehende Brände stark anfachen. Getrennt von brennbaren Stoffen lagern.",
    "Chất oxy hóa (vd: thuốc tẩy gốc oxy/clo đậm đặc) cung cấp oxy làm đám cháy bùng phát mạnh hơn. Phải lưu kho tách biệt với vật liệu dễ cháy."
  )}
  ${symCard(
    "./images/symbole/ghs-aetzend-metall.png",
    "GHS05 · Gefahr",
    '<span class="term" data-de="ätzend" data-vi="ăn mòn (kim loại và mô sống)">ätzend</span> (Korrosiv gegenüber Metallen)',
    "Chất ăn mòn kim loại & bề mặt",
    "Starke Säuren (Entkalker) oder starke Laugen (Fettlöser, Grillreiniger), die Metalle angreifen und zerstören können. Nur in Originalgebinden aufbewahren.",
    "Axit mạnh (chất tẩy cặn vôi) hoặc kiềm mạnh (chất tẩy dầu mỡ lò nướng) có khả năng ăn mòn kim loại. Chỉ chứa trong bình nhựa chuyên dụng gốc."
  )}
</div>

<h3>C. Gesundheitsgefahren (4 Symbole)</h3>
<p>Diese Symbole warnen vor unmittelbaren oder langfristigen Schäden für Haut, Augen, Atemwege und innere Organe beim Umgang mit Reinigungsmitteln.</p>
<div class="vi">Nhóm nguy hiểm cho sức khỏe: Cảnh báo tổn thương trực tiếp hoặc lâu dài lên da, mắt, đường hô hấp và nội tạng khi tiếp xúc hóa chất.</div>

<div class="sym-grid">
  ${symCard(
    "./images/symbole/ghs-toxisch.png",
    "GHS06 · Gefahr",
    '<span class="term" data-de="akute Toxizität" data-vi="độc tính cấp (rất độc)">akute Toxizität</span> (Giftig / Lebensgefahr)',
    "Độc tính cấp (Chất kịch độc)",
    "Bereits kleine Mengen führen beim Einatmen, Verschlucken oder über die Haut zu schweren Vergiftungen bis zum Tod. Unter Verschluss und strikt getrennt von Lebensmitteln lagern!",
    "Chỉ một lượng nhỏ khi hít phải, nuốt phải hoặc thấm qua da cũng gây ngộ độc nặng hoặc tử vong. Phải khóa kín và tách biệt tuyệt đối khỏi thực phẩm!"
  )}
  ${symCard(
    "./images/symbole/ghs-aetzend-haut.png",
    "GHS05 · Gefahr",
    '<span class="term" data-de="Ätzwirkung auf die Haut" data-vi="ăn mòn da và gây tổn thương mắt nghiêm trọng">Ätzwirkung auf die Haut</span> (Hautätzend)',
    "Ăn mòn da & Hỏng mắt nghiêm trọng",
    "Verursacht schwere Verätzungen der Haut und schwere Augenschäden (z. B. Backofen-/Grillreiniger, Spülmaschinenreiniger). Pflicht: Schutzhandschuhe und Schutzbrille tragen!",
    "Gây bỏng hóa chất nặng trên da và tổn thương mắt vĩnh viễn (vd: nước tẩy lò nướng, hóa chất máy rửa bát công nghiệp). Bắt buộc đeo găng tay và kính bảo hộ!"
  )}
  ${symCard(
    "./images/symbole/ghs-achtung.png",
    "GHS07 · Achtung",
    '<span class="term" data-de="gesundheitsschädlich" data-vi="có hại cho sức khỏe / gây kích ứng">gesundheitsschädlich</span> (Reizung oder Allergie möglich)',
    "Có hại cho sức khỏe / Gây kích ứng hoặc dị ứng",
    "Verursacht Hautreizungen, schwere Augenreizung, allergische Hautreaktionen oder Atemwegsreizungen (häufig auf Spül- und Flächendesinfektionsmitteln). Kontakt vermeiden, Raum lüften.",
    "Gây kích ứng da, cay mắt, dị ứng da hoặc kích ứng đường thở (rất phổ biến trên chai nước tẩy rửa và khử trùng bề mặt). Tránh tiếp xúc trực tiếp, mở thông gió."
  )}
  ${symCard(
    "./images/symbole/ghs-systemisch.png",
    "GHS08 · Gefahr",
    '<span class="term" data-de="systemische Gefährdung" data-vi="nguy hại hệ thống / nội tạng lâu dài">systemische Gefährdung</span> (Schwere Gesundheitsgefahr)',
    "Nguy hại hệ thống / Tổn thương nội tạng lâu dài",
    "Kann Organe schädigen, Allergien/Asthma beim Einatmen auslösen, krebserzeugend sein oder beim Verschlucken und Eindringen in die Atemwege tödlich wirken.",
    "Có thể gây tổn thương nội tạng, gây hen suyễn/dị ứng đường hô hấp nặng, nguy cơ ung thư hoặc tử vong nếu đi vào phổi."
  )}
</div>

<h3>D. Umweltgefahren & Warnhinweise (3 Symbole)</h3>
<div class="sym-grid">
  ${symCard(
    "./images/symbole/ghs-umwelt.png",
    "GHS09 · Achtung",
    '<span class="term" data-de="gewässergefährdend" data-vi="nguy hại cho môi trường nước và thủy sinh">gewässergefährdend</span> (Für Tier und Umwelt gefährlich)',
    "Nguy hại cho nguồn nước & Sinh vật",
    "Giftig für Wasserorganismen (Fische, Wasserpflanzen) mit langfristiger Wirkung. Darf niemals unverdünnt in den Ausguss, Gully oder die Umwelt gelangen!",
    "Độc hại cho sinh vật thủy sinh (cá, thực vật nước) với hậu quả lâu dài. Tuyệt đối không đổ thẳng hóa chất thừa xuống cống rãnh hoặc ra môi trường!"
  )}
  ${symCard(
    "./images/symbole/warn-allgemein.png",
    "Warnzeichen · W001",
    '<span class="term" data-de="Allgemeines Warnzeichen" data-vi="biển cảnh báo nguy hiểm chung">Allgemeines Warnzeichen</span> (Vorsicht!)',
    "Biển cảnh báo nguy hiểm chung (Tam giác vàng/đỏ)",
    "Weist in Betriebsanweisungen und auf Geräten auf eine allgemeine Gefahrenstelle hin: Bei Verwendung mancher Reinigungs- und Desinfektionsmittel Gebotszeichen beachten!",
    "Cảnh báo chú ý an toàn chung trên bảng hướng dẫn vận hành (Betriebsanweisung): Khi dùng chất tẩy rửa và khử trùng phải tuân thủ các biển hiệu lệnh bảo hộ!"
  )}
  ${symCard(
    "./images/symbole/gebot-augenschutz.png",
    "Gebotszeichen · M004",
    '<span class="term" data-de="Augenschutz tragen" data-vi="bắt buộc đeo kính bảo hộ">Augenschutz tragen</span> (Schutzbrille)',
    "Bắt buộc đeo kính bảo hộ mắt",
    "Beim Anmischen, Umfüllen oder Versprühen von ätzenden und reizenden Reinigungs-/Desinfektionsmitteln muss eine dicht schließende Schutzbrille getragen werden.",
    "Khi pha loãng, chiết rót hoặc xịt hóa chất tẩy rửa/khử trùng có tính ăn mòn, bắt buộc phải đeo kính bảo hộ che kín mắt."
  )}
</div>
`;

  /* =====================================================================
   * THEMA 2: Anwendungssymbole für die Entsorgung
   * ===================================================================== */
  const entsorgungContent = `
<div class="note">
  <b>Zweck der Entsorgungssymbole:</b> Nachstehende Symbole sind auf den Verpackungen angeführt, damit die <span class="term" data-de="Entsorgung" data-vi="xử lý / vứt bỏ rác thải đúng quy định">Entsorgung</span> von Reinigungs-, Pflege- und Desinfektionsmitteln korrekt und umweltschonend durchgeführt werden kann.
  <div class="vi">Các ký hiệu dưới đây được in trên bao bì hóa chất để nhân viên bếp và tạp vụ phân loại, xử lý vỏ chai và hóa chất thừa đúng quy định bảo vệ môi trường.</div>
</div>

<h3>Die 3 Anwendungssymbole für die Entsorgung</h3>
<div class="sym-grid">
  ${symCard(
    "./images/symbole/entsorgung-hausmuell.png",
    "Entsorgung · Restmüll",
    '<span class="term" data-de="Hausmüll" data-vi="rác sinh hoạt thông thường (Restmüll)">Hausmüll</span> (Restmülltonne)',
    "Rác sinh hoạt thông thường (Hausmüll / Restmüll)",
    "<b>Kann mit dem Restmüll entsorgt werden.</b> Restentleerte, ausgespülte Verpackungen oder ungefährliche Produkte dürfen in die normale Hausmüll-/Restmülltonne gegeben werden.",
    "<b>Có thể vứt cùng rác sinh hoạt (Restmüll).</b> Dùng cho sản phẩm không độc hại hoặc vỏ chai đã dùng cạn hoàn toàn theo hướng dẫn."
  )}
  ${symCard(
    "./images/symbole/entsorgung-sondermuell.png",
    "Entsorgung · Gefährlicher Abfall",
    '<span class="term" data-de="Sondermüll" data-vi="rác thải nguy hại / đặc biệt">Sondermüll</span>, <span class="term" data-de="Problemstoff" data-vi="chất thải độc hại cần xử lý riêng">Problemstoff</span> (Durchgestrichene Mülltonne)',
    "Rác thải đặc biệt / Chất thải nguy hại (Cấm bỏ thùng rác thường)",
    '<b>Nicht mit dem Restmüll entsorgen</b>, sondern in den <span class="term" data-de="Wertstoffhof" data-vi="trạm thu gom tái chế và rác đặc biệt">Wertstoffhof</span> oder zur <span class="term" data-de="Problemstoffsammelstelle" data-vi="điểm thu gom hóa chất nguy hại">Problemstoffsammelstelle</span> bringen; Gifte an den Abgeber bzw. an die Verkaufsstelle zurückgeben.',
    "<b>Không được vứt vào thùng rác sinh hoạt!</b> Phải mang tới trạm thu gom chất thải nguy hại (Wertstoffhof / Problemstoffsammelstelle); hóa chất độc phải trả lại nhà cung cấp hoặc nơi bán."
  )}
  ${symCard(
    "./images/symbole/entsorgung-kanalisation.png",
    "Entsorgung · Abwasserschutz",
    '<span class="term" data-de="Verbot der Beseitigung über die Kanalisation" data-vi="cấm đổ xuống cống thoát nước hoặc bồn cầu">Verbot der Beseitigung über die Kanalisation</span>',
    "Cấm đổ xuống cống thoát nước hoặc bồn cầu (WC / Ausguss)",
    "<b>Reste nicht in den Ausguss oder das WC leeren</b>, sondern mit dem Restmüll entsorgen oder dem Abgeber, der Verkaufsstelle, dem Sonderabfallsammler oder der Problemstoffsammelstelle übergeben.",
    "<b>Tuyệt đối không đổ phần hóa chất thừa xuống bồn rửa (Ausguss) hay bồn cầu (WC)!</b> Phải giao cho đơn vị thu gom rác nguy hại, điểm thu gom Problemstoff hoặc nhà cung cấp."
  )}
</div>

<h3>Praxis-Regeln für die Gastronomie (Küche & Wirtschaftsdienst)</h3>
<table>
  <tr><th>Grundregel</th><th>Erklärung im Betrieb</th><th>Tiếng Việt</th></tr>
  <tr>
    <td><b>Originalgebinde Pflicht</b></td>
    <td>Chemikalien <b>niemals</b> in Getränkeflaschen oder Lebensmittelbehälter umfüllen (Verwechslungsgefahr!).</td>
    <td><b>Tuyệt đối không</b> chiết hóa chất sang vỏ chai nước ngọt hoặc hộp đựng thực phẩm (nguy cơ uống nhầm chết người!).</td>
  </tr>
  <tr>
    <td><b>Restentleerung</b></td>
    <td>Nur vollständig entleerte („tropffreie“) Kanister gehören in die Wertstoffsammlung; Produktreste sind Sonderabfall.</td>
    <td>Chỉ can nhựa đã dùng cạn sạch mới được bỏ vào thùng tái chế; hóa chất còn thừa bên trong phải xử lý như rác nguy hại (Sondermüll).</td>
  </tr>
  <tr>
    <td><b>Altöl / Frittierfett</b></td>
    <td>Altes Frittierfett darf ebenfalls <b>nicht in den Ausguss</b> (verstopft Rohre, belastet Klärwerke) → Fettabscheider / Altfettsammler.</td>
    <td>Dầu chiên cũ (Altöl) cũng <b>cấm đổ xuống cống</b> (gây tắc đường ống, ô nhiễm trạm xử lý nước) → phải đổ vào thùng thu gom mỡ thải riêng.</td>
  </tr>
</table>
`;

  /* =====================================================================
   * THEMA 3: Sicherheitszeichen im Betrieb (Verbot, Gebot, Rettung, Brand)
   * ===================================================================== */
  const arbeitsschutzContent = `
<div class="note">
  <b>Systematik der Sicherheitszeichen (ASR A1.3 / ISO 7010):</b> Anhand von <b>Form</b> und <b>Farbe</b> erkennt man sofort die Bedeutung eines Schildes im Gastgewerbe — auch ohne Text!
  <div class="vi">Quy tắc nhận diện nhanh biển báo an toàn lao động trong khách sạn – nhà hàng dựa vào <b>Hình dáng</b> và <b>Màu sắc</b>:</div>
</div>

<table>
  <tr><th>Zeichenart</th><th>Form & Farbe</th><th>Bedeutung</th><th>Tiếng Việt</th></tr>
  <tr>
    <td><b><span class="term" data-de="Verbotszeichen" data-vi="biển cấm">Verbotszeichen</span></b></td>
    <td>Rund · weißer Grund · <b>roter Rand & Querbalken</b></td>
    <td>Untersagt eine gefährliche Handlung („Nicht tun!“).</td>
    <td><b>Biển cấm:</b> Hình tròn nền trắng, viền đỏ, gạch chéo đỏ (Cấm thực hiện hành vi gây nguy hiểm).</td>
  </tr>
  <tr>
    <td><b><span class="term" data-de="Gebotszeichen" data-vi="biển hiệu lệnh bắt buộc">Gebotszeichen</span></b></td>
    <td>Rund · <b>blauer Grund</b> · weißes Symbol</td>
    <td>Schreibt ein bestimmtes Verhalten oder Schutzausrüstung (PSA) zwingend vor („Muss man tun!“).</td>
    <td><b>Biển hiệu lệnh:</b> Hình tròn nền xanh dương, hình trắng (Bắt buộc phải thực hiện hoặc mang đồ bảo hộ PSA).</td>
  </tr>
  <tr>
    <td><b><span class="term" data-de="Warnzeichen" data-vi="biển cảnh báo nguy hiểm">Warnzeichen</span></b></td>
    <td>Dreieckig / Raute · <b>gelb oder weiß-rot</b></td>
    <td>Warnt vor einer Gefahr oder einem Gefahrstoff („Vorsicht!“).</td>
    <td><b>Biển cảnh báo:</b> Hình tam giác hoặc hình thoi GHS (Cảnh báo có mối nguy hiểm/hóa chất).</td>
  </tr>
  <tr>
    <td><b><span class="term" data-de="Rettungszeichen" data-vi="biển chỉ dẫn cứu hộ / sơ cứu">Rettungszeichen</span></b></td>
    <td>Quadratisch · <b>grüner Grund</b> · weißes Symbol</td>
    <td>Kennzeichnet Fluchtwege und Erste-Hilfe-Einrichtungen („Rettung & Hilfe“).</td>
    <td><b>Biển cứu hộ / sơ cứu:</b> Hình vuông nền xanh lá cây, hình trắng (Chỉ dẫn nơi sơ cứu, lối thoát hiểm).</td>
  </tr>
  <tr>
    <td><b><span class="term" data-de="Brandschutzzeichen" data-vi="biển phòng cháy chữa cháy">Brandschutzzeichen</span></b></td>
    <td>Quadratisch · <b>roter Grund</b> · weißes Symbol</td>
    <td>Kennzeichnet Standorte von Brandmelde- und Feuerlöschgeräten.</td>
    <td><b>Biển PCCC:</b> Hình vuông nền đỏ, hình trắng (Chỉ vị trí bình chữa cháy, vòi rồng, điện thoại báo cháy).</td>
  </tr>
</table>

<h3>A. Verbotszeichen (Rund · Roter Rand & Durchstreichung)</h3>
<div class="sym-grid">
  ${symCard(
    "./images/symbole/verbot-mobilfunk.png",
    "Verbot · P013",
    '<span class="term" data-de="Mobilfunk verboten" data-vi="cấm sử dụng điện thoại di động">Mobilfunk verboten</span>',
    "Cấm sử dụng điện thoại di động",
    "Eingeschaltete Mobiltelefone sind in diesem Bereich untersagt (Ablenkungsgefahr an gefährlichen Küchenmaschinen, Hygiene in Produktionsbereichen oder Störung empfindlicher Technik).",
    "Cấm bật/sử dụng điện thoại di động trong khu vực này (tránh mất tập trung khi đứng máy cắt thái, đảm bảo vệ sinh khu chế biến thực phẩm)."
  )}
  ${symCard(
    "./images/symbole/verbot-rauchen.png",
    "Verbot · P002",
    '<span class="term" data-de="Rauchen verboten" data-vi="cấm hút thuốc">Rauchen verboten</span>',
    "Cấm hút thuốc",
    "Rauchen ist aus Brandschutz- und Hygienegründen (Lebensmittelhygiene, Nichtraucherschutz) in Küche, Lager und Gastraum streng verboten.",
    "Cấm hút thuốc vì lý do phòng cháy nổ (kho gas, cồn) và vệ sinh an toàn thực phẩm trong bếp, kho hàng và phòng ăn."
  )}
  ${symCard(
    "./images/symbole/verbot-zutritt.png",
    "Verbot · P006",
    '<span class="term" data-de="Zutritt für Unbefugte verboten" data-vi="cấm người không có phận sự vào">Zutritt für Unbefugte verboten</span>',
    "Cấm người không có phận sự vào",
    "Betriebsfremde Personen (z. B. Gäste, Lieferanten ohne Begleitung) dürfen Küche, Kühlhäuser, Chemikalienlager und Personalräume aus Hygiene- und Sicherheitsgründen nicht betreten.",
    "Người ngoài (khách hàng, người lạ) không được tự ý vào khu vực bếp, kho lạnh, kho hóa chất để đảm bảo an toàn và vệ sinh HACCP."
  )}
  ${symCard(
    "./images/symbole/verbot-betreten.png",
    "Verbot · P024",
    '<span class="term" data-de="Betreten der Fläche verboten" data-vi="cấm giẫm / bước lên bề mặt này">Betreten der Fläche verboten</span>',
    "Cấm bước / giẫm lên bề mặt này",
    "Untersagt das Betreten von nicht tragfähigen Abdeckungen, Arbeitsplatten, Förderbändern oder frisch behandelten Gefahrenflächen (Sturz- und Einbruchgefahr!).",
    "Cấm đứng hoặc bước lên các bề mặt không chịu lực, bàn chế biến, băng chuyền hoặc nắp đậy (nguy cơ sập, ngã tai nạn lao động!)."
  )}
</div>

<h3>B. Gebotszeichen (Rund · Blauer Grund)</h3>
<div class="sym-grid">
  ${symCard(
    "./images/symbole/gebot-gebrauchsanweisung.png",
    "Gebot · M002",
    '<span class="term" data-de="Gebrauchsanweisung beachten" data-vi="bắt buộc đọc kỹ hướng dẫn sử dụng">Gebrauchsanweisung beachten</span>',
    "Bắt buộc đọc kỹ hướng dẫn sử dụng",
    "Vor dem Einsatz von Reinigungschemikalien oder Küchenmaschinen (Aufschnittmaschine, Kombidämpfer) muss die Betriebsanweisung / Dosieranleitung gelesen und befolgt werden.",
    "Trước khi dùng hóa chất tẩy rửa hoặc vận hành máy móc bếp (máy cắt thịt, lò hấp nướng), bắt buộc phải đọc kỹ hướng dẫn sử dụng và liều lượng pha."
  )}
  ${symCard(
    "./images/symbole/gebot-augen-gehoer.png",
    "Gebot · M003 + M004",
    '<span class="term" data-de="Augen- und Gehörschutz tragen" data-vi="bắt buộc đeo kính bảo hộ và chụp tai chống ồn">Augen- und Gehörschutz tragen</span>',
    "Bắt buộc đeo kính bảo hộ và chụp tai chống ồn",
    "Kombiniertes Gebotszeichen: Schützt Augen vor Chemikalienspritzern/Splittern und das Gehör vor schädlichem Lärm (z. B. an lauten Spülstraßen oder Flaschensortieranlagen).",
    "Biển hiệu lệnh kết hợp: Bắt buộc đeo kính chống văng bắn hóa chất và đeo chụp tai bảo vệ thính giác tại khu vực máy móc ồn lớn (dây chuyền rửa công nghiệp)."
  )}
  ${symCard(
    "./images/symbole/gebot-netzstecker.png",
    "Gebot · M021",
    '<span class="term" data-de="Vor dem Öffnen Netzstecker ziehen" data-vi="phải rút phích cắm điện trước khi mở máy">Vor dem Öffnen Netzstecker ziehen</span>',
    "Phải rút phích cắm điện trước khi mở máy / vệ sinh",
    "Lebenswichtige Sicherheitsregel in der Küche: Vor jeder Reinigung, Wartung oder Beseitigung einer Störung (z. B. Aufschnittmaschine, Kutter, Mixer) Gerät ausschalten und Stecker ziehen!",
    "Quy tắc sống còn trong bếp: Trước khi tháo mở để vệ sinh, bảo dưỡng hoặc gỡ kẹt máy (máy thái thịt, máy xay), bắt buộc phải rút phích cắm điện khỏi ổ!"
  )}
  ${symCard(
    "./images/symbole/gebot-handschutz.png",
    "Gebot · M009",
    '<span class="term" data-de="Handschutz tragen" data-vi="bắt buộc đeo găng tay bảo hộ">Handschutz tragen</span> (Schutzhandschuhe)',
    "Bắt buộc đeo găng tay bảo hộ",
    "Schutzhandschuhe tragen beim Umgang mit ätzenden/reizenden Reinigungs- und Desinfektionsmitteln (Chemikalienhandschuhe) oder beim Ausbeinen/Aufschneiden (Stechschutzhandschuh).",
    "Bắt buộc đeo găng tay bảo hộ khi tiếp xúc hóa chất tẩy rửa/khử trùng (găng chống hóa chất) hoặc khi lọc thịt/vệ sinh lưỡi dao (găng lưới thép chống cắt)."
  )}
</div>

<h3>C. Rettungszeichen / Erste Hilfe (Quadratisch · Grüner Grund)</h3>
<div class="sym-grid">
  ${symCard(
    "./images/symbole/rettung-erste-hilfe.png",
    "Rettung · E003",
    '<span class="term" data-de="Erste Hilfe" data-vi="nơi sơ cứu / tủ thuốc cấp cứu">Erste Hilfe</span>',
    "Trạm sơ cứu / Tủ đồ sơ cứu (Verbandkasten)",
    "Kennzeichnet den Standort des Verbandkastens (z. B. mit blauen detektierbaren Küchenpflastern!), des Erste-Hilfe-Raums oder des Verbandbuchs.",
    "Chỉ vị trí đặt tủ thuốc sơ cứu (trong bếp bắt buộc có băng cá nhân màu xanh dương để dễ phát hiện nếu rơi vào thức ăn!) và sổ ghi chép tai nạn (Verbandbuch)."
  )}
  ${symCard(
    "./images/symbole/rettung-krankentrage.png",
    "Rettung · E004",
    '<span class="term" data-de="Krankentrage" data-vi="cáng cứu thương">Krankentrage</span>',
    "Cáng cứu thương",
    "Weist auf den Aufbewahrungsort einer Krankentrage zum sicheren Transport verletzter oder bewusstloser Personen hin.",
    "Chỉ nơi cất giữ cáng cứu thương để di chuyển người bị nạn hoặc bất tỉnh an toàn."
  )}
  ${symCard(
    "./images/symbole/rettung-notdusche.png",
    "Rettung · E011",
    '<span class="term" data-de="Notdusche" data-vi="vòi tắm khẩn cấp">Notdusche</span> (Körpernotdusche)',
    "Vòi tắm khẩn cấp (Xả hóa chất toàn thân)",
    "Dient zum sofortigen Abspülen des gesamten Körpers und der Kleidung mit viel Wasser, wenn ätzende Chemikalien verschüttet wurden oder Kleidung Feuer gefangen hat.",
    "Dùng để xả ngập nước toàn thân ngay lập tức khi bị đổ hóa chất ăn mòn lên người hoặc khi quần áo bị bén lửa."
  )}
  ${symCard(
    "./images/symbole/rettung-augenspueler.png",
    "Rettung · E012",
    '<span class="term" data-de="Augenspüleinrichtung" data-vi="trạm / bình rửa mắt khẩn cấp">Augenspüleinrichtung</span>',
    "Thiết bị / Bình rửa mắt khẩn cấp",
    "Standort einer fest installierten Augendusche oder Augenspülflasche. Bei Chemikalienspritzern ins Auge sofort mindestens 10–15 Minuten bei geöffneten Lidern spülen und Arzt rufen!",
    "Chỉ vị trí vòi hoặc bình nước rửa mắt khẩn cấp. Khi hóa chất bắn vào mắt, phải mở mí mắt rửa liên tục ít nhất 10–15 phút rồi đưa đi bác sĩ nhãn khoa ngay!"
  )}
</div>

<h3>D. Brandschutzzeichen (Quadratisch · Roter Grund)</h3>
<p>Auf allen modernen Brandschutzzeichen ist rechts am Rand eine <b>weiße Flamme</b> abgebildet, damit sie auch bei Farbenblindheit sofort als Brandschutz erkannt werden.</p>
<div class="vi">Trên mọi biển báo PCCC chuẩn mới đều có hình <b>ngọn lửa màu trắng ở cạnh phải</b> để phân biệt rõ với biển cứu hộ ngay cả khi thiếu sáng.</div>

<div class="sym-grid">
  ${symCard(
    "./images/symbole/brand-telefon.png",
    "Brandschutz · F004",
    '<span class="term" data-de="Brandmeldetelefon" data-vi="điện thoại báo cháy khẩn cấp">Brandmeldetelefon</span>',
    "Điện thoại báo cháy khẩn cấp",
    "Kennzeichnet ein Telefon zur direkten Alarmierung der Feuerwehr (Notruf 112) oder der Sicherheitszentrale im Brandfall.",
    "Chỉ vị trí điện thoại chuyên dụng để gọi báo cháy trực tiếp cho đội cứu hỏa (số khẩn cấp 112) hoặc trung tâm an ninh tòa nhà."
  )}
  ${symCard(
    "./images/symbole/brand-leiter.png",
    "Brandschutz · F003",
    '<span class="term" data-de="Leiter" data-vi="thang chữa cháy">Leiter</span> (Feuerwehrleiter)',
    "Thang chữa cháy",
    "Kennzeichnet den Standort einer Leiter für die Brandbekämpfung oder Rettung im Brandfall.",
    "Chỉ nơi đặt thang chuyên dụng phục vụ công tác chữa cháy và cứu nạn."
  )}
  ${symCard(
    "./images/symbole/brand-loeschschlauch.png",
    "Brandschutz · F002",
    '<span class="term" data-de="Löschschlauch" data-vi="vòi rồng / cuộn vòi chữa cháy">Löschschlauch</span> (Wandhydrant)',
    "Cuộn vòi chữa cháy vách tường (Löschschlauch)",
    "Weist auf einen Wandhydranten mit angeschlossenem Wasserschlauch zur Brandbekämpfung hin (Achtung: niemals bei Fettbränden in der Fritteuse Wasser verwenden!).",
    "Chỉ vị trí hộp vòi nước chữa cháy vách tường (Lưu ý sống còn trong bếp: Tuyệt đối KHÔNG dùng nước dập đám cháy dầu mỡ chảo chiên/Fritteuse vì sẽ gây nổ cầu lửa!)."
  )}
  ${symCard(
    "./images/symbole/brand-feuerloescher.png",
    "Brandschutz · F001",
    '<span class="term" data-de="Feuerlöscher" data-vi="bình chữa cháy xách tay">Feuerlöscher</span>',
    "Bình chữa cháy xách tay",
    "Kennzeichnet den Standort eines tragbaren Feuerlöschers (in der Küche zusätzlich spezieller <b>Fettbrandlöscher – Brandklasse F</b> für Fritteusen und Bratgeräte Pflicht!).",
    "Chỉ vị trí bình chữa cháy xách tay (trong bếp nhà hàng bắt buộc phải trang bị bình chữa cháy mỡ chuyên dụng <b>Fettbrandlöscher – Phân loại F</b> cho bếp chiên!)."
  )}
</div>
`;

  /* =====================================================================
   * THEMA 4: Symbole für die Pflegebehandlung von Textilien
   * ===================================================================== */
  const textilpflegeContent = `
<div class="note">
  <b>Die 5 Grundsymbole der Textilpflege (GINETEX / ISO 3758):</b> Auf jedem Pflegeetikett von Tischdecken, Stoffservietten, Kochjacken und Schürzen stehen die Symbole immer in derselben Reihenfolge:
  <br><b>1. Waschen (Waschbottich)</b> → <b>2. Bleichen (Dreieck)</b> → <b>3. Trocknen (Quadrat mit Kreis)</b> → <b>4. Bügeln (Bügeleisen)</b> → <b>5. Professionelle Textilpflege (Kreis)</b>.
  <div class="vi">Trên nhãn mác khăn trải bàn, khăn ăn, áo bếp và đồng phục nhà hàng, 5 ký hiệu giặt ủi luôn xếp theo đúng thứ tự cố định: <b>1. Giặt (Chậu nước) → 2. Tẩy trắng (Tam giác) → 3. Sấy (Hình vuông có vòng tròn) → 4. Ủi/Là (Bàn ủi) → 5. Giặt khô (Vòng tròn)</b>.</div>
</div>

<h3>1. Waschen (<span class="term" data-de="Waschbottich" data-vi="biểu tượng chậu giặt">Waschbottich</span>)</h3>
<p>Die <b>Zahlen</b> im Waschbottich entsprechen den <b>maximalen Waschtemperaturen</b> in °C, die nicht überschritten werden dürfen. Der <b>Balken</b> unterhalb des Waschbottichs verlangt nach einer (mechanisch) milderen Behandlung (<span class="term" data-de="Schonwaschgang" data-vi="chế độ giặt nhẹ">Schonwaschgang</span>, geringere Trommeldrehung & sanftes Schleudern).</p>
<div class="vi"><b>Con số</b> trong chậu nước chỉ <b>nhiệt độ nước giặt tối đa (°C)</b> không được vượt quá. <b>Vạch ngang dưới đáy chậu</b> yêu cầu chế độ <b>giặt nhẹ (Schonwaschgang)</b> — giảm lực quay cơ học và vắt nhẹ cho vải nhạy cảm.</div>

<div class="sym-grid">
  ${symCard(
    "./images/symbole/waschen-allgemein.png",
    "Grundsymbol · Waschen",
    '<span class="term" data-de="Waschen" data-vi="giặt bằng nước (chậu giặt)">Waschen</span> (Waschbottich)',
    "Biểu tượng gốc: Giặt nước (Chậu giặt)",
    "Stellt einen mit Wasser gefüllten Waschbottich dar. Gibt an, ob das Textil in der Waschmaschine oder von Hand gewaschen werden darf.",
    "Hình chậu nước có sóng nước bên trong: cho biết loại vải này có được phép giặt bằng nước (máy hoặc tay) hay không."
  )}
  ${symCard(
    "./images/symbole/waschen-95.png",
    "Waschen · 95 °C",
    '95 °C <span class="term" data-de="Normalwaschgang" data-vi="chế độ giặt thường">Normalwaschgang</span> (Kochwäsche)',
    "Giặt thường tối đa 95 °C (Giặt nước sôi tiệt trùng)",
    "Waschen bis max. 95 °C im Normalprogramm. Typisch für weiße Baumwoll-Tischwäsche, Geschirrtücher (Handtücher) und weiße Kochjacken zur hygienischen Keimabtötung.",
    "Giặt máy chế độ thường ở nhiệt độ tối đa 95 °C. Dùng cho khăn trải bàn trắng bằng cotton, khăn lau bếp và áo bếp trắng để diệt khuẩn và tẩy vết bẩn cứng đầu."
  )}
  ${symCard(
    "./images/symbole/waschen-60.png",
    "Waschen · 60 °C",
    "60 °C Normalwaschgang",
    "Giặt thường tối đa 60 °C",
    "Waschen bis max. 60 °C mit normaler Mechanik und normalem Schleudern (z. B. farbige Tischwäsche, Schürzen, Bettwäsche).",
    "Giặt máy chế độ thường tối đa 60 °C (dùng cho khăn bàn màu bền màu, tạp dề, ga trải giường khách sạn)."
  )}
  ${symCard(
    "./images/symbole/waschen-60-schon.png",
    "Waschen · 60 °C + Balken",
    "60 °C Schonwaschgang (Pflegeleicht)",
    "Giặt nhẹ tối đa 60 °C (Có 1 vạch ngang dưới chậu)",
    "Maximal 60 °C, aber mit reduzierter mechanischer Beanspruchung (weniger Trommelbewegung, reduzierte Schleuderdrehzahl) für pflegeleichte Mischgewebe.",
    "Nhiệt độ tối đa 60 °C nhưng ở chế độ giặt nhẹ (quay lồng nhẹ hơn, giảm tốc độ vắt) dành cho vải pha chống nhăn (Mischgewebe)."
  )}
  ${symCard(
    "./images/symbole/waschen-40.png",
    "Waschen · 40 °C",
    "40 °C Normalwaschgang",
    "Giặt thường tối đa 40 °C",
    "Waschen bis max. 40 °C im Normalwaschgang (für normal verschmutzte Buntwäsche und Servicekleidung aus Baumwolle/Mischfaser).",
    "Giặt thường tối đa 40 °C (dùng cho quần áo màu, đồng phục nhân viên phục vụ bằng vải cotton hoặc vải tổng hợp)."
  )}
  ${symCard(
    "./images/symbole/waschen-40-schon.png",
    "Waschen · 40 °C + Balken",
    "40 °C Schonwaschgang",
    "Giặt nhẹ tối đa 40 °C (Có 1 vạch ngang dưới chậu)",
    "Waschen bis max. 40 °C mit schonender Mechanik (weniger Beladung, sanftes Schleudern) für empfindliche Synthetik- oder Mischfasern.",
    "Giặt nhẹ tối đa 40 °C (giảm lượng đồ trong lồng giặt, vắt nhẹ) dành cho vải sợi tổng hợp hoặc vải mỏng."
  )}
  ${symCard(
    "./images/symbole/waschen-30.png",
    "Waschen · 30 °C",
    "30 °C Normalwaschgang",
    "Giặt thường tối đa 30 °C",
    "Waschen bei niedriger Temperatur (max. 30 °C) im Normalprogramm für temperaturempfindliche Textilien.",
    "Giặt thường ở nhiệt độ thấp tối đa 30 °C cho các loại vải nhạy cảm với nhiệt độ cao."
  )}
  ${symCard(
    "./images/symbole/waschen-30-schon.png",
    "Waschen · 30 °C + Balken",
    "30 °C Schonwaschgang",
    "Giặt nhẹ tối đa 30 °C (Có 1 vạch ngang dưới chậu)",
    "Sehr schonendes Waschen bei max. 30 °C (Feinwäsche, z. B. empfindliche Dekostoffe, Gardinen oder feine Weste).",
    "Giặt nhẹ ở tối đa 30 °C (chế độ đồ mỏng/Feinwäsche như rèm cửa, khăn trang trí hoặc áo gile phục vụ)."
  )}
  ${symCard(
    "./images/symbole/waschen-hand.png",
    "Waschen · Hand",
    '<span class="term" data-de="Handwäsche" data-vi="chỉ giặt bằng tay">Handwäsche</span>',
    "Chỉ giặt bằng tay (Tối đa 40 °C)",
    "Darf nicht in der normalen Waschmaschine gewaschen werden: Nur von Hand bei lauwarmem Wasser (max. 40 °C) vorsichtig durchdrücken, nicht reiben oder wringen.",
    "Chỉ được giặt nhẹ nhàng bằng tay với nước ấm (tối đa 40 °C), không vò mạnh hoặc vắt xoắn."
  )}
  ${symCard(
    "./images/symbole/waschen-nicht.png",
    "Waschen · Verbot",
    '<span class="term" data-de="nicht waschen" data-vi="không được giặt nước">nicht waschen</span>',
    "Không được giặt bằng nước",
    "Das Textil verträgt keine Nasswäsche (läuft ein, verzieht sich oder verliert seine Beschichtung) → muss ggf. professionell chemisch gereinigt werden.",
    "Tuyệt đối không được giặt nước (vải sẽ bị co rút, biến dạng hoặc hỏng lớp phủ) → phải chuyển sang giặt khô chuyên nghiệp nếu cho phép."
  )}
</div>

<h3>2. Bleichen (Dreieck)</h3>
<div class="sym-grid">
  ${symCard(
    "./images/symbole/bleichen-allgemein.png",
    "Bleichen · Alle Mittel",
    '<span class="term" data-de="Chlor- und Sauerstoffbleiche zulässig" data-vi="cho phép tẩy bằng cả Clo và Oxy">Chlor- und Sauerstoffbleiche zulässig</span>',
    "Cho phép tẩy trắng bằng cả Clo và Oxy",
    "Leeres Dreieck: Das Textil darf bei Bedarf sowohl mit Chlorbleiche als auch mit Sauerstoffbleiche gebleicht werden (nur bei robuster Weißwäsche).",
    "Tam giác rỗng: Cho phép dùng mọi loại thuốc tẩy trắng (cả thuốc tẩy gốc Clo lẫn gốc Oxy)."
  )}
  ${symCard(
    "./images/symbole/bleichen-sauerstoff.png",
    "Bleichen · Nur Sauerstoff",
    '<span class="term" data-de="nur Sauerstoffbleiche zulässig" data-vi="chỉ được tẩy bằng Oxy, cấm tẩy Clo">nur Sauerstoffbleiche zulässig</span> / keine Chlorbleiche',
    "Chỉ được tẩy bằng Oxy / Cấm tẩy bằng Clo",
    "Dreieck mit zwei schrägen Streifen: Nur sauerstoffbasierte Bleichmittel erlaubt! Chlorbleiche würde die Faser oder Farbe zerstören.",
    "Tam giác có 2 vạch chéo song song: Chỉ được dùng chất tẩy gốc Oxy! Cấm dùng thuốc tẩy Clo vì sẽ làm mục vải hoặc bay màu."
  )}
  ${symCard(
    "./images/symbole/bleichen-nicht.png",
    "Bleichen · Verbot",
    '<span class="term" data-de="nicht bleichen" data-vi="không được tẩy trắng">nicht bleichen</span>',
    "Không được tẩy trắng",
    "Durchgestrichenes Dreieck: Keinerlei Bleichmittel (weder Chlor noch Sauerstoff) und keine bleichhaltigen Vollwaschmittel verwenden!",
    "Tam giác bị gạch chéo: Cấm dùng mọi loại chất tẩy trắng (chỉ dùng bột giặt cho đồ màu Buntwaschmittel không chứa chất tẩy)."
  )}
</div>

<h3>3. Tumbler-Trocknung (<span class="term" data-de="Trockentrommel" data-vi="máy sấy lồng quay (Tumbler)">Trockentrommel</span>)</h3>
<p>Das Quadrat mit eingeschriebenem Kreis symbolisiert den Wäschetrockner (Tumbler). Die <b>Punkte</b> im Kreis geben die erlaubte Trocknungstemperatur an.</p>
<div class="vi">Hình vuông có vòng tròn bên trong tượng trưng cho máy sấy lồng quay (Tumbler). Số <b>chấm tròn</b> ở giữa cho biết mức nhiệt độ sấy cho phép.</div>

<div class="sym-grid">
  ${symCard(
    "./images/symbole/trocknen-allgemein.png",
    "Grundsymbol · Trocknen",
    "Tumbler-Trocknung (Trockentrommel)",
    "Biểu tượng gốc: Sấy bằng máy sấy lồng quay",
    "Quadrat mit Kreis: Grundsymbol für das maschinelle Trocknen im Wäschetrockner (Tumbler).",
    "Hình vuông chứa hình tròn: Ký hiệu cơ bản chỉ việc làm khô bằng máy sấy quần áo."
  )}
  ${symCard(
    "./images/symbole/trocknen-normal.png",
    "Trocknen · 2 Punkte",
    '<span class="term" data-de="Trocknen mit normaler thermischer Beanspruchung" data-vi="sấy máy ở nhiệt độ thường">Trocknen mit normaler thermischer Beanspruchung</span>',
    "Sấy máy ở nhiệt độ thường (2 chấm · ~80 °C)",
    "Zwei Punkte im Trocknersymbol: Trocknen im Tumbler bei normaler Temperatur (bis ca. 80 °C) ohne Einschränkung möglich.",
    "Có 2 chấm tròn ở giữa: Cho phép sấy bằng máy sấy ở mức nhiệt độ bình thường (tối đa khoảng 80 °C)."
  )}
  ${symCard(
    "./images/symbole/trocknen-schonend.png",
    "Trocknen · 1 Punkt",
    '<span class="term" data-de="Trocknen mit reduzierter thermischer Beanspruchung" data-vi="sấy máy ở nhiệt độ thấp (sấy nhẹ)">Trocknen mit reduzierter thermischer Beanspruchung</span>',
    "Sấy máy ở nhiệt độ thấp / Sấy nhẹ (1 chấm · ~60 °C)",
    "Ein Punkt im Trocknersymbol: Schontrocknen bei niedriger Temperatur (max. ca. 60 °C) für hitzeempfindliche Gewebe.",
    "Có 1 chấm tròn ở giữa: Chỉ được sấy nhẹ ở nhiệt độ thấp (khoảng 60 °C) để tránh co rút hoặc hỏng sợi vải."
  )}
  ${symCard(
    "./images/symbole/trocknen-nicht.png",
    "Trocknen · Verbot",
    '<span class="term" data-de="Trocknen im Tumbler nicht möglich" data-vi="không được sấy bằng máy sấy">Trocknen im Tumbler nicht möglich</span>',
    "Không được sấy bằng máy sấy lồng quay",
    "Durchgestrichene Trockentrommel: Nicht im Wäschetrockner trocknen (Einlauf- oder Hitzeschadengefahr) — nur an der Luft trocknen!",
    "Máy sấy bị gạch chéo: Cấm cho vào máy sấy (sẽ bị co rút hoặc chảy sợi) — chỉ được phơi khô tự nhiên!"
  )}
</div>

<h3>4. Bügeln (<span class="term" data-de="Bügeleisen" data-vi="bàn ủi / bàn là">Bügeleisen</span>)</h3>
<p>Die <b>Punkte</b> im Bügeleisen stehen für die maximale Bügeltemperatur (in Großwäschereien für Tischwäsche erfolgt das Glätten oft über eine erhitzte <span class="term" data-de="Heißmangel" data-vi="máy cán là phẳng khăn bàn bằng trục nóng">Heißmangel</span>).</p>
<div class="vi">Số <b>chấm tròn</b> trong bàn ủi chỉ mức nhiệt độ ủi tối đa (với khăn trải bàn nhà hàng, việc là phẳng thường dùng máy cán trục nóng <b>Heißmangel</b>).</div>

<div class="sym-grid">
  ${symCard(
    "./images/symbole/buegeln-allgemein.png",
    "Grundsymbol · Bügeln",
    "Bügeln (Bügeleisen)",
    "Biểu tượng gốc: Ủi / Là (Bàn ủi)",
    "Grundsymbol für das Bügeln und Heißmangeln von Textilien.",
    "Biểu tượng chiếc bàn ủi: Chỉ dẫn chế độ ủi/là phẳng vải."
  )}
  ${symCard(
    "./images/symbole/buegeln-heiss.png",
    "Bügeln · 3 Punkte",
    '<span class="term" data-de="heiß bügeln" data-vi="ủi ở nhiệt độ cao (~200 °C)">heiß bügeln</span> (3 Punkte · bis ca. 200 °C)',
    "Ủi nhiệt độ cao (3 chấm · tối đa ~200 °C)",
    "Drei Punkte: Heiß bügeln oder mangeln erlaubt (für reine Baumwolle und Leinen, z. B. Damast-Tischdecken und Stoffservietten).",
    "Bàn ủi 3 chấm: Cho phép ủi rất nóng (~200 °C), phù hợp cho vải bông (Baumwolle) và vải lanh (Leinen) như khăn bàn Damast, khăn ăn."
  )}
  ${symCard(
    "./images/symbole/buegeln-maessig.png",
    "Bügeln · 2 Punkte",
    '<span class="term" data-de="mäßig heiß bügeln" data-vi="ủi ở nhiệt độ vừa phải (~150 °C)">mäßig heiß bügeln</span> (2 Punkte · bis ca. 150 °C)',
    "Ủi nhiệt độ trung bình (2 chấm · tối đa ~150 °C)",
    "Zwei Punkte: Mäßig heiß bügeln (für Wolle, Seide, Polyester und Mischgewebe, z. B. Kellnerwesten oder Bistroschürzen).",
    "Bàn ủi 2 chấm: Ủi ấm vừa phải (~150 °C), dùng cho len, lụa, polyester và vải pha (đồng phục, tạp dề phục vụ)."
  )}
  ${symCard(
    "./images/symbole/buegeln-nicht-heiss.png",
    "Bügeln · 1 Punkt",
    '<span class="term" data-de="nicht heiß bügeln" data-vi="ủi nhiệt độ thấp (~110 °C), cẩn thận với hơi nước">nicht heiß bügeln</span> (1 Punkt · bis ca. 110 °C)',
    "Ủi nhiệt độ thấp (1 chấm · ~110 °C · Cẩn thận khi dùng hơi nước)",
    "Ein Punkt: Nur bei niedriger Temperatur bügeln. <b>Vorsicht beim Bügeln mit Dampf</b> (für empfindliche Chemiefasern wie Polyacryl, Polyamid, Acetat).",
    "Bàn ủi 1 chấm: Chỉ ủi ở nhiệt độ thấp (~110 °C), <b>thận trọng khi ủi hơi nước</b> (dành cho sợi tổng hợp nhạy cảm nhiệt)."
  )}
  ${symCard(
    "./images/symbole/buegeln-nicht.png",
    "Bügeln · Verbot",
    '<span class="term" data-de="nicht bügeln" data-vi="không được ủi / là">nicht bügeln</span>',
    "Không được ủi / là",
    "Durchgestrichenes Bügeleisen: Das Textil darf nicht gebügelt oder heißgemangelt werden.",
    "Bàn ủi gạch chéo: Tuyệt đối không được ủi hoặc cho qua máy cán nóng."
  )}
</div>

<h3>5. Textilpflege / Professionelle Reinigung (<span class="term" data-de="Reinigungstrommel" data-vi="lồng giặt khô chuyên nghiệp">Reinigungstrommel</span>)</h3>
<p>Die <b>Buchstaben (P, F)</b> im Kreis sind für den professionellen <span class="term" data-de="Chemischreiniger" data-vi="tiệm giặt khô hóa chất chuyên nghiệp">Chemischreiniger</span> bestimmt: Sie geben einen Hinweis auf die in Frage kommenden <span class="term" data-de="Lösemittel" data-vi="dung môi giặt khô">Lösemittel</span>. Der <b>Balken</b> unterhalb des Kreises verlangt bei der Reinigung nach einer Beschränkung der mechanischen Beanspruchung, der Feuchtigkeitszugabe und/oder der Temperatur.</p>
<div class="vi"><b>Chữ cái (P, F)</b> trong vòng tròn dành cho tiệm <b>giặt khô hóa chất chuyên nghiệp</b>, chỉ loại <b>dung môi (Lösemittel)</b> được phép dùng. <b>Vạch ngang dưới vòng tròn</b> yêu cầu hạn chế tác động cơ học, độ ẩm và/hoặc nhiệt độ khi giặt khô.</div>

<div class="sym-grid">
  ${symCard(
    "./images/symbole/reinigung-allgemein.png",
    "Grundsymbol · Reinigung",
    "Professionelle Textilpflege (Reinigungstrommel)",
    "Biểu tượng gốc: Giặt khô chuyên nghiệp (Vòng tròn)",
    "Leerer Kreis: Symbolisiert die Reinigungstrommel für die professionelle chemische Reinigung.",
    "Vòng tròn rỗng: Tượng trưng cho lồng giặt khô tại các tiệm giặt là chuyên nghiệp."
  )}
  ${symCard(
    "./images/symbole/reinigung-p.png",
    "Chemischreinigung · P",
    "Reinigung mit Perchlorethylen (P) – Normal",
    "Giặt khô thường với dung môi P (Perchlorethylen)",
    "Buchstabe <b>P</b> im Kreis: Professionelle Trockenreinigung mit Perchlorethylen oder Kohlenwasserstoffen im Normalverfahren zulässig.",
    "Chữ <b>P</b> trong vòng tròn: Cho phép giặt khô bằng dung môi Perchlorethylen (hoặc Kohlenwasserstoff) ở quy trình thông thường."
  )}
  ${symCard(
    "./images/symbole/reinigung-p-schon.png",
    "Chemischreinigung · P + Balken",
    "Reinigung mit Perchlorethylen (P) – Schonend",
    "Giặt khô nhẹ với dung môi P (Có vạch ngang bên dưới)",
    "Buchstabe <b>P</b> mit Balken darunter: Chemischreinigung mit Perchlorethylen, jedoch mit strenger Beschränkung von Mechanik, Feuchtigkeitszugabe und Temperatur.",
    "Chữ <b>P</b> có 1 vạch ngang dưới: Giặt khô bằng dung môi P nhưng phải giảm tác động cơ học, hạn chế độ ẩm và nhiệt độ."
  )}
  ${symCard(
    "./images/symbole/reinigung-f.png",
    "Chemischreinigung · F",
    "Reinigung mit Kohlenwasserstofflösungsmitteln (F) – Normal",
    "Giặt khô thường với dung môi F (Kohlenwasserstoff)",
    "Buchstabe <b>F</b> im Kreis: Nur mildere Kohlenwasserstofflösungsmittel zulässig (kein Perchlorethylen!).",
    "Chữ <b>F</b> trong vòng tròn: Chỉ được giặt khô bằng dung môi nhẹ Kohlenwasserstoff (không được dùng Perchlorethylen!)."
  )}
  ${symCard(
    "./images/symbole/reinigung-f-schon.png",
    "Chemischreinigung · F + Balken",
    "Reinigung mit Kohlenwasserstofflösungsmitteln (F) – Schonend",
    "Giặt khô nhẹ với dung môi F (Có vạch ngang bên dưới)",
    "Buchstabe <b>F</b> mit Balken darunter: Schonende Reinigung mit Kohlenwasserstofflösungsmitteln (reduzierte Mechanik, Feuchtigkeit und Temperatur).",
    "Chữ <b>F</b> có 1 vạch ngang dưới: Giặt khô nhẹ bằng dung môi Kohlenwasserstoff (hạn chế cơ học, độ ẩm và nhiệt độ)."
  )}
  ${symCard(
    "./images/symbole/reinigung-nicht.png",
    "Chemischreinigung · Verbot",
    '<span class="term" data-de="keine Chemischreinigung möglich" data-vi="không được giặt khô bằng hóa chất">keine Chemischreinigung möglich</span>',
    "Không được giặt khô bằng hóa chất",
    "Durchgestrichener Kreis: Das Textil darf nicht chemisch mit organischen Lösemitteln gereinigt werden.",
    "Vòng tròn bị gạch chéo: Cấm giặt khô bằng dung môi hóa chất."
  )}
</div>
`;

  /* =====================================================================
   * EXPORT FACH OBJECT
   * ===================================================================== */
  w.SYMBOLE_FACH = {
    id: "symbole",
    code: "SYM",
    name: "Symbole & Piktogramme",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 12l10 10 10-10L12 2z"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    accent: "#B45309",
    soft: "#FDF8EE",
    teacher: "Hygiene · Arbeitsschutz · Wirtschaftsdienst",
    ready: true,
    desc: "Alle prüfungsrelevanten Symbole einzeln ausgeschnitten & erklärt: GHS-Gefahrensymbole, Entsorgung, Verbots-/Gebots-/Rettungs-/Brandschutzzeichen & Textilpflege.",
    groups: [
      {
        id: "ghs-entsorgung",
        badge: "Teil 1 · Chemie & Umwelt",
        title: "GHS-Gefahrensymbole & Entsorgung",
        items: [
          {
            id: "sym-ghs",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 12l10 10 10-10L12 2z"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
            name: "1. GHS-Gefahrensymbole für Chemikalien",
            desc: "Physikalische Gefahren · Gesundheitsgefahren · Umweltgefahren · Signalwörter Gefahr & Achtung",
            pages: { folder: "images/scans/symbole", from: 1, to: 3, prefix: "symbole" },
            content: ghsContent,
            qa: [
              {
                q: "Wofür steht die Abkürzung GHS und seit wann ist sie verpflichtend?",
                qVi: "Chữ viết tắt GHS nghĩa là gì và bắt buộc áp dụng từ khi nào?",
                a: "GHS steht für „Globally Harmonised System of Classification and Labelling of Chemicals“. Seit dem 1. Dezember 2012 müssen gefährliche chemische Stoffe damit gekennzeichnet sein.",
                aVi: "GHS là Hệ thống phân loại và ghi nhãn hóa chất hài hòa toàn cầu, bắt buộc áp dụng từ ngày 01.12.2012.",
                why: "Giúp nhận diện thống nhất nguy cơ hóa chất trên toàn thế giới.",
                src: "Lehrbuch S. 123"
              },
              {
                q: "In welche 3 Hauptgruppen werden die GHS-Gefahrensymbole eingeteilt?",
                qVi: "Các biểu tượng nguy hiểm GHS được chia thành 3 nhóm chính nào?",
                a: "1. Physikalische Gefahren (z. B. entzündlich, explosiv, komprimierte Gase, brandfördernd, ätzend auf Metalle)\n2. Gesundheitsgefahren (z. B. akute Toxizität, Ätzwirkung auf die Haut, gesundheitsschädlich, systemische Gefährdung)\n3. Umweltgefahren (gewässergefährdend).",
                aVi: "1. Nguy hiểm vật lý (Physikalische Gefahren)\n2. Nguy hiểm sức khỏe (Gesundheitsgefahren)\n3. Nguy hiểm môi trường (Umweltgefahren).",
                why: "Phân loại chuẩn trên trang 123 sách giáo khoa.",
                src: "Lehrbuch S. 123"
              },
              {
                q: "Welche persönliche Schutzausrüstung (PSA) ist beim Umgang mit ätzenden Reinigern vorgeschrieben?",
                qVi: "Trang bị bảo hộ cá nhân (PSA) nào bắt buộc khi dùng chất tẩy rửa ăn mòn (ätzend)?",
                a: "Schutzhandschuhe (Handschutz) und eine Schutzbrille (Augenschutz) müssen getragen werden (Gebotszeichen beachten!).",
                aVi: "Bắt buộc phải đeo găng tay bảo hộ (Schutzhandschuhe) và kính bảo hộ mắt (Augenschutz).",
                why: "Ngăn ngừa bỏng hóa chất trên da và mù mắt khi hóa chất bắn vào.",
                src: "Lehrbuch S. 123"
              }
            ],
            vokabeln: [
              { de: "das Gefahrensymbol", vi: "biểu tượng cảnh báo nguy hiểm" },
              { de: "die Explosionsgefahr", vi: "nguy cơ nổ (GHS01)" },
              { de: "entzündlich", vi: "dễ cháy / bắt lửa (GHS02)" },
              { de: "brandfördernd", vi: "chất oxy hóa hỗ trợ cháy (GHS03)" },
              { de: "komprimierte Gase", vi: "khí nén dưới áp suất (GHS04)" },
              { de: "ätzend / die Ätzwirkung", vi: "ăn mòn kim loại / ăn mòn da và mắt (GHS05)" },
              { de: "die akute Toxizität", vi: "độc tính cấp / chất kịch độc (GHS06)" },
              { de: "gesundheitsschädlich", vi: "có hại cho sức khỏe / gây kích ứng (GHS07)" },
              { de: "die systemische Gefährdung", vi: "nguy hại hệ thống / nội tạng lâu dài (GHS08)" },
              { de: "gewässergefährdend", vi: "nguy hại cho nguồn nước và thủy sinh (GHS09)" }
            ]
          },
          {
            id: "sym-entsorgung",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
            name: "2. Anwendungssymbole für die Entsorgung",
            desc: "Hausmüll (Restmüll) · Sondermüll / Problemstoff · Verbot der Beseitigung über die Kanalisation",
            pages: { folder: "images/scans/symbole", from: 1, to: 1, prefix: "symbole" },
            content: entsorgungContent,
            qa: [
              {
                q: "Was bedeutet das Symbol mit der durchgestrichenen Mülltonne auf einer Chemikalienverpackung?",
                qVi: "Biểu tượng thùng rác bị gạch chéo trên vỏ bình hóa chất có nghĩa là gì?",
                a: "Sondermüll / Problemstoff: Nicht mit dem Restmüll entsorgen, sondern in den Wertstoffhof oder zur Problemstoffsammelstelle bringen (Gifte an den Abgeber bzw. die Verkaufsstelle zurückgeben).",
                aVi: "Rác thải nguy hại (Sondermüll/Problemstoff): Không được vứt vào thùng rác sinh hoạt mà phải mang đến Wertstoffhof, điểm thu gom chất thải nguy hại hoặc trả lại nơi bán.",
                why: "Tránh rò rỉ hóa chất độc hại ra môi trường khi xử lý rác sinh hoạt.",
                src: "Lehrbuch S. 123"
              },
              {
                q: "Was schreibt das Symbol „Verbot der Beseitigung über die Kanalisation“ vor?",
                qVi: "Biểu tượng 'Cấm xả xuống hệ thống cống thoát nước' quy định điều gì?",
                a: "Reste dürfen nicht in den Ausguss oder das WC geleert werden, sondern müssen dem Sonderabfallsammler, der Problemstoffsammelstelle oder der Verkaufsstelle übergeben werden.",
                aVi: "Không được đổ hóa chất thừa xuống bồn rửa (Ausguss) hay bồn cầu (WC), phải giao cho đơn vị thu gom chất thải nguy hại.",
                why: "Bảo vệ nguồn nước và hệ thống vi sinh tại nhà máy xử lý nước thải.",
                src: "Lehrbuch S. 123"
              }
            ],
            vokabeln: [
              { de: "die Entsorgung", vi: "việc xử lý / vứt bỏ rác thải" },
              { de: "der Hausmüll / der Restmüll", vi: "rác thải sinh hoạt thông thường" },
              { de: "der Sondermüll", vi: "rác thải đặc biệt / nguy hại" },
              { de: "der Problemstoff", vi: "chất thải độc hại cần thu gom riêng" },
              { de: "der Wertstoffhof", vi: "trạm thu gom rác tái chế và rác đặc biệt" },
              { de: "die Problemstoffsammelstelle", vi: "điểm tập kết hóa chất nguy hại" },
              { de: "die Kanalisation", vi: "hệ thống cống thoát nước" },
              { de: "der Ausguss", vi: "miệng cống / bồn đổ nước thải" }
            ]
          }
        ]
      },
      {
        id: "arbeitsschutz",
        badge: "Teil 2 · Arbeitssicherheit",
        title: "Sicherheitszeichen im Betrieb (ASR A1.3)",
        items: [
          {
            id: "sym-arbeitsschutz",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
            name: "3. Verbots-, Gebots-, Rettungs- & Brandschutzzeichen",
            desc: "16 Sicherheitszeichen: Rot-Rund (Verbot) · Blau-Rund (Gebot) · Grün-Quadrat (Rettung) · Rot-Quadrat (Brandschutz)",
            pages: { folder: "images/scans/symbole", from: 2, to: 3, prefix: "symbole" },
            content: arbeitsschutzContent,
            qa: [
              {
                q: "Wie unterscheidet man Verbots-, Gebots-, Rettungs- und Brandschutzzeichen anhand von Form und Farbe?",
                qVi: "Làm sao phân biệt biển cấm, biển hiệu lệnh, biển cứu hộ và biển PCCC qua hình dáng và màu sắc?",
                a: "• Verbotszeichen: Rund, weißer Grund, roter Rand mit rotem Querbalken.\n• Gebotszeichen: Rund, blauer Grund, weißes Symbol.\n• Rettungszeichen: Quadratisch/rechteckig, grüner Grund, weißes Symbol.\n• Brandschutzzeichen: Quadratisch, roter Grund, weißes Symbol (mit weißer Flamme).",
                aVi: "• Biển cấm: Tròn, nền trắng, viền đỏ + gạch chéo đỏ.\n• Biển hiệu lệnh: Tròn, nền xanh dương, hình trắng.\n• Biển cứu hộ/sơ cứu: Vuông, nền xanh lá, hình trắng.\n• Biển PCCC: Vuông, nền đỏ, hình trắng (có ngọn lửa trắng bên phải).",
                why: "Câu hỏi kinh điển trong đề thi Zwischenprüfung và WiKo/BfK.",
                src: "Arbeitsblatt Sicherheitszeichen"
              },
              {
                q: "Welche Maßnahme ist vor dem Öffnen oder Reinigen einer elektrischen Küchenmaschine (z. B. Aufschnittmaschine) zwingend erforderlich?",
                qVi: "Trước khi tháo mở hoặc vệ sinh máy móc điện trong bếp (vd: máy cắt thịt), bắt buộc phải làm gì?",
                a: "Vor dem Öffnen Netzstecker ziehen! (Gebotszeichen beachten, um Stromschlag und Schnittverletzungen durch unbeabsichtigtes Anlaufen zu verhindern).",
                aVi: "Phải rút phích cắm điện trước khi mở máy (Vor dem Öffnen Netzstecker ziehen) để tránh điện giật và tránh máy tự chạy gây đứt tay.",
                why: "Nguyên tắc an toàn lao động bắt buộc.",
                src: "Arbeitsblatt Sicherheitszeichen"
              }
            ],
            vokabeln: [
              { de: "das Verbotszeichen", vi: "biển cấm (tròn viền đỏ gạch chéo)" },
              { de: "das Gebotszeichen", vi: "biển hiệu lệnh bắt buộc (tròn xanh dương)" },
              { de: "das Rettungszeichen", vi: "biển chỉ dẫn cứu hộ / sơ cứu (vuông xanh lá)" },
              { de: "das Brandschutzzeichen", vi: "biển phòng cháy chữa cháy (vuông đỏ)" },
              { de: "Zutritt für Unbefugte verboten", vi: "cấm người không có phận sự vào" },
              { de: "Gebrauchsanweisung beachten", vi: "chú ý đọc hướng dẫn sử dụng" },
              { de: "Vor dem Öffnen Netzstecker ziehen", vi: "rút phích cắm điện trước khi mở máy" },
              { de: "die Krankentrage", vi: "cáng cứu thương" },
              { de: "die Notdusche", vi: "vòi tắm khẩn cấp" },
              { de: "die Augenspüleinrichtung", vi: "thiết bị / trạm rửa mắt khẩn cấp" },
              { de: "der Löschschlauch", vi: "cuộn vòi chữa cháy" },
              { de: "der Feuerlöscher", vi: "bình chữa cháy" }
            ]
          }
        ]
      },
      {
        id: "textilpflege",
        badge: "Teil 3 · Wirtschaftsdienst",
        title: "Textilpflegesymbole (Wäschepflege)",
        items: [
          {
            id: "sym-textilpflege",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l3 14h12l3-14"/><path d="M3 10c2.5 1.5 5.5 1.5 9 0s6.5-1.5 9 0"/></svg>',
            name: "4. Symbole für die Pflegebehandlung von Textilien",
            desc: "28 Symbole: Waschen (30–95 °C, Schonwaschgang, Handwäsche) · Bleichen · Tumbler-Trocknung · Bügeln · Chemischreinigung (P, F)",
            pages: { folder: "images/scans/symbole", from: 4, to: 4, prefix: "symbole" },
            content: textilpflegeContent,
            qa: [
              {
                q: "Was bedeuten die Zahlen im Waschbottich und der Balken unterhalb des Waschbottichs?",
                qVi: "Con số trong chậu giặt và vạch ngang dưới đáy chậu giặt có ý nghĩa gì?",
                a: "Die Zahlen entsprechen den maximalen Waschtemperaturen in °C, die nicht überschritten werden dürfen. Der Balken unterhalb des Waschbottichs verlangt nach einer mechanisch milderen Behandlung (Schonwaschgang).",
                aVi: "Con số chỉ nhiệt độ nước giặt tối đa (°C) không được vượt quá. Vạch ngang dưới đáy chậu yêu cầu chế độ giặt nhẹ (Schonwaschgang — giảm tác động cơ học).",
                why: "Định nghĩa nguyên văn từ bảng Wäschekrone.",
                src: "Wäschekrone – Textilpflegesymbole"
              },
              {
                q: "Wofür stehen die Buchstaben P und F im Kreis sowie der Balken unter dem Kreis bei der Textilpflege?",
                qVi: "Chữ P và F trong vòng tròn cùng vạch ngang dưới vòng tròn có ý nghĩa gì?",
                a: "Die Buchstaben sind für den Chemischreiniger bestimmt und geben Hinweis auf die erlaubten Lösemittel (P = Perchlorethylen, F = Kohlenwasserstofflösungsmittel). Der Balken verlangt eine Beschränkung der mechanischen Beanspruchung, der Feuchtigkeitszugabe und/oder der Temperatur.",
                aVi: "Chữ P và F dành cho tiệm giặt khô chuyên nghiệp để chọn đúng dung môi (Lösemittel). Vạch ngang dưới vòng tròn yêu cầu hạn chế cơ học, độ ẩm và/hoặc nhiệt độ.",
                why: "Định nghĩa nguyên văn từ bảng Wäschekrone.",
                src: "Wäschekrone – Textilpflegesymbole"
              },
              {
                q: "Was bedeuten 1, 2 bzw. 3 Punkte im Bügeleisen-Symbol?",
                qVi: "1 chấm, 2 chấm và 3 chấm trong biểu tượng bàn ủi có nghĩa là gì?",
                a: "• 3 Punkte = heiß bügeln (bis ca. 200 °C, z. B. Baumwolle/Leinen)\n• 2 Punkte = mäßig heiß bügeln (bis ca. 150 °C, z. B. Polyester/Wolle)\n• 1 Punkt = nicht heiß bügeln, Vorsicht beim Bügeln mit Dampf (bis ca. 110 °C).",
                aVi: "• 3 chấm = ủi nóng (~200 °C, vải cotton/lanh)\n• 2 chấm = ủi vừa (~150 °C, vải pha/len)\n• 1 chấm = ủi nhiệt thấp (~110 °C), cẩn thận khi dùng hơi nước.",
                why: "Tránh làm cháy hoặc bóng mặt vải đồng phục/khăn bàn.",
                src: "Wäschekrone – Textilpflegesymbole"
              }
            ],
            vokabeln: [
              { de: "der Waschbottich", vi: "chậu giặt (ký hiệu giặt nước)" },
              { de: "der Normalwaschgang", vi: "chế độ giặt thường" },
              { de: "der Schonwaschgang", vi: "chế độ giặt nhẹ (có 1 vạch ngang dưới chậu)" },
              { de: "die Handwäsche", vi: "chỉ giặt bằng tay" },
              { de: "das Bleichen (Dreieck)", vi: "tẩy trắng (hình tam giác)" },
              { de: "die Sauerstoffbleiche", vi: "tẩy trắng bằng oxy (tam giác gạch sọc)" },
              { de: "die Trockentrommel (Tumbler)", vi: "máy sấy lồng quay (vuông có tròn)" },
              { de: "die thermische Beanspruchung", vi: "tác động nhiệt khi sấy" },
              { de: "heiß / mäßig heiß / nicht heiß bügeln", vi: "ủi nóng (3 chấm) / vừa (2 chấm) / thấp (1 chấm)" },
              { de: "die Chemischreinigung (Reinigungstrommel)", vi: "giặt khô hóa chất (vòng tròn)" },
              { de: "das Lösemittel", vi: "dung môi giặt khô (P / F)" }
            ]
          }
        ]
      },
      {
        id: "servietten",
        badge: "Teil 4 · Service & Tischkultur",
        title: "Servietten falten – 14 Falttechniken, Knigge & Arten",
        items: [
          {
            id: "sym-servietten",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L3 20h18L12 3z"/><path d="M12 3v17"/></svg>',
            name: "5. 14 Servietten-Falttechniken, Knigge-Regeln & Serviettenarten",
            desc: "Alle 14 Faltformen mit Bild (Tafelspitz, Bischofsmütze, Fächer, Bestecktasche, Marquée, Pyramide, Lilie, Rose, Welle, Briefumschlag, Blatt, Herz, Hase, Hemd) · Knigge · 4 Serviettenarten",
            content: `
<div class="note">
  <b>Grundsatz im Restaurantservice (Knigge & Hygiene):</b> Die <span class="term" data-de="Serviette" data-vi="khăn ăn">Serviette</span> ist ein wichtiger Bestandteil des Gedecks und ein Kulturgegenstand. Bei <b>offiziellen Anlässen</b> und in der gehobenen Gastronomie werden <b>schlichte, hygienische Faltformen mit wenigen Handgriffen</b> bevorzugt (z. B. <i>Tafelspitz, Marquée, Fächer, Pyramide, Bestecktasche</i>), damit die Serviette durch zu viele Falten und Handkontakt nicht unhygienisch wirkt. Verspielte Figuren (<i>Hase, Hemd</i>) eignen sich für Familienfeiern, Ostern oder Kindergeburtstage.
  <div class="vi">Trong nghiệp vụ bàn (Service) và quy tắc lịch nghi <b>Knigge</b>: Tại các <b>bữa tiệc trang trọng / chính thức (offizieller Anlass)</b>, nhà hàng ưu tiên các kiểu gấp <b>đơn giản, sang trọng, ít chạm tay</b> (như <i>Tafelspitz, Marquée, Fächer, Pyramide, Bestecktasche</i>) để đảm bảo vệ sinh tối đa. Các kiểu tạo hình cầu kỳ/vui nhộn (như <i>Hase, Hemd</i>) chỉ dùng cho tiệc gia đình, lễ Phục sinh hoặc sinh nhật.</div>
</div>

<h3>A. Klassische & Offizielle Faltformen (Knigge-Empfehlung für Gastronomie & Bankett)</h3>
<div class="sym-grid">
  ${servCard(
    "./images/symbole/serviette-tafelspitz.jpg",
    "Nr. 1 · Klassiker (Offiziell)",
    '<span class="term" data-de="Tafelspitz" data-vi="kiểu gấp khăn chóp nhọn cổ điển">Tafelspitz</span> (Doppelter Tafelspitz)',
    "Kiểu chóp nhọn cổ điển (Tafelspitz)",
    "Der zeitlose Klassiker in Hotellerie und gehobener Gastronomie: Schlichte, aufrecht stehende Doppelspitze, mit wenigen Faltgriffen hygienisch herzustellen. Laut Knigge erste Wahl für offizielle Anlässe und Festtafeln.",
    "Kiểu gấp kinh điển nhất trong nhà hàng – khách sạn: Dáng chóp đôi đứng thẳng, thanh lịch, ít thao tác chạm tay nên rất hợp vệ sinh. Được Knigge khuyên dùng hàng đầu cho tiệc chính thức."
  )}
  ${servCard(
    "./images/symbole/serviette-marquee.jpg",
    "Nr. 2 · Klassiker (Offiziell)",
    '<span class="term" data-de="Marquée" data-vi="kiểu gấp khăn tháp cao Marquée">Marquée</span> (Hohe Zeltspitze)',
    "Kiểu tháp cao (Marquée)",
    "Sehr hohe, schlanke und symmetrische Kegel-/Zeltform. Wirkt auf großen Platztellern äußerst edel und wird vom Knigge ausdrücklich neben dem Tafelspitz für formelle Bankette empfohlen.",
    "Dáng tháp nhọn cao vút, cân đối. Đặt trên đĩa lớn (Platzteller) rất sang trọng; cùng với Tafelspitz là 2 kiểu chuẩn mực nhất cho tiệc ngoại giao/công ty."
  )}
  ${servCard(
    "./images/symbole/serviette-bischofsmuetze.jpg",
    "Nr. 3 · Festlich (Tradition)",
    '<span class="term" data-de="Bischofsmütze" data-vi="kiểu gấp khăn mũ Giám mục">Bischofsmütze</span> (Mitra)',
    "Kiểu mũ Giám mục (Bischofsmütze)",
    "Traditionelle, sehr standfeste Form mit zwei gegenüberliegenden Spitzen (wie eine Bischofs-Mitra). Gelingt am besten mit gut gestärkten Damast-Stoffservietten (50 × 50 cm) für Feiertage, Taufen und Hochzeiten.",
    "Kiểu truyền thống có 2 đỉnh nhọn đối xứng vững chãi như chiếc mũ Giám mục. Đẹp nhất khi gấp bằng khăn vải Damast hồ cứng (50 × 50 cm) cho tiệc cưới, lễ rửa tội, ngày lễ."
  )}
  ${servCard(
    "./images/symbole/serviette-faecher.jpg",
    "Nr. 4 · Allrounder (Offiziell & Buffet)",
    '<span class="term" data-de="Fächer" data-vi="kiểu gấp khăn hình rẻ quạt">Fächer</span> (Stehender Sternfächer)',
    "Kiểu rẻ quạt (Fächer)",
    "Beliebte Ziehharmonika-Faltung (Plissee) mit eigenem Standfuß. Geht sehr schnell, funktioniert sowohl mit Stoff- als auch mit festen Papierservietten und passt laut Knigge auch zu offiziellen Anlässen.",
    "Gấp nếp quạt (Ziehharmonika) có chân đế tự đứng trên đĩa. Nhanh, đẹp, dùng được cho cả khăn vải lẫn khăn giấy dày và phù hợp cả trong tiệc trang trọng."
  )}
  ${servCard(
    "./images/symbole/serviette-bestecktasche.jpg",
    "Nr. 5 · Praxis-Favorit (Bistro & Terrasse)",
    '<span class="term" data-de="Bestecktasche" data-vi="kiểu gấp túi đựng dao dĩa">Bestecktasche</span>',
    "Kiểu túi đựng dao dĩa (Bestecktasche)",
    "Flach gefaltete Tasche, in der Messer, Gabel und Löffel direkt Platz finden. Ideal für Terrassengeschäft (windfest!), Buffets, Tagungen und schnelles Eindecken sowie laut Knigge auch bei offiziellen Anlässen erlaubt.",
    "Gấp thành túi phẳng để cài sẵn dao, dĩa, thìa bên trong. Rất thực tế và vệ sinh cho khu vực sân vườn ngoài trời (chống gió bay), tiệc đứng buffet, hội nghị."
  )}
  ${servCard(
    "./images/symbole/serviette-pyramide.jpg",
    "Nr. 6 · Modern & Hygienisch",
    '<span class="term" data-de="Pyramide" data-vi="kiểu gấp khăn hình kim tự tháp">Pyramide</span>',
    "Kiểu kim tự tháp (Pyramide)",
    "Klare, dreieckige Standform, die aus einem diagonal gefalteten Dreieck in wenigen Sekunden aufgestellt wird. Sehr geringer Handkontakt (hohe Hygiene) und stabiler Stand.",
    "Dáng kim tự tháp 3 mặt gọn gàng, gấp cực nhanh từ hình tam giác chéo. Ít chạm tay nên đảm bảo vệ sinh cao và đứng rất vững trên đĩa."
  )}
  ${servCard(
    "./images/symbole/serviette-welle.jpg",
    "Nr. 7 · Modern & Flach",
    '<span class="term" data-de="Welle" data-vi="kiểu gấp khăn lượn sóng">Welle</span> (Die Woge)',
    "Kiểu lượn sóng (Welle)",
    "Liegende Stufenfaltung mit weich geschwungenen Lagen. Wirkt modern und schlicht auf großen Tellern — besonders beliebt bei Sommermenüs, Fischmenüs oder modernen Banketten.",
    "Xếp thành các lớp sóng nằm ngang mềm mại trên mặt đĩa. Phong cách hiện đại, tinh tế, rất hợp với thực đơn món cá hoặc tiệc mùa hè."
  )}
  ${servCard(
    "./images/symbole/serviette-briefumschlag.png",
    "Nr. 8 · Für Menükarte / Tischkarte",
    '<span class="term" data-de="Briefumschlag" data-vi="kiểu gấp khăn hình phong bì thư">Briefumschlag</span> (Kuvert)',
    "Kiểu phong bì thư (Briefumschlag / Kuvert)",
    "Flache Kuvertfaltung mit dreieckiger Lasche. Perfekt geeignet, um eine kleine Menükarte, ein Namenskärtchen, Besteck oder einen Gruß für den Gast einzustecken.",
    "Gấp phẳng thành hình chiếc phong bì có nắp tam giác. Rất tiện để cài thực đơn nhỏ (Menükarte), thẻ tên khách (Tischkarte) hoặc bộ dao dĩa."
  )}
</div>

<h3>B. Dekorative & Thematische Motiv-Faltungen (6 Formen für besondere Anlässe)</h3>
<div class="sym-grid">
  ${servCard(
    "./images/symbole/serviette-lilie.jpg",
    "Nr. 9 · Festlicher Kelch",
    '<span class="term" data-de="Lilie" data-vi="kiểu gấp khăn hoa bách hợp / hoa ly">Lilie</span> (Fleur-de-Lys)',
    "Kiểu hoa bách hợp / Hoa ly (Lilie)",
    "Aufrecht stehende Kelchform mit heruntergeklappten Blütenblättern am Fuß. Sehr dekorativ für Galadiners, Hochzeiten und festliche Familienfeiern.",
    "Dáng đài hoa đứng thẳng với các cánh hoa uốn mở quanh chân đế. Rất bắt mắt cho tiệc Gala, tiệc cưới và lễ kỷ niệm."
  )}
  ${servCard(
    "./images/symbole/serviette-rose.jpg",
    "Nr. 10 · Romantisch",
    '<span class="term" data-de="Rose" data-vi="kiểu gấp khăn hoa hồng">Rose</span> (Serviettenblüte)',
    "Kiểu bông hoa hồng (Rose)",
    "Vielschichtige Rosenblüte auf dem Teller. Beliebt für romantische Anlässe (Valentinstag, Hochzeitstag, Muttertag), erfordert jedoch viele Faltgriffe.",
    "Tạo hình bông hoa hồng nhiều cánh nở trên đĩa. Phù hợp cho bàn tiệc lãng mạn (Valentine, kỷ niệm ngày cưới, Ngày của Mẹ)."
  )}
  ${servCard(
    "./images/symbole/serviette-blatt.jpg",
    "Nr. 11 · Saisonal (Frühling / Herbst)",
    '<span class="term" data-de="Blatt" data-vi="kiểu gấp khăn hình chiếc lá">Blatt</span>',
    "Kiểu chiếc lá (Blatt)",
    "Schräg aufgestelltes, plissiertes Blattmotiv. Setzt einen frischen Akzent auf Frühlings-, Sommer- oder Herbsttafeln (z. B. Erntedank, Wildmenü).",
    "Tạo hình chiếc lá xếp nếp nghiêng thanh thoát. Điểm nhấn theo mùa rất hợp cho bàn tiệc mùa xuân hoặc mùa thu."
  )}
  ${servCard(
    "./images/symbole/serviette-herz.png",
    "Nr. 12 · Hochzeit & Valentinstag",
    '<span class="term" data-de="Herz" data-vi="kiểu gấp khăn hình trái tim">Herz</span>',
    "Kiểu trái tim (Herz)",
    "Flach auf dem Teller liegende Herzform (besonders wirkungsvoll mit roten Servietten auf weißem Porzellan) für Hochzeiten, Verlobungen und Candle-Light-Dinner.",
    "Hình trái tim trải phẳng trên đĩa (nổi bật nhất khi dùng khăn màu đỏ trên đĩa sứ trắng) cho tiệc cưới, lễ đính hôn, bữa tối hẹn hò."
  )}
  ${servCard(
    "./images/symbole/serviette-hase.jpg",
    "Nr. 13 · Ostern & Familienfest",
    '<span class="term" data-de="Hase" data-vi="kiểu gấp khăn hình chú thỏ Phục sinh">Hase</span> (Osterhase)',
    "Kiểu chú thỏ (Hase / Osterhase)",
    "Verspielte Figur mit zwei langen stehenden Ohren. Der Klassiker für das Osterfrühstück oder den Osterbrunch mit der Familie — laut Knigge jedoch <b>nicht</b> für offizielle Geschäftsessen geeignet.",
    "Hình chú thỏ có hai tai dài dựng đứng — biểu tượng đặc trưng cho bữa sáng / Brunch lễ Phục sinh (Ostern) hoặc tiệc gia đình có trẻ nhỏ (không dùng cho tiệc công vụ chính thức)."
  )}
  ${servCard(
    "./images/symbole/serviette-hemd.jpg",
    "Nr. 14 · Mottoparty & Geburtstag",
    '<span class="term" data-de="Hemd" data-vi="kiểu gấp khăn hình chiếc áo sơ mi">Hemd</span> (mit Kragen)',
    "Kiểu chiếc áo sơ mi có cổ (Hemd)",
    "Originelle Faltung mit umgeschlagenem Hemdkragen und Ärmeln. Beliebt für Vatertag, Herrengeburtstage oder lockere Vereinsfeiern (nicht bei formellen Anlässen).",
    "Gấp thành hình chiếc áo sơ mi có cổ bẻ và tay áo. Rất thú vị cho tiệc sinh nhật, Ngày của Cha hoặc tiệc thân mật (không dùng trong tiệc nghi thức trang trọng)."
  )}
</div>

<h3>C. Knigge-Regeln: Platzierung & Handhabung der Serviette</h3>
<table>
  <tr><th>Situation</th><th>Regel nach Knigge (Deutschland & International)</th><th>Tiếng Việt</th></tr>
  <tr>
    <td><b>1. Wo liegt die Serviette beim Eindecken?</b></td>
    <td>
      • <b>1. Wahl:</b> In der <b>Mitte des Tellers</b> (Platzteller / Hauptteller).<br>
      • <b>2. Wahl</b> (wenn Teller belegt z. B. durch Suppenteller): <b>Links neben der linken Besteckreihe</b>.<br>
      • <b>3. Wahl:</b> Auf dem <b>Brotteller</b> (links oben neben der Gabelreihe).
    </td>
    <td>
      • <b>Ưu tiên 1:</b> Đặt <b>chính giữa lòng đĩa</b>.<br>
      • <b>Ưu tiên 2</b> (khi đĩa đã bày sẵn bát súp/đĩa khác): Đặt <b>bên trái hàng dĩa (bên trái ngoài cùng)</b>.<br>
      • <b>Ưu tiên 3:</b> Đặt trên <b>đĩa bánh mì (Brotteller)</b> ở góc trên bên trái.
    </td>
  </tr>
  <tr>
    <td><b>2. Während des Essens</b></td>
    <td>Die Serviette wird einmal <b>zur Hälfte gefaltet auf den Schoß gelegt</b> (niemals wie ein Kinderlätzchen in den Kragen stecken!).</td>
    <td>Gấp đôi khăn ăn và <b>trải lên đùi (auf den Schoß)</b> — tuyệt đối không nhét vào cổ áo như yếm trẻ em.</td>
  </tr>
  <tr>
    <td><b>3. Vor dem Trinken</b></td>
    <td>Vor jedem Griff zum Weinglas oder Wasserglas die <b>Lippen mit der Serviette abtupfen</b>, um unschöne Fettränder am Glasrand zu verhindern.</td>
    <td>Trước khi uống rượu vang hoặc nước, dùng khăn <b>chấm nhẹ môi</b> để không để lại vết dầu mỡ trên miệng ly.</td>
  </tr>
  <tr>
    <td><b>4. Kurzes Aufstehen während des Essens</b></td>
    <td>
      • <b>In Deutschland:</b> Locker gefaltet <b>links neben den Teller</b> legen — <b>nicht auf den Stuhl!</b><br>
      • <b>In den USA:</b> Dort ist es üblich, die Serviette beim kurzen Aufstehen auf die <b>Sitzfläche des Stuhls</b> zu legen.
    </td>
    <td>
      • <b>Tại Đức:</b> Khi đứng dậy tạm thời, gấp gọn đặt <b>bên trái đĩa</b> — <b>không đặt lên ghế ngồi!</b><br>
      • <b>Tại Mỹ (USA):</b> Phong tục Mỹ lại đặt khăn ăn lên <b>mặt ghế ngồi</b> khi tạm rời bàn.
    </td>
  </tr>
  <tr>
    <td><b>5. Nach dem Essen</b></td>
    <td>Serviette gefaltet <b>links neben das Gedeck</b> legen (die <b>Öffnung</b> zeigt zum Gast selbst, die <b>Faltkante</b> zum linken Nachbarn). Papierservietten <b>niemals zerknüllen</b> und <b>niemals auf den benutzten Teller legen!</b></td>
    <td>Sau khi ăn xong, gấp khăn đặt <b>bên trái đĩa</b> (mép mở quay về phía mình, đường gấp quay sang người bên trái). Khăn giấy <b>tuyệt đối không vo tròn</b> và <b>không vứt lên đĩa ăn dở!</b></td>
  </tr>
</table>

<h3>D. Die 4 Arten von Servietten in der Gastronomie</h3>
<table>
  <tr><th>Serviettenart</th><th>Material, Größe & Verwendung</th><th>Tiếng Việt</th></tr>
  <tr>
    <td><b>1. <span class="term" data-de="Stoffserviette" data-vi="khăn ăn bằng vải (Damast)">Stoffserviette</span> (Damastserviette)</b></td>
    <td>Gehobene Gastronomie & Festtafeln (Hochzeit, Bankett). Besteht meist aus <b><span class="term" data-de="Damast" data-vi="vải gấm Damast dệt hoa văn từ sợi bông">Damast</span></b> (spezielle Baumwolle mit eingewebten Mustern), wird gestärkt für festen Stand beim Falten. Standardmaß: <b>50 × 50 cm</b>.</td>
    <td><b>Khăn ăn bằng vải:</b> Dùng trong nhà hàng cao cấp và tiệc lớn. Thường dệt từ vải <b>Damast</b> (bông cao cấp dệt chìm hoa văn), được hồ cứng nhẹ để đứng dáng khi gấp. Kích thước chuẩn: <b>50 × 50 cm</b>.</td>
  </tr>
  <tr>
    <td><b>2. <span class="term" data-de="Papierserviette" data-vi="khăn ăn bằng giấy">Papierserviette</span></b></td>
    <td>Am weitesten verbreitet im Alltag (meist 33 × 33 cm, 3-lagig).<br><b>Wichtiger Warnhinweis (BfR):</b> Bunt bedruckte Papierservietten stehen im Verdacht, bei längerem Kontakt mit Lebensmitteln gesundheitsschädliche <b>primäre aromatische Amine (PAA)</b> abzugeben → <b>keine Speisen darin einwickeln!</b></td>
    <td><b>Khăn ăn bằng giấy:</b> Phổ biến nhất hàng ngày.<br><b>Cảnh báo an toàn thực phẩm (BfR):</b> Khăn giấy in màu đậm có nguy cơ thôi nhiễm hợp chất <b>amin thơm bậc một (primäre aromatische Amine)</b> gây hại sức khỏe khi tiếp xúc lâu với thức ăn → <b>không dùng khăn giấy màu để gói trực tiếp thực phẩm!</b></td>
  </tr>
  <tr>
    <td><b>3. <span class="term" data-de="Deckserviette" data-vi="khăn phủ mặt bàn (Mitteldecke / Napperon)">Deckserviette</span> / <span class="term" data-de="Mitteldecke" data-vi="khăn trải giữa bàn bảo vệ khăn bàn chính">Mitteldecke</span> (Napperon)</b></td>
    <td>Größte Ausführung (z. B. 80 × 80 cm): Ein kleineres Tischtuch, das <b>diagonal über das primäre Tischtuch</b> gelegt wird. Schützt das Haupttischtuch vor Flecken und kann beim Gästewechsel blitzschnell ausgetauscht werden.</td>
    <td><b>Khăn phủ giữa bàn (Deckserviette / Mitteldecke):</b> Loại lớn nhất, trải <b>chéo góc đè lên trên khăn trải bàn chính</b> để trang trí và hứng vết bẩn. Khi đổi lượt khách có thể thay cực nhanh mà không cần lột cả khăn trải bàn lớn.</td>
  </tr>
  <tr>
    <td><b>4. <span class="term" data-de="Dinnerserviette" data-vi="khăn giấy mỏng dùng nhanh tại quán ăn nhanh">Dinnerserviette</span></b></td>
    <td>Dünnere, meist nur <b>2-lagige</b> Papierserviette in Imbissen und Schnellrestaurants zur schnellen Reinigung der Hände bei fettigen Speisen (wird nicht auf den Schoß gelegt).</td>
    <td><b>Khăn giấy mỏng (Dinnerserviette):</b> Thường chỉ dày <b>2 lớp</b>, dùng trong quán ăn nhanh / Imbiss để lau tay nhanh khi ăn đồ chiên rán (không dùng để trải lên đùi).</td>
  </tr>
</table>
`,
            qa: [
              {
                q: "Wo wird die gefaltete Serviette laut Knigge beim Tischdecken platziert (3 Möglichkeiten)?",
                qVi: "Theo quy tắc Knigge, khăn ăn đã gấp được đặt ở những vị trí nào khi bày bàn (3 lựa chọn)?",
                a: "1. Priorisiert in der Mitte des Tellers.\n2. Wenn auf dem Teller kein Platz ist: links neben der linken Besteckreihe.\n3. Alternativ: auf dem Brotteller (links neben der linken Besteckreihe).",
                aVi: "1. Ưu tiên đặt chính giữa đĩa.\n2. Nếu đĩa không còn chỗ: đặt bên trái hàng dĩa (bên trái ngoài cùng).\n3. Cách thứ 3: đặt trên đĩa bánh mì (Brotteller).",
                why: "Đảm bảo thẩm mỹ và thuận tiện cho khách khi bắt đầu bữa ăn.",
                src: "einfach-basteln.com / Knigge"
              },
              {
                q: "Welche Servietten-Falttechniken empfiehlt der Knigge für einen offiziellen Anlass – und warum verzichtet man dort auf verspielte Figuren wie Hase oder Hemd?",
                qVi: "Knigge khuyên dùng những kiểu gấp nào cho dịp trang trọng chính thức — và vì sao tránh các kiểu cầu kỳ như Thỏ hay Áo sơ mi?",
                a: "Für offizielle Anlässe empfiehlt der Knigge schlichte Faltungen wie das Marquée, den Tafelspitz, den Fächer oder die Bestecktasche. Auf verspielte Formen mit vielen Rüschen und Falten wird verzichtet, da sonst der Verdacht entsteht, dass die Serviette durch das viele Anfassen beim Falten nicht sauber/hygienisch geblieben ist.",
                aVi: "Trong dịp chính thức, nên chọn kiểu đơn giản, thanh lịch như Marquée, Tafelspitz, Fächer hoặc Bestecktasche. Tránh các kiểu gấp quá nhiều nếp (như Thỏ, Áo sơ mi) vì khách sẽ nghi ngờ khăn bị chạm tay quá nhiều không còn hợp vệ sinh.",
                why: "Vệ sinh (Hygiene) luôn là ưu tiên số 1 trong ngành Gastronomie.",
                src: "einfach-basteln.com / Knigge"
              },
              {
                q: "Was ist eine Deckserviette (Mitteldecke) und welchen Vorteil bietet sie in der Gastronomie?",
                qVi: "Deckserviette (Mitteldecke) là gì và mang lại lợi ích gì trong nhà hàng?",
                a: "Die Deckserviette (Mitteldecke / Napperon) ist die größte Ausführung der Serviette und wird diagonal über das primäre Tischtuch gelegt. Sie dient als Dekoration und schützt das eigentliche Tischtuch: Wird sie beschmutzt, kann sie beim Gästewechsel viel schneller ausgetauscht und leichter gereinigt werden als das große Tischtuch.",
                aVi: "Deckserviette (Mitteldecke) là tấm khăn vuông lớn đặt chéo lên trên khăn trải bàn chính. Nó giúp bảo vệ khăn bàn chính và có thể thay mới cực nhanh giữa các lượt khách nếu bị bẩn.",
                why: "Tiết kiệm thời gian setup bàn và chi phí giặt ủi khăn bàn lớn.",
                src: "einfach-basteln.com · Serviettenarten"
              },
              {
                q: "Wie legt der Gast in Deutschland die Serviette beim kurzen Aufstehen und nach dem Essen ab?",
                qVi: "Tại Đức, khách đặt khăn ăn như thế nào khi tạm đứng dậy và sau khi ăn xong?",
                a: "• Beim kurzen Aufstehen: Gefaltet links neben den Teller legen (nicht auf den Stuhl – das ist nur in den USA üblich).\n• Nach dem Essen: Gefaltet links vom Platz ablegen (Öffnung zum Gast, Faltkante zum linken Nachbarn). Papierservietten niemals zerknüllen oder auf den Teller werfen!",
                aVi: "• Khi tạm đứng dậy: Gấp đặt bên trái đĩa (không đặt lên ghế — đặt lên ghế là phong tục ở Mỹ).\n• Sau khi ăn xong: Gấp đặt bên trái chỗ ngồi (mép mở quay về phía mình, nếp gấp quay sang người bên trái); không vo nhàu khăn giấy bỏ lên đĩa.",
                why: "Quy tắc lịch nghi bàn ăn chuẩn Đức (Knigge).",
                src: "einfach-basteln.com / Knigge"
              }
            ],
            vokabeln: [
              { de: "der Tafelspitz", vi: "kiểu gấp khăn chóp nhọn cổ điển" },
              { de: "die Bischofsmütze", vi: "kiểu gấp khăn mũ Giám mục" },
              { de: "der Fächer", vi: "kiểu gấp khăn hình rẻ quạt" },
              { de: "die Bestecktasche", vi: "kiểu gấp khăn túi đựng dao dĩa" },
              { de: "das Marquée", vi: "kiểu gấp khăn tháp nhọn cao" },
              { de: "die Stoffserviette (Damast 50×50 cm)", vi: "khăn ăn bằng vải gấm Damast (50×50 cm)" },
              { de: "die Deckserviette / die Mitteldecke", vi: "khăn phủ chéo giữa bàn (bảo vệ khăn bàn chính)" },
              { de: "die Dinnerserviette", vi: "khăn giấy mỏng 2 lớp (dùng ở quán ăn nhanh)" },
              { de: "primäre aromatische Amine (PAA)", vi: "amin thơm bậc một (chất có thể thôi nhiễm từ khăn giấy in màu)" },
              { de: "auf den Schoß legen", vi: "trải khăn ăn lên đùi" },
              { de: "die Lippen abtupfen", vi: "chấm nhẹ môi trước khi uống" }
            ]
          }
        ]
      }
    ],
    quiz: [
      // --- GHS Questions (with image!) ---
      {
        theme: "sym-ghs",
        cat: "GHS-Piktogramm",
        img: "./images/symbole/ghs-aetzend-haut.png",
        q: "Was bedeutet dieses GHS-Gefahrensymbol auf einem Reinigungsmittel?",
        opts: [
          "Ätzwirkung auf die Haut / ätzend (Schutzhandschuhe & Schutzbrille tragen)",
          "Komprimierte Gase unter Druck",
          "Brandfördernd (entzündend wirkend)",
          "Explosionsgefahr"
        ],
        a: 0,
        ex: "GHS05 (Reagenzgläser auf Hand und Metall) warnt vor starker Ätzwirkung auf Haut, Augen und Metalle."
      },
      {
        theme: "sym-ghs",
        cat: "GHS-Piktogramm",
        img: "./images/symbole/ghs-umwelt.png",
        q: "Welches Gefahrensymbol ist hier abgebildet?",
        opts: [
          "gewässergefährdend (Umweltgefahren – Für Tier und die Umwelt gefährlich)",
          "akute Toxizität (Lebensgefahr)",
          "entzündlich (Feuergefahr)",
          "systemische Gefährdung"
        ],
        a: 0,
        ex: "GHS09 (toter Fisch und kahler Baum) kennzeichnet gewässer- und umweltgefährdende Stoffe."
      },
      {
        theme: "sym-ghs",
        cat: "GHS-Piktogramm",
        img: "./images/symbole/ghs-brandfoerdernd.png",
        q: "Wie lautet die korrekte Bezeichnung für dieses GHS-Symbol (Flamme über einem Kreis)?",
        opts: [
          "brandfördernd (entzündend wirkende Stoffe)",
          "entzündlich (entzündbare Stoffe)",
          "explosiv (Explosionsgefahr)",
          "komprimierte Gase"
        ],
        a: 0,
        ex: "Flamme über einem Kreis (O für Oxygen/Sauerstoff) = brandfördernd (GHS03). Reine Flamme ohne Kreis = entzündlich (GHS02)."
      },
      {
        theme: "sym-ghs",
        cat: "GHS-Piktogramm",
        img: "./images/symbole/ghs-gase.png",
        q: "Wovor warnt dieses Piktogramm (Gasflasche)?",
        opts: [
          "komprimierte Gase / Gase unter Druck (kann bei Erwärmung explodieren)",
          "Ätzwirkung auf die Haut",
          "akute Toxizität",
          "gewässergefährdend"
        ],
        a: 0,
        ex: "GHS04 kennzeichnet komprimierte Gase / Gase unter Druck (z. B. CO₂-Flaschen, Sahnekapseln)."
      },
      {
        theme: "sym-ghs",
        cat: "GHS-Piktogramm",
        img: "./images/symbole/ghs-systemisch.png",
        q: "Was bedeutet dieses Symbol (Mensch mit Stern im Brustkorb)?",
        opts: [
          "systemische Gefährdung (schwere Gesundheitsgefahr für Organe/Atemwege)",
          "Erste Hilfe Station",
          "Schutzhandschuhe tragen",
          "Explosionsgefahr"
        ],
        a: 0,
        ex: "GHS08 warnt vor systemischer Gefährdung (Organschäden, schwere Atemwegserkrankungen, krebserzeugende Wirkung)."
      },
      {
        theme: "sym-ghs",
        cat: "GHS-Piktogramm",
        img: "./images/symbole/ghs-achtung.png",
        q: "Welche Bedeutung hat das GHS-Symbol mit dem Ausrufezeichen (!)?",
        opts: [
          "Achtung: gesundheitsschädlich / Reizung oder Allergie möglich",
          "Gefahr: Explosive Stoffe",
          "Brandfördernd",
          "Keine Chemischreinigung möglich"
        ],
        a: 0,
        ex: "GHS07 (Ausrufezeichen) steht für gesundheitsschädliche, haut-/augenreizende oder allergieauslösende Stoffe."
      },
      {
        type: "fill",
        theme: "sym-ghs",
        cat: "GHS Grundwissen",
        q: "Wie heißt das internationale System zur Einstufung und Kennzeichnung von Chemikalien (Abkürzung mit 3 Buchstaben)?",
        answers: ["ghs", "das ghs"],
        answer: "GHS (Globally Harmonised System)",
        ex: "Seit dem 1. Dezember 2012 ist das GHS verbindlich."
      },

      // --- Entsorgung Questions ---
      {
        theme: "sym-entsorgung",
        cat: "Entsorgung",
        img: "./images/symbole/entsorgung-sondermuell.png",
        q: "Wie muss ein Produkt mit diesem Symbol (durchgestrichene Mülltonne) entsorgt werden?",
        opts: [
          "Als Sondermüll / Problemstoff zum Wertstoffhof oder zur Problemstoffsammelstelle bringen (nicht in den Restmüll!)",
          "Einfach in den normalen Hausmüll werfen",
          "Mit viel Wasser in den Ausguss spülen",
          "In die Gelbe Tonne werfen"
        ],
        a: 0,
        ex: "Durchgestrichene Mülltonne = Sondermüll / Problemstoff: niemals in den Restmüll, sondern zum Wertstoffhof / Problemstoffsammelstelle."
      },
      {
        theme: "sym-entsorgung",
        cat: "Entsorgung",
        img: "./images/symbole/entsorgung-kanalisation.png",
        q: "Was verbietet dieses Entsorgungssymbol?",
        opts: [
          "Verbot der Beseitigung über die Kanalisation (Reste nicht in den Ausguss oder das WC leeren!)",
          "Verbot der Mülltrennung",
          "Händewaschen verboten",
          "Nicht im Wäschetrockner trocknen"
        ],
        a: 0,
        ex: "Flüssigkeitsreste dürfen nicht in den Ausguss oder das WC geleert werden."
      },
      {
        theme: "sym-entsorgung",
        cat: "Entsorgung",
        img: "./images/symbole/entsorgung-hausmuell.png",
        q: "Was sagt dieses Symbol (Mülltonne ohne Durchstreichung) aus?",
        opts: [
          "Hausmüll: Kann mit dem normalen Restmüll entsorgt werden",
          "Muss als Gefahrgut verbrannt werden",
          "Darf nur in das WC geschüttet werden",
          "Akute Explosionsgefahr"
        ],
        a: 0,
        ex: "Die nicht durchgestrichene Mülltonne erlaubt die Entsorgung über den normalen Hausmüll / Restmüll."
      },
      {
        type: "fill",
        theme: "sym-entsorgung",
        cat: "Entsorgung",
        q: "Als was bezeichnet man gefährliche Abfälle, die nicht in den Hausmüll dürfen, sondern zur Problemstoffsammelstelle müssen?",
        answers: ["sondermüll", "problemstoff", "sondermüll, problemstoff", "sonderabfall"],
        answer: "Sondermüll / Problemstoff",
        ex: "Sondermüll bzw. Problemstoffe müssen getrennt über den Wertstoffhof oder die Problemstoffsammelstelle entsorgt werden."
      },

      // --- Arbeitsschutz Questions ---
      {
        theme: "sym-arbeitsschutz",
        cat: "Gebotszeichen",
        img: "./images/symbole/gebot-netzstecker.png",
        q: "Welches Gebot schreibt dieses blaue Sicherheitszeichen vor?",
        opts: [
          "Vor dem Öffnen Netzstecker ziehen",
          "Mobilfunk verboten",
          "Brandmeldetelefon benutzen",
          "Gebrauchsanweisung wegwerfen"
        ],
        a: 0,
        ex: "Blaues Gebotszeichen mit Stecker und Pfeil = Vor dem Öffnen (oder Reinigen) der Maschine den Netzstecker ziehen!"
      },
      {
        theme: "sym-arbeitsschutz",
        cat: "Rettungszeichen",
        img: "./images/symbole/rettung-augenspueler.png",
        q: "Welche Erste-Hilfe-Einrichtung kennzeichnet dieses grüne Schild?",
        opts: [
          "Augenspüleinrichtung",
          "Notdusche für den ganzen Körper",
          "Krankentrage",
          "Augen- und Gehörschutz tragen"
        ],
        a: 0,
        ex: "Grünes Quadrat mit Auge, Tropfen und weißem Kreuz = Augenspüleinrichtung."
      },
      {
        theme: "sym-arbeitsschutz",
        cat: "Rettungszeichen",
        img: "./images/symbole/rettung-notdusche.png",
        q: "Was kennzeichnet dieses grüne Rettungszeichen?",
        opts: [
          "Notdusche (Körpernotdusche zum Abspülen von Chemikalien)",
          "Löschschlauch der Feuerwehr",
          "Personal-Duschraum",
          "Handwäsche bei 30 °C"
        ],
        a: 0,
        ex: "Person unter Brausekopf mit weißem Erste-Hilfe-Kreuz auf grünem Grund = Notdusche."
      },
      {
        theme: "sym-arbeitsschutz",
        cat: "Verbotszeichen",
        img: "./images/symbole/verbot-zutritt.png",
        q: "Was bedeutet dieses Verbotszeichen an einer Küchentür?",
        opts: [
          "Zutritt für Unbefugte verboten",
          "Handschutz tragen",
          "Betreten der Fläche verboten",
          "Erste Hilfe"
        ],
        a: 0,
        ex: "Rotes Verbotszeichen mit abwehrender Hand = Zutritt für Unbefugte verboten."
      },
      {
        theme: "sym-arbeitsschutz",
        cat: "Brandschutzzeichen",
        img: "./images/symbole/brand-loeschschlauch.png",
        q: "Welches Brandschutzgerät wird durch dieses rote Schild gekennzeichnet?",
        opts: [
          "Löschschlauch (Wandhydrant)",
          "Feuerlöscher",
          "Brandmeldetelefon",
          "Feuerwehrleiter"
        ],
        a: 0,
        ex: "Aufgerollter Schlauch mit Flamme auf rotem Grund = Löschschlauch."
      },
      {
        theme: "sym-arbeitsschutz",
        cat: "Gebotszeichen",
        img: "./images/symbole/gebot-gebrauchsanweisung.png",
        q: "Wozu verpflichtet dieses blaue Gebotszeichen?",
        opts: [
          "Gebrauchsanweisung beachten",
          "Speisekarte lesen",
          "Augenschutz tragen",
          "Zutritt für Unbefugte verboten"
        ],
        a: 0,
        ex: "Person mit geöffnetem Heft auf blauem Grund = Gebrauchsanweisung beachten."
      },
      {
        type: "fill",
        theme: "sym-arbeitsschutz",
        cat: "Sicherheitszeichen",
        q: "Wie heißen runde Schilder mit blauem Hintergrund und weißem Piktogramm, die ein bestimmtes Verhalten vorschreiben?",
        answers: ["gebotszeichen", "gebotsschild", "gebotsschilder"],
        answer: "Gebotszeichen",
        ex: "Blau + rund = Gebotszeichen (z. B. Handschutz tragen, Gebrauchsanweisung beachten)."
      },

      // --- Textilpflege Questions ---
      {
        theme: "sym-textilpflege",
        cat: "Waschen",
        img: "./images/symbole/waschen-60-schon.png",
        q: "Was bedeutet der waagerechte Balken unter dem 60-°C-Waschbottich?",
        opts: [
          "60 °C Schonwaschgang (mechanisch mildere Behandlung)",
          "Wäsche muss auf der Leine getrocknet werden",
          "Nur Handwäsche erlaubt",
          "Wäsche darf mit Chlor gebleicht werden"
        ],
        a: 0,
        ex: "Der Balken unterhalb des Waschbottichs verlangt einen Schonwaschgang (reduzierte Mechanik)."
      },
      {
        theme: "sym-textilpflege",
        cat: "Bleichen",
        img: "./images/symbole/bleichen-sauerstoff.png",
        q: "Was bedeutet das Dreieck mit den zwei schrägen Linien?",
        opts: [
          "Nur Sauerstoffbleiche zulässig / keine Chlorbleiche",
          "Chlor- und Sauerstoffbleiche uneingeschränkt zulässig",
          "Überhaupt nicht bleichen",
          "Heiß bügeln"
        ],
        a: 0,
        ex: "Gestricheltes Dreieck = nur Sauerstoffbleiche zulässig, Chlorbleiche ist verboten."
      },
      {
        theme: "sym-textilpflege",
        cat: "Trocknen",
        img: "./images/symbole/trocknen-schonend.png",
        q: "Was gibt das Trocknersymbol mit EINEM Punkt in der Mitte an?",
        opts: [
          "Trocknen mit reduzierter thermischer Beanspruchung (Schontrocknen bei niedriger Temperatur)",
          "Trocknen mit normaler thermischer Beanspruchung (heiß)",
          "Trocknen im Tumbler nicht möglich",
          "Chemische Reinigung mit Perchlorethylen"
        ],
        a: 0,
        ex: "1 Punkt im Kreis = reduzierte thermische Beanspruchung (Schontrocknen). 2 Punkte = normale Temperatur."
      },
      {
        theme: "sym-textilpflege",
        cat: "Bügeln",
        img: "./images/symbole/buegeln-nicht-heiss.png",
        q: "Welche Bedeutung hat das Bügeleisen mit nur EINEM Punkt?",
        opts: [
          "Nicht heiß bügeln (max. ca. 110 °C) · Vorsicht beim Bügeln mit Dampf",
          "Heiß bügeln (bis 200 °C) für Leinen und Baumwolle",
          "Überhaupt nicht bügeln",
          "Nur mit viel Dampf heiß mangeln"
        ],
        a: 0,
        ex: "1 Punkt = nicht heiß bügeln, Vorsicht beim Bügeln mit Dampf."
      },
      {
        theme: "sym-textilpflege",
        cat: "Chemischreinigung",
        img: "./images/symbole/reinigung-p-schon.png",
        q: "Was bedeutet das „P“ im Kreis mit einem Balken darunter?",
        opts: [
          "Chemischreinigung mit Perchlorethylen (P) im Schonverfahren (Beschränkung von Mechanik, Feuchtigkeit/Temperatur)",
          "Parkplatz für Personal",
          "Waschen bei 95 °C im Normalwaschgang",
          "Keine Chemischreinigung möglich"
        ],
        a: 0,
        ex: "Kreis = Chemischreinigung, P = Lösemittel Perchlorethylen, Balken = Schonverfahren."
      },
      {
        type: "fill",
        theme: "sym-textilpflege",
        cat: "Textilpflege",
        q: "Welchen Waschgang verlangt ein waagerechter Balken unterhalb des Waschbottichs?",
        answers: ["schonwaschgang", "den schonwaschgang", "schonend"],
        answer: "Schonwaschgang",
        ex: "Der Balken unter dem Waschbottich kennzeichnet den Schonwaschgang (mildere mechanische Behandlung)."
      },

      // --- Servietten Questions (with images & Knigge!) ---
      {
        theme: "sym-servietten",
        cat: "Servietten falten",
        img: "./images/symbole/serviette-bischofsmuetze.jpg",
        q: "Wie heißt diese klassische, festliche Servietten-Faltform?",
        opts: [
          "Bischofsmütze",
          "Bestecktasche",
          "Welle",
          "Briefumschlag"
        ],
        a: 0,
        ex: "Die charakteristische Form mit den zwei gegenüberliegenden Spitzen heißt Bischofsmütze (Mitra)."
      },
      {
        theme: "sym-servietten",
        cat: "Servietten falten",
        img: "./images/symbole/serviette-tafelspitz.jpg",
        q: "Welche für offizielle Anlässe empfohlene Klassiker-Faltung ist hier abgebildet?",
        opts: [
          "Tafelspitz",
          "Rose",
          "Hemd",
          "Hase"
        ],
        a: 0,
        ex: "Der Tafelspitz ist der zeitlose, schlichte Klassiker für offizielle Tafeln."
      },
      {
        theme: "sym-servietten",
        cat: "Servietten falten",
        img: "./images/symbole/serviette-faecher.jpg",
        q: "Wie wird diese beliebte Ziehharmonika-Serviettenfaltung genannt?",
        opts: [
          "Fächer",
          "Pyramide",
          "Briefumschlag",
          "Marquée"
        ],
        a: 0,
        ex: "Die plissierte, fächerförmig aufgestellte Serviette heißt Fächer."
      },
      {
        theme: "sym-servietten",
        cat: "Servietten falten",
        img: "./images/symbole/serviette-bestecktasche.jpg",
        q: "Wie heißt diese praktische Falttechnik, in die Messer und Gabel direkt eingesteckt werden?",
        opts: [
          "Bestecktasche",
          "Lilie",
          "Bischofsmütze",
          "Welle"
        ],
        a: 0,
        ex: "In der Bestecktasche liegt das Besteck geordnet und windgeschützt bereit."
      },
      {
        theme: "sym-servietten",
        cat: "Servietten falten",
        img: "./images/symbole/serviette-marquee.jpg",
        q: "Wie heißt diese hohe, schlanke Kegelspitze, die laut Knigge ideal für offizielle Anlässe ist?",
        opts: [
          "Marquée",
          "Herz",
          "Blatt",
          "Briefumschlag"
        ],
        a: 0,
        ex: "Das hohe, schlanke Marquée gehört neben dem Tafelspitz zu den Knigge-Empfehlungen für formelle Anlässe."
      },
      {
        theme: "sym-servietten",
        cat: "Servietten falten",
        img: "./images/symbole/serviette-lilie.jpg",
        q: "Welche aufrecht stehende Kelchform ist auf diesem Bild zu sehen?",
        opts: [
          "Lilie",
          "Welle",
          "Bestecktasche",
          "Hemd"
        ],
        a: 0,
        ex: "Die Kelchform mit den heruntergeklappten äußeren Spitzen am Fuß ist die Lilie."
      },
      {
        theme: "sym-servietten",
        cat: "Knigge & Platzierung",
        q: "Wohin legt man in Deutschland laut Knigge die Serviette, wenn man während des Essens kurz aufsteht?",
        opts: [
          "Gefaltet links neben den Teller (nicht auf den Stuhl!)",
          "Auf die Sitzfläche des Stuhls (wie in den USA)",
          "Zerknüllt mitten auf den benutzten Teller",
          "Über das Weinglas gehängt"
        ],
        a: 0,
        ex: "In Deutschland wird die Serviette beim Aufstehen und nach dem Essen gefaltet links neben den Teller gelegt (auf den Stuhl legt man sie in den USA)."
      },
      {
        theme: "sym-servietten",
        cat: "Knigge & Hygiene",
        q: "Warum rät der Knigge bei offiziellen Anlässen von verspielten Faltungen mit vielen Rüschen (z. B. Hemd, Hase) ab?",
        opts: [
          "Weil bei zu vielen Falten der Verdacht entsteht, dass die Serviette durch starkes Anfassen nicht sauber geblieben ist",
          "Weil rote Servietten gesetzlich verboten sind",
          "Weil man dann kein Besteck benutzen darf",
          "Weil Stoffservietten nicht gefaltet werden können"
        ],
        a: 0,
        ex: "Schlichte Formen (Tafelspitz, Marquée, Fächer, Bestecktasche) wirken seriös und hygienisch."
      },
      {
        theme: "sym-servietten",
        cat: "Serviettenarten",
        q: "Aus welchem Stoff und in welcher Standardgröße bestehen klassische Stoffservietten in der gehobenen Gastronomie?",
        opts: [
          "Aus Damast (spezielle Baumwolle), meist 50 × 50 cm",
          "Aus zweilagigem Zellstoff, 20 × 20 cm",
          "Aus reinem Nylon, 100 × 100 cm",
          "Aus Filz, 15 × 15 cm"
        ],
        a: 0,
        ex: "Damastservietten bestehen aus spezieller Baumwolle mit eingewebtem Muster und messen standardmäßig 50 × 50 cm."
      },
      {
        type: "fill",
        theme: "sym-servietten",
        cat: "Serviettenarten",
        q: "Wie nennt man die größte Serviettenart, die in der Gastronomie diagonal zum Schutz über das eigentliche Tischtuch gelegt wird?",
        answers: ["deckserviette", "mitteldecke", "napperon", "die deckserviette", "die mitteldecke"],
        answer: "Deckserviette / Mitteldecke (Napperon)",
        ex: "Die Deckserviette bzw. Mitteldecke schützt das Tischtuch und lässt sich beim Gästewechsel schnell austauschen."
      }
    ]
  };
})(window);
