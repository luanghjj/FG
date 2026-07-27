/* BfK-1 · Extra · Thema 10+11 – Aufbau- & Ablauforganisation (nguồn: theorie-19-themen.md) */
window.__EXTRA = (window.__EXTRA||[]).concat([
  {
    id: "extra-t10",
    icon: "🏢",
    name: "Thema 10 · Aufbauorganisation I",
    nameVi: "Tổ chức cơ cấu (hierarchie, Organigramm)",
    desc: "Hierarchie, Rollen, Zuständigkeiten, Organigramm lesen, Kommunikationswege.",
    source: "theorie-19-themen.md · Thema 10",
    theory: `
<h3>Aufbauorganisation – 5 Kernpunkte / 5 điểm chính</h3>
<div class="note">⚠️ <b>Aufbau vs. Ablauf:</b> <b>Aufbauorganisation</b> = ai làm gì, ai báo cáo cho ai (cơ cấu tĩnh — Organigramm). <b>Ablauforganisation</b> (Thema 11) = công việc diễn ra như thế nào theo thời gian (quy trình).</div>
<table>
<tr><th>#</th><th>Punkt</th><th>Nội dung</th></tr>
<tr><td>1</td><td><b>Hierarchie</b></td><td>Các cấp lãnh đạo rõ ràng (Leitungsebenen), trách nhiệm, kênh giao tiếp.</td></tr>
<tr><td>2</td><td><b>Rollen klären</b></td><td>Ai cũng biết nhiệm vụ của mình, tránh chồng chéo (Überschneidungen).</td></tr>
<tr><td>3</td><td><b>Zuständigkeiten</b></td><td>Phân công rõ, Schichtpläne, tránh xung đột.</td></tr>
<tr><td>4</td><td><b>Organigramm lesen</b></td><td>Đọc sơ đồ tổ chức: cấu trúc, quan hệ, kênh giao tiếp.</td></tr>
<tr><td>5</td><td><b>Kommunikationswege</b></td><td>Giao tiếp công việc, phản hồi, giải quyết xung đột.</td></tr>
</table>`,
    qa: [
      { q: "Was zeigt ein Organigramm?", qVi: "Sơ đồ tổ chức (Organigramm) thể hiện gì?", a: "Die Struktur des Betriebs, die Beziehungen zwischen Rollen und die Kommunikationswege.", aVi: "Cơ cấu doanh nghiệp, quan hệ giữa các vị trí và các kênh giao tiếp.", why: "Organigramm là hình ảnh của Aufbauorganisation.", src: "theorie-19-themen.md · Thema 10 · Punkt 4" },
      { q: "Warum müssen Rollen klar sein?", qVi: "Vì sao cần phân vai trò rõ ràng?", a: "Damit jeder seine Aufgaben kennt und Überschneidungen vermieden werden.", aVi: "Để mỗi người biết nhiệm vụ của mình và tránh chồng chéo công việc.", why: "Rõ vai trò → ít xung đột, hiệu quả hơn.", src: "theorie-19-themen.md · Thema 10 · Punkt 2" }
    ],
    quiz: [
      { q: "Was beschreibt die Aufbauorganisation?", options: ["Wer welche Aufgabe hat und wem er unterstellt ist", "wie schnell gekocht wird", "die Lagertemperatur", "den Speiseplan"], answer: 0, explain: "Aufbauorganisation = Struktur: Rollen, Hierarchie, Zuständigkeiten." },
      { q: "Ein Organigramm zeigt vor allem …", options: ["die Betriebsstruktur", "die Preise", "die Allergene", "die Öffnungszeiten"], answer: 0, explain: "Organigramm = grafische Darstellung der Struktur und Kommunikationswege." },
      { q: "Was hilft, Konflikte bei Zuständigkeiten zu vermeiden?", options: ["klare Verteilung + Schichtpläne", "keine Pläne", "mehr Gäste", "weniger Reinigung"], answer: 0, explain: "Klare Zuständigkeiten und Schichtpläne vermeiden Konflikte." }
    ],
    vokabeln: [
      { de: "die Aufbauorganisation", vi: "tổ chức cơ cấu (tĩnh)" },
      { de: "die Hierarchie", vi: "hệ thống cấp bậc" },
      { de: "die Leitungsebene", vi: "cấp quản lý" },
      { de: "die Zuständigkeit", vi: "thẩm quyền/trách nhiệm" },
      { de: "das Organigramm", vi: "sơ đồ tổ chức" },
      { de: "die Überschneidung", vi: "sự chồng chéo" },
      { de: "der Kommunikationsweg", vi: "kênh giao tiếp" },
      { de: "der Schichtplan", vi: "lịch ca làm việc" },
      { de: "unterstellt sein", vi: "trực thuộc, cấp dưới của" }
    ]
  },
  {
    id: "extra-t11",
    icon: "🔀",
    name: "Thema 11 · Ablauforganisation II",
    nameVi: "Tổ chức quy trình (Prozesse, Zeitplanung)",
    desc: "Arbeitsprozesse, Zeitplanung, Schnittstellen, Qualität sichern, Abläufe dokumentieren.",
    source: "theorie-19-themen.md · Thema 11",
    theory: `
<h3>Ablauforganisation – 5 Kernpunkte / 5 điểm chính</h3>
<table>
<tr><th>#</th><th>Punkt</th><th>Nội dung</th></tr>
<tr><td>1</td><td><b>Arbeitsprozesse beschreiben</b></td><td>Từng bước một (Schritt für Schritt), người phụ trách, mục tiêu.</td></tr>
<tr><td>2</td><td><b>Zeitplanung optimieren</b></td><td>Xử lý giờ cao điểm (Stoßzeiten), phân bổ việc, tránh thời gian chết (Leerlauf).</td></tr>
<tr><td>3</td><td><b>Schnittstellen koordinieren</b></td><td>Phối hợp Service ↔ Küche, bàn giao rõ ràng (klare Übergaben).</td></tr>
<tr><td>4</td><td><b>Qualität sichern</b></td><td>Chuẩn (Standards), kiểm tra thường xuyên, phản hồi.</td></tr>
<tr><td>5</td><td><b>Abläufe dokumentieren</b></td><td>Checklisten, báo cáo (Berichte), lưu trữ (Archivierung).</td></tr>
</table>
<div class="note">💡 <b>Schnittstelle</b> (giao diện/điểm giao) quan trọng nhất trong nhà hàng là giữa <b>Küche und Service</b> — bàn giao món và thông tin phải rõ để không sai đơn.</div>`,
    qa: [
      { q: "Was ist eine wichtige Schnittstelle im Restaurant?", qVi: "Điểm giao (Schnittstelle) quan trọng trong nhà hàng là gì?", a: "Die Schnittstelle zwischen Küche und Service – klare Übergaben verhindern Fehler.", aVi: "Điểm giao giữa Bếp và Phục vụ — bàn giao rõ ràng để tránh sai sót.", why: "Phối hợp tốt = đơn đúng, khách hài lòng.", src: "theorie-19-themen.md · Thema 11 · Punkt 3" },
      { q: "Wie optimiert man die Zeitplanung?", qVi: "Tối ưu kế hoạch thời gian thế nào?", a: "Stoßzeiten einplanen, Arbeit verteilen und Leerlauf vermeiden.", aVi: "Tính trước giờ cao điểm, phân bổ công việc và tránh thời gian chết.", why: "Giảm quá tải lúc đông, không lãng phí lúc vắng.", src: "theorie-19-themen.md · Thema 11 · Punkt 2" }
    ],
    quiz: [
      { q: "Was beschreibt die Ablauforganisation?", options: ["wie Arbeit zeitlich abläuft (Prozesse)", "wer der Chef ist", "die Lagertemperatur", "den Preis"], answer: 0, explain: "Ablauforganisation = die zeitlichen Prozesse und Abläufe." },
      { q: "Was ist eine „Stoßzeit“?", options: ["Zeit mit sehr vielen Gästen", "Pause", "Nachtruhe", "Inventur"], answer: 0, explain: "Stoßzeit = Zeitraum mit besonders hohem Andrang." },
      { q: "Womit dokumentiert man Abläufe?", options: ["Checklisten und Berichte", "gar nicht", "nur mündlich", "mit Fotos vom Gast"], answer: 0, explain: "Abläufe dokumentieren: Checklisten, Berichte, Archivierung." },
      { q: "Die wichtigste Schnittstelle ist zwischen …", options: ["Küche und Service", "Gast und Straße", "Keller und Dach", "Chef und Bank"], answer: 0, explain: "Küche ↔ Service: klare Übergaben verhindern Fehler." }
    ],
    vokabeln: [
      { de: "die Ablauforganisation", vi: "tổ chức quy trình (động)" },
      { de: "der Arbeitsprozess", vi: "quy trình làm việc" },
      { de: "die Zeitplanung", vi: "lập kế hoạch thời gian" },
      { de: "die Stoßzeit", vi: "giờ cao điểm" },
      { de: "der Leerlauf", vi: "thời gian chết/nhàn rỗi" },
      { de: "die Schnittstelle", vi: "điểm giao/giao diện" },
      { de: "die Übergabe", vi: "sự bàn giao" },
      { de: "die Qualität sichern", vi: "đảm bảo chất lượng" },
      { de: "der Bericht", vi: "báo cáo" },
      { de: "die Archivierung", vi: "việc lưu trữ" }
    ]
  }
]);
