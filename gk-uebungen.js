/**
 * GK · Übungsaufgaben (Freitext / tự luận) – form như đề FS1 Buß-Schroeder
 * Mỗi set: Aufgaben + Punkte + Musterlösung (theo kiến thức đã học trong app)
 */
(function (w) {
  "use strict";

  /** @type {Array<Object>} */
  const GK_UEBUNGEN = [
    {
      id: "partizipation-gg",
      title: "Übungsaufgaben · Partizipation & Grundgesetz",
      short: "Einflussnahme · Instagram · Art. 1–19 · Gleichberechtigung",
      source: "Buß-Schroeder · Gk / FS 1 · Übungsaufgabe",
      totalPoints: 30,
      themes: ["partizipation", "grundrechte", "demokratie-gg", "medien-vierte-gewalt"],
      hint: "Alle Aufgaben sind, sofern nicht anders angegeben, in ganzen Sätzen zu beantworten.",
      tasks: [
        {
          id: "a1",
          no: "1",
          points: 4,
          op: "Erläutern",
          q: "Erläutern Sie vier Möglichkeiten der politischen Einflussnahme!",
          solution: `
            <p>Politische Einflussnahme bedeutet, dass Bürgerinnen und Bürger am politischen Willensbildungs- und Entscheidungsprozess teilhaben.</p>
            <ol>
              <li><b>Wahlen:</b> Das Volk überträgt die Macht für eine festgelegte Zeit an Vertreter im Parlament. Wahlen sind die wichtigste Form demokratischer Kontrolle.</li>
              <li><b>Demonstration / Kundgebung:</b> Bürger zeigen öffentlich ihre Meinung (z. B. Marsch, Mahnwache). Heute werden Demonstrationen oft über soziale Medien organisiert.</li>
              <li><b>Bürgerinitiative / Petition:</b> Menschen schließen sich zu einem Thema zusammen und fordern politische Änderungen – auch digital als Online-Petition.</li>
              <li><b>Direkte Demokratie:</b> Volksinitiative → Volksbegehren → Volksentscheid ermöglichen Einfluss auch außerhalb von Wahlen (in DE vor allem kommunal/landesweit).</li>
            </ol>
            <p class="muted">Weitere Formen: Partei, Leserbrief, Bürgerforum, Verein, Blog/Podcast.</p>
          `,
          tip: "Nêu rõ 4 hình thức + 1 câu giải thích mỗi hình thức (Wahlen, Demo, Initiative/Petition, Volksentscheid…)."
        },
        {
          id: "a2",
          no: "2",
          points: 6,
          op: "Beurteilen",
          q: "Zu der Demonstration für das Grundgesetz haben die Schüler/innen auf Instagram eingeladen, um möglichst viele Menschen zu erreichen. Beurteilen Sie diese Art der Informationsverbreitung. Gehen Sie auf je zwei Vorteile und Nachteile ein!",
          solution: `
            <p>Die Verbreitung über Instagram ist eine Form <b>digitaler Partizipation / digitaler Kommunikation</b>.</p>
            <h4>Vorteile (mind. 2)</h4>
            <ul>
              <li><b>Weiter / schneller Zugang:</b> Viele junge Menschen sind auf Instagram erreichbar; Einladungen verbreiten sich rasch und kostengünstig.</li>
              <li><b>Interaktivität:</b> Likes, Kommentare und Teilen ermöglichen direktere Kommunikation zwischen Sender und Empfänger; man kann mehr Personen zur Demo motivieren.</li>
            </ul>
            <h4>Nachteile (mind. 2)</h4>
            <ul>
              <li><b>Informationsflut / Filterblasen:</b> Wichtige Inhalte können untergehen; Algorithmen zeigen Inhalte oft nur bestimmten Gruppen.</li>
              <li><b>Anonymität / Qualität:</b> Beiträge können unqualifiziert, falsch oder polarisierend sein; Glaubwürdigkeit und Datenschutz sind problematisch.</li>
            </ul>
            <p><b>Urteil:</b> Instagram eignet sich gut zur Mobilisierung, ersetzt aber nicht seriöse Information und muss kritisch genutzt werden.</p>
          `,
          tip: "Cấu trúc: 2 Pro + 2 Kontra + 1 câu đánh giá (Beurteilen)."
        },
        {
          id: "a3-1",
          no: "3.1",
          points: 4,
          op: "Begründen",
          q: "In den Artikeln 1–19 des Grundgesetzes sind die Grundrechte festgehalten. Begründen Sie, warum diese Rechte für ein demokratisches Zusammenleben wichtig sind!",
          solution: `
            <p>Grundrechte (Art. 1–19 GG) stehen am Anfang des Grundgesetzes, weil sie die Grundlage einer Demokratie bilden.</p>
            <ul>
              <li>Sie schützen die <b>Menschenwürde</b> (Art. 1) und die freie Entfaltung der Persönlichkeit (Art. 2) – ohne Würde keine freie politische Teilhabe.</li>
              <li>Sie sichern <b>Freiheiten</b> (Meinung, Versammlung, Vereinigung…), damit Bürger kritisieren, demonstrieren und sich organisieren können.</li>
              <li>Sie garantieren <b>Gleichheit</b> vor dem Gesetz (Art. 3) und begrenzen staatliche Macht – wichtig nach der Erfahrung des Nationalsozialismus (keine Machtkonzentration).</li>
              <li>Sie schaffen Vertrauen: Jeder weiß, dass der Staat an Rechte gebunden ist (Art. 1 Abs. 3 GG: Bindung von Gesetzgebung, Verwaltung und Rechtsprechung).</li>
            </ul>
          `,
          tip: "Liên hệ Art. 1, tự do chính trị, giới hạn quyền lực nhà nước, sống chung dân chủ."
        },
        {
          id: "a3-2",
          no: "3.2",
          points: 6,
          op: "Erklären",
          q: "In Artikel 10 und 13 finden Sie Formulierungen, die unsere Grundrechte einschränken. Erklären Sie, warum es angemessen ist, dass hier der Staat Grenzen gesetzt hat.",
          solution: `
            <p><b>Art. 10 GG</b> schützt das Brief-, Post- und Fernmeldegeheimnis; <b>Art. 13 GG</b> die Unverletzlichkeit der Wohnung. Beide Rechte können unter engen Voraussetzungen eingeschränkt werden.</p>
            <p>Einschränkungen sind angemessen, weil:</p>
            <ul>
              <li><b>Schutz anderer Rechtsgüter:</b> z. B. Strafverfolgung, Terrorabwehr, Schutz von Leben und Freiheit Dritter – Grundrechte enden dort, wo Rechte anderer verletzt werden.</li>
              <li><b>Rechtsstaat:</b> Eingriffe dürfen nur auf gesetzlicher Grundlage und verhältnismäßig erfolgen, oft mit richterlicher Kontrolle – nicht willkürlich.</li>
              <li><b>Abwägung:</b> Absolute Unantastbarkeit mancher Freiheiten würde die Sicherheit der Gemeinschaft unmöglich machen; das GG sucht einen Ausgleich zwischen Freiheit und Sicherheit.</li>
            </ul>
            <p>Wichtig: Einschränkungen müssen eng, klar und überprüfbar sein – sie heben das Grundrecht nicht auf.</p>
          `,
          tip: "Nêu Art. 10/13 + lý do: bảo vệ người khác, pháp quyền, cân bằng tự do–an ninh."
        },
        {
          id: "a4-1",
          no: "4.1",
          points: 6,
          op: "Zeigen",
          q: "Artikel 3 Abs. 2 GG: „Männer und Frauen sind gleichberechtigt…“. Sind Frauen und Männer in Deutschland wirklich gleichberechtigt? Zeigen Sie anhand von drei Aspekten aus ihrem beruflichen oder privaten Umfeld auf, dass die Gleichberechtigung noch nicht überall durchgesetzt ist.",
          solution: `
            <p>Rechtlich gilt Gleichberechtigung (Art. 3 Abs. 2 GG). In der Praxis bestehen aber noch Nachteile. Drei mögliche Aspekte (Gastronomie / Alltag):</p>
            <ol>
              <li><b>Berufswahl / Branchenbilder:</b> In der Küche gelten Führungspositionen (Küchenchef) oft noch als „männlich“, Service als „weiblich“ – stereotype Rollen erschweren gleiche Chancen.</li>
              <li><b>Lohn und Aufstieg:</b> Bei gleicher Qualifikation verdienen Frauen im Schnitt oft weniger oder werden seltener in Leitungsstellen befördert (Gender-Pay-Gap / gläserne Decke).</li>
              <li><b>Care-Arbeit privat:</b> Kinderbetreuung und Haushalt liegen häufiger bei Frauen; Teilzeit erschwert Karriere und Rente – Gleichberechtigung im Berufsleben wird dadurch erschwert.</li>
            </ol>
            <p>Fazit: Formale Gleichheit im Gesetz ≠ vollständige tatsächliche Gleichstellung im Alltag.</p>
          `,
          tip: "3 khía cạnh cụ thể (nghề/gia đình) + câu kết: pháp lý ≠ thực tế."
        },
        {
          id: "a4-2",
          no: "4.2",
          points: 4,
          op: "Entwickeln",
          q: "Entwickeln Sie zwei weitere Maßnahmen, wie der Staat die Gleichberechtigung von Mann und Frau weiter fördern kann, und begründen Sie die von Ihnen gewählten Maßnahmen.",
          solution: `
            <ol>
              <li><b>Bessere Kinderbetreuung / Familienpolitik:</b> Mehr Kitaplätze und flexible Arbeitszeiten erleichtern beiden Eltern die Berufstätigkeit. Begründung: Weniger Druck auf ein Geschlecht, mehr echte Wahlfreiheit.</li>
              <li><b>Förderung gleicher Bezahlung &amp; Quoten/Transparenz:</b> Entgelttransparenz, Kontrollen und gezielte Förderung von Frauen in Führungspositionen. Begründung: Art. 3 Abs. 2 verpflichtet den Staat, bestehende Nachteile aktiv zu beseitigen – nicht nur formal zu verbieten.</li>
            </ol>
            <p>Weitere Ideen: Bildungsprogramme gegen Rollenstereotype, Elternzeit für Väter stärken, Schutz vor Diskriminierung am Arbeitsplatz.</p>
          `,
          tip: "2 biện pháp + mỗi biện pháp 1 lý do (liên hệ Art. 3 Abs. 2: Staat phải thúc đẩy)."
        }
      ]
    },
    {
      id: "gewalt-medien",
      title: "Übungsaufgaben · Gewaltenteilung & Medien",
      short: "3 Gewalten · WRV/GG · 4. Gewalt · Vertrauensfrage",
      source: "Form FS1 · selbst erstellt nach Lernstoff",
      totalPoints: 28,
      themes: ["gewaltenteilung", "medien-vierte-gewalt", "vertrauensfrage-misstrauen"],
      hint: "Antworten Sie in ganzen Sätzen. Nutzen Sie Fachbegriffe aus dem Unterricht.",
      tasks: [
        {
          id: "b1",
          no: "1",
          points: 6,
          op: "Erläutern",
          q: "Erläutern Sie die drei Staatsgewalten und nennen Sie zu jeder Gewalt ein Organ der Bundesrepublik Deutschland!",
          solution: `
            <ol>
              <li><b>Legislative (gesetzgebende Gewalt):</b> macht Gesetze. Organ: Bundestag (mitwirkend Bundesrat).</li>
              <li><b>Exekutive (ausführende Gewalt):</b> führt Gesetze aus / verwaltet. Organ: Bundesregierung (Kanzler + Minister), Verwaltung; teilweise Bundespräsident.</li>
              <li><b>Judikative (richterliche Gewalt):</b> spricht Recht. Organ: Gerichte, z. B. Bundesverfassungsgericht.</li>
            </ol>
            <p>Ziel der Gewaltenteilung: gegenseitige Kontrolle, keine Machtkonzentration.</p>
          `,
          tip: "Legislative / Exekutive / Judikative + 1 Organ mỗi loại."
        },
        {
          id: "b2",
          no: "2",
          points: 6,
          op: "Vergleichen",
          q: "Vergleichen Sie in knapper Form die Stellung des Reichspräsidenten (WRV) mit der des Bundespräsidenten (GG) und erklären Sie, warum das Grundgesetz die Macht des Staatsoberhaupts schwächte!",
          solution: `
            <p>In der <b>Weimarer Reichsverfassung</b> war der Reichspräsident sehr stark (u. a. Notverordnungsrecht Art. 48, konnte die Regierung beeinflussen und den Reichstag auflösen).</p>
            <p>Im <b>Grundgesetz</b> ist der Bundespräsident vor allem repräsentativ; politische Macht liegt stärker bei Bundestag und Bundesregierung. Statt einfachem Misstrauen gibt es das <b>konstruktive Misstrauensvotum</b> (Art. 67) für mehr Stabilität.</p>
            <p><b>Warum schwächer?</b> Lehre aus Weimar/NS: zu viel Macht in einer Person begünstigt Machtkonzentration und Demokratiegefährdung. Gewaltenteilung und Gewaltenverschränkung sollen das verhindern.</p>
          `,
          tip: "WRV mạnh vs GG mang tính đại diện + bài học lịch sử."
        },
        {
          id: "b3",
          no: "3",
          points: 6,
          op: "Erklären",
          q: "Erklären Sie den Unterschied zwischen der Vertrauensfrage (Art. 68 GG) und dem konstruktiven Misstrauensvotum (Art. 67 GG)!",
          solution: `
            <p><b>Konstruktives Misstrauensvotum (Art. 67):</b> Der Bundestag kann dem Kanzler das Misstrauen nur aussprechen, indem er mit der Mehrheit seiner Mitglieder einen <b>neuen</b> Kanzler wählt. So bleibt die Regierungsfähigkeit gesichert.</p>
            <p><b>Vertrauensfrage (Art. 68):</b> Der <b>Kanzler selbst</b> beantragt, ihm das Vertrauen auszusprechen. Bekommt er nicht die Mehrheit, kann er den Bundespräsidenten ersuchen, den Bundestag aufzulösen (binnen 21 Tagen, falls kein neuer Kanzler gewählt wird).</p>
            <p>Kurz: Misstrauen startet vom Parlament und braucht einen Nachfolger; Vertrauensfrage startet vom Kanzler und kann zur Auflösung führen.</p>
          `,
          tip: "Ai khởi xướng? Cần tân Thủ tướng không? Hậu quả?"
        },
        {
          id: "b4",
          no: "4",
          points: 6,
          op: "Begründen",
          q: "Begründen Sie, warum freie Medien oft als „vierte Gewalt“ bezeichnet werden. Nennen Sie zwei Funktionen und je ein Beispiel!",
          solution: `
            <p>Neben Legislative, Exekutive und Judikative gelten freie Medien als „vierte Gewalt“, weil sie öffentlich kontrollieren und informieren – ohne selbst Staatsgewalt im engeren Sinn auszuüben.</p>
            <ul>
              <li><b>Informieren:</b> z. B. Bericht über eine Bundestagswahl oder ein neues Gesetz, damit Bürger mitreden können.</li>
              <li><b>Kontrollieren:</b> z. B. Aufdeckung eines Skandals oder Fehlers der Regierung – Druck auf die Politik (Pressefreiheit Art. 5 GG).</li>
            </ul>
          `,
          tip: "2 chức năng: Informieren + Kontrollieren + ví dụ."
        },
        {
          id: "b5",
          no: "5",
          points: 4,
          op: "Stellung nehmen",
          q: "Nehmen Sie Stellung: Reicht es in einer Demokratie, nur alle vier Jahre zu wählen? Begründen Sie mit Bezug auf Partizipation!",
          solution: `
            <p>Wahlen sind zentral, aber allein nicht ausreichend. Demokratie lebt von laufender Partizipation: Demonstrationen, Initiativen, Petitionen, Medienöffentlichkeit, ggf. Volksentscheide auf Landes-/Kommunalebene.</p>
            <p>Nur wer informiert ist und sich einmischt, hält die Kontrolle zwischen den Wahlterminen aufrecht. Gleichzeitig müssen Minderheitsrechte und die Verfassung beachtet werden.</p>
          `,
          tip: "Wahlen quan trọng + các hình thức tham gia giữa các kỳ bầu cử."
        }
      ]
    },
    {
      id: "demokratie-karikatur",
      title: "Übungsaufgaben · Demokratie, Karikatur & Grundrechte",
      short: "Direkte Demokratie · Karikatur-Methode · Menschen-/Bürgerrechte",
      source: "Form FS1 · selbst erstellt nach Lernstoff",
      totalPoints: 26,
      themes: ["partizipation", "karikatur-methode", "demokratie-gg", "grundrechte"],
      hint: "Schreiben Sie in ganzen Sätzen. Bei der Karikatur: Einleitung – Beschreibung – Deutung – Fazit.",
      tasks: [
        {
          id: "c1",
          no: "1",
          points: 6,
          op: "Erläutern",
          q: "Erläutern Sie den Weg einer Volksabstimmung im Modell Volksinitiative – Volksbegehren – Volksentscheid!",
          solution: `
            <ol>
              <li><b>Volksinitiative:</b> Bürger erarbeiten einen Gesetzesentwurf und sammeln Unterschriften (im Modell z. B. 100.000), um das Thema auf die Agenda zu setzen.</li>
              <li><b>Volksbegehren:</b> Bei ausreichender Unterstützung (im Modell z. B. 1 Million Unterschriften) wird das Anliegen weitergeführt; das Parlament behandelt den Vorschlag.</li>
              <li><b>Volksentscheid:</b> Das Volk stimmt ab; die Mehrheit entscheidet. Ggf. gibt es Informationsmaterial für alle Haushalte.</li>
            </ol>
            <p>In Deutschland gibt es solche Verfahren vor allem auf Kommunal- und Landesebene, nicht analog zur Schweiz auf Bundesebene.</p>
          `,
          tip: "3 bước theo đúng thứ tự + 1 câu về DE."
        },
        {
          id: "c2",
          no: "2",
          points: 6,
          op: "Interpretieren",
          q: "In der Karikatur „Beteiligung“ (Gerhard Mester) steht auf einer Kuh „Demokratie“, die Milch symbolisiert die Beteiligung. Interpretieren Sie die Aussage der Karikatur in vier Schritten (Einleitung, Beschreibung, Deutung, Fazit)!",
          solution: `
            <p><b>Einleitung:</b> Die Karikatur „Beteiligung“ von Gerhard Mester (bpb, 2023) thematisiert Demokratie und politische Beteiligung.</p>
            <p><b>Beschreibung:</b> Zu sehen ist u. a. eine Kuh mit der Aufschrift „Demokratie“ und ein (fast leerer) Milch-/Sammelbehälter; Bauern/Menschen im Bild deuten auf Beteiligung hin.</p>
            <p><b>Deutung:</b> Die Kuh steht für die Demokratie, die Milch für die Beteiligung der Bürger. Der fast leere Behälter zeigt: Nur wenige machen politisch mit (Nichtwähler, Desinteresse).</p>
            <p><b>Fazit:</b> Meiner Meinung nach funktioniert Demokratie nur, wenn Menschen aktiv mitmachen, weil Wahlen und Partizipation die Kontrolle der Macht sichern.</p>
          `,
          tip: "Đúng 4 bước; dùng từ: Symbol, Beteiligung, Nichtwähler."
        },
        {
          id: "c3",
          no: "3",
          points: 6,
          op: "Unterscheiden",
          q: "Unterscheiden Sie Menschenrechte und Bürgerrechte und ordnen Sie je zwei Beispiele aus dem Grundgesetz zu!",
          solution: `
            <p><b>Menschenrechte</b> gelten für alle Menschen („Jeder…“, „Niemand…“, „Alle Menschen…“). Beispiele: Menschenwürde (Art. 1), Glaubensfreiheit (Art. 4), Meinungsfreiheit (Art. 5), Unverletzlichkeit der Wohnung (Art. 13).</p>
            <p><b>Bürgerrechte</b> knüpfen an die deutsche Staatsangehörigkeit („Alle Deutschen…“). Beispiele: Versammlungsfreiheit (Art. 8), Freizügigkeit (Art. 11), Berufsfreiheit (Art. 12) – je nach Formulierung im GG.</p>
            <p>Wichtig: Auch wer Demokratie ablehnt, behält grundlegende Menschenrechte – sie gelten universell.</p>
          `,
          tip: "M = mọi người; B = công dân Đức + 2 ví dụ mỗi loại."
        },
        {
          id: "c4",
          no: "4",
          points: 4,
          op: "Erklären",
          q: "Erklären Sie die Begriffe Volkssouveränität, repräsentative Demokratie und Mehrheitsprinzip nach dem Grundgesetz!",
          solution: `
            <ul>
              <li><b>Volkssouveränität</b> (Art. 20 Abs. 2): Das Volk ist Inhaber der Staatsgewalt.</li>
              <li><b>Repräsentative Demokratie:</b> Gewählte Abgeordnete üben die Staatsgewalt aus (Art. 38 GG) – nicht jede Entscheidung wird täglich vom Volk getroffen.</li>
              <li><b>Mehrheitsprinzip:</b> Die Mehrheit entscheidet (z. B. Art. 42 Abs. 2, 63 Abs. 2 GG), bei Schutz der Minderheits- und Grundrechte.</li>
            </ul>
          `,
          tip: "3 khái niệm, mỗi cái 1 câu + điều GG nếu nhớ."
        },
        {
          id: "c5",
          no: "5",
          points: 4,
          op: "Beurteilen",
          q: "Beurteilen Sie die Aussage: „Grundrechte gelten nur für Menschen, die die Demokratie unterstützen.“",
          solution: `
            <p>Die Aussage ist <b>falsch</b>. Grundrechte – insbesondere Menschenrechte und die Menschenwürde – gelten für alle Menschen, unabhängig von Meinung oder Verhalten.</p>
            <p>Gerade eine Demokratie zeigt ihre Stärke, indem sie auch Andersdenkende schützt. Einschränkungen sind nur unter engen gesetzlichen Voraussetzungen möglich, nicht weil jemand „die falsche Meinung“ hat.</p>
          `,
          tip: "Sai → nhân phẩm/nhân quyền phổ quát; có thể dẫn Karikatur bài học."
        }
      ]
    }
  ];

  function findSet(id) {
    return GK_UEBUNGEN.find((s) => s.id === id) || null;
  }

  function totalTasks(set) {
    return (set && set.tasks && set.tasks.length) || 0;
  }

  w.GK_UEBUNGEN = GK_UEBUNGEN;
  w.GkUebung = {
    list: GK_UEBUNGEN,
    findSet,
    totalTasks,
  };
})(window);
