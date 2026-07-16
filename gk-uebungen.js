/**
 * GK · Übungsaufgaben – FS1-Form (Buß-Schroeder)
 * Layout: Übungsaufgaben → Hinweis → Punkte → Aufgabe 1… + Musterlösung
 * Inhalt: Deutsch; B1-Fachbegriffe in Musterlösung als .term (DE→VI)
 */
(function (w) {
  "use strict";

  /** Helper: B1-Begriff markieren (tippen → VI-Bedeutung) */
  function t(de, vi) {
    const v = vi ? ' data-vi="' + vi.replace(/"/g, "&quot;") + '"' : "";
    return '<span class="term" data-de="' + de.replace(/"/g, "&quot;") + '"' + v + ">" + de + "</span>";
  }

  const GK_UEBUNGEN = [
    {
      id: "partizipation-gg",
      title: "Übungsaufgaben",
      subtitle: "Partizipation · Grundgesetz · Gleichberechtigung",
      teacher: "Buß-Schroeder - Gk / FS 1",
      source: "Übungsaufgabe Partizipation / Grundgesetz",
      totalPoints: 30,
      themes: ["partizipation", "grundrechte", "demokratie-gg", "medien-vierte-gewalt"],
      hint: "Alle Aufgaben sind, sofern nicht anders angegeben, in ganzen Sätzen zu beantworten.",
      blocks: [
        {
          no: "1",
          points: 4,
          lines: [
            "Erläutern Sie vier Möglichkeiten der politischen Einflussnahme!"
          ],
          solution: `
            <p>${t("Politische Einflussnahme", "sự tác động / ảnh hưởng chính trị")} bedeutet, dass Bürgerinnen und Bürger am politischen ${t("Willensbildungsprozess", "quá trình hình thành ý chí")} und ${t("Entscheidungsprozess", "quá trình ra quyết định")} teilhaben. Vier Möglichkeiten sind zum Beispiel:</p>
            <ol>
              <li><b>${t("Wahlen", "bầu cử")}:</b> Das Volk überträgt die Macht für eine festgelegte Zeit an Vertreter. Wahlen sind die wichtigste Form demokratischer Kontrolle.</li>
              <li><b>${t("Demonstration", "biểu tình")} / ${t("Kundgebung", "cuộc mít tinh / tụ họp")}:</b> Bürger äußern öffentlich ihre Meinung (Marsch, ${t("Mahnwache", "canh gác tưởng niệm / tuần hành im lặng")}, Flashmob). Heute oft über soziale Medien organisiert.</li>
              <li><b>${t("Bürgerinitiative", "sáng kiến công dân")} / ${t("Petition", "kiến nghị")} (auch ${t("Online-Petition", "kiến nghị trực tuyến")}):</b> Zusammenschluss zu einem Thema, um politischen Druck zu erzeugen.</li>
              <li><b>${t("direkte Demokratie", "dân chủ trực tiếp")}:</b> ${t("Volksinitiative", "sáng kiến dân sự")} → ${t("Volksbegehren", "trưng cầu chữ ký / thỉnh nguyện dân")} → ${t("Volksentscheid", "trưng cầu dân ý")} (in DE vor allem kommunal/landesweit).</li>
            </ol>
            <p class="muted">Auch möglich: ${t("Partei", "đảng")}, Leserbrief, Bürgerforum, Verein, Blog/${t("Podcast", "podcast")}.</p>
          `
        },
        {
          no: "2",
          points: 6,
          lines: [
            "Zu der Demonstration für das Grundgesetz haben die Schüler/innen auf Instagram eingeladen, um möglichst viele Menschen zu erreichen.",
            "Beurteilen Sie diese Art der Informationsverbreitung.",
            "Gehen Sie auf je zwei Vorteile und Nachteile ein!"
          ],
          solution: `
            <p>Die Einladung über Instagram ist eine Form <b>${t("digitaler Informationsverbreitung", "phổ biến thông tin số")} / ${t("digitaler Partizipation", "tham gia chính trị qua mạng")}</b>.</p>
            <p><b>Vorteile (zwei):</b></p>
            <ul>
              <li><b>Weiter, schneller Zugang:</b> Viele Menschen – besonders Jugendliche – sind auf Instagram erreichbar; die Nachricht verbreitet sich rasch und kostengünstig.</li>
              <li><b>${t("Interaktivität", "tính tương tác")}:</b> Teilen, Kommentare und Likes ermöglichen direktere Kommunikation zwischen Sender und Empfänger und können mehr Teilnehmende mobilisieren.</li>
            </ul>
            <p><b>Nachteile (zwei):</b></p>
            <ul>
              <li><b>${t("Informationsflut", "bão thông tin")} / Unübersichtlichkeit:</b> Wichtige Inhalte können untergehen; Algorithmen filtern, wer was sieht.</li>
              <li><b>${t("Anonymität", "tính ẩn danh")} / Qualität:</b> Beiträge können unqualifiziert oder falsch sein; Glaubwürdigkeit und ${t("Datenschutz", "bảo vệ dữ liệu")} sind problematisch.</li>
            </ul>
            <p><b>Urteil:</b> Instagram eignet sich gut zur ${t("Mobilisierung", "huy động / kêu gọi tham gia")}, ersetzt aber keine seriöse Information und muss kritisch genutzt werden.</p>
          `
        },
        {
          no: "3",
          points: null,
          intro: "In den Artikeln 1–19 des Grundgesetzes sind die Grundrechte festgehalten. Weil diese so wichtig sind, stehen sie in unserem Grundgesetz an erster Stelle.",
          parts: [
            {
              no: "3.1",
              points: 4,
              lines: [
                "Begründen Sie, warum diese Rechte für ein demokratisches Zusammenleben wichtig sind!"
              ],
              solution: `
                <p>Die ${t("Grundrechte", "quyền cơ bản")} (Art. 1–19 ${t("GG", "Luật cơ bản / Grundgesetz")}) sind für ein demokratisches Zusammenleben wichtig, weil:</p>
                <ul>
                  <li>sie die <b>${t("Menschenwürde", "nhân phẩm")}</b> (Art. 1) und die freie Entfaltung der Persönlichkeit schützen – Grundlage freier Teilhabe;</li>
                  <li>sie politische Freiheiten sichern (${t("Meinungsfreiheit", "tự do ngôn luận")}, ${t("Versammlungsfreiheit", "tự do hội họp")}, Vereinigung…), damit Bürger kritisieren und mitwirken können;</li>
                  <li>sie <b>${t("Gleichheit", "bình đẳng")}</b> und Machtbegrenzung des Staates garantieren (Lehre aus dem ${t("Nationalsozialismus", "chủ nghĩa Quốc xã")});</li>
                  <li>sie Vertrauen schaffen: der Staat ist an die Grundrechte gebunden (Art. 1 Abs. 3 GG).</li>
                </ul>
              `
            },
            {
              no: "3.2",
              points: 6,
              lines: [
                "In Artikel 10 und 13 finden Sie Formulierungen, die unsere Grundrechte einschränken.",
                "Erklären Sie, warum es angemessen ist, dass hier der Staat Grenzen gesetzt hat."
              ],
              solution: `
                <p><b>Art. 10 GG</b> schützt das ${t("Brief-, Post- und Fernmeldegeheimnis", "bí mật thư tín, bưu chính và viễn thông")}; <b>Art. 13 GG</b> die ${t("Unverletzlichkeit der Wohnung", "bất khả xâm phạm chỗ ở")}. Beide können unter engen Voraussetzungen eingeschränkt werden.</p>
                <p>Das ist angemessen, weil:</p>
                <ul>
                  <li><b>Schutz anderer ${t("Rechtsgüter", "tài sản pháp lý / lợi ích pháp lý")}:</b> z. B. ${t("Strafverfolgung", "truy tố hình sự")} oder Schutz von Leben und Freiheit Dritter – Grundrechte enden, wo Rechte anderer verletzt werden;</li>
                  <li><b>${t("Rechtsstaat", "nhà nước pháp quyền")}:</b> Eingriffe nur auf gesetzlicher Grundlage, ${t("verhältnismäßig", "tương xứng / hợp lý")} und oft mit ${t("richterlicher Kontrolle", "kiểm soát tư pháp")} – nicht willkürlich;</li>
                  <li><b>Abwägung Freiheit–Sicherheit:</b> Absolute Unantastbarkeit mancher Freiheiten würde die Sicherheit der Gemeinschaft unmöglich machen.</li>
                </ul>
                <p>Einschränkungen heben das Grundrecht nicht auf; sie müssen eng und überprüfbar bleiben.</p>
              `
            }
          ]
        },
        {
          no: "4",
          points: null,
          intro: "Artikel 3 Absatz 2 lautet: „Männer und Frauen sind gleichberechtigt. Der Staat fördert die tatsächliche Durchsetzung der Gleichberechtigung von Frauen und Männern und wirkt auf die Beseitigung bestehender Nachteile hin.“\n\nZwei Schüler/innen fällt auf, dass ihrer Ansicht nach die Gleichberechtigung nicht überall durchgesetzt ist.",
          parts: [
            {
              no: "4.1",
              points: 6,
              lines: [
                "Sind Frauen und Männer in Deutschland wirklich gleichberechtigt?",
                "Zeigen Sie anhand von drei Aspekten aus ihrem beruflichen oder privaten Umfeld auf, dass die Gleichberechtigung zwischen Männern und Frauen noch nicht überall durchgesetzt ist."
              ],
              solution: `
                <p>Rechtlich sind Frauen und Männer ${t("gleichberechtigt", "bình đẳng về quyền")} (Art. 3 Abs. 2 GG). In der Praxis ist die ${t("Gleichberechtigung", "bình đẳng giới / bình quyền")} aber noch nicht überall durchgesetzt. Drei Aspekte:</p>
                <ol>
                  <li><b>Beruf / Gastronomie:</b> ${t("Führungspositionen", "vị trí lãnh đạo")} in der Küche gelten oft noch als „männlich“, Service als „weiblich“ – ${t("Rollenbilder", "khuôn mẫu vai trò giới")} erschweren gleiche Chancen.</li>
                  <li><b>Lohn und Aufstieg:</b> Bei gleicher Qualifikation verdienen Frauen im Schnitt oft weniger oder werden seltener befördert (${t("Gender-Pay-Gap", "khoảng cách lương theo giới")}).</li>
                  <li><b>Private ${t("Care-Arbeit", "công việc chăm sóc (con/nhà)")}:</b> Kinderbetreuung und Haushalt liegen häufiger bei Frauen; ${t("Teilzeit", "bán thời gian")} erschwert Karriere und Rente.</li>
                </ol>
                <p><b>Fazit:</b> Formale Gleichheit im Gesetz bedeutet nicht automatisch tatsächliche ${t("Gleichstellung", "bình đẳng thực tế / bình đẳng hóa")} im Alltag.</p>
              `
            },
            {
              no: "4.2",
              points: 4,
              lines: [
                "Entwickeln Sie zwei weitere Maßnahmen, wie der Staat die Gleichberechtigung von Mann und Frau weiter fördern kann und begründen Sie die von Ihnen gewählten Maßnahmen."
              ],
              solution: `
                <ol>
                  <li><b>Bessere Kinderbetreuung und familienfreundliche Arbeitszeiten:</b> Mehr ${t("Kitaplätze", "chỗ giữ trẻ / chỗ mẫu giáo")} und flexible Modelle erleichtern beiden Eltern die Berufstätigkeit. <i>Begründung:</i> Weniger einseitige Belastung eines Geschlechts, mehr echte Wahlfreiheit.</li>
                  <li><b>${t("Entgelttransparenz", "minh bạch tiền lương")} und Förderung von Frauen in Führung:</b> Offenlegung von Gehältern, Kontrollen, gezielte Förderung. <i>Begründung:</i> Art. 3 Abs. 2 GG verpflichtet den Staat, bestehende Nachteile aktiv zu beseitigen – nicht nur formal zu verbieten.</li>
                </ol>
              `
            }
          ]
        }
      ]
    },
    {
      id: "gewalt-medien",
      title: "Übungsaufgaben",
      subtitle: "Gewaltenteilung · Medien · Vertrauensfrage",
      teacher: "Buß-Schroeder - Gk / FS 1",
      source: "Form FS1 · nach Lernstoff",
      totalPoints: 28,
      themes: ["gewaltenteilung", "medien-vierte-gewalt", "vertrauensfrage-misstrauen"],
      hint: "Alle Aufgaben sind, sofern nicht anders angegeben, in ganzen Sätzen zu beantworten.",
      blocks: [
        {
          no: "1",
          points: 6,
          lines: [
            "Erläutern Sie die drei Staatsgewalten und nennen Sie zu jeder Gewalt ein Organ der Bundesrepublik Deutschland!"
          ],
          solution: `
            <ol>
              <li><b>${t("Legislative", "lập pháp")}</b> (gesetzgebend): ${t("Bundestag", "Quốc hội Liên bang")} (mitwirkend ${t("Bundesrat", "Hội đồng Liên bang")}).</li>
              <li><b>${t("Exekutive", "hành pháp")}</b> (ausführend): ${t("Bundesregierung", "Chính phủ Liên bang")} / Verwaltung (teilw. ${t("Bundespräsident", "Tổng thống Liên bang")}).</li>
              <li><b>${t("Judikative", "tư pháp")}</b> (richterlich): Gerichte, z. B. ${t("Bundesverfassungsgericht", "Tòa án Hiến pháp Liên bang")}.</li>
            </ol>
            <p>Ziel: gegenseitige Kontrolle, keine ${t("Machtkonzentration", "tập trung quyền lực")}. Das ist die ${t("Gewaltenteilung", "phân quyền")}.</p>
          `
        },
        {
          no: "2",
          points: 6,
          lines: [
            "Vergleichen Sie in knapper Form die Stellung des Reichspräsidenten (WRV) mit der des Bundespräsidenten (GG).",
            "Erklären Sie, warum das Grundgesetz die Macht des Staatsoberhaupts schwächte!"
          ],
          solution: `
            <p>In der <b>${t("WRV", "Hiến pháp Weimar")}</b> war der ${t("Reichspräsident", "Tổng thống Đế chế (Weimar)")} sehr stark (u. a. Art. 48 ${t("Notverordnung", "sắc lệnh khẩn cấp")}). Im <b>GG</b> ist der ${t("Bundespräsident", "Tổng thống Liên bang")} eher ${t("repräsentativ", "mang tính đại diện / nghi lễ")}; Macht liegt stärker bei Bundestag und Bundesregierung. Statt einfachem Misstrauen gibt es das ${t("konstruktive Misstrauensvotum", "bất tín nhiệm mang tính xây dựng")} (Art. 67).</p>
            <p><b>Warum schwächer?</b> Lehre aus Weimar/NS: zu viel Macht in einer Person begünstigt Machtkonzentration und gefährdet die Demokratie.</p>
          `
        },
        {
          no: "3",
          points: 6,
          lines: [
            "Erklären Sie den Unterschied zwischen der Vertrauensfrage (Art. 68 GG) und dem konstruktiven Misstrauensvotum (Art. 67 GG)!"
          ],
          solution: `
            <p><b>Art. 67 (${t("konstruktives Misstrauensvotum", "bất tín nhiệm mang tính xây dựng")}):</b> Der Bundestag kann dem Kanzler das Misstrauen nur aussprechen, indem er mit Mehrheit einen <b>neuen</b> Kanzler wählt.</p>
            <p><b>Art. 68 (${t("Vertrauensfrage", "câu hỏi tín nhiệm")}):</b> Der <b>Kanzler</b> beantragt das Vertrauen. Fehlt die Mehrheit, kann er den Bundespräsidenten ersuchen, den Bundestag aufzulösen (binnen 21 Tagen, falls kein neuer Kanzler gewählt wird).</p>
          `
        },
        {
          no: "4",
          points: 6,
          lines: [
            "Begründen Sie, warum freie Medien oft als „vierte Gewalt“ bezeichnet werden.",
            "Nennen Sie zwei Funktionen und je ein Beispiel!"
          ],
          solution: `
            <p>Neben Legislative, Exekutive und Judikative informieren und kontrollieren freie Medien die Politik öffentlich (${t("Pressefreiheit", "tự do báo chí")} Art. 5 GG). Deshalb nennt man sie oft ${t("vierte Gewalt", "quyền lực thứ tư")}.</p>
            <ul>
              <li><b>Informieren:</b> z. B. Bericht über eine Bundestagswahl.</li>
              <li><b>Kontrollieren:</b> z. B. Aufdeckung eines Skandals oder Fehlers der Regierung.</li>
            </ul>
          `
        },
        {
          no: "5",
          points: 4,
          lines: [
            "Nehmen Sie Stellung: Reicht es in einer Demokratie, nur alle vier Jahre zu wählen?",
            "Begründen Sie mit Bezug auf Partizipation!"
          ],
          solution: `
            <p>Wahlen sind zentral, aber nicht ausreichend. Demokratie braucht laufende ${t("Partizipation", "sự tham gia / tham chính")} (Demo, Initiative, Petition, Medien, ggf. Volksentscheide). Zwischen den Wahlen sichern Information und Mitmachen die Kontrolle der Macht.</p>
          `
        }
      ]
    },
    {
      id: "demokratie-karikatur",
      title: "Übungsaufgaben",
      subtitle: "Direkte Demokratie · Karikatur · Grundrechte",
      teacher: "Buß-Schroeder - Gk / FS 1",
      source: "Form FS1 · nach Lernstoff",
      totalPoints: 26,
      themes: ["partizipation", "karikatur-methode", "demokratie-gg", "grundrechte"],
      hint: "Alle Aufgaben sind, sofern nicht anders angegeben, in ganzen Sätzen zu beantworten.",
      blocks: [
        {
          no: "1",
          points: 6,
          lines: [
            "Erläutern Sie den Weg einer Volksabstimmung im Modell Volksinitiative – Volksbegehren – Volksentscheid!"
          ],
          solution: `
            <ol>
              <li><b>${t("Volksinitiative", "sáng kiến dân sự")}:</b> Bürger erarbeiten einen Gesetzesentwurf und sammeln Unterschriften (Modell z. B. 100.000).</li>
              <li><b>${t("Volksbegehren", "trưng cầu chữ ký / thỉnh nguyện dân")}:</b> Bei ausreichender Unterstützung (Modell z. B. 1 Mio.) wird das Anliegen fortgeführt; das Parlament behandelt den Vorschlag.</li>
              <li><b>${t("Volksentscheid", "trưng cầu dân ý")}:</b> Das Volk stimmt ab; die Mehrheit entscheidet.</li>
            </ol>
            <p>In DE vor allem kommunal/landesweit, nicht analog zur Schweiz auf Bundesebene.</p>
          `
        },
        {
          no: "2",
          points: 6,
          lines: [
            "In der Karikatur „Beteiligung“ (Gerhard Mester) steht auf einer Kuh „Demokratie“; die Milch symbolisiert die Beteiligung.",
            "Interpretieren Sie die Aussage der Karikatur in vier Schritten (Einleitung, Beschreibung, Deutung, Fazit)!"
          ],
          solution: `
            <p><b>Einleitung:</b> ${t("Karikatur", "tranh biếm họa")} „Beteiligung“ von Gerhard Mester (bpb 2023) zum Thema Demokratie und ${t("Beteiligung", "sự tham gia")}.</p>
            <p><b>Beschreibung:</b> Kuh mit ${t("Aufschrift", "dòng chữ trên hình")} „Demokratie“, Milch/Behälter deuten Beteiligung an; der Behälter wirkt (fast) leer.</p>
            <p><b>${t("Deutung", "diễn giải / giải nghĩa")}:</b> Kuh = Demokratie, Milch = Beteiligung; wenig Milch = wenige beteiligen sich (${t("Nichtwähler", "người không đi bầu")}, ${t("Desinteresse", "sự thờ ơ / thiếu quan tâm")}).</p>
            <p><b>Fazit:</b> Demokratie funktioniert nur, wenn Menschen aktiv mitmachen, weil sonst die Kontrolle der Macht fehlt.</p>
          `
        },
        {
          no: "3",
          points: 6,
          lines: [
            "Unterscheiden Sie Menschenrechte und Bürgerrechte und ordnen Sie je zwei Beispiele aus dem Grundgesetz zu!"
          ],
          solution: `
            <p><b>${t("Menschenrechte", "nhân quyền")}</b> gelten für alle Menschen („Jeder…“ / „Niemand…“): z. B. ${t("Menschenwürde", "nhân phẩm")} (Art. 1), ${t("Meinungsfreiheit", "tự do ngôn luận")} (Art. 5).</p>
            <p><b>${t("Bürgerrechte", "quyền công dân")}</b> knüpfen an deutsche Staatsangehörigkeit („Alle Deutschen…“): z. B. ${t("Versammlungsfreiheit", "tự do hội họp")} (Art. 8), ${t("Freizügigkeit", "tự do cư trú / đi lại")} (Art. 11) / ${t("Berufsfreiheit", "tự do nghề nghiệp")} (Art. 12).</p>
          `
        },
        {
          no: "4",
          points: 4,
          lines: [
            "Erklären Sie die Begriffe Volkssouveränität, repräsentative Demokratie und Mehrheitsprinzip nach dem Grundgesetz!"
          ],
          solution: `
            <ul>
              <li><b>${t("Volkssouveränität", "chủ quyền nhân dân")}</b> (Art. 20 Abs. 2): Das Volk ist Inhaber der Staatsgewalt.</li>
              <li><b>${t("repräsentative Demokratie", "dân chủ đại diện")}:</b> Gewählte ${t("Abgeordnete", "đại biểu quốc hội")} üben die Staatsgewalt aus (Art. 38 GG).</li>
              <li><b>${t("Mehrheitsprinzip", "nguyên tắc đa số")}:</b> Die Mehrheit entscheidet (z. B. Art. 42 Abs. 2, 63 Abs. 2 GG), bei Schutz der Grund- und ${t("Minderheitsrechte", "quyền thiểu số")}.</li>
            </ul>
          `
        },
        {
          no: "5",
          points: 4,
          lines: [
            "Beurteilen Sie die Aussage: „Grundrechte gelten nur für Menschen, die die Demokratie unterstützen.“"
          ],
          solution: `
            <p>Die Aussage ist <b>falsch</b>. ${t("Grundrechte", "quyền cơ bản")} – besonders ${t("Menschenwürde", "nhân phẩm")} und ${t("Menschenrechte", "nhân quyền")} – gelten für alle Menschen, unabhängig von Meinung oder Verhalten. Einschränkungen nur unter engen gesetzlichen Voraussetzungen, nicht wegen „falscher Meinung“.</p>
          `
        }
      ]
    }
  ];

  function flatTasks(set) {
    const out = [];
    (set.blocks || []).forEach((b) => {
      if (b.parts && b.parts.length) {
        b.parts.forEach((p) => out.push({ ...p, parentNo: b.no, parentIntro: b.intro || "" }));
      } else {
        out.push(b);
      }
    });
    return out;
  }

  function findSet(id) {
    return GK_UEBUNGEN.find((s) => s.id === id) || null;
  }

  w.GK_UEBUNGEN = GK_UEBUNGEN;
  w.GkUebung = { list: GK_UEBUNGEN, findSet, flatTasks };
})(window);
