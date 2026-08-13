/* Deutsch A1 · Units 1–4 (chuẩn form ont-thi-fach; đủ .term → flashcards tự sinh) */
window.DEUTSCH_A1 = {
  level: "a1",
  badge: "A1",
  code: "DE A1",
  title: "Deutsch A1",
  units: [
    {
      id: "u1",
      title: "Begrüßung & Vorstellung",
      desc: "Hallo · Namen · Länder und Sprachen · Zahlen 1–20",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
      lektionen: [
        {
          id: "u1-l1",
          name: "Hallo! Ich heiße…",
          content: `<h2>Hallo! Ich heiße …</h2>
<div class="hint">Chào hỏi · giới thiệu tên · từ lịch sự Sie vs du</div>
<h3 class="sub">1. Chào hỏi</h3>
<ul>
  <li><span class="term" data-de="Guten Morgen" data-vi="chào buổi sáng (đến 10h)">Guten Morgen</span>!</li>
  <li><span class="term" data-de="Guten Tag" data-vi="chào buổi chiều/ngày (chính thức)">Guten Tag</span>!</li>
  <li><span class="term" data-de="Guten Abend" data-vi="chào buổi tối">Guten Abend</span>!</li>
  <li><span class="term" data-de="Hallo" data-vi="xin chào (thân mật)">Hallo</span>! · <span class="term" data-de="Tschüss" data-vi="tạm biệt (thân mật)">Tschüss</span>! · <span class="term" data-de="Auf Wiedersehen" data-vi="tạm biệt (chính thức)">Auf Wiedersehen</span>!</li>
</ul>
<h3 class="sub">2. Giới thiệu tên</h3>
<p>Ich <span class="term" data-de="heißen" data-vi="tên là">heiße</span> Anna. / <span class="term" data-de="mein Name" data-vi="tên của tôi">Mein Name</span> ist Anna.</p>
<p>Wie <span class="term" data-de="heißen" data-vi="tên là">heißen</span> Sie? (lịch sự) · Wie heißt du? (thân mật)</p>
<h3 class="sub">3. Sie oder du?</h3>
<table>
  <tr><th>Sie (lịch sự)</th><td>khách hàng, người lạ, cấp trên, người lớn tuổi</td></tr>
  <tr><th>du (thân mật)</th><td>bạn bè, đồng nghiệp thân, trẻ em</td></tr>
</table>
<div class="note">Schnellmerk: <b>heißen</b> chia: ich heiße · du heißt · er/sie/es heißt · Sie heißen.</div>
<h3 class="sub">4. Luyện tập giao tiếp</h3>
<ul>
  <li><span class="term" data-de="Wie geht es dir?" data-vi="Bạn khỏe không?">Wie geht es dir?</span> — <span class="term" data-de="Danke, gut" data-vi="Cảm ơn, tôi khỏe">Danke, gut</span>.</li>
  <li><span class="term" data-de="Danke" data-vi="cảm ơn">Danke</span>! · <span class="term" data-de="Bitte" data-vi="không có gì / xin mời">Bitte</span>! · <span class="term" data-de="Entschuldigung" data-vi="xin lỗi">Entschuldigung</span>!</li>
  <li><span class="term" data-de="Es freut mich" data-vi="Rất vui được gặp bạn">Es freut mich</span>.</li>
</ul>`,
          grammar: [
            {
              id: "a1-sein-heissen",
              title: "Động từ sein & heißen (hiện tại)",
              rule: "<p><b>sein</b>: ich bin · du bist · er/sie/es ist · wir sind · ihr seid · sie/Sie sind</p><p><b>heißen</b>: ich heiße · du heißt · er/sie/es heißt · wir heißen · ihr heißt · sie/Sie heißen</p>",
              examples: ["Ich bin Linh.", "Er heißt Paul.", "Wir sind aus Vietnam."],
              exercise: { type: "fill", theme: "u1-l1", cat: "sein/heißen", q: "Ich ___ Linh. (sein)", answers: ["bin"], answer: "bin", ex: "Ich bin → bin" }
            }
          ],
          listen: [
            { id: "u1-l1-l1", text: "Guten Tag! Ich heiße Anna. Wie heißen Sie?", tip: "Nghe chú ý ngữ điệu câu hỏi", slow: true },
            { id: "u1-l1-l2", text: "Hallo, ich bin Paul. Und du?" }
          ],
          speak: [
            { id: "u1-l1-s1", prompt: "Chào buổi sáng và giới thiệu tên bạn", model: "Guten Morgen! Ich heiße …", hint: "Gu·ten · Mor·gen · ich · hei·ße" }
          ]
        },
        {
          id: "u1-l2",
          name: "Woher kommst du?",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/></svg>`,
          desc: "Nguồn gốc · quốc tịch · kommen & wohnen",
          content: `<h2>Woher kommst du?</h2>
<div class="hint">Hỏi nguồn gốc · nơi sống · quốc tịch</div>
<h3 class="sub">1. Woher kommst du?</h3>
<ul>
  <li><span class="term" data-de="Woher kommst du?" data-vi="Bạn từ đâu đến? (thân mật)">Woher kommst du?</span> — Ich komme aus <span class="term" data-de="Vietnam" data-vi="Việt Nam">Vietnam</span>.</li>
  <li><span class="term" data-de="Woher kommen Sie?" data-vi="Anh/chị từ đâu đến? (lịch sự)">Woher kommen Sie?</span> — Ich komme aus <span class="term" data-de="Deutschland" data-vi="nước Đức">Deutschland</span>.</li>
  <li><span class="term" data-de="aus" data-vi="từ (quốc gia, thành phố)">aus</span> + quốc gia: aus Vietnam · aus China · aus Frankreich</li>
  <li><span class="term" data-de="woher" data-vi="từ đâu (hỏi nguồn gốc)">woher</span> = wo + her: hỏi nơi đến từ</li>
</ul>
<h3 class="sub">2. Wo wohnst du?</h3>
<ul>
  <li><span class="term" data-de="wo" data-vi="ở đâu">Wo</span> <span class="term" data-de="wohnen" data-vi="sống, ở">wohnst</span> du? — Ich wohne in <span class="term" data-de="Berlin" data-vi="Berlin (thủ đô Đức)">Berlin</span>.</li>
  <li>Ich wohne in der <span class="term" data-de="die Marktstraße" data-vi="phố Chợ">Marktstraße</span> 12.</li>
  <li><span class="term" data-de="die Adresse" data-vi="địa chỉ">Adresse</span> = <span class="term" data-de="die Straße" data-vi="đường phố">Straße</span> + <span class="term" data-de="die Hausnummer" data-vi="số nhà">Hausnummer</span></li>
</ul>
<h3 class="sub">3. Quốc tịch</h3>
<table>
  <tr><th>Land</th><th>Quốc tịch (nam / nữ)</th></tr>
  <tr><td>Vietnam</td><td><span class="term" data-de="Vietnamese" data-vi="người Việt Nam (nam)">Vietnamese</span> / <span class="term" data-de="Vietnamesin" data-vi="người Việt Nam (nữ)">Vietnamesin</span></td></tr>
  <tr><td>Deutschland</td><td><span class="term" data-de="Deutscher" data-vi="người Đức (nam)">Deutscher</span> / <span class="term" data-de="Deutsche" data-vi="người Đức (nữ)">Deutsche</span></td></tr>
  <tr><td>Frankreich</td><td><span class="term" data-de="Franzose" data-vi="người Pháp (nam)">Franzose</span> / <span class="term" data-de="Französin" data-vi="người Pháp (nữ)">Französin</span></td></tr>
  <tr><td>Spanien</td><td><span class="term" data-de="Spanier" data-vi="người Tây Ban Nha (nam)">Spanier</span> / <span class="term" data-de="Spanierin" data-vi="người Tây Ban Nha (nữ)">Spanierin</span></td></tr>
</table>
<div class="note">Schnellmerk: Ich bin <b>Vietnamese</b> = Ich <b>komme aus</b> Vietnam. Nguồn gốc hỏi bằng <b>woher</b>, nơi sống hỏi bằng <b>wo</b>.</div>`,
          grammar: [
            {
              id: "a1-woher-wo",
              title: "Woher/Wo + kommen & wohnen",
              rule: "<p><b>Woher kommst du?</b> — Ich komme <b>aus</b> Vietnam. (hỏi nguồn gốc)</p><p><b>Wo wohnst du?</b> — Ich wohne <b>in</b> Berlin. (hỏi nơi sống)</p><p>kommen: ich komme · du kommst · er/sie/es kommt · wir kommen · ihr kommt · sie/Sie kommen — wohnen: ich wohne · du wohnst · er/sie/es wohnt · wir wohnen · ihr wohnt · sie/Sie wohnen</p>",
              examples: ["Woher kommst du? — Ich komme aus Vietnam.", "Wo wohnst du? — Ich wohne in Berlin.", "Frau Müller wohnt in Hamburg."],
              exercise: { type: "fill", theme: "u1-l2", cat: "woher/wo", q: "___ kommst du? — Ich komme aus Vietnam.", answers: ["woher"], answer: "Woher", ex: "Hỏi nguồn gốc → Woher" }
            }
          ],
          listen: [
            { id: "u1-l2-l1", text: "Woher kommst du? — Ich komme aus Vietnam.", tip: "Nghe ngữ điệu câu hỏi lên cuối câu", slow: true },
            { id: "u1-l2-l2", text: "Wo wohnst du? — Ich wohne in Berlin." }
          ],
          speak: [
            { id: "u1-l2-s1", prompt: "Hỏi 'Bạn từ đâu đến?'", model: "Woher kommst du?", hint: "Wo·her · kommst · du" },
            { id: "u1-l2-s2", prompt: "Trả lời 'Tôi đến từ Việt Nam'", model: "Ich komme aus Vietnam.", hint: "Ich · komme · aus · Viet·nam" }
          ]
        },
        {
          id: "u1-l3",
          name: "Sprachen & Länder",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
          desc: "Ngôn ngữ · ich spreche … · đại từ nhân xưng",
          content: `<h2>Sprachen & Länder</h2>
<div class="hint">Ngôn ngữ · ich spreche … · đại từ nhân xưng</div>
<h3 class="sub">1. Ngôn ngữ</h3>
<ul>
  <li>Ich <span class="term" data-de="sprechen" data-vi="nói">spreche</span> <span class="term" data-de="Vietnamesisch" data-vi="tiếng Việt">Vietnamesisch</span> und <span class="term" data-de="Deutsch" data-vi="tiếng Đức">Deutsch</span>.</li>
  <li><span class="term" data-de="Sprichst du Deutsch?" data-vi="Bạn nói tiếng Đức không?">Sprichst du Deutsch?</span> — Ja, ein <span class="term" data-de="bisschen" data-vi="một chút">bisschen</span>.</li>
  <li>Ich <span class="term" data-de="lernen" data-vi="học">lerne</span> Deutsch in der <span class="term" data-de="die Schule" data-vi="trường học">Schule</span>.</li>
  <li>Ich spreche auch <span class="term" data-de="Englisch" data-vi="tiếng Anh">Englisch</span> und <span class="term" data-de="Französisch" data-vi="tiếng Pháp">Französisch</span>.</li>
</ul>
<h3 class="sub">2. Đại từ nhân xưng</h3>
<table>
  <tr><th>Ngôi</th><th>Đại từ</th><th>Ví dụ (sein)</th></tr>
  <tr><td>số ít 1</td><td><span class="term" data-de="ich" data-vi="tôi">ich</span></td><td>ich bin</td></tr>
  <tr><td>số ít 2</td><td><span class="term" data-de="du" data-vi="bạn (thân mật)">du</span></td><td>du bist</td></tr>
  <tr><td>số ít 3</td><td><span class="term" data-de="er" data-vi="anh ấy">er</span> / <span class="term" data-de="sie" data-vi="cô ấy">sie</span> / <span class="term" data-de="es" data-vi="nó">es</span></td><td>er ist</td></tr>
  <tr><td>số nhiều 1</td><td><span class="term" data-de="wir" data-vi="chúng tôi">wir</span></td><td>wir sind</td></tr>
  <tr><td>số nhiều 2</td><td><span class="term" data-de="ihr" data-vi="các bạn">ihr</span></td><td>ihr seid</td></tr>
  <tr><td>số nhiều 3</td><td><span class="term" data-de="sie" data-vi="họ">sie</span> / <span class="term" data-de="Sie" data-vi="ngài, quý vị (lịch sự)">Sie</span></td><td>sie sind</td></tr>
</table>
<div class="note">Schnellmerk: <b>Sie</b> (lịch sự) luôn viết hoa — khác <b>sie</b> (cô ấy / họ) viết thường. Đại từ <b>sie</b> (cô ấy) chia động từ như <b>er/es</b>.</div>`,
          grammar: [
            {
              id: "a1-pronomen",
              title: "Đại từ nhân xưng",
              rule: "<p>Số ít: <b>ich</b> (tôi) · <b>du</b> (bạn) · <b>er/sie/es</b> (anh ấy/cô ấy/nó) — Số nhiều: <b>wir</b> (chúng tôi) · <b>ihr</b> (các bạn) · <b>sie/Sie</b> (họ / quý vị)</p><p>Chia <b>sein</b>: ich <b>bin</b> · du <b>bist</b> · er/sie/es <b>ist</b> · wir <b>sind</b> · ihr <b>seid</b> · sie/Sie <b>sind</b></p>",
              examples: ["Ich bin Schüler.", "Sie ist Lehrerin.", "Wir sind aus Vietnam."],
              exercise: { type: "fill", theme: "u1-l3", cat: "Pronomen", q: "___ bist aus Vietnam. (du)", answers: ["du"], answer: "du", ex: "bist đi với du" }
            }
          ],
          listen: [
            { id: "u1-l3-l1", text: "Ich spreche Vietnamesisch und ein bisschen Deutsch.", tip: "Nghe rồi đếm số ngôn ngữ được nhắc đến", slow: true },
            { id: "u1-l3-l2", text: "Sprichst du Deutsch? — Ja, ich lerne Deutsch in der Schule." }
          ]
        },
        {
          id: "u1-l4",
          name: "Zahlen 1–20",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3 8 21"/><path d="M16 3l-2 18"/></svg>`,
          desc: "Đếm 1–20 · cách đọc số",
          content: `<h2>Zahlen 1–20</h2>
<div class="hint">Đếm từ 1 đến 20 · mẹo nhớ</div>
<h3 class="sub">1. Từ 1 đến 10</h3>
<ul>
  <li><span class="term" data-de="eins" data-vi="một">1 eins</span> · <span class="term" data-de="zwei" data-vi="hai">2 zwei</span> · <span class="term" data-de="drei" data-vi="ba">3 drei</span> · <span class="term" data-de="vier" data-vi="bốn">4 vier</span> · <span class="term" data-de="fünf" data-vi="năm">5 fünf</span></li>
  <li><span class="term" data-de="sechs" data-vi="sáu">6 sechs</span> · <span class="term" data-de="sieben" data-vi="bảy">7 sieben</span> · <span class="term" data-de="acht" data-vi="tám">8 acht</span> · <span class="term" data-de="neun" data-vi="chín">9 neun</span> · <span class="term" data-de="zehn" data-vi="mười">10 zehn</span></li>
</ul>
<h3 class="sub">2. Từ 11 đến 20</h3>
<ul>
  <li><span class="term" data-de="elf" data-vi="mười một">11 elf</span> · <span class="term" data-de="zwölf" data-vi="mười hai">12 zwölf</span> · <span class="term" data-de="dreizehn" data-vi="mười ba">13 dreizehn</span> · <span class="term" data-de="vierzehn" data-vi="mười bốn">14 vierzehn</span> · <span class="term" data-de="fünfzehn" data-vi="mười lăm">15 fünfzehn</span></li>
  <li><span class="term" data-de="sechzehn" data-vi="mười sáu">16 sechzehn</span> · <span class="term" data-de="siebzehn" data-vi="mười bảy">17 siebzehn</span> · <span class="term" data-de="achtzehn" data-vi="mười tám">18 achtzehn</span> · <span class="term" data-de="neunzehn" data-vi="mười chín">19 neunzehn</span> · <span class="term" data-de="zwanzig" data-vi="hai mươi">20 zwanzig</span></li>
</ul>
<h3 class="sub">3. Mẹo nhớ</h3>
<div class="note">Schnellmerk: 13–19 = hàng đơn vị + <b>zehn</b> (mười): drei → drei<b>zehn</b>. Riêng 16 = sech<b>zehn</b> (mất s) và 17 = sieb<b>zehn</b> (mất en).</div>
<div class="note">Schnellmerk: 11 <b>elf</b> và 12 <b>zwölf</b> là hai số đặc biệt, không theo quy tắc.</div>`,
          listen: [
            { id: "u1-l4-l1", text: "eins, zwei, drei, vier, fünf", tip: "Đếm chậm, nghe rõ từng số", slow: true },
            { id: "u1-l4-l2", text: "elf, zwölf, dreizehn, vierzehn, fünfzehn" },
            { id: "u1-l4-l3", text: "sechzehn, siebzehn, achtzehn, neunzehn, zwanzig" }
          ],
          speak: [
            { id: "u1-l4-s1", prompt: "Đếm từ 1 đến 10", model: "eins zwei drei vier fünf sechs sieben acht neun zehn", hint: "eins · zwei · drei · vier · fünf · sechs · sieben · acht · neun · zehn" }
          ]
        },
        {
          id: "u1-l5",
          name: "Das Alphabet",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
          desc: "Bảng chữ cái · buchstabieren",
          content: `<h2>Das Alphabet</h2>
<div class="hint">Bảng chữ cái · đánh vần (buchstabieren)</div>
<h3 class="sub">1. Bảng chữ cái</h3>
<ul>
  <li><span class="term" data-de="das A" data-vi="chữ A">A</span> (a) · <span class="term" data-de="das B" data-vi="chữ B">B</span> (be) · <span class="term" data-de="das C" data-vi="chữ C">C</span> (tse) · <span class="term" data-de="das D" data-vi="chữ D">D</span> (de) · <span class="term" data-de="das E" data-vi="chữ E">E</span> (e)</li>
  <li><span class="term" data-de="das F" data-vi="chữ F">F</span> (ef) · <span class="term" data-de="das G" data-vi="chữ G">G</span> (ge) · <span class="term" data-de="das H" data-vi="chữ H">H</span> (ha) · <span class="term" data-de="das I" data-vi="chữ I">I</span> (i) · <span class="term" data-de="das J" data-vi="chữ J">J</span> (jot)</li>
  <li><span class="term" data-de="das K" data-vi="chữ K">K</span> (ka) · <span class="term" data-de="das L" data-vi="chữ L">L</span> (el) · <span class="term" data-de="das M" data-vi="chữ M">M</span> (em) · <span class="term" data-de="das N" data-vi="chữ N">N</span> (en) · <span class="term" data-de="das O" data-vi="chữ O">O</span> (o)</li>
  <li><span class="term" data-de="das P" data-vi="chữ P">P</span> (pe) · <span class="term" data-de="das Q" data-vi="chữ Q">Q</span> (ku) · <span class="term" data-de="das R" data-vi="chữ R">R</span> (er) · <span class="term" data-de="das S" data-vi="chữ S">S</span> (es) · <span class="term" data-de="das T" data-vi="chữ T">T</span> (te)</li>
  <li><span class="term" data-de="das U" data-vi="chữ U">U</span> (u) · <span class="term" data-de="das V" data-vi="chữ V">V</span> (vau) · <span class="term" data-de="das W" data-vi="chữ W">W</span> (we) · <span class="term" data-de="das X" data-vi="chữ X">X</span> (iks) · <span class="term" data-de="das Y" data-vi="chữ Y">Y</span> (üpsilon)</li>
  <li><span class="term" data-de="das Z" data-vi="chữ Z">Z</span> (tset) · <span class="term" data-de="das Ä" data-vi="chữ Ä">Ä</span> (ä) · <span class="term" data-de="das Ö" data-vi="chữ Ö">Ö</span> (ö) · <span class="term" data-de="das Ü" data-vi="chữ Ü">Ü</span> (ü) · <span class="term" data-de="das ß" data-vi="chữ ß (ss)">ß</span> (Eszett)</li>
</ul>
<h3 class="sub">2. Đánh vần (buchstabieren)</h3>
<ul>
  <li><span class="term" data-de="buchstabieren" data-vi="đánh vần">Buchstabieren</span> Sie bitte! (lịch sự) · Buchstabiere bitte! (thân mật)</li>
  <li><span class="term" data-de="Wie schreibt man das?" data-vi="Từ đó viết thế nào?">Wie schreibt man das?</span> — A wie Anna, B wie Berta.</li>
  <li><span class="term" data-de="das Wort" data-vi="từ">Wort</span> · <span class="term" data-de="der Name" data-vi="tên">Name</span> · <span class="term" data-de="noch einmal" data-vi="lại một lần nữa">Noch einmal</span>, bitte.</li>
</ul>
<div class="note">Schnellmerk: Khi đánh vần dùng tên mẫu: <b>A wie Anna</b>, <b>B wie Berta</b> — tránh nhầm khi nghe qua điện thoại.</div>`,
          listen: [
            { id: "u1-l5-l1", text: "A wie Anna, B wie Berta, C wie Cäsar", tip: "Nghe cách đọc từng chữ cái", slow: true },
            { id: "u1-l5-l2", text: "Wie schreibt man das? — M-U-E-L-L-E-R" }
          ],
          speak: [
            { id: "u1-l5-s1", prompt: "Đánh vần tên LINH bằng tiếng Đức", model: "L I N H", hint: "L · I · N · H" }
          ]
        },
        {
          id: "u1-l6",
          name: "Telefonnummer",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
          desc: "Hỏi và nói số điện thoại",
          content: `<h2>Telefonnummer</h2>
<div class="hint">Hỏi số điện thoại · đọc số theo nhóm</div>
<h3 class="sub">1. Hỏi số điện thoại</h3>
<ul>
  <li><span class="term" data-de="Wie ist deine Telefonnummer?" data-vi="Số điện thoại của bạn là gì? (thân mật)">Wie ist deine Telefonnummer?</span> — <span class="term" data-de="Meine Telefonnummer ist …" data-vi="Số điện thoại của tôi là…">Meine Telefonnummer ist</span> 0151 234 56 78.</li>
  <li><span class="term" data-de="Wie ist Ihre Telefonnummer?" data-vi="Số điện thoại của anh/chị là gì? (lịch sự)">Wie ist Ihre Telefonnummer?</span></li>
  <li><span class="term" data-de="die Handynummer" data-vi="số điện thoại di động">Handynummer</span> · <span class="term" data-de="die Nummer" data-vi="số">Nummer</span> · <span class="term" data-de="null" data-vi="số 0">null</span></li>
</ul>
<h3 class="sub">2. Đọc số theo nhóm</h3>
<ul>
  <li>0151 → null <b>eins</b> <b>fünf</b> <b>eins</b> — đọc từng chữ số một, không gộp</li>
  <li>234 → <span class="term" data-de="zwei drei vier" data-vi="hai ba bốn">zwei drei vier</span>: đọc rời từng số</li>
  <li>00 → <span class="term" data-de="Doppel-Null" data-vi="hai số 0 liền nhau">Doppel-Null</span>: 0049 → null <b>Doppel-Null</b> vier neun</li>
</ul>
<h3 class="sub">3. Mẹo và luyện tập</h3>
<div class="note">Schnellmerk: Số điện thoại luôn đọc <b>từng chữ số</b>: 0176 55 22 33 → null eins sieben sechs, fünf fünf, zwei zwei, drei drei.</div>
<ul>
  <li><span class="term" data-de="die Vorwahl" data-vi="mã vùng">Vorwahl</span>: 030 (Berlin) · 089 (München) · 040 (Hamburg)</li>
  <li>E-Mail: <span class="term" data-de="die E-Mail-Adresse" data-vi="địa chỉ email">E-Mail-Adresse</span> — <span class="term" data-de="das At-Zeichen" data-vi="dấu @">@</span> đọc là "at", <span class="term" data-de="der Punkt" data-vi="dấu chấm">Punkt</span> đọc là "Punkt".</li>
</ul>`,
          listen: [
            { id: "u1-l6-l1", text: "Wie ist deine Telefonnummer? — Meine Telefonnummer ist null eins fünf eins.", tip: "Chú ý đọc từng số một", slow: true },
            { id: "u1-l6-l2", text: "Meine Handynummer ist null eins sieben sechs fünf fünf zwei zwei drei drei." }
          ],
          speak: [
            { id: "u1-l6-s1", prompt: "Đọc số điện thoại 0151 234 56 78", model: "null eins fünf eins zwei drei vier fünf sechs sieben acht", hint: "null · eins · fünf · eins · zwei · drei · vier …" }
          ]
        },
        {
          id: "u1-l7",
          name: "Zahlen im Alltag",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`,
          desc: "Ôn tập số · tuổi · số nhà · giá cả",
          content: `<h2>Zahlen im Alltag</h2>
<div class="hint">Số trong cuộc sống · tuổi · số nhà · giá cả</div>
<h3 class="sub">1. Tuổi</h3>
<ul>
  <li><span class="term" data-de="Wie alt bist du?" data-vi="Bạn bao nhiêu tuổi?">Wie alt bist du?</span> — Ich bin <span class="term" data-de="siebzehn" data-vi="mười bảy">siebzehn</span> <span class="term" data-de="Jahre alt" data-vi="tuổi">Jahre alt</span>.</li>
  <li><span class="term" data-de="Wie alt sind Sie?" data-vi="Anh/chị bao nhiêu tuổi? (lịch sự)">Wie alt sind Sie?</span> — Ich bin <span class="term" data-de="zwanzig" data-vi="hai mươi">zwanzig</span> Jahre alt.</li>
</ul>
<h3 class="sub">2. Số trong các tình huống</h3>
<table>
  <tr><th>Deutsch</th><th>Tiếng Việt</th></tr>
  <tr><td>Hausnummer <span class="term" data-de="zwölf" data-vi="mười hai">zwölf</span></td><td>số nhà 12</td></tr>
  <tr><td>Buslinie <span class="term" data-de="fünf" data-vi="năm">fünf</span></td><td>tuyến xe buýt 5</td></tr>
  <tr><td><span class="term" data-de="der Preis" data-vi="giá cả">Preis</span>: <span class="term" data-de="zwei Euro" data-vi="hai euro">zwei Euro</span></td><td>giá 2 euro</td></tr>
  <tr><td>Zimmer <span class="term" data-de="drei" data-vi="ba">drei</span></td><td>phòng số 3</td></tr>
</table>
<h3 class="sub">3. Đếm xuôi và đếm lùi</h3>
<ul>
  <li><span class="term" data-de="vorwärts zählen" data-vi="đếm xuôi">Vorwärts zählen</span>: eins, zwei, drei, vier, fünf …</li>
  <li><span class="term" data-de="zurückzählen" data-vi="đếm lùi">Zurückzählen</span>: zehn, neun, acht, sieben, sechs …</li>
</ul>
<div class="note">Schnellmerk: Tuổi luôn dùng <b>sein</b>: Ich bin 17 Jahre alt. Không nói "Ich habe 17 Jahre".</div>`,
          grammar: [
            {
              id: "a1-zahlen-alt",
              title: "Zahlen + sein: tuổi và số đếm",
              rule: "<p>Nói tuổi: <b>Wie alt bist du?</b> — Ich <b>bin</b> … Jahre alt. (dùng sein, không dùng haben)</p><p>Số điện thoại đọc <b>từng số</b> (null eins fünf), số đếm thì gộp (fünfzehn = 15).</p>",
              examples: ["Wie alt bist du? — Ich bin siebzehn Jahre alt.", "Wie alt sind Sie? — Ich bin zwanzig Jahre alt.", "Meine Telefonnummer ist null eins fünf eins."],
              exercise: { type: "fill", theme: "u1-l7", cat: "Zahlen", q: "Ich ___ siebzehn Jahre alt. (sein)", answers: ["bin"], answer: "bin", ex: "Ich bin → bin" }
            }
          ],
          listen: [
            { id: "u1-l7-l1", text: "Wie alt bist du? — Ich bin siebzehn Jahre alt.", tip: "Nghe số tuổi trong câu trả lời", slow: true },
            { id: "u1-l7-l2", text: "Ich wohne in der Marktstraße zwölf." }
          ],
          speak: [
            { id: "u1-l7-s1", prompt: "Hỏi tuổi một người bạn", model: "Wie alt bist du?", hint: "Wie · alt · bist · du" }
          ]
        }
      ]
    },
    {
      id: "u2",
      title: "Zahlen & Zeit",
      desc: "Zahlen 21–100 · Uhrzeit · Datum · Termine",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`,
      lektionen: [
        {
          id: "u2-l1",
          name: "Zahlen 21–100",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3 8 21"/><path d="M16 3l-2 18"/></svg>`,
          desc: "Số 21–100 · quy tắc đọc số gộp",
          content: `<h2>Zahlen 21–100</h2>
<div class="hint">Số 21–100 · quy tắc: đơn vị + und + chục</div>
<h3 class="sub">1. Từ 21 đến 29</h3>
<ul>
  <li><span class="term" data-de="einundzwanzig" data-vi="hai mươi mốt">21 einundzwanzig</span> = eins + und + zwanzig</li>
  <li><span class="term" data-de="zweiundzwanzig" data-vi="hai mươi hai">22 zweiundzwanzig</span> · <span class="term" data-de="dreiundzwanzig" data-vi="hai mươi ba">23 dreiundzwanzig</span> · <span class="term" data-de="vierundzwanzig" data-vi="hai mươi tư">24 vierundzwanzig</span></li>
  <li><span class="term" data-de="fünfundzwanzig" data-vi="hai mươi lăm">25 fünfundzwanzig</span> · <span class="term" data-de="sechsundzwanzig" data-vi="hai mươi sáu">26 sechsundzwanzig</span> · <span class="term" data-de="siebenundzwanzig" data-vi="hai mươi bảy">27 siebenundzwanzig</span></li>
  <li><span class="term" data-de="achtundzwanzig" data-vi="hai mươi tám">28 achtundzwanzig</span> · <span class="term" data-de="neunundzwanzig" data-vi="hai mươi chín">29 neunundzwanzig</span></li>
</ul>
<h3 class="sub">2. Chục tròn</h3>
<ul>
  <li><span class="term" data-de="dreißig" data-vi="ba mươi">30 dreißig</span> · <span class="term" data-de="vierzig" data-vi="bốn mươi">40 vierzig</span> · <span class="term" data-de="fünfzig" data-vi="năm mươi">50 fünfzig</span> · <span class="term" data-de="sechzig" data-vi="sáu mươi">60 sechzig</span></li>
  <li><span class="term" data-de="siebzig" data-vi="bảy mươi">70 siebzig</span> · <span class="term" data-de="achtzig" data-vi="tám mươi">80 achtzig</span> · <span class="term" data-de="neunzig" data-vi="chín mươi">90 neunzig</span> · <span class="term" data-de="hundert" data-vi="một trăm">100 hundert</span></li>
</ul>
<h3 class="sub">3. Ví dụ</h3>
<table>
  <tr><th>Zahl</th><th>Deutsch</th></tr>
  <tr><td>31</td><td>ein<b>unddreißig</b> (eins + und + dreißig)</td></tr>
  <tr><td>45</td><td>fünf<b>undvierzig</b></td></tr>
  <tr><td>67</td><td>sieben<b>undsechzig</b></td></tr>
</table>
<div class="note">Schnellmerk: 21–99 = <b>đơn vị trước, chục sau</b> + und: 25 = fünf<b>und</b>zwanzig (khác tiếng Việt "hai mươi lăm").</div>
<div class="note">Schnellmerk: Chú ý ba chục bất quy tắc: 30 drei<b>ßig</b> · 60 sech<b>zig</b> · 70 sieb<b>zig</b>.</div>`,
          grammar: [
            {
              id: "a1-zahlen-gross-klein",
              title: "Zahlen: groß oder klein?",
              rule: "<p>Số đếm viết <b>thường (klein)</b> khi làm số đếm/tính từ: zwanzig Euro, fünf Bücher.</p><p>Viết <b>hoa (groß)</b> khi là danh từ (điểm số, kết quả): die <b>Eins</b> (điểm 1), eine <b>Fünf</b> trong Schule.</p><p>Số 1 đứng một mình là <b>eins</b>; trong số ghép mất chữ s: <b>ein</b>undzwanzig (21).</p>",
              examples: ["Ich habe fünf Bücher.", "Er hat eine Eins bekommen.", "Das kostet zwanzig Euro."],
              exercise: { type: "fill", theme: "u2-l1", cat: "Zahlen", q: "21 = ein___zwanzig", answers: ["einund"], answer: "einund", ex: "21 = eins + und + zwanzig → einundzwanzig" }
            }
          ],
          listen: [
            { id: "u2-l1-l1", text: "einundzwanzig, zweiundzwanzig, dreiundzwanzig", tip: "Nghe phần đuôi -undzwanzig", slow: true },
            { id: "u2-l1-l2", text: "dreißig, vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig, hundert" }
          ]
        },
        {
          id: "u2-l2",
          name: "Wie alt bist du?",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>`,
          desc: "Tuổi · sinh nhật · W-Fragen",
          content: `<h2>Wie alt bist du?</h2>
<div class="hint">Hỏi tuổi · nói tuổi · sinh nhật</div>
<h3 class="sub">1. Hỏi và trả lời tuổi</h3>
<ul>
  <li><span class="term" data-de="Wie alt bist du?" data-vi="Bạn bao nhiêu tuổi?">Wie alt bist du?</span> — Ich bin <span class="term" data-de="sechzehn" data-vi="mười sáu">sechzehn</span> <span class="term" data-de="Jahre alt" data-vi="tuổi">Jahre alt</span>.</li>
  <li><span class="term" data-de="Wie alt sind Sie?" data-vi="Anh/chị bao nhiêu tuổi? (lịch sự)">Wie alt sind Sie?</span> — Ich bin <span class="term" data-de="vierzig" data-vi="bốn mươi">vierzig</span> Jahre alt.</li>
  <li><span class="term" data-de="Wie alt ist er?" data-vi="Anh ấy bao nhiêu tuổi?">Wie alt ist er?</span> — Er ist <span class="term" data-de="achtundzwanzig" data-vi="hai mươi tám">achtundzwanzig</span> Jahre alt.</li>
</ul>
<h3 class="sub">2. Sinh nhật</h3>
<ul>
  <li><span class="term" data-de="der Geburtstag" data-vi="sinh nhật">Geburtstag</span>: Ich habe am <span class="term" data-de="15. Juni" data-vi="ngày 15 tháng 6">15. Juni</span> Geburtstag.</li>
  <li><span class="term" data-de="Wann hast du Geburtstag?" data-vi="Khi nào sinh nhật bạn?">Wann hast du Geburtstag?</span></li>
  <li><span class="term" data-de="das Geburtstagsgeschenk" data-vi="quà sinh nhật">Geburtstagsgeschenk</span> · <span class="term" data-de="die Geburtstagsparty" data-vi="tiệc sinh nhật">Geburtstagsparty</span> · <span class="term" data-de="der Kuchen" data-vi="bánh ga-tô">Kuchen</span></li>
  <li><span class="term" data-de="Herzlichen Glückwunsch" data-vi="Chúc mừng!">Herzlichen Glückwunsch</span> zum Geburtstag!</li>
</ul>
<div class="note">Schnellmerk: Tuổi dùng <b>sein</b> (bin/bist/ist…), sinh nhật dùng <b>haben</b>: Ich <b>habe</b> am 15. Juni Geburtstag.</div>`,
          grammar: [
            {
              id: "a1-w-fragen",
              title: "W-Fragen (câu hỏi với từ để hỏi)",
              rule: "<p>Từ để hỏi: <b>wer</b> (ai) · <b>was</b> (cái gì) · <b>wo</b> (ở đâu) · <b>woher</b> (từ đâu) · <b>wann</b> (khi nào) · <b>wie</b> (như thế nào) · <b>wie viel</b> (bao nhiêu) · <b>wie alt</b> (bao nhiêu tuổi)</p><p>Cấu trúc: Từ để hỏi + động từ + chủ ngữ: <b>Wie alt bist</b> du? · <b>Wann hast</b> du Geburtstag?</p>",
              examples: ["Wie alt bist du?", "Wann hast du Geburtstag?", "Wo wohnst du?"],
              exercise: { type: "fill", theme: "u2-l2", cat: "W-Fragen", q: "___ alt bist du?", answers: ["wie"], answer: "Wie", ex: "Hỏi tuổi → Wie alt" }
            }
          ],
          listen: [
            { id: "u2-l2-l1", text: "Wie alt bist du? — Ich bin siebzehn Jahre alt.", tip: "Nghe số tuổi trong câu trả lời", slow: true },
            { id: "u2-l2-l2", text: "Wann hast du Geburtstag? — Ich habe am fünfzehnten Juni Geburtstag." }
          ],
          speak: [
            { id: "u2-l2-s1", prompt: "Hỏi tuổi một người bạn", model: "Wie alt bist du?", hint: "Wie · alt · bist · du" },
            { id: "u2-l2-s2", prompt: "Trả lời: Tôi 17 tuổi", model: "Ich bin siebzehn Jahre alt.", hint: "Ich · bin · sieb·zehn · Jah·re · alt" }
          ]
        },
        {
          id: "u2-l3",
          name: "Die Wochentage",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
          desc: "Thứ trong tuần · am + thứ",
          content: `<h2>Die Wochentage</h2>
<div class="hint">Thứ trong tuần · am + thứ · hỏi thứ mấy</div>
<h3 class="sub">1. Thứ trong tuần</h3>
<ul>
  <li><span class="term" data-de="der Montag" data-vi="thứ hai">Montag</span> · <span class="term" data-de="der Dienstag" data-vi="thứ ba">Dienstag</span> · <span class="term" data-de="der Mittwoch" data-vi="thứ tư">Mittwoch</span> · <span class="term" data-de="der Donnerstag" data-vi="thứ năm">Donnerstag</span></li>
  <li><span class="term" data-de="der Freitag" data-vi="thứ sáu">Freitag</span> · <span class="term" data-de="der Samstag" data-vi="thứ bảy">Samstag</span> · <span class="term" data-de="der Sonntag" data-vi="chủ nhật">Sonntag</span></li>
</ul>
<h3 class="sub">2. am + thứ</h3>
<ul>
  <li><span class="term" data-de="am Montag" data-vi="vào thứ hai">Am Montag</span> habe ich Deutsch.</li>
  <li><span class="term" data-de="am Wochenende" data-vi="cuối tuần">Am Wochenende</span> (thứ 7 + chủ nhật) schlafe ich lange.</li>
  <li><span class="term" data-de="Welcher Tag ist heute?" data-vi="Hôm nay là thứ mấy?">Welcher Tag ist heute?</span> — Heute ist <span class="term" data-de="Mittwoch" data-vi="thứ tư">Mittwoch</span>.</li>
</ul>
<h3 class="sub">3. Hỏi về kế hoạch</h3>
<ul>
  <li><span class="term" data-de="Was machst du am Montag?" data-vi="Thứ hai bạn làm gì?">Was machst du am Montag?</span> — Ich <span class="term" data-de="arbeiten" data-vi="làm việc">arbeite</span>.</li>
  <li><span class="term" data-de="die Woche" data-vi="tuần">Woche</span> · <span class="term" data-de="der Tag" data-vi="ngày">Tag</span> · <span class="term" data-de="heute" data-vi="hôm nay">heute</span> · <span class="term" data-de="morgen" data-vi="ngày mai">morgen</span></li>
</ul>
<div class="note">Schnellmerk: 6 trong 7 thứ đều kết thúc bằng <b>-tag</b> (Mon-tag, Diens-tag…) — riêng <b>Mittwoch</b> (giữa tuần) là ngoại lệ.</div>`,
          listen: [
            { id: "u2-l3-l1", text: "Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag", tip: "Nghe từng thứ, chú ý trọng âm đầu từ", slow: true },
            { id: "u2-l3-l2", text: "Welcher Tag ist heute? — Heute ist Mittwoch." }
          ]
        },
        {
          id: "u2-l4",
          name: "Datum: Tag, Monat, Jahr",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
          desc: "Ngày · tháng · năm · số thứ tự",
          content: `<h2>Datum: Tag, Monat, Jahr</h2>
<div class="hint">Ngày · tháng · năm · cách đọc ngày tháng</div>
<h3 class="sub">1. Tháng</h3>
<ul>
  <li><span class="term" data-de="der Januar" data-vi="tháng một">Januar</span> · <span class="term" data-de="der Februar" data-vi="tháng hai">Februar</span> · <span class="term" data-de="der März" data-vi="tháng ba">März</span> · <span class="term" data-de="der April" data-vi="tháng tư">April</span> · <span class="term" data-de="der Mai" data-vi="tháng năm">Mai</span> · <span class="term" data-de="der Juni" data-vi="tháng sáu">Juni</span></li>
  <li><span class="term" data-de="der Juli" data-vi="tháng bảy">Juli</span> · <span class="term" data-de="der August" data-vi="tháng tám">August</span> · <span class="term" data-de="der September" data-vi="tháng chín">September</span> · <span class="term" data-de="der Oktober" data-vi="tháng mười">Oktober</span> · <span class="term" data-de="der November" data-vi="tháng mười một">November</span> · <span class="term" data-de="der Dezember" data-vi="tháng mười hai">Dezember</span></li>
</ul>
<h3 class="sub">2. Hỏi và trả lời ngày</h3>
<ul>
  <li><span class="term" data-de="Welches Datum ist heute?" data-vi="Hôm nay là ngày mấy?">Welches Datum ist heute?</span> — Heute ist der <span class="term" data-de="15. Juni" data-vi="ngày 15 tháng 6">15. Juni</span>.</li>
  <li><span class="term" data-de="wann" data-vi="khi nào">Wann</span>? — <span class="term" data-de="am 15. Juni" data-vi="vào ngày 15 tháng 6">Am 15. Juni</span> habe ich Geburtstag.</li>
  <li><span class="term" data-de="der Wievielte ist heute?" data-vi="Hôm nay ngày bao nhiêu?">Der Wievielte ist heute?</span> — Heute ist der <span class="term" data-de="der Erste" data-vi="mồng một (ngày 1)">Erste</span>.</li>
</ul>
<h3 class="sub">3. Năm</h3>
<ul>
  <li><span class="term" data-de="das Jahr" data-vi="năm">Jahr</span>: heute ist der 12. August <span class="term" data-de="zweitausendsechsundzwanzig" data-vi="hai nghìn không trăm hai mươi sáu">2026</span>.</li>
  <li><span class="term" data-de="im Jahr" data-vi="vào năm">Im Jahr</span> 2000: <span class="term" data-de="zweitausend" data-vi="hai nghìn">zweitausend</span>.</li>
</ul>
<div class="note">Schnellmerk: Đọc năm gộp trái → phải: 2026 → zwei <b>tausend</b> sechsund<b>zwanzig</b>.</div>`,
          grammar: [
            {
              id: "a1-datum-ordinal",
              title: "Datum: số thứ tự (Ordinalzahlen)",
              rule: "<p>Ngày = số thứ tự + tháng: <b>der erste Mai</b> (1.5.) · <b>der dritte Oktober</b> (3.10.) · <b>der vierundzwanzigste Dezember</b> (24.12.)</p><p>1–19 thêm <b>-te</b>: der erste, zweite, dritte, vierte, fünfte … — từ 20 trở lên thêm <b>-ste</b>: der zwanzigste, einundzwanzigste …</p><p>Khoảng thời điểm dùng <b>am</b> + thứ tự: am <b>fünfzehnten</b> Juni (vào ngày 15 tháng 6).</p>",
              examples: ["Heute ist der 15. Juni.", "Am 3. Oktober ist Feiertag.", "Der 24. Dezember ist Heiligabend."],
              exercise: { type: "fill", theme: "u2-l4", cat: "Datum", q: "Heute ist der ___ Mai. (1.)", answers: ["erste"], answer: "Erste", ex: "1. → der erste Mai" }
            }
          ],
          listen: [
            { id: "u2-l4-l1", text: "Heute ist der zwölfte August zweitausendsechsundzwanzig.", tip: "Nghe ngày, tháng, năm trong một câu", slow: true },
            { id: "u2-l4-l2", text: "Am fünfzehnten Juni habe ich Geburtstag." }
          ]
        },
        {
          id: "u2-l5",
          name: "Wie spät ist es?",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`,
          desc: "Giờ · um + giờ · von…bis",
          content: `<h2>Wie spät ist es?</h2>
<div class="hint">Giờ · Wie spät ist es? · um + giờ · von…bis</div>
<h3 class="sub">1. Giờ chẵn</h3>
<ul>
  <li><span class="term" data-de="Wie spät ist es?" data-vi="Mấy giờ rồi?">Wie spät ist es?</span> — Es ist <span class="term" data-de="acht Uhr" data-vi="8 giờ">acht Uhr</span>.</li>
  <li><span class="term" data-de="Wie viel Uhr ist es?" data-vi="Mấy giờ rồi?">Wie viel Uhr ist es?</span> — Es ist <span class="term" data-de="halb neun" data-vi="8 giờ 30">halb neun</span>.</li>
</ul>
<h3 class="sub">2. Giờ lẻ</h3>
<ul>
  <li><span class="term" data-de="viertel nach" data-vi="hơn 15 phút">Viertel nach</span> acht = 8:15 · <span class="term" data-de="viertel vor" data-vi="kém 15 phút">Viertel vor</span> neun = 8:45</li>
  <li><span class="term" data-de="fünf nach acht" data-vi="8 giờ 5 phút">fünf nach acht</span> = 8:05 · <span class="term" data-de="zehn vor zehn" data-vi="9 giờ 50">zehn vor zehn</span> = 9:50</li>
  <li><span class="term" data-de="die Minute" data-vi="phút">Minute</span> · <span class="term" data-de="die Stunde" data-vi="tiếng, giờ">Stunde</span> · <span class="term" data-de="die Uhr" data-vi="đồng hồ; giờ">Uhr</span></li>
</ul>
<h3 class="sub">3. um + giờ (vào lúc)</h3>
<ul>
  <li>Um <span class="term" data-de="um acht Uhr" data-vi="lúc 8 giờ">acht Uhr</span> beginnt der Unterricht.</li>
  <li>Um <span class="term" data-de="um halb sieben" data-vi="lúc 6 giờ 30">halb sieben</span> stehe ich auf.</li>
</ul>
<div class="note">Schnellmerk: <b>Wie spät ist es?</b> → <b>Es ist …</b> (giờ hiện tại). <b>Um wie viel Uhr?</b> → <b>Um …</b> (thời điểm làm gì đó). Khoảng thời gian: <b>von</b> 8 <b>bis</b> 12 Uhr.</div>`,
          grammar: [
            {
              id: "a1-uhrzeit-um",
              title: "Uhrzeit: um + von…bis",
              rule: "<p><b>Um wie viel Uhr?</b> — <b>Um</b> 8 Uhr beginnt der Unterricht. (một mốc thời điểm)</p><p>Khoảng thời gian dùng <b>von … bis</b>: Ich arbeite <b>von</b> 8 <b>bis</b> 12 Uhr.</p><p>Cách nói giờ: Es ist <b>halb neun</b> (8:30) · <b>Viertel nach</b> acht (8:15) · <b>Viertel vor</b> neun (8:45).</p>",
              examples: ["Um wie viel Uhr stehst du auf? — Um halb sieben.", "Ich arbeite von 8 bis 12 Uhr.", "Es ist Viertel vor neun."],
              exercise: { type: "fill", theme: "u2-l5", cat: "Uhrzeit", q: "Ich arbeite ___ 8 Uhr bis 12 Uhr.", answers: ["von"], answer: "von", ex: "Khoảng thời gian → von … bis" }
            }
          ],
          listen: [
            { id: "u2-l5-l1", text: "Wie spät ist es? — Es ist acht Uhr.", tip: "Nghe câu hỏi và câu trả lời về giờ", slow: true },
            { id: "u2-l5-l2", text: "Es ist halb neun." },
            { id: "u2-l5-l3", text: "Um acht Uhr beginnt der Unterricht." }
          ],
          speak: [
            { id: "u2-l5-s1", prompt: "Hỏi giờ bằng tiếng Đức", model: "Wie spät ist es?", hint: "Wie · spät · ist · es" },
            { id: "u2-l5-s2", prompt: "Trả lời: Bây giờ là 8 giờ 30", model: "Es ist halb neun.", hint: "Es · ist · halb · neun" }
          ]
        },
        {
          id: "u2-l6",
          name: "Termine & Verabredungen",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
          desc: "Lịch hẹn · đề xuất thời gian · đồng ý/từ chối",
          content: `<h2>Termine & Verabredungen</h2>
<div class="hint">Lịch hẹn · đề xuất thời gian · đồng ý / từ chối</div>
<h3 class="sub">1. Đặt lịch hẹn</h3>
<ul>
  <li>Ich möchte einen <span class="term" data-de="der Termin" data-vi="lịch hẹn">Termin</span> <span class="term" data-de="vereinbaren" data-vi="đặt, thỏa thuận">vereinbaren</span>.</li>
  <li><span class="term" data-de="Passt es Ihnen?" data-vi="Anh/chị có tiện không? (lịch sự)">Passt es Ihnen?</span> — Ja, das <span class="term" data-de="passen" data-vi="hợp, tiện">passt</span>.</li>
  <li><span class="term" data-de="Welcher Tag passt dir?" data-vi="Ngày nào phù hợp với bạn?">Welcher Tag passt dir?</span> — <span class="term" data-de="am Montag" data-vi="vào thứ hai">Am Montag</span> passt es mir.</li>
  <li><span class="term" data-de="Um wie viel Uhr?" data-vi="Lúc mấy giờ?">Um wie viel Uhr?</span> — <span class="term" data-de="um zehn Uhr" data-vi="lúc 10 giờ">Um zehn Uhr</span>.</li>
</ul>
<h3 class="sub">2. Đồng ý và từ chối</h3>
<ul>
  <li>Ja, das passt mir. / <span class="term" data-de="Nein, das passt mir nicht" data-vi="Không, tôi không tiện">Nein, das passt mir nicht</span>.</li>
  <li>Da habe ich <span class="term" data-de="keine Zeit" data-vi="không có thời gian">keine Zeit</span>. Vielleicht <span class="term" data-de="am Freitag" data-vi="vào thứ sáu">am Freitag</span>?</li>
  <li>Gut, <span class="term" data-de="bis Montag" data-vi="hẹn gặp thứ hai">bis Montag</span>! · <span class="term" data-de="das Treffen" data-vi="buổi gặp mặt">Treffen</span> · <span class="term" data-de="die Verabredung" data-vi="cuộc hẹn">Verabredung</span></li>
</ul>
<div class="note">Schnellmerk: Lịch hẹn cần đủ 3 yếu tố: <b>welcher Tag</b> (thứ mấy) + <b>um wie viel Uhr</b> (mấy giờ) + <b>wo</b> (ở đâu).</div>`,
          grammar: [
            {
              id: "a1-termine-am",
              title: "Termine: am + Tag, um + Uhrzeit, von…bis",
              rule: "<p><b>am</b> + thứ/ngày: am Montag, am 15. Juni — <b>um</b> + giờ: um 10 Uhr — <b>von … bis</b>: von 10 bis 12 Uhr.</p><p>Nhận biết câu hỏi: Welcher Tag? → <b>am</b> Montag · Um wie viel Uhr? → <b>um</b> zehn Uhr.</p>",
              examples: ["Der Termin ist am Montag um 10 Uhr.", "Wir treffen uns von 10 bis 12 Uhr.", "Passt es Ihnen am Freitag um 9 Uhr?"],
              exercise: { type: "fill", theme: "u2-l6", cat: "Termine", q: "Der Termin ist ___ Montag.", answers: ["am"], answer: "am", ex: "Thứ trong tuần → am" }
            }
          ],
          listen: [
            { id: "u2-l6-l1", text: "Passt es Ihnen am Montag um zehn Uhr?", tip: "Nghe thứ + giờ trong câu hỏi", slow: true },
            { id: "u2-l6-l2", text: "Ja, das passt mir. Bis Montag!" }
          ],
          speak: [
            { id: "u2-l6-s1", prompt: "Hỏi: 'Ngày nào phù hợp với bạn?'", model: "Welcher Tag passt dir?", hint: "Wel·cher · Tag · passt · dir" }
          ]
        },
        {
          id: "u2-l7",
          name: "Mein Tag",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>`,
          desc: "Thói quen hằng ngày · động từ tách",
          content: `<h2>Mein Tag</h2>
<div class="hint">Thói quen hằng ngày · động từ tách · um/von…bis</div>
<h3 class="sub">1. Buổi sáng và trưa</h3>
<ul>
  <li>Um sechs Uhr <span class="term" data-de="aufstehen" data-vi="thức dậy">stehe ich auf</span>.</li>
  <li>Ich <span class="term" data-de="sich anziehen" data-vi="mặc quần áo">ziehe mich an</span> und <span class="term" data-de="die Zähne putzen" data-vi="đánh răng">putze die Zähne</span>.</li>
  <li>Dann <span class="term" data-de="frühstücken" data-vi="ăn sáng">frühstücke</span> ich und <span class="term" data-de="gehen" data-vi="đi">gehe</span> zur <span class="term" data-de="die Arbeit" data-vi="công việc">Arbeit</span>.</li>
  <li>Ich <span class="term" data-de="arbeiten" data-vi="làm việc">arbeite</span> von acht bis vierzehn Uhr und <span class="term" data-de="zu Mittag essen" data-vi="ăn trưa">esse zu Mittag</span>.</li>
</ul>
<h3 class="sub">2. Buổi tối</h3>
<ul>
  <li>Um siebzehn Uhr <span class="term" data-de="nach Hause kommen" data-vi="về nhà">komme ich nach Hause</span>.</li>
  <li>Ich koche das <span class="term" data-de="das Abendessen" data-vi="bữa tối">Abendessen</span> und <span class="term" data-de="fernsehen" data-vi="xem TV">sehe fern</span>.</li>
  <li>Um <span class="term" data-de="zweiundzwanzig Uhr" data-vi="22 giờ">zweiundzwanzig Uhr</span> <span class="term" data-de="schlafen" data-vi="ngủ">schlafe</span> ich.</li>
</ul>
<div class="note">Schnellmerk: Động từ tách (<b>auf</b>stehen, <b>fern</b>sehen): khi chia, tiền tố rời xuống <b>cuối câu</b> — ich stehe um 6 Uhr <b>auf</b>.</div>`,
          grammar: [
            {
              id: "a1-trennbare-verben",
              title: "Động từ tách (Trennbare Verben)",
              rule: "<p>Động từ tách: <b>auf</b>stehen (dậy), <b>fern</b>sehen (xem TV)… Khi chia, tiền tố tách rời và chuyển xuống <b>cuối câu</b>.</p><p>aufstehen → ich <b>stehe</b> um 6 Uhr <b>auf</b> · fernsehen → ich <b>sehe</b> abends <b>fern</b>.</p>",
              examples: ["Ich stehe um sechs Uhr auf.", "Er sieht am Abend fern.", "Wir kommen um siebzehn Uhr nach Hause."],
              exercise: { type: "fill", theme: "u2-l7", cat: "Trennbare Verben", q: "Ich ___ um sechs Uhr ___. (aufstehen)", answers: ["stehe auf"], answer: "stehe auf", ex: "aufstehen → stehe … auf" }
            }
          ],
          listen: [
            { id: "u2-l7-l1", text: "Ich stehe um sechs Uhr auf und frühstücke.", tip: "Nghe phần tiền tố tách ở cuối câu", slow: true },
            { id: "u2-l7-l2", text: "Ich arbeite von acht bis vierzehn Uhr." }
          ],
          speak: [
            { id: "u2-l7-s1", prompt: "Nói: 'Tôi dậy lúc 6 giờ'", model: "Ich stehe um sechs Uhr auf.", hint: "Ich · stehe · um · sechs · Uhr · auf" }
          ]
        }
      ]
    },
    {
      id: "u3",
      title: "Familie & Freunde",
      desc: "Gia đình · mein/dein · nghề nghiệp · mô tả người",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      lektionen: [
        {
          id: "u3-l1",
          name: "Die Familie",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
          desc: "Thành viên gia đình · mein/meine",
          content: `<h2>Die Familie</h2>
<div class="hint">Thành viên gia đình · sở hữu mein/meine</div>
<h3 class="sub">1. Bố mẹ và anh chị em</h3>
<ul>
  <li><span class="term" data-de="die Familie" data-vi="gia đình">Familie</span> · <span class="term" data-de="die Eltern" data-vi="bố mẹ">Eltern</span> · <span class="term" data-de="der Vater" data-vi="bố">Vater</span> · <span class="term" data-de="die Mutter" data-vi="mẹ">Mutter</span></li>
  <li><span class="term" data-de="die Geschwister" data-vi="anh chị em">Geschwister</span> · <span class="term" data-de="der Bruder" data-vi="anh/em trai">Bruder</span> · <span class="term" data-de="die Schwester" data-vi="chị/em gái">Schwester</span></li>
</ul>
<h3 class="sub">2. Con cái</h3>
<ul>
  <li><span class="term" data-de="das Kind" data-vi="đứa trẻ">Kind</span> · <span class="term" data-de="die Kinder" data-vi="những đứa trẻ">Kinder</span> · <span class="term" data-de="der Sohn" data-vi="con trai">Sohn</span> · <span class="term" data-de="die Tochter" data-vi="con gái">Tochter</span> · <span class="term" data-de="das Baby" data-vi="em bé">Baby</span></li>
  <li>Hast du Geschwister? — Ja, ich habe <span class="term" data-de="einen Bruder" data-vi="một anh/em trai">einen Bruder</span> und eine Schwester.</li>
</ul>
<h3 class="sub">3. Của tôi: mein/meine</h3>
<table>
  <tr><th>Article</th><th>mein (của tôi)</th><th>dein (của bạn)</th></tr>
  <tr><td>der</td><td><span class="term" data-de="mein Vater" data-vi="bố của tôi">mein Vater</span></td><td><span class="term" data-de="dein Vater" data-vi="bố của bạn">dein Vater</span></td></tr>
  <tr><td>die</td><td><span class="term" data-de="meine Mutter" data-vi="mẹ của tôi">meine Mutter</span></td><td><span class="term" data-de="deine Mutter" data-vi="mẹ của bạn">deine Mutter</span></td></tr>
  <tr><td>das/Plural</td><td><span class="term" data-de="mein Kind" data-vi="con của tôi">mein Kind</span> · <span class="term" data-de="meine Kinder" data-vi="các con của tôi">meine Kinder</span></td><td><span class="term" data-de="deine Kinder" data-vi="các con của bạn">deine Kinder</span></td></tr>
</table>
<div class="note">Schnellmerk: <b>mein</b> (của tôi) đi với der/das, <b>meine</b> đi với die và số nhiều — giống hệt <b>dein/deine</b> (của bạn).</div>`,
          listen: [
            { id: "u3-l1-l1", text: "Das ist meine Familie: mein Vater, meine Mutter und meine Schwester.", tip: "Nghe các từ mein/meine trong câu", slow: true },
            { id: "u3-l1-l2", text: "Hast du Geschwister? — Ja, ich habe einen Bruder." }
          ]
        },
        {
          id: "u3-l2",
          name: "Mein und dein",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
          desc: "Đại từ sở hữu mein/dein · khớp giống danh từ",
          content: `<h2>Mein und dein</h2>
<div class="hint">Đại từ sở hữu mein/dein · khớp giống danh từ</div>
<h3 class="sub">1. Quy tắc mein/dein</h3>
<ul>
  <li><span class="term" data-de="mein" data-vi="của tôi (der/das)">mein</span> · <span class="term" data-de="dein" data-vi="của bạn (der/das)">dein</span> — trước danh từ giống đực/trung</li>
  <li><span class="term" data-de="meine" data-vi="của tôi (die/số nhiều)">meine</span> · <span class="term" data-de="deine" data-vi="của bạn (die/số nhiều)">deine</span> — trước danh từ giống cái/số nhiều</li>
  <li><span class="term" data-de="meine Eltern" data-vi="bố mẹ của tôi">meine Eltern</span> · <span class="term" data-de="deine Eltern" data-vi="bố mẹ của bạn">deine Eltern</span></li>
</ul>
<h3 class="sub">2. Ví dụ</h3>
<ul>
  <li><span class="term" data-de="Mein Vater" data-vi="Bố của tôi">Mein Vater</span> heißt Nam.</li>
  <li><span class="term" data-de="Meine Mutter" data-vi="Mẹ của tôi">Meine Mutter</span> ist Lehrerin.</li>
  <li><span class="term" data-de="Dein Bruder" data-vi="Anh/em trai của bạn">Dein Bruder</span> ist nett.</li>
  <li><span class="term" data-de="Deine Schwester" data-vi="Chị/em gái của bạn">Deine Schwester</span> ist jung.</li>
</ul>
<h3 class="sub">3. Hỏi đáp</h3>
<ul>
  <li><span class="term" data-de="Wie heißt deine Mutter?" data-vi="Mẹ của bạn tên gì?">Wie heißt deine Mutter?</span> — Sie heißt Lan.</li>
  <li><span class="term" data-de="Wie heißt dein Vater?" data-vi="Bố của bạn tên gì?">Wie heißt dein Vater?</span> — Er heißt Nam.</li>
  <li><span class="term" data-de="Ist das dein Bruder?" data-vi="Đó là anh/em trai của bạn à?">Ist das dein Bruder?</span> — Ja, das ist mein Bruder.</li>
</ul>
<div class="note">Schnellmerk: Possessivartikel đứng trước danh từ và khớp giống: der → <b>mein</b>, die → <b>meine</b>, das → <b>mein</b>, Plural → <b>meine</b>.</div>`,
          grammar: [
            {
              id: "a1-possessivartikel",
              title: "Possessivartikel: mein/dein",
              rule: "<p><b>mein</b> (của tôi) / <b>dein</b> (của bạn) — khớp giống với danh từ đứng sau:</p><p>der → <b>mein/dein</b>: mein Vater · die → <b>meine/deine</b>: meine Mutter · das → <b>mein/dein</b>: mein Kind · Plural → <b>meine/deine</b>: meine Kinder</p>",
              examples: ["Mein Vater heißt Nam.", "Meine Mutter ist Lehrerin.", "Deine Schwester ist nett."],
              exercise: { type: "fill", theme: "u3-l2", cat: "Possessivartikel", q: "___ Mutter ist Lehrerin. (mẹ của tôi)", answers: ["meine"], answer: "meine", ex: "die Mutter → meine Mutter" }
            }
          ],
          listen: [
            { id: "u3-l2-l1", text: "Mein Vater heißt Nam. Meine Mutter heißt Lan.", tip: "Nghe sự khác nhau mein/meine", slow: true },
            { id: "u3-l2-l2", text: "Ist das dein Bruder? — Ja, das ist mein Bruder." }
          ],
          speak: [
            { id: "u3-l2-s1", prompt: "Nói: 'Mẹ của tôi tên là Lan'", model: "Meine Mutter heißt Lan.", hint: "Mei·ne · Mut·ter · heißt · Lan" }
          ]
        },
        {
          id: "u3-l3",
          name: "Die Verwandten",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
          desc: "Ông bà · cô chú cậu dì · anh em họ",
          content: `<h2>Die Verwandten</h2>
<div class="hint">Ông bà · cô chú cậu dì · anh em họ</div>
<h3 class="sub">1. Ông bà</h3>
<ul>
  <li><span class="term" data-de="die Großeltern" data-vi="ông bà">Großeltern</span> · <span class="term" data-de="der Großvater" data-vi="ông">Großvater</span> · <span class="term" data-de="die Großmutter" data-vi="bà">Großmutter</span></li>
  <li>Thân mật: <span class="term" data-de="der Opa" data-vi="ông (thân mật)">Opa</span> · <span class="term" data-de="die Oma" data-vi="bà (thân mật)">Oma</span></li>
  <li>Mein Opa und meine Oma wohnen in <span class="term" data-de="Hanoi" data-vi="Hà Nội">Hanoi</span>.</li>
</ul>
<h3 class="sub">2. Cô chú cậu dì</h3>
<ul>
  <li><span class="term" data-de="der Onkel" data-vi="chú/bác/cậu">Onkel</span> · <span class="term" data-de="die Tante" data-vi="cô/dì/thím">Tante</span></li>
  <li><span class="term" data-de="der Cousin" data-vi="anh/em họ (nam)">Cousin</span> · <span class="term" data-de="die Cousine" data-vi="anh/em họ (nữ)">Cousine</span></li>
</ul>
<h3 class="sub">3. Cháu và họ hàng</h3>
<ul>
  <li><span class="term" data-de="der Neffe" data-vi="cháu trai (con của anh chị em)">Neffe</span> · <span class="term" data-de="die Nichte" data-vi="cháu gái (con của anh chị em)">Nichte</span></li>
  <li><span class="term" data-de="der Enkel" data-vi="cháu trai (con của con)">Enkel</span> · <span class="term" data-de="die Enkelin" data-vi="cháu gái (con của con)">Enkelin</span></li>
  <li><span class="term" data-de="die Verwandten" data-vi="họ hàng (số nhiều)">Verwandten</span> · <span class="term" data-de="der Verwandte" data-vi="người họ hàng">Verwandte</span></li>
</ul>
<div class="note">Schnellmerk: <b>Großvater/Großmutter</b> = ông/bà; thân mật gọi <b>Opa/Oma</b>. Họ hàng nói chung là <b>die Verwandten</b>.</div>`,
          listen: [
            { id: "u3-l3-l1", text: "Mein Opa und meine Oma wohnen in Hanoi.", tip: "Nghe quan hệ họ hàng trong câu", slow: true },
            { id: "u3-l3-l2", text: "Ich habe einen Onkel und eine Tante. Mein Cousin heißt Minh." }
          ]
        },
        {
          id: "u3-l4",
          name: "Berufe",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
          desc: "Nghề nghiệp · Was bist du von Beruf? · nam/nữ",
          content: `<h2>Berufe</h2>
<div class="hint">Nghề nghiệp · Was bist du von Beruf? · nam/nữ</div>
<h3 class="sub">1. Hỏi nghề nghiệp</h3>
<ul>
  <li><span class="term" data-de="Was bist du von Beruf?" data-vi="Bạn làm nghề gì?">Was bist du von Beruf?</span> — Ich bin <span class="term" data-de="der Koch" data-vi="đầu bếp (nam)">Koch</span>.</li>
  <li><span class="term" data-de="Was ist er von Beruf?" data-vi="Anh ấy làm nghề gì?">Was ist er von Beruf?</span> — Er ist <span class="term" data-de="der Arzt" data-vi="bác sĩ (nam)">Arzt</span>.</li>
  <li><span class="term" data-de="Was ist sie von Beruf?" data-vi="Cô ấy làm nghề gì?">Was ist sie von Beruf?</span> — Sie ist <span class="term" data-de="die Verkäuferin" data-vi="người bán hàng (nữ)">Verkäuferin</span>.</li>
</ul>
<h3 class="sub">2. Nghề nam và nữ</h3>
<table>
  <tr><th>Nam</th><th>Nữ</th></tr>
  <tr><td><span class="term" data-de="der Lehrer" data-vi="giáo viên (nam)">Lehrer</span></td><td><span class="term" data-de="die Lehrerin" data-vi="giáo viên (nữ)">Lehrerin</span></td></tr>
  <tr><td><span class="term" data-de="der Polizist" data-vi="cảnh sát (nam)">Polizist</span></td><td><span class="term" data-de="die Polizistin" data-vi="cảnh sát (nữ)">Polizistin</span></td></tr>
  <tr><td><span class="term" data-de="der Fahrer" data-vi="tài xế (nam)">Fahrer</span></td><td><span class="term" data-de="die Fahrerin" data-vi="tài xế (nữ)">Fahrerin</span></td></tr>
</table>
<h3 class="sub">3. Nghề khác</h3>
<ul>
  <li><span class="term" data-de="der Student" data-vi="sinh viên (nam)">Student</span> · <span class="term" data-de="die Studentin" data-vi="sinh viên (nữ)">Studentin</span> · <span class="term" data-de="die Krankenschwester" data-vi="y tá">Krankenschwester</span></li>
  <li><span class="term" data-de="der Bäcker" data-vi="thợ làm bánh (nam)">Bäcker</span> · <span class="term" data-de="der Ingenieur" data-vi="kỹ sư">Ingenieur</span> · <span class="term" data-de="der Beruf" data-vi="nghề nghiệp">Beruf</span></li>
</ul>
<div class="note">Schnellmerk: Hỏi nghề luôn dùng <b>sein</b> + mạo từ rỗng: Ich bin <b>Koch</b> (không nói "Ich bin ein Koch"). Nghề nữ thường thêm <b>-in</b>: Verkäufer → Verkäufer<b>in</b>.</div>`,
          grammar: [
            {
              id: "a1-berufe-sein",
              title: "Berufe mit sein",
              rule: "<p>Hỏi nghề: <b>Was bist du von Beruf?</b> — Ich <b>bin</b> Koch. (sein + nghề, KHÔNG mạo từ)</p><p>Nghề nữ = nghề nam + <b>-in</b>: Verkäufer → Verkäufer<b>in</b> · Lehrer → Lehrer<b>in</b> · Polizist → Polizist<b>in</b></p><p>Bất quy tắc: Arzt → Ärztin · Koch → Köchin (thêm đổi âm a→ä).</p>",
              examples: ["Was bist du von Beruf? — Ich bin Koch.", "Sie ist Verkäuferin.", "Er ist Student."],
              exercise: { type: "fill", theme: "u3-l4", cat: "Berufe", q: "Was bist du von ___? — Ich bin Koch.", answers: ["beruf"], answer: "Beruf", ex: "von Beruf = làm nghề gì" }
            }
          ],
          listen: [
            { id: "u3-l4-l1", text: "Was bist du von Beruf? — Ich bin Koch.", tip: "Nghe câu hỏi nghề nghiệp", slow: true },
            { id: "u3-l4-l2", text: "Meine Mutter ist Verkäuferin. Mein Vater ist Fahrer." }
          ],
          speak: [
            { id: "u3-l4-s1", prompt: "Hỏi: 'Bạn làm nghề gì?'", model: "Was bist du von Beruf?", hint: "Was · bist · du · von · Be·ruf" },
            { id: "u3-l4-s2", prompt: "Trả lời: 'Tôi là đầu bếp'", model: "Ich bin Koch.", hint: "Ich · bin · Koch" }
          ]
        },
        {
          id: "u3-l5",
          name: "Personen beschreiben",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
          desc: "Mô tả ngoại hình · tóc · mắt · khuôn mặt",
          content: `<h2>Personen beschreiben</h2>
<div class="hint">Mô tả người · dáng vóc · mái tóc · mắt</div>
<h3 class="sub">1. Dáng vóc</h3>
<ul>
  <li><span class="term" data-de="groß" data-vi="cao">groß</span> · <span class="term" data-de="klein" data-vi="thấp">klein</span> · <span class="term" data-de="alt" data-vi="già">alt</span> · <span class="term" data-de="jung" data-vi="trẻ">jung</span></li>
  <li>Mein Vater ist <span class="term" data-de="sehr groß" data-vi="rất cao">sehr groß</span>. Meine Mutter ist <span class="term" data-de="nicht so groß" data-vi="không cao lắm">nicht so groß</span>.</li>
</ul>
<h3 class="sub">2. Mái tóc và mắt</h3>
<ul>
  <li><span class="term" data-de="die Haare" data-vi="tóc">Haare</span>: <span class="term" data-de="braun" data-vi="màu nâu">braun</span> · <span class="term" data-de="schwarz" data-vi="màu đen">schwarz</span> · <span class="term" data-de="blond" data-vi="màu vàng hoe">blond</span></li>
  <li>Sie hat <span class="term" data-de="lange Haare" data-vi="tóc dài">lange Haare</span>. Er hat <span class="term" data-de="kurze Haare" data-vi="tóc ngắn">kurze Haare</span>.</li>
  <li><span class="term" data-de="die Augen" data-vi="đôi mắt">Augen</span>: <span class="term" data-de="blaue Augen" data-vi="mắt xanh">blaue Augen</span> · <span class="term" data-de="grüne Augen" data-vi="mắt xanh lá">grüne Augen</span></li>
</ul>
<h3 class="sub">3. Khuôn mặt</h3>
<ul>
  <li><span class="term" data-de="das Gesicht" data-vi="khuôn mặt">Gesicht</span> · <span class="term" data-de="die Nase" data-vi="mũi">Nase</span> · <span class="term" data-de="der Mund" data-vi="miệng">Mund</span> · <span class="term" data-de="das Ohr" data-vi="tai">Ohr</span></li>
  <li>Sie ist <span class="term" data-de="schön" data-vi="xinh đẹp">schön</span>. Er ist <span class="term" data-de="hübsch" data-vi="đẹp trai">hübsch</span>.</li>
</ul>
<div class="note">Schnellmerk: Mô tả ngoại hình: <b>haben</b> + bộ phận (Sie <b>hat</b> blaue Augen) và <b>sein</b> + tính từ (Er <b>ist</b> groß).</div>`,
          listen: [
            { id: "u3-l5-l1", text: "Mein Bruder ist groß und hat kurze Haare.", tip: "Nghe tính từ mô tả", slow: true },
            { id: "u3-l5-l2", text: "Meine Schwester hat lange Haare und blaue Augen." }
          ],
          speak: [
            { id: "u3-l5-s1", prompt: "Mô tả: 'Bố tôi cao'", model: "Mein Vater ist groß.", hint: "Mein · Va·ter · ist · groß" }
          ]
        },
        {
          id: "u3-l6",
          name: "Freunde & Charakter",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
          desc: "Bạn bè · tính cách · sở thích",
          content: `<h2>Freunde & Charakter</h2>
<div class="hint">Bạn bè · tính cách · sở thích</div>
<h3 class="sub">1. Bạn bè</h3>
<ul>
  <li><span class="term" data-de="der Freund" data-vi="bạn trai/bạn (nam)">Freund</span> · <span class="term" data-de="die Freundin" data-vi="bạn gái/bạn (nữ)">Freundin</span> · <span class="term" data-de="die Freunde" data-vi="những người bạn">Freunde</span></li>
  <li><span class="term" data-de="der beste Freund" data-vi="bạn thân nhất (nam)">beste Freund</span> · <span class="term" data-de="die beste Freundin" data-vi="bạn thân nhất (nữ)">beste Freundin</span></li>
</ul>
<h3 class="sub">2. Tính cách</h3>
<ul>
  <li><span class="term" data-de="nett" data-vi="tốt bụng, dễ thương">nett</span> · <span class="term" data-de="freundlich" data-vi="thân thiện">freundlich</span> · <span class="term" data-de="lustig" data-vi="vui tính">lustig</span> · <span class="term" data-de="fleißig" data-vi="chăm chỉ">fleißig</span></li>
  <li><span class="term" data-de="intelligent" data-vi="thông minh">intelligent</span> · <span class="term" data-de="ehrlich" data-vi="thật thà">ehrlich</span> · <span class="term" data-de="hilfsbereit" data-vi="sẵn lòng giúp đỡ">hilfsbereit</span></li>
  <li><span class="term" data-de="ruhig" data-vi="điềm tĩnh">ruhig</span> · <span class="term" data-de="laut" data-vi="ồn ào">laut</span> · <span class="term" data-de="sympathisch" data-vi="dễ mến">sympathisch</span></li>
</ul>
<h3 class="sub">3. Nói về bạn bè</h3>
<ul>
  <li>Das ist <span class="term" data-de="mein Freund Tom" data-vi="bạn Tom của tôi">mein Freund Tom</span>. Er ist sehr lustig.</li>
  <li>Meine Freundin ist <span class="term" data-de="immer fröhlich" data-vi="luôn vui vẻ">immer fröhlich</span>.</li>
  <li><span class="term" data-de="das Hobby" data-vi="sở thích">Hobby</span> · <span class="term" data-de="die Hobbys" data-vi="các sở thích">Hobbys</span>: Wir spielen zusammen <span class="term" data-de="Fußball" data-vi="bóng đá">Fußball</span>.</li>
</ul>
<div class="note">Schnellmerk: Bạn nam = <b>Freund</b>, bạn nữ = <b>Freundin</b>, nhiều bạn = <b>Freunde</b> (Plural thêm -e).</div>`,
          listen: [
            { id: "u3-l6-l1", text: "Das ist mein Freund Tom. Er ist sehr lustig.", tip: "Nghe cách giới thiệu bạn bè", slow: true },
            { id: "u3-l6-l2", text: "Meine beste Freundin ist hilfsbereit und ehrlich." }
          ],
          speak: [
            { id: "u3-l6-s1", prompt: "Giới thiệu: 'Đây là bạn Tom của tôi'", model: "Das ist mein Freund Tom.", hint: "Das · ist · mein · Freund · Tom" }
          ]
        },
        {
          id: "u3-l7",
          name: "Meine Familie vorstellen",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
          desc: "Giới thiệu gia đình · ôn tập mein/meine + sein",
          content: `<h2>Meine Familie vorstellen</h2>
<div class="hint">Giới thiệu gia đình · ôn tập mein/meine + sein</div>
<h3 class="sub">1. Giới thiệu chung</h3>
<ul>
  <li>Ich möchte meine Familie <span class="term" data-de="vorstellen" data-vi="giới thiệu">vorstellen</span>.</li>
  <li>Ich <span class="term" data-de="haben" data-vi="có">habe</span> eine <span class="term" data-de="die Schwester" data-vi="chị/em gái">Schwester</span> und einen <span class="term" data-de="der Bruder" data-vi="anh/em trai">Bruder</span>.</li>
  <li>Meine Familie ist <span class="term" data-de="groß" data-vi="đông đúc">groß</span>: <span class="term" data-de="der Vater" data-vi="bố">Vater</span>, <span class="term" data-de="die Mutter" data-vi="mẹ">Mutter</span>, zwei Brüder und ich.</li>
</ul>
<h3 class="sub">2. Trạng thái gia đình</h3>
<ul>
  <li><span class="term" data-de="verheiratet" data-vi="đã kết hôn">verheiratet</span> · <span class="term" data-de="ledig" data-vi="độc thân">ledig</span> · <span class="term" data-de="geschieden" data-vi="đã ly hôn">geschieden</span></li>
  <li>Meine Eltern sind <span class="term" data-de="glücklich" data-vi="hạnh phúc">glücklich</span> verheiratet.</li>
</ul>
<h3 class="sub">3. Cùng nhau</h3>
<ul>
  <li>Wir essen <span class="term" data-de="zusammen" data-vi="cùng nhau">zusammen</span> und <span class="term" data-de="fernsehen" data-vi="xem TV">sehen fern</span>.</li>
  <li>Am Sonntag besuchen wir die <span class="term" data-de="die Großeltern" data-vi="ông bà">Großeltern</span>.</li>
</ul>
<div class="note">Schnellmerk: Trình tự giới thiệu gia đình: <b>Ich habe</b> … + <b>Mein/Meine</b> … + <b>Wir</b> … — dùng sein cho trạng thái, haben cho thành viên.</div>`,
          listen: [
            { id: "u3-l7-l1", text: "Ich habe eine Schwester und einen Bruder. Meine Familie ist groß.", tip: "Nghe cấu trúc Ich habe …", slow: true },
            { id: "u3-l7-l2", text: "Meine Eltern sind glücklich verheiratet." }
          ],
          speak: [
            { id: "u3-l7-s1", prompt: "Giới thiệu: 'Tôi có một chị gái'", model: "Ich habe eine Schwester.", hint: "Ich · ha·be · ei·ne · Schwes·ter" }
          ]
        }
      ]
    },
    {
      id: "u4",
      title: "Essen & Trinken",
      desc: "Món ăn đồ uống · nhà hàng · Akkusativ · essen/trinken",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>`,
      lektionen: [
        {
          id: "u4-l1",
          name: "Das Frühstück",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18"/><path d="M3 12a9 9 0 0 0 18 0"/></svg>`,
          desc: "Bữa sáng · đồ ăn · frühstücken",
          content: `<h2>Das Frühstück</h2>
<div class="hint">Bữa sáng · đồ ăn · frühstücken</div>
<h3 class="sub">1. Bánh mì và đồ phết</h3>
<ul>
  <li><span class="term" data-de="das Brot" data-vi="bánh mì (ổ)">Brot</span> · <span class="term" data-de="das Brötchen" data-vi="bánh mì nhỏ">Brötchen</span> · <span class="term" data-de="die Butter" data-vi="bơ">Butter</span> · <span class="term" data-de="der Käse" data-vi="phô mai">Käse</span></li>
  <li><span class="term" data-de="die Marmelade" data-vi="mứt">Marmelade</span> · <span class="term" data-de="der Honig" data-vi="mật ong">Honig</span> · <span class="term" data-de="die Wurst" data-vi="xúc xích, chả">Wurst</span></li>
</ul>
<h3 class="sub">2. Trứng và đồ uống</h3>
<ul>
  <li><span class="term" data-de="das Ei" data-vi="trứng">Ei</span> · <span class="term" data-de="das Müsli" data-vi="ngũ cốc">Müsli</span> · <span class="term" data-de="der Joghurt" data-vi="sữa chua">Joghurt</span></li>
  <li><span class="term" data-de="der Kaffee" data-vi="cà phê">Kaffee</span> · <span class="term" data-de="der Tee" data-vi="trà">Tee</span> · <span class="term" data-de="die Milch" data-vi="sữa">Milch</span> · <span class="term" data-de="der Orangensaft" data-vi="nước cam">Orangensaft</span></li>
</ul>
<h3 class="sub">3. Ăn sáng</h3>
<ul>
  <li>Ich <span class="term" data-de="frühstücken" data-vi="ăn sáng">frühstücke</span> um sieben Uhr.</li>
  <li>Ich esse <span class="term" data-de="das Frühstück" data-vi="bữa sáng">Frühstück</span> mit <span class="term" data-de="meiner Familie" data-vi="gia đình của tôi">meiner Familie</span>.</li>
</ul>
<div class="note">Schnellmerk: Danh từ đồ ăn có article riêng (das Brot, die Milch, der Kaffee) — học theo article: <b>das/die/der</b> + từ.</div>`,
          listen: [
            { id: "u4-l1-l1", text: "Ich frühstücke um sieben Uhr. Ich esse Brot mit Käse.", tip: "Nghe từ vựng đồ ăn", slow: true },
            { id: "u4-l1-l2", text: "Zum Frühstück trinke ich Kaffee mit Milch." }
          ]
        },
        {
          id: "u4-l2",
          name: "Obst & Gemüse",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
          desc: "Hoa quả và rau củ · mua theo cân",
          content: `<h2>Obst & Gemüse</h2>
<div class="hint">Hoa quả và rau củ</div>
<h3 class="sub">1. Hoa quả</h3>
<ul>
  <li><span class="term" data-de="das Obst" data-vi="hoa quả">Obst</span> · <span class="term" data-de="der Apfel" data-vi="quả táo">Apfel</span> · <span class="term" data-de="die Banane" data-vi="quả chuối">Banane</span></li>
  <li><span class="term" data-de="die Orange" data-vi="quả cam">Orange</span> · <span class="term" data-de="die Erdbeere" data-vi="quả dâu tây">Erdbeere</span> · <span class="term" data-de="die Zitrone" data-vi="quả chanh">Zitrone</span> · <span class="term" data-de="die Ananas" data-vi="quả dứa">Ananas</span></li>
</ul>
<h3 class="sub">2. Rau củ</h3>
<ul>
  <li><span class="term" data-de="das Gemüse" data-vi="rau củ">Gemüse</span> · <span class="term" data-de="die Tomate" data-vi="quả cà chua">Tomate</span> · <span class="term" data-de="die Gurke" data-vi="quả dưa chuột">Gurke</span> · <span class="term" data-de="die Karotte" data-vi="củ cà rốt">Karotte</span></li>
  <li><span class="term" data-de="die Kartoffel" data-vi="củ khoai tây">Kartoffel</span> · <span class="term" data-de="die Zwiebel" data-vi="củ hành tây">Zwiebel</span> · <span class="term" data-de="der Salat" data-vi="rau xà lách">Salat</span></li>
</ul>
<h3 class="sub">3. Mua hoa quả</h3>
<ul>
  <li>Ich kaufe <span class="term" data-de="ein Kilo Äpfel" data-vi="một ki-lô táo">ein Kilo Äpfel</span>.</li>
  <li><span class="term" data-de="gesund" data-vi="tốt cho sức khỏe">Gesund</span>: Obst und Gemüse sind <span class="term" data-de="sehr gesund" data-vi="rất tốt cho sức khỏe">sehr gesund</span>.</li>
</ul>
<div class="note">Schnellmerk: Hầu hết rau củ giống cái <b>die</b> (-e, -el): Tomate, Gurke, Kartoffel — riêng der Apfel, der Salat giống đực.</div>`,
          listen: [
            { id: "u4-l2-l1", text: "Ich kaufe ein Kilo Äpfel und zwei Bananen.", tip: "Nghe số lượng và loại quả", slow: true },
            { id: "u4-l2-l2", text: "Obst und Gemüse sind sehr gesund." }
          ],
          speak: [
            { id: "u4-l2-s1", prompt: "Nói: 'Tôi mua một ki-lô táo'", model: "Ich kaufe ein Kilo Äpfel.", hint: "Ich · kau·fe · ein · Ki·lo · Äp·fel" }
          ]
        },
        {
          id: "u4-l3",
          name: "Getränke",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a3 3 0 0 1 0 6h-2"/></svg>`,
          desc: "Đồ uống · khát · möchten",
          content: `<h2>Getränke</h2>
<div class="hint">Đồ uống · khát · möchten</div>
<h3 class="sub">1. Đồ uống cơ bản</h3>
<ul>
  <li><span class="term" data-de="das Getränk" data-vi="đồ uống">Getränk</span> · <span class="term" data-de="das Wasser" data-vi="nước">Wasser</span> · <span class="term" data-de="das Mineralwasser" data-vi="nước khoáng">Mineralwasser</span></li>
  <li><span class="term" data-de="der Saft" data-vi="nước ép">Saft</span> · <span class="term" data-de="der Apfelsaft" data-vi="nước táo ép">Apfelsaft</span> · <span class="term" data-de="die Limonade" data-vi="nước ngọt có ga">Limonade</span> · <span class="term" data-de="die Cola" data-vi="nước cola">Cola</span></li>
</ul>
<h3 class="sub">2. Đồ uống nóng</h3>
<ul>
  <li><span class="term" data-de="der Kaffee" data-vi="cà phê">Kaffee</span> · <span class="term" data-de="der Tee" data-vi="trà">Tee</span> · <span class="term" data-de="die Milch" data-vi="sữa">Milch</span></li>
  <li><span class="term" data-de="der Kaffee mit Milch" data-vi="cà phê sữa">Kaffee mit Milch</span> · <span class="term" data-de="der Tee mit Zitrone" data-vi="trà chanh">Tee mit Zitrone</span></li>
</ul>
<h3 class="sub">3. Khát nước</h3>
<ul>
  <li>Ich habe <span class="term" data-de="der Durst" data-vi="cơn khát">Durst</span> · Ich bin <span class="term" data-de="durstig" data-vi="khát">durstig</span>.</li>
  <li>Ich <span class="term" data-de="möchten" data-vi="muốn (lịch sự)">möchte</span> ein <span class="term" data-de="das Glas" data-vi="cái cốc">Glas</span> Wasser, bitte.</li>
  <li><span class="term" data-de="die Tasse" data-vi="cái tách">Tasse</span> · <span class="term" data-de="die Flasche" data-vi="cái chai">Flasche</span></li>
</ul>
<div class="note">Schnellmerk: <b>möchten</b> = muốn (lịch sự): Ich möchte einen Tee. Dùng khi gọi đồ uống, lịch sự hơn "ich will".</div>`,
          listen: [
            { id: "u4-l3-l1", text: "Ich habe Durst. Ich möchte ein Glas Wasser, bitte.", tip: "Nghe câu gọi đồ uống lịch sự", slow: true },
            { id: "u4-l3-l2", text: "Möchtest du einen Tee? — Ja, einen Tee mit Zitrone." }
          ],
          speak: [
            { id: "u4-l3-s1", prompt: "Gọi: 'Làm ơn cho tôi một cốc nước'", model: "Ich möchte ein Glas Wasser, bitte.", hint: "Ich · möch·te · ein · Glas · Was·ser · bit·te" }
          ]
        },
        {
          id: "u4-l4",
          name: "Im Restaurant",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>`,
          desc: "Trong nhà hàng · gọi món · Akkusativ",
          content: `<h2>Im Restaurant</h2>
<div class="hint">Trong nhà hàng · gọi món · Akkusativ</div>
<h3 class="sub">1. Vào nhà hàng</h3>
<ul>
  <li><span class="term" data-de="das Restaurant" data-vi="nhà hàng">Restaurant</span> · <span class="term" data-de="der Kellner" data-vi="bồi bàn (nam)">Kellner</span> · <span class="term" data-de="die Kellnerin" data-vi="bồi bàn (nữ)">Kellnerin</span></li>
  <li><span class="term" data-de="der Tisch" data-vi="cái bàn">Tisch</span> · <span class="term" data-de="die Speisekarte" data-vi="thực đơn">Speisekarte</span> · <span class="term" data-de="der Gast" data-vi="thực khách">Gast</span> · <span class="term" data-de="die Gäste" data-vi="các thực khách">Gäste</span></li>
</ul>
<h3 class="sub">2. Gọi món</h3>
<ul>
  <li><span class="term" data-de="bestellen" data-vi="gọi món">Bestellen</span>: Ich möchte <span class="term" data-de="die Bestellung" data-vi="đơn gọi món">eine Bestellung</span> aufgeben.</li>
  <li>Ich nehme <span class="term" data-de="die Suppe" data-vi="món súp">die Suppe</span> als <span class="term" data-de="die Vorspeise" data-vi="món khai vị">Vorspeise</span>.</li>
  <li>Als <span class="term" data-de="die Hauptspeise" data-vi="món chính">Hauptspeise</span> nehme ich <span class="term" data-de="das Schnitzel" data-vi="món schnitzel">das Schnitzel</span>.</li>
  <li>Zum <span class="term" data-de="das Dessert" data-vi="món tráng miệng">Dessert</span> möchte ich <span class="term" data-de="der Kuchen" data-vi="bánh ngọt">einen Kuchen</span>.</li>
</ul>
<h3 class="sub">3. Akkusativ sau nehmen/möchten</h3>
<table>
  <tr><th>Danh từ</th><th>Nominativ</th><th>Akkusativ</th></tr>
  <tr><td>der Salat</td><td>der Salat</td><td><span class="term" data-de="den Salat" data-vi="món xà lách (Akkusativ)">den Salat</span></td></tr>
  <tr><td>die Suppe</td><td>die Suppe</td><td><span class="term" data-de="die Suppe" data-vi="món súp (Akkusativ)">die Suppe</span></td></tr>
  <tr><td>das Wasser</td><td>das Wasser</td><td><span class="term" data-de="das Wasser" data-vi="nước (Akkusativ)">das Wasser</span></td></tr>
</table>
<div class="note">Schnellmerk: Sau <b>nehmen/möchten</b> danh từ chuyển Akkusativ: <b>der → den</b> · <b>die → die</b> (không đổi) · <b>das → das</b> (không đổi).</div>`,
          grammar: [
            {
              id: "a1-akkusativ",
              title: "Akkusativ: den/die/das + einen/eine/ein",
              rule: "<p>Sau động từ <b>nehmen</b>, <b>möchten</b>, <b>essen</b>, <b>trinken</b> danh từ xác định chuyển Akkusativ:</p><p><b>der → den</b> (den Salat) · <b>die → die</b> (die Suppe, không đổi) · <b>das → das</b> (das Wasser, không đổi)</p><p>Bất định: <b>einen</b> (der: einen Tee) · <b>eine</b> (die: eine Suppe) · <b>ein</b> (das: ein Wasser).</p>",
              examples: ["Ich nehme den Salat.", "Ich möchte eine Suppe.", "Er trinkt ein Wasser."],
              exercise: { type: "fill", theme: "u4-l4", cat: "Akkusativ", q: "Ich möchte ___ Suppe. (eine/einen/ein)", answers: ["eine"], answer: "eine", ex: "die Suppe → eine Suppe" }
            }
          ],
          listen: [
            { id: "u4-l4-l1", text: "Die Speisekarte, bitte! Ich möchte eine Suppe und ein Schnitzel.", tip: "Nghe cách gọi món trong nhà hàng", slow: true },
            { id: "u4-l4-l2", text: "Der Kellner bringt den Salat und das Wasser." }
          ],
          speak: [
            { id: "u4-l4-s1", prompt: "Gọi món: 'Làm ơn cho tôi thực đơn'", model: "Die Speisekarte, bitte!", hint: "Die · Spei·se·kar·te · bit·te" },
            { id: "u4-l4-s2", prompt: "Gọi: 'Tôi muốn món súp'", model: "Ich möchte eine Suppe.", hint: "Ich · möch·te · ei·ne · Sup·pe" }
          ]
        },
        {
          id: "u4-l5",
          name: "Die Rechnung",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6"/><path d="M9 12h6"/></svg>`,
          desc: "Tính tiền · trả tiền · tiền boa",
          content: `<h2>Die Rechnung</h2>
<div class="hint">Tính tiền · trả tiền · tiền boa</div>
<h3 class="sub">1. Xin tính tiền</h3>
<ul>
  <li><span class="term" data-de="die Rechnung" data-vi="hóa đơn">Rechnung</span>, bitte! · Ich möchte <span class="term" data-de="bezahlen" data-vi="trả tiền">bezahlen</span>.</li>
  <li><span class="term" data-de="zahlen" data-vi="trả, thanh toán">Zahlen</span>: Zahlen Sie <span class="term" data-de="zusammen" data-vi="chung một hóa đơn">zusammen</span> oder <span class="term" data-de="getrennt" data-vi="tách riêng">getrennt</span>?</li>
</ul>
<h3 class="sub">2. Trả tiền thế nào?</h3>
<ul>
  <li>Ich zahle <span class="term" data-de="bar" data-vi="bằng tiền mặt">bar</span> · mit <span class="term" data-de="die Karte" data-vi="thẻ">Karte</span> · <span class="term" data-de="mit Karte" data-vi="bằng thẻ">mit Karte</span></li>
  <li><span class="term" data-de="das Geld" data-vi="tiền">Geld</span> · <span class="term" data-de="der Euro" data-vi="đồng euro">Euro</span> · <span class="term" data-de="der Cent" data-vi="xu">Cent</span></li>
</ul>
<h3 class="sub">3. Tiền boa và hóa đơn</h3>
<ul>
  <li><span class="term" data-de="das Trinkgeld" data-vi="tiền boa">Trinkgeld</span>: Stimmt so! (Không cần thối lại!)</li>
  <li><span class="term" data-de="der Preis" data-vi="giá">Preis</span> · <span class="term" data-de="die Kasse" data-vi="quầy thu ngân">Kasse</span> · <span class="term" data-de="stimmen" data-vi="đúng, chính xác">Stimmt</span> die Rechnung?</li>
</ul>
<div class="note">Schnellmerk: Khi ăn xong: <b>Die Rechnung, bitte!</b> — Trả chung: <b>zusammen</b>, trả riêng: <b>getrennt</b>. Tiền boa để lại tại bàn: <b>Stimmt so!</b></div>`,
          listen: [
            { id: "u4-l5-l1", text: "Die Rechnung, bitte! Ich möchte bezahlen.", tip: "Nghe câu xin hóa đơn", slow: true },
            { id: "u4-l5-l2", text: "Zahlen Sie zusammen oder getrennt? — Zusammen, bitte." }
          ],
          speak: [
            { id: "u4-l5-s1", prompt: "Nói: 'Làm ơn tính tiền!'", model: "Die Rechnung, bitte!", hint: "Die · Rech·nung · bit·te" }
          ]
        },
        {
          id: "u4-l6",
          name: "essen, trinken & nehmen",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18"/><path d="M3 12a9 9 0 0 0 18 0"/></svg>`,
          desc: "Chia động từ essen/trinken/nehmen · đói · no",
          content: `<h2>essen, trinken & nehmen</h2>
<div class="hint">Chia động từ essen/trinken/nehmen · đói · no</div>
<h3 class="sub">1. essen — chia đặc biệt</h3>
<ul>
  <li>ich <span class="term" data-de="essen" data-vi="ăn">esse</span> · du <span class="term" data-de="isst" data-vi="ăn (bạn)">isst</span> · er/sie/es <span class="term" data-de="isst" data-vi="ăn (anh ấy/cô ấy)">isst</span></li>
  <li>wir <span class="term" data-de="essen" data-vi="ăn (chúng tôi)">essen</span> · ihr <span class="term" data-de="esst" data-vi="ăn (các bạn)">esst</span> · sie/Sie <span class="term" data-de="essen" data-vi="ăn (họ)">essen</span></li>
</ul>
<h3 class="sub">2. trinken & nehmen</h3>
<ul>
  <li><span class="term" data-de="trinken" data-vi="uống">trinken</span>: ich trinke · du <span class="term" data-de="trinkst" data-vi="uống (bạn)">trinkst</span> · er/sie/es trinkt · wir trinken</li>
  <li><span class="term" data-de="nehmen" data-vi="lấy, gọi">nehmen</span>: ich nehme · du <span class="term" data-de="nimmst" data-vi="lấy (bạn)">nimmst</span> · er/sie/es <span class="term" data-de="nimmt" data-vi="lấy (anh ấy)">nimmt</span> · wir nehmen</li>
</ul>
<h3 class="sub">3. Đói và no</h3>
<ul>
  <li>Ich habe <span class="term" data-de="der Hunger" data-vi="cơn đói">Hunger</span>. Ich möchte <span class="term" data-de="das Mittagessen" data-vi="bữa trưa">Mittagessen</span>.</li>
  <li><span class="term" data-de="hungrig" data-vi="đói">Hungrig</span> · <span class="term" data-de="satt" data-vi="no">satt</span>: Ich bin satt.</li>
  <li>Das Essen <span class="term" data-de="schmecken" data-vi="ngon, vừa miệng">schmeckt</span> <span class="term" data-de="lecker" data-vi="ngon">lecker</span>!</li>
</ul>
<div class="note">Schnellmerk: <b>essen</b> bất quy tắc: du isst (ss!), er isst. <b>nehmen</b> đổi e→i: du nimmst, er nimmt. <b>trinken</b> đều đặn.</div>`,
          grammar: [
            {
              id: "a1-essen-trinken",
              title: "essen/trinken/nehmen chia hiện tại",
              rule: "<p><b>essen</b>: ich esse · du <b>isst</b> · er/sie/es <b>isst</b> · wir essen · ihr esst · sie/Sie essen</p><p><b>trinken</b> (đều): ich trinke · du trinkst · er/sie/es trinkt · wir trinken · ihr trinkt · sie/Sie trinken</p><p><b>nehmen</b> (e→i): ich nehme · du <b>nimmst</b> · er/sie/es <b>nimmt</b> · wir nehmen · ihr nehmt · sie/Sie nehmen</p>",
              examples: ["Ich esse Brot mit Käse.", "Was trinkst du? — Ich trinke Wasser.", "Der Kellner nimmt die Bestellung auf."],
              exercise: { type: "fill", theme: "u4-l6", cat: "essen/trinken/nehmen", q: "Du ___ Brot. (essen)", answers: ["isst"], answer: "isst", ex: "du + essen → du isst" }
            }
          ],
          listen: [
            { id: "u4-l6-l1", text: "Ich habe Hunger. Ich möchte Mittagessen.", tip: "Nghe từ đói và bữa trưa", slow: true },
            { id: "u4-l6-l2", text: "Das Essen schmeckt lecker!" }
          ],
          speak: [
            { id: "u4-l6-s1", prompt: "Nói: 'Bạn ăn gì?'", model: "Was isst du?", hint: "Was · isst · du" }
          ]
        },
        {
          id: "u4-l7",
          name: "Im Supermarkt",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M2 2h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
          desc: "Siêu thị · mua đồ ăn · cân, lạng",
          content: `<h2>Im Supermarkt</h2>
<div class="hint">Siêu thị · mua đồ ăn · cân, lạng</div>
<h3 class="sub">1. Ở siêu thị</h3>
<ul>
  <li><span class="term" data-de="der Supermarkt" data-vi="siêu thị">Supermarkt</span> · <span class="term" data-de="der Markt" data-vi="chợ">Markt</span> · <span class="term" data-de="einkaufen" data-vi="đi mua sắm">Einkaufen</span></li>
  <li><span class="term" data-de="der Einkaufswagen" data-vi="xe đẩy mua hàng">Einkaufswagen</span> · <span class="term" data-de="der Einkaufskorb" data-vi="giỏ mua hàng">Einkaufskorb</span> · <span class="term" data-de="die Tüte" data-vi="túi, bao">Tüte</span></li>
</ul>
<h3 class="sub">2. Cân và khối lượng</h3>
<ul>
  <li><span class="term" data-de="das Kilo" data-vi="ki-lô-gam">Kilo</span> · <span class="term" data-de="das Gramm" data-vi="gam">Gramm</span> · <span class="term" data-de="das Pfund" data-vi="nửa cân">Pfund</span></li>
  <li>Ich nehme <span class="term" data-de="ein halbes Kilo" data-vi="nửa ki-lô">ein halbes Kilo</span> Käse.</li>
</ul>
<h3 class="sub">3. Thanh toán</h3>
<ul>
  <li>An der <span class="term" data-de="die Kasse" data-vi="quầy thanh toán">Kasse</span>: Das ist alles. — Das <span class="term" data-de="das macht" data-vi="tổng cộng là">macht</span> zwölf Euro.</li>
  <li><span class="term" data-de="der Kassenzettel" data-vi="hóa đơn thanh toán">Kassenzettel</span> · <span class="term" data-de="die Ware" data-vi="hàng hóa">Ware</span> · <span class="term" data-de="das Produkt" data-vi="sản phẩm">Produkt</span></li>
</ul>
<div class="note">Schnellmerk: <b>ein halbes Kilo</b> = nửa ki-lô · <b>ein Pfund</b> = nửa ki-lô · <b>das macht … Euro</b> = tổng cộng … euro.</div>`,
          listen: [
            { id: "u4-l7-l1", text: "Ich gehe in den Supermarkt und kaufe Obst und Gemüse.", tip: "Nghe hoạt động mua sắm", slow: true },
            { id: "u4-l7-l2", text: "Das macht zwölf Euro. — Hier, bitte." }
          ],
          speak: [
            { id: "u4-l7-s1", prompt: "Hỏi: 'Cái đó giá bao nhiêu?'", model: "Was kostet das?", hint: "Was · kos·tet · das" }
          ]
        }
      ]
    },
    {
      id: "u5",
      title: "Einkaufen",
      desc: "Mua sắm · giá cả · màu sắc · quần áo · kein/keine",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
      lektionen: [
        {
          id: "u5-l1",
          name: "Einkaufen: Wo kaufen wir ein?",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
          desc: "Mua sắm · các loại cửa hàng · giờ mở cửa",
          content: `<h2>Einkaufen: Wo kaufen wir ein?</h2>
<div class="hint">Mua sắm · các loại cửa hàng · giờ mở cửa</div>
<h3 class="sub">1. Đi mua sắm</h3>
<ul>
  <li>Ich <span class="term" data-de="einkaufen" data-vi="mua sắm">kaufe ein</span>. — Wir gehen <span class="term" data-de="einkaufen gehen" data-vi="đi mua sắm">einkaufen</span>.</li>
  <li>Ich gehe <span class="term" data-de="in den Supermarkt" data-vi="vào siêu thị">in den Supermarkt</span>. / Wir gehen <span class="term" data-de="ins Geschäft" data-vi="vào cửa hàng">ins Geschäft</span>.</li>
  <li>Ich brauche eine <span class="term" data-de="die Einkaufsliste" data-vi="danh sách mua sắm">Einkaufsliste</span>.</li>
</ul>
<h3 class="sub">2. Các loại cửa hàng</h3>
<ul>
  <li><span class="term" data-de="der Supermarkt" data-vi="siêu thị">Supermarkt</span> · <span class="term" data-de="das Geschäft" data-vi="cửa hàng">Geschäft</span> · <span class="term" data-de="das Kaufhaus" data-vi="trung tâm thương mại">Kaufhaus</span></li>
  <li><span class="term" data-de="die Bäckerei" data-vi="tiệm bánh mì">Bäckerei</span> · <span class="term" data-de="die Metzgerei" data-vi="hàng thịt">Metzgerei</span> · <span class="term" data-de="der Wochenmarkt" data-vi="chợ phiên hằng tuần">Wochenmarkt</span></li>
</ul>
<h3 class="sub">3. Giờ mở cửa</h3>
<ul>
  <li><span class="term" data-de="geöffnet" data-vi="mở cửa">Geöffnet</span> bis 20 Uhr. · <span class="term" data-de="geschlossen" data-vi="đóng cửa">Geschlossen</span> am Sonntag.</li>
  <li>Die <span class="term" data-de="die Öffnungszeiten" data-vi="giờ mở cửa">Öffnungszeiten</span>: Montag bis Samstag, 8–20 Uhr.</li>
  <li>Das <span class="term" data-de="das Angebot" data-vi="hàng khuyến mãi">Angebot</span> der Woche: Äpfel für 1,99 €.</li>
</ul>
<div class="note">Schnellmerk: Cửa hàng đuôi <b>-ei</b> là nơi sản xuất/bán: die Bäck<b>erei</b> (bánh), die Metzger<b>ei</b> (thịt).</div>`,
          listen: [
            { id: "u5-l1-l1", text: "Ich gehe in den Supermarkt und kaufe ein.", tip: "Nghe giới từ in + Akkusativ sau gehen", slow: true },
            { id: "u5-l1-l2", text: "Das Geschäft ist von Montag bis Samstag geöffnet." }
          ],
          speak: [
            { id: "u5-l1-s1", prompt: "Nói: 'Tôi cần một danh sách mua sắm'", model: "Ich brauche eine Einkaufsliste.", hint: "Ich · brau·che · ei·ne · Ein·kaufs·lis·te" }
          ]
        },
        {
          id: "u5-l2",
          name: "Was kostet das?",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/></svg>`,
          desc: "Hỏi giá · Was kostet / Wie viel kostet · euro và cent",
          content: `<h2>Was kostet das?</h2>
<div class="hint">Hỏi giá · Was kostet / Wie viel kostet · euro và cent</div>
<h3 class="sub">1. Hỏi giá</h3>
<ul>
  <li><span class="term" data-de="Was kostet das?" data-vi="Cái đó giá bao nhiêu?">Was kostet das?</span> — Das kostet <span class="term" data-de="drei Euro" data-vi="ba euro">drei Euro</span>.</li>
  <li><span class="term" data-de="Wie viel kostet das?" data-vi="Cái đó giá bao nhiêu?">Wie viel kostet das?</span> — Es kostet <span class="term" data-de="fünf Euro fünfzig" data-vi="5 euro 50 xu">fünf Euro fünfzig</span>.</li>
  <li><span class="term" data-de="Wie viel kosten die Schuhe?" data-vi="Đôi giày giá bao nhiêu?">Wie viel kosten die Schuhe?</span> — Sie kosten <span class="term" data-de="vierzig Euro" data-vi="bốn mươi euro">vierzig Euro</span>.</li>
</ul>
<h3 class="sub">2. Giá cả và tiền</h3>
<ul>
  <li><span class="term" data-de="der Preis" data-vi="giá cả">Preis</span> · <span class="term" data-de="billig" data-vi="rẻ">billig</span> · <span class="term" data-de="teuer" data-vi="đắt">teuer</span> · <span class="term" data-de="günstig" data-vi="giá phải chăng">günstig</span></li>
  <li>Tiền Đức: <span class="term" data-de="der Euro" data-vi="đồng euro">Euro</span> và <span class="term" data-de="der Cent" data-vi="xu">Cent</span>: 1,99 € = ein Euro neunundneunzig.</li>
</ul>
<h3 class="sub">3. Đắt hay rẻ?</h3>
<ul>
  <li>Das ist <span class="term" data-de="zu teuer" data-vi="quá đắt">zu teuer</span>! · Das ist <span class="term" data-de="sehr billig" data-vi="rất rẻ">sehr billig</span>.</li>
  <li>Gibt es <span class="term" data-de="etwas Billigeres" data-vi="thứ gì đó rẻ hơn">etwas Billigeres</span>?</li>
</ul>
<div class="note">Schnellmerk: Giá tiền: euro đọc trước, cent đọc sau: <b>2,50 €</b> = zwei Euro fünfzig. Số lẻ dùng <b>Komma</b> (dấu phẩy), không phải dấu chấm.</div>`,
          grammar: [
            {
              id: "a1-preise-kosten",
              title: "Preise: Was kostet / Wie viel kosten",
              rule: "<p>Hỏi giá một vật (số ít): <b>Was kostet das?</b> / <b>Wie viel kostet das?</b> — trả lời: Das kostet … Euro.</p><p>Số nhiều: <b>Wie viel kosten die Schuhe?</b> — Sie kosten … Euro.</p><p>Giá tiền: <b>Euro</b> + <b>Cent</b>: 5,50 € = fünf Euro fünfzig · 0,99 € = neunundneunzig Cent.</p>",
              examples: ["Was kostet das? — Drei Euro.", "Wie viel kosten die Schuhe? — Vierzig Euro.", "Das Brot kostet zwei Euro neunzig."],
              exercise: { type: "fill", theme: "u5-l2", cat: "Preise", q: "Wie viel ___ die Schuhe? (kosten)", answers: ["kosten"], answer: "kosten", ex: "die Schuhe (số nhiều) → kosten" }
            }
          ],
          listen: [
            { id: "u5-l2-l1", text: "Was kostet das? — Das kostet drei Euro.", tip: "Nghe câu hỏi giá và câu trả lời", slow: true },
            { id: "u5-l2-l2", text: "Wie viel kosten die Schuhe? — Sie kosten vierzig Euro." }
          ],
          speak: [
            { id: "u5-l2-s1", prompt: "Hỏi: 'Cái đó giá bao nhiêu?'", model: "Was kostet das?", hint: "Was · kos·tet · das" },
            { id: "u5-l2-s2", prompt: "Trả lời: 'Cái đó giá 3 euro'", model: "Das kostet drei Euro.", hint: "Das · kos·tet · drei · Eu·ro" }
          ]
        },
        {
          id: "u5-l3",
          name: "Die Farben",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/></svg>`,
          desc: "Màu sắc · Welche Farbe? · màu + danh từ",
          content: `<h2>Die Farben</h2>
<div class="hint">Màu sắc · Welche Farbe hat…? · màu + danh từ</div>
<h3 class="sub">1. Màu cơ bản</h3>
<ul>
  <li><span class="term" data-de="rot" data-vi="màu đỏ">rot</span> · <span class="term" data-de="blau" data-vi="màu xanh dương">blau</span> · <span class="term" data-de="grün" data-vi="màu xanh lá">grün</span> · <span class="term" data-de="gelb" data-vi="màu vàng">gelb</span></li>
  <li><span class="term" data-de="schwarz" data-vi="màu đen">schwarz</span> · <span class="term" data-de="weiß" data-vi="màu trắng">weiß</span> · <span class="term" data-de="grau" data-vi="màu xám">grau</span> · <span class="term" data-de="braun" data-vi="màu nâu">braun</span></li>
  <li><span class="term" data-de="orange" data-vi="màu cam">orange</span> · <span class="term" data-de="lila" data-vi="màu tím">lila</span> · <span class="term" data-de="rosa" data-vi="màu hồng">rosa</span></li>
</ul>
<h3 class="sub">2. Màu của đồ vật</h3>
<ul>
  <li><span class="term" data-de="die Farbe" data-vi="màu sắc">Farbe</span>: Welche Farbe hat das T-Shirt? — Das T-Shirt ist <span class="term" data-de="blau" data-vi="màu xanh">blau</span>.</li>
  <li>Ich möchte das Hemd <span class="term" data-de="in Blau" data-vi="màu xanh">in Blau</span>.</li>
</ul>
<h3 class="sub">3. Tính từ màu + danh từ</h3>
<ul>
  <li>ein <span class="term" data-de="roter Apfel" data-vi="quả táo đỏ">roter Apfel</span> · eine <span class="term" data-de="gelbe Banane" data-vi="quả chuối vàng">gelbe Banane</span></li>
  <li>ein <span class="term" data-de="grüner Salat" data-vi="món xà lách xanh">grüner Salat</span> · <span class="term" data-de="schwarzer Kaffee" data-vi="cà phê đen">schwarzer Kaffee</span></li>
</ul>
<div class="note">Schnellmerk: Tính từ màu đi sau <b>sein</b> không đổi: Das T-Shirt ist <b>blau</b>. Trước danh từ thì thêm đuôi theo giống: ein <b>roter</b> Apfel (der), eine <b>gelbe</b> Banane (die).</div>`,
          listen: [
            { id: "u5-l3-l1", text: "rot, blau, grün, gelb, schwarz, weiß", tip: "Nghe và nhắc lại từng màu", slow: true },
            { id: "u5-l3-l2", text: "Welche Farbe hat das T-Shirt? — Das T-Shirt ist blau." },
            { id: "u5-l3-l3", text: "Ich möchte das Hemd in Blau." }
          ],
          speak: [
            { id: "u5-l3-s1", prompt: "Nói: 'Chiếc áo phông màu xanh'", model: "Das T-Shirt ist blau.", hint: "Das · T-Shirt · ist · blau" }
          ]
        },
        {
          id: "u5-l4",
          name: "Die Kleidung",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`,
          desc: "Quần áo · die Hose, das Hemd · mua quần áo",
          content: `<h2>Die Kleidung</h2>
<div class="hint">Quần áo · article đúng · mua quần áo</div>
<h3 class="sub">1. Quần áo cơ bản</h3>
<ul>
  <li><span class="term" data-de="die Kleidung" data-vi="quần áo">Kleidung</span> · <span class="term" data-de="die Hose" data-vi="quần dài">Hose</span> · <span class="term" data-de="das Hemd" data-vi="áo sơ mi">Hemd</span> · <span class="term" data-de="das T-Shirt" data-vi="áo phông">T-Shirt</span></li>
  <li><span class="term" data-de="die Jacke" data-vi="áo khoác">Jacke</span> · <span class="term" data-de="der Pullover" data-vi="áo len">Pullover</span> · <span class="term" data-de="der Rock" data-vi="chân váy">Rock</span> · <span class="term" data-de="das Kleid" data-vi="váy liền">Kleid</span></li>
  <li><span class="term" data-de="der Mantel" data-vi="áo choàng">Mantel</span> · <span class="term" data-de="der Anzug" data-vi="bộ vest">Anzug</span></li>
</ul>
<h3 class="sub">2. Giày và phụ kiện</h3>
<ul>
  <li><span class="term" data-de="die Schuhe" data-vi="đôi giày">Schuhe</span> · <span class="term" data-de="die Socken" data-vi="đôi tất">Socken</span> · <span class="term" data-de="der Hut" data-vi="cái mũ">Hut</span> · <span class="term" data-de="der Schal" data-vi="khăn quàng">Schal</span></li>
  <li><span class="term" data-de="die Handschuhe" data-vi="đôi găng tay">Handschuhe</span> · <span class="term" data-de="die Tasche" data-vi="túi xách">Tasche</span> · <span class="term" data-de="der Gürtel" data-vi="thắt lưng">Gürtel</span></li>
</ul>
<h3 class="sub">3. Mua quần áo</h3>
<ul>
  <li>Ich <span class="term" data-de="suchen" data-vi="tìm">suche</span> eine Hose. — Welche <span class="term" data-de="die Größe" data-vi="cỡ, size">Größe</span> brauchen Sie?</li>
  <li>Die Jacke <span class="term" data-de="passen" data-vi="vừa">passt</span> gut. / Die Hose passt <span class="term" data-de="nicht" data-vi="không">nicht</span>.</li>
</ul>
<div class="note">Schnellmerk: Học quần áo theo article: <b>die</b> Hose, <b>das</b> Hemd, <b>der</b> Rock — danh từ đuôi -e thường giống cái.</div>`,
          grammar: [
            {
              id: "a1-akkusativ-einkauf",
              title: "Akkusativ beim Einkaufen",
              rule: "<p>Khi mua sắm, sau <b>kaufen</b>, <b>suchen</b>, <b>brauchen</b>, <b>möchten</b> danh từ đi Akkusativ:</p><p>der → <b>den</b>: Ich kaufe <b>den</b> Mantel. · die → <b>die</b>: Ich suche <b>die</b> Hose. · das → <b>das</b>: Ich brauche <b>das</b> T-Shirt.</p><p>Bất định: <b>einen</b> (der) · <b>eine</b> (die) · <b>ein</b> (das): Ich kaufe <b>eine</b> Jacke.</p>",
              examples: ["Ich kaufe den Mantel.", "Ich suche eine Hose.", "Sie braucht das T-Shirt in Blau."],
              exercise: { type: "fill", theme: "u5-l4", cat: "Akkusativ beim Einkaufen", q: "Ich kaufe ___ Mantel. (der)", answers: ["den"], answer: "den", ex: "der → Akkusativ den" }
            }
          ],
          listen: [
            { id: "u5-l4-l1", text: "Ich suche eine Hose. — Welche Größe brauchen Sie?", tip: "Nghe cuộc hội thoại mua quần áo", slow: true },
            { id: "u5-l4-l2", text: "Ich kaufe den Mantel und die Jacke." }
          ],
          speak: [
            { id: "u5-l4-s1", prompt: "Nói: 'Tôi đang tìm một cái áo khoác'", model: "Ich suche eine Jacke.", hint: "Ich · su·che · ei·ne · Ja·cke" }
          ]
        },
        {
          id: "u5-l5",
          name: "Im Geschäft",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M2 2h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
          desc: "Trong cửa hàng · anprobieren · kein/keine",
          content: `<h2>Im Geschäft</h2>
<div class="hint">Trong cửa hàng · thử đồ · kein/keine phủ định</div>
<h3 class="sub">1. Vào cửa hàng</h3>
<ul>
  <li><span class="term" data-de="Kann ich Ihnen helfen?" data-vi="Tôi giúp gì được cho anh/chị?">Kann ich Ihnen helfen?</span> — Ich möchte gern <span class="term" data-de="anprobieren" data-vi="thử (quần áo)">anprobieren</span>.</li>
  <li>Die <span class="term" data-de="die Umkleidekabine" data-vi="phòng thử đồ">Umkleidekabine</span> ist dort. — Welche <span class="term" data-de="die Größe" data-vi="cỡ">Größe</span> haben Sie?</li>
</ul>
<h3 class="sub">2. Không có…: kein/keine</h3>
<ul>
  <li>Ich habe <span class="term" data-de="kein Geld" data-vi="không có tiền">kein Geld</span>. / Ich habe <span class="term" data-de="keine Zeit" data-vi="không có thời gian">keine Zeit</span>.</li>
  <li>Wir haben <span class="term" data-de="keine Jacke" data-vi="không có áo khoác">keine Jacke</span> in Ihrer Größe. — Das ist <span class="term" data-de="kein Problem" data-vi="không vấn đề gì">kein Problem</span>.</li>
</ul>
<h3 class="sub">3. Mua hay không</h3>
<ul>
  <li>Ich nehme die Jacke. / Ich nehme sie <span class="term" data-de="nicht" data-vi="không">nicht</span>.</li>
  <li><span class="term" data-de="der Kunde" data-vi="khách hàng (nam)">Kunde</span> · <span class="term" data-de="die Kundin" data-vi="khách hàng (nữ)">Kundin</span> · <span class="term" data-de="die Verkäuferin" data-vi="người bán hàng (nữ)">Verkäuferin</span></li>
</ul>
<div class="note">Schnellmerk: <b>kein/keine</b> phủ định <b>danh từ</b> (giống ein/keine): kein Geld, keine Zeit. <b>nicht</b> phủ định động từ/tính từ: Ich nehme sie <b>nicht</b>.</div>`,
          grammar: [
            {
              id: "a1-kein-keine",
              title: "Negation: kein/keine (phủ định danh từ)",
              rule: "<p>Phủ định danh từ dùng <b>kein</b> — chia giống hệt <b>ein</b>:</p><p>der/das → <b>kein</b>: kein Geld, kein Problem · die/Plural → <b>keine</b>: keine Zeit, keine Jacke</p><p>Akkusativ: der → <b>keinen</b>: Ich habe <b>keinen</b> Mantel. · die → <b>keine</b> · das → <b>kein</b>.</p><p>Phủ định động từ/tính từ dùng <b>nicht</b>: Ich nehme die Jacke <b>nicht</b>.</p>",
              examples: ["Ich habe kein Geld.", "Wir haben keine Jacke in Ihrer Größe.", "Ich nehme die Hose nicht."],
              exercise: { type: "fill", theme: "u5-l5", cat: "kein/keine", q: "Ich habe ___ Zeit. (không có)", answers: ["keine"], answer: "keine", ex: "die Zeit → keine Zeit" }
            }
          ],
          listen: [
            { id: "u5-l5-l1", text: "Kann ich Ihnen helfen? — Ich möchte gern anprobieren.", tip: "Nghe câu mời giúp đỡ của nhân viên bán hàng", slow: true },
            { id: "u5-l5-l2", text: "Wir haben keine Jacke in Ihrer Größe. Es tut mir leid." }
          ],
          speak: [
            { id: "u5-l5-s1", prompt: "Hỏi: 'Có áo khoác màu đỏ không?'", model: "Haben Sie eine rote Jacke?", hint: "Ha·ben · Sie · ei·ne · ro·te · Ja·cke" }
          ]
        },
        {
          id: "u5-l6",
          name: "Der Einkauf",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l1.5 10h15L21 9z"/><path d="M3 9h18"/><path d="M9 9l1-5h4l1 5"/></svg>`,
          desc: "Mua hàng · cân lạng · tổng tiền · trả tiền",
          content: `<h2>Der Einkauf</h2>
<div class="hint">Mua hàng · cân lạng · tổng tiền · trả tiền</div>
<h3 class="sub">1. Mua theo cân</h3>
<ul>
  <li>Ich nehme <span class="term" data-de="ein Kilo Tomaten" data-vi="một ki-lô cà chua">ein Kilo Tomaten</span> und <span class="term" data-de="ein Pfund Käse" data-vi="nửa cân phô mai">ein Pfund Käse</span>.</li>
  <li><span class="term" data-de="ein halbes Kilo" data-vi="nửa ki-lô">Ein halbes Kilo</span> Äpfel, bitte. — <span class="term" data-de="sonst noch etwas" data-vi="còn gì nữa không?">Sonst noch etwas?</span></li>
</ul>
<h3 class="sub">2. Tổng tiền</h3>
<ul>
  <li>Das macht <span class="term" data-de="zusammen" data-vi="tổng cộng">zusammen</span> <span class="term" data-de="achteinhalb Euro" data-vi="8,5 euro">achteinhalb Euro</span>.</li>
  <li><span class="term" data-de="bezahlen" data-vi="trả tiền">Bezahlen</span> Sie bar oder mit <span class="term" data-de="die Karte" data-vi="thẻ">Karte</span>?</li>
  <li>Mit Karte, bitte. / <span class="term" data-de="bar" data-vi="tiền mặt">Bar</span>, bitte. Hier ist das <span class="term" data-de="das Geld" data-vi="tiền">Geld</span>.</li>
</ul>
<h3 class="sub">3. Tiền thừa</h3>
<ul>
  <li><span class="term" data-de="das Wechselgeld" data-vi="tiền thối lại">Wechselgeld</span>: <span class="term" data-de="Stimmt so" data-vi="Thôi, khỏi thối!">Stimmt so</span>!</li>
  <li>Danke schön! — <span class="term" data-de="Bitte sehr" data-vi="Không có gì">Bitte sehr</span>! — <span class="term" data-de="bis morgen" data-vi="hẹn gặp ngày mai">Bis morgen</span>!</li>
</ul>
<div class="note">Schnellmerk: <b>ein halbes Kilo</b> = nửa ki-lô · <b>ein Pfund</b> = nửa ki-lô · <b>das macht zusammen …</b> = tổng cộng là…</div>`,
          listen: [
            { id: "u5-l6-l1", text: "Ich nehme ein Kilo Tomaten und ein Pfund Käse.", tip: "Nghe số lượng mua hàng", slow: true },
            { id: "u5-l6-l2", text: "Das macht zusammen achteinhalb Euro. — Mit Karte, bitte." }
          ],
          speak: [
            { id: "u5-l6-s1", prompt: "Hỏi: 'Trả tiền mặt hay bằng thẻ?'", model: "Zahlen Sie bar oder mit Karte?", hint: "Zah·len · Sie · bar · o·der · mit · Kar·te" }
          ]
        },
        {
          id: "u5-l7",
          name: "Reklamation & Umtausch",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
          desc: "Đổi trả hàng · khiếu nại · nhận lại tiền",
          content: `<h2>Reklamation & Umtausch</h2>
<div class="hint">Đổi trả hàng · khiếu nại · nhận lại tiền</div>
<h3 class="sub">1. Đổi trả</h3>
<ul>
  <li>Ich möchte diese Hose <span class="term" data-de="umtauschen" data-vi="đổi trả">umtauschen</span>.</li>
  <li>Die Hose ist <span class="term" data-de="kaputt" data-vi="hỏng">kaputt</span>. Der <span class="term" data-de="der Reißverschluss" data-vi="khóa kéo">Reißverschluss</span> ist kaputt.</li>
  <li>Ich möchte mein <span class="term" data-de="das Geld zurück" data-vi="tiền lại">Geld zurück</span>.</li>
</ul>
<h3 class="sub">2. Hóa đơn và điều kiện</h3>
<ul>
  <li>Haben Sie den <span class="term" data-de="der Kassenzettel" data-vi="hóa đơn">Kassenzettel</span>? — Ja, <span class="term" data-de="hier bitte" data-vi="đây ạ">hier bitte</span>.</li>
  <li>Die Reklamation ist <span class="term" data-de="innerhalb von" data-vi="trong vòng">innerhalb von</span> 14 Tagen <span class="term" data-de="möglich" data-vi="khả thi">möglich</span>.</li>
</ul>
<h3 class="sub">3. Giao tiếp lịch sự</h3>
<ul>
  <li>Ich bin <span class="term" data-de="zufrieden" data-vi="hài lòng">zufrieden</span> / <span class="term" data-de="unzufrieden" data-vi="không hài lòng">unzufrieden</span>.</li>
  <li><span class="term" data-de="Es tut mir leid" data-vi="Tôi rất tiếc">Es tut mir leid</span>. — Das ist <span class="term" data-de="in Ordnung" data-vi="ổn thỏa">in Ordnung</span>.</li>
</ul>
<div class="note">Schnellmerk: Đổi trả cần mang <b>den Kassenzettel</b> (hóa đơn). Cửa hàng thường đổi trong 14 ngày; muốn lấy lại tiền nói: Ich möchte mein Geld <b>zurück</b>.</div>`,
          listen: [
            { id: "u5-l7-l1", text: "Ich möchte diese Hose umtauschen. Der Reißverschluss ist kaputt.", tip: "Nghe lý do đổi trả hàng", slow: true },
            { id: "u5-l7-l2", text: "Haben Sie den Kassenzettel? — Ja, hier bitte." }
          ],
          speak: [
            { id: "u5-l7-s1", prompt: "Nói: 'Tôi muốn đổi trả chiếc áo khoác này'", model: "Ich möchte diese Jacke umtauschen.", hint: "Ich · möch·te · die·se · Ja·cke · um·tau·schen" }
          ]
        }
      ]
    },
    {
      id: "u6",
      title: "Zeit & Tagesablauf",
      desc: "Thói quen hằng ngày · buổi trong ngày · chia động từ · trennbare Verben",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>`,
      lektionen: [
        {
          id: "u6-l1",
          name: "Mein Tagesablauf",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>`,
          desc: "Thói quen hằng ngày · chia động từ hiện tại",
          content: `<h2>Mein Tagesablauf</h2>
<div class="hint">Thói quen hằng ngày · chia động từ hiện tại</div>
<h3 class="sub">1. Buổi sáng</h3>
<ul>
  <li>Ich <span class="term" data-de="aufstehen" data-vi="thức dậy">stehe um sechs Uhr auf</span>.</li>
  <li>Dann <span class="term" data-de="duschen" data-vi="tắm vòi hoa sen">dusche</span> ich und <span class="term" data-de="frühstücken" data-vi="ăn sáng">frühstücke</span>.</li>
  <li>Ich <span class="term" data-de="die Zähne putzen" data-vi="đánh răng">putze mir die Zähne</span> und <span class="term" data-de="sich anziehen" data-vi="mặc quần áo">ziehe mich an</span>.</li>
</ul>
<h3 class="sub">2. Ngày làm việc</h3>
<ul>
  <li>Um acht Uhr <span class="term" data-de="arbeiten" data-vi="làm việc">arbeite</span> ich. Ich <span class="term" data-de="zu Mittag essen" data-vi="ăn trưa">esse zu Mittag</span>.</li>
  <li>Um siebzehn Uhr <span class="term" data-de="nach Hause gehen" data-vi="về nhà">gehe ich nach Hause</span>.</li>
</ul>
<h3 class="sub">3. Buổi tối</h3>
<ul>
  <li>Am Abend <span class="term" data-de="kochen" data-vi="nấu ăn">koche</span> ich und <span class="term" data-de="fernsehen" data-vi="xem TV">sehe fern</span>.</li>
  <li>Um zehn Uhr <span class="term" data-de="schlafen" data-vi="ngủ">schlafe</span> ich.</li>
  <li>Das ist mein <span class="term" data-de="der Tagesablauf" data-vi="lịch trình trong ngày">Tagesablauf</span>.</li>
</ul>
<div class="note">Schnellmerk: Kể việc hằng ngày luôn ở <b>hiện tại</b> với trạng từ thời gian: um 6 Uhr (mốc giờ) · dann (rồi) · am Abend (buổi tối).</div>`,
          grammar: [
            {
              id: "a1-praesens-konjugation",
              title: "Präsens: chia động từ hiện tại (đều)",
              rule: "<p>Chia động từ hiện tại: bỏ <b>-en</b> của nguyên mẫu, thêm đuôi theo ngôi:</p><p>ich <b>-e</b> (ich arbeite) · du <b>-st</b> (du arbeitest) · er/sie/es <b>-t</b> (er arbeitet) · wir <b>-en</b> (wir arbeiten) · ihr <b>-t</b> (ihr arbeitet) · sie/Sie <b>-en</b> (sie arbeiten)</p><p>Động từ tận cùng -t/-d (arbeiten, baden) chèn <b>-e-</b> trước đuôi: du arbeit<b>est</b> · er arbeit<b>et</b>.</p>",
              examples: ["Ich arbeite von acht bis vierzehn Uhr.", "Du frühstückst um sieben Uhr.", "Er kocht am Abend."],
              exercise: { type: "fill", theme: "u6-l1", cat: "Präsens", q: "Du ___ um sieben Uhr. (frühstücken)", answers: ["frühstückst"], answer: "frühstückst", ex: "du + frühstücken → frühstückst" }
            }
          ],
          listen: [
            { id: "u6-l1-l1", text: "Ich stehe um sechs Uhr auf, dusche und frühstücke.", tip: "Nghe chuỗi hoạt động buổi sáng", slow: true },
            { id: "u6-l1-l2", text: "Am Abend koche ich und sehe fern." }
          ],
          speak: [
            { id: "u6-l1-s1", prompt: "Nói: 'Tôi dậy lúc 6 giờ'", model: "Ich stehe um sechs Uhr auf.", hint: "Ich · ste·he · um · sechs · Uhr · auf" }
          ]
        },
        {
          id: "u6-l2",
          name: "Die Tageszeiten",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M12 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/></svg>`,
          desc: "Các buổi trong ngày · am + buổi · morgens, abends",
          content: `<h2>Die Tageszeiten</h2>
<div class="hint">Các buổi trong ngày · am Morgen · morgens, abends</div>
<h3 class="sub">1. Các buổi</h3>
<ul>
  <li><span class="term" data-de="der Morgen" data-vi="buổi sáng">Morgen</span> · <span class="term" data-de="der Vormittag" data-vi="buổi sáng muộn">Vormittag</span> · <span class="term" data-de="der Mittag" data-vi="buổi trưa">Mittag</span></li>
  <li><span class="term" data-de="der Nachmittag" data-vi="buổi chiều">Nachmittag</span> · <span class="term" data-de="der Abend" data-vi="buổi tối">Abend</span> · <span class="term" data-de="die Nacht" data-vi="ban đêm">Nacht</span></li>
</ul>
<h3 class="sub">2. am + buổi</h3>
<ul>
  <li><span class="term" data-de="am Morgen" data-vi="vào buổi sáng">Am Morgen</span> trinke ich Kaffee. · <span class="term" data-de="am Abend" data-vi="vào buổi tối">Am Abend</span> sehe ich fern.</li>
  <li><span class="term" data-de="am Vormittag" data-vi="vào buổi sáng muộn">Am Vormittag</span> arbeite ich. · <span class="term" data-de="am Nachmittag" data-vi="vào buổi chiều">Am Nachmittag</span> lerne ich Deutsch.</li>
  <li><span class="term" data-de="in der Nacht" data-vi="vào ban đêm">In der Nacht</span> schlafe ich. · <span class="term" data-de="zu Mittag" data-vi="vào buổi trưa">Zu Mittag</span> esse ich.</li>
</ul>
<h3 class="sub">3. Trạng từ thường xuyên</h3>
<ul>
  <li><span class="term" data-de="morgens" data-vi="hằng sáng">Morgens</span> stehe ich um sechs auf. · <span class="term" data-de="abends" data-vi="hằng tối">Abends</span> schlafe ich um zehn.</li>
  <li><span class="term" data-de="nachmittags" data-vi="vào các buổi chiều">Nachmittags</span> mache ich Sport.</li>
</ul>
<div class="note">Schnellmerk: <b>am</b> + buổi (am Morgen) chỉ một lần · <b>-s</b> ở cuối (morgens) chỉ thói quen lặp lại hằng ngày.</div>`,
          listen: [
            { id: "u6-l2-l1", text: "Am Morgen trinke ich Kaffee. Am Abend sehe ich fern.", tip: "Nghe am + buổi trong ngày", slow: true },
            { id: "u6-l2-l2", text: "Morgens stehe ich um sechs auf. Nachmittags mache ich Sport." },
            { id: "u6-l2-l3", text: "In der Nacht schlafe ich." }
          ],
          speak: [
            { id: "u6-l2-s1", prompt: "Nói: 'Buổi tối tôi xem TV'", model: "Am Abend sehe ich fern.", hint: "Am · A·bend · se·he · ich · fern" }
          ]
        },
        {
          id: "u6-l3",
          name: "Wann machst du was?",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`,
          desc: "Khi nào làm gì · um + giờ · động từ đổi nguyên âm",
          content: `<h2>Wann machst du was?</h2>
<div class="hint">Khi nào làm gì · um + giờ · động từ đổi nguyên âm (e→i, a→ä)</div>
<h3 class="sub">1. Hỏi khi nào</h3>
<ul>
  <li><span class="term" data-de="Wann stehst du auf?" data-vi="Khi nào bạn thức dậy?">Wann stehst du auf?</span> — <span class="term" data-de="um sieben Uhr" data-vi="lúc 7 giờ">Um sieben Uhr</span>.</li>
  <li><span class="term" data-de="Wann frühstückst du?" data-vi="Khi nào bạn ăn sáng?">Wann frühstückst du?</span> — Um <span class="term" data-de="halb acht" data-vi="7 giờ 30">halb acht</span>.</li>
  <li>Ich arbeite <span class="term" data-de="von acht bis sechzehn Uhr" data-vi="từ 8 đến 16 giờ">von acht bis sechzehn Uhr</span>.</li>
</ul>
<h3 class="sub">2. Động từ đổi nguyên âm (e→i, a→ä)</h3>
<ul>
  <li><span class="term" data-de="sprechen" data-vi="nói">sprechen</span>: du <span class="term" data-de="sprichst" data-vi="nói (bạn)">sprichst</span> · er spricht</li>
  <li><span class="term" data-de="lesen" data-vi="đọc">lesen</span>: du <span class="term" data-de="liest" data-vi="đọc (bạn)">liest</span> · er liest</li>
  <li><span class="term" data-de="schlafen" data-vi="ngủ">schlafen</span>: du <span class="term" data-de="schläfst" data-vi="ngủ (bạn)">schläfst</span> · er schläft · <span class="term" data-de="fahren" data-vi="lái xe">fahren</span>: du fährst</li>
</ul>
<div class="note">Schnellmerk: Đổi nguyên âm chỉ xảy ra ở ngôi <b>du</b> và <b>er/sie/es</b>: du sprichst, er schläft — còn wir/ihr/sie giữ nguyên: wir sprechen.</div>`,
          grammar: [
            {
              id: "a1-praesens-vokalwechsel",
              title: "Präsens: động từ đổi nguyên âm",
              rule: "<p>Một số động từ mạnh đổi nguyên âm gốc ở ngôi <b>du</b> và <b>er/sie/es</b>:</p><p>e → i(e): sprechen → du <b>sprichst</b> · lesen → du <b>liest</b> · nehmen → du <b>nimmst</b> · essen → du <b>isst</b></p><p>a → ä: schlafen → du <b>schläfst</b> · fahren → du <b>fährst</b> · laufen → du <b>läufst</b></p><p>wir/ihr/sie/Sie KHÔNG đổi: wir sprechen, ihr sprecht.</p>",
              examples: ["Er spricht gut Deutsch.", "Du schläfst um zehn Uhr.", "Wir fahren am Samstag nach Berlin."],
              exercise: { type: "fill", theme: "u6-l3", cat: "Präsens Vokalwechsel", q: "Du ___ um zehn Uhr. (schlafen)", answers: ["schläfst"], answer: "schläfst", ex: "a→ä ở ngôi du: schläfst" }
            }
          ],
          listen: [
            { id: "u6-l3-l1", text: "Wann stehst du auf? — Um sieben Uhr.", tip: "Nghe câu hỏi Wann + giờ trả lời", slow: true },
            { id: "u6-l3-l2", text: "Er spricht gut Deutsch und liest jeden Tag." }
          ],
          speak: [
            { id: "u6-l3-s1", prompt: "Hỏi: 'Khi nào bạn dậy?'", model: "Wann stehst du auf?", hint: "Wann · stehst · du · auf" }
          ]
        },
        {
          id: "u6-l4",
          name: "Trennbare Verben im Alltag",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
          desc: "Động từ tách · aufstehen, fernsehen, einkaufen, anrufen",
          content: `<h2>Trennbare Verben im Alltag</h2>
<div class="hint">Động từ tách · aufstehen, fernsehen, einkaufen, anrufen</div>
<h3 class="sub">1. Động từ tách phổ biến</h3>
<ul>
  <li><span class="term" data-de="aufstehen" data-vi="thức dậy">aufstehen</span> · <span class="term" data-de="fernsehen" data-vi="xem TV">fernsehen</span> · <span class="term" data-de="einkaufen" data-vi="mua sắm">einkaufen</span> · <span class="term" data-de="anrufen" data-vi="gọi điện">anrufen</span></li>
  <li><span class="term" data-de="mitkommen" data-vi="đi cùng">mitkommen</span> · <span class="term" data-de="mitbringen" data-vi="mang theo">mitbringen</span> · <span class="term" data-de="anfangen" data-vi="bắt đầu">anfangen</span></li>
</ul>
<h3 class="sub">2. Tiền tố rời xuống cuối câu</h3>
<ul>
  <li>Ich <span class="term" data-de="aufstehen" data-vi="thức dậy (chia)">stehe um sechs Uhr auf</span>.</li>
  <li>Er <span class="term" data-de="fernsehen" data-vi="xem TV (chia)">sieht am Abend fern</span>.</li>
  <li>Wir <span class="term" data-de="einkaufen" data-vi="mua sắm (chia)">kaufen am Samstag ein</span>.</li>
  <li><span class="term" data-de="anrufen" data-vi="gọi điện (mệnh lệnh)">Ruf mich an</span>! — Ich <span class="term" data-de="anrufen" data-vi="gọi điện (ich)">rufe dich an</span>.</li>
  <li>Der Unterricht <span class="term" data-de="anfangen" data-vi="bắt đầu (chia)">fängt um acht Uhr an</span>.</li>
</ul>
<h3 class="sub">3. Hỏi đáp và mẹo</h3>
<ul>
  <li>Wann <span class="term" data-de="stehst du auf?" data-vi="bạn dậy lúc nào?">stehst du auf?</span> — Um sieben.</li>
  <li>Wann <span class="term" data-de="sehen Sie fern?" data-vi="anh/chị xem TV lúc nào?">sehen Sie fern?</span> — Am Abend.</li>
  <li>Tiền tố luôn <span class="term" data-de="betont" data-vi="được nhấn trọng âm">betont</span>: AUS-ste-hen.</li>
</ul>
<div class="note">Schnellmerk: Trong câu trần thuật, động từ chia đứng vị trí 2, <b>tiền tố rời xuống cuối câu</b>: Ich stehe um 6 Uhr <b>auf</b>. Trọng âm rơi vào tiền tố: <b>auf</b>stehen, <b>fern</b>sehen.</div>`,
          grammar: [
            {
              id: "a1-trennbare-alltag",
              title: "Trennbare Verben: quy tắc tách",
              rule: "<p>Động từ tách: <b>auf</b>stehen, <b>fern</b>sehen, <b>ein</b>kaufen, <b>an</b>rufen, <b>mit</b>kommen, <b>an</b>fangen.</p><p>Câu trần thuật: động từ chia đứng vị trí 2, tiền tố <b>rời xuống cuối câu</b>: Ich stehe um 6 Uhr <b>auf</b>.</p><p>Câu hỏi/mệnh lệnh cũng tách: Wann <b>stehst</b> du <b>auf</b>? · <b>Ruf</b> mich <b>an</b>!</p>",
              examples: ["Ich stehe um sechs Uhr auf.", "Wir kaufen am Samstag ein.", "Ruf mich heute Abend an!"],
              exercise: { type: "fill", theme: "u6-l4", cat: "Trennbare Verben", q: "Ich ___ dich heute Abend ___. (anrufen)", answers: ["rufe an"], answer: "rufe an", ex: "anrufen → ich rufe … an" }
            }
          ],
          listen: [
            { id: "u6-l4-l1", text: "Ich stehe um sechs Uhr auf und frühstücke.", tip: "Nghe tiền tố tách ở cuối câu", slow: true },
            { id: "u6-l4-l2", text: "Wir kaufen am Samstag ein. Ruf mich an!" }
          ],
          speak: [
            { id: "u6-l4-s1", prompt: "Nói: 'Tối nay gọi cho tôi nhé!'", model: "Ruf mich heute Abend an!", hint: "Ruf · mich · heu·te · A·bend · an" }
          ]
        },
        {
          id: "u6-l5",
          name: "Freizeit & Hobbys",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M5 5c4 3 4 11 0 14"/><path d="M19 5c-4 3-4 11 0 14"/></svg>`,
          desc: "Thời gian rảnh · sở thích · hoạt động giải trí",
          content: `<h2>Freizeit & Hobbys</h2>
<div class="hint">Thời gian rảnh · sở thích · hoạt động giải trí</div>
<h3 class="sub">1. Sở thích</h3>
<ul>
  <li>Mein <span class="term" data-de="das Hobby" data-vi="sở thích">Hobby</span> ist <span class="term" data-de="Sport machen" data-vi="tập thể thao">Sport machen</span>.</li>
  <li>Ich <span class="term" data-de="spielen" data-vi="chơi">spiele</span> <span class="term" data-de="Fußball" data-vi="bóng đá">Fußball</span> und <span class="term" data-de="Klavier spielen" data-vi="chơi đàn piano">Klavier</span>.</li>
  <li><span class="term" data-de="Musik hören" data-vi="nghe nhạc">Musik hören</span> · <span class="term" data-de="lesen" data-vi="đọc sách">lesen</span> · <span class="term" data-de="zeichnen" data-vi="vẽ">zeichnen</span></li>
</ul>
<h3 class="sub">2. Thời gian rảnh</h3>
<ul>
  <li>In meiner <span class="term" data-de="die Freizeit" data-vi="thời gian rảnh">Freizeit</span> mache ich Sport oder <span class="term" data-de="spazieren gehen" data-vi="đi dạo">gehe spazieren</span>.</li>
  <li>Am Wochenende <span class="term" data-de="Freunde treffen" data-vi="gặp bạn bè">treffe ich Freunde</span> und <span class="term" data-de="ins Kino gehen" data-vi="đi xem phim">gehe ins Kino</span>.</li>
  <li>Ich habe <span class="term" data-de="viel Zeit" data-vi="nhiều thời gian">viel Zeit</span> / <span class="term" data-de="wenig Zeit" data-vi="ít thời gian">wenig Zeit</span>.</li>
</ul>
<div class="note">Schnellmerk: <b>Klavier spielen, Fußball spielen, Musik hören</b> — danh từ đứng sau spielen/hören đi Akkusativ: Fußball (không article), das Klavier.</div>`,
          listen: [
            { id: "u6-l5-l1", text: "In meiner Freizeit mache ich Sport und lese Bücher.", tip: "Nghe hoạt động giải trí", slow: true },
            { id: "u6-l5-l2", text: "Am Wochenende treffe ich Freunde und gehe ins Kino." }
          ],
          speak: [
            { id: "u6-l5-s1", prompt: "Nói: 'Tôi chơi bóng đá'", model: "Ich spiele Fußball.", hint: "Ich · spie·le · Fuß·ball" }
          ]
        },
        {
          id: "u6-l6",
          name: "Meine Woche",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
          desc: "Tuần của tôi · thứ + hoạt động · mức độ thường xuyên",
          content: `<h2>Meine Woche</h2>
<div class="hint">Tuần của tôi · thứ + hoạt động · mức độ thường xuyên</div>
<h3 class="sub">1. Hoạt động trong tuần</h3>
<ul>
  <li>Am <span class="term" data-de="der Montag" data-vi="thứ hai">Montag</span> arbeite ich. · Am <span class="term" data-de="der Mittwoch" data-vi="thứ tư">Mittwoch</span> lerne ich Deutsch.</li>
  <li>Am <span class="term" data-de="der Freitag" data-vi="thứ sáu">Freitag</span> <span class="term" data-de="feiern" data-vi="tổ chức tiệc">feiere</span> ich eine <span class="term" data-de="die Party" data-vi="bữa tiệc">Party</span>.</li>
</ul>
<h3 class="sub">2. Cuối tuần</h3>
<ul>
  <li>Am <span class="term" data-de="der Samstag" data-vi="thứ bảy">Samstag</span> <span class="term" data-de="einkaufen gehen" data-vi="đi mua sắm">gehe ich einkaufen</span>.</li>
  <li>Am <span class="term" data-de="der Sonntag" data-vi="chủ nhật">Sonntag</span> <span class="term" data-de="ausschlafen" data-vi="ngủ nướng">schlafe ich aus</span>.</li>
  <li>Am <span class="term" data-de="das Wochenende" data-vi="cuối tuần">Wochenende</span> <span class="term" data-de="Fahrrad fahren" data-vi="đi xe đạp">fahre ich Fahrrad</span>.</li>
</ul>
<h3 class="sub">3. Mức độ thường xuyên</h3>
<ul>
  <li><span class="term" data-de="immer" data-vi="luôn luôn">immer</span> · <span class="term" data-de="oft" data-vi="thường xuyên">oft</span> · <span class="term" data-de="manchmal" data-vi="thỉnh thoảng">manchmal</span> · <span class="term" data-de="selten" data-vi="hiếm khi">selten</span> · <span class="term" data-de="nie" data-vi="không bao giờ">nie</span></li>
  <li>Ich trinke <span class="term" data-de="nie Kaffee" data-vi="không bao giờ uống cà phê">nie Kaffee</span> am Abend.</li>
</ul>
<div class="note">Schnellmerk: Trạng từ chỉ mức độ đứng sau động từ chia: Ich <b>trinke</b> nie Kaffee. Thứ + hoạt động luôn dùng <b>am</b>: am Montag, am Wochenende.</div>`,
          listen: [
            { id: "u6-l6-l1", text: "Am Montag arbeite ich. Am Samstag gehe ich einkaufen.", tip: "Nghe thứ trong tuần + hoạt động", slow: true },
            { id: "u6-l6-l2", text: "Am Wochenende fahre ich Fahrrad." },
            { id: "u6-l6-l3", text: "Ich trinke nie Kaffee am Abend." }
          ],
          speak: [
            { id: "u6-l6-s1", prompt: "Nói: 'Chủ nhật tôi ngủ nướng'", model: "Am Sonntag schlafe ich aus.", hint: "Am · Sonn·tag · schla·fe · ich · aus" }
          ]
        },
        {
          id: "u6-l7",
          name: "Ein Tag in Deutschland",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18"/></svg>`,
          desc: "Kể về một ngày · ôn tập chia động từ + trennbare",
          content: `<h2>Ein Tag in Deutschland</h2>
<div class="hint">Kể về một ngày · ôn tập chia động từ + trennbare Verben</div>
<h3 class="sub">1. Kể chuyện cả ngày</h3>
<ul>
  <li><span class="term" data-de="zuerst" data-vi="đầu tiên">Zuerst</span> stehe ich auf und <span class="term" data-de="frühstücken" data-vi="ăn sáng">frühstücke</span>.</li>
  <li><span class="term" data-de="dann" data-vi="sau đó">Dann</span> fahre ich zur Arbeit und <span class="term" data-de="arbeiten" data-vi="làm việc">arbeite</span>.</li>
  <li><span class="term" data-de="danach" data-vi="rồi sau đó">Danach</span> kaufe ich das <span class="term" data-de="das Abendessen" data-vi="bữa tối">Abendessen</span> ein.</li>
  <li><span class="term" data-de="später" data-vi="lát nữa, về sau">Später</span> sehe ich fern und <span class="term" data-de="schlafen" data-vi="ngủ">schlafe</span>.</li>
</ul>
<h3 class="sub">2. Hỏi về ngày của bạn</h3>
<ul>
  <li><span class="term" data-de="Wie ist dein Tagesablauf?" data-vi="Lịch trình ngày của bạn thế nào?">Wie ist dein Tagesablauf?</span> — <span class="term" data-de="erzählen" data-vi="kể">Erzähl</span> mir von deinem Tag!</li>
  <li><span class="term" data-de="Was machst du am Morgen?" data-vi="Sáng bạn làm gì?">Was machst du am Morgen?</span> · <span class="term" data-de="Was machst du am Abend?" data-vi="Tối bạn làm gì?">Was machst du am Abend?</span></li>
</ul>
<div class="note">Schnellmerk: Kể ngày theo trình tự: <b>zuerst</b> (đầu tiên) → <b>dann</b> (sau đó) → <b>danach</b> (kế tiếp) → <b>später</b> (về sau).</div>`,
          listen: [
            { id: "u6-l7-l1", text: "Zuerst stehe ich auf, dann frühstücke ich und arbeite.", tip: "Nghe trình tự các hoạt động trong ngày", slow: true },
            { id: "u6-l7-l2", text: "Danach kaufe ich das Abendessen ein." }
          ],
          speak: [
            { id: "u6-l7-s1", prompt: "Kể: 'Tôi dậy, ăn sáng rồi làm việc'", model: "Ich stehe auf, frühstücke und arbeite.", hint: "Ich · ste·he · auf · früh·stü·cke · und · ar·bei·te" }
          ]
        }
      ]
    }
  ]
};
