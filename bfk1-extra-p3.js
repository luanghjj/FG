/* BfK-1 · Extra · Thema 12+13 – Kostenkontrolle & Kennzahlen (nguồn: theorie-19-themen.md) */
window.__EXTRA = (window.__EXTRA||[]).concat([
  {
    id: "extra-t12",
    icon: "🧮",
    name: "Thema 12 · Kostenkontrolle",
    nameVi: "Kiểm soát chi phí (Kalkulation, Budget)",
    desc: "Kalkulation/Wareneinsatz, Budget, Kosten senken, Preisvergleich, Wirtschaftlichkeit.",
    source: "theorie-19-themen.md · Thema 12",
    theory: `
<h3>Kostenkontrolle – 5 Kernpunkte / 5 điểm chính</h3>
<table>
<tr><th>#</th><th>Punkt</th><th>Nội dung</th></tr>
<tr><td>1</td><td><b>Kalkulation</b></td><td>Tính Wareneinsatz, Selbstkosten (vd. 2,50 €) → Verkaufspreis (vd. 5,00 €).</td></tr>
<tr><td>2</td><td><b>Budget einhalten</b></td><td>Giám sát chi tiêu, so sánh Soll-Ist, tránh vượt ngân sách.</td></tr>
<tr><td>3</td><td><b>Kosten senken</b></td><td>Tiết kiệm năng lượng, tối ưu mua hàng, giảm rác — <b>KHÔNG hạ chất lượng</b>.</td></tr>
<tr><td>4</td><td><b>Preise vergleichen</b></td><td>Thu báo giá (Angebote einholen), cân đối giá/chất lượng, nhà cung cấp lâu dài.</td></tr>
<tr><td>5</td><td><b>Wirtschaftlichkeit prüfen</b></td><td>Umsatz vs. Kosten, Gewinnspanne (vd. 40 %), điều chỉnh biện pháp.</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC – Aufschlag/Kalkulation ví dụ:</b> Selbstkosten 2,50 € → Verkaufspreis 5,00 € nghĩa là <b>Aufschlag 100 %</b> (giá bán gấp đôi giá vốn). Gewinnspanne mục tiêu ví dụ 40 %.</div>`,
    qa: [
      { q: "Was bedeutet „Kosten senken, aber nicht die Qualität“?", qVi: "„Giảm chi phí nhưng không hạ chất lượng“ nghĩa là gì?", a: "Energie sparen, Einkauf optimieren und Abfall reduzieren – ohne schlechtere Produkte zu verwenden.", aVi: "Tiết kiệm năng lượng, tối ưu mua hàng, giảm rác — nhưng không dùng nguyên liệu kém đi.", why: "Hạ chất lượng sẽ mất khách → phản tác dụng.", src: "theorie-19-themen.md · Thema 12 · Punkt 3" },
      { q: "Wie prüft man die Wirtschaftlichkeit?", qVi: "Kiểm tra tính kinh tế (Wirtschaftlichkeit) thế nào?", a: "Umsatz und Kosten vergleichen und die Gewinnspanne betrachten.", aVi: "So sánh doanh thu với chi phí và xét biên lợi nhuận (Gewinnspanne).", why: "Umsatz > Kosten thì mới có lãi.", src: "theorie-19-themen.md · Thema 12 · Punkt 5" }
    ],
    quiz: [
      { q: "Selbstkosten 2,50 € → Verkaufspreis 5,00 €. Wie hoch ist der Aufschlag?", options: ["100 %", "50 %", "25 %", "7 %"], answer: 0, explain: "5,00 / 2,50 = 2 → Verdopplung = 100 % Aufschlag." },
      { q: "Was gehört NICHT zum Kostensenken?", options: ["schlechtere Zutaten kaufen", "Energie sparen", "Abfall reduzieren", "Einkauf optimieren"], answer: 0, explain: "Qualität darf nicht gesenkt werden." },
      { q: "Womit hält man das Budget ein?", options: ["Soll-Ist-Vergleich", "gar keine Kontrolle", "mehr ausgeben", "Preise verstecken"], answer: 0, explain: "Budget: Ausgaben überwachen, Soll-Ist-Vergleich." }
    ],
    vokabeln: [
      { de: "die Kostenkontrolle", vi: "kiểm soát chi phí" },
      { de: "die Kalkulation", vi: "việc tính giá" },
      { de: "der Wareneinsatz", vi: "giá vốn hàng (chi phí nguyên liệu)" },
      { de: "die Selbstkosten", vi: "giá thành/giá vốn" },
      { de: "der Verkaufspreis", vi: "giá bán" },
      { de: "der Aufschlag", vi: "phần cộng thêm (markup)" },
      { de: "das Budget einhalten", vi: "giữ đúng ngân sách" },
      { de: "der Soll-Ist-Vergleich", vi: "so sánh kế hoạch – thực tế" },
      { de: "die Gewinnspanne", vi: "biên lợi nhuận" },
      { de: "die Wirtschaftlichkeit", vi: "tính kinh tế/hiệu quả" }
    ]
  },
  {
    id: "extra-t13",
    icon: "📊",
    name: "Thema 13 · Kennzahlen",
    nameVi: "Chỉ số kinh doanh (Umsatz, Gewinn, Wareneinsatz)",
    desc: "Umsatz, Gewinn, Wareneinsatzquote, Kennzahlen interpretieren, Benchmarking.",
    source: "theorie-19-themen.md · Thema 13",
    theory: `
<h3>Kennzahlen – 5 Kernpunkte / 5 điểm chính</h3>
<table>
<tr><th>#</th><th>Punkt</th><th>Nội dung</th></tr>
<tr><td>1</td><td><b>Umsatz berechnen</b></td><td>Cộng doanh thu bán ra, Netto/Brutto, theo kỳ.</td></tr>
<tr><td>2</td><td><b>Gewinn ermitteln</b></td><td><b>Gewinn = Umsatz − Kosten</b>; chi phí cố định & biến đổi, Gewinnspanne.</td></tr>
<tr><td>3</td><td><b>Wareneinsatz analysieren</b></td><td>% trên doanh thu, Soll-Ist (kế hoạch 28 % / thực 32 %), tối ưu.</td></tr>
<tr><td>4</td><td><b>Kennzahlen interpretieren</b></td><td>Xu hướng, điểm mạnh/yếu, biện pháp.</td></tr>
<tr><td>5</td><td><b>Betrieb vergleichen</b></td><td>Benchmarking, số ngành (Wareneinsatz Ø 30 %), so đối thủ.</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC 2 công thức:</b><br>• <b>Gewinn = Umsatz − Kosten</b><br>• <b>Wareneinsatzquote = Wareneinsatz ÷ Umsatz × 100 %</b> (ngành ~30 %; nếu 32 % > 28 % kế hoạch → chi phí nguyên liệu cao, cần tối ưu).</div>`,
    qa: [
      { q: "Wie berechnet man den Gewinn?", qVi: "Tính lợi nhuận (Gewinn) thế nào?", a: "Gewinn = Umsatz − Kosten.", aVi: "Lợi nhuận = Doanh thu − Chi phí.", why: "Công thức cốt lõi của Kennzahlen.", src: "theorie-19-themen.md · Thema 13 · Punkt 2" },
      { q: "Der Wareneinsatz ist 32 %, geplant waren 28 %. Was bedeutet das?", qVi: "Wareneinsatz 32 %, kế hoạch 28 % — nghĩa là gì?", a: "Der tatsächliche Wareneinsatz ist zu hoch – die Materialkosten müssen optimiert werden.", aVi: "Chi phí nguyên liệu thực tế cao hơn kế hoạch → cần tối ưu (mua rẻ hơn, giảm hao hụt, chỉnh khẩu phần).", why: "Ist > Soll ở Wareneinsatz = ăn vào lợi nhuận.", src: "theorie-19-themen.md · Thema 13 · Punkt 3" }
    ],
    quiz: [
      { q: "Gewinn = ?", options: ["Umsatz − Kosten", "Umsatz + Kosten", "Kosten − Umsatz", "Umsatz × 19 %"], answer: 0, explain: "Gewinn = Umsatz minus Kosten." },
      { q: "Wareneinsatzquote = ?", options: ["Wareneinsatz ÷ Umsatz × 100", "Umsatz ÷ Gewinn", "Kosten × 19", "Umsatz − Steuer"], answer: 0, explain: "Wareneinsatz als Prozentanteil vom Umsatz." },
      { q: "Was ist Benchmarking?", options: ["Vergleich mit Branchenzahlen/Wettbewerb", "Kochen", "Reinigen", "Bestellen"], answer: 0, explain: "Betrieb vergleichen mit Branchenkennzahlen und Wettbewerbern." },
      { q: "Branchenüblicher Wareneinsatz liegt bei etwa …", options: ["30 %", "3 %", "70 %", "100 %"], answer: 0, explain: "Ø Wareneinsatz ca. 30 % vom Umsatz." }
    ],
    vokabeln: [
      { de: "die Kennzahl", vi: "chỉ số (kinh doanh)" },
      { de: "der Umsatz", vi: "doanh thu" },
      { de: "der Gewinn", vi: "lợi nhuận" },
      { de: "die Kosten", vi: "chi phí" },
      { de: "die Fixkosten", vi: "chi phí cố định" },
      { de: "variable Kosten", vi: "chi phí biến đổi" },
      { de: "die Wareneinsatzquote", vi: "tỷ lệ giá vốn trên doanh thu" },
      { de: "das Benchmarking", vi: "so sánh chuẩn ngành" },
      { de: "interpretieren", vi: "diễn giải, phân tích" },
      { de: "der Branchenwert", vi: "giá trị trung bình ngành" }
    ]
  }
]);
