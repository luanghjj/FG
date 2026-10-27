/**
 * wiko-pruefung-data.js
 * WK-Ergänzung für die Abschlussprüfung Winter 2026 (WK 10.11.2026)
 * - Grundstufe: Steuererklärung, Altersvorsorge, Solidaritätsprinzip
 * - Fachstufe I: Kaufvertrag (vertieft), Verbraucherschutz, Geld, Kredit, Bürgschaft, Überschuldung
 * Wird in js/faecher.js (buildRegistry) an das Fach "wiko" angehängt.
 */
(function () {
  'use strict';

  const IC_BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
  const IC_EURO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 6.5A7 7 0 1 0 17 17.5"/><path d="M4 10h9"/><path d="M4 14h9"/></svg>';
  const IC_SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>';
  const IC_USERS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>';
  const IC_DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>';
  const IC_ALERT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';

  const T = (de, vi) => '<span class="term" data-de="' + de + '" data-vi="' + vi + '">' + de + '</span>';

  const C = {};

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
<h3 class="sub">3. Was mindert die Steuer?</h3>
<ul>
<li>${T('Werbungskosten', 'chi phí liên quan đến công việc')}: Kosten für den Beruf – Fahrtkosten (${T('Entfernungspauschale', 'trợ cấp quãng đường đi làm')} je Entfernungskilometer), Arbeitskleidung, Fachbücher, Bewerbungskosten. Ohne Nachweis gilt der <b>Arbeitnehmer-Pauschbetrag 1.230 €</b>.</li>
<li>${T('Sonderausgaben', 'chi phí đặc biệt được khấu trừ')}: z. B. Vorsorgeaufwendungen (Kranken-, Rentenversicherung), Kirchensteuer, Spenden.</li>
<li>${T('Außergewöhnliche Belastungen', 'gánh nặng bất thường')}: z. B. hohe Krankheitskosten, Pflege.</li>
<li>${T('Grundfreibetrag', 'mức thu nhập miễn thuế')}: Einkommen bis zu diesem Betrag (2025: 12.096 €) bleibt steuerfrei.</li>
</ul>
<p>→ Chi phí đi làm, đồ nghề, sách chuyên môn (Werbungskosten), bảo hiểm, quyên góp (Sonderausgaben), chi phí bệnh tật lớn (außergewöhnliche Belastungen) làm giảm thuế.</p>
<h3 class="sub">4. Steuerbescheid & Einspruch</h3>
<p>Das Finanzamt schickt den ${T('Steuerbescheid', 'quyết định thuế')}: Erstattung oder Nachzahlung. Ist er falsch, kann man innerhalb von <b>1 Monat</b> schriftlich ${T('Einspruch', 'khiếu nại')} einlegen.</p>
<h3 class="sub">5. Wofür zahlt der Staat Steuern aus?</h3>
<p>Steuern sind Abgaben <b>ohne direkte Gegenleistung</b> (anders als Gebühren oder Beiträge). Sie finanzieren Schulen, Straßen, Polizei, Sozialleistungen. Direkte Steuern (Einkommensteuer) zahlt der Steuerpflichtige selbst, indirekte Steuern (Umsatzsteuer) werden über den Preis weitergegeben.</p>
<p>→ Thuế không có đối ứng trực tiếp. Thuế trực thu (thuế thu nhập) do người nộp tự chịu; thuế gián thu (VAT) nằm trong giá hàng.</p>
<div class="hint">⚠️ HỌC THUỘC: Pflicht bei VI / III-V / >410 € · freiwillig 4 Jahre rückwirkend · Pauschbetrag 1.230 € · Einspruch 1 Monat.</div>`;

  C.rente = `<h2>Altersvorsorge · 3-Säulen-Modell</h2>
<div class="hint">WK Grundstufe · Die gesetzliche Rente allein reicht meist nicht – deshalb gibt es drei Säulen.</div>
<h3 class="sub">1. Die drei Säulen</h3>
<table><tr><th>Säule</th><th>Beispiele</th><th>Wer zahlt?</th></tr>
<tr><td><b>1. Gesetzliche Rentenversicherung</b></td><td>Altersrente, Erwerbsminderungsrente, Hinterbliebenenrente</td><td>Pflicht · 18,6 % vom Brutto, je <b>9,3 %</b> Arbeitnehmer und Arbeitgeber</td></tr>
<tr><td><b>2. Betriebliche Altersvorsorge</b> (bAV)</td><td>Direktversicherung, Pensionskasse; ${T('Entgeltumwandlung', 'trích một phần lương để tích lũy hưu')}</td><td>Arbeitnehmer hat Anspruch auf Entgeltumwandlung; Arbeitgeber gibt mind. 15 % Zuschuss</td></tr>
<tr><td><b>3. Private Vorsorge</b></td><td>${T('Riester-Rente', 'quỹ hưu Riester (nhà nước trợ cấp)')}, private Rentenversicherung, Fondssparplan, Immobilie</td><td>Freiwillig · Riester: staatliche Zulagen</td></tr></table>
<p>→ Trụ 1: bảo hiểm hưu trí bắt buộc (18,6 %, chia đôi). Trụ 2: hưu trí qua công ty. Trụ 3: tự tiết kiệm (Riester, bảo hiểm tư, quỹ, nhà).</p>
<h3 class="sub">2. Warum reicht die gesetzliche Rente nicht?</h3>
<p>Das ${T('Rentenniveau', 'mức lương hưu so với lương trung bình')} liegt bei etwa <b>48 %</b> des Durchschnittslohns. Gründe: ${T('demografischer Wandel', 'thay đổi cơ cấu dân số')} – weniger Beitragszahler, mehr Rentner, längere Lebenserwartung. Die Lücke heißt ${T('Versorgungslücke', 'khoảng thiếu hụt thu nhập khi về hưu')}.</p>
<p>→ Lương hưu nhà nước chỉ khoảng 48 % lương trung bình vì ít người đóng, nhiều người hưởng, tuổi thọ tăng. Phần thiếu gọi là Versorgungslücke.</p>
<h3 class="sub">3. Wichtige Begriffe</h3>
<ul>
<li><b>Regelaltersgrenze:</b> steigt schrittweise auf <b>67 Jahre</b> (für Jahrgänge ab 1964).</li>
<li><b>Umlageverfahren:</b> Die heutigen Beiträge werden sofort an die heutigen Rentner ausgezahlt (kein Sparkonto).</li>
<li><b>Riester-Zulage:</b> Grundzulage 175 € pro Jahr, Kinderzulage bis 300 €; Berufseinsteiger unter 25 einmalig 200 € Bonus.</li>
<li>Für Azubis lohnt sich früher Beginn: ${T('Zinseszins', 'lãi kép')} – kleine Beträge über viele Jahre wachsen stark.</li>
</ul>
<div class="hint">⚠️ HỌC THUỘC: 3 Säulen = gesetzlich · betrieblich · privat · RV 18,6 % (9,3/9,3) · Umlageverfahren · Rente mit 67.</div>`;

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
<li><b>${T('Versicherungspflicht', 'nghĩa vụ tham gia bảo hiểm')}:</b> Arbeitnehmer müssen Mitglied sein (Ausnahme KV: über der Versicherungspflichtgrenze kann man privat versichert sein).</li>
<li><b>${T('Generationenvertrag', 'hợp đồng giữa các thế hệ')}:</b> Die arbeitende Generation finanziert die Renten der älteren Generation und erwartet dasselbe später von der nächsten (Umlageverfahren).</li>
<li><b>${T('Subsidiaritätsprinzip', 'nguyên tắc bổ trợ')}:</b> Zuerst hilft man sich selbst bzw. die Familie; der Staat hilft erst, wenn das nicht reicht (z. B. Bürgergeld).</li>
<li><b>${T('Selbstverwaltung', 'tự quản')}:</b> Die Versicherungsträger werden von Vertretern der Arbeitgeber und Versicherten geleitet (Sozialwahl).</li>
</ul>
<p>→ Tương trợ: đóng theo thu nhập, hưởng theo nhu cầu. Người khỏe trả cho người ốm, người trẻ trả cho người già. Generationenvertrag: thế hệ đang đi làm trả lương hưu cho thế hệ trước. Subsidiarität: tự lo trước, nhà nước giúp sau.</p>
<h3 class="sub">3. Gegensatz: Äquivalenzprinzip</h3>
<p>In der <b>privaten</b> Versicherung richtet sich der Beitrag nach dem <b>Risiko</b> (Alter, Gesundheit), nicht nach dem Einkommen. Das heißt ${T('Äquivalenzprinzip', 'nguyên tắc tương đương (phí theo rủi ro)')}.</p>
<h3 class="sub">4. Probleme</h3>
<p>Der demografische Wandel belastet vor allem RV und PV: Immer weniger Beitragszahler finanzieren immer mehr Leistungsempfänger → steigende Beiträge oder sinkende Leistungen.</p>
<div class="hint">⚠️ HỌC THUỘC: Solidarität = Beitrag nach Einkommen, Leistung nach Bedarf · UV zahlt nur der AG · Generationenvertrag = Umlage · privat = Äquivalenzprinzip.</div>`;

  C.kauf = `<h2>Kaufvertrag vertieft · Störungen</h2>
<div class="hint">WK Fachstufe I · § 433 BGB · Zustandekommen, Kaufarten, Mängel, Verzug.</div>
<h3 class="sub">1. Zustandekommen: Antrag + Annahme</h3>
<p>Ein Kaufvertrag entsteht durch zwei übereinstimmende ${T('Willenserklärungen', 'tuyên bố ý chí')}: ${T('Antrag', 'đề nghị (giao kết)')} (Angebot) und ${T('Annahme', 'chấp nhận')}. Wer zuerst erklärt, ist egal (Verkäufer bietet an oder Käufer bestellt).</p>
<ul>
<li><b>Kein Angebot</b> ist die ${T('Anpreisung', 'quảng cáo / lời mời chào')}: Schaufenster, Katalog, Werbung, Speisekarte im Aushang, Onlineshop = Aufforderung, ein Angebot abzugeben.</li>
<li><b>Bindung:</b> unter Anwesenden/am Telefon nur <b>sofort</b>; unter Abwesenden (Brief, E-Mail) so lange, wie man unter normalen Umständen eine Antwort erwarten kann.</li>
<li>${T('Freizeichnungsklauseln', 'điều khoản miễn ràng buộc')}: „freibleibend", „unverbindlich", „solange Vorrat reicht" → Angebot ganz oder teilweise unverbindlich.</li>
<li>Verspätete oder veränderte Annahme = <b>neuer Antrag</b>.</li>
</ul>
<p>→ Tủ kính, catalô, quảng cáo chỉ là lời mời chào, chưa phải đề nghị. Đề nghị qua lời nói chỉ ràng buộc ngay lúc đó. Chấp nhận trễ hoặc sửa đổi = đề nghị mới.</p>
<h3 class="sub">2. Pflichten & Abstraktionsprinzip</h3>
<table><tr><th>Verkäufer</th><th>Käufer</th></tr>
<tr><td>Sache mangelfrei übergeben, Eigentum verschaffen</td><td>Kaufpreis zahlen, Sache annehmen (abnehmen)</td></tr></table>
<p>${T('Verpflichtungsgeschäft', 'giao dịch phát sinh nghĩa vụ')} (Kaufvertrag) und ${T('Erfüllungsgeschäft', 'giao dịch thực hiện')} (Übergabe + Einigung über Eigentum, Zahlung) sind rechtlich getrennt. Beim Kauf im Laden fallen beide zeitlich zusammen.</p>
<h3 class="sub">3. Kaufarten</h3>
<ul>
<li>Nach Beteiligten: <b>Verbrauchsgüterkauf</b> (Unternehmer → Verbraucher, stärkster Schutz) · <b>bürgerlicher Kauf</b> (privat ↔ privat) · <b>zweiseitiger Handelskauf</b> (Kaufmann ↔ Kaufmann).</li>
<li>Nach Zahlung: Barkauf · ${T('Zielkauf', 'mua trả chậm (có hạn thanh toán)')} (z. B. „zahlbar in 30 Tagen") · Ratenkauf.</li>
<li>Nach Lieferzeit: Sofortkauf · Terminkauf · ${T('Fixkauf', 'mua có thời hạn giao cố định')} (Liefertermin ist wesentlich, z. B. Hochzeitstorte).</li>
<li>Sonstige: Kauf auf Probe · Kauf nach Probe · Kauf zur Probe · Stückkauf vs. Gattungskauf.</li>
</ul>
<p>${T('Eigentumsvorbehalt', 'bảo lưu quyền sở hữu')}: Der Verkäufer bleibt Eigentümer, bis der Kaufpreis vollständig bezahlt ist. Der Käufer ist nur ${T('Besitzer', 'người chiếm hữu')}.</p>
<h3 class="sub">4. Mangelhafte Lieferung (Schlechtleistung)</h3>
<p><b>Mangelarten:</b> Qualitätsmangel (beschädigt, verdorben) · Quantitätsmangel (zu wenig) · Falschlieferung (Art) · fehlerhafte Montage/Anleitung · Werbeversprechen nicht erfüllt · ${T('Rechtsmangel', 'khuyết tật pháp lý')} (Sache gehört einem Dritten).</p>
<p><b>Erkennbarkeit:</b> offener Mangel · versteckter Mangel · arglistig verschwiegener Mangel.</p>
<p><b>Rügefrist:</b> Verbraucher: Gewährleistung <b>2 Jahre</b> ab Übergabe. Zweiseitiger Handelskauf: <b>unverzüglich</b> prüfen und rügen (§ 377 HGB), versteckte Mängel unverzüglich nach Entdeckung.</p>
<p><b>Rechte des Käufers:</b></p>
<ol><li><b>Vorrangig:</b> ${T('Nacherfüllung', 'yêu cầu khắc phục')} – nach Wahl des Käufers Nachbesserung (Reparatur) oder Ersatzlieferung.</li>
<li><b>Nachrangig</b> (wenn Nacherfüllung fehlschlägt, verweigert wird oder Frist abläuft): ${T('Rücktritt', 'hủy hợp đồng')} (nicht bei geringfügigem Mangel) oder ${T('Minderung', 'giảm giá')} – zusätzlich ${T('Schadensersatz', 'bồi thường thiệt hại')} bei Verschulden.</li></ol>
<h3 class="sub">5. Lieferungsverzug (Nicht-rechtzeitig-Lieferung)</h3>
<p>Voraussetzungen: Lieferung <b>fällig</b> + <b>Mahnung</b> (nicht nötig, wenn der Termin kalendermäßig bestimmt ist, z. B. „Lieferung am 15.11.", oder beim Fixkauf) + für Schadensersatz <b>Verschulden</b> des Verkäufers.</p>
<p>Rechte: Lieferung verlangen (+ Verzugsschaden) · nach angemessener ${T('Nachfrist', 'thời hạn gia hạn')} Rücktritt und/oder Schadensersatz statt der Leistung. Beim Fixkauf Rücktritt ohne Nachfrist.</p>
<h3 class="sub">6. Zahlungsverzug & Annahmeverzug</h3>
<p>${T('Zahlungsverzug', 'chậm thanh toán')}: spätestens <b>30 Tage</b> nach Fälligkeit und Zugang der Rechnung (beim Verbraucher nur, wenn auf der Rechnung darauf hingewiesen wurde). Verzugszinsen: Verbraucher <b>Basiszins + 5 Prozentpunkte</b>, Unternehmen <b>+ 9 Prozentpunkte</b>.</p>
<p>${T('Annahmeverzug', 'chậm nhận hàng')}: Der Käufer nimmt die ordnungsgemäß angebotene Ware nicht an → Verkäufer kann die Ware einlagern (auf Kosten des Käufers) und auf Abnahme klagen oder einen ${T('Selbsthilfeverkauf', 'tự bán hàng để bù đắp')} durchführen.</p>
<div class="hint">⚠️ HỌC THUỘC: Schaufenster = kein Angebot · erst Nacherfüllung, dann Rücktritt/Minderung · Verzug = fällig + Mahnung (+ Verschulden) · Zahlungsverzug 30 Tage.</div>`;

  C.verbraucher = `<h2>Verbraucherschutz</h2>
<div class="hint">WK Fachstufe I · Der Verbraucher ist gegenüber Unternehmen meist schwächer – das Gesetz gleicht das aus.</div>
<h3 class="sub">1. Widerrufsrecht (14 Tage)</h3>
<p>Bei ${T('Fernabsatzverträgen', 'hợp đồng từ xa (online, điện thoại)')} (Internet, Telefon, Katalog) und Verträgen <b>außerhalb von Geschäftsräumen</b> (Haustür, Kaffeefahrt) kann der Verbraucher innerhalb von <b>14 Tagen ohne Begründung</b> widerrufen. Die Frist beginnt mit Erhalt der Ware und einer korrekten Belehrung; ohne Belehrung verlängert sie sich auf max. 12 Monate + 14 Tage.</p>
<p><b>Ausnahmen:</b> verderbliche Lebensmittel, nach Kundenwunsch angefertigte Waren, entsiegelte Hygieneartikel, geöffnete Software/CDs, Zeitungen, Reise-/Restaurantbuchungen zu einem festen Termin.</p>
<p><b>Wichtig:</b> Beim Kauf im Laden gibt es <b>kein</b> gesetzliches Widerrufsrecht. Umtausch ist dort ${T('Kulanz', 'thiện chí (không bắt buộc)')} des Händlers.</p>
<p>→ Mua online/qua điện thoại/tại nhà: được rút lại trong 14 ngày không cần lý do. Mua tại cửa hàng: không có quyền này, đổi hàng chỉ do cửa hàng thiện chí.</p>
<h3 class="sub">2. Gewährleistung vs. Garantie</h3>
<table><tr><th></th><th>Gewährleistung (Mängelhaftung)</th><th>Garantie</th></tr>
<tr><td>Grundlage</td><td>Gesetz (BGB), Pflicht</td><td>freiwillig (Vertrag)</td></tr>
<tr><td>Wer haftet?</td><td>Verkäufer</td><td>meist Hersteller</td></tr>
<tr><td>Dauer</td><td>2 Jahre (gebraucht: mind. 1 Jahr)</td><td>wie zugesagt</td></tr>
<tr><td>Beweislast</td><td>1. Jahr: es wird vermutet, dass der Mangel schon bei Übergabe da war (${T('Beweislastumkehr', 'đảo ngược nghĩa vụ chứng minh')})</td><td>nach Garantiebedingungen</td></tr></table>
<h3 class="sub">3. AGB – Allgemeine Geschäftsbedingungen</h3>
<p>${T('AGB', 'điều kiện kinh doanh chung')} sind vorformulierte Vertragsbedingungen („Kleingedrucktes"). Sie gelten nur, wenn deutlich darauf hingewiesen wurde. <b>Unwirksam</b> sind ${T('überraschende Klauseln', 'điều khoản bất ngờ')} und Klauseln, die den Kunden unangemessen benachteiligen (z. B. Ausschluss der Gewährleistung beim Verbrauchsgüterkauf). ${T('Individualabreden', 'thỏa thuận riêng')} haben Vorrang vor AGB.</p>
<h3 class="sub">4. Weitere Schutzregeln</h3>
<ul>
<li><b>Button-Lösung:</b> Online-Bestellbutton muss eindeutig sein, z. B. „zahlungspflichtig bestellen".</li>
<li><b>Kündigungsbutton:</b> Online abgeschlossene Abos müssen online kündbar sein. Laufzeitverträge: max. 2 Jahre Erstlaufzeit, danach monatlich kündbar.</li>
<li><b>Preisangabenverordnung:</b> Endpreise inkl. MwSt.; Grundpreis (z. B. je kg/Liter). In der Gastronomie: Preise inkl. Bedienung und MwSt. (Inklusivpreise).</li>
<li><b>Produkthaftungsgesetz:</b> Der Hersteller haftet für Schäden durch fehlerhafte Produkte – auch ohne Verschulden.</li>
<li><b>Lebensmittelrecht (LMIV):</b> Kennzeichnung der 14 Hauptallergene, Zutaten, MHD.</li>
</ul>
<h3 class="sub">5. Hilfe für Verbraucher</h3>
<p>${T('Verbraucherzentrale', 'trung tâm bảo vệ người tiêu dùng')} (Beratung, Abmahnungen, Musterbriefe) · Stiftung Warentest (Produkttests) · Schlichtungsstellen · Schuldnerberatung.</p>
<div class="hint">⚠️ HỌC THUỘC: Widerruf 14 Tage nur Fernabsatz/Haustür · Gewährleistung 2 Jahre = Pflicht des Verkäufers · Garantie = freiwillig · Individualabrede vor AGB.</div>`;

  C.geld = `<h2>Geld & Zahlungsverkehr</h2>
<div class="hint">WK Fachstufe I · Funktionen des Geldes, Geldarten und bargeldlose Zahlung.</div>
<h3 class="sub">1. Funktionen des Geldes</h3>
<table><tr><th>Funktion</th><th>Bedeutung</th></tr>
<tr><td>${T('Tauschmittel', 'phương tiện trao đổi')} / Zahlungsmittel</td><td>Man kann damit Waren und Dienstleistungen kaufen (kein direkter Tausch Ware gegen Ware nötig).</td></tr>
<tr><td>${T('Wertaufbewahrungsmittel', 'phương tiện cất giữ giá trị')}</td><td>Man kann Geld sparen und später ausgeben. Inflation mindert diese Funktion.</td></tr>
<tr><td>${T('Wertmaßstab', 'thước đo giá trị')} / Recheneinheit</td><td>Preise machen Güter vergleichbar.</td></tr>
<tr><td>Wertübertragungsmittel</td><td>Schenken, Vererben, Kredite.</td></tr></table>
<p>→ Tiền dùng để trao đổi, cất giữ giá trị, đo giá trị (so sánh giá) và chuyển giao giá trị.</p>
<h3 class="sub">2. Geldarten</h3>
<ul>
<li>${T('Bargeld', 'tiền mặt')}: Münzen und Banknoten – Euro-Banknoten sind das einzige unbeschränkte gesetzliche Zahlungsmittel.</li>
<li>${T('Buchgeld', 'tiền ghi sổ / tiền trong tài khoản')} (Giralgeld): Guthaben auf dem Girokonto.</li>
<li>E-Geld: z. B. Guthaben bei PayPal oder auf Prepaid-Karten.</li>
</ul>
<p>Die <b>EZB</b> (Europäische Zentralbank) sorgt für ${T('Preisniveaustabilität', 'ổn định mức giá')}: Ziel ca. <b>2 % Inflation</b> pro Jahr. Steigt das Preisniveau, sinkt die ${T('Kaufkraft', 'sức mua')} des Geldes.</p>
<h3 class="sub">3. Bargeldloser Zahlungsverkehr</h3>
<table><tr><th>Instrument</th><th>Merkmal</th></tr>
<tr><td>${T('Überweisung', 'chuyển khoản')}</td><td>Zahler beauftragt seine Bank; IBAN des Empfängers nötig. Echtzeitüberweisung in Sekunden.</td></tr>
<tr><td>${T('Dauerauftrag', 'lệnh chuyển khoản định kỳ')}</td><td>Gleicher Betrag, gleicher Empfänger, regelmäßig (Miete).</td></tr>
<tr><td>${T('Lastschrift', 'ghi nợ trực tiếp (người nhận rút tiền)')} (SEPA)</td><td>Der <b>Empfänger</b> zieht den Betrag ein, wechselnde Beträge (Strom, Handy). Mit Mandat: Rückgabe innerhalb von <b>8 Wochen</b> ohne Begründung.</td></tr>
<tr><td>Girocard / Debitkarte</td><td>Betrag wird sofort vom Konto abgebucht, PIN oder kontaktlos.</td></tr>
<tr><td>${T('Kreditkarte', 'thẻ tín dụng')}</td><td>Umsätze werden gesammelt und später abgerechnet → kurzfristiger Kredit; Gebühren und hohe Zinsen bei Teilzahlung.</td></tr>
<tr><td>Mobiles Bezahlen</td><td>Smartphone/Smartwatch (Apple Pay, Google Pay) – technisch meist Debit- oder Kreditkarte.</td></tr></table>
<p><b>Girokonto:</b> Grundlage für Gehaltseingang. Jeder hat Anspruch auf ein ${T('Basiskonto', 'tài khoản cơ bản')} (auch ohne festen Wohnsitz, auch bei schlechter SCHUFA). ${T('Dispositionskredit', 'hạn mức thấu chi')}: Konto darf bis zu einer Grenze überzogen werden – sehr teuer.</p>
<p>→ Chuyển khoản: người trả chủ động. Lastschrift: người nhận rút tiền, có thể đòi lại trong 8 tuần. Thẻ ghi nợ trừ tiền ngay; thẻ tín dụng trả sau.</p>
<div class="hint">⚠️ HỌC THUỘC: Funktionen = Tausch · Wertaufbewahrung · Wertmaßstab · Lastschrift 8 Wochen zurück · EZB-Ziel 2 %.</div>`;

  C.kredit = `<h2>Kredit & Kreditsicherheiten</h2>
<div class="hint">WK Fachstufe I · Kredit = Geld auf Zeit gegen Zinsen. Vorher prüfen: Brauche ich das wirklich? Kann ich die Raten sicher zahlen?</div>
<h3 class="sub">1. Kreditarten für Verbraucher</h3>
<table><tr><th>Kreditart</th><th>Merkmal</th></tr>
<tr><td>${T('Dispositionskredit', 'hạn mức thấu chi')} („Dispo")</td><td>Überziehung des Girokontos bis zu einem Rahmen; flexibel, aber sehr hohe Zinsen (oft 10–15 %).</td></tr>
<tr><td>${T('Ratenkredit', 'vay trả góp')} (Konsumentenkredit)</td><td>Fester Betrag, feste monatliche Raten, feste Laufzeit (Auto, Möbel).</td></tr>
<tr><td>Null-Prozent-Finanzierung</td><td>Händler + Bank; oft Kosten versteckt (Restschuldversicherung, höherer Preis).</td></tr>
<tr><td>Baufinanzierung (Hypothekendarlehen)</td><td>Große Beträge, lange Laufzeit, gesichert durch Grundschuld.</td></tr>
<tr><td>Leasing</td><td>„Mieten" statt kaufen; Leasinggeber bleibt Eigentümer.</td></tr></table>
<h3 class="sub">2. Zinsen vergleichen</h3>
<p>${T('Sollzins', 'lãi suất danh nghĩa')} = reiner Zins. ${T('Effektiver Jahreszins', 'lãi suất thực tế hàng năm')} = Zins <b>plus alle Kosten</b> (Gebühren) pro Jahr → nur dieser Wert eignet sich zum Vergleich von Angeboten.</p>
<p><b>Zinsformel (kaufmännisch):</b> Zinsen = Kapital × Zinssatz × Tage ÷ (100 × 360)</p>
<p>Beispiel: 2.400 € Dispo, 12 %, 90 Tage → 2.400 × 12 × 90 ÷ 36.000 = <b>72 €</b> Zinsen.</p>
<h3 class="sub">3. Kreditwürdigkeit (Bonität)</h3>
<p>Die Bank prüft, ob der Kunde zahlen kann und will: Einkommen, feste Ausgaben, Arbeitsverhältnis, vorhandene Schulden. Auskunft gibt die ${T('SCHUFA', 'cơ quan dữ liệu tín dụng')} (Schutzgemeinschaft für allgemeine Kreditsicherung): Sie speichert Konten, Kredite, Handyverträge und Zahlungsausfälle. Jeder hat 1× pro Jahr Anspruch auf eine <b>kostenlose Selbstauskunft</b>.</p>
<h3 class="sub">4. Verbraucherdarlehensvertrag</h3>
<ul><li><b>Schriftform</b> mit Pflichtangaben (Nettodarlehensbetrag, effektiver Jahreszins, Laufzeit, Raten).</li>
<li><b>Widerrufsrecht 14 Tage</b>.</li>
<li>Vorzeitige Rückzahlung ist jederzeit möglich (ggf. Vorfälligkeitsentschädigung).</li></ul>
<h3 class="sub">5. Kreditsicherheiten</h3>
<table><tr><th>Personalsicherheit</th><th>Realsicherheiten (Sachen/Rechte)</th></tr>
<tr><td>${T('Bürgschaft', 'bảo lãnh')}: eine weitere Person haftet für die Schuld.</td>
<td>${T('Sicherungsübereignung', 'chuyển quyền sở hữu để bảo đảm')} (Auto: Bank wird Eigentümer, Kunde bleibt Besitzer und nutzt es) · ${T('Pfandrecht', 'quyền cầm cố')} (Schmuck, Wertpapiere – Bank wird Besitzer) · ${T('Grundschuld', 'thế chấp bất động sản')} (Immobilie, Eintrag im Grundbuch) · Abtretung von Lohnansprüchen · Eigentumsvorbehalt (beim Ratenkauf)</td></tr></table>
<p>→ Sicherungsübereignung: ngân hàng là chủ sở hữu, người vay vẫn dùng xe. Pfand: ngân hàng giữ vật. Grundschuld: thế chấp nhà đất.</p>
<div class="hint">⚠️ HỌC THUỘC: Vergleich nur über effektiven Jahreszins · Z = K·p·t / (100·360) · Dispo am teuersten · Sicherungsübereignung = Bank Eigentümer, Kunde Besitzer.</div>`;

  C.buerg = `<h2>Bürgschaft</h2>
<div class="hint">WK Fachstufe I · §§ 765 ff. BGB · Ein Dritter verspricht dem Gläubiger, für die Schuld eines anderen einzustehen.</div>
<h3 class="sub">1. Beteiligte</h3>
<p>${T('Gläubiger', 'chủ nợ')} (z. B. Bank) – ${T('Hauptschuldner', 'người nợ chính')} (Kreditnehmer) – ${T('Bürge', 'người bảo lãnh')} (z. B. Eltern). Der Bürge schließt den Bürgschaftsvertrag mit dem <b>Gläubiger</b>.</p>
<p>→ Người bảo lãnh ký hợp đồng với chủ nợ (ngân hàng), cam kết trả nợ thay nếu người vay không trả.</p>
<h3 class="sub">2. Form</h3>
<p>Die Bürgschaftserklärung muss <b>schriftlich</b> (eigenhändig unterschrieben) erfolgen – E-Mail reicht nicht. Ausnahme: Für Kaufleute im Rahmen ihres Handelsgeschäfts genügt die mündliche Form (§ 350 HGB).</p>
<h3 class="sub">3. Arten</h3>
<table><tr><th>Ausfallbürgschaft</th><th>Selbstschuldnerische Bürgschaft</th></tr>
<tr><td>Der Bürge hat die ${T('Einrede der Vorausklage', 'quyền yêu cầu chủ nợ kiện con nợ trước')}: Der Gläubiger muss erst erfolglos gegen den Hauptschuldner vollstrecken (Zwangsvollstreckung), bevor er den Bürgen in Anspruch nimmt.</td>
<td>Der Bürge <b>verzichtet</b> auf die Einrede der Vorausklage. Er haftet <b>sofort wie der Hauptschuldner</b>, sobald dieser nicht zahlt. Banken verlangen fast immer diese Form; bei Kaufleuten ist sie die Regel.</td></tr></table>
<p>Weitere: ${T('Höchstbetragsbürgschaft', 'bảo lãnh có giới hạn số tiền')} (Haftung nur bis zu einer festen Summe) · Zeitbürgschaft (befristet) · Mietbürgschaft.</p>
<h3 class="sub">4. Rechte und Risiken des Bürgen</h3>
<ul>
<li>Zahlt der Bürge, geht die Forderung auf ihn über → ${T('Rückgriff', 'quyền đòi lại (truy đòi)')} gegen den Hauptschuldner (oft wertlos, weil dieser ja zahlungsunfähig ist).</li>
<li>Der Bürge haftet mit seinem <b>ganzen Vermögen</b> – Bürgschaft kann selbst in die Überschuldung führen.</li>
<li>Sittenwidrig und damit nichtig kann eine Bürgschaft sein, wenn ein naher Angehöriger mit sehr geringem Einkommen krass finanziell überfordert wird.</li>
</ul>
<p>→ Tip: Chỉ bảo lãnh khi thật sự tin tưởng và đủ khả năng tự trả toàn bộ khoản nợ.</p>
<div class="hint">⚠️ HỌC THUỘC: Schriftform · Ausfallbürgschaft = Einrede der Vorausklage · selbstschuldnerisch = sofort haften · Bürge → Rückgriff auf Hauptschuldner.</div>`;

  C.schulden = `<h2>Überschuldung & Verbraucherinsolvenz</h2>
<div class="hint">WK Fachstufe I · Verschuldung ist normal (Kredit). Überschuldung heißt: Die Einnahmen reichen dauerhaft nicht mehr für Lebenshaltung + Raten.</div>
<h3 class="sub">1. Ursachen</h3>
<p>Arbeitslosigkeit · Trennung/Scheidung · Krankheit · gescheiterte Selbstständigkeit · unwirtschaftliche Haushaltsführung (Konsum, Handyverträge, Online-Shopping mit „Buy now, pay later") · fehlende Finanzkenntnisse · Bürgschaft.</p>
<p>→ Nguyên nhân chính: mất việc, ly hôn, bệnh, kinh doanh thất bại, tiêu xài quá mức, thiếu hiểu biết tài chính.</p>
<h3 class="sub">2. Vorbeugen</h3>
<p>${T('Haushaltsplan', 'kế hoạch ngân sách gia đình')} führen (Einnahmen – feste Ausgaben – variable Ausgaben), Rücklagen bilden (ca. 3 Netto-Monatsgehälter), Dispo nicht dauerhaft nutzen, Verträge prüfen, früh zur Schuldnerberatung.</p>
<h3 class="sub">3. Vom Zahlungsverzug zur Pfändung</h3>
<ol>
<li><b>Mahnung</b> durch den Gläubiger (außergerichtlich), ggf. Inkassobüro.</li>
<li><b>Gerichtliches Mahnverfahren:</b> ${T('Mahnbescheid', 'lệnh nhắc nợ của tòa')} → Schuldner kann innerhalb von <b>2 Wochen Widerspruch</b> einlegen. Ohne Widerspruch: ${T('Vollstreckungsbescheid', 'lệnh cưỡng chế thi hành')} → <b>2 Wochen Einspruch</b>. Danach ist er ein ${T('Vollstreckungstitel', 'chứng thư thi hành')}.</li>
<li><b>Zwangsvollstreckung:</b> ${T('Gerichtsvollzieher', 'nhân viên thi hành án')} pfändet Sachen (nicht: lebensnotwendige Dinge wie Bett, Kühlschrank, Arbeitsmittel) oder Lohn/Konto (${T('Lohnpfändung', 'khấu trừ lương để trả nợ')}). Vermögensauskunft unter Eid.</li>
</ol>
<p>Ein ${T('Pfändungsschutzkonto', 'tài khoản được bảo vệ khỏi bị tịch thu')} (P-Konto) schützt einen monatlichen Grundfreibetrag (rund 1.550 € pro Monat, wird jedes Jahr zum 1. Juli angepasst und erhöht sich bei Unterhaltspflichten). Jedes Girokonto kann kostenlos in ein P-Konto umgewandelt werden.</p>
<h3 class="sub">4. Verbraucherinsolvenzverfahren</h3>
<ol>
<li>Außergerichtlicher Einigungsversuch mit allen Gläubigern (mit Schuldnerberatungsstelle).</li>
<li>Antrag beim Insolvenzgericht (Amtsgericht).</li>
<li>${T('Wohlverhaltensphase', 'giai đoạn hành xử tốt')} – <b>3 Jahre</b>: pfändbares Einkommen geht an einen Treuhänder, Schuldner muss arbeiten bzw. sich um Arbeit bemühen.</li>
<li>${T('Restschuldbefreiung', 'được xóa phần nợ còn lại')}: übrige Schulden werden erlassen (nicht: Geldstrafen, Schulden aus vorsätzlichen Straftaten, Unterhaltsrückstände bei Pflichtverletzung).</li>
</ol>
<p><b>Verjährung:</b> Regelmäßige Verjährungsfrist <b>3 Jahre</b>, beginnt am Ende des Jahres, in dem die Forderung entstanden ist. Titulierte Forderungen verjähren erst nach 30 Jahren.</p>
<p>→ Nợ thông thường hết hiệu lực đòi sau 3 năm (tính từ cuối năm phát sinh). Có lệnh tòa: 30 năm. Phá sản cá nhân: 3 năm hành xử tốt, sau đó được xóa nợ.</p>
<div class="hint">⚠️ HỌC THUỘC: Mahnbescheid → 2 Wochen Widerspruch · Vollstreckungsbescheid → 2 Wochen Einspruch · P-Konto · Insolvenz: 3 Jahre → Restschuldbefreiung · Verjährung 3 Jahre.</div>`;

  window.WIKO_EXTRA_GROUPS = [
    {
      id: 'wk-grundstufe-plus',
      badge: 'WK Grundstufe',
      title: 'WK Grundstufe · Steuererklärung, Altersvorsorge & Solidaritätsprinzip',
      items: [
        { id: 'wk-steuererklaerung', icon: IC_DOC, name: 'Einkommensteuererklärung', desc: 'Pflicht vs. freiwillig · Werbungskosten · Steuerbescheid & Einspruch', content: C.steuer },
        { id: 'wk-altersvorsorge', icon: IC_EURO, name: 'Altersvorsorge · 3-Säulen-Modell', desc: 'Gesetzliche Rente · Betriebsrente · Riester & private Vorsorge', content: C.rente },
        { id: 'wk-solidaritaet', icon: IC_USERS, name: 'Sozialversicherung · Solidaritätsprinzip', desc: 'Solidarität · Generationenvertrag · Versicherungspflicht · Subsidiarität', content: C.soli },
      ],
    },
    {
      id: 'wk-fachstufe1',
      badge: 'WK Fachstufe I',
      title: 'WK Fachstufe I · Kaufvertrag, Verbraucher, Geld & Kredit',
      items: [
        { id: 'wk-kaufvertrag', icon: IC_DOC, name: 'Kaufvertrag vertieft · Störungen', desc: 'Angebot/Anpreisung · Kaufarten · Mängel · Verzug · Eigentumsvorbehalt', content: C.kauf },
        { id: 'wk-verbraucherschutz', icon: IC_SHIELD, name: 'Verbraucherschutz', desc: 'Widerrufsrecht · Gewährleistung vs. Garantie · AGB · Verbraucherzentrale', content: C.verbraucher },
        { id: 'wk-geld', icon: IC_EURO, name: 'Geld & Zahlungsverkehr', desc: 'Funktionen des Geldes · Geldarten · Überweisung · Lastschrift · Karten', content: C.geld },
        { id: 'wk-kredit', icon: IC_BOOK, name: 'Kredit & Kreditsicherheiten', desc: 'Kreditarten · Effektivzins · SCHUFA · Zinsrechnung · Sicherheiten', content: C.kredit },
        { id: 'wk-buergschaft', icon: IC_USERS, name: 'Bürgschaft', desc: 'Ausfall- vs. selbstschuldnerische Bürgschaft · Schriftform · Risiken', content: C.buerg },
        { id: 'wk-ueberschuldung', icon: IC_ALERT, name: 'Überschuldung & Verbraucherinsolvenz', desc: 'Ursachen · Mahnverfahren · Pfändung · P-Konto · Restschuldbefreiung', content: C.schulden },
      ],
    },
  ];

  const Q = (theme, q, opts, a, ex) => ({ theme, cat: 'WK', q, opts, a, ex });

  window.WIKO_EXTRA_QUIZ = [
    // Steuererklärung
    Q('wk-steuererklaerung', 'Wann ist ein Arbeitnehmer verpflichtet, eine Einkommensteuererklärung abzugeben?', ['Immer, wenn er Lohnsteuer zahlt', 'Wenn er gleichzeitig bei zwei Arbeitgebern arbeitet (Steuerklasse VI)', 'Nur wenn er Kinder hat', 'Nur bei einem Einkommen über 50.000 €'], 1, 'Steuerklasse VI (Zweitjob), III/V oder Lohnersatzleistungen über 410 € → Pflicht. Bậc VI là bắt buộc khai.'),
    Q('wk-steuererklaerung', 'Wie viele Jahre rückwirkend kann ein Azubi freiwillig eine Steuererklärung abgeben?', ['1 Jahr', '2 Jahre', '4 Jahre', '10 Jahre'], 2, 'Antragsveranlagung: bis zu 4 Jahre rückwirkend. Khai tự nguyện lùi tối đa 4 năm.'),
    Q('wk-steuererklaerung', 'Welche Ausgabe zählt zu den Werbungskosten?', ['Miete der Privatwohnung', 'Fahrtkosten zur Ausbildungsstätte', 'Urlaubsreise', 'Kfz-Steuer des Privatautos'], 1, 'Werbungskosten = Kosten für den Beruf: Fahrtkosten (Entfernungspauschale), Arbeitskleidung, Fachbücher.'),
    Q('wk-steuererklaerung', 'Wie hoch ist der Arbeitnehmer-Pauschbetrag, der ohne Nachweis abgezogen wird?', ['410 €', '1.000 €', '1.230 €', '2.400 €'], 2, 'Seit 2023: 1.230 € pro Jahr.'),
    Q('wk-steuererklaerung', 'Innerhalb welcher Frist kann man gegen einen falschen Steuerbescheid Einspruch einlegen?', ['2 Wochen', '1 Monat', '3 Monate', '1 Jahr'], 1, 'Einspruch: 1 Monat nach Bekanntgabe, schriftlich oder über ELSTER.'),
    Q('wk-steuererklaerung', 'Was unterscheidet Steuern von Gebühren?', ['Steuern sind freiwillig', 'Steuern werden ohne direkte Gegenleistung erhoben', 'Steuern zahlen nur Unternehmen', 'Gebühren zahlt man an die Krankenkasse'], 1, 'Steuer = keine direkte Gegenleistung. Gebühr = Entgelt für eine konkrete Leistung (z. B. Reisepass).'),
    // Altersvorsorge
    Q('wk-altersvorsorge', 'Welche drei Säulen hat die Altersvorsorge in Deutschland?', ['Kranken-, Pflege-, Rentenversicherung', 'Gesetzliche, betriebliche und private Vorsorge', 'Bund, Länder, Gemeinden', 'Lohn, Gehalt, Prämie'], 1, '1. gesetzliche RV · 2. betriebliche Altersvorsorge · 3. private Vorsorge.'),
    Q('wk-altersvorsorge', 'Wie wird die gesetzliche Rentenversicherung finanziert?', ['Kapitaldeckungsverfahren: jeder spart für sich', 'Umlageverfahren: Beiträge der Arbeitenden zahlen die heutigen Renten', 'Nur aus Steuern', 'Nur durch den Arbeitgeber'], 1, 'Umlageverfahren = Generationenvertrag. Tiền đóng hôm nay trả lương hưu hôm nay.'),
    Q('wk-altersvorsorge', 'Wie hoch ist der Beitragssatz zur Rentenversicherung und wie wird er verteilt?', ['14,6 %, nur Arbeitnehmer', '18,6 %, je 9,3 % Arbeitnehmer und Arbeitgeber', '2,6 %, je 1,3 %', '18,6 %, nur Arbeitgeber'], 1, 'RV 18,6 % – paritätisch 9,3 / 9,3.'),
    Q('wk-altersvorsorge', 'Was versteht man unter der „Versorgungslücke"?', ['Die Zeit zwischen Ausbildung und Job', 'Den Unterschied zwischen letztem Einkommen und gesetzlicher Rente', 'Fehlende Beiträge zur Krankenkasse', 'Die Wartezeit auf die erste Rente'], 1, 'Gesetzliche Rente ≈ 48 % des Durchschnittslohns → Lücke muss privat/betrieblich geschlossen werden.'),
    Q('wk-altersvorsorge', 'Welche Form der Altersvorsorge wird vom Staat mit Zulagen gefördert?', ['Sparbuch', 'Riester-Rente', 'Bausparvertrag ohne Förderung', 'Girokonto'], 1, 'Riester: Grundzulage 175 €/Jahr + Kinderzulage, Berufseinsteiger-Bonus 200 €.'),
    Q('wk-altersvorsorge', 'Warum gerät die gesetzliche Rente unter Druck?', ['Weil die Löhne sinken', 'Wegen des demografischen Wandels: weniger Beitragszahler, mehr Rentner', 'Weil die Arbeitgeber keine Beiträge zahlen', 'Weil es zu viele Azubis gibt'], 1, 'Geburtenrückgang + höhere Lebenserwartung.'),
    // Solidarität
    Q('wk-solidaritaet', 'Was bedeutet das Solidaritätsprinzip in der gesetzlichen Sozialversicherung?', ['Jeder zahlt den gleichen Betrag', 'Beitrag nach Einkommen, Leistung nach Bedarf', 'Beitrag nach Gesundheitsrisiko', 'Nur Kranke zahlen Beiträge'], 1, 'Gesunde für Kranke, Junge für Alte, Gutverdiener zahlen mehr.'),
    Q('wk-solidaritaet', 'Wer zahlt die Beiträge zur gesetzlichen Unfallversicherung?', ['Arbeitnehmer allein', 'Arbeitgeber und Arbeitnehmer je zur Hälfte', 'Arbeitgeber allein', 'Der Staat'], 2, 'UV (Berufsgenossenschaft, Gastgewerbe: BGN) zahlt nur der Arbeitgeber.'),
    Q('wk-solidaritaet', 'Welches Prinzip gilt in der privaten Krankenversicherung?', ['Solidaritätsprinzip', 'Äquivalenzprinzip: Beitrag nach Risiko', 'Subsidiaritätsprinzip', 'Umlageprinzip'], 1, 'Privat: Beitrag richtet sich nach Alter und Gesundheit (Risiko).'),
    Q('wk-solidaritaet', 'Was besagt das Subsidiaritätsprinzip?', ['Der Staat hilft immer zuerst', 'Erst Selbsthilfe/Familie, der Staat hilft nur, wenn das nicht reicht', 'Alle zahlen gleich viel', 'Arbeitgeber haften für alle Risiken'], 1, 'Tự lo trước, nhà nước hỗ trợ sau (z. B. Bürgergeld).'),
    Q('wk-solidaritaet', 'Welcher Träger ist für die Arbeitslosenversicherung zuständig?', ['Deutsche Rentenversicherung', 'Berufsgenossenschaft', 'Bundesagentur für Arbeit', 'Finanzamt'], 2, 'AV 2,6 % (je 1,3 %) – Träger: Bundesagentur für Arbeit.'),
    // Kaufvertrag
    Q('wk-kaufvertrag', 'Ein Restaurant zeigt im Schaukasten seine Speisekarte mit Preisen. Rechtlich ist das …', ['ein verbindliches Angebot', 'eine Anpreisung (Aufforderung zur Abgabe eines Angebots)', 'eine Annahme', 'ein Kaufvertrag'], 1, 'Schaufenster, Werbung, ausgehängte Karte = Anpreisung. Bestellt der Gast, gibt er den Antrag ab.'),
    Q('wk-kaufvertrag', 'Ein Lieferant nimmt eine Bestellung mit geänderter Menge an. Welche Rechtsfolge?', ['Kaufvertrag zur ursprünglichen Menge', 'Die veränderte Annahme gilt als neuer Antrag', 'Der Vertrag ist nichtig', 'Der Kunde muss zahlen'], 1, 'Veränderte oder verspätete Annahme = neuer Antrag (§ 150 BGB).'),
    Q('wk-kaufvertrag', 'Welches Recht muss der Käufer bei einer mangelhaften Lieferung zuerst geltend machen?', ['Rücktritt', 'Minderung', 'Nacherfüllung (Nachbesserung oder Ersatzlieferung)', 'Schadensersatz'], 2, 'Vorrang der Nacherfüllung. Rücktritt/Minderung erst, wenn diese fehlschlägt.'),
    Q('wk-kaufvertrag', 'Wann kommt ein Lieferant ohne Mahnung in Lieferungsverzug?', ['Nie', 'Wenn der Liefertermin kalendermäßig genau bestimmt ist', 'Immer nach 30 Tagen', 'Wenn der Kunde Kaufmann ist'], 1, 'Kalendermäßig bestimmter Termin (z. B. „am 15.11.") oder Fixkauf → Mahnung entbehrlich.'),
    Q('wk-kaufvertrag', 'Die Hochzeitstorte wird einen Tag nach der Hochzeit geliefert. Welche Kaufart liegt vor?', ['Zielkauf', 'Fixkauf', 'Kauf auf Probe', 'Gattungskauf'], 1, 'Fixkauf: Termin ist wesentlich → Rücktritt ohne Nachfrist.'),
    Q('wk-kaufvertrag', 'Was bedeutet „Eigentumsvorbehalt"?', ['Der Käufer wird sofort Eigentümer', 'Der Verkäufer bleibt Eigentümer bis zur vollständigen Bezahlung', 'Die Ware darf nicht benutzt werden', 'Der Käufer kann den Preis mindern'], 1, 'Käufer ist bis zur Zahlung nur Besitzer.'),
    Q('wk-kaufvertrag', 'Ein Unternehmer verkauft an einen privaten Kunden. Wie heißt diese Kaufart?', ['Bürgerlicher Kauf', 'Zweiseitiger Handelskauf', 'Verbrauchsgüterkauf', 'Fixkauf'], 2, 'Unternehmer → Verbraucher = Verbrauchsgüterkauf (stärkster Schutz).'),
    Q('wk-kaufvertrag', 'Ein Gast zahlt eine Rechnung nicht. Wann ist er als Verbraucher spätestens im Zahlungsverzug?', ['Sofort', '30 Tage nach Fälligkeit und Zugang der Rechnung, wenn darauf hingewiesen wurde', 'Nach 2 Jahren', 'Erst nach Mahnbescheid'], 1, '§ 286 Abs. 3 BGB: 30 Tage; beim Verbraucher nur mit Hinweis auf der Rechnung.'),
    // Verbraucherschutz
    Q('wk-verbraucherschutz', 'Lisa kauft eine Jacke im Laden. Zu Hause gefällt sie ihr nicht mehr. Welche Aussage stimmt?', ['Sie hat 14 Tage Widerrufsrecht', 'Sie hat kein gesetzliches Widerrufsrecht; Umtausch nur aus Kulanz', 'Sie kann 2 Jahre umtauschen', 'Der Händler muss den Preis mindern'], 1, 'Widerrufsrecht nur bei Fernabsatz und außerhalb von Geschäftsräumen.'),
    Q('wk-verbraucherschutz', 'Wie lange beträgt das Widerrufsrecht bei einem Online-Kauf?', ['7 Tage', '14 Tage', '30 Tage', '2 Jahre'], 1, '14 Tage ohne Begründung, ab Erhalt der Ware und Belehrung.'),
    Q('wk-verbraucherschutz', 'Was unterscheidet die Garantie von der Gewährleistung?', ['Die Garantie ist gesetzlich vorgeschrieben', 'Die Garantie ist eine freiwillige Zusage, meist des Herstellers', 'Die Gewährleistung gibt nur der Hersteller', 'Es gibt keinen Unterschied'], 1, 'Gewährleistung = gesetzlich, Verkäufer, 2 Jahre. Garantie = freiwillig.'),
    Q('wk-verbraucherschutz', 'Bei welchem Online-Kauf besteht KEIN Widerrufsrecht?', ['Kleidung', 'Ein nach Kundenwunsch bedrucktes T-Shirt', 'Bücher', 'Ein Handy'], 1, 'Ausnahmen: individuell angefertigte Ware, verderbliche Lebensmittel, entsiegelte Hygieneartikel.'),
    Q('wk-verbraucherschutz', 'Eine Klausel in den AGB widerspricht einer mündlichen Einzelabsprache. Was gilt?', ['Die AGB', 'Die Individualabrede', 'Keines von beiden', 'Das entscheidet der Verkäufer'], 1, 'Individualabreden haben Vorrang vor AGB (§ 305b BGB).'),
    Q('wk-verbraucherschutz', 'Wie lange gilt die gesetzliche Gewährleistung bei neuen Waren für Verbraucher?', ['6 Monate', '1 Jahr', '2 Jahre', '5 Jahre'], 2, '2 Jahre ab Übergabe; im 1. Jahr Beweislastumkehr zugunsten des Verbrauchers.'),
    // Geld
    Q('wk-geld', 'Welche Funktion des Geldes ist gemeint: „Mit Preisen kann man Güter vergleichen"?', ['Tauschmittel', 'Wertaufbewahrungsmittel', 'Wertmaßstab / Recheneinheit', 'Wertübertragungsmittel'], 2, 'Wertmaßstab: Preise machen Güter vergleichbar.'),
    Q('wk-geld', 'Welche Funktion des Geldes wird durch hohe Inflation besonders geschwächt?', ['Tauschmittel', 'Wertaufbewahrungsmittel', 'Recheneinheit', 'Keine'], 1, 'Inflation senkt die Kaufkraft → Sparen verliert an Wert.'),
    Q('wk-geld', 'Was ist Buchgeld?', ['Münzen', 'Guthaben auf einem Girokonto', 'Banknoten', 'Gutscheine'], 1, 'Buchgeld (Giralgeld) = Kontoguthaben.'),
    Q('wk-geld', 'Für die monatlich wechselnde Handyrechnung eignet sich am besten …', ['der Dauerauftrag', 'die SEPA-Lastschrift', 'die Barzahlung', 'der Scheck'], 1, 'Lastschrift: Empfänger zieht wechselnde Beträge ein. Dauerauftrag nur für gleiche Beträge.'),
    Q('wk-geld', 'Innerhalb welcher Frist kann eine SEPA-Lastschrift ohne Begründung zurückgegeben werden?', ['2 Wochen', '8 Wochen', '6 Monate', 'Gar nicht'], 1, '8 Wochen ohne Begründung (mit erteiltem Mandat).'),
    Q('wk-geld', 'Welches Ziel verfolgt die Europäische Zentralbank (EZB) vorrangig?', ['Vollbeschäftigung', 'Preisniveaustabilität (ca. 2 % Inflation)', 'Hohe Aktienkurse', 'Niedrige Steuern'], 1, 'EZB-Ziel: Inflation mittelfristig 2 %.'),
    // Kredit
    Q('wk-kredit', 'Welche Angabe eignet sich am besten, um Kreditangebote zu vergleichen?', ['Sollzins', 'Effektiver Jahreszins', 'Monatsrate', 'Laufzeit'], 1, 'Effektiver Jahreszins enthält Zins + alle Kosten.'),
    Q('wk-kredit', 'Ein Azubi überzieht sein Konto um 2.400 € für 90 Tage bei 12 % Zinsen. Wie hoch sind die Zinsen?', ['24 €', '72 €', '288 €', '720 €'], 1, '2.400 × 12 × 90 ÷ 36.000 = 72 €.'),
    Q('wk-kredit', 'Welcher Kredit ist für Verbraucher meist am teuersten?', ['Baufinanzierung', 'Dispositionskredit', 'Ratenkredit', 'Bausparkredit'], 1, 'Dispo-Zinsen oft 10–15 %.'),
    Q('wk-kredit', 'Was speichert die SCHUFA?', ['Krankheiten', 'Informationen über Konten, Kredite und Zahlungsausfälle', 'Steuerbescheide', 'Arbeitszeugnisse'], 1, 'SCHUFA = Auskunftei zur Kreditwürdigkeit; Selbstauskunft 1× jährlich kostenlos.'),
    Q('wk-kredit', 'Bei der Sicherungsübereignung eines Autos …', ['wird der Kunde Eigentümer, die Bank Besitzer', 'wird die Bank Eigentümer, der Kunde bleibt Besitzer und fährt das Auto', 'wird das Auto verkauft', 'geht das Auto an die SCHUFA'], 1, 'Bank = Eigentümer (Sicherheit), Kunde = Besitzer (Nutzung).'),
    Q('wk-kredit', 'Welche Kreditsicherheit wird bei einer Immobilie im Grundbuch eingetragen?', ['Bürgschaft', 'Grundschuld', 'Pfandrecht an Schmuck', 'Eigentumsvorbehalt'], 1, 'Grundschuld = Realsicherheit an Grundstücken.'),
    Q('wk-kredit', 'Wie lange kann ein Verbraucher einen Kreditvertrag widerrufen?', ['Gar nicht', '7 Tage', '14 Tage', '1 Monat'], 2, 'Verbraucherdarlehen: Widerrufsrecht 14 Tage.'),
    // Bürgschaft
    Q('wk-buergschaft', 'In welcher Form muss eine private Person eine Bürgschaft erklären?', ['Mündlich', 'Per E-Mail', 'Schriftlich mit eigenhändiger Unterschrift', 'Notariell beurkundet'], 2, '§ 766 BGB: Schriftform. Nur Kaufleute im Handelsgeschäft auch mündlich.'),
    Q('wk-buergschaft', 'Was kennzeichnet die selbstschuldnerische Bürgschaft?', ['Der Bürge haftet erst nach erfolgloser Zwangsvollstreckung beim Schuldner', 'Der Bürge verzichtet auf die Einrede der Vorausklage und haftet sofort', 'Der Bürge haftet nur bis 1.000 €', 'Der Bürge haftet nie'], 1, 'Selbstschuldnerisch = sofort wie der Hauptschuldner.'),
    Q('wk-buergschaft', 'Mit wem schließt der Bürge den Bürgschaftsvertrag?', ['Mit dem Hauptschuldner', 'Mit dem Gläubiger', 'Mit dem Gericht', 'Mit der SCHUFA'], 1, 'Vertrag Bürge ↔ Gläubiger (z. B. Bank).'),
    Q('wk-buergschaft', 'Was kann der Bürge tun, nachdem er die Schuld bezahlt hat?', ['Nichts', 'Rückgriff auf den Hauptschuldner nehmen', 'Die Bank verklagen', 'Den Kredit kündigen'], 1, 'Die Forderung geht auf den Bürgen über (§ 774 BGB).'),
    Q('wk-buergschaft', 'Bei der Ausfallbürgschaft muss der Gläubiger …', ['sofort den Bürgen in Anspruch nehmen', 'zuerst erfolglos gegen den Hauptschuldner vollstrecken', 'den Bürgen nicht informieren', 'auf seine Forderung verzichten'], 1, 'Einrede der Vorausklage (§ 771 BGB).'),
    // Überschuldung
    Q('wk-ueberschuldung', 'Wann spricht man von Überschuldung?', ['Wenn man einen Kredit hat', 'Wenn Einnahmen dauerhaft nicht für Lebenshaltung und Ratenzahlungen reichen', 'Wenn man einen Dispo nutzt', 'Wenn man eine Kreditkarte besitzt'], 1, 'Verschuldung ≠ Überschuldung.'),
    Q('wk-ueberschuldung', 'Innerhalb welcher Frist kann man gegen einen Mahnbescheid Widerspruch einlegen?', ['3 Tage', '2 Wochen', '1 Monat', '3 Monate'], 1, 'Mahnbescheid → 2 Wochen Widerspruch; Vollstreckungsbescheid → 2 Wochen Einspruch.'),
    Q('wk-ueberschuldung', 'Was schützt ein P-Konto?', ['Das ganze Guthaben', 'Einen monatlichen Grundfreibetrag vor Pfändung', 'Nur Kindergeld', 'Nichts'], 1, 'Pfändungsschutzkonto: Grundfreibetrag bleibt verfügbar.'),
    Q('wk-ueberschuldung', 'Wie lange dauert die Wohlverhaltensphase bis zur Restschuldbefreiung in der Regel?', ['1 Jahr', '3 Jahre', '6 Jahre', '10 Jahre'], 1, 'Seit 2020/2021: 3 Jahre.'),
    Q('wk-ueberschuldung', 'Was ist der erste Schritt im Verbraucherinsolvenzverfahren?', ['Antrag beim Gericht', 'Außergerichtlicher Einigungsversuch mit den Gläubigern', 'Pfändung', 'Restschuldbefreiung'], 1, 'Erst außergerichtlich (mit Schuldnerberatung), dann Antrag.'),
    Q('wk-ueberschuldung', 'Wie lang ist die regelmäßige Verjährungsfrist für Forderungen?', ['1 Jahr', '3 Jahre', '10 Jahre', '30 Jahre'], 1, '3 Jahre ab Jahresende; titulierte Forderungen 30 Jahre.'),
    Q('wk-ueberschuldung', 'Welche Sache darf der Gerichtsvollzieher NICHT pfänden?', ['Zweitfernseher', 'Bett und Kühlschrank', 'Schmuck', 'Sportwagen'], 1, 'Unpfändbar: Dinge für bescheidene Lebensführung und Berufsausübung.'),
  ];
})();
