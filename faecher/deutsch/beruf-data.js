/* Berufsdeutsch Gastgewerbe · Unit mẫu (chuẩn form ont-thi-fach; đủ .term → flashcards tự sinh) */
window.DEUTSCH_BERUF = {
  level: "beruf",
  badge: "Beruf",
  code: "DE Beruf",
  title: "Berufsdeutsch Gastgewerbe",
  units: [
    {
      id: "u-b1",
      title: "Bestellung aufnehmen",
      desc: "Begrüßung · Fragen · Mengen · Allergien",
      icon: "🛎️",
      lektionen: [
        {
          id: "b1-l1",
          name: "Begrüßung im Restaurant",
          icon: "👋",
          desc: "Chào khách · hỏi số người · mời ngồi",
          content: `<h2>👋 Begrüßung im Restaurant</h2>
<div class="hint">Chào khách · hỏi số người · mời ngồi · đưa thực đơn</div>
<h3 class="sub">1. Chào khách</h3>
<ul>
  <li><span class="term" data-de="Guten Tag" data-vi="chào ngày tốt lành">Guten Tag</span>! <span class="term" data-de="Herzlich willkommen" data-vi="nhiệt liệt chào mừng">Herzlich willkommen</span>!</li>
  <li><span class="term" data-de="Schönen guten Abend" data-vi="chúc buổi tối tốt lành">Schönen guten Abend</span>! — <span class="term" data-de="der Gast" data-vi="thực khách (số ít)">Gast</span>, <span class="term" data-de="die Gäste" data-vi="các thực khách (số nhiều)">Gäste</span></li>
  <li><span class="term" data-de="Haben Sie einen Tisch reserviert?" data-vi="Anh/chị đã đặt bàn chưa?">Haben Sie einen Tisch reserviert?</span></li>
</ul>
<h3 class="sub">2. Hỏi số người và đặt bàn</h3>
<ul>
  <li><span class="term" data-de="Für wie viele Personen?" data-vi="Cho mấy người ạ?">Für wie viele Personen?</span> — <span class="term" data-de="zwei Personen" data-vi="hai người">Zwei Personen</span>, bitte.</li>
  <li>Ich habe eine <span class="term" data-de="die Reservierung" data-vi="sự đặt chỗ trước">Reservierung</span>. — <span class="term" data-de="reservieren" data-vi="đặt chỗ trước">Reservieren</span> Sie einen <span class="term" data-de="der Tisch" data-vi="cái bàn">Tisch</span>?</li>
  <li><span class="term" data-de="der Kellner" data-vi="bồi bàn (nam)">Kellner</span> · <span class="term" data-de="die Kellnerin" data-vi="bồi bàn (nữ)">Kellnerin</span></li>
</ul>
<h3 class="sub">3. Mời ngồi và đưa thực đơn</h3>
<ul>
  <li><span class="term" data-de="Bitte sehr" data-vi="xin mời">Bitte sehr</span>, hier ist Ihr Tisch. — <span class="term" data-de="Kommen Sie mit" data-vi="xin mời đi theo">Kommen Sie mit</span>!</li>
  <li>Hier ist die <span class="term" data-de="die Speisekarte" data-vi="thực đơn">Speisekarte</span>. — <span class="term" data-de="Einen Moment" data-vi="một chút, một lát">Einen Moment</span>, bitte.</li>
  <li><span class="term" data-de="Möchten Sie etwas trinken?" data-vi="Anh/chị muốn uống gì không?">Möchten Sie etwas trinken?</span> — Ja, <span class="term" data-de="gern" data-vi="xin vui lòng, rất muốn">gern</span>.</li>
</ul>
<div class="note">💡 Schnellmerk: Trong nhà hàng luôn xưng hô lịch sự <b>Sie</b> với khách. Chào khách: Guten Tag! Herzlich willkommen! — rồi hỏi ngay số người: Für wie viele Personen?</div>`,
          grammar: [
            {
              id: "a1b-begruessung-hoeflichkeit",
              title: "Sie-Höflichkeit & Möchten",
              rule: "<p>Trong nhà hàng luôn dùng <b>Sie</b> (lịch sự): Haben <b>Sie</b> einen Tisch reserviert? · Möchten <b>Sie</b> etwas trinken?</p><p><b>möchten</b> = muốn (lịch sự): Ich möchte / Möchten Sie … — dùng thay cho 'ich will'.</p>",
              examples: ["Möchten Sie etwas trinken?", "Haben Sie einen Tisch reserviert?", "Hier ist Ihre Speisekarte."],
              exercise: { type: "fill", theme: "b1-l1", cat: "Begrüßung", q: "___ Sie einen Tisch reserviert? (lịch sự)", answers: ["haben"], answer: "Haben", ex: "Lịch sự → Haben Sie …" }
            }
          ],
          listen: [
            { id: "b1-l1-l1", text: "Guten Tag! Herzlich willkommen im Restaurant. Für wie viele Personen?", tip: "Nghe câu chào và hỏi số người", slow: true },
            { id: "b1-l1-l2", text: "Haben Sie einen Tisch reserviert? — Ja, für zwei Personen, bitte." }
          ],
          speak: [
            { id: "b1-l1-s1", prompt: "Chào khách vào nhà hàng", model: "Guten Tag! Herzlich willkommen!", hint: "Gu·ten · Tag · herz·lich · will·kom·men" }
          ]
        },
        {
          id: "b1-l2",
          name: "Bestellung aufnehmen",
          icon: "📋",
          desc: "Gọi món · Vorspeise · Hauptgericht · Getränke",
          content: `<h2>📋 Bestellung aufnehmen</h2>
<div class="hint">Gọi món · khai vị · món chính · tráng miệng · đồ uống</div>
<h3 class="sub">1. Hỏi và nhận đơn</h3>
<ul>
  <li><span class="term" data-de="bestellen" data-vi="gọi món">Bestellen</span> — Was möchten Sie? / <span class="term" data-de="Was darf es sein?" data-vi="Anh/chị dùng gì ạ?">Was darf es sein?</span></li>
  <li>Ich nehme <span class="term" data-de="die Bestellung" data-vi="đơn gọi món">die Bestellung</span> auf. — <span class="term" data-de="aufnehmen" data-vi="tiếp nhận (đơn)">Aufnehmen</span></li>
  <li><span class="term" data-de="Ich nehme …" data-vi="Tôi lấy/gọi …">Ich nehme</span> die Suppe als <span class="term" data-de="die Vorspeise" data-vi="món khai vị">Vorspeise</span>.</li>
</ul>
<h3 class="sub">2. Món chính và tráng miệng</h3>
<ul>
  <li>Als <span class="term" data-de="das Hauptgericht" data-vi="món chính">Hauptgericht</span> nehme ich das Schnitzel. — <span class="term" data-de="die Nachspeise" data-vi="món tráng miệng">Nachspeise</span>: Zum Dessert einen Kuchen.</li>
  <li><span class="term" data-de="die Suppe" data-vi="món súp">Suppe</span> · <span class="term" data-de="der Salat" data-vi="món xà lách">Salat</span> · <span class="term" data-de="das Schnitzel" data-vi="món schnitzel">Schnitzel</span> · <span class="term" data-de="der Kuchen" data-vi="bánh ngọt">Kuchen</span></li>
</ul>
<h3 class="sub">3. Đồ uống và số phần</h3>
<ul>
  <li><span class="term" data-de="das Getränk" data-vi="đồ uống">Getränk</span>: ein Wasser, eine Cola — <span class="term" data-de="einmal" data-vi="một phần/lần">Einmal</span> oder <span class="term" data-de="zweimal" data-vi="hai phần/lần">zweimal</span>?</li>
  <li><span class="term" data-de="Einmal die Suppe" data-vi="một phần súp">Einmal die Suppe</span> und zweimal Schnitzel, bitte.</li>
  <li><span class="term" data-de="Ist das alles?" data-vi="Hết chưa ạ?">Ist das alles?</span> — Ja, <span class="term" data-de="das wäre alles" data-vi="vậy là hết">das wäre alles</span>.</li>
</ul>
<div class="note">💡 Schnellmerk: Hỏi khách: <b>Was darf es sein?</b> — khách trả lời bằng <b>Ich nehme …</b> (Akkusativ: die Suppe, das Schnitzel). Số phần: einmal/zweimal.</div>`,
          grammar: [
            {
              id: "a1b-bestellung-aufnehmen",
              title: "Bestellung: einmal/zweimal + Akkusativ",
              rule: "<p>Khách gọi món: <b>Ich nehme</b> + Akkusativ: die Suppe, das Schnitzel, ein Wasser.</p><p>Số phần: <b>einmal</b> (một phần) · <b>zweimal</b> (hai phần) — đứng trước danh từ xác định: Einmal <b>die Suppe</b>, bitte.</p>",
              examples: ["Einmal die Suppe, bitte.", "Zweimal Schnitzel und ein Wasser.", "Als Vorspeise nehme ich den Salat."],
              exercise: { type: "fill", theme: "b1-l2", cat: "Bestellung", q: "Einmal die Suppe und ___ Schnitzel, bitte. (hai phần)", answers: ["zweimal"], answer: "zweimal", ex: "hai phần → zweimal" }
            }
          ],
          listen: [
            { id: "b1-l2-l1", text: "Was darf es sein? — Ich nehme die Suppe als Vorspeise.", tip: "Nghe cách hỏi và trả lời khi gọi món", slow: true },
            { id: "b1-l2-l2", text: "Einmal die Suppe und zweimal Schnitzel, bitte. — Ist das alles? — Ja, das wäre alles." }
          ],
          speak: [
            { id: "b1-l2-s1", prompt: "Gọi món: một súp khai vị", model: "Ich nehme die Suppe als Vorspeise.", hint: "Ich · neh·me · die · Sup·pe · als · Vor·spei·se" }
          ]
        },
        {
          id: "b1-l3",
          name: "Mengen & Allergien",
          icon: "⚠️",
          desc: "Số lượng · dị ứng · thành phần",
          content: `<h2>⚠️ Mengen & Allergien</h2>
<div class="hint">Số lượng · hỏi dị ứng · thành phần món ăn</div>
<h3 class="sub">1. Số lượng</h3>
<ul>
  <li>Die <span class="term" data-de="die Menge" data-vi="số lượng">Menge</span>: <span class="term" data-de="ein halbes Kilo" data-vi="nửa cân">ein halbes Kilo</span> · <span class="term" data-de="ein Kilo" data-vi="một cân">ein Kilo</span> · <span class="term" data-de="die Scheibe" data-vi="lát (bánh)">Scheibe</span></li>
  <li><span class="term" data-de="zwei Scheiben Brot" data-vi="hai lát bánh mì">Zwei Scheiben Brot</span>, bitte. — <span class="term" data-de="reicht das?" data-vi="như vậy đủ chưa?">Reicht das?</span></li>
</ul>
<h3 class="sub">2. Dị ứng</h3>
<ul>
  <li><span class="term" data-de="die Allergie" data-vi="sự dị ứng">Allergie</span>: Ich habe eine Allergie <span class="term" data-de="gegen" data-vi="với, chống lại">gegen</span> Nüsse.</li>
  <li><span class="term" data-de="die Zutat" data-vi="thành phần">Zutat</span> · <span class="term" data-de="enthalten" data-vi="chứa, có chứa">enthalten</span>: Enthält die Suppe <span class="term" data-de="die Nuss" data-vi="quả hạch, hạt">Nüsse</span>?</li>
  <li><span class="term" data-de="die Laktose" data-vi="lactose">Laktose</span> · <span class="term" data-de="das Gluten" data-vi="gluten">Gluten</span> · <span class="term" data-de="die Erdnuss" data-vi="lạc">Erdnuss</span></li>
</ul>
<h3 class="sub">3. Nói với khách</h3>
<ul>
  <li>Das Schnitzel <span class="term" data-de="enthalten" data-vi="chứa">enthält</span> Gluten. — <span class="term" data-de="ohne" data-vi="không có">Ohne</span> Laktose, bitte.</li>
  <li>Ich <span class="term" data-de="vertragen" data-vi="dung nạp được">vertrage</span> keine Nüsse. — <span class="term" data-de="mit" data-vi="có, với">Mit</span> oder ohne Zwiebeln?</li>
</ul>
<div class="note">💡 Schnellmerk: Hỏi dị ứng: Haben Sie eine Allergie? Khách trả lời: Ich habe eine Allergie <b>gegen</b> + Akkusativ (gegen Nüsse, gegen Laktose). Nhân viên nên chủ động hỏi thành phần: Was ist enthalten?</div>`,
          grammar: [
            {
              id: "a1b-mengen-allergien",
              title: "Allergie gegen + Akkusativ · Mengenangabe",
              rule: "<p>Dị ứng: Ich habe eine Allergie <b>gegen</b> + Akkusativ: gegen <b>die</b> Laktose · gegen <b>Nüsse</b>.</p><p>Mengen: <b>ein halbes Kilo</b> (nửa cân) · <b>ein Kilo</b> (một cân) · <b>zwei Scheiben</b> Brot (hai lát).</p>",
              examples: ["Ich habe eine Allergie gegen Nüsse.", "Zwei Scheiben Brot, bitte.", "Das Schnitzel enthält Gluten."],
              exercise: { type: "fill", theme: "b1-l3", cat: "Allergien", q: "Ich habe eine Allergie ___ Nüsse.", answers: ["gegen"], answer: "gegen", ex: "Allergie gegen + Akkusativ" }
            }
          ],
          listen: [
            { id: "b1-l3-l1", text: "Haben Sie eine Allergie? — Ja, ich habe eine Allergie gegen Nüsse.", tip: "Nghe câu hỏi và trả lời về dị ứng", slow: true },
            { id: "b1-l3-l2", text: "Zwei Scheiben Brot und ein halbes Kilo Käse, bitte. — Reicht das?" }
          ],
          speak: [
            { id: "b1-l3-s1", prompt: "Nói: tôi bị dị ứng với lạc", model: "Ich habe eine Allergie gegen Erdnüsse.", hint: "Ich · ha·be · ei·ne · Al·ler·gie · ge·gen · Erd·nüs·se" }
          ]
        },
        {
          id: "b1-l4",
          name: "Verabschiedung & Danke",
          icon: "👋",
          desc: "Cảm ơn · tạm biệt · tính tiền",
          content: `<h2>👋 Verabschiedung & Danke</h2>
<div class="hint">Cảm ơn · chúc khách · tạm biệt · tính tiền</div>
<h3 class="sub">1. Cảm ơn</h3>
<ul>
  <li><span class="term" data-de="Danke schön" data-vi="cảm ơn nhiều">Danke schön</span>! · <span class="term" data-de="Vielen Dank" data-vi="rất cảm ơn">Vielen Dank</span>! · <span class="term" data-de="gern geschehen" data-vi="không có gì">Gern geschehen</span>!</li>
  <li><span class="term" data-de="Es hat geschmeckt" data-vi="món ăn rất ngon">Es hat geschmeckt</span>! — <span class="term" data-de="schmecken" data-vi="hợp khẩu vị, ngon">Schmeckt</span> es gut?</li>
</ul>
<h3 class="sub">2. Tính tiền và hóa đơn</h3>
<ul>
  <li>Die <span class="term" data-de="die Rechnung" data-vi="hóa đơn">Rechnung</span>, bitte! — Zahlen Sie <span class="term" data-de="zusammen" data-vi="chung một hóa đơn">zusammen</span> oder <span class="term" data-de="getrennt" data-vi="tách riêng">getrennt</span>?</li>
  <li>Hier ist Ihre <span class="term" data-de="die Quittung" data-vi="biên nhận, hóa đơn giấy">Quittung</span>. — <span class="term" data-de="das Trinkgeld" data-vi="tiền boa">Trinkgeld</span>: Stimmt so!</li>
</ul>
<h3 class="sub">3. Chúc và tạm biệt</h3>
<ul>
  <li><span class="term" data-de="Guten Appetit" data-vi="chúc ngon miệng">Guten Appetit</span>! · <span class="term" data-de="einen schönen Abend noch" data-vi="chúc buổi tối vui vẻ">Einen schönen Abend noch</span>!</li>
  <li><span class="term" data-de="Auf Wiedersehen" data-vi="tạm biệt (chính thức)">Auf Wiedersehen</span>! · <span class="term" data-de="Bis bald" data-vi="hẹn sớm gặp lại">Bis bald</span>! · <span class="term" data-de="Gleichfalls" data-vi="anh/chị cũng vậy (đáp lời chúc)">Gleichfalls</span>!</li>
</ul>
<div class="note">💡 Schnellmerk: Khi khách về: <b>Vielen Dank!</b> — <b>Gern geschehen!</b> — <b>Auf Wiedersehen!</b> Đừng quên đưa <b>die Quittung</b> sau khi khách thanh toán.</div>`,
          grammar: [
            {
              id: "a1b-verabschiedung-danke",
              title: "Dank & Wünsche",
              rule: "<p>Cảm ơn: <b>Danke</b> · <b>Danke schön</b> · <b>Vielen Dank</b> — đáp lại: <b>Gern geschehen!</b></p><p>Chúc: <b>Einen schönen Abend noch!</b> (Akkusativ) · <b>Guten Appetit!</b> — đáp: <b>Gleichfalls!</b> (Ebenfalls!)</p>",
              examples: ["Vielen Dank für das Essen!", "Gern geschehen!", "Einen schönen Abend noch!", "Auf Wiedersehen!"],
              exercise: { type: "fill", theme: "b1-l4", cat: "Verabschiedung", q: "___ schönen Abend noch! (chúc buổi tối vui vẻ)", answers: ["einen"], answer: "Einen", ex: "Chúc → Einen schönen Abend noch!" }
            }
          ],
          listen: [
            { id: "b1-l4-l1", text: "Vielen Dank für das Essen! Es hat geschmeckt. — Gern geschehen!", tip: "Nghe đoạn cảm ơn và đáp lại", slow: true },
            { id: "b1-l4-l2", text: "Die Rechnung, bitte. — Zusammen oder getrennt? — Zusammen, bitte. Auf Wiedersehen!" }
          ],
          speak: [
            { id: "b1-l4-s1", prompt: "Tiễn khách: tạm biệt và chúc buổi tối vui vẻ", model: "Auf Wiedersehen! Einen schönen Abend noch!", hint: "Auf · Wie·der·se·hen · ei·nen · schö·nen · A·bend · noch" }
          ]
        }
      ]
    }
  ]
};
