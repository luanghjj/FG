/**
 * gk-gle-data.js
 * Master-Daten für den Lehrgang GK-GLE (Große - Stoltenberg), S. 01–49 (1. Ausbildungsjahr Gemeinschaftskunde)
 */

(function () {
  'use strict';

  window.GK_GLE_GROUPS = [
    {
      id: "gk-gle-block-1",
      badge: "GK-GLE (S. 01–10)",
      title: "1. Duale Ausbildung & Rahmenbedingungen",
      items: [
        {
          id: "gk-gle-ls01-10",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/></svg>',
          name: "S. 01–10 · Duale Ausbildung & Rahmenbedingungen",
          desc: "Vor- & Nachteile aus 3 Perspektiven · Wunschberufe vs. Realität · Konfliktlösung · 3-Seiten-Verhältnis",
          keyPoints: [
            "<b>Duale Ausbildung (3 Perspektiven):</b> Azubi (Praxis/Vergütung vs. Belastung), Betrieb (Fachkräfte vs. Kosten/Risiko), Staat (geringe Jugendarbeitslosigkeit vs. Konjunkturabhängigkeit).",
            "<b>Wunschberufe vs. Realität:</b> Deutliche Abweichung zwischen Wunschberufen (Informatiker/Lehrerin) und tatsächlich abgeschlossenen Verträgen (Kfz-Mechatroniker/Kauffrau für Büromanagement).",
            "<b>Konflikte lösen (Stufen):</b> Direktes Gespräch → Ansprechpartner (Betriebsrat/JAV, IHK/HWK, Berufsschule) → Arbeitsgericht.",
            "<b>3-Seiten-Verhältnis:</b> Zusammenspiel zwischen Auszubildendem, Ausbildungsbetrieb und Staat (Berufsschule / BBiG)."
          ],
          pages: { folder: "gk-gle", from: 1, to: 10, prefix: "GK01-LS" },
          content: `
            <h2>Duale Ausbildung &amp; Rahmenbedingungen (S. 01–10)</h2>
            <div class="hint">GK-GLE · Große - Stoltenberg · Duale Berufsausbildung &amp; rechtliche Grundlagen</div>

            <h3 class="sub">1. Die drei Perspektiven der dualen Ausbildung</h3>
            <table>
              <tr><th>Akteur</th><th>Vorteile</th><th>Nachteile</th></tr>
              <tr>
                <td><strong>Auszubildende (Azubi)</strong></td>
                <td>• Frühzeitige <span class="term" data-de="praktische Erfahrung" data-vi="kinh nghiệm thực tế">praktische Erfahrung</span> im Betrieb.<br>• Eigene Ausbildungsvergütung (<span class="term" data-de="finanziell unabhängig" data-vi="tự chủ tài chính">finanziell unabhängig</span>).</td>
                <td>• Doppelbelastung durch <span class="term" data-de="Stress durch Arbeit &amp; Lernen" data-vi="áp lực làm việc &amp; học tập">Arbeit &amp; Berufsschule</span>.<br>• <span class="term" data-de="weniger Freizeit" data-vi="ít thời gian rảnh">Weniger Freizeit</span> und Urlaub als Schüler/Studierende.</td>
              </tr>
              <tr>
                <td><strong>Ausbildungsbetrieb</strong></td>
                <td>• Passgenaue Ausbildung eigener <span class="term" data-de="qualifizierte Arbeitskräfte" data-vi="nhân lực chất lượng">Fachkräfte</span>.<br>• Produktive Mitarbeit bereits während der Ausbildung.</td>
                <td>• <span class="term" data-de="hohes Risiko / Kosten" data-vi="rủi ro chi phí cao">Hohe Ausbildungskosten</span> und Zeitaufwand.<br>• Risiko des Betriebswechsels nach der Abschlussprüfung.</td>
              </tr>
              <tr>
                <td><strong>Staat &amp; Gesellschaft</strong></td>
                <td>• <span class="term" data-de="beugt Jugendarbeitslosigkeit vor" data-vi="ngăn ngừa thất nghiệp giới trẻ">Beugt Jugendarbeitslosigkeit vor</span>.<br>• Sichert die wirtschaftliche Wettbewerbsfähigkeit.</td>
                <td>• Ausbildungsplatzangebot stark <span class="term" data-de="abhängig von Wirtschaftslage" data-vi="phụ thuộc tình hình kinh tế">konjunkturabhängig</span>.<br>• Regionale Unterschiede beim Angebot.</td>
              </tr>
            </table>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Hệ thống đào tạo nghề kép (<i>Duale Ausbildung</i>) mang lại lợi ích và thách thức cho cả 3 bên: Học viên (tích lũy kinh nghiệm thực tế và có lương trợ cấp, nhưng chịu áp lực vừa học vừa làm), Doanh nghiệp (đào tạo được nhân lực đúng chuẩn nhưng tốn chi phí và rủi ro học viên nghỉ sau tốt nghiệp), và Nhà nước (giảm thất nghiệp thanh niên nhưng phụ thuộc vào chu kỳ kinh tế).</div>

            <h3 class="sub">2. Wunschberufe vs. Ausbildungsrealität</h3>
            <ul>
              <li><strong>Jungen:</strong> Wunschberufe sind häufig Informatiker, Maschinenbauer oder Polizist → tatsächlich am häufigsten gewählt: <span class="term" data-de="Kfz-Mechatroniker" data-vi="thợ cơ khí điện tử ô tô">Kfz-Mechatroniker</span>, Fachinformatiker, Verkäufer.</li>
              <li><strong>Mädchen:</strong> Wunschberufe sind häufig Lehrerin, Ärztin oder Erzieherin → tatsächlich am häufigsten gewählt: <span class="term" data-de="Kauffrau für Büromanagement" data-vi="chuyên viên quản trị văn phòng">Kauffrau für Büromanagement</span>, Medizinische Fachangestellte, Verkäuferin.</li>
            </ul>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Có sự khác biệt rõ rệt giữa nghề mơ ước và nghề đăng ký thực tế: Nam giới thường đăng ký học <i>Kfz-Mechatroniker</i>, <i>Fachinformatiker</i>, <i>Verkäufer</i>; nữ giới thường chọn <i>Kauffrau für Büromanagement</i>, <i>Medizinische Fachangestellte</i>, <i>Verkäuferin</i>.</div>

            <h3 class="sub">3. Konflikte in der Ausbildung lösen</h3>
            <ol>
              <li><strong>Direktes Gespräch:</strong> Sachliches Gespräch zwischen Auszubildendem und <span class="term" data-de="Ausbilder" data-vi="người hướng dẫn đào tạo">Ausbilder</span> suchen.</li>
              <li><strong>Interne &amp; externe Ansprechpartner:</strong> Unterstützung durch <span class="term" data-de="Betriebsrat / JAV" data-vi="Hội đồng đại diện người lao động / học viên">Betriebsrat / JAV</span>, Ausbildungsberater der <span class="term" data-de="IHK / HWK" data-vi="Phòng Thương mại / Thợ thủ công">IHK / HWK</span> oder Lehrkräfte der Berufsschule.</li>
              <li><strong>Schlichtung &amp; Arbeitsgericht:</strong> Schlichtungsausschuss der Kammer oder Klage vor dem <span class="term" data-de="Arbeitsgericht" data-vi="tòa án lao động">Arbeitsgericht</span> als letzter Schritt.</li>
            </ol>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Khi xảy ra xung đột tại nơi học nghề, học viên giải quyết theo trình tự: (1) Đối thoại trực tiếp với <i>Ausbilder</i> → (2) Nhờ <i>Betriebsrat / JAV</i>, cố vấn của <i>IHK / HWK</i> hoặc giáo viên trường nghề hỗ trợ → (3) Hòa giải tại IHK/HWK hoặc đưa ra Tòa án lao động (<i>Arbeitsgericht</i>).</div>

            <h3 class="sub">4. Rechtlicher Rahmen (3-Seiten-Verhältnis)</h3>
            <p>Der <span class="term" data-de="Ausbildungsvertrag" data-vi="hợp đồng đào tạo">Ausbildungsvertrag</span> regelt die Rechte und Pflichten im Zusammenspiel der drei Beteiligten: Der Auszubildende verpflichtet sich zum Lernen und erhält Vergütung; der Betrieb vermittelt praktische Fertigkeiten gemäß Ausbildungsordnung; der Staat stellt über die Berufsschule den theoretischen Unterricht nach <span class="term" data-de="Rahmenlehrplan" data-vi="chương trình học khung">Rahmenlehrplan</span> sicher.</p>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Hợp đồng đào tạo nghề (<i>Ausbildungsvertrag</i>) gắn kết 3 bên: Học viên có nghĩa vụ học tập và nhận lương trợ cấp; Doanh nghiệp đào tạo thực hành theo <i>Ausbildungsordnung</i>; Nhà nước đảm bảo giảng dạy lý thuyết tại trường nghề theo <i>Rahmenlehrplan</i> và giám sát thi cử qua IHK/HWK.</div>
          `,
          qa: [
            {
              q: "Nennen Sie je zwei Vor- und Nachteile der dualen Ausbildung aus Sicht der Auszubildenden!",
              qVi: "Hãy nêu 2 ưu điểm và 2 nhược điểm của hệ thống đào tạo kép dưới góc nhìn của học viên (Azubi)!",
              a: "Vorteile: 1. Praktische Erfahrung sammeln. 2. Eigenes Gehalt (finanziell unabhängig).\nNachteile: 1. Stress durch Arbeit und Lernen. 2. Weniger Freizeit/Ferien als Schüler/Studenten.",
              aVi: "Ưu điểm: 1. Tích lũy kinh nghiệm thực tế. 2. Có lương trợ cấp riêng (tự chủ tài chính).\nNhược điểm: 1. Áp lực vừa làm việc vừa học tập. 2. Ít thời gian rảnh và kỳ nghỉ hơn học sinh/sinh viên."
            },
            {
              q: "Welche Stellen helfen Azubis bei Konflikten im Betrieb?",
              qVi: "Những cơ quan/bộ phận nào hỗ trợ học viên khi xảy ra xung đột tại doanh nghiệp?",
              a: "1. Direktes Gespräch mit dem Ausbilder. 2. Betriebsrat / JAV. 3. IHK oder HWK. 4. Lehrer an der Berufsschule.",
              aVi: "1. Đối thoại trực tiếp với người đào tạo (Ausbilder). 2. Hội đồng nhân viên (Betriebsrat) / Đại diện thanh thiếu niên & học viên (JAV). 3. Phòng Công nghiệp & Thương mại (IHK) hoặc Phòng Thủ công nghiệp (HWK). 4. Giáo viên trường nghề."
            }
          ],
          vokabeln: [
            { de: "Duale Ausbildung", vi: "hệ thống đào tạo nghề kép" },
            { de: "Jugendarbeitslosigkeit", vi: "thất nghiệp giới trẻ" },
            { de: "Betriebsrat", vi: "hội đồng doanh nghiệp" },
            { de: "Rahmenbedingungen", vi: "điều kiện khung pháp lý" }
          ]
        }
      ]
    },
    {
      id: "gk-gle-block-2",
      badge: "GK-GLE (S. 11–25)",
      title: "2. Familie, Gleichberechtigung & Karikatur",
      items: [
        {
          id: "gk-gle-ls11-25",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16"/><path d="M9 20h6"/><path d="M4 9h16"/><path d="M4 9l-2.5 4"/><path d="M20 9l2.5 4"/><path d="M1.5 13h5"/><path d="M17.5 13h5"/></svg>',
          name: "S. 11–25 · Familie, Gleichberechtigung & Karikatur",
          desc: "Familie früher vs. heute · Gender Pay Gap · Karikatur Homeoffice · 2 Leitbilder der Familienpolitik",
          keyPoints: [
            "<b>Früher vs. Heute:</b> 1960er-Jahre Versorgerehe (> 90 % frühe Heirat) vs. heute vielfältige Lebensformen (Patchwork, WG, Ehe für alle 2017).",
            "<b>Gender Pay Gap:</b> Frauen stellen 29 % der Führungskräfte; Lohnunterschiede bestehen auf allen Qualifikationsebenen (Fachkräfte: 22,40 € vs. 20,10 €).",
            "<b>Karikatur Homeoffice (4 Schritte):</b> Einleitung → Beschreibung (Kind im Laufstall, vertauschte Fotos) → Deutung (Homeoffice zu Lasten des Kindes) → Fazit.",
            "<b>2 Leitbilder der Familienpolitik:</b> LB 1 (Vereinbarkeit: Elternzeit, Elterngeld 67 % Netto) vs. LB 2 (Traditionell: Ehegatten-Splitting ca. 20 Mrd. €/Jahr)."
          ],
          pages: { folder: "gk-gle", from: 11, to: 25, prefix: "GK01-LS" },
          content: `
            <h2>Familie, Gleichberechtigung &amp; Karikatur (S. 11–25)</h2>
            <div class="hint">GK-GLE · Gleichberechtigung, Karikaturanalyse &amp; Familienpolitik</div>

            <h3 class="sub">1. Familie &amp; Lebensformen: Früher vs. Heute</h3>
            <table>
              <tr><th>Kriterium</th><th>Früher (1960er-Jahre)</th><th>Heute</th></tr>
              <tr>
                <td><strong>Dominantes Modell</strong></td>
                <td><span class="term" data-de="Versorgerehe" data-vi="hôn nhân chu cấp đơn phương">Versorgerehe</span> (Mann als Alleinverdiener, Frau als Hausfrau)</td>
                <td>Vielfalt: <span class="term" data-de="Patchwork-Familie" data-vi="gia đình ghép">Patchwork-Familie</span>, Alleinerziehende, <span class="term" data-de="Ehe für alle" data-vi="hôn nhân đồng giới">Ehe für alle (2017)</span></td>
              </tr>
              <tr>
                <td><strong>Heirat &amp; Berufseinstieg</strong></td>
                <td>&gt; 90 % heirateten früh; Ausbildungsbeginn mit 14–16 Jahren</td>
                <td>Spätere Heirat oder nichteheliche Lebensgemeinschaft; Berufseinstieg oft mit 20–25 Jahren</td>
              </tr>
            </table>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> So với thập niên 1960 (mô hình <i>Versorgerehe</i> — chồng đi làm nuôi cả nhà, vợ nội trợ, kết hôn sớm trên 90%), gia đình hiện đại tại Đức đa dạng hơn nhiều: gia đình ghép (<i>Patchwork-Familie</i>), cha/mẹ đơn thân (<i>Alleinerziehende</i>), hôn nhân cho mọi người (<i>Ehe für alle</i> từ 2017) và độ tuổi lập gia đình muộn hơn.</div>

            <h3 class="sub">2. Einkommensunterschiede zwischen Männern und Frauen (Gender Pay Gap)</h3>
            <ul>
              <li><strong>Führungspositionen:</strong> Männer erreichen häufiger die oberste <span class="term" data-de="Führungsebene" data-vi="cấp quản lý/lãnh đạo">Führungsebene</span> (12 % vs. 8 % bei Frauen; insgesamt nur ca. 29 % weibliche Führungskräfte).</li>
              <li><strong>Unterschied trotz gleicher Qualifikation:</strong> Selbst in der Gruppe der <span class="term" data-de="Fachkräfte" data-vi="lao động lành nghề">Fachkräfte</span> (jeweils 47 % Anteil) verdienen Männer im Schnitt 22,40 €/Std. gegenüber 20,10 €/Std. bei Frauen.</li>
              <li><strong>Ursachen:</strong> Erwerbsunterbrechungen durch <span class="term" data-de="Mutterschutz &amp; Elternzeit" data-vi="bảo vệ thai sản &amp; nghỉ chăm con">Mutterschutz &amp; Elternzeit</span>, traditionelle Rollenverteilung bei der Haus- und Sorgearbeit sowie hohe Teilzeitquote bei Frauen (74 % arbeiten unter 21 Std./Woche).</li>
            </ul>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> <i>Gender Pay Gap</i> là khoảng cách thu nhập giữa nam và nữ ngay cả khi cùng trình độ chuyên môn (nhóm <i>Fachkräfte</i>: nam nhận 22,40 €/h so với nữ 20,10 €/h). Nguyên nhân chính gồm gián đoạn sự nghiệp do nghỉ thai sản/chăm con (<i>Elternzeit</i>), định kiến phân công việc nhà và tỷ lệ phụ nữ làm bán thời gian (<i>Teilzeit</i>) cao.</div>

            <h3 class="sub">3. Karikaturanalyse: Homeoffice &amp; Kinderbetreuung (S. 21–22)</h3>
            <ol>
              <li><strong>Einleitung &amp; Thema:</strong> Die Karikatur thematisiert die <span class="term" data-de="Vereinbarkeit von Beruf und Familie" data-vi="dung hòa công việc &amp; gia đình">Vereinbarkeit von Beruf und Familie</span> im Homeoffice.</li>
              <li><strong>Beschreibung:</strong> Der Vater sitzt mit dem Rücken zum Kind am Laptop; das Kleinkind ist im <span class="term" data-de="Laufstall" data-vi="cũi em bé">Laufstall</span> hinter Gittern isoliert; ironisches Detail: Auf dem Schreibtisch steht ein Foto von Mutter und Kind, im Laufstall hängt ein Foto des Vaters im Anzug.</li>
              <li><strong>Deutung &amp; Fazit:</strong> Der Zeichner kritisiert die geschönte Vorstellung vom Homeoffice: Statt echter Nähe entstehen zwei getrennte Welten <span class="term" data-de="zu Lasten des Kindes" data-vi="gây thiệt thòi cho trẻ">zu Lasten des Kindes</span>.</li>
            </ol>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Phân tích tranh biếm họa <i>Homeoffice</i> (4 bước): (1) Chủ đề: Dung hòa công việc và gia đình. (2) Mô tả: Người bố quay lưng làm việc với laptop, đứa trẻ bị nhốt trong cũi (<i>Laufstall</i>) nhìn ảnh bố mặc vest. (3) Giải nghĩa &amp; Kết luận: Tác giả phê phán ảo tưởng về Homeoffice — thực tế tạo ra sự ngăn cách và gây thiệt thòi cho đứa trẻ.</div>

            <h3 class="sub">4. Zwei Leitbilder der deutschen Familienpolitik</h3>
            <table>
              <tr><th>Leitbild</th><th>Ziele &amp; Maßnahmen</th><th>Vor- &amp; Nachteile</th></tr>
              <tr>
                <td><strong>Leitbild 1: Vereinbarkeit</strong></td>
                <td>Beide Eltern sind erwerbstätig. Maßnahmen: <span class="term" data-de="Elterngeld" data-vi="trợ cấp cha mẹ">Elterngeld</span> (67 % vom Netto, max. 1.800 €), <span class="term" data-de="Elternzeit" data-vi="nghỉ thai sản/chăm con">Elternzeit</span> (bis 36 Monate), Ausbau der Kitas.</td>
                <td>(+) Finanzielle Unabhängigkeit beider Partner, kein Karriereknick.<br>(-) Hohe Zeit- und Organisationsbelastung.</td>
              </tr>
              <tr>
                <td><strong>Leitbild 2: Traditionell</strong></td>
                <td>Stärkung der Ein-Verdiener-Ehe. Maßnahme: <span class="term" data-de="Ehegatten-Splitting" data-vi="gộp thuế vợ chồng">Ehegatten-Splitting</span> (Steuervorteil für Verheiratete mit unterschiedlichem Einkommen).</td>
                <td>(+) Mehr Zeit für die Kindererziehung zu Hause.<br>(-) Finanzielle Abhängigkeit; kostet den Staat ca. 20 Mrd. €/Jahr.</td>
              </tr>
            </table>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Hai định hướng chính sách gia đình: <b>Leitbild 1 (Vereinbarkeit)</b> khuyến khích cả hai vợ chồng đi làm thông qua <i>Elterngeld</i> (67 % lương Netto, tối đa 1.800 €) và <i>Elternzeit</i> (tối đa 36 tháng); <b>Leitbild 2 (Traditionell)</b> ưu đãi mô hình 1 người đi làm qua chế độ gộp thuế vợ chồng (<i>Ehegatten-Splitting</i>).</div>
          `,
          qa: [
            {
              q: "Was versteht man unter dem Gender Pay Gap?",
              qVi: "Khái niệm Gender Pay Gap được hiểu là gì?",
              a: "Der Gender Pay Gap beschreibt den durchschnittlichen Lohnunterschied zwischen Männern und Frauen bei gleicher Qualifikation und Position.",
              aVi: "Gender Pay Gap mô tả mức chênh lệch thu nhập trung bình giữa nam và nữ dù có cùng trình độ chuyên môn và vị trí công việc."
            },
            {
              q: "Nennen Sie den Unterschied zwischen Elterngeld und Ehegatten-Splitting!",
              qVi: "Hãy nêu sự khác biệt giữa Elterngeld và Ehegatten-Splitting!",
              a: "Elterngeld unterstützt Eltern finanziell (67 % Netto), die nach der Geburt für ihr Kind da sein wollen (Leitbild 1). Ehegatten-Splitting ist ein Steuervorteil für verheiratete Paare, der besonders dem Alleinverdiener-Modell nützt (Leitbild 2).",
              aVi: "Elterngeld hỗ trợ tài chính (67 % lương Netto) cho cha mẹ tạm nghỉ chăm con sau sinh (Leitbild 1). Ehegatten-Splitting là ưu đãi gộp thuế cho các cặp kết hôn, đặc biệt có lợi cho mô hình 1 người đi làm chính (Leitbild 2)."
            }
          ],
          vokabeln: [
            { de: "Gender Pay Gap", vi: "khoảng cách chênh lệch thu nhập giới" },
            { de: "Vereinbarkeit", vi: "sự dung hòa công việc và gia đình" },
            { de: "Elterngeld", vi: "trợ cấp cha mẹ nghỉ chăm con" },
            { de: "Ehegatten-Splitting", vi: "chế độ tính thuế gộp thu nhập vợ chồng" }
          ]
        }
      ]
    },
    {
      id: "gk-gle-block-3",
      badge: "GK-GLE (S. 26–30)",
      title: "3. Maslow-Pyramide & Demografischer Wandel",
      items: [
        {
          id: "gk-gle-ls26-30",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
          name: "S. 26–30 · Maslow-Pyramide & Demografischer Wandel",
          desc: "5 Stufen nach Maslow · Bevölkerungspyramiden 1910–2060 · Generationenvertrag · Frauenquote",
          keyPoints: [
            "<b>Maslow-Pyramide (5 Stufen):</b> 3 Defizitbedürfnisse (Grundbedürfnisse, Sicherheit, soziale Beziehungen) + 2 Wachstumsbedürfnisse (Wertschätzung, Selbstverwirklichung).",
            "<b>Demografischer Wandel:</b> 1910 Pyramide → 1950 Kriegseinbruch → 2019 Bienenkorb → 2060 Urnenform (Überalterung, Geburtenrate ca. 1,54 Kinder/Frau).",
            "<b>Generationenvertrag:</b> Erwerbstätige finanzieren im Umlageverfahren die aktuellen Renten → Finanzierungsproblem durch schrumpfende Beitragszahler.",
            "<b>Frauenquote:</b> Pro (gesetzlicher Druck bricht gläserne Decke) vs. Kontra (Leistungsprinzip, Gefahr des Stigmas „Quotenfrau“)."
          ],
          pages: { folder: "gk-gle", from: 26, to: 30, prefix: "GK01-LS" },
          content: `
            <h2>Maslow-Pyramide &amp; Demografischer Wandel (S. 26–30)</h2>
            <div class="hint">GK-GLE · Bedürfnispyramide nach Maslow &amp; demografische Entwicklung in Deutschland</div>

            <h3 class="sub">1. Die fünfstufige Bedürfnispyramide nach Abraham Maslow</h3>
            <ol>
              <li><span class="term" data-de="Selbstverwirklichung" data-vi="tự thể hiện bản thân">Selbstverwirklichung</span> – Entfaltung eigener Talente, Kreativität und Unabhängigkeit (Spitze).</li>
              <li><span class="term" data-de="Soziale Wertschätzung" data-vi="được tôn trọng &amp; công nhận">Soziale Wertschätzung</span> – Anerkennung, Status, beruflicher Erfolg.</li>
              <li><span class="term" data-de="Soziale Beziehungen" data-vi="mối quan hệ xã hội">Soziale Beziehungen</span> – Familie, Freundschaft, Liebe, Zugehörigkeit.</li>
              <li><span class="term" data-de="Sicherheit" data-vi="an toàn / an ninh">Sicherheit</span> – Gesetze, sicherer Arbeitsplatz, Schutz vor Gefahren.</li>
              <li><span class="term" data-de="Körperliche Grundbedürfnisse" data-vi="nhu cầu sinh lý cơ bản">Körperliche Grundbedürfnisse</span> – Essen, Trinken, Schlaf, Wohnung, Gesundheit (Basis).</li>
            </ol>
            <div class="formula"><b>Grundregel:</b> Die unteren 3 Stufen sind <b>Defizitbedürfnisse</b> (endend bei Sättigung); die oberen 2 Stufen sind <b>Wachstumsbedürfnisse</b> (unstillbar).</div>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Tháp nhu cầu Maslow gồm 5 tầng từ đáy lên đỉnh: (1) Nhu cầu sinh lý cơ bản → (2) Nhu cầu an toàn → (3) Quan hệ xã hội → (4) Được tôn trọng &amp; công nhận → (5) Tự khẳng định bản thân. Ba tầng dưới là nhu cầu thiếu hụt (<i>Defizitbedürfnisse</i>), hai tầng trên là nhu cầu phát triển không giới hạn (<i>Wachstumsbedürfnisse</i>).</div>

            <h3 class="sub">2. Entwicklung der Altersstruktur in Deutschland (1910 bis 2060)</h3>
            <ul>
              <li><strong>1910 (Klassische Pyramide):</strong> Hohe Geburtenrate, viele Kinder und Jugendliche, wenige Ältere.</li>
              <li><strong>1950 (Kriegseinbruch):</strong> Deutliche Einschnitte bei jungen Männern und Geburten infolge der Weltkriege.</li>
              <li><strong>2019 (Bienenkorb / Glocke):</strong> Fortschreitender <span class="term" data-de="Demografischer Wandel" data-vi="biến đổi nhân khẩu học">demografischer Wandel</span>, breite Mitte der Babyboomer.</li>
              <li><strong>2060 (Urnenform):</strong> Starke Überalterung, schmale Basis junger Menschen, gravierender Fachkräftemangel.</li>
            </ul>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Tháp dân số Đức biến đổi từ hình Kim tự tháp (1910: sinh nhiều, ít người già) → Khuyết tật do chiến tranh (1950) → Hình tổ ong/quả chuông (2019: già hóa dân số) → Hình chiếc bình/hũ (<i>Urnenform</i> 2060: người già chiếm đa số, thiếu hụt lao động trẻ).</div>

            <h3 class="sub">3. Generationenvertrag &amp; Rentenfinanzierung</h3>
            <p>Nach dem Prinzip des <span class="term" data-de="Generationenvertrag" data-vi="hợp đồng thế hệ">Generationenvertrags</span> (Umlageverfahren) finanzieren die heutigen Beitragszahler direkt die Renten der heutigen Ruheständler. Durch niedrige Geburtenraten (ca. 1,54 Kinder pro Frau) und steigende Lebenserwartung gerät die gesetzliche Rentenversicherung in eine <span class="term" data-de="Finanzierungskrise der Rentenversicherung" data-vi="khủng hoảng tài chính quỹ hưu trí">Finanzierungskrise</span>.</p>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Nguyên tắc Hợp đồng thế hệ (<i>Generationenvertrag</i>): Người đang đi làm đóng bảo hiểm để chi trả trực tiếp lương hưu cho người đang nghỉ hưu. Do tỷ lệ sinh thấp và tuổi thọ tăng, ngày càng ít người trẻ phải gánh ngày càng nhiều người nghỉ hưu, gây áp lực tài chính lớn lên quỹ hưu trí.</div>

            <h3 class="sub">4. Kontroverse um die gesetzliche Frauenquote</h3>
            <p><strong>Pro (+):</strong> Nur verbindliche gesetzliche Vorgaben durchbrechen strukturelle Barrieren; gemischte Führungsteams arbeiten wirtschaftlich erfolgreicher.<br>
            <strong>Kontra (-):</strong> Gefahr der Abstempelung als „Quotenfrau“; Besetzung von Führungspositionen sollte allein nach individueller <span class="term" data-de="Leistung" data-vi="năng lực/thành tích">Leistung</span> und Qualifikation erfolgen.</p>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Tranh luận về hạn ngạch nữ lãnh đạo (<i>Frauenquote</i>): Phe ủng hộ (<i>Pro</i>) cho rằng cần luật bắt buộc để phá bỏ rào cản vô hình và tăng hiệu quả lãnh đạo; phe phản đối (<i>Kontra</i>) cho rằng chỉ nên xét theo năng lực (<i>Leistung</i>) và tránh định kiến „Quotenfrau“.</div>
          `,
          qa: [
            {
              q: "Erklären Sie das Prinzip des Generationenvertrags!",
              qVi: "Hãy giải thích nguyên tắc Hợp đồng thế hệ (Generationenvertrag)!",
              a: "Die erwerbstätige Generation zahlt mit ihren Rentenbeiträgen die aktuellen Renten der älteren Generation (Umlageverfahren).",
              aVi: "Thế hệ đang đi làm đóng tiền bảo hiểm hưu trí để chi trả trực tiếp cho lương hưu hiện tại của thế hệ cao tuổi (cơ chế phân bổ trực tiếp)."
            },
            {
              q: "Warum ist die Urnenform der Bevölkerungspyramide für das Sozialsystem problematisch?",
              qVi: "Tại sao tháp dân số hình chiếc bình (Urnenform) lại gây khó khăn cho hệ thống an sinh xã hội?",
              a: "Weil immer weniger junge Beitragszahler für immer mehr ältere Rentner aufkommen müssen.",
              aVi: "Vì ngày càng có ít người trẻ đóng bảo hiểm nhưng lại phải chi trả cho số lượng người già nhận lương hưu ngày càng tăng."
            }
          ],
          vokabeln: [
            { de: "Bedürfnispyramide", vi: "tháp nhu cầu Maslow" },
            { de: "Demografischer Wandel", vi: "biến đổi nhân khẩu học" },
            { de: "Generationenvertrag", vi: "hợp đồng thế hệ quỹ hưu trí" },
            { de: "Frauenquote", vi: "hạn ngạch nữ lãnh đạo" }
          ]
        }
      ]
    },
    {
      id: "gk-gle-block-4",
      badge: "GK-GLE (S. 31–35)",
      title: "4. Migration, Integration & Fachkräfte",
      items: [
        {
          id: "gk-gle-ls31-35",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/></svg>',
          name: "S. 31–35 · Migration, Integration & Fachkräfte",
          desc: "3 Migrantengruppen · Fachkräfteeinwanderungsgesetz · Säulen der Integration & Wirtschaftsfaktor",
          keyPoints: [
            "<b>3 Migrantengruppen:</b> 1. Asylbewerber/Geflüchtete, 2. EU-Bürger (EU-Freizügigkeit), 3. Fachkräfte aus Drittstaaten (Fachkräfteeinwanderungsgesetz).",
            "<b>Integration (3 Säulen):</b> Spracherwerb (Deutsch), Anerkennung beruflicher Qualifikationen, gesellschaftliche Teilhabe auf Basis des Grundgesetzes.",
            "<b>Wirtschaftsfaktor Migration:</b> Steuern und Sozialabgaben entlasten die Rentenkasse und bekämpfen den Fachkräftemangel in Gastronomie, Pflege, IT und Handwerk."
          ],
          pages: { folder: "gk-gle", from: 31, to: 35, prefix: "GK01-LS" },
          content: `
            <h2>Migration, Integration &amp; Fachkräfte (S. 31–35)</h2>
            <div class="hint">GK-GLE · Zuwanderung, gelingende Integration &amp; Fachkräfteeinwanderungsgesetz</div>

            <h3 class="sub">1. Drei Hauptgruppen von Zuwanderern in Deutschland</h3>
            <ol>
              <li><strong>Asylbewerber &amp; Geflüchtete:</strong> Schutzsuchende vor Krieg und politischer Verfolgung (<span class="term" data-de="Asylrecht Art. 16a GG" data-vi="quyền tị nạn theo Điều 16a GG">Asylrecht Art. 16a GG</span>).</li>
              <li><strong>EU-Bürgerinnen und EU-Bürger:</strong> Freie Wohnort- und Arbeitsplatzwahl innerhalb der EU durch die <span class="term" data-de="EU-Freizügigkeit" data-vi="tự do di chuyển khối EU">EU-Freizügigkeit</span>.</li>
              <li><strong>Fachkräfte aus Drittstaaten:</strong> Gezielte Arbeitsmigration aus Nicht-EU-Staaten über das <span class="term" data-de="Fachkräfteeinwanderungsgesetz" data-vi="Luật Nhập cư Lao động Lành nghề">Fachkräfteeinwanderungsgesetz</span>.</li>
            </ol>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Ba nhóm người di cư chính đến Đức: (1) Người xin tị nạn do chiến tranh/bức hại chính trị (<i>Art. 16a GG</i>); (2) Công dân EU hưởng quyền tự do đi lại và làm việc (<i>EU-Freizügigkeit</i>); (3) Lao động tay nghề cao từ các nước ngoài EU theo Luật Nhập cư Lao động Lành nghề (<i>Fachkräfteeinwanderungsgesetz</i>).</div>

            <h3 class="sub">2. Zentrale Säulen erfolgreicher Integration</h3>
            <ul>
              <li><span class="term" data-de="Spracherwerb" data-vi="học ngôn ngữ tiếng Đức">Spracherwerb</span>: Gute Deutschkenntnisse als Schlüssel für Ausbildung, Beruf und Alltag.</li>
              <li><span class="term" data-de="Anerkennung von Qualifikationen" data-vi="công nhận bằng cấp chuyên môn">Anerkennung von Qualifikationen</span>: Prüfung und Gleichstellung ausländischer Berufs- und Studienabschlüsse.</li>
              <li><span class="term" data-de="Gesellschaftliche Teilhabe" data-vi="hòa nhập đời sống xã hội">Gesellschaftliche Teilhabe</span>: Achtung der Rechtsordnung und der Grundwerte des <span class="term" data-de="Grundgesetz" data-vi="Luật cơ bản / Hiến pháp CHLB Đức">Grundgesetzes</span>.</li>
            </ul>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Ba trụ cột của hội nhập (<i>Integration</i>): Học tiếng Đức (<i>Spracherwerb</i>), công nhận bằng cấp chuyên môn (<i>Anerkennung von Qualifikationen</i>), và tham gia đời sống xã hội trên nền tảng tôn trọng Hiến pháp (<i>Grundgesetz</i>).</div>

            <h3 class="sub">3. Wirtschaftliche Bedeutung der Migration</h3>
            <p>Zugewanderte Erwerbstätige zahlen <span class="term" data-de="Steuern" data-vi="thuế">Steuern</span> und <span class="term" data-de="Sozialabgaben" data-vi="đóng góp an sinh xã hội">Sozialabgaben</span>. Damit tragen sie zur Stabilisierung der Sozialkassen bei und mildern den akuten <span class="term" data-de="Arbeitskräftemangel" data-vi="thiếu hụt nhân lực">Arbeitskräftemangel</span> in Branchen wie Gastronomie, Hotellerie, Pflege, Handwerk und IT.</p>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Lao động nhập cư đóng thuế (<i>Steuern</i>) và phí bảo hiểm xã hội (<i>Sozialabgaben</i>), giúp ổn định quỹ hưu trí và bù đắp sự thiếu hụt nhân lực trầm trọng trong ngành nhà hàng - khách sạn (Gastronomie), điều dưỡng, kỹ thuật và CNTT.</div>
          `,
          qa: [
            {
              q: "Welche drei Hauptgruppen von Migranten gibt es in Deutschland?",
              qVi: "Có 3 nhóm người di cư chính nào tại Đức?",
              a: "1. Asylbewerber und Geflüchtete. 2. EU-Bürger (EU-Freizügigkeit). 3. Fachkräfte aus Drittstaaten (Fachkräfteeinwanderungsgesetz).",
              aVi: "1. Người xin tị nạn (Asylbewerber & Geflüchtete). 2. Công dân EU (theo quyền tự do đi lại EU-Freizügigkeit). 3. Lao động lành nghề từ nước thứ ba (theo Luật Fachkräfteeinwanderungsgesetz)."
            },
            {
              q: "Warum ist Migration für das deutsche Sozialsystem wichtig?",
              qVi: "Tại sao di cư lại quan trọng đối với hệ thống an sinh xã hội Đức?",
              a: "Weil Migranten als Beitragszahler helfen, den Fachkräftemangel zu reduzieren und die Sozialkassen (z. B. Rentenversicherung) zu stabilisieren.",
              aVi: "Vì người lao động nhập cư đóng bảo hiểm và thuế, giúp giảm thiếu hụt lao động có tay nghề và ổn định các quỹ an sinh xã hội (như quỹ bảo hiểm hưu trí)."
            }
          ],
          vokabeln: [
            { de: "Fachkräfteeinwanderungsgesetz", vi: "Luật Nhập cư Lao động Lành nghề" },
            { de: "EU-Freizügigkeit", vi: "quyền tự do di chuyển làm việc trong EU" },
            { de: "Anerkennung von Qualifikationen", vi: "công nhận bằng cấp chuyên môn" },
            { de: "Integration", vi: "sự hội nhập xã hội" }
          ]
        }
      ]
    },
    {
      id: "gk-gle-block-5",
      badge: "GK-GLE (S. 36–43)",
      title: "5. Strukturwandel & Industrie 4.0",
      items: [
        {
          id: "gk-gle-ls36-43",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
          name: "S. 36–43 · Strukturwandel & Industrie 4.0",
          desc: "4 Wirtschaftssektoren (I–IV) · Industrie 1.0 bis 4.0 · Karikatur Roboter · Berufsprognose 2035",
          keyPoints: [
            "<b>5 Treiber des Strukturwandels:</b> Demografie, Globalisierung, Digitalisierung, Wertewandel, Klimawandel.",
            "<b>4 Wirtschaftssektoren:</b> Sektor I (Urproduktion), II (Industrie/Handwerk), III (Dienstleistungen/Gastronomie), IV (Information/Wissen).",
            "<b>Industrie 1.0–4.0:</b> Dampfmaschine (1.0) → Fließband/Elektrizität (2.0) → IT/Elektronik (3.0) → Cyber-Physikalische Systeme & KI (4.0).",
            "<b>Prognose 2035:</b> Wachsende Berufe (Pflege, IT, Logistik, Erziehung) vs. schrumpfende Berufe (einfache Routinetätigkeiten, Kasse, einfache Büroarbeit)."
          ],
          pages: { folder: "gk-gle", from: 36, to: 43, prefix: "GK01-LS" },
          content: `
            <h2>Strukturwandel &amp; Industrie 4.0 (S. 36–43)</h2>
            <div class="hint">GK-GLE · Die vier Wirtschaftssektoren &amp; digitale Transformation der Arbeitswelt</div>

            <h3 class="sub">1. Die vier Wirtschaftssektoren</h3>
            <table>
              <tr><th>Sektor</th><th>Bezeichnung</th><th>Branchen &amp; Beispiele</th></tr>
              <tr>
                <td><strong>Sektor I</strong></td>
                <td><span class="term" data-de="Primärer Sektor" data-vi="khu vực I: khai thác tự nhiên">Primärer Sektor</span> (Urproduktion)</td>
                <td>Landwirtschaft, Forstwirtschaft, Fischerei (Landwirt, Fischer)</td>
              </tr>
              <tr>
                <td><strong>Sektor II</strong></td>
                <td><span class="term" data-de="Sekundärer Sektor" data-vi="khu vực II: sản xuất chế biến">Sekundärer Sektor</span> (Verarbeitung)</td>
                <td>Industrie, Maschinenbau, Bauwesen, Handwerk (Mechatroniker, Bauarbeiter)</td>
              </tr>
              <tr>
                <td><strong>Sektor III</strong></td>
                <td><span class="term" data-de="Tertiärer Sektor" data-vi="khu vực III: dịch vụ &amp; thương mại">Tertiärer Sektor</span> (Dienstleistungen)</td>
                <td>Gastronomie, Hotellerie, Handel, Pflege, Bildung (Koch, Restaurantfachkraft)</td>
              </tr>
              <tr>
                <td><strong>Sektor IV</strong></td>
                <td><span class="term" data-de="Quartärer Sektor" data-vi="khu vực IV: thông tin &amp; tri thức">Quartärer Sektor</span> (Information)</td>
                <td>IT, Forschung, Beratung, Hochtechnologie (Softwareentwickler, Datenanalyst)</td>
              </tr>
            </table>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Bốn khu vực kinh tế: <b>Sektor I</b> (Nông - lâm - ngư nghiệp khai thác tự nhiên), <b>Sektor II</b> (Công nghiệp chế biến, cơ khí, xây dựng), <b>Sektor III</b> (Dịch vụ &amp; thương mại — bao gồm <i>Gastronomie &amp; Hotellerie</i>), <b>Sektor IV</b> (Công nghệ thông tin, nghiên cứu &amp; tri thức).</div>

            <h3 class="sub">2. Von der Industrie 1.0 zur Industrie 4.0</h3>
            <ol>
              <li><strong>Industrie 1.0 (Ende 18. Jh.):</strong> Mechanisierung durch Wasser- und <span class="term" data-de="Dampfmaschine" data-vi="động cơ hơi nước">Dampfkraft</span>.</li>
              <li><strong>Industrie 2.0 (Ende 19. Jh.):</strong> Massenproduktion und <span class="term" data-de="Fließbandarbeit" data-vi="dây chuyền sản xuất">Fließbandarbeit</span> mithilfe elektrischer Energie.</li>
              <li><strong>Industrie 3.0 (ab 1970er):</strong> Automatisierung durch <span class="term" data-de="IT und Elektronik" data-vi="CNTT &amp; Điện tử">Elektronik und IT</span> (Computer, Roboter).</li>
              <li><strong>Industrie 4.0 (heute):</strong> Intelligente Vernetzung durch Künstliche Intelligenz (KI), Internet der Dinge (IoT) und <span class="term" data-de="Cyber-Physikalische Systeme" data-vi="hệ thống thực-ảo">Cyber-Physikalische Systeme (CPS)</span>.</li>
            </ol>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Tiến trình 4 cuộc cách mạng công nghiệp: <b>1.0</b> (Động cơ hơi nước) → <b>2.0</b> (Điện năng &amp; dây chuyền sản xuất hàng loạt) → <b>3.0</b> (Máy tính &amp; tự động hóa điện tử) → <b>4.0</b> (Trí tuệ nhân tạo KI, Internet vạn vật IoT và hệ thống thực-ảo CPS).</div>

            <h3 class="sub">3. Karikaturanalyse: Mensch und Roboter (S. 42)</h3>
            <p>Auf der Karikatur liegt ein Roboter entspannt auf dem Sofa, während ein Mensch ihm unterwürfig Kaffee serviert. Der Zeichner überspitzt die Angst, dass der Mensch durch Automatisierung zum Diener der Technik wird. Um auf dem Arbeitsmarkt zu bestehen, sind lebenslanges Lernen und <span class="term" data-de="Höherqualifizierung" data-vi="nâng cao trình độ chuyên môn">Höherqualifizierung</span> unverzichtbar.</p>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Tranh biếm họa trang 42 vẽ cảnh Robot nằm thư giãn trên sofa còn con người khúm núm bưng cà phê phục vụ. Tác giả châm biếm nỗi lo con người bị lệ thuộc vào máy móc, đồng thời nhấn mạnh tầm quan trọng của việc học tập suốt đời và nâng cao trình độ (<i>Höherqualifizierung</i>).</div>

            <h3 class="sub">4. Arbeitsmarktprognose bis 2035</h3>
            <ul>
              <li><strong>Wachsende Bereiche (+):</strong> Gesundheit und Pflege, IT und Datenanalyse, Logistik, Erziehung und soziale Berufe.</li>
              <li><strong>Schrumpfende Bereiche (-):</strong> Einfache manuelle <span class="term" data-de="Routinetätigkeiten" data-vi="công việc lặp lại đơn điệu">Routinetätigkeiten</span> in der Produktion, klassische Kassierertätigkeiten, standardisierte Verwaltungsarbeit.</li>
            </ul>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Dự báo đến năm 2035: Các ngành tăng trưởng mạnh gồm Y tế/Điều dưỡng, CNTT, Logistics, Giáo dục; các công việc thu hẹp gồm lao động thủ công lặp lại (<i>Routinetätigkeiten</i>), thu ngân truyền thống và hành chính văn phòng đơn giản.</div>
          `,
          qa: [
            {
              q: "Nennen Sie die vier Wirtschaftssektoren mit je einem Beispiel!",
              qVi: "Hãy nêu 4 khu vực kinh tế kèm theo mỗi khu vực một ví dụ!",
              a: "Sektor I (Primär): Landwirtschaft. Sektor II (Sekundär): Maschinenbau. Sektor III (Tertiär): Gastronomie/Hotellerie. Sektor IV (Quartär): Softwareentwicklung.",
              aVi: "Khu vực I (Sơ cấp): Nông nghiệp. Khu vực II (Thứ cấp): Cơ khí chế tạo. Khu vực III (Dịch vụ): Nhà hàng - Khách sạn (Gastronomie). Khu vực IV (Tri thức/IT): Phát triển phần mềm."
            },
            {
              q: "Was bedeutet Industrie 4.0?",
              qVi: "Khái niệm Industrie 4.0 có nghĩa là gì?",
              a: "Industrie 4.0 bezeichnet die Vernetzung von Maschinen, Produkten und IT-Systemen durch künstliche Intelligenz und Cyber-Physikalische Systeme.",
              aVi: "Industrie 4.0 chỉ sự kết nối thông minh giữa máy móc, sản phẩm và hệ thống CNTT thông qua trí tuệ nhân tạo (KI) và hệ thống thực-ảo (CPS)."
            }
          ],
          vokabeln: [
            { de: "Strukturwandel", vi: "thay đổi cấu trúc kinh tế xã hội" },
            { de: "Tertiärer Sektor", vi: "khu vực kinh tế III (dịch vụ)" },
            { de: "Industrie 4.0", vi: "cách mạng công nghiệp 4.0" },
            { de: "Höherqualifizierung", vi: "nâng cao trình độ chuyên môn" }
          ]
        }
      ]
    },
    {
      id: "gk-gle-block-6",
      badge: "GK-GLE (S. 44–49)",
      title: "6. Medien, Fake News & Sozialstaat",
      items: [
        {
          id: "gk-gle-ls44-49",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
          name: "S. 44–49 · Medien, Fake News & Sozialstaat",
          desc: "Echokammer & NetzDG · Sozialbudget (1.161 Mrd. €) · 3 Ziele & 3 Prinzipien des Sozialstaats",
          keyPoints: [
            "<b>Medien & Demokratie:</b> Zensurverbot (Art. 5 GG), Echokammer/Filterblase, Fake News & Deepfakes, Netzwerkdurchsetzungsgesetz (NetzDG).",
            "<b>Sozialbudget (1.161 Mrd. €):</b> Krankheit 34 %, Alter 30 %, Kinder/Familie 10,8 %, Arbeitslosigkeit 4,8 %.",
            "<b>3 Ziele des Sozialstaats:</b> Soziale Sicherheit, soziale Gerechtigkeit, soziale Teilhabe.",
            "<b>3 Prinzipien der sozialen Sicherung:</b> Versicherungsprinzip, Versorgungsprinzip, Fürsorgeprinzip (Subsidiarität)."
          ],
          pages: { folder: "gk-gle", from: 44, to: 49, prefix: "GK01-LS" },
          content: `
            <h2>Medien, Fake News &amp; Sozialstaat (S. 44–49)</h2>
            <div class="hint">GK-GLE · Digitale Medien, Desinformation &amp; Grundprinzipien des deutschen Sozialstaats</div>

            <h3 class="sub">1. Digitale Medien, Fake News &amp; NetzDG</h3>
            <ul>
              <li><span class="term" data-de="Zensurverbot" data-vi="cấm kiểm duyệt thông tin">Zensurverbot (Art. 5 GG)</span>: Das Grundgesetz schützt Meinungs- und Pressefreiheit; eine staatliche Vorzensur findet nicht statt.</li>
              <li><span class="term" data-de="Echokammer / Filterblase" data-vi="phòng phản chiếu / hộp vọng âm">Echokammer &amp; Filterblase</span>: Algorithmen sozialer Netzwerke zeigen bevorzugt gleichgesinnte Inhalte und verstärken gesellschaftliche Polarisierung.</li>
              <li><span class="term" data-de="Fake News &amp; Deepfake" data-vi="tin giả &amp; giả mạo AI">Fake News &amp; Deepfakes</span>: Gezielte Falschmeldungen und KI-manipulierte Videos gefährden die demokratische Meinungsbildung.</li>
              <li><span class="term" data-de="Netzwerkdurchsetzungsgesetz (NetzDG)" data-vi="Luật Kiểm soát Mạng xã hội">NetzDG</span>: Verpflichtet große Plattformen, strafbare Inhalte und <span class="term" data-de="Hassrede" data-vi="ngôn từ thù ghét">Hassrede</span> zeitnah zu löschen.</li>
            </ul>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Điều 5 Hiến pháp Đức bảo vệ tự do báo chí và cấm kiểm duyệt (<i>Zensurverbot</i>). Tuy nhiên, mạng xã hội dễ tạo ra hiệu ứng phòng vang (<i>Echokammer / Filterblase</i>) và lan truyền tin giả (<i>Fake News / Deepfake</i>). Luật <i>NetzDG</i> buộc các nền tảng phải xóa nhanh các nội dung phạm pháp và ngôn từ thù ghét (<i>Hassrede</i>).</div>

            <h3 class="sub">2. Das deutsche Sozialbudget (ca. 1.161 Mrd. €)</h3>
            <table>
              <tr><th>Bereich</th><th>Anteil</th><th>Verwendung</th></tr>
              <tr><td><span class="term" data-de="Krankheit" data-vi="bảo hiểm y tế">Krankheit &amp; Gesundheit</span></td><td><strong>34,0 %</strong> (ca. 395 Mrd. €)</td><td>Ärztliche Behandlung, Krankenhäuser, Medikamente</td></tr>
              <tr><td><span class="term" data-de="Alter" data-vi="bảo hiểm hưu trí">Alter &amp; Hinterbliebene</span></td><td><strong>30,0 %</strong> (ca. 349 Mrd. €)</td><td>Altersrenten und Witwen-/Waisenrenten</td></tr>
              <tr><td><span class="term" data-de="Kinder &amp; Familie" data-vi="trợ cấp trẻ em &amp; gia đình">Kinder, Ehe &amp; Familie</span></td><td><strong>10,8 %</strong> (ca. 125 Mrd. €)</td><td>Kindergeld, Elterngeld, Kinderbetreuung</td></tr>
              <tr><td><span class="term" data-de="Arbeitslosigkeit" data-vi="trợ cấp thất nghiệp">Arbeitslosigkeit</span></td><td><strong>4,8 %</strong> (ca. 56 Mrd. €)</td><td>Arbeitslosengeld, Weiterbildung, Arbeitsvermittlung</td></tr>
            </table>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Cơ cấu ngân sách an sinh xã hội Đức (<i>Sozialbudget</i> khoảng 1.161 tỷ €): Y tế &amp; sức khỏe chiếm tỷ trọng lớn nhất (<b>34 %</b>), tiếp theo là Hưu trí người cao tuổi (<b>30 %</b>), Trẻ em &amp; Gia đình (<b>10,8 %</b>), và Hỗ trợ thất nghiệp (<b>4,8 %</b>).</div>

            <h3 class="sub">3. Drei Ziele &amp; drei Prinzipien des Sozialstaats (Art. 20 GG)</h3>
            <p><strong>Drei Kernziele:</strong> 1. <span class="term" data-de="Soziale Sicherheit" data-vi="an sinh xã hội">Soziale Sicherheit</span> (Schutz vor Lebensrisiken). 2. <span class="term" data-de="Soziale Gerechtigkeit" data-vi="công bằng xã hội">Soziale Gerechtigkeit</span> (Ausgleich sozialer Unterschiede). 3. <span class="term" data-de="Soziale Teilhabe" data-vi="tham gia xã hội">Soziale Teilhabe</span> (Sicherung des Existenzminimums).</p>
            <ol>
              <li><span class="term" data-de="Versicherungsprinzip" data-vi="nguyên tắc bảo hiểm">Versicherungsprinzip</span> – Finanzierung durch Beiträge von Arbeitnehmern und Arbeitgebern; Leistung nach Einzahlung (z. B. Kranken-, Renten-, Arbeitslosenversicherung).</li>
              <li><span class="term" data-de="Versorgungsprinzip" data-vi="nguyên tắc cung cấp">Versorgungsprinzip</span> – Finanzierung aus Steuermitteln für besondere Leistungen oder Opfer für die Gemeinschaft (z. B. Elterngeld, Kindergeld, Beamtenversorgung).</li>
              <li><span class="term" data-de="Fürsorgeprinzip" data-vi="nguyên tắc cứu trợ">Fürsorgeprinzip</span> – Steuerfinanzierte Hilfe in individueller Notlage ohne vorherige Beiträge (z. B. Bürgergeld, Sozialhilfe) nach dem Prinzip der <span class="term" data-de="Subsidiarität" data-vi="tính bổ trợ (tự lực trước, nhà nước giúp sau)">Subsidiarität</span> (Eigenhilfe geht vor Staatshilfe).</li>
            </ol>
            <div class="vi"><b>Tóm tắt tiếng Việt:</b> Ba mục tiêu của Nhà nước phúc lợi (<i>Sozialstaat</i>): An sinh xã hội, Công bằng xã hội và Hòa nhập xã hội. Ba nguyên tắc tài chính cốt lõi: (1) <b>Versicherungsprinzip</b> (Đóng - hưởng qua bảo hiểm y tế, hưu trí, thất nghiệp); (2) <b>Versorgungsprinzip</b> (Chi trả từ thuế cho đóng góp đặc biệt như <i>Kindergeld, Elterngeld</i>); (3) <b>Fürsorgeprinzip</b> (Cứu trợ từ thuế cho người gặp khó khăn như <i>Bürgergeld</i> theo nguyên tắc tự lực trước — <i>Subsidiarität</i>).</div>
          `,
          qa: [
            {
              q: "Nennen Sie die drei Grundprinzipien der sozialen Sicherung in Deutschland!",
              qVi: "Hãy nêu 3 nguyên tắc cơ bản của hệ thống an sinh xã hội tại Đức!",
              a: "1. Versicherungsprinzip (beitragsfinanziert, z. B. Krankenversicherung). 2. Versorgungsprinzip (steuerfinanziert, z. B. Elterngeld). 3. Fürsorgeprinzip (steuerfinanziert bei Hilfsbedürftigkeit nach Subsidiarität, z. B. Bürgergeld).",
              aVi: "1. Nguyên tắc bảo hiểm (Versicherungsprinzip — đóng góp quỹ, VD: bảo hiểm y tế). 2. Nguyên tắc cung cấp (Versorgungsprinzip — trích từ thuế, VD: Elterngeld). 3. Nguyên tắc cứu trợ (Fürsorgeprinzip — trích từ thuế hỗ trợ người khó khăn theo nguyên tắc bổ trợ, VD: Bürgergeld)."
            },
            {
              q: "Was bedeutet das Subsidiaritätsprinzip im Sozialstaat?",
              qVi: "Nguyên tắc bổ trợ (Subsidiaritätsprinzip) trong nhà nước phúc lợi có nghĩa là gì?",
              a: "Der Staat hilft erst dann, wenn der Einzelne oder die Familie sich nicht mehr selbst helfen kann.",
              aVi: "Nhà nước chỉ can thiệp hỗ trợ khi cá nhân hoặc gia đình đã nỗ lực hết sức nhưng không thể tự trang trải được nữa."
            }
          ],
          vokabeln: [
            { de: "Zensurverbot", vi: "cấm kiểm duyệt thông tin (Hiến pháp)" },
            { de: "Netzwerkdurchsetzungsgesetz", vi: "Luật Kiểm soát Mạng xã hội NetzDG" },
            { de: "Sozialbudget", vi: "ngân sách an sinh xã hội" },
            { de: "Subsidiarität", vi: "nguyên tắc bổ trợ cứu trợ" }
          ]
        }
      ]
    }
  ];

})();
