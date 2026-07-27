/* BfK-1 · Extra · Thema 17+18+19 – Personal (nguồn: theorie-19-themen.md) */
window.__EXTRA = (window.__EXTRA||[]).concat([
  {
    id: "extra-t17",
    icon: "📅",
    name: "Thema 17 · Personaleinsatzplanung",
    nameVi: "Lập kế hoạch nhân sự (Dienstpläne, ArbZG)",
    desc: "Dienstpläne, Schichten, Urlaubsplanung, Ausfälle, Arbeitszeitgesetz.",
    source: "theorie-19-themen.md · Thema 17",
    theory: `
<h3>Personaleinsatzplanung – 5 Kernpunkte / 5 điểm chính</h3>
<table>
<tr><th>#</th><th>Punkt</th><th>Nội dung</th></tr>
<tr><td>1</td><td><b>Dienstpläne</b></td><td>Phân tích nhu cầu, xếp ca (Schichten), tính cả nghỉ phép.</td></tr>
<tr><td>2</td><td><b>Schichten koordinieren</b></td><td>Đủ người, tránh trùng ca, linh hoạt.</td></tr>
<tr><td>3</td><td><b>Urlaubsplanung</b></td><td>Sớm, có người thay, theo luật (24 Urlaubstage).</td></tr>
<tr><td>4</td><td><b>Ausfälle ersetzen</b></td><td>Springer (người trực thay), Aushilfen, kiêm nhiệm.</td></tr>
<tr><td>5</td><td><b>Arbeitszeitgesetz (ArbZG)</b></td><td>Xem hộp bên dưới.</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC – Arbeitszeitgesetz (ArbZG):</b><br>• Tối đa <b>10 giờ/ngày</b>.<br>• Nghỉ giải lao (Pause) sau <b>6 giờ</b> làm việc.<br>• Người dưới 18 (Jugendschutz): tối đa <b>40 giờ/tuần</b>.<br>• Phép năm tối thiểu (ví dụ tài liệu): <b>24 Urlaubstage</b>.</div>`,
    qa: [
      { q: "Wie viele Stunden darf man laut ArbZG maximal am Tag arbeiten?", qVi: "Theo ArbZG được làm tối đa mấy giờ/ngày?", a: "Maximal 10 Stunden pro Tag.", aVi: "Tối đa 10 giờ/ngày.", why: "Grenze des Arbeitszeitgesetzes.", src: "theorie-19-themen.md · Thema 17 · Punkt 5" },
      { q: "Was ist ein „Springer“ in der Dienstplanung?", qVi: "„Springer“ trong xếp ca là gì?", a: "Eine Aushilfe/Person, die bei Ausfällen kurzfristig einspringt.", aVi: "Người trực thay, nhảy vào khi có người nghỉ đột xuất.", why: "Ausfälle ersetzen (Punkt 4).", src: "theorie-19-themen.md · Thema 17 · Punkt 4" }
    ],
    quiz: [
      { q: "Nach wie vielen Stunden ist eine Pause vorgeschrieben?", options: ["nach 6 Std.", "nach 2 Std.", "nach 10 Std.", "gar nicht"], answer: 0, explain: "Pause nach 6 Stunden Arbeit." },
      { q: "Jugendliche unter 18 dürfen maximal … pro Woche arbeiten.", options: ["40 Std.", "60 Std.", "48 Std.", "20 Std."], answer: 0, explain: "Jugendschutz: max. 40 Std./Woche." },
      { q: "Was gehört zur Urlaubsplanung?", options: ["frühzeitig + Vertretung", "gar nicht planen", "nur Chef entscheidet spontan", "kein Urlaub"], answer: 0, explain: "Frühzeitig planen, Vertretung sichern, gesetzliche Vorgaben." }
    ],
    vokabeln: [
      { de: "die Personaleinsatzplanung", vi: "lập kế hoạch dùng nhân sự" },
      { de: "der Dienstplan", vi: "lịch làm việc/xếp ca" },
      { de: "die Schicht", vi: "ca làm việc" },
      { de: "die Urlaubsplanung", vi: "lập kế hoạch nghỉ phép" },
      { de: "die Vertretung", vi: "người thay thế" },
      { de: "der Springer", vi: "người trực thay linh hoạt" },
      { de: "die Aushilfe", vi: "nhân viên thời vụ/phụ" },
      { de: "das Arbeitszeitgesetz (ArbZG)", vi: "luật thời giờ làm việc" },
      { de: "die Pause", vi: "giờ nghỉ giải lao" },
      { de: "der Urlaubstag", vi: "ngày phép" }
    ]
  },
  {
    id: "extra-t18",
    icon: "📝",
    name: "Thema 18 · Personalverwaltung & -beschaffung I",
    nameVi: "Tuyển dụng I (Bewerbung, Gespräch, Vertrag)",
    desc: "Bewerbungen prüfen, Vorstellungsgespräch, Personaldaten, Arbeitsvertrag, Onboarding.",
    source: "theorie-19-themen.md · Thema 18",
    theory: `
<h3>Personalbeschaffung I – 5 Kernpunkte / 5 điểm chính</h3>
<table>
<tr><th>#</th><th>Punkt</th><th>Nội dung</th></tr>
<tr><td>1</td><td><b>Bewerbungen prüfen</b></td><td>Xem hồ sơ (Unterlagen), bằng cấp, sơ tuyển.</td></tr>
<tr><td>2</td><td><b>Vorstellungsgespräche</b></td><td>Chuẩn bị câu hỏi, xét Soft Skills, sự phù hợp.</td></tr>
<tr><td>3</td><td><b>Personaldaten verwalten</b></td><td>Hồ sơ số hoá, bảo vệ dữ liệu (Datenschutz), cập nhật.</td></tr>
<tr><td>4</td><td><b>Arbeitsverträge vorbereiten</b></td><td>Theo quy định pháp lý, kiểm nội dung, cả hai bên ký.</td></tr>
<tr><td>5</td><td><b>Einarbeitung planen</b></td><td>Onboarding, có Mentor, phản hồi (Feedback).</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC:</b> Personaldaten phải tuân thủ <b>Datenschutz</b> (bảo vệ dữ liệu cá nhân). Arbeitsvertrag chỉ có hiệu lực khi <b>cả hai bên ký</b>.</div>`,
    qa: [
      { q: "Was prüft man in einem Vorstellungsgespräch außer der Qualifikation?", qVi: "Trong phỏng vấn, ngoài trình độ còn xét gì?", a: "Soft Skills und die persönliche Eignung des Bewerbers.", aVi: "Kỹ năng mềm (Soft Skills) và sự phù hợp của ứng viên.", why: "Punkt 2 der Personalbeschaffung.", src: "theorie-19-themen.md · Thema 18 · Punkt 2" },
      { q: "Worauf muss man bei Personaldaten achten?", qVi: "Quản lý dữ liệu nhân sự phải chú ý gì?", a: "Auf den Datenschutz – Daten sicher und aktuell verwalten.", aVi: "Bảo vệ dữ liệu (Datenschutz) — lưu an toàn, cập nhật.", why: "Punkt 3.", src: "theorie-19-themen.md · Thema 18 · Punkt 3" }
    ],
    quiz: [
      { q: "Was ist „Onboarding“?", options: ["Einarbeitung neuer Mitarbeiter", "Kündigung", "Inventur", "Reinigung"], answer: 0, explain: "Onboarding = Einarbeitung/Mentor/Feedback." },
      { q: "Wann ist ein Arbeitsvertrag gültig?", options: ["wenn beide unterschreiben", "wenn nur der Chef unterschreibt", "mündlich reicht immer", "nie"], answer: 0, explain: "Beide Seiten müssen unterschreiben." },
      { q: "Was gehört zum Datenschutz bei Personaldaten?", options: ["Daten sicher + aktuell verwalten", "Daten öffentlich posten", "Daten löschen ohne Regel", "egal"], answer: 0, explain: "Digitale Akten, Datenschutz, Aktualität." }
    ],
    vokabeln: [
      { de: "die Personalbeschaffung", vi: "việc tuyển dụng nhân sự" },
      { de: "die Bewerbung", vi: "đơn xin việc / hồ sơ ứng tuyển" },
      { de: "die Unterlagen", vi: "hồ sơ, giấy tờ" },
      { de: "das Vorstellungsgespräch", vi: "buổi phỏng vấn" },
      { de: "die Soft Skills", vi: "kỹ năng mềm" },
      { de: "die Eignung", vi: "sự phù hợp/năng lực" },
      { de: "der Datenschutz", vi: "bảo vệ dữ liệu" },
      { de: "der Arbeitsvertrag", vi: "hợp đồng lao động" },
      { de: "die Einarbeitung", vi: "việc đào tạo ban đầu" },
      { de: "der Mentor", vi: "người kèm/hướng dẫn" }
    ]
  },
  {
    id: "extra-t19",
    icon: "💶",
    name: "Thema 19 · Personalverwaltung & -beschaffung II",
    nameVi: "Nhân sự II (Vertrag, Lohn, Sozialversicherung)",
    desc: "Arbeitsvertrag erklären, Rechte/Pflichten, Lohnabrechnung (brutto/netto), Sozialversicherung, Mitarbeitergespräche.",
    source: "theorie-19-themen.md · Thema 19",
    theory: `
<h3>Personalverwaltung II – 5 Kernpunkte / 5 điểm chính</h3>
<table>
<tr><th>#</th><th>Punkt</th><th>Nội dung</th></tr>
<tr><td>1</td><td><b>Arbeitsverträge erklären</b></td><td>Rechte/Pflichten, Arbeitszeit/Lohn, Kündigungsfrist (vd. 4 Wochen).</td></tr>
<tr><td>2</td><td><b>Rechte und Pflichten</b></td><td>Quyền NV (vd. 24 Urlaubstage), nghĩa vụ doanh nghiệp, minh bạch.</td></tr>
<tr><td>3</td><td><b>Lohnabrechnung prüfen</b></td><td>Brutto/Netto (vd. 2000 €/1500 €), khấu trừ (thuế, BHXH), báo lỗi.</td></tr>
<tr><td>4</td><td><b>Sozialversicherung anmelden</b></td><td>Bảo hiểm bắt buộc, phí (chủ trả một nửa), giấy tờ.</td></tr>
<tr><td>5</td><td><b>Mitarbeitergespräche</b></td><td>Định kỳ, đánh giá/động viên, mục tiêu & phát triển.</td></tr>
</table>
<div class="note">⚠️ <b>HỌC THUỘC – Brutto vs. Netto lương:</b> <b>Brutto</b> = lương gộp (vd. 2000 €) trước khấu trừ; <b>Netto</b> = lương thực nhận (vd. 1500 €) sau khi trừ <b>thuế + Sozialversicherung (SV)</b>. Với BHXH, <b>chủ trả một nửa (AG zahlt Hälfte)</b>.</div>`,
    qa: [
      { q: "Was ist der Unterschied zwischen Brutto- und Nettolohn?", qVi: "Khác nhau giữa lương Brutto và Netto?", a: "Brutto ist der Lohn vor Abzügen; Netto ist der Betrag nach Abzug von Steuern und Sozialversicherung.", aVi: "Brutto là lương trước khấu trừ; Netto là số thực nhận sau khi trừ thuế và bảo hiểm xã hội.", why: "vd. 2000 € brutto → ~1500 € netto.", src: "theorie-19-themen.md · Thema 19 · Punkt 3" },
      { q: "Wer zahlt die Beiträge zur Sozialversicherung?", qVi: "Ai đóng phí bảo hiểm xã hội?", a: "Arbeitgeber und Arbeitnehmer teilen sich die Beiträge – der Arbeitgeber zahlt die Hälfte.", aVi: "Chủ và người lao động chia nhau — chủ trả một nửa.", why: "Pflichtversicherung, Beiträge geteilt.", src: "theorie-19-themen.md · Thema 19 · Punkt 4" }
    ],
    quiz: [
      { q: "Netto ist …", options: ["Lohn nach Abzügen", "Lohn vor Abzügen", "nur Trinkgeld", "die Steuer"], answer: 0, explain: "Netto = nach Steuer + SV-Abzügen." },
      { q: "Wie viel der Sozialversicherung zahlt der Arbeitgeber?", options: ["die Hälfte", "alles", "nichts", "ein Viertel"], answer: 0, explain: "AG zahlt die Hälfte der Beiträge." },
      { q: "Typische Kündigungsfrist laut Material?", options: ["4 Wochen", "1 Tag", "1 Jahr", "keine"], answer: 0, explain: "Kündigungsfrist z. B. 4 Wochen." },
      { q: "Wozu dienen Mitarbeitergespräche?", options: ["Leistung/Motivation, Ziele/Entwicklung", "nur Kritik", "Kündigung", "gar nichts"], answer: 0, explain: "Regelmäßig, Leistung/Motivation, Ziele/Entwicklung." }
    ],
    vokabeln: [
      { de: "die Lohnabrechnung", vi: "bảng lương" },
      { de: "brutto", vi: "lương gộp (trước khấu trừ)" },
      { de: "netto", vi: "lương thực nhận (sau khấu trừ)" },
      { de: "der Abzug", vi: "khoản khấu trừ" },
      { de: "die Sozialversicherung (SV)", vi: "bảo hiểm xã hội" },
      { de: "der Beitrag", vi: "khoản đóng góp/phí" },
      { de: "der Arbeitgeber (AG)", vi: "người sử dụng lao động (chủ)" },
      { de: "der Arbeitnehmer (AN)", vi: "người lao động" },
      { de: "die Kündigungsfrist", vi: "thời hạn báo trước khi nghỉ việc" },
      { de: "das Mitarbeitergespräch", vi: "buổi trao đổi với nhân viên" }
    ]
  }
]);
