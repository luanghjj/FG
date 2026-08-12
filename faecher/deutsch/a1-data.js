/* Deutsch A1 · Units 1–2 (chuẩn form ont-thi-fach; đủ .term → flashcards tự sinh) */
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
      icon: "👋",
      lektionen: [
        {
          id: "u1-l1",
          name: "Hallo! Ich heiße…",
          content: `<h2>👋 Hallo! Ich heiße …</h2>
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
<div class="note">💡 Schnellmerk: <b>heißen</b> chia: ich heiße · du heißt · er/sie/es heißt · Sie heißen.</div>
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
          icon: "🌍",
          desc: "Nguồn gốc · quốc tịch · kommen & wohnen",
          content: `<h2>🌍 Woher kommst du?</h2>
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
<div class="note">💡 Schnellmerk: Ich bin <b>Vietnamese</b> = Ich <b>komme aus</b> Vietnam. Nguồn gốc hỏi bằng <b>woher</b>, nơi sống hỏi bằng <b>wo</b>.</div>`,
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
          icon: "🗣️",
          desc: "Ngôn ngữ · ich spreche … · đại từ nhân xưng",
          content: `<h2>🗣️ Sprachen & Länder</h2>
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
<div class="note">💡 Schnellmerk: <b>Sie</b> (lịch sự) luôn viết hoa — khác <b>sie</b> (cô ấy / họ) viết thường. Đại từ <b>sie</b> (cô ấy) chia động từ như <b>er/es</b>.</div>`,
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
          icon: "🔢",
          desc: "Đếm 1–20 · cách đọc số",
          content: `<h2>🔢 Zahlen 1–20</h2>
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
<div class="note">💡 Schnellmerk: 13–19 = hàng đơn vị + <b>zehn</b> (mười): drei → drei<b>zehn</b>. Riêng 16 = sech<b>zehn</b> (mất s) và 17 = sieb<b>zehn</b> (mất en).</div>
<div class="note">💡 Schnellmerk: 11 <b>elf</b> và 12 <b>zwölf</b> là hai số đặc biệt, không theo quy tắc.</div>`,
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
          icon: "🔤",
          desc: "Bảng chữ cái · buchstabieren",
          content: `<h2>🔤 Das Alphabet</h2>
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
<div class="note">💡 Schnellmerk: Khi đánh vần dùng tên mẫu: <b>A wie Anna</b>, <b>B wie Berta</b> — tránh nhầm khi nghe qua điện thoại.</div>`,
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
          icon: "📞",
          desc: "Hỏi và nói số điện thoại",
          content: `<h2>📞 Telefonnummer</h2>
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
<div class="note">💡 Schnellmerk: Số điện thoại luôn đọc <b>từng chữ số</b>: 0176 55 22 33 → null eins sieben sechs, fünf fünf, zwei zwei, drei drei.</div>
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
          icon: "🧮",
          desc: "Ôn tập số · tuổi · số nhà · giá cả",
          content: `<h2>🧮 Zahlen im Alltag</h2>
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
<div class="note">💡 Schnellmerk: Tuổi luôn dùng <b>sein</b>: Ich bin 17 Jahre alt. Không nói "Ich habe 17 Jahre".</div>`,
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
      icon: "🕐",
      lektionen: [
        {
          id: "u2-l1",
          name: "Zahlen 21–100",
          icon: "🔢",
          desc: "Số 21–100 · quy tắc đọc số gộp",
          content: `<h2>🔢 Zahlen 21–100</h2>
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
<div class="note">💡 Schnellmerk: 21–99 = <b>đơn vị trước, chục sau</b> + und: 25 = fünf<b>und</b>zwanzig (khác tiếng Việt "hai mươi lăm").</div>
<div class="note">💡 Schnellmerk: Chú ý ba chục bất quy tắc: 30 drei<b>ßig</b> · 60 sech<b>zig</b> · 70 sieb<b>zig</b>.</div>`,
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
          icon: "🎂",
          desc: "Tuổi · sinh nhật · W-Fragen",
          content: `<h2>🎂 Wie alt bist du?</h2>
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
<div class="note">💡 Schnellmerk: Tuổi dùng <b>sein</b> (bin/bist/ist…), sinh nhật dùng <b>haben</b>: Ich <b>habe</b> am 15. Juni Geburtstag.</div>`,
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
          icon: "📅",
          desc: "Thứ trong tuần · am + thứ",
          content: `<h2>📅 Die Wochentage</h2>
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
<div class="note">💡 Schnellmerk: 6 trong 7 thứ đều kết thúc bằng <b>-tag</b> (Mon-tag, Diens-tag…) — riêng <b>Mittwoch</b> (giữa tuần) là ngoại lệ.</div>`,
          listen: [
            { id: "u2-l3-l1", text: "Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag", tip: "Nghe từng thứ, chú ý trọng âm đầu từ", slow: true },
            { id: "u2-l3-l2", text: "Welcher Tag ist heute? — Heute ist Mittwoch." }
          ]
        },
        {
          id: "u2-l4",
          name: "Datum: Tag, Monat, Jahr",
          icon: "🗓️",
          desc: "Ngày · tháng · năm · số thứ tự",
          content: `<h2>🗓️ Datum: Tag, Monat, Jahr</h2>
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
<div class="note">💡 Schnellmerk: Đọc năm gộp trái → phải: 2026 → zwei <b>tausend</b> sechsund<b>zwanzig</b>.</div>`,
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
          icon: "🕐",
          desc: "Giờ · um + giờ · von…bis",
          content: `<h2>🕐 Wie spät ist es?</h2>
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
<div class="note">💡 Schnellmerk: <b>Wie spät ist es?</b> → <b>Es ist …</b> (giờ hiện tại). <b>Um wie viel Uhr?</b> → <b>Um …</b> (thời điểm làm gì đó). Khoảng thời gian: <b>von</b> 8 <b>bis</b> 12 Uhr.</div>`,
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
          icon: "📆",
          desc: "Lịch hẹn · đề xuất thời gian · đồng ý/từ chối",
          content: `<h2>📆 Termine & Verabredungen</h2>
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
<div class="note">💡 Schnellmerk: Lịch hẹn cần đủ 3 yếu tố: <b>welcher Tag</b> (thứ mấy) + <b>um wie viel Uhr</b> (mấy giờ) + <b>wo</b> (ở đâu).</div>`,
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
          icon: "🌅",
          desc: "Thói quen hằng ngày · động từ tách",
          content: `<h2>🌅 Mein Tag</h2>
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
<div class="note">💡 Schnellmerk: Động từ tách (<b>auf</b>stehen, <b>fern</b>sehen): khi chia, tiền tố rời xuống <b>cuối câu</b> — ich stehe um 6 Uhr <b>auf</b>.</div>`,
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
    }
  ]
};
