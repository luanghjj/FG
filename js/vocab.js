/* DE→VI: markierte .term antippen für Bedeutung. Kein Auto-Wrap in Listen/UI. */
(function (w) {
  "use strict";

  const B1_VOCAB = {
    "… speaking":"… đây ạ / speaking",
    "a few":"một vài (đếm được, tích cực)",
    "a little":"một ít (không đếm được)",
    "Abgeordnete":"đại biểu quốc hội",
    "Ablauf":"quy trình",
    "ablehnen":"từ chối / bác bỏ",
    "Abstimmung":"cuộc bỏ phiếu",
    "Abstimmungen":"các cuộc bỏ phiếu",
    "Abstimmungsbuch":"sổ / tài liệu bỏ phiếu",
    "Agenda":"chương trình nghị sự",
    "aktiv mitmachen":"tích cực tham gia",
    "Allergene":"chất gây dị ứng",
    "Allergy":"dị ứng",
    "Alternativvorschlag":"đề xuất thay thế",
    "Amaranth":"amaranth",
    "Ambiente":"không gian",
    "Angebot":"chào hàng",
    "Annahme":"chấp nhận",
    "Anonymität":"tính ẩn danh",
    "Anrichtung":"cách bày món",
    "Anteile":"tỷ lệ",
    "Antrag":"đơn / đề nghị",
    "apologize":"xin lỗi / xin lỗi chân thành",
    "Aquafaba":"aquafaba",
    "Art. 1 Abs. 3 GG":"Điều 1 khoản 3 Luật cơ bản",
    "Art. 1 GG":"Điều 1 Luật cơ bản",
    "Art. 2 GG":"Điều 2 Luật cơ bản",
    "Art. 20 Abs. 2 GG":"Điều 20 khoản 2 Luật cơ bản",
    "Art. 5 GG":"Điều 5 Luật cơ bản",
    "Art. 67 GG":"Điều 67 Luật cơ bản",
    "Art. 68 GG":"Điều 68 Luật cơ bản",
    "at the moment":"ngay lúc này",
    "Atmosphäre":"không khí / bầu không khí",
    "Auflösung":"sự giải tán",
    "Auflösung des Bundestages":"giải tán Bundestag",
    "Aufschrift":"dòng chữ trên hình",
    "Ausgabe-Check":"kiểm trước khi mang ra",
    "Auslieferung":"dẫn độ",
    "Ausmahlungsgrad":"tỷ lệ xay xát",
    "Aussage":"thông điệp / luận điểm",
    "Außerhaus":"mang về",
    "Auswertung":"phân tích / đánh giá",
    "Backen":"nướng lò",
    "Balkendiagramm":"biểu đồ thanh",
    "Ballaststoffe":"chất xơ",
    "Barzahlung":"tiền mặt",
    "Bauch":"bụng",
    "Bedienungsgeld":"phụ phí phục vụ",
    "Beerenobst":"quả mọng",
    "Beherbergung":"lưu trú",
    "Behörde":"cơ quan hành chính",
    "Belegausgabepflicht":"nghĩa vụ xuất biên lai",
    "Belege":"bằng chứng / dẫn chứng",
    "Berufsfreiheit":"tự do nghề nghiệp",
    "Beschreibung":"mô tả",
    "Besondere Empfehlungen":"món đề xuất / theo mùa",
    "Bestellung":"đặt món",
    "Beteiligung":"sự tham gia",
    "Betrug":"lừa đảo",
    "Bewertungskriterien":"tiêu chí đánh giá",
    "Bewirtungsvertrag":"hợp đồng phục vụ",
    "bezahlen":"thanh toán",
    "Bildidee":"ý tưởng hình ảnh",
    "Bindegewebe":"mô liên kết",
    "Bindestriche":"dấu gạch nối",
    "Biologische Wertigkeit":"giá trị sinh học",
    "Blog":"blog",
    "Bodenhaltung":"nuôi sàn",
    "Bohnen":"đậu",
    "bpb":"Cục Giáo dục Chính trị Liên bang (Đức)",
    "Bratapfel":"táo nướng",
    "Brennwert":"nhiệt lượng",
    "Brief-, Post- und Fernmeldegeheimnis":"bí mật thư tín, bưu chính và viễn thông",
    "Briefing":"họp giao ban",
    "Brust":"ức",
    "Brutto":"giá gộp",
    "Buchweizen":"kiều mạch",
    "Bug":"vai",
    "Bund":"liên bang",
    "Bundesebene":"cấp liên bang",
    "Bundeskanzler":"Thủ tướng Liên bang",
    "Bundespräsident":"Tổng thống Liên bang",
    "Bundesrat":"Hội đồng Liên bang",
    "Bundesregierung":"Chính phủ Liên bang",
    "Bundestag":"Quốc hội Liên bang Đức",
    "Bundestagswahl":"bầu cử Bundestag",
    "Bundesverfassungsgericht":"Tòa án Hiến pháp Liên bang",
    "Bürgerentscheid":"trưng cầu dân ý cấp địa phương",
    "Bürgerforum":"diễn đàn công dân",
    "Bürgerinitiative":"sáng kiến công dân",
    "Bürgerinnen und Bürger":"công dân (nam và nữ)",
    "Bürgerrechte":"quyền công dân",
    "call back":"gọi lại",
    "Carotinoide":"carotenoid",
    "Complaint call":"cuộc gọi khiếu nại",
    "Convenience":"tiện lợi",
    "Couscous":"couscous",
    "currently":"hiện đang",
    "Debatten":"các cuộc tranh luận",
    "Debitkarte":"thẻ ghi nợ",
    "Demokratie":"dân chủ",
    "demokratische Kontrolle":"sự kiểm soát dân chủ",
    "Demonstration":"biểu tình",
    "Desinteresse":"sự thờ ơ",
    "Dessert":"tráng miệng",
    "Desserts":"tráng miệng",
    "Deutung":"cách diễn giải / giải nghĩa",
    "Diagramm":"biểu đồ",
    "Dinkel":"spelt",
    "direkte Abstimmung":"bỏ phiếu trực tiếp",
    "Direkte Demokratie":"dân chủ trực tiếp",
    "Dunst":"dunst",
    "Durchfall":"tiêu chảy",
    "E-Mail":"email",
    "Eiercode":"mã trứng",
    "Eimer":"xô / thùng",
    "einfaches Misstrauensvotum":"bỏ phiếu bất tín nhiệm đơn thuần",
    "Einleitung":"mở bài",
    "Einweichen":"ngâm nước",
    "Einweichwasser":"nước ngâm",
    "Empfänger":"người nhận",
    "Entlassung":"miễn nhiệm / sa thải",
    "Entscheidungsprozess":"quá trình ra quyết định",
    "Entwicklung":"xu hướng",
    "Erbsen":"đậu Hà Lan",
    "ersuchen":"yêu cầu / thỉnh cầu",
    "Exekutive":"hành pháp",
    "Fazit":"kết luận",
    "Feedbackbogen":"phiếu góp ý",
    "Fettgewebe":"mô mỡ",
    "Figuren":"nhân vật / hình tượng",
    "Filet":"thăn nội",
    "fix":"xử lý / sửa",
    "Flashmob":"flashmob (tụ tập nhanh)",
    "Flexitarier":"ăn chay linh hoạt",
    "Folsäure":"axit folic",
    "Franchise":"nhượng quyền",
    "Franchisegeber":"bên nhượng quyền",
    "Franchisenehmer":"bên nhận quyền",
    "freie Entfaltung der Persönlichkeit":"tự do phát triển nhân cách",
    "Freilandhaltung":"nuôi thả",
    "Freizügigkeit":"tự do đi lại / cư trú",
    "Freundlichkeit":"sự thân thiện",
    "Frist":"thời hạn",
    "Frittieren":"chiên ngập dầu",
    "Fullservice":"full service",
    "Garart":"cách chế biến",
    "Garnitur":"garnitur / …-Art",
    "Garstufe":"độ chín (thịt)",
    "Garverfahren":"phương pháp chín",
    "Gaspedal":"bàn đạp ga",
    "Gästebedarfe":"nhu cầu của khách",
    "Gästekommentare":"nhận xét khách",
    "gebraten":"chiên/rán",
    "gedünstet":"hấp/om nhẹ",
    "gegenseitige Kontrolle":"kiểm soát lẫn nhau",
    "gegrillt":"nướng vỉ",
    "Gelatine":"gelatin",
    "Gemeinschaftsverpflegung":"suất ăn tập thể",
    "gemischter Vertrag":"hợp đồng hỗn hợp",
    "Gemüsebeilage":"rau kèm",
    "Gemütlichkeit":"sự ấm cúng",
    "Gerste":"lúa mạch",
    "Geschäftsleitung":"ban giám đốc",
    "Geschmack":"hương vị",
    "geschmort":"om/hầm",
    "Gesetze":"luật",
    "Gesetzesentwurf":"dự thảo luật",
    "Gesetzgebung":"lập pháp",
    "Getränke":"đồ uống",
    "Getreide":"ngũ cốc",
    "Gewaltenteilung":"phân quyền",
    "Gewaltenverschränkung":"đan xen quyền lực",
    "Giftstoffe":"chất độc",
    "Glaubens- und Gewissensfreiheit":"tự do tín ngưỡng và lương tâm",
    "Gleichheit vor dem Gesetz":"bình đẳng trước pháp luật",
    "Gluten":"gluten",
    "Glutenfrei":"không gluten",
    "going to-future":"tương lai gần (be going to)",
    "Grieß":"gries",
    "Grillen":"nướng",
    "Grundgesetz":"luật cơ bản",
    "Grundrechte":"quyền cơ bản",
    "Grundumsatz":"chuyển hóa cơ bản",
    "Grünkern":"grünkern",
    "HACCP":"HACCP (ATTP)",
    "Halal":"halal",
    "Hals":"cổ",
    "Haltungsform":"hình thức nuôi",
    "Hämagglutinine":"hemagglutinin",
    "Häufigkeit":"tần suất",
    "Hauptgänge":"món chính",
    "Hauptgericht":"món chính",
    "Hauptkomponente":"thành phần chính",
    "Hauptrohstoff":"nguyên liệu chính",
    "Haushalte":"các hộ gia đình",
    "Hesse":"bắp chân",
    "Hierarchie":"cấp bậc",
    "hold on":"giữ máy / chờ một chút",
    "horizontal":"theo chiều ngang",
    "Hotel garni":"hotel garni",
    "Hotel Wind":"nhà hàng/khách sạn trong bài học",
    "Hülsenfrüchte":"họ đậu",
    "Hygiene":"vệ sinh",
    "I'm afraid":"tôi e rằng…",
    "I'm terribly sorry about that":"tôi thực sự rất xin lỗi",
    "immediately":"ngay lập tức",
    "inconvenience":"sự bất tiện",
    "Information call":"cuộc gọi hỏi thông tin",
    "Informationsflut":"lũ thông tin",
    "Informieren":"thông tin / cung cấp tin",
    "Initiative":"sáng kiến",
    "Institutionen":"các thể chế / cơ quan",
    "Interaktivität":"tính tương tác",
    "Interessen":"lợi ích / quan tâm",
    "Internetbewertungen":"đánh giá online",
    "Internetforum":"diễn đàn internet",
    "Interpretation":"phân tích / diễn giải",
    "Judikative":"tư pháp",
    "Kalb":"bê",
    "Kalte Vorspeise":"khai vị nguội",
    "Karamellisieren":"caramel hóa",
    "Karikatur":"tranh biếm họa",
    "Karikaturist":"họa sĩ biếm họa",
    "Kategorisieren":"phân loại",
    "Kaufvertrag":"HĐ mua bán",
    "Keimling":"mầm",
    "Kernobst":"quả có hạt",
    "Keto":"keto",
    "Kichererbsen":"đậu gà",
    "Kochen":"nấu/luộc",
    "Kohlenhydrate":"tinh bột",
    "Kollagen":"collagen",
    "kommunal":"cấp địa phương",
    "Kommune":"cấp địa phương / xã-thị",
    "Kommunen":"các đơn vị địa phương",
    "Kommunikation":"giao tiếp",
    "Kompetenz":"năng lực",
    "Kompott":"quả om",
    "Konsistenz":"kết cấu",
    "konstruktives Misstrauensvotum":"bỏ phiếu bất tín nhiệm xây dựng",
    "Kontraste":"sự tương phản",
    "Kontrolle":"kiểm tra",
    "Kontrollieren":"kiểm soát",
    "Koscher":"kosher",
    "Kreditkarte":"thẻ tín dụng",
    "Kreisdiagramm":"biểu đồ tròn",
    "Kreuzkontamination":"lây nhiễm chéo",
    "Kritik":"phê bình",
    "Kritikpunkte":"điểm phê bình",
    "Kundgebung":"buổi mít tinh / biểu dương",
    "Kurhotel":"KS dưỡng",
    "Kurvendiagramm":"biểu đồ đường",
    "Kurzbraten":"áp chảo nhanh",
    "Laktosefrei":"không lactose",
    "Lamm":"cừu non",
    "Land":"bang",
    "Länder":"các bang",
    "landesweit":"toàn bang",
    "leave a message":"để lại lời nhắn",
    "Lebensmittel":"thực phẩm",
    "Legislative":"lập pháp",
    "Leguminosen":"leguminosen",
    "Leserbrief":"thư bạn đọc",
    "Lieferverzug":"chậm giao/phục vụ",
    "Linsen":"đậu lăng",
    "Low-Carb":"ít carb",
    "Macht":"quyền lực",
    "Macht auf Zeit":"quyền lực có thời hạn",
    "Machtkonzentration":"tập trung quyền lực",
    "Mahnwache":"canh thức / tuần hành im lặng",
    "Mangel":"lỗi hàng",
    "many":"nhiều (đếm được)",
    "Maßnahme":"biện pháp",
    "Maßnahmen":"các biện pháp",
    "Mazerieren":"ngâm/ướp",
    "Medien":"truyền thông",
    "Mehl":"bột mì",
    "Mehlkörper":"lõi bột",
    "Mehrheit der Mitglieder":"đa số thành viên (tuyệt đối)",
    "Mehrheitsalternative":"phương án đa số thay thế",
    "Mehrheitsprinzip":"nguyên tắc đa số",
    "Meinung":"ý kiến",
    "Meinungsbildung":"hình thành dư luận / ý kiến",
    "Meinungsfreiheit":"tự do ngôn luận",
    "Menschenbild":"quan niệm về con người",
    "Menschenrechte":"nhân quyền",
    "Menschenwürde":"nhân phẩm",
    "Menü":"set menu",
    "Minderheitsrechte":"quyền của thiểu số",
    "Mindmap":"sơ đồ tư duy",
    "Mineralstoffe":"khoáng chất",
    "Missstände":"tình trạng sai trái",
    "Mitwirkung":"sự tham gia / đồng hành",
    "Mobile Payment":"thanh toán di động",
    "Motel":"motel",
    "much":"nhiều (không đếm được)",
    "Muskelgewebe":"mô cơ",
    "MwSt":"VAT",
    "Nacherfüllung":"thực hiện lại",
    "Nachspeise":"tráng miệng",
    "nachteilig":"bất lợi",
    "Nacken":"gáy",
    "Nährwert":"giá trị dinh dưỡng",
    "Nationalsozialismus":"chủ nghĩa Quốc xã",
    "Netto":"giá ròng",
    "Nichtwähler":"người không đi bầu",
    "Notbremse":"phanh khẩn cấp",
    "Notverordnung":"sắc lệnh khẩn cấp",
    "Obst":"trái cây",
    "Öffentlichkeit":"công chúng / không gian công",
    "Online-Petition":"kiến nghị trực tuyến",
    "Opposition":"phe đối lập",
    "Ordnung und Sauberkeit":"trật tự và sạch sẽ",
    "Organe":"cơ quan / cơ cấu",
    "Organigramm":"sơ đồ tổ chức",
    "Parlament":"quốc hội / nghị viện",
    "Partei":"đảng",
    "parteiunabhängig":"độc lập với đảng",
    "Partizipation":"sự tham gia / tham chính",
    "Pektin":"pectin",
    "Personal im Service":"nhân viên phục vụ",
    "Persönliche Freiheitsrechte":"các quyền tự do cá nhân",
    "Pescetarier":"ăn cá, không thịt",
    "Pescetarisch":"ăn cá, không thịt",
    "pflanzliches Eiweiß":"đạm thực vật",
    "Phasin":"phasin",
    "plebiszitäre Demokratie":"dân chủ trưng cầu / dân chủ trực tiếp",
    "Pochieren":"om nhẹ",
    "Podcast":"podcast",
    "politische Beteiligung":"sự tham gia chính trị",
    "Polyphenole":"polyphenol",
    "Populismus":"chủ nghĩa dân túy",
    "Preis-Leistung":"tỷ lệ giá–chất lượng",
    "Preiselbeer-Sahne-Meerrettich":"nước sốt nam việt quất-kem-cải ngựa",
    "Preisempfinden":"cảm nhận về giá",
    "Preisminderung":"giảm giá",
    "Present progressive":"thì hiện tại tiếp diễn",
    "Pressefreiheit":"tự do báo chí",
    "Problem call":"cuộc gọi về sự cố",
    "Pseudo-Getreide":"ngũ cốc giả",
    "Pürieren":"xay nhuyễn",
    "put you through":"chuyển máy / chuyển cuộc gọi",
    "Qualität der Speisen":"chất lượng món ăn",
    "Quickservice":"phục vụ nhanh",
    "Quinoa":"quinoa",
    "Randschichten":"lớp vỏ",
    "Rechnung":"hóa đơn",
    "Rechte anderer":"quyền của người khác",
    "Rechtsprechung":"tư pháp / xét xử",
    "Referendum":"trưng cầu / trưng cầu dân ý",
    "Regierende":"người cai trị",
    "Regierte":"người bị cai trị / công dân",
    "Regierung":"chính phủ",
    "Reichsgericht":"Tòa án Đế chế",
    "Reichspräsident":"Tổng thống Đế chế (Weimar)",
    "Reinigungsplan":"kế hoạch vệ sinh",
    "repräsentativ":"mang tính đại diện / nghi lễ",
    "repräsentative Demokratie":"dân chủ đại diện",
    "Repräsentative Demokratie":"dân chủ đại diện",
    "Reservierung":"đặt bàn",
    "Restaurantleitung":"ban quản lý nhà hàng",
    "Richter":"thẩm phán",
    "Rind":"bò",
    "Roastbeef":"roastbeef",
    "Roggen":"lúa mạch đen",
    "Röstaromen":"hương rang",
    "Rücken":"lưng",
    "Sachfragen":"vấn đề nội dung / vấn đề cụ thể",
    "Sachtext":"văn bản thông tin",
    "Saison":"mùa vụ",
    "Saisonale Produkte":"sản phẩm theo mùa",
    "Salat":"salad",
    "Sammeln":"thu thập",
    "Sättigungsbeilage":"món no",
    "Sauberkeit":"sạch sẽ",
    "Säulendiagramm":"biểu đồ cột",
    "Sautieren":"xào nhanh",
    "Schaf":"cừu",
    "Schalenobst":"quả hạch",
    "Schlechtleistung":"thực hiện kém",
    "Schmoren":"om/hầm",
    "Schrot":"bột thô",
    "Schulung":"đào tạo",
    "Schwein":"heo",
    "Schweiz":"Thụy Sĩ",
    "Sekundäre Pflanzenstoffe":"SPS",
    "Sender":"người gửi",
    "Service":"phục vụ",
    "Simple present":"thì hiện tại đơn",
    "Skandale":"bê bối",
    "Soße":"nước sốt",
    "soziale Medien":"mạng xã hội",
    "Speisekarte":"thực đơn",
    "Speisenqualität":"chất lượng món",
    "Staatsangehörigkeit":"quốc tịch",
    "Staatsgewalt":"quyền lực nhà nước",
    "Staatsoberhaupt":"nguyên thủ quốc gia",
    "Stadthotel":"KS nội đô",
    "Stärke":"tinh bột",
    "Steinobst":"quả có hột cứng",
    "Strukturbild":"sơ đồ cấu trúc",
    "Südfrüchte":"trái cây nhiệt đới",
    "Suppe":"súp",
    "Systemgastronomie":"nhà hàng hệ thống",
    "Tabelle":"bảng",
    "Teamschulung":"đào tạo nhóm",
    "Teilhabe":"sự tham dự / tham gia",
    "Temperatur":"nhiệt độ",
    "Teufelskreis":"vòng xoáy",
    "Todesstrafe":"án tử hình",
    "Trinkgeld":"tiền boa",
    "Überweisung":"chuyển khoản",
    "Umsatz":"doanh thu",
    "Umsatzrückgang":"sụt giảm doanh thu",
    "Umsatzsteuer":"thuế GTGT",
    "Umsatzzahlen":"doanh số",
    "unabhängig":"độc lập / không phụ thuộc",
    "unantastbar":"bất khả xâm phạm",
    "understand":"hiểu",
    "universell":"phổ quát",
    "unqualifizierte Beiträge":"bài viết kém chất lượng",
    "unverfälscht":"không bị bóp méo",
    "Unverletzlichkeit der Wohnung":"bất khả xâm phạm chỗ ở",
    "Vegan":"thuần chay",
    "vegane Optionen":"món thuần chay",
    "Vegetarisch":"ăn chay",
    "vegetarische Alternativen":"món chay thay thế",
    "Verbände":"hiệp hội / liên đoàn",
    "Verbesserungsvorschläge":"đề xuất cải thiện",
    "Verein":"hội / hiệp hội",
    "Vereinigungsfreiheit":"tự do lập hội",
    "Verfassungsgericht":"tòa án hiến pháp",
    "Verfassungsmäßigkeit":"tính hợp hiến",
    "Verhalten":"hành vi",
    "Versammlungsfreiheit":"tự do hội họp / tụ tập",
    "vertikal":"theo chiều dọc",
    "Vertrauen":"sự tín nhiệm",
    "Vertrauensfrage":"câu hỏi tín nhiệm",
    "Vertreter":"đại diện",
    "Vielfalt":"sự đa dạng",
    "vierte Gewalt":"quyền lực thứ tư",
    "Visualisierung":"trực quan hóa",
    "Volk":"nhân dân",
    "Volksbegehren":"thỉnh nguyện / yêu cầu trưng cầu",
    "Volksentscheid":"trưng cầu / quyết định của dân",
    "Volksherrschaft":"chính thể dân chủ / quyền lực thuộc về nhân dân",
    "Volksinitiative":"sáng kiến dân sự",
    "Volkssouveränität":"chủ quyền nhân dân",
    "Vollkorn":"nguyên cám",
    "vollziehende Gewalt":"quyền lực hành pháp",
    "Vorsatz":"cố ý",
    "Vorschlag":"đề xuất",
    "Vorspeise":"khai vị",
    "Vorspeisen":"khai vị",
    "Wahlalter":"tuổi bầu cử",
    "Wahlen":"bầu cử",
    "Warmes Zwischengericht":"món nóng xen giữa",
    "Weimarer Reichsverfassung":"Hiến pháp Weimar",
    "Weizen":"lúa mì",
    "weltweiter Zugang":"tiếp cận toàn cầu",
    "Willensbildungsprozess":"quá trình hình thành ý chí chính trị",
    "Wort":"nghĩa",
    "Zahlungsverzug":"chậm thanh toán",
    "Zechprellerei":"ăn quỵt",
    "Zeitung":"báo",
    "Zöliakie":"bệnh Celiac",
    "Zubereitungsart":"cách chế biến",
    "Zufriedenheit":"sự hài lòng",
    "Zulassung":"sự cho phép / chấp thuận",
    "Zusammenschluss":"sự liên kết / liên minh",
    "Politische Einflussnahme":"sự tác động / ảnh hưởng chính trị",
    "direkte Demokratie":"dân chủ trực tiếp",
    "digitaler Informationsverbreitung":"phổ biến thông tin số",
    "digitaler Partizipation":"tham gia chính trị qua mạng",
    "Datenschutz":"bảo vệ dữ liệu",
    "Mobilisierung":"huy động / kêu gọi tham gia",
    "GG":"Luật cơ bản / Grundgesetz",
    "Gleichheit":"bình đẳng",
    "Rechtsgüter":"tài sản pháp lý / lợi ích pháp lý",
    "Strafverfolgung":"truy tố hình sự",
    "Rechtsstaat":"nhà nước pháp quyền",
    "verhältnismäßig":"tương xứng / hợp lý",
    "richterlicher Kontrolle":"kiểm soát tư pháp",
    "gleichberechtigt":"bình đẳng về quyền",
    "Gleichberechtigung":"bình đẳng giới / bình quyền",
    "Führungspositionen":"vị trí lãnh đạo",
    "Rollenbilder":"khuôn mẫu vai trò giới",
    "Gender-Pay-Gap":"khoảng cách lương theo giới",
    "Care-Arbeit":"công việc chăm sóc (con/nhà)",
    "Teilzeit":"bán thời gian",
    "Gleichstellung":"bình đẳng thực tế / bình đẳng hóa",
    "Kitaplätze":"chỗ giữ trẻ / chỗ mẫu giáo",
    "Entgelttransparenz":"minh bạch tiền lương",
    "WRV":"Hiến pháp Weimar",
    "konstruktive Misstrauensvotum":"bất tín nhiệm mang tính xây dựng",
    "konstruktives Misstrauensvotum":"bất tín nhiệm mang tính xây dựng",
    "Petition":"kiến nghị",
    "Brief-, Post- und Fernmeldegeheimnis":"bí mật thư tín, bưu chính và viễn thông",
    "Unverletzlichkeit der Wohnung":"bất khả xâm phạm chỗ ở"
  }

  function lookupVi(de){
    if(!de) return "";
    const s=String(de).trim();
    if(B1_VOCAB[s]) return B1_VOCAB[s];
    const k=Object.keys(B1_VOCAB).find(x=>x.toLowerCase()===s.toLowerCase());
    return k?B1_VOCAB[k]:"";
  }

  function ensureStyles(){
    if(document.getElementById("vocab-style")) return;
    const s=document.createElement("style");
    s.id="vocab-style";
    s.textContent = `
/* only content terms */
#bfk1ThemeBody .term, #fachThemeBody .term, #v-kueche .term, #v-fleisch .term,
#v-abschluss .term, #quizArea .term, #bfk1QuizArea .term, #fachQuizArea .term,
[data-vocab-content] .term {
  display:inline !important;
  border-bottom:1.5px dotted #dc2626;
  color:inherit;
  cursor:pointer;
  font-weight:600;
  padding:0 1px;
  border-radius:3px;
  white-space:inherit;
}
#bfk1ThemeBody .term::after, #fachThemeBody .term::after, #v-kueche .term::after,
#v-fleisch .term::after, #v-abschluss .term::after, #quizArea .term::after,
#bfk1QuizArea .term::after, #fachQuizArea .term::after, [data-vocab-content] .term::after {
  content:"VI"; font-size:.55em; font-weight:800; margin-left:2px; vertical-align:super; color:#f87171;
}
#bfk1ThemeBody .term.open, #fachThemeBody .term.open, #v-kueche .term.open, #v-fleisch .term.open,
#v-abschluss .term.open, #quizArea .term.open, #bfk1QuizArea .term.open, #fachQuizArea .term.open,
[data-vocab-content] .term.open {
  background:#fef2f2;
  box-shadow:0 0 0 2px rgba(220,38,38,.18);
}
.term-vi{display:inline;margin-left:4px;padding:1px 7px;border-radius:999px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:.78em;font-weight:650}
.term-vi.hidden{display:none!important}
/* never style navigation lists */
.theme-item .term, .theme-list .term, .subject-card .term, .tile .term, .learn-item .term,
.ka-card .term, .fach-item .term, .bottom-nav .term, .nav .term, .crumbs .term, .section-head .term {
  all:unset !important;
}
.theme-item .term::after, .theme-list .term::after, .subject-card .term::after, .tile .term::after,
.section-head .term::after { content:none !important; }
.theme-item .term-vi, .theme-list .term-vi, .section-head .term-vi { display:none !important; }
#termPop{position:fixed;z-index:10000;max-width:min(300px,90vw);background:#0f172a;color:#fff;border-radius:14px;padding:12px 14px;font-size:.9em;line-height:1.45;box-shadow:0 14px 36px rgba(15,23,42,.35);display:none}
#termPop.show{display:block}
#termPop .de{font-weight:700;margin-bottom:4px}
#termPop .vi{font-weight:700;color:#86efac;font-size:1.05em}
#termPop .hint{margin-top:6px;font-size:.72em;opacity:.7}
`;
    document.head.appendChild(s);
  }

  function ensurePop(){
    let pop=document.getElementById("termPop");
    if(pop) return pop;
    pop=document.createElement("div");
    pop.id="termPop";
    pop.innerHTML='<div class="de"></div><div class="vi"></div><div class="hint">Begriff mit VI antippen = Bedeutung</div>';
    document.body.appendChild(pop);
    return pop;
  }

  function hidePop(){
    const pop=document.getElementById("termPop");
    if(pop) pop.classList.remove("show");
    document.querySelectorAll(".term.open").forEach(t=>t.classList.remove("open"));
    document.querySelectorAll(".term-vi").forEach(c=>c.classList.add("hidden"));
  }

  function showForTerm(el){
    if(!el) return;
    ensureStyles(); ensurePop();
    // ignore terms inside lists/nav
    if(el.closest && el.closest(".theme-item, .theme-list, .subject-card, .tile, .learn-item, .ka-card, .fach-item, .bottom-nav, .nav, .crumbs, .section-head")){
      return;
    }
    const de = el.getAttribute("data-de") || el.textContent.trim();
    let vi = el.getAttribute("data-vi") || lookupVi(de);
    if(vi) el.setAttribute("data-vi", vi);
    const pop=ensurePop();
    pop.querySelector(".de").textContent = "🇩🇪 " + de;
    pop.querySelector(".vi").textContent = vi ? ("🇻🇳 " + vi) : "Noch nicht im Wörterbuch";
    pop.classList.add("show");
    el.classList.add("open");
    // inline chip
    let chip=el.nextElementSibling;
    if(!chip || !chip.classList || !chip.classList.contains("term-vi")){
      chip=document.createElement("span");
      chip.className="term-vi hidden";
      el.insertAdjacentElement("afterend", chip);
    }
    if(vi){
      chip.textContent="🇻🇳 "+vi;
      chip.classList.remove("hidden");
    }
    const r=el.getBoundingClientRect();
    const pw=Math.min(300, window.innerWidth*0.9);
    let left=r.left + r.width/2 - pw/2;
    left=Math.max(8, Math.min(left, window.innerWidth-pw-8));
    pop.style.width=pw+"px";
    pop.style.left=left+"px";
    const ph=pop.offsetHeight||70;
    let top=r.top - ph - 10;
    if(top<8) top=r.bottom+10;
    pop.style.top=top+"px";
  }

  // Primary: click marked .term only (from bfk1-data content)
  document.addEventListener("click", function(e){
    const term = e.target && e.target.closest && e.target.closest(".term");
    if(term){
      e.preventDefault();
      e.stopPropagation();
      // toggle if same open
      if(term.classList.contains("open")){ hidePop(); return; }
      hidePop();
      showForTerm(term);
      return;
    }
    if(e.target && e.target.closest && e.target.closest("#termPop")) return;
    hidePop();
  }, true);

  document.addEventListener("scroll", hidePop, true);

  // Compatibility no-ops / light binders for existing calls
  function bindTerms(root){
    ensureStyles(); ensurePop();
    const scope = root || document;
    // fill missing data-vi on existing spans only
    scope.querySelectorAll && scope.querySelectorAll(".term").forEach(el=>{
      if(!el.getAttribute("data-vi")){
        const vi=lookupVi(el.getAttribute("data-de")||el.textContent.trim());
        if(vi) el.setAttribute("data-vi", vi);
      }
    });
  }
  // Content containers where auto-wrapping is allowed (matches the CSS scope above,
  // so every wrapped .term is styled and behaves consistently — never in nav/lists).
  var CONTENT_SEL = "#bfk1ThemeBody,#fachThemeBody,#v-kueche,#v-fleisch,#v-abschluss,#quizArea,#bfk1QuizArea,#fachQuizArea,[data-vocab-content]";
  var SKIP_TAGS = { SCRIPT:1, STYLE:1, TEXTAREA:1, INPUT:1, SELECT:1, OPTION:1, BUTTON:1, A:1, CODE:1, PRE:1 };
  var SKIP_CLOSEST = ".term,.theme-item,.theme-list,.subject-card,.tile,.learn-item,.ka-card,.fach-item,.bottom-nav,.nav,.crumbs,.section-head,button,a,input,textarea,select,code,pre,[data-no-vocab]";

  var MATCH_RE = null;
  function buildMatcher(){
    if(MATCH_RE) return MATCH_RE;
    try{
      var keys = Object.keys(B1_VOCAB)
        .filter(function(k){ return k && k.length >= 2; })
        .sort(function(a,b){ return b.length - a.length; }) // longest first → multi-word & specific terms win
        .map(function(k){ return k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
      if(!keys.length) return null;
      // leading boundary captured (older-Safari safe, no lookbehind); trailing boundary via lookahead
      MATCH_RE = new RegExp("(^|[^\\p{L}\\p{N}])(" + keys.join("|") + ")(?![\\p{L}\\p{N}])", "gu");
    }catch(e){ MATCH_RE = null; }
    return MATCH_RE;
  }

  // Auto-wrap every dictionary term inside content containers so ALL A2 vocab is
  // tappable on every Thema — not only manually marked <span class="term">.
  function wrapTextNodes(root){
    var scope = root || document;
    ensureStyles();
    var re = buildMatcher();
    if(!re) return 0;
    // Restrict to content containers (styled + safe). Collect the roots to scan.
    var roots = [];
    if(scope.matches && scope.matches(CONTENT_SEL)) roots.push(scope);
    if(scope.querySelectorAll) scope.querySelectorAll(CONTENT_SEL).forEach(function(el){ roots.push(el); });
    if(!roots.length) return 0;
    // A single sweep can leave some terms unwrapped (adjacent matches, boundary
    // chars shared between neighbours). Repeat until a pass wraps nothing new, so
    // ONE enableVocabOn() call (e.g. on SPA navigation) reaches full coverage.
    // Already-wrapped .term nodes are skipped (SKIP_CLOSEST), so this converges
    // and never double-wraps. Capped to avoid any pathological loop.
    function onePass(){
      var wrapped = 0;
      // Fresh regex per pass: the shared MATCH_RE carries stateful lastIndex (g-flag).
      // Re-entrant calls (e.g. MutationObserver firing while we mutate the DOM) would
      // corrupt lastIndex mid-exec and skip matches. A local clone is immune.
      var pre = new RegExp(re.source, re.flags);
      roots.forEach(function(container){
        var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
          acceptNode: function(node){
            if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            var p = node.parentElement;
            if(!p || SKIP_TAGS[p.tagName]) return NodeFilter.FILTER_REJECT;
            if(p.closest && p.closest(SKIP_CLOSEST)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        var targets = [], n;
        while((n = walker.nextNode())) targets.push(n);
        targets.forEach(function(node){
          var text = node.nodeValue;
          pre.lastIndex = 0;
          if(!pre.test(text)) return;
          pre.lastIndex = 0;
          var frag = document.createDocumentFragment(), last = 0, m;
          while((m = pre.exec(text))){
            var lead = m[1] || "", word = m[2];
            var start = m.index + lead.length;
            if(start > last) frag.appendChild(document.createTextNode(text.slice(last, start)));
            var span = document.createElement("span");
            span.className = "term";
            span.setAttribute("data-de", word);
            var vi = lookupVi(word); if(vi) span.setAttribute("data-vi", vi);
            span.textContent = word;
            frag.appendChild(span);
            last = start + word.length;
            wrapped++;
            if(pre.lastIndex <= m.index) pre.lastIndex = m.index + 1; // guard against zero-length loops
          }
          if(last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
          if(frag.childNodes.length && node.parentNode) node.parentNode.replaceChild(frag, node);
        });
      });
      return wrapped;
    }
    var total = 0, passes = 0, w;
    do { w = onePass(); total += w; passes++; } while(w > 0 && passes < 6);
    return total;
  }

  function enableVocabOn(root){
    bindTerms(root);              // fill data-vi on existing manual .term
    try{ wrapTextNodes(root); }catch(e){}  // auto-wrap all remaining dictionary terms (fixpoint loop → full coverage in one call)
  }
  function enrichTermsInHtml(html){ return html; } // never auto-mutate raw strings (lists/nav safety)

  w.Vocab = { B1_VOCAB, lookupVi, bindTerms, enableVocabOn, enrichTermsInHtml, wrapTextNodes, hidePop };
  w.B1_VOCAB = B1_VOCAB;
  w.lookupVi = lookupVi;
  w.bindTerms = bindTerms;
  w.enableVocabOn = enableVocabOn;
  w.enrichTermsInHtml = enrichTermsInHtml;
  w.wrapTextNodes = wrapTextNodes;
  w.hideTermPop = hidePop;
  w.showTermPop = showForTerm;
  w.toggleTermVi = showForTerm;

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", function(){ ensureStyles(); ensurePop(); });
  } else { ensureStyles(); ensurePop(); }
})(window);
