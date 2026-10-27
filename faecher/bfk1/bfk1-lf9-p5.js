/* BfK-1 · LF9 · LS05 – Rechnungserstellung planen, Preise einschließlich Umsatzsteuer berechnen
 * Nguồn: tự soạn (không có trong 2-Bfk1-lf9). Steuersätze theo lf9.md (Anlage 1, trang 12):
 * Speisen 7 % (ab 01.01.2026), Getränke 19 %. Pflichtangaben: § 14 UStG, § 33 UStDV.
 */
window.__LF9 = (window.__LF9||[]).concat([
  {
    id: "lf9-ls05",
    icon: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 2h12v20l-3-2-3 2-3-2-3 2z\"/><path d=\"M9 7h6\"/><path d=\"M9 11h6\"/><path d=\"M9 15h3\"/></svg>",
    name: "LS05 · Rechnungserstellung & Preise inkl. USt",
    nameVi: "Lập hóa đơn & tính giá gồm thuế GTGT",
    desc: "Netto ↔ Brutto, USt herausrechnen, Pflichtangaben, Kleinbetragsrechnung, Musterrechnung.",
    source: "Eigene Zusammenfassung (nicht im 2-Bfk1-lf9) · Steuersätze lt. lf9.md S. 12 · § 14 UStG, § 33 UStDV",
    theory: `
<h3>Situation / Tình huống</h3>
<p>Sie sind Auszubildende/r im Restaurant <b>„Palmero“</b> in Tübingen. Nach dem Fehler auf der letzten Rechnung (19 % auf alles) soll das Team lernen, <b>Rechnungen richtig zu erstellen</b> und <b>Preise mit Umsatzsteuer</b> korrekt zu berechnen. Sie erstellen die Rechnung für <b>Tisch 5</b>.</p>
<p>→ Bạn là học viên ở nhà hàng Palmero (Tübingen). Sau lỗi trên hóa đơn lần trước (tính 19 % cho tất cả), cả nhóm cần học cách lập hóa đơn đúng và tính giá có thuế GTGT. Bạn lập hóa đơn cho bàn số 5.</p>

<h3>A. Steuersätze in der Gastronomie (ab 01.01.2026) / Thuế suất</h3>
<table>
<tr><th>Leistung</th><th>Steuersatz</th><th>Nghĩa Việt</th></tr>
<tr><td><b>Speisen</b> (im Haus und außer Haus)</td><td><b>7 %</b></td><td>Món ăn (tại chỗ và mang đi)</td></tr>
<tr><td><b>Getränke</b></td><td><b>19 %</b></td><td>Đồ uống</td></tr>
<tr><td>Milch/Milchmischgetränke (≥ 75 % Milch), Leitungswasser außer Haus</td><td><b>7 %</b></td><td>Ngoại lệ: sữa, đồ uống ≥ 75 % sữa, nước máy mang đi</td></tr>
<tr><td><b>Übernachtung</b></td><td><b>7 %</b></td><td>Lưu trú</td></tr>
</table>
<div class="note"><b>Merke:</b> <b>Netto</b> = Preis ohne USt · <b>Brutto</b> = Preis inkl. USt. Auf der <b>Speisekarte</b> stehen immer <b>Endpreise</b> (Bruttopreise inkl. USt und Bedienungsgeld), so verlangt es die <b>Preisangabenverordnung (PAngV)</b>.<br>→ Netto là giá chưa thuế, Brutto là giá đã có thuế. Thực đơn luôn ghi giá cuối cùng (đã gồm thuế và phí phục vụ) theo PAngV.</div>

<h3>B. Rechenwege / Cách tính</h3>
<table>
<tr><th>Gesucht</th><th>Formel</th><th>Beispiel</th></tr>
<tr><td><b>Brutto aus Netto</b></td><td>Netto × 1,07 (Speisen) · Netto × 1,19 (Getränke)</td><td>16,00 € × 1,07 = <b>17,12 €</b></td></tr>
<tr><td><b>USt aus Netto</b></td><td>Netto × Steuersatz / 100</td><td>4,00 € × 19 / 100 = <b>0,76 €</b></td></tr>
<tr><td><b>USt aus Brutto</b> (herausrechnen)</td><td>Brutto × 7 / 107 · Brutto × 19 / 119</td><td>23,80 € × 19 / 119 = <b>3,80 €</b></td></tr>
<tr><td><b>Netto aus Brutto</b></td><td>Brutto ÷ 1,07 · Brutto ÷ 1,19</td><td>23,80 € ÷ 1,19 = <b>20,00 €</b></td></tr>
</table>
<div class="formula">Brutto = Netto + USt &nbsp;·&nbsp; 100 % (Netto) + 19 % (USt) = 119 % (Brutto)</div>
<div class="note"><b>Typischer Fehler:</b> USt aus dem Bruttopreis <b>nicht</b> mit 19 % vom Brutto rechnen! 23,80 € × 19 % = 4,52 € ist <b>falsch</b>. Richtig: 23,80 € × 19/119 = 3,80 €.<br>→ Lỗi hay gặp: không lấy 19 % của giá Brutto. Phải nhân 19/119.</div>
<h3>C. Pflichtangaben auf der Rechnung / Nội dung bắt buộc</h3>
<table>
<tr><th>Vollständige Rechnung (§ 14 UStG)</th><th>Kleinbetragsrechnung bis 250 € brutto (§ 33 UStDV)</th></tr>
<tr><td>Name und Anschrift des <b>Unternehmers</b> und des <b>Leistungsempfängers</b></td><td>Name und Anschrift des <b>Unternehmers</b></td></tr>
<tr><td><b>Steuernummer</b> oder <b>USt-IdNr.</b></td><td>–</td></tr>
<tr><td><b>Ausstellungsdatum</b> und Zeitpunkt der Leistung</td><td><b>Ausstellungsdatum</b></td></tr>
<tr><td>fortlaufende <b>Rechnungsnummer</b></td><td>–</td></tr>
<tr><td><b>Menge und Art</b> der Leistung</td><td><b>Menge und Art</b> der Leistung</td></tr>
<tr><td><b>Nettobetrag</b> getrennt nach Steuersätzen</td><td><b>Bruttobetrag</b></td></tr>
<tr><td><b>Steuersatz</b> und <b>Steuerbetrag</b></td><td><b>Steuersatz</b></td></tr>
</table>
<p>→ Hóa đơn đầy đủ (trên 250 €) cần thêm tên khách, mã số thuế, số hóa đơn liên tục và số thuế tách theo từng thuế suất. Hóa đơn nhỏ đến 250 € chỉ cần tên/địa chỉ nhà hàng, ngày, số lượng và loại món, tổng Brutto và thuế suất.</p>
<div class="note">Zusätzlich gilt die <b>Belegausgabepflicht</b> (seit 2020, vgl. LS03): Beginn und Ende des Vorgangs, <b>Transaktionsnummer</b> und Seriennummer der Kasse stehen auf dem Kassenbeleg.<br>→ Thêm vào đó là nghĩa vụ xuất chứng từ (từ 2020, xem LS03): giờ bắt đầu và kết thúc, số giao dịch, số máy tính tiền.</div>

<h3>D. Musterrechnung Tisch 5 / Hóa đơn mẫu</h3>
<table>
<tr><th>Menge</th><th>Bezeichnung</th><th>Einzelpreis</th><th>Gesamt</th><th>USt</th></tr>
<tr><td>2</td><td>Paella Valenciana</td><td>18,90 €</td><td>37,80 €</td><td>7 %</td></tr>
<tr><td>1</td><td>Tortilla Española</td><td>7,50 €</td><td>7,50 €</td><td>7 %</td></tr>
<tr><td>1</td><td>Crema Catalana</td><td>6,50 €</td><td>6,50 €</td><td>7 %</td></tr>
<tr><td></td><td><b>Summe Speisen</b></td><td></td><td><b>51,80 €</b></td><td></td></tr>
<tr><td>2</td><td>Sangria (0,3 l)</td><td>5,90 €</td><td>11,80 €</td><td>19 %</td></tr>
<tr><td>1</td><td>Agua mineral</td><td>3,20 €</td><td>3,20 €</td><td>19 %</td></tr>
<tr><td>2</td><td>Café solo</td><td>2,60 €</td><td>5,20 €</td><td>19 %</td></tr>
<tr><td></td><td><b>Summe Getränke</b></td><td></td><td><b>20,20 €</b></td><td></td></tr>
<tr><td></td><td><b>Gesamtbetrag (brutto)</b></td><td></td><td><b>72,00 €</b></td><td></td></tr>
</table>
<table>
<tr><th>Steuersatz</th><th>Brutto</th><th>Netto</th><th>USt</th></tr>
<tr><td>7 %</td><td>51,80 €</td><td>48,41 €</td><td>3,39 €</td></tr>
<tr><td>19 %</td><td>20,20 €</td><td>16,97 €</td><td>3,23 €</td></tr>
<tr><td><b>Summe</b></td><td><b>72,00 €</b></td><td><b>65,38 €</b></td><td><b>6,62 €</b></td></tr>
</table>
<div class="formula">51,80 € × 7 / 107 = 3,39 € &nbsp;·&nbsp; 20,20 € × 19 / 119 = 3,23 €</div>

<h3>E. Ablauf der Rechnungserstellung / Quy trình lập hóa đơn</h3>
<table>
<tr><th>#</th><th>Schritt</th><th>Nghĩa Việt</th></tr>
<tr><td>1</td><td>Alle Bestellungen sofort in der Kasse <b>bonieren</b></td><td>Nhập mọi order vào máy ngay</td></tr>
<tr><td>2</td><td>Rechnung erst <b>auf Wunsch des Gastes</b> erstellen</td><td>Chỉ lập hóa đơn khi khách yêu cầu</td></tr>
<tr><td>3</td><td>Rechnung <b>kontrollieren</b> (Positionen, Mengen, Steuersätze)</td><td>Kiểm tra món, số lượng, thuế suất</td></tr>
<tr><td>4</td><td>Rechnung in der <b>Rechnungsmappe</b> dem Gastgeber übergeben</td><td>Đưa hóa đơn trong bìa cho người chủ bàn</td></tr>
<tr><td>5</td><td><b>Kassieren</b>, Rückgeld laut vorzählen</td><td>Thu tiền, đếm tiền thối trước mặt khách</td></tr>
<tr><td>6</td><td><b>Beleg aushändigen</b>, bedanken und verabschieden</td><td>Đưa chứng từ, cảm ơn và chào khách</td></tr>
</table>
`,
    qa: [
      { q: "Welche Steuersätze gelten ab 01.01.2026 für Speisen und Getränke im Restaurant?", qVi: "Từ 01.01.2026 thuế suất cho món ăn và đồ uống ở nhà hàng là bao nhiêu?", a: "Speisen 7 % (im Haus und außer Haus), Getränke 19 %.", aVi: "Món ăn 7 % (tại chỗ và mang đi), đồ uống 19 %.", why: "Steueränderungsgesetz 2025, vgl. LS03.", src: "lf9.md · S. 12 · Anlage 1" },
      { q: "Ein Gericht kostet netto 16,00 €. Berechnen Sie den Bruttopreis.", qVi: "Một món giá Netto 16,00 €. Tính giá Brutto.", a: "16,00 € × 1,07 = 17,12 €.", aVi: "16,00 € × 1,07 = 17,12 €.", why: "Speisen → 7 %.", src: "Eigene Übung · Teil B" },
      { q: "Ein Glas Wein kostet brutto 6,50 €. Wie hoch ist die enthaltene USt?", qVi: "Một ly vang giá Brutto 6,50 €. Thuế GTGT trong đó là bao nhiêu?", a: "6,50 € × 19 / 119 = 1,04 €. Netto = 5,46 €.", aVi: "6,50 € × 19 / 119 = 1,04 €. Netto = 5,46 €.", why: "Getränke → 19 %, herausrechnen mit 19/119.", src: "Eigene Übung · Teil B" },
      { q: "Warum darf man die USt nicht mit 19 % vom Bruttopreis berechnen?", qVi: "Vì sao không được tính thuế bằng 19 % của giá Brutto?", a: "Der Bruttopreis ist schon 119 %. Die 19 % beziehen sich auf den Nettopreis (100 %). Deshalb rechnet man Brutto × 19/119.", aVi: "Giá Brutto đã là 119 %. 19 % tính trên giá Netto (100 %), nên phải lấy Brutto × 19/119.", why: "Lỗi hay gặp nhất trong bài thi.", src: "Eigene Zusammenfassung · Teil B" },
      { q: "Was ist eine Kleinbetragsrechnung und was muss darauf stehen?", qVi: "Hóa đơn nhỏ là gì và phải có những gì?", a: "Eine Rechnung bis 250 € brutto. Pflicht: Name und Anschrift des Unternehmers, Ausstellungsdatum, Menge und Art der Leistung, Bruttobetrag, Steuersatz.", aVi: "Hóa đơn đến 250 € Brutto. Bắt buộc: tên và địa chỉ doanh nghiệp, ngày, số lượng và loại, tổng Brutto, thuế suất.", why: "§ 33 UStDV. Phần lớn hóa đơn nhà hàng là Kleinbetragsrechnung.", src: "Eigene Zusammenfassung · Teil C" },
      { q: "Nennen Sie fünf Pflichtangaben einer vollständigen Rechnung.", qVi: "Nêu 5 nội dung bắt buộc của hóa đơn đầy đủ.", a: "Name/Anschrift von Unternehmer und Empfänger, Steuernummer oder USt-IdNr., Ausstellungsdatum, fortlaufende Rechnungsnummer, Menge und Art, Zeitpunkt der Leistung, Nettobetrag nach Steuersätzen, Steuersatz und Steuerbetrag.", aVi: "Tên/địa chỉ doanh nghiệp và khách, mã số thuế, ngày, số hóa đơn liên tục, số lượng và loại, thời điểm cung cấp, Netto theo thuế suất, thuế suất và số thuế.", why: "§ 14 Abs. 4 UStG.", src: "Eigene Zusammenfassung · Teil C" },
      { q: "Tisch 5: Speisen 51,80 €, Getränke 20,20 € (brutto). Berechnen Sie die USt.", qVi: "Bàn 5: món ăn 51,80 €, đồ uống 20,20 € (Brutto). Tính thuế GTGT.", a: "Speisen: 51,80 × 7/107 = 3,39 €\nGetränke: 20,20 × 19/119 = 3,23 €\nUSt gesamt: 6,62 € · Netto gesamt: 65,38 € · Brutto: 72,00 €", aVi: "Món ăn: 3,39 €; đồ uống: 3,23 €; tổng thuế 6,62 €; Netto 65,38 €; Brutto 72,00 €.", why: "Luôn tách theo từng thuế suất.", src: "Eigene Übung · Teil D" },
      { q: "Welche Preise stehen auf der Speisekarte und warum?", qVi: "Thực đơn ghi giá gì và vì sao?", a: "Endpreise (Bruttopreise inkl. USt und Bedienungsgeld), weil die Preisangabenverordnung (PAngV) das vorschreibt.", aVi: "Giá cuối cùng (đã gồm thuế và phí phục vụ), vì PAngV quy định.", why: "Khách phải biết ngay số tiền thực trả.", src: "Eigene Zusammenfassung · Teil A · vgl. LS03" }
    ],
    qaNote: "Tài liệu LF9 không có LS05 — nội dung tự soạn. Thuế suất lấy theo lf9.md (trang 12); Pflichtangaben theo § 14 UStG và § 33 UStDV. Nên đối chiếu với vở ghi trên lớp.",
    quiz: [
      { q: "Ein Schnitzel kostet netto 15,00 €. Wie hoch ist der Bruttopreis?", options: ["16,05 €", "17,85 €", "15,07 €", "15,19 €"], answer: 0, explain: "Speisen 7 %: 15,00 € × 1,07 = 16,05 €." },
      { q: "Ein Bier kostet brutto 4,76 €. Wie hoch ist die enthaltene USt?", options: ["0,90 €", "0,76 €", "0,33 €", "4,00 €"], answer: 1, explain: "4,76 € × 19/119 = 0,76 € (Netto 4,00 €)." },
      { q: "Wie rechnet man die USt aus einem Bruttopreis für Speisen heraus?", options: ["× 7/100", "× 7/107", "× 19/119", "× 1,07"], answer: 1, explain: "Speisen 7 %: Brutto × 7/107." },
      { q: "Bis zu welchem Betrag gilt eine Kleinbetragsrechnung?", options: ["100 € brutto", "150 € netto", "250 € brutto", "500 € brutto"], answer: 2, explain: "§ 33 UStDV: bis 250 € brutto." },
      { q: "Was muss auf einer Kleinbetragsrechnung NICHT stehen?", options: ["Steuersatz", "Bruttobetrag", "Name des Gastes", "Ausstellungsdatum"], answer: 2, explain: "Der Leistungsempfänger ist erst bei der vollständigen Rechnung Pflicht." },
      { q: "Welche Preise müssen auf der Speisekarte stehen?", options: ["Nettopreise", "Endpreise inkl. USt", "Einkaufspreise", "Preise ohne Bedienungsgeld"], answer: 1, explain: "Preisangabenverordnung: Endpreise (brutto)." },
      { q: "Brutto 23,80 € (Getränk). Wie hoch ist der Nettopreis?", options: ["19,28 €", "20,00 €", "22,24 €", "4,52 €"], answer: 1, explain: "23,80 € ÷ 1,19 = 20,00 €." },
      { q: "Wann wird die Rechnung zum Tisch gebracht?", options: ["Sofort nach dem Hauptgang", "Auf Wunsch des Gastes", "Mit der Vorspeise", "Nach 30 Minuten"], answer: 1, explain: "Ungefragtes Bringen wirkt wie Hinauswerfen." }
    ],
    vokabeln: [
      { de: "die Rechnung", vi: "hóa đơn" },
      { de: "die Rechnungserstellung", vi: "việc lập hóa đơn" },
      { de: "die Umsatzsteuer (USt)", vi: "thuế giá trị gia tăng" },
      { de: "der Steuersatz", vi: "thuế suất" },
      { de: "der Steuerbetrag", vi: "số tiền thuế" },
      { de: "der Nettopreis", vi: "giá chưa thuế" },
      { de: "der Bruttopreis", vi: "giá đã có thuế" },
      { de: "herausrechnen", vi: "tách ra (khỏi giá gộp)" },
      { de: "aufschlagen", vi: "cộng thêm" },
      { de: "der Endpreis", vi: "giá cuối cùng" },
      { de: "die Kleinbetragsrechnung", vi: "hóa đơn giá trị nhỏ" },
      { de: "die Pflichtangabe", vi: "thông tin bắt buộc" },
      { de: "die Rechnungsnummer", vi: "số hóa đơn" },
      { de: "fortlaufend", vi: "liên tục, theo thứ tự" },
      { de: "der Leistungsempfänger", vi: "người nhận dịch vụ" },
      { de: "die Steuernummer", vi: "mã số thuế" },
      { de: "das Ausstellungsdatum", vi: "ngày lập" },
      { de: "die Position", vi: "dòng mục (trên hóa đơn)" },
      { de: "die Rechnungsmappe", vi: "bìa đựng hóa đơn" },
      { de: "bonieren", vi: "nhập order vào máy tính tiền" },
      { de: "kassieren", vi: "thu tiền" },
      { de: "das Rückgeld", vi: "tiền thối" },
      { de: "die Preisangabenverordnung (PAngV)", vi: "quy định niêm yết giá" }
    ]
  }
]);
