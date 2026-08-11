/* Detailed diagram illustrations + lightbox for Deutsch Visualisierung */
(function (w) {
  "use strict";

  const DIAG_META = {
    kurve: {
      title: "📈 Kurvendiagramm",
      sub: "Entwicklung über die Zeit",
      vi: "Biểu đồ đường – xu hướng theo thời gian",
      note: "X = Zeit · Y = Wert. Stichworte: stieg, sank, von … bis …, Jahre/Monate, Entwicklung.",
      stats: [
        ["1992", "685"],
        ["1994", "700"],
        ["1996", "790"],
        ["1998", "950"],
        ["2000", "1.180"],
      ],
      unit: "Beispiel: Ausfuhr (Mio. €)",
    },
    saeule: {
      title: "📊 Säulen-/Balkendiagramm",
      sub: "Vergleich mehrerer Größen",
      vi: "Biểu đồ cột/thanh – so sánh nhiều đối tượng",
      note: "Kategorien nebeneinander. Stichworte: A hat mehr als B, Vergleich, Ranking.",
      stats: [
        ["TV", "95,9 %"],
        ["Video", "65,9 %"],
        ["PC", "54,0 %"],
        ["Internet", "42,0 %"],
      ],
      unit: "Beispiel: Haushaltsausstattung",
    },
    kreis: {
      title: "🥧 Kreis-/Tortendiagramm",
      sub: "Anteile eines Ganzen (= 100 %)",
      vi: "Biểu đồ tròn – các phần cộng thành 100%",
      note: "Alle Teile zusammen 100 %. Stichworte: %, Anteile, von 100, Teile eines Ganzen.",
      stats: [
        ["Vollzeit", "58,9 %"],
        ["Teilzeit", "14,9 %"],
        ["Überstunden", "12,4 %"],
        ["Minijob", "7,2 %"],
        ["Sonstiges", "6,6 %"],
      ],
      unit: "Beispiel: Wochenarbeitszeit (Σ 100 %)",
    },
    tabelle: {
      title: "📋 Tabelle",
      sub: "Exakte Zahlen · mehrere Spalten/Orte",
      vi: "Bảng – số chính xác, nhiều cột",
      note: "Viele genaue Werte. Stichworte: exakte Zahlen, Spalten, Orte, Einheiten.",
      stats: [
        ["Stadt A", "7,2 % / 6,8 %"],
        ["Stadt B", "5,1 % / 5,4 %"],
        ["Stadt C", "9,0 % / 8,7 %"],
        ["Stadt D", "4,3 % / 4,1 %"],
      ],
      unit: "Beispiel: Arbeitslosenquote Mai / April",
    },
    mindmap: {
      title: "🧠 Mindmap",
      sub: "Thema in der Mitte · Äste = Aspekte",
      vi: "Sơ đồ tư duy – giữa + nhánh",
      note: "Langer Sachtext, viele Aspekte. Stichworte: Mindmap, Stichworte, Äste.",
      stats: [
        ["Mitte", "Fleischkonsum"],
        ["Ast 1", "Gründe"],
        ["Ast 2", "Folgen"],
        ["Ast 3", "Alternativen"],
        ["Ast 4", "Zahlen / Trends"],
      ],
      unit: "Beispielstruktur",
    },
    struktur: {
      title: "🔀 Strukturbild",
      sub: "Ablauf · Ursache–Wirkung · Teufelskreis",
      vi: "Sơ đồ cấu trúc – quy trình / nhân–quả",
      note: "weil → deshalb, führt zu, Teufelskreis, Ablauf. Pfeile zeigen Richtung.",
      stats: [
        ["1", "Negatives Denken"],
        ["2", "Angst"],
        ["3", "Fehler"],
        ["4", "Kritik"],
        ["↻", "zurück zu 1"],
      ],
      unit: "Beispiel: Teufelskreis",
    },
    organi: {
      title: "🏢 Organigramm",
      sub: "Hierarchie · wer ist wem unterstellt",
      vi: "Sơ đồ tổ chức – cấp bậc",
      note: "Chef, Abteilung, unterstellt. Personen + Ebenen.",
      stats: [
        ["Ebene 1", "Geschäftsführer"],
        ["Ebene 2", "Küche · Service · Einkauf"],
        ["Ebene 3", "Mitarbeiter / Azubis"],
      ],
      unit: "Beispiel Betrieb",
    },
  };

  const DIAG_SVG = {
    kurve: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kurvendiagramm">
      <rect width="320" height="200" fill="#f8fafc"/>
      <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Ausfuhr 1992–2000 (Mio. €)</text>
      <line x1="48" y1="30" x2="48" y2="160" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="48" y1="160" x2="300" y2="160" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="48" y1="130" x2="300" y2="130" stroke="#e2e8f0"/><text x="42" y="134" text-anchor="end" font-size="8" fill="#64748b">800</text>
      <line x1="48" y1="100" x2="300" y2="100" stroke="#e2e8f0"/><text x="42" y="104" text-anchor="end" font-size="8" fill="#64748b">1000</text>
      <line x1="48" y1="70" x2="300" y2="70" stroke="#e2e8f0"/><text x="42" y="74" text-anchor="end" font-size="8" fill="#64748b">1200</text>
      <text x="42" y="164" text-anchor="end" font-size="8" fill="#64748b">600</text>
      <polyline fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" points="60,148 110,142 160,118 210,78 260,48"/>
      <circle cx="60" cy="148" r="4" fill="#2563eb"/><text x="60" y="140" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700">685</text>
      <circle cx="110" cy="142" r="4" fill="#2563eb"/><text x="110" y="134" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700">700</text>
      <circle cx="160" cy="118" r="4" fill="#2563eb"/><text x="160" y="110" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700">790</text>
      <circle cx="210" cy="78" r="4" fill="#2563eb"/><text x="210" y="70" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700">950</text>
      <circle cx="260" cy="48" r="4" fill="#2563eb"/><text x="260" y="40" text-anchor="middle" font-size="8" fill="#1d4ed8" font-weight="700">1180</text>
      <text x="60" y="176" text-anchor="middle" font-size="9" fill="#64748b">1992</text>
      <text x="110" y="176" text-anchor="middle" font-size="9" fill="#64748b">1994</text>
      <text x="160" y="176" text-anchor="middle" font-size="9" fill="#64748b">1996</text>
      <text x="210" y="176" text-anchor="middle" font-size="9" fill="#64748b">1998</text>
      <text x="260" y="176" text-anchor="middle" font-size="9" fill="#64748b">2000</text>
      <text x="160" y="194" text-anchor="middle" font-size="10" fill="#334155" font-weight="600">Zeit → · stieg von 685 auf 1.180</text>
    </svg>`,
    saeule: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Säulendiagramm">
      <rect width="320" height="200" fill="#f8fafc"/>
      <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Haushaltsausstattung (%)</text>
      <line x1="40" y1="28" x2="40" y2="160" stroke="#94a3b8"/><line x1="40" y1="160" x2="300" y2="160" stroke="#94a3b8"/>
      <line x1="40" y1="40" x2="300" y2="40" stroke="#e2e8f0"/><text x="34" y="44" text-anchor="end" font-size="8" fill="#64748b">100</text>
      <line x1="40" y1="100" x2="300" y2="100" stroke="#e2e8f0"/><text x="34" y="104" text-anchor="end" font-size="8" fill="#64748b">50</text>
      <rect x="58" y="45" width="36" height="115" rx="4" fill="#1d4ed8"/><text x="76" y="40" text-anchor="middle" font-size="9" fill="#1d4ed8" font-weight="700">95,9</text>
      <rect x="112" y="81" width="36" height="79" rx="4" fill="#2563eb"/><text x="130" y="76" text-anchor="middle" font-size="9" fill="#2563eb" font-weight="700">65,9</text>
      <rect x="166" y="95" width="36" height="65" rx="4" fill="#3b82f6"/><text x="184" y="90" text-anchor="middle" font-size="9" fill="#3b82f6" font-weight="700">54,0</text>
      <rect x="220" y="110" width="36" height="50" rx="4" fill="#60a5fa"/><text x="238" y="105" text-anchor="middle" font-size="9" fill="#2563eb" font-weight="700">42,0</text>
      <text x="76" y="176" text-anchor="middle" font-size="9" fill="#334155">TV</text>
      <text x="130" y="176" text-anchor="middle" font-size="9" fill="#334155">Video</text>
      <text x="184" y="176" text-anchor="middle" font-size="9" fill="#334155">PC</text>
      <text x="238" y="176" text-anchor="middle" font-size="9" fill="#334155">Internet</text>
      <text x="160" y="194" text-anchor="middle" font-size="10" fill="#334155" font-weight="600">Vergleich: A hat mehr als B</text>
    </svg>`,
    kreis: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kreisdiagramm">
      <rect width="320" height="200" fill="#f8fafc"/>
      <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Wochenarbeitszeit (Anteile = 100 %)</text>
      <g transform="translate(110,105)">
        <circle r="62" fill="#dbeafe"/>
        <path d="M0,0 L0,-62 A62,62 0 1,1 -20.1,58.6 Z" fill="#1d4ed8"/>
        <path d="M0,0 L-20.1,58.6 A62,62 0 0,1 -55.5,-27.7 Z" fill="#3b82f6"/>
        <path d="M0,0 L-55.5,-27.7 A62,62 0 0,1 -10.8,-61.0 Z" fill="#60a5fa"/>
        <path d="M0,0 L-10.8,-61.0 A62,62 0 0,1 18.5,-59.2 Z" fill="#93c5fd"/>
        <path d="M0,0 L18.5,-59.2 A62,62 0 0,1 0,-62 Z" fill="#bfdbfe"/>
      </g>
      <rect x="190" y="48" width="10" height="10" fill="#1d4ed8"/><text x="206" y="57" font-size="10" fill="#0f172a">Vollzeit 58,9%</text>
      <rect x="190" y="68" width="10" height="10" fill="#3b82f6"/><text x="206" y="77" font-size="10" fill="#0f172a">Teilzeit 14,9%</text>
      <rect x="190" y="88" width="10" height="10" fill="#60a5fa"/><text x="206" y="97" font-size="10" fill="#0f172a">Überstd. 12,4%</text>
      <rect x="190" y="108" width="10" height="10" fill="#93c5fd"/><text x="206" y="117" font-size="10" fill="#0f172a">Minijob 7,2%</text>
      <rect x="190" y="128" width="10" height="10" fill="#bfdbfe"/><text x="206" y="137" font-size="10" fill="#0f172a">Sonst. 6,6%</text>
      <text x="160" y="188" text-anchor="middle" font-size="10" fill="#334155" font-weight="600">Σ 100 % · Teile eines Ganzen</text>
    </svg>`,
    tabelle: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tabelle">
      <rect width="320" height="200" fill="#f8fafc"/>
      <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Arbeitslosenquote (%) – Städte</text>
      <rect x="36" y="32" width="248" height="140" rx="6" fill="#fff" stroke="#94a3b8"/>
      <rect x="36" y="32" width="248" height="28" fill="#1d4ed8"/>
      <line x1="120" y1="32" x2="120" y2="172" stroke="#cbd5e1"/><line x1="200" y1="32" x2="200" y2="172" stroke="#cbd5e1"/>
      <line x1="36" y1="88" x2="284" y2="88" stroke="#e2e8f0"/><line x1="36" y1="116" x2="284" y2="116" stroke="#e2e8f0"/><line x1="36" y1="144" x2="284" y2="144" stroke="#e2e8f0"/>
      <text x="78" y="50" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Stadt</text>
      <text x="160" y="50" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Mai 2010</text>
      <text x="242" y="50" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Apr 2010</text>
      <text x="78" y="78" text-anchor="middle" font-size="11" fill="#0f172a">A</text><text x="160" y="78" text-anchor="middle" font-size="11" fill="#0f172a">7,2</text><text x="242" y="78" text-anchor="middle" font-size="11" fill="#0f172a">6,8</text>
      <text x="78" y="106" text-anchor="middle" font-size="11" fill="#0f172a">B</text><text x="160" y="106" text-anchor="middle" font-size="11" fill="#0f172a">5,1</text><text x="242" y="106" text-anchor="middle" font-size="11" fill="#0f172a">5,4</text>
      <text x="78" y="134" text-anchor="middle" font-size="11" fill="#0f172a">C</text><text x="160" y="134" text-anchor="middle" font-size="11" fill="#0f172a">9,0</text><text x="242" y="134" text-anchor="middle" font-size="11" fill="#0f172a">8,7</text>
      <text x="78" y="162" text-anchor="middle" font-size="11" fill="#0f172a">D</text><text x="160" y="162" text-anchor="middle" font-size="11" fill="#0f172a">4,3</text><text x="242" y="162" text-anchor="middle" font-size="11" fill="#0f172a">4,1</text>
      <text x="160" y="192" text-anchor="middle" font-size="10" fill="#334155" font-weight="600">exakte Zahlen · mehrere Spalten/Orte</text>
    </svg>`,
    mindmap: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mindmap">
      <rect width="320" height="200" fill="#f8fafc"/>
      <text x="160" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Mindmap: Fleischkonsum</text>
      <circle cx="160" cy="100" r="36" fill="#1d4ed8"/>
      <text x="160" y="96" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">Fleisch-</text>
      <text x="160" y="110" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">konsum</text>
      <line x1="160" y1="64" x2="160" y2="36" stroke="#64748b" stroke-width="2"/>
      <line x1="130" y1="80" x2="70" y2="46" stroke="#64748b" stroke-width="2"/>
      <line x1="190" y1="80" x2="250" y2="46" stroke="#64748b" stroke-width="2"/>
      <line x1="130" y1="120" x2="70" y2="154" stroke="#64748b" stroke-width="2"/>
      <line x1="190" y1="120" x2="250" y2="154" stroke="#64748b" stroke-width="2"/>
      <rect x="120" y="18" width="80" height="22" rx="6" fill="#93c5fd"/><text x="160" y="33" text-anchor="middle" font-size="10" fill="#1e3a8a" font-weight="700">Gründe</text>
      <rect x="20" y="34" width="70" height="22" rx="6" fill="#bfdbfe"/><text x="55" y="49" text-anchor="middle" font-size="10" fill="#1e3a8a" font-weight="700">Folgen</text>
      <rect x="230" y="34" width="70" height="22" rx="6" fill="#bfdbfe"/><text x="265" y="49" text-anchor="middle" font-size="10" fill="#1e3a8a" font-weight="700">Zahlen</text>
      <rect x="20" y="146" width="80" height="22" rx="6" fill="#bfdbfe"/><text x="60" y="161" text-anchor="middle" font-size="10" fill="#1e3a8a" font-weight="700">Alternativen</text>
      <rect x="220" y="146" width="80" height="22" rx="6" fill="#bfdbfe"/><text x="260" y="161" text-anchor="middle" font-size="10" fill="#1e3a8a" font-weight="700">Trends</text>
      <text x="160" y="192" text-anchor="middle" font-size="10" fill="#334155" font-weight="600">Mitte + Äste · Stichworte · viele Aspekte</text>
    </svg>`,
    struktur: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Strukturbild">
      <rect width="320" height="200" fill="#f8fafc"/>
      <text x="160" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Strukturbild: Teufelskreis</text>
      <rect x="20" y="70" width="70" height="36" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
      <text x="55" y="86" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="700">Negatives</text>
      <text x="55" y="98" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="700">Denken</text>
      <path d="M92,88 H118" stroke="#2563eb" stroke-width="2.5"/>
      <rect x="120" y="70" width="60" height="36" rx="8" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.5"/>
      <text x="150" y="92" text-anchor="middle" font-size="10" fill="#1e3a8a" font-weight="700">Angst</text>
      <path d="M182,88 H208" stroke="#2563eb" stroke-width="2.5"/>
      <rect x="210" y="70" width="60" height="36" rx="8" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
      <text x="240" y="92" text-anchor="middle" font-size="10" fill="#1e3a8a" font-weight="700">Fehler</text>
      <path d="M240,106 V130 H55 V106" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5 3"/>
      <polygon points="50,110 60,106 60,114" fill="#f59e0b"/>
      <rect x="200" y="132" width="70" height="28" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="235" y="150" text-anchor="middle" font-size="10" fill="#92400e" font-weight="700">Kritik</text>
      <text x="160" y="188" text-anchor="middle" font-size="10" fill="#334155" font-weight="600">weil → deshalb · führt zu · Ablauf / Kreis</text>
    </svg>`,
    organi: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Organigramm">
      <rect width="320" height="200" fill="#f8fafc"/>
      <text x="160" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Organigramm Betrieb</text>
      <rect x="110" y="28" width="100" height="28" rx="6" fill="#1d4ed8"/>
      <text x="160" y="46" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">Geschäftsführer</text>
      <line x1="160" y1="56" x2="160" y2="72" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="60" y1="72" x2="260" y2="72" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="60" y1="72" x2="60" y2="84" stroke="#94a3b8"/><line x1="160" y1="72" x2="160" y2="84" stroke="#94a3b8"/><line x1="260" y1="72" x2="260" y2="84" stroke="#94a3b8"/>
      <rect x="20" y="84" width="80" height="28" rx="6" fill="#2563eb"/><text x="60" y="102" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">Küche</text>
      <rect x="120" y="84" width="80" height="28" rx="6" fill="#2563eb"/><text x="160" y="102" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">Service</text>
      <rect x="220" y="84" width="80" height="28" rx="6" fill="#2563eb"/><text x="260" y="102" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">Einkauf</text>
      <line x1="60" y1="112" x2="60" y2="128" stroke="#94a3b8"/><line x1="160" y1="112" x2="160" y2="128" stroke="#94a3b8"/><line x1="260" y1="112" x2="260" y2="128" stroke="#94a3b8"/>
      <rect x="22" y="128" width="76" height="24" rx="5" fill="#93c5fd"/><text x="60" y="144" text-anchor="middle" font-size="9" fill="#1e3a8a">Köche / Azubis</text>
      <rect x="122" y="128" width="76" height="24" rx="5" fill="#93c5fd"/><text x="160" y="144" text-anchor="middle" font-size="9" fill="#1e3a8a">Servicekräfte</text>
      <rect x="222" y="128" width="76" height="24" rx="5" fill="#93c5fd"/><text x="260" y="144" text-anchor="middle" font-size="9" fill="#1e3a8a">Lager / MA</text>
      <text x="160" y="180" text-anchor="middle" font-size="10" fill="#334155" font-weight="600">Chef · Abteilung · wer ist wem unterstellt</text>
    </svg>`,
  };

  function ensureStyles() {
    if (document.getElementById("diag-style")) return;
    const s = document.createElement("style");
    s.id = "diag-style";
    s.textContent = `
.diag-fig{width:100%;height:140px;margin:8px 0 4px;border-radius:12px;background:linear-gradient(180deg,#f8fafc,#eff6ff);
  border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;cursor:zoom-in;position:relative}
.diag-fig:hover{box-shadow:0 6px 18px rgba(37,99,235,.14)}
.diag-fig::after{content:"🔍 tippen";position:absolute;right:8px;bottom:6px;font-size:.68em;font-weight:700;
  background:rgba(15,23,42,.75);color:#fff;padding:2px 7px;border-radius:999px}
.diag-fig svg,.praxis-diag svg,.diag-mini svg,#diagLB .lb-fig svg{width:100%;height:100%;display:block}
.diag-mini{width:58px;height:42px;flex-shrink:0;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;
  display:inline-flex;align-items:center;justify-content:center;cursor:zoom-in;overflow:hidden}
.form-row{display:flex;align-items:center;gap:8px}
.praxis-diag{margin:10px 0 0;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;background:#f8fafc;cursor:zoom-in;position:relative}
.praxis-diag svg{height:160px}
.praxis-diag .cap{position:absolute;left:8px;top:6px;font-size:.7em;font-weight:700;background:rgba(255,255,255,.92);
  border:1px solid #e2e8f0;border-radius:999px;padding:2px 8px;color:#334155;z-index:1}
#diagLB{position:fixed;inset:0;z-index:500;background:rgba(15,23,42,.8);display:none;align-items:center;justify-content:center;padding:16px}
#diagLB.show{display:flex}
#diagLB .lb-card{width:min(580px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:18px;padding:16px;
  box-shadow:0 20px 50px rgba(0,0,0,.35)}
#diagLB .lb-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:8px}
#diagLB .lb-head h3{margin:0;font-size:1.08em;font-weight:800}
#diagLB .lb-head p{margin:4px 0 0;color:#64748b;font-size:.86em}
#diagLB .lb-close{border:none;background:#eff6ff;color:#2563eb;border-radius:10px;padding:8px 12px;font:inherit;font-weight:700;cursor:pointer}
#diagLB .lb-fig{border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;overflow:hidden;min-height:240px}
#diagLB .lb-fig svg{min-height:240px}
#diagLB .lb-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
#diagLB .lb-stat{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:8px 10px}
#diagLB .lb-stat b{display:block;font-size:.72em;color:#64748b;text-transform:uppercase;letter-spacing:.04em}
#diagLB .lb-stat span{display:block;margin-top:2px;font-weight:700;color:#0f172a}
#diagLB .lb-note{margin-top:10px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:10px 12px;font-size:.88em;line-height:1.45;color:#065f46}
@media(max-width:520px){#diagLB .lb-stats{grid-template-columns:1fr}}
`;
    document.head.appendChild(s);
  }

  function ensureLB() {
    let lb = document.getElementById("diagLB");
    if (lb) return lb;
    lb = document.createElement("div");
    lb.id = "diagLB";
    lb.innerHTML = `<div class="lb-card" role="dialog" aria-modal="true">
      <div class="lb-head"><div><h3 id="diagLBTitle">Diagramm</h3><p id="diagLBSub"></p></div>
      <button type="button" class="lb-close" id="diagLBClose">Schließen</button></div>
      <div class="lb-fig" id="diagLBFig"></div>
      <div class="lb-stats" id="diagLBStats"></div>
      <div class="lb-note" id="diagLBNote"></div>
    </div>`;
    document.body.appendChild(lb);
    return lb;
  }

  function openDiag(id) {
    ensureStyles();
    const meta = DIAG_META[id];
    const svg = DIAG_SVG[id];
    if (!meta || !svg) return;
    const lb = ensureLB();
    document.getElementById("diagLBTitle").textContent = meta.title;
    document.getElementById("diagLBSub").textContent = meta.sub + " · " + meta.vi;
    document.getElementById("diagLBFig").innerHTML = svg;
    document.getElementById("diagLBNote").textContent = "💡 " + meta.note;
    document.getElementById("diagLBStats").innerHTML =
      (meta.stats || [])
        .map(([k, v]) => `<div class="lb-stat"><b>${k}</b><span>${v}</span></div>`)
        .join("") +
      (meta.unit
        ? `<div class="lb-stat" style="grid-column:1/-1"><b>Quelle / Beispiel</b><span>${meta.unit}</span></div>`
        : "");
    lb.classList.add("show");
  }

  function closeDiag() {
    const lb = document.getElementById("diagLB");
    if (lb) lb.classList.remove("show");
  }

  function diagFig(id, mini) {
    const svg = DIAG_SVG[id];
    if (!svg) return "";
    if (mini)
      return `<span class="diag-mini" data-open-diag="${id}" title="Beispiel öffnen">${svg}</span>`;
    return `<div class="diag-fig" data-open-diag="${id}" role="button" tabindex="0" title="Mit Zahlen öffnen">${svg}</div>`;
  }

  function fillDiagSlots(root) {
    ensureStyles();
    const scope = root || document;
    scope.querySelectorAll("[data-diag]").forEach((el) => {
      const id = el.getAttribute("data-diag");
      if (id && DIAG_SVG[id]) {
        el.innerHTML = DIAG_SVG[id];
        el.setAttribute("data-open-diag", id);
        el.style.cursor = "zoom-in";
      }
    });
  }

  function showPraxisDiag(container, id) {
    if (!container || !DIAG_SVG[id]) return;
    container.style.display = "block";
    container.setAttribute("data-open-diag", id);
    let hold = container.querySelector(".pd-svg");
    if (!hold) {
      hold = document.createElement("div");
      hold.className = "pd-svg";
      container.appendChild(hold);
    }
    hold.innerHTML = DIAG_SVG[id];
    let cap = container.querySelector(".cap");
    if (!cap) {
      cap = document.createElement("span");
      cap.className = "cap";
      container.prepend(cap);
    }
    const meta = DIAG_META[id];
    cap.textContent = (meta ? meta.title : id) + " · tippen für Zahlen";
  }

  document.addEventListener("click", (e) => {
    const openEl = e.target.closest && e.target.closest("[data-open-diag]");
    if (openEl) {
      e.preventDefault();
      openDiag(openEl.getAttribute("data-open-diag"));
      return;
    }
    if (e.target.id === "diagLB" || e.target.id === "diagLBClose") closeDiag();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDiag();
  });

  // public API + legacy globals expected by deutsch.html
  w.Diagrams = {
    DIAG_META,
    DIAG_SVG,
    openDiag,
    closeDiag,
    diagFig,
    fillDiagSlots,
    showPraxisDiag,
  };
  w.DIAG_META = DIAG_META;
  w.DIAG_SVG = DIAG_SVG;
  w.openDiag = openDiag;
  w.closeDiag = closeDiag;
  w.diagFig = diagFig;
  w.fillSchnellwahlMinis = function () {
    fillDiagSlots(document);
  };
  w.fillDiagSlots = fillDiagSlots;
  w.showPraxisDiag = showPraxisDiag;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      ensureStyles();
      fillDiagSlots(document);
    });
  } else {
    ensureStyles();
    fillDiagSlots(document);
  }
})(window);
