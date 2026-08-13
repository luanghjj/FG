/**
 * gk-gle-data.js
 * Master-Daten cho giáo trình GK-GLE (Große - Stoltenberg) 49 trang (Năm 1 Gemeinschaftskunde)
 */

(function () {
  'use strict';

  window.GK_GLE_GROUPS = [
    {
      id: "gk-gle-block-1",
      badge: "GK-GLE (Trang 01-10)",
      title: "1. Duale Ausbildung & Rahmenbedingungen",
      items: [
        {
          id: "gk-gle-ls01-10",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/></svg>',
          name: "Trang 01–10 · Duale Ausbildung & Rahmenbedingungen",
          desc: "Ưu & Nhược điểm 3 góc nhìn · Chọn nghề vs Thực tế · Giải quyết xung đột · Hợp đồng 3 bên",
          keyPoints: [
            "<b>Duale Ausbildung (3 Sichten):</b> Azubi (Erfahrung/Gehalt vs Stress), Betrieb (Fachkräfte vs Kosten/Risiko), Staat (Jugendarbeitslosigkeit senken vs Krisenabhängigkeit).",
            "<b>Wunschberufe vs. Realität:</b> Khác biệt rõ rệt giữa nghề mơ ước (Informatiker/Lehrerin) và nghề đăng ký học thực tế (Kfz-Mechatroniker/Kauffrau Büromanagement).",
            "<b>Konflikte lösen (4 Schritte):</b> Direktes Gespräch → Ansprechpartner (Betriebsrat/JAV, IHK/HWK, Berufsschule) → Arbeitsgericht.",
            "<b>3-Seiten-Verhältnis:</b> Hợp đồng đào tạo giữa Azubi (Lương & học nghề), Betrieb (Đào tạo & thiết bị), Staat (Khung chương trình & trường nghề)."
          ],
          pages: { folder: "gk-gle", from: 1, to: 10, prefix: "GK01-LS" },
          content: `
            <h2>Duale Ausbildung &amp; Rahmenbedingungen (Trang 01–10)</h2>
            <div class="hint">Giáo trình GK-GLE · Große - Stoltenberg · Chuyên đề Đào tạo Kép &amp; Pháp lý</div>

            <h3 class="sub">1. Phân tích 3 Góc nhìn hệ thống Đào tạo Kép (Duale Ausbildung)</h3>
            <table>
              <tr><th>Đối tượng</th><th>Vorteile (Ưu điểm)</th><th>Nachteile (Nhược điểm)</th></tr>
              <tr>
                <td><strong>Học viên (Azubi)</strong></td>
                <td>• Tích lũy kinh nghiệm thực tế sớm (<span class="term" data-de="praktische Erfahrung" data-vi="kinh nghiệm thực tế">praktische Erfahrung</span>).<br>• Có lương hàng tháng → Tự chủ tài chính (<span class="term" data-de="finanziell unabhängig" data-vi="tự chủ tài chính">finanziell unabhängig</span>).</td>
                <td>• Áp lực vừa làm vừa học (<span class="term" data-de="Stress durch Arbeit &amp; Lernen" data-vi="áp lực làm việc &amp; học tập">Stress</span>).<br>• Ít ngày nghỉ hơn sinh viên (<span class="term" data-de="weniger Freizeit" data-vi="ít thời gian rảnh">weniger Freizeit</span>).</td>
              </tr>
              <tr>
                <td><strong>Doanh nghiệp (Betrieb)</strong></td>
                <td>• Đào tạo đúng nhân sự theo nhu cầu (<span class="term" data-de="qualifizierte Arbeitskräfte" data-vi="nhân lực chất lượng">qualifizierte Arbeitskräfte</span>).<br>• Học viên sớm đảm nhận trách nhiệm thực tế.</td>
                <td>• Chi phí &amp; thời gian đào tạo lớn (<span class="term" data-de="hohes Risiko / Kosten" data-vi="rủi ro chi phí cao">hohe Kosten</span>).<br>• Rủi ro học viên chuyển công ty sau khi ra nghề.</td>
              </tr>
              <tr>
                <td><strong>Nhà nước (Staat)</strong></td>
                <td>• Giảm tỷ lệ thất nghiệp ở thanh niên (<span class="term" data-de="beugt Jugendarbeitslosigkeit vor" data-vi="ngăn ngừa thất nghiệp giới trẻ">beugt Jugendarbeitslosigkeit vor</span>).<br>• Thúc đẩy sức mạnh nền kinh tế.</td>
                <td>• Phụ thuộc vào biến động kinh tế (<span class="term" data-de="abhängig von Wirtschaftslage" data-vi="phụ thuộc tình hình kinh tế">Wirtschaftslage</span>).<br>• Chênh lệch cơ hội theo vùng miền.</td>
              </tr>
            </table>

            <h3 class="sub">2. Nghề mơ ước vs. Nghề học thực tế (Wunschberufe vs. Realität)</h3>
            <ul>
              <li><strong>Nam giới (Jungen):</strong> Mơ ước: Informatiker, Maschinenbauer, Polizist → Thực tế đăng ký: <span class="term" data-de="Kfz-Mechatroniker" data-vi="thợ cơ khí điện tử ô tô">Kfz-Mechatroniker</span>, Fachinformatiker, Verkäufer.</li>
              <li><strong>Nữ giới (Mädchen):</strong> Mơ ước: Lehrerin, Ärztin, Erzieherin → Thực tế đăng ký: <span class="term" data-de="Kauffrau für Büromanagement" data-vi="chuyên viên quản trị văn phòng">Kauffrau cho Büromanagement</span>, Medizinische Fachangestellte, Verkäuferin.</li>
            </ul>

            <h3 class="sub">3. Phương pháp giải quyết xung đột trong Đào tạo (Konflikte lösen)</h3>
            <ol>
              <li><strong>Direktes Gespräch:</strong> Đối thoại trực tiếp giữa Azubi và <span class="term" data-de="Ausbilder" data-vi="người hướng dẫn đào tạo">Ausbilder</span>.</li>
              <li><strong>Ansprechpartner:</strong> Tìm cơ quan hỗ trợ: <span class="term" data-de="Betriebsrat / JAV" data-vi="Hội đồng đại diện người lao động / học viên">Betriebsrat</span>, <span class="term" data-de="IHK / HWK" data-vi="Phòng Thương mại / Thợ thủ công">IHK / HWK</span>, Giáo viên trường nghề.</li>
              <li><strong>Arbeitsgericht:</strong> Biện pháp cuối cùng khi không thể hòa giải (<span class="term" data-de="vor Gericht ziehen" data-vi="đưa ra tòa án lao động">Gericht</span>).</li>
            </ol>

            <h3 class="sub">4. Khung pháp lý Hợp đồng đào tạo (3-Seiten-Verhältnis)</h3>
            <p>Hợp đồng đào tạo nghề (<span class="term" data-de="Ausbildungsvertrag" data-vi="hợp đồng đào tạo">Ausbildungsvertrag</span>) quy định rõ quyền lợi và nghĩa vụ của 3 bên: Học viên (Azubi) nhận trợ cấp lương và có nghĩa vụ học tập; Doanh nghiệp (Betrieb) trang bị kỹ năng thực hành; Nhà nước (BMBF/Berufsschule) đảm bảo chương trình khung (<span class="term" data-de="Rahmenlehrplan" data-vi="chương trình học khung">Rahmenlehrplan</span>) và tổ chức thi qua IHK/HWK.</p>
          `,
          qa: [
            { q: "Nennen Sie je zwei Vor- und Nachteile der dualen Ausbildung aus Sicht der Auszubildenden!", a: "Vorteile: 1. Praktische Erfahrung sammeln. 2. Eigenes Gehalt (finanziell unabhängig).\nNachteile: 1. Stress durch Arbeit und Lernen. 2. Weniger Freizeit/Ferien als Schüler/Studenten." },
            { q: "Welche Stellen helfen Azubis bei Konflikten im Betrieb?", a: "1. Direktes Gespräch mit dem Ausbilder. 2. Betriebsrat / JAV. 3. IHK oder HWK. 4. Lehrer an der Berufsschule." }
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
      badge: "GK-GLE (Trang 11-25)",
      title: "2. Familie, Gleichberechtigung & Karikatur",
      items: [
        {
          id: "gk-gle-ls11-25",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16"/><path d="M9 20h6"/><path d="M4 9h16"/><path d="M4 9l-2.5 4"/><path d="M20 9l2.5 4"/><path d="M1.5 13h5"/><path d="M17.5 13h5"/></svg>',
          name: "Trang 11–25 · Familie, Gleichberechtigung & Karikatur",
          desc: "Gia đình Xưa-Nay · Gender Pay Gap · Phân tích Karikatur Homeoffice · 2 Leitbilder gia đình",
          keyPoints: [
            "<b>Früher vs. Heute:</b> 1960s Versorgerehe (>90% kết hôn sớm) vs. Ngày nay đa dạng hình thức (Patchwork, WG, Ehe für alle 2017).",
            "<b>Gender Pay Gap:</b> Nữ giới chiếm 29% quản lý, chênh lệch thu nhập tồn tại trên mọi cấp bậc ngay cả khi cùng trình độ (Fachkräfte: 22,40€ vs 20,10€).",
            "<b>Karikatur Homeoffice (4 Schritte):</b> Einleitung → Beschreibung (Cũi nhốt con, bức ảnh tráo đổi) → Deutung (Homeoffice gây thiệt thòi cho trẻ) → Fazit.",
            "<b>2 Leitbilder Familienpolitik:</b> LB1 (Vereinbarkeit: Elternzeit, Elterngeld 67% netto) vs. LB2 (Traditionell: Ehegatten-Splitting 20 tỷ €/năm)."
          ],
          pages: { folder: "gk-gle", from: 11, to: 25, prefix: "GK01-LS" },
          content: `
            <h2>Familie, Gleichberechtigung &amp; Karikatur (Trang 11–25)</h2>
            <div class="hint">Giáo trình GK-GLE · Bình đẳng giới, Phân tích Karikatur &amp; Chính sách gia đình</div>

            <h3 class="sub">1. Gia đình &amp; Hình thức sống: Früher vs. Heute</h3>
            <table>
              <tr><th>Tiêu chí</th><th>Trước đây (1960s)</th><th>Hiện nay (Heute)</th></tr>
              <tr>
                <td><strong>Mô hình chính</strong></td>
                <td><span class="term" data-de="Versorgerehe" data-vi="hôn nhân chu cấp đơn phương">Versorgerehe</span> (Chồng đi làm, vợ ở nhà nội trợ)</td>
                <td>Đa dạng: <span class="term" data-de="Patchwork-Familie" data-vi="gia đình ghép">Patchwork</span>, Alleinerziehende, <span class="term" data-de="Ehe für alle" data-vi="hôn nhân đồng giới">Ehe für alle (2017)</span></td>
              </tr>
              <tr>
                <td><strong>Kết hôn &amp; Học nghề</strong></td>
                <td>>90% kết hôn sớm; Học nghề từ 14–16 tuổi</td>
                <td>Kết hôn muộn/không kết hôn; Ra trường muộn (20–25 tuổi)</td>
              </tr>
            </table>

            <h3 class="sub">2. Phân tích khoảng cách thu nhập giới (Gender Pay Gap)</h3>
            <ul>
              <li><strong>Tỷ lệ lãnh đạo:</strong> Nam giới chiếm 12% ở vị trí quản lý cao cấp so với 8% của nữ giới (<span class="term" data-de="Führungsebene" data-vi="cấp quản lý/lãnh đạo">Führungsebene</span>).</li>
              <li><strong>Cùng trình độ vẫn chênh lệch:</strong> Ở nhóm <span class="term" data-de="Fachkräfte" data-vi="lao động lành nghề">Fachkräfte</span> (cùng 47%), nam nhận 22,40 €/h so với 20,10 €/h của nữ.</li>
              <li><strong>Nguyên nhân:</strong> Rủi ro thai sản đối với doanh nghiệp (<span class="term" data-de="Mutterschutz &amp; Elternzeit" data-vi="bảo vệ thai sản &amp; nghỉ chăm con">Elternzeit</span>), kỳ vọng phân công việc nhà, và tỷ lệ nữ làm bán thời gian cao (74% làm unter 21 Std/Woche).</li>
            </ul>

            <h3 class="sub">3. Phân tích Tranh biếm họa: Homeoffice &amp; Kinderbetreuung (Trang 21-22)</h3>
            <ol>
              <li><strong>Einleitung &amp; Thema:</strong> Khả năng dung hòa công việc và chăm con tại nhà (<span class="term" data-de="Vereinbarkeit von Beruf und Familie" data-vi="dung hòa công việc &amp; gia đình">Vereinbarkeit</span>).</li>
              <li><strong>Beschreibung:</strong> Cha làm việc quay lưng lạiLaptop; Đứa trẻ bị nhốt trong cũi (<span class="term" data-de="Laufstall" data-vi="cũi em bé">Laufstall</span>) với rào chắn cô lập; Bức ảnh tráo đổi (bàn làm việc để ảnh mẹ con, trong cũi để ảnh bố mặc Suit).</li>
              <li><strong>Deutung &amp; Fazit:</strong> Tác giả chỉ trích gay gắt quan niệm màu hồng về Homeoffice. Việc kết hợp này tạo ra 2 thế giới riêng biệt và gây thiệt thòi cho đứa trẻ (<span class="term" data-de="zu Lasten des Kindes" data-vi="gây thiệt thòi cho trẻ">zu Lasten des Kindes</span>).</li>
            </ol>

            <h3 class="sub">4. So sánh 2 Mô hình Định hướng Chính sách Gia đình (Leitbilder)</h3>
            <table>
              <tr><th>Chính sách</th><th>Mục tiêu &amp; Biện pháp</th><th>Ưu / Nhược điểm</th></tr>
              <tr>
                <td><strong>Leitbild 1: Vereinbarkeit</strong></td>
                <td>Cả bố mẹ cùng đi làm. Biện pháp: <span class="term" data-de="Elterngeld" data-vi="trợ cấp cha mẹ">Elterngeld</span> (67% lương ròng, tối đa 1.800€), <span class="term" data-de="Elternzeit" data-vi="nghỉ thai sản/chăm con">Elternzeit</span> (đến 36 tháng).</td>
                <td>(+) Bình đẳng tài chính, không đứt gãy sự nghiệp.<br>(-) Áp lực quản lý thời gian cao.</td>
              </tr>
              <tr>
                <td><strong>Leitbild 2: Traditionell</strong></td>
                <td>Củng cố gia đình truyền thống 1 người đi làm. Biện pháp: <span class="term" data-de="Ehegatten-Splitting" data-vi="gộp thuế vợ chồng">Ehegatten-Splitting</span> (giảm thuế gộp).</td>
                <td>(+) Nhiều thời gian chăm sóc con.<br>(-) Phụ thuộc tài chính; Tốn 20 tỷ €/năm ngân sách.</td>
              </tr>
            </table>
          `,
          qa: [
            { q: "Was versteht man unter dem Gender Pay Gap?", a: "Der Gender Pay Gap beschreibt den durchschnittlichen Lohnunterschied zwischen Männern und Frauen bei gleicher Qualifikation und Position." },
            { q: "Nennen Sie den Unterschied zwischen Elterngeld und Ehegatten-Splitting!", a: "Elterngeld unterstützt Eltern finanziell (67% Netto), die nach der Geburt für ihr Kind da sein wollen (Leitbild 1). Ehegatten-Splitting ist ein Steuervorteil für verheiratete Paare, der besonders dem Alleinverdiener-Modell nützt (Leitbild 2)." }
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
      badge: "GK-GLE (Trang 26-30)",
      title: "3. Maslow-Pyramide & Demografischer Wandel",
      items: [
        {
          id: "gk-gle-ls26-30",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
          name: "Trang 26–30 · Maslow Pyramide & Demografischer Wandel",
          desc: "Tháp Maslow 5 tầng · Tự định hướng cá nhân · Tháp dân số 1910–2060 · Frauenquote",
          keyPoints: [
            "<b>Maslow Pyramide:</b> 5 tầng: 3 Defizitbedürfnisse (Grundbedürfnisse, Sicherheit, Soziales) + 2 Unstillbare Bedürfnisse (Anerkennung, Selbstverwirklichung).",
            "<b>Demografischer Wandel:</b> 1910 Pyramide → 1950 Kriegsschaden → 2019 Bienenkorb → 2060 Urnenform (Già hóa, tỷ lệ sinh 1,54 con/nữ).",
            "<b>Generationenvertrag:</b> Quỹ hưu trí thu của người đang làm chi cho người nghỉ hưu → Nguy cơ vỡ quỹ do thiếu người trẻ.",
            "<b>Frauenquote:</b> Tranh luận Pro (Áp lực luật mới thay đổi) vs. Kontra (Năng lực thực tế, rủi ro bị coi là \"Quotenfrau\")."
          ],
          pages: { folder: "gk-gle", from: 26, to: 30, prefix: "GK01-LS" },
          content: `
            <h2>Maslow Pyramide &amp; Demografischer Wandel (Trang 26–30)</h2>
            <div class="hint">Giáo trình GK-GLE · Tháp nhu cầu Maslow &amp; Biến đổi Nhân khẩu học Đức</div>

            <h3 class="sub">1. Tháp nhu cầu 5 tầng của Abraham Maslow (Bedürfnispyramide)</h3>
            <ol>
              <li><span class="term" data-de="Selbstverwirklichung" data-vi="tự thể hiện bản thân">Selbstverwirklichung</span> – Độc lập, sáng tạo, phát triển tiềm năng cá nhân.</li>
              <li><span class="term" data-de="Soziale Wertschätzung" data-vi="được tôn trọng &amp; công nhận">Wertschätzung</span> – Được công nhận, địa vị, thành công công việc.</li>
              <li><span class="term" data-de="Soziale Beziehungen" data-vi="mối quan hệ xã hội">Soziale Beziehungen</span> – Gia đình, bạn bè, tình yêu, sự gắn kết.</li>
              <li><span class="term" data-de="Sicherheit" data-vi="an toàn &amp; ổn định">Sicherheit</span> – Pháp luật, việc làm ổn định, bảo vệ khỏi nguy hiểm.</li>
              <li><span class="term" data-de="Körperliche Grundbedürfnisse" data-vi="nhu cầu sinh lý cơ bản">Grundbedürfnisse</span> – Ăn, uống, ngủ, chỗ ở, sức khỏe.</li>
            </ol>
            <div class="formula"><b>Quy luật:</b> 3 tầng dưới là <i>Defizitbedürfnisse</i> (nhu cầu thiếu hụt - dừng khi đủ); 2 tầng trên là <i>Unstillbare Bedürfnisse</i> (càng phát triển càng muốn hướng tới).</div>

            <h3 class="sub">2. Tiến trình biến đổi tháp dân số Đức (1910 đến 2060)</h3>
            <ul>
              <li><strong>1910 (Pyramide):</strong> Tỷ lệ sinh rất cao, nhiều trẻ em, ít người già.</li>
              <li><strong>1950 (Kriegseinbruch):</strong> Mất cân đối nam giới lao động do Thế chiến II.</li>
              <li><strong>2019 (Bienenkorb/Glocke):</strong> Già hóa dân số (<span class="term" data-de="Demografischer Wandel" data-vi="biến đổi nhân khẩu học">Demografischer Wandel</span>), người già tăng nhanh.</li>
              <li><strong>2060 (Urnenform):</strong> Người cao tuổi chiếm đa số, nguy cơ thiếu hụt lao động trầm trọng.</li>
            </ul>

            <h3 class="sub">3. Hợp đồng thế hệ (Generationenvertrag) &amp; Khủng hoảng Quỹ Hưu trí</h3>
            <p>Nguyên tắc <span class="term" data-de="Generationenvertrag" data-vi="hợp đồng thế hệ">Generationenvertrag</span>: Người đang đi làm đóng phí bảo hiểm để chi trả trực tiếp cho người đang nghỉ hưu. Do tỷ lệ sinh giảm (1,54 con/nữ) và tuổi thọ tăng, số người làm việc giảm còn số người nhận lương hưu tăng → Nguy cơ vỡ quỹ hưu trí (<span class="term" data-de="Finanzierungskrise der Rentenversicherung" data-vi="khủng hoảng tài chính quỹ hưu trí">Rentenkrise</span>).</p>

            <h3 class="sub">4. Tranh luận về Hạn ngạch nữ lãnh đạo (Frauenquote)</h3>
            <p><strong>Pro (+):</strong> Chỉ có áp lực pháp lý mới giúp nữ giới phá vỡ rào cản vô hình; Đa dạng ban lãnh đạo giúp doanh nghiệp hoạt động hiệu quả hơn.<br>
            <strong>Kontra (-):</strong> Phụ nữ không muốn bị gắn nhãn "Quotenfrau"; Cần đánh giá thuần túy dựa trên năng lực (<span class="term" data-de="Leistung" data-vi="năng lực/thành tích">Leistung</span>).</p>
          `,
          qa: [
            { q: "Erklären Sie das Prinzip des Generationenvertrags!", a: "Die erwerbstätige Generation zahlt mit ihren Rentenbeiträgen die aktuellen Renten der älteren Generation (Umlageverfahren)." },
            { q: "Warum ist die Urnenform der Bevölkerungspyramide für das Sozialsystem problematisch?", a: "Weil immer weniger junge Beitragszahler für immer mehr ältere Rentner aufkommen müssen." }
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
      badge: "GK-GLE (Trang 31-35)",
      title: "4. Migration, Integration & Fachkräfte",
      items: [
        {
          id: "gk-gle-ls31-35",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/></svg>',
          name: "Trang 31–35 · Migration, Integration & Fachkräfte",
          desc: "3 Nhóm di cư · Fachkräfteeinwanderungsgesetz · Yếu tố hội nhập & Đóng góp kinh tế",
          keyPoints: [
            "<b>3 di cư Gruppe:</b> 1. Asylbewerber (Tị nạn), 2. EU-Bürger (EU-Freizügigkeit), 3. Fachkräfte aus Drittstaaten (Luật Fachkräfteeinwanderungsgesetz).",
            "<b>Hội nhập (Integration):</b> 3 trụ cột: Spracherwerb (Tiếng Đức), Anerkennung (Công nhận bằng cấp), Teilhabe (Hòa nhập giá trị GG).",
            "<b>Wirtschaftsfaktor Migration:</b> Đóng góp thuế & bảo hiểm xã hội (gánh vác Rentenversicherung), lấp khoảng trống nhân sự Gastro/Y tế/IT."
          ],
          pages: { folder: "gk-gle", from: 31, to: 35, prefix: "GK01-LS" },
          content: `
            <h2>Migration, Integration &amp; Fachkräfte (Trang 31–35)</h2>
            <div class="hint">Giáo trình GK-GLE · Di cư, Hội nhập &amp; Luật Nhập cư Lao động Tay nghề cao</div>

            <h3 class="sub">1. Các nhóm người di cư đến Đức (3 Gruppen)</h3>
            <ol>
              <li><strong>Asylbewerber &amp; Geflüchtete:</strong> Người xin tị nạn do chiến tranh, xung đột chính trị (<span class="term" data-de="Asylrecht Art. 16a GG" data-vi="quyền tị nạn theo Điều 16a GG">Asyl</span>).</li>
              <li><strong>EU-Bürger:</strong> Công dân khối EU tự do di chuyển và làm việc (<span class="term" data-de="EU-Freizügigkeit" data-vi="tự do di chuyển khối EU">EU-Freizügigkeit</span>).</li>
              <li><strong>Fachkräfte aus Drittstaaten:</strong> Lao động lành nghề từ nước thứ 3 theo <span class="term" data-de="Fachkräfteeinwanderungsgesetz" data-vi="Luật Nhập cư Lao động Lành nghề">Fachkräfteeinwanderungsgesetz</span>.</li>
            </ol>

            <h3 class="sub">2. Yếu tố cốt lõi của Hội nhập (Integration)</h3>
            <ul>
              <li><span class="term" data-de="Spracherwerb" data-vi="học ngôn ngữ tiếng Đức">Spracherwerb</span>: Tiếng Đức là chìa khóa để hội nhập thị trường lao động và đời sống xã hội.</li>
              <li><span class="term" data-de="Anerkennung von Qualifikationen" data-vi="công nhận bằng cấp chuyên môn">Anerkennung</span>: Quy trình thẩm định và công nhận bằng cấp nghề nước ngoài.</li>
              <li><span class="term" data-de="Gesellschaftliche Teilhabe" data-vi="hòa nhập đời sống xã hội">Teilhabe</span>: Tôn trọng trật tự pháp luật và các giá trị của Hiến pháp (<span class="term" data-de="Grundgesetz" data-vi="Hiến pháp Đức">Grundgesetz</span>).</li>
            </ul>

            <h3 class="sub">3. Vai trò kinh tế của Di cư (Wirtschaftsfaktor Migration)</h3>
            <p>Người lao động nhập cư nộp thuế (<span class="term" data-de="Steuern" data-vi="thuế">Steuern</span>) và đóng bảo hiểm xã hội (<span class="term" data-de="Sozialabgaben" data-vi="đóng góp an sinh xã hội">Sozialabgaben</span>), giúp bù đắp lực lượng lao động thiếu hụt (<span class="term" data-de="Arbeitskräftemangel" data-vi="thiếu hụt nhân lực">Arbeitskräftemangel</span>) trong các ngành Gastro, Y tế, IT và Logistics.</p>
          `,
          qa: [
            { q: "Welche drei Hauptgruppen von Migranten gibt es in Deutschland?", a: "1. Asylbewerber und Geflüchtete. 2. EU-Bürger (EU-Freizügigkeit). 3. Fachkräfte aus Drittstaaten (Fachkräfteeinwanderungsgesetz)." },
            { q: "Warum ist Migration für das deutsche Sozialsystem wichtig?", a: "Weil Migranten als Beitragszahler helfen, den Fachkräftemangel zu reduzieren und die Sozialkassen (z. B. Rentenversicherung) zu stabilisieren." }
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
      badge: "GK-GLE (Trang 36-43)",
      title: "5. Strukturwandel & Industrie 4.0",
      items: [
        {
          id: "gk-gle-ls36-43",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
          name: "Trang 36–43 · Strukturwandel & Industrie 4.0",
          desc: "5 Nhân tố đổi mới · 4 Khu vực I–IV · Tiến trình 1.0–4.0 · Karikatur Robot · Nghề 2035",
          keyPoints: [
            "<b>5 Faktoren des Strukturwandels:</b> Demografie, Globalisierung, Digitalisierung, Wertewandel, Klimawandel.",
            "<b>4 Wirtschaftssektoren:</b> Sektor I (Khai thác tự nhiên), II (Chế biến/Sản xuất), III (Dịch vụ/Gastro), IV (Thông tin/Tri thức).",
            "<b>Industrie 4.0:</b> Dampfmaschine (1.0) → Fließband (2.0) → IT/Elektronik (3.0) → Cyber-Physikalische Systeme & KI (4.0).",
            "<b>Prognose 2035:</b> Tăng trưởng (Y tế, IT, Logistics, Erziehung) vs Thu hẹp (Lao động thủ công lặp lại, Thu ngân, Văn phòng cơ bản)."
          ],
          pages: { folder: "gk-gle", from: 36, to: 43, prefix: "GK01-LS" },
          content: `
            <h2>Strukturwandel &amp; Industrie 4.0 (Trang 36–43)</h2>
            <div class="hint">Giáo trình GK-GLE · 4 Khu vực Kinh tế &amp; Cách mạng Công nghiệp 4.0</div>

            <h3 class="sub">1. 4 Khu vực Kinh tế (Die vier Wirtschaftssektoren)</h3>
            <table>
              <tr><th>Khu vực</th><th>Tên gọi</th><th>Ngành nghề &amp; Ví dụ</th></tr>
              <tr>
                <td><strong>Sektor I</strong></td>
                <td><span class="term" data-de="Primärer Sektor" data-vi="khu vực I: khai thác tự nhiên">Primärer Sektor</span></td>
                <td>Nông nghiệp, Lâm nghiệp, Thủy sản (Nông dân, Ngư dân)</td>
              </tr>
              <tr>
                <td><strong>Sektor II</strong></td>
                <td><span class="term" data-de="Sekundärer Sektor" data-vi="khu vực II: sản xuất chế biến">Sekundärer Sektor</span></td>
                <td>Công nghiệp, Cơ khí, Xây dựng (Thợ cơ khí, Công nhân)</td>
              </tr>
              <tr>
                <td><strong>Sektor III</strong></td>
                <td><span class="term" data-de="Tertiärer Sektor" data-vi="khu vực III: dịch vụ &amp; thương mại">Tertiärer Sektor</span></td>
                <td>Gastronomie, Khách sạn, Y tế, Giáo dục (Đầu bếp, Phục vụ, Y sĩ)</td>
              </tr>
              <tr>
                <td><strong>Sektor IV</strong></td>
                <td><span class="term" data-de="Quartärer Sektor" data-vi="khu vực IV: thông tin &amp; tri thức">Quartärer Sektor</span></td>
                <td>Công nghệ thông tin, Tư vấn, Nghiên cứu (Lập trình viên, Chuyên gia)</td>
              </tr>
            </table>

            <h3 class="sub">2. Tiến trình Cách mạng Công nghiệp 1.0 đến 4.0</h3>
            <ol>
              <li><strong>Industrie 1.0:</strong> Cơ khí hóa nhờ động cơ hơi nước (<span class="term" data-de="Dampfmaschine" data-vi="động cơ hơi nước">Dampfmaschine</span>).</li>
              <li><strong>Industrie 2.0:</strong> Sản xuất hàng loạt trên dây chuyền (<span class="term" data-de="Fließbandarbeit" data-vi="dây chuyền sản xuất">Fließband</span>) nhờ điện năng.</li>
              <li><strong>Industrie 3.0:</strong> Tự động hóa nhờ máy tính &amp; phần mềm (<span class="term" data-de="IT und Elektronik" data-vi="CNTT &amp; Điện tử">IT &amp; Elektronik</span>).</li>
              <li><strong>Industrie 4.0:</strong> Trí tuệ nhân tạo (KI), Internet vạn vật (IoT), Hệ thống thực-ảo (<span class="term" data-de="Cyber-Physikalische Systeme" data-vi="hệ thống thực-ảo">CPS</span>).</li>
            </ol>

            <h3 class="sub">3. Phân tích Karikatur Industrie 4.0 (Trang 42)</h3>
            <p>Tranh vẽ Robot nằm thư giãn trên sofa trong khi con người khúm núm phục vụ cà phê cho robot. Tác giả châm biếm mối lo ngại con người bị thay thế hoặc lệ thuộc vào công nghệ. Thực tế đòi hỏi người lao động phải không ngừng nâng cao trình độ chuyên môn (<span class="term" data-de="Höherqualifizierung" data-vi="nâng cao trình độ chuyên môn">Höherqualifizierung</span>).</p>

            <h3 class="sub">4. Dự báo Ngành nghề đến 2035 (Wachsende vs. Schrumpfende Berufe)</h3>
            <ul>
              <li><strong>Tăng trưởng (+):</strong> Y tế/Chăm sóc sức khỏe, CNTT, Logistics, Giáo dục/Chăm sóc xã hội.</li>
              <li><strong>Thu hẹp (-):</strong> Lao động sản xuất thủ công lặp lại (<span class="term" data-de="Routinetätigkeiten" data-vi="công việc lặp lại đơn điệu">Routinetätigkeiten</span>), Thu ngân bán lẻ truyền thống, Hành chính văn phòng cơ bản.</li>
            </ul>
          `,
          qa: [
            { q: "Nennen Sie die vier Wirtschaftssektoren mit je einem Beispiel!", a: "Sektor I (Primär): Landwirtschaft. Sektor II (Sekundär): Maschinenbau. Sektor III (Tertiär): Gastronomie/Hotellerie. Sektor IV (Quartär): Softwareentwicklung." },
            { q: "Was bedeutet Industrie 4.0?", a: "Industrie 4.0 bezeichnet die Vernetzung von Maschinen, Produkten und IT-Systemen durch künstliche Intelligenz und Cyber-Physikalische Systeme." }
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
      badge: "GK-GLE (Trang 44-49)",
      title: "6. Medien, Fake News & Sozialstaat",
      items: [
        {
          id: "gk-gle-ls44-49",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
          name: "Trang 44–49 · Medien, Fake News & Sozialstaat",
          desc: "Echokammer & NetzDG · Ngân sách an sinh 1.161 tỷ € · 3 Mục tiêu & 3 Nguyên tắc an sinh",
          keyPoints: [
            "<b>Medien & Dân chủ:</b> Zensurverbot (Art. 5 GG), Echokammer/Filterblase, Fake News & Deepfake AI, Luật NetzDG.",
            "<b>Sozialbudget (1.161 tỷ €):</b> Y tế Krankheit 34%, Hưu trí Alter 30%, Trẻ em/Gia đình Kinder 10.8%, Thất nghiệp Arbeitslosigkeit 4.8%.",
            "<b>3 Mục tiêu Sozialstaat:</b> Soziale Sicherheit, Soziale Gerechtigkeit, Soziale Teilhabe.",
            "<b>3 Nguyên tắc An sinh:</b> Versicherungsprinzip (Bảo hiểm), Versorgungsprinzip (Cung cấp), Fürsorgeprinzip (Cứu trợ) + Subsidiarität."
          ],
          pages: { folder: "gk-gle", from: 44, to: 49, prefix: "GK01-LS" },
          content: `
            <h2>Medien, Fake News &amp; Sozialstaat (Trang 44–49)</h2>
            <div class="hint">Giáo trình GK-GLE · Truyền thông số, Tin giả &amp; Nguyên tắc An sinh Xã hội Đức</div>

            <h3 class="sub">1. Truyền thông, Tin giả &amp; Kiểm soát mạng (NetzDG)</h3>
            <ul>
              <li><span class="term" data-de="Zensurverbot" data-vi="cấm kiểm duyệt thông tin">Zensurverbot (Art. 5 GG)</span>: Hiến pháp bảo vệ tự do ngôn luận và tự do báo chí, nghiêm cấm nhà nước kiểm duyệt.</li>
              <li><span class="term" data-de="Echokammer / Filterblase" data-vi="phòng phản chiếu / hộp vọng âm">Echokammer</span>: Mạng xã hội chỉ hiển thị thông tin cùng quan điểm, gây chia rẽ xã hội.</li>
              <li><span class="term" data-de="Fake News &amp; Deepfake" data-vi="tin giả &amp; giả mạo AI">Fake News</span>: Thông tin sai lệch cố ý; Công nghệ AI tạo video/hình ảnh giả mạo tinh vi.</li>
              <li><span class="term" data-de="Netzwerkdurchsetzungsgesetz (NetzDG)" data-vi="Luật Kiểm soát Mạng xã hội">NetzDG</span>: Buộc các nền tảng mạng xã hội phải xóa các bài viết thù ghét (<span class="term" data-de="Hassrede" data-vi="ngôn từ thù ghét">Hassrede</span>) và vi phạm pháp luật.</li>
            </ul>

            <h3 class="sub">2. Ngân sách An sinh Xã hội Đức (Sozialbudget 1.161 tỷ €)</h3>
            <table>
              <tr><th>Hạng mục an sinh</th><th>Tỷ lệ %</th><th>Mô tả chi tiết</th></tr>
              <tr><td><span class="term" data-de="Krankheit" data-vi="bảo hiểm y tế">Krankheit</span></td><td><strong>34,0%</strong> (395 tỷ €)</td><td>Khám chữa bệnh &amp; chăm sóc y tế</td></tr>
              <tr><td><span class="term" data-de="Alter" data-vi="bảo hiểm hưu trí">Alter</span></td><td><strong>30,0%</strong> (349 tỷ €)</td><td>Chi trả lương hưu cho người cao tuổi</td></tr>
              <tr><td><span class="term" data-de="Kinder &amp; Familie" data-vi="trợ cấp trẻ em &amp; gia đình">Kinder</span></td><td><strong>10,8%</strong> (125 tỷ €)</td><td>Trợ cấp Kindergeld, Elterngeld, nhà trẻ</td></tr>
              <tr><td><span class="term" data-de="Arbeitslosigkeit" data-vi="trợ cấp thất nghiệp">Arbeitslosigkeit</span></td><td><strong>4,8%</strong> (56 tỷ €)</td><td>Trợ cấp thất nghiệp Arbeitslosengeld</td></tr>
            </table>

            <h3 class="sub">3. 3 Mục tiêu &amp; 3 Nguyên tắc Cốt lõi của Nhà nước An sinh (Sozialstaat)</h3>
            <p><strong>3 Mục tiêu:</strong> 1. <span class="term" data-de="Soziale Sicherheit" data-vi="an sinh xã hội">Soziale Sicherheit</span> (Bảo vệ rủi ro cuộc sống). 2. <span class="term" data-de="Soziale Gerechtigkeit" data-vi="công bằng xã hội">Soziale Gerechtigkeit</span> (Giảm khoảng cách giàu nghèo). 3. <span class="term" data-de="Soziale Teilhabe" data-vi="tham gia xã hội">Soziale Teilhabe</span> (Mức sống tối thiểu hòa nhập).</p>
            
            <p><strong>3 Nguyên tắc Tài chính:</strong></p>
            <ol>
              <li><span class="term" data-de="Versicherungsprinzip" data-vi="nguyên tắc bảo hiểm">Versicherungsprinzip</span> – Hưởng theo mức đóng góp (Bảo hiểm y tế, hưu trí, thất nghiệp).</li>
              <li><span class="term" data-de="Versorgungsprinzip" data-vi="nguyên tắc cung cấp">Versorgungsprinzip</span> – Chi trả từ tiền thuế cho cống hiến/thiệt hại đặc biệt (Elterngeld, thương binh).</li>
              <li><span class="term" data-de="Fürsorgeprinzip" data-vi="nguyên tắc cứu trợ">Fürsorgeprinzip</span> – Cứu trợ người khó khăn khẩn cấp (Bürgergeld) dựa trên nguyên tắc <span class="term" data-de="Subsidiarität" data-vi="tính bổ trợ (tự lực trước, nhà nước giúp sau)">Subsidiarität</span>.</li>
            </ol>
          `,
          qa: [
            { q: "Nennen Sie die drei Grundprinzipien der sozialen Sicherung in Deutschland!", a: "1. Versicherungsprinzip (Beitragsfinanziert, z. B. Krankenversicherung). 2. Versorgungsprinzip (Steuerfinanziert, z. B. Elterngeld). 3. Fürsorgeprinzip (Steuerfinanziert bei Hilfsbedürftigkeit nach Subsidiarität, z. B. Bürgergeld)." },
            { q: "Was bedeutet das Subsidiaritätsprinzip im Sozialstaat?", a: "Der Staat hilft erst dann, wenn der Einzelne oder die Familie sich nicht mehr selbst helfen kann." }
          ],
          vokabeln: [
            { de: "Zensurverbot", vi: "cấm kiểm duyệt thông tin (Hiến pháp)" },
            { de: "NetzWerkdurchsetzungsgesetz", vi: "Luật Kiểm soát Mạng xã hội NetzDG" },
            { de: "Sozialbudget", vi: "ngân sách an sinh xã hội" },
            { de: "Subsidiarität", vi: "nguyên tắc bổ trợ cứu trợ" }
          ]
        }
      ]
    }
  ];

})();
