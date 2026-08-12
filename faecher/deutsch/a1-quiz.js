/* Deutsch A1 · Quiz tổng hợp (60 câu: 24 vocab theo unit + 36 grammar theo block) */
window.DEUTSCH_A1_QUIZ = [
  /* ============ VOCAB — Unit 1 (Begrüßung & Vorstellung) ============ */
  { theme: "u1-l1", cat: "Hallo! Ich heiße…", q: "„Guten Morgen“ có nghĩa là gì?",
    opts: ["Chào buổi sáng (đến 10h)", "Chào buổi tối", "Tạm biệt", "Xin lỗi"], a: 0,
    ex: "Guten Morgen = chào buổi sáng (đến 10h)." },
  { theme: "u1-l4", cat: "Zahlen 1–20", q: "Số 16 trong tiếng Đức viết là gì?",
    opts: ["sechzehn", "sechzig", "sechszehn", "sechzent"], a: 0,
    ex: "16 = sechzehn (mất chữ s sau sech)." },
  { type: "fill", theme: "u1-l2", cat: "Woher kommst du?", q: "Ich komme aus ___ (nước Đức).",
    answers: ["deutschland", "Deutschland"], answer: "Deutschland",
    ex: "aus + quốc gia: aus Deutschland." },
  { type: "fill", theme: "u1-l6", cat: "Telefonnummer", q: "Số 0 trong tiếng Đức: ___",
    answers: ["null", "Null"], answer: "null",
    ex: "null = số 0 — số điện thoại đọc từng số." },

  /* ============ VOCAB — Unit 2 (Zahlen & Zeit) ============ */
  { theme: "u2-l1", cat: "Zahlen 21–100", q: "Số 25 trong tiếng Đức viết là gì?",
    opts: ["fünfundzwanzig", "fünfundfünfzig", "zwanzigfünf", "fünfzig"], a: 0,
    ex: "25 = fünf + und + zwanzig → fünfundzwanzig." },
  { theme: "u2-l3", cat: "Die Wochentage", q: "„Thứ bảy“ trong tiếng Đức là gì?",
    opts: ["Samstag", "Sonntag", "Montag", "Mittwoch"], a: 0,
    ex: "Samstag = thứ bảy (ngày 6 trong tuần)." },
  { type: "fill", theme: "u2-l5", cat: "Wie spät ist es?", q: "Es ist ___ neun. (8 giờ 30)",
    answers: ["halb", "Halb"], answer: "halb",
    ex: "halb neun = 8 giờ 30." },
  { type: "fill", theme: "u2-l7", cat: "Mein Tag", q: "Ich ___ um sechs Uhr auf. (aufstehen)",
    answers: ["stehe", "Stehe"], answer: "stehe",
    ex: "aufstehen → ich stehe … auf." },

  /* ============ VOCAB — Unit 3 (Familie & Freunde) ============ */
  { theme: "u3-l1", cat: "Die Familie", q: "„Mẹ“ trong tiếng Đức là gì?",
    opts: ["die Mutter", "der Vater", "die Schwester", "der Bruder"], a: 0,
    ex: "die Mutter = mẹ." },
  { theme: "u3-l3", cat: "Die Verwandten", q: "„Ông (thân mật)“ trong tiếng Đức là gì?",
    opts: ["der Opa", "die Oma", "der Onkel", "der Cousin"], a: 0,
    ex: "Opa = ông (thân mật); Großvater = ông (trang trọng)." },
  { type: "fill", theme: "u3-l5", cat: "Personen beschreiben", q: "Sie hat ___ Haare. (dài)",
    answers: ["lange", "Lange"], answer: "lange",
    ex: "lange Haare = tóc dài." },
  { type: "fill", theme: "u3-l6", cat: "Freunde & Charakter", q: "Mein Freund ist sehr ___ (vui tính).",
    answers: ["lustig", "Lustig"], answer: "lustig",
    ex: "lustig = vui tính." },

  /* ============ VOCAB — Unit 4 (Essen & Trinken) ============ */
  { theme: "u4-l1", cat: "Das Frühstück", q: "„Bánh mì ổ“ trong tiếng Đức là gì?",
    opts: ["das Brot", "das Brötchen", "der Kuchen", "die Butter"], a: 0,
    ex: "das Brot = bánh mì ổ; das Brötchen = bánh mì nhỏ." },
  { theme: "u4-l3", cat: "Getränke", q: "„Đồ uống“ trong tiếng Đức là gì?",
    opts: ["das Getränk", "das Wasser", "der Saft", "die Milch"], a: 0,
    ex: "das Getränk = đồ uống." },
  { type: "fill", theme: "u4-l2", cat: "Obst & Gemüse", q: "Ich kaufe ein ___ Äpfel. (một ki-lô)",
    answers: ["kilo", "Kilo"], answer: "Kilo",
    ex: "ein Kilo Äpfel = một ki-lô táo." },
  { type: "fill", theme: "u4-l5", cat: "Die Rechnung", q: "Die ___, bitte! (hóa đơn)",
    answers: ["rechnung", "Rechnung"], answer: "Rechnung",
    ex: "die Rechnung = hóa đơn." },

  /* ============ VOCAB — Unit 5 (Einkaufen) ============ */
  { theme: "u5-l2", cat: "Was kostet das?", q: "„Đắt“ trong tiếng Đức là gì?",
    opts: ["teuer", "billig", "günstig", "gratis"], a: 0,
    ex: "teuer = đắt; billig = rẻ." },
  { theme: "u5-l4", cat: "Die Kleidung", q: "„Cái quần dài“ trong tiếng Đức là gì?",
    opts: ["die Hose", "das Hemd", "der Rock", "die Jacke"], a: 0,
    ex: "die Hose = quần dài." },
  { type: "fill", theme: "u5-l3", cat: "Die Farben", q: "Das T-Shirt ist ___ (màu xanh dương).",
    answers: ["blau", "Blau"], answer: "blau",
    ex: "blau = màu xanh dương." },
  { type: "fill", theme: "u5-l7", cat: "Reklamation & Umtausch", q: "Ich möchte diese Hose ___ (đổi trả).",
    answers: ["umtauschen", "Umtauschen"], answer: "umtauschen",
    ex: "umtauschen = đổi trả hàng." },

  /* ============ VOCAB — Unit 6 (Zeit & Tagesablauf) ============ */
  { theme: "u6-l2", cat: "Die Tageszeiten", q: "„Buổi tối“ trong tiếng Đức là gì?",
    opts: ["der Abend", "der Morgen", "die Nacht", "der Mittag"], a: 0,
    ex: "der Abend = buổi tối; am Abend = vào buổi tối." },
  { theme: "u6-l5", cat: "Freizeit & Hobbys", q: "Mein Hobby ist ___ machen. (thể thao)",
    opts: ["Sport", "Musik", "Klavier", "Fußball"], a: 0,
    ex: "Sport machen = tập thể thao." },
  { type: "fill", theme: "u6-l6", cat: "Meine Woche", q: "Am ___ gehe ich einkaufen. (thứ bảy)",
    answers: ["samstag", "Samstag"], answer: "Samstag",
    ex: "am Samstag = vào thứ bảy." },
  { type: "fill", theme: "u6-l7", cat: "Ein Tag in Deutschland", q: "___ stehe ich auf und frühstücke. (đầu tiên)",
    answers: ["zuerst", "Zuerst"], answer: "zuerst",
    ex: "zuerst = đầu tiên — mở đầu chuỗi hoạt động." },

  /* ============ GRAMMAR — Block 1: sein & heißen (u1-l1) ============ */
  { theme: "u1-l1", cat: "Hallo! Ich heiße…", q: "Điền động từ sein: Ich ___ Linh.",
    opts: ["bin", "bist", "ist", "sind"], a: 0,
    ex: "ich bin → bin." },
  { type: "fill", theme: "u1-l1", cat: "Hallo! Ich heiße…", q: "Er ___ Paul. (sein)",
    answers: ["ist", "Ist"], answer: "ist",
    ex: "er/sie/es + sein → ist." },

  /* ============ GRAMMAR — Block 2: woher/wo (u1-l2) ============ */
  { theme: "u1-l2", cat: "Woher kommst du?", q: "___ kommst du? — Ich komme aus Vietnam.",
    opts: ["Woher", "Wo", "Wann", "Wer"], a: 0,
    ex: "Woher = hỏi nguồn gốc." },
  { type: "fill", theme: "u1-l2", cat: "Woher kommst du?", q: "Ich wohne ___ Berlin. (ở)",
    answers: ["in", "In"], answer: "in",
    ex: "wohnen in + thành phố." },

  /* ============ GRAMMAR — Block 3: đại từ nhân xưng (u1-l3) ============ */
  { theme: "u1-l3", cat: "Sprachen & Länder", q: "„Các bạn“ (số nhiều) là đại từ nào?",
    opts: ["ihr", "wir", "sie", "er"], a: 0,
    ex: "ihr = các bạn (ngôi số nhiều 2)." },
  { type: "fill", theme: "u1-l3", cat: "Sprachen & Länder", q: "___ bist aus Vietnam.",
    answers: ["du", "Du"], answer: "du",
    ex: "du + bist → du bist." },

  /* ============ GRAMMAR — Block 4: Zahlen + sein, tuổi (u1-l7) ============ */
  { theme: "u1-l7", cat: "Zahlen im Alltag", q: "Nói tuổi dùng động từ nào?",
    opts: ["sein", "haben", "werden", "machen"], a: 0,
    ex: "Tuổi dùng sein: Ich bin … Jahre alt — KHÔNG dùng haben." },
  { type: "fill", theme: "u1-l7", cat: "Zahlen im Alltag", q: "Ich ___ siebzehn Jahre alt.",
    answers: ["bin", "Bin"], answer: "bin",
    ex: "Ich bin … Jahre alt." },

  /* ============ GRAMMAR — Block 5: Zahlen groß/klein (u2-l1) ============ */
  { theme: "u2-l1", cat: "Zahlen 21–100", q: "Số đếm trong „zwanzig Euro“ viết hoa hay thường?",
    opts: ["Thường", "Hoa", "Tùy lúc", "Cả hai"], a: 0,
    ex: "Số đếm làm tính từ viết thường: zwanzig Euro." },
  { type: "fill", theme: "u2-l1", cat: "Zahlen 21–100", q: "21 = ein___zwanzig",
    answers: ["einund", "Einund"], answer: "einund",
    ex: "eins + und + zwanzig → einundzwanzig." },

  /* ============ GRAMMAR — Block 6: W-Fragen (u2-l2) ============ */
  { theme: "u2-l2", cat: "Wie alt bist du?", q: "Hỏi „Khi nào sinh nhật bạn?“ dùng từ nào?",
    opts: ["Wann", "Wer", "Wo", "Was"], a: 0,
    ex: "Wann = khi nào → Wann hast du Geburtstag?" },
  { type: "fill", theme: "u2-l2", cat: "Wie alt bist du?", q: "___ alt bist du?",
    answers: ["wie", "Wie"], answer: "Wie",
    ex: "Wie alt = bao nhiêu tuổi." },

  /* ============ GRAMMAR — Block 7: Datum/Ordinalzahlen (u2-l4) ============ */
  { theme: "u2-l4", cat: "Datum: Tag, Monat, Jahr", q: "Ngày 1.5. nói là der ___ Mai.",
    opts: ["erste", "eins", "ersten", "einundzwanzigste"], a: 0,
    ex: "1–19 thêm -te: der erste Mai." },
  { type: "fill", theme: "u2-l4", cat: "Datum: Tag, Monat, Jahr", q: "Am ___ Juni habe ich Geburtstag. (15.)",
    answers: ["fünfzehnten", "15."], answer: "fünfzehnten",
    ex: "am + số thứ tự: am fünfzehnten Juni." },

  /* ============ GRAMMAR — Block 8: Uhrzeit, um/von…bis (u2-l5) ============ */
  { theme: "u2-l5", cat: "Wie spät ist es?", q: "8:45 nói là Viertel ___ neun.",
    opts: ["vor", "nach", "halb", "um"], a: 0,
    ex: "Viertel vor neun = 8:45." },
  { type: "fill", theme: "u2-l5", cat: "Wie spät ist es?", q: "Ich arbeite ___ 8 bis 12 Uhr.",
    answers: ["von", "Von"], answer: "von",
    ex: "von … bis = khoảng thời gian." },

  /* ============ GRAMMAR — Block 9: Termine, am/um (u2-l6) ============ */
  { theme: "u2-l6", cat: "Termine & Verabredungen", q: "Hẹn „thứ hai“ dùng giới từ nào?",
    opts: ["am", "um", "im", "von"], a: 0,
    ex: "am + thứ: am Montag." },
  { type: "fill", theme: "u2-l6", cat: "Termine & Verabredungen", q: "Der Termin ist ___ Montag.",
    answers: ["am", "Am"], answer: "am",
    ex: "am Montag = vào thứ hai." },

  /* ============ GRAMMAR — Block 10: Trennbare Verben (u2-l7) ============ */
  { theme: "u2-l7", cat: "Mein Tag", q: "Trong „Ich stehe um sechs Uhr ___.“ từ tách cuối câu là?",
    opts: ["auf", "an", "aus", "ab"], a: 0,
    ex: "aufstehen → tiền tố auf rời xuống cuối câu." },
  { type: "fill", theme: "u2-l7", cat: "Mein Tag", q: "Ich ___ um sechs Uhr auf. (aufstehen)",
    answers: ["stehe", "Stehe"], answer: "stehe",
    ex: "aufstehen → ich stehe … auf." },

  /* ============ GRAMMAR — Block 11: Possessivartikel mein/dein (u3-l2) ============ */
  { theme: "u3-l2", cat: "Mein und dein", q: "„Mẹ của tôi“ nói đúng là?",
    opts: ["meine Mutter", "mein Mutter", "deine Mutter", "mein Vater"], a: 0,
    ex: "die Mutter → meine Mutter." },
  { type: "fill", theme: "u3-l2", cat: "Mein und dein", q: "___ Vater heißt Nam. (bố của tôi)",
    answers: ["mein", "Mein"], answer: "mein",
    ex: "der Vater → mein Vater." },

  /* ============ GRAMMAR — Block 12: Berufe mit sein (u3-l4) ============ */
  { theme: "u3-l4", cat: "Berufe", q: "Dạng nữ của „Lehrer“ là gì?",
    opts: ["die Lehrerin", "der Lehrer", "die Lehrerinen", "die Lehreren"], a: 0,
    ex: "Nghề nữ = nghề nam + -in: Lehrerin." },
  { type: "fill", theme: "u3-l4", cat: "Berufe", q: "Was bist du von ___?",
    answers: ["beruf", "Beruf"], answer: "Beruf",
    ex: "von Beruf = làm nghề gì." },

  /* ============ GRAMMAR — Block 13: Akkusativ (u4-l4) ============ */
  { theme: "u4-l4", cat: "Im Restaurant", q: "Ich nehme ___ Salat. (der → Akkusativ)",
    opts: ["den", "die", "das", "der"], a: 0,
    ex: "der → den trong Akkusativ." },
  { type: "fill", theme: "u4-l4", cat: "Im Restaurant", q: "Ich möchte ___ Suppe. (một)",
    answers: ["eine", "Eine"], answer: "eine",
    ex: "die Suppe → eine Suppe." },

  /* ============ GRAMMAR — Block 14: essen/trinken/nehmen (u4-l6) ============ */
  { theme: "u4-l6", cat: "essen, trinken & nehmen", q: "Du ___ Brot. (essen)",
    opts: ["isst", "esse", "esst", "essen"], a: 0,
    ex: "du + essen → du isst (bất quy tắc, ss)." },
  { type: "fill", theme: "u4-l6", cat: "essen, trinken & nehmen", q: "Du ___ Wasser. (trinken)",
    answers: ["trinkst", "Trinkst"], answer: "trinkst",
    ex: "trinken đều đặn: du trinkst." },

  /* ============ GRAMMAR — Block 15: Preise/kosten (u5-l2) ============ */
  { theme: "u5-l2", cat: "Was kostet das?", q: "5,50 € đọc là fünf Euro ___.",
    opts: ["fünfzig", "fünf", "fünfte", "fünf Cent"], a: 0,
    ex: "5,50 € = fünf Euro fünfzig." },
  { type: "fill", theme: "u5-l2", cat: "Was kostet das?", q: "Wie viel ___ die Schuhe? (kosten)",
    answers: ["kosten", "Kosten"], answer: "kosten",
    ex: "Số nhiều (die Schuhe) → kosten." },

  /* ============ GRAMMAR — Block 16: Akkusativ beim Einkaufen (u5-l4) ============ */
  { theme: "u5-l4", cat: "Die Kleidung", q: "Ich suche ___ Hose. (die)",
    opts: ["die", "den", "das", "ein"], a: 0,
    ex: "die → die trong Akkusativ (không đổi)." },
  { type: "fill", theme: "u5-l4", cat: "Die Kleidung", q: "Ich kaufe ___ Mantel. (der)",
    answers: ["den", "Den"], answer: "den",
    ex: "der → den: Ich kaufe den Mantel." },

  /* ============ GRAMMAR — Block 17: kein/keine (u5-l5) ============ */
  { type: "fill", theme: "u5-l5", cat: "Im Geschäft", q: "Ich habe ___ Zeit. (không có)",
    answers: ["keine", "Keine"], answer: "keine",
    ex: "die Zeit → keine Zeit." },

  /* ============ GRAMMAR — Block 18: Präsens đều (u6-l1) ============ */
  { theme: "u6-l1", cat: "Mein Tagesablauf", q: "Du ___ um sieben Uhr. (frühstücken)",
    opts: ["frühstückst", "frühstücken", "frühstückt", "frühstücke"], a: 0,
    ex: "du + -st → frühstückst." },

  /* ============ GRAMMAR — Block 19: Vokalwechsel (u6-l3) ============ */
  { type: "fill", theme: "u6-l3", cat: "Wann machst du was?", q: "Du ___ um zehn Uhr. (schlafen)",
    answers: ["schläfst", "schlaefst"], answer: "schläfst",
    ex: "a→ä ở ngôi du: du schläfst." },

  /* ============ GRAMMAR — Block 20: Trennbare im Alltag (u6-l4) ============ */
  { theme: "u6-l4", cat: "Trennbare Verben im Alltag", q: "Ich ___ dich heute Abend ___. (anrufen)",
    opts: ["rufe … an", "anrufe …", "rufe … auf", "rufe … ab"], a: 0,
    ex: "anrufen → ich rufe … an." }
];
