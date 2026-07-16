/**
 * GK · Übungsaufgaben – form giống đề FS1 (Buß-Schroeder)
 * Layout: Übungsaufgaben → Hinweis → Punkte → Aufgabe 1… + Musterlösung
 */
(function (w) {
  "use strict";

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
      // blocks = form đề thật (Aufgabe 1, 2, 3{parts}, 4{parts})
      blocks: [
        {
          no: "1",
          points: 4,
          lines: [
            "Erläutern Sie vier Möglichkeiten der politischen Einflussnahme!"
          ],
          solution: `
            <p>Politische Einflussnahme bedeutet, dass Bürgerinnen und Bürger am politischen Willensbildungs- und Entscheidungsprozess teilhaben. Vier Möglichkeiten sind zum Beispiel:</p>
            <ol>
              <li><b>Wahlen:</b> Das Volk überträgt die Macht für eine festgelegte Zeit an Vertreter. Wahlen sind die wichtigste Form demokratischer Kontrolle.</li>
              <li><b>Demonstration / Kundgebung:</b> Bürger äußern öffentlich ihre Meinung (Marsch, Mahnwache, Flashmob). Heute oft über soziale Medien organisiert.</li>
              <li><b>Bürgerinitiative / Petition (auch Online-Petition):</b> Zusammenschluss zu einem Thema, um politischen Druck zu erzeugen.</li>
              <li><b>Direkte Demokratie:</b> Volksinitiative → Volksbegehren → Volksentscheid (in DE vor allem kommunal/landesweit).</li>
            </ol>
            <p class="muted">Auch möglich: Partei, Leserbrief, Bürgerforum, Verein, Blog/Podcast.</p>
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
            <p>Die Einladung über Instagram ist eine Form <b>digitaler Informationsverbreitung / digitaler Partizipation</b>.</p>
            <p><b>Vorteile (zwei):</b></p>
            <ul>
              <li><b>Weiter, schneller Zugang:</b> Viele Menschen – besonders Jugendliche – sind auf Instagram erreichbar; die Nachricht verbreitet sich rasch und kostengünstig.</li>
              <li><b>Interaktivität:</b> Teilen, Kommentare und Likes ermöglichen direktere Kommunikation zwischen Sender und Empfänger und können mehr Teilnehmende mobilisieren.</li>
            </ul>
            <p><b>Nachteile (zwei):</b></p>
            <ul>
              <li><b>Informationsflut / Unübersichtlichkeit:</b> Wichtige Inhalte können untergehen; Algorithmen filtern, wer was sieht.</li>
              <li><b>Anonymität / Qualität:</b> Beiträge können unqualifiziert oder falsch sein; Glaubwürdigkeit und Datenschutz sind problematisch.</li>
            </ul>
            <p><b>Urteil:</b> Instagram eignet sich gut zur Mobilisierung, ersetzt aber keine seriöse Information und muss kritisch genutzt werden.</p>
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
                <p>Die Grundrechte (Art. 1–19 GG) sind für ein demokratisches Zusammenleben wichtig, weil:</p>
                <ul>
                  <li>sie die <b>Menschenwürde</b> (Art. 1) und die freie Entfaltung der Persönlichkeit schützen – Grundlage freier Teilhabe;</li>
                  <li>sie politische Freiheiten sichern (Meinung, Versammlung, Vereinigung…), damit Bürger kritisieren und mitwirken können;</li>
                  <li>sie <b>Gleichheit</b> und Machtbegrenzung des Staates garantieren (Lehre aus dem Nationalsozialismus);</li>
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
                <p><b>Art. 10 GG</b> schützt das Brief-, Post- und Fernmeldegeheimnis; <b>Art. 13 GG</b> die Unverletzlichkeit der Wohnung. Beide können unter engen Voraussetzungen eingeschränkt werden.</p>
                <p>Das ist angemessen, weil:</p>
                <ul>
                  <li><b>Schutz anderer Rechtsgüter:</b> z. B. Strafverfolgung oder Schutz von Leben und Freiheit Dritter – Grundrechte enden, wo Rechte anderer verletzt werden;</li>
                  <li><b>Rechtsstaat:</b> Eingriffe nur auf gesetzlicher Grundlage, verhältnismäßig und oft mit richterlicher Kontrolle – nicht willkürlich;</li>
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
                <p>Rechtlich sind Frauen und Männer gleichberechtigt (Art. 3 Abs. 2 GG). In der Praxis ist die Gleichberechtigung aber noch nicht überall durchgesetzt. Drei Aspekte:</p>
                <ol>
                  <li><b>Beruf / Gastronomie:</b> Führungspositionen in der Küche gelten oft noch als „männlich“, Service als „weiblich“ – Rollenbilder erschweren gleiche Chancen.</li>
                  <li><b>Lohn und Aufstieg:</b> Bei gleicher Qualifikation verdienen Frauen im Schnitt oft weniger oder werden seltener befördert (Gender-Pay-Gap).</li>
                  <li><b>Private Care-Arbeit:</b> Kinderbetreuung und Haushalt liegen häufiger bei Frauen; Teilzeit erschwert Karriere und Rente.</li>
                </ol>
                <p><b>Fazit:</b> Formale Gleichheit im Gesetz bedeutet nicht automatisch tatsächliche Gleichstellung im Alltag.</p>
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
                  <li><b>Bessere Kinderbetreuung und familienfreundliche Arbeitszeiten:</b> Mehr Kitaplätze und flexible Modelle erleichtern beiden Eltern die Berufstätigkeit. <i>Begründung:</i> Weniger einseitige Belastung eines Geschlechts, mehr echte Wahlfreiheit.</li>
                  <li><b>Entgelttransparenz und Förderung von Frauen in Führung:</b> Offenlegung von Gehältern, Kontrollen, gezielte Förderung. <i>Begründung:</i> Art. 3 Abs. 2 GG verpflichtet den Staat, bestehende Nachteile aktiv zu beseitigen – nicht nur formal zu verbieten.</li>
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
              <li><b>Legislative</b> (gesetzgebend): Bundestag (mitwirkend Bundesrat).</li>
              <li><b>Exekutive</b> (ausführend): Bundesregierung / Verwaltung (teilw. Bundespräsident).</li>
              <li><b>Judikative</b> (richterlich): Gerichte, z. B. Bundesverfassungsgericht.</li>
            </ol>
            <p>Ziel: gegenseitige Kontrolle, keine Machtkonzentration.</p>
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
            <p>In der <b>WRV</b> war der Reichspräsident sehr stark (u. a. Art. 48 Notverordnung). Im <b>GG</b> ist der Bundespräsident eher repräsentativ; Macht liegt stärker bei Bundestag und Bundesregierung. Statt einfachem Misstrauen gibt es das konstruktive Misstrauensvotum (Art. 67).</p>
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
            <p><b>Art. 67 (konstruktives Misstrauensvotum):</b> Der Bundestag kann dem Kanzler das Misstrauen nur aussprechen, indem er mit Mehrheit einen <b>neuen</b> Kanzler wählt.</p>
            <p><b>Art. 68 (Vertrauensfrage):</b> Der <b>Kanzler</b> beantragt das Vertrauen. Fehlt die Mehrheit, kann er den Bundespräsidenten ersuchen, den Bundestag aufzulösen (binnen 21 Tagen, falls kein neuer Kanzler gewählt wird).</p>
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
            <p>Neben Legislative, Exekutive und Judikative informieren und kontrollieren freie Medien die Politik öffentlich (Pressefreiheit Art. 5 GG).</p>
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
            <p>Wahlen sind zentral, aber nicht ausreichend. Demokratie braucht laufende Partizipation (Demo, Initiative, Petition, Medien, ggf. Volksentscheide). Zwischen den Wahlen sichern Information und Mitmachen die Kontrolle der Macht.</p>
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
              <li><b>Volksinitiative:</b> Bürger erarbeiten einen Gesetzesentwurf und sammeln Unterschriften (Modell z. B. 100.000).</li>
              <li><b>Volksbegehren:</b> Bei ausreichender Unterstützung (Modell z. B. 1 Mio.) wird das Anliegen fortgeführt; das Parlament behandelt den Vorschlag.</li>
              <li><b>Volksentscheid:</b> Das Volk stimmt ab; die Mehrheit entscheidet.</li>
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
            <p><b>Einleitung:</b> Karikatur „Beteiligung“ von Gerhard Mester (bpb 2023) zum Thema Demokratie und Beteiligung.</p>
            <p><b>Beschreibung:</b> Kuh mit Aufschrift „Demokratie“, Milch/Behälter deuten Beteiligung an; der Behälter wirkt (fast) leer.</p>
            <p><b>Deutung:</b> Kuh = Demokratie, Milch = Beteiligung; wenig Milch = wenige beteiligen sich (Nichtwähler, Desinteresse).</p>
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
            <p><b>Menschenrechte</b> gelten für alle Menschen („Jeder…“ / „Niemand…“): z. B. Menschenwürde (Art. 1), Meinungsfreiheit (Art. 5).</p>
            <p><b>Bürgerrechte</b> knüpfen an deutsche Staatsangehörigkeit („Alle Deutschen…“): z. B. Versammlungsfreiheit (Art. 8), Freizügigkeit (Art. 11) / Berufsfreiheit (Art. 12).</p>
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
              <li><b>Volkssouveränität</b> (Art. 20 Abs. 2): Das Volk ist Inhaber der Staatsgewalt.</li>
              <li><b>Repräsentative Demokratie:</b> Gewählte Abgeordnete üben die Staatsgewalt aus (Art. 38 GG).</li>
              <li><b>Mehrheitsprinzip:</b> Die Mehrheit entscheidet (z. B. Art. 42 Abs. 2, 63 Abs. 2 GG), bei Schutz der Grund- und Minderheitsrechte.</li>
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
            <p>Die Aussage ist <b>falsch</b>. Grundrechte – besonders Menschenwürde und Menschenrechte – gelten für alle Menschen, unabhängig von Meinung oder Verhalten. Einschränkungen nur unter engen gesetzlichen Voraussetzungen, nicht wegen „falscher Meinung“.</p>
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
