/**
 * wiko-pruefung-data.js
 * Cấu trúc chuẩn theo Giáo trình "Themen in Wirtschafts- und Sozialkunde" (RM)
 * - GRUNDSTUFE (9 cụm chuyên đề chính)
 * - FACHSTUFE I (10 cụm chuyên đề chính)
 * - PRÜFUNGSTRAINING (WiSo tổng hợp & Bài tập tình huống)
 * Tự động đồng bộ và tái cấu trúc Fach WiKo trong js/faecher.js qua buildWikoFach().
 */
(function () {
  'use strict';

  const IC_BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
  const IC_EURO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 6.5A7 7 0 1 0 17 17.5"/><path d="M4 10h9"/><path d="M4 14h9"/></svg>';
  const IC_SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>';
  const IC_USERS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>';
  const IC_DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>';
  const IC_ALERT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  const IC_SCALE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>';
  const IC_COIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="m7 6 2 4"/><path d="m17 14 2 4"/></svg>';

  const T = (de, vi) => '<span class="term" data-de="' + de + '" data-vi="' + vi + '">' + de + '</span>';

  const C = {};

  // =========================================================================
  // BỔ SUNG NỘI DUNG CHO GRUNDSTUFE
  // =========================================================================

  // Mở rộng wiko-arbeitsschutz (thêm Mutterschutz & Elternzeit sâu)
  C.arbeitsschutz_ext = `
<hr style="margin:24px 0; border:0; border-top:1px dashed #cbd5e1;">
<h3 class="sub">3. Mutterschutz &amp; Elternzeit (Chuyên sâu)</h3>
<table class="tbl">
  <thead><tr><th>Gesetz</th><th>Schutzfristen &amp; Regelungen</th><th>Finanzielle Absicherung</th></tr></thead>
  <tbody>
    <tr>
      <td><b>${T('Mutterschutzgesetz', 'Luật bảo vệ thai sản')} (MuSchG)</b></td>
      <td>
        • <b>6 Wochen vor der Entbindung:</b> Schutzfrist (Beschäftigungsverbot, es sei denn, die werdende Mutter erklärt sich ausdrücklich arbeitsbereit).<br>
        • <b>8 Wochen nach der Entbindung:</b> Absolutes Beschäftigungsverbot (Arbeitsverbot gilt zwingend). Bei Früh- oder Mehrlingsgeburten verlängert auf <b>12 Wochen</b>.<br>
        • <b>${T('Kündigungsschutz', 'bảo vệ chống sa thải')}:</b> Absolutes Kündigungsverbot während der gesamten Schwangerschaft und bis zu <b>4 Monate</b> nach der Entbindung (§ 17 MuSchG).
      </td>
      <td>
        <b>${T('Mutterschaftsgeld', 'tiền trợ cấp thai sản')}:</b> Krankenkasse zahlt bis zu 13 € pro Kalendertag; der Arbeitgeber zahlt den Zuschuss bis zum vollen durchschnittlichen Nettoentgelt.
      </td>
    </tr>
    <tr>
      <td><b>${T('Elternzeit', 'thời gian nghỉ nuôi con')} (BEEG)</b></td>
      <td>
        • <b>Rechtsanspruch:</b> Bis zur Vollendung des <b>3. Lebensjahres</b> des Kindes (36 Monate) für jeden Elternteil.<br>
        • <b>Anmeldefrist:</b> Spätestens <b>7 Wochen</b> vor Antritt schriftlich beim Arbeitgeber verlangen.<br>
        • <b>Kündigungsschutz (§ 18 BEEG):</b> Beginn ab Anmeldung (frühestens 8 Wochen vor Antritt) und während der gesamten Elternzeit.
      </td>
      <td>
        <b>${T('Elterngeld', 'tiền trợ cấp nuôi con của nhà nước')}:</b> Staatliche Lohnersatzleistung für 12 bis maximal 14 Monate (bei Partnermonaten). Beträgt ca. <b>65 % bis 67 %</b> des letzten Nettoeinkommens (mindestens 300 €, maximal 1.800 € monatlich).
      </td>
    </tr>
  </tbody>
</table>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Chế độ Thai sản (MuSchG) &amp; Nghỉ nuôi con (Elternzeit):</b>
  <ul>
    <li><b>MuSchG:</b> Nghỉ 6 tuần trước sinh (trừ khi tự nguyện làm) và 8 tuần sau sinh (bắt buộc nghỉ tuyệt đối, sinh đôi/sinh non là 12 tuần). Cấm sa thải tuyệt đối trong thai kỳ và 4 tháng sau sinh. Nhận đủ 100% lương (BHYT chi tối đa 13€/ngày, chủ bù phần còn lại).</li>
    <li><b>Elternzeit:</b> Quyền luật định được nghỉ nuôi con tối đa 3 năm (36 tháng). Phải báo trước cho công ty ít nhất 7 tuần. Được bảo vệ tuyệt đối không bị sa thải. Nhận trợ cấp Elterngeld từ Nhà nước 12–14 tháng, mức 65–67% lương net (300€ – 1.800€/tháng).</li>
  </ul>
</div>
`;

  // Mở rộng wiko-betriebsrat-mitbestimmung (thêm Aktives/Passives Wahlrecht & Aufgaben)
  C.betriebsrat_ext = `
<hr style="margin:24px 0; border:0; border-top:1px dashed #cbd5e1;">
<h3 class="sub">3. Wahlrecht: Aktives vs. Passives Wahlrecht (§§ 7, 8 BetrVG)</h3>
<table class="tbl">
  <thead><tr><th>Merkmal</th><th>${T('Aktives Wahlrecht', 'quyền bầu cử (đi bỏ phiếu)')} (§ 7 BetrVG)</th><th>${T('Passives Wahlrecht', 'quyền ứng cử (được bầu làm đại diện)')} (§ 8 BetrVG)</th></tr></thead>
  <tbody>
    <tr><td><b>Bedeutung</b></td><td>Wer darf den Betriebsrat <b>wählen</b>?</td><td>Wer darf als Mitglied des Betriebsrats <b>gewählt werden</b>?</td></tr>
    <tr><td><b>Voraussetzung</b></td><td>Alle Arbeitnehmer des Betriebs, die das <b>16. Lebensjahr vollendet</b> haben (ab 16 Jahre). Auch Azubis, Teilzeitkräfte und Leiharbeiter (ab 3 Monaten).</td><td>Alle Wahlberechtigten, die das <b>18. Lebensjahr vollendet</b> haben (ab 18 Jahre) <b>UND</b> mindestens <b>6 Monate</b> im Betrieb beschäftigt sind.</td></tr>
  </tbody>
</table>
<h3 class="sub">4. Aufgaben &amp; Handlungsmöglichkeiten des Betriebsrats</h3>
<ul>
  <li><b>Überwachung:</b> Kontrolle der Einhaltung von Gesetzen, Tarifverträgen, Arbeitsschutz und Betriebsvereinbarungen.</li>
  <li><b>Interessenvertretung:</b> Verhandlung mit dem Arbeitgeber im Sinne der Belegschaft; Schutz benachteiligter Gruppen.</li>
  <li><b>4 Beteiligungsstufen:</b>
    <ol>
      <li><b>Information (§ 80 BetrVG):</b> Recht auf umfassende und rechtzeitige Unterrichtung durch den Arbeitgeber (z. B. Wirtschaftsdaten, Personalplanung).</li>
      <li><b>Anhörung &amp; Beratung (§ 102 BetrVG):</b> Zwingende Anhörung <b>vor jeder Kündigung</b>! Kündigung ohne Betriebsratsanhörung ist <b>unwirksam (nichtig)</b>!</li>
      <li><b>Mitwirkung (§ 99 BetrVG):</b> Zustimmungsverweigerungsrecht bei Einstellungen, Versetzungen und Eingruppierungen.</li>
      <li><b>Echte Mitbestimmung (§ 87 BetrVG):</b> Volles Mitbestimmungsrecht bei Beginn und Ende der täglichen Arbeitszeit, Pausen, Urlaubsplan, Einführung von Überwachungskameras. Keine Einigung → Entscheidung durch die <b>${T('Einigungsstelle', 'ủy ban hòa giải lao động')}</b>.</li>
    </ol>
  </li>
</ul>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Quyền Bầu cử &amp; Quyền hạn của Betriebsrat (Hội đồng nhân viên):</b>
  <ul>
    <li><b>Aktives Wahlrecht (Quyền đi bầu):</b> Từ đủ 16 tuổi trở lên là được bỏ phiếu (kể cả Azubi, thợ bán thời gian).</li>
    <li><b>Passives Wahlrecht (Quyền ứng cử):</b> Phải từ đủ 18 tuổi VÀ có thâm niên làm việc tại doanh nghiệp tối thiểu 6 tháng.</li>
    <li><b>Quyền tham gia 4 cấp độ:</b> Thông tin → Tham vấn (bắt buộc phải hỏi ý kiến Hội đồng trước khi sa thải bất kỳ ai, nếu không sa thải bị vô hiệu) → Cùng tham gia xét duyệt tuyển dụng/thuyên chuyển → Đồng quyết định tối cao (giờ làm, ca kíp, an toàn, camera giám sát; chủ không được tự ý quyết định).</li>
  </ul>
</div>
`;

  // Mở rộng wiko-tarifvertrag (thêm Sozialpartner & Rahmenentgelttarifvertrag)
  C.tarifvertrag_ext = `
<hr style="margin:24px 0; border:0; border-top:1px dashed #cbd5e1;">
<h3 class="sub">3. Die Sozialpartner &amp; Tarifvertragsarten im Detail</h3>
<p>Die <b>${T('Sozialpartner', 'các đối tác xã hội / đại diện 2 giới')}</b> sind die Gewerkschaften (z. B. <b>NGG</b> im Gastgewerbe) und die Arbeitgeberverbände (z. B. <b>DEHOGA</b>). Sie verhandeln auf Augenhöhe unter dem Schutz der im Grundgesetz verankerten <b>${T('Tarifautonomie', 'quyền tự chủ đàm phán thỏa ước (Điều 9 Khoản 3 Hiến pháp)')}</b> (kein staatlicher Eingriff).</p>
<table class="tbl">
  <thead><tr><th>Tarifvertragsart</th><th>Gegenstand / Inhalt</th><th>Laufzeit</th></tr></thead>
  <tbody>
    <tr>
      <td><b>${T('Entgelttarifvertrag', 'thỏa ước tiền lương cụ thể')} (Lohntarifvertrag)</b></td>
      <td>Regelt die konkrete Euro-Höhe der Stundenlöhne, Monatsgehälter und Ausbildungsvergütungen.</td>
      <td><b>Kurz:</b> meist 1 bis 2 Jahre.</td>
    </tr>
    <tr>
      <td><b>${T('Rahmenentgelttarifvertrag', 'thỏa ước khung phân ngạch lương')}</b></td>
      <td>Regelt die Kriterien zur Eingruppierung der Beschäftigten in Entgeltgruppen (nach Tätigkeitsmerkmalen, Qualifikation, Verantwortung).</td>
      <td><b>Mittel:</b> meist 3 bis 5 Jahre.</td>
    </tr>
    <tr>
      <td><b>${T('Manteltarifvertrag', 'thỏa ước lao động khung tổng thể')}</b></td>
      <td>Regelt allgemeine Arbeitsbedingungen: Wochenarbeitszeit, Urlaubsanspruch, Kündigungsfristen, Mehrarbeits- und Feiertagszuschläge.</td>
      <td><b>Lang:</b> meist mehrere Jahre.</td>
    </tr>
  </tbody>
</table>
<div class="hint"><b>${T('Günstigkeitsprinzip', 'nguyên tắc ưu tiên điều khoản có lợi hơn')} (§ 4 Abs. 3 TVG):</b> Einzelvertragliche Abmachungen zwischen Arbeitgeber und Arbeitnehmer sind nur gültig, wenn sie für den Arbeitnehmer <b>günstiger</b> sind als der Tarifvertrag (z. B. 32 Tage Urlaub statt 30 tariflichen Tagen).</div>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Sozialpartner &amp; 3 Loại Thỏa ước Lao động:</b>
  <ul>
    <li><b>Sozialpartner:</b> Là 2 bên công đoàn (Gewerkschaft - bảo vệ người lao động) và hội giới chủ (Arbeitgeberverband - bảo vệ doanh nghiệp). Họ đàm phán độc lập theo nguyên tắc Tarifautonomie không để Nhà nước can thiệp.</li>
    <li><b>3 Loại Tarifvertrag:</b>
      <ul>
        <li><b>Entgelttarifvertrag:</b> Quy định bảng lương bằng số tiền cụ thể (€). Thời hạn ngắn (1–2 năm).</li>
        <li><b>Rahmenentgelttarifvertrag:</b> Quy định tiêu chuẩn xếp bậc ngạch lương theo tay nghề/trách nhiệm. Thời hạn 3–5 năm.</li>
        <li><b>Manteltarifvertrag:</b> Quy định điều kiện làm việc chung (giờ làm tuần, ngày nghỉ phép, phụ cấp ca đêm). Thời hạn dài nhiều năm.</li>
      </ul>
    </li>
    <li><b>Günstigkeitsprinzip:</b> Hợp đồng cá nhân luôn có thể tốt hơn Tarifvertrag, nhưng tuyệt đối không được kém hơn mức tối thiểu trong thỏa ước.</li>
  </ul>
</div>
`;

  // Mở rộng wiko-steuerklassen (thêm Lohnabrechnung: Brutto - Netto - Ausbezahlter Lohn)
  C.lohnabrechnung_ext = `
<hr style="margin:24px 0; border:0; border-top:1px dashed #cbd5e1;">
<h3 class="sub">3. Lohnabrechnung: Bruttolohn – Nettolohn – Ausbezahlter Lohn</h3>
<table class="tbl">
  <thead><tr><th>Lohnstufe</th><th>Zusammensetzung / Berechnung</th><th>Erläuterung &amp; Beispiele</th></tr></thead>
  <tbody>
    <tr>
      <td><b>1. ${T('Bruttolohn', 'tổng lương trước thuế')}</b></td>
      <td>Grundgehalt / tarifliche Ausbildungsvergütung<br>+ Überstundenvergütung<br>+ Zuschläge (Sonntags-, Feiertags-, Nachtarbeit)</td>
      <td>Das vertraglich vereinbarte Gesamteinkommen vor jeglichen steuerlichen oder sozialversicherungsrechtlichen Abzügen.</td>
    </tr>
    <tr>
      <td><b>Abzüge (Steuern &amp; SV)</b></td>
      <td>
        <b>- Steuern:</b> Lohnsteuer (nach Steuerklasse I–VI) + ggf. Kirchensteuer (8–9 %) + ggf. Solidaritätszuschlag.<br>
        <b>- Sozialversicherung (ca. 20–21 %):</b> KV + PV + RV + AV (Arbeitnehmeranteil).
      </td>
      <td>Gesetzliche Zwangsabzüge, die der Arbeitgeber direkt an das Finanzamt und die Einzugsstelle der Krankenkasse abführt.</td>
    </tr>
    <tr>
      <td><b>2. ${T('Nettolohn', 'lương ròng sau thuế và bảo hiểm')}</b></td>
      <td><b>Bruttolohn − Steuern − SV-Beiträge</b></td>
      <td>Das gesetzlich verbleibende Nettoeinkommen des Beschäftigten.</td>
    </tr>
    <tr>
      <td><b>3. ${T('Ausbezahlter Lohn', 'lương thực nhận chuyển khoản')} (Auszahlungsbetrag)</b></td>
      <td>
        <b>Nettolohn</b><br>
        <b>+ Zuzahlungen:</b> Arbeitgeberanteil zu ${T('VWL', 'trợ cấp tích lũy tài sản')} (vermögenswirksame Leistungen), steuerfreie Fahrgelder, Spesen.<br>
        <b>− Abzüge:</b> Gesamter VWL-Sparbetrag, Gehaltsvorschuss-Rückzahlung, ${T('Lohnpfändung', 'trích khấu trừ thi hành án')}, Sachbezüge (Kantine/Wohnung).
      </td>
      <td><b>Der Betrag, der tatsächlich auf das Girokonto des Arbeitnehmers überwiesen wird.</b> (Nettolohn ≠ Auszahlungsbetrag, sobald VWL oder Vorschüsse vorliegen!)</td>
    </tr>
  </tbody>
</table>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Phân biệt 3 Mức Lương trên Bảng lương (Lohnabrechnung):</b>
  <ul>
    <li><b>1. Bruttolohn (Lương gộp):</b> Tổng thu nhập thỏa thuận theo hợp đồng trước khi trừ thuế/bảo hiểm (gồm lương cơ bản + tăng ca + phụ cấp đêm/chủ nhật).</li>
    <li><b>2. Nettolohn (Lương ròng):</b> Lấy Bruttolohn trừ đi tiền Thuế (Lohnsteuer, KiSt) và tiền Bảo hiểm xã hội 5 Säulen (KV, PV, RV, AV).</li>
    <li><b>3. Ausbezahlter Lohn / Auszahlungsbetrag (Số tiền thực nhận vào tài khoản):</b> Lấy Nettolohn CỘNG các khoản công ty hỗ trợ thêm (trợ cấp tích lũy tài sản VWL, phụ cấp đi lại Fahrgeld) và TRỪ các khoản cá nhân (khoản trích tiết kiệm VWL chuyển thẳng vào quỹ, trừ tiền ứng lương Vorschuss, trừ nợ thi hành án Lohnpfändung). Đây là số tiền thực tế đổ về tài khoản ngân hàng!</li>
  </ul>
</div>
`;

  // Mở rộng wiko-rg-p1 (thêm Juristische Personen des Privatrechts vs Öffentlichen Rechts)
  C.rechtsfaehigkeit_ext = `
<hr style="margin:24px 0; border:0; border-top:1px dashed #cbd5e1;">
<h3 class="sub">1.3 Juristische Personen im Detail (§§ 21 ff., 89 BGB)</h3>
<table class="tbl">
  <thead><tr><th>Kategorie</th><th>${T('Juristische Personen des Privatrechts', 'pháp nhân luật tư (doanh nghiệp, hội đoàn)')}</th><th>${T('Juristische Personen des öffentlichen Rechts', 'pháp nhân luật công (nhà nước, cơ quan công quyền)')}</th></tr></thead>
  <tbody>
    <tr><td><b>Entstehung</b></td><td>Durch staatliche Verleihung bzw. <b>Eintragung in ein öffentliches Register</b> (Handelsregister, Vereinsregister).</td><td>Durch <b>Gesetz</b> oder staatlichen Gründungsakt.</td></tr>
    <tr><td><b>Beispiele</b></td><td>
      • <b>e.V.:</b> Eingetragener Verein<br>
      • <b>GmbH:</b> Gesellschaft mit beschränkter Haftung<br>
      • <b>AG:</b> Aktiengesellschaft<br>
      • <b>UG:</b> Unternehmergesellschaft (haftungsbeschränkt)
    </td><td>
      • <b>Gebietskörperschaften:</b> Bund, Bundesländer, Landkreise, Gemeinden.<br>
      • <b>Selbstverwaltungskörperschaften:</b> IHK (Industrie- und Handelskammer), HWK (Handwerkskammer), Gesetzliche Krankenkassen (AOK, TK), Berufsgenossenschaften (BGN).<br>
      • <b>Anstalten:</b> Öffentlich-rechtliche Universitäten, Rundfunkanstalten (ARD/ZDF).
    </td></tr>
    <tr><td><b>Ende</b></td><td>Mit der <b>Löschung</b> aus dem Register (nach Liquidation oder Insolvenz).</td><td>Durch staatliches Aufhebungsgesetz.</td></tr>
  </tbody>
</table>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Phân loại Pháp nhân (Juristische Personen):</b>
  <ul>
    <li><b>Pháp nhân luật tư (des Privatrechts):</b> Do các cá nhân/doanh nghiệp thành lập, có tư cách pháp nhân kể từ khi <b>đăng ký vào sổ bộ nhà nước</b> (Eintragung ins Handelsregister / Vereinsregister) như công ty GmbH, tập đoàn AG, hội đoàn e.V. Kết thúc khi bị xóa sổ (Löschung).</li>
    <li><b>Pháp nhân luật công (des öffentlichen Rechts):</b> Do <b>Đạo luật nhà nước</b> thành lập để thực hiện chức năng công quyền như Nhà nước liên bang, các Bang, UBND thành phố, trường đại học công lập, các Phòng Thương mại IHK, HWK và các Quỹ bảo hiểm công AOK/TK.</li>
  </ul>
</div>
`;

  // =========================================================================
  // NỘI DUNG CÁC BÀI FACHSTUFE I VÀ BỔ SUNG MỚI
  // =========================================================================

  // Steuererklärung
  C.steuer = `<h2>Einkommensteuererklärung</h2>
<div class="hint">WK Grundstufe · Lohnsteuer wird monatlich vom Arbeitgeber einbehalten – die Steuererklärung rechnet am Jahresende genau ab.</div>
<h3 class="sub">1. Lohnsteuer vs. Einkommensteuer</h3>
<p>Die ${T('Lohnsteuer', 'thuế tiền lương (khấu trừ hàng tháng)')} ist eine Vorauszahlung auf die ${T('Einkommensteuer', 'thuế thu nhập cá nhân')}. Der Arbeitgeber führt sie jeden Monat an das ${T('Finanzamt', 'cơ quan thuế')} ab. Mit der Steuererklärung wird geprüft, ob zu viel oder zu wenig gezahlt wurde.</p>
<p>→ Lohnsteuer là tiền thuế trả trước, chủ khấu trừ mỗi tháng. Tờ khai thuế cuối năm tính lại xem đã đóng thừa hay thiếu.</p>
<h3 class="sub">2. Pflichtveranlagung vs. Antragsveranlagung</h3>
<table><tr><th>Pflicht (muss abgeben)</th><th>Freiwillig (Antrag)</th></tr>
<tr><td>mehrere Arbeitgeber gleichzeitig (Steuerklasse VI) · Ehepaar mit III/V · Lohnersatzleistungen über 410 € (z. B. Arbeitslosengeld, Kurzarbeitergeld, Elterngeld) · Nebeneinkünfte über 410 € · Aufforderung durch das Finanzamt</td>
<td>Alle anderen Arbeitnehmer – rückwirkend bis zu <b>4 Jahre</b>. Lohnt sich oft für Azubis (Ausbildungsbeginn im Laufe des Jahres, Werbungskosten).</td></tr></table>
<p>→ Bắt buộc khai: nhiều chủ cùng lúc (bậc VI), vợ chồng III/V, nhận trợ cấp thay lương hoặc thu nhập phụ trên 410 €. Người khác khai tự nguyện, được khai lùi tối đa 4 năm.</p>
<p><b>Frist:</b> Pflichtveranlagung bis <b>31. Juli</b> des Folgejahres (mit Steuerberater länger). Abgabe elektronisch über ${T('ELSTER', 'cổng khai thuế điện tử')}.</p>
<h3 class="sub">3. Was mindert die Steuer? (Steuermindernde Faktoren)</h3>
<ul>
<li>${T('Werbungskosten', 'chi phí liên quan đến công việc')}: Kosten für den Beruf – Fahrtkosten (${T('Entfernungspauschale', 'trợ cấp quãng đường đi làm')} je Entfernungskilometer), Arbeitskleidung, Fachbücher, Bewerbungskosten. Ohne Nachweis gilt der <b>Arbeitnehmer-Pauschbetrag 1.230 €</b>.</li>
<li>${T('Sonderausgaben', 'chi phí đặc biệt được khấu trừ')}: z. B. Vorsorgeaufwendungen (Kranken-, Rentenversicherung), Kirchensteuer, Spenden.</li>
<li>${T('Außergewöhnliche Belastungen', 'gánh nặng bất thường')}: z. B. hohe Krankheitskosten, Pflegeaufwendungen.</li>
<li>${T('Grundfreibetrag', 'mức thu nhập miễn thuế')}: Einkommen bis zu diesem Betrag (2025: 12.096 €) bleibt steuerfrei.</li>
</ul>
<div class="hint">Merksatz: Zu viel gezahlt? → Freiwillig abgeben! Bis zu 4 Jahre rückwirkend. Pauschbetrag 1.230 € ohne Belege.</div>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Tờ khai thuế thu nhập (Einkommensteuererklärung):</b>
  <ul>
    <li><b>Các yếu tố giảm trừ thuế:</b>
      <ul>
        <li><b>Werbungskosten (Chi phí phục vụ công việc):</b> Tiền xăng xe đi làm (Entfernungspauschale), mua đồng phục lao động, sách học nghề, đồ nghề làm bếp... Mặc định được trừ <b>1.230 €</b> (Pauschbetrag) mà không cần hóa đơn.</li>
        <li><b>Sonderausgaben:</b> Tiền đóng bảo hiểm y tế, hưu trí, thuế nhà thờ, tiền quyên góp từ thiện.</li>
        <li><b>Außergewöhnliche Belastungen:</b> Tiền viện phí lớn ngoài khả năng chi trả của BHYT, tiền nuôi dưỡng người thân tàn tật.</li>
        <li><b>Grundfreibetrag:</b> Mức thu nhập tối thiểu miễn thuế hoàn toàn (trên 12.000 €/năm).</li>
      </ul>
    </li>
    <li><b>Lợi ích cho Azubi:</b> Azubi thường chỉ làm việc từ tháng 8 hoặc 9, tổng thu nhập năm đầu dưới ngưỡng chịu thuế, nếu điền tờ khai tự nguyện (Antragsveranlagung) sẽ được <b>hoàn lại 100% số tiền thuế đã bị trừ</b>! Được nộp lùi tới 4 năm.</li>
  </ul>
</div>
`;

  // Altersvorsorge & Private Zusatzversicherungen
  C.altersvorsorge = `<h2>Altersvorsorge &amp; Private Zusatzversicherungen</h2>
<div class="hint">WK Grundstufe · Das 3-Säulen-Modell der Altersvorsorge &amp; private Zusatzabsicherungen.</div>
<h3 class="sub">1. Das 3-Säulen-Modell der Altersvorsorge</h3>
<table><tr><th>Säule</th><th>Träger / Form</th><th>Finanzierung</th></tr>
<tr><td><b>1. Gesetzliche Rente</b></td><td>Deutsche Rentenversicherung; ${T('Generationenvertrag', 'hợp đồng thế hệ / người trẻ nuôi người già')} (${T('Umlageverfahren', 'phương thức lấy thu bù chi ngay')})</td><td>Beitrag 18,6 % (2025), je <b>9,3 %</b> Arbeitnehmer und Arbeitgeber</td></tr>
<tr><td><b>2. Betriebliche Altersvorsorge</b> (bAV)</td><td>Direktversicherung, Pensionskasse; ${T('Entgeltumwandlung', 'trích một phần lương để tích lũy hưu')}</td><td>Arbeitnehmer hat Anspruch auf Entgeltumwandlung; Arbeitgeber gibt mind. 15 % Zuschuss</td></tr>
<tr><td><b>3. Private Vorsorge</b></td><td>${T('Riester-Rente', 'quỹ hưu Riester (nhà nước trợ cấp)')}, private Rentenversicherung, Fondssparplan, Immobilie</td><td>Freiwillig · Riester: staatliche Zulagen</td></tr></table>
<h3 class="sub">2. Warum reicht die gesetzliche Rente nicht? (Demografischer Wandel)</h3>
<p>Das ${T('Rentenniveau', 'mức lương hưu so với lương trung bình')} liegt bei etwa <b>48 %</b> des Durchschnittslohns. Gründe: ${T('demografischer Wandel', 'thay đổi cơ cấu dân số')} – weniger Beitragszahler, mehr Rentner, längere Lebenserwartung. Die Lücke heißt ${T('Versorgungslücke', 'khoảng thiếu hụt thu nhập khi về hưu')}.</p>
<h3 class="sub">3. Private Zusatzversicherungen (Bảo hiểm bổ sung tư nhân)</h3>
<p>Da die gesetzlichen Sozialversicherungen nur eine <b>Grundversorgung (Regelleistungen)</b> abdecken, sind private Zusatzversicherungen sinnvoll:</p>
<ul>
  <li><b>${T('Berufsunfähigkeitsversicherung', 'bảo hiểm mất sức lao động')} (BU):</b> Existenzsichernd! Zahlt monatliche Rente, wenn man seinen erlernten Beruf krankheits- oder unfallbedingt zu mind. 50 % dauerhaft nicht mehr ausüben kann.</li>
  <li><b>${T('Zahnzusatzversicherung', 'bảo hiểm răng hàm mặt bổ sung')}:</b> Übernimmt hohe Zuzahlungen bei Zahnersatz (Kronen, Implantate), die die gesetzliche Kasse nicht voll zahlt.</li>
  <li><b>${T('Auslandskrankenversicherung', 'bảo hiểm du lịch khám chữa bệnh ở nước ngoài')}:</b> Zahlt Behandlungskosten und medizinischen Rücktransport außerhalb Deutschlands.</li>
  <li><b>${T('Private Pflegezusatzversicherung', 'bảo hiểm điều dưỡng tư nhân bổ sung')}:</b> Schließt die hohe Eigenanteil-Lücke bei stationärer Pflege im Alter.</li>
</ul>
<div class="hint">Merksatz: 3 Säulen = gesetzlich · betrieblich · privat · BU-Versicherung ist der wichtigste Schutz vor Armut bei Erwerbsunfähigkeit!</div>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Hưu trí 3 Trụ Cột &amp; Bảo hiểm Bổ sung Tư nhân:</b>
  <ul>
    <li><b>3 Trụ Cột Hưu trí:</b> (1) Hưu trí bắt buộc nhà nước (18,6%, chia đôi); (2) Hưu trí qua công ty (chủ bù thêm tối thiểu 15%); (3) Tự tiết kiệm cá nhân (Riester, ETF, nhà đất). Do dân số già hóa (Demografischer Wandel), lương hưu nhà nước chỉ còn khoảng 48% mức lương cũ, bắt buộc phải có trụ cột 2 và 3.</li>
    <li><b>Bảo hiểm bổ sung tư nhân quan trọng:</b> Bảo hiểm mất sức lao động (Berufsunfähigkeit - BU, cực kỳ thiết yếu trong nghề bếp/khách sạn dễ mắc bệnh xương khớp), bảo hiểm nha khoa (Zahnzusatz), bảo hiểm du lịch nước ngoài.</li>
  </ul>
</div>
`;

  // Solidaritätsprinzip
  C.soli = `<h2>Sozialversicherung · Solidaritätsprinzip</h2>
<div class="hint">WK Grundstufe · Die Prinzipien hinter den 5 Säulen der Sozialversicherung.</div>
<h3 class="sub">1. Die fünf Zweige</h3>
<table><tr><th>Zweig</th><th>Beitrag 2025</th><th>Träger</th></tr>
<tr><td>Krankenversicherung (KV)</td><td>14,6 % + Zusatzbeitrag, je zur Hälfte</td><td>Krankenkassen (AOK, TK …)</td></tr>
<tr><td>Pflegeversicherung (PV)</td><td>3,6 % (Kinderlose ab 23: + 0,6 % nur AN)</td><td>Pflegekassen</td></tr>
<tr><td>Rentenversicherung (RV)</td><td>18,6 %, je 9,3 %</td><td>Deutsche Rentenversicherung</td></tr>
<tr><td>Arbeitslosenversicherung (AV)</td><td>2,6 %, je 1,3 %</td><td>Bundesagentur für Arbeit</td></tr>
<tr><td>Unfallversicherung (UV)</td><td><b>nur Arbeitgeber</b></td><td>Berufsgenossenschaft (Gastgewerbe: BGN)</td></tr></table>
<h3 class="sub">2. Die Prinzipien</h3>
<ul>
<li><b>${T('Solidaritätsprinzip', 'nguyên tắc tương trợ')}:</b> Alle zahlen nach ihrem <b>Einkommen</b> ein, alle bekommen Leistungen nach ihrem <b>Bedarf</b>. Gesunde zahlen für Kranke, Junge für Alte, Gutverdiener mehr als Geringverdiener. In der KV sind Kinder und Ehepartner ohne Einkommen kostenlos ${T('familienversichert', 'được bảo hiểm theo gia đình')}.</li>
<li><b>${T('Generationenvertrag', 'hợp đồng thế hệ')}:</b> Die arbeitende Generation finanziert die Renten der aktuellen Ruheständler.</li>
<li><b>${T('Versicherungspflicht', 'nghĩa vụ tham gia bảo hiểm')}:</b> Arbeitnehmer müssen Mitglied sein.</li>
<li><b>${T('Subsidiaritätsprinzip', 'nguyên tắc bổ trợ')}:</b> Zuerst hilft der Einzelne sich selbst und die Familie; der Staat springt erst ein, wenn die eigenen Kräfte nicht reichen.</li>
</ul>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — 5 Trụ Cột An Sinh Xã Hội &amp; Nguyên Tắc Đoàn Kết:</b>
  <ul>
    <li><b>5 Trụ Cột:</b> BHYT (KV), Chăm sóc điều dưỡng (PV), Hưu trí (RV), Thất nghiệp (AV) — cả 4 loại này chủ và thợ chia đôi; Tai nạn lao động (UV) — 100% chủ DN đóng cho Berufsgenossenschaft (BGN).</li>
    <li><b>Solidaritätsprinzip (Nguyên tắc tương trợ):</b> Đóng theo năng lực thu nhập, hưởng theo nhu cầu thực tế khi gặp rủi ro (người khỏe gánh người ốm, người giàu đóng nhiều hơn).</li>
  </ul>
</div>
`;

  // Kaufvertrag vertieft, Mängel & Verjährung von Forderungen
  C.kaufvertrag = `<h2>Kaufvertrag · Mängelhaftung &amp; Verjährung</h2>
<div class="hint">WK Fachstufe I · Rechte bei mangelhafter Lieferung &amp; Verjährungsfristen nach BGB.</div>
<h3 class="sub">1. Zustandekommen &amp; Pflichten</h3>
<p>Ein Kaufvertrag entsteht durch zwei übereinstimmende Willenserklärungen: <b>${T('Antrag', 'lời đề nghị')} (Angebot)</b> und <b>${T('Annahme', 'sự chấp nhận')}</b>. Pflichten: Verkäufer muss Ware mangelfrei übergeben und Eigentum übertragen; Käufer muss rechtzeitig zahlen und Ware annehmen.</p>
<h3 class="sub">2. Mängelarten</h3>
<table><tr><th>Sachmangel (Lỗi vật chất)</th><th>Rechtsmangel (Lỗi pháp lý)</th></tr>
<tr><td>Fehler in der Beschaffenheit (Fleisch verdorben) · falsche Sache geliefert (Geflügel statt Rind) · zu geringe Menge · Montagefehler / fehlerhafte Montageanleitung ("IKEA-Klausel")</td>
<td>Verkäufer ist nicht Eigentümer (gestohlene Ware); Ware ist mit Rechten Dritter belastet (z. B. Pfandrecht).</td></tr></table>
<h3 class="sub">3. Gewährleistung vs. Garantie</h3>
<table><tr><th>${T('Gesetzliche Gewährleistung', 'trách nhiệm bảo hành theo luật')}</th><th>${T('Freiwillige Garantie', 'bảo hành tự nguyện')}</th></tr>
<tr><td><b>Gesetzlich vorgeschrieben</b> (BGB) · <b>2 Jahre</b> bei neuen Waren · Haftung für Mängel, die bereits beim Kauf vorlagen (mit ${T('Beweislastumkehr', 'đảo ngược nghĩa vụ chứng minh')} in den ersten <b>12 Monaten</b> zugunsten des Verbrauchers).</td>
<td><b>Freiwillige Zusage</b> des Herstellers oder Händlers · Dauer und Bedingungen bestimmt der Garantiegeber (z. B. 5 Jahre Garantie auf Durchrostung).</td></tr></table>
<h3 class="sub">4. Rechte des Käufers bei Mängeln</h3>
<ol>
<li><b>1. Vorrangige Rechte (${T('Nacherfüllung', 'bổ sung thực hiện hợp đồng')}):</b> Käufer hat das Wahlrecht zwischen <b>${T('Nachbesserung', 'sửa chữa lỗi')}</b> (Reparatur) oder <b>${T('Nachlieferung', 'đổi sản phẩm mới')}</b> (neue Ware). Verkäufer trägt alle Kosten (Transport, Arbeitszeit, Material).</li>
<li><b>2. Nachrangige Rechte (erst nach erfolglosem Ablauf einer angemessenen Nachfrist):</b>
<ul>
<li>${T('Rücktritt vom Kaufvertrag', 'hủy bỏ hợp đồng mua bán')} (Geld zurück gegen Rückgabe der Ware).</li>
<li>${T('Minderung', 'giảm giá bán')} des Kaufpreises (Ware behalten, Preisnachlass verlangen).</li>
<li>${T('Schadensersatz', 'bồi thường thiệt hại')} neben oder statt der Leistung (bei Verschulden des Verkäufers).</li>
</ul></li>
</ol>
<h3 class="sub">5. Verjährung von Forderungen (Thời hiệu khiếu nại &amp; đòi nợ - §§ 194 ff. BGB)</h3>
<table class="tbl">
  <thead><tr><th>Frist</th><th>Dauer &amp; Beginn</th><th>Anwendungsbereich &amp; Beispiele</th></tr></thead>
  <tbody>
    <tr>
      <td><b>${T('Regelmäßige Verjährung', 'thời hiệu đòi nợ thông thường')} (§ 195 BGB)</b></td>
      <td><b>3 Jahre</b><br>Beginnt mit dem Schluss des Jahres (<b>31.12. um 24:00 Uhr</b>), in dem der Anspruch entstanden ist (${T('Ultimo-Prinzip', 'nguyên tắc tính từ cuối năm')}).</td>
      <td>Offene Rechnungen (z. B. Kaufpreis, Handwerkerrechnung, Restaurantrechnung).<br><i>Beispiel:</i> Rechnung vom 15.04.2023 → Fristbeginn: 31.12.2023 → Verjährungsende: <b>31.12.2026 um 24:00 Uhr</b>.</td>
    </tr>
    <tr>
      <td><b>Mängelansprüche beim Kauf (§ 438 BGB)</b></td>
      <td><b>2 Jahre</b> ab Übergabe der Sache (bei Bauwerken 5 Jahre).</td>
      <td>Reklamationen von Sachmängeln bei Neuwaren.</td>
    </tr>
    <tr>
      <td><b>Rechtskräftig titulierte Forderungen (§ 197 BGB)</b></td>
      <td><b>30 Jahre</b> ab Rechtskraft des Titels.</td>
      <td>Gerichtliches Urteil, Vollstreckungsbescheid.</td>
    </tr>
  </tbody>
</table>
<h4 style="margin-top:14px;">Hemmung vs. Neubeginn der Verjährung</h4>
<ul>
  <li><b>${T('Hemmung', 'tạm dừng thời hiệu')} (§ 203 ff. BGB):</b> Der Ablauf der Frist wird angehalten ("Uhr bleibt stehen"). Die Zeit der Hemmung wird nicht eingerechnet (z. B. bei Verhandlungen zwischen Gläubiger und Schuldner, Beantragung eines gerichtlichen Mahnbescheids oder Klageerhebung). Sobald der Grund wegfällt, läuft die Uhr weiter.</li>
  <li><b>${T('Neubeginn', 'bắt đầu lại thời hiệu từ đầu')} (§ 212 BGB - früher Unterbrechung):</b> Die Frist beginnt wieder bei Tag 1 in voller Länge (3 Jahre)! Tritt ein, wenn der Schuldner den Anspruch anerkennt (z. B. durch <b>Teilzahlung, Zinszahlung, Bitte um Stundung</b>) oder bei gerichtlichen Vollstreckungsmaßnahmen.</li>
</ul>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Hợp đồng Mua bán, Bảo hành &amp; Thời hiệu Đòi nợ:</b>
  <ul>
    <li><b>Gewährleistung 2 năm:</b> Luật định bắt buộc, người bán phải chịu trách nhiệm về lỗi ẩn tàng từ trước. Trong <b>12 tháng đầu</b> có sự đảo ngược nghĩa vụ chứng minh (mặc định lỗi do khâu sản xuất, người bán phải tự chứng minh nếu nghi khách làm hỏng).</li>
    <li><b>Thứ tự đòi quyền lợi:</b> Bắt buộc phải đòi <b>Nacherfüllung (Ưu tiên số 1: Đổi mới hoặc Sửa chữa)</b> trước. Nếu người bán sửa quá 2 lần thất bại hoặc từ chối, người mua mới được dùng quyền số 2: Trả hàng lấy lại tiền (Rücktritt), Giảm giá (Minderung), hoặc Đòi bồi thường (Schadensersatz).</li>
    <li><b>Thời hiệu đòi nợ (Verjährung):</b> Thông thường là <b>3 năm</b> tính từ ngày 31.12 của năm phát sinh nợ. Khi đòi nợ qua tòa (Mahnbescheid) thì thời hiệu bị tạm dừng (Hemmung). Nếu con nợ trả một phần tiền hoặc xin khất nợ thì thời hiệu bị xóa về 0 và tính lại từ đầu đủ 3 năm (Neubeginn)!</li>
  </ul>
</div>
`;

  // Verbraucherberatung, UWG & Leistungsstörungen
  C.verbraucherschutz = `<h2>Verbraucherberatung, UWG &amp; Leistungsstörungen</h2>
<div class="hint">WK Fachstufe I · Verbraucherschutzgesetze, Schutz vor unlauterem Wettbewerb &amp; Verzug.</div>
<h3 class="sub">1. Verbraucherschutzgesetze &amp; Verbraucherzentralen</h3>
<p>Verbraucher sind gegenüber gewerblichen Unternehmern oft in der schwächeren Position (Informationsvorsprung, finanzielle Macht). ${T('Verbraucherzentralen', 'trung tâm bảo vệ người tiêu dùng')} bieten unabhängige Beratung, warnen vor Abzocke und mahnen unzulässige AGB-Klauseln ab.</p>
<h3 class="sub">2. Gesetz gegen den unlauteren Wettbewerb (UWG)</h3>
<p>Das ${T('UWG', 'Luật chống cạnh tranh không lành mạnh')} schützt Mitbewerber, Verbraucher und sonstige Marktteilnehmer vor unfairen Geschäftspraktiken:</p>
<table class="tbl">
  <thead><tr><th>Verbotstatbestand</th><th>Gesetzliche Regelung</th><th>Praxisbeispiele</th></tr></thead>
  <tbody>
    <tr>
      <td><b>${T('Irreführende Werbung', 'quảng cáo lừa dối')} (§ 5 UWG)</b></td>
      <td>Verbot unwahrer Angaben über Preisvorteile, wesentliche Beschaffenheit oder Herkunft.</td>
      <td>Erfundene Rabatte ("Mondpreise"), falsches Bio-Siegel auf Speisekarten, angebliche Testergebnisse.</td>
    </tr>
    <tr>
      <td><b>${T('Unzumutbare Belästigung', 'quấy rối vô lý / quảng cáo làm phiền')} (§ 7 UWG)</b></td>
      <td>Verbot von Werbung ohne vorherige ausdrückliche Einwilligung des Verbrauchers.</td>
      <td><b>${T('Cold Calling', 'gọi điện thoại tiếp thị khi chưa được đồng ý')}</b>, Werbe-Mails/SMS ohne Opt-In, unerwünschte Vertreterbesuche an der Haustür.</td>
    </tr>
    <tr>
      <td><b>${T('Aggressive geschäftliche Handlungen', 'bán hàng hung hăng, ép buộc')} (§ 4a UWG)</b></td>
      <td>Ausnutzung von Machtpositionen, Bedrohung, Nötigung oder unzulässige Beeinflussung.</td>
      <td>Kaffeefahrten mit psychischem Verkaufsdruck, Einschüchterung betagter Menschen.</td>
    </tr>
  </tbody>
</table>
<h3 class="sub">3. Fernabsatzverträge (§ 312c BGB)</h3>
<p>Verträge, die ausschließlich über Fernkommunikationsmittel (Internet, E-Mail, Telefon, Katalog) zwischen einem Unternehmer und einem Verbraucher geschlossen werden:</p>
<ul>
  <li><b>${T('Widerrufsrecht', 'quyền rút lại / hủy hợp đồng')} (§ 355 BGB):</b> <b>14 Tage</b> Frist ab Erhalt der Ware und ordnungsgemäßer Belehrung. Ohne Begründung.</li>
  <li><b>Ausnahmen vom Widerrufsrecht:</b> Leicht verderbliche Lebensmittel (z. B. gelieferte Speisen/Sushi), versiegelte Waren aus Hygiene-/Gesundheitsgründen nach Entsiegelung, maßgefertigte Waren.</li>
</ul>
<h3 class="sub">4. Leistungsstörungen: Lieferungs-, Annahme- &amp; Zahlungsverzug</h3>
<table class="tbl">
  <thead><tr><th>Art des Verzugs</th><th>Voraussetzungen</th><th>Rechte der Gegenseite</th></tr></thead>
  <tbody>
    <tr>
      <td><b>${T('Lieferungsverzug', 'chậm trễ giao hàng')}</b> (Verkäufer)</td>
      <td>Fälligkeit der Lieferung + Mahnung (Mahnung entbehrlich bei Fixkauf oder vertraglich genauem Kalendertermin) + Verschulden des Verkäufers.</td>
      <td>• Ohne Nachfrist: Lieferung verlangen + ggf. Verzugsschaden.<br>• Nach angemessener Nachfrist: Rücktritt vom Vertrag oder Schadensersatz statt der Leistung.</td>
    </tr>
    <tr>
      <td><b>${T('Zahlungsverzug', 'chậm trễ thanh toán tiền')}</b> (Käufer)</td>
      <td>Fälligkeit des Kaufpreises + Mahnung. <b>Automatisch nach 30 Tagen</b> nach Zugang der Rechnung (bei Verbrauchern nur bei Hinweis auf der Rechnung!).</td>
      <td>• Zahlung verlangen + ${T('Verzugszinsen', 'tiền lãi phạt chậm trả')}:<br>&nbsp;&nbsp;- Verbraucher: <b>5 %-Punkte über Basiszinssatz</b>.<br>&nbsp;&nbsp;- Geschäftskunden (B2B): <b>9 %-Punkte über Basiszinssatz</b>.<br>• Mahngebühren, Inkasso, gerichtliches Mahnverfahren.</td>
    </tr>
    <tr>
      <td><b>${T('Annahmeverzug', 'từ chối nhận hàng')}</b> (Gläubigerverzug)</td>
      <td>Verkäufer bietet die Ware ordnungsgemäß und pünktlich an, aber der Käufer nimmt sie nicht an.</td>
      <td>Verkäufer haftet nur noch für grobe Fahrlässigkeit; Recht auf Einlagerung auf Kosten des Käufers oder ${T('Selbsthilfeverkauf', 'tự bán đấu giá hàng cứu vãn chi phí')} (öffentliche Versteigerung).</td>
    </tr>
  </tbody>
</table>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Bảo vệ Người tiêu dùng, Chống Cạnh tranh Bẩn &amp; Chậm trễ:</b>
  <ul>
    <li><b>Luật UWG:</b> Cấm quảng cáo lừa dối gian lận (giảm giá ảo, dán nhãn sinh học giả), cấm gọi điện thoại chèo kéo tiếp thị khi khách chưa cho phép (Cold Calling).</li>
    <li><b>Fernabsatz (Mua hàng từ xa):</b> Mua hàng online/qua mạng có quyền đổi trả <b>14 ngày</b> không cần lý do. Ngoại lệ: Đồ ăn tươi sống nấu sẵn, đồ vệ sinh cá nhân đã bóc niêm phong.</li>
    <li><b>Các loại Verzug:</b>
      <ul>
        <li><b>Lieferungsverzug (Chậm giao hàng):</b> Khách có quyền bắt giao hàng, hoặc gia hạn thời hạn cuối rồi hủy hợp đồng và đòi bồi thường.</li>
        <li><b>Zahlungsverzug (Chậm trả tiền):</b> Sau 30 ngày tự động bị tính là chậm trả. Bị phạt lãi suất: người tiêu dùng chịu <b>lãi suất cơ bản + 5%</b>; doanh nghiệp B2B chịu <b>lãi suất cơ bản + 9%</b>, cộng phí đòi nợ Inkasso.</li>
        <li><b>Annahmeverzug (Không chịu nhận hàng):</b> Bên bán được phép gửi hàng vào kho tính phí hoặc phát mại bán đấu giá.</li>
      </ul>
    </li>
  </ul>
</div>
`;

  // Umgang mit Geld & Zahlungsverkehr
  C.geld = `<h2>Geld &amp; Zahlungsverkehr</h2>
<div class="hint">WK Fachstufe I · Formen des Zahlungsverkehrs · SEPA · Karten.</div>
<h3 class="sub">1. Funktionen des Geldes</h3>
<ul>
<li>${T('Tausch- und Zahlungsmittel', 'phương tiện trao đổi và thanh toán')}: ermöglicht den Kauf von Waren ohne Naturaltausch.</li>
<li>${T('Wertmaßstab und Recheneinheit', 'thước đo giá trị và đơn vị tính toán')}: macht Preise vergleichbar (z. B. Menü 28 € vs. Steak 35 €).</li>
<li>${T('Wertaufbewahrungsmittel', 'phương tiện cất giữ giá trị')}: Ersparnisse für die Zukunft (Gefahr: Inflation mindert die Kaufkraft).</li>
</ul>
<h3 class="sub">2. Formen des Zahlungsverkehrs</h3>
<table><tr><th>Form</th><th>Beispiele</th></tr>
<tr><td><b>Barzahlung</b></td><td>Münzen und Banknoten; Quittung als Zahlungsnachweis.</td></tr>
<tr><td><b>Halbbare Zahlung</b></td><td>Einzahler bar auf fremdes Konto (Zahlschein) oder Barabhebung per Scheck.</td></tr>
<tr><td><b>Bargeldlose Zahlung</b></td><td>Überweisung, Dauerauftrag, Lastschrift, Kartenzahlung, Online-Banking.</td></tr></table>
<h3 class="sub">3. Bargeldlose Instrumente</h3>
<ul>
<li>${T('Überweisung', 'chuyển khoản')}: Der Zahler beauftragt seine Bank, Geld auf das Konto des Empfängers zu übertragen. Einmalig, wechselnde Beträge.</li>
<li>${T('Dauerauftrag', 'lệnh chuyển tiền định kỳ cố định')}: Fester Betrag, fester Termin, gleicher Empfänger (z. B. Miete, Ausbildungsvergütung). Ausführung automatisch durch die Bank.</li>
<li>${T('SEPA-Basislastschrift', 'ủy nhiệm thu tiền tự động')}: Der Empfänger bucht vom Konto des Zahlers ab (nach erteiltem Mandat). Vorteil für Zahler: <b>Widerspruchsrecht 8 Wochen</b> (bei unberechtigter Abbuchung 13 Monate). Für wechselnde Beträge (Strom, Telefon).</li>
<li>${T('Girocard', 'thẻ ghi nợ trực tiếp')} (Debitkarte): Belastung erfolgt sofort/zeitnah auf dem Girokonto. PIN oder Unterschrift.</li>
<li>${T('Kreditkarte', 'thẻ tín dụng')}: Beträge werden gesammelt und einmal monatlich abgebucht (Kredit bis zur Abrechnung). Weltweit einsetzbar, oft Jahresgebühr.</li>
</ul>
<h3 class="sub">4. SEPA (Single Euro Payments Area)</h3>
<p>Einheitlicher europäischer Zahlungsverkehrsraum. Wichtige Angaben: ${T('IBAN', 'số tài khoản chuẩn quốc tế')} (in DE: 22 Stellen: DE + 2 Prüfziffern + 8 Bankleitzahl + 10 Kontonummer) und ${T('BIC', 'mã định danh ngân hàng')} (internationaler Bankcode).</p>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Tiền tệ &amp; Giao dịch Thanh toán:</b>
  <ul>
    <li><b>3 Hình thức thanh toán:</b> Tiền mặt (Bar), Nửa tiền mặt (Halbbar - nộp tiền mặt vào tài khoản người khác), Không dùng tiền mặt (Bargeldlos - chuyển khoản, quẹt thẻ).</li>
    <li><b>Công cụ thanh toán:</b>
      <ul>
        <li><b>Überweisung:</b> Chuyển khoản thông thường từng lần.</li>
        <li><b>Dauerauftrag:</b> Lệnh định kỳ cố định ngày và số tiền (tiền nhà, tiền internet).</li>
        <li><b>Lastschrift:</b> Ủy quyền cho bên bán tự động rút tiền (hóa đơn điện thoại, tiền điện); người mua có quyền đòi lại tiền trong vòng <b>8 tuần</b> nếu không đồng ý.</li>
        <li><b>Girocard (Debit):</b> Quẹt thẻ tiền trừ ngay lập tức trong tài khoản; <b>Kreditkarte (Credit):</b> Chi tiêu trước, cuối tháng thanh toán 1 lần.</li>
      </ul>
    </li>
  </ul>
</div>
`;

  // CHUYÊN ĐỀ MỚI: Geldanlagemöglichkeiten
  C.geldanlage = `<h2>Geldanlagemöglichkeiten</h2>
<div class="hint">WK Fachstufe I · Sparbuch, Termingeld, Tagesgeld, Wertpapiere, Aktien, Fonds &amp; Magisches Dreieck.</div>
<h3 class="sub">1. Klassische Bankeinlagen im Überblick</h3>
<table class="tbl">
  <thead><tr><th>Anlageform</th><th>Merkmale &amp; Verfügbarkeit</th><th>Verzinsung &amp; Sicherheit</th></tr></thead>
  <tbody>
    <tr>
      <td><b>${T('Sparbuch', 'sổ tiết kiệm truyền thống')} (Spareinlage)</b></td>
      <td>Urkunde über Spareinlage. Gesetzliche Kündigungsfrist: <b>3 Monate</b> für Beträge über 2.000 € pro Kalendermonat. Für kleinere Notgroschen.</td>
      <td>Sehr geringe Verzinsung (Gefahr des Kaufkraftverlusts durch Inflation). Sehr hohe Sicherheit (${T('Einlagensicherung', 'bảo hiểm tiền gửi')} bis 100.000 €).</td>
    </tr>
    <tr>
      <td><b>${T('Tagesgeld', 'tiền gửi linh hoạt hàng ngày')}</b></td>
      <td>Täglich fälliges Konto ohne feste Laufzeit. <b>Täglich voll verfügbar</b> (hohe Liquidität). Kein Zahlungsverkehr möglich (nur Verrechnungskonto).</td>
      <td>Variabler Zinssatz, meist höher als beim Girokonto/Sparbuch. Gesetzliche Einlagensicherung bis 100.000 € je Kunde und Bank.</td>
    </tr>
    <tr>
      <td><b>${T('Termingeld / Festgeld', 'tiền gửi kỳ hạn cố định')}</b></td>
      <td>Feste Laufzeit (z. B. 6, 12, 24 oder 36 Monate) und fester Anlagebetrag. <b>Keine vorzeitige Verfügung</b> während der Laufzeit möglich.</td>
      <td>Fester Zinssatz über die gesamte Laufzeit (Planungssicherheit). Keine Kursverluste, Einlagensicherung bis 100.000 €.</td>
    </tr>
  </tbody>
</table>
<h3 class="sub">2. Wertpapiere: Aktien vs. Anleihen</h3>
<table class="tbl">
  <thead><tr><th>Kriterium</th><th>${T('Aktie', 'cổ phiếu (vốn chủ sở hữu)')} (Teilhaberpapier)</th><th>${T('Anleihe / Rentenpapier', 'trái phiếu (vốn vay)')} (Gläubigerpapier)</th></tr></thead>
  <tbody>
    <tr><td><b>Rechtsstellung</b></td><td>Anleger wird <b>Miteigentümer</b> an der Aktiengesellschaft (AG).</td><td>Anleger wird <b>Gläubiger</b> (Kreditgeber für Staat oder Unternehmen).</td></tr>
    <tr><td><b>Ertrag</b></td><td>Erfolgsabhängige ${T('Dividende', 'cổ tức')} + mögliche ${T('Kursgewinne', 'lãi chênh lệch giá')}.</td><td>Fester Zinsanspruch (${T('Kupon', 'lãi suất trái phiếu')}) unabhängig vom Unternehmenserfolg.</td></tr>
    <tr><td><b>Rückzahlung</b></td><td>Kein Anspruch auf Rückzahlung des Kapitals durch die AG (Verkauf an der Börse zum aktuellen Kurswert).</td><td>Rückzahlung zum Nennwert am Ende der vereinbarten Laufzeit.</td></tr>
    <tr><td><b>Risiko</b></td><td><b>Hoch:</b> Kursverluste, Dividendenkürzung, bei Insolvenz Totalverlust möglich.</td><td><b>Gering bis mittel:</b> Bonitätsrisiko des Ausstellers (Staatsanleihen DE sehr sicher).</td></tr>
  </tbody>
</table>
<h3 class="sub">3. Investmentfonds &amp; ETFs</h3>
<ul>
  <li><b>${T('Aktiver Investmentfonds', 'quỹ đầu tư chủ động')}:</b> Viele Anleger zahlen in einen Topf ein. Ein professioneller <b>Fondsmanager</b> wählt Aktien/Anleihen aus. Vorteil: Risikostreuung (${T('Diversifikation', 'đa dạng hóa danh mục')}). Nachteil: Hoher Ausgabeaufschlag (3–5 %) und jährliche Verwaltungsgebühren.</li>
  <li><b>${T('ETF', 'quỹ hoán đổi danh mục thụ động')} (Exchange Traded Fund):</b> Bildet einen festen Börsenindex exakt nach (z. B. <b>MSCI World</b> mit über 1.500 Unternehmen weltweit oder <b>DAX</b>). Kein teurer Fondsmanager nötig → <b>extrem niedrige laufende Kosten (oft nur 0,1–0,2 % p. a.)</b>. Ideal für langfristigen Vermögensaufbau mit Sparplänen ab 25 €/Monat.</li>
</ul>
<h3 class="sub">4. Das Magische Dreieck der Geldanlage</h3>
<p>Bei jeder Geldanlage konkurrieren drei Ziele miteinander:</p>
<ol>
  <li><b>${T('Rentabilität', 'khả năng sinh lời')} (Rendite):</b> Wie viel Gewinn/Zins bringt die Anlage?</li>
  <li><b>${T('Sicherheit', 'mức độ an toàn vốn')}:</b> Wie sicher ist mein eingezahltes Geld vor Verlusten?</li>
  <li><b>${T('Liquidität', 'tính thanh khoản / tốc độ rút tiền')}:</b> Wie schnell kann ich die Anlage wieder in Bargeld umwandeln?</li>
</ol>
<div class="hint"><b>Grundregel:</b> Kein Produkt kann alle drei Ziele maximieren! Hohe Rendite geht immer zu Lasten von Sicherheit oder Liquidität. Hohe Sicherheit und tägliche Verfügbarkeit (Tagesgeld) bringen nur niedrige Zinsen.</div>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Các Hình Thức Đầu Tư &amp; Tam Giác Tài Chính (Magisches Dreieck):</b>
  <ul>
    <li><b>Sparbuch / Tagesgeld / Festgeld:</b> Rất an toàn (được Nhà nước bảo hiểm tiền gửi 100.000 €/ngân hàng). Tagesgeld rút linh hoạt bất kỳ lúc nào; Festgeld gửi có kỳ hạn cố định được lãi suất cao hơn.</li>
    <li><b>Cổ phiếu (Aktie) vs. Trái phiếu (Anleihe):</b> Cổ phiếu là sở hữu 1 phần doanh nghiệp, ăn chia cổ tức và chênh lệch giá, rủi ro cao; Trái phiếu là cho vay nhận lãi cố định, ít rủi ro hơn.</li>
    <li><b>Quỹ ETF:</b> Hình thức đầu tư hiện đại thông minh nhất hiện nay cho người trẻ. Mô phỏng chỉ số thế giới (MSCI World), tự động chia nhỏ tiền mua hàng ngàn công ty (không bao giờ sợ mất trắng), chi phí vận hành cực rẻ.</li>
    <li><b>Tam giác tài chính kỳ diệu:</b> Luôn có xung đột giữa <b>Lợi nhuận - An toàn - Thanh khoản</b>. Không bao giờ có món đầu tư nào vừa lãi khủng, vừa an toàn 100% lại vừa muốn rút lúc nào cũng được!</li>
  </ul>
</div>
`;

  // Kreditarten & Kreditvergleiche
  C.kredit = `<h2>Kreditarten &amp; Kreditvergleiche</h2>
<div class="hint">WK Fachstufe I · Kreditfähigkeit vs. Kreditwürdigkeit · Kreditarten &amp; SCHUFA.</div>
<h3 class="sub">1. Kreditfähigkeit vs. Kreditwürdigkeit (Bonität)</h3>
<table class="tbl">
  <thead><tr><th>Begriff</th><th>Bedeutung / Kriterien</th><th>Wer erfüllt die Voraussetzung?</th></tr></thead>
  <tbody>
    <tr>
      <td><b>${T('Kreditfähigkeit', 'năng lực pháp lý được vay tiền')}</b></td>
      <td>Rechtliche Fähigkeit, rechtswirksam einen Darlehensvertrag abzuschließen. Hängt an der <b>Geschäftsfähigkeit</b>.</td>
      <td>Alle <b>voll geschäftsfähigen Personen</b> (ab 18 Jahre) sowie juristische Personen (vertreten durch Vorstand/Geschäftsführer). Minderjährige sind <b>nicht</b> kreditfähig.</td>
    </tr>
    <tr>
      <td><b>${T('Kreditwürdigkeit', 'độ uy tín và khả năng chi trả tài chính')} (Bonität)</b></td>
      <td>Wirtschaftliche und persönliche Zuverlässigkeit, das Darlehen inklusive Zinsen vertragsgemäß zurückzuzahlen.</td>
      <td>Prüfung durch die Bank anhand von: Einkommensnachweisen, festem Arbeitsvertrag, monatlichen Ausgaben, vorhandenen Vermögenswerten sowie Auskunft der <b>${T('SCHUFA', 'cơ quan xếp hạng tín nhiệm tín dụng Đức')}</b>.</td>
    </tr>
  </tbody>
</table>
<h3 class="sub">2. Kreditarten im Vergleich</h3>
<table><tr><th>Kreditart</th><th>Laufzeit / Merkmal</th><th>Verwendung &amp; Zinsniveau</th></tr>
<tr><td><b>${T('Dispositionskredit', 'hạn mức thấu chi tài khoản')} (Dispo)</b></td><td>Sehr kurzfristig · Überziehung des Girokontos bis zu einem vereinbarten Rahmen (z. B. 2–3 Nettogehälter).</td><td>Für kurzfristige Engpässe. <b>Sehr hohe Zinsen</b> (oft 10 bis 14 % p. a.!). Sollte schnellstmöglich getilgt werden.</td></tr>
<tr><td><b>${T('Ratenkredit', 'khoản vay trả góp định kỳ')} (Konsumentenkredit)</b></td><td>Mittelfristig (12 bis 84 Monate) · Fester Zinssatz, Auszahlung in einer Summe, Rückzahlung in gleichbleibenden monatlichen Raten.</td><td>Anschaffung von Konsumgütern (Auto, Möbel, Elektronik). Deutlich günstiger als der Dispo.</td></tr>
<tr><td><b>${T('Annuitätendarlehen', 'khoản vay trả góp cố định cả gốc và lãi')}</b></td><td>Langfristig (10 bis 30 Jahre) · Gleichbleibende Jahres-/Monatsrate (${T('Annuität', 'số tiền trả góp cố định')}).</td><td>Immobilienfinanzierung. Mit jeder Tilgung sinkt der Zinsanteil, und der Tilgungsanteil steigt innerhalb der Rate.</td></tr>
<tr><td><b>${T('Fälligkeitsdarlehen', 'khoản vay trả lãi định kỳ, gốc trả 1 lần cuối kỳ')}</b></td><td>Während der Laufzeit werden nur die Zinsen gezahlt; die gesamte Darlehenssumme wird am Ende auf einen Schlag getilgt.</td><td>Oft kombiniert mit Lebensversicherungen oder Bausparverträgen zur Endtilgung.</td></tr></table>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Phân loại Tín dụng &amp; Uy tín vay tiền:</b>
  <ul>
    <li><b>Kreditfähigkeit:</b> Năng lực pháp lý theo luật dân sự (phải đủ 18 tuổi). Trẻ vị thành niên không được phép vay nợ.</li>
    <li><b>Kreditwürdigkeit (Bonität):</b> Khả năng tài chính và uy tín trả nợ (thu nhập ổn định, bảng lương, điểm số tín nhiệm SCHUFA sạch sẽ không nợ xấu).</li>
    <li><b>Các loại vay:</b> Dispokredit là vay thấu chi tài khoản thẻ, lãi cực kỳ đắt đỏ; Ratenkredit là vay tiêu dùng trả góp hàng tháng; Annuitätendarlehen là vay mua nhà đất với số tiền trả cố định (gốc tăng dần, lãi giảm dần).</li>
  </ul>
</div>
`;

  // CHUYÊN ĐỀ MỚI: Verbraucherdarlehen & Effektivverzinsung
  C.darlehen = `<h2>Verbraucherdarlehen &amp; Effektivverzinsung</h2>
<div class="hint">WK Fachstufe I · Gesetzliche Verbraucherschutzvorschriften bei Darlehen (§§ 491 ff. BGB) &amp; Effektivzinsvergleich.</div>
<h3 class="sub">1. Gesetzliche Vorgaben für Verbraucherdarlehen (§§ 491 ff. BGB)</h3>
<ul>
  <li><b>Zwingende ${T('Schriftform', 'hình thức văn bản bắt buộc')} (§ 492 BGB):</b> Verträge über Verbraucherdarlehen (ab 200 € Nettodarlehensbetrag) bedürfen der Schriftform oder einer qualifizierten elektronischen Signatur. Mündliche Kredite sind unwirksam!</li>
  <li><b>Gesetzliche Pflichtangaben:</b> Nettodarlehensbetrag, Sollzinssatz, effektiver Jahreszins, Vertragslaufzeit, Höhe und Fälligkeit der Monatsraten, Gesamtkosten und Kündigungsbedingungen.</li>
  <li><b>${T('Vorvertragliche Information', 'bảng thông tin trước hợp đồng')}:</b> Banken müssen dem Kunden rechtzeitig vor Abschluss die "Europäischen Standardinformationen für Verbraucherkredite" (SEKK) aushändigen.</li>
  <li><b>${T('Widerrufsrecht', 'quyền hủy hợp đồng')} (§ 495 BGB):</b> Der Verbraucher kann den Darlehensvertrag innerhalb von <b>14 Tagen</b> ohne Angabe von Gründen schriftlich widerrufen.</li>
  <li><b>Pflicht zur ${T('Kreditwürdigkeitsprüfung', 'nghĩa vụ kiểm tra khả năng trả nợ')} (§ 505a BGB):</b> Die Bank muss zwingend prüfen, ob der Verbraucher den Kredit voraussichtlich vertragsgemäß bedienen kann.</li>
</ul>
<h3 class="sub">2. Sollzins vs. Effektiver Jahreszins (Effektivverzinsung)</h3>
<table class="tbl">
  <thead><tr><th>Merkmal</th><th>${T('Sollzinssatz', 'lãi suất danh nghĩa')} (Nominalzins)</th><th>${T('Effektiver Jahreszins', 'lãi suất thực tế hàng năm')} (${T('Effektivzins', 'lãi suất hiệu dụng')})</th></tr></thead>
  <tbody>
    <tr><td><b>Definition</b></td><td>Der reine Zinssatz für das geliehene Kapital pro Jahr ohne Nebenkosten.</td><td>Die <b>Gesamtkosten des Kredits</b> bezogen auf ein Jahr in Prozent.</td></tr>
    <tr><td><b>Enthaltene Kosten</b></td><td>Nur der reine Zins.</td><td><b>Sollzins + Bearbeitungsgebühren + Tilgungsverrechnung + Zahlungsweise (Monat/Quartal) + evtl. Vermittlungskosten.</b></td></tr>
    <tr><td><b>Bedeutung beim Kreditvergleich</b></td><td>Ungeeignet zum Vergleich, da versteckte Nebenkosten fehlen!</td><td><b>Der einzige objektive Vergleichsmaßstab!</b> Die Preisangabenverordnung (PAngV) verpflichtet alle Banken, den effektiven Jahreszins gut sichtbar auszuweisen.</td></tr>
  </tbody>
</table>
<h3 class="sub">3. Beispielrechnung Effektivzins-Falle</h3>
<div class="note">
  <b>Vergleich zweier Angebote über 10.000 € Kredit (Laufzeit 36 Monate):</b><br>
  • <b>Bank A:</b> Sollzins 4,5 % p. a., aber mit 300 € Bearbeitungsgebühr und quartalsweiser Verrechnung → <b>Effektiver Jahreszins = 6,2 %</b>.<br>
  • <b>Bank B:</b> Sollzins 5,0 % p. a. ohne jegliche Zusatzgebühren und mit sofortiger monatlicher Tilgungsverrechnung → <b>Effektiver Jahreszins = 5,1 %</b>.<br>
  <b>Ergebnis:</b> Obwohl Bank A mit einem scheinbar niedrigeren "Sollzins" wirbt, ist <b>Bank B im Endeffekt deutlich günstiger!</b> Achte immer auf den effektiven Jahreszins!
</div>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Hợp đồng Vay Tiêu dùng &amp; Lãi suất Thực tế (Effektivzins):</b>
  <ul>
    <li><b>Quy định bảo vệ người vay (BGB § 491):</b> Bắt buộc phải ký hợp đồng bằng văn bản, ngân hàng phải minh bạch bảng chi phí chuẩn Châu Âu, khách hàng có <b>14 ngày</b> để hủy hợp đồng (Widerrufsrecht) không mất phí.</li>
    <li><b>Phân biệt Lãi suất Danh nghĩa (Sollzins) vs. Lãi suất Thực tế (Effektivzins):</b>
      <ul>
        <li><b>Sollzins:</b> Chỉ là con số lãi danh nghĩa mà ngân hàng quảng cáo giật tít, chưa tính các khoản phí phụ.</li>
        <li><b>Effektiver Jahreszins:</b> Là tổng toàn bộ chi phí thực sự mà bạn phải trả trong 1 năm (gồm lãi + các loại phí dịch vụ + chu kỳ tính lãi).</li>
      </ul>
    </li>
    <li><b>Quy tắc vàng khi đi vay ngân hàng:</b> Tuyệt đối không nhìn vào Sollzins. BẮT BUỘC phải dùng <b>Effektiver Jahreszins</b> để so sánh ngân hàng nào rẻ hơn!</li>
  </ul>
</div>
`;

  // Bürgschaft
  C.buergschaft = `<h2>Bürgschaft als Kreditsicherheit</h2>
<div class="hint">WK Fachstufe I · Personensicherheit · Selbstschuldnerische Bürgschaft vs. Ausfallbürgschaft.</div>
<h3 class="sub">1. Das Prinzip</h3>
<p>Ein Dritter (${T('Bürge', 'người bảo lãnh')}) verpflichtet sich gegenüber dem Gläubiger (Bank), für die Erfüllung der Verbindlichkeiten des Hauptschuldners einzustehen (§ 765 BGB).</p>
<p><b>${T('Schriftform', 'hình thức văn bản bắt buộc')} (§ 766 BGB):</b> Die Bürgschaftserklärung einer Privatperson muss schriftlich erteilt werden (Schutz vor Übereilung!). Elektronische Form ist ausgeschlossen.</p>
<h3 class="sub">2. Die beiden Arten</h3>
<table><tr><th>${T('Ausfallbürgschaft', 'bảo lãnh bồi hoàn / bảo lãnh thông thường')} (einfache Bürgschaft)</th><th>${T('Selbstschuldnerische Bürgschaft', 'bảo lãnh liên đới tự chịu trách nhiệm')}</th></tr>
<tr><td>Der Bürge hat die <b>${T('Einrede der Vorausklage', 'quyền yêu cầu khởi kiện con nợ chính trước')}</b> (§ 771 BGB). Die Bank muss zuerst erfolglos gegen den Hauptschuldner vollstrecken (Zwangsvollstreckung), bevor sie an den Bürgen herantreten darf.</td>
<td>Der Bürge <b>verzichtet auf die Einrede der Vorausklage</b> (§ 773 BGB). Sobald der Hauptschuldner bei Fälligkeit nicht zahlt (z. B. eine Rate platzt), kann die Bank <b>sofort direkt den Bürgen</b> zur Kasse bitten! Standardform der Banken.</td></tr></table>
<div class="hint">Achtung Azubis: Unterschreibe niemals leichtfertig eine selbstschuldnerische Bürgschaft! Du haftest wie der Hauptschuldner mit deinem gesamten Vermögen und Einkommen!</div>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Bảo lãnh Tín dụng (Bürgschaft):</b>
  <ul>
    <li><b>Hình thức:</b> Bắt buộc phải ký bằng văn bản trên giấy (Schriftform), không chấp nhận bảo lãnh miệng hay qua email/điện thoại.</li>
    <li><b>Ausfallbürgschaft:</b> Ngân hàng phải khởi kiện và cưỡng chế thi hành án con nợ chính thất bại rồi mới được quay sang đòi tiền người bảo lãnh.</li>
    <li><b>Selbstschuldnerische Bürgschaft:</b> Người bảo lãnh từ bỏ quyền yêu cầu khởi kiện con nợ trước. Ngay khi con nợ chính chậm trả 1 kỳ, ngân hàng có quyền đè người bảo lãnh ra đòi tiền ngay lập tức! (Rủi ro cực kỳ nguy hiểm).</li>
  </ul>
</div>
`;

  // CHUYÊN ĐỀ MỚI: Dingliche Sicherheiten der Banken
  C.banksicherheiten_dinglich = `<h2>Dingliche Sicherheiten der Banken</h2>
<div class="hint">WK Fachstufe I · Sicherungsübereignung · Verpfändung · Grundpfandrechte (Hypothek &amp; Grundschuld).</div>
<h3 class="sub">1. Übersicht: Personensicherheiten vs. Realsicherheiten</h3>
<ul>
  <li><b>Personensicherheiten:</b> Haftung einer Person mit ihrem persönlichen Vermögen (z. B. ${T('Bürgschaft', 'bảo lãnh cá nhân')}, Schuldbeitritt).</li>
  <li><b>Realsicherheiten (Dingliche Sicherheiten):</b> Haftung bestimmter Vermögensgegenstände (Sachen oder Rechte) zur Absicherung des Darlehens.</li>
</ul>
<h3 class="sub">2. Sicherungsübereignung vs. Verpfändung (Bewegliche Sachen)</h3>
<table class="tbl">
  <thead><tr><th>Merkmal</th><th>${T('Sicherungsübereignung', 'chuyển quyền sở hữu bảo đảm')}</th><th>${T('Verpfändung', 'cầm cố tài sản')} (${T('Pfandrecht', 'quyền cầm cố')} § 1204 BGB)</th></tr></thead>
  <tbody>
    <tr><td><b>Gegenstand</b></td><td>Bewegliche Sachen (z. B. Lieferwagen, Küchenmaschinen, Warenlager).</td><td>Bewegliche Sachen (Schmuck, Gold) oder Rechte (Wertpapiere, Sparkonto).</td></tr>
    <tr><td><b>Wer hat den Besitz?</b></td><td><b>Der Kunde (Schuldner) bleibt Besitzer!</b> Er kann die Maschine weiter nutzen und damit Geld verdienen (${T('Besitzkonstitut', 'thỏa thuận giữ lại quyền chiếm hữu')} § 930 BGB).</td><td><b>Die Bank wird unmittelbarer Besitzer!</b> Der Gegenstand muss der Bank tatsächlich übergeben werden (${T('Faustpfandprinzip', 'nguyên tắc cầm cố trao tay')}).</td></tr>
    <tr><td><b>Wer hat das Eigentum?</b></td><td><b>Die Bank wird Eigentümerin</b> (bis zur vollständigen Tilgung des Kredits).</td><td>Der Kunde bleibt Eigentümer; die Bank hat ein Verwertungsrecht bei Nichtzahlung.</td></tr>
  </tbody>
</table>
<h3 class="sub">3. Grundpfandrechte an Immobilien: Hypothek vs. Grundschuld</h3>
<p>Kredite für Grundstücke oder Gebäude werden durch Eintragung in das <b>${T('Grundbuch', 'sổ địa chính bất động sản')} (Abteilung III)</b> notariell beurkundet besichert:</p>
<table class="tbl">
  <thead><tr><th>Merkmal</th><th>${T('Hypothek', 'thế chấp phụ thuộc')} (§ 1113 BGB)</th><th>${T('Grundschuld', 'thế chấp độc lập')} (§ 1191 BGB)</th></tr></thead>
  <tbody>
    <tr><td><b>Bindung an das Darlehen</b></td><td><b>Streng an eine bestimmte Forderung gebunden</b> (${T('Akzessorietät', 'tính phụ thuộc')}). Verringert sich die Kreditschuld durch Tilgung, sinkt auch automatisch die Hypothek.</td><td><b>Völlig unabhängig von der persönlichen Forderung</b> (abstrakt).</td></tr>
    <tr><td><b>Wiederverwendbarkeit</b></td><td>Erlischt mit vollständiger Tilgung des Kredits. Für einen neuen Kredit muss eine neue Hypothek teuer beim Notar bestellt werden.</td><td><b>Beliebig wiederverwendbar!</b> Nach Abbezahlen bleibt die Grundschuld im Grundbuch stehen und kann für spätere Kredite ohne neue Notarkosten erneut als Sicherheit dienen.</td></tr>
    <tr><td><b>Praxis der Banken</b></td><td>Wird heute von Banken kaum noch verwendet.</td><td><b>Standardform in der modernen Bankpraxis!</b></td></tr>
  </tbody>
</table>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Các Biện Pháp Đảm Bảo Bằng Tài Sản (Realsicherheiten):</b>
  <ul>
    <li><b>Sicherungsübereignung (Chuyển quyền sở hữu bảo đảm):</b> Khách vay mua xe tải, máy làm bếp... Ngân hàng giữ quyền sở hữu (Eigentum) trên giấy tờ đăng ký xe, nhưng khách vẫn được trực tiếp giữ và sử dụng xe (Besitz) để kiếm tiền trả nợ.</li>
    <li><b>Verpfändung (Cầm cố):</b> Phải trao đồ vật (vàng, trang sức, sổ tiết kiệm) tận tay cho ngân hàng giữ trực tiếp. Ngân hàng nắm quyền sở hữu và chiếm hữu đồ.</li>
    <li><b>Hypothek vs. Grundschuld (Thế chấp bất động sản vào Grundbuch Abt. III):</b> Cả hai đều phải làm trước công chứng viên Notar. Hypothek phụ thuộc chặt vào khoản nợ (trả hết nợ là mất hiệu lực); Grundschuld độc lập với khoản nợ nên sau khi trả hết nợ vẫn có thể tái sử dụng để vay khoản khác mà không tốn thêm tiền công chứng. Do đó 100% ngân hàng ngày nay đều dùng Grundschuld!</li>
  </ul>
</div>
`;

  // Überschuldung & Verbraucherinsolvenz
  C.ueberschuldung = `<h2>Überschuldung &amp; Verbraucherinsolvenz</h2>
<div class="hint">WK Fachstufe I · Ursachen · Mahnverfahren · Pfändungsschutz · Restschuldbefreiung.</div>
<h3 class="sub">1. Verschuldung vs. Überschuldung</h3>
<ul>
<li>${T('Verschuldung', 'vay nợ thông thường')}: Man hat Schulden (z. B. Kredit fürs Auto), kann aber die Raten regelmäßig aus dem Einkommen bezahlen. Normaler wirtschaftlicher Vorgang.</li>
<li>${T('Überschuldung', 'vỡ nợ / mất khả năng thanh toán')}: Das Einkommen reicht über längere Zeit <b>nicht mehr aus</b>, um die laufenden Lebenshaltungskosten und fälligen Schulden zu decken.</li>
<li><b>Hauptursachen:</b> Arbeitslosigkeit, Scheidung/Trennung, schwere Krankheit/Sucht, gescheiterte Selbstständigkeit, unüberlegtes Konsumverhalten (Ratenkäufe, Dispo).</li>
</ul>
<h3 class="sub">2. Wege aus der Schuldenfalle</h3>
<ol>
<li><b>Ausgaben stoppen:</b> Haushaltsbuch führen, Verträge kündigen, keine neuen Schulden.</li>
<li><b>${T('Schuldnerberatung', 'tư vấn gỡ nợ chuyên nghiệp')}:</b> Kostenlose gemeinnützige Beratungsstellen (Caritas, Diakonie, Stadt). Verhandelt mit Gläubigern über einen ${T('Schuldenbereinigungsplan', 'kế hoạch dàn xếp trả nợ')}.</li>
<li><b>${T('P-Konto', 'tài khoản ngân hàng bảo vệ chống kê biên')} (Pfändungsschutzkonto):</b> Jedes Girokonto kann bei der Bank in ein P-Konto umgewandelt werden. Sichert einen monatlichen <b>Grundfreibetrag</b> (gesetzlich geschützt vor Pfändung für Miete, Lebensmittel, Strom).</li>
</ol>
<h3 class="sub">3. Das gerichtliche Mahnverfahren</h3>
<p>Schnelles, automatisiertes Verfahren des Gläubigers, um einen ${T('Vollstreckungstitel', 'bản án thi hành án có hiệu lực 30 năm')} zu erhalten:</p>
<ol>
<li>Gläubiger beantragt ${T('Mahnbescheid', 'trát đòi nợ của tòa án')} beim Mahngericht → Schuldner hat <b>2 Wochen Frist für Widerspruch</b>.</li>
<li>Erfolgt kein Widerspruch → Gläubiger beantragt ${T('Vollstreckungsbescheid', 'quyết định cưỡng chế thi hành án')} → Schuldner hat <b>2 Wochen Frist für Einspruch</b>.</li>
<li>Wird kein Einspruch eingelegt → Titel ist rechtskräftig (30 Jahre vollstreckbar durch den Gerichtsvollzieher: Kontopfändung, Sachpfändung, Lohnpfändung).</li>
</ol>
<h3 class="sub">4. Die Verbraucherinsolvenz (Privatinsolvenz)</h3>
<p>Wenn die außergerichtliche Einigung scheitert, kann der Schuldner beim Insolvenzgericht das Insolvenzverfahren eröffnen:</p>
<ul>
<li>${T('Wohlverhaltensphase', 'giai đoạn thử thách thiện chí')}: Dauert in der Regel <b>3 Jahre</b>. Der Schuldner muss einer Erwerbstätigkeit nachgehen; der pfändbare Teil des Einkommens geht an einen Treuhänder zur gleichmäßigen Verteilung an die Gläubiger.</li>
<li>${T('Restschuldbefreiung', 'quyết định xóa sạch toàn bộ số nợ còn lại')}: Nach Ablauf der 3 Jahre erlässt das Gericht alle verbleibenden Schulden! Der Schuldner ist wieder schuldenfrei und kann wirtschaftlich neu anfangen.</li>
</ul>
<div class="vi">
  <b>Tóm tắt Tiếng Việt — Vỡ Nợ &amp; Quy Trình Phá Sản Cá Nhân (Privatinsolvenz):</b>
  <ul>
    <li><b>Tài khoản P-Konto:</b> Khi bị đòi nợ, phải lập tức yêu cầu ngân hàng chuyển tài khoản sang P-Konto để giữ lại mức sinh hoạt tối thiểu theo luật (tiền ăn, tiền nhà không ai được phép siết).</li>
    <li><b>Trát tòa (Mahnbescheid):</b> Khi nhận được trát đòi nợ từ tòa, luôn có thời hạn <b>2 tuần</b> để kháng nghị (Widerspruch). Nếu im lặng, quyết định sẽ có hiệu lực thi hành án suốt 30 năm!</li>
    <li><b>Quy trình phá sản tiêu dùng (Verbraucherinsolvenz):</b> Hòa giải ngoài tòa án bất thành → Nộp đơn xin phá sản lên Tòa án → Giai đoạn thiện chí giao nộp phần lương trên mức tối thiểu trong vòng <b>3 năm</b> để được <b>xóa sạch toàn bộ nợ còn lại (Restschuldbefreiung)</b>.</li>
  </ul>
</div>
`;

  // =========================================================================
  // BỘ CÂU HỎI QUIZ MỚI BỔ SUNG CHO TẤT CẢ CÁC CHỦ ĐỀ
  // =========================================================================
  const Q = (theme, q, opts, a, ex) => ({ theme, cat: 'WK', q, opts, a, ex });

  const ALL_EXTRA_QUIZ = [
    // Steuererklärung
    Q('wk-steuererklaerung', 'Wann ist ein Arbeitnehmer verpflichtet, eine Einkommensteuererklärung abzugeben?', ['Immer, wenn er Lohnsteuer zahlt', 'Wenn er gleichzeitig bei zwei Arbeitgebern arbeitet (Steuerklasse VI)', 'Nur wenn er Kinder hat', 'Nur bei einem Einkommen über 50.000 €'], 1, 'Steuerklasse VI (Zweitjob), III/V oder Lohnersatzleistungen über 410 € → Pflicht. Bậc VI là bắt buộc khai.'),
    Q('wk-steuererklaerung', 'Wie viele Jahre rückwirkend kann ein Azubi freiwillig eine Steuererklärung abgeben?', ['1 Jahr', '2 Jahre', '4 Jahre', '10 Jahre'], 2, 'Antragsveranlagung: bis zu 4 Jahre rückwirkend. Khai tự nguyện lùi tối đa 4 năm.'),
    Q('wk-steuererklaerung', 'Welche Ausgabe zählt zu den Werbungskosten?', ['Miete der Privatwohnung', 'Fahrtkosten zur Ausbildungsstätte', 'Urlaubsreise', 'Kfz-Steuer des Privatautos'], 1, 'Werbungskosten = Kosten für den Beruf: Fahrtkosten (Entfernungspauschale), Arbeitskleidung, Fachbücher.'),
    Q('wk-steuererklaerung', 'Wie hoch ist der Arbeitnehmer-Pauschbetrag, der ohne Nachweis abgezogen wird?', ['410 €', '1.000 €', '1.230 €', '2.400 €'], 2, 'Seit 2023: 1.230 € pro Jahr.'),
    // Altersvorsorge & Private Zusatzversicherung
    Q('wk-altersvorsorge', 'Welche drei Säulen bilden das deutsche Alterssicherungssystem?', ['Sparbuch, Aktien, Gold', 'Gesetzliche Rente, betriebliche Altersvorsorge, private Vorsorge', 'Krankenkasse, Unfallkasse, Pflegekasse', 'Staat, Familie, Freunde'], 1, '3 Säulen: gesetzlich, betrieblich, privat.'),
    Q('wk-altersvorsorge', 'Wie wird die gesetzliche Rentenversicherung finanziert?', ['Kapitaldeckungsverfahren', 'Umlageverfahren (Generationenvertrag)', 'Ausschließlich aus Steuern', 'Durch Kredite der Bundesbank'], 1, 'Umlageverfahren: Heutige Beiträge zahlen heutige Renten.'),
    Q('wk-altersvorsorge', 'Welche private Zusatzversicherung ist für Berufstätige besonders wichtig zur Existenzsicherung?', ['Handyversicherung', 'Berufsunfähigkeitsversicherung (BU)', 'Brillenversicherung', 'Reiserücktrittsversicherung'], 1, 'BU-Versicherung sichert das Einkommen ab, wenn man krankheitsbedingt seinen Beruf nicht mehr ausüben kann.'),
    // Solidarität
    Q('wk-solidaritaet', 'Was bedeutet das Solidaritätsprinzip in der Sozialversicherung?', ['Jeder bekommt exakt das heraus, was er eingezahlt hat', 'Beiträge richten sich nach dem Einkommen, Leistungen nach dem Bedarf', 'Der Staat zahlt alle Kosten', 'Reiche müssen nicht einzahlen'], 1, 'Solidarität: Gesunde für Kranke, Gutverdiener mehr als Geringverdiener.'),
    Q('wk-solidaritaet', 'Welcher Zweig der Sozialversicherung wird allein vom Arbeitgeber bezahlt?', ['Krankenversicherung', 'Rentenversicherung', 'Gesetzliche Unfallversicherung (BG)', 'Pflegeversicherung'], 2, 'Unfallversicherung zahlt zu 100 % der Arbeitgeber.'),
    // Kaufvertrag & Verjährung
    Q('wk-kaufvertrag', 'Welches Recht hat der Käufer bei einem Sachmangel VORRANGIG?', ['Rücktritt vom Kaufvertrag', 'Minderung des Kaufpreises', 'Nacherfüllung (Nachbesserung oder Nachlieferung)', 'Schadensersatz'], 2, 'Vorrangig: Nacherfüllung (§ 439 BGB). Nachrangig erst nach Fristablauf.'),
    Q('wk-kaufvertrag', 'Wie lang ist die regelmäßige Verjährungsfrist für Geldforderungen nach § 195 BGB?', ['1 Jahr', '2 Jahre', '3 Jahre ab Jahresende', '10 Jahre'], 2, '§ 195 BGB: 3 Jahre ab Schluss des Jahres (Ultimo-Prinzip).'),
    Q('wk-kaufvertrag', 'Was passiert mit der Verjährungsfrist bei einem Neubeginn nach § 212 BGB (z. B. durch Teilzahlung)?', ['Die Frist wird um 6 Monate verlängert', 'Die Frist beginnt wieder in voller Länge (3 Jahre) von vorn', 'Die Frist wird halbiert', 'Die Forderung erlischt sofort'], 1, 'Neubeginn: Die Frist startet wieder komplett von vorn.'),
    // Verbraucherschutz & UWG
    Q('wk-verbraucherschutz', 'Was ist nach dem UWG als "unzumutbare Belästigung" ausdrücklich verboten?', ['Werbung im Fernsehen zur Hauptsendezeit', 'Unerbetene Werbeanrufe ohne vorherige Einwilligung (Cold Calling)', 'Gedruckte Prospekte im Briefkasten mit Werbestopp-Aufkleber', 'Plakatwerbung an Bushaltestellen'], 1, '§ 7 UWG: Telefonwerbung ohne ausdrückliche Einwilligung (Cold Calling) ist verboten.'),
    Q('wk-verbraucherschutz', 'Wie lange kann ein Verbraucher einen Fernabsatzvertrag (Online-Kauf) widerrufen?', ['7 Tage', '14 Tage', '1 Monat', '100 Tage'], 1, '§ 355 BGB: Widerrufsfrist 14 Tage ab Warenerhalt.'),
    Q('wk-verbraucherschutz', 'Wie hoch sind die gesetzlichen Verzugszinsen bei Rechtsgeschäften mit Verbrauchern?', ['2 % über Basiszinssatz', '5 %-Punkte über Basiszinssatz', '9 %-Punkte über Basiszinssatz', 'Pauschal 10 %'], 1, '§ 288 BGB: 5 %-Punkte über Basiszinssatz bei Verbrauchern (bei B2B: 9 %-Punkte).'),
    // Geld & Zahlungsverkehr
    Q('wk-geld', 'Welche Frist gilt für den Widerspruch bei einer autorisierten SEPA-Basislastschrift?', ['2 Tage', '2 Wochen', '8 Wochen', '13 Monate'], 2, '8 Wochen ohne Begründung; 13 Monate bei unberechtigter Abbuchung.'),
    Q('wk-geld', 'Welche Angabe identifiziert das Bankkonto im SEPA-Raum europaweit?', ['BLZ', 'IBAN', 'PIN', 'TAN'], 1, 'IBAN (in DE: 22 Stellen).'),
    // Geldanlagen (MỚI)
    Q('wk-geldanlage', 'Welche drei Ziele stehen im "Magischen Dreieck der Geldanlage" in Konkurrenz zueinander?', ['Gold, Aktien, Immobilien', 'Rentabilität, Sicherheit, Liquidität', 'Zinsen, Steuern, Inflation', 'Bank, Börse, Staat'], 1, 'Magisches Dreieck: Rentabilität (Rendite) vs. Sicherheit vs. Liquidität (Verfügbarkeit).'),
    Q('wk-geldanlage', 'Bis zu welchem Betrag schützt die gesetzliche Einlagensicherung Bankguthaben (z. B. Tagesgeld/Festgeld) je Kunde und Bank?', ['10.000 €', '50.000 €', '100.000 €', 'Unbegrenzt'], 2, 'Gesetzliche Einlagensicherung in der EU: 100.000 € pro Kunde und Bank.'),
    Q('wk-geldanlage', 'Was ist der wesentliche Vorteil eines passiven ETF gegenüber einem aktiven Investmentfonds?', ['Garantierter Gewinn von mind. 10 %', 'Keine Kursschwankungen', 'Deutlich geringere laufende Kosten und breite Risikostreuung', 'Täglicher Zinseszins'], 2, 'ETFs bilden einen Index (z. B. MSCI World) ohne teures Fondsmanagement nach; extrem niedrige Gebühren.'),
    // Kredit & Darlehen
    Q('wk-kredit', 'Worin besteht der Unterschied zwischen Kreditfähigkeit und Kreditwürdigkeit?', ['Kreditfähigkeit ist das Alter, Kreditwürdigkeit das Geschlecht', 'Kreditfähigkeit ist die rechtliche Fähigkeit (Volljährigkeit); Kreditwürdigkeit ist die finanzielle Zuverlässigkeit (Bonität/SCHUFA)', 'Es gibt keinen Unterschied', 'Kreditwürdigkeit entscheidet das Gericht'], 1, 'Kreditfähigkeit = rechtlich voll geschäftsfähig; Kreditwürdigkeit = wirtschaftlich zahlungsfähig (SCHUFA).'),
    Q('wk-darlehen-effektivzins', 'Welche Angabe eignet sich am besten für den objektiven Vergleich verschiedener Kreditangebote?', ['Sollzinssatz (Nominalzins)', 'Effektiver Jahreszins', 'Laufzeit des Kredits', 'Name der Bank'], 1, 'Der effektive Jahreszins enthält alle Nebenkosten und Gebühren und ist der einzig vergleichbare Maßstab.'),
    Q('wk-darlehen-effektivzins', 'Welche gesetzliche Schutzfrist gilt beim Verbraucherdarlehensvertrag für den Widerruf?', ['Gar kein Widerrufsrecht', '7 Tage', '14 Tage ab Vertragsschluss und Belehrung', '1 Monat'], 2, '§ 495 BGB: 14 Tage Widerrufsrecht für Verbraucher.'),
    // Sicherheiten der Banken
    Q('wk-banksicherheiten-dinglich', 'Wer ist bei einer Sicherungsübereignung eines Firmenwagens der Besitzer und wer der Eigentümer?', ['Kunde = Eigentümer, Bank = Besitzer', 'Bank = Eigentümerin, Kunde = Besitzer (nutzt das Fahrzeug weiter)', 'Beide sind Miteigentümer', 'Das Autohaus bleibt Eigentümer'], 1, 'Bank wird Eigentümerin (Sicherheit); Kunde bleibt Besitzer und fährt das Auto weiter.'),
    Q('wk-banksicherheiten-dinglich', 'Was unterscheidet die Grundschuld von der Hypothek bei der Immobilienfinanzierung?', ['Die Grundschuld ist abstrakt (unabhängig vom Darlehen) und wiederverwendbar; die Hypothek ist streng an das Darlehen gebunden', 'Die Hypothek ist für Autos, die Grundschuld für Häuser', 'Die Grundschuld wird nicht ins Grundbuch eingetragen', 'Es gibt keinen Unterschied'], 0, 'Grundschuld ist abstrakt und wiederverwendbar; Hypothek ist akzessorisch.'),
    Q('wk-buergschaft', 'Warum ist eine selbstschuldnerische Bürgschaft für den Bürgen besonders riskant?', ['Weil der Bürge doppelt zahlen muss', 'Weil die Bank sofort an den Bürgen herantreten kann, ohne vorher den Hauptschuldner verklagen zu müssen', 'Weil der Vertrag nur mündlich gilt', 'Weil man automatisch vorbestraft wird'], 1, 'Verzicht auf die Einrede der Vorausklage: Bank kann sofort den Bürgen belangen.'),
    // Überschuldung
    Q('wk-ueberschuldung', 'Wie lange dauert die Wohlverhaltensphase bis zur Restschuldbefreiung im Verbraucherinsolvenzverfahren in der Regel?', ['1 Jahr', '3 Jahre', '6 Jahre', '10 Jahre'], 1, 'Seit der Gesetzesreform 2020/2021: 3 Jahre.'),
    Q('wk-ueberschuldung', 'Welche Funktion hat ein Pfändungsschutzkonto (P-Konto)?', ['Es verhindert jede Kontoüberweisung', 'Es schützt ein gesetzliches Grundguthaben (Existenzminimum) vor Kontopfändungen', 'Es tilgt automatisch die Schulden', 'Es verdoppelt das Gehalt'], 1, 'P-Konto sichert den gesetzlichen Grundfreibetrag vor Pfändung für Miete und Lebensmittel.')
  ];

  // =========================================================================
  // HÀM TÁI CẤU TRÚC TOÀN DIỆN MÔN WIKO (THEMEN IN WIRTSCHAFTS- UND SOZIALKUNDE)
  // =========================================================================
  window.buildWikoFach = function (baseWiko) {
    if (!baseWiko) return baseWiko;

    // 1. Thu thập tất cả các items hiện có
    const itemsMap = new Map();
    (baseWiko.groups || []).forEach(function (g) {
      (g.items || []).forEach(function (it) {
        itemsMap.set(it.id, it);
      });
    });

    // 2. Nâng cấp các items hiện có với nội dung chuyên sâu
    if (itemsMap.has('wiko-arbeitsschutz')) {
      const it = itemsMap.get('wiko-arbeitsschutz');
      if (!it.content.includes('Mutterschutz &amp; Elternzeit (Chuyên sâu)')) {
        it.content += C.arbeitsschutz_ext;
      }
      it.desc = 'JArbSchG · ArbZG · BUrlG · MuSchG · Elternzeit (BEEG)';
    }

    if (itemsMap.has('wiko-betriebsrat-mitbestimmung')) {
      const it = itemsMap.get('wiko-betriebsrat-mitbestimmung');
      if (!it.content.includes('Aktives vs. Passives Wahlrecht')) {
        it.content += C.betriebsrat_ext;
      }
      it.desc = 'Voraussetzungen · Aktives (ab 16) & passives (ab 18) Wahlrecht · 4 Beteiligungsstufen';
    }

    if (itemsMap.has('wiko-tarifvertrag')) {
      const it = itemsMap.get('wiko-tarifvertrag');
      if (!it.content.includes('Die Sozialpartner &amp; Tarifvertragsarten')) {
        it.content += C.tarifvertrag_ext;
      }
      it.desc = 'Sozialpartner · Tarifautonomie (Art. 9 GG) · Entgelt-, Rahmenentgelt- & Manteltarifvertrag';
    }

    if (itemsMap.has('wiko-steuerklassen')) {
      const it = itemsMap.get('wiko-steuerklassen');
      if (!it.content.includes('Bruttolohn – Nettolohn – Ausbezahlter Lohn')) {
        it.content += C.lohnabrechnung_ext;
      }
      it.name = 'Lohnabrechnung & Lohnsteuerklassen';
      it.desc = 'Brutto → Netto → Ausbezahlter Lohn (Auszahlungsbetrag) · 6 Lohnsteuerklassen';
    }

    if (itemsMap.has('wiko-rg-p1')) {
      const it = itemsMap.get('wiko-rg-p1');
      if (!it.content.includes('Juristische Personen im Detail')) {
        it.content += C.rechtsfaehigkeit_ext;
      }
      it.name = 'Rechtsfähigkeit (Natürliche & Juristische Personen)';
      it.desc = 'Natürliche Personen (ab Geburt) vs. Juristische Personen (des Privatrechts & öffentlichen Rechts)';
    }

    // 3. Tạo các items mới hoặc lấy từ C
    const itemSteuer = itemsMap.get('wk-steuererklaerung') || {
      id: 'wk-steuererklaerung', icon: IC_DOC, name: 'Einkommensteuererklärung',
      desc: 'Pflicht vs. freiwillig (Antragsveranlagung) · Werbungskosten · Sonderausgaben',
      content: C.steuer
    };
    itemSteuer.content = C.steuer;

    const itemAltersvorsorge = itemsMap.get('wk-altersvorsorge') || {
      id: 'wk-altersvorsorge', icon: IC_USERS, name: 'Altersvorsorge & Private Zusatzversicherungen',
      desc: '3-Säulen-Modell · Demografischer Wandel · BU-Versicherung & Zahnzusatz',
      content: C.altersvorsorge
    };
    itemAltersvorsorge.content = C.altersvorsorge;

    const itemSoli = itemsMap.get('wk-solidaritaet') || {
      id: 'wk-solidaritaet', icon: IC_SHIELD, name: 'Sozialversicherung · Solidaritätsprinzip',
      desc: 'Solidarität · Generationenvertrag · 5 Zweige · Subsidiarität',
      content: C.soli
    };
    itemSoli.content = C.soli;

    const itemKaufvertragVertieft = itemsMap.get('wk-kaufvertrag') || {
      id: 'wk-kaufvertrag', icon: IC_SCALE, name: 'Mängelhaftung & Verjährung von Forderungen',
      desc: 'Gewährleistung vs. Garantie · Vorrangige & nachrangige Rechte · Verjährung (3 Jahre, Hemmung, Neubeginn)',
      content: C.kaufvertrag
    };
    itemKaufvertragVertieft.content = C.kaufvertrag;

    const itemVerbraucherschutz = itemsMap.get('wk-verbraucherschutz') || {
      id: 'wk-verbraucherschutz', icon: IC_SHIELD, name: 'Verbraucherberatung, UWG & Leistungsstörungen',
      desc: 'Verbraucherschutzgesetze · Gesetz gegen den unlauteren Wettbewerb (UWG) · Lieferungs-, Annahme- & Zahlungsverzug',
      content: C.verbraucherschutz
    };
    itemVerbraucherschutz.content = C.verbraucherschutz;

    const itemGeld = itemsMap.get('wk-geld') || {
      id: 'wk-geld', icon: IC_EURO, name: 'Geld & Zahlungsverkehr',
      desc: 'Zahlungsformen · SEPA · Überweisung · Lastschrift · Girocard & Kreditkarte',
      content: C.geld
    };
    itemGeld.content = C.geld;

    const itemGeldanlage = itemsMap.get('wk-geldanlage') || {
      id: 'wk-geldanlage', icon: IC_COIN, name: 'Geldanlagemöglichkeiten & Magisches Dreieck',
      desc: 'Sparbuch, Termingeld, Tagesgeld · Aktien & Anleihen · Fonds & ETFs · Magisches Dreieck',
      content: C.geldanlage
    };
    itemGeldanlage.content = C.geldanlage;

    const itemKredit = itemsMap.get('wk-kredit') || {
      id: 'wk-kredit', icon: IC_EURO, name: 'Kreditarten & Kreditvergleiche',
      desc: 'Kreditfähigkeit vs. Kreditwürdigkeit (Bonität) · Dispo, Ratenkredit, Annuitätendarlehen · SCHUFA',
      content: C.kredit
    };
    itemKredit.content = C.kredit;

    const itemDarlehen = itemsMap.get('wk-darlehen-effektivzins') || {
      id: 'wk-darlehen-effektivzins', icon: IC_DOC, name: 'Verbraucherdarlehen & Effektivverzinsung',
      desc: 'BGB § 491 ff. · Schriftform & 14 Tage Widerruf · Sollzins vs. Effektiver Jahreszins',
      content: C.darlehen
    };
    itemDarlehen.content = C.darlehen;

    const itemBuergschaft = itemsMap.get('wk-buergschaft') || {
      id: 'wk-buergschaft', icon: IC_DOC, name: 'Personensicherheiten · Bürgschaft',
      desc: 'Ausfallbürgschaft (Einrede der Vorausklage) vs. Selbstschuldnerische Bürgschaft',
      content: C.buergschaft
    };
    itemBuergschaft.content = C.buergschaft;

    const itemBanksicherheitenDinglich = itemsMap.get('wk-banksicherheiten-dinglich') || {
      id: 'wk-banksicherheiten-dinglich', icon: IC_SCALE, name: 'Dingliche Kreditsicherheiten der Banken',
      desc: 'Sicherungsübereignung · Verpfändung (Pfandrecht) · Grundpfandrechte: Hypothek vs. Grundschuld',
      content: C.banksicherheiten_dinglich
    };
    itemBanksicherheitenDinglich.content = C.banksicherheiten_dinglich;

    const itemUeberschuldung = itemsMap.get('wk-ueberschuldung') || {
      id: 'wk-ueberschuldung', icon: IC_ALERT, name: 'Überschuldung & Verbraucherinsolvenz',
      desc: 'Schuldnerberatung · P-Konto · Gerichtliches Mahnverfahren · 3 Jahre Wohlverhaltensphase & Restschuldbefreiung',
      content: C.ueberschuldung
    };
    itemUeberschuldung.content = C.ueberschuldung;

    // Đưa tất cả vào itemsMap
    [itemSteuer, itemAltersvorsorge, itemSoli, itemKaufvertragVertieft, itemVerbraucherschutz,
     itemGeld, itemGeldanlage, itemKredit, itemDarlehen, itemBuergschaft, itemBanksicherheitenDinglich, itemUeberschuldung].forEach(function (it) {
      itemsMap.set(it.id, it);
    });

    const getItems = function () {
      const res = [];
      for (let i = 0; i < arguments.length; i++) {
        const id = arguments[i];
        if (itemsMap.has(id)) res.push(itemsMap.get(id));
      }
      return res;
    };

    // =========================================================================
    // 4. SẮP XẾP LẠI TOÀN BỘ GROUPS CHUẨN FORM GIÁO TRÌNH RM (GRUNDSTUFE & FACHSTUFE I)
    // =========================================================================
    baseWiko.groups = [
      // -----------------------------------------------------------------------
      // PHẦN I: GRUNDSTUFE (9 Cụm chuyên đề chính)
      // -----------------------------------------------------------------------
      {
        id: 'wk-g-duale-ausbildung',
        badge: 'Grundstufe',
        title: '1. Duale Berufsausbildung',
        items: getItems('wiko-duales-system')
      },
      {
        id: 'wk-g-ausbildungsvertrag',
        badge: 'Grundstufe',
        title: '2. Ausbildungsvertrag',
        items: getItems('wiko-ausbildungsvertrag', 'wiko-probezeit-ueberwachung', 'wiko-rechte-pflichten', 'wiko-fall-klara')
      },
      {
        id: 'wk-g-arbeitsschutz',
        badge: 'Grundstufe',
        title: '3. Schutzvorschriften in der Arbeitswelt',
        items: getItems('wiko-arbeitsschutz')
      },
      {
        id: 'wk-g-arbeitsvertrag',
        badge: 'Grundstufe',
        title: '4. Arbeitsvertrag & Kündigung',
        items: getItems('wiko-bewerbung-vorstellung', 'wiko-fragen-agg', 'wiko-arbeitsvertrag', 'wiko-arbeitszeugnis', 'wiko-kuendigung-frist', 'wiko-kuendigungsschutz', 'wiko-kuendigung-fristlos')
      },
      {
        id: 'wk-g-betriebsrat',
        badge: 'Grundstufe',
        title: '5. Betriebsrat & Mitbestimmung',
        items: getItems('wiko-betriebsrat-mitbestimmung', 'wiko-jav')
      },
      {
        id: 'wk-g-tarifvertrag',
        badge: 'Grundstufe',
        title: '6. Tarifverträge & Arbeitskampf',
        items: getItems('wiko-tarifvertrag', 'wiko-arbeitskampf')
      },
      {
        id: 'wk-g-sozialversicherungen',
        badge: 'Grundstufe',
        title: '7. Grundzüge der Sozialversicherungen',
        items: getItems('wk-solidaritaet', 'wiko-lohnabrechnung-sozial', 'wk-altersvorsorge')
      },
      {
        id: 'wk-g-lohnabrechnung',
        badge: 'Grundstufe',
        title: '8. Lohnabrechnungen',
        items: getItems('wiko-steuerklassen')
      },
      {
        id: 'wk-g-steuererklaerung',
        badge: 'Grundstufe',
        title: '9. Steuererklärung',
        items: getItems('wk-steuererklaerung')
      },

      // -----------------------------------------------------------------------
      // PHẦN II: FACHSTUFE I (10 Cụm chuyên đề chính)
      // -----------------------------------------------------------------------
      {
        id: 'wk-f1-rechtsfaehigkeit',
        badge: 'Fachstufe I',
        title: '1. Rechtsfähigkeit',
        items: getItems('wiko-rg-p1')
      },
      {
        id: 'wk-f1-geschaeftsfaehigkeit',
        badge: 'Fachstufe I',
        title: '2. Geschäftsfähigkeit & Rechtsfolgen',
        items: getItems('wiko-rg-bt1')
      },
      {
        id: 'wk-f1-willenserklaerungen',
        badge: 'Fachstufe I',
        title: '3. Abgabe von Willenserklärungen & Rechtsgeschäfte',
        items: getItems('wiko-rg-p2', 'wiko-rg-bt2', 'wiko-rg-bt3', 'wiko-rg-bt4')
      },
      {
        id: 'wk-f1-kaufvertrag',
        badge: 'Fachstufe I',
        title: '4. Kaufvertrag · Erfüllung · Mängel · Verjährung',
        items: getItems('kaufvertrag', 'wiko-rg-p3', 'wk-kaufvertrag', 'wiko-rg-bt5')
      },
      {
        id: 'wk-f1-verbraucherberatung',
        badge: 'Fachstufe I',
        title: '5. Verbraucherberatung · UWG · Verzug',
        items: getItems('wk-verbraucherschutz')
      },
      {
        id: 'wk-f1-umgang-mit-geld',
        badge: 'Fachstufe I',
        title: '6. Umgang mit Geld & Geldanlagemöglichkeiten',
        items: getItems('wk-geld', 'wk-geldanlage')
      },
      {
        id: 'wk-f1-kreditarten',
        badge: 'Fachstufe I',
        title: '7. Kreditarten, Kreditvergleiche & SCHUFA',
        items: getItems('wk-kredit')
      },
      {
        id: 'wk-f1-darlehen',
        badge: 'Fachstufe I',
        title: '8. Verbraucherdarlehen & Effektivverzinsung',
        items: getItems('wk-darlehen-effektivzins')
      },
      {
        id: 'wk-f1-banksicherheiten',
        badge: 'Fachstufe I',
        title: '9. Sicherungen der Banken (Personen- & Realsicherheiten)',
        items: getItems('wk-buergschaft', 'wk-banksicherheiten-dinglich')
      },
      {
        id: 'wk-f1-ueberschuldung',
        badge: 'Fachstufe I',
        title: '10. Überschuldung & Verbraucherinsolvenz',
        items: getItems('wk-ueberschuldung')
      },

      // -----------------------------------------------------------------------
      // PHẦN III: PRÜFUNGSTRAINING (Tổng hợp ôn thi & Tình huống thực tế)
      // -----------------------------------------------------------------------
      {
        id: 'wiso-theorie',
        badge: 'WiSo Prüfung',
        title: 'WiSo Prüfung · 9 Themen im Gesamtüberblick',
        items: getItems('wiso-thema-1', 'wiso-thema-2', 'wiso-thema-3', 'wiso-thema-4', 'wiso-thema-5', 'wiso-thema-6', 'wiso-thema-7', 'wiso-thema-8', 'wiso-thema-9')
      },
      {
        id: 'wk-falluebungen',
        badge: 'Fall-Übungen',
        title: 'Fall-Übungen · BGB & Arbeitsrecht Fälle',
        items: getItems('wiko-rg-bt6')
      }
    ];

    // 5. Hợp nhất Quiz: giữ quiz gốc + bổ sung ALL_EXTRA_QUIZ (tránh trùng)
    const existingQKeys = new Set((baseWiko.quiz || []).map(function (q) { return q.theme + '|' + q.q; }));
    const mergedQuiz = (baseWiko.quiz || []).slice();
    ALL_EXTRA_QUIZ.forEach(function (q) {
      const key = q.theme + '|' + q.q;
      if (!existingQKeys.has(key)) {
        existingQKeys.add(key);
        mergedQuiz.push(q);
      }
    });
    baseWiko.quiz = mergedQuiz;

    return baseWiko;
  };

  // Giữ lại các biến tương thích ngược
  window.WIKO_EXTRA_GROUPS = [];
  window.WIKO_EXTRA_QUIZ = ALL_EXTRA_QUIZ;

})();
