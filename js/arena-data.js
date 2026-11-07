/* ============================================================================
   arena-data.js  —  Ngân hàng câu hỏi tự luận chuyên sâu & Bộ đề thi IHK / KA
   Bao gồm:
   1. LF_CATALOG: Danh mục 11 chuyên đề / Lernfeld (BfK-1, BfK-2, WiKO/WiSo, GK, Deutsch, Englisch)
   2. LF_BANK: Ngân hàng câu hỏi tự luận chuyên sâu theo chuẩn GastroAusbV 2022 & IHK/Klassenarbeiten
      - Mỗi câu hỏi có: id, no, lf, fach, category (praxis|rechnen|recht|warenkunde),
        points, title, questionDe, questionVi, placeholderDe, hintDe, hintVi,
        keywords ([{ term, points, vi, alt }]), musterloesungDe, musterloesungVi,
        explanation ({ whyCorrect, whyWrong, keyTakeaway })
   3. IHK_EXAMS: 12 bộ đề thi chuẩn IHK Abschlussprüfung (2023–2025), Zwischenprüfung & Klassenarbeiten
   ============================================================================ */
(function (global) {
  'use strict';

  /* ──────────────────────────────────────────────────────────────────────────
     1. DANH MỤC LERNFELD & MÔN HỌC (LF_CATALOG)
  ────────────────────────────────────────────────────────────────────────── */
  const LF_CATALOG = [
    {
      id: 'lf1',
      code: 'LF 1',
      fach: 'bfk1',
      faches: ['bfk1', 'bfk2'],
      title: 'Die eigene Rolle im Betrieb mitgestalten und den Beruf repräsentieren',
      vi: 'Vai trò nghề nghiệp, BBiG, An toàn lao động (PSA), Vệ sinh Sinner & GHS, Giặt là & Bền vững'
    },
    {
      id: 'lf2',
      code: 'LF 2',
      fach: 'bfk1',
      faches: ['bfk1'],
      title: 'Waren bestellen, annehmen, lagern und pflegen',
      vi: 'Nhận hàng, FIFO, Nhiệt độ kho HACCP, Tồn kho, Hợp đồng mua bán, Schlechtleistung & Lieferverzug'
    },
    {
      id: 'lf3',
      code: 'LF 3',
      fach: 'bfk1',
      faches: ['bfk1'],
      title: 'In der Küche arbeiten (Hygiene, Ernährung, Eier, Kartoffeln & Fachrechnen)',
      vi: '3 trụ cột vệ sinh, HACCP, Tính năng lượng kJ/BW, Mã trứng 0–3, Rührei/Omelett, Khoai tây & Hao hụt'
    },
    {
      id: 'lf4',
      code: 'LF 4',
      fach: 'bfk1',
      faches: ['bfk1', 'bfk2'],
      title: 'Salate, Vorspeisen, Gemüse & Convenience zubereiten',
      vi: 'Kiểu cắt rau củ (Julienne/Brunoise), Gurkensalat, Snack-Karte chay, Các cấp độ Convenience'
    },
    {
      id: 'lf5',
      code: 'LF 5 & 8',
      fach: 'bfk2',
      faches: ['bfk1', 'bfk2'],
      title: 'Im Service arbeiten, Getränke ausschenken, Buffet & Bankett',
      vi: 'Gedeck, 4 kiểu phục vụ, Khiếu nại LEARN, Buffet, Cà phê/Trà/Nước/Bia/Rượu vang/Sekt & JuSchG'
    },
    {
      id: 'lf6',
      code: 'LF 6',
      fach: 'bfk1',
      faches: ['bfk1'],
      title: 'Das gastronomische Angebot mitgestalten (Ernährung, Allergene, Getreide & Karte)',
      vi: 'Đánh giá khách (3S), Ăn chay/Vegan, 14 chất dị ứng LMIV, Đậu khô/Phasin, Ngũ cốc/Mehltype & Thực đơn'
    },
    {
      id: 'lf9',
      code: 'LF 9',
      fach: 'bfk1',
      faches: ['bfk1'],
      title: 'In der Systemgastronomie arbeiten, Zahlungsvorgänge & Bewirtungsvertrag',
      vi: 'Quick/Fullservice, Thanh toán, TSE-Bon, X-Bon/Z-Bon & Kassensturz, USt 7%/19%, Bewirtungsvertrag'
    },
    {
      id: 'fleisch',
      code: 'LF 7 & 10',
      fach: 'bfk2',
      faches: ['bfk2'],
      title: 'Fleisch, Fisch, Milch/Käse, Grundsaucen & Arbeiten am Gast',
      vi: 'Độ chín Steak, Phương pháp nấu, Thịt bò/bê, Cá (3-S-Regel), 4 xốt nền, Sữa/Phô mai, Tranchieren/Flambieren'
    },
    {
      id: 'wiko',
      code: 'WiKO / WiSo',
      fach: 'wiko',
      faches: ['wiko'],
      title: 'Wirtschafts- und Sozialkunde (Arbeitsrecht, Sozialversicherung & Tarifrecht)',
      vi: 'Kündigungsschutz, JArbSchG, MuSchG, 5 trụ cột BHXH, Bảng lương, Betriebsrat, Tarifvertrag & Mobbing'
    },
    {
      id: 'gk',
      code: 'GK / Politik',
      fach: 'gk',
      faches: ['gk'],
      title: 'Gemeinschaftskunde (Demokratie, Grundrechte, Wahlen, Geschichte & Methodik)',
      vi: 'Partizipation, Dân chủ trực tiếp, Grundrechte, Bình đẳng giới, Tam quyền, Bầu cử 5%, Chiến tranh Lạnh & Karikatur'
    },
    {
      id: 'deutsch',
      code: 'Deutsch',
      fach: 'deutsch',
      faches: ['deutsch'],
      title: 'Deutsch im Beruf (Inhaltsangabe TATTE, Sachtext-Visualisierung & Korrespondenz)',
      vi: 'Tóm tắt văn bản theo công thức TATTE, Chuyển văn bản thành biểu đồ & Viết E-Mail phản hồi khách'
    },
    {
      id: 'englisch',
      code: 'Englisch',
      fach: 'englisch',
      faches: ['englisch'],
      title: 'English for Hospitality (Reservations, Complaints & Dietary Advice)',
      vi: 'Nhận đặt bàn qua điện thoại, Xử lý phàn nàn và Tư vấn món ăn / chất dị ứng bằng tiếng Anh'
    }
  ];

  /* ──────────────────────────────────────────────────────────────────────────
     2. NGÂN HÀNG CÂU HỎI TỰ LUẬN THEO LERNFELD (LF_BANK)
  ────────────────────────────────────────────────────────────────────────── */
  const LF_BANK = {

    /* ========================================================================
       LF 1: DIE EIGENE ROLLE IM BETRIEB MITGESTALTEN & WIRTSCHAFTSDIENST
       ======================================================================== */
    lf1: [
      {
        id: 'lf1-q1',
        no: 1,
        lf: 'lf1',
        fach: 'bfk1',
        category: 'recht',
        points: 10,
        title: 'Rechte und Pflichten im Ausbildungsverhältnis (BBiG)',
        questionDe: 'Sie beginnen Ihre Ausbildung im Restaurant „Goldener Hirsch“. Nennen Sie jeweils vier Pflichten des Auszubildenden (§ 13 BBiG) und vier Pflichten des Ausbildenden (§ 14 BBiG) gemäß Berufsbildungsgesetz.',
        questionVi: 'Bạn bắt đầu kỳ học nghề tại nhà hàng „Goldener Hirsch“. Hãy nêu 4 nghĩa vụ của Azubi (§ 13 BBiG) và 4 nghĩa vụ của doanh nghiệp đào tạo (§ 14 BBiG) theo Luật Đào tạo nghề.',
        placeholderDe: 'Pflichten Azubi: 1. Lernpflicht...\nPflichten Ausbilder: 1. Ausbildungspflicht...',
        hintDe: 'Strukturieren Sie Ihre Antwort in zwei Blöcke: A) 4 Pflichten Azubi (§ 13 BBiG) und B) 4 Pflichten Ausbildender (§ 14 BBiG).',
        hintVi: 'Chia bài làm thành 2 phần rõ ràng: A) 4 nghĩa vụ của Azubi (§ 13 BBiG) và B) 4 nghĩa vụ của doanh nghiệp (§ 14 BBiG).',
        keywords: [
          { term: 'Lernpflicht', points: 1.5, vi: 'Nghĩa vụ nỗ lực học nghề (Lernpflicht)', alt: ['lernen', 'Ausbildungsziel'] },
          { term: 'Sorgfaltspflicht', points: 1.5, vi: 'Thực hiện công việc cẩn thận & bảo quản dụng cụ (Sorgfaltspflicht)', alt: ['pfleglich', 'Werkzeuge', 'sorgfältig'] },
          { term: 'Berufsschulpflicht', points: 1, vi: 'Tham gia đầy đủ trường nghề (Berufsschulpflicht)', alt: ['Berufsschule', 'Schulpflicht'] },
          { term: 'Schweigepflicht', points: 1, vi: 'Bảo mật bí mật kinh doanh (Schweigepflicht)', alt: ['Betriebsgeheimnisse', 'Geschäftsgeheimnisse'] },
          { term: 'Berichtsheft', points: 1, vi: 'Viết sổ tay đào tạo (Ausbildungsnachweis/Berichtsheft)', alt: ['Ausbildungsnachweis'] },
          { term: 'Ausbildungspflicht', points: 1, vi: 'Nghĩa vụ truyền đạt kiến thức theo khung đào tạo (Ausbildungspflicht)', alt: ['Ausbildungsplan', 'Fertigkeiten vermitteln'] },
          { term: 'Vergütungspflicht', points: 1.5, vi: 'Trả lương học nghề đúng hạn (Vergütungspflicht)', alt: ['Vergütung', 'Ausbildungsvergütung'] },
          { term: 'Freistellungspflicht', points: 1.5, vi: 'Giải phóng thời gian đi học trường nghề & đi thi (Freistellungspflicht)', alt: ['freistellen', 'Prüfungen', 'Ausbildungsmittel kostenlos'] }
        ],
        musterloesungDe:
          'Pflichten des Auszubildenden (§ 13 BBiG):\n' +
          '1. Lernpflicht: Sich bemühen, das Ausbildungsziel zu erreichen.\n' +
          '2. Sorgfaltspflicht & pflegliche Behandlung von Arbeitsmitteln/Lebensmitteln.\n' +
          '3. Berufsschulpflicht & Weisungsgebundenheit.\n' +
          '4. Führung des Ausbildungsnachweises (Berichtsheft) sowie Schweigepflicht über Betriebs- und Geschäftsgeheimnisse.\n\n' +
          'Pflichten des Ausbildenden (§ 14 BBiG):\n' +
          '1. Ausbildungspflicht: Planmäßige Vermittlung aller Fertigkeiten laut Ausbildungsrahmenplan.\n' +
          '2. Vergütungspflicht: Zahlung einer angemessenen Ausbildungsvergütung.\n' +
          '3. Kostenlose Bereitstellung der Ausbildungsmittel (Werkzeuge, Fachbücher).\n' +
          '4. Freistellungspflicht für Berufsschulunterricht und IHK-Prüfungen sowie Fürsorgepflicht.',
        musterloesungVi:
          'Nghĩa vụ của Azubi (§ 13 BBiG): 1. Nỗ lực học nghề (Lernpflicht); 2. Cẩn trọng và giữ gìn thiết bị (Sorgfaltspflicht); 3. Đi học trường nghề & tuân thủ chỉ dẫn (Berufsschulpflicht); 4. Viết Berichtsheft và giữ bí mật kinh doanh (Schweigepflicht).\n' +
          'Nghĩa vụ của Doanh nghiệp (§ 14 BBiG): 1. Đào tạo đúng khung chương trình (Ausbildungspflicht); 2. Trả lương học nghề (Vergütungspflicht); 3. Cung cấp miễn phí dụng cụ học nghề; 4. Cho nghỉ hưởng nguyên lương để đi học Berufsschule và thi IHK (Freistellungspflicht).',
        explanation: {
          whyCorrect: 'Phân biệt rõ quyền và nghĩa vụ đối xứng giữa 2 bên theo § 13 và § 14 BBiG.',
          whyWrong: 'Lẫn lộn nghĩa vụ của chủ doanh nghiệp sang Azubi hoặc quên nghĩa vụ viết Berichtsheft / giải phóng giờ học.',
          keyTakeaway: 'Nhớ cặp đối xứng: Azubi có Lernpflicht + Sorgfaltspflicht + Berichtsheft + Schweigepflicht; Betrieb có Ausbildungspflicht + Vergütungspflicht + Freistellungspflicht + Fürsorgepflicht.'
        }
      },
      {
        id: 'lf1-q2',
        no: 2,
        lf: 'lf1',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Arbeitssicherheit, Unfallverhütung & Persönliche Schutzausrüstung (PSA)',
        questionDe: 'In der Küche und im Wirtschaftsdienst besteht erhöhte Unfallgefahr. Nennen Sie vier typische Unfallgefahren im Gastronomiebetrieb und ordnen Sie jeweils eine konkrete Schutzmaßnahme bzw. Persönliche Schutzausrüstung (PSA) nach den Vorschriften der BGN zu.',
        questionVi: 'Trong bếp và bộ phận tạp vụ có nguy cơ tai nạn lao động cao. Hãy nêu 4 nguy cơ tai nạn điển hình trong nhà hàng và ghép mỗi nguy cơ với một biện pháp phòng ngừa hoặc đồ bảo hộ cá nhân (PSA) theo quy định của BGN.',
        placeholderDe: '1. Rutschgefahr -> ...\n2. Schnittgefahr -> ...\n3. Verbrennungsgefahr -> ...\n4. Verätzungsgefahr -> ...',
        hintDe: 'Denken Sie an die 4 Hauptgefahren: Rutschen/Stolpern, Schneiden, Verbrennen/Verbrühen und Verätzen durch Reinigungsmittel.',
        hintVi: 'Liệt kê theo 4 nhóm nguy cơ chính: Trượt ngã, Đứt tay, Bỏng nhiệt và Bỏng hóa chất tẩy rửa.',
        keywords: [
          { term: 'Rutschgefahr', points: 1.5, vi: 'Nguy cơ trượt ngã do sàn ướt/dầu mỡ (Rutschgefahr)', alt: ['Stolpergefahr', 'Ausrutschen'] },
          { term: 'Sicherheitsschuhe', points: 1.5, vi: 'Giày bảo hộ chống trượt có mũi bọc (rutschfeste Sicherheitsschuhe)', alt: ['rutschfest', 'Schuhwerk'] },
          { term: 'Schnittgefahr', points: 1.5, vi: 'Nguy cơ đứt tay do dao/máy cắt (Schnittgefahr)', alt: ['Schnittverletzung', 'Messer'] },
          { term: 'Stechschutzhandschuh', points: 1.5, vi: 'Găng tay chống cắt/đâm hoặc Krallengriff (Kettenhandschuh)', alt: ['Schnittschutzhandschuh', 'Krallengriff', 'Kettenhandschuh'] },
          { term: 'Verbrennungsgefahr', points: 1.5, vi: 'Nguy cơ bỏng nhiệt/nước sôi/dầu nóng (Verbrennungs-/Verbrühungsgefahr)', alt: ['Verbrühung', 'Hitze', 'Fett'] },
          { term: 'Kochjacke', points: 1, vi: 'Áo bếp dài tay cài nút đôi, tạp dề, khăn khô (trockene Topflappen)', alt: ['Hitzeschutzhandschuhe', 'Topflappen'] },
          { term: 'Schutzbrille', points: 1.5, vi: 'Kính bảo hộ & găng tay hóa chất khi pha chất tẩy rửa (Schutzbrille & Schutzhandschuhe)', alt: ['Schutzhandschuhe', 'Verätzung', 'Chemikalien'] }
        ],
        musterloesungDe:
          '1. Rutsch- und Stolpergefahr (nasse/fettige Böden): Tragen von rutschfesten, geschlossenen Sicherheitsschuhen mit Zehenschutzkappe; verschüttete Flüssigkeiten sofort aufwischen.\n' +
          '2. Schnitt- und Stichgefahr (Messer, Aufschnittmaschine): Anwendung des Krallengriffs, Tragen eines Stech-/Schnittschutzhandschuhs beim Ausbeinen, niemals in ein fallendes Messer greifen, Restehalter an der Aufschnittmaschine nutzen.\n' +
          '3. Verbrennungs- und Verbrühungsgefahr (heiße Töpfe, Dampf, Frittierfett): Zweireihige langärmelige Kochjacke, Vorbinder sowie trockene Hitze-Handschuhe/Topflappen verwenden; Topfdeckel vom Körper weg öffnen; kein Wasser in heißes Fett gießen.\n' +
          '4. Verätzungsgefahr (aggressive Reiniger/Grillreiniger): Chemikalienschutzhandschuhe und Schutzbrille tragen, Betriebsanweisung beachten.',
        musterloesungVi:
          '1. Nguy cơ trượt ngã: Mang giày bảo hộ chống trượt có bọc mũi (Sicherheitsschuhe), lau khô sàn ngay khi đổ nước/dầu.\n' +
          '2. Nguy cơ đứt tay: Dùng kỹ thuật Krallengriff, đeo găng tay thép chống đâm (Stechschutzhandschuh) khi lọc xương, dùng Restehalter khi cắt máy.\n' +
          '3. Nguy cơ bỏng nhiệt: Mặc áo bếp dài tay 2 hàng cúc, dùng khăn/găng cách nhiệt khô (trockene Topflappen), mở nắp nồi hướng ra ngoài, tuyệt đối không đổ nước vào chảo dầu cháy.\n' +
          '4. Nguy cơ bỏng hóa chất: Đeo găng tay cao su kháng hóa chất và kính bảo hộ (Schutzbrille).',
        explanation: {
          whyCorrect: 'Kết hợp chính xác cặp Nguy cơ (Gefahr) → Trang bị bảo hộ cá nhân (PSA) & Quy tắc ứng xử an toàn.',
          whyWrong: 'Dùng khăn ướt để bưng nồi nóng (hơi nước dẫn nhiệt gây bỏng ngay lập tức) hoặc chỉ nêu nguy cơ mà thiếu PSA.',
          keyTakeaway: 'PSA chuẩn trong bếp: Sicherheitsschuhe + Zweireihige Kochjacke + Vorbinder + Stechschutzhandschuh + Schutzbrille/Chemikalienhandschuhe.'
        }
      },
      {
        id: 'lf1-q3',
        no: 3,
        lf: 'lf1',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Wirtschaftsdienst: Reinigungsarbeiten, Sinner’scher Kreis & GHS-Dosierung',
        questionDe: 'Im Wirtschaftsdienst reinigen Sie das Restaurant und den Sanitärbereich.\n' +
          'a) Erklären Sie die vier Faktoren des Sinner’schen Kreises bei der Reinigung.\n' +
          'b) Ein Allzweckreiniger mit dem GHS-Symbol „Ausrufezeichen“ (Achtung / Reizend) hat ein Mischungsverhältnis von 1:200. Berechnen Sie, wie viel Milliliter (ml) Reinigungskonzentrat Sie für einen Eimer mit 5 Litern Wasser benötigen.\n' +
          'c) Berechnen Sie die Stromkosten: Ein Staubsauger hat eine Leistung von 850 Watt und läuft täglich 2 Stunden an 30 Tagen. Der Strompreis beträgt 0,40 € pro kWh.',
        questionVi: 'Trong bộ phận tạp vụ (Wirtschaftsdienst), bạn vệ sinh nhà hàng và khu vệ sinh.\n' +
          'a) Giải thích 4 yếu tố của vòng tròn Sinner (Sinner’scher Kreis) trong làm sạch.\n' +
          'b) Một dung dịch tẩy rửa đa năng có biểu tượng GHS „Dấu chấm than“ có tỷ lệ pha 1:200. Tính số ml dung dịch đậm đặc cần cho xô 5 lít nước.\n' +
          'c) Tính tiền điện: Máy hút bụi công suất 850 Watt chạy 2 giờ/ngày trong 30 ngày, giá điện 0,40 €/kWh.',
        placeholderDe: 'a) 4 Faktoren Sinner’scher Kreis: ...\nb) Dosierung 1:200 bei 5 l = ...\nc) Stromkosten: 850 W * 2 h * 30 Tage = ...',
        hintDe: 'a) Chemie, Mechanik, Temperatur, Zeit. b) 5 l = 5.000 ml; 5.000 : 200. c) Watt in kW umrechnen (: 1.000).',
        hintVi: 'a) Hóa chất, Cơ học, Nhiệt độ, Thời gian. b) Đổi 5 lít = 5.000 ml rồi chia cho 200. c) Đổi 850 W = 0,85 kW.',
        keywords: [
          { term: 'Chemie', points: 1, vi: 'Yếu tố Hóa chất tẩy rửa (Chemie)', alt: ['Reinigungsmittel'] },
          { term: 'Mechanik', points: 1, vi: 'Yếu tố Tác động cơ học/chà cọ (Mechanik)', alt: ['Schrubben', 'Wischen'] },
          { term: 'Temperatur', points: 1, vi: 'Yếu tố Nhiệt độ nước (Temperatur)', alt: ['Wärme'] },
          { term: 'Zeit', points: 1, vi: 'Yếu tố Thời gian ngâm/tác dụng (Einwirkzeit)', alt: ['Einwirkzeit'] },
          { term: '25 ml', points: 3, vi: '5.000 ml ÷ 200 = 25 ml dung dịch đậm đặc', alt: ['25ml', '0,025 l'] },
          { term: '51 kWh', points: 1.5, vi: 'Điện năng tiêu thụ: 0,85 kW × 2 h × 30 ngày = 51 kWh', alt: ['51kWh', '0,85 kW'] },
          { term: '20,40', points: 1.5, vi: 'Chi phí điện: 51 kWh × 0,40 € = 20,40 €', alt: ['20,4 €', '20.40'] }
        ],
        musterloesungDe:
          'a) Vier Faktoren des Sinner’schen Kreises:\n' +
          '1. Chemie (Reinigungsmittel & Konzentration)\n' +
          '2. Mechanik (Reiben, Bürsten, Wasserdruck)\n' +
          '3. Temperatur (Wassertemperatur)\n' +
          '4. Zeit (Einwirkzeit des Reinigers)\n' +
          'Wird ein Faktor verringert, müssen die anderen Faktoren entsprechend erhöht werden.\n\n' +
          'b) Dosierungsberechnung (Mischungsverhältnis 1:200):\n' +
          '5 Liter Wasser = 5.000 ml\n' +
          '5.000 ml ÷ 200 = 25 ml Reinigungskonzentrat.\n\n' +
          'c) Stromkostenberechnung:\n' +
          'Leistung: 850 W = 0,85 kW\n' +
          'Verbrauch in 30 Tagen: 0,85 kW × 2 Stunden × 30 Tage = 51 kWh\n' +
          'Stromkosten: 51 kWh × 0,40 €/kWh = 20,40 €.',
        musterloesungVi:
          'a) 4 yếu tố vòng tròn Sinner: Chemie (Hóa chất), Mechanik (Cơ học), Temperatur (Nhiệt độ), Zeit (Thời gian tác dụng).\n' +
          'b) Tính liều lượng 1:200 cho 5 lít: 5.000 ml ÷ 200 = 25 ml dung dịch đậm đặc.\n' +
          'c) Tính tiền điện: 850 W = 0,85 kW → 0,85 kW × 2 h × 30 ngày = 51 kWh → 51 kWh × 0,40 € = 20,40 €.',
        explanation: {
          whyCorrect: 'Vận dụng đúng lý thuyết Sinner’scher Kreis và 2 dạng bài tính thực tế xuất hiện trong đề IHK Winter 2023/24 và Sommer 2025.',
          whyWrong: 'Quên đổi 5 lít ra 5.000 ml hoặc quên đổi 850 W sang 0,85 kW trước khi nhân giá tiền mỗi kWh.',
          keyTakeaway: '1 lít = 1.000 ml; 1.000 Watt = 1 kW. Với tỷ lệ 1:200 thì mỗi lít nước cần 5 ml hóa chất (5 l × 5 ml = 25 ml).'
        }
      },
      {
        id: 'lf1-q4',
        no: 4,
        lf: 'lf1',
        fach: 'bfk1',
        category: 'warenkunde',
        points: 10,
        title: 'Textilpflegekennzeichen & Umweltschutz (Nachhaltigkeit im Gastgewerbe)',
        questionDe: 'Tischwäsche und Berufskleidung müssen fachgerecht gepflegt und Ressourcen im Betrieb geschont werden.\n' +
          'a) Erklären Sie die fünf Grundsymbole der Textilpflegekennzeichnung auf dem Pflegeetikett einer Tischdecke.\n' +
          'b) Nennen Sie fünf konkrete Maßnahmen, wie ein Gastronomiebetrieb im Alltag Wasser, Energie und Abfall einsparen kann.',
        questionVi: 'Khăn trải bàn và đồng phục phải được giặt ủi đúng quy cách và tiết kiệm tài nguyên trong nhà hàng.\n' +
          'a) Giải thích 5 ký hiệu cơ bản trên nhãn hướng dẫn giặt là (Textilpflegekennzeichen) của khăn trải bàn.\n' +
          'b) Nêu 5 biện pháp cụ thể giúp nhà hàng tiết kiệm nước, năng lượng và giảm rác thải hằng ngày.',
        placeholderDe: 'a) 5 Pflegesymbole: 1. Waschbottich...\nb) 5 Umweltschutzmaßnahmen: 1. ...',
        hintDe: 'a) Waschbottich, Dreieck, Bügeleisen, Kreis, Quadrat. b) LED, Spülmaschine voll beladen, Mülltrennung, Mehrweg, regionale Produkte.',
        hintVi: 'a) Chậu giặt, Hình tam giác, Bàn ủi, Hình tròn, Hình vuông. b) Đèn LED, chạy máy rửa bát khi đầy, phân loại rác, bao bì tái sử dụng, nguyên liệu địa phương.',
        keywords: [
          { term: 'Waschbottich', points: 1, vi: 'Chậu giặt: Giặt nước & nhiệt độ tối đa (Waschen / Gradzahl)', alt: ['Waschen', 'Gradzahl'] },
          { term: 'Dreieck', points: 1, vi: 'Tam giác: Tẩy trắng (Bleichen erlaubt / nicht bleichen)', alt: ['Bleichen'] },
          { term: 'Bügeleisen', points: 1, vi: 'Bàn ủi: Ủi/là theo mức nhiệt chấm tròn (Bügeln)', alt: ['Bügeln'] },
          { term: 'Kreis', points: 1, vi: 'Hình tròn: Giặt khô hóa chất (Professionelle Textilreinigung)', alt: ['Chemische Reinigung', 'Textilreinigung'] },
          { term: 'Quadrat', points: 1, vi: 'Hình vuông có tròn bên trong: Sấy máy (Trommeltrocknen)', alt: ['Trocknen', 'Trommeltrockner'] },
          { term: 'LED', points: 1.5, vi: 'Sử dụng đèn LED & thiết bị tiết kiệm điện, tắt thiết bị khi không dùng', alt: ['Energiesparlampen', 'Bewegungsmelder', 'Stoßlüften'] },
          { term: 'Spülmaschine', points: 1.5, vi: 'Chỉ chạy máy rửa bát/giặt khi đầy tải, lắp đầu vòi tiết kiệm nước (Perlstrahler)', alt: ['Wasserspardüsen', 'Perlstrahler', 'voll beladen'] },
          { term: 'Mehrweg', points: 2, vi: 'Ưu tiên bao bì tái sử dụng (Mehrweggebinde), bỏ gói nhỏ dùng 1 lần, mua hàng vùng miền & phân loại rác', alt: ['Mülltrennung', 'Einzelportionen', 'regional', 'saisonal'] }
        ],
        musterloesungDe:
          'a) Die fünf Grundsymbole der Textilpflege:\n' +
          '1. Waschbottich (Waschen): Gibt die maximale Waschtemperatur an (z. B. 60 °C oder 95 °C Kochwäsche); ein Unterstrich bedeutet Schonwaschgang.\n' +
          '2. Dreieck (Bleichen): Leeres Dreieck = Bleichen erlaubt; durchgestrichenes Dreieck = Nicht bleichen.\n' +
          '3. Quadrat mit Kreis (Trocknen): Trocknen im Wäschetrockner (1 Punkt = schonend/niedrige Temperatur, 2 Punkte = normal).\n' +
          '4. Bügeleisen (Bügeln): 1 Punkt = max. 110 °C, 2 Punkte = max. 150 °C, 3 Punkte = max. 200 °C.\n' +
          '5. Kreis (Professionelle Reinigung): Buchstabe P oder F für chemische Reinigung.\n\n' +
          'b) Fünf Maßnahmen zum Umwelt- und Ressourcenschutz:\n' +
          '1. Spül- und Waschmaschinen nur voll beladen einschalten und Wasserspardüsen (Perlstrahler) an Wasserhähnen nutzen.\n' +
          '2. Umrüstung auf LED-Beleuchtung, Bewegungsmelder in Lagerräumen und Abschalten nicht benötigter Küchengeräte.\n' +
          '3. Regelmäßiges Entkalken von Kaffeemaschinen/Kombidämpfern und intakte Türdichtungen an Kühlhäusern prüfen.\n' +
          '4. Verzicht auf Portionsverpackungen am Buffet, Nutzung von Mehrweggebinden und konsequente Mülltrennung.\n' +
          '5. Einkauf regionaler und saisonaler Lebensmittel sowie bedarfsgerechte Kalkulation gegen Lebensmittelverschwendung (Food Waste).',
        musterloesungVi:
          'a) 5 ký hiệu giặt là: 1. Chậu nước (Giặt & nhiệt độ tối đa); 2. Tam giác (Tẩy trắng); 3. Hình vuông chứa hình tròn (Sấy máy); 4. Bàn ủi (Ủi theo số chấm nhiệt độ); 5. Hình tròn (Giặt khô chuyên nghiệp).\n' +
          'b) 5 biện pháp bảo vệ môi trường: 1. Chỉ vận hành máy rửa bát/máy giặt khi đầy tải & dùng vòi tiết kiệm nước; 2. Đèn LED, cảm biến chuyển động, tắt bếp khi nghỉ; 3. Tẩy cặn canxi định kỳ & kiểm tra gioăng tủ lạnh; 4. Dùng bao bì Mehrweg, bỏ gói bơ/mứt dùng 1 lần, phân loại rác; 5. Mua nguyên liệu theo mùa tại địa phương và tính định lượng chuẩn để tránh Food Waste.',
        explanation: {
          whyCorrect: 'Đây là câu hỏi thực tế trong đề IHK Sommer 2024 và Winter 2024/25 về chăm sóc đồ vải và tiết kiệm năng lượng.',
          whyWrong: 'Nhầm ký hiệu hình tròn (giặt khô) với hình vuông có vòng tròn (máy sấy).',
          keyTakeaway: '5 ký hiệu theo thứ tự chuẩn: Giặt (Chậu) → Tẩy (Tam giác) → Sấy (Vuông+Tròn) → Ủi (Bàn ủi) → Giặt khô (Tròn).'
        }
      }
    ],

    /* ========================================================================
       LF 2: WAREN BESTELLEN, ANNEHMEN, LAGERN UND PFLEGEN
       ======================================================================== */
    lf2: [
      {
        id: 'lf2-q1',
        no: 1,
        lf: 'lf2',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Wareneingangskontrolle & Kühltemperaturen nach HACCP',
        questionDe: 'Der Lieferant bringt frisches Rinderfilet, frischen Lachs, Molkereiprodukte und Tiefkühlgemüse.\n' +
          'a) Beschreiben Sie die sechs Prüfschritte einer fachgerechten Wareneingangskontrolle.\n' +
          'b) Nennen Sie die gesetzlich vorgeschriebenen maximalen Kühltemperaturen für Hackfleisch, frischen Fisch (auf Eis), Fleisch/Geflügel, Milchprodukte und Tiefkühlware.',
        questionVi: 'Nhà cung cấp giao thăn bò tươi, cá hồi tươi, sản phẩm sữa và rau củ đông lạnh.\n' +
          'a) Mô tả 6 bước kiểm tra chuẩn khi nhận hàng (Wareneingangskontrolle).\n' +
          'b) Nêu nhiệt độ bảo quản tối đa theo quy định cho thịt băm, cá tươi (ướp đá), thịt/gia cầm, sản phẩm sữa và hàng đông lạnh.',
        placeholderDe: 'a) 6 Schritte Wareneingang: 1. Lieferschein vs. Bestellung...\nb) Temperaturen: Hackfleisch max. ..., Fisch ..., Fleisch ..., Milch ..., TK ...',
        hintDe: 'a) Dokumente abgleichen, Menge, Qualität/Sensorik, Temperatur, MHD/Verbrauchsdatum, Quittieren. b) +2 °C / 0–2 °C / +4 °C / +4 bis +8 °C / min. -18 °C.',
        hintVi: 'a) Đối chiếu chứng từ, Số lượng, Chất lượng cảm quan, Nhiệt độ, Hạn dùng MHD/Verbrauchsdatum, Ký nhận. b) +2 °C / 0–2 °C / +4 °C / +4 đến +8 °C / -18 °C.',
        keywords: [
          { term: 'Lieferschein', points: 1.5, vi: 'Đối chiếu phiếu giao hàng (Lieferschein) với đơn đặt hàng (Bestellschein)', alt: ['Bestellung', 'Bestellschein'] },
          { term: 'Mengenkontrolle', points: 1, vi: 'Kiểm tra số lượng & trọng lượng (Wiegen, Zählen)', alt: ['Gewicht', 'Menge'] },
          { term: 'Qualitätskontrolle', points: 1, vi: 'Kiểm tra cảm quan & bao bì nguyên vẹn (Sensorik, Verpackung)', alt: ['Sensorik', 'Verpackung'] },
          { term: 'MHD', points: 1, vi: 'Kiểm tra hạn sử dụng MHD / Verbrauchsdatum', alt: ['Mindesthaltbarkeitsdatum', 'Verbrauchsdatum'] },
          { term: '2 °C', points: 1.5, vi: 'Hackfleisch tối đa +2 °C, Cá tươi trên đá 0 °C đến +2 °C', alt: ['+2 °C', '0 bis 2 °C'] },
          { term: '4 °C', points: 1.5, vi: 'Gia cầm / Thịt tươi tối đa +4 °C (đến +7 °C)', alt: ['+4 °C', 'Geflügel'] },
          { term: '-18 °C', points: 1.5, vi: 'Hàng đông lạnh (Tiefkühlware) tối thiểu -18 °C (không đứt chuỗi lạnh)', alt: ['18 °C', 'Kühlkette'] },
          { term: 'FIFO', points: 1, vi: 'Nhập kho ngay theo nguyên tắc FIFO (First In – First Out)', alt: ['First In', 'Kühlhaus'] }
        ],
        musterloesungDe:
          'a) Sechs Schritte der Wareneingangskontrolle:\n' +
          '1. Abgleich von Bestellschein und Lieferschein (wurde die richtige Ware geliefert?).\n' +
          '2. Mengen- und Gewichtskontrolle (Zählen, Wiegen).\n' +
          '3. Qualitäts- und Sensorikkontrolle (Aussehen, Geruch, unbeschädigte Verpackung, kein Gefrierbrand).\n' +
          '4. Temperaturkontrolle mit Einstech-/Infrarotthermometer und Dokumentation im HACCP-Protokoll.\n' +
          '5. Kontrolle des Mindesthaltbarkeitsdatums (MHD) bzw. Verbrauchsdatums.\n' +
          '6. Empfang bestätigen (Unterschrift; eventuelle Mängel sofort schriftlich auf dem Lieferschein vermerken) und Kühlware sofort nach FIFO einlagern.\n\n' +
          'b) Maximale Lagertemperaturen:\n' +
          '-Frischer Fisch (in schmelzendem Eis): 0 °C bis +2 °C\n' +
          '-Hackfleisch: max. +2 °C\n' +
          '-Geflügel: max. +4 °C (Frischfleisch Rind/Schwein bis max. +7 °C)\n' +
          '-Milch und Molkereiprodukte: +4 °C bis +8 °C\n' +
          '-Tiefkühlware (TK): mindestens -18 °C (ohne Unterbrechung der Kühlkette).',
        musterloesungVi:
          'a) 6 bước kiểm tra nhận hàng: 1. Đối chiếu đơn đặt hàng và phiếu giao hàng; 2. Cân đếm số lượng; 3. Kiểm tra cảm quan và bao bì; 4. Đo nhiệt độ và ghi sổ HACCP; 5. Kiểm tra MHD / Verbrauchsdatum; 6. Ký nhận (ghi rõ lỗi ngay trên phiếu nếu có) và cất ngay hàng lạnh theo FIFO.\n' +
          'b) Nhiệt độ bảo quản: Cá tươi ướp đá 0–2 °C; Thịt băm tối đa +2 °C; Gia cầm tối đa +4 °C; Sữa +4 đến +8 °C; Hàng đông lạnh tối thiểu -18 °C.',
        explanation: {
          whyCorrect: 'Bao quát đầy đủ quy trình kiểm nhận hàng thực tế và bảng nhiệt độ chuẩn HACCP.',
          whyWrong: 'Ký nhận phiếu giao hàng trước khi kiểm tra nhiệt độ/chất lượng hoặc nhầm nhiệt độ Hackfleisch (+2 °C) với thịt nguyên miếng.',
          keyTakeaway: 'Mốc nhiệt độ sống còn: TK ≤ -18 °C | Cá 0–2 °C | Hackfleisch ≤ +2 °C | Gia cầm ≤ +4 °C | Sữa 4–8 °C.'
        }
      },
      {
        id: 'lf2-q2',
        no: 2,
        lf: 'lf2',
        fach: 'bfk1',
        category: 'rechnen',
        points: 10,
        title: 'Lagerkennzahlen: Mindestbestand, Meldebestand & Höchstbestand berechnen',
        questionDe: 'Im Getränkelager soll der Bestand an Mineralwasser (Kisten) überwacht werden.\n' +
          'Gegeben sind folgende Daten:\n' +
          '-Tagesverbrauch: 15 Kisten\n' +
          '-Lieferzeit des Getränkehändlers: 4 Tage\n' +
          '-Sicherheitszuschlag (eiserne Reserve): 2 Tage (= 30 Kisten)\n' +
          '-Optimale Bestellmenge: 120 Kisten\n' +
          'a) Erklären Sie kurz die Begriffe Mindestbestand und Meldebestand.\n' +
          'b) Berechnen Sie den Mindestbestand, den Meldebestand und den Höchstbestand (mit Rechenweg).',
        questionVi: 'Trong kho đồ uống cần giám sát lượng tồn kho nước khoáng (thùng).\n' +
          'Cho số liệu:\n' +
          '-Tiêu thụ mỗi ngày: 15 thùng\n' +
          '-Thời gian giao hàng: 4 ngày\n' +
          '-Dự trữ an toàn (Mindestbestand): 2 ngày (= 30 thùng)\n' +
          '-Lượng đặt hàng tối ưu: 120 thùng\n' +
          'a) Giải thích ngắn gọn khái niệm Mindestbestand và Meldebestand.\n' +
          'b) Tính Mindestbestand, Meldebestand và Höchstbestand (ghi rõ phép tính).',
        placeholderDe: 'a) Definitionen: ...\nb) Mindestbestand = ...\nMeldebestand = ...\nHöchstbestand = ...',
        hintDe: 'Mindestbestand = Tagesverbrauch × Sicherheitstage. Meldebestand = (Tagesverbrauch × Lieferzeit) + Mindestbestand. Höchstbestand = Mindestbestand + Bestellmenge.',
        hintVi: 'Mindestbestand = Tiêu thụ/ngày × Số ngày dự trữ. Meldebestand = (Tiêu thụ/ngày × Thời gian giao) + Mindestbestand. Höchstbestand = Mindestbestand + Lượng đặt hàng.',
        keywords: [
          { term: 'eiserne Reserve', points: 1.5, vi: 'Mindestbestand là lượng dự trữ an toàn tối thiểu (eiserne Reserve/Notbestand)', alt: ['Sicherheitsbestand', 'Notbestand'] },
          { term: 'Bestellung ausgelöst', points: 1.5, vi: 'Meldebestand là ngưỡng tồn kho mà tại đó phải đặt hàng mới (Bestellpunkt)', alt: ['nachbestellt', 'Bestellpunkt'] },
          { term: '30 Kisten', points: 2, vi: 'Mindestbestand = 15 × 2 = 30 thùng', alt: ['30'] },
          { term: '90 Kisten', points: 2.5, vi: 'Meldebestand = (15 × 4) + 30 = 90 thùng', alt: ['60 + 30 = 90', '90'] },
          { term: '150 Kisten', points: 2.5, vi: 'Höchstbestand = 30 + 120 = 150 thùng', alt: ['30 + 120 = 150', '150'] }
        ],
        musterloesungDe:
          'a) Begriffserklärung:\n' +
          '-Mindestbestand (eiserne Reserve): Sicherheitsbestand, der im Normalfall nicht unterschritten werden darf, um Lieferverzögerungen oder Mehrverbrauch aufzufangen.\n' +
          '-Meldebestand (Bestellpunkt): Der Lagerbestand, bei dessen Erreichen eine neue Bestellung ausgelöst werden muss, damit die neue Ware genau beim Erreichen des Mindestbestands eintrifft.\n\n' +
          'b) Berechnung:\n' +
          '1. Mindestbestand = Tagesverbrauch × Sicherheitstage = 15 Kisten × 2 Tage = 30 Kisten.\n' +
          '2. Meldebestand = (Tagesverbrauch × Lieferzeit) + Mindestbestand = (15 Kisten × 4 Tage) + 30 Kisten = 60 + 30 = 90 Kisten.\n' +
          '3. Höchstbestand = Mindestbestand + optimale Bestellmenge = 30 Kisten + 120 Kisten = 150 Kisten.',
        musterloesungVi:
          'a) Giải thích:\n' +
          '-Mindestbestand (Dự trữ an toàn): Lượng tồn kho tối thiểu không được phép chạm dưới trong điều kiện bình thường để phòng giao hàng trễ.\n' +
          '-Meldebestand (Điểm đặt hàng): Mức tồn kho mà khi chạm tới phải đặt hàng ngay để hàng mới về kịp lúc kho chạm mức Mindestbestand.\n' +
          'b) Tính toán:\n' +
          '-Mindestbestand = 15 × 2 = 30 thùng.\n' +
          '-Meldebestand = (15 × 4) + 30 = 90 thùng.\n' +
          '-Höchstbestand = 30 + 120 = 150 thùng.',
        explanation: {
          whyCorrect: 'Áp dụng đúng công thức chuẩn IHK cho 3 chỉ số kho hàng.',
          whyWrong: 'Quên cộng Mindestbestand khi tính Meldebestand (chỉ lấy 15 × 4 = 60 là sai vì khi hàng về kho sẽ về 0, mất lớp đệm an toàn).',
          keyTakeaway: 'Công thức vàng: Meldebestand = (Tagesverbrauch × Lieferzeit) + Mindestbestand; Höchstbestand = Mindestbestand + Bestellmenge.'
        }
      },
      {
        id: 'lf2-q3',
        no: 3,
        lf: 'lf2',
        fach: 'bfk1',
        category: 'recht',
        points: 10,
        title: 'Kaufvertrag: Zustandekommen, Angebotsbindung & Lieferbedingungen',
        questionDe: 'Das Restaurant möchte einen neuen Kombidämpfer und frische Lebensmittel bestellen.\n' +
          'a) Erklären Sie die zwei Möglichkeiten, wie ein Kaufvertrag rechtlich durch zwei übereinstimmende Willenserklärungen (Antrag & Annahme) zustande kommt.\n' +
          'b) Unterscheiden Sie eine „Anfrage“ von einem „Angebot“ und nennen Sie zwei Freizeichnungsklauseln.\n' +
          'c) Erklären Sie den Unterschied zwischen den Lieferbedingungen „frei Haus“ und „ab Werk“.',
        questionVi: 'Nhà hàng muốn đặt mua một lò hấp nướng đa năng (Kombidämpfer) và thực phẩm tươi.\n' +
          'a) Giải thích 2 cách thức hình thành hợp đồng mua bán (Kaufvertrag) thông qua 2 tuyên bố ý chí thống nhất (Antrag & Annahme).\n' +
          'b) Phân biệt „Anfrage“ với „Angebot“ và nêu 2 điều khoản miễn trừ ràng buộc (Freizeichnungsklauseln).\n' +
          'c) Giải thích sự khác nhau giữa điều kiện giao hàng „frei Haus“ và „ab Werk“.',
        placeholderDe: 'a) Weg 1: Angebot -> Bestellung...\nb) Anfrage vs. Angebot + Freizeichnungsklauseln...\nc) frei Haus vs. ab Werk...',
        hintDe: 'a) Verbindliches Angebot + Bestellung ODER Bestellung + Auftragsbestätigung/Lieferung. b) Anfrage = unverbindlich; Klauseln: „freibleibend“, „solange der Vorrat reicht“.',
        hintVi: 'a) Chào hàng ràng buộc + Đặt hàng HOẶC Đặt hàng + Xác nhận đơn hàng/Giao hàng. b) Anfrage không ràng buộc; Freizeichnungsklauseln: „freibleibend“, „solange der Vorrat reicht“.',
        keywords: [
          { term: 'Willenserklärungen', points: 1.5, vi: 'Hai tuyên bố ý chí thống nhất: Antrag và Annahme', alt: ['Antrag und Annahme', 'übereinstimmende'] },
          { term: 'Auftragsbestätigung', points: 1.5, vi: 'Đặt hàng (Bestellung) + Xác nhận đơn hàng (Auftragsbestätigung) hoặc giao hàng', alt: ['Bestellung'] },
          { term: 'unverbindlich', points: 1.5, vi: 'Anfrage là hỏi giá không ràng buộc pháp lý (rechtlich unverbindlich)', alt: ['Anfrage'] },
          { term: 'freibleibend', points: 1.5, vi: 'Điều khoản miễn trừ: freibleibend, unverbindlich, solange der Vorrat reicht, Preis vorbehalten', alt: ['solange der Vorrat reicht', 'Freizeichnungsklausel'] },
          { term: 'frei Haus', points: 2, vi: 'frei Haus: Người bán chịu mọi chi phí vận chuyển đến tận cửa nhà hàng', alt: ['Verkäufer trägt Transportkosten', 'Lieferant zahlt'] },
          { term: 'ab Werk', points: 2, vi: 'ab Werk / ab Lager: Người mua chịu toàn bộ chi phí vận chuyển từ xưởng/kho người bán', alt: ['Käufer trägt Transportkosten', 'ab Lager'] }
        ],
        musterloesungDe:
          'a) Zustandekommen des Kaufvertrags (2 Wege durch Antrag & Annahme):\n' +
          '-Weg 1: Verbindliches Angebot des Verkäufers (Antrag) + rechtzeitige Bestellung des Käufers ohne Änderung (Annahme).\n' +
          '-Weg 2: Bestellung des Käufers ohne vorheriges verbindliches Angebot (Antrag) + Auftragsbestätigung oder direkte Lieferung durch den Verkäufer (Annahme).\n\n' +
          'b) Anfrage vs. Angebot & Freizeichnungsklauseln:\n' +
          '-Eine Anfrage ist rechtlich unverbindlich und fordert den Lieferanten lediglich zur Abgabe eines Angebots auf.\n' +
          '-Ein Angebot ist grundsätzlich rechtlich verbindlich, sofern es nicht durch Freizeichnungsklauseln eingeschränkt wird, z. B. „Angebot freibleibend“, „solange der Vorrat reicht“ oder „Preisänderungen vorbehalten“.\n\n' +
          'c) Lieferbedingungen:\n' +
          '-„frei Haus“: Der Verkäufer trägt sämtliche Verpackungs- und Transportkosten bis zum Betrieb des Käufers.\n' +
          '-„ab Werk“ (bzw. „ab Lager“): Der Käufer trägt alle Transport- und Versandkosten ab dem Werk/Lager des Verkäufers.',
        musterloesungVi:
          'a) 2 cách hình thành Kaufvertrag: Cách 1: Angebot ràng buộc (Antrag) + Bestellung đúng hạn (Annahme); Cách 2: Bestellung của người mua (Antrag) + Auftragsbestätigung hoặc giao hàng của người bán (Annahme).\n' +
          'b) Anfrage hoàn toàn không ràng buộc pháp lý; Angebot có tính ràng buộc trừ khi kèm Freizeichnungsklauseln như „freibleibend“, „solange der Vorrat reicht“.\n' +
          'c) „frei Haus“: Nhà cung cấp chịu 100% phí vận chuyển đến tận nhà hàng; „ab Werk“: Người mua phải trả toàn bộ phí vận chuyển từ kho người bán.',
        explanation: {
          whyCorrect: 'Trình bày chính xác kiến thức trọng tâm trong KA2 LF2 và đề thi IHK về Kaufvertrag.',
          whyWrong: 'Nhầm lẫn rằng chỉ cần gửi Anfrage và nhận Angebot là đã có hợp đồng.',
          keyTakeaway: 'Khi tính Angebotsvergleich trong đề IHK: nếu nhà cung cấp ghi „ab Lager / + Fracht“, phải cộng thêm phí vận chuyển vào giá mua!'
        }
      },
      {
        id: 'lf2-q4',
        no: 4,
        lf: 'lf2',
        fach: 'bfk1',
        category: 'recht',
        points: 10,
        title: 'Schlechtleistung (Mängelrüge) & Lieferverzug (§ 286 BGB)',
        questionDe: 'Im Einkauf kommt es zu zwei Vertragsstörungen:\n' +
          'Fall 1 (Schlechtleistung): Bei der Lieferung von 20 kg Erdbeeren sind 5 kg bereits verschimmelt.\n' +
          'a) Um welche Mängelart nach Sichtbarkeit handelt es sich und innerhalb welcher Frist muss dieser Mangel beim B2B-Handelskauf gerügt werden?\n' +
          'b) Nennen Sie die vorrangigen Rechte (Stufe 1) und die nachrangigen Rechte (Stufe 2) des Käufers bei Mängeln.\n' +
          'Fall 2 (Lieferverzug): Die Hochzeitstorte für Samstag, den 15.06. um 14:00 Uhr, wird nicht geliefert.\n' +
          'c) Warum ist hier keine Mahnung nötig und welche Rechte hat das Restaurant?',
        questionVi: 'Trong khâu mua hàng xảy ra 2 sự cố vi phạm hợp đồng:\n' +
          'Trường hợp 1 (Schlechtleistung): Khi giao 20 kg dâu tây thì có 5 kg đã bị mốc.\n' +
          'a) Đây là loại lỗi nào xét theo khả năng nhận biết và thời hạn khiếu nại (Rügefrist) trong giao dịch thương mại B2B là bao lâu?\n' +
          'b) Nêu các quyền ưu tiên bậc 1 (Stufe 1) và quyền thứ cấp bậc 2 (Stufe 2) của người mua khi hàng lỗi.\n' +
          'Trường hợp 2 (Lieferverzug): Bánh cưới đặt cho Thứ Bảy 15.06 lúc 14:00 không được giao.\n' +
          'c) Tại sao trường hợp này không cần gửi thư nhắc (Mahnung) và nhà hàng có những quyền gì?',
        placeholderDe: 'a) Offener Mangel -> Rügefrist: ...\nb) Stufe 1 (Nacherfüllung): ... / Stufe 2: ...\nc) Fixkauf/Zweckkauf -> Rechte bei Lieferverzug: ...',
        hintDe: 'a) Offener Mangel -> unverzüglich (§ 377 HGB). b) Stufe 1: Ersatzlieferung/Nachbesserung; Stufe 2: Minderung, Rücktritt, Schadensersatz. c) Fixkauf / Zweckkauf.',
        hintVi: 'a) Lỗi nhìn thấy ngay (Offener Mangel) → khiếu nại ngay lập tức (unverzüglich). b) Bậc 1: Nacherfüllung (Đổi hàng mới/Sửa chữa); Bậc 2: Giảm giá, Hủy HĐ, Bồi thường. c) Fixkauf / Zweckkauf.',
        keywords: [
          { term: 'Offener Mangel', points: 1.5, vi: 'Lỗi nhìn thấy ngay khi kiểm hàng (Offener Mangel) & Sachmangel (Qualitätsmangel)', alt: ['offener', 'Qualitätsmangel'] },
          { term: 'unverzüglich', points: 1.5, vi: 'Phải kiểm tra và khiếu nại ngay lập tức (unverzüglich rügen, § 377 HGB)', alt: ['sofort', 'ohne schuldhaftes Zögern'] },
          { term: 'Nacherfüllung', points: 2, vi: 'Quyền bậc 1 (vorrangig): Nacherfüllung gồm Ersatzlieferung (giao hàng mới) hoặc Nachbesserung', alt: ['Ersatzlieferung', 'Nachbesserung'] },
          { term: 'Minderung', points: 1.5, vi: 'Quyền bậc 2 (nachrangig): Minderung (giảm giá), Rücktritt (hủy HĐ), Schadensersatz', alt: ['Rücktritt', 'Schadensersatz'] },
          { term: 'Fixkauf', points: 2, vi: 'Đây là Fixkauf / Zweckkauf (ngày giờ cố định theo lịch) nên không cần Mahnung', alt: ['Zweckkauf', 'Kalender', 'keine Mahnung'] },
          { term: 'Deckungskauf', points: 1.5, vi: 'Nhà hàng có quyền Rücktritt ngay và đòi Schadensersatz (chi phí mua bù Deckungskauf)', alt: ['Rücktritt vom Vertrag', 'Schadensersatz statt der Leistung'] }
        ],
        musterloesungDe:
          'a) Mängelart & Rügefrist:\n' +
          'Es handelt sich um einen offenen Sachmangel (Qualitätsmangel), da der Schimmel bei der Wareneingangskontrolle sofort erkennbar ist. Beim zweiseitigen Handelskauf (B2B, § 377 HGB) muss die Ware unverzüglich geprüft und der Mangel unverzüglich (sofort) gerügt werden.\n\n' +
          'b) Rechte bei Schlechtleistung:\n' +
          '-Stufe 1 (vorrangige Rechte): Recht auf Nacherfüllung (Ersatzlieferung mangelfreier Erdbeeren oder Nachbesserung).\n' +
          '-Stufe 2 (nachrangige Rechte, erst wenn Nacherfüllung fehlschlägt oder unzumutbar ist): Kaufpreisminderung, Rücktritt vom Vertrag und/oder Schadensersatz.\n\n' +
          'c) Lieferverzug bei der Hochzeitstorte:\n' +
          'Es liegt ein Fixkauf bzw. Zweckkauf vor (Liefertermin ist exakt nach dem Kalender bestimmt und nach der Hochzeit sinnlos). Daher tritt der Verzug ohne Mahnung sofort ein. Das Restaurant kann sofort vom Vertrag zurücktreten und Schadensersatz statt der Leistung (z. B. Mehrkosten für einen Deckungskauf bei einer anderen Konditorei) verlangen, sofern den Lieferanten ein Verschulden trifft.',
        musterloesungVi:
          'a) Đây là Offener Mangel (lỗi chất lượng thấy ngay). Trong giao dịch B2B (§ 377 HGB) phải kiểm tra và khiếu nại ngay lập tức (unverzüglich).\n' +
          'b) Quyền bậc 1 (Ưu tiên): Nacherfüllung (Ersatzlieferung – đổi dâu mới hoặc Nachbesserung). Quyền bậc 2 (Thứ cấp): Minderung (giảm giá), Rücktritt (rút khỏi HĐ), Schadensersatz (bồi thường thiệt hại).\n' +
          'c) Bánh cưới vào ngày giờ cố định là Fixkauf/Zweckkauf nên tự động rơi vào Lieferverzug mà không cần Mahnung. Nhà hàng có quyền hủy hợp đồng ngay và đòi bồi thường chi phí mua thay thế (Deckungskauf).',
        explanation: {
          whyCorrect: 'Phân biệt rõ thứ tự ưu tiên Stufe 1 → Stufe 2 trong Schlechtleistung và điều kiện miễn Mahnung trong Fixkauf (KA2 LF2).',
          whyWrong: 'Đòi giảm giá hoặc hủy hợp đồng ngay ở bước đầu tiên mà chưa cho nhà cung cấp cơ hội Nacherfüllung (trừ trường hợp Fixkauf).',
          keyTakeaway: 'Quy tắc vàng BGB: Luôn ưu tiên Stufe 1 (Nacherfüllung) trước Stufe 2 (Minderung / Rücktritt / Schadensersatz). Riêng Fixkauf quá hạn → hủy ngay không cần Mahnung!'
        }
      }
    ],

    /* ========================================================================
       LF 3: IN DER KÜCHE ARBEITEN (HYGIENE, ERNÄHRUNG, EIER, KARTOFFELN & RECHNEN)
       ======================================================================== */
    lf3: [
      {
        id: 'lf3-q1',
        no: 1,
        lf: 'lf3',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Die 3 Säulen der Küchenhygiene & Farbcodierung gegen Kreuzkontamination',
        questionDe: 'Hygiene ist das oberste Gebot in der Gastronomie.\n' +
          'a) Nennen Sie die drei Hygienebereiche in einem Gastronomiebetrieb und geben Sie zu jedem Bereich jeweils drei konkrete Hygienemaßnahmen an.\n' +
          'b) Erklären Sie den Begriff „Kreuzkontamination“ und ordnen Sie den Schneidebrettfarben Rot, Blau, Gelb, Grün, Braun und Weiß die richtigen Lebensmittelgruppen zu.',
        questionVi: 'Vệ sinh là nguyên tắc tối thượng trong ngành ẩm thực.\n' +
          'a) Nêu 3 lĩnh vực vệ sinh trong nhà hàng và đưa ra 3 biện pháp cụ thể cho mỗi lĩnh vực.\n' +
          'b) Giải thích thuật ngữ „Kreuzkontamination“ (nhiễm chéo) và ghép các màu thớt Đỏ, Xanh dương, Vàng, Xanh lá, Nâu và Trắng với đúng nhóm thực phẩm.',
        placeholderDe: 'a) 1. Personalhygiene (3 Regeln)... 2. Betriebshygiene... 3. Produkthygiene...\nb) Kreuzkontamination + 6 Schneidebrettfarben...',
        hintDe: 'a) Personal-, Betriebs-, Produkthygiene. b) Rot=Fleisch, Blau=Fisch, Gelb=Geflügel, Grün=Gemüse/Obst, Braun=Gegartes/Wurst, Weiß=Backwaren/Käse.',
        hintVi: 'a) Vệ sinh cá nhân, Vệ sinh cơ sở, Vệ sinh thực phẩm. b) Đỏ=Thịt đỏ, Xanh dương=Cá, Vàng=Gia cầm, Xanh lá=Rau quả, Nâu=Đồ chín, Trắng=Bánh mì/Phô mai.',
        keywords: [
          { term: 'Personalhygiene', points: 1.5, vi: 'Personalhygiene: Rửa/sát khuẩn tay, đồng phục sạch, tháo trang sức, buộc tóc, băng vết thương chống nước', alt: ['Händewaschen', 'Schmuck ablegen'] },
          { term: 'Betriebshygiene', points: 1.5, vi: 'Betriebshygiene: Reinigungs- & Desinfektionsplan, tách khu bẩn/sạch, chống côn trùng', alt: ['Reinigungsplan', 'Schädlingsbekämpfung'] },
          { term: 'Produkthygiene', points: 1.5, vi: 'Produkthygiene: Giữ chuỗi lạnh, nấu chín ≥72 °C, tách thực phẩm sống và chín', alt: ['Kühlkette', '72 °C'] },
          { term: 'Kreuzkontamination', points: 1.5, vi: 'Kreuzkontamination: Truyền vi khuẩn từ thực phẩm này sang thực phẩm khác trực tiếp hoặc qua dao/thớt/tay', alt: ['Übertragung von Keimen', 'Mikroorganismen'] },
          { term: 'Gelb', points: 1.5, vi: 'Gelb = Rohes Geflügel (Gia cầm sống), Rot = Rohes Fleisch (Thịt đỏ), Blau = Fisch (Cá)', alt: ['Geflügel', 'Blau'] },
          { term: 'Grün', points: 1.5, vi: 'Grün = Gemüse/Obst/Salat, Braun = Gegartes Fleisch, Weiß = Backwaren/Milchprodukte', alt: ['Gemüse', 'Weiß'] },
          { term: 'Salmonellen', points: 1, vi: 'Ngăn ngừa vi khuẩn gây bệnh như Salmonellen, Campylobacter', alt: ['Campylobacter', 'Listerien'] }
        ],
        musterloesungDe:
          'a) Die drei Hygienebereiche mit je drei Maßnahmen:\n' +
          '1. Personalhygiene: Regelmäßiges Händewaschen und Desinfizieren; saubere Arbeitskleidung und Kopfbedeckung tragen; keinen Handschmuck/Uhren tragen und Wunden wasserdicht (blaues Pflaster/Fingerling) abdecken; Meldepflicht nach § 43 IfSG.\n' +
          '2. Betriebshygiene: Einhaltung des Reinigungs- und Desinfektionsplans; strikte Trennung von reiner und unreiner Seite (Schwarz-Weiß-Trennung); Fliegengitter und Schädlingsmonitoring.\n' +
          '3. Produkthygiene: Einhaltung der Kühlkette und Lagertemperaturen; getrennte Lagerung/Verarbeitung von rohen und gegarten Lebensmitteln; Erhitzen auf mindestens +72 °C Kerntemperatur.\n\n' +
          'b) Kreuzkontamination & Schneidebrettfarben:\n' +
          'Kreuzkontamination ist die direkte oder indirekte Übertragung von Krankheitserregern (z. B. Salmonellen) von einem rohen Lebensmittel auf ein anderes Lebensmittel über Hände, Messer oder Schneidebretter.\n' +
          'Farbcodierung: Rot = Rohes Fleisch (Rind/Schwein/Lamm) | Gelb = Rohes Geflügel | Blau = Roher Fisch & Meeresfrüchte | Grün = Obst, Gemüse, Kräuter & Salat | Braun = Gegartes Fleisch & Wurstwaren | Weiß = Brot, Backwaren & Käse.',
        musterloesungVi:
          'a) 3 trụ cột vệ sinh:\n' +
          '-Personalhygiene: Rửa & sát khuẩn tay, mặc đồ bếp sạch & đội mũ, tháo nhẫn/đồng hồ, dán băng cá nhân màu xanh chống nước khi đứt tay.\n' +
          '-Betriebshygiene: Tuân thủ lịch vệ sinh & khử trùng, tách khu bẩn/khu sạch, lắp lưới chống côn trùng.\n' +
          '-Produkthygiene: Giữ chuỗi lạnh, tách biệt đồ sống và chín, nấu đạt nhiệt độ tâm ≥ +72 °C.\n' +
          'b) Kreuzkontamination là sự lây nhiễm chéo vi khuẩn giữa các thực phẩm qua tay, dao, thớt. Mã màu thớt: Đỏ = Thịt đỏ sống | Vàng = Gia cầm sống | Xanh dương = Cá/hải sản | Xanh lá = Rau củ quả | Nâu = Thịt chín/xúc xích | Trắng = Bánh mì/Phô mai.',
        explanation: {
          whyCorrect: 'Đây là câu hỏi kinh điển xuất hiện trong đề IHK Winter 2023/24, Sommer 2024 và Winter 2024/25.',
          whyWrong: 'Nhầm lẫn giữa Betriebshygiene (không gian, thiết bị) và Produkthygiene (bản thân nguyên liệu thực phẩm).',
          keyTakeaway: 'Nhớ bộ 3 P-B-P (Personal - Betrieb - Produkt) và 6 màu thớt chuẩn HACCP!'
        }
      },
      {
        id: 'lf3-q2',
        no: 2,
        lf: 'lf3',
        fach: 'bfk1',
        category: 'rechnen',
        points: 10,
        title: 'Nährwertberechnung (Brennwert in kJ) & Energiebedarf (GU / PAL)',
        questionDe: 'Auf der Speisekarte steht eine Portion „Apfelstrudel mit Vanillesauce“.\n' +
          'Die Portion enthält: 10 g Eiweiß (Proteine), 14 g Fett und 63 g Kohlenhydrate.\n' +
          'a) Nennen Sie die physiologischen Brennwerte (in kJ pro 1 g) für Kohlenhydrate, Eiweiß und Fett.\n' +
          'b) Berechnen Sie den gesamten Energiegehalt (Brennwert in kJ) dieser Portion Apfelstrudel mit vollständigem Rechenweg.\n' +
          'c) Erklären Sie kurz den Unterschied zwischen Grundumsatz (GU) und Leistungsumsatz (LU) sowie die Formel mit dem PAL-Wert.',
        questionVi: 'Trên thực đơn có một khẩu phần „Apfelstrudel mit Vanillesauce“.\n' +
          'Khẩu phần này chứa: 10 g chất đạm (Eiweiß), 14 g chất béo (Fett) và 63 g tinh bột/đường (Kohlenhydrate).\n' +
          'a) Nêu giá trị năng lượng sinh học (tính bằng kJ trên 1 g) của Kohlenhydrate, Eiweiß và Fett.\n' +
          'b) Tính tổng năng lượng (kJ) của khẩu phần Apfelstrudel này (ghi rõ phép tính).\n' +
          'c) Giải thích ngắn gọn sự khác nhau giữa Grundumsatz (GU) và Leistungsumsatz (LU) cùng công thức với hệ số PAL.',
        placeholderDe: 'a) 1 g KH = ... kJ, 1 g EW = ... kJ, 1 g Fett = ... kJ\nb) Rechnung Apfelstrudel: ...\nc) GU vs. LU & Gesamtenergiebedarf = ...',
        hintDe: 'a) 17 kJ / 17 kJ / 37 kJ. b) (10 × 17) + (14 × 37) + (63 × 17). c) Gesamtenergiebedarf = GU × PAL.',
        hintVi: 'a) 17 kJ / 17 kJ / 37 kJ. b) (10 × 17) + (14 × 37) + (63 × 17). c) Tổng năng lượng = GU × PAL.',
        keywords: [
          { term: '17 kJ', points: 1.5, vi: '1 g Kohlenhydrate = 17 kJ (4 kcal) và 1 g Eiweiß = 17 kJ (4 kcal)', alt: ['17kJ'] },
          { term: '37 kJ', points: 1.5, vi: '1 g Fett = 37 kJ (9 kcal)', alt: ['37kJ'] },
          { term: '170 kJ', points: 1, vi: 'Eiweiß: 10 g × 17 kJ = 170 kJ', alt: ['10 * 17 = 170'] },
          { term: '518 kJ', points: 1, vi: 'Fett: 14 g × 37 kJ = 518 kJ', alt: ['14 * 37 = 518'] },
          { term: '1071 kJ', points: 1, vi: 'Kohlenhydrate: 63 g × 17 kJ = 1.071 kJ', alt: ['1.071 kJ', '63 * 17'] },
          { term: '1759 kJ', points: 2, vi: 'Tổng năng lượng: 170 + 518 + 1.071 = 1.759 kJ', alt: ['1.759 kJ', '1759'] },
          { term: 'Grundumsatz', points: 1, vi: 'Grundumsatz (GU): Năng lượng duy trì sự sống ở trạng thái nghỉ hoàn toàn (20 °C, bụng đói)', alt: ['völliger Ruhe'] },
          { term: 'PAL', points: 1, vi: 'Gesamtenergiebedarf = Grundumsatz (GU) × PAL (Physical Activity Level)', alt: ['Leistungsumsatz'] }
        ],
        musterloesungDe:
          'a) Physiologische Brennwerte pro 1 Gramm:\n' +
          '-1 g Kohlenhydrate = 17 kJ (ca. 4 kcal)\n' +
          '-1 g Eiweiß (Protein) = 17 kJ (ca. 4 kcal)\n' +
          '-1 g Fett = 37 kJ (ca. 9 kcal)\n\n' +
          'b) Berechnung des Brennwerts für 1 Portion Apfelstrudel:\n' +
          '-Eiweiß: 10 g × 17 kJ/g = 170 kJ\n' +
          '-Fett: 14 g × 37 kJ/g = 518 kJ\n' +
          '-Kohlenhydrate: 63 g × 17 kJ/g = 1.071 kJ\n' +
          '-Gesamtbrennwert: 170 kJ + 518 kJ + 1.071 kJ = 1.759 kJ.\n\n' +
          'c) Grundumsatz, Leistungsumsatz & PAL-Formel:\n' +
          '-Grundumsatz (GU): Energiemenge, die der Körper bei völliger Ruhe, nüchtern und bei 20 °C Umgebungstemperatur innerhalb von 24 Stunden zur Aufrechterhaltung der Körperfunktionen (Herzschlag, Atmung, Körpertemperatur) benötigt.\n' +
          '-Leistungsumsatz (LU): Zusätzliche Energie für körperliche und geistige Arbeit.\n' +
          '-Formel: Gesamtenergiebedarf = Grundumsatz (GU) × PAL-Faktor (Physical Activity Level).',
        musterloesungVi:
          'a) Giá trị năng lượng trên 1 g: Kohlenhydrate = 17 kJ; Eiweiß = 17 kJ; Fett = 37 kJ.\n' +
          'b) Tính năng lượng khẩu phần Apfelstrudel:\n' +
          '-Đạm: 10 g × 17 kJ = 170 kJ\n' +
          '-Béo: 14 g × 37 kJ = 518 kJ\n' +
          '-Tinh bột: 63 g × 17 kJ = 1.071 kJ\n' +
          '→ Tổng cộng = 170 + 518 + 1.071 = 1.759 kJ.\n' +
          'c) Grundumsatz (GU) là năng lượng cơ bản duy trì sự sống khi nghỉ ngơi hoàn toàn; Leistungsumsatz (LU) là năng lượng cho vận động. Công thức: Gesamtenergiebedarf = GU × PAL.',
        explanation: {
          whyCorrect: 'Đây chính là bài toán thực tế trong Klassenarbeit Nr. 2 (LF2/LF3).',
          whyWrong: 'Nhầm hệ số của Fett (37 kJ) với Kohlenhydrate/Eiweiß (17 kJ).',
          keyTakeaway: 'Nhớ bộ số vàng 17 – 17 – 37 kJ (tương ứng 4 – 4 – 9 kcal) và công thức Gesamtenergiebedarf = GU × PAL.'
        }
      },
      {
        id: 'lf3-q3',
        no: 3,
        lf: 'lf3',
        fach: 'bfk1',
        category: 'warenkunde',
        points: 10,
        title: 'Biologische Wertigkeit (BW) & Ergänzungswert von Proteinen',
        questionDe: 'Ein Gast, der viel Sport treibt, fragt nach einer besonders hochwertigen Eiweißkombination.\n' +
          'a) Definieren Sie den Begriff „Biologische Wertigkeit“ (BW) und nennen Sie das Referenzlebensmittel mit dem Wert 100.\n' +
          'b) Warum haben tierische Lebensmittel meist eine höhere BW als pflanzliche Lebensmittel?\n' +
          'c) Erklären Sie den „Ergänzungswert“ und nennen Sie drei klassische Lebensmittelkombinationen mit einer Biologischen Wertigkeit über 100.',
        questionVi: 'Một vị khách tập thể thao hỏi về sự kết hợp chất đạm có giá trị sinh học cao.\n' +
          'a) Định nghĩa thuật ngữ „Biologische Wertigkeit“ (BW) và nêu thực phẩm chuẩn có giá trị 100.\n' +
          'b) Tại sao thực phẩm động vật thường có BW cao hơn thực phẩm thực vật?\n' +
          'c) Giải thích „Ergänzungswert“ (giá trị bổ trợ) và nêu 3 sự kết hợp món ăn kinh điển đạt BW trên 100.',
        placeholderDe: 'a) Definition BW + Referenzwert 100 = ...\nb) Tierisch vs. pflanzlich: ...\nc) Ergänzungswert + 3 Kombinationen: ...',
        hintDe: 'a) Wie viel g Körpereiweiß aus 100 g Nahrungseiweiß gebildet werden; Vollei = 100. c) Kartoffeln + Ei (136), Milch + Weizen, Bohnen + Mais.',
        hintVi: 'a) Số gam protein cơ thể tạo ra từ 100 g protein thực phẩm; Trứng gà nguyên quả (Vollei) = 100. c) Khoai tây + Trứng (136), Sữa + Lúa mì, Đậu + Ngô.',
        keywords: [
          { term: 'Körpereiweiß', points: 2, vi: 'Cho biết bao nhiêu gam protein cơ thể được tạo thành từ 100 g protein thực phẩm', alt: ['100 g Nahrungseiweiß', 'körpereigenes Eiweiß'] },
          { term: 'Vollei', points: 1.5, vi: 'Thực phẩm tham chiếu chuẩn: Hühnerei / Vollei = 100', alt: ['Hühnerei', 'Referenzwert 100'] },
          { term: 'essenzielle Aminosäuren', points: 2, vi: 'Đạm động vật có cấu trúc axit amin thiết yếu (essenzielle Aminosäuren) giống cơ thể người hơn', alt: ['unentbehrliche Aminosäuren', 'Aminosäurenprofil'] },
          { term: 'Ergänzungswert', points: 2, vi: 'Ergänzungswert: Kết hợp đạm động vật và thực vật giúp bù đắp axit amin giới hạn (limitierende Aminosäure)', alt: ['ergänzen sich', 'limitierende Aminosäure'] },
          { term: 'Kartoffeln und Ei', points: 2.5, vi: '3 cặp kinh điển: Kartoffeln + Ei (BW 136), Milch + Getreide/Mehl (Milchreis/Pfannkuchen), Hülsenfrüchte/Bohnen + Mais', alt: ['Kartoffel', 'Milchreis', 'Bohnen und Mais'] }
        ],
        musterloesungDe:
          'a) Definition & Referenzwert:\n' +
          'Die Biologische Wertigkeit (BW) gibt an, wie viel Gramm körpereigenes Eiweiß aus 100 Gramm Nahrungseiweiß aufgebaut werden können. Als Referenzlebensmittel dient das Hühner-Vollei mit einer BW von 100.\n\n' +
          'b) Tierisches vs. pflanzliches Eiweiß:\n' +
          'Tierische Proteine besitzen eine Aminosäurenzusammensetzung (insbesondere der 8 essenziellen/unentbehrlichen Aminosäuren), die dem menschlichen Körpereiweiß ähnlicher ist als pflanzliche Proteine.\n\n' +
          'c) Ergänzungswert & drei Kombinationen:\n' +
          'Kombiniert man verschiedene (tierische und pflanzliche) Eiweißquellen geschickt miteinander, gleichen sie ihre jeweiligen fehlenden (limitierenden) Aminosäuren gegenseitig aus, sodass die Gesamt-BW auf über 100 steigt:\n' +
          '1. Kartoffeln + Vollei (z. B. Bratkartoffeln mit Spiegelei → BW 136, höchste Kombination!)\n' +
          '2. Milch/Käse + Weizenmehl/Getreide (z. B. Pfannkuchen, Milchreis, Käsebrot)\n' +
          '3. Hülsenfrüchte (Bohnen) + Mais oder Reis (z. B. Chili sin/con Carne mit Mais, Linsen mit Reis).',
        musterloesungVi:
          'a) Biologische Wertigkeit (BW) cho biết bao nhiêu gam protein cơ thể được tổng hợp từ 100 g protein thức ăn. Chuẩn tham chiếu là trứng gà (Vollei) = 100.\n' +
          'b) Đạm động vật có tỷ lệ các axit amin thiết yếu (essenzielle Aminosäuren) gần giống cơ thể người hơn đạm thực vật.\n' +
          'c) Ergänzungswert là sự bù trừ các axit amin thiếu hụt khi kết hợp nhiều nguồn đạm. 3 cặp tiêu biểu: 1. Khoai tây + Trứng (BW 136 – cao nhất); 2. Sữa/Phô mai + Lúa mì/Gạo (Bánh kếp, Cơm sữa); 3. Đậu + Ngô/Gạo.',
        explanation: {
          whyCorrect: 'Giải thích trọn vẹn câu hỏi trọng tâm trong KA2 LF3 về Biologische Wertigkeit.',
          whyWrong: 'Nghĩ rằng BW = 100 có nghĩa là 100% đạm ăn vào biến thành cơ bắp (thực chất 100 chỉ là mốc quy chiếu của trứng gà).',
          keyTakeaway: 'Đỉnh cao BW là Kartoffeln + Ei = 136. Công thức: BW = (Aufgebautes Körpereiweiß ÷ Aufgenommenes Nahrungseiweiß) × 100.'
        }
      },
      {
        id: 'lf3-q4',
        no: 4,
        lf: 'lf3',
        fach: 'bfk1',
        category: 'warenkunde',
        points: 10,
        title: 'Eierkunde: Erzeugercode, Frischetests, Rührei/Omelett & Salmonellenschutz',
        questionDe: 'Auf einem Hühnerei ist der Stempel „0-DE-0356811“ aufgedruckt.\n' +
          'a) Entschlüsseln Sie alle Bestandteile dieses Erzeugercodes und nennen Sie alle vier Haltungsformen (0 bis 3).\n' +
          'b) Beschreiben Sie zwei Methoden zur Frischeprüfung von Eiern (Schwimmtest & Aufschlagprobe).\n' +
          'c) Beschreiben Sie die fachgerechte Zubereitung eines Omeletts in 6 Schritten und nennen Sie drei Regeln zum Schutz vor Salmonellen.',
        questionVi: 'Trên quả trứng gà có đóng dấu „0-DE-0356811“.\n' +
          'a) Giải mã tất cả thành phần của mã này và nêu đủ 4 hình thức chăn nuôi (từ 0 đến 3).\n' +
          'b) Mô tả 2 phương pháp kiểm tra độ tươi của trứng (thử nước muối & đập trứng ra đĩa).\n' +
          'c) Trình bày quy trình làm món Omelett chuẩn trong 6 bước và nêu 3 quy tắc phòng chống vi khuẩn Salmonellen.',
        placeholderDe: 'a) 0 = ..., DE = ..., 03 = ...\nb) Schwimmtest & Aufschlagprobe...\nc) Omelett (6 Schritte) + 3 Regeln Salmonellenschutz...',
        hintDe: 'a) 0=Bio, 1=Freiland, 2=Boden, 3=Kleingruppe; DE=Deutschland; 03=Niedersachsen. b) Frisches Ei sinkt zu Boden. c) Erhitzen auf mind. +72 °C.',
        hintVi: 'a) 0=Bio, 1=Freiland, 2=Boden, 3=Kleingruppe; DE=Đức; 03=Niedersachsen. b) Trứng tươi chìm phẳng dưới đáy. c) Gia nhiệt tối thiểu +72 °C.',
        keywords: [
          { term: 'Ökologische Erzeugung', points: 1.5, vi: '0 = Ökologische Erzeugung (Bio), 1 = Freilandhaltung, 2 = Bodenhaltung, 3 = Kleingruppenhaltung', alt: ['Freilandhaltung', 'Bodenhaltung', 'Kleingruppenhaltung'] },
          { term: 'Herkunftsland', points: 1, vi: 'DE = Herkunftsland Deutschland; 2 số đầu (03) = Bundesland, tiếp theo là Betriebs- & Stallnummer', alt: ['Bundesland', 'Stallnummer'] },
          { term: 'Luftkammer', points: 1.5, vi: 'Schwimmtest: Trứng tươi chìm nằm ngang dưới đáy; trứng cũ nổi lên vì buồng khí (Luftkammer) lớn dần', alt: ['Schwimmtest', 'sinkt zu Boden'] },
          { term: 'Aufschlagprobe', points: 1.5, vi: 'Aufschlagprobe: Lòng đỏ vồng cao tròn trịa, lòng trắng đặc bao quanh gọn gàng', alt: ['Dotter hochgewölbt', 'dickflüssiges Eiklar'] },
          { term: 'verquirlen', points: 2, vi: 'Omelett: Đập trứng vào bát riêng, đánh tan với gia vị (verquirlen), đổ vào chảo bơ nóng, đẩy từ ngoài vào trong, cuộn nửa vầng trăng (baveuse)', alt: ['Halbmond', 'baveuse', 'Butter'] },
          { term: '72 °C', points: 2.5, vi: 'Salmonellenschutz: Bảo quản lạnh ≤ +7 °C, gia nhiệt tâm ≥ +72 °C (10 phút), bỏ bao bì giấy carton trước khi vào bếp, rửa tay & dụng cụ ngay', alt: ['+7 °C', 'Kühlkette', 'Eierpappe'] }
        ],
        musterloesungDe:
          'a) Entschlüsselung des Eiercodes „0-DE-0356811“:\n' +
          '-Erste Ziffer = Haltungsform: 0 = Ökologische Erzeugung (Bio), 1 = Freilandhaltung, 2 = Bodenhaltung, 3 = Kleingruppenhaltung (Käfig).\n' +
          '-DE = Herkunftsland (Deutschland).\n' +
          '-0356811 = Betriebsnummer (die ersten zwei Ziffern „03“ stehen für das Bundesland Niedersachsen, danach folgen Legehennenbetrieb und letzte Ziffer = Stallnummer).\n\n' +
          'b) Frischetests:\n' +
          '-Schwimmtest (10%ige Salzlösung): Ein ganz frisches Ei bleibt waagerecht am Boden liegen (kleine Luftkammer). Ein älteres Ei richtet sich auf oder schwimmt oben, da Wasser verdunstet und die Luftkammer größer wird.\n' +
          '-Aufschlagprobe: Frisches Ei hat einen hochgewölbten Dotter und ein festes, dickflüssiges Eiklar ringförmig darum; altes Ei hat einen flachen Dotter und breit verlaufendes, wässriges Eiklar.\n\n' +
          'c) Omelett in 6 Schritten & Salmonellenschutz:\n' +
          '1. Eier einzeln aufschlagen, in eine Schüssel geben, würzen und mit einer Gabel verquirlen (nicht schaumig schlagen).\n' +
          '2. Butter in einer beschichteten Pfanne bei mittlerer Hitze schmelzen.\n' +
          '3. Eiermasse hineingeben und vom Rand zur Mitte schieben, damit flüssiges Ei nachläuft.\n' +
          '4. Wenn die Oberfläche noch leicht feucht-glänzend (baveuse) ist, optional füllen.\n' +
          '5. Omelett zu einem Halbmond bzw. einer Rolle zusammenklappen.\n' +
          '6. Sofort mit der Naht nach unten auf einen vorgewärmten Teller gleiten lassen.\n' +
          'Salmonellenschutz: Kühlung bei +5 bis +7 °C; Eierkartons nicht mit in die reine Küche nehmen; Speisen auf mind. +72 °C durcherhitzen; Arbeitsflächen und Hände nach Kontakt mit Rohei sofort reinigen und desinfizieren.',
        musterloesungVi:
          'a) Giải mã „0-DE-0356811“: 0 = Bio (1 = Freiland, 2 = Boden, 3 = Kleingruppe); DE = Đức; 03 = Bang Niedersachsen + mã trang trại + số chuồng.\n' +
          'b) Thử độ tươi: Schwimmtest (trứng tươi chìm ngang đáy, trứng cũ nổi vì buồng khí lớn); Aufschlagprobe (trứng tươi có lòng đỏ vồng cao, lòng trắng đặc).\n' +
          'c) 6 bước làm Omelett: Đập trứng đánh tan với muối tiêu → Đun chảy bơ trong chảo chống dính → Đổ trứng vào đẩy nhẹ từ rìa vào giữa → Khi bề mặt còn hơi sánh ẩm (baveuse) thì cho nhân → Gập hình bán nguyệt/cuộn tròn → Trượt ra đĩa nóng.\n' +
          'Chống Salmonellen: Bảo quản lạnh ≤ +7 °C, không mang khay giấy trứng vào bếp sạch, nấu chín ≥ +72 °C.',
        explanation: {
          whyCorrect: 'Kết hợp kiến thức KA2 LF3 (Eiercode + Frischetest) với câu hỏi thực hành Rührei/Omelett trong đề IHK Winter 2024/25 và Sommer 2025.',
          whyWrong: 'Đập thẳng tất cả trứng vào tô chung (nếu 1 quả hỏng sẽ làm hỏng cả mẻ) hoặc dùng lại vỏ hộp giấy đựng trứng.',
          keyTakeaway: 'Mã trứng: 0 (Bio) – 1 (Freiland) – 2 (Boden) – 3 (Kleingruppe). Luôn đập từng quả trứng ra bát nhỏ kiểm tra trước!'
        }
      },
      {
        id: 'lf3-q5',
        no: 5,
        lf: 'lf3',
        fach: 'bfk1',
        category: 'rechnen',
        points: 10,
        title: 'Mengenkalkulation mit Putz- & Garverlust sowie Angebotsvergleich',
        questionDe: 'Für ein Bankett müssen Sie den Wareneinsatz genau kalkulieren:\n' +
          'a) Obstsalat (IHK Winter 2023/24): Für 80 Personen soll Obstsalat zubereitet werden (120 g fertige Netto-Portion pro Gast). Der Putzverlust beim Schälen und Entkernen beträgt 20 %. Wie viel Kilogramm Rohware (Bruttogewicht) müssen Sie einkaufen?\n' +
          'b) Lammrücken (IHK Sommer 2024): Ein ausgelöster Lammrücken wiegt roh 1.200 g. Beim Braten entsteht ein Garverlust von 25 %. Wie viele Portionen zu je 180 g erhalten Sie daraus?\n' +
          'c) Angebotsvergleich (IHK Sommer 2025): Sie benötigen 9 kg Lammrücken. Lieferant A bietet 1 kg für 32,00 € frei Haus mit 5 % Rabatt an. Lieferant B bietet 1 kg für 29,50 € ab Lager zuzüglich 15,00 € Lieferpauschale (ohne Rabatt) an. Berechnen Sie beide Endpreise und begründen Sie Ihre Entscheidung.',
        questionVi: 'Cho một tiệc lớn, bạn phải tính toán định lượng nguyên liệu chính xác:\n' +
          'a) Salad trái cây (IHK Winter 2023/24): Cần chuẩn bị cho 80 khách (mỗi suất thành phẩm Netto = 120 g). Hao hụt sơ chế (Putzverlust) là 20 %. Hỏi phải mua bao nhiêu kg trái cây tươi (Brutto)?\n' +
          'b) Thăn cừu (IHK Sommer 2024): Khối thăn cừu tươi nặng 1.200 g. Khi áp chảo hao hụt nhiệt (Garverlust) là 25 %. Chia được bao nhiêu suất ăn mỗi suất 180 g?\n' +
          'c) So sánh báo giá (IHK Sommer 2025): Cần mua 9 kg thăn cừu. Nhà cung cấp A bán 32,00 €/kg giao tận nơi (frei Haus) kèm chiết khấu 5 %. Nhà cung cấp B bán 29,50 €/kg tại kho (ab Lager) cộng phí giao hàng 15,00 €. Tính tổng tiền 2 bên và chọn nhà cung cấp.',
        placeholderDe: 'a) Obstsalat: Netto = 80 * 120 g = ... -> Brutto (100% bei 80% Ausbeute) = ...\nb) Lammrücken: 1.200 g - 25% = ... : 180 g = ...\nc) Lieferant A vs. Lieferant B...',
        hintDe: 'a) Achtung: Rohware Brutto = 100%, Putzverlust = 20%, also Netto = 80%! (9.600 g ÷ 80 × 100). b) 1.200 g × 0,75 = 900 g ÷ 180 g. c) A: 9 × 32 × 0,95; B: (9 × 29,50) + 15.',
        hintVi: 'a) Lưu ý bẫy kinh điển: Nguyên liệu thô Brutto = 100%, hao hụt 20% → Thành phẩm Netto = 80%! (9.600 g ÷ 80 × 100). b) 1.200 g × 0,75 = 900 g ÷ 180 g. c) Tính giá sau chiết khấu và cộng phí ship.',
        keywords: [
          { term: '9.600 g', points: 1, vi: 'Tổng trọng lượng Netto Obstsalat: 80 × 120 g = 9.600 g (9,6 kg)', alt: ['9,6 kg', '9600 g'] },
          { term: '12 kg', points: 2.5, vi: 'Trọng lượng Brutto cần mua: 9,6 kg ÷ 80 × 100 = 12 kg (không phải cộng 20%!)', alt: ['12,0 kg', '12.000 g'] },
          { term: '900 g', points: 1, vi: 'Trọng lượng cừu sau khi nướng: 1.200 g - 25 % (300 g) = 900 g', alt: ['300 g'] },
          { term: '5 Portionen', points: 1.5, vi: 'Số khẩu phần cừu: 900 g ÷ 180 g = 5 Portionen', alt: ['5'] },
          { term: '273,60', points: 2, vi: 'Nhà cung cấp A: 9 kg × 32,00 € = 288,00 € - 5 % (14,40 €) = 273,60 €', alt: ['273,6 €', '288'] },
          { term: '280,50', points: 2, vi: 'Nhà cung cấp B: (9 kg × 29,50 € = 265,50 €) + 15,00 € Versand = 280,50 € → Chọn A rẻ hơn 6,90 €', alt: ['265,50', 'Lieferant A'] }
        ],
        musterloesungDe:
          'a) Berechnung Obstsalat (für 80 Personen):\n' +
          '-Benötigtes Nettogewicht (Essmenge = 80 %): 80 Personen × 120 g = 9.600 g = 9,6 kg.\n' +
          '-Rohgewicht (Brutto = 100 % bei 20 % Putzverlust): 9,6 kg ÷ 80 × 100 = 12,0 kg Rohware.\n\n' +
          'b) Berechnung Lammrücken-Portionen:\n' +
          '-Garverlust (25 % von 1.200 g): 1.200 g × 0,25 = 300 g.\n' +
          '-Fertiges Bratgewicht (75 %): 1.200 g - 300 g = 900 g.\n' +
          '-Anzahl Portionen: 900 g ÷ 180 g = 5 Portionen.\n\n' +
          'c) Angebotsvergleich für 9 kg Lammrücken:\n' +
          '-Lieferant A: 9 kg × 32,00 € = 288,00 €; abzüglich 5 % Rabatt (14,40 €) = 273,60 € (frei Haus, 0 € Versand).\n' +
          '-Lieferant B: 9 kg × 29,50 € = 265,50 €; zuzüglich 15,00 € Lieferpauschale = 280,50 €.\n' +
          '-Entscheidung: Lieferant A ist trotz höherem Kilopreis durch Rabatt und Lieferung frei Haus um 6,90 € günstiger.',
        musterloesungVi:
          'a) Salad trái cây: Trọng lượng Netto = 80 × 120 g = 9,6 kg (ứng với 80 % sau khi trừ 20 % hao hụt). Trọng lượng Brutto phải mua = 9,6 kg ÷ 80 × 100 = 12 kg.\n' +
          'b) Thăn cừu: Trọng lượng chín = 1.200 g × 75 % = 900 g → Số suất = 900 g ÷ 180 g = 5 suất.\n' +
          'c) So sánh báo giá 9 kg: Nhà cung cấp A = 9 × 32,00 € × 95 % = 273,60 € (frei Haus); Nhà cung cấp B = (9 × 29,50 €) + 15,00 € = 280,50 €. Chọn Nhà cung cấp A vì tiết kiệm được 6,90 €.',
        explanation: {
          whyCorrect: 'Tổng hợp 3 bài toán tính toán thực tế từ 3 kỳ thi IHK liên tiếp (Winter 23/24, Sommer 24, Sommer 25).',
          whyWrong: 'Lỗi sai phổ biến nhất ở câu a: Lấy 9,6 kg × 1,20 = 11,52 kg (SAI hoàn toàn vì 20% Putzverlust tính trên 100% nguyên liệu thô Brutto, không phải tính trên Netto!).',
          keyTakeaway: 'Công thức chống sai: Bruttogewicht (100%) = Nettogewicht ÷ (100 - Verlust%) × 100.'
        }
      },
      {
        id: 'lf3-q6',
        no: 6,
        lf: 'lf3',
        fach: 'bfk1',
        category: 'warenkunde',
        points: 10,
        title: 'Kartoffelkunde (Kochtypen A, B, C) & Vitaminschonendes Garen',
        questionDe: 'Kartoffeln und Gemüse sind tägliche Begleiter in der Küche.\n' +
          'a) Unterscheiden Sie die drei Kochtypen der Speisekartoffel (Typ A, B und C) anhand ihres Stärkegehalts, ihrer Konsistenz und nennen Sie jeweils zwei passende Gerichte.\n' +
          'b) Nennen Sie fünf Regeln zur vitaminschonenden Vorbereitung und Zubereitung von Gemüse und Kartoffeln.',
        questionVi: 'Khoai tây và rau củ là nguyên liệu hằng ngày trong bếp.\n' +
          'a) Phân biệt 3 nhóm khoai tây theo đặc tính nấu (Kochtyp A, B và C) dựa trên hàm lượng tinh bột, kết cấu và nêu 2 món ăn phù hợp cho mỗi nhóm.\n' +
          'b) Nêu 5 quy tắc sơ chế và chế biến rau củ/khoai tây giúp giữ tối đa vitamin.',
        placeholderDe: 'a) Typ A (festkochend): ...\nTyp B (vorwiegend festkochend): ...\nTyp C (mehligkochend): ...\nb) 5 Regeln vitaminschonendes Garen: ...',
        hintDe: 'a) A = festkochend (Salat, Bratkartoffeln), B = vorwiegend festkochend (Salzkartoffeln, Pommes), C = mehligkochend (Püree, Klöße). b) Ungeschält waschen, kurz garen (Dämpfen/Dünsten).',
        hintVi: 'a) A = festkochend (Salad, khoai chiên), B = vorwiegend festkochend (khoai luộc, Pommes), C = mehligkochend (khoai nghiền, Klöße). b) Rửa nguyên củ trước khi cắt, hấp/dünsten ít nước.',
        keywords: [
          { term: 'festkochend', points: 1.5, vi: 'Typ A = festkochend (ít tinh bột ~10–12 %, không bở): Kartoffelsalat, Bratkartoffeln, Gratin', alt: ['Kartoffelsalat', 'Bratkartoffeln'] },
          { term: 'vorwiegend festkochend', points: 1.5, vi: 'Typ B = vorwiegend festkochend (tinh bột vừa ~13–15 %): Salzkartoffeln, Pellkartoffeln, Pommes frites', alt: ['Salzkartoffeln', 'Pommes'] },
          { term: 'mehligkochend', points: 1.5, vi: 'Typ C = mehligkochend (nhiều tinh bột >16 %, bở tơi): Kartoffelpüree, Klöße, Suppen', alt: ['Kartoffelpüree', 'Klöße'] },
          { term: 'ungeschält', points: 1.5, vi: 'Rửa rau củ nguyên vỏ, không ngâm lâu trong nước (wasserlösliche Vitamine schützen)', alt: ['nicht wässern', 'im Ganzen waschen'] },
          { term: 'erst kurz vor', points: 1.5, vi: 'Chỉ gọt vỏ và cắt ngay trước khi nấu để tránh oxy hóa bởi ánh sáng/không khí', alt: ['Licht', 'Sauerstoff'] },
          { term: 'Dämpfen', points: 2.5, vi: 'Ưu tiên Dämpfen hoặc Dünsten với ít nước/ít chất béo, không hâm nóng lâu trên Bain-Marie', alt: ['Dünsten', 'wenig Wasser', 'Garflüssigkeit weiterverwenden'] }
        ],
        musterloesungDe:
          'a) Die drei Kochtypen der Kartoffel:\n' +
          '1. Kochtyp A – festkochend (niedriger Stärkegehalt ca. 10–12 %, bleibt schnittfest, platzt nicht auf): Ideal für Kartoffelsalat, Bratkartoffeln, Kartoffelgratin.\n' +
          '2. Kochtyp B – vorwiegend festkochend (mittlerer Stärkegehalt ca. 13–15 %, außen leicht mehlig, innen fest): Ideal für Salzkartoffeln, Pellkartoffeln, Rösti, Pommes frites.\n' +
          '3. Kochtyp C – mehligkochend (hoher Stärkegehalt ca. 16–20 %, springt beim Kochen auf, locker-trocken): Ideal für Kartoffelpüree (-stampf), Kartoffelklöße, Gnocchi, gebundene Kartoffelsuppen.\n\n' +
          'b) Fünf Regeln zum vitaminschonenden Arbeiten:\n' +
          '1. Gemüse kühl und dunkel lagern.\n' +
          '2. Gemüse im Ganzen und ungeschält kurz unter fließendem Wasser waschen (niemals lange im Wasser liegen lassen, da wasserlösliche Vitamine B und C ausgelaugt werden).\n' +
          '3. Erst unmittelbar vor der Zubereitung schälen und zerkleinern (Schutz vor Sauerstoff und Licht).\n' +
          '4. Schonende Garmethoden mit wenig Flüssigkeit wählen (Dämpfen oder Dünsten statt Kochen in viel Wasser; mit geschlossenem Deckel garen).\n' +
          '5. Garzeit so kurz wie möglich halten („al dente“ / bissfest) und langes Warmhalten vermeiden; bei fettlöslichen Vitaminen (E, D, K, A) etwas hochwertiges Fett zugeben.',
        musterloesungVi:
          'a) 3 loại khoai tây:\n' +
          '-Typ A (festkochend – dẻo chắc, ít tinh bột): Làm Kartoffelsalat, Bratkartoffeln, Gratin.\n' +
          '-Typ B (vorwiegend festkochend – vừa): Làm Salzkartoffeln, Pellkartoffeln, Pommes frites.\n' +
          '-Typ C (mehligkochend – bở tơi, giàu tinh bột): Làm Kartoffelpüree, Kartoffelklöße, súp khoai tây.\n' +
          'b) 5 quy tắc giữ vitamin: 1. Bảo quản mát và tối; 2. Rửa nhanh nguyên củ dưới vòi nước chảy, không ngâm nước; 3. Chỉ cắt gọt sát giờ nấu; 4. Hấp (Dämpfen) hoặc Dünsten với ít nước, đậy nắp; 5. Nấu vừa chín tới (bissfest), không giữ nóng lâu và thêm chút chất béo cho nhóm vitamin tan trong dầu (E, D, K, A).',
        explanation: {
          whyCorrect: 'Bao phủ đầy đủ câu hỏi về khoai tây và giữ vitamin trong đề IHK Winter 2023/24.',
          whyWrong: 'Dùng khoai tây Typ C (mehligkochend) để làm Kartoffelsalat sẽ khiến món salad bị nát vụn.',
          keyTakeaway: 'Mẹo nhớ vitamin tan trong dầu: E – D – K – A („EDEKA“); còn lại (nhóm B, C) tan trong nước nên cấm ngâm nước lâu!'
        }
      }
    ],

    /* ========================================================================
       LF 4: SALATE, VORSPEISEN, GEMÜSE & CONVENIENCE ZUBEREITEN
       ======================================================================== */
    lf4: [
      {
        id: 'lf4-q1',
        no: 1,
        lf: 'lf4',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Klassische Gemüseschnittarten & Verwendung von Gemüseabschnitten',
        questionDe: 'Für die Suppen- und Gemüseposten müssen Sie Karotten, Sellerie und Lauch präzise schneiden.\n' +
          'a) Beschreiben Sie Form und Maße (in mm) der fünf klassischen Gemüseschnittarten: Julienne, Brunoise, Bâtonnets, Jardinière und Macédoine.\n' +
          'b) Nennen Sie drei sinnvolle Verwendungsmöglichkeiten für saubere Gemüseabschnitte (Parüren) in der Küche.',
        questionVi: 'Ở quầy súp và rau củ, bạn phải thái cà rốt, cần tây và tỏi tây đúng chuẩn.\n' +
          'a) Mô tả hình dạng và kích thước (mm) của 5 kiểu cắt rau củ cổ điển: Julienne, Brunoise, Bâtonnets, Jardinière và Macédoine.\n' +
          'b) Nêu 3 cách tận dụng hợp lý phần đầu mẩu rau củ sạch (Gemüseabschnitte / Parüren) trong bếp.',
        placeholderDe: 'a) Julienne = ...\nBrunoise = ...\nBâtonnets = ...\nJardinière = ...\nMacédoine = ...\nb) 3 Verwendungen für Gemüseabschnitte: ...',
        hintDe: 'a) Julienne = feine Streifen (1,5–2 mm), Brunoise = feine Würfel (1,5–2 mm), Bâtonnets = Stäbchen (5–6 mm), Macédoine = Würfel (5 mm). b) Gemüsefond/Brühe, Röstgemüse/Mirepoix, Gemüsepüree.',
        hintVi: 'a) Julienne = sợi mảnh, Brunoise = hạt lựu nhỏ từ Julienne, Bâtonnets = thanh que, Macédoine = hạt lựu vừa. b) Nấu nước dùng Gemüsefond, Röstgemüse cho xốt, súp nghiền.',
        keywords: [
          { term: 'Julienne', points: 1.5, vi: 'Julienne: Thái sợi mảnh như que diêm (dài 30–40 mm, dày 1,5–2 mm)', alt: ['feine Streifen', 'Streifen'] },
          { term: 'Brunoise', points: 1.5, vi: 'Brunoise: Thái hạt lựu cực nhỏ (1,5–2 mm) cắt ngang từ sợi Julienne', alt: ['feine Würfel', 'kleine Würfel'] },
          { term: 'Bâtonnets', points: 1.5, vi: 'Bâtonnets: Thái thanh que (dài 40 mm, dày 5–6 mm)', alt: ['Stäbchen', 'Batonnets'] },
          { term: 'Jardinière', points: 1, vi: 'Jardinière: Thanh gậy nhỏ vừa (dài 20–30 mm, dày 4–5 mm)', alt: ['Jardiniere', 'Balken'] },
          { term: 'Macédoine', points: 1.5, vi: 'Macédoine: Thái hạt lựu vừa (5 × 5 × 5 mm, cắt từ Bâtonnets/Jardinière)', alt: ['Macedoine', '5 mm'] },
          { term: 'Gemüsefond', points: 1.5, vi: 'Nấu nước dùng rau củ (Gemüsefond / Brühe)', alt: ['Brühe', 'Fond'] },
          { term: 'Mirepoix', points: 1.5, vi: 'Làm Röstgemüse (Mirepoix) cho xốt nâu hoặc nấu súp kem/püree', alt: ['Röstgemüse', 'Saucenansatz', 'Püreesuppen'] }
        ],
        musterloesungDe:
          'a) Fünf klassische Gemüseschnittarten:\n' +
          '1. Julienne: Feine Streifen (ca. 1,5–2 mm dick, 30–40 mm lang) – z. B. für klare Suppen (Consommé Julienne).\n' +
          '2. Brunoise: Sehr feine Würfelchen (ca. 1,5–2 mm Kantenlänge, aus Julienne geschnitten) – als Suppeneinlage.\n' +
          '3. Bâtonnets: Gemüse-Stäbchen (ca. 5–6 mm dick, 40–50 mm lang) – als Gemüsebeilage oder Rohkoststicks.\n' +
          '4. Jardinière: Kleinere Gemüsestäbchen nach Gärtnerinnen-Art (ca. 4–5 mm dick, 20–30 mm lang).\n' +
          '5. Macédoine: Mittelgroße Gemüsewürfel (ca. 5 × 5 × 5 mm, aus Bâtonnets geschnitten).\n\n' +
          'b) Drei Verwendungen für saubere Gemüseabschnitte (Parüren):\n' +
          '1. Ansatz für Gemüsefond oder klare Brühen.\n' +
          '2. Röstgemüse (Mirepoix) für dunkle Grundsaucen und Schmorgerichte.\n' +
          '3. Verarbeitung in gebundenen Gemüsecremesuppen oder Gemüsepürees (Nachhaltigkeit / Zero Waste).',
        musterloesungVi:
          'a) 5 kiểu cắt: 1. Julienne (sợi mảnh 1,5–2 mm × 30–40 mm); 2. Brunoise (hạt lựu nhỏ 1,5–2 mm cắt từ Julienne); 3. Bâtonnets (thanh que 5–6 mm × 40 mm); 4. Jardinière (thanh nhỏ 4–5 mm × 25 mm); 5. Macédoine (hạt lựu vừa 5 × 5 × 5 mm).\n' +
          'b) 3 cách tận dụng đầu mẩu rau củ sạch: 1. Ninh nước dùng Gemüsefond; 2. Làm Röstgemüse (Mirepoix) tạo màu và vị cho xốt nâu; 3. Nấu súp kem rau củ xay nhuyễn.',
        explanation: {
          whyCorrect: 'Phân biệt rõ cặp sợi → hạt lựu tương ứng: Julienne → Brunoise (1,5–2 mm) và Bâtonnets/Jardinière → Macédoine (5 mm).',
          whyWrong: 'Nhầm lẫn kích thước giữa Brunoise (hạt lựu siêu nhỏ cho Consommé) và Macédoine (hạt lựu 5 mm).',
          keyTakeaway: 'Quy tắc liên kết: Cắt ngang Julienne được Brunoise; cắt ngang Bâtonnets được Macédoine!'
        }
      },
      {
        id: 'lf4-q2',
        no: 2,
        lf: 'lf4',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Mise en place, Herstellung Gurkensalat & Vegetarische Snack-Karte',
        questionDe: 'Im Kalten Posten (Garde Manger) bereiten Sie Salate und Snacks vor.\n' +
          'a) Erklären Sie den Fachbegriff „Mise en place“ und nennen Sie zwei Vorteile.\n' +
          'b) Beschreiben Sie die fachgerechte Herstellung von klassischem Gurkensalat mit Vinaigrette in 5 Arbeitsschritten (IHK Sommer 2024).\n' +
          'c) Nennen Sie jeweils vier kalte und vier warme vegetarische Snacks für eine Bistro-Karte (IHK Winter 2023/24).',
        questionVi: 'Ở quầy bếp lạnh (Garde Manger), bạn chuẩn bị các món salad và đồ ăn nhẹ.\n' +
          'a) Giải thích thuật ngữ „Mise en place“ và nêu 2 lợi ích.\n' +
          'b) Trình bày quy trình làm món salad dưa chuột (Gurkensalat) với xốt Vinaigrette trong 5 bước (Đề IHK Sommer 2024).\n' +
          'c) Nêu 4 món Snack chay lạnh (kalt) và 4 món Snack chay nóng (warm) cho thực đơn Bistro (Đề IHK Winter 2023/24).',
        placeholderDe: 'a) Mise en place = ...\nb) 5 Schritte Gurkensalat: ...\nc) 4 kalte vegetarische Snacks + 4 warme vegetarische Snacks...',
        hintDe: 'b) Waschen/Schälen -> Hobeln -> Einsalzen & Entwässern -> Ausdrücken -> Marinieren mit Vinaigrette & Dill.',
        hintVi: 'b) Rửa/gọt vỏ → Bào lát mỏng → Ướp muối rút nước (entwässern) → Vắt ráo → Trộn Vinaigrette & thì là (Dill).',
        keywords: [
          { term: 'Arbeitsplatzvorbereitung', points: 1.5, vi: 'Mise en place: Chuẩn bị sẵn sàng dụng cụ và nguyên liệu tại vị trí làm việc trước giờ phục vụ', alt: ['Bereitstellen', 'Vorbereitung'] },
          { term: 'hobeln', points: 1.5, vi: 'Rửa sạch dưa chuột, bào lát mỏng đều (in dünne Scheiben hobeln)', alt: ['Scheiben schneiden'] },
          { term: 'entwässern', points: 2, vi: 'Ướp muối (einsalzen), để nghỉ 10–15 phút cho rút bớt nước rồi vắt nhẹ (ausdrücken)', alt: ['einsalzen', 'ziehen lassen', 'ausdrücken'] },
          { term: 'Vinaigrette', points: 1.5, vi: 'Trộn với xốt Vinaigrette (3 phần dầu : 1 phần giấm) và rau thì là tươi (Dill)', alt: ['Dill', 'Marinade', 'Dressing'] },
          { term: 'Caprese', points: 1.5, vi: '4 Snacks chay lạnh: Tomate-Mozzarella (Caprese), Bruschetta, Griechischer Bauernsalat, Käse-Spieße/Gemüsesticks mit Kräuterquark', alt: ['Bruschetta', 'Bauernsalat', 'Kräuterquark'] },
          { term: 'Flammkuchen', points: 2, vi: '4 Snacks chay nóng: Vegetarischer Flammkuchen, Gemüse-Quiche, Ofenkartoffel mit Sauerrahm, Gebackener Camembert / Falafel', alt: ['Quiche', 'Ofenkartoffel', 'Camembert', 'Falafel'] }
        ],
        musterloesungDe:
          'a) Mise en place:\n' +
          'Bezeichnet das Bereitstellen aller benötigten Arbeitsgeräte, Geschirrteile und vorbereiteten Zutaten am Arbeitsplatz vor Servicebeginn. Vorteile: Zeitersparnis im Stoßgeschäft, reibungsloser und stressfreier Arbeitsablauf, gleichbleibende Qualität.\n\n' +
          'b) Herstellung von Gurkensalat in 5 Schritten:\n' +
          '1. Salatgurke kalt waschen, trocknen und je nach Rezept ganz oder streifenweise schälen.\n' +
          '2. Gurke auf dem Gurkenhobel (Mandoline) in gleichmäßige, dünne Scheiben hobeln.\n' +
          '3. Gurkenscheiben leicht einsalzen und ca. 10–15 Minuten ziehen lassen (entwässern, damit das Dressing später nicht verwässert).\n' +
          '4. Ausgetretenes Gurkenwasser abgießen bzw. Gurken leicht ausdrücken.\n' +
          '5. Mit Vinaigrette (1 Teil Essig, 3 Teile Öl, Salz, Pfeffer, Prise Zucker) und frisch gehacktem Dill marinieren, abschmecken und anrichten.\n\n' +
          'c) Vegetarische Snack-Karte:\n' +
          '-4 kalte vegetarische Snacks: 1. Insalata Caprese (Tomate-Mozzarella mit Basilikum); 2. Griechischer Hirtensalat mit Feta; 3. Rohkost-Gemüsesticks mit Kräuterquark-Dip; 4. Frischkäse-Kräuter-Bagel.\n' +
          '-4 warme vegetarische Snacks: 1. Elsässer Flammkuchen vegetarisch (Lauch & Schafskäse); 2. Spinat-Feta-Quiche; 3. Ofenkartoffel (Baked Potato) mit Sour Cream; 4. Gebackener Camembert mit Preiselbeeren und Toast.',
        musterloesungVi:
          'a) Mise en place là sự chuẩn bị sẵn sàng mọi dụng cụ và nguyên liệu sơ chế tại quầy trước giờ bán hàng, giúp tiết kiệm thời gian và tránh hỗn loạn giờ cao điểm.\n' +
          'b) 5 bước làm Gurkensalat: 1. Rửa sạch, gọt vỏ; 2. Bào lát mỏng bằng bàn bào; 3. Ướp chút muối 10–15 phút để rút bớt nước (entwässern); 4. Chắt bỏ nước thừa; 5. Trộn xốt Vinaigrette (1 giấm : 3 dầu) và thì là tươi (Dill).\n' +
          'c) 4 Snack chay lạnh: Salad Caprese, Salad Hy Lạp Feta, Rau củ que chấm Kräuterquark, Bagel phô mai thảo mộc. 4 Snack chay nóng: Flammkuchen chay, Quiche rau bina-Feta, Khoai tây đút lò Sour Cream, Camembert chiên xù.',
        explanation: {
          whyCorrect: 'Kết hợp chính xác 2 câu hỏi thực hành trong đề IHK Sommer 2024 và Winter 2023/24.',
          whyWrong: 'Trộn xốt ngay vào dưa chuột tươi mà không ướp muối rút nước trước làm xốt bị loãng toẹt.',
          keyTakeaway: 'Bước ăn điểm tuyệt đối khi làm Gurkensalat là „einsalzen & entwässern“ (ướp muối rút nước) và rau thơm đi kèm chuẩn nhất là „Dill“ (thì là)!'
        }
      },
      {
        id: 'lf4-q3',
        no: 3,
        lf: 'lf4',
        fach: 'bfk1',
        category: 'warenkunde',
        points: 10,
        title: 'Convenience-Produkte: 5 Verarbeitungsstufen & Betriebswirtschaftliche Vor-/Nachteile',
        questionDe: 'In der modernen Gastronomie werden häufig Convenience-Produkte eingesetzt.\n' +
          'a) Nennen und erklären Sie die fünf Convenience-Stufen (Fertigungsgrade) mit jeweils einem konkreten Lebensmittelbeispiel.\n' +
          'b) Nennen Sie vier Vorteile und zwei Nachteile beim Einsatz von Convenience-Produkten (IHK Winter 2023/24).',
        questionVi: 'Trong ẩm thực hiện đại, các sản phẩm tiện lợi (Convenience-Produkte) được sử dụng rất phổ biến.\n' +
          'a) Nêu và giải thích 5 cấp độ chế biến sẵn (Convenience-Stufen) kèm 1 ví dụ cụ thể cho mỗi cấp độ.\n' +
          'b) Nêu 4 ưu điểm và 2 nhược điểm khi sử dụng sản phẩm Convenience trong nhà hàng (Đề IHK Winter 2023/24).',
        placeholderDe: 'a) 5 Convenience-Stufen + Beispiel...\nb) 4 Vorteile + 2 Nachteile...',
        hintDe: 'a) 0 = Rohware, 1 = Küchenfertig, 2 = Garfertig, 3 = Aufbereitungsfertig, 4 = Regenerier-/Verzehrfertig. b) Zeit-/Personalersparnis, kein Putzverlust, Kalkulationssicherheit vs. höherer Einkaufspreis, Verlust der Individualität.',
        hintVi: 'a) Küchenfertig → Garfertig → Aufbereitungsfertig → Regenerierfertig → Verzehrfertig. b) Tiết kiệm thời gian/nhân sự, không hao hụt sơ chế, dễ tính giá vs. giá mua cao, giảm tính độc bản.',
        keywords: [
          { term: 'Küchenfertig', points: 1, vi: 'Küchenfertig: Đã sơ chế thô nhưng còn phải cắt/nấu (vd: khoai tây gọt vỏ sẵn, thịt lọc xương)', alt: ['geschälte Kartoffeln'] },
          { term: 'Garfertig', points: 1, vi: 'Garfertig: Sẵn sàng đem nấu ngay không cần sơ chế (vd: Pommes frites TK, mì khô, rau củ cắt sẵn TK)', alt: ['Pommes frites', 'TK-Gemüse'] },
          { term: 'Aufbereitungsfertig', points: 1, vi: 'Aufbereitungsfertig: Chỉ cần pha thêm nước/sữa hoặc đun lên (vd: bột súp, bột bánh Pudding, bột khoai tây nghiền)', alt: ['Trockensuppe', 'Kartoffelpüreeflocken'] },
          { term: 'Regenerierfertig', points: 1, vi: 'Regenerierfertig: Đã nấu chín hoàn toàn, chỉ cần hâm nóng (vd: món Sous-vide chín, Lasagne đông lạnh)', alt: ['Sous-vide', 'erhitzen'] },
          { term: 'Verzehrfertig', points: 1, vi: 'Verzehrfertig (Tischfertig): Ăn/phục vụ được ngay (vd: bánh ngọt làm sẵn, xốt Mayonnaise, dưa chuột muối)', alt: ['Tischfertig', 'Mayonnaise'] },
          { term: 'Zeitersparnis', points: 2, vi: 'Ưu điểm: Tiết kiệm thời gian & chi phí nhân sự (Arbeitszeit-/Personalkostenersparnis), bù đắp thiếu hụt nhân lực', alt: ['Personalkosten', 'Fachkräftemangel'] },
          { term: 'Kalkulation', points: 1.5, vi: 'Ưu điểm: Không có hao hụt sơ chế (kein Putzverlust), chất lượng đồng đều, dễ tính giá cốt (exakte Kalkulation)', alt: ['Putzverlust', 'gleichbleibende Qualität'] },
          { term: 'Einkaufspreis', points: 1.5, vi: 'Nhược điểm: Giá mua nguyên liệu cao hơn, giảm bản sắc riêng của bếp, nhiều rác thải bao bì', alt: ['Individualität', 'Verpackungsmüll'] }
        ],
        musterloesungDe:
          'a) Die fünf Convenience-Stufen:\n' +
          '1. Küchenfertig: Geputzt/entbeint, muss noch geschnitten und gegart werden (z. B. geschälte Kartoffeln, ausgelöster Rinderrücken).\n' +
          '2. Garfertig: Kann direkt ohne weitere Vorbereitung gegart werden (z. B. TK-Pommes frites, TK-Erbsen, Teigwaren, paniertes Schnitzel).\n' +
          '3. Aufbereitungsfertig: Muss durch Zugabe von Flüssigkeit und/oder kurzem Kochen fertiggestellt werden (z. B. Saucenpulver, Kartoffelpüreeflocken, Salatdressing-Basis).\n' +
          '4. Regenerierfertig: Bereits fertig gegarte Speisen, die nur noch erhitzt (regeneriert) werden müssen (z. B. TK-Lasagne, vorgegarte Sous-vide-Rouladen).\n' +
          '5. Verzehrfertig (Tischfertig): Sofort ohne weitere Bearbeitung servierbar (z. B. Portionsbutter, fertige Torte, Gewürzgurken, Eiscreme).\n\n' +
          'b) Vier Vorteile & zwei Nachteile:\n' +
          '-Vorteile: 1. Hohe Zeit- und Personalkostenersparnis; 2. Keine Putz- und Schälverluste sowie geringeres Abfallvolumen in der Vorbereitung; 3. Exakte Kalkulationssicherheit und gleichbleibende Produktqualität; 4. Geringerer Bedarf an Küchengeräten und Lagerfläche.\n' +
          '-Nachteile: 1. Höherer Wareneinkaufspreis; 2. Verlust der kulinarischen Individualität/Frische sowie mehr Verpackungsmüll.',
        musterloesungVi:
          'a) 5 cấp độ Convenience: 1. Küchenfertig (đã gọt vỏ/lọc xương, cần cắt & nấu); 2. Garfertig (đem nấu ngay như Pommes TK, mì ống); 3. Aufbereitungsfertig (pha thêm nước/sữa như bột xốt, bột khoai tây nghiền); 4. Regenerierfertig (đã nấu chín, chỉ cần hâm nóng như Lasagne TK); 5. Verzehrfertig/Tischfertig (ăn ngay như bánh ngọt, Mayonnaise).\n' +
          'b) 4 Ưu điểm: Tiết kiệm thời gian & nhân công; Không có hao hụt sơ chế (Putzverlust); Chất lượng đồng nhất & định giá chính xác; Đỡ tốn diện tích sơ chế. 2 Nhược điểm: Giá nhập cao hơn; Giảm nét đặc trưng riêng của nhà hàng & tốn bao bì.',
        explanation: {
          whyCorrect: 'Phân loại rõ 5 cấp độ theo chuẩn giảng dạy IHK và nêu đúng 4 lợi ích kinh tế trong đề IHK Winter 2023/24.',
          whyWrong: 'Nhầm Garfertig (chưa chín, đem nấu trực tiếp) với Regenerierfertig (đã chín, chỉ hâm nóng).',
          keyTakeaway: 'Chuỗi tiến hóa Convenience: Küchenfertig → Garfertig → Aufbereitungsfertig → Regenerierfertig → Verzehrfertig!'
        }
      }
    ],

    /* ========================================================================
       LF 5 & 8: IM SERVICE ARBEITEN, GETRÄNKE, BUFFET & BANKETT
       ======================================================================== */
    lf5: [
      {
        id: 'lf5-q1',
        no: 1,
        lf: 'lf5',
        fach: 'bfk2',
        category: 'praxis',
        points: 10,
        title: 'Grundgedeck & Erweitertes Gedeck für ein 4-Gänge-Menü',
        questionDe: 'Sie decken im Restaurant für ein festliches 4-Gänge-Menü ein:\n' +
          '1. Gang: Rinderkraftbrühe (Consommé)\n' +
          '2. Gang: Gebratenes Zanderfilet\n' +
          '3. Gang: Rosa gebratener Lammrücken\n' +
          '4. Gang: Mousse au Chocolat\n' +
          'a) Welche Teile gehören zu einem einfachen Grundgedeck?\n' +
          'b) Beschreiben Sie präzise die Besteck-, Teller- und Gläseranordnung für das obige 4-Gänge-Menü (rechts, links, oben, Richtglas).',
        questionVi: 'Bạn bày bàn (eindecken) trong nhà hàng cho thực đơn 4 món trang trọng:\n' +
          'Món 1: Súp bò trong (Consommé) | Món 2: Phi lê cá Zander áp chảo | Món 3: Thăn cừu nướng hồng | Món 4: Mousse au Chocolat.\n' +
          'a) Những vật dụng nào thuộc về một bộ Grundgedeck cơ bản?\n' +
          'b) Mô tả chính xác vị trí dao dĩa, đĩa và ly cho thực đơn 4 món trên (bên phải, bên trái, phía trên, ly chuẩn Richtglas).',
        placeholderDe: 'a) Grundgedeck: ...\nb) Rechts (von außen nach innen): ...\nLinks: ...\nOben: ...\nGläser & Brotteller: ...',
        hintDe: 'Man arbeitet von außen nach innen! Rechts außen: Suppenlöffel, dann Fischmesser, innen Fleischmesser. Links außen: Fischgabel, innen Fleischgabel. Oben: Dessertbesteck.',
        hintVi: 'Nguyên tắc dùng dao dĩa từ ngoài vào trong! Phía phải từ ngoài vào: Thìa súp → Dao cá → Dao thịt. Phía trái từ ngoài vào: Dĩa cá → Dĩa thịt. Phía trên: Bộ tráng miệng.',
        keywords: [
          { term: 'Grundgedeck', points: 1.5, vi: 'Grundgedeck: Platzteller/Serviette, Menümesser (phải), Menügabel (trái), Weinglas, Tischdekoration/Menage', alt: ['Menümesser', 'Menügabel', 'Serviette'] },
          { term: 'außen nach innen', points: 1.5, vi: 'Nguyên tắc sắp xếp: Theo thứ tự món ăn từ ngoài vào trong (von außen nach innen), cách mép bàn 1–2 cm (Daumenregel)', alt: ['Daumenregel', 'Tischkante'] },
          { term: 'Suppenlöffel', points: 1.5, vi: 'Bên phải (từ ngoài vào trong): Suppenlöffel → Fischmesser → Menümesser (lưỡi dao quay vào đĩa)', alt: ['Fischmesser', 'Schneide zum Teller'] },
          { term: 'Fischgabel', points: 1.5, vi: 'Bên trái (từ ngoài vào trong): Fischgabel → Menügabel', alt: ['Menügabel'] },
          { term: 'Dessertbesteck', points: 1.5, vi: 'Phía trên đĩa: Dessertgabel (cán quay sang trái) và Dessertlöffel nằm trên (cán quay sang phải)', alt: ['Dessertlöffel', 'Dessertgabel'] },
          { term: 'Brotteller', points: 1, vi: 'Bên trái ngoài cùng: Brotteller kèm Buttermesser đặt bên phải trên đĩa bánh mì', alt: ['Buttermesser'] },
          { term: 'Richtglas', points: 1.5, vi: 'Ly uống: Richtglas (Rotweinglas cho món chính) đặt phía trên mũi dao chính ~1 cm; Weißweinglas chếch phải dưới, Wasserglas bên phải ngoài', alt: ['Rotweinglas', 'Weißweinglas', 'Messerspitze'] }
        ],
        musterloesungDe:
          'a) Bestandteile des Grundgedecks:\n' +
          'Stoffserviette (bzw. Platzteller), großes Menümesser (rechts, Schneide zum Teller), große Menügabel (links), ein Stielglas (Wasser-/Weinglas oberhalb der Messerspitze) sowie Tischwäsche, Tischdekoration, Tischnummer und Menage.\n\n' +
          'b) Erweitertes Gedeck für das 4-Gänge-Menü (Besteckfolge von außen nach innen, ca. 1–2 cm von der Tischkante nach Daumenregel):\n' +
          '-Mitte: Platzteller mit Mundserviette.\n' +
          '-Rechts vom Platzteller (von außen nach innen): 1. Suppenlöffel (für Consommé) → 2. Fischmesser (für Zander) → 3. Großes Menümesser (für Lammrücken).\n' +
          '-Links vom Platzteller (von außen nach innen): 1. Fischgabel → 2. Große Menügabel.\n' +
          '-Links neben den Gabeln: Brotteller mit Buttermesser (auf dem rechten Rand des Brottellers, Schneide nach links).\n' +
          '-Oberhalb des Platztellers: Dessertgabel (Griff nach links) und darüber Dessertlöffel (Griff nach rechts) für die Mousse au Chocolat.\n' +
          '-Gläser (rechts oben): Richtglas = Rotweinglas (zum Hauptgang Lamm) ca. 1 cm über der Spitze des Menümessers; schräg rechts darunter das Weißweinglas (zum Zander) und ganz rechts außen das Wasserglas.',
        musterloesungVi:
          'a) Grundgedeck gồm: Khăn ăn/đĩa lót, dao chính bên phải (lưỡi hướng vào trong), dĩa chính bên trái, 1 ly trên mũi dao, lọ gia vị & hoa bàn.\n' +
          'b) Bày bàn thực đơn 4 món (từ ngoài vào trong, cách mép bàn 1–2 cm):\n' +
          '-Bên phải (từ ngoài vào): Thìa súp → Dao cá → Dao thịt chính.\n' +
          '-Bên trái (từ ngoài vào): Dĩa cá → Dĩa thịt chính; bên trái ngoài cùng là đĩa bánh mì (Brotteller) kèm dao phết bơ.\n' +
          '-Phía trên đĩa: Dĩa tráng miệng (cán quay trái) ở dưới, thìa tráng miệng (cán quay phải) ở trên.\n' +
          '-Hệ thống ly: Ly chuẩn (Richtglas = Ly vang đỏ cho món chính) đặt trên mũi dao chính 1 cm; chếch xuống bên phải là ly vang trắng (cho món cá) và ngoài cùng bên phải là ly nước lọc.',
        explanation: {
          whyCorrect: 'Mô tả chính xác 100% quy chuẩn bày bàn IHK (kể cả hướng cán thìa/dĩa tráng miệng và vị trí Richtglas).',
          whyWrong: 'Đặt ngược cán thìa/dĩa tráng miệng hoặc xếp dao dĩa từ trong ra ngoài.',
          keyTakeaway: 'Mẹo nhớ Dessertbesteck phía trên đĩa: Dĩa cầm tay trái → cán quay trái; Thìa cầm tay phải → cán quay phải nằm phía trên!'
        }
      },
      {
        id: 'lf5-q2',
        no: 2,
        lf: 'lf5',
        fach: 'bfk2',
        category: 'praxis',
        points: 10,
        title: 'Service-Regeln, 4 Servierarten, Klassisches Anrichten (6-Uhr) & Bestecksprache',
        questionDe: 'Im Restaurantservice gelten feste Fachregeln.\n' +
          'a) Von welcher Seite werden Getränke und fertig angerichtete Teller eingesetzt/abgeräumt, und von welcher Seite wird von einer Platte vorgelegt oder Wein zum Probieren eingeschenkt?\n' +
          'b) Unterscheiden Sie den Amerikanischen (Teller-), Englischen (Vorlege-) und Französischen Service.\n' +
          'c) Wie werden beim klassischen Anrichten eines Tellergerichts (6-Uhr-Regel) Hauptkomponente, Sättigungsbeilage und Gemüsebeilage platziert (IHK Winter 2024/25)?\n' +
          'd) Was signalisiert der Gast mit den Besteckpositionen „20 nach 8“ und „20 nach 4“?',
        questionVi: 'Trong phục vụ bàn có những quy tắc chuyên môn cố định.\n' +
          'a) Đồ uống và đĩa thức ăn định sẵn được đặt xuống/thu dọn từ phía nào, và phục vụ gắp từ đĩa lớn (Platte) hoặc rót rượu thử từ phía nào?\n' +
          'b) Phân biệt kiểu phục vụ Mỹ (Amerikanisch), Anh (Englisch) và Pháp (Französisch).\n' +
          'c) Khi trình bày đĩa ăn cổ điển (quy tắc 6 giờ – IHK Winter 2024/25), thành phần chính (thịt/cá), tinh bột và rau củ được đặt ở vị trí nào?\n' +
          'd) Khách báo hiệu điều gì qua vị trí đặt dao dĩa „8 giờ 20“ và „4 giờ 20“?',
        placeholderDe: 'a) Rechts vs. Links: ...\nb) Amerikanisch / Englisch / Französisch: ...\nc) Klassisches Anrichten (6-Uhr): ...\nd) Bestecksprache 20 nach 8 vs. 20 nach 4: ...',
        hintDe: 'a) Rechts: Teller & Getränke; Links: Vorlegen von Platte, Brotteller, Salat. c) 6 Uhr = Fleisch/Fisch (Logo oben auf 12 Uhr), 10 Uhr = Gemüse, 2 Uhr = Sättigungsbeilage. d) 20 nach 8 = Pause, 20 nach 4 = fertig.',
        hintVi: 'a) Phải: Đĩa định suất & Đồ uống; Trái: Gắp từ đĩa lớn (Platte), đĩa bánh mì/salad. c) 6 giờ = Thịt/Cá, 10 giờ = Rau củ, 2 giờ = Tinh bột (Logo ở 12 giờ). d) 8h20 = Tạm nghỉ, 4h20 = Ăn xong.',
        keywords: [
          { term: 'von rechts', points: 1.5, vi: 'Từ bên phải (von rechts): Đặt/thu đĩa định suất, đặt/rót đồ uống, đặt/thu súp', alt: ['Getränke einschenken', 'Teller einsetzen'] },
          { term: 'von links', points: 1.5, vi: 'Từ bên trái (von links): Phục vụ/gắp từ đĩa lớn (Vorlegen/Anbieten), đặt/thu đĩa bánh mì và bát salad', alt: ['Platte vorlegen', 'anbieten'] },
          { term: 'Amerikanisch', points: 1.5, vi: 'Amerikanischer Service = Tellerservice (bếp trình bày sẵn ra đĩa); Englischer = Vorlegeservice am Guéridon; Französischer = Gast nimmt selbst', alt: ['Tellerservice', 'Vorlegeservice', 'Guéridon'] },
          { term: '6 Uhr', points: 2, vi: 'Quy tắc trình bày cổ điển: 6 giờ (phía khách) = Thịt/Cá, 2 giờ = Tinh bột (Sättigungsbeilage), 10 giờ = Rau củ, 12 giờ = Logo nhà hàng', alt: ['10 Uhr', '2 Uhr', '12 Uhr', 'Hauptkomponente'] },
          { term: '20 nach 8', points: 1.5, vi: '„20 nach 8“ (dao dĩa chéo hình chữ V ngược): Khách đang tạm nghỉ (Pause), chưa được thu đĩa', alt: ['Pause', 'noch nicht fertig'] },
          { term: '20 nach 4', points: 2, vi: '„20 nach 4“ (dao dĩa song song hướng 4h20/5h25): Khách đã ăn xong, có thể thu đĩa (abräumen)', alt: ['beendet', 'fertig', 'abräumen'] }
        ],
        musterloesungDe:
          'a) Seitenregel im Service:\n' +
          '-Von rechts: Einsetzen und Abräumen von fertig angerichteten Tellern und Suppentassen, Einstellen von Gläsern und Einschenken aller Getränke (damit der rechte Arm des Gastes nicht gestört wird).\n' +
          '-Von links: Anbieten und Vorlegen von Platten/Schüsseln, Einsetzen und Abräumen von Brotteller, Salatschale und Fingerschale.\n\n' +
          'b) Servierarten:\n' +
          '-Amerikanischer Service (Tellerservice): Speisen werden in der Küche fertig auf Tellern angerichtet und von rechts serviert.\n' +
          '-Englischer Service (Vorlegeservice): Speisen werden auf Platten am Beistelltisch (Guéridon) präsentiert/tranchiert und von der Servicekraft von links auf den Teller des Gastes vorgelegt.\n' +
          '-Französischer Service: Die Servicekraft präsentiert die Platte von links mit Vorlegebesteck und der Gast nimmt sich die Speisen selbst.\n\n' +
          'c) Klassisches Anrichten (6-Uhr-Regel, IHK Winter 2024/25):\n' +
          '-12 Uhr (oben): Restaurant-Vignette / Logo des Tellers.\n' +
          '-6 Uhr (unten, direkt vor dem Gast): Hauptkomponente (Fleisch oder Fisch).\n' +
          '-10 Uhr (links oben): Gemüsebeilage.\n' +
          '-2 Uhr (rechts oben): Sättigungsbeilage (Kartoffeln, Reis, Pasta).\n\n' +
          'd) Bestecksprache:\n' +
          '-„20 nach 8“ (Messer und Gabel gekreuzt / Dachform): Der Gast macht eine Pause – Teller nicht abräumen!\n' +
          '-„20 nach 4“ (bzw. „25 nach 5“, Messer und Gabel parallel nebeneinander): Der Gast hat das Essen beendet – Teller darf abgeräumt werden.',
        musterloesungVi:
          'a) Quy tắc bên phải/trái: Bên phải = Đặt/thu đĩa định suất, đặt ly và rót mọi đồ uống. Bên trái = Đưa đĩa lớn (Platte) để gắp hoặc mời khách tự gắp, đặt/thu đĩa bánh mì và bát salad.\n' +
          'b) Amerikanisch = Tellerservice (bếp bày sẵn ra đĩa); Englisch = Nhân viên gắp thức ăn từ bàn phụ Guéridon vào đĩa cho khách từ bên trái; Französisch = Nhân viên bưng đĩa lớn bên trái để khách tự gắp.\n' +
          'c) Trình bày đĩa cổ điển: 12 giờ = Logo nhà hàng; 6 giờ (sát khách) = Món chính (Thịt/Cá); 10 giờ = Rau củ; 2 giờ = Tinh bột.\n' +
          'd) Ngôn ngữ dao dĩa: „8 giờ 20“ (chéo chữ V ngược) = Tạm nghỉ; „4 giờ 20“ (song song) = Đã ăn xong, có thể dọn đĩa.',
        explanation: {
          whyCorrect: 'Hệ thống hóa toàn bộ quy tắc phục vụ bàn và câu hỏi trình bày đĩa trong đề IHK Winter 2024/25.',
          whyWrong: 'Đặt món chính (thịt/cá) ở hướng 12 giờ khiến khách phải vươn qua rau/tinh bột để cắt thịt.',
          keyTakeaway: 'Nhớ mặt đồng hồ trên đĩa ăn: 12h = Logo | 6h = Thịt/Cá | 10h = Rau | 2h = Tinh bột!'
        }
      },
      {
        id: 'lf5-q3',
        no: 3,
        lf: 'lf5',
        fach: 'bfk2',
        category: 'praxis',
        points: 10,
        title: 'Buffet-Service & Tafelformen für Bankette (IHK Winter 24/25 & Sommer 25)',
        questionDe: 'Für eine Gesellschaft mit 45 Personen wird ein Warm-Kalt-Buffet aufgebaut.\n' +
          'a) Nennen Sie sechs Punkte, die beim fachgerechten Aufbau und während der Betreuung eines Buffets zu beachten sind (Temperatur, Hygiene, Ablauf).\n' +
          'b) Nennen Sie jeweils drei Vorteile eines Buffets aus Sicht des Gastes und drei Vorteile aus Sicht des Restaurants (IHK Sommer 2025).\n' +
          'c) Nennen Sie vier klassische Tafelformen für Bankette und geben Sie an, ab welcher Personenanzahl ein Mittelgang (Durchgang) eingeplant werden sollte.',
        questionVi: 'Cho một đoàn tiệc 45 khách, nhà hàng tổ chức Buffet nóng – lạnh.\n' +
          'a) Nêu 6 điểm cần lưu ý khi lắp đặt và trực phục vụ quầy Buffet (nhiệt độ, vệ sinh, luồng di chuyển).\n' +
          'b) Nêu 3 lợi ích của Buffet dưới góc nhìn của khách và 3 lợi ích dưới góc nhìn của nhà hàng (Đề IHK Sommer 2025).\n' +
          'c) Nêu 4 kiểu xếp bàn tiệc (Tafelformen) cổ điển và cho biết từ bao nhiêu khách ngồi một dãy thì phải chừa lối đi ở giữa.',
        placeholderDe: 'a) 6 Punkte Buffet-Aufbau & Betreuung: ...\nb) 3 Vorteile Gast + 3 Vorteile Restaurant: ...\nc) 4 Tafelformen + Durchgang ab ... Personen',
        hintDe: 'a) Logische Menüfolge (Vorspeise -> Hauptgang -> Dessert), Chafing-Dish >= 65 °C, Kühlplatten <= 7 °C, Hustenschutz, Vorlegebesteck, Beschriftung/Allergene.',
        hintVi: 'a) Xếp theo thứ tự thực đơn, giữ nóng ≥ 65 °C, giữ lạnh ≤ 7 °C, kính chắn giọt bắn, dụng cụ gắp riêng từng món, bảng tên kèm chất dị ứng.',
        keywords: [
          { term: '65 °C', points: 1.5, vi: 'Giữ nóng món ăn trong Chafing-Dish tối thiểu +65 °C (tối đa 3 giờ) và giữ lạnh món lạnh ≤ +7 °C', alt: ['Chafing-Dish', 'Warmhaltung', '+7 °C'] },
          { term: 'Hustenschutz', points: 1.5, vi: 'Đảm bảo vệ sinh: Spuck-/Hustenschutz (kính chắn), mỗi món 1 Vorlegebesteck riêng, biển tên kèm Allergene', alt: ['Spuckschutz', 'Vorlegebesteck', 'Beschilderung'] },
          { term: 'Menüfolge', points: 1, vi: 'Sắp xếp quầy theo luồng 1 chiều đúng thứ tự: Đĩa/Dao dĩa → Khai vị/Salad → Món chính → Tráng miệng', alt: ['Laufwege', 'logische Reihenfolge'] },
          { term: 'Portionsgröße', points: 2, vi: 'Ưu điểm cho khách: Tự chọn món và khẩu phần (Portionsgröße), không phải chờ đợi lâu, dễ giao lưu trò chuyện', alt: ['keine Wartezeit', 'freie Auswahl', 'kombinieren'] },
          { term: 'Personalaufwand', points: 2, vi: 'Ưu điểm cho nhà hàng: Tiết kiệm nhân viên phục vụ (geringerer Personalaufwand im Service), phục vụ cùng lúc nhiều khách, dễ chuẩn bị trước (Mise en place)', alt: ['Personaleinsparung', 'gleichzeitig', 'Planbarkeit'] },
          { term: 'U-Tafel', points: 2, vi: '4 kiểu bàn tiệc: Blocktafel, I-Tafel, U-Tafel, E-Tafel, T-Tafel, runde Tische; chừa lối đi từ khoảng 15–20 người/dãy', alt: ['E-Tafel', 'T-Tafel', 'Blocktafel', '16 Personen'] }
        ],
        musterloesungDe:
          'a) Sechs Regeln für Aufbau & Betreuung des Buffets:\n' +
          '1. Logische Anordnung nach der Menüfolge (Teller/Besteck → Vorspeisen/Salate → Suppe → Hauptgänge → Desserts/Käse) für staufreie Laufwege.\n' +
          '2. Temperaturkontrolle nach HACCP: Warme Speisen im Chafing-Dish bei mind. +65 °C halten; kalte Speisen auf Eis/Kühlplatten bei max. +7 °C.\n' +
          '3. Hygieneschutz: Hustenschutz (Spuckschutz), für jede Speise ein eigenes Vorlegebesteck bereitstellen.\n' +
          '4. Klare Beschilderung aller Speisen inklusive Allergen- und Zusatzstoffkennzeichnung.\n' +
          '5. Regelmäßiges Nachfüllen (frische Behälter einsetzen, niemals neue Ware auf alte Reste schütten!) und Sauberhalten der Buffetstrecke.\n' +
          '6. Rechtzeitiges Abräumen benutzter Teller an den Gästetischen.\n\n' +
          'b) Vorteile des Buffets (IHK Sommer 2025):\n' +
          '-Für den Gast (3): 1. Freie Auswahl und Kombinationsmöglichkeit der Speisen nach eigenem Geschmack; 2. Selbstbestimmung der Portionsgröße und Möglichkeit zum Nachnehmen; 3. Keine lange Wartezeit auf den Service und ungezwungene Kommunikation.\n' +
          '-Für das Restaurant (3): 1. Geringerer Personalbedarf im Service am Tisch; 2. Viele Gäste können gleichzeitig verpflegt werden; 3. Gute Vorbereitung (Mise en place) in der Küche ohne à-la-carte-Spitzenbelastung.\n\n' +
          'c) Tafelformen & Durchgang:\n' +
          'Klassische Tafelformen: Blocktafel, I-Tafel (lange Tafel), T-Tafel, U-Tafel, E-Tafel (Kamm-Tafel) sowie runde Banketttische. Bei langen Tafeln sollte nach ca. 15 bis 20 Personen (bzw. 8–10 m Länge) ein Durchgang für Service und Gäste eingeplant werden.',
        musterloesungVi:
          'a) 6 nguyên tắc Buffet: 1. Xếp theo thứ tự thực đơn một chiều (Đĩa → Khai vị → Món chính → Tráng miệng); 2. Giữ nóng ≥ +65 °C trong Chafing-Dish, giữ lạnh ≤ +7 °C; 3. Có kính chắn giọt bắn (Hustenschutz) và kẹp gắp riêng cho từng món; 4. Ghi bảng tên món kèm chất dị ứng; 5. Thay khay mới khi vơi (không đổ đè đồ mới lên đồ cũ); 6. Thu đĩa bẩn tại bàn khách thường xuyên.\n' +
          'b) Lợi ích cho khách: Tự do chọn món yêu thích, tự quyết định khẩu phần/lấy thêm, không phải đợi phục vụ lâu. Lợi ích cho nhà hàng: Đỡ tốn nhân viên chạy bàn, phục vụ được lượng khách lớn cùng lúc, bếp chủ động chuẩn bị trước.\n' +
          'c) Các kiểu bàn tiệc: Blocktafel, I-Tafel, T-Tafel, U-Tafel, E-Tafel, bàn tròn. Với dãy bàn dài trên 15–20 người cần mở lối đi ở giữa.',
        explanation: {
          whyCorrect: 'Trả lời trọn vẹn câu hỏi Buffet trong cả 2 đề thi IHK Winter 2024/25 và Sommer 2025.',
          whyWrong: 'Đổ thức ăn mới nấu trực tiếp lên khay thức ăn cũ còn sót lại trên quầy Buffet (vi phạm HACCP nghiêm trọng).',
          keyTakeaway: 'Nhiệt độ sống còn tại Buffet: Nóng ≥ +65 °C | Lạnh ≤ +7 °C | Thay nguyên khay GN mới khi châm thêm đồ!'
        }
      },
      {
        id: 'lf5-q4',
        no: 4,
        lf: 'lf5',
        fach: 'bfk2',
        category: 'warenkunde',
        points: 10,
        title: 'Heißgetränke: Kaffee-Ausbeute, Tee vs. Aufguss & Grüner Tee (IHK 2024/2025)',
        questionDe: 'Im Frühstücks- und Café-Service sind Fachkenntnisse über Heißgetränke gefragt.\n' +
          'a) Nennen Sie sechs Kaffeespezialitäten auf Espresso-Basis und erklären Sie den Aufbau eines Cappuccinos und eines Latte macchiato.\n' +
          'b) Fachrechnen (IHK Sommer 2024): Für 1 Tasse Kaffee werden 7 g Kaffeebohnen benötigt. Wie viele Tassen Kaffee erhalten Sie aus einer 1-kg-Packung Kaffeebohnen (ganze Tassen abrunden)?\n' +
          'c) Erklären Sie den rechtlichen Unterschied zwischen „echtem Tee“ und „teeähnlichen Erzeugnissen“ (IHK Winter 2024/25) und begründen Sie, warum Grüner Tee nur mit 70–80 °C heißem Wasser aufgegossen werden darf (IHK Sommer 2025).',
        questionVi: 'Trong ca phục vụ ăn sáng và Café, bạn cần nắm vững kiến thức về đồ uống nóng.\n' +
          'a) Nêu 6 loại đồ uống cà phê pha từ nền Espresso và giải thích cấu tạo của Cappuccino cùng Latte macchiato.\n' +
          'b) Tính toán (IHK Sommer 2024): Mỗi tách cà phê cần 7 g hạt cà phê. Hỏi từ 1 túi 1 kg hạt cà phê pha được bao nhiêu tách nguyên vẹn?\n' +
          'c) Giải thích sự khác biệt pháp lý giữa „Trà thật (echter Tee)“ và „Sản phẩm tương tự trà (teeähnliche Erzeugnisse)“ (IHK Winter 2024/25), đồng thời giải thích vì sao Trà xanh (Grüner Tee) chỉ được pha với nước 70–80 °C (IHK Sommer 2025).',
        placeholderDe: 'a) 6 Kaffeespezialitäten + Cappuccino vs. Latte macchiato...\nb) 1 kg : 7 g = ...\nc) Echter Tee vs. teeähnliche Erzeugnisse + Grüner Tee (70–80 °C)...',
        hintDe: 'b) 1.000 g ÷ 7 g = 142,85 -> 142 Tassen. c) Echter Tee = Camellia sinensis; Grüner Tee = unfermentiert, kochendes Wasser löst zu viele Gerbstoffe (bitter!).',
        hintVi: 'b) 1.000 g ÷ 7 g = 142,85 → 142 tách. c) Trà thật từ cây Camellia sinensis; Trà xanh không lên men, nước sôi 100 °C làm tiết nhiều Tanin gây đắng chát.',
        keywords: [
          { term: 'Cappuccino', points: 1.5, vi: '6 món: Espresso, Espresso Doppio, Espresso Macchiato, Americano, Cappuccino (1/3 Espresso + 1/3 heiße Milch + 1/3 Milchschaum), Café Crème', alt: ['Espresso', 'Americano', 'Milchschaum'] },
          { term: 'Latte macchiato', points: 1, vi: 'Latte macchiato: 3 tầng trong ly cao (Sữa nóng ở đáy → Espresso ở giữa → Bọt sữa ở trên)', alt: ['3 Schichten', 'Glas'] },
          { term: '142 Tassen', points: 2.5, vi: '1.000 g ÷ 7 g = 142,85 → làm tròn xuống 142 tách cà phê nguyên vẹn', alt: ['142', '1000 : 7'] },
          { term: 'Camellia sinensis', points: 2, vi: 'Trà thật (Schwarzer/Grüner/Weißer/Oolong Tee) làm từ lá cây chè Camellia sinensis (chứa Koffein/Teein)', alt: ['Teepflanze', 'Teein', 'Schwarzer Tee'] },
          { term: 'teeähnliche Erzeugnisse', points: 1.5, vi: 'Teeähnliche Erzeugnisse (Kräuter-/Früchtetee như Kamille, Pfefferminze, Hagebutte): không từ cây chè, không có Koffein', alt: ['Kräutertee', 'Früchtetee', 'koffeinfrei'] },
          { term: 'bitter', points: 1.5, vi: 'Grüner Tee không lên men (unfermentiert); pha ở 70–80 °C (1,5–3 phút) để không tiết quá nhiều chất chát (Gerbstoffe/Tannine) gây đắng và giữ vitamin', alt: ['Gerbstoffe', 'Tannine', 'unfermentiert', '70'] }
        ],
        musterloesungDe:
          'a) Sechs Kaffeespezialitäten & Aufbau:\n' +
          '1. Espresso, 2. Espresso Doppio, 3. Espresso Macchiato, 4. Caffè Americano, 5. Cappuccino, 6. Latte macchiato (oder Flat White / Café Crème).\n' +
          '-Cappuccino: In vorgewärmter Porzellantasse aus 1/3 Espresso, 1/3 heißer Milch und 1/3 feinporigem Milchschaum.\n' +
          '-Latte macchiato: Im hohen Glas in 3 Schichten serviert (unten heiße Milch, oben Milchschaum, dazwischen langsam eingegossener Espresso).\n\n' +
          'b) Kaffee-Ausbeute (IHK Sommer 2024):\n' +
          '1 kg = 1.000 g Kaffeebohnen.\n' +
          '1.000 g ÷ 7 g pro Tasse = 142,85 Tassen → Es können 142 volle Tassen Kaffee ausgeschenkt werden.\n\n' +
          'c) Tee vs. teeähnliche Erzeugnisse & Grüner Tee:\n' +
          '-Echter Tee (Schwarzer, Grüner, Weißer Tee, Oolong) stammt ausschließlich von den Blättern des Teestrauchs (Camellia sinensis) und enthält Koffein (Teein).\n' +
          '-Teeähnliche Erzeugnisse (Aufgussgetränke wie Pfefferminz-, Kamillen-, Rooibos- oder Früchtetee) stammen von anderen Pflanzen/Früchten und sind von Natur aus koffeinfrei.\n' +
          '-Grüner Tee (IHK Sommer 2025): Die Teeblätter sind unfermentiert (nur gedämpft/geröstet). Wird er mit kochendem Wasser (100 °C) übergossen, lösen sich zu viele Gerbstoffe (Tannine) und Bitterstoffe, wodurch der Tee stark bitter schmeckt und empfindliche Vitamine zerstört werden. Optimale Brühtemperatur: 70–80 °C bei 1,5 bis 3 Minuten Ziehzeit.',
        musterloesungVi:
          'a) 6 món cà phê: Espresso, Doppio, Espresso Macchiato, Americano, Cappuccino (1/3 Espresso + 1/3 sữa nóng + 1/3 bọt sữa), Latte macchiato (ly cao 3 tầng: sữa nóng → Espresso → bọt sữa).\n' +
          'b) Tính số tách cà phê: 1.000 g ÷ 7 g = 142,85 → Pha được 142 tách nguyên vẹn.\n' +
          'c) Trà thật làm từ lá cây chè Camellia sinensis (có Koffein/Teein); Sản phẩm tương tự trà (trà thảo mộc bạc hà, hoa cúc, trà trái cây) làm từ các thực vật khác và không chứa Koffein. Trà xanh không qua lên men (unfermentiert), chỉ pha nước 70–80 °C để không bị tiết quá nhiều chất chát (Gerbstoffe/Tannine) gây đắng gắt.',
        explanation: {
          whyCorrect: 'Tổng hợp nguyên vẹn 3 câu hỏi đồ uống nóng từ 3 đề thi IHK gần nhất (Sommer 2024, Winter 2024/25, Sommer 2025).',
          whyWrong: 'Làm tròn 142,85 lên 143 tách (sai thực tế vì 0,85 tách không đủ bán 1 tách đầy cho khách).',
          keyTakeaway: 'Trong bài toán số khẩu phần/số tách bán ra: Luôn làm tròn XUỐNG (abrunden). Trong bài toán số chai/thùng cần mua về: Luôn làm tròn LÊN (aufrunden)!'
        }
      },
      {
        id: 'lf5-q5',
        no: 5,
        lf: 'lf5',
        fach: 'bfk2',
        category: 'rechnen',
        points: 10,
        title: 'Bierkunde, Schankverlust-Berechnung & 3 Gründe für Schaumbildung',
        questionDe: 'An der Schankanlage im Thekenbereich zapfen Sie Fassbier.\n' +
          'a) Nennen Sie die vier klassischen Zutaten nach dem Deutschen Reinheitsgebot von 1516 und unterscheiden Sie untergäriges von obergärigem Bier mit je zwei Beispielen.\n' +
          'b) Nennen Sie drei Ursachen, warum das Bier beim Zapfen zu stark schäumt („Bier schießt“), und beschreiben Sie die Vorbereitung eines Bierglases.\n' +
          'c) Fachrechnen (IHK Sommer 2024 & Winter 2023/24):\n' +
          '-Rechnung 1: Aus einem 30-Liter-Fass werden 98 Gläser à 0,3 l ausgeschenkt. Berechnen Sie den Schankverlust in Litern und in Prozent.\n' +
          '-Rechnung 2: Ein 30-Liter-Fass hat 5 % Schankverlust. Wie viele Gläser à 0,3 l können verkauft werden?',
        questionVi: 'Tại quầy bar, bạn rót bia tươi từ hệ thống vòi (Schankanlage).\n' +
          'a) Nêu 4 nguyên liệu theo Luật Tinh khiết Bia Đức năm 1516 (Reinheitsgebot) và phân biệt bia lên men đáy (untergärig) với bia lên men nổi (obergärig) kèm 2 ví dụ mỗi loại.\n' +
          'b) Nêu 3 nguyên nhân khiến bia khi rót bị trào quá nhiều bọt và mô tả cách chuẩn bị ly bia trước khi rót.\n' +
          'c) Tính toán (IHK Sommer 2024 & Winter 2023/24):\n' +
          '-Bài 1: Từ một bom bia 30 lít bán được 98 ly loại 0,3 l. Tính hao hụt rót bia (Schankverlust) bằng lít và bằng phần trăm (%).\n' +
          '-Bài 2: Một bom bia 30 lít có hao hụt rót 5 %. Hỏi bán được bao nhiêu ly 0,3 l?',
        placeholderDe: 'a) 4 Zutaten Reinheitsgebot + untergärig vs. obergärig...\nb) 3 Gründe für starkes Schäumen...\nc) Rechnung 1 (98 * 0,3 l) + Rechnung 2 (30 l - 5%)...',
        hintDe: 'a) Wasser, Hopfen, Malz, Hefe. b) Bier zu warm, CO2-Druck falsch, Leitung verschmutzt / Glas fettig. c) 1) 98 × 0,3 l = 29,4 l -> Verlust 0,6 l = 2 %. 2) 30 l × 0,95 = 28,5 l ÷ 0,3 l = 95 Gläser.',
        hintVi: 'a) Nước, Hoa bia, Mạch nha, Men bia. b) Bia quá ấm, áp suất CO2 sai, đường ống bẩn. c) 1) 98 × 0,3 l = 29,4 l → Hao hụt 0,6 l = 2 %. 2) 28,5 l ÷ 0,3 l = 95 ly.',
        keywords: [
          { term: 'Reinheitsgebot', points: 1.5, vi: '4 nguyên liệu Reinheitsgebot 1516: Wasser, Gerstenmalz (Malz), Hopfen, Hefe', alt: ['Hopfen', 'Malz', 'Hefe'] },
          { term: 'untergärig', points: 1.5, vi: 'Untergärig (men chìm 4–9 °C: Pils, Export, Märzen, Lager) vs. Obergärig (men nổi 15–20 °C: Weizenbier, Altbier, Kölsch)', alt: ['obergärig', 'Pils', 'Weizen', 'Kölsch'] },
          { term: 'Druck', points: 1.5, vi: '3 lý do bia trào bọt: Áp suất CO2 sai (quá cao/quá thấp), bia/thùng quá ấm, ống dẫn bẩn hoặc mở nửa vòi (nicht ganz geöffnet)', alt: ['Bier zu warm', 'Kohlensäure', 'Zapfhahn', 'Leitung'] },
          { term: 'kalt ausspülen', points: 1, vi: 'Ly bia phải sạch không dính dầu mỡ và tráng nước lạnh ngay trước khi rót (kalt ausspülen)', alt: ['fettfrei', 'Gläserspüler'] },
          { term: '2 %', points: 2, vi: 'Bài 1: 98 × 0,3 l = 29,4 l → Hao hụt 30 - 29,4 = 0,6 l → (0,6 ÷ 30) × 100 = 2 %', alt: ['0,6 l', '29,4 l', '2 Prozent'] },
          { term: '95 Gläser', points: 2.5, vi: 'Bài 2: 30 l - 5 % (1,5 l) = 28,5 l → 28,5 l ÷ 0,3 l = 95 ly', alt: ['28,5 l', '95'] }
        ],
        musterloesungDe:
          'a) Reinheitsgebot 1516 & Gärungsarten:\n' +
          '-Vier Zutaten: Wasser, Malz (Gersten-/Weizenmalz), Hopfen und Hefe.\n' +
          '-Untergäriges Bier (Hefe sinkt bei 4–9 °C nach unten, längere Reifung): z. B. Pils, Export, Helles, Märzen, Bockbier.\n' +
          '-Obergäriges Bier (Hefe steigt bei 15–20 °C nach oben, fruchtiger): z. B. Weizenbier (Weißbier), Kölsch, Altbier, Berliner Weiße.\n\n' +
          'b) Drei Gründe für zu starke Schaumbildung & Glasvorbereitung:\n' +
          '1. Das Bier bzw. Fass ist zu warm (Kühlung defekt oder Fass frisch gerollt).\n' +
          '2. Falscher CO₂-Betriebsdruck (zu hoch oder zu niedrig) an der Schankanlage.\n' +
          '3. Verschmutzte Bierleitung oder der Kompensatorzapfhahn wird beim Zapfen nicht vollständig geöffnet.\n' +
          '-Vorbereitung des Bierglases: Mit kaltem klarem Wasser im Spülbecken mit Bürste (ohne Spülmittel/Fett!) frisch und kalt ausspülen, damit das Glas glatt und kühl ist.\n\n' +
          'c) Schankverlust-Berechnung:\n' +
          '-Rechnung 1 (IHK Sommer 2024): Ausgeschenkte Menge = 98 Gläser × 0,3 l = 29,4 l. Schankverlust in Litern = 30,0 l - 29,4 l = 0,6 l. In Prozent: (0,6 l ÷ 30 l) × 100 = 2 %.\n' +
          '-Rechnung 2 (IHK Winter 2023/24): 5 % Verlust von 30 l = 1,5 l → Verkaufsmenge = 28,5 l. Anzahl Gläser: 28,5 l ÷ 0,3 l = 95 Gläser.',
        musterloesungVi:
          'a) 4 nguyên liệu Reinheitsgebot: Nước, Mạch nha (Malz), Hoa bia (Hopfen), Men bia (Hefe). Bia lên men đáy (untergärig: Pils, Export, Helles) và lên men nổi (obergärig: Weizenbier, Kölsch, Altbier).\n' +
          'b) 3 nguyên nhân bia trào bọt: Thùng bia quá ấm, áp suất khí CO₂ chỉnh sai, đường ống bẩn hoặc gạt vòi rót nửa vời. Chuẩn bị ly: Rửa sạch không dính mỡ và tráng nước lạnh ngay trước khi rót.\n' +
          'c) Bài 1: 98 × 0,3 l = 29,4 l → Hao hụt 0,6 l = 2 %. Bài 2: 30 l - 5 % (1,5 l) = 28,5 l → 28,5 l ÷ 0,3 l = 95 ly.',
        explanation: {
          whyCorrect: 'Bao trọn cả lý thuyết quầy bar và 2 bài tính Schankverlust xuất hiện liên tiếp trong đề IHK Winter 23/24 và Sommer 24.',
          whyWrong: 'Lau khô ly bia bằng khăn vải (sợi vải và mỡ bám làm hỏng bọt bia) thay vì tráng nước lạnh để ướt.',
          keyTakeaway: 'Ly rượu vang phải lau khô bóng (polieren); riêng ly bia phải tráng nước lạnh để ướt (kalt benetzen)!'
        }
      },
      {
        id: 'lf5-q6',
        no: 6,
        lf: 'lf5',
        fach: 'bfk2',
        category: 'warenkunde',
        points: 10,
        title: 'Wein-, Schaumwein- & Wasserkunde sowie Jugendschutzgesetz (§ 9 JuSchG)',
        questionDe: 'Im Getränkeservice beraten Sie Gäste zu Wasser, Sekt und Wein und achten auf den Jugendschutz.\n' +
          'a) Unterscheiden Sie Natürliches Mineralwasser, Tafelwasser und Heilwasser (IHK Sommer 2025).\n' +
          'b) Sektempfang (IHK Sommer 2025): Für 35 Gäste wird je ein Glas Sekt (0,1 l) ausgeschenkt. Wie viele 0,75-l-Flaschen müssen Sie bereitstellen und bei welcher Temperatur wird Sekt serviert?\n' +
          'c) Weinempfehlung (IHK Sommer 2024): Welchen Wein empfehlen Sie zu gebratenem Lammrücken, bei welcher Temperatur wird er serviert und nennen Sie vier deutsche Weinanbaugebiete.\n' +
          'd) Jugendschutz (§ 9 JuSchG, IHK Winter 24/25 & Sommer 25): Darf ein 14-Jähriger in Begleitung seiner Eltern ein Bier (0,3 l) trinken? Darf ein 15-Jähriger allein ein Glas Wein bestellen?',
        questionVi: 'Trong phục vụ đồ uống, bạn tư vấn cho khách về nước, Sekt, rượu vang và tuân thủ Luật Bảo vệ thanh thiếu niên.\n' +
          'a) Phân biệt Natürliches Mineralwasser, Tafelwasser và Heilwasser (Đề IHK Sommer 2025).\n' +
          'b) Tiệc Sekt (IHK Sommer 2025): Phục vụ 35 khách, mỗi khách 1 ly Sekt (0,1 l). Cần chuẩn bị bao nhiêu chai 0,75 l và nhiệt độ phục vụ Sekt là bao nhiêu?\n' +
          'c) Tư vấn vang (IHK Sommer 2024): Bạn khuyên dùng rượu vang gì với món thăn cừu áp chảo, phục vụ ở nhiệt độ nào và nêu tên 4 vùng trồng nho của Đức.\n' +
          'd) Luật JuSchG (§ 9 JuSchG, IHK Winter 24/25 & Sommer 25): Thiếu niên 14 tuổi đi cùng bố mẹ có được uống 1 ly bia không? Thiếu niên 15 tuổi đi một mình có được gọi 1 ly rượu vang không?',
        placeholderDe: 'a) Mineralwasser vs. Tafelwasser vs. Heilwasser...\nb) 35 * 0,1 l : 0,75 l = ... Flaschen + Temperatur...\nc) Wein zu Lammrücken + 4 Anbaugebiete...\nd) JuSchG 14-Jähriger mit Eltern / 15-Jähriger allein...',
        hintDe: 'b) 3,5 l ÷ 0,75 l = 4,67 -> 5 Flaschen (aufrunden!); 6–8 °C (max. 10 °C). d) 14 J. mit Eltern (Sorgeberechtigten) = JA (begleitetes Trinken für Bier/Wein ab 14 J.); 15 J. allein = NEIN (erst ab 16 J.).',
        hintVi: 'b) 3,5 l ÷ 0,75 l = 4,67 → Làm tròn lên 5 chai; nhiệt độ 6–8 °C. d) 14 tuổi đi cùng bố mẹ = ĐƯỢC uống bia/vang; 15 tuổi đi một mình = KHÔNG ĐƯỢC (phải đủ 16 tuổi).',
        keywords: [
          { term: 'amtliche Anerkennung', points: 1.5, vi: 'Natürliches Mineralwasser: Nguồn ngầm tự nhiên, đóng chai tại nguồn (Quellort), có công nhận chính thức (amtliche Anerkennung)', alt: ['Quellort', 'unterirdisch'] },
          { term: 'Tafelwasser', points: 1.5, vi: 'Tafelwasser: Nước pha chế công nghiệp từ nước máy/khoáng, không cần nguồn cố định; Heilwasser: Nước có tác dụng phòng/chữa bệnh (Arzneimittelrecht)', alt: ['Heilwasser', 'vorbeugend', 'Trinkwasser'] },
          { term: '5 Flaschen', points: 2, vi: 'Sekt: 35 × 0,1 l = 3,5 l ÷ 0,75 l = 4,67 → Phải chuẩn bị 5 chai (làm tròn lên); nhiệt độ phục vụ 6–8 °C (hoặc đến 10 °C)', alt: ['4,67', '6 bis 8 °C', '6-8 °C'] },
          { term: 'Spätburgunder', points: 1.5, vi: 'Vang cho Lammrücken: Vang đỏ đậm vừa/khô (trockener kräftiger Rotwein như Spätburgunder, Dornfelder, Lemberger) ở 16–18 °C', alt: ['Dornfelder', 'Rotwein', '16–18 °C', '16-18'] },
          { term: 'Rheinhessen', points: 1.5, vi: '4 vùng vang Đức: Rheinhessen, Pfalz, Baden, Mosel, Rheingau, Franken, Württemberg, Ahr, Nahe (kể 4 trong 13 vùng)', alt: ['Pfalz', 'Baden', 'Mosel', 'Rheingau', 'Württemberg'] },
          { term: 'Personensorgeberechtigte', points: 2, vi: 'JuSchG § 9: 14 tuổi đi cùng bố mẹ (Personensorgeberechtigte) ĐƯỢC phép uống bia/vang; 15 tuổi đi một mình KHÔNG được uống (Bia/Vang tự mua từ 16 tuổi, Rượu mạnh Spirituosen từ 18 tuổi)', alt: ['Eltern', 'ab 16 Jahren', 'begleitetes Trinken'] }
        ],
        musterloesungDe:
          'a) Unterscheidung der Wasserarten (IHK Sommer 2025):\n' +
          '-Natürliches Mineralwasser: Stammt aus unterirdischen, vor Verunreinigungen geschützten Wasservorkommen, wird direkt am Quellort abgefüllt und benötigt eine amtliche Anerkennung.\n' +
          '-Tafelwasser: Industriell hergestellte Mischung aus Trinkwasser, Mineralwasser, Natursole und/oder Mineralsalzen; keine Quellenbindung und keine amtliche Anerkennung nötig.\n' +
          '-Heilwasser: Natürliches Wasser mit wissenschaftlich nachgewiesener vorbeugender, lindernder oder heilender Wirkung (unterliegt dem Arzneimittelgesetz).\n\n' +
          'b) Sektberechnung & Serviertemperatur (IHK Sommer 2025):\n' +
          '-Gesamtmenge: 35 Gäste × 0,1 l = 3,5 Liter Sekt.\n' +
          '-Flaschenanzahl: 3,5 l ÷ 0,75 l = 4,67 Flaschen → Es müssen 5 Flaschen kaltgestellt werden (immer aufrunden!).\n' +
          '-Serviertemperatur für Sekt/Schaumwein: gut gekühlt bei 6–8 °C (bzw. bis max. 10 °C).\n\n' +
          'c) Weinempfehlung zum Lammrücken & Anbaugebiete (IHK Sommer 2024):\n' +
          '-Empfehlung: Kräftiger, trockener Rotwein (z. B. deutscher Spätburgunder, Dornfelder oder Lemberger) bei einer Serviertemperatur von 16–18 °C.\n' +
          '-Vier deutsche Weinanbaugebiete (aus 13): z. B. Rheinhessen, Pfalz, Baden, Mosel (weitere: Rheingau, Franken, Württemberg, Nahe, Ahr).\n\n' +
          'd) Jugendschutzgesetz (§ 9 JuSchG):\n' +
          '-14-Jähriger in Begleitung der Eltern (Personensorgeberechtigte): JA, ab 14 Jahren dürfen Jugendliche im Beisein einer personensorgeberechtigten Person gegorene Getränke wie Bier, Wein oder Sekt trinken („begleitetes Trinken“).\n' +
          '-15-Jähriger allein: NEIN, ohne Begleitung der Eltern dürfen Bier, Wein und Sekt erst ab 16 Jahren (und branntweinhaltige Getränke/Spirituosen erst ab 18 Jahren) abgegeben werden.',
        musterloesungVi:
          'a) Mineralwasser: Khai thác từ mạch ngầm tự nhiên, đóng chai ngay tại nguồn và phải được nhà nước công nhận chính thức. Tafelwasser: Pha chế công nghiệp từ nước uống và khoáng chất, không cần nguồn cố định. Heilwasser: Nước khoáng có dược tính phòng/chữa bệnh.\n' +
          'b) Tính số chai Sekt: 35 × 0,1 l = 3,5 l ÷ 0,75 l = 4,67 → Phải chuẩn bị 5 chai. Nhiệt độ phục vụ Sekt: 6–8 °C.\n' +
          'c) Với món Lammrücken: Khuyên dùng vang đỏ khô đậm đà (Spätburgunder, Dornfelder) ở 16–18 °C. 4 vùng vang Đức: Rheinhessen, Pfalz, Baden, Mosel.\n' +
          'd) JuSchG: 14 tuổi đi cùng bố mẹ (Personensorgeberechtigte) ĐƯỢC phép uống bia/vang; 15 tuổi đi một mình KHÔNG được uống (phải đủ 16 tuổi mới được tự gọi bia/vang, và 18 tuổi mới được uống rượu mạnh Spirituosen).',
        explanation: {
          whyCorrect: 'Kết hợp 4 câu hỏi thực tế trong đề IHK Sommer 2024, Winter 2024/25 và Sommer 2025.',
          whyWrong: 'Nghĩ rằng 14 tuổi có bố mẹ đi cùng cũng bị cấm uống bia (theo § 9 Abs. 2 JuSchG, từ 14–15 tuổi đi cùng bố mẹ được phép uống bia/vang, nhưng dưới 14 tuổi như 12 tuổi trong đề Winter 24/25 thì cấm tuyệt đối kể cả có bố mẹ!).',
          keyTakeaway: 'Mốc tuổi JuSchG cho Bia/Vang: <14 tuổi = Cấm tuyệt đối | 14–15 tuổi = Chỉ khi đi cùng bố mẹ | ≥16 tuổi = Được tự gọi | Rượu mạnh (Spirituosen) = Chỉ từ 18 tuổi!'
        }
      },
      {
        id: 'lf5-q7',
        no: 7,
        lf: 'lf5',
        fach: 'bfk2',
        category: 'praxis',
        points: 10,
        title: 'Beschwerdemanagement am Gast (LEARN-Methode)',
        questionDe: 'Ein Gast reklamiert verärgert, dass sein Rumpsteak statt „medium“ völlig durchgebraten („well done“) und kalt ist.\n' +
          'Beschreiben Sie in 5 strukturierten Schritten (z. B. nach der LEARN-Methode), wie Sie als professionelle Servicekraft mit dieser Reklamation umgehen.',
        questionVi: 'Một vị khách phàn nàn rằng miếng Rumpsteak của ông ấy thay vì chín vừa („medium“) lại bị nướng chín kỹ („well done“) và bị nguội.\n' +
          'Hãy mô tả trong 5 bước có cấu trúc (ví dụ theo phương pháp LEARN) cách bạn xử lý chuyên nghiệp lời phàn nàn này.',
        placeholderDe: '1. L (Listen): ...\n2. E (Empathize): ...\n3. A (Apologize): ...\n4. R (React): ...\n5. N (Notify/Nachfassen): ...',
        hintDe: 'L = Listen (Zuhören), E = Empathize (Verständnis zeigen), A = Apologize (Entschuldigen ohne Schuldzuweisung), R = React (Lösung/Ersatz anbieten), N = Notify/Follow-up (Küche/Leitung informieren & nachfragen).',
        hintVi: 'L = Lắng nghe, E = Đồng cảm, A = Xin lỗi lịch sự (không đổ lỗi cho bếp), R = Đưa giải pháp (đổi đĩa mới + mời đồ uống), N = Báo bếp/quản lý & hỏi thăm lại khách.',
        keywords: [
          { term: 'zuhören', points: 2, vi: 'Bước 1 (Listen): Bình tĩnh lắng nghe khách nói hết, không ngắt lời, giữ giao tiếp mắt', alt: ['ausreden lassen', 'ruhig bleiben'] },
          { term: 'Verständnis', points: 2, vi: 'Bước 2 (Empathize): Thể hiện sự thấu hiểu và nghiêm túc ghi nhận phản ánh của khách', alt: ['ernst nehmen', 'Empathie'] },
          { term: 'entschuldigen', points: 2, vi: 'Bước 3 (Apologize): Xin lỗi chân thành thay mặt nhà hàng, tuyệt đối không tranh cãi hay đổ lỗi cho bếp', alt: ['keine Ausreden', 'keine Schuldzuweisung'] },
          { term: 'Ersatz', points: 2, vi: 'Bước 4 (React): Thu đĩa lỗi ngay, đề xuất làm lại Steak medium mới ưu tiên nhanh nhất + mời 1 đồ uống/Espresso đền bù', alt: ['neues Steak', 'Wiedergutmachung', 'Kaffee anbieten'] },
          { term: 'nachfragen', points: 2, vi: 'Bước 5 (Notify & Nachfassen): Báo ngay cho Küchenchef/Restaurantleiter và quay lại hỏi thăm xem món mới đã ưng ý chưa', alt: ['Küchenchef informieren', 'Zufriedenheit prüfen'] }
        ],
        musterloesungDe:
          'Professioneller Umgang mit der Reklamation in 5 Schritten (LEARN-Methode):\n' +
          '1. Listen (Aktiv zuhören): Ruhig und freundlich bleiben, Blickkontakt halten, den Gast ausreden lassen und nicht unterbrechen.\n' +
          '2. Empathize (Verständnis zeigen): Dem Gast signalisieren, dass sein Ärger absolut nachvollziehbar ist.\n' +
          '3. Apologize (Sich entschuldigen): Sich höflich im Namen des Hauses entschuldigen – niemals mit dem Gast diskutieren oder die Schuld auf die Küche schieben!\n' +
          '4. React (Schnell handeln & Lösung anbieten): Den fehlerhaften Teller sofort abräumen, ein frisch und bevorzugt zubereitetes Steak („medium“) anbieten (oder eine Alternative) und zur Überbrückung der Wartezeit ein Getränk oder später einen Espresso/Digestif des Hauses offerieren.\n' +
          '5. Notify & Nachfassen: Die Küche (Küchenchef) und die Restaurantleitung sofort über den Vorfall informieren und nach dem Servieren des neuen Steaks aktiv beim Gast nachfragen, ob nun alles zu seiner vollsten Zufriedenheit ist.',
        musterloesungVi:
          '5 bước xử lý khiếu nại theo chuẩn LEARN:\n' +
          '1. Listen (Lắng nghe): Giữ bình tĩnh, nhìn thẳng lịch sự, để khách nói hết mà không ngắt lời.\n' +
          '2. Empathize (Đồng cảm): Thể hiện sự thấu hiểu với sự không hài lòng của khách.\n' +
          '3. Apologize (Xin lỗi): Xin lỗi lịch sự thay mặt nhà hàng, tuyệt đối không đổ lỗi cho bộ phận bếp hay biện minh.\n' +
          '4. React (Hành động giải quyết): Thu đĩa thịt nguội ngay, đề nghị làm lại ngay phần Steak medium mới ưu tiên (hoặc đổi món khác) và mời khách một ly đồ uống/Espresso trong lúc chờ.\n' +
          '5. Notify & Nachfassen: Báo cho bếp trưởng và quản lý nhà hàng, sau khi mang đĩa mới ra thì quay lại hỏi thăm xem khách đã hài lòng chưa.',
        explanation: {
          whyCorrect: 'Áp dụng chuẩn mô hình LEARN giúp giữ chân khách hàng và lấy trọn điểm phần giao tiếp dịch vụ.',
          whyWrong: 'Nói với khách „Do bếp hôm nay đông quá làm nhầm“ (đổ lỗi nội bộ trước mặt khách là điều tối kỵ trong Gastronomie).',
          keyTakeaway: 'Quy tắc vàng: Không bao giờ đổ lỗi cho đồng nghiệp/bếp trước mặt khách – Trước mặt khách, Service và Küche là một thể thống nhất!'
        }
      }
    ],

    /* ========================================================================
       LF 6: DAS GASTRONOMISCHE ANGEBOT MITGESTALTEN (ERNÄHRUNG, ALLERGENE, GETREIDE, KARTE)
       ======================================================================== */
    lf6: [
      {
        id: 'lf6-q1',
        no: 1,
        lf: 'lf6',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Gästebewertungen systematisch auswerten (4 Schritte) & die „3 S“',
        questionDe: 'Auf Online-Portalen (z. B. Google, TripAdvisor) haben Gäste kritische Bewertungen über lange Wartezeiten und ein zu kleines vegetarisches Angebot hinterlassen.\n' +
          'a) Beschreiben Sie in 4 Schritten, wie ein Gastronomiebetrieb Gästebewertungen systematisch auswertet und zur Qualitätsverbesserung nutzt.\n' +
          'b) Nennen Sie die „3 S“ beim professionellen Verfassen einer Antwort auf eine negative Online-Bewertung.',
        questionVi: 'Trên các trang đánh giá trực tuyến (Google, TripAdvisor), khách để lại nhận xét phê bình về thời gian chờ lâu và thực đơn chay quá ít món.\n' +
          'a) Mô tả 4 bước để nhà hàng phân tích có hệ thống các đánh giá của khách và cải thiện chất lượng dịch vụ.\n' +
          'b) Nêu quy tắc „3 S“ khi viết phản hồi chuyên nghiệp cho một đánh giá tiêu cực trên mạng.',
        placeholderDe: 'a) Schritt 1: Sammeln...\nSchritt 2: ...\nSchritt 3: ...\nSchritt 4: ...\nb) Die 3 S: 1. S..., 2. S..., 3. S...',
        hintDe: 'a) 1. Sammeln & Clustern, 2. Ursachen analysieren, 3. Maßnahmen ableiten & umsetzen, 4. Erfolg kontrollieren. b) Schnell, Sachlich, Souverän.',
        hintVi: 'a) 1. Thu thập & Phân nhóm, 2. Phân tích nguyên nhân, 3. Đề ra & thực hiện giải pháp, 4. Kiểm tra hiệu quả. b) Schnell (Nhanh chóng), Sachlich (Khách quan), Souverän (Bản lĩnh/Lịch thiệp).',
        keywords: [
          { term: 'Sammeln', points: 1.5, vi: 'Bước 1: Thu thập và phân loại phản hồi theo chủ đề (Sammeln & Kategorisieren: Service, Küche, Ambiente)', alt: ['Kategorisieren', 'Clustern'] },
          { term: 'Ursachen', points: 1.5, vi: 'Bước 2: Phân tích nguyên nhân gốc rễ trong nhóm (Ursachenanalyse im Team)', alt: ['Ursachenanalyse', 'analysieren'] },
          { term: 'Maßnahmen', points: 1.5, vi: 'Bước 3: Đề ra và triển khai biện pháp khắc phục cụ thể (Maßnahmen entwickeln & umsetzen)', alt: ['Verbesserungsmaßnahmen', 'umsetzen'] },
          { term: 'Erfolgskontrolle', points: 1.5, vi: 'Bước 4: Kiểm tra hiệu quả qua các đánh giá mới và phản hồi trực tiếp (Erfolgskontrolle / Evaluation)', alt: ['kontrollieren', 'überprüfen'] },
          { term: 'Schnell', points: 1.5, vi: 'Chữ S thứ 1: Schnell (Phản hồi nhanh chóng, tốt nhất trong 24–48 giờ)', alt: ['zeitnah'] },
          { term: 'Sachlich', points: 1.5, vi: 'Chữ S thứ 2: Sachlich (Khách quan, lịch sự, không cảm tính hay công kích cá nhân)', alt: ['höflich', 'konstruktiv'] },
          { term: 'Souverän', points: 1, vi: 'Chữ S thứ 3: Souverän (Đĩnh đạc, cảm ơn góp ý, nhận lỗi nếu đúng và mời khách quay lại)', alt: ['professionell', 'bedanken'] }
        ],
        musterloesungDe:
          'a) Systematische Auswertung von Gästebewertungen in 4 Schritten:\n' +
          '1. Bewertungen sammeln und nach Themenbereichen sortieren (clustern: z. B. Speisenangebot, Wartezeit/Service, Preis-Leistung, Sauberkeit).\n' +
          '2. Ursachenanalyse im Team durchführen (Warum kam es zu langen Wartezeiten? Warum fehlen vegetarische Gerichte?).\n' +
          '3. Konkrete Verbesserungsmaßnahmen ableiten und umsetzen (z. B. Arbeitsabläufe im Service optimieren, Speisekarte um kreative vegetarische/vegane Gerichte erweitern).\n' +
          '4. Erfolgskontrolle durchführen (Folgebewertungen beobachten und Gäste aktiv nach ihrer Zufriedenheit fragen).\n\n' +
          'b) Die „3 S“ bei der Beantwortung von Online-Kritik:\n' +
          '1. Schnell: Zeitnah (innerhalb von 24–48 Stunden) reagieren.\n' +
          '2. Sachlich: Ruhig, faktenbasiert und niemals emotional oder beleidigend antworten.\n' +
          '3. Souverän: Für das Feedback danken, berechtigte Kritik annehmen, Verbesserungen aufzeigen und den Gast herzlich zu einem erneuten Besuch einladen.',
        musterloesungVi:
          'a) 4 bước phân tích đánh giá khách hàng:\n' +
          '1. Thu thập và phân nhóm theo chủ đề (Món ăn, Thời gian phục vụ, Giá cả, Vệ sinh).\n' +
          '2. Phân tích nguyên nhân cùng đội ngũ.\n' +
          '3. Đưa ra và áp dụng biện pháp cải thiện cụ thể (tối ưu quy trình phục vụ, bổ sung món chay vào thực đơn).\n' +
          '4. Kiểm tra và đánh giá lại hiệu quả qua các nhận xét tiếp theo.\n' +
          'b) Quy tắc „3 S“ khi trả lời đánh giá: 1. Schnell (Nhanh chóng); 2. Sachlich (Khách quan, không tranh cãi cảm tính); 3. Souverän (Bản lĩnh, cảm ơn góp ý và mời khách quay lại).',
        explanation: {
          whyCorrect: 'Bám sát nội dung trọng tâm của Klassenarbeit Nr. 3 (LF6) về quản trị chất lượng qua đánh giá khách hàng.',
          whyWrong: 'Tranh cãi tay đôi với khách trên Google Reviews hoặc xóa/bỏ mặc bình luận tiêu cực.',
          keyTakeaway: 'Nhớ công thức 4 bước PDCA (Sammeln → Ursachen → Maßnahmen → Kontrolle) và bộ 3 chữ S: Schnell – Sachlich – Souverän!'
        }
      },
      {
        id: 'lf6-q2',
        no: 2,
        lf: 'lf6',
        fach: 'bfk1',
        category: 'warenkunde',
        points: 10,
        title: 'Ernährungsformen (Vegan, Vegetarisch, Pescetarisch, Flexitarisch) & Alternativen',
        questionDe: 'Immer mehr Gäste achten auf besondere Ernährungsformen.\n' +
          'a) Unterscheiden Sie präzise die vier Ernährungsformen: Ovo-Lacto-Vegetarisch, Vegan, Pescetarisch und Flexitarisch.\n' +
          'b) Nennen Sie für vier tierische Produkte (Kuhmilch, Sahne, Butter/Ei beim Backen, Fleisch) jeweils eine vollwertige vegane Alternative in der Küche (IHK Sommer 2025).\n' +
          'c) Entwerfen Sie ein stimmiges vegetarisches 3-Gänge-Menü unter Beachtung der Menüregeln (IHK Sommer 2024).',
        questionVi: 'Ngày càng nhiều thực khách theo đuổi các chế độ ăn đặc biệt.\n' +
          'a) Phân biệt chính xác 4 hình thức ăn uống: Ovo-Lacto-Vegetarisch, Vegan, Pescetarisch và Flexitarisch.\n' +
          'b) Nêu 4 nguyên liệu thay thế thuần chay (vegan) cho 4 sản phẩm động vật: Sữa bò, Kem tươi (Sahne), Bơ/Trứng khi làm bánh, và Thịt (Đề IHK Sommer 2025).\n' +
          'c) Thiết kế một thực đơn chay 3 món (vegetarisches 3-Gänge-Menü) tuân thủ đúng quy tắc lên thực đơn (Đề IHK Sommer 2024).',
        placeholderDe: 'a) Ovo-Lacto-Vegetarisch / Vegan / Pescetarisch / Flexitarisch...\nb) 4 vegane Alternativen...\nc) Vegetarisches 3-Gänge-Menü (Vorspeise, Hauptgang, Dessert)...',
        hintDe: 'a) Pescetarisch = kein Fleisch, aber Fisch; Flexitarisch = selten, aber hochwertiges Bio-Fleisch. b) Hafer-/Sojamilch, Hafer-/Kokoscuisine, Pflanzenmargarine/Apfelmus/Leinsamen, Tofu/Seitan/Tempeh.',
        hintVi: 'a) Pescetarisch = không ăn thịt nhưng ăn cá; Flexitarisch = ăn chay linh hoạt, thỉnh thoảng ăn thịt chất lượng cao. b) Sữa yến mạch/đậu nành, kem dừa/yến mạch, bơ thực vật/hạt lanh, Tofu/Seitan.',
        keywords: [
          { term: 'Ovo-Lacto', points: 1.5, vi: 'Ovo-Lacto-Vegetarier: Không ăn thịt và cá (không ăn động vật bị giết mổ), nhưng ăn trứng (Ovo) và sữa (Lacto)', alt: ['kein Fleisch und Fisch', 'Eier und Milch'] },
          { term: 'Vegan', points: 1.5, vi: 'Veganer: Từ chối 100 % sản phẩm có nguồn gốc động vật (không thịt, cá, sữa, trứng, mật ong, Gelatine)', alt: ['keinerlei tierische Produkte', 'rein pflanzlich', 'Honig'] },
          { term: 'Pescetarisch', points: 1.5, vi: 'Pescetarier: Không ăn thịt động vật trên cạn nhưng ăn cá, hải sản, trứng và sữa', alt: ['Pescetarier', 'Fisch und Meeresfrüchte'] },
          { term: 'Flexitarisch', points: 1, vi: 'Flexitarier: Ăn chủ yếu thực vật nhưng thỉnh thoảng ăn thịt có chọn lọc (Bio/Tierwohl)', alt: ['Flexitarier', 'gelegentlich Fleisch'] },
          { term: 'Haferdrink', points: 2, vi: 'Thay thế thuần chay: Hafer-/Soja-/Mandeldrink (thay sữa), Soja-/Kokos-Cuisine (thay Sahne), Pflanzenmargarine/Kokosöl (thay bơ), Tofu/Seitan/Erbsenprotein (thay thịt)', alt: ['Sojamilch', 'Tofu', 'Seitan', 'Margarine'] },
          { term: '3-Gänge-Menü', points: 2.5, vi: 'Thực đơn chay 3 món không trùng lặp nguyên liệu (vd: 1. Tomatencremesuppe → 2. Kräuterseitlinge mit Spinatknödeln → 3. Beeren-Sorbet mit Minze)', alt: ['Vorspeise', 'Hauptgang', 'Dessert'] }
        ],
        musterloesungDe:
          'a) Vier Ernährungsformen im Vergleich:\n' +
          '1. Ovo-Lacto-Vegetarisch: Verzicht auf alle Produkte vom getöteten Tier (kein Fleisch, Geflügel, Fisch, Gelatine), aber Verzehr von Eiern (Ovo), Milchprodukten (Lacto) und Honig.\n' +
          '2. Vegan: Rein pflanzliche Ernährung; strikter Verzicht auf sämtliche tierischen Produkte (auch keine Milch, Butter, Käse, Eier, Honig oder tierische Klärungsmittel im Wein).\n' +
          '3. Pescetarisch: Verzicht auf Fleisch und Geflügel, aber Verzehr von Fisch und Meeresfrüchten sowie Eiern und Milchprodukten.\n' +
          '4. Flexitarisch: Überwiegend vegetarische Ernährung mit bewusstem, seltenem Konsum von hochwertigem Fleisch aus artgerechter Haltung.\n\n' +
          'b) Vier vegane Alternativen in der Küche (IHK Sommer 2025):\n' +
          '-Statt Kuhmilch: Haferdrink, Sojadrink, Mandeldrink.\n' +
          '-Statt Sahne: Hafer-Cuisine, Soja-Cuisine oder Kokosmilch.\n' +
          '-Statt Butter / Ei: Pflanzliche Margarine / Raps- oder Kokosöl; statt Ei beim Binden: geschrotete Leinsamen/Chiasamen, Apfelmus oder Kichererbsenwasser (Aquafaba).\n' +
          '-Statt Fleisch: Tofu, Tempeh, Seitan, Jackfruit oder Erbsenprotein-Produkte.\n\n' +
          'c) Beispiel für ein vegetarisches 3-Gänge-Menü (IHK Sommer 2024, ohne Wort- und Zutatenwiederholung):\n' +
          '-1. Gang (Vorspeise): Gebackener Ziegenkäse auf Wildkräutersalat mit Walnuss-Vinaigrette.\n' +
          '-2. Gang (Hauptgang): Hausgemachte Kürbis-Ravioli in Salbeibutter mit gerösteten Pinienkernen.\n' +
          '-3. Gang (Dessert): Dunkles Schokoladenmousse mit marinierten Himbeeren.',
        musterloesungVi:
          'a) 4 chế độ ăn: Ovo-Lacto-Vegetarisch (không ăn thịt/cá nhưng ăn trứng & sữa); Vegan (100% thực vật, không thịt, cá, trứng, sữa, mật ong); Pescetarisch (không ăn thịt nhưng ăn cá/hải sản); Flexitarisch (ăn chay linh hoạt, ít khi ăn thịt nhưng chọn thịt Bio cao cấp).\n' +
          'b) 4 nguyên liệu thay thế Vegan: Sữa bò → Sữa yến mạch/đậu nành/hạnh nhân; Kem Sahne → Kem đậu nành/yến mạch/nước cốt dừa; Bơ/Trứng → Bơ thực vật/dầu dừa, hạt lanh/táo nghiền/Aquafaba; Thịt → Đậu phụ (Tofu), Seitan, Tempeh.\n' +
          'c) Thực đơn chay 3 món: Món 1: Phô mai dê nướng trên xà lách thảo mộc sốt hạt óc chó; Món 2: Ravioli nhân bí đỏ sốt bơ xô thơm; Món 3: Mousse sô-cô-la đen kèm phúc bồn tử.',
        explanation: {
          whyCorrect: 'Kết hợp kiến thức KA3 LF6 với câu hỏi thực tế trong đề IHK Sommer 2024 và Sommer 2025.',
          whyWrong: 'Đưa món có cá (Lachs/Zander) vào thực đơn „vegetarisch“ (người ăn chay không ăn cá; ăn cá là Pescetarier!).',
          keyTakeaway: 'Cẩn thận bẫy Gelatine và Lab (men dịch vị bê trong phô mai cứng): Món có Gelatine từ bì lợn/bò KHÔNG phải là món chay (vegetarisch)! Thay bằng Agar-Agar hoặc Pektin.'
        }
      },
      {
        id: 'lf6-q3',
        no: 3,
        lf: 'lf6',
        fach: 'bfk1',
        category: 'recht',
        points: 10,
        title: 'Die 14 Hauptallergene nach LMIV & Beratung bei Zöliakie / Laktoseintoleranz',
        questionDe: 'Nach der Lebensmittel-Informationsverordnung (LMIV) müssen Allergene auch bei loser Ware (Speisekarte) deklariert werden.\n' +
          'a) Nennen Sie mindestens zehn der 14 kennzeichnungspflichtigen Hauptallergene nach LMIV.\n' +
          'b) Ein Gast beim Frühstück leidet an Zöliakie (Glutenunverträglichkeit) und ein zweiter Gast an Laktoseintoleranz (IHK Winter 2024/25). Erklären Sie den Unterschied beider Unverträglichkeiten und stellen Sie für beide Gäste je 3 geeignete Frühstückskomponenten zusammen.',
        questionVi: 'Theo Quy định Thông tin Thực phẩm Châu Âu (LMIV), các chất gây dị ứng phải được ghi rõ ngay cả trên thực đơn nhà hàng.\n' +
          'a) Nêu ít nhất 10 trong số 14 nhóm chất gây dị ứng chính bắt buộc phải công bố theo LMIV.\n' +
          'b) Một khách ăn sáng bị bệnh Zöliakie (bất dung nạp Gluten) và khách thứ hai bị bất dung nạp đường sữa (Laktoseintoleranz – Đề IHK Winter 2024/25). Hãy giải thích sự khác nhau và gợi ý cho mỗi khách 3 món ăn sáng phù hợp.',
        placeholderDe: 'a) Mindestens 10 der 14 Hauptallergene: ...\nb) Zöliakie (Gluten) vs. Laktoseintoleranz + je 3 Frühstücksempfehlungen...',
        hintDe: 'a) Glutenhaltiges Getreide, Eier, Milch/Laktose, Fisch, Krebstiere, Weichtiere, Erdnüsse, Schalenfrüchte, Soja, Sellerie, Senf, Sesam, Lupinen, Sulfite/Schwefeldioxid.',
        hintVi: 'a) Ngũ cốc chứa Gluten, Trứng, Sữa/Laktose, Cá, Giáp xác, Nhuyễn thể, Lạc, Hạt vỏ cứng, Đậu nành, Cần tây, Mù tạt, Vừng, Đậu Lupin, Sulfite.',
        keywords: [
          { term: 'Gluten', points: 1.5, vi: 'Ngũ cốc chứa Gluten (Weizen, Roggen, Gerste, Hafer, Dinkel), Eier, Milch (einschl. Laktose)', alt: ['Eier', 'Milch', 'Laktose'] },
          { term: 'Sellerie', points: 1.5, vi: 'Sellerie, Senf, Sesam, Soja, Erdnüsse, Schalenfrüchte (Nüsse)', alt: ['Senf', 'Sesam', 'Soja', 'Erdnüsse', 'Schalenfrüchte'] },
          { term: 'Krebstiere', points: 1.5, vi: 'Fisch, Krebstiere, Weichtiere (Mollusken), Lupinen, Schwefeldioxid/Sulfite', alt: ['Fisch', 'Weichtiere', 'Lupinen', 'Sulfite'] },
          { term: 'Klebereiweiß', points: 1.5, vi: 'Zöliakie: Bệnh tự miễn đường ruột với Klebereiweiß (Gluten) trong lúa mì/lúa mạch đen/lúa mạch', alt: ['Zöliakie', 'Dünndarm', 'Getreide'] },
          { term: 'Milchzucker', points: 1.5, vi: 'Laktoseintoleranz: Thiếu enzyme Laktase để phân giải đường sữa (Milchzucker / Laktose)', alt: ['Laktase', 'Enzym'] },
          { term: 'Buchweizen', points: 2.5, vi: 'Gợi ý: Glutenfrei = Mais-/Reis-/Buchweizenbrötchen, Obstsalat, Rührei, Käse/Aufschnitt tự nhiên; Laktosefrei = Laktosefreie Milch/Joghurt, Haferdrink, lang gereifter Hartkäse (Parmesan/Bergkäse), Brot mit Marmelade/Ei', alt: ['Mais', 'Hirse', 'Hartkäse', 'laktosefrei'] }
        ],
        musterloesungDe:
          'a) Die 14 kennzeichnungspflichtigen Hauptallergene nach LMIV:\n' +
          '1. Glutenhaltiges Getreide (Weizen, Roggen, Gerste, Hafer, Dinkel), 2. Krebstiere, 3. Eier, 4. Fische, 5. Erdnüsse, 6. Sojabohnen, 7. Milch (einschließlich Laktose), 8. Schalenfrüchte (Mandeln, Hasel-, Wal-, Cashewnüsse etc.), 9. Sellerie, 10. Senf, 11. Sesamsamen, 12. Schwefeldioxid und Sulfite (ab 10 mg/kg), 13. Lupinen, 14. Weichtiere (Schnecken, Muscheln, Tintenfisch).\n\n' +
          'b) Zöliakie vs. Laktoseintoleranz & Frühstücksempfehlung (IHK Winter 2024/25):\n' +
          '-Zöliakie (Glutenunverträglichkeit): Chronische Unverträglichkeit der Dünndarmschleimhaut gegenüber dem Klebereiweiß Gluten (in Weizen, Roggen, Gerste, Dinkel).\n' +
          '  3 glutenfreie Frühstückskomponenten: 1. Glutenfreie Brötchen (aus Mais, Reis oder Buchweizen) bzw. Hirse-/Quinoa-Porridge; 2. Rührei oder gekochtes Ei mit Natur-Schinken und Käse; 3. Frischer Obstsalat mit Naturjoghurt.\n' +
          '-Laktoseintoleranz (Milchzuckerunverträglichkeit): Mangel an dem Verdauungsenzym Laktase, wodurch Milchzucker (Laktose) nicht gespalten werden kann.\n' +
          '  3 laktosefreie Frühstückskomponenten: 1. Müsli mit Hafer-/Mandeldrink oder laktosefreiem Joghurt; 2. Brötchen mit Pflanzenmargarine, Konfitüre, Honig oder Schinken; 3. Lang gereifter Hartkäse (z. B. Emmentaler, Bergkäse, Parmesan – durch die lange Reifung von Natur aus laktosefrei!).',
        musterloesungVi:
          'a) 14 chất dị ứng LMIV: 1. Ngũ cốc chứa Gluten, 2. Giáp xác (Krebstiere), 3. Trứng, 4. Cá, 5. Lạc (Erdnüsse), 6. Đậu nành (Soja), 7. Sữa/Laktose, 8. Hạt vỏ cứng (Schalenfrüchte), 9. Cần tây (Sellerie), 10. Mù tạt (Senf), 11. Vừng (Sesam), 12. Sulfite/SO₂, 13. Đậu Lupinen, 14. Nhuyễn thể (Weichtiere).\n' +
          'b) Zöliakie là bệnh bất dung nạp protein kết dính Gluten trong lúa mì/lúa mạch; gợi ý sáng: Bánh mì ngô/gạo/kiều mạch (Buchweizen), trứng bác kèm thịt nguội/phô mai, salad trái cây sữa chua.\n' +
          'Laktoseintoleranz là thiếu enzyme Laktase tiêu hóa đường sữa; gợi ý sáng: Ngũ cốc với sữa yến mạch/sữa chua laktosefrei, bánh mì phết bơ thực vật/mứt/mật ong, phô mai cứng ủ lâu năm (Hartkäse tự nhiên không còn Laktose).',
        explanation: {
          whyCorrect: 'Giải quyết trọn vẹn câu hỏi LMIV trong KA3 LF6 và bảng tư vấn ăn sáng trong đề IHK Winter 2024/25.',
          whyWrong: 'Tưởng rằng người bị Laktoseintoleranz không ăn được mọi loại phô mai (thực tế Hartkäse ủ lâu đã chuyển hóa hết đường sữa thành axit lactic).',
          keyTakeaway: 'Ngũ cốc CÓ Gluten: Weizen, Dinkel, Roggen, Gerste, Grünkern. Ngũ cốc KHÔNG Gluten: Reis, Mais, Hirse, Quinoa, Amaranth, Buchweizen!'
        }
      },
      {
        id: 'lf6-q4',
        no: 4,
        lf: 'lf6',
        fach: 'bfk1',
        category: 'warenkunde',
        points: 10,
        title: 'Getrocknete Hülsenfrüchte (Phasin) & Getreidekunde (Kornaufbau & Mehltype)',
        questionDe: 'Hülsenfrüchte und Getreide sind wichtige pflanzliche Eiweiß- und Kohlenhydratlieferanten.\n' +
          'a) Beschreiben Sie die drei Schritte bei der Vorbereitung und dem Garen von getrockneten Hülsenfrüchten (z. B. Bohnen, Linsen, Erbsen) und erklären Sie, warum Bohnen niemals roh verzehrt werden dürfen.\n' +
          'b) Nennen Sie die drei Hauptbestandteile eines Getreidekorns mit ihren wichtigsten Inhaltsstoffen.\n' +
          'c) Was gibt die „Mehltype“ (z. B. Weizenmehl Type 405 vs. Type 1050) genau an?',
        questionVi: 'Các loại đậu khô và ngũ cốc là nguồn cung cấp đạm thực vật và tinh bột quan trọng.\n' +
          'a) Mô tả 3 bước sơ chế và nấu các loại đậu khô (Hülsenfrüchte: đậu hạt, đậu lăng, đậu Hà Lan) và giải thích tại sao tuyệt đối không được ăn đậu sống.\n' +
          'b) Nêu 3 thành phần cấu tạo chính của hạt ngũ cốc kèm các chất dinh dưỡng quan trọng nhất của từng phần.\n' +
          'c) Chỉ số „Mehltype“ (ví dụ bột mì Type 405 so với Type 1050) cho biết chính xác điều gì?',
        placeholderDe: 'a) 3 Schritte Hülsenfrüchte + Giftstoff Phasin...\nb) 3 Teile Getreidekorn: ...\nc) Definition Mehltype (Type 405 vs. 1050)...',
        hintDe: 'a) 1. Verlesen & Waschen, 2. Einweichen (8–12 h), 3. In ungesalzenem Wasser garen (Salz/Säure erst am Ende!). Giftstoff = Phasin. b) Schale/Frucht- & Samenschale (Ballaststoffe/Mineralstoffe), Mehlkörper (Stärke/Gluten), Keimling (Fett/Vitamin E). c) mg Mineralstoffe pro 100 g Trockenmasse.',
        hintVi: 'a) 1. Nhặt & rửa, 2. Ngâm nước 8–12h, 3. Nấu không bỏ muối/axit lúc đầu. Chất độc = Phasin. b) Vỏ cám (Chất xơ/Khoáng), Nội nhũ (Tinh bột/Đạm), Phôi mầm (Chất béo/Vitamin E). c) Số mg khoáng chất trong 100 g bột khô.',
        keywords: [
          { term: 'Einweichen', points: 1.5, vi: '3 bước: 1. Nhặt & rửa sạch (Verlesen & Waschen), 2. Ngâm nước lạnh 8–12 giờ (Einweichen), 3. Nấu chín mềm', alt: ['verlesen', 'einweichen'] },
          { term: 'erst am Ende salzen', points: 1.5, vi: 'Chỉ nêm muối và giấm/axit ở cuối quá trình nấu (nếu bỏ muối sớm vỏ đậu sẽ bị cứng, lâu mềm)', alt: ['ohne Salz garen', 'Säure erst am Schluss'] },
          { term: 'Phasin', points: 2, vi: 'Đậu sống chứa độc tố protein Phasin (gây ngộ độc, kết dính hồng cầu), bị phân hủy khi nấu sôi ≥ 15 phút', alt: ['Giftstoff', 'giftig', 'erhitzen'] },
          { term: 'Mehlkörper', points: 1.5, vi: 'Mehlkörper (Nội nhũ ~80 %): Chứa Stärke (tinh bột) và Klebereiweiß (Gluten)', alt: ['Stärke', 'Endosperm'] },
          { term: 'Keimling', points: 1.5, vi: 'Keimling (Phôi mầm): Chứa Fett (dầu thực vật), Vitamin E & B; Frucht-/Samenschale (Vỏ cám): Chứa Ballaststoffe & Mineralstoffe', alt: ['Samenschale', 'Ballaststoffe', 'Vitamin E'] },
          { term: 'Mineralstoffgehalt', points: 2, vi: 'Mehltype cho biết bao nhiêu miligam (mg) chất khoáng (Mineralstoffe) còn lại khi đốt cháy 100 g bột khô (Type 405 = 405 mg)', alt: ['100 g Mehl', 'Milligramm Mineralstoffe', '405 mg'] }
        ],
        musterloesungDe:
          'a) Vorbereitung & Garen getrockneter Hülsenfrüchte + Phasin:\n' +
          '1. Verlesen und Waschen (Steinchen, beschädigte Kerne aussortieren und kalt abspülen).\n' +
          '2. Einweichen: Ca. 8–12 Stunden in reichlich kaltem Wasser quellen lassen (verkürzt die Garzeit drastisch; Ausnahme: geschälte/rote Linsen).\n' +
          '3. Garen: Im Einweichwasser (oder frischem Wasser) langsam weichkochen. Wichtig: Salz und Säure (Essig/Wein) erst am Ende der Garzeit zugeben, da die Schale sonst hart bleibt!\n' +
          '-Warum nicht roh verzehren? Rohe Hülsenfrüchte (besonders Bohnen) enthalten die giftige Eiweißverbindung Phasin (Lektin), die rote Blutkörperchen verklumpt und zu Magen-Darm-Vergiftungen führt. Durch mindestens 15-minütiges Kochen wird Phasin zerstört.\n\n' +
          'b) Drei Hauptbestandteile des Getreidekorns:\n' +
          '1. Frucht- und Samenschale (mit Aleuronschicht): Reich an Ballaststoffen, Mineralstoffen und B-Vitaminen.\n' +
          '2. Mehlkörper (ca. 80 % des Korns): Besteht hauptsächlich aus Stärke (Kohlenhydraten) und Klebereiweiß (Gluten).\n' +
          '3. Keimling: Reich an hochwertigem Fett (ungesättigten Fettsäuren), Eiweiß sowie Vitamin E und B1.\n\n' +
          'c) Bedeutung der Mehltype:\n' +
          'Die Mehltype gibt an, wie viel Milligramm (mg) Mineralstoffe in 100 Gramm wasserfreiem Mehl enthalten sind (ermittelt durch Verbrennen einer Mehlprobe). Beispiel: Weizenmehl Type 405 enthält ca. 405 mg Mineralstoffe pro 100 g (helles Backmehl, fast nur Mehlkörper); Type 1050 enthält ca. 1.050 mg Mineralstoffe (dunkler, höherer Schalenanteil, mehr Ballaststoffe).',
        musterloesungVi:
          'a) 3 bước nấu đậu khô: 1. Nhặt bỏ sạn/hạt hỏng và rửa sạch; 2. Ngâm nước lạnh 8–12 tiếng để hạt nở mềm; 3. Ninh chín mềm (lưu ý: chỉ cho muối và giấm vào lúc cuối, nếu cho sớm vỏ đậu sẽ bị chai cứng). Đậu sống chứa độc tố Phasin gây ngộ độc và kết tụ hồng cầu; nấu sôi ít nhất 15 phút sẽ phá hủy Phasin.\n' +
          'b) 3 phần hạt ngũ cốc: 1. Vỏ cám (Frucht-/Samenschale): giàu chất xơ, khoáng chất, vitamin B; 2. Nội nhũ (Mehlkörper): chứa tinh bột và Gluten; 3. Phôi mầm (Keimling): giàu chất béo không bão hòa và Vitamin E.\n' +
          'c) Mehltype cho biết số miligam (mg) khoáng chất có trong 100 g bột khô (Type 405 = 405 mg khoáng chất/100 g bột trắng mịn; Type 1050 = 1.050 mg khoáng chất, nhiều vỏ cám và chất xơ hơn).',
        explanation: {
          whyCorrect: 'Đây là toàn bộ nội dung cốt lõi của Klassenarbeit Nr. 4 (LF6: Hülsenfrüchte & Getreide).',
          whyWrong: 'Bỏ muối ngay từ đầu khi ninh đậu khô hoặc nhầm Mehltype là hàm lượng tinh bột.',
          keyTakeaway: 'Số Mehltype càng CAO → Bột càng SẪM MÀU → Càng giàu KHOÁNG CHẤT & CHẤT XƠ (Vollkornmehl không có số Type vì giữ nguyên 100% hạt).'
        }
      },
      {
        id: 'lf6-q5',
        no: 5,
        lf: 'lf6',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Speise- & Getränkekarte gestalten, Menüregeln & Fehleranalyse (IHK Winter 23/24)',
        questionDe: 'Die Speise- und Getränkekarte ist die Visitenkarte des Restaurants.\n' +
          'a) Nennen Sie die richtige Reihenfolge der Speisengruppen beim Aufbau einer klassischen Speisekarte.\n' +
          'b) Nennen Sie fünf klassische Regeln zur Zusammenstellung eines mehrgängigen Menüs.\n' +
          'c) Welche Pflichtangaben müssen auf einer Getränkekarte stehen (nennen Sie 5 mögliche Fehler bei einer mangelhaften Getränkekarte gemäß IHK Winter 2023/24)?',
        questionVi: 'Thực đơn món ăn và đồ uống là tấm danh thiếp của nhà hàng.\n' +
          'a) Nêu thứ tự sắp xếp chuẩn của các nhóm món ăn khi thiết kế một cuốn Speisekarte cổ điển.\n' +
          'b) Nêu 5 quy tắc cổ điển khi xây dựng một thực đơn nhiều món (Menüregeln).\n' +
          'c) Những thông tin bắt buộc nào phải có trên Getränkekarte (nêu 5 lỗi sai thường gặp trên thực đơn đồ uống theo đề IHK Winter 2023/24)?',
        placeholderDe: 'a) Reihenfolge Speisekarte: ...\nb) 5 Menüregeln: ...\nc) Pflichtangaben / 5 typische Fehler auf der Getränkekarte...',
        hintDe: 'a) Kalte Vorspeisen -> Suppen -> Warme Vorspeisen -> Fisch -> Fleisch -> Vegetarisch -> Käse -> Dessert. b) Keine Wiederholung von Zutaten/Farben/Garmethoden, von leicht nach schwer. c) Mengenangabe (l/cl), Endpreis inkl. MwSt., Allergene/Zusatzstoffe, Rechtschreibung, Alkoholgehalt/Jugendschutz.',
        hintVi: 'a) Khai vị lạnh → Súp → Khai vị nóng → Cá → Thịt → Món chay → Phô mai → Tráng miệng. b) Không lặp nguyên liệu/màu sắc/cách nấu, đi từ nhẹ đến đậm. c) Dung tích (l/cl), giá cuối gồm thuế, chất dị ứng/phụ gia, chính tả.',
        keywords: [
          { term: 'Kalte Vorspeisen', points: 1.5, vi: 'Thứ tự: Kalte Vorspeisen → Suppen → Warme Vorspeisen/Zwischengerichte → Fisch → Fleisch/Geflügel/Wild → Vegetarisch → Käse → Desserts', alt: ['Suppen', 'Warme Vorspeisen', 'Desserts'] },
          { term: 'Wiederholung', points: 2, vi: 'Menüregeln: Không lặp lại nguyên liệu chính, màu sắc, phương pháp chế biến (Garmethoden) và từ ngữ giữa các món', alt: ['keine Wiederholungen', 'Garmethode', 'Farben'] },
          { term: 'leicht nach schwer', points: 1.5, vi: 'Đi từ món nhẹ đến món đậm vị (von leicht/mild nach kräftig) và phù hợp mùa vụ (Saison)', alt: ['Steigerung', 'saisonal'] },
          { term: 'Mengenangabe', points: 2, vi: 'Lỗi Getränkekarte 1 & 2: Thiếu định lượng dung tích (Füllmenge z. B. 0,2 l / 0,5 l) hoặc thiếu đơn vị tiền tệ / giá đã gồm thuế (€ inkl. MwSt.)', alt: ['Füllmenge', 'Literangabe', 'Preisangabe'] },
          { term: 'Zusatzstoffe', points: 1.5, vi: 'Lỗi 3 & 4: Thiếu chú thích chất phụ gia & chất dị ứng (Koffein, Chinin, Farbstoff, Sulfite bei Wein)', alt: ['Allergene', 'Sulfite', 'Koffein'] },
          { term: 'Wahrheit und Klarheit', points: 1.5, vi: 'Lỗi 5: Sai chính tả, xếp lộn nhóm đồ uống (cồn lẫn không cồn) hoặc vi phạm nguyên tắc Wahrheit und Klarheit', alt: ['Rechtschreibfehler', 'Reihenfolge', 'Alkoholfreie Getränke'] }
        ],
        musterloesungDe:
          'a) Klassische Reihenfolge der Speisengruppen in der Speisekarte:\n' +
          '1. Tagesempfehlung / Aktionsmenü → 2. Kalte Vorspeisen & Salate → 3. Suppen → 4. Warme Vorspeisen & Zwischengerichte → 5. Fischgerichte → 6. Fleisch-, Geflügel- und Wildgerichte (Standards, Spezialitäten) → 7. Vegetarische & Vegane Hauptgerichte → 8. Regionale/Kleine Gerichte → 9. Käse & Desserts.\n\n' +
          'b) Fünf klassische Menüregeln:\n' +
          '1. Keine Wiederholung von Hauptzutaten, Beilagen oder Saucen innerhalb der Menüfolge.\n' +
          '2. Abwechslung bei den Garmethoden (nicht zwei frittierte oder zwei geschmorte Gänge hintereinander).\n' +
          '3. Abwechslung bei Farben, Konsistenzen und Formen auf dem Teller.\n' +
          '4. Geschmackssteigerung von leicht/zart zu würzig/kräftig und zum Abschluss süß/fruchtig.\n' +
          '5. Berücksichtigung von Saison, Anlass, Tageszeit und Preisrahmen.\n\n' +
          'c) Pflichtangaben & 5 typische Fehler auf einer Getränkekarte (IHK Winter 2023/24):\n' +
          '1. Fehlende Mengenangabe / Schankmaß (z. B. 0,2 l, 0,33 l, 2 cl oder 4 cl bei Spirituosen nach Preisangabenverordnung).\n' +
          '2. Fehlende Kennzeichnung von Zusatzstoffen und Allergenen (z. B. „koffeinhaltig“ bei Cola, „chininhaltig“ bei Tonic Water, „enthält Sulfite“ beim Wein).\n' +
          '3. Fehlender Hinweis „Alle Preise in Euro inklusive gesetzlicher Mehrwertsteuer und Bedienungsgeld“.\n' +
          '4. Falsche Gruppierung (z. B. alkoholhaltige Getränke stehen unter „Alkoholfreie Getränke“ oder Weine ohne Herkunfts-/Qualitätsangabe).\n' +
          '5. Rechtschreibfehler, unleserliche Schrift oder Verstoß gegen den Grundsatz „Kartenwahrheit und Kartenklarheit“.',
        musterloesungVi:
          'a) Thứ tự Speisekarte: Món đặc biệt trong ngày → Khai vị lạnh & Salad → Súp → Khai vị nóng → Món cá → Món thịt/gia cầm/thú rừng → Món chính chay → Phô mai & Tráng miệng.\n' +
          'b) 5 quy tắc lên thực đơn (Menüregeln): 1. Không lặp lại nguyên liệu và món ăn kèm; 2. Đa dạng phương pháp nấu; 3. Đa dạng màu sắc và kết cấu; 4. Hương vị tăng dần từ thanh nhẹ đến đậm đà; 5. Phù hợp mùa vụ và dịp lễ.\n' +
          'c) 5 lỗi sai trên Getränkekarte (Đề IHK Winter 2023/24): 1. Thiếu dung tích định lượng (0,2 l / 4 cl); 2. Thiếu ký hiệu phụ gia & chất dị ứng (Koffein, Chinin, Sulfite); 3. Thiếu dòng ghi chú giá đã bao gồm thuế MwSt.; 4. Xếp nhầm đồ uống có cồn vào mục không cồn hoặc thiếu xuất xứ rượu vang; 5. Lỗi chính tả hoặc ghi sai bản chất sản phẩm.',
        explanation: {
          whyCorrect: 'Bao quát trọn vẹn kiến thức KA5 LF6 (Speisekarten & Menüregeln) và bài tìm 8 lỗi Getränkekarte trong đề IHK Winter 2023/24.',
          whyWrong: 'Quên quy định bắt buộc của Preisangabenverordnung (PAngV): Mọi đồ uống bán theo ly phải ghi rõ dung tích (Schankmaß) và tổng giá cuối cùng (Endpreis).',
          keyTakeaway: 'Nguyên tắc tối thượng của thực đơn: „Kartenwahrheit und Kartenklarheit“ + Đủ 3 yếu tố: Tên chuẩn + Định lượng (l/cl) + Giá cuối inkl. MwSt. + Mã Allergene!'
        }
      }
    ],

    /* ========================================================================
       LF 9: IN DER SYSTEMGASTRONOMIE ARBEITEN, ZAHLUNGSVORGÄNGE & RECHT
       ======================================================================== */
    lf9: [
      {
        id: 'lf9-q1',
        no: 1,
        lf: 'lf9',
        fach: 'bfk1',
        category: 'praxis',
        points: 10,
        title: 'Systemgastronomie: Merkmale, Quickservice vs. Fullservice & Zahlungsmittel',
        questionDe: 'Die Systemgastronomie wächst stetig.\n' +
          'a) Nennen Sie vier zentrale Merkmale der Systemgastronomie im Unterschied zur Individualgastronomie.\n' +
          'b) Unterscheiden Sie „Quickservice“ und „Fullservice“ in der Systemgastronomie mit je zwei Beispielen.\n' +
          'c) Vergleichen Sie Barzahlung und kartengestützte Zahlung (Debit-/Kreditkarte, Contactless) mit jeweils zwei Vor- und Nachteilen aus Sicht des Betriebs.',
        questionVi: 'Ngành chuỗi nhà hàng hệ thống (Systemgastronomie) ngày càng phát triển mạnh.\n' +
          'a) Nêu 4 đặc điểm cốt lõi của Systemgastronomie so với nhà hàng truyền thống đơn lẻ (Individualgastronomie).\n' +
          'b) Phân biệt „Quickservice“ và „Fullservice“ trong Systemgastronomie kèm 2 ví dụ mỗi loại.\n' +
          'c) So sánh thanh toán tiền mặt (Barzahlung) và thanh toán thẻ/không chạm (Kartenzahlung) với 2 ưu điểm và 2 nhược điểm mỗi hình thức dưới góc độ nhà hàng.',
        placeholderDe: 'a) 4 Merkmale Systemgastronomie: ...\nb) Quickservice vs. Fullservice: ...\nc) Barzahlung vs. Kartenzahlung (Vor-/Nachteile): ...',
        hintDe: 'a) Standardisierung, Multiplizierbarkeit (Filialen/Franchise), zentraler Einkauf, einheitliches Erscheinungsbild. b) Quick = Counter/SB (McDonald’s, Subway); Full = Tischservice (L’Osteria, Block House).',
        hintVi: 'a) Tiêu chuẩn hóa, Nhân bản chuỗi/Franchise, Mua hàng tập trung, Nhận diện thương hiệu đồng nhất. b) Quick = Quầy tự phục vụ (McDonald’s); Full = Phục vụ tại bàn (L’Osteria, Block House).',
        keywords: [
          { term: 'Standardisierung', points: 1.5, vi: 'Tiêu chuẩn hóa tuyệt đối công thức, quy trình và chất lượng (Standardisierung aller Abläufe & Rezepturen)', alt: ['standardisierte Prozesse', 'Rezepturen'] },
          { term: 'Multiplizierbarkeit', points: 1.5, vi: 'Nhân bản mô hình qua nhiều chi nhánh/Franchise và mua hàng tập trung (Zentraleinkauf)', alt: ['Filialen', 'Franchise', 'Zentraleinkauf'] },
          { term: 'Quickservice', points: 1.5, vi: 'Quickservice (Fast Food / Counter-Service, tự phục vụ: McDonald’s, Burger King, Nordsee) vs. Fullservice (Casual Dining phục vụ tại bàn: Block House, L’Osteria, Vapiano/Hans im Glück)', alt: ['Fullservice', 'Selbstbedienung', 'Tischservice'] },
          { term: 'Transaktionsgebühren', points: 2, vi: 'Thẻ: Ưu = Nhanh, không sợ tiền giả/chênh lệch két, khách chi tiêu nhiều hơn; Nhược = Tốn phí giao dịch (Transaktionsgebühren) & phụ thuộc mạng/kỹ thuật', alt: ['Gebühren', 'kein Falschgeld', 'Kassendifferenz'] },
          { term: 'Falschgeld', points: 2, vi: 'Tiền mặt: Ưu = Có tiền ngay (sofortige Liquidität), không mất phí quẹt thẻ; Nhược = Rủi ro tiền giả (Falschgeld), mất cắp, tốn thời gian đếm tiền Kassensturz', alt: ['Liquidität', 'Zählaufwand', 'Diebstahlrisiko'] },
          { term: 'einheitliches Konzept', points: 1.5, vi: 'Nhận diện thương hiệu đồng nhất (Corporate Identity: Logo, trang phục, thiết kế nội thất)', alt: ['Corporate Identity', 'Erscheinungsbild'] }
        ],
        musterloesungDe:
          'a) Vier Merkmale der Systemgastronomie:\n' +
          '1. Strikte Standardisierung von Produkten, Rezepturen und Arbeitsabläufen (Handbücher).\n' +
          '2. Multiplizierbarkeit des Konzepts (viele Filialen im Eigenbetrieb oder Franchise-System).\n' +
          '3. Zentralisierte Steuerung (Zentraleinkauf, zentrales Marketing, Kostenkontrolle).\n' +
          '4. Einheitliches Erscheinungsbild (Corporate Identity: Logo, Einrichtung, Berufskleidung).\n\n' +
          'b) Quickservice vs. Fullservice:\n' +
          '-Quickservice-Systemgastronomie: Bestellung, Bezahlung und Speisenausgabe erfolgen am Counter (Theke) in Selbstbedienung; kurze Verweildauer (z. B. McDonald’s, Burger King, Subway, KFC).\n' +
          '-Fullservice-Systemgastronomie (Casual Dining): Gäste werden am Tisch platziert, bedient und zahlen am Platz; längere Verweildauer (z. B. Block House, L’Osteria, Maredo, Hans im Glück).\n\n' +
          'c) Barzahlung vs. Kartenzahlung (aus Betriebssicht):\n' +
          '-Barzahlung: Vorteile = Sofortige Liquidität, keine Bank-Transaktionsgebühren, unabhängig von Internet/Technik. Nachteile = Risiko von Falschgeld, Diebstahl/Überfall und Rechenfehlern, hoher Zeitaufwand für Kassensturz und Bankeinzahlung.\n' +
          '-Kartenzahlung (Debit-/Kreditkarte): Vorteile = Kein Falschgeld- oder Diebstahlrisiko, keine Zähldifferenzen, hygienisch und schnell (kontaktlos), höhere Durchschnittsbons. Nachteile = Transaktions- und Terminalgebühren für den Betrieb, Abhängigkeit von Strom und Internetverbindung.',
        musterloesungVi:
          'a) 4 đặc trưng Systemgastronomie: 1. Tiêu chuẩn hóa công thức và quy trình; 2. Nhân bản chuỗi chi nhánh / nhượng quyền (Franchise); 3. Quản trị và mua hàng tập trung (Zentraleinkauf); 4. Nhận diện thương hiệu đồng nhất (Corporate Identity).\n' +
          'b) Quickservice: Khách đặt, trả tiền và nhận đồ tại quầy tự phục vụ (McDonald’s, Subway). Fullservice: Phục vụ trọn gói tại bàn theo chuẩn hệ thống (Block House, L’Osteria).\n' +
          'c) Tiền mặt: Ưu = Tiền về tay ngay, không tốn phí giao dịch ngân hàng; Nhược = Rủi ro tiền giả, nhầm tiền thối, tốn công kiểm két. Thẻ/Không chạm: Ưu = Nhanh, an toàn, không sợ tiền giả/lệch két; Nhược = Mất phí giao dịch trên mỗi hóa đơn và phụ thuộc đường truyền mạng.',
        explanation: {
          whyCorrect: 'Phân tích đầy đủ kiến thức cốt lõi của Klassenarbeit Nr. 4 (LF9: Systemgastronomie & Zahlungsarten).',
          whyWrong: 'Nghĩ rằng Systemgastronomie chỉ có Fast Food (thực tế Fullservice như Block House hay L’Osteria cũng là Systemgastronomie).',
          keyTakeaway: '4 trụ cột của Systemgastronomie: Standardisierung – Multiplizierbarkeit – Zentralisierung – Corporate Identity!'
        }
      },
      {
        id: 'lf9-q2',
        no: 2,
        lf: 'lf9',
        fach: 'bfk1',
        category: 'recht',
        points: 10,
        title: 'Belegausgabepflicht (TSE), X-Bon vs. Z-Bon, Kassensturz & Kassenkontrolle',
        questionDe: 'Beim Kassieren und beim täglichen Kassenabschluss gelten strenge steuerrechtliche Vorgaben.\n' +
          'a) Was besagt die gesetzliche Belegausgabepflicht (seit 01.01.2020), wofür steht „TSE“ und welche sechs Pflichtangaben müssen auf einem Kassenbon (und einem Bewirtungsbeleg) stehen?\n' +
          'b) Unterscheiden Sie den „X-Bon“ vom „Z-Bon“ und beschreiben Sie den Kassensturz in 4 Schritten.\n' +
          'c) Kassenbildschirm-Kontrolle (IHK Sommer 2024): Worauf müssen Sie vor dem Ausdrucken der Gastrechnung auf dem Kassenbildschirm achten (nennen Sie 4 typische Bonierfehler)?',
        questionVi: 'Khi thu ngân và kết toán két cuối ngày phải tuân thủ nghiêm ngặt quy định thuế.\n' +
          'a) Quy định bắt buộc xuất hóa đơn (Belegausgabepflicht từ 01.01.2020) yêu cầu gì, „TSE“ là viết tắt của từ gì và 6 thông tin bắt buộc trên hóa đơn (và Bewirtungsbeleg) là gì?\n' +
          'b) Phân biệt „X-Bon“ với „Z-Bon“ và mô tả quy trình kiểm két (Kassensturz) trong 4 bước.\n' +
          'c) Kiểm tra màn hình thu ngân (IHK Sommer 2024): Trước khi in hóa đơn cho khách, bạn phải kiểm tra những gì trên màn hình máy tính tiền (nêu 4 lỗi nhập đơn thường gặp)?',
        placeholderDe: 'a) Belegausgabepflicht + TSE + 6 Pflichtangaben...\nb) X-Bon vs. Z-Bon + 4 Schritte Kassensturz...\nc) 4 typische Fehler auf dem Kassenbildschirm...',
        hintDe: 'a) TSE = Technische Sicherheitseinrichtung. b) X-Bon = Zwischenbericht (nullt nicht), Z-Bon = Tagesabschluss (setzt Umsatz auf 0). c) Kassensturz: Ist-Bestand zählen -> Wechselgeld abziehen -> mit Soll laut Z-Bon vergleichen -> Differenz dokumentieren.',
        hintVi: 'a) TSE = Technische Sicherheitseinrichtung. b) X-Bon = Báo cáo tạm (không đưa doanh thu về 0), Z-Bon = Chốt sổ cuối ngày (đưa về 0). c) Kiểm két: Đếm tiền thực tế (Ist) → Trừ tiền lẻ đầu ca → Đối chiếu doanh thu máy (Soll) → Ghi biên bản.',
        keywords: [
          { term: 'Technische Sicherheitseinrichtung', points: 1.5, vi: 'TSE = Technische Sicherheitseinrichtung (chống can thiệp/xóa doanh thu); bắt buộc xuất bon cho mọi giao dịch từ 01.01.2020', alt: ['TSE-Signatur', 'Manipulation'] },
          { term: 'Pflichtangaben', points: 1.5, vi: '6 thông tin bắt buộc: Tên & địa chỉ nhà hàng, Ngày giờ xuất, Số lượng & tên món, Tổng tiền & thuế suất USt (7 % / 19 %), Số seri giao dịch & mã TSE (Bewirtungsbeleg thêm Anlass & Teilnehmer)', alt: ['Steuersatz', 'Seriennummer', 'Bewirtungsbeleg'] },
          { term: 'X-Bon', points: 1.5, vi: 'X-Bon: Báo cáo doanh thu tạm thời giữa ca (Zwischenabrechnung), KHÔNG xóa bộ đếm về 0', alt: ['Zwischenbericht', 'Zwischenstand'] },
          { term: 'Z-Bon', points: 1.5, vi: 'Z-Bon: Báo cáo chốt sổ cuối ngày (Tagesabschlussbon), đưa bộ đếm doanh thu ngày về 0 và lưu vĩnh viễn cho Sở thuế', alt: ['Tagesabschluss', 'nullt die Kasse', 'Finanzamt'] },
          { term: 'Ist-Bestand', points: 2, vi: 'Kassensturz 4 bước: 1. Đếm toàn bộ tiền mặt thực tế (Ist-Bestand); 2. Trừ tiền lẻ đầu ca (Wechselgeld); 3. So sánh với doanh thu tiền mặt trên Z-Bon (Soll-Bestand); 4. Ghi Kassenbericht & nộp két sắt', alt: ['Soll-Bestand', 'Wechselgeld', 'Kassendifferenz'] },
          { term: 'Tischnummer', points: 2, vi: 'Lỗi màn hình thu ngân (IHK Sommer 2024): Sai số bàn (Tischnummer), sai số lượng món (z. B. 3 statt 2), quên tính món hoặc nhập nhầm món của bàn khác, sai cỡ đồ uống (0,5 l statt 0,3 l)', alt: ['falsche Anzahl', 'vergessene Posten', 'Größe'] }
        ],
        musterloesungDe:
          'a) Belegausgabepflicht, TSE & Pflichtangaben:\n' +
          '-Seit dem 01.01.2020 muss bei jedem Geschäftsvorfall zwingend ein Beleg (Papierbon oder digital per QR-Code) erstellt und dem Gast angeboten werden.\n' +
          '-TSE = Technische Sicherheitseinrichtung (schützt Kassendaten lückenlos vor nachträglicher Manipulation).\n' +
          '-Sechs Pflichtangaben auf dem Kassenbon: 1. Vollständiger Name und Anschrift des Betriebs; 2. Ausstellungsdatum sowie Start-/Endzeitpunkt; 3. Menge und Art der gelieferten Speisen/Getränke; 4. Entgelt, Steuerbetrag und Steuersatz (7 % / 19 %); 5. Transaktionsnummer; 6. Seriennummer des Kassensystems und TSE-Prüfwert. (Bei einem Bewirtungsbeleg zusätzlich: Anlass der Bewirtung, Namen aller Teilnehmer, Ort/Datum und Unterschrift des Gastgebers).\n\n' +
          'b) X-Bon vs. Z-Bon & Kassensturz in 4 Schritten:\n' +
          '-X-Bon: Informativer Zwischenstand des Umsatzes (z. B. bei Schichtwechsel); der Kassenspeicher wird NICHT auf null gesetzt.\n' +
          '-Z-Bon: Offizieller Tagesabschlussbericht am Ende des Geschäftstages; setzt den Tagesumsatzspeicher auf null und ist steuerrechtlich relevant.\n' +
          '-Kassensturz (4 Schritte): 1. Gesamtes Bargeld in der Schublade zählen (Ist-Bestand); 2. Anfangsbestand (Wechselgeld/Kassenstock) abziehen = Bar-Tageseinnahmen; 3. Mit dem Soll-Bestand laut Z-Bon abgleichen und eventuelle Kassendifferenz (Manko/Überschuss) prüfen; 4. Im Kassenbericht protokollieren, unterschreiben und Tageslosung im Tresor einschließen.\n\n' +
          'c) Kontrolle des Kassenbildschirms (IHK Sommer 2024):\n' +
          'Typische Fehler beim Abgleich Bestellung vs. Bildschirm: 1. Falsche Tischnummer ausgewählt; 2. Falsche Artikelanzahl boniert (z. B. 4 statt 2 Getränke); 3. Falsche Portions-/Gebindegröße (z. B. 0,5 l statt 0,3 l Bier); 4. Ein bestelltes Gericht/Getränk wurde vergessen zu bonieren oder ein fremder Posten steht auf dem Tisch.',
        musterloesungVi:
          'a) Từ 01.01.2020 bắt buộc xuất hóa đơn cho mọi giao dịch. TSE = Technische Sicherheitseinrichtung (thiết bị bảo mật chống sửa/xóa doanh thu). 6 thông tin bắt buộc: Tên & địa chỉ quán, Ngày giờ, Số lượng & tên món, Tổng tiền & thuế suất 7%/19%, Số giao dịch, Số seri máy & mã TSE.\n' +
          'b) X-Bon là báo cáo tạm giữa ca (không xóa doanh thu về 0); Z-Bon là báo cáo chốt ngày (đưa bộ đếm ngày về 0). 4 bước Kassensturz: 1. Đếm tổng tiền thực tế (Ist-Bestand); 2. Trừ tiền lẻ đầu ca (Wechselgeld); 3. Đối chiếu với số Soll trên Z-Bon để tìm chênh lệch; 4. Ghi biên bản Kassenbericht và cất két sắt.\n' +
          'c) 4 lỗi trên màn hình thu ngân (IHK Sommer 2024): Chọn nhầm số bàn, nhập sai số lượng món, chọn sai dung tích ly (0,5 l thay vì 0,3 l), sót món chưa nhập hoặc dính món của bàn khác.',
        explanation: {
          whyCorrect: 'Kết hợp kiến thức KA4/KA5 LF9 với câu hỏi thực hành kiểm tra màn hình Kasse trong đề IHK Sommer 2024.',
          whyWrong: 'Bấm nhầm Z-Bon giữa trưa khi mới đổi ca (sẽ làm chốt sổ ngày sớm) hoặc quên trừ Wechselgeld khi tính doanh thu tiền mặt.',
          keyTakeaway: 'Công thức Kassensturz: Bar-Umsatz (Ist) = Gezähltes Bargeld - Wechselgeld. So sánh với Bar-Umsatz (Soll) trên Z-Bon!'
        }
      },
      {
        id: 'lf9-q3',
        no: 3,
        lf: 'lf9',
        fach: 'bfk1',
        category: 'rechnen',
        points: 10,
        title: 'Umsatzsteuer in der Gastronomie (7 % vs. 19 %), Netto-Rechnung & Trinkgeld',
        questionDe: 'In der Gastronomie gelten unterschiedliche Umsatzsteuersätze.\n' +
          'a) Erklären Sie, wann der ermäßigte Steuersatz von 7 % und wann der Regelsteuersatz von 19 % angewendet wird (inkl. Außer-Haus-Verkauf vs. Verzehr im Restaurant).\n' +
          'b) Fachrechnen (IHK Sommer 2025): Ein 3-Gänge-Menü inklusive Getränkepauschale kostet im Restaurant 39,00 € brutto pro Person (19 % USt). Berechnen Sie den Nettobetrag und den enthaltenen Umsatzsteuerbetrag in Euro (auf 2 Dezimalstellen gerundet).\n' +
          'c) Wie wird das freiwillige Trinkgeld steuerrechtlich behandelt, wenn der Gast es direkt dem Arbeitnehmer (Servicekraft) gibt vs. wenn es an den Unternehmer (Chef) geht?',
        questionVi: 'Trong ngành nhà hàng áp dụng hai mức thuế giá trị gia tăng (Umsatzsteuer) khác nhau.\n' +
          'a) Giải thích khi nào áp dụng mức thuế ưu đãi 7 % và khi nào áp dụng mức thuế chuẩn 19 % (bao gồm bán mang về Außer-Haus so với ăn tại chỗ Im-Haus).\n' +
          'b) Tính toán (IHK Sommer 2025): Một suất thực đơn 3 món trọn gói đồ uống tại nhà hàng có giá 39,00 € Brutto/người (thuế 19 %). Hãy tính số tiền Netto và số tiền thuế USt nằm trong đó (làm tròn 2 chữ số thập phân).\n' +
          'c) Tiền tip tự nguyện (Trinkgeld) được xử lý thuế như thế nào khi khách đưa cho nhân viên phục vụ so với khi đưa cho chủ doanh nghiệp?',
        placeholderDe: 'a) 7 % vs. 19 % USt: ...\nb) Rechnung 39,00 € Brutto (119 %) -> Netto (100 %) = ... / USt (19 %) = ...\nc) Trinkgeld Arbeitnehmer (§ 3 Nr. 51 EStG) vs. Arbeitgeber...',
        hintDe: 'b) Achtung: Brutto = 119 %! Netto = 39,00 € ÷ 1,19 = 32,77 €. USt = 39,00 € - 32,77 € = 6,23 €. c) Arbeitnehmer = steuerfrei (§ 3 Nr. 51 EStG); Unternehmer = steuerpflichtige Betriebseinnahme.',
        hintVi: 'b) Chú ý bẫy: Giá Brutto = 119 %! Netto = 39,00 € ÷ 1,19 = 32,77 €; Thuế USt = 39,00 - 32,77 = 6,23 €. c) Nhân viên nhận = miễn thuế 100%; Chủ quán nhận = phải đóng thuế.',
        keywords: [
          { term: '19 %', points: 1.5, vi: '19 % Regelsteuersatz: Mọi đồ uống (trừ sữa/nước máy), mọi món ăn dùng tại bàn nhà hàng (Im-Haus-Verzehr) và các món xa xỉ (Hummer, Kaviar, Austern)', alt: ['Im-Haus', 'Getränke', 'Regelsteuersatz'] },
          { term: '7 %', points: 1.5, vi: '7 % ermäßigter Steuersatz: Món ăn cơ bản mua mang về (Außer-Haus / Take-away / Lieferung không kèm dịch vụ bàn) và sữa (Milchmischgetränke ≥ 75 % Milch)', alt: ['Außer-Haus', 'Take-away', 'ermäßigter Steuersatz'] },
          { term: '119', points: 1, vi: 'Giá Brutto ứng với 119 % (chia cho 1,19 chứ không phải nhân 19 %!)', alt: ['1,19', ': 119'] },
          { term: '32,77', points: 2, vi: 'Nettobetrag (100 %) = 39,00 € ÷ 1,19 = 32,77 €', alt: ['32.77'] },
          { term: '6,23', points: 2, vi: 'Umsatzsteuer (19 %) = 39,00 € - 32,77 € = 6,23 €', alt: ['6.23'] },
          { term: 'steuerfrei', points: 2, vi: 'Trinkgeld: Khách thưởng tự nguyện cho nhân viên (Arbeitnehmer) = miễn thuế hoàn toàn (§ 3 Nr. 51 EStG); cho chủ quán (Unternehmer) = tính vào doanh thu chịu thuế USt & ESt', alt: ['3 Nr. 51 EStG', 'steuerpflichtig', 'Unternehmer'] }
        ],
        musterloesungDe:
          'a) Umsatzsteuersätze 7 % vs. 19 %:\n' +
          '-19 % (Regelsteuersatz): Gilt für den Verzehr von Speisen im Restaurant (Im-Haus / Restaurationsleistung mit Sitzplatz & Geschirr), für sämtliche Getränke (auch To-go, außer Leitungswasser und Milchmischgetränke mit mind. 75 % Milchanteil) sowie für Luxuslebensmittel (Hummer, Austern, Kaviar).\n' +
          '-7 % (ermäßigter Steuersatz): Gilt für Grundnahrungsmittel und Speisen im Außer-Haus-Verkauf (Take-away, Lieferservice ohne Serviceleistung/Geschirrgestellung).\n\n' +
          'b) Berechnung aus 39,00 € Brutto (IHK Sommer 2025):\n' +
          '-Da im Bruttopreis die 19 % USt bereits enthalten sind, entspricht 39,00 € = 119 %.\n' +
          '-Nettobetrag (100 %) = 39,00 € ÷ 1,19 (bzw. ÷ 119 × 100) = 32,77 €.\n' +
          '-Enthaltene Umsatzsteuer (19 %) = 39,00 € - 32,77 € = 6,23 €.\n\n' +
          'c) Steuerliche Behandlung von Trinkgeld:\n' +
          '-Trinkgeld an Arbeitnehmer (Servicekraft): Nach § 3 Nr. 51 EStG komplett einkommensteuer- und sozialversicherungsfrei, sofern es der Gast freiwillig und persönlich zahlt.\n' +
          '-Trinkgeld an den Arbeitgeber / Einzelunternehmer: Gilt als reguläre Betriebseinnahme und unterliegt voll der Umsatzsteuer und Einkommensteuer.',
        musterloesungVi:
          'a) Thuế 19 %: Áp dụng cho món ăn phục vụ tại chỗ trong nhà hàng (Im-Haus), mọi loại đồ uống (trừ nước máy và đồ uống ≥ 75 % sữa) và thực phẩm xa xỉ (tôm hùm, hàu, trứng cá tầm). Thuế 7 %: Áp dụng cho đồ ăn mua mang về (Außer-Haus / Take-away).\n' +
          'b) Tính thuế từ giá 39,00 € Brutto (119 %): Giá Netto (100 %) = 39,00 € ÷ 1,19 = 32,77 €. Tiền thuế USt (19 %) = 39,00 € - 32,77 € = 6,23 €.\n' +
          'c) Tiền tip (Trinkgeld): Khách đưa tự nguyện cho nhân viên = Miễn thuế thu nhập và BHXH 100 % (§ 3 Nr. 51 EStG). Khách đưa cho chủ quán = Phải cộng vào doanh thu chịu thuế.',
        explanation: {
          whyCorrect: 'Giải thích chính xác bài toán tính thuế trong đề IHK Sommer 2025 và kiến thức thuế trong KA5 LF9.',
          whyWrong: 'Lỗi sai kinh điển: Lấy 39,00 € × 19 % = 7,41 € (SAI vì 39,00 € là 119 % Brutto chứ không phải 100 % Netto!).',
          keyTakeaway: 'Công thức tách thuế từ giá Brutto: Netto = Brutto ÷ 1,19 (với thuế 19 %) hoặc Netto = Brutto ÷ 1,07 (với thuế 7 %)!'
        }
      },
      {
        id: 'lf9-q4',
        no: 4,
        lf: 'lf9',
        fach: 'bfk1',
        category: 'recht',
        points: 10,
        title: 'Bewirtungsvertrag, Mängelrechte des Gastes & Zechprellerei vs. Geldbeutel vergessen',
        questionDe: 'Im Restaurant schließen Gast und Wirt täglich Verträge ab.\n' +
          'a) Was ist ein „Bewirtungsvertrag“, wie kommt er zustande und aus welchen Vertragstypen des BGB setzt er sich zusammen?\n' +
          'b) Welche Rechte hat der Gast (in welcher Reihenfolge), wenn das Essen mangelhaft (z. B. versalzen oder kalt) oder nach über 90 Minuten noch immer nicht serviert ist?\n' +
          'c) Unterscheiden Sie rechtlich: Fall A – Ein Gast hat ehrlich seinen Geldbeutel zu Hause vergessen. Fall B – Ein Gast schleicht sich absichtlich über die Terrasse davon, ohne zu bezahlen (Zechprellerei). Wie handeln Sie in Fall A?',
        questionVi: 'Trong nhà hàng, thực khách và chủ quán giao kết hợp đồng hằng ngày.\n' +
          'a) „Bewirtungsvertrag“ (Hợp đồng phục vụ ẩm thực) là gì, hình thành khi nào và kết hợp từ những loại hợp đồng nào trong Bộ luật Dân sự BGB?\n' +
          'b) Khách có những quyền gì (theo thứ tự nào) nếu món ăn bị lỗi (quá mặn/nguội) hoặc đợi quá 90 phút vẫn chưa được mang ra?\n' +
          'c) Phân biệt pháp lý: Trường hợp A – Khách vô tình quên ví ở nhà. Trường hợp B – Khách cố tình lẻn trốn qua sân thượng để quỵt tiền (Zechprellerei). Bạn xử lý thế nào ở Trường hợp A?',
        placeholderDe: 'a) Bewirtungsvertrag = gemischter Vertrag aus ...\nb) Stufe 1 (Nacherfüllung) -> Stufe 2 (Minderung/Rücktritt)...\nc) Fall A (Geldbeutel vergessen) vs. Fall B (Zechprellerei § 263 StGB)...',
        hintDe: 'a) Gemischter Vertrag (Kauf-, Werk-, Dienst-, Mietvertrag); kommt durch Bestellung & Annahme durch den Kellner zustande (Speisekarte ist nur invitatio ad offerendum!). c) Zechprellerei = vorsätzlicher Eingehungsbetrug (§ 263 StGB).',
        hintVi: 'a) Hợp đồng hỗn hợp (Mua bán, Gia công, Dịch vụ, Thuê chỗ ngồi); hình thành khi khách gọi món và bồi bàn nhận đơn. c) Zechprellerei = Tội lừa đảo có chủ đích (§ 263 StGB).',
        keywords: [
          { term: 'gemischter Vertrag', points: 1.5, vi: 'Bewirtungsvertrag là hợp đồng hỗn hợp (gemischter Vertrag): Kaufvertrag (đồ uống), Werkvertrag (chế biến món ăn), Dienstvertrag (phục vụ), Mietvertrag (bàn ghế)', alt: ['Kaufvertrag', 'Werkvertrag', 'Dienstvertrag'] },
          { term: 'Bestellung', points: 1.5, vi: 'Hình thành khi khách gọi món (Antrag) và nhân viên xác nhận đơn (Annahme); cuốn Speisekarte chỉ là lời mời chào (invitatio ad offerendum)', alt: ['Annahme', 'Speisekarte unverbindlich'] },
          { term: 'Nacherfüllung', points: 2, vi: 'Quyền của khách khi món lỗi: Bậc 1 (vorrangig) = Nacherfüllung (đổi đĩa mới / hâm nóng lại); Bậc 2 (nachrangig) = Minderung (giảm giá 10–30 %) hoặc Rücktritt', alt: ['Minderung', 'Rücktritt', 'Stufe 1'] },
          { term: 'Schuldanerkenntnis', points: 2, vi: 'Trường hợp A (Quên ví): Không phải tội hình sự (kein Vorsatz); ghi lại thông tin Ausweis, lập giấy nhận nợ (Schuldanerkenntnis) hoặc nhận Pfand để khách chuyển khoản/quay lại trả', alt: ['Personalausweis', 'Pfand', 'kein Vorsatz'] },
          { term: 'Betrug', points: 3, vi: 'Trường hợp B (Zechprellerei): Tội lừa đảo hình sự (Eingehungsbetrug nach § 263 StGB) vì ngay lúc gọi món đã có ý định không trả tiền (Vorsatz) → Báo cảnh sát (Polizei)', alt: ['263 StGB', 'Zechprellerei', 'Vorsatz', 'Polizei'] }
        ],
        musterloesungDe:
          'a) Bewirtungsvertrag:\n' +
          'Der Bewirtungsvertrag ist ein gesetzlich nicht eigens geregelter gemischter Vertrag des BGB aus Elementen des Werkvertrags (Zubereitung der Speisen), Kaufvertrags (Lieferung der Getränke), Dienstvertrags (Service am Tisch) und Mietvertrags (Nutzung von Tisch, Stuhl, Räumlichkeiten).\n' +
          'Zustandekommen: Die Speisekarte ist nur eine unverbindliche Aufforderung (invitatio ad offerendum). Erst die Bestellung des Gastes ist der Antrag und die Bestätigung durch die Servicekraft die Annahme.\n\n' +
          'b) Rechte des Gastes bei Mängeln oder überlanger Wartezeit:\n' +
          '-Stufe 1 (vorrangig): Recht auf Nacherfüllung – der Gast muss dem Wirt zunächst die Gelegenheit geben, das Essen nachzubessern (nachzuwürzen/zu erhitzen) oder ein neues, mangelfreies Gericht zu servieren.\n' +
          '-Stufe 2 (nachrangig, wenn Nacherfüllung fehlschlägt oder Wartezeit unzumutbar lang ist, z. B. > 60–90 Min. nach Nachfrist): Preisminderung (ca. 10–30 % Nachlass) oder Rücktritt vom Vertrag (Gericht zurückgeben und nicht bezahlen).\n\n' +
          'c) Geldbeutel vergessen vs. Zechprellerei:\n' +
          '-Fall A (Geldbeutel vergessen): Kein Straftatbestand, da kein Vorsatz vorliegt (nur zivilrechtlicher Zahlungsverzug). Vorgehen: Höflich bleiben, Personalausweis zeigen lassen, Kontaktdaten notieren, ein schriftliches Schuldanerkenntnis unterschreiben lassen (oder Wertgegenstand als Pfand vereinbaren) und Frist zur Überweisung/Barzahlung setzen.\n' +
          '-Fall B (Zechprellerei): Strafbarer Eingehungsbetrug nach § 263 StGB, da der Gast schon bei der Bestellung den Vorsatz hatte, die Zeche nicht zu bezahlen. Vorgehen: Polizei rufen und Strafanzeige erstatten.',
        musterloesungVi:
          'a) Bewirtungsvertrag là hợp đồng hỗn hợp gồm Werkvertrag (nấu món ăn), Kaufvertrag (bán đồ uống), Dienstvertrag (phục vụ bàn) và Mietvertrag (chỗ ngồi). Hợp đồng hình thành khi khách gọi món (Antrag) và bồi bàn xác nhận (Annahme); cuốn thực đơn chỉ là lời mời chào.\n' +
          'b) Khi món ăn lỗi: Bậc 1 (Ưu tiên) = Khách phải cho nhà hàng cơ hội Nacherfüllung (làm lại đĩa mới hoặc hâm nóng); Bậc 2 (Thứ cấp) = Giảm giá (Minderung) hoặc hủy món không trả tiền (Rücktritt).\n' +
          'c) Trường hợp A (Quên ví): Chỉ là nợ dân sự vì không cố ý (kein Vorsatz); cách xử lý: Xem CCCD/Ausweis, ghi địa chỉ, cho ký giấy nhận nợ (Schuldanerkenntnis) hoặc giữ vật thế chấp tự nguyện để khách chuyển khoản/quay lại trả. Trường hợp B (Zechprellerei): Tội lừa đảo hình sự (§ 263 StGB) vì có chủ đích quỵt tiền ngay từ lúc gọi món → Báo cảnh sát.',
        explanation: {
          whyCorrect: 'Phân tích sắc bén toàn bộ phần luật thực hành trong Klassenarbeit Nr. 5 (LF9).',
          whyWrong: 'Gọi cảnh sát báo tội lừa đảo khi khách chỉ vô tình quên ví và chủ động xin để lại thông tin cá nhân.',
          keyTakeaway: 'Điểm mấu chốt phân biệt Quên ví và Zechprellerei (§ 263 StGB) là „Vorsatz bei der Bestellung“ (Ý định quỵt tiền ngay từ lúc gọi món)!'
        }
      }
    ],

    /* ========================================================================
       FLEISCH, FISCH, MILCH/KÄSE, GRUNDSAUCEN & ARBEITEN AM GAST (BFK-2)
       ======================================================================== */
    fleisch: [
      {
        id: 'fleisch-q1',
        no: 1,
        lf: 'fleisch',
        fach: 'bfk2',
        category: 'warenkunde',
        points: 10,
        title: 'Garstufen beim Rindersteak (Kerntemperaturen) & Teilstücke vom Rind',
        questionDe: 'Im Steakhaus bestellen die Gäste ihre Rindersteaks in unterschiedlichen Garstufen.\n' +
          'a) Nennen Sie die vier wichtigsten Garstufen eines Rindersteaks auf Deutsch, Englisch und Französisch inklusive der jeweiligen Kerntemperatur (in °C) und der Beschaffenheit des Fleischkerns.\n' +
          'b) Aus welchen Teilstücken des Rindes stammen Filetsteak (Chateaubriand/Tournedos), Rumpsteak (Roastbeef), Rib-Eye-Steak (Entrecôte) und Hüftsteak?',
        questionVi: 'Tại nhà hàng bít tết, khách gọi Rindersteak với các độ chín khác nhau.\n' +
          'a) Nêu 4 cấp độ chín quan trọng nhất của Rindersteak bằng tiếng Đức, tiếng Anh và tiếng Pháp kèm theo nhiệt độ tâm thịt (Kerntemperatur °C) và đặc điểm phần lõi thịt.\n' +
          'b) Cho biết Filetsteak (Chateaubriand/Tournedos), Rumpsteak, Rib-Eye-Steak và Hüftsteak được cắt từ những phần thịt nào của con bò?',
        placeholderDe: 'a) 1. Stark blutig / Rare / Bleu (... °C)\n2. Englisch / Medium rare / Saignant (... °C)\n3. Rosa / Medium / À point (... °C)\n4. Durch / Well done / Bien cuit (... °C)\nb) Teilstücke vom Rind: ...',
        hintDe: 'a) Rare/Bleu (45–49 °C), Medium rare/Saignant (50–54 °C), Medium/À point (55–59 °C), Well done/Bien cuit (ab 68–70 °C).',
        hintVi: 'a) Rare/Bleu (45–49 °C), Medium rare/Saignant (50–54 °C), Medium/À point (55–59 °C), Well done/Bien cuit (≥ 68–70 °C).',
        keywords: [
          { term: 'Bleu', points: 1.5, vi: 'Rare / Bleu (stark blutig): Tâm thịt đỏ sống, ấm nhẹ, Kerntemperatur ~ 45–49 °C', alt: ['Rare', 'blutig', '48 °C'] },
          { term: 'Saignant', points: 1.5, vi: 'Medium rare / Saignant (englisch / blutig-rosa): Tâm đỏ hồng mọng nước, Kerntemperatur ~ 50–54 °C', alt: ['Medium rare', 'englisch', '52 °C'] },
          { term: 'À point', points: 2, vi: 'Medium / À point (rosa / halb durch): Tâm hồng đều, mọng ngọt, Kerntemperatur ~ 55–59 °C', alt: ['Medium', 'rosa', '56 °C', '58 °C'] },
          { term: 'Bien cuit', points: 1.5, vi: 'Well done / Bien cuit (durchgebraten): Chín kỹ hoàn toàn, màu nâu xám, Kerntemperatur ≥ 68–70 °C', alt: ['Well done', 'durchgebraten', '70 °C'] },
          { term: 'Roastbeef', points: 2, vi: 'Filetsteak từ Rinderfilet (Lende); Rumpsteak từ Roastbeef (flaches Roastbeef); Rib-Eye từ Hochrippe/Entrecôte; Hüftsteak từ der Blume/Hüfte', alt: ['Rinderfilet', 'Hochrippe', 'Hüfte'] },
          { term: 'ruhen lassen', points: 1.5, vi: 'Sau khi áp chảo phải để thịt nghỉ (ruhen lassen) để nước ngọt (Fleischsaft) phân bổ đều không bị chảy ra đĩa', alt: ['Fleischsaft', 'entspannen'] }
        ],
        musterloesungDe:
          'a) Vier Garstufen beim Rindersteak (Deutsch / Englisch / Französisch & Kerntemperatur):\n' +
          '1. Stark blutig / Rare / Bleu: Kerntemperatur ca. 45–49 °C; außen kräftige Bratkruste, innen noch roh und nur lauwarm.\n' +
          '2. Blutig-rosa (Englisch) / Medium rare / Saignant: Kerntemperatur ca. 50–54 °C; roter, saftiger Kern mit rosa Rand.\n' +
          '3. Rosa (Halb durch) / Medium / À point: Kerntemperatur ca. 55–59 °C; durchgehend zartrosa Kern, gibt auf Fingerdruck federnd nach.\n' +
          '4. Durchgebraten / Well done / Bien cuit: Kerntemperatur ab ca. 68–72 °C; im Inneren komplett durchgegart (grau-braun), fester auf Druck.\n' +
          '(Hinweis: Vor dem Anschneiden das Steak kurz an einem warmen Ort ruhen lassen, damit sich der Fleischsaft verteilt.)\n\n' +
          'b) Zuordnung der Rinder-Teilstücke (aus dem Rinderrücken / Hinterviertel):\n' +
          '-Filetsteak (Mittelstück = Chateaubriand, kleiner = Tournedos/Medaillon, Spitze = Filet Mignon): aus dem Rinderfilet (Lende).\n' +
          '-Rumpsteak (mit Fettrand): aus dem flachen Roastbeef (Zwischenrippenstück/Rücken).\n' +
          '-Rib-Eye-Steak (mit charakteristischem Fettauge): aus der Hochrippe / dem hohen Roastbeef (Entrecôte).\n' +
          '-Hüftsteak: aus der Rinderhüfte (Blume).',
        musterloesungVi:
          'a) 4 cấp độ chín của Rindersteak:\n' +
          '1. Stark blutig / Rare / Bleu (45–49 °C): Vỏ cháy cạnh, lõi đỏ tươi ấm nhẹ.\n' +
          '2. Englisch / Medium rare / Saignant (50–54 °C): Lõi đỏ mọng, viền hồng.\n' +
          '3. Rosa / Medium / À point (55–59 °C): Lõi hồng đều, ấn tay có độ đàn hồi.\n' +
          '4. Durchgebraten / Well done / Bien cuit (≥ 68–72 °C): Chín kỹ hoàn toàn.\n' +
          'b) Nguồn gốc phần thịt bò: Filetsteak (từ thăn nội Rinderfilet); Rumpsteak (từ thăn ngoại Roastbeef có viền mỡ); Rib-Eye-Steak (từ phần Hochrippe có mắt mỡ ở giữa); Hüftsteak (từ phần mông trên Rinderhüfte).',
        explanation: {
          whyCorrect: 'Nắm vững bộ 3 thuật ngữ Đức – Anh – Pháp và dải nhiệt độ tâm thịt chuẩn quốc tế.',
          whyWrong: 'Cắt miếng Steak ngay khi vừa nhấc khỏi chảo nóng làm toàn bộ nước thịt (Fleischsaft) chảy tràn ra đĩa.',
          keyTakeaway: 'Nhớ nhanh dải nhiệt độ tâm: Bleu (~48 °C) → Saignant (~52 °C) → À point / Medium (~57 °C) → Bien cuit (≥ 70 °C)!'
        }
      },
      {
        id: 'fleisch-q2',
        no: 2,
        lf: 'fleisch',
        fach: 'bfk2',
        category: 'praxis',
        points: 10,
        title: 'Garmethoden (Trockene vs. Feuchte Hitze), 4 Grundsaucen & Bindungsarten',
        questionDe: 'Die Wahl des richtigen Garverfahrens und der passenden Sauce entscheidet über die Speisenqualität.\n' +
          'a) Unterscheiden Sie die Garmethoden „Dünsten“ und „Schmoren“ sowie „Pochieren (Garziehen)“ und „Dämpfen“.\n' +
          'b) Nennen Sie vier klassische warme Grundsaucen mit ihrer jeweiligen Basisflüssigkeit und Bindungsart.\n' +
          'c) Erklären Sie den Unterschied zwischen einer Mehlschwitze (Roux), Mehlbutter (Beurre manié) und einer Liaison (Legierung).',
        questionVi: 'Việc chọn đúng phương pháp chế biến nhiệt và loại xốt quyết định chất lượng món ăn.\n' +
          'a) Phân biệt phương pháp nấu „Dünsten“ với „Schmoren“, cũng như „Pochieren (Garziehen)“ với „Dämpfen“.\n' +
          'b) Nêu 4 loại xốt nền nóng cổ điển (Grundsaucen) kèm chất lỏng nền và cách làm sánh của từng loại.\n' +
          'c) Giải thích sự khác nhau giữa Mehlschwitze (Roux), Mehlbutter (Beurre manié) và Liaison (Legierung).',
        placeholderDe: 'a) Dünsten vs. Schmoren / Pochieren vs. Dämpfen...\nb) 4 Grundsaucen: 1. ... 2. ... 3. ... 4. ...\nc) Roux vs. Beurre manié vs. Liaison...',
        hintDe: 'a) Dünsten = im eigenen Saft/wenig Flüssigkeit ohne Bräunung; Schmoren = erst kräftig anbraten (Röstaromen!), dann mit Flüssigkeit schmoren. b) Dunkle Grundsauce, Velouté, Béchamel, Hollandaise.',
        hintVi: 'a) Dünsten = om trong nước tự thân/ít nước không tạo màu nâu; Schmoren = áp chảo vàng nâu trước rồi mới thêm nước hầm mềm. b) Xốt nâu, Velouté, Béchamel, Hollandaise.',
        keywords: [
          { term: 'Dünsten', points: 1.5, vi: 'Dünsten: Làm chín bằng lượng nước rất ít/nước tự thân + chút bơ, đậy nắp (~100 °C, không làm cháy vàng)', alt: ['eigenen Saft', 'wenig Flüssigkeit'] },
          { term: 'Schmoren', points: 1.5, vi: 'Schmoren (Braisieren): Kết hợp nhiệt khô & ẩm – áp chảo tạo màu/mùi thơm (Röststoffe) trước, sau đó thêm nước dùng hầm mềm trong nồi đậy nắp', alt: ['anbraten', 'Röststoffe', 'Braisieren'] },
          { term: 'Pochieren', points: 1.5, vi: 'Pochieren (Garziehen): Làm chín nhẹ nhàng trong nước dưới điểm sôi (75–95 °C, không sủi bọt mạnh) vs. Dämpfen: Hấp chín bằng hơi nước nóng (100 °C)', alt: ['Garziehen', 'unter dem Siedepunkt', 'Wasserdampf'] },
          { term: 'Velouté', points: 2, vi: '4 Grundsaucen: 1. Braune Grundsauce (Demiglace – Dunkler Fond), 2. Velouté (Samtsauce – Heller Fond + helle Roux), 3. Béchamelsauce (Milch + helle Roux), 4. Sauce Hollandaise (Eigelb + geklärte Butter)', alt: ['Béchamel', 'Hollandaise', 'Demiglace'] },
          { term: 'Roux', points: 1.5, vi: 'Roux (Mehlschwitze): Bơ đun chảy xào chín với bột mì (tỷ lệ ~1:1); Beurre manié (Mehlbutter): Bơ mềm nhào sống với bột mì để làm sánh nhanh lúc cuối', alt: ['Mehlschwitze', 'Beurre manié', 'Mehlbutter'] },
          { term: 'Liaison', points: 2, vi: 'Liaison (Legieren): Hỗn hợp lòng đỏ trứng + kem tươi (Eigelb + Sahne) cho vào xốt/súp cuối cùng, tuyệt đối KHÔNG được đun sôi lại (dưới 80 °C để không bị vón cục)', alt: ['Eigelb und Sahne', 'nicht mehr kochen', 'gerinnen'] }
        ],
        musterloesungDe:
          'a) Vergleich der Garmethoden:\n' +
          '-Dünsten vs. Schmoren: Beim Dünsten gart zartes Gargut (Gemüse, Fisch) im eigenen Saft mit wenig Flüssigkeit und etwas Fett im geschlossenen Topf bei ca. 100 °C ohne Bräunung. Beim Schmoren (Braisieren, für bindegewebsreiches Fleisch wie Rinderrouladen/Gulasch) wird das Fleisch zuerst kräftig angebraten (Röststoffe/Maillard-Reaktion) und danach mit Röstgemüse und Flüssigkeit langsam weichgeschmort.\n' +
          '-Pochieren vs. Dämpfen: Beim Pochieren (Garziehen) gart empfindliches Gargut (Fisch, Eier, Klößchen) in reichlich Flüssigkeit knapp unter dem Siedepunkt (75–95 °C, Wasser darf nicht sprudeln). Beim Dämpfen liegt das Gargut auf einem Siebeinsatz und gart ausschließlich im aufsteigenden Wasserdampf (ca. 100 °C).\n\n' +
          'b) Vier klassische warme Grundsaucen:\n' +
          '1. Braune Grundsauce (Demiglace / Kraftsauce): Dunkler Kalbs-/Rinderfond + Röstgemüse + Tomatenmark, gebunden mit dunkler Roux oder Stärke.\n' +
          '2. Weiße Grundsauce / Samtsauce (Velouté): Heller Kalbs-, Geflügel- oder Fischfond + helle Roux (Mehlschwitze).\n' +
          '3. Milchgrundsauce (Sauce Béchamel): Milch + helle Roux, gewürzt mit Salz, weißem Pfeffer und Muskatnuss.\n' +
          '4. Aufgeschlagene Buttersauce (Sauce Hollandaise): Reduktion (Weißwein, Essig, Schalotten, Pfefferkörner) + Eigelb auf dem Wasserbad aufgeschlagen und mit geklärter flüssiger Butter emulgiert.\n\n' +
          'c) Roux, Beurre manié & Liaison:\n' +
          '-Roux (Mehlschwitze): Butter erhitzen, Mehl anschwitzen (hell, blond oder braun) und mit kalter Flüssigkeit ablöschen.\n' +
          '-Beurre manié (Mehlbutter): Weiche Butter und Mehl kalt zu gleichen Teilen verkneten, zum schnellen Nachbinden kochender Saucen.\n' +
          '-Liaison (Legierung): Mischung aus Eigelb und Sahne zum Verfeinern und Binden von Suppen/Saucen. Wichtig: Nach Zugabe der Liaison darf die Sauce nicht mehr kochen (max. 75–80 °C), da das Eigelb sonst gerinnt (ausflockt)!',
        musterloesungVi:
          'a) Dünsten vs. Schmoren: Dünsten là om chín trong nước tự thân/ít nước có đậy nắp ở ~100 °C không làm vàng; Schmoren là áp chảo vàng tạo mùi thơm (Röststoffe) trước rồi mới thêm nước dùng hầm mềm. Pochieren vs. Dämpfen: Pochieren là ngâm chín trong nước dưới điểm sôi (75–95 °C); Dämpfen là hấp chín bằng hơi nước (100 °C).\n' +
          'b) 4 xốt nền nóng: 1. Braune Grundsauce (Demiglace từ nước dùng nâu); 2. Velouté (nước dùng trắng bò/gà/cá + Roux trắng); 3. Béchamel (sữa tươi + Roux trắng + nhục đậu khấu); 4. Sauce Hollandaise (lòng đỏ trứng đánh bông cách thủy với bơ trong).\n' +
          'c) Roux là bột mì xào chín với bơ; Beurre manié là bơ mềm nhào sống với bột mì; Liaison là hỗn hợp lòng đỏ trứng + kem tươi Sahne (sau khi cho Liaison tuyệt đối không đun sôi lại vì trứng sẽ kết tủa!).',
        explanation: {
          whyCorrect: 'Hệ thống hóa toàn bộ kiến thức kỹ thuật bếp về phương pháp nấu, xốt nền và chất tạo sánh.',
          whyWrong: 'Đun sôi sùng sục nồi súp/xốt sau khi đã cho Liaison (Eigelb + Sahne) hoặc đun quá nhiệt Sauce Hollandaise làm tách bơ.',
          keyTakeaway: 'Quy tắc chống vón cục khi nấu Roux: Roux NÓNG + Nước dùng LẠNH (hoặc Roux LẠNH + Nước dùng NÓNG). Với Liaison: Tuyệt đối KHÔNG đun sôi!'
        }
      },
      {
        id: 'fleisch-q3',
        no: 3,
        lf: 'fleisch',
        fach: 'bfk2',
        category: 'warenkunde',
        points: 10,
        title: 'Fischwarenkunde (5 Frischemerkmale & 3-S-Regel) sowie Milch- & Käsekunde',
        questionDe: 'Frischer Fisch und feine Käsesorten erfordern besondere Warenkenntnis.\n' +
          'a) Nennen Sie fünf eindeutige Frischemerkmale eines ganzen Speisefisches bei der Wareneingangskontrolle.\n' +
          'b) Was bedeutet die klassische „3-S-Regel“ bei der Vorbereitung und Zubereitung von Fisch?\n' +
          'c) Milch- & Käsekunde: Unterscheiden Sie Pasteurisieren, ESL-Milch und Ultrahocherhitzen (H-Milch) und erklären Sie, was die Angabe „45 % Fett i. Tr.“ auf einem Käseetikett bedeutet.',
        questionVi: 'Cá tươi và các loại phô mai đòi hỏi kiến thức thương phẩm chuẩn xác.\n' +
          'a) Nêu 5 dấu hiệu nhận biết độ tươi rõ ràng nhất của một con cá nguyên con khi kiểm tra nhập hàng.\n' +
          'b) Quy tắc cổ điển „3-S-Regel“ khi sơ chế và tẩm ướp cá có nghĩa là gì?\n' +
          'c) Sữa & Phô mai: Phân biệt sữa thanh trùng (Pasteurisieren), sữa ESL và sữa tiệt trùng UHT (H-Milch), đồng thời giải thích ký hiệu „45 % Fett i. Tr.“ trên nhãn phô mai.',
        placeholderDe: 'a) 5 Frischemerkmale Fisch (Augen, Kiemen, Haut, Fleisch, Geruch)...\nb) Die 3-S-Regel: 1. S..., 2. S..., 3. S...\nc) Pasteurisieren / ESL / UHT + „45 % Fett i. Tr.“...',
        hintDe: 'a) Augen klar & prall gewölbt, Kiemen leuchtend hellrot, Schleimhaut klar, Fleisch fest/elastisch, Geruch neutral/frisch. b) Säubern, Säuern, Salzen. c) Fett in der Trockenmasse.',
        hintVi: 'a) Mắt trong & lồi, Mang đỏ tươi, Lớp nhớt trong suốt, Thịt săn chắc đàn hồi, Mùi biển tự nhiên không tanh khai. b) Säubern (Làm sạch), Säuern (Ướp chanh/axit), Salzen (Ướp muối). c) Phần trăm chất béo tính trên khối lượng chất khô.',
        keywords: [
          { term: 'Kiemen', points: 1.5, vi: 'Mang cá (Kiemen) đỏ tươi sáng (leuchtend rot), không có dịch nhầy xám', alt: ['leuchtend rot', 'hellrot'] },
          { term: 'Augen', points: 1.5, vi: 'Mắt cá (Augen) trong suốt, phồng lồi (klar und prall gewölbt, không bị lõm đục)', alt: ['klar', 'gewölbt'] },
          { term: 'elastisch', points: 1.5, vi: 'Thịt cá săn chắc đàn hồi (ấn ngón tay không để lại vết lõm), vảy bám chắc, mùi biển tự nhiên dễ chịu', alt: ['Fingerdruck', 'festes Fleisch', 'neutraler Geruch'] },
          { term: 'Säubern', points: 2, vi: 'Quy tắc 3-S: 1. Säubern (Rửa sạch dưới nước lạnh & thấm khô), 2. Säuern (Rưới nước cốt chanh giúp thịt săn & khử mùi), 3. Salzen (Ướp muối ngay trước khi nấu)', alt: ['Säuern', 'Salzen', 'Zitronensaft'] },
          { term: 'Pasteurisieren', points: 1.5, vi: 'Pasteurisieren (72–75 °C trong 15–30 giây), ESL (127 °C trong 1–4 giây), Ultrahocherhitzen / H-Milch (135–150 °C trong 2–4 giây)', alt: ['Ultrahocherhitzen', 'H-Milch', '135'] },
          { term: 'Trockenmasse', points: 2, vi: 'Fett i. Tr. = Fett in der Trockenmasse (Tỷ lệ chất béo tính trên phần chất khô sau khi đã trừ hết nước; vì phô mai càng ủ lâu càng mất nước nên chỉ số Fett i. Tr. giữ cố định)', alt: ['Fett in der Trockenmasse', 'Wassergehalt'] }
        ],
        musterloesungDe:
          'a) Fünf Frischemerkmale eines ganzen Fisches:\n' +
          '1. Augen: Klar, glänzend und prall nach außen gewölbt (nicht trüb oder eingefallen).\n' +
          '2. Kiemen: Leuchtend hellrot, feucht und frei von grauem Schleim.\n' +
          '3. Haut & Schuppen: Glänzend, natürliche Färbung, mit klarem wässrigem Schleim überzogen; Schuppen sitzen fest.\n' +
          '4. Fleisch & Gewebe: Fest und elastisch (eine Delle durch Fingerdruck verschwindet sofort wieder), Gräten sitzen fest am Fleisch.\n' +
          '5. Geruch: Angenehm frisch nach Meer/Wasser, keinesfalls stechend fischig oder nach Ammoniak.\n\n' +
          'b) Die klassische „3-S-Regel“ bei der Fischvorbereitung:\n' +
          '1. Säubern: Fisch kurz unter fließendem kaltem Wasser abspülen und mit Küchenkrepp trocken tupfen.\n' +
          '2. Säuern: Mit etwas Zitronensaft (oder Weißwein/Essig) beträufeln – festigt das empfindliche Fischeiweiß und mildert den Fischgeruch.\n' +
          '3. Salzen: Erst unmittelbar vor dem Garen salzen, damit das Salz dem Fischfleisch kein Wasser entzieht.\n\n' +
          'c) Wärmebehandlung der Milch & „Fett i. Tr.“ beim Käse:\n' +
          '-Pasteurisieren (Frischmilch): Kurzzeiterhitzung auf 72–75 °C für 15–30 Sekunden (gekühlt ca. 7–10 Tage haltbar).\n' +
          '-ESL-Milch (Extended Shelf Life): Hocherhitzt auf ca. 127 °C für 1–4 Sekunden (gekühlt ca. 3 Wochen haltbar).\n' +
          '-Ultrahocherhitzen (UHT / H-Milch): Erhitzung auf 135–150 °C für 2–4 Sekunden (ungeöffnet ungekühlt mehrere Monate haltbar).\n' +
          '-„45 % Fett i. Tr.“ (Fett in der Trockenmasse): Käse besteht aus Wasser und Trockenmasse (Eiweiß, Fett, Mineralstoffe). Da während der Reifung ständig Wasser verdunstet, würde sich der absolute Fettgehalt laufend ändern. Das Verhältnis von Fett zur wasserfreien Trockenmasse (Fett i. Tr.) bleibt jedoch immer konstant.',
        musterloesungVi:
          'a) 5 dấu hiệu cá tươi: 1. Mắt trong suốt và lồi căng; 2. Mang cá đỏ tươi, không nhớt đục; 3. Da sáng bóng, lớp nhớt trong, vảy bám chắc; 4. Thịt săn chắc đàn hồi (ấn tay không lún); 5. Mùi biển tươi mát dễ chịu.\n' +
          'b) Quy tắc 3-S: 1. Säubern (Rửa nhanh bằng nước lạnh và thấm khô); 2. Säuern (Ướp nước cốt chanh để săn thớ đạm và khử mùi); 3. Salzen (Rắc muối ngay trước khi cho vào nấu để cá không bị ra nước).\n' +
          'c) Xử lý nhiệt sữa: Pasteurisieren (72–75 °C trong 15–30 giây); ESL (127 °C trong 1–4 giây); UHT/H-Milch (135–150 °C trong 2–4 giây). Ký hiệu „45 % Fett i. Tr.“ là tỷ lệ phần trăm chất béo tính trong phần chất khô (đã trừ nước), vì trong quá trình ủ phô mai nước bay hơi liên tục nhưng tỷ lệ béo trong chất khô luôn cố định.',
        explanation: {
          whyCorrect: 'Tổng hợp chuẩn xác kiến thức thương phẩm Cá (3-S-Regel) và Sữa/Phô mai trong chương trình BfK-2.',
          whyWrong: 'Ướp muối cá từ quá sớm làm cá bị rút kiệt nước và khô xác khi áp chảo.',
          keyTakeaway: '5 điểm kiểm tra cá tươi: Augen (klar/gewölbt) – Kiemen (leuchtend rot) – Haut (glänzend) – Fleisch (elastisch) – Geruch (frisch) + Quy tắc 3-S: Säubern – Säuern – Salzen!'
        }
      },
      {
        id: 'fleisch-q4',
        no: 4,
        lf: 'fleisch',
        fach: 'bfk2',
        category: 'praxis',
        points: 10,
        title: 'Arbeiten am Gast: Tranchieren, Filetieren & Flambieren (Sicherheitsregeln)',
        questionDe: 'Im gehobenen Restaurantservice werden Speisen am Beistelltisch (Guéridon) vor den Augen des Gastes zubereitet oder zerlegt.\n' +
          'a) Unterscheiden Sie die Fachbegriffe „Tranchieren“, „Filetieren“ und „Flambieren“ mit je zwei typischen Gerichten.\n' +
          'b) Nennen Sie vier zwingende Sicherheitsregeln beim Arbeiten mit dem Rechaud und beim Flambieren am Tisch des Gastes.',
        questionVi: 'Trong nhà hàng cao cấp, món ăn được chế biến hoặc cắt chia trên bàn phụ (Guéridon) ngay trước mắt thực khách.\n' +
          'a) Phân biệt 3 thuật ngữ chuyên ngành „Tranchieren“, „Filetieren“ và „Flambieren“ kèm 2 món ăn tiêu biểu cho mỗi kỹ thuật.\n' +
          'b) Nêu 4 quy tắc an toàn bắt buộc khi sử dụng bếp đun Rechaud và khi đốt rượu (Flambieren) tại bàn khách.',
        placeholderDe: 'a) Tranchieren = ...\nFiletieren = ...\nFlambieren = ...\nb) 4 Sicherheitsregeln beim Flambieren am Gast: ...',
        hintDe: 'a) Tranchieren = Fleisch/Geflügel zerlegen (Chateaubriand, Ente); Filetieren = Fisch von Gräten lösen oder Obst schälen/segmentieren (Seezunge, Orange); Flambieren = mit hochprozentigem Alkohol (ab 40 % Vol.) abflämmen (Crêpes Suzette, Pfeffersteak). b) Niemals aus der Flasche nachgießen!',
        hintVi: 'a) Tranchieren = Cắt lát thịt/gia cầm; Filetieren = Lọc xương cá hoặc tách múi cam bưởi; Flambieren = Đốt rượu nồng độ cao ≥ 40 % Vol. b) Tuyệt đối không rót trực tiếp từ chai rượu vào chảo đang cháy!',
        keywords: [
          { term: 'Tranchieren', points: 1.5, vi: 'Tranchieren: Cắt/thái thịt nguyên tảng hoặc gia cầm thành từng lát vuông góc với thớ thịt (Chateaubriand, Rinderrücken, Ente, Gans)', alt: ['Fleisch schneiden', 'Geflügel zerlegen', 'Chateaubriand'] },
          { term: 'Filetieren', points: 1.5, vi: 'Filetieren: Tách phi lê cá khỏi xương/da (Seezunge, Forelle) hoặc gọt vỏ tách múi trái cây họ cam quýt (Orangen filetieren)', alt: ['Gräten lösen', 'Seezunge', 'Zitrusfrüchte'] },
          { term: 'Flambieren', points: 2, vi: 'Flambieren: Đốt cháy rượu mạnh (≥ 40 % Vol. như Cognac, Rum, Grand Marnier) trên chảo để giảm cồn và tạo hương Caramen (Crêpes Suzette, Steak Diane, Kirschen Jubilée)', alt: ['abflämmen', '40 %', 'Crêpes Suzette'] },
          { term: 'niemals aus der Flasche', points: 2.5, vi: 'Quy tắc sống còn: Tuyệt đối KHÔNG rót trực tiếp từ chai rượu vào chảo nóng/lửa (nguy cơ cháy ngược nổ chai – Stichflamme/Rückschlaggefahr!), phải đong ra ly/muôi trước', alt: ['Stichflamme', 'Rückschlag', 'Schöpfkelle', 'Portionsglas'] },
          { term: 'Sicherheitsabstand', points: 2.5, vi: 'Giữ khoảng cách an toàn với khách và rèm cửa/hoa khô, kiểm tra Rechaud chắc chắn, không đổ cồn đốt vào Rechaud đang nóng', alt: ['Abstand zum Gast', 'Rechaud', 'brennbare Dekoration'] }
        ],
        musterloesungDe:
          'a) Begriffserklärung & typische Gerichte:\n' +
          '1. Tranchieren: Das fachgerechte Zerlegen und Aufschneiden von Bratenstücken oder ganzem Geflügel quer zur Fleischfaser mit Tranchiermesser und Tranchiergabel (z. B. Chateaubriand / Rinderfilet, Lammkarree, Ente oder Gans).\n' +
          '2. Filetieren: Das Auslösen der Fischfilets von den Gräten und der Haut mit Fischmesser und Vorlegelöffel/-gabel (z. B. Seezunge „Müllerin Art“, Forelle „Blau“) oder das Herausschneiden häutchenfreier Fruchtsegmente aus Zitrusfrüchten (z. B. Orangen/Grapefruit für Crêpes Suzette).\n' +
          '3. Flambieren: Das Übergießen einer Speise in der Flambierpfanne mit erwärmtem, hochprozentigem Alkohol (mind. 40 % Vol., z. B. Cognac, Rum, Weinbrand, Grand Marnier) und anschließendes Entzünden (Abflämmen), damit der Alkohol verbrennt und feine Aromastoffe zurückbleiben (z. B. Crêpes Suzette, Pfefferspieß/Steak Diane, Kirschen Jubilée).\n\n' +
          'b) Vier zwingende Sicherheitsregeln beim Flambieren am Guéridon:\n' +
          '1. Spirituosen NIEMALS direkt aus der Flasche in die heiße Pfanne oder offene Flamme gießen (Lebensgefahr durch Stichflamme / Explosion der Flasche!) – immer vorher in ein Glas oder eine Schöpfkelle abmessen.\n' +
          '2. Ausreichenden Sicherheitsabstand zum Gast, zu Vorhängen, Tischwäsche und Blumengestecken einhalten.\n' +
          '3. Sicheren Stand des Guéridons und des Rechauds prüfen; lange Haare zusammenbinden.\n' +
          '4. Brennspiritus/Brennpaste am Rechaud niemals im heißen oder noch brennenden Zustand nachfüllen; Deckel zum Ersticken einer Flamme bereithalten.',
        musterloesungVi:
          'a) Phân biệt kỹ thuật:\n' +
          '-Tranchieren: Cắt thái thịt tảng hoặc gia cầm nguyên con vuông góc với thớ thịt (Chateaubriand, vịt/ngỗng quay).\n' +
          '-Filetieren: Lọc tách phi lê cá khỏi xương và da (cá bơn Seezunge, cá hồi suối Forelle) hoặc cắt tách múi cam/bưởi không dính màng.\n' +
          '-Flambieren: Đốt rượu mạnh (≥ 40 % Vol.) trên chảo nóng để tạo hương thơm đặc trưng (Crêpes Suzette, Steak Diane, Kirschen Jubilée).\n' +
          'b) 4 quy tắc an toàn sống còn khi Flambieren tại bàn khách:\n' +
          '1. Tuyệt đối KHÔNG dốc trực tiếp chai rượu vào chảo đang nóng/cháy (nguy cơ lửa tạt ngược gây nổ chai!), bắt buộc phải rót ra ly định lượng hoặc muôi trước.\n' +
          '2. Giữ khoảng cách an toàn với thực khách, rèm cửa và khăn trải bàn.\n' +
          '3. Đảm bảo xe đẩy Guéridon đã khóa bánh và bếp Rechaud đứng vững.\n' +
          '4. Không bao giờ châm thêm cồn vào bếp Rechaud khi bếp còn đang cháy hoặc còn nóng.',
        explanation: {
          whyCorrect: 'Trình bày rõ ràng kiến thức kỹ thuật phục vụ bàn nâng cao (Arbeiten am Gast) trong chương trình BfK-2.',
          whyWrong: 'Cầm cả chai rượu Cognac dốc thẳng vào chảo đang bắt lửa trên bếp Rechaud.',
          keyTakeaway: 'Nguyên tắc an toàn số 1 khi Flambieren: Luôn đong rượu ra ly/muôi trước – CẤM rót trực tiếp từ chai vào chảo nóng!'
        }
      }
    ],

    /* ========================================================================
       WIKO / WISO: WIRTSCHAFTS- UND SOZIALKUNDE (ARBEITS-, SOZIAL- & TARIFRECHT)
       ======================================================================== */
    wiko: [
      {
        id: 'wiko-q1',
        no: 1,
        lf: 'wiko',
        fach: 'wiko',
        category: 'recht',
        points: 10,
        title: 'Ausbildungsvertrag: Probezeit & Kündigungsregeln (§ 20 & § 22 BBiG)',
        questionDe: 'Im Berufsausbildungsverhältnis gelten besondere Schutzvorschriften für Auszubildende.\n' +
          'a) Wie lange muss und wie lange darf die Probezeit in der Berufsausbildung nach § 20 BBiG dauern?\n' +
          'b) Vergleichen Sie die Kündigungsregeln WÄHREND der Probezeit mit den Kündigungsregeln NACH der Probezeit (§ 22 BBiG) für beide Vertragsparteien.\n' +
          'c) Welche besondere Formvorschrift gilt für jede Kündigung (§ 623 BGB) und wann ist sie bei einem minderjährigen Azubi erst wirksam?',
        questionVi: 'Trong quan hệ hợp đồng đào tạo nghề có những quy định bảo vệ đặc biệt dành cho Azubi.\n' +
          'a) Thời gian thử việc (Probezeit) trong học nghề theo § 20 BBiG tối thiểu và tối đa là bao lâu?\n' +
          'b) So sánh quy định chấm dứt hợp đồng (Kündigung) TRONG thời gian thử việc và SAU thời gian thử việc (§ 22 BBiG) đối với cả hai bên.\n' +
          'c) Mọi quyết định thôi việc phải tuân thủ hình thức bắt buộc nào (§ 623 BGB) và với Azubi vị thành niên thì khi nào mới có hiệu lực?',
        placeholderDe: 'a) Probezeit nach § 20 BBiG: mind. ... bis max. ...\nb) Während der Probezeit vs. Nach der Probezeit (§ 22 BBiG)...\nc) Formvorschrift & Minderjährige...',
        hintDe: 'a) Mindestens 1 Monat, höchstens 4 Monate! b) Probezeit: jederzeit ohne Frist & ohne Grund. Nach Probezeit: Betrieb nur noch fristlos aus wichtigem Grund; Azubi auch mit 4 Wochen Frist bei Berufsaufgabe/-wechsel. c) Schriftform auf Papier mit Originalunterschrift.',
        hintVi: 'a) Tối thiểu 1 tháng, tối đa 4 tháng! b) Trong thử việc: Bất cứ lúc nào không cần báo trước & không cần lý do. Sau thử việc: Công ty chỉ được đuổi ngay khi có lý do nghiêm trọng; Azubi được nghỉ báo trước 4 tuần nếu đổi nghề. c) Văn bản giấy ký tươi.',
        keywords: [
          { term: '1 Monat', points: 1.5, vi: 'Thời gian thử việc học nghề (§ 20 BBiG): Tối thiểu 1 tháng, tối đa 4 tháng (không phải 6 tháng như HĐ lao động thường!)', alt: ['4 Monate', 'vier Monate'] },
          { term: 'ohne Einhaltung einer Kündigungsfrist', points: 2, vi: 'Trong Probezeit: Cả 2 bên có thể chấm dứt bất cứ lúc nào, không cần thời hạn báo trước (fristlos) và không cần nêu lý do (ohne Angabe von Gründen)', alt: ['jederzeit', 'ohne Grund'] },
          { term: 'wichtiger Grund', points: 2, vi: 'Sau Probezeit: Doanh nghiệp CHỈ được phép sa thải không báo trước khi có lý do đặc biệt nghiêm trọng (fristlos aus wichtigem Grund, vd: trộm cắp, hành hung; phải trong 2 tuần kể từ khi biết lỗi)', alt: ['fristlos', 'Diebstahl', '2 Wochen'] },
          { term: '4 Wochen', points: 2, vi: 'Sau Probezeit: Riêng Azubi ngoài nghỉ fristlos còn được quyền nghỉ có báo trước 4 tuần (4 Wochen Kündigungsfrist) nếu bỏ nghề hoặc chuyển sang học nghề khác', alt: ['Berufsaufgabe', 'anderer Beruf', 'vier Wochen'] },
          { term: 'Schriftform', points: 2.5, vi: 'Bắt buộc bằng văn bản giấy có chữ ký tay (Schriftform § 623 BGB, cấm WhatsApp/E-Mail) và sau Probezeit phải ghi rõ lý do bằng văn bản; với người dưới 18 tuổi phải gửi đến người giám hộ (gesetzliche Vertreter/Eltern)', alt: ['gesetzliche Vertreter', 'Eltern', 'eigenhändige Unterschrift'] }
        ],
        musterloesungDe:
          'a) Dauer der Probezeit (§ 20 BBiG):\n' +
          'Die Probezeit im Berufsausbildungsverhältnis muss mindestens 1 Monat und darf höchstens 4 Monate betragen (Achtung: Bei regulären Arbeitsverträgen bis zu 6 Monate, bei Azubis maximal 4 Monate!).\n\n' +
          'b) Kündigungsregeln nach § 22 BBiG:\n' +
          '-Während der Probezeit: Das Ausbildungsverhältnis kann jederzeit von beiden Seiten (Azubi und Betrieb) ohne Einhaltung einer Kündigungsfrist und ohne Angabe von Gründen gekündigt werden.\n' +
          '-Nach Ablauf der Probezeit:\n' +
          '  1. Durch beide Seiten: Außerordentliche (fristlose) Kündigung aus einem wichtigen Grund (z. B. Diebstahl, Tätlichkeit, wiederholtes unentschuldigtes Fehlen nach Abmahnung). Die Kündigung muss innerhalb von 2 Wochen nach Bekanntwerden des Grundes erfolgen.\n' +
          '  2. Nur durch den Auszubildenden: Ordentliche Kündigung mit einer Kündigungsfrist von 4 Wochen, wenn der Azubi die Berufsausbildung aufgeben oder sich für eine andere Berufstätigkeit ausbilden lassen will.\n\n' +
          'c) Formvorschrift & Minderjährige:\n' +
          'Jede Kündigung muss zwingend schriftlich auf Papier mit eigenhändiger Unterschrift erfolgen (§ 623 BGB – E-Mail, SMS oder WhatsApp sind unwirksam!) und nach der Probezeit die Kündigungsgründe schriftlich enthalten. Bei minderjährigen Auszubildenden wird die Kündigung erst wirksam, wenn sie den gesetzlichen Vertretern (Eltern) zugeht.',
        musterloesungVi:
          'a) Thời gian thử việc của Azubi (§ 20 BBiG): Tối thiểu 1 tháng và tối đa 4 tháng.\n' +
          'b) Quy định chấm dứt hợp đồng (§ 22 BBiG):\n' +
          '-Trong thời gian thử việc: Cả hai bên có thể chấm dứt bất cứ lúc nào, không cần báo trước và không cần nêu lý do.\n' +
          '-Sau thời gian thử việc: Doanh nghiệp CHỈ được phép đuổi việc ngay lập tức khi có lý do nghiêm trọng (wichtiger Grund như trộm cắp, đánh nhau; phải ra quyết định trong vòng 2 tuần kể từ khi biết sự việc). Riêng Azubi có thêm quyền xin nghỉ báo trước 4 tuần nếu muốn bỏ nghề hoặc đổi sang học nghề khác.\n' +
          'c) Hình thức: Bắt buộc bằng văn bản giấy có chữ ký tươi (cấm qua WhatsApp/E-Mail) và sau thử việc phải ghi rõ lý do. Nếu Azubi dưới 18 tuổi thì thư thông báo phải được gửi tới cha mẹ/người giám hộ hợp pháp.',
        explanation: {
          whyCorrect: 'Nắm trọn vẹn điểm số phần luật đào tạo nghề BBiG trong đề thi WiSo IHK.',
          whyWrong: 'Nhầm thời gian thử việc tối đa của Azubi là 6 tháng (6 tháng là cho nhân viên bình thường theo § 622 BGB; Azubi chỉ tối đa 4 tháng theo § 20 BBiG!).',
          keyTakeaway: 'Con số vàng § 20 & § 22 BBiG: Probezeit = 1 đến 4 tháng | Sau Probezeit chủ không được đuổi thường (ordentlich), chỉ được đuổi fristlos trong 2 tuần kể từ khi phát hiện lỗi nặng | Azubi đổi nghề = báo trước 4 tuần!'
        }
      },
      {
        id: 'wiko-q2',
        no: 2,
        lf: 'wiko',
        fach: 'wiko',
        category: 'recht',
        points: 10,
        title: 'Jugendarbeitsschutzgesetz (JArbSchG) & Mutterschutzgesetz (MuSchG)',
        questionDe: 'Im Hotel arbeiten eine 17-jährige Auszubildende und eine schwangere Restaurantfachfrau.\n' +
          'a) Nennen Sie nach dem Jugendarbeitsschutzgesetz (JArbSchG) die Vorschriften für Jugendliche im Gastgewerbe (ab 16 Jahren) zu: täglicher/wöchentlicher Arbeitszeit, Ruhepausen, Nachtruhe, Schichtzeit/Freizeit und Wochenendarbeit.\n' +
          'b) Nennen Sie nach dem Mutterschutzgesetz (MuSchG) die Schutzfristen vor und nach der Geburt sowie drei besondere Beschäftigungsverbote in der Gastronomie.',
        questionVi: 'Trong khách sạn có một nữ Azubi 17 tuổi và một nữ nhân viên nhà hàng đang mang thai.\n' +
          'a) Theo Luật Bảo vệ lao động thanh thiếu niên (JArbSchG), hãy nêu quy định cho người từ 16 đến dưới 18 tuổi trong ngành nhà hàng về: Giờ làm việc ngày/tuần, Giờ nghỉ giải lao, Giờ giới nghiêm ban đêm, Thời gian nghỉ giữa 2 ca và Làm việc cuối tuần.\n' +
          'b) Theo Luật Bảo vệ thai sản (MuSchG), hãy nêu thời gian nghỉ thai sản trước và sau khi sinh cùng 3 điều cấm sử dụng lao động mang thai trong ngành nhà hàng.',
        placeholderDe: 'a) JArbSchG: Arbeitszeit ... / Pausen ... / Nachtruhe Gastgewerbe ... / Ruhezeit ...\nb) MuSchG: Schutzfrist vor/nach Geburt ... + 3 Verbote...',
        hintDe: 'a) Max. 8 h/Tag, 40 h/Woche (5-Tage-Woche); Pausen: >4,5–6 h = 30 Min., >6 h = 60 Min.; Nachtruhe Gastgewerbe ab 16 J. bis 22:00 Uhr; min. 12 h Freizeit zwischen 2 Schichten. b) 6 Wochen vor, 8 Wochen (bzw. 12 Wochen bei Früh-/Mehrlingsgeburt) nach der Geburt.',
        hintVi: 'a) Tối đa 8h/ngày, 40h/tuần (5 ngày/tuần); Nghỉ giải lao: 4,5–6h = 30 phút, >6h = 60 phút; Ngành nhà hàng từ 16 tuổi được làm đến 22:00; tối thiểu 12h nghỉ giữa 2 ca. b) 6 tuần trước sinh, 8 tuần (hoặc 12 tuần nếu sinh non/sinh đôi) sau sinh.',
        keywords: [
          { term: '40 Stunden', points: 1.5, vi: 'JArbSchG: Tối đa 8 giờ/ngày (tối đa 8,5 giờ nếu bù ngày khác) và 40 giờ/tuần trong 5 ngày/tuần', alt: ['8 Stunden', '5-Tage-Woche'] },
          { term: '60 Minuten', points: 1.5, vi: 'Giờ nghỉ giải lao (Ruhepausen): Làm từ 4,5 đến 6 giờ = ít nhất 30 phút; làm trên 6 giờ = ít nhất 60 phút', alt: ['30 Minuten', 'Ruhepausen'] },
          { term: '22 Uhr', points: 2, vi: 'Ngoại lệ ngành Gastgewerbe cho thanh thiếu niên ≥ 16 tuổi: Được làm tối đa đến 22:00 giờ (bình thường là 20:00 giờ); nghỉ liên tục ít nhất 12 giờ giữa 2 ca làm', alt: ['22:00 Uhr', '12 Stunden Freizeit', 'Nachtruhe'] },
          { term: '6 Wochen', points: 2, vi: 'MuSchG Schutzfristen: 6 tuần trước ngày dự sinh và 8 tuần sau khi sinh (12 tuần nếu sinh non hoặc đa thai / Früh- und Mehrlingsgeburten)', alt: ['8 Wochen', '12 Wochen', 'Mutterschutzfrist'] },
          { term: 'Kündigungsverbot', points: 1.5, vi: 'Cấm sa thải (Kündigungsverbot) từ đầu thai kỳ đến hết 4 tháng sau khi sinh (hoặc hết thời gian Elternzeit)', alt: ['4 Monate nach der Entbindung', 'Kündigungsschutz'] },
          { term: 'schwere körperliche Arbeit', points: 1.5, vi: 'Cấm làm việc nặng (bê vác > 5 kg thường xuyên), cấm làm thêm giờ/làm đêm sau 20–22h, cấm tiếp xúc hóa chất độc hại', alt: ['5 kg', 'Nachtarbeit', 'Überstunden', 'Gefahrstoffe'] }
        ],
        musterloesungDe:
          'a) Wichtige Regeln des Jugendarbeitsschutzgesetzes (JArbSchG für 15- bis 17-Jährige):\n' +
          '1. Arbeitszeit: Maximal 8 Stunden täglich (Ausnahme bis 8,5 h bei Ausgleich) und maximal 40 Stunden pro Woche bei einer 5-Tage-Woche.\n' +
          '2. Ruhepausen: Bei 4,5 bis 6 Stunden Arbeitszeit = mind. 30 Minuten Pause; bei mehr als 6 Stunden Arbeitszeit = mind. 60 Minuten Pause (erste Pause spätestens nach 4,5 Stunden).\n' +
          '3. Nachtruhe (Ausnahme Gastgewerbe): Jugendliche über 16 Jahre dürfen im Gastgewerbe bis 22:00 Uhr beschäftigt werden (unter 16 Jahren nur bis 20:00 Uhr), ab 6:00 Uhr morgens.\n' +
          '4. Tägliche Freizeit & Schichtzeit: Zwischen Feierabend und nächstem Arbeitsbeginn müssen mindestens 12 Stunden ununterbrochene Freizeit liegen.\n' +
          '5. Wochenende: Samstags- und Sonntagsarbeit ist im Gastgewerbe erlaubt, aber mindestens 2 Samstage und 2 Sonntage im Monat müssen frei bleiben (Ersatzruhetag unter der Woche).\n\n' +
          'b) Wichtige Regeln des Mutterschutzgesetzes (MuSchG):\n' +
          '1. Mutterschutzfristen: 6 Wochen vor dem errechneten Geburtstermin (Arbeit nur auf ausdrücklichen eigenen Wunsch erlaubt) und 8 Wochen absolutes Beschäftigungsverbot nach der Geburt (12 Wochen bei Früh- oder Mehrlingsgeburten sowie bei Behinderung des Kindes).\n' +
          '2. Besonderer Kündigungsschutz: Vom Beginn der Schwangerschaft bis 4 Monate nach der Entbindung (bzw. bis zum Ende der Elternzeit).\n' +
          '3. Drei Beschäftigungsverbote in der Gastronomie: Keine schwere körperliche Arbeit (regelmäßiges Heben über 5 kg, gelegentlich über 10 kg); kein Umgang mit Gefahrstoffen/Rauch; keine Mehrarbeit (Überstunden) und keine Nachtarbeit nach 20:00 Uhr (mit behördlicher Genehmigung und Einwilligung im Gastgewerbe max. bis 22:00 Uhr); ab dem 6. Monat kein ständiges Stehen über 4 Stunden.',
        musterloesungVi:
          'a) Quy định JArbSchG (cho người từ 15 đến dưới 18 tuổi):\n' +
          '-Giờ làm việc: Tối đa 8 giờ/ngày và 40 giờ/tuần (tuần làm 5 ngày).\n' +
          '-Nghỉ giải lao: Làm 4,5–6 giờ nghỉ ít nhất 30 phút; làm trên 6 giờ nghỉ ít nhất 60 phút.\n' +
          '-Giờ làm ban đêm trong ngành Nhà hàng – Khách sạn: Đủ 16 tuổi được làm đến 22:00 giờ (dưới 16 tuổi chỉ đến 20:00 giờ).\n' +
          '-Nghỉ giữa 2 ca: Phải có ít nhất 12 giờ nghỉ ngơi liên tục.\n' +
          '-Cuối tuần: Được phép làm Thứ Bảy/Chủ Nhật nhưng phải nghỉ bù và đảm bảo ít nhất 2 Thứ Bảy & 2 Chủ Nhật nghỉ mỗi tháng.\n' +
          'b) Quy định MuSchG (Bảo vệ thai sản):\n' +
          '-Thời gian nghỉ: 6 tuần trước khi sinh và bắt buộc nghỉ tuyệt đối 8 tuần sau khi sinh (12 tuần nếu sinh non hoặc sinh đôi/đa thai).\n' +
          '-Cấm sa thải: Từ khi mang thai đến 4 tháng sau sinh.\n' +
          '-3 điều cấm trong nhà hàng: Cấm bê vác nặng (> 5 kg thường xuyên), cấm làm thêm giờ/làm khuya sau 20–22h, cấm tiếp xúc hóa chất độc hại và đứng liên tục quá 4 giờ từ tháng thứ 6.',
        explanation: {
          whyCorrect: 'Tổng hợp chuẩn xác toàn bộ các con số pháp lý hay hỏi nhất về JArbSchG và MuSchG trong kỳ thi WiSo.',
          whyWrong: 'Nhầm giờ làm tối đa của Azubi 17 tuổi trong nhà hàng là 23:00 hoặc 24:00 (luật chỉ cho phép đến 22:00 giờ!).',
          keyTakeaway: 'Bộ số vàng JArbSchG: 8h/ngày – 40h/tuần – 5 ngày/tuần – >6h nghỉ 60p – Nghỉ giữa ca 12h – Làm tối đến 22h (từ 16 tuổi). MuSchG: 6 tuần trước – 8 (hoặc 12) tuần sau sinh!'
        }
      },
      {
        id: 'wiko-q3',
        no: 3,
        lf: 'wiko',
        fach: 'wiko',
        category: 'recht',
        points: 10,
        title: 'Die 5 Säulen der deutschen Sozialversicherung & Lohnabrechnung (Brutto → Netto)',
        questionDe: 'Vom monatlichen Bruttolohn werden Steuern und Sozialversicherungsbeiträge abgezogen.\n' +
          'a) Nennen Sie alle fünf Zweige (Säulen) der gesetzlichen Sozialversicherung in Deutschland mit ihren jeweiligen Trägern und wichtigsten Leistungen.\n' +
          'b) Welche dieser fünf Versicherungen wird zu 100 % allein vom Arbeitgeber bezahlt und wer ist dort der Träger für das Gastgewerbe?\n' +
          'c) Erklären Sie das Berechnungsschema einer Lohn-/Gehaltsabrechnung vom Bruttolohn bis zum Auszahlungsbetrag (inkl. der zwei Lohnabzugssteuern).',
        questionVi: 'Từ tiền lương gộp hằng tháng (Bruttolohn), thuế và các khoản bảo hiểm xã hội sẽ được khấu trừ.\n' +
          'a) Nêu đủ 5 trụ cột (5 Säulen) của hệ thống Bảo hiểm xã hội bắt buộc tại Đức kèm cơ quan quản lý (Träger) và quyền lợi chính của từng trụ cột.\n' +
          'b) Khoản bảo hiểm nào trong 5 khoản này do chủ sử dụng lao động (Arbeitgeber) đóng 100 % và cơ quan quản lý cho ngành nhà hàng là ai?\n' +
          'c) Giải thích sơ đồ tính bảng lương từ Lương gộp (Bruttolohn) ra Lương thực nhận (Nettolohn / Auszahlungsbetrag), bao gồm các loại thuế khấu trừ.',
        placeholderDe: 'a) Die 5 Säulen der Sozialversicherung: 1. KV... 2. RV... 3. AV... 4. PV... 5. UV...\nb) 100 % Arbeitgeber = ... (Träger: BGN)\nc) Schema: Bruttolohn - ... - ... = Nettolohn',
        hintDe: 'a) Kranken-, Renten-, Arbeitslosen-, Pflege-, Unfallversicherung. b) Gesetzliche Unfallversicherung = 100 % Arbeitgeber (Berufsgenossenschaft Nahrungsmittel und Gastgewerbe – BGN).',
        hintVi: 'a) Y tế (KV), Hưu trí (RV), Thất nghiệp (AV), Chăm sóc điều dưỡng (PV), Tai nạn lao động (UV). b) Bảo hiểm tai nạn lao động (UV) do chủ đóng 100 % qua hiệp hội BGN.',
        keywords: [
          { term: 'Krankenversicherung', points: 1, vi: '1. Krankenversicherung (KV – Krankenkassen): Khám chữa bệnh, thuốc men, Krankengeld từ tuần thứ 7', alt: ['Krankenkasse', 'Krankengeld'] },
          { term: 'Rentenversicherung', points: 1, vi: '2. Rentenversicherung (RV – Deutsche Rentenversicherung): Lương hưu tuổi già, phục hồi chức năng, hưu mất sức', alt: ['Altersrente', 'Rehabilitation'] },
          { term: 'Arbeitslosenversicherung', points: 1, vi: '3. Arbeitslosenversicherung (AV – Bundesagentur für Arbeit): Trợ cấp thất nghiệp ALG I, tư vấn việc làm, đào tạo lại', alt: ['Bundesagentur für Arbeit', 'Arbeitslosengeld'] },
          { term: 'Pflegeversicherung', points: 1, vi: '4. Pflegeversicherung (PV – Pflegekassen bei den Krankenkassen): Chi phí điều dưỡng khi mất khả năng tự chăm sóc', alt: ['Pflegekasse', 'Pflegegeld'] },
          { term: 'Unfallversicherung', points: 2, vi: '5. Gesetzliche Unfallversicherung (UV): Do Arbeitgeber đóng 100 %! Cơ quan quản lý ngành nhà hàng là BGN (Berufsgenossenschaft Nahrungsmittel und Gastgewerbe) bảo vệ tai nạn lao động & đường đi làm (Wegeunfall)', alt: ['100 % Arbeitgeber', 'BGN', 'Berufsgenossenschaft', 'Wegeunfall'] },
          { term: 'Lohnsteuer', points: 2, vi: 'Khấu trừ thuế từ Bruttolohn: Lohnsteuer, Kirchensteuer (nếu có) và Solidaritätszuschlag', alt: ['Kirchensteuer', 'Solidaritätszuschlag'] },
          { term: 'Nettolohn', points: 2, vi: 'Công thức: Bruttolohn - Steuern (Lohn-/Kirchensteuer) - Arbeitnehmeranteil zur Sozialversicherung (KV, RV, AV, PV) = Nettolohn', alt: ['Arbeitnehmeranteil', 'Auszahlungsbetrag'] }
        ],
        musterloesungDe:
          'a) Die fünf Säulen der gesetzlichen Sozialversicherung:\n' +
          '1. Krankenversicherung (KV – Träger: Gesetzliche Krankenkassen wie AOK, TK, Barmer): Ärztliche Behandlung, Medikamente, Krankenhausaufenthalt, Lohnfortzahlung (6 Wochen durch Arbeitgeber, ab der 7. Woche Krankengeld durch KV).\n' +
          '2. Rentenversicherung (RV – Träger: Deutsche Rentenversicherung): Altersrente, Erwerbsminderungsrente, Hinterbliebenenrente (Witwen-/Waisenrente), Rehabilitationsmaßnahmen.\n' +
          '3. Arbeitslosenversicherung (AV – Träger: Bundesagentur für Arbeit): Arbeitslosengeld I, Kurzarbeitergeld, Berufsberatung, Weiterbildung und Arbeitsvermittlung.\n' +
          '4. Pflegeversicherung (PV – Träger: Pflegekassen bei den Krankenkassen): Sach- und Geldleistungen für häusliche oder stationäre Pflege bei Pflegebedürftigkeit.\n' +
          '5. Unfallversicherung (UV – Träger: Gewerbliche Berufsgenossenschaften): Heilbehandlung, Verletztengeld und Unfallrente bei Arbeitsunfällen, Wegeunfällen (direkter Weg zur/von der Arbeit) und Berufskrankheiten.\n\n' +
          'b) 100 % Arbeitgeberfinanzierung:\n' +
          'Die gesetzliche Unfallversicherung (UV) wird zu 100 % allein vom Arbeitgeber getragen (die anderen vier Säulen werden grundsätzlich je zur Hälfte – 50:50 – zwischen Arbeitgeber und Arbeitnehmer geteilt, bei PV mit Zuschlag für Kinderlose ab 23 J.). Zuständiger Träger für unsere Branche ist die BGN (Berufsgenossenschaft Nahrungsmittel und Gastgewerbe).\n\n' +
          'c) Berechnungsschema der Lohnabrechnung:\n' +
          '  Bruttolohn (Grundgehalt + Zuschläge + geldwerter Vorteil / Sachbezüge)\n' +
          '- Steuern (Lohnsteuer je nach Steuerklasse I–VI, ggf. Kirchensteuer, ggf. Solidaritätszuschlag)\n' +
          '- Arbeitnehmeranteil zur Sozialversicherung (KV + RV + AV + PV)\n' +
          '= Nettolohn (ggf. abzüglich Vorschuss / vermögenswirksame Leistungen = Auszahlungsbetrag).',
        musterloesungVi:
          'a) 5 trụ cột BHXH Đức:\n' +
          '1. Krankenversicherung (Bảo hiểm y tế – Krankenkassen): Khám chữa bệnh, trả lương ốm Krankengeld từ tuần thứ 7 (6 tuần đầu do chủ trả).\n' +
          '2. Rentenversicherung (Bảo hiểm hưu trí – Deutsche Rentenversicherung): Lương hưu, phục hồi chức năng.\n' +
          '3. Arbeitslosenversicherung (Bảo hiểm thất nghiệp – Bundesagentur für Arbeit): Trợ cấp thất nghiệp ALG I, giới thiệu việc làm.\n' +
          '4. Pflegeversicherung (Bảo hiểm chăm sóc điều dưỡng – Pflegekassen): Chi trả điều dưỡng khi già yếu/bệnh tật.\n' +
          '5. Unfallversicherung (Bảo hiểm tai nạn lao động – Berufsgenossenschaft): Bảo vệ tai nạn tại nơi làm việc, trên đường đi làm trực tiếp (Wegeunfall) và bệnh nghề nghiệp.\n' +
          'b) Bảo hiểm tai nạn lao động (Unfallversicherung) do chủ doanh nghiệp đóng 100 % (4 trụ cột kia chia đôi ~50:50). Cơ quan quản lý ngành ẩm thực là BGN.\n' +
          'c) Sơ đồ tính lương: Bruttolohn – Thuế (Lohnsteuer, Kirchensteuer) – Phần đóng BHXH của người lao động (KV, RV, AV, PV) = Nettolohn.',
        explanation: {
          whyCorrect: 'Trình bày đầy đủ 5 trụ cột BHXH, bẫy câu hỏi Unfallversicherung và sơ đồ tính lương chuẩn IHK WiSo.',
          whyWrong: 'Trừ khoản Unfallversicherung vào bảng lương của nhân viên (trên bảng lương nhân viên chỉ trừ 4 khoản: KV, RV, AV, PV!).',
          keyTakeaway: 'Bẫy đề thi WiSo số 1: Trên bảng lương người lao động chỉ có 4 khoản BHXH vì khoản thứ 5 (Unfallversicherung / BGN) do chủ doanh nghiệp đóng 100%!'
        }
      },
      {
        id: 'wiko-q4',
        no: 4,
        lf: 'wiko',
        fach: 'wiko',
        category: 'recht',
        points: 10,
        title: 'Betriebsrat (BetrVG), Tarifvertrag (NGG & DEHOGA) & Umgang mit Mobbing',
        questionDe: 'Mitbestimmung im Betrieb und Tarifrecht sichern faire Arbeitsbedingungen.\n' +
          'a) Ab welcher Betriebsgröße kann ein Betriebsrat gewählt werden und wer besitzt das aktive bzw. passive Wahlrecht nach dem Betriebsverfassungsgesetz (BetrVG)?\n' +
          'b) Tarifrecht: Wer sind die beiden Tarifpartner (Sozialpartner) im Gastgewerbe, was bedeutet „Tarifautonomie“ und was besagt das „Günstigkeitsprinzip“?\n' +
          'c) Umgang mit Mobbing (IHK Winter 2023/24): Ein Azubi wird im Betrieb systematisch gemobbt. Nennen Sie drei konkrete Schritte bzw. Anlaufstellen, an die er sich wenden kann.',
        questionVi: 'Quyền đồng quyết trong doanh nghiệp và thỏa ước lao động tập thể bảo đảm điều kiện làm việc công bằng.\n' +
          'a) Từ quy mô nhân sự bao nhiêu người thì được bầu Hội đồng nhân viên (Betriebsrat), và ai có quyền bầu cử (aktives Wahlrecht) cũng như quyền ứng cử (passives Wahlrecht) theo Luật BetrVG?\n' +
          'b) Luật Thỏa ước tập thể (Tarifrecht): Hai đối tác đàm phán (Tarifpartner) trong ngành Nhà hàng – Khách sạn là ai, „Tarifautonomie“ nghĩa là gì và nguyên tắc „Günstigkeitsprinzip“ quy định điều gì?\n' +
          'c) Xử lý bắt nạt nơi công sở (Mobbing – Đề IHK Winter 2023/24): Một Azubi bị bắt nạt có hệ thống trong chỗ làm. Hãy nêu 3 bước hành động hoặc cơ quan hỗ trợ cụ thể mà Azubi có thể tìm đến.',
        placeholderDe: 'a) Betriebsrat ab ... Arbeitnehmern / Aktives Wahlrecht ab ... / Passives Wahlrecht ab ...\nb) Tarifpartner Gastgewerbe: ... vs. ... + Tarifautonomie + Günstigkeitsprinzip...\nc) 3 Maßnahmen / Anlaufstellen bei Mobbing...',
        hintDe: 'a) Ab 5 ständig wahlberechtigten Arbeitnehmern; aktiv = ab 16 Jahren; passiv = ab 18 Jahren + 6 Monate Betriebszugehörigkeit. b) Gewerkschaft NGG & Arbeitgeberverband DEHOGA. c) Mobbing-Tagebuch führen, Ausbilder/Betriebsrat/JAV einschalten, IHK-Ausbildungsberatung.',
        hintVi: 'a) Từ 5 lao động; Quyền bầu (aktiv) = từ 16 tuổi; Quyền ứng cử (passiv) = từ 18 tuổi + 6 tháng thâm niên. b) Công đoàn NGG & Hiệp hội chủ DEHOGA. c) Ghi nhật ký bằng chứng, báo Ausbilder/Betriebsrat/JAV, nhờ ban tư vấn IHK.',
        keywords: [
          { term: '5 ständig', points: 1.5, vi: 'Được thành lập Betriebsrat từ 5 lao động thường xuyên có quyền bầu cử (trong đó ít nhất 3 người đủ điều kiện ứng cử); nhiệm kỳ 4 năm', alt: ['fünf Arbeitnehmer', '5 Arbeitnehmer'] },
          { term: '16 Jahren', points: 1.5, vi: 'Aktives Wahlrecht (quyền đi bỏ phiếu bầu): Từ đủ 16 tuổi; Passives Wahlrecht (quyền ứng cử): Từ đủ 18 tuổi và làm việc tại công ty ≥ 6 tháng', alt: ['18 Jahren', '6 Monate', 'aktives Wahlrecht', 'passives Wahlrecht'] },
          { term: 'NGG', points: 1.5, vi: 'Hai Tarifpartner ngành nhà hàng: Công đoàn NGG (Gewerkschaft Nahrung-Genuss-Gaststätten) và Hiệp hội chủ sử dụng lao động DEHOGA', alt: ['DEHOGA', 'Gewerkschaft'] },
          { term: 'Tarifautonomie', points: 1.5, vi: 'Tarifautonomie (Art. 9 Abs. 3 GG): Quyền tự quyết đàm phán lương & điều kiện làm việc giữa Công đoàn và Hiệp hội chủ mà Nhà nước không được can thiệp', alt: ['ohne staatliche Einmischung', 'Staat mischt sich nicht ein'] },
          { term: 'Günstigkeitsprinzip', points: 1.5, vi: 'Günstigkeitsprinzip: Thỏa thuận trong HĐ lao động cá nhân chỉ được khác với Tarifvertrag/luật nếu CÓ LỢI HƠN cho người lao động (nhiều lương hơn, nhiều ngày phép hơn)', alt: ['besser gestellt', 'vorteilhafter für Arbeitnehmer'] },
          { term: 'IHK', points: 2.5, vi: 'Xử lý Mobbing (IHK Winter 23/24): 1. Nói chuyện thẳng thắn & ghi nhật ký bằng chứng (Mobbing-Tagebuch); 2. Báo người đào tạo (Ausbilder), Giám đốc, Betriebsrat hoặc JAV; 3. Liên hệ cố vấn đào tạo của IHK (Ausbildungsberater der IHK) hoặc Vertrauenslehrer ở trường nghề', alt: ['Mobbing-Tagebuch', 'Ausbilder', 'JAV', 'Betriebsrat', 'Vertrauenslehrer'] }
        ],
        musterloesungDe:
          'a) Betriebsrat nach dem Betriebsverfassungsgesetz (BetrVG):\n' +
          '-Voraussetzung: In Betrieben mit in der Regel mindestens 5 ständig wahlberechtigten Arbeitnehmern, von denen mindestens 3 wählbar sind (Amtszeit: 4 Jahre).\n' +
          '-Aktives Wahlrecht (wählen dürfen): Alle Arbeitnehmer und Azubis ab Vollendung des 16. Lebensjahres (seit der Reform 2021 ab 16 J.!).\n' +
          '-Passives Wahlrecht (gewählt werden / kandidieren dürfen): Alle Arbeitnehmer ab 18 Jahren, die dem Betrieb seit mindestens 6 Monaten angehören.\n' +
          '(Für Jugendliche und Azubis gibt es zusätzlich die Jugend- und Auszubildendenvertretung – JAV).\n\n' +
          'b) Tarifrecht im Gastgewerbe:\n' +
          '-Sozialpartner (Tarifpartner): Auf Arbeitnehmerseite die Gewerkschaft NGG (Nahrung-Genuss-Gaststätten), auf Arbeitgeberseite der DEHOGA (Deutscher Hotel- und Gaststättenverband).\n' +
          '-Tarifautonomie (Art. 9 Abs. 3 GG): Das Recht der Gewerkschaften und Arbeitgeberverbände, Löhne und Arbeitsbedingungen eigenverantwortlich und ohne staatliche Einmischung auszuhandeln.\n' +
          '-Günstigkeitsprinzip: Im Einzelarbeitsvertrag darf vom gültigen Tarifvertrag nur dann abgewichen werden, wenn die Regelung für den Arbeitnehmer günstiger ist (z. B. höheres Gehalt oder mehr Urlaubstage als im Tarifvertrag).\n\n' +
          'c) Drei Maßnahmen / Anlaufstellen bei Mobbing im Betrieb (IHK Winter 2023/24):\n' +
          '1. Vorfälle mit Datum, Uhrzeit, Beteiligten und Zeugen schriftlich dokumentieren (Mobbing-Tagebuch führen) und das direkte, klärende Gespräch suchen.\n' +
          '2. Interne Anlaufstellen einschalten: Ausbilder, Geschäftsleitung, Betriebsrat oder die Jugend- und Auszubildendenvertretung (JAV) um Hilfe und Schutz bitten (Fürsorgepflicht des Arbeitgebers!).\n' +
          '3. Externe Hilfe hinzuziehen: Ausbildungsberater der zuständigen IHK, Vertrauenslehrer/Schulsozialarbeit an der Berufsschule oder Gewerkschaft (NGG) kontaktieren.',
        musterloesungVi:
          'a) Betriebsrat (Hội đồng nhân viên): Được bầu ở doanh nghiệp có từ 5 lao động thường xuyên trở lên (trong đó ít nhất 3 người đủ tuổi ứng cử). Quyền đi bầu (aktives Wahlrecht): Từ đủ 16 tuổi. Quyền ứng cử (passives Wahlrecht): Từ đủ 18 tuổi và có ít nhất 6 tháng thâm niên tại công ty.\n' +
          'b) Hai đối tác đàm phán ngành nhà hàng là Công đoàn NGG và Hiệp hội chủ DEHOGA. Tarifautonomie là quyền tự quyết đàm phán thỏa ước tập thể không có sự can thiệp của Nhà nước. Günstigkeitsprinzip quy định hợp đồng cá nhân chỉ được khác với thỏa ước tập thể nếu có lợi hơn cho người lao động.\n' +
          'c) 3 bước xử lý khi bị Mobbing (Đề IHK Winter 2023/24): 1. Ghi chép nhật ký bằng chứng (ngày giờ, người làm chứng) và yêu cầu dừng hành vi; 2. Báo cáo cho Ausbilder, Giám đốc, Betriebsrat hoặc đại diện thanh niên JAV; 3. Nhờ sự can thiệp của cố vấn đào tạo tại IHK (IHK-Ausbildungsberatung) hoặc giáo viên phụ trách ở trường nghề.',
        explanation: {
          whyCorrect: 'Cập nhật đúng luật BetrVG mới (aktives Wahlrecht hạ xuống từ 16 tuổi) và trả lời trọn vẹn câu hỏi Mobbing trong đề IHK Winter 2023/24.',
          whyWrong: 'Viết aktives Wahlrecht là 18 tuổi (luật cũ trước năm 2021 là 18 tuổi, hiện nay đã hạ xuống 16 tuổi!).',
          keyTakeaway: 'Cập nhật luật mới BetrVG: Bầu Betriebsrat (Aktiv) = 16 tuổi | Ứng cử (Passiv) = 18 tuổi + 6 tháng thâm niên | Hai đối tác ngành Gastro = NGG & DEHOGA!'
        }
      }
    ],

    /* ========================================================================
       GK: GEMEINSCHAFTSKUNDE / POLITIK (DEMOKRATIE, WAHLEN, GESCHICHTE & METHODIK)
       ======================================================================== */
    gk: [
      {
        id: 'gk-q1',
        no: 1,
        lf: 'gk',
        fach: 'gk',
        category: 'recht',
        points: 10,
        title: 'Politische Partizipation (4 Formen) & Direkte Demokratie (3 Stufen Volksgesetzgebung)',
        questionDe: 'Demokratie lebt vom Mitmachen der Bürgerinnen und Bürger.\n' +
          'a) Nennen und erläutern Sie vier unterschiedliche Möglichkeiten politischer Partizipation in Deutschland und nennen Sie jeweils einen Vorteil und ein Risiko digitaler Partizipation (Online-Petitionen, Social Media).\n' +
          'b) Erklären Sie die drei aufeinander aufbauenden Stufen der direkten Demokratie (Volksgesetzgebung auf Landesebene) und nennen Sie je zwei Vor- und Nachteile direkter Demokratie gegenüber der repräsentativen Demokratie.',
        questionVi: 'Nền dân chủ sống nhờ sự tham gia của công dân.\n' +
          'a) Nêu và giải thích 4 hình thức tham gia chính trị (politische Partizipation) khác nhau tại Đức, đồng thời nêu 1 ưu điểm và 1 rủi ro của tham gia chính trị số (Online-Petitionen, mạng xã hội).\n' +
          'b) Giải thích 3 bước kế tiếp nhau của dân chủ trực tiếp (Volksgesetzgebung ở cấp bang) và nêu 2 ưu điểm, 2 nhược điểm của dân chủ trực tiếp so với dân chủ đại diện.',
        placeholderDe: 'a) 4 Möglichkeiten Partizipation + Digitale Partizipation (Vorteil/Risiko)...\nb) 3 Stufen: 1. Volksinitiative -> 2. Volksbegehren -> 3. Volksentscheid + Vor-/Nachteile...',
        hintDe: 'a) Wahlen, Parteien, Bürgerinitiativen, Demonstrationen/Petitionen. b) 1. Volksinitiative (Volksantrag), 2. Volksbegehren, 3. Volksentscheid.',
        hintVi: 'a) Bầu cử, Đảng phái, Sáng kiến công dân, Biểu tình/Kiến nghị. b) 1. Volksinitiative (Đề xuất), 2. Volksbegehren (Thu thập chữ ký yêu cầu trưng cầu), 3. Volksentscheid (Bỏ phiếu quyết định).',
        keywords: [
          { term: 'Wahlen', points: 1, vi: '1. Tham gia bầu cử & ứng cử (Wahlen auf Kommunal-, Landes-, Bundes- und EU-Ebene)', alt: ['wählen'] },
          { term: 'Parteien', points: 1, vi: '2. Tham gia đảng phái chính trị (Mitarbeit in Parteien) hoặc công đoàn/hiệp hội (Verbände)', alt: ['Gewerkschaften'] },
          { term: 'Bürgerinitiative', points: 1, vi: '3. Sáng kiến công dân (Bürgerinitiativen), biểu tình hợp pháp (Demonstrationen) hoặc kiến nghị (Petitionen Art. 17 GG)', alt: ['Demonstration', 'Petition'] },
          { term: 'Filterblasen', points: 1.5, vi: 'Digitale Partizipation: Ưu = Ngưỡng tham gia thấp, nhanh, tiếp cận giới trẻ; Rủi ro = Fake News, thao túng, bong bóng thông tin (Filterblasen), Hate Speech', alt: ['Fake News', 'niedrigschwellig', 'Manipulation'] },
          { term: 'Volksinitiative', points: 1.5, vi: 'Bước 1: Volksinitiative / Volksantrag (Nhóm công dân thu thập chữ ký ban đầu để trình dự thảo lên Nghị viện bang Landtag)', alt: ['Volksantrag', 'Landtag'] },
          { term: 'Volksbegehren', points: 1.5, vi: 'Bước 2: Volksbegehren (Nếu Landtag bác bỏ, thu thập lượng lớn chữ ký cử tri để buộc tổ chức trưng cầu dân ý)', alt: ['Unterschriftensammlung'] },
          { term: 'Volksentscheid', points: 2.5, vi: 'Bước 3: Volksentscheid (Toàn bộ cử tri đi bỏ phiếu Trưng cầu dân ý quyết định luật); Ưu = Tăng tính chính danh/gắn kết; Nhược = Dễ bị dân túy (Populismus) thao túng, đơn giản hóa vấn đề phức tạp', alt: ['Abstimmung', 'Populismus', 'Komplexität'] }
        ],
        musterloesungDe:
          'a) Vier Formen politischer Partizipation & Digitale Partizipation:\n' +
          '1. Teilnahme an Wahlen (aktives und passives Wahlrecht auf Kommunal-, Landes-, Bundes- und EU-Ebene).\n' +
          '2. Mitgliedschaft und Mitarbeit in politischen Parteien (Art. 21 GG).\n' +
          '3. Gründung oder Unterstützung einer Bürgerinitiative (konkretes lokales Anliegen), Teilnahme an Demonstrationen (Art. 8 GG) oder Einreichen von Petitionen (Art. 17 GG).\n' +
          '4. Engagement in Gewerkschaften, Jugendorganisationen oder NGOs (z. B. Fridays for Future).\n' +
          '-Digitale Partizipation: Vorteil = Niedrigschwellig, schnell, ortsunabhängig und hohe Reichweite besonders bei jungen Menschen. Risiko = Verbreitung von Fake News/Desinformation, Filterblasen (Echokammern), oberflächlicher „Clicktivism“ und Hassrede.\n\n' +
          'b) Die drei Stufen der Volksgesetzgebung (direkte Demokratie auf Landesebene):\n' +
          '1. Stufe – Volksinitiative (bzw. Volksantrag): Bürger sammeln ein erstes Quorum an Unterschriften, damit sich das Parlament (Landtag) mit einem Gesetzentwurf befassen muss.\n' +
          '2. Stufe – Volksbegehren: Lehnt der Landtag den Entwurf ab, müssen innerhalb einer Frist deutlich mehr Unterschriften gesammelt werden, um eine Volksabstimmung zu erzwingen.\n' +
          '3. Stufe – Volksentscheid: Alle wahlberechtigten Bürger stimmen an der Wahlurne verbindlich mit „Ja“ oder „Nein“ über das Gesetz ab.\n' +
          '-Vorteile direkter Demokratie: Höhere Politikverdrossenheit wird abgebaut, direkte Kontrolle der Politiker, hohe Akzeptanz der Entscheidung.\n' +
          '-Nachteile: Komplexe Sachverhalte werden oft auf „Ja/Nein“ verkürzt, Gefahr durch Populismus und emotionale Stimmungsmache, Schutz von Minderheiten kann gefährdet sein.',
        musterloesungVi:
          'a) 4 hình thức tham gia chính trị: 1. Đi bầu cử và ứng cử; 2. Tham gia đảng phái chính trị; 3. Lập nhóm sáng kiến công dân (Bürgerinitiative), biểu tình hoặc gửi kiến nghị (Petition); 4. Hoạt động trong công đoàn/tổ chức xã hội. Tham gia qua mạng: Ưu = Nhanh, dễ tiếp cận, lan tỏa rộng; Rủi ro = Tin giả (Fake News), bong bóng thông tin (Filterblasen), kích động cảm tính.\n' +
          'b) 3 bước dân chủ trực tiếp (Volksgesetzgebung): Bước 1: Volksinitiative (Thu thập chữ ký ban đầu buộc Nghị viện bang thảo luận); Bước 2: Volksbegehren (Nếu Nghị viện từ chối, thu thập số chữ ký lớn hơn để yêu cầu trưng cầu); Bước 3: Volksentscheid (Toàn dân bỏ phiếu quyết định). Ưu điểm: Dân quyết định trực tiếp, tăng hứng thú chính trị; Nhược điểm: Dễ bị chủ nghĩa dân túy (Populismus) dẫn dắt và giản lược hóa các vấn đề kinh tế – pháp lý phức tạp.',
        explanation: {
          whyCorrect: 'Bao trọn toàn bộ nội dung đề Klassenarbeit GK Nr. 1 (Partizipation & Direkte Demokratie).',
          whyWrong: 'Nhầm lẫn thứ tự giữa Volksbegehren (bước 2: xin mở cuộc bỏ phiếu) và Volksentscheid (bước 3: cuộc bỏ phiếu quyết định cuối cùng).',
          keyTakeaway: 'Thứ tự 3 bậc thang dân chủ trực tiếp: 1. Volksinitiative (Đề xuất) → 2. Volksbegehren (Yêu cầu) → 3. Volksentscheid (Quyết định)!'
        }
      },
      {
        id: 'gk-q2',
        no: 2,
        lf: 'gk',
        fach: 'gk',
        category: 'recht',
        points: 10,
        title: 'Grundrechte (Menschen- vs. Bürgerrechte, Art. 1 & 79 GG) & Gleichberechtigung (Art. 3 GG)',
        questionDe: 'Die Grundrechte im Grundgesetz (Art. 1–19 GG) bilden das Fundament unseres Rechtsstaats.\n' +
          'a) Unterscheiden Sie „Menschenrechte“ (Jedermannsrechte) und „Bürgerrechte“ (Deutschenrechte) mit jeweils drei Beispielen aus dem Grundgesetz.\n' +
          'b) Warum sind Art. 1 GG (Menschenwürde) und Art. 20 GG durch die „Ewigkeitsklausel“ (Art. 79 Abs. 3 GG) besonders geschützt, und unter welchen Voraussetzungen dürfen Grundrechte wie das Briefgeheimnis (Art. 10) oder die Unverletzlichkeit der Wohnung (Art. 13) eingeschränkt werden?\n' +
          'c) Gleichberechtigung (Art. 3 Abs. 2 GG): Erklären Sie „Gender-Pay-Gap“ und „Care-Arbeit“ und nennen Sie drei staatliche Maßnahmen zur Förderung der Gleichberechtigung.',
        questionVi: 'Các quyền cơ bản trong Hiến pháp Đức (Art. 1–19 GG) là nền tảng của nhà nước pháp quyền.\n' +
          'a) Phân biệt „Menschenrechte“ (Quyền con người) và „Bürgerrechte“ (Quyền công dân Đức) kèm 3 ví dụ trong Hiến pháp cho mỗi nhóm.\n' +
          'b) Tại sao Điều 1 (Nhân phẩm) và Điều 20 GG được bảo vệ tuyệt đối bởi „Điều khoản vĩnh cửu“ (Ewigkeitsklausel – Art. 79 Abs. 3 GG), và trong trường hợp nào các quyền như Bí mật thư tín (Art. 10) hay Bất khả xâm phạm chỗ ở (Art. 13) có thể bị hạn chế hợp pháp?\n' +
          'c) Bình đẳng giới (Art. 3 Abs. 2 GG): Giải thích „Gender-Pay-Gap“ và „Care-Arbeit“, đồng thời nêu 3 biện pháp của Nhà nước nhằm thúc đẩy bình đẳng giới.',
        placeholderDe: 'a) Menschenrechte (Jeder) vs. Bürgerrechte (Deutsche) + je 3 Beispiele...\nb) Ewigkeitsklausel Art. 79 Abs. 3 GG + Einschränkung durch Gesetz...\nc) Gender-Pay-Gap, Care-Arbeit & 3 staatliche Maßnahmen...',
        hintDe: 'a) Menschenrechte („Jeder hat das Recht...“: Art. 1, 2, 3, 4, 5 GG); Bürgerrechte („Alle Deutschen...“: Art. 8 Versammlung, Art. 9 Vereinigung, Art. 11 Freizügigkeit, Art. 12 Berufswahl).',
        hintVi: 'a) Menschenrechte („Mọi người...“: Nhân phẩm, Tự do thân thể, Bình đẳng, Tôn giáo, Ngôn luận); Bürgerrechte („Mọi công dân Đức...“: Hội họp, Lập hội, Tự do cư trú, Tự do chọn nghề).',
        keywords: [
          { term: 'Menschenrechte', points: 1.5, vi: 'Menschenrechte (Jedermannsrechte – áp dụng cho mọi con người bất kể quốc tịch): Nhân phẩm (Art. 1), Tự do cá nhân (Art. 2), Bình đẳng (Art. 3), Tôn giáo (Art. 4), Ngôn luận/Báo chí (Art. 5)', alt: ['Jedermannsrechte', 'Menschenwürde', 'Meinungsfreiheit'] },
          { term: 'Bürgerrechte', points: 1.5, vi: 'Bürgerrechte (Deutschenrechte – chỉ dành cho công dân Đức): Hội họp (Art. 8), Lập hội (Art. 9), Tự do đi lại cư trú (Art. 11), Tự do nghề nghiệp (Art. 12), Bầu cử (Art. 38)', alt: ['Deutschenrechte', 'Versammlungsfreiheit', 'Berufsfreiheit', 'Freizügigkeit'] },
          { term: 'Ewigkeitsklausel', points: 2, vi: 'Ewigkeitsklausel (Art. 79 Abs. 3 GG): Cấm sửa đổi hoặc xóa bỏ Art. 1 (Menschenwürde) và Art. 20 (Demokratie-, Rechts-, Sozial-, Bundesstaat) kể cả khi có 100 % phiếu Quốc hội (rút kinh nghiệm từ chế độ độc tài NS 1933)', alt: ['Art. 79 Abs. 3', 'unantastbar', 'niemals abgeschafft'] },
          { term: 'Richtervorbehalt', points: 1.5, vi: 'Hạn chế quyền cơ bản (Gesetzesvorbehalt): Chỉ được thực hiện trên cơ sở luật định và lệnh của Thẩm phán (Richtervorbehalt, vd: khám nhà/nghe lén khi có nghi phạm khủng bố/tội phạm nặng), không được xâm phạm cốt lõi quyền (Wesensgehaltsgarantie Art. 19)', alt: ['Gesetzesvorbehalt', 'richterliche Anordnung', 'Gefahr im Verzug'] },
          { term: 'Gender-Pay-Gap', points: 1.5, vi: 'Gender-Pay-Gap: Khoảng cách chênh lệch thu nhập trung bình theo giờ giữa nam và nữ; Care-Arbeit: Công việc chăm sóc gia đình/con cái/người già không lương', alt: ['Lohnlücke', 'Care-Arbeit', 'unbezahlte Sorgearbeit'] },
          { term: 'Elterngeld', points: 2, vi: '3 biện pháp Nhà nước: Mở rộng nhà trẻ (Kita-Ausbau & Rechtsanspruch ab 1 J.), Elterngeld & Partnermonate (Vätermonate), Frauenquote trong ban lãnh đạo, Entgelttransparenzgesetz', alt: ['Kita', 'Frauenquote', 'Entgelttransparenzgesetz'] }
        ],
        musterloesungDe:
          'a) Menschenrechte vs. Bürgerrechte:\n' +
          '-Menschenrechte (Jedermannsrechte): Gelten für jeden Menschen in Deutschland unabhängig von seiner Staatsangehörigkeit (erkennbar an „Jeder hat das Recht…“). Beispiele: 1. Menschenwürde (Art. 1 GG), 2. Recht auf Leben und körperliche Unversehrtheit (Art. 2 GG), 3. Gleichheit vor dem Gesetz (Art. 3 GG), 4. Glaubens- und Gewissensfreiheit (Art. 4 GG), 5. Meinungs- und Pressefreiheit (Art. 5 GG).\n' +
          '-Bürgerrechte (Deutschenrechte): Gelten laut Grundgesetz nur für deutsche Staatsbürger („Alle Deutschen haben das Recht…“). Beispiele: 1. Versammlungsfreiheit (Art. 8 GG), 2. Vereinigungsfreiheit (Art. 9 GG), 3. Freizügigkeit / freie Wahl des Wohnorts (Art. 11 GG), 4. Berufsfreiheit (Art. 12 GG).\n\n' +
          'b) Ewigkeitsklausel (Art. 79 Abs. 3 GG) & Einschränkung von Grundrechten:\n' +
          '-Die Ewigkeitsklausel schützt Art. 1 GG (Unantastbarkeit der Menschenwürde) und Art. 20 GG (Staatsstrukturprinzipien: Demokratie, Rechtsstaat, Sozialstaat, Bundesstaat) dauerhaft vor jeder Abschaffung – selbst eine Zweidrittelmehrheit im Bundestag und Bundesrat darf sie niemals ändern (Lehre aus der NS-Diktatur 1933).\n' +
          '-Einschränkung (z. B. Art. 10 Brief-/Fernmeldegeheimnis oder Art. 13 Wohnung): Darf nur aufgrund eines Gesetzes (Gesetzesvorbehalt) zum Schutz der öffentlichen Sicherheit/Strafverfolgung durch richterliche Anordnung (Richtervorbehalt, z. B. Hausdurchsuchung bei dringendem Tatverdacht) erfolgen; der Wesensgehalt eines Grundrechts darf nie angetastet werden (Art. 19 Abs. 2 GG).\n\n' +
          'c) Gleichberechtigung (Art. 3 Abs. 2 GG):\n' +
          '-Gender-Pay-Gap: Der prozentuale Unterschied im durchschnittlichen Bruttostundenverdienst zwischen Männern und Frauen (unbereinigt ca. 18 %, bereinigt ca. 6 %).\n' +
          '-Care-Arbeit: Unbezahlte Sorge- und Pflegearbeit in Familie und Haushalt (Kindererziehung, Pflege von Angehörigen), die noch immer überwiegend von Frauen geleistet wird und oft zu Teilzeitarbeit und Altersarmut führt.\n' +
          '-Drei staatliche Maßnahmen: 1. Rechtsanspruch auf einen Kita-Platz (ab 1 Jahr) und Ausbau von Ganztagsschulen; 2. Elterngeld und Elternzeit mit Partnermonaten („Vätermonate“); 3. Gesetzliche Frauenquote für Vorstände/Aufsichtsräte und das Entgelttransparenzgesetz.',
        musterloesungVi:
          'a) Menschenrechte (áp dụng cho mọi con người): Nhân phẩm (Art. 1), Quyền sống & bất khả xâm phạm thân thể (Art. 2), Bình đẳng trước pháp luật (Art. 3), Tự do tín ngưỡng (Art. 4), Tự do ngôn luận (Art. 5). Bürgerrechte (chỉ dành cho công dân Đức): Tự do hội họp (Art. 8), Lập hội (Art. 9), Tự do cư trú (Art. 11), Tự do nghề nghiệp (Art. 12).\n' +
          'b) Ewigkeitsklausel (Art. 79 Abs. 3 GG) bảo vệ vĩnh viễn Điều 1 và Điều 20 GG, không một đa số Quốc hội nào được phép xóa bỏ. Các quyền như Bí mật thư tín (Art. 10) hoặc Chỗ ở (Art. 13) chỉ được hạn chế khi có căn cứ luật định và lệnh của Thẩm phán (Richtervorbehalt) để điều tra tội phạm nghiêm trọng.\n' +
          'c) Gender-Pay-Gap là khoảng cách chênh lệch lương theo giờ giữa nam và nữ; Care-Arbeit là công việc chăm sóc con cái/gia đình không lương. 3 biện pháp của Nhà nước: Đảm bảo chỗ học nhà trẻ (Kita-Rechtsanspruch), chế độ Elterngeld khuyến khích người cha nghỉ chăm con (Partnermonate), và Luật minh bạch lương (Entgelttransparenzgesetz) / tỷ lệ nữ lãnh đạo (Frauenquote).',
        explanation: {
          whyCorrect: 'Bao phủ đầy đủ nội dung Klassenarbeit GK Nr. 2 (Grundrechte & Gleichberechtigung).',
          whyWrong: 'Nhầm lẫn Berufsfreiheit (Art. 12) hoặc Versammlungsfreiheit (Art. 8) là Menschenrecht (trong GG hai điều này bắt đầu bằng cụm từ „Alle Deutschen...“ nên là Bürgerrechte!).',
          keyTakeaway: 'Mẹo phân biệt trong GG: Bắt đầu bằng „Jeder...“ = Menschenrecht | Bắt đầu bằng „Alle Deutschen...“ = Bürgerrecht (Art. 8, 9, 11, 12)!'
        }
      },
      {
        id: 'gk-q3',
        no: 3,
        lf: 'gk',
        fach: 'gk',
        category: 'recht',
        points: 10,
        title: 'Gewaltenteilung (3 Gewalten + 4. Gewalt) & Wahlrecht (5%-Hürde & Grundmandatsklausel)',
        questionDe: 'Gewaltenteilung und Bundestagswahlen sichern die demokratische Ordnung.\n' +
          'a) Nennen Sie die drei klassischen Staatsgewalten (auf Fachdeutsch und Deutsch), ordnen Sie die passenden Verfassungsorgane auf Bundesebene zu und erklären Sie, warum Medien als „Vierte Gewalt“ bezeichnet werden.\n' +
          'b) Nennen Sie die fünf Wahlrechtsgrundsätze nach Art. 38 GG und erklären Sie den Unterschied zwischen Erststimme und Zweitstimme.\n' +
          'c) Fallbeispiel (GK-KA 12.10.2026): Partei X erreicht 4,9 % der Zweitstimmen und 1 Direktmandat. Partei Y erreicht 4,2 % der Zweitstimmen und 3 Direktmandate. Welche Partei zieht nach dem Prinzip von 5%-Hürde und Grundmandatsklausel in Fraktionsstärke in den Bundestag ein? Warum gibt es die 5%-Hürde?',
        questionVi: 'Tam quyền phân lập và bầu cử Quốc hội Liên bang bảo đảm trật tự dân chủ.\n' +
          'a) Nêu 3 nhánh quyền lực nhà nước cổ điển (bằng thuật ngữ chuyên môn và tiếng Đức), ghép với các cơ quan hiến định ở cấp Liên bang và giải thích tại sao Báo chí/Truyền thông được gọi là „Quyền lực thứ tư (Vierte Gewalt)“.\n' +
          'b) Nêu 5 nguyên tắc bầu cử theo Điều 38 GG và giải thích sự khác biệt giữa Phiếu 1 (Erststimme) và Phiếu 2 (Zweitstimme).\n' +
          'c) Tình huống thực tế (Đề GK-KA 12.10.2026): Đảng X đạt 4,9 % phiếu Zweitstimme và thắng 1 ghế trực tiếp (Direktmandat). Đảng Y đạt 4,2 % phiếu Zweitstimme và thắng 3 ghế trực tiếp (Direktmandate). Theo quy tắc Rào cản 5 % (5%-Hürde) và Điều khoản ghế cơ sở (Grundmandatsklausel), đảng nào được vào Quốc hội theo tỷ lệ phần trăm? Tại sao lại có rào cản 5 %?',
        placeholderDe: 'a) Legislative / Exekutive / Judikative + 4. Gewalt (Medien)...\nb) 5 Wahlrechtsgrundsätze + Erst- vs. Zweitstimme...\nc) Fallbeispiel Partei X (4,9% / 1 DM) vs. Partei Y (4,2% / 3 DM) + Sinn der 5%-Hürde...',
        hintDe: 'a) Legislative (Bundestag/Bundesrat), Exekutive (Bundesregierung/Polizei), Judikative (Bundesverfassungsgericht/Gerichte). b) Allgemein, Unmittelbar, Frei, Gleich, Geheim. c) Partei Y zieht ein (wegen 3 Direktmandaten = Grundmandatsklausel)!',
        hintVi: 'a) Lập pháp (Bundestag/Bundesrat), Hành pháp (Bundesregierung), Tư pháp (Bundesverfassungsgericht). b) Phổ thông, Trực tiếp, Tự do, Bình đẳng, Bỏ phiếu kín. c) Đảng Y được vào nhờ thắng đủ 3 Direktmandate (Grundmandatsklausel)!',
        keywords: [
          { term: 'Legislative', points: 1.5, vi: '1. Legislative (Gesetzgebende Gewalt): Bundestag & Bundesrat; 2. Exekutive (Ausführende Gewalt): Bundesregierung (Kanzler/Minister), Polizei/Verwaltung; 3. Judikative (Rechtsprechende Gewalt): Bundesverfassungsgericht & Gerichte', alt: ['Exekutive', 'Judikative', 'Bundestag', 'Bundesregierung'] },
          { term: 'Vierte Gewalt', points: 1, vi: 'Medien là „Vierte Gewalt“ vì thực hiện chức năng thông tin, phản biện và giám sát độc lập 3 nhánh quyền lực nhà nước (Kontroll- und Kritikfunktion)', alt: ['Kontrollfunktion', 'Kritik und Kontrolle', 'Meinungsbildung'] },
          { term: 'allgemein', points: 1.5, vi: '5 nguyên tắc bầu cử (Art. 38 GG): Allgemein (mọi công dân ≥ 18 tuổi), Unmittelbar (trực tiếp), Frei (tự do không ép buộc), Gleich (mỗi phiếu nặng ngang nhau), Geheim (bỏ phiếu kín)', alt: ['unmittelbar', 'frei', 'gleich', 'geheim'] },
          { term: 'Zweitstimme', points: 1.5, vi: 'Erststimme: Bầu trực tiếp ứng viên tại khu vực bầu cử (Direktkandidat im Wahlkreis); Zweitstimme (quan trọng hơn!): Bầu cho danh sách đảng (Landesliste), quyết định tỷ lệ ghế (%) của các đảng trong Bundestag', alt: ['Erststimme', 'Direktmandat', 'Landesliste', 'Sitzverteilung'] },
          { term: 'Partei Y', points: 2.5, vi: 'Giải tình huống: Đảng X (4,9 %, 1 DM) KHÔNG được chia ghế theo tỷ lệ vì dưới 5 % và thiếu 3 DM; Đảng Y (4,2 %, 3 Direktmandate) ĐƯỢC vào Bundestag theo đúng tỷ lệ 4,2 % nhờ Grundmandatsklausel (thắng tối thiểu 3 Direktmandate)', alt: ['3 Direktmandate', 'Grundmandatsklausel', 'drei Direktmandate'] },
          { term: 'Zersplitterung', points: 2, vi: 'Mục đích 5%-Sperrklausel: Chống phân mảnh Quốc hội thành quá nhiều đảng nhỏ lẻ (Zersplitterung des Parlaments wie in der Weimarer Republik) để đảm bảo khả năng lập chính phủ ổn định', alt: ['Splitterparteien', 'Weimarer Republik', 'regierungsfähige Mehrheit'] }
        ],
        musterloesungDe:
          'a) Die drei Staatsgewalten & die „Vierte Gewalt“:\n' +
          '1. Legislative (Gesetzgebende Gewalt): Bundestag und Bundesrat – beraten und beschließen Gesetze.\n' +
          '2. Exekutive (Ausführende/Vollziehende Gewalt): Bundesregierung (Bundeskanzler & Bundesminister), Bundespräsident sowie Verwaltung und Polizei – führen Gesetze aus.\n' +
          '3. Judikative (Rechtsprechende Gewalt): Bundesverfassungsgericht und alle Gerichte – sprechen unabhängig Recht und kontrollieren die Einhaltung der Gesetze.\n' +
          '-Freie Medien als „Vierte Gewalt“: Obwohl offiziell keine Staatsgewalt, übernehmen Presse, Rundfunk und digitale Medien (geschützt durch Art. 5 GG) eine unverzichtbare Kontroll-, Kritik- und Informationsfunktion gegenüber Politikern und Behörden (decken Skandale und Machtmissbrauch auf).\n\n' +
          'b) Fünf Wahlrechtsgrundsätze (Art. 38 GG) & Erst-/Zweitstimme:\n' +
          '-Grundsätze: 1. Allgemein (alle deutschen Staatsbürger ab 18 Jahren), 2. Unmittelbar (direkte Wahl ohne Wahlmänner), 3. Frei (kein Zwang), 4. Gleich (jede Stimme zählt exakt gleich viel), 5. Geheim (anonyme Stimmabgabe in der Wahlkabine).\n' +
          '-Erststimme (Personenwahl): Wählt einen Direktkandidaten im jeweiligen Wahlkreis.\n' +
          '-Zweitstimme (Parteienwahl – die wichtigere Stimme!): Wählt die Landesliste einer Partei und bestimmt maßgeblich das prozentuale Kräfteverhältnis (Sitzverteilung) im Deutschen Bundestag.\n\n' +
          'c) Falllösung Partei X vs. Partei Y & Sinn der 5%-Hürde:\n' +
          '-Partei X (4,9 % Zweitstimmen, 1 Direktmandat): Scheitert an der 5%-Sperrklausel und zieht NICHT nach Zweitstimmenanteil in den Bundestag ein.\n' +
          '-Partei Y (4,2 % Zweitstimmen, 3 Direktmandate): Zieht gemäß der klassischen Grundmandatsklausel (mindestens 3 gewonnene Direktmandate) trotz < 5 % entsprechend ihrem Zweitstimmenanteil (4,2 %) in den Bundestag ein.\n' +
          '-Sinn der 5%-Hürde: Sie verhindert eine Zersplitterung des Parlaments durch viele winzige Splitterparteien (Lehre aus dem Scheitern der Weimarer Republik) und sichert stabile, handlungsfähige Regierungsmehrheiten.',
        musterloesungVi:
          'a) 3 nhánh quyền lực: 1. Legislative (Lập pháp: Bundestag & Bundesrat); 2. Exekutive (Hành pháp: Bundesregierung, Cảnh sát, Hành chính); 3. Judikative (Tư pháp: Tòa án Hiến pháp Liên bang & các tòa án). Truyền thông được gọi là „Quyền lực thứ 4 (Vierte Gewalt)“ vì thực hiện chức năng thông tin, phản biện và giám sát độc lập cả 3 nhánh quyền lực nhà nước.\n' +
          'b) 5 nguyên tắc bầu cử (A-U-F-G-G): Allgemein (Phổ thông ≥ 18 tuổi), Unmittelbar (Trực tiếp), Frei (Tự do), Gleich (Bình đẳng), Geheim (Bỏ phiếu kín). Erststimme bầu trực tiếp ứng viên đại diện khu vực; Zweitstimme (quan trọng hơn) bầu cho đảng phái và quyết định tổng tỷ lệ % số ghế của đảng đó trong Bundestag.\n' +
          'c) Giải tình huống: Đảng X (4,9 %, 1 ghế trực tiếp) bị loại vì chưa đạt 5 % và chưa đủ 3 ghế trực tiếp. Đảng Y (4,2 %, 3 ghế trực tiếp) ĐƯỢC vào Bundestag với đầy đủ tỷ lệ 4,2 % nhờ thỏa mãn điều khoản Grundmandatsklausel (thắng tối thiểu 3 Direktmandate). Mục đích của rào cản 5 % là ngăn chặn sự phân mảnh Quốc hội thành vô số đảng nhỏ lẻ (bài học từ sự sụp đổ của Cộng hòa Weimar), giúp thành lập chính phủ ổn định.',
        explanation: {
          whyCorrect: 'Giải quyết chính xác 100% câu hỏi trong Klassenarbeit GK Nr. 3 và đề GK-KA 12.10.2026.',
          whyWrong: 'Tưởng rằng Erststimme quan trọng hơn Zweitstimme hoặc chọn Đảng X (4,9%) được vào Quốc hội thay vì Đảng Y (3 Direktmandate).',
          keyTakeaway: 'Nhớ quy tắc bầu cử Bundestag: Zweitstimme quyết định % tổng số ghế! Để vượt qua rào cản cần: ≥ 5,0 % Zweitstimmen HOẶC ≥ 3 Direktmandate (Grundmandatsklausel).'
        }
      },
      {
        id: 'gk-q4',
        no: 4,
        lf: 'gk',
        fach: 'gk',
        category: 'recht',
        points: 10,
        title: 'Vertrauensfrage (Art. 68 GG) vs. Konstruktives Misstrauensvotum (Art. 67 GG) & Kalter Krieg',
        questionDe: 'Regierungskrisen im Grundgesetz und die deutsche Nachkriegsgeschichte.\n' +
          'a) Vergleichen Sie das „Konstruktive Misstrauensvotum“ (Art. 67 GG) und die „Vertrauensfrage“ (Art. 68 GG) hinsichtlich: Wer ergreift die Initiative? Was ist das Ziel? Was ist die rechtliche Folge bei Erfolg bzw. Scheitern?\n' +
          'b) Geschichte (GK-KA 12.10.2026): Definieren Sie den Begriff „Kalter Krieg“, nennen Sie drei zentrale Merkmale, zwei historische Höhepunkte/Krisen und ordnen Sie den vier Schlüsseljahren 1949, 1961, 1989 und 1990 die passenden Ereignisse der deutschen Geschichte zu.',
        questionVi: 'Khủng hoảng chính phủ trong Hiến pháp và lịch sử nước Đức sau Thế chiến II.\n' +
          'a) So sánh „Bỏ phiếu bất tín nhiệm mang tính xây dựng (Konstruktives Misstrauensvotum – Art. 67 GG)“ và „Bỏ phiếu tín nhiệm (Vertrauensfrage – Art. 68 GG)“ theo 3 tiêu chí: Ai là người khởi xướng? Mục tiêu là gì? Hệ quả pháp lý khi thành công hoặc thất bại là gì?\n' +
          'b) Lịch sử (Đề GK-KA 12.10.2026): Định nghĩa „Chiến tranh Lạnh (Kalter Krieg)“, nêu 3 đặc điểm cốt lõi, 2 cuộc khủng hoảng đỉnh điểm và ghép 4 mốc năm lịch sử 1949, 1961, 1989, 1990 với các sự kiện tương ứng của nước Đức.',
        placeholderDe: 'a) Art. 67 GG (Konstruktives Misstrauensvotum) vs. Art. 68 GG (Vertrauensfrage)...\nb) Kalter Krieg (Definition, 3 Merkmale, 2 Krisen) + 1949 / 1961 / 1989 / 1990...',
        hintDe: 'a) Art. 67 = Bundestag stürzt Kanzler nur durch Wahl eines neuen Kanzlers mit absoluter Mehrheit (1982 Schmidt -> Kohl). Art. 68 = Bundeskanzler stellt selbst die Frage; bei Niederlage kann Bundespräsident Bundestag binnen 21 Tagen auflösen -> Neuwahlen. b) 1949 Gründung BRD/DDR, 1961 Mauerbau, 1989 Mauerfall, 1990 Wiedervereinigung.',
        hintVi: 'a) Art. 67 = Quốc hội chủ động lật Thủ tướng bằng cách bầu ngay Thủ tướng mới với đa số tuyệt đối. Art. 68 = Thủ tướng tự đặt câu hỏi tín nhiệm; nếu thua thì Tổng thống có thể giải tán Quốc hội trong 21 ngày để bầu cử sớm. b) 1949 Lập BRD/DDR, 1961 Xây tường Berlin, 1989 Sụp đổ tường Berlin, 1990 Tái thống nhất.',
        keywords: [
          { term: 'Konstruktives Misstrauensvotum', points: 2, vi: 'Art. 67 GG (Konstruktives Misstrauensvotum): Do Bundestag (Opposition) khởi xướng; chỉ phế truất được Thủ tướng nếu bầu được ngay người kế nhiệm với đa số tuyệt đối (> 50 %; vd: 1982 Helmut Kohl thay Helmut Schmidt)', alt: ['Art. 67', 'Nachfolger wählen', 'Bundestag', 'Kohl'] },
          { term: 'Vertrauensfrage', points: 2, vi: 'Art. 68 GG (Vertrauensfrage): Do chính Bundeskanzler khởi xướng để kiểm tra sự ủng hộ của liên minh hoặc mở đường giải tán Bundestag (Tổng thống giải tán trong 21 ngày → Bầu cử mới trong 60 ngày)', alt: ['Art. 68', 'Bundeskanzler', 'Auflösung des Bundestages', 'Neuwahlen'] },
          { term: 'Systemkonflikt', points: 1.5, vi: 'Kalter Krieg (1947–1991): Cuộc đối đầu ý thức hệ và địa chính trị không đụng độ quân sự trực tiếp giữa Khối Phương Tây (USA/NATO – Tư bản/Dân chủ) và Khối Phương Đông (UdSSR/Warschauer Pakt – XHCN/Kinh tế kế hoạch)', alt: ['USA', 'Sowjetunion', 'NATO', 'Warschauer Pakt'] },
          { term: 'Wettrüsten', points: 1.5, vi: '3 đặc trưng: Chạy đua vũ trang hạt nhân (atomares Wettrüsten), Chiến tranh ủy nhiệm (Stellvertreterkriege: Korea, Vietnam), Đua tranh vũ trụ/gián điệp; 2 đỉnh điểm: Berlin-Blockade (1948/49) / Mauerbau (1961) & Kubakrise (1962)', alt: ['Stellvertreterkriege', 'Kubakrise', 'Berlin-Blockade'] },
          { term: '1949', points: 1.5, vi: '1949: Thành lập BRD (23.05.1949, Grundgesetz) và DDR (07.10.1949); 1961: Xây dựng Bức tường Berlin (13.08.1961 – Mauerbau)', alt: ['1961', 'Mauerbau', 'Gründung BRD und DDR'] },
          { term: '1989', points: 1.5, vi: '1989: Sụp đổ Bức tường Berlin (09.11.1989 – Mauerfall & Friedliche Revolution); 1990: Tái thống nhất nước Đức (03.10.1990 – Deutsche Wiedervereinigung)', alt: ['1990', 'Mauerfall', 'Wiedervereinigung', '09.11.1989', '03.10.1990'] }
        ],
        musterloesungDe:
          'a) Vergleich Art. 67 GG vs. Art. 68 GG:\n' +
          '1. Konstruktives Misstrauensvotum (Art. 67 GG):\n' +
          '-Initiative: Geht vom Deutschen Bundestag (meist der Opposition) aus.\n' +
          '-Ziel: Ablösung (Sturz) des amtierenden Bundeskanzlers.\n' +
          '-Verfahren & Folge: Der Bundestag kann dem Kanzler das Misstrauen NUR dadurch aussprechen, dass er mit der Mehrheit seiner Mitglieder (Kanzlermehrheit > 50 %) direkt einen neuen Nachfolger wählt und den Bundespräsidenten um Entlassung bittet (verhindert ein machtpolitisches Vakuum; erfolgreich 1982: Helmut Kohl löste Helmut Schmidt ab).\n' +
          '2. Vertrauensfrage (Art. 68 GG):\n' +
          '-Initiative: Geht vom Bundeskanzler selbst aus.\n' +
          '-Ziel: Eigene Regierungsmehrheit in einer Krise disziplinieren/bestätigen ODER gezielt den Weg für vorgezogene Neuwahlen frei machen.\n' +
          '-Folge bei Scheitern (keine Mehrheit): Auf Vorschlag des Bundeskanzlers kann der Bundespräsident den Bundestag innerhalb von 21 Tagen auflösen, sodass innerhalb von 60 Tagen Neuwahlen stattfinden (z. B. 1972 Brandt, 1982 Kohl, 2005 Schröder, 2024 Scholz).\n\n' +
          'b) Kalter Krieg & Chronologie der deutschen Teilung (GK-KA 12.10.2026):\n' +
          '-Definition: Systemkonflikt zwischen den Westmächten unter Führung der USA (NATO, Demokratie & Soziale Marktwirtschaft) und dem Ostblock unter Führung der Sowjetunion/UdSSR (Warschauer Pakt, Einparteiendiktatur & Planwirtschaft) von ca. 1945/47 bis 1989/91 ohne direkte militärische Konfrontation der beiden Supermächte.\n' +
          '-Drei Merkmale: 1. Atomares Wettrüsten (Gleichgewicht des Schreckens); 2. Stellvertreterkriege (z. B. Korea-, Vietnam-, Afghanistankrieg); 3. Ideologische Propaganda, Spionage und Wettlauf ins All.\n' +
          '-Zwei Höhepunkte/Krisen: 1. Berlin-Blockade mit Luftbrücke (1948/49) bzw. Bau der Berliner Mauer (1961); 2. Kubakrise (1962 – Welt am Rand eines Atomkriegs).\n' +
          '-Vier Schlüsseldaten Deutschlands:\n' +
          '  * 1949: Doppelte Staatsgründung – Verkündung des Grundgesetzes / Gründung der BRD (23.05.1949) und Gründung der DDR (07.10.1949).\n' +
          '  * 1961: Bau der Berliner Mauer durch die DDR-Führung am 13. August 1961.\n' +
          '  * 1989: Friedliche Revolution in der DDR und Fall der Berliner Mauer am 09. November 1989.\n' +
          '  * 1990: Deutsche Wiedervereinigung (Beitritt der DDR zur BRD) am 03. Oktober 1990.',
        musterloesungVi:
          'a) So sánh Art. 67 GG và Art. 68 GG:\n' +
          '-Konstruktives Misstrauensvotum (Art. 67 GG): Do Quốc hội (Bundestag) khởi xướng nhằm phế truất Thủ tướng. Điều kiện bắt buộc: Phải bầu được ngay Thủ tướng mới với đa số tuyệt đối (> 50 %) để tránh khoảng trống quyền lực (năm 1982 Helmut Kohl thay Helmut Schmidt).\n' +
          '-Vertrauensfrage (Art. 68 GG): Do chính Thủ tướng (Bundeskanzler) khởi xướng nhằm củng cố kỷ luật liên minh hoặc mở đường bầu cử sớm. Nếu Thủ tướng không đạt đa số phiếu tín nhiệm, Tổng thống Liên bang có thể giải tán Quốc hội trong vòng 21 ngày để tổ chức bầu cử mới trong 60 ngày.\n' +
          'b) Chiến tranh Lạnh & 4 mốc lịch sử Đức:\n' +
          '-Định nghĩa: Cuộc đối đầu toàn diện về ý thức hệ, chính trị, kinh tế giữa khối Mỹ/NATO và khối Liên Xô/Warschauer Pakt (1947–1991) mà không giao chiến trực tiếp giữa hai siêu cường.\n' +
          '-3 đặc trưng: Chạy đua vũ khí hạt nhân (Wettrüsten), Chiến tranh ủy nhiệm (Stellvertreterkriege: Triều Tiên, Việt Nam), Đua tranh không gian & tình báo. 2 đỉnh điểm: Phong tỏa Berlin (1948/49) / Xây tường Berlin (1961) và Khủng hoảng tên lửa Cuba (1962).\n' +
          '-4 mốc năm: 1949 = Thành lập CHLB Đức (BRD, 23.05) và CHDC Đức (DDR, 07.10); 1961 = Xây dựng Bức tường Berlin (13.08.1961); 1989 = Sụp đổ Bức tường Berlin (09.11.1989); 1990 = Tái thống nhất nước Đức (03.10.1990).',
        explanation: {
          whyCorrect: 'Bao quát trọn vẹn 2 câu hỏi lớn nhiều điểm nhất trong đề Klassenarbeit GK 12.10.2026.',
          whyWrong: 'Nhầm người khởi xướng giữa Art. 67 (Quốc hội khởi xướng) và Art. 68 (Thủ tướng tự khởi xướng).',
          keyTakeaway: 'Mẹo nhớ cực nhanh: Art. 67 = Misstrauensvotum = Quốc hội lật Thủ tướng (phải có người thay ngay) | Art. 68 = Vertrauensfrage = Thủ tướng tự hỏi Quốc hội (thua → giải tán Quốc hội bầu lại)!'
        }
      },
      {
        id: 'gk-q5',
        no: 5,
        lf: 'gk',
        fach: 'gk',
        category: 'praxis',
        points: 10,
        title: 'Methodik in GK: Karikaturanalyse (4 Schritte) & Statistikanalyse (Dreischritt)',
        questionDe: 'In den Gemeinschaftskunde-Prüfungen müssen Sie regelmäßig politische Karikaturen und Statistiken auswerten.\n' +
          'a) Erklären Sie den systematischen Aufbau einer Karikaturanalyse in 4 Schritten mit passenden Formulierungshilfen.\n' +
          'b) Erklären Sie den klassischen Dreischritt bei der Auswertung eines Statistik-Schaubilds und nennen Sie drei Prüffragen, mit denen man erkennt, ob eine Statistik manipulativ ist.',
        questionVi: 'Trong các bài thi môn Gemeinschaftskunde, bạn thường xuyên phải phân tích tranh biếm họa chính trị (Karikatur) và biểu đồ thống kê (Statistik).\n' +
          'a) Trình bày cấu trúc phân tích một bức tranh biếm họa (Karikaturanalyse) theo 4 bước chuẩn kèm các mẫu câu tiếng Đức.\n' +
          'b) Giải thích quy trình 3 bước (Dreischritt) khi phân tích biểu đồ thống kê và nêu 3 câu hỏi kiểm tra để phát hiện xem biểu đồ có bị thao túng/bóp méo hay không.',
        placeholderDe: 'a) 4 Schritte Karikaturanalyse: 1. Einleitung... 2. Beschreibung... 3. Deutung... 4. Bewertung...\nb) Dreischritt Statistik + 3 Manipulations-Checks...',
        hintDe: 'a) 1. Basisdaten/Einleitung, 2. Beschreibung (Was sieht man?), 3. Deutung/Erklärung (Was ist gemeint?), 4. Eigene Stellungnahme/Bewertung. b) Beschreiben -> Erklären -> Bewerten (Achsenabschnitte, Quelle, Bezugsgröße prüfen!).',
        hintVi: 'a) 1. Giới thiệu thông tin gốc, 2. Mô tả chi tiết hình ảnh, 3. Giải nghĩa biểu tượng & thông điệp châm biếm, 4. Đánh giá & nêu quan điểm cá nhân. b) Mô tả → Giải thích → Đánh giá (kiểm tra trục tọa độ, nguồn, mẫu số).',
        keywords: [
          { term: 'Beschreibung', points: 1.5, vi: 'Karikatur Bước 1 (Einleitung: Tác giả, năm, chủ đề) & Bước 2 (Beschreibung: Mô tả khách quan tiền cảnh, trung cảnh, hậu cảnh, nhân vật, lời thoại mà chưa suy diễn)', alt: ['Vordergrund', 'Hintergrund', 'Einleitung'] },
          { term: 'Deutung', points: 2, vi: 'Bước 3 (Deutung / Interpretation): Giải mã các biểu tượng (Symbole), bối cảnh chính trị và thông điệp phê phán (Kernaussage / Kritik des Zeichners)', alt: ['Symbole', 'Kernaussage', 'Kritik', 'interpretieren'] },
          { term: 'Stellungnahme', points: 1.5, vi: 'Bước 4 (Bewertung / Stellungnahme): Đánh giá xem bức tranh có thuyết phục hay phóng đại quá mức không và nêu chính kiến cá nhân', alt: ['Bewertung', 'eigene Meinung'] },
          { term: 'Dreischritt', points: 2, vi: 'Dreischritt Statistik: 1. Beschreiben (Thema, Quelle, Zeitraum,Einheit, Höchst-/Tiefstwerte, Trend); 2. Erklären (Hintergründe/Ursachen); 3. Bewerten (Aussagekraft/Lücken)', alt: ['Höchstwert', 'Tiefstwert', 'Entwicklung', 'Quelle'] },
          { term: 'Achse', points: 3, vi: '3 dấu hiệu biểu đồ thao túng (Manipulation): Trục tung không bắt đầu từ số 0 hoặc bị cắt ngắn (verzerrte Achsenskalierung), nguồn khảo sát có lợi ích nhóm (Auftraggeber), mẫu khảo sát quá nhỏ hoặc thiếu đơn vị (% hay số tuyệt đối)', alt: ['Skalierung', 'Auftraggeber', 'Bezugsgröße', 'Prozent'] }
        ],
        musterloesungDe:
          'a) Vier Schritte der Karikaturanalyse:\n' +
          '1. Einleitung (Basisdaten): Titel, Zeichner/Karikaturist, Erscheinungsdatum, Quelle und übergeordnetes politisches Thema nennen („Die vorliegende Karikatur von … aus dem Jahr … thematisiert …“).\n' +
          '2. Bildbeschreibung (rein sachlich): Systematisch vom Vordergrund zum Hintergrund beschreiben: Welche Personen, Symbole, Sprechblasen, Gesichtsausdrücke und Größenverhältnisse sind sichtbar? (Noch nicht interpretieren!).\n' +
          '3. Deutung / Interpretation: Symbole und Bildelemente entschlüsseln, in den historischen/politischen Kontext einordnen und die Kernaussage (Kritik/Spott des Karikaturisten) herausarbeiten („Der Zeichner kritisiert damit, dass …“).\n' +
          '4. Bewertung / Eigene Stellungnahme: Beurteilen, ob die Darstellung treffend oder einseitig überzogen ist, und die eigene begründete Meinung zum Problem formulieren.\n\n' +
          'b) Statistikanalyse im Dreischritt & Manipulations-Check:\n' +
          '-Dreischritt:\n' +
          '  1. Beschreiben: Thema, Herausgeber/Quelle, Erhebungsjahr, Befragtenkreis, Einheit (in % oder absolut), Extremwerte (Maximum/Minimum) und Haupttrend nennen.\n' +
          '  2. Erklären: Politische, wirtschaftliche oder gesellschaftliche Ursachen für die dargestellte Entwicklung erläutern.\n' +
          '  3. Bewerten: Glaubwürdigkeit und Vollständigkeit der Statistik kritisch prüfen.\n' +
          '-Drei Prüffragen gegen Manipulation:\n' +
          '  1. Achsenskalierung: Beginnt die Y-Achse bei null oder wurden Abstände gestaucht/gestreckt, um kleine Unterschiede riesig wirken zu lassen?\n' +
          '  2. Auftraggeber & Quelle: Wer hat die Studie bezahlt und welches politische/wirtschaftliche Interesse verfolgt der Herausgeber?\n' +
          '  3. Bezugsgröße & Stichprobe: Werden nur Prozentwerte ohne absolute Zahlen genannt oder wurden nur sehr wenige bzw. einseitig ausgewählte Personen befragt?',
        musterloesungVi:
          'a) 4 bước phân tích tranh biếm họa (Karikaturanalyse):\n' +
          '1. Mở bài (Einleitung): Nêu tên tác giả, thời điểm xuất bản, nguồn và chủ đề chính trị.\n' +
          '2. Mô tả hình ảnh (Beschreibung): Mô tả khách quan từ tiền cảnh đến hậu cảnh, nhân vật, nét mặt, chữ viết (chưa vội suy diễn).\n' +
          '3. Giải nghĩa (Deutung): Giải mã các hình ảnh ẩn dụ, gắn với sự kiện thực tế và rút ra thông điệp châm biếm của tác giả.\n' +
          '4. Đánh giá (Bewertung): Nhận xét tính thuyết phục của bức tranh và nêu quan điểm cá nhân.\n' +
          'b) 3 bước phân tích biểu đồ (Statistik): 1. Mô tả (Chủ đề, nguồn, năm, đơn vị, giá trị cao nhất/thấp nhất, xu hướng); 2. Giải thích nguyên nhân; 3. Đánh giá độ tin cậy.\n' +
          '3 cách phát hiện biểu đồ thao túng: 1. Kiểm tra trục tọa độ (trục tung không bắt đầu từ số 0 làm phóng đại chênh lệch); 2. Kiểm tra cơ quan tài trợ/xuất bản có lợi ích thiên vị không; 3. Kiểm tra kích thước mẫu khảo sát và đơn vị (% hay số tuyệt đối).',
        explanation: {
          whyCorrect: 'Cung cấp khung phương pháp luận (Methodenkompetenz) xuất hiện trong mọi bài kiểm tra GK.',
          whyWrong: 'Nhảy vào suy diễn ý nghĩa chính trị ngay ở bước 1 mà bỏ qua bước mô tả khách quan các chi tiết hình ảnh.',
          keyTakeaway: 'Khung vàng mọi bài phân tích GK: Beschreiben (Thấy gì?) → Erklären/Deuten (Ý nghĩa & Nguyên nhân?) → Bewerten (Đánh giá & Chính kiến cá nhân)!'
        }
      }
    ],

    /* ========================================================================
       DEUTSCH: INHALTSANGABE (TATTE), VISUALISIERUNG & KORRESPONDENZ
       ======================================================================== */
    deutsch: [
      {
        id: 'deutsch-q1',
        no: 1,
        lf: 'deutsch',
        fach: 'deutsch',
        category: 'praxis',
        points: 10,
        title: 'Inhaltsangabe verfassen: Die TATTE-Formel, Aufbau & Sprachregeln',
        questionDe: 'In der Deutsch-Klassenarbeit müssen Sie eine strukturierte Inhaltsangabe zu einem Sachtext oder literarischen Text verfassen.\n' +
          'a) Erklären Sie die fünf Bestandteile des Einleitungssatzes nach der „TATTE-Formel“ und formulieren Sie einen vollständigen Muster-Einleitungssatz.\n' +
          'b) Welche fünf verbindlichen Sprach- und Stilregeln gelten für den Hauptteil einer Inhaltsangabe (Zeitform, Zitate, Meinung, Redewiedergabe)?\n' +
          'c) Was gehört in den Schlussteil einer Inhaltsangabe?',
        questionVi: 'Trong bài thi môn Tiếng Đức, bạn phải viết một bài tóm tắt văn bản (Inhaltsangabe) có cấu trúc chặt chẽ.\n' +
          'a) Giải thích 5 thành phần của câu mở bài theo công thức „TATTE-Formel“ và viết một câu mở bài mẫu hoàn chỉnh bằng tiếng Đức.\n' +
          'b) Nêu 5 quy tắc ngôn ngữ và văn phong bắt buộc đối với phần thân bài (Hauptteil) của một bài Inhaltsangabe (thì động từ, trích dẫn, ý kiến cá nhân, tường thuật lời nói).\n' +
          'c) Phần kết bài (Schluss) của Inhaltsangabe cần trình bày nội dung gì?',
        placeholderDe: 'a) TATTE-Formel: T = ..., A = ..., T = ..., T = ..., E = ... + Beispielsatz...\nb) 5 Sprachregeln im Hauptteil (Präsens, Konjunktiv I, keine Zitate...)...\nc) Schlussteil...',
        hintDe: 'a) T = Titel, A = Autor, T = Textsorte, T = Thema (Kerngedanke), E = Erscheinungsjahr/-ort. b) Immer im Präsens, sachlich, eigene Worte (keine wörtliche Rede / Konjunktiv I), keine eigene Meinung im Hauptteil!',
        hintVi: 'a) T = Tiêu đề, A = Tác giả, T = Thể loại văn bản, T = Chủ đề cốt lõi, E = Năm/nơi xuất bản. b) Luôn dùng thì Hiện tại (Präsens), khách quan, viết bằng từ ngữ của mình (dùng Konjunktiv I, cấm trích dẫn trực tiếp), không nêu ý kiến cá nhân ở thân bài!',
        keywords: [
          { term: 'TATTE', points: 2, vi: 'TATTE-Formel: Titel (Tiêu đề), Autor (Tác giả), Textsorte (Thể loại: Sachtext, Zeitungsartikel, Kurzgeschichte), Thema (Chủ đề chính), Erscheinungsjahr/Quelle (Năm & nơi xuất bản)', alt: ['Textsorte', 'Autor', 'Erscheinungsjahr', 'Thema'] },
          { term: 'Präsens', points: 2, vi: 'Thì động từ bắt buộc: Luôn viết ở thì Hiện tại (Präsens); chỉ những sự kiện xảy ra trước đó mới lùi về Perfekt', alt: ['Gegenwart', 'Perfekt'] },
          { term: 'Konjunktiv', points: 2, vi: 'Tuyệt đối không dùng lời nói trực tiếp hay trích dẫn nguyên văn (keine wörtliche Rede / keine Zitate); phải chuyển sang câu gián tiếp (indirekte Rede mit Konjunktiv I)', alt: ['indirekte Rede', 'keine wörtliche Rede', 'keine Zitate'] },
          { term: 'sachlich', points: 2, vi: 'Văn phong trung lập, khách quan (sachlich, neutral, in eigenen Worten), ngắn gọn theo đúng trình tự Sinnabschnitte, cấm đưa cảm xúc/ý kiến cá nhân vào Hauptteil', alt: ['eigene Worte', 'keine eigene Meinung', 'Sinnabschnitte'] },
          { term: 'Intention', points: 2, vi: 'Phần Kết (Schluss): Nêu mục đích/thông điệp của tác giả (Intention des Autors) và đánh giá/quan điểm cá nhân có lập luận (nếu đề bài yêu cầu Stellungnahme)', alt: ['Aussageabsicht', 'Stellungnahme'] }
        ],
        musterloesungDe:
          'a) Der Einleitungssatz nach der TATTE-Formel:\n' +
          '-T = Textsorte (z. B. Sachtext, Zeitungsartikel, Kommentar, Kurzgeschichte)\n' +
          '-A = Autor / Verfasser\n' +
          '-T = Titel / Überschrift des Textes\n' +
          '-T = Thema / Kerngedanke (Worum geht es im Kern?)\n' +
          '-E = Erscheinungsdatum / Erscheinungsjahr und Quelle\n' +
          '-Muster-Einleitungssatz: „In dem Zeitungsartikel ‚Nachhaltigkeit in der Gastronomie‘, der von Max Mustermann verfasst und am 15. März 2025 in der ‚Zeit‘ veröffentlicht wurde, geht es um wirksame Maßnahmen gegen Lebensmittelverschwendung im Restaurantalltag.“\n\n' +
          'b) Fünf verbindliche Regeln für den Hauptteil:\n' +
          '1. Zeitform: Durchgehend im Präsens (Gegenwart) schreiben (Vorzeitigkeit im Perfekt).\n' +
          '2. Eigene Worte & Sachlichkeit: Nüchterner, neutraler und sachlicher Stil ohne Ausschmückungen oder Spannungselemente.\n' +
          '3. Keine wörtliche Rede & keine Zitate: Aussagen werden in der indirekten Rede (Konjunktiv I bzw. Ersatzform „würde“ oder mit Verweiswörtern wie „Laut dem Autor…“, „Der Verfasser betont, dass…“) wiedergegeben.\n' +
          '4. Logischer Aufbau nach Sinnabschnitten: Nur die wichtigsten Kernaussagen (keine unwichtigen Details oder Zahlenbeispiele) in logischer Reihenfolge zusammenfassen.\n' +
          '5. Strikte Wertungsfreiheit: Im Hauptteil darf keinerlei eigene Meinung oder persönliche Wertung auftauchen.\n\n' +
          'c) Der Schlussteil:\n' +
          'Zusammenfassung der Aussageabsicht (Intention) des Autors („Mit seinem Text möchte der Autor die Leser wachrütteln und dazu auffordern, …“) sowie – falls in der Aufgabenstellung gefordert – eine begründete eigene Stellungnahme.',
        musterloesungVi:
          'a) Công thức mở bài TATTE: Textsorte (Thể loại) – Autor (Tác giả) – Titel (Tiêu đề) – Thema (Chủ đề cốt lõi) – Erscheinungsdatum/Quelle (Ngày & nơi xuất bản).\n' +
          'b) 5 quy tắc sắt cho phần Thân bài (Hauptteil):\n' +
          '1. Luôn dùng thì Hiện tại (Präsens).\n' +
          '2. Viết bằng từ ngữ của chính mình, văn phong khách quan, cô đọng.\n' +
          '3. Tuyệt đối KHÔNG trích dẫn nguyên văn (keine Zitate) và KHÔNG dùng lời thoại trực tiếp; phải đổi sang lời nói gián tiếp với Konjunktiv I.\n' +
          '4. Tóm tắt theo từng đoạn ý chính (Sinnabschnitte), lược bỏ các ví dụ vụn vặt.\n' +
          '5. Cấm đưa ý kiến cá nhân vào phần thân bài.\n' +
          'c) Phần Kết bài (Schluss): Khái quát ý đồ của tác giả (Intention) và trình bày quan điểm cá nhân (nếu đề yêu cầu).',
        explanation: {
          whyCorrect: 'Tổng hợp chuẩn xác toàn bộ kỹ thuật viết Inhaltsangabe đạt điểm 1 (Sehr gut) trong môn Deutsch.',
          whyWrong: 'Viết Inhaltsangabe ở thì Quá khứ (Präteritum), chép nguyên câu trong bài ra làm Zitat, hoặc bình luận khen chê ngay giữa phần Hauptteil.',
          keyTakeaway: '3 điều cấm kỵ (3 Todsünden) trong Hauptteil của Inhaltsangabe: 1. Cấm dùng Präteritum (phải dùng Präsens) | 2. Cấm trích dẫn trực tiếp | 3. Cấm nêu ý kiến cá nhân!'
        }
      },
      {
        id: 'deutsch-q2',
        no: 2,
        lf: 'deutsch',
        fach: 'deutsch',
        category: 'praxis',
        points: 10,
        title: 'Sachtext visualisieren (Diagrammtypen) & Professionelles Antwortschreiben an einen Gast',
        questionDe: 'Im Deutschunterricht übertragen Sie Sachtexte in Schaubilder und verfassen Geschäftsbriefe.\n' +
          'a) Wann verwendet man bei der Visualisierung eines Sachtextes ein Kreisdiagramm (Tortendiagramm), ein Säulendiagramm, ein Liniendiagramm (Kurvendiagramm) und ein Flussdiagramm? Begründen Sie jeweils kurz.\n' +
          'b) Ein Stammgast hat sich per E-Mail beschwert, dass bei seiner Geburtstagsfeier der Service unaufmerksam war. Verfassen Sie eine höfliche, professionelle Antwort-E-Mail (ca. 80–120 Wörter) mit Betreff, Anrede, Entschuldigung, Erklärung, Wiedergutmachung (Gutschein) und Grußformel.',
        questionVi: 'Trong môn Tiếng Đức, bạn chuyển hóa văn bản thông tin thành sơ đồ trực quan và viết thư tín thương mại.\n' +
          'a) Khi trực quan hóa một văn bản (Sachtext visualisieren), khi nào ta chọn Biểu đồ tròn (Kreisdiagramm), Biểu đồ cột (Säulendiagramm), Biểu đồ đường (Liniendiagramm) và Lưu đồ quy trình (Flussdiagramm)? Giải thích ngắn gọn.\n' +
          'b) Một khách quen gửi E-Mail phàn nàn rằng trong tiệc sinh nhật của ông ấy, nhân viên phục vụ thiếu chu đáo. Hãy viết một bức E-Mail phản hồi lịch sự, chuyên nghiệp (khoảng 80–120 từ) có đủ Tiêu đề (Betreff), Lời chào, Xin lỗi, Giải thích, Đền bù (Gutschein) và Lời kết.',
        placeholderDe: 'a) Kreisdiagramm = ...\nSäulendiagramm = ...\nLiniendiagramm = ...\nFlussdiagramm = ...\nb) Betreff: Ihre Rückmeldung zu Ihrer Geburtstagsfeier...\nSehr geehrter Herr ..., ...',
        hintDe: 'a) Kreis = Anteile an 100 %; Säulen = Größenvergleich; Linie = zeitliche Entwicklung/Trend; Flussdiagramm = Prozess/Ablauf/Ursache-Wirkung.',
        hintVi: 'a) Tròn = Tỷ trọng trong tổng 100 %; Cột = So sánh độ lớn các nhóm; Đường = Xu hướng biến đổi theo thời gian; Lưu đồ = Quy trình các bước / Nguyên nhân – Hệ quả.',
        keywords: [
          { term: 'Kreisdiagramm', points: 1.5, vi: 'Kreis-/Tortendiagramm: Thể hiện tỷ trọng phần trăm của các thành phần trong một tổng thể 100 % tại một thời điểm', alt: ['Tortendiagramm', '100 %', 'Anteile'] },
          { term: 'Säulendiagramm', points: 1.5, vi: 'Säulen-/Balkendiagramm: So sánh trực quan độ lớn/số lượng giữa các nhóm hoặc hạng mục khác nhau', alt: ['Balkendiagramm', 'Vergleich'] },
          { term: 'Liniendiagramm', points: 1, vi: 'Liniendiagramm (Kurvendiagramm): Thể hiện sự phát triển, biến động hoặc xu hướng theo thời gian (zeitliche Entwicklung / Trend)', alt: ['Kurvendiagramm', 'zeitliche Entwicklung', 'Trend'] },
          { term: 'Flussdiagramm', points: 1, vi: 'Flussdiagramm (Ablaufdiagramm): Thể hiện trình tự các bước của một quy trình hoặc chuỗi Nguyên nhân – Hệ quả (Ursache-Wirkungs-Kette)', alt: ['Ablauf', 'Prozess', 'Ursache'] },
          { term: 'Sehr geehrter', points: 2, vi: 'Cấu trúc E-Mail chuẩn: Betreff rõ ràng + Anrede „Sehr geehrter Herr …,“ + Cảm ơn phản hồi & Xin lỗi chân thành („wir bedauern sehr / entschuldigen uns“)', alt: ['Betreff', 'bedauern', 'entschuldigen'] },
          { term: 'Gutschein', points: 3, vi: 'Đưa giải pháp nội bộ + Đề xuất đền bù thiện chí (Gutschein / Einladung zum Aperitif/Dessert) + Mời khách quay lại & „Mit freundlichen Grüßen“', alt: ['Wiedergutmachung', 'Mit freundlichen Grüßen', 'erneuten Besuch'] }
        ],
        musterloesungDe:
          'a) Auswahl des passenden Diagrammtyps (Sachtext visualisieren):\n' +
          '1. Kreisdiagramm (Tortendiagramm): Ideal, um prozentuale Anteile eines Ganzen (Summe = 100 %) zu einem bestimmten Zeitpunkt darzustellen (z. B. Marktanteile oder Ausgabenverteilung).\n' +
          '2. Säulen- oder Balkendiagramm: Ideal zum direkten Größen- und Mengenvergleich verschiedener Kategorien oder Gruppen.\n' +
          '3. Liniendiagramm (Kurvendiagramm): Ideal, um eine kontinuierliche Entwicklung, Veränderung oder einen Trend über einen längeren Zeitraum (Jahre/Monate) zu veranschaulichen.\n' +
          '4. Flussdiagramm (Ablaufdiagramm / Prozesskette): Ideal für Sachtexte, die einen schrittweisen Ablauf, einen Kreislauf oder eine Ursache-Wirkungs-Kette beschreiben.\n\n' +
          'b) Muster-Antwortschreiben (Beschwerde-E-Mail):\n' +
          'Betreff: Ihre Rückmeldung zu Ihrer Geburtstagsfeier am vergangenen Samstag\n\n' +
          'Sehr geehrter Herr Müller,\n\n' +
          'vielen Dank für Ihre offene Nachricht und Ihre langjährige Treue zu unserem Restaurant. Wir bedauern außerordentlich, dass der Service bei Ihrer Geburtstagsfeier nicht unserer gewohnten Aufmerksamkeit entsprochen hat, und möchten uns dafür herzlich bei Ihnen und Ihren Gästen entschuldigen.\n\n' +
          'Aufgrund zweier kurzfristiger Krankheitsausfälle kam es an diesem Abend leider zu Engpässen im Serviceablauf. Wir haben den Vorfall bereits im Team besprochen und unsere Schichtplanung angepasst.\n\n' +
          'Als kleine Wiedergutmachung senden wir Ihnen im Anhang einen Gutschein im Wert von 40,00 € für Ihren nächsten Besuch. Wir würden uns sehr freuen, Sie bald wieder als unsere Gäste begrüßen und vollkommen überzeugen zu dürfen.\n\n' +
          'Mit freundlichen Grüßen\n' +
          'Ihr Team vom Restaurant „Goldener Hirsch“',
        musterloesungVi:
          'a) Chọn loại biểu đồ khi trực quan hóa văn bản:\n' +
          '-Kreisdiagramm (Biểu đồ tròn): Thể hiện tỷ trọng % của các phần trong tổng thể 100 %.\n' +
          '-Säulen-/Balkendiagramm (Biểu đồ cột/thanh): So sánh độ lớn giữa các nhóm đối tượng.\n' +
          '-Liniendiagramm (Biểu đồ đường): Thể hiện xu hướng tăng giảm liên tục theo thời gian.\n' +
          '-Flussdiagramm (Lưu đồ): Thể hiện quy trình từng bước hoặc chuỗi Nguyên nhân – Hệ quả.\n' +
          'b) Thư phản hồi khách hàng chuẩn gồm 6 phần: 1. Betreff rõ ràng; 2. Lời chào trang trọng (Sehr geehrter Herr Müller,); 3. Cảm ơn góp ý và xin lỗi chân thành; 4. Giải thích ngắn gọn mang tính xây dựng và nêu biện pháp khắc phục nội bộ; 5. Tặng phiếu quà tặng (Gutschein) và mời khách quay lại; 6. Lời chào kết (Mit freundlichen Grüßen).',
        explanation: {
          whyCorrect: 'Kết hợp kỹ năng chuyển hóa văn bản thành biểu đồ (Visualisierung) và kỹ năng viết thư thương mại trong môn Deutsch.',
          whyWrong: 'Dùng Kreisdiagramm cho số liệu cộng lại không bằng 100 % hoặc viết thư thiếu dòng Betreff / viết hoa chữ cái đầu sau dấu phẩy của lời chào.',
          keyTakeaway: 'Quy tắc chính tả thư tiếng Đức: Sau dấu phẩy của „Sehr geehrter Herr ...,“ chữ cái đầu tiên của dòng tiếp theo (trừ danh từ/Sie) bắt buộc viết THƯỜNG („vielen Dank...“)! Cuối „Mit freundlichen Grüßen“ KHÔNG có dấu phẩy!'
        }
      }
    ],

    /* ========================================================================
       ENGLISCH: HOSPITALITY ENGLISH (RESERVATIONS, COMPLAINTS & ALLERGENS)
       ======================================================================== */
    englisch: [
      {
        id: 'englisch-q1',
        no: 1,
        lf: 'englisch',
        fach: 'englisch',
        category: 'praxis',
        points: 10,
        title: 'Taking a Table Reservation on the Phone & Dealing with Guest Complaints in English',
        questionDe: 'Im internationalen Hotel- und Restaurantbetrieb kommunizieren Sie regelmäßig auf Englisch.\n' +
          'a) Welche sechs wichtigen Informationen müssen Sie bei einer telefonischen Tischreservierung abfragen, und wie lauten vier höfliche englische Standardsätze für dieses Gespräch?\n' +
          'b) Ein englischsprachiger Gast beschwert sich: „Excuse me, I have been waiting for my main course for 45 minutes now, and my soup was cold!“ Formulieren Sie eine höfliche, professionelle Antwort auf Englisch (4–5 Sätze: Entschuldigung, Erklärung, Lösung & Wiedergutmachung).',
        questionVi: 'Trong môi trường khách sạn và nhà hàng quốc tế, bạn thường xuyên giao tiếp bằng tiếng Anh.\n' +
          'a) Nêu 6 thông tin quan trọng cần hỏi khi nhận đặt bàn qua điện thoại và viết 4 câu giao tiếp tiếng Anh lịch sự chuẩn mực cho cuộc gọi này.\n' +
          'b) Một vị khách nói tiếng Anh phàn nàn: „Excuse me, I have been waiting for my main course for 45 minutes now, and my soup was cold!“ Hãy viết đoạn phản hồi lịch sự, chuyên nghiệp bằng tiếng Anh (4–5 câu: Xin lỗi, giải thích nhẹ nhàng, đưa giải pháp & mời đồ uống đền bù).',
        placeholderDe: 'a) 6 Details + 4 polite English phrases for table reservation...\nb) Polite response to the guest complaint in English...',
        hintDe: 'a) Date, Time, Number of guests, Guest’s name & spelling, Phone number, Special requests (allergies, high chair, window table). b) „I sincerely apologize for the delay and the cold soup...“',
        hintVi: 'a) Ngày, Giờ, Số lượng khách, Tên khách & đánh vần, Số điện thoại, Yêu cầu đặc biệt (ghế trẻ em, dị ứng, bàn cạnh cửa sổ). b) „I am terribly sorry / I sincerely apologize...“',
        keywords: [
          { term: 'How may I help you', points: 1.5, vi: 'Mở đầu cuộc gọi chuẩn: Name des Restaurants + Name des Mitarbeiters + „Good morning/afternoon, how may I help you?“', alt: ['table reservation', 'book a table'] },
          { term: 'How many people', points: 1.5, vi: '6 thông tin: Date (Ngày), Time (Giờ), Number of guests („For how many people?“), Name & Spelling, Phone number, Special requests (allergies, wheelchair, high chair)', alt: ['What time', 'spell your name', 'special requests'] },
          { term: 'look forward to welcoming', points: 1.5, vi: 'Xác nhận lại đơn đặt bàn và chào kết: „Let me repeat your reservation... We look forward to welcoming you!“', alt: ['repeat', 'confirm'] },
          { term: 'apologize', points: 2, vi: 'Xin lỗi lịch sự bằng tiếng Anh: „I sincerely apologize for the inconvenience / I am terribly sorry to hear that.“', alt: ['terribly sorry', 'so sorry', 'inconvenience'] },
          { term: 'check with the kitchen', points: 1.5, vi: 'Hành động ngay: „I will check with the kitchen immediately and make sure your main course is served right away.“', alt: ['kitchen', 'right away', 'immediately'] },
          { term: 'on the house', points: 2, vi: 'Đền bù thiện chí: „We will take the soup off your bill, and may I offer you a drink or a coffee on the house?“', alt: ['complimentary', 'off the bill', 'free of charge'] }
        ],
        musterloesungDe:
          'a) Sechs Pflichtangaben bei der Tischreservierung & vier englische Standardsätze:\n' +
          '-Sechs Angaben: 1. Datum (Date), 2. Uhrzeit (Time of arrival), 3. Personenanzahl (Number of guests / party size), 4. Vollständiger Name des Gastes inkl. Buchstabieren (Name & spelling), 5. Telefonnummer / E-Mail für Rückfragen (Contact number), 6. Besondere Wünsche (Special requests: window table, terrace, baby high chair, wheelchair access, allergies).\n' +
          '-Vier englische Standardsätze:\n' +
          '  1. „Good afternoon, Restaurant Goldener Hirsch, [Name] speaking. How may I help you?“\n' +
          '  2. „For which date and what time would you like to book the table, and for how many people?“\n' +
          '  3. „Could I have your name and phone number, please? Could you spell your last name for me?“\n' +
          '  4. „Thank you very much. Let me confirm your reservation: a table for four on Friday at 7 p.m. We look forward to welcoming you!“\n\n' +
          'b) Professionelle Antwort auf die Reklamation (in English):\n' +
          '„I am terribly sorry to hear that your soup was cold and that you have had to wait so long for your main course. Please accept my sincere apologies for this inconvenience. I will check with the kitchen immediately so that your main course will be served right away. Of course, we will take the soup off your bill, and I would love to offer you a complimentary drink or an espresso on the house after your meal.“',
        musterloesungVi:
          'a) 6 thông tin cần hỏi khi đặt bàn: 1. Ngày (Date); 2. Giờ đến (Time); 3. Số lượng khách (Number of guests); 4. Tên khách & đánh vần (Name & spelling); 5. Số điện thoại liên hệ (Phone number); 6. Yêu cầu đặc biệt (Special requests: bàn cửa sổ, ghế trẻ em, dị ứng).\n' +
          '4 mẫu câu tiếng Anh chuẩn: 1. „Good afternoon, Restaurant ..., how may I help you?“; 2. „For what date and time would you like to reserve a table, and for how many guests?“; 3. „May I take your name and phone number, please?“; 4. „We look forward to welcoming you!“\n' +
          'b) Phản hồi khiếu nại bằng tiếng Anh: Xin lỗi chân thành („I sincerely apologize / I am terribly sorry“), báo bếp mang món chính ra ngay lập tức („I will check with the kitchen immediately“), trừ món súp nguội khỏi hóa đơn („take the soup off your bill“) và mời khách 1 đồ uống/cà phê miễn phí („a complimentary drink / on the house“).',
        explanation: {
          whyCorrect: 'Cung cấp đầy đủ cấu trúc và các cụm từ ăn điểm cao nhất (C1/Professional Hospitality English) cho cả tình huống đặt bàn và xử lý phàn nàn.',
          whyWrong: 'Dùng câu cụt lủn thiếu lịch sự như „What is your name?“ thay vì „May I have your name, please?“ hoặc quên cụm từ vàng „on the house / complimentary“.',
          keyTakeaway: 'Cụm từ vàng Hospitality English: „How may I help you?“ – „party of four“ – „dietary requirements“ – „I sincerely apologize for the inconvenience“ – „on the house / complimentary“!'
        }
      },
      {
        id: 'englisch-q2',
        no: 2,
        lf: 'englisch',
        fach: 'englisch',
        category: 'warenkunde',
        points: 10,
        title: 'Explaining Dishes, Cooking Methods & Dietary Requirements (Allergens) in English',
        questionDe: 'Ein internationaler Gast fragt Sie am Tisch nach den Gerichten auf der deutschen Tageskarte:\n' +
          'a) Übersetzen und erklären Sie die folgenden drei Gerichte appetitlich auf Englisch (Zutaten & Zubereitungsart):\n' +
          '1. „Wiener Schnitzel mit lauwarmem Kartoffel-Gurkensalat“\n' +
          '2. „Gebratenes Zanderfilet auf Rahmspinat mit Salzkartoffeln“\n' +
          '3. „Apfelstrudel mit Vanillesauce und Schlagrahm“\n' +
          'b) Wie fragen Sie den Gast höflich auf Englisch nach Allergien oder Unverträglichkeiten, und wie lauten die englischen Fachbegriffe für: glutenfrei, laktosefrei, Nüsse/Schalenfrüchte, Meeresfrüchte und Beilage ändern?',
        questionVi: 'Một vị khách quốc tế tại bàn hỏi bạn về các món ăn trên thực đơn tiếng Đức trong ngày:\n' +
          'a) Hãy dịch và giới thiệu hấp dẫn 3 món ăn sau bằng tiếng Anh (nguyên liệu & cách chế biến):\n' +
          '1. „Wiener Schnitzel mit lauwarmem Kartoffel-Gurkensalat“\n' +
          '2. „Gebratenes Zanderfilet auf Rahmspinat mit Salzkartoffeln“\n' +
          '3. „Apfelstrudel mit Vanillesauce und Schlagrahm“\n' +
          'b) Bạn hỏi khách một cách lịch sự bằng tiếng Anh về dị ứng/kiêng khem như thế nào, và các thuật ngữ tiếng Anh cho: không chứa Gluten, không chứa Laktose, các loại hạt cứng, hải sản và đổi món ăn kèm là gì?',
        placeholderDe: 'a) 1. Wiener Schnitzel = Breaded escalope of veal...\n2. Zanderfilet = Pan-fried pike-perch fillet...\n3. Apfelstrudel = Warm apple strudel...\nb) Allergies question + 5 English terms...',
        hintDe: 'a) Kalbfleisch = veal, paniert = breaded and pan-fried, Zander = pike-perch, Rahmspinat = creamed spinach, Salzkartoffeln = boiled potatoes, Schlagrahm = whipped cream.',
        hintVi: 'a) Thịt bê = veal, tẩm bột chiên = breaded and pan-fried, cá Zander = pike-perch, rau bina kem = creamed spinach, khoai tây luộc = boiled potatoes, kem đánh bông = whipped cream.',
        keywords: [
          { term: 'veal', points: 2, vi: 'Wiener Schnitzel: „A thin, breaded and pan-fried escalope of veal served with lukewarm potato and cucumber salad.“', alt: ['breaded', 'escalope', 'cucumber salad'] },
          { term: 'pike-perch', points: 2, vi: 'Zanderfilet: „Pan-fried fillet of pike-perch served on a bed of creamed spinach with boiled potatoes.“', alt: ['creamed spinach', 'boiled potatoes', 'fillet'] },
          { term: 'whipped cream', points: 1.5, vi: 'Apfelstrudel: „Traditional warm apple pastry filled with apples, raisins and cinnamon, served with vanilla sauce and whipped cream.“', alt: ['vanilla sauce', 'apple strudel', 'pastry'] },
          { term: 'allergies', points: 2, vi: 'Câu hỏi dị ứng: „Do you have any food allergies or dietary requirements we should be aware of?“', alt: ['dietary requirements', 'intolerances'] },
          { term: 'gluten-free', points: 2.5, vi: 'Thuật ngữ: gluten-free (không gluten), lactose-free / dairy-free (không laktose/sữa), tree nuts / peanuts (hạt cứng/lạc), seafood / shellfish (hải sản/giáp xác), side dish (món ăn kèm)', alt: ['lactose-free', 'nuts', 'seafood', 'side dish'] }
        ],
        musterloesungDe:
          'a) Appetitliche Erklärung der drei Gerichte auf Englisch:\n' +
          '1. Wiener Schnitzel: „This is a classic thin escalope of veal, coated in breadcrumbs and pan-fried in butter until golden brown, served with a lukewarm potato and cucumber salad.“\n' +
          '2. Gebratenes Zanderfilet: „This is a pan-fried fillet of pike-perch with crispy skin, served on a bed of creamed spinach and accompanied by boiled potatoes.“\n' +
          '3. Apfelstrudel: „Our homemade warm apple strudel is a flaky pastry filled with spiced apples and raisins, served with warm vanilla sauce and fresh whipped cream.“\n\n' +
          'b) Allergie-Frage & Fachvokabular:\n' +
          '-Höfliche Frage: „Do you have any food allergies, intolerances, or special dietary requirements that our kitchen should know about?“\n' +
          '-Fachbegriffe:\n' +
          '  * glutenfrei = gluten-free (contains wheat/gluten)\n' +
          '  * laktosefrei / milchfrei = lactose-free / dairy-free\n' +
          '  * Nüsse / Schalenfrüchte = tree nuts / peanuts\n' +
          '  * Meeresfrüchte / Krustentiere = seafood / shellfish (crustaceans)\n' +
          '  * Beilage ändern = to change / swap the side dish („Would you like to swap the boiled potatoes for a side salad?“).',
        musterloesungVi:
          'a) Giải thích 3 món ăn bằng tiếng Anh:\n' +
          '1. Wiener Schnitzel: „A thin breaded and pan-fried escalope of veal, served with a lukewarm potato and cucumber salad.“\n' +
          '2. Zanderfilet: „A pan-fried fillet of pike-perch served on creamed spinach with boiled potatoes.“\n' +
          '3. Apfelstrudel: „A warm flaky pastry filled with apples and cinnamon, served with vanilla sauce and whipped cream.“\n' +
          'b) Câu hỏi dị ứng: „Do you have any food allergies or special dietary requirements?“\n' +
          'Từ vựng chuyên ngành: gluten-free (không gluten), lactose-free / dairy-free (không đường sữa / không sữa), tree nuts (hạt vỏ cứng), seafood / shellfish (hải sản / động vật có vỏ), swap/change the side dish (đổi món ăn kèm).',
        explanation: {
          whyCorrect: 'Giúp học viên nắm chắc từ vựng mô tả món ăn Đức sang tiếng Anh (veal, pike-perch, breaded, creamed spinach, side dish).',
          whyWrong: 'Dịch nhầm Wiener Schnitzel là „pork“ (Schnitzel Wiener Art mới là thịt heo – pork; còn Wiener Schnitzel gốc bắt buộc là thịt bê – veal!).',
          keyTakeaway: 'Phân biệt cực kỳ quan trọng: „Wiener Schnitzel“ = Veal (Kalbfleisch - thịt bê) | „Schnitzel Wiener Art“ = Pork (Schweinefleisch - thịt heo)!'
        }
      }
    ]
  };

  /* ──────────────────────────────────────────────────────────────────────────
     HELPER NỘI BỘ: LẤY CÂU HỎI TỪ LF_BANK HOẶC TẠO CÂU HỎI ĐỀ THI CHUYÊN BIỆT
  ────────────────────────────────────────────────────────────────────────── */
  const QUESTION_INDEX = {};
  Object.keys(LF_BANK).forEach(lfKey => {
    (LF_BANK[lfKey] || []).forEach(q => {
      QUESTION_INDEX[q.id] = q;
    });
  });

  function cloneBankQuestion(id, no, overrides) {
    const base = QUESTION_INDEX[id];
    if (!base) return null;
    return Object.assign({}, base, { no: no }, overrides || {});
  }

  /* ──────────────────────────────────────────────────────────────────────────
     3. BỘ ĐỀ THI TỐT NGHIỆP IHK THẬT, ZWISCHENPRÜFUNG & KLASSENARBEITEN (12 ĐỀ)
  ────────────────────────────────────────────────────────────────────────── */
  const IHK_EXAMS = {

    /* ========================================================================
       1. IHK ABSCHLUSSPRÜFUNG SOMMER 2025 (NR. 6132 - 8 AUFGABEN KOMPLETT)
       ======================================================================== */
    'ihk-sommer-2025': {
      id: 'ihk-sommer-2025',
      group: 'abschluss',
      title: 'IHK Abschlussprüfung Sommer 2025 · Nr. 6132',
      subtitle: 'Gäste empfangen, beraten & Speisen/Getränke herstellen (8 Aufgaben · 80 Punkte)',
      durationMinutes: 90,
      badge: 'IHK Sommer 2025',
      questions: [
        cloneBankQuestion('lf1-q3', 1, {
          id: 's25-q1',
          title: 'Aufgabe 1: Wirtschaftsdienst, Sinner’scher Kreis & GHS-Dosierung (1:200)',
          questionDe: 'Im Wirtschaftsdienst reinigen Sie den Gastraum mit einem Spiritus-Allzweckreiniger (GHS-Symbol „Ausrufezeichen“, Mischungsverhältnis 1:200).\n' +
            'a) Erklären Sie die vier Faktoren des Sinner’schen Kreises.\n' +
            'b) Berechnen Sie, wie viel Milliliter (ml) Reinigungskonzentrat Sie für einen Eimer mit 5 Litern Wasser benötigen.\n' +
            'c) Welche Schutzmaßnahmen beachten Sie beim Umgang mit diesem Reiniger?'
        }),
        cloneBankQuestion('lf3-q5', 2, {
          id: 's25-q2',
          title: 'Aufgabe 2: Angebotsvergleich Lammrücken (9 kg) & Garverlust',
          questionDe: 'Für das Wochenendgeschäft benötigen Sie 9 kg ausgelösten Lammrücken.\n' +
            '-Lieferant A bietet 1 kg für 32,00 € frei Haus mit 5 % Rabatt an.\n' +
            '-Lieferant B bietet 1 kg für 29,50 € ab Lager zuzüglich 15,00 € Lieferpauschale (ohne Rabatt) an.\n' +
            'a) Berechnen Sie beide Endpreise und begründen Sie Ihre Kaufentscheidung.\n' +
            'b) Aus 1.200 g Lammrücken (25 % Garverlust) schneiden Sie Portionen à 180 g. Wie viele Portionen erhalten Sie?'
        }),
        cloneBankQuestion('lf3-q4', 3, {
          id: 's25-q3',
          title: 'Aufgabe 3: Omelett-Zubereitung in 6 Schritten & Salmonellenschutz'
        }),
        cloneBankQuestion('lf6-q2', 4, {
          id: 's25-q4',
          title: 'Aufgabe 4: Vegane Alternativen in der Küche & Ernährungsformen'
        }),
        cloneBankQuestion('lf5-q3', 5, {
          id: 's25-q5',
          title: 'Aufgabe 5: Buffet-Service & Vorteile für Gast und Restaurant'
        }),
        cloneBankQuestion('lf5-q6', 6, {
          id: 's25-q6',
          title: 'Aufgabe 6: Sektempfang (35 Gäste), Wasserarten & Jugendschutz (14-Jähriger)'
        }),
        cloneBankQuestion('lf5-q4', 7, {
          id: 's25-q7',
          title: 'Aufgabe 7: Grüner Tee (Brühtemperatur 70–80 °C) & Kaffeespezialitäten'
        }),
        cloneBankQuestion('lf9-q3', 8, {
          id: 's25-q8',
          title: 'Aufgabe 8: Umsatzsteuerberechnung für ein 3-Gänge-Menü (39,00 € Brutto)'
        })
      ]
    },

    /* ========================================================================
       2. IHK ABSCHLUSSPRÜFUNG WINTER 2024/25 (NR. 6132 - 8 AUFGABEN KOMPLETT)
       ======================================================================== */
    'ihk-winter-2024': {
      id: 'ihk-winter-2024',
      group: 'abschluss',
      title: 'IHK Abschlussprüfung Winter 2024/25 · Nr. 6132',
      subtitle: 'Frühstücksservice, Buffet, Textilpflege & Klassisches Anrichten (8 Aufgaben · 80 Punkte)',
      durationMinutes: 90,
      badge: 'IHK Winter 2024/25',
      questions: [
        {
          id: 'w24-q1',
          no: 1,
          lf: 'lf3',
          fach: 'bfk1',
          category: 'praxis',
          points: 10,
          title: 'Aufgabe 1: Zubereitung von Rührei in 5 Schritten & Produkthygiene bei Eiern',
          questionDe: 'Für das Frühstücksbuffet bereiten Sie frisches Rührei zu.\n' +
            'a) Beschreiben Sie die fachgerechte Herstellung von Rührei in 5 Arbeitsschritten.\n' +
            'b) Nennen Sie vier Maßnahmen der Produkthygiene beim Umgang mit frischen Hühnereiern.',
          questionVi: 'Cho quầy Buffet sáng, bạn chế biến món trứng bác (Rührei) tươi.\n' +
            'a) Trình bày quy trình làm món Rührei chuẩn trong 5 bước.\n' +
            'b) Nêu 4 biện pháp vệ sinh thực phẩm (Produkthygiene) khi làm việc với trứng gà tươi.',
          placeholderDe: 'a) 5 Schritte Rührei: 1. Eier einzeln aufschlagen...\nb) 4 Maßnahmen Produkthygiene Eier...',
          hintDe: 'a) Einzeln aufschlagen -> mit etwas Milch/Sahne & Gewürzen verquirlen -> Butter in Pfanne schmelzen -> bei milder Hitze stocken lassen & schieben -> saftig (baveuse) anrichten.',
          hintVi: 'a) Đập từng quả kiểm tra → Đánh đều với chút sữa/muối tiêu → Đun chảy bơ → Đảo nhẹ ở lửa nhỏ cho đông mềm → Bày ra đĩa khi còn sánh ẩm.',
          keywords: [
            { term: 'einzeln aufschlagen', points: 2, vi: 'Đập từng quả trứng ra bát nhỏ để kiểm tra độ tươi trước khi cho vào âu chung', alt: ['aufschlagen', 'Frische prüfen'] },
            { term: 'verquirlen', points: 1.5, vi: 'Đánh tan trứng (verquirlen) với muối, tiêu và một chút sữa/kem tươi', alt: ['Milch', 'würzen'] },
            { term: 'stocken lassen', points: 2, vi: 'Đun chảy bơ trong chảo chống dính, đổ trứng vào và đảo nhẹ ở lửa vừa/nhỏ cho trứng đông mềm (stocken lassen, không để cháy khô)', alt: ['milde Hitze', 'Pfanne', 'Butter'] },
            { term: 'Kühlkette', points: 2, vi: 'Produkthygiene: Bảo quản lạnh liên tục (+5 bis +7 °C), kiểm tra hạn MHD, loại bỏ trứng nứt vỡ/bẩn', alt: ['7 °C', 'MHD', 'Knickeier'] },
            { term: '72 °C', points: 2.5, vi: 'Không mang khay giấy carton vào bếp sạch, gia nhiệt ≥ +72 °C, rửa/sát khuẩn tay và dụng cụ ngay sau khi chạm trứng sống', alt: ['Eierkarton', 'desinfizieren', 'Kreuzkontamination'] }
          ],
          musterloesungDe:
            'a) Herstellung von Rührei in 5 Schritten:\n' +
            '1. Frische Eier einzeln in ein Schälchen aufschlagen (Sicht- und Geruchskontrolle) und in eine Schüssel geben.\n' +
            '2. Etwas Milch oder Sahne zugeben, mit Salz und weißem Pfeffer würzen und glatt verquirlen.\n' +
            '3. Butter in einer beschichteten Pfanne bei mittlerer Hitze aufschäumen lassen.\n' +
            '4. Eiermasse eingießen und bei sanfter Hitze mit dem Pfannenwender langsam vom Boden her schieben und cremig stocken lassen (nicht zu heiß braten!).\n' +
            '5. Wenn das Rührei noch saftig-glänzend ist, sofort auf vorgewärmten Tellern bzw. im Chafing-Dish anrichten und ggf. mit frischem Schnittlauch bestreuen.\n\n' +
            'b) Vier Maßnahmen der Produkthygiene bei Eiern:\n' +
            '1. Durchgehende Kühlung bei +5 °C bis +7 °C und Beachtung des Mindesthaltbarkeitsdatums (MHD).\n' +
            '2. Schmutzige oder angeschlagene Eier (Knickeier) sofort aussortieren; Eierpappen niemals auf saubere Arbeitsflächen in der Küche stellen.\n' +
            '3. Rohei-Masse sofort verarbeiten (nicht bei Raumtemperatur stehen lassen) und Eierspeisen auf mind. +72 °C durcherhitzen.\n' +
            '4. Arbeitsgeräte, Schüsseln und Hände nach Kontakt mit Rohei sofort gründlich heiß reinigen und desinfizieren.',
          musterloesungVi:
            'a) 5 bước làm Rührei: 1. Đập từng quả trứng ra chén nhỏ kiểm tra rồi cho vào tô; 2. Thêm chút sữa/kem tươi, muối tiêu và đánh đều; 3. Đun chảy bơ trong chảo chống dính ở lửa vừa; 4. Đổ trứng vào, dùng phới đẩy nhẹ từ đáy chảo ở lửa nhỏ để trứng kết đông mềm mịn; 5. Lấy ra ngay khi trứng còn sánh ẩm và rắc hành lá (Schnittlauch).\n' +
            'b) 4 quy tắc Produkthygiene với trứng: 1. Bảo quản lạnh +5 đến +7 °C và kiểm tra MHD; 2. Loại bỏ trứng nứt/bẩn, không đặt vỉ giấy trứng lên bàn bếp sạch; 3. Chế biến ngay sau khi đập và nấu đạt ≥ +72 °C; 4. Rửa sạch và khử trùng ngay dụng cụ/tay sau khi tiếp xúc trứng sống.',
          explanation: {
            whyCorrect: 'Khớp hoàn toàn với câu 1 & câu 2 trong đề thi thật IHK Winter 2024/25.',
            whyWrong: 'Để lửa quá to làm trứng bị khô cứng và tách nước trên quầy Buffet.',
            keyTakeaway: 'Bí quyết Rührei chuẩn IHK: Đập riêng từng quả + Lửa nhỏ (sanfte Hitze) + Lấy ra khi còn sánh mịn (saftig-cremig)!'
          }
        },
        cloneBankQuestion('lf6-q3', 2, {
          id: 'w24-q2',
          title: 'Aufgabe 2: Glutenfreie & Laktosefreie Frühstücksempfehlungen (je 3 Komponenten)'
        }),
        {
          id: 'w24-q3',
          no: 3,
          lf: 'lf2',
          fach: 'bfk1',
          category: 'rechnen',
          points: 10,
          title: 'Aufgabe 3: Angebotsvergleich Brötchenlieferung (Bäckerei Frisch vs. Lecker)',
          questionDe: 'Für das Frühstücksbuffet benötigt Ihr Hotel täglich 250 Brötchen.\n' +
            '-Bäckerei „Frisch“ bietet 1 Brötchen für 0,32 € frei Haus an und gewährt ab 200 Stück 5 % Mengenrabatt.\n' +
            '-Bäckerei „Lecker“ bietet 1 Brötchen für 0,29 € an, berechnet aber pro Lieferung 6,50 € Anfahrtspauschale (kein Rabatt).\n' +
            'a) Berechnen Sie die Tageskosten bei beiden Bäckereien mit vollständigem Rechenweg.\n' +
            'b) Welches Angebot ist günstiger und wie hoch ist die Ersparnis in 30 Tagen?\n' +
            'c) Nennen Sie neben dem Preis drei qualitative Kriterien für die Auswahl einer Bäckerei.',
          questionVi: 'Cho quầy Buffet sáng, khách sạn của bạn cần 250 ổ bánh mì Brötchen mỗi ngày.\n' +
            '-Tiệm bánh „Frisch“ chào giá 0,32 €/ổ giao tận nơi (frei Haus) và giảm giá số lượng 5 % khi mua từ 200 ổ.\n' +
            '-Tiệm bánh „Lecker“ chào giá 0,29 €/ổ nhưng tính phí giao hàng 6,50 €/lần (không giảm giá).\n' +
            'a) Tính chi phí mỗi ngày của cả 2 tiệm bánh (ghi rõ phép tính).\n' +
            'b) Tiệm bánh nào rẻ hơn và tiết kiệm được bao nhiêu tiền trong 30 ngày?\n' +
            'c) Ngoài giá cả, hãy nêu 3 tiêu chí chất lượng/dịch vụ khi chọn nhà cung cấp bánh mì.',
          placeholderDe: 'a) Bäckerei Frisch: 250 * 0,32 € - 5 % = ...\nBäckerei Lecker: 250 * 0,29 € + 6,50 € = ...\nb) Ersparnis in 30 Tagen = ...\nc) 3 qualitative Kriterien...',
          hintDe: 'a) Frisch: 80,00 € - 4,00 € = 76,00 €. Lecker: 72,50 € + 6,50 € = 79,00 €. b) 3,00 € pro Tag × 30 = 90,00 €.',
          hintVi: 'a) Frisch: 80,00 € - 4,00 € = 76,00 €. Lecker: 72,50 € + 6,50 € = 79,00 €. b) Tiết kiệm 3,00 €/ngày × 30 ngày = 90,00 €.',
          keywords: [
            { term: '76,00', points: 2.5, vi: 'Bäckerei Frisch: 250 × 0,32 € = 80,00 € - 5 % Rabatt (4,00 €) = 76,00 €/ngày', alt: ['76 €', '80,00'] },
            { term: '79,00', points: 2.5, vi: 'Bäckerei Lecker: (250 × 0,29 € = 72,50 €) + 6,50 € Lieferkosten = 79,00 €/ngày', alt: ['79 €', '72,50'] },
            { term: '90,00', points: 2, vi: 'Frisch rẻ hơn 3,00 €/ngày → Trong 30 ngày tiết kiệm được 3,00 € × 30 = 90,00 €', alt: ['90 €', '3,00 €'] },
            { term: 'Lieferzuverlässigkeit', points: 3, vi: '3 tiêu chí ngoài giá: Độ tươi & hương vị (Frische/Qualität), Giao hàng đúng giờ sáng sớm (Pünktlichkeit/Lieferzuverlässigkeit), Đa dạng chủng loại (Sortimentsbreite/Glutenfrei/Bio)', alt: ['Frische', 'Pünktlichkeit', 'Sortiment', 'Bio'] }
          ],
          musterloesungDe:
            'a) Berechnung der Tageskosten (für 250 Brötchen):\n' +
            '-Bäckerei „Frisch“:\n' +
            '  Warenwert: 250 Stück × 0,32 € = 80,00 €\n' +
            '  Abzüglich 5 % Mengenrabatt: 80,00 € × 0,05 = 4,00 €\n' +
            '  Tagespreis (frei Haus): 80,00 € - 4,00 € = 76,00 €.\n' +
            '-Bäckerei „Lecker“:\n' +
            '  Warenwert: 250 Stück × 0,29 € = 72,50 €\n' +
            '  Zuzüglich Lieferpauschale: 72,50 € + 6,50 € = 79,00 €.\n\n' +
            'b) Entscheidung & Ersparnis in 30 Tagen:\n' +
            'Bäckerei „Frisch“ ist pro Tag um 3,00 € (79,00 € - 76,00 €) günstiger. In 30 Tagen beträgt die Ersparnis: 3,00 € × 30 Tage = 90,00 €.\n\n' +
            'c) Drei qualitative Auswahlkriterien:\n' +
            '1. Frische, Geschmack und handwerkliche Backqualität der Brötchen.\n' +
            '2. Absolute Pünktlichkeit und Lieferzuverlässigkeit am frühen Morgen vor Frühstücksbeginn.\n' +
            '3. Sortimentsvielfalt (z. B. Vollkorn-, Dinkel-, Laugen- und glutenfreie Brötchen) sowie Regionalität/Bio-Qualität.',
          musterloesungVi:
            'a) Chi phí mỗi ngày:\n' +
            '-Bäckerei Frisch: 250 × 0,32 € = 80,00 €; trừ 5 % chiết khấu (4,00 €) = 76,00 € (miễn phí giao hàng).\n' +
            '-Bäckerei Lecker: (250 × 0,29 € = 72,50 €) + 6,50 € phí giao hàng = 79,00 €.\n' +
            'b) Bäckerei Frisch rẻ hơn 3,00 €/ngày → Trong 30 ngày tiết kiệm được 90,00 €.\n' +
            'c) 3 tiêu chí phi giá cả: 1. Chất lượng độ giòn/tươi ngon của bánh; 2. Độ đúng giờ tuyệt đối vào sáng sớm trước giờ mở Buffet; 3. Sự đa dạng chủng loại (bánh nguyên cám, bánh không Gluten).',
          explanation: {
            whyCorrect: 'Mô phỏng chính xác bài toán so sánh báo giá Bäckerei trong đề thi thật IHK Winter 2024/25.',
            whyWrong: 'Chỉ nhìn đơn giá 0,29 € < 0,32 € mà quên cộng phí giao hàng cố định mỗi ngày.',
            keyTakeaway: 'Khi so sánh báo giá (Angebotsvergleich): Luôn tính Einstandspreis = (Menge × Einzelpreis) - Rabatt + Bezugskosten (Fracht/Verpackung)!'
          }
        },
        cloneBankQuestion('lf5-q3', 4, {
          id: 'w24-q4',
          title: 'Aufgabe 4: Buffet-Betreuung & Klassische Tafelformen im Bankett'
        }),
        cloneBankQuestion('lf5-q4', 5, {
          id: 'w24-q5',
          title: 'Aufgabe 5: Rechtlicher Unterschied „Tee“ vs. „teeähnliche Erzeugnisse“'
        }),
        cloneBankQuestion('lf1-q4', 6, {
          id: 'w24-q6',
          title: 'Aufgabe 6: Textilpflegekennzeichen (Tischwäsche) & Wasser-/Energiesparen'
        }),
        cloneBankQuestion('lf5-q2', 7, {
          id: 'w24-q7',
          title: 'Aufgabe 7: Klassisches Anrichten nach der 6-Uhr-Regel & Seitenregel im Service'
        }),
        {
          id: 'w24-q8',
          no: 8,
          lf: 'lf5',
          fach: 'bfk2',
          category: 'recht',
          points: 10,
          title: 'Aufgabe 8: Jugendschutzgesetz (§ 9 JuSchG) – 15-Jähriger allein vs. 12-Jähriger mit Eltern',
          questionDe: 'Im Restaurantservice kommt es zu zwei Situationen:\n' +
            'Situation A: Ein 15-jähriger Jugendlicher sitzt allein am Tisch und bestellt ein Glas Weißwein (0,1 l).\n' +
            'Situation B: Ein Ehepaar bestellt für seinen 12-jährigen Sohn zum Hauptgang ein kleines Radler (Bier mit Limonade, 0,2 l).\n' +
            'Entscheiden Sie für beide Situationen nach dem Jugendschutzgesetz (§ 9 JuSchG), ob Sie das Getränk servieren dürfen, und begründen Sie Ihre Entscheidung jeweils mit den genauen Altersgrenzen.',
          questionVi: 'Trong ca phục vụ nhà hàng xảy ra 2 tình huống:\n' +
            'Tình huống A: Một thiếu niên 15 tuổi ngồi một mình tại bàn và gọi 1 ly rượu vang trắng (0,1 l).\n' +
            'Tình huống B: Một cặp vợ chồng gọi cho cậu con trai 12 tuổi của họ một ly Radler nhỏ (bia pha nước chanh, 0,2 l) dùng kèm bữa chính.\n' +
            'Hãy quyết định cho cả hai tình huống theo Luật Bảo vệ thanh thiếu niên (§ 9 JuSchG) xem bạn có được phép phục vụ không, và giải thích rõ với các mốc tuổi pháp lý.',
          placeholderDe: 'Situation A (15 Jahre allein): Ja/Nein + Begründung nach § 9 JuSchG...\nSituation B (12 Jahre mit Eltern): Ja/Nein + Begründung nach § 9 JuSchG...',
          hintDe: 'Beide Situationen = NEIN! A) Ohne Eltern erst ab 16 Jahren. B) Mit Eltern („begleitetes Trinken“) erst ab 14 Jahren – unter 14 Jahren (Kinder) gilt absolutes Alkoholverbot!',
          hintVi: 'Cả hai tình huống đều là KHÔNG ĐƯỢC PHÉP! A) Đi một mình phải từ 16 tuổi. B) Có bố mẹ đi kèm cũng phải đủ 14 tuổi trở lên – dưới 14 tuổi (trẻ em) bị cấm rượu bia tuyệt đối!',
          keywords: [
            { term: 'Nein', points: 2, vi: 'Cả hai tình huống A và B đều KHÔNG được phép phục vụ (beide Male NEIN!)', alt: ['nicht erlaubt', 'verboten', 'beide Situationen nein'] },
            { term: 'ab 16 Jahren', points: 2.5, vi: 'Tình huống A (15 tuổi đi một mình): Theo § 9 Abs. 1 Nr. 2 JuSchG, bia/rượu vang/Sekt chỉ được bán cho thanh thiếu niên đi một mình từ đủ 16 tuổi trở lên', alt: ['16 Jahre', 'ohne Begleitung'] },
            { term: 'ab 14 Jahren', points: 3, vi: 'Tình huống B (12 tuổi đi cùng bố mẹ): Quy định „begleitetes Trinken“ (uống bia/vang khi có bố mẹ/Personensorgeberechtigte đi cùng) chỉ áp dụng từ đủ 14 tuổi trở lên; dưới 14 tuổi là trẻ em (Kinder) bị cấm tuyệt đối!', alt: ['14 Jahre', 'Kinder', 'unter 14', 'Personensorgeberechtigte'] },
            { term: 'Alkoholfreie Alternative', points: 2.5, vi: 'Cách ứng xử chuyên nghiệp: Lịch sự giải thích quy định JuSchG và gợi ý đồ uống không cồn thay thế (alkoholfreies Radler, Traubenschorle, Mocktail)', alt: ['alkoholfrei', 'Alternative anbieten', 'Schorle'] }
          ],
          musterloesungDe:
            'Beurteilung nach § 9 Jugendschutzgesetz (JuSchG):\n\n' +
            '1. Situation A (15-Jähriger allein bestellt Weißwein): NEIN, der Weißwein darf NICHT serviert werden.\n' +
            '-Begründung: Nach § 9 Abs. 1 Nr. 2 JuSchG dürfen gegorene alkoholische Getränke (Bier, Wein, Sekt) an Jugendliche ohne Begleitung einer personensorgeberechtigten Person erst ab Vollendung des 16. Lebensjahres abgegeben werden.\n\n' +
            '2. Situation B (Eltern bestellen Radler für 12-jährigen Sohn): NEIN, auch das Radler darf NICHT serviert werden.\n' +
            '-Begründung: Die Ausnahmeregelung des „begleiteten Trinkens“ in Anwesenheit der Eltern (Personensorgeberechtigten) nach § 9 Abs. 2 JuSchG gilt ausschließlich für Jugendliche ab 14 Jahren (14 und 15 Jahre). Für Kinder unter 14 Jahren gilt auch im Beisein der Eltern ein absolutes Alkoholverbot (auch für Biermischgetränke wie Radler)!\n\n' +
            'Professionelles Verhalten im Service: Höflich auf das gesetzliche Verbot nach dem Jugendschutzgesetz hinweisen und eine attraktive alkoholfreie Alternative (z. B. alkoholfreies Radler, Apfelschorle oder Traubensaftschorle) empfehlen.',
          musterloesungVi:
            'Quyết định theo § 9 JuSchG:\n' +
            '1. Tình huống A (15 tuổi đi một mình gọi rượu vang trắng): KHÔNG ĐƯỢC PHÉP phục vụ.\n' +
            '-Lý do: Khi không có cha mẹ đi cùng, các đồ uống lên men (bia, vang, Sekt) chỉ được phép phục vụ cho người từ đủ 16 tuổi trở lên.\n' +
            '2. Tình huống B (Bố mẹ gọi Radler cho con trai 12 tuổi): KHÔNG ĐƯỢC PHÉP phục vụ.\n' +
            '-Lý do: Ngoại lệ „begleitetes Trinken“ (uống bia/vang khi có cha mẹ đi cùng) chỉ áp dụng cho thanh thiếu niên từ đủ 14 tuổi (14–15 tuổi). Dưới 14 tuổi là trẻ em (Kinder), bị cấm rượu bia tuyệt đối kể cả khi bố mẹ đồng ý!\n' +
            'Cách xử lý: Lịch sự giải thích quy định pháp luật và gợi ý đồ uống không cồn thay thế (Radler không cồn, nước nho pha khoáng).',
          explanation: {
            whyCorrect: 'Đây chính là câu hỏi bẫy cực hay ở cuối đề thi thật IHK Winter 2024/25.',
            whyWrong: 'Nhiều thí sinh thấy „có bố mẹ đi cùng“ ở Tình huống B nên trả lời „Được phép“ mà quên mất cậu bé mới 12 tuổi (< 14 tuổi)!',
            keyTakeaway: 'Cảnh giác bẫy IHK: Đi cùng bố mẹ nhưng DƯỚI 14 tuổi (vd: 12 hoặc 13 tuổi) → Vẫn CẤM TUYỆT ĐỐI mọi đồ uống có cồn!'
          }
        }
      ]
    },

    /* ========================================================================
       3. IHK ABSCHLUSSPRÜFUNG SOMMER 2024 (NR. 6132 - 8 AUFGABEN KOMPLETT)
       ======================================================================== */
    'ihk-sommer-2024': {
      id: 'ihk-sommer-2024',
      group: 'abschluss',
      title: 'IHK Abschlussprüfung Sommer 2024 · Nr. 6132',
      subtitle: 'Frühdienst, Lammrücken, Gurkensalat, Kaffee & Schankverlust (8 Aufgaben · 80 Punkte)',
      durationMinutes: 90,
      badge: 'IHK Sommer 2024',
      questions: [
        {
          id: 's24-q1',
          no: 1,
          lf: 'lf5',
          fach: 'bfk1',
          category: 'praxis',
          points: 10,
          title: 'Aufgabe 1: Vorbereitende Arbeiten im Frühdienst (Restaurant & Terrasse)',
          questionDe: 'Sie sind im Frühdienst eingeteilt, bevor die ersten Gäste ins Restaurant kommen.\n' +
            'Nennen und beschreiben Sie acht vorbereitende Arbeiten (Mise en place & Wirtschaftsdienst), die im Gastraum, am Buffet und im Thekenbereich vor der Öffnung erledigt werden müssen.',
          questionVi: 'Bạn được phân công ca sáng (Frühdienst) trước khi những vị khách đầu tiên bước vào nhà hàng.\n' +
            'Hãy nêu và mô tả 8 công việc chuẩn bị (Mise en place & Wirtschaftsdienst) cần hoàn thành tại phòng ăn, quầy Buffet và quầy bar trước giờ mở cửa.',
          placeholderDe: '1. Lüften und Beleuchtung...\n2. Tische und Stühle...\n3. Tischwäsche und Eindecken...\n4. ...',
          hintDe: 'Lüften/Temperatur, Sauberkeit prüfen, Tische aufdecken (Tischwäsche, Grundgedeck, Menagen, Deko), Servietten brechen, Kaffeemaschine/Theke starten, Kasse/Reservierungsbuch prüfen.',
          hintVi: 'Thông gió/bật đèn, Kiểm tra vệ sinh sàn/ghế, Trải khăn bàn & bày Grundgedeck, Châm lọ gia vị Menage, Gấp khăn ăn, Khởi động máy cà phê/quầy bar, Kiểm tra sổ đặt bàn & máy thu ngân.',
          keywords: [
            { term: 'Lüften', points: 1.5, vi: '1. Mở cửa thông gió (Stoßlüften), kiểm tra nhiệt độ phòng và bật hệ thống đèn/nhạc nền', alt: ['Beleuchtung', 'Raumtemperatur'] },
            { term: 'Reinigung', points: 1.5, vi: '2. Kiểm tra vệ sinh bàn ghế, sàn nhà, cửa kính và khu vệ sinh khách (Sanitärbereich)', alt: ['Tische abwischen', 'Stühle', 'Sauberkeit'] },
            { term: 'Tischwäsche', points: 1.5, vi: '3. Trải khăn bàn sạch phẳng phiu (Molton & Tischdecken), gấp khăn ăn (Servietten brechen)', alt: ['Servietten', 'Tischdecken'] },
            { term: 'Grundgedeck', points: 1.5, vi: '4. Lau bóng dao dĩa/ly (Besteck und Gläser polieren) và bày bàn chuẩn (Grundgedeck eindecken)', alt: ['polieren', 'eindecken', 'Besteck'] },
            { term: 'Menagen', points: 1.5, vi: '5. Kiểm tra, lau sạch và châm đầy các lọ gia vị (Menagen: Salz, Pfeffer, Zahnstocher), đặt hoa tươi/nến và số bàn', alt: ['Tischdekoration', 'Blumen', 'Tischnummern'] },
            { term: 'Kaffeemaschine', points: 1.5, vi: '6. Khởi động máy pha cà phê, kiểm tra tủ lạnh đồ uống, cắt chanh/trái cây decor tại quầy Theke', alt: ['Theke', 'Kühlung', 'Mise en place'] },
            { term: 'Reservierungen', points: 1, vi: '7. Kiểm tra danh sách khách đặt bàn (Reservierungsbuch), đặt biển „Reserviert“ và họp giao ban ngắn với bếp (Tagesempfehlung/Ausverkauftes)', alt: ['Reserviert-Schilder', 'Absprache mit der Küche', 'Kasse'] }
          ],
          musterloesungDe:
            'Acht vorbereitende Arbeiten im Frühdienst vor Restaurantöffnung:\n' +
            '1. Gastraum gut durchlüften (Stoßlüften), Raumtemperatur und Beleuchtung kontrollieren.\n' +
            '2. Sauberkeit von Böden, Fenstern, Tischen, Stühlen und Gästetoiletten überprüfen und ggf. nachreinigen.\n' +
            '3. Tische ausrichten (wackelfrei stellen), Molton und saubere, gebügelte Tischwäsche auflegen.\n' +
            '4. Besteck, Gläser und Porzellan kontrollieren, polieren und am Servicetisch (Station) für das Mise en place bereitstellen.\n' +
            '5. Tische passend zur Tageszeit eindecken (Frühstücks- bzw. Mittagsgedeck) und Servietten falten.\n' +
            '6. Menagen (Salz, Pfeffer, Zucker) säubern und auffüllen, frische Tischdekoration (Blumen, Kerzen) und Tischnummern platzieren.\n' +
            '7. Kaffeemaschine und Schankanlage in Betrieb nehmen, Getränkekühlung prüfen und Garnituren (Zitronenscheiben, Milch/Rahm) vorbereiten.\n' +
            '8. Reservierungsliste prüfen, „Reserviert“-Schilder aufstellen, Kasse mit Wechselgeld bestücken und kurzes Briefing mit der Küche abhalten.',
          musterloesungVi:
            '8 công việc chuẩn bị trong ca sáng (Frühdienst):\n' +
            '1. Thông gió phòng ăn, chỉnh nhiệt độ và bật đèn.\n' +
            '2. Kiểm tra độ sạch của sàn, bàn ghế (chỉnh chân bàn không cập kênh) và nhà vệ sinh khách.\n' +
            '3. Trải tấm lót Molton và khăn trải bàn sạch.\n' +
            '4. Kiểm tra và lau bóng dao dĩa, ly cốc, chuẩn bị tủ phụ (Servicestation).\n' +
            '5. Bày bàn (eindecken) và gấp khăn ăn.\n' +
            '6. Lau sạch, châm đầy lọ muối tiêu/đường (Menagen), đặt bình hoa và số bàn.\n' +
            '7. Khởi động máy pha cà phê, kiểm tra tủ mát đồ uống và chuẩn bị chanh/sữa tại quầy.\n' +
            '8. Kiểm tra sổ đặt bàn, đặt biển „Reserviert“, nạp tiền lẻ vào máy thu ngân và trao đổi nhanh với bếp về món đặc biệt trong ngày.',
          explanation: {
            whyCorrect: 'Trả lời đầy đủ, có trình tự logic cho Câu 1 của đề thi thật IHK Sommer 2024.',
            whyWrong: 'Liệt kê trùng lặp 1 ý (ví dụ: lau dao, lau dĩa, lau thìa tính thành 3 ý) thay vì bao quát từ phòng ăn → bàn ăn → quầy bar → sổ đặt bàn.',
            keyTakeaway: 'Trình tự chuẩn Frühdienst: Raum (Phòng/Đèn/Khí) → Möbel & Wäsche (Bàn ghế/Khăn) → Gedeck & Menage (Dao dĩa/Ly/Hoa) → Theke & Kasse (Máy cà phê/Đặt bàn)!'
          }
        },
        cloneBankQuestion('lf6-q2', 2, {
          id: 's24-q2',
          title: 'Aufgabe 2: Vegetarisches 3-Gänge-Menü erstellen & Menüregeln'
        }),
        cloneBankQuestion('lf5-q6', 3, {
          id: 's24-q3',
          title: 'Aufgabe 3: Weinempfehlung zum Lammrücken, Serviertemperatur & 4 Anbaugebiete'
        }),
        cloneBankQuestion('lf3-q5', 4, {
          id: 's24-q4',
          title: 'Aufgabe 4: Garverlust-Berechnung beim Lammrücken (1.200 g, 25 % Verlust)'
        }),
        cloneBankQuestion('lf4-q2', 5, {
          id: 's24-q5',
          title: 'Aufgabe 5: Mise en place & Herstellung von Gurkensalat in 5 Schritten'
        }),
        cloneBankQuestion('lf5-q4', 6, {
          id: 's24-q6',
          title: 'Aufgabe 6: 6 Heißgetränke & Kaffee-Ausbeute (1 kg Bohnen ÷ 7 g = 142 Tassen)'
        }),
        cloneBankQuestion('lf5-q5', 7, {
          id: 's24-q7',
          title: 'Aufgabe 7: Schankverlust berechnen (30-l-Fass, 98 Gläser à 0,3 l = 2 %) & Schaumbildung'
        }),
        cloneBankQuestion('lf9-q2', 8, {
          id: 's24-q8',
          title: 'Aufgabe 8: Kontrolle des Kassenbildschirms (Bonierfehler) & Kassenabschluss'
        })
      ]
    },

    /* ========================================================================
       4. IHK ABSCHLUSSPRÜFUNG WINTER 2023/24 (NR. 6132 - 8 AUFGABEN KOMPLETT)
       ======================================================================== */
    'ihk-winter-2023': {
      id: 'ihk-winter-2023',
      group: 'abschluss',
      title: 'IHK Abschlussprüfung Winter 2023/24 · Nr. 6132',
      subtitle: 'Hygienebereiche, Obstsalat-Kalkulation, Convenience, Getränkekarte & Mobbing (8 Aufgaben · 80 Punkte)',
      durationMinutes: 90,
      badge: 'IHK Winter 2023/24',
      questions: [
        cloneBankQuestion('lf1-q3', 1, {
          id: 'w23-q1',
          title: 'Aufgabe 1: Reinigungsarbeiten, Gefahrstoffsymbol & Stromkosten (850 W Staubsauger)'
        }),
        cloneBankQuestion('lf4-q2', 2, {
          id: 'w23-q2',
          title: 'Aufgabe 2: Vegetarische Snack-Karte (4 kalte & 4 warme Snacks)'
        }),
        cloneBankQuestion('lf3-q1', 3, {
          id: 'w23-q3',
          title: 'Aufgabe 3: Die 3 Hygienebereiche mit je 3 konkreten Maßnahmen'
        }),
        cloneBankQuestion('lf3-q5', 4, {
          id: 'w23-q4',
          title: 'Aufgabe 4: Obstsalat-Kalkulation für 80 Personen (120 g Netto, 20 % Putzverlust = 12 kg)'
        }),
        cloneBankQuestion('lf3-q6', 5, {
          id: 'w23-q5',
          title: 'Aufgabe 5: Vitaminschonende Vorbereitung und Zubereitung von Obst & Gemüse'
        }),
        cloneBankQuestion('lf4-q3', 6, {
          id: 'w23-q6',
          title: 'Aufgabe 6: Convenience-Produkte – Stufen & 4 wirtschaftliche Vorteile'
        }),
        cloneBankQuestion('lf6-q5', 7, {
          id: 'w23-q7',
          title: 'Aufgabe 7: Überprüfung einer fehlerhaften Getränkekarte (Pflichtangaben)'
        }),
        cloneBankQuestion('wiko-q4', 8, {
          id: 'w23-q8',
          title: 'Aufgabe 8: Umgang mit Mobbing im Ausbildungsbetrieb (3 Maßnahmen)'
        })
      ]
    },

    /* ========================================================================
       5. IHK ZWISCHENPRÜFUNG / TEIL 1 (GASTROAUSBV 2022)
       ======================================================================== */
    'ihk-zwischenpruefung': {
      id: 'ihk-zwischenpruefung',
      group: 'zp',
      title: 'IHK Zwischenprüfung / GAP Teil 1 · GastroAusbV 2022',
      subtitle: 'Wirtschaftsdienst, Wareneingang, Küchenhygiene, Eier/Kartoffeln & Grundservice (7 Aufgaben · 70 Punkte)',
      durationMinutes: 60,
      badge: 'IHK Zwischenprüfung',
      questions: [
        cloneBankQuestion('lf1-q2', 1, { title: 'Aufgabe 1: Arbeitssicherheit & Persönliche Schutzausrüstung (PSA)' }),
        cloneBankQuestion('lf2-q1', 2, { title: 'Aufgabe 2: Wareneingangskontrolle (6 Schritte) & HACCP-Kühltemperaturen' }),
        cloneBankQuestion('lf3-q1', 3, { title: 'Aufgabe 3: Die 3 Säulen der Hygiene & Farbcodierung der Schneidebretter' }),
        cloneBankQuestion('lf3-q4', 4, { title: 'Aufgabe 4: Eiercode entschlüsseln, Frischetests & Salmonellenschutz' }),
        cloneBankQuestion('lf3-q6', 5, { title: 'Aufgabe 5: Kartoffel-Kochtypen (A, B, C) & Vitaminschonendes Garen' }),
        cloneBankQuestion('lf4-q1', 6, { title: 'Aufgabe 6: Klassische Gemüseschnittarten (Julienne, Brunoise, Bâtonnets, Macédoine)' }),
        cloneBankQuestion('lf5-q1', 7, { title: 'Aufgabe 7: Grundgedeck & Erweitertes Gedeck für ein 4-Gänge-Menü' })
      ]
    },

    /* ========================================================================
       6. IHK WISO-PRÜFUNG (WIRTSCHAFTS- UND SOZIALKUNDE KOMPLETT)
       ======================================================================== */
    'ihk-wiso-abschluss': {
      id: 'ihk-wiso-abschluss',
      group: 'abschluss',
      title: 'IHK WiSo-Abschlussprüfung · Wirtschafts- und Sozialkunde',
      subtitle: 'BBiG, Kündigungsschutz, JArbSchG, MuSchG, 5 Säulen SV, Lohnabrechnung & Tarifrecht (6 Aufgaben · 60 Punkte)',
      durationMinutes: 60,
      badge: 'IHK WiSo',
      questions: [
        cloneBankQuestion('lf1-q1', 1, { title: 'Aufgabe 1: Pflichten von Azubi (§ 13 BBiG) und Ausbildendem (§ 14 BBiG)' }),
        cloneBankQuestion('wiko-q1', 2, { title: 'Aufgabe 2: Probezeit & Kündigungsschutz im Ausbildungsverhältnis (§ 20 & § 22 BBiG)' }),
        cloneBankQuestion('wiko-q2', 3, { title: 'Aufgabe 3: Jugendarbeitsschutzgesetz (JArbSchG) & Mutterschutzgesetz (MuSchG)' }),
        cloneBankQuestion('wiko-q3', 4, { title: 'Aufgabe 4: Die 5 Säulen der Sozialversicherung & Lohnabrechnungsschema' }),
        cloneBankQuestion('wiko-q4', 5, { title: 'Aufgabe 5: Betriebsrat (BetrVG), Tarifvertrag (NGG/DEHOGA) & Günstigkeitsprinzip' }),
        cloneBankQuestion('lf2-q3', 6, { title: 'Aufgabe 6: Zustandekommen des Kaufvertrags & Lieferbedingungen' })
      ]
    },

    /* ========================================================================
       7. KLASSENARBEIT BFK-1 NR. 2 (LF 2 + LF 3: ERNÄHRUNG, EIER, KAUFVERTRAG & STÖRUNGEN)
       ======================================================================== */
    'bfk1-ka2': {
      id: 'bfk1-ka2',
      group: 'ka',
      title: 'Klassenarbeit Nr. 2 · BfK-1 (LF 2 & LF 3)',
      subtitle: 'Nährwertberechnung (Apfelstrudel), Biologische Wertigkeit, Eiercode, Kaufvertrag, Schlechtleistung & Lieferverzug (6 Aufgaben · 60 Punkte)',
      durationMinutes: 45,
      badge: 'BfK-1 · KA 2',
      questions: [
        cloneBankQuestion('lf3-q2', 1, { title: 'Aufgabe 1: Brennwertberechnung (Apfelstrudel in kJ) & Grundumsatz / PAL' }),
        cloneBankQuestion('lf3-q3', 2, { title: 'Aufgabe 2: Biologische Wertigkeit (BW) & Ergänzungswert von Proteinen' }),
        cloneBankQuestion('lf3-q4', 3, { title: 'Aufgabe 3: Eiercode „0-DE-...“, Frischetests & Salmonellenschutz' }),
        cloneBankQuestion('lf2-q2', 4, { title: 'Aufgabe 4: Lagerkennzahlen berechnen (Mindest-, Melde- & Höchstbestand)' }),
        cloneBankQuestion('lf2-q3', 5, { title: 'Aufgabe 5: Kaufvertrag (Anfrage vs. Angebot) & Lieferbedingungen (frei Haus / ab Werk)' }),
        cloneBankQuestion('lf2-q4', 6, { title: 'Aufgabe 6: Schlechtleistung (Mängelrüge Stufe 1 & 2) & Lieferverzug (Fixkauf)' })
      ]
    },

    /* ========================================================================
       8. KLASSENARBEIT BFK-1 NR. 3 (LF 6: BEWERTUNGEN, ERNÄHRUNGSFORMEN & ALLERGENE)
       ======================================================================== */
    'bfk1-ka3': {
      id: 'bfk1-ka3',
      group: 'ka',
      title: 'Klassenarbeit Nr. 3 · BfK-1 (LF 6)',
      subtitle: 'Gästebewertungen (4 Schritte & 3S), Ernährungsformen (Vegan/Pescetarisch) & 14 Hauptallergene nach LMIV (4 Aufgaben · 40 Punkte)',
      durationMinutes: 45,
      badge: 'BfK-1 · KA 3',
      questions: [
        cloneBankQuestion('lf6-q1', 1, { title: 'Aufgabe 1: Gästebewertungen systematisch auswerten (4 Schritte) & die „3 S“' }),
        cloneBankQuestion('lf6-q2', 2, { title: 'Aufgabe 2: Ernährungsformen (Vegetarisch, Vegan, Pescetarisch, Flexitarisch) & Alternativen' }),
        cloneBankQuestion('lf6-q3', 3, { title: 'Aufgabe 3: Die 14 Hauptallergene nach LMIV & Beratung bei Zöliakie / Laktoseintoleranz' }),
        cloneBankQuestion('lf5-q7', 4, { title: 'Aufgabe 4: Beschwerdemanagement direkt am Gast nach der LEARN-Methode' })
      ]
    },

    /* ========================================================================
       9. KLASSENARBEIT BFK-1 NR. 4 (LF 6 + LF 9: HÜLSENFRÜCHTE, GETREIDE, SYSTEMGASTRO & KASSE)
       ======================================================================== */
    'bfk1-ka4': {
      id: 'bfk1-ka4',
      group: 'ka',
      title: 'Klassenarbeit Nr. 4 · BfK-1 (LF 6 & LF 9)',
      subtitle: 'Hülsenfrüchte (Phasin), Getreide & Mehltype, Systemgastronomie, Zahlungsmittel, TSE-Bon & Kassensturz (4 Aufgaben · 40 Punkte)',
      durationMinutes: 45,
      badge: 'BfK-1 · KA 4',
      questions: [
        cloneBankQuestion('lf6-q4', 1, { title: 'Aufgabe 1: Getrocknete Hülsenfrüchte (3 Schritte & Phasin) sowie Getreidekorn & Mehltype' }),
        cloneBankQuestion('lf9-q1', 2, { title: 'Aufgabe 2: Systemgastronomie (Quick- vs. Fullservice) & Vergleich der Zahlungsmittel' }),
        cloneBankQuestion('lf9-q2', 3, { title: 'Aufgabe 3: Belegausgabepflicht (TSE), X-Bon vs. Z-Bon & Kassensturz in 4 Schritten' }),
        cloneBankQuestion('lf9-q3', 4, { title: 'Aufgabe 4: Umsatzsteuer in der Gastronomie (7 % vs. 19 %) & Trinkgeld (§ 3 Nr. 51 EStG)' })
      ]
    },

    /* ========================================================================
       10. KLASSENARBEIT BFK-1 NR. 5 (LF 6 + LF 9: SPEISEKARTEN, MENÜREGELN & BEWIRTUNGSVERTRAG)
       ======================================================================== */
    'bfk1-ka5': {
      id: 'bfk1-ka5',
      group: 'ka',
      title: 'Klassenarbeit Nr. 5 · BfK-1 (LF 6 & LF 9)',
      subtitle: 'Speisekartenaufbau, Klassische Menüregeln, Bewirtungsvertrag, Mängelrechte & Zechprellerei (4 Aufgaben · 40 Punkte)',
      durationMinutes: 45,
      badge: 'BfK-1 · KA 5',
      questions: [
        cloneBankQuestion('lf6-q5', 1, { title: 'Aufgabe 1: Aufbau der Speisekarte, 5 klassische Menüregeln & Pflichtangaben der Getränkekarte' }),
        cloneBankQuestion('lf9-q4', 2, { title: 'Aufgabe 2: Bewirtungsvertrag, Mängelrüge (Stufe 1 & 2) & Zechprellerei vs. Geldbeutel vergessen' }),
        cloneBankQuestion('lf9-q3', 3, { title: 'Aufgabe 3: Umsatzsteuer (Im-Haus vs. Außer-Haus) & Netto-/Bruttoberechnung' }),
        cloneBankQuestion('lf9-q2', 4, { title: 'Aufgabe 4: Bewirtungsbeleg, TSE-Kassenbon & Tagesabschluss' })
      ]
    },

    /* ========================================================================
       11. KLASSENARBEIT GK: WAHLEN, MACHT & GESCHICHTE (12.10.2026)
       ======================================================================== */
    'gk-ka-wahlen': {
      id: 'gk-ka-wahlen',
      group: 'ka',
      title: 'Klassenarbeit GK · Wahlen, Macht & Geschichte',
      subtitle: '5 Wahlrechtsgrundsätze, Erst-/Zweitstimme, 5%-Hürde & Grundmandatsklausel, Art. 67 vs. 68 GG & Kalter Krieg (4 Aufgaben · 40 Punkte)',
      durationMinutes: 45,
      badge: 'GK · Wahlen & Geschichte',
      questions: [
        cloneBankQuestion('gk-q3', 1, { title: 'Aufgabe 1: Wahlrechtsgrundsätze (Art. 38 GG), Erst-/Zweitstimme & Falllösung 5%-Hürde / Grundmandatsklausel' }),
        cloneBankQuestion('gk-q4', 2, { title: 'Aufgabe 2: Vertrauensfrage (Art. 68 GG) vs. Konstruktives Misstrauensvotum (Art. 67 GG) & Kalter Krieg (1949–1990)' }),
        {
          id: 'gk-wahlen-q3',
          no: 3,
          lf: 'gk',
          fach: 'gk',
          category: 'recht',
          points: 10,
          title: 'Aufgabe 3: Föderalismus (BRD) vs. Zentralismus (DDR) & Potsdamer Konferenz (4 D)',
          questionDe: 'Nach dem Zweiten Weltkrieg entwickelte sich Deutschland in zwei völlig unterschiedliche Staatsstrukturen.\n' +
            'a) Nennen Sie die „4 D“ (Hauptziele der Alliierten) auf der Potsdamer Konferenz im Sommer 1945.\n' +
            'b) Vergleichen Sie das Prinzip des „Föderalismus“ (Bundesrepublik Deutschland, Art. 20 GG) mit dem „Zentralismus“ (DDR ab 1952) und nennen Sie je zwei Vor- und Nachteile des Föderalismus.',
          questionVi: 'Sau Thế chiến II, nước Đức phát triển thành hai cấu trúc nhà nước hoàn toàn trái ngược.\n' +
            'a) Nêu „4 chữ D“ (4 mục tiêu chính của phe Đồng minh) tại Hội nghị Potsdam mùa hè năm 1945.\n' +
            'b) So sánh nguyên tắc „Liên bang phân quyền (Föderalismus)“ của CHLB Đức (Art. 20 GG) với „Tập quyền trung ương (Zentralismus)“ của CHDC Đức (từ 1952), đồng thời nêu 2 ưu điểm và 2 nhược điểm của chế độ Liên bang.',
          placeholderDe: 'a) Die 4 D der Potsdamer Konferenz 1945: 1. D..., 2. D..., 3. D..., 4. D...\nb) Föderalismus vs. Zentralismus + je 2 Vor-/Nachteile...',
          hintDe: 'a) Denazifizierung, Demilitarisierung, Demokratisierung, Dezentralisierung (bzw. Demontage). b) Föderalismus = Machtaufteilung Bund & 16 Bundesländer (Kultur-/Polizeihoheit); Zentralismus = alle Macht in der Hauptstadt (Ost-Berlin/Bezirke).',
          hintVi: 'a) Phi phát xít hóa, Phi quân sự hóa, Dân chủ hóa, Phi tập trung hóa. b) Föderalismus = Chia sẻ quyền lực giữa Liên bang và 16 bang (tự chủ giáo dục/cảnh sát); Zentralismus = Mọi quyền lực tập trung về trung ương.',
          keywords: [
            { term: 'Denazifizierung', points: 1.5, vi: '1. Denazifizierung (Entnazifizierung – Xóa bỏ chủ nghĩa phát xít) & 2. Demilitarisierung (Abrüstung – Giải giáp quân đội)', alt: ['Entnazifizierung', 'Demilitarisierung'] },
            { term: 'Demokratisierung', points: 1.5, vi: '3. Demokratisierung (Dân chủ hóa) & 4. Dezentralisierung (Phi tập trung hóa kinh tế/chính trị, kèm Demontage)', alt: ['Dezentralisierung', 'Demontage'] },
            { term: 'Bundesländer', points: 2, vi: 'Föderalismus (BRD): Chia sẻ quyền lực theo chiều dọc giữa Liên bang (Bund) và 16 bang (Bundesländer có hiến pháp, chính phủ, nghị viện riêng và tự chủ giáo dục/cảnh sát, tham gia qua Bundesrat)', alt: ['16 Bundesländer', 'Bundesrat', 'Kulturhoheit'] },
            { term: 'Zentralismus', points: 2, vi: 'Zentralismus (DDR): Xóa bỏ các bang năm 1952 thay bằng 14 Bezirke; toàn bộ quyền lực tập trung tuyệt đối tại chính quyền trung ương (Ost-Berlin / SED)', alt: ['Bezirke', 'Ost-Berlin', 'SED'] },
            { term: 'Bürgernähe', points: 3, vi: 'Föderalismus: Ưu = Chống độc tài (vertikale Gewaltenteilung), gần dân & sát thực tế vùng miền (Bürgernähe); Nhược = Quy trình ra quyết định chậm (Reformstau), khác biệt hệ thống trường học giữa 16 bang (Bildungsföderalismus)', alt: ['Gewaltenteilung', 'Bildungssystem', 'langwierige Entscheidungen'] }
          ],
          musterloesungDe:
            'a) Die „4 D“ der Potsdamer Konferenz (Juli/August 1945):\n' +
            '1. Denazifizierung (Entnazifizierung): Auflösung der NSDAP, Entfernung von Nationalsozialisten aus Ämtern und Bestrafung von Kriegsverbrechern.\n' +
            '2. Demilitarisierung: Vollständige Abrüstung der deutschen Streitkräfte und Verbot der Rüstungsindustrie.\n' +
            '3. Demokratisierung: Wiederaufbau des politischen Lebens, freier Parteien, Gewerkschaften und freier Presse auf demokratischer Grundlage.\n' +
            '4. Dezentralisierung (und Demontage): Abbau des zentralistischen Staatsaufbaus zugunsten starker Gemeinden und Länder sowie Entflechtung großer Industriekonzerne.\n\n' +
            'b) Föderalismus (BRD) vs. Zentralismus (DDR):\n' +
            '-Föderalismus (Bundesstaat, Art. 20 Abs. 1 GG): Staatliche Macht ist vertikal zwischen dem Gesamtstaat (Bund) und den 16 Gliedstaaten (Bundesländern) aufgeteilt. Die Länder besitzen eigene Parlamente (Landtage), Regierungen, Polizei- und Kultur-/Bildungshoheit und wirken über den Bundesrat an der Bundesgesetzgebung mit.\n' +
            '-Zentralismus (Einheitsstaat, DDR ab 1952): Abschaffung der Länder zugunsten von 14 verwaltungstechnischen Bezirken; alle politischen Entscheidungen wurden zentral von der Staats- und Parteiführung (SED) in Ost-Berlin vorgegeben.\n' +
            '-Vorteile des Föderalismus: 1. Zusätzliche vertikale Gewaltenteilung (Schutz vor Machtmissbrauch/Diktatur); 2. Große Bürgernähe und Berücksichtigung regionaler Besonderheiten.\n' +
            '-Nachteile des Föderalismus: 1. Langwierige Entscheidungsprozesse und Kompromisse zwischen Bund und Ländern; 2. Uneinheitliche Regelungen (z. B. 16 verschiedene Schulsysteme beim Umzug).',
          musterloesungVi:
            'a) „4 chữ D“ của Hội nghị Potsdam 1945: 1. Denazifizierung (Phi phát xít hóa); 2. Demilitarisierung (Phi quân sự hóa); 3. Demokratisierung (Dân chủ hóa); 4. Dezentralisierung (Phi tập trung hóa).\n' +
            'b) Föderalismus (CHLB Đức): Quyền lực nhà nước được phân chia theo chiều dọc giữa Liên bang (Bund) và 16 bang (Bundesländer có nghị viện, chính phủ riêng, tự chủ về trường học và cảnh sát, tham gia lập pháp qua Thượng viện Bundesrat). Zentralismus (CHDC Đức): Giải thể các bang năm 1952 thành 14 khu hành chính (Bezirke), mọi quyền lực tập trung tuyệt đối về trung ương tại Đông Berlin.\n' +
            'Ưu điểm của Föderalismus: Phân quyền chiều dọc giúp ngăn chặn độc tài, sát thực tế địa phương. Nhược điểm: Quy trình thông qua luật lâu hơn và bất cập khi mỗi bang có một quy định giáo dục khác nhau.',
          explanation: {
            whyCorrect: 'Hoàn thiện mảnh ghép lịch sử và cấu trúc nhà nước trong đề GK-KA 12.10.2026.',
            whyWrong: 'Quên vai trò của Thượng viện (Bundesrat) – cơ quan đại diện cho 16 bang ở cấp Liên bang.',
            keyTakeaway: 'Nhớ „4 D“ năm 1945: Denazifizierung – Demilitarisierung – Demokratisierung – Dezentralisierung!'
          }
        },
        cloneBankQuestion('gk-q5', 4, { title: 'Aufgabe 4: Methodik – Karikaturanalyse (4 Schritte) & Statistikanalyse (Dreischritt)' })
      ]
    },

    /* ========================================================================
       12. KLASSENARBEIT GK 1–3: PARTIZIPATION, GRUNDRECHTE & GEWALTENTEILUNG
       ======================================================================== */
    'gk-ka-demokratie': {
      id: 'gk-ka-demokratie',
      group: 'ka',
      title: 'Klassenarbeit GK 1–3 · Demokratie, Grundrechte & Gewaltenteilung',
      subtitle: 'Partizipation, Volksgesetzgebung (3 Stufen), Grundrechte, Gleichberechtigung & 3 Staatsgewalten (4 Aufgaben · 40 Punkte)',
      durationMinutes: 45,
      badge: 'GK · KA 1–3',
      questions: [
        cloneBankQuestion('gk-q1', 1, { title: 'Aufgabe 1: Politische Partizipation (4 Formen) & Volksgesetzgebung in 3 Stufen' }),
        cloneBankQuestion('gk-q2', 2, { title: 'Aufgabe 2: Menschen- vs. Bürgerrechte, Ewigkeitsklausel & Gleichberechtigung (Art. 3 GG)' }),
        cloneBankQuestion('gk-q3', 3, { title: 'Aufgabe 3: Die 3 Staatsgewalten (Legislative, Exekutive, Judikative) & Medien als 4. Gewalt' }),
        cloneBankQuestion('gk-q5', 4, { title: 'Aufgabe 4: Auswertung politischer Statistiken und Karikaturen' })
      ]
    }
  };

  /* ──────────────────────────────────────────────────────────────────────────
     4. HÀM TIỆN ÍCH TRUY XUẤT & SINH ĐỀ TỰ ĐỘNG CHO ARENA
  ────────────────────────────────────────────────────────────────────────── */
  function getQuestionById(id) {
    if (QUESTION_INDEX[id]) return QUESTION_INDEX[id];
    const examKeys = Object.keys(IHK_EXAMS);
    for (let i = 0; i < examKeys.length; i++) {
      const qs = IHK_EXAMS[examKeys[i]].questions || [];
      for (let j = 0; j < qs.length; j++) {
        if (qs[j] && qs[j].id === id) return qs[j];
      }
    }
    return null;
  }

  function getAllQuestionsFlat() {
    const map = new Map();
    Object.keys(LF_BANK).forEach(lfKey => {
      (LF_BANK[lfKey] || []).forEach(q => {
        if (q && q.id) map.set(q.id, q);
      });
    });
    Object.keys(IHK_EXAMS).forEach(examKey => {
      (IHK_EXAMS[examKey].questions || []).forEach(q => {
        if (q && q.id && !map.has(q.id)) map.set(q.id, q);
      });
    });
    return Array.from(map.values());
  }

  function generateExamFromLfs(options) {
    const opts = options || {};
    const fach = opts.fach || 'all';
    const lfs = Array.isArray(opts.lfs) && opts.lfs.length ? opts.lfs : Object.keys(LF_BANK);
    const category = opts.category || 'all';
    const search = (opts.search || '').trim().toLowerCase();
    const questionCount = Math.max(1, parseInt(opts.questionCount, 10) || 5);
    const timeMinutes = Math.max(5, parseInt(opts.timeMinutes, 10) || 45);
    const specificIds = Array.isArray(opts.questionIds) ? opts.questionIds : null;

    let pool = [];
    if (specificIds && specificIds.length) {
      specificIds.forEach(id => {
        const found = getQuestionById(id);
        if (found) pool.push(found);
      });
    } else {
      lfs.forEach(lfId => {
        if (LF_BANK[lfId]) {
          pool = pool.concat(LF_BANK[lfId]);
        }
      });
      // Lọc theo loại câu hỏi (category) nếu có
      if (category && category !== 'all') {
        const catFiltered = pool.filter(q => q.category === category);
        if (catFiltered.length > 0) pool = catFiltered;
      }
      // Lọc theo từ khóa tìm kiếm nếu có
      if (search) {
        const searchFiltered = pool.filter(q => {
          const hay = ((q.title || '') + ' ' + (q.questionDe || '') + ' ' + (q.questionVi || '')).toLowerCase();
          return hay.includes(search);
        });
        if (searchFiltered.length > 0) pool = searchFiltered;
      }
    }

    if (pool.length === 0) {
      pool = getAllQuestionsFlat();
    }

    // Xáo trộn Fisher-Yates khi không chọn danh sách cố định
    const shuffled = pool.slice();
    if (!specificIds) {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = tmp;
      }
    }

    const picked = shuffled.slice(0, Math.min(questionCount, shuffled.length)).map((q, idx) => {
      return Object.assign({}, q, { no: idx + 1 });
    });

    const fachLabels = {
      all: 'Tổng hợp tất cả các môn',
      bfk1: 'BfK-1 (Küche, Lager, Ernährung & Systemgastro)',
      bfk2: 'BfK-2 (Service, Getränke, Fleisch/Fisch & Bankett)',
      wiko: 'WiKO / WiSo (Wirtschafts- und Sozialkunde)',
      gk: 'Gemeinschaftskunde (Politik & Geschichte)',
      deutsch: 'Deutsch im Beruf (TATTE & Korrespondenz)',
      englisch: 'English for Hospitality'
    };

    return {
      id: opts.customId || ('custom-lf-' + Date.now().toString(36)),
      group: 'custom',
      title: opts.customTitle || ('Đề luyện tập tự luận · ' + (fachLabels[fach] || fach.toUpperCase())),
      subtitle: picked.length + ' câu hỏi chuyên sâu · Tổng ' + picked.reduce((s, q) => s + (q.points || 10), 0) + ' điểm',
      durationMinutes: timeMinutes,
      badge: 'Luyện theo LF',
      questions: picked
    };
  }

  global.ARENA_DATA = {
    LF_CATALOG: LF_CATALOG,
    LF_BANK: LF_BANK,
    IHK_EXAMS: IHK_EXAMS,
    getExam: function (examId) {
      return IHK_EXAMS[examId] || IHK_EXAMS['ihk-sommer-2025'];
    },
    listIhkExams: function () {
      return Object.keys(IHK_EXAMS).map(k => IHK_EXAMS[k]);
    },
    getQuestionById: getQuestionById,
    getAllQuestionsFlat: getAllQuestionsFlat,
    generateExamFromLfs: generateExamFromLfs
  };
})(typeof window !== 'undefined' ? window : globalThis);
