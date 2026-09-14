/**
 * Module sinh giải thích chi tiết, chuyên sâu cho từng câu hỏi lý thuyết bằng lái xe Đức (Klasse B)
 * Chuẩn hóa theo:
 * - 110 nhóm mã danh mục chính thức của BMVI / TÜV / DEKRA (1.1.xx -> 2.7.xx)
 * - 62 chủ đề luật giao thông đường bộ Đức (StVO, StVZO, FeV, StVG, StGB)
 * - Phân tích ngữ cảnh từng phương án Đúng / Sai
 * - Tự động tính toán chi tiết bài toán công thức (Faustformeln / Zahlenfragen)
 * - Cảnh báo câu điểm liệt 5 điểm (5-Punkte-Fragen)
 */

// 1. ÁNH XẠ MÃ DANH MỤC CHÍNH THỨC BMVI / TÜV (CATALOG PREFIX REGISTRY)
const CATALOG_REGISTRY = {
  '1.1.01': {
    ruleName: 'Nguyên tắc cơ bản & Lái xe phòng thủ (§ 1 StVO)',
    content: 'Theo Điều 1 Luật Giao Thông Đường Bộ Đức (StVO): Việc tham gia giao thông đòi hỏi sự cẩn trọng thường xuyên và tôn trọng lẫn nhau. Người lái xe không bao giờ được cố chấp đòi quyền ưu tiên (không "auf mein Recht bestehen") mà luôn phải lái xe phòng thủ, dự tính trước sai sót của người khác và sẵn sàng rà phanh nhường nhịn.',
    takeaway: 'Luôn lái xe phòng thủ: Dự đoán lỗi của người khác và không khăng khăng ép người khác nhường mình.'
  },
  '1.1.02': {
    ruleName: 'Hành vi đối với người đi bộ, trẻ em & người già (§ 26 StVO)',
    content: 'Trẻ em, người cao tuổi và người khuyết tật (khiếm thị mang gậy trắng hoặc dắt chó dẫn đường) là những đối tượng yếu thế cần được bảo vệ đặc biệt. Trẻ em thường hành động bộc phát, chưa ước lượng được tốc độ xe và tầm nhìn hạn chế. Khi thấy trẻ em hoặc bóng người gần lòng đường, tài xế bắt buộc phải giảm tốc độ tối đa và sẵn sàng rà phanh (Bremsbereitschaft).',
    takeaway: 'Thấy trẻ em hoặc người già -> Giảm tốc độ ngay và sẵn sàng rà phanh, không được bấm còi làm hoảng loạn.'
  },
  '1.1.03': {
    ruleName: 'Tình trạng mặt đường, trơn trượt & thời tiết xấu (§ 3 StVO)',
    content: 'Mặt đường ướt sau cơn mưa rào đầu tiên (tạo màng bùn trơn Schmierfilm), lá cây ẩm ướt vào mùa thu hoặc băng ngầm (Blitzeis/Glatteis) vào mùa đông làm giảm ma sát lốp nghiêm trọng. Đoạn đường phanh có thể tăng gấp 2 đến 4 lần. Bắt buộc phải tăng khoảng cách an toàn, tránh phanh gấp và không đánh lái đột ngột.',
    takeaway: 'Mặt đường trơn ướt -> Tăng khoảng cách an toàn gấp đôi, giảm tốc độ và không giật lái mạnh.'
  },
  '1.1.04': {
    ruleName: 'Lái xe trong bóng tối & tầm nhìn hạn chế (§ 17 StVO)',
    content: 'Khi trời tối hoặc tầm nhìn bị hạn chế do mưa, tuyết, sương mù: Tốc độ xe phải luôn điều chỉnh sao cho quãng đường dừng xe (Anhalteweg) nằm hoàn toàn trong phạm vi nhìn thấy của chùm đèn xe. Đèn cốt (Abblendlicht) chỉ chiếu xa khoảng 25-40m, vì vậy đi quá nhanh trong bóng tối đồng nghĩa với việc lái xe vào "vùng mù".',
    takeaway: 'Trong bóng tối: Quãng đường dừng xe phải luôn ngắn hơn tầm chiếu sáng của đèn xe.'
  },
  '1.1.05': {
    ruleName: 'Quy định tốc độ lái xe an toàn (§ 3 StVO)',
    content: 'Tốc độ tối đa luật định: Trong khu vực đô thị (innerorts) là 50 km/h; ngoài đô thị (außerorts) đối với xe con là 100 km/h; khu vực bước đi bộ (Verkehrsberuhigter Bereich) chỉ được đi với tốc độ bước chân (Schrittgeschwindigkeit 4-7 km/h). Tốc độ phải luôn tương thích với điều kiện đường sá, thời tiết và tầm nhìn của tài xế.',
    takeaway: '50 km/h trong phố, 100 km/h ngoài phố; khu vực Verkehrsberuhigter Bereich đi 4-7 km/h.'
  },
  '1.1.06': {
    ruleName: 'Quy tắc vượt xe an toàn (§ 5 StVO)',
    content: 'Chỉ được phép vượt khi: (1) Tầm nhìn phía trước hoàn toàn thông suốt, (2) Xe của bạn chạy nhanh hơn đáng kể so với xe bị vượt, (3) Không có biển cấm vượt (Zeichen 276) hoặc vạch liền (durchgezogene Linie), và (4) Giữ khoảng cách sườn xe tối thiểu 1,5m trong đô thị và 2,0m ngoài đô thị khi vượt người đi bộ hoặc xe đạp.',
    takeaway: 'Khoảng cách vượt xe đạp/người đi bộ: Tối thiểu 1,5m trong đô thị và 2,0m ngoài đô thị.'
  },
  '1.1.07': {
    ruleName: 'Tình huống giao thông đặc thù & Xe buýt (§ 11 & § 20 StVO)',
    content: 'Tại các đoạn đường bị thắt hẹp, quy tắc kéo khóa phéc-mơ-tuya (Reißverschlussverfahren) bắt buộc áp dụng: Các xe phải đi tới sát điểm kết thúc của làn đường rồi mới lần lượt xen kẽ nhập vào làn thông suốt. Khi xe buýt tấp vào trạm bật đèn cảnh báo Warnblinker: Cấm vượt; khi xe buýt đã dừng: chỉ vượt với tốc độ bước đi bộ.',
    takeaway: 'Kéo khóa Reißverschluss: Chạy đến sát chỗ hẹp mới xen kẽ nhập làn; xe buýt dừng bật đèn khẩn cấp -> đi tốc độ đi bộ.'
  },
  '1.1.08': {
    ruleName: 'Nồng độ cồn, ma túy & thuốc kích thích (§ 24a StVG)',
    content: 'Quy định nghiêm ngặt: Trong thời gian thử thách (Probezeit) 2 năm và với người lái xe dưới 21 tuổi, luật áp dụng mức cồn tuyệt đối 0,0 ‰ (không được uống dù chỉ một ngụm). Cồn và chất kích thích làm hẹp thị trường (hiệu ứng đường hầm Tunnelblick), giảm khả năng phán đoán khoảng cách và kéo dài thời gian phản ứng.',
    takeaway: 'Probezeit & dưới 21 tuổi: Nồng độ cồn 0,0 ‰ tuyệt đối. Tuyệt đối không lái xe sau khi uống bia rượu.'
  },
  '1.1.09': {
    ruleName: 'Thể chất, mệt mỏi & mất tập trung khi lái xe',
    content: 'Hiện tượng chợp mắt vô thức (Sekundenschlaf) là nguyên nhân gây ra nhiều vụ tai nạn thảm khốc trên đường trường. Khi mệt mỏi, mắt ríu, ngáp nhiều: Mở cửa kính hay nghe nhạc lớn không giải quyết được gốc rễ, tài xế bắt buộc phải tấp vào trạm dừng nghỉ ngơi hoặc đi dạo 15-20 phút.',
    takeaway: 'Buồn ngủ -> Phải dừng nghỉ ngay. Uống cà phê hay mở nhạc lớn không thể thay thế giấc ngủ nghỉ ngơi.'
  },
  '1.2.02': {
    ruleName: 'Sử dụng làn đường & Nguyên tắc đi bên phải (§ 2 StVO)',
    content: 'Nguyên tắc Rechtsfahrgebot quy định các phương tiện bắt buộc phải đi về làn bên phải. Trên đường ngoài đô thị hoặc Autobahn, làn bên trái chỉ dùng để vượt, sau khi vượt xong phải nhanh chóng chuyển lại làn bên phải khi an toàn.',
    takeaway: 'Đi về làn bên phải (Rechtsfahrgebot). Làn bên trái chỉ dùng để vượt.'
  },
  '1.2.03': {
    ruleName: 'Vật lý lái xe & Khoảng cách phanh (§ 3 StVO)',
    content: 'Đoạn đường phanh (Bremsweg) tăng theo bình phương vận tốc: Khi vận tốc tăng gấp đôi, quãng đường phanh tăng GẤP 4 LẦN (2² = 4). Khi vận tốc tăng gấp 3, quãng đường phanh tăng GẤP 9 LẦN (3² = 9). Khi chở nặng hoặc đường ướt, khoảng cách này còn kéo dài hơn nữa.',
    takeaway: 'Tốc độ gấp đôi -> Đoạn đường phanh gấp 4 lần (tỷ lệ thuận với bình phương vận tốc)!'
  },
  '1.2.04': {
    ruleName: 'Khoảng cách an toàn tối thiểu (§ 4 StVO)',
    content: 'Khoảng cách an toàn ngoài đô thị trong điều kiện bình thường tối thiểu bằng một nửa số đo đồng hồ tốc độ (Quy tắc "Halber Tacho", ví dụ chạy 100 km/h phải cách 50m, bằng khoảng cách giữa 2 cọc tiêu Leitpfosten). Trong điều kiện thời tiết xấu hoặc đường trơn, khoảng cách này phải tăng lên tương đương quy tắc 2 đến 3 giây.',
    takeaway: 'Khoảng cách ngoài phố = Tốc độ : 2 (Halber Tacho). Đường ướt hoặc tầm nhìn kém -> tăng gấp đôi.'
  },
  '1.2.05': {
    ruleName: 'Quy định cấm vượt & Nguy cơ khi vượt (§ 5 StVO)',
    content: 'Nghiêm cấm vượt tại các vị trí khuất tầm nhìn, khúc cua hẹp, đỉnh dốc, trước vạch người đi bộ qua đường (Zebrastreifen) hoặc khi xe phía trước đang giảm tốc nhường đường. Cấm vượt khi sự chênh lệch tốc độ giữa hai xe không đủ lớn.',
    takeaway: 'Không vượt khi tầm nhìn không rõ ràng, tại nơi giao cắt hoặc trước vạch đi bộ Zebrastreifen.'
  },
  '1.2.06': {
    ruleName: 'Tránh chướng ngại vật trên làn đường (§ 6 StVO)',
    content: 'Khi gặp chướng ngại vật (xe hỏng, công trường, xe đỗ) nằm trên làn đường của bạn: Bạn bắt buộc phải nhường đường cho các phương tiện đi ngược chiều trước, chỉ khi đường ngược chiều hoàn toàn vắng bóng xe mới được đánh lái lách qua chướng ngại vật.',
    takeaway: 'Chướng ngại vật bên làn ai thì người đó phải dừng lại nhường đường cho xe ngược chiều.'
  },
  '1.2.09': {
    ruleName: 'Rẽ, quay đầu & lùi xe an toàn (§ 9 StVO)',
    content: 'Quy trình chuẩn khi rẽ: Quan sát gương hậu trong và ngoài -> Bật đèn xi nhan sớm -> Ngoái đầu kiểm tra điểm mù (Schulterblick) -> Nhường đường cho người đi bộ và xe đạp đi thẳng cùng chiều cắt ngang. Khi rẽ trái phải nhường đường cho xe đi thẳng và xe rẽ phải ngược chiều.',
    takeaway: 'Rẽ an toàn: Gương -> Xi nhan -> Schulterblick kiểm tra điểm mù -> Nhường xe đạp/đi bộ đi thẳng.'
  },
  '1.2.10': {
    ruleName: 'Nhập làn từ lề đường, ngõ phụ hoặc sân nhà (§ 10 StVO)',
    content: 'Người xuất phát từ lề đường, từ bãi đỗ, ngõ phụ, khu dân cư hoặc từ khu đất riêng (Grundstücksausfahrt) ra đường chính phải nhường quyền ưu tiên cho MỌI phương tiện đang lưu thông trên đường chính và không được gây nguy hiểm cho người đi bộ trên vỉa hè.',
    takeaway: 'Từ ngõ ra, từ lề đường ra đường chính: Luôn phải nhường đường cho tất cả mọi phương tiện.'
  },
  '1.2.11': {
    ruleName: 'Quy định dừng xe (Halten - § 12 StVO)',
    content: 'Dừng xe (Halten) theo luật là việc dừng xe tự nguyện không quá 3 phút và người lái xe không được rời khỏi xe (vẫn ở vị trí sẵn sàng điều khiển). Dừng do tình thế giao thông (đèn đỏ, kẹt xe, nhường đường) là Warten chứ không phải Halten.',
    takeaway: 'Dừng xe (Halten) = Dưới 3 phút và không rời khỏi xe.'
  },
  '1.2.12': {
    ruleName: 'Quy định đỗ xe an toàn (Parken - § 12 StVO)',
    content: 'Đỗ xe (Parken) là khi dừng xe trên 3 phút hoặc khi tài xế đã rời khỏi xe. Các khoảng cách cấm đỗ bắt buộc phải nhớ: Cách ngã ba/ngã tư tối thiểu 5m (hoặc 8m nếu có làn xe đạp song song); cách biển trạm xe buýt (Haltestelle) tối thiểu 15m; cách vạch người đi bộ Zebrastreifen tối thiểu 5m.',
    takeaway: 'Cấm đỗ: 5m trước ngã tư & vạch Zebrastreifen; 15m quanh biển trạm xe buýt; cấm đỗ trước ngõ nhà người khác.'
  },
  '1.2.16': {
    ruleName: 'Tín hiệu cảnh báo nguy hiểm & Còi xe (§ 16 StVO)',
    content: 'Trong khu vực đô thị: Chỉ được dùng còi xe khi có nguy hiểm cấp bách đe dọa tai nạn. Nghiêm cấm dùng còi để giục xe trước hoặc chào hỏi. Ngoài đô thị: Được phép dùng còi hoặc nháy đèn pha ngắn để báo hiệu chuẩn bị vượt.',
    takeaway: 'Trong phố cấm bấm còi trừ khi báo nguy hiểm cấp bách. Ngoài phố được dùng còi/nháy pha báo hiệu sắp vượt.'
  },
  '1.2.17': {
    ruleName: 'Sử dụng hệ thống đèn chiếu sáng ô tô (§ 17 StVO)',
    content: 'Bắt buộc bật đèn cốt (Abblendlicht) khi trời tối, chạng vạng, trong hầm đường bộ hoặc khi trời mưa, tuyết, sương mù. Tuyệt đối không dùng đèn vị trí (Standlicht) để chạy xe. Đèn sương mù sau (Nebelschlussleuchte) CHỈ ĐƯỢC BẬT khi tầm nhìn dưới 50m do sương mù và tốc độ tối đa không quá 50 km/h.',
    takeaway: 'Trời mưa/tối/hầm -> Bật đèn cốt (Abblendlicht). Đèn sương mù sau chỉ bật khi tầm nhìn < 50m (tốc độ max 50 km/h).'
  },
  '1.2.19': {
    ruleName: 'Giao cắt đường sắt & Biển St. Andreas-Kreuz (§ 19 StVO)',
    content: 'Phương tiện đường sắt luôn có quyền ưu tiên tuyệt đối trên biển chữ thập St. Andreas-Kreuz. Nghiêm cấm vượt từ biển cảnh báo có vạch đỏ cho đến hết đường ray. Nếu rào chắn đang hạ xuống, đèn đỏ nhấp nháy hoặc nhân viên đường sắt giơ cờ trắng-đỏ-trắng: Bắt buộc dừng trước vạch dừng.',
    takeaway: 'Tàu hỏa luôn ưu tiên tuyệt đối. Cấm vượt trước đường tàu; cờ trắng-đỏ-trắng = dừng lại chờ.'
  },
  '1.2.20': {
    ruleName: 'Xe buýt trường học & Phương tiện công cộng (§ 20 StVO)',
    content: 'Khi xe buýt đang tấp vào trạm và bật đèn khẩn cấp Warnblinklicht: Nghiêm cấm mọi phương tiện vượt qua. Khi xe buýt đã dừng hẳn tại trạm với đèn Warnblinker: Được phép đi qua với tốc độ bước đi bộ (4-7 km/h) và khoảng cách sườn xe rộng; các xe đi CHIỀU NGƯỢC LẠI cũng phải giảm tốc độ đi bộ nếu không có dải phân cách cứng.',
    takeaway: 'Xe buýt dừng bật đèn cảnh báo -> Đi qua với tốc độ đi bộ (4-7 km/h) ở CẢ HAI CHIỀU đường.'
  },
  '1.2.22': {
    ruleName: 'Chở người & Ghế an toàn cho trẻ em (§ 21 StVO)',
    content: 'Mọi người trên xe bắt buộc phải thắt dây an toàn. Trẻ em dưới 12 tuổi hoặc có chiều cao dưới 150 cm bắt buộc phải ngồi trên ghế an toàn chuyên dụng (Kindersitz) được chứng nhận tiêu chuẩn châu Âu.',
    takeaway: 'Dưới 12 tuổi hoặc dưới 150cm -> Bắt buộc dùng ghế trẻ em (Kindersitz).'
  },
  '1.2.23': {
    ruleName: 'Xếp dỡ & Cố định hàng hóa an toàn (§ 22 StVO)',
    content: 'Hàng hóa không được nhô ra phía trước đầu xe dưới độ cao 2,5m. Ở phía sau xe, hàng hóa nhô ra quá 1 mét phải được đánh dấu bằng cờ đỏ sáng màu kích thước tối thiểu 30x30 cm có thanh nẹp giữ thẳng hoặc đèn đỏ khi trời tối.',
    takeaway: 'Hàng nhô ra sau xe trên 1m -> Bắt buộc treo cờ đỏ 30x30cm; không che biển số và đèn xe.'
  },
  '1.2.26': {
    ruleName: 'Nghĩa vụ lái xe & Cấm dùng điện thoại (§ 23 StVO)',
    content: 'Nghiêm cấm cầm nắm, sử dụng điện thoại di động hoặc thiết bị điện tử khi động cơ đang hoạt động, kể cả khi đang dừng chờ đèn đỏ nếu xe không tự ngắt động cơ qua hệ thống Start-Stop. Kính xe phải được cạo sạch băng tuyết trước khi lăn bánh.',
    takeaway: 'Nghiêm cấm cầm điện thoại khi động cơ đang nổ máy. Kính xe phải cạo sạch tuyết hoàn toàn.'
  },
  '1.2.34': {
    ruleName: 'Xử lý tai nạn & Trách nhiệm pháp lý (§ 34 StVO & § 142 StGB)',
    content: 'Trình tự xử lý tại hiện trường tai nạn: (1) Đảm bảo an toàn hiện trường (bật đèn khẩn cấp Warnblinker, mặc áo phản quang, đặt tam giác cảnh báo Warndreieck cách 50m trong phố hoặc 100m ngoài phố), (2) Sơ cứu người bị thương, (3) Gọi cấp cứu 112 / Cảnh sát 110. Nếu va quẹt xe đang đỗ mà chủ xe vắng mặt: Bắt buộc đợi một thời gian hợp lý, để lại thông tin và BÁO NGAY CHO CẢNH SÁT; tự ý bỏ đi sẽ bị truy cứu tội hình sự Fahrerflucht.',
    takeaway: 'Thứ tự: Bảo đảm an toàn hiện trường -> Sơ cứu -> Gọi cấp cứu 112. Va chạm xe đỗ bắt buộc phải báo cảnh sát.'
  },
  '1.2.36': {
    ruleName: 'Hiệu lệnh của cảnh sát điều khiển (§ 36 StVO)',
    content: 'Hiệu lệnh của cảnh sát giao thông có giá trị pháp lý cao nhất, đứng trên cả đèn tín hiệu giao thông, biển báo và quy tắc nhường đường. Quy tắc vàng cần nhớ: "Thấy Lưng hoặc Ngực cảnh sát = Dừng lại; Thấy Sườn hoặc Cánh tay giang ngang = Được phép đi".',
    takeaway: 'Cảnh sát đứng đầu: Lưng/Ngực = Dừng lại; Sườn/Tay giang ngang = Được phép đi.'
  },
  '1.2.37': {
    ruleName: 'Hệ thống đèn tín hiệu giao thông (§ 37 StVO)',
    content: 'Đèn vàng: Phải dừng lại trước vạch dừng, trừ khi xe đã đi quá sát vạch dừng và việc phanh gấp sẽ gây nguy hiểm cho xe phía sau. Biển mũi tên xanh kim loại (Grünpfeil cạnh đèn đỏ): Cho phép rẽ phải khi đèn đỏ NHƯNG BẮT BUỘC PHẢI DỪNG HẲN (Stoppen) tại vạch dừng để quan sát người đi bộ và xe cộ trước khi rẽ.',
    takeaway: 'Đèn vàng -> Dừng nếu an toàn. Biển mũi tên xanh Grünpfeil -> Bắt buộc dừng hẳn bánh xe rồi mới được rẽ phải.'
  },
  '1.2.38': {
    ruleName: 'Phương tiện ưu tiên khẩn cấp (§ 38 StVO)',
    content: 'Khi phương tiện khẩn cấp (cứu thương, cứu hỏa, cảnh sát) sử dụng đồng thời đèn xanh chớp (Blaues Blinklicht) và còi hụ (Folgetonhorn): Tất cả các phương tiện khác bắt buộc phải nhường đường ngay lập tức, tấp vào lề hoặc tạo làn cứu nạn Rettungsgasse.',
    takeaway: 'Đèn xanh chớp + Còi hụ -> Lập tức nhường đường và tạo làn khẩn cấp Rettungsgasse.'
  },
  '1.3.01': {
    ruleName: 'Quyền ưu tiên & Thứ tự qua ngã tư (§ 8 StVO)',
    content: 'Tại ngã tư không có biển báo, không có đèn tín hiệu và không có cảnh sát điều khiển: Quy tắc "Rechts vor Links" (Bên phải trước, Bên trái sau) luôn có hiệu lực. Xe đến từ bên tay phải của bạn luôn được đi trước bạn. Khi bạn muốn rẽ trái, bạn phải nhường đường cho xe đi thẳng và xe rẽ phải đối diện.',
    takeaway: 'Không biển báo -> Nhường xe bên phải (Rechts vor Links). Rẽ trái luôn đi sau xe đối diện.'
  },
  '1.4.40': {
    ruleName: 'Biển báo nguy hiểm (Gefahrzeichen - § 40 StVO)',
    content: 'Biển báo nguy hiểm có hình tam giác viền đỏ cảnh báo đoạn đường phía trước có rủi ro tiềm ẩn (đoạn đường hẹp, trơn trượt, dốc đứng, công trường, động vật băng qua đường). Tài xế phải lập tức giảm tốc độ và nâng cao cảnh giác quan sát.',
    takeaway: 'Biển tam giác viền đỏ -> Nguy hiểm phía trước: Giảm tốc độ và sẵn sàng phanh.'
  },
  '1.4.41': {
    ruleName: 'Biển báo hiệu lệnh & Biển cấm (Vorschriftzeichen - § 41 StVO)',
    content: 'Biển tròn viền đỏ biểu thị điều cấm (cấm vượt, cấm vào, giới hạn tốc độ tối đa); biển tròn nền xanh biểu thị hiệu lệnh bắt buộc (hướng đi bắt buộc, tốc độ tối thiểu, làn dành riêng). Mọi hành vi không tuân thủ đều là vi phạm luật nghiêm trọng.',
    takeaway: 'Biển tròn viền đỏ = CẤM; Biển tròn nền xanh = BẮT BUỘC THI HÀNH.'
  },
  '1.4.42': {
    ruleName: 'Biển chỉ dẫn & Phân luồng làn đường (Richtzeichen - § 42 StVO)',
    content: 'Biển chỉ dẫn (hình vuông hoặc chữ nhật) cung cấp thông tin điều hướng, chỉ dẫn làn đường, trạm dừng, bắt đầu hoặc kết thúc đường cao tốc Autobahn, đường ưu tiên Vorfahrtsstraße và khu vực đỗ xe.',
    takeaway: 'Biển chỉ dẫn giúp định hướng làn đường và điều kiện lưu thông trên tuyến đường.'
  },
  '1.5.01': {
    ruleName: 'Lái xe thân thiện môi trường & Tiết kiệm xăng (§ 30 StVO)',
    content: 'Các biện pháp lái xe sinh thái (Eco-Driving): (1) Chuyển số sớm ở vòng tua thấp (dưới 2000 vòng/phút), (2) Tắt máy khi dừng chờ lâu trên 20-30 giây (trước rào chắn tàu hoặc kẹt xe), (3) Tháo giá chở đồ trên nóc xe (Dachgepäckträger) khi không dùng để giảm cản gió, (4) Duy trì áp suất lốp đúng chuẩn.',
    takeaway: 'Chuyển số sớm (< 2000 rpm), tắt máy khi dừng lâu, duy trì áp suất lốp để tiết kiệm nhiên liệu và bảo vệ môi trường.'
  },
  '1.7.01': {
    ruleName: 'Lái xe trên đường cao tốc Autobahn (§ 18 StVO)',
    content: 'Trên đường cao tốc Autobahn: (1) Chỉ những xe có tốc độ thiết kế trên 60 km/h mới được phép đi vào, (2) Tốc độ khuyến nghị chung là 130 km/h (Richtgeschwindigkeit), (3) Nghiêm cấm quay đầu xe (Wenden), đi lùi hoặc dừng đỗ trên toàn bộ cao tốc (kể cả trên làn khẩn cấp Seitenstreifen trừ khi hỏng xe đột xuất).',
    takeaway: 'Autobahn: Tốc độ xe phải > 60 km/h; Cấm tuyệt đối: Quay đầu, Đi lùi, Dừng đỗ.'
  },
  '2.1.03': {
    ruleName: 'Vật lý lái xe & Lực ly tâm khi vào cua',
    content: 'Khi xe vào khúc cua, lực ly tâm tác động đẩy xe văng ra phía ngoài khúc cua. Lực này tỷ lệ thuận với bình phương vận tốc. Tài xế bắt buộc phải giảm tốc độ TRƯỚC KHI vào cua, tuyệt đối tránh đạp phanh gấp trong cua vì dễ làm bánh xe trượt mất lái.',
    takeaway: 'Giảm tốc độ TRƯỚC khúc cua. Tuyệt đối không phanh gấp hay ngoặt lái mạnh trong cua.'
  },
  '2.1.06': {
    ruleName: 'Khoảng cách phanh & Tải trọng xe ô tô',
    content: 'Khi xe chở đủ tải (đầy người và hành lý) hoặc kéo theo rơ-moóc không có phanh riêng, quán tính của xe tăng lên đáng kể, làm kéo dài đoạn đường phanh. Trọng tâm xe thay đổi cũng làm giảm độ ổn định khi đánh lái.',
    takeaway: 'Xe chở nặng -> Quán tính lớn hơn, đoạn đường phanh dài hơn: Phải tăng khoảng cách an toàn.'
  },
  '2.1.07': {
    ruleName: 'Kéo rơ-moóc & Tải trọng tỳ (Anhängerbetrieb)',
    content: 'Khi kéo rơ-moóc: Tải trọng tỳ (Stützlast) tác động lên móc kéo của xe con không được vượt quá giới hạn tối đa và cũng không được nhỏ hơn mức tối thiểu quy định. Dây cáp an toàn (Abreißseil) phải được móc chắc chắn để tự động phanh rơ-moóc nếu bị đứt khớp nối.',
    takeaway: 'Kéo rơ-moóc: Kiểm tra kỹ tải trọng tỳ (Stützlast) và cài chắc chắn dây phanh an toàn Abreißseil.'
  },
  '2.2.03': {
    ruleName: 'Công thức toán học tính phanh & Khoảng cách (Faustformeln)',
    content: 'Các công thức tính nhẩm chuẩn của StVO: ' +
      'Reaktionsweg (quãng đường phản ứng trong 1 giây) = (Vận tốc : 10) x 3. ' +
      'Bremsweg thường (quãng đường phanh thường) = (Vận tốc : 10) x (Vận tốc : 10). ' +
      'Bremsweg khẩn cấp (Gefahrbremsung) = [(Vận tốc : 10) x (Vận tốc : 10)] : 2. ' +
      'Anhalteweg (tổng quãng đường dừng hẳn) = Reaktionsweg + Bremsweg.',
    takeaway: 'Reaktionsweg = (V:10)x3; Bremsweg = (V:10)²; Phanh khẩn cấp = Bremsweg chia 2.'
  },
  '2.7.01': {
    ruleName: 'Kỹ thuật động cơ, ắc quy & dầu bôi trơn',
    content: 'Các đèn cảnh báo trên táp-lô có quy ước màu quốc tế: Đèn màu ĐỎ cảnh báo nguy hiểm nghiêm trọng (áp suất dầu phanh, áp suất dầu máy, sạc ắc quy, quá nhiệt động cơ) - tài xế phải dừng xe an toàn và tắt máy ngay; Đèn màu VÀNG cảnh báo hệ thống cần kiểm tra sớm (áp suất lốp, lỗi khí thải động cơ).',
    takeaway: 'Đèn táp-lô màu ĐỎ -> Phải dừng xe tắt máy ngay lập tức; Đèn màu VÀNG -> Cần kiểm tra sớm.'
  },
  '2.7.02': {
    ruleName: 'Quy chuẩn gai lốp xe ô tô (StVZO)',
    content: 'Luật giao thông Đức quy định độ sâu gai lốp tối thiểu là 1,6 mm trên toàn bộ chu vi bánh xe (khuyến nghị lốp mùa hè nên từ 3 mm và lốp mùa đông từ 4 mm). Áp suất lốp phải kiểm tra định kỳ khi lốp nguội; lốp non hơi gây tốn xăng, mòn vẹt mép và dễ nổ lốp ở tốc độ cao.',
    takeaway: 'Gai lốp tối thiểu 1,6 mm theo luật (nên từ 3-4 mm). Kiểm tra áp suất lốp khi lốp nguội.'
  },
  '2.7.05': {
    ruleName: 'Ký hiệu lốp xe & Năm sản xuất DOT',
    content: 'Ký hiệu DOT 4 chữ số trên sườn lốp cho biết thời gian sản xuất: 2 chữ số đầu là tuần sản xuất, 2 chữ số sau là năm sản xuất (Ví dụ: "1217" nghĩa là sản xuất vào tuần thứ 12 của năm 2017). Lốp xe quá 6 năm cao su sẽ bị lão hóa, chai cứng và giảm độ bám đường.',
    takeaway: 'Mã số DOT: 2 số đầu là tuần, 2 số sau là năm sản xuất (VD 1217 = tuần 12 năm 2017).'
  },
  '2.7.06': {
    ruleName: 'Đăng kiểm kỹ thuật định kỳ (Hauptuntersuchung - HU / TÜV)',
    content: 'Xe ô tô con đăng ký mới lần đầu phải đi kiểm định an toàn kỹ thuật (HU) sau 3 năm; các lần tiếp theo định kỳ 2 năm một lần. Tháng kiểm định tiếp theo được xác định bằng con số hướng thẳng lên vị trí 12 giờ trên tem tròn (Plakette) dán ở biển số sau.',
    takeaway: 'Xe mới khám sau 3 năm, sau đó định kỳ 2 năm/lần. Tháng khám xem ở đỉnh 12h của tem biển số sau.'
  }
};


// 2. BỔ SUNG ÁNH XẠ CHỦ ĐỀ THI CHÍNH THỨC (TOPIC REGISTRY FALLBACK)
const TOPIC_REGISTRY = {
  'Überholen': {
    ruleName: 'Quy tắc vượt xe an toàn (§ 5 StVO)',
    content: 'Chỉ được phép vượt khi: Không có biển cấm vượt, tầm nhìn thông suốt, xe bạn chạy nhanh hơn đáng kể so với xe bị vượt, và giữ khoảng cách sườn xe tối thiểu 1,5m trong đô thị hoặc 2,0m ngoài đô thị với xe đạp/người đi bộ.',
    takeaway: 'Khoảng cách vượt xe đạp/người đi bộ: Tối thiểu 1,5m trong đô thị và 2,0m ngoài đô thị.'
  },
  'Beleuchtung': {
    ruleName: 'Sử dụng hệ thống đèn chiếu sáng ô tô (§ 17 StVO)',
    content: 'Khi trời tối, chạng vạng, sương mù, mưa hoặc đi trong hầm: Bắt buộc bật đèn cốt (Abblendlicht). Đèn sương mù sau chỉ bật khi tầm nhìn < 50m do sương mù và tốc độ không quá 50 km/h.',
    takeaway: 'Trời tối/mưa/hầm -> Bật đèn cốt (Abblendlicht). Đèn sương mù sau chỉ bật khi tầm nhìn sương mù < 50m.'
  },
  'Personenbeförderung': {
    ruleName: 'Chở người & Ghế an toàn cho trẻ em (§ 21 StVO)',
    content: 'Tất cả hành khách trên xe bắt buộc phải thắt dây an toàn. Trẻ em dưới 12 tuổi hoặc có chiều cao dưới 150 cm bắt buộc phải ngồi ghế an toàn chuyên dụng (Kindersitz).',
    takeaway: 'Dưới 12 tuổi hoặc dưới 150cm -> Bắt buộc dùng ghế trẻ em (Kindersitz).'
  },
  'Ladung': {
    ruleName: 'Xếp dỡ & Cố định hàng hóa an toàn (§ 22 StVO)',
    content: 'Hàng hóa không được nhô ra phía trước xe dưới độ cao 2,5m. Ở phía sau xe, hàng nhô ra quá 1m bắt buộc phải treo cờ đỏ kích thước 30x30cm.',
    takeaway: 'Hàng nhô ra sau xe trên 1m -> Bắt buộc treo cờ đỏ 30x30cm có thanh nẹp.'
  },
  'Richtzeichen': {
    ruleName: 'Biển chỉ dẫn & Phân luồng làn đường (Richtzeichen - § 42 StVO)',
    content: 'Biển chỉ dẫn cung cấp thông tin hướng đi, đường ưu tiên Vorfahrtsstraße, bắt đầu/kết thúc đường cao tốc Autobahn và làn phân luồng giao thông.',
    takeaway: 'Biển chỉ dẫn giúp định hướng làn đường và điều kiện lưu thông trên tuyến đường.'
  },
  'Geschwindigkeit': {
    ruleName: 'Quy định tốc độ lái xe an toàn (§ 3 StVO)',
    content: 'Tốc độ tối đa: 50 km/h trong đô thị, 100 km/h ngoài đô thị đối với xe con. Tốc độ phải luôn điều chỉnh tương thích với thời tiết, tầm nhìn và tình trạng mặt đường.',
    takeaway: '50 km/h trong phố, 100 km/h ngoài phố; luôn điều chỉnh tốc độ theo tầm nhìn và mặt đường.'
  },
  'Halten und Parken': {
    ruleName: 'Quy định dừng và đỗ xe (§ 12 StVO)',
    content: 'Cấm đỗ: 5m trước/sau ngã tư, 15m quanh biển trạm xe buýt, 5m trước vạch người đi bộ Zebrastreifen, và cấm đỗ trước lối ra vào nhà người khác.',
    takeaway: 'Cấm đỗ: 5m trước ngã tư & vạch Zebrastreifen; 15m quanh biển trạm xe buýt.'
  },
  'Anhängerbetrieb': {
    ruleName: 'Kéo rơ-moóc & Tải trọng tỳ (Anhängerbetrieb)',
    content: 'Khi kéo rơ-moóc: Kiểm tra tải trọng tỳ (Stützlast) trên móc kéo, cài dây cáp an toàn (Abreißseil) và lắp thêm gương chiếu hậu mở rộng nếu thùng rơ-moóc rộng hơn xe kéo.',
    takeaway: 'Kiểm tra kỹ tải trọng tỳ Stützlast và cài chắc chắn dây phanh an toàn Abreißseil.'
  },
  'Dunkelheit und schlechte Sicht': {
    ruleName: 'Lái xe trong bóng tối & Tầm nhìn hạn chế (§ 17 StVO)',
    content: 'Khi lái xe trong bóng tối: Tốc độ phải luôn ở mức đảm bảo quãng đường dừng xe nằm trọn trong khoảng chiếu sáng của đèn xe. Bị chói mắt bởi xe ngược chiều: Nhìn lệch sang mép đường bên phải.',
    takeaway: 'Bị xe ngược chiều rọi đèn chói mắt: Không nhìn vào đèn pha đối diện mà nhìn sang mép đường bên phải.'
  },
  'Vorschriftzeichen': {
    ruleName: 'Biển báo hiệu lệnh & Biển cấm (Vorschriftzeichen - § 41 StVO)',
    content: 'Biển tròn viền đỏ (biển cấm) và biển tròn nền xanh (hiệu lệnh bắt buộc) phải tuân thủ tuyệt đối. Bất kỳ vi phạm nào cũng bị xử phạt điểm phạt Flensburg.',
    takeaway: 'Biển tròn viền đỏ = CẤM; Biển tròn nền xanh = BẮT BUỘC THI HÀNH.'
  },
  'Gefahrzeichen': {
    ruleName: 'Biển báo nguy hiểm (Gefahrzeichen - § 40 StVO)',
    content: 'Biển tam giác viền đỏ cảnh báo đoạn đường nguy hiểm phía trước: Tài xế phải giảm tốc độ ngay và sẵn sàng phanh ứng phó.',
    takeaway: 'Biển tam giác viền đỏ -> Nguy hiểm phía trước: Giảm tốc độ và sẵn sàng phanh.'
  },
  'Abstand': {
    ruleName: 'Khoảng cách an toàn tối thiểu (§ 4 StVO)',
    content: 'Ngoài đô thị: Khoảng cách tối thiểu với xe đi trước bằng một nửa đồng hồ tốc độ (Halber Tacho = V : 2) hoặc quy tắc 2 giây trong điều kiện bình thường.',
    takeaway: 'Khoảng cách an toàn ngoài phố = Tốc độ : 2 (Halber Tacho) hoặc quy tắc 2 giây.'
  },
  'Abbiegen, Wenden und Rückwärtsfahren': {
    ruleName: 'Rẽ, quay đầu & lùi xe an toàn (§ 9 StVO)',
    content: 'Khi rẽ: Quan sát gương -> Bật xi nhan -> Ngoái đầu Schulterblick -> Nhường người đi bộ và xe đạp cắt ngang. Khi lùi xe: Phải quan sát kỹ toàn bộ không gian phía sau, nếu tầm nhìn bị khuất phải có người xi-nhan hướng dẫn.',
    takeaway: 'Quy trình rẽ/lùi: Gương -> Xi nhan -> Schulterblick kiểm tra điểm mù -> Nhường đường.'
  },
  'Eignung und Befähigung von Kraftfahrern': {
    ruleName: 'Thể chất & Năng lực người lái xe (FeV)',
    content: 'Người lái xe phải có đủ thể chất và tinh thần minh mẫn. Uống rượu bia, ma túy, thuốc an thần hoặc mệt mỏi quá độ làm mất tư cách lái xe an toàn.',
    takeaway: 'Chỉ cầm lái khi thể chất và tinh thần hoàn toàn tỉnh táo, minh mẫn.'
  },
  'Grundformen des Verkehrsverhaltens': {
    ruleName: 'Nguyên tắc cơ bản & Lái xe phòng thủ (§ 1 StVO)',
    content: 'Việc tham gia giao thông đòi hỏi sự cẩn trọng liên tục và tôn trọng lẫn nhau. Không bao giờ cố chấp theo luật mà luôn sẵn sàng nhường nhịn.',
    takeaway: 'Lái xe phòng thủ: Nhường nhịn và dự đoán trước sai sót của người khác.'
  },
  'Besondere Verkehrssituationen': {
    ruleName: 'Xử lý các tình huống giao thông phức tạp (§ 11 StVO)',
    content: 'Tại các giao lộ phức tạp hoặc đường hẹp: Đi chậm, giao tiếp bằng ánh mắt (Blickkontakt) với các tài xế khác và chủ động nhường đường nếu đường bị tắc nghẽn.',
    takeaway: 'Giao lộ phức tạp: Giảm tốc độ, giao tiếp bằng ánh mắt và kiên nhẫn nhường đường.'
  },
  'Untersuchung der Fahrzeug': {
    ruleName: 'Kiểm định an toàn kỹ thuật phương tiện (HU/AU - § 29 StVZO)',
    content: 'Xe ô tô phải được kiểm định định kỳ đảm bảo phanh, lốp, đèn, hệ thống lái và khí thải đạt chuẩn an toàn giao thông.',
    takeaway: 'Đăng kiểm định kỳ đúng hạn để đảm bảo an toàn kỹ thuật cho xe.'
  },
  'Sonntagsfahrverbot': {
    ruleName: 'Lệnh cấm xe tải lưu thông ngày Chủ nhật (§ 30 StVO)',
    content: 'Luật cấm xe tải có trọng tải trên 7,5 tấn và xe tải kéo rơ-moóc lưu thông vào các ngày Chủ nhật và ngày lễ từ 0:00 đến 22:00 trên toàn bộ mạng lưới đường bộ Đức.',
    takeaway: 'Xe tải > 7,5T hoặc xe tải kéo rơ-moóc bị cấm chạy vào Chủ nhật & ngày lễ từ 0:00 - 22:00.'
  },

  'Umweltschutz': {
    ruleName: 'Bảo vệ môi trường & Tiết kiệm năng lượng (§ 30 StVO)',
    content: 'Luật giao thông Đức yêu cầu hạn chế tối đa tiếng ồn và khí thải không cần thiết: Tránh rồ ga, tắt máy khi đỗ xe, không nổ máy làm nóng động cơ tại chỗ vào mùa đông, và duy trì áp suất lốp tiêu chuẩn.',
    takeaway: 'Tắt máy khi chờ lâu, chuyển số sớm (< 2000 rpm), không nổ máy sưởi xe tại chỗ.'
  },
  'Affektiv-emotionales Verhalten im Straßenverkehr': {
    ruleName: 'Tâm lý, cảm xúc & Ứng xử văn minh sau tay lái',
    content: 'Khi gặp lái xe hung hăng hoặc bị khiêu khích: Tuyệt đối không ăn thua, không bấm còi hay chớp đèn trả đũa. Hãy giữ bình tĩnh, nhường nhịn và duy trì khoảng cách an toàn rộng hơn để bảo vệ chính mình.',
    takeaway: 'Kiềm chế cảm xúc, không trả đũa xe khác; nhường nhịn là văn hóa lái xe an toàn.'
  },
  'Liegenbleiben und Abschleppen von Fahrzeugen': {
    ruleName: 'Xử lý xe hỏng & Kéo xe cứu hộ (Abschleppen - § 15 & § 15a StVO)',
    content: 'Khi xe hỏng: Bật đèn khẩn cấp Warnblinker, mặc áo phản quang, đặt tam giác cảnh báo (50m trong phố, 100m ngoài phố, 150-200m trên cao tốc). Khi kéo xe (Abschleppen): Cả hai xe đều phải bật đèn Warnblinker và chỉ được kéo đến lối ra cao tốc gần nhất.',
    takeaway: 'Kéo xe: Cả 2 xe đều bật đèn khẩn cấp Warnblinker; trên cao tốc phải rời ở lối ra gần nhất.'
  },
  'Autobahn': {
    ruleName: 'Quy tắc lái xe trên đường cao tốc Autobahn (§ 18 StVO)',
    content: 'Trên Autobahn chỉ xe có tốc độ thiết kế > 60 km/h mới được đi vào. Tốc độ khuyến nghị 130 km/h. Nghiêm cấm quay đầu xe, đi lùi hoặc dừng đỗ trên toàn tuyến cao tốc.',
    takeaway: 'Autobahn: Tốc độ xe phải > 60 km/h; Cấm tuyệt đối quay đầu, đi lùi và dừng đỗ.'
  },
  'Autobahn und Kraftfahrstraße': {
    ruleName: 'Quy tắc lái xe trên đường cao tốc Autobahn (§ 18 StVO)',
    content: 'Trên Autobahn và Kraftfahrstraße: Tuân thủ nghiêm ngặt nguyên tắc đi làn bên phải (Rechtsfahrgebot). Làn bên trái chỉ dùng để vượt. Không được vượt bên phải trừ khi tắc đường kẹt xe.',
    takeaway: 'Tuân thủ Rechtsfahrgebot; không vượt phải trừ khi cả hàng xe đang kẹt đi chậm.'
  },
  'Sonstige Pflichten des Fahrzeugführers': {
    ruleName: 'Nghĩa vụ của người lái xe & Trang thiết bị (§ 23 StVO)',
    content: 'Người lái xe phải đảm bảo tầm nhìn thông suốt (gương sạch, kính không bị mờ hay đóng băng), biển số rõ ràng và xe có đầy đủ: Hộp sơ cứu Erste-Hilfe-Kasten còn hạn, Áo phản quang Warnweste và Tam giác cảnh báo Warndreieck.',
    takeaway: 'Bắt buộc mang theo trên xe: Hộp sơ cứu (còn hạn), Áo phản quang, Tam giác cảnh báo.'
  },
  'Zulassung zum Straßenverkehr,': {
    ruleName: 'Đăng ký xe, Đăng kiểm & Giấy phép lái xe (FeV & FZV)',
    content: 'Khi lái xe bắt buộc phải mang theo: Bằng lái xe (Führerschein) và Giấy đăng ký xe phần 1 (Zulassungsbescheinigung Teil I / Fahrzeugschein). Thay đổi địa chỉ hoặc kết cấu xe phải khai báo đăng ký lại.',
    takeaway: 'Bắt buộc mang theo: Bằng lái xe gốc + Giấy đăng ký xe Teil I (bản gốc).'
  },
  'Abmessungen und Gewichte': {
    ruleName: 'Quy chuẩn kích thước & Trọng tải phương tiện (StVZO)',
    content: 'Quy chuẩn kích thước xe con và xe tải: Chiều cao tối đa cho phép kể cả hàng hóa là 4,0m; chiều rộng tối đa thông thường là 2,55m. Xe chở quá tải hoặc quá khổ sẽ bị phạt nặng và cấm tiếp tục lưu hành.',
    takeaway: 'Chiều cao tối đa xe + hàng: 4,0m; Chiều rộng tối đa: 2,55m.'
  },
  'Schmier und Frostschutzmittel': {
    ruleName: 'Bảo dưỡng chất bôi trơn & Nước làm mát chống đông',
    content: 'Phải định kỳ kiểm tra mức dầu động cơ (giữa vạch Min và Max) và dung dịch chống đông nước làm mát trước mùa đông để tránh nứt vỡ lốc máy khi nhiệt độ xuống dưới 0°C.',
    takeaway: 'Kiểm tra dầu máy khi xe đỗ bằng phẳng và động cơ nguội; bổ sung nước làm mát chống đông.'
  },
  'Sorgfaltspflichten': {
    ruleName: 'Nghĩa vụ cẩn trọng khi tham gia giao thông (§ 1 StVO)',
    content: 'Trước khi mở cửa xe (Dooring): Phải quan sát kỹ phía sau (nên dùng tay phải mở cửa xe bên trái - "Dutch Reach") để không va chạm với người đi xe đạp đang chạy tới.',
    takeaway: 'Mở cửa xe: Luôn dùng tay xa cửa ngoái đầu nhìn phía sau tránh gạt ngã xe đạp (Dutch Reach).'
  },
  'Ermüdung, Ablenkung': {
    ruleName: 'Phòng ngừa mệt mỏi & Mất tập trung khi lái xe',
    content: 'Mất tập trung 1 giây ở tốc độ 100 km/h tương đương xe chạy mù gần 30 mét. Tuyệt đối không nhắn tin, chỉnh màn hình cảm ứng hoặc với đồ rơi khi đang điều khiển xe.',
    takeaway: '1 giây mất tập trung ở 100 km/h = Xe chạy mù gần 30 mét!'
  },
  'Benutzung von Fahrstreifen durch Kraftfahrzeuge': {
    ruleName: 'Quy định phân làn & Chuyển làn đường an toàn (§ 7 StVO)',
    content: 'Trong đô thị: Xe cơ giới dưới 3,5 tấn được phép tự do chọn làn đường trên các tuyến đường có nhiều làn cùng chiều. Ngoài đô thị: Bắt buộc phải đi làn bên phải (Rechtsfahrgebot).',
    takeaway: 'Trong phố xe <= 3,5T được tự do chọn làn; ngoài phố bắt buộc đi làn phải.'
  },
  'Wechsellichtzeichen und Dauerlichtzeichen': {
    ruleName: 'Hệ thống đèn tín hiệu giao thông (§ 37 StVO)',
    content: 'Đèn đỏ: Dừng trước vạch dừng. Đèn đỏ kết hợp vàng: Chuẩn bị xuất phát nhưng chưa được đi. Đèn xanh: Được phép đi khi đường phía trước thông suốt (nếu ngã tư bị tắc thì đèn xanh vẫn không được tiến vào).',
    takeaway: 'Đèn xanh mà ngã tư phía trước đang kẹt -> BẮT BUỘC dừng lại chờ, không tiến vào chắn ngã tư.'
  }
};

// 2. PHÂN TÍCH CÔNG THỨC TOÁN HỌC (FAUSTFORMEL CALCULATOR)
function calculateFormula(question) {
  const qDe = (question.question_de || '').toLowerCase();
  const qVn = (question.question_vn || '').toLowerCase();
  
  // Trích xuất vận tốc từ câu hỏi nếu có
  const speedMatch = qDe.match(/(\d+)\s*km\/h/i) || qVn.match(/(\d+)\s*km\/h/i);
  const speed = speedMatch ? parseInt(speedMatch[1], 10) : null;

  if (qDe.includes('gefahrbremsung') || qVn.includes('phanh khẩn cấp')) {
    if (speed) {
      const v10 = speed / 10;
      const normalB = v10 * v10;
      const hazardB = normalB / 2;
      return `Tốc độ V = ${speed} km/h:
• Đoạn đường phanh thường = (${speed}:10) x (${speed}:10) = ${normalB} mét.
• Phanh khẩn cấp đạp hết lực = ${normalB} : 2 = ${hazardB} mét.`;
    }
    return 'Phanh khẩn cấp (Gefahrbremsung): [(Vận tốc : 10) x (Vận tốc : 10)] : 2 (bằng một nửa phanh thường).';
  }

  if (qDe.includes('anhalteweg') || qVn.includes('dừng lại') || qVn.includes('dừng hẳn')) {
    if (speed) {
      const v10 = speed / 10;
      const react = v10 * 3;
      const brake = v10 * v10;
      const stop = react + brake;
      return `Tốc độ V = ${speed} km/h:
• Đoạn đường phản ứng (Reaktionsweg) = (${speed}:10) x 3 = ${react} mét.
• Đoạn đường phanh thường (Bremsweg) = (${speed}:10) x (${speed}:10) = ${brake} mét.
• Tổng quãng đường dừng xe (Anhalteweg) = ${react}m + ${brake}m = ${stop} mét.`;
    }
    return 'Tổng quãng đường dừng (Anhalteweg) = Đoạn đường phản ứng [(V:10)x3] + Đoạn đường phanh [(V:10)x(V:10)].';
  }

  if (qDe.includes('reaktionsweg') || qVn.includes('phản ứng')) {
    if (speed) {
      const v10 = speed / 10;
      const react = v10 * 3;
      return `Tốc độ V = ${speed} km/h:
• Đoạn đường xe chạy trong 1 giây phản ứng = (${speed}:10) x 3 = ${react} mét.`;
    }
    return 'Đoạn đường phản ứng (Reaktionsweg) = (Vận tốc : 10) x 3 mét.';
  }

  if (qDe.includes('bremsweg') || qVn.includes('đoạn đường phanh')) {
    if (speed) {
      const v10 = speed / 10;
      const brake = v10 * v10;
      return `Tốc độ V = ${speed} km/h:
• Đoạn đường phanh thường = (${speed}:10) x (${speed}:10) = ${brake} mét.`;
    }
    if (qDe.includes('verdoppeln') || qVn.includes('gấp đôi')) {
      return 'Vận tốc tăng gấp đôi (2x) -> Quãng đường phanh tăng GẤP 4 LẦN (2² = 4). Tỷ lệ thuận với bình phương vận tốc!';
    }
    return 'Đoạn đường phanh thường (Bremsweg) = (Vận tốc : 10) x (Vận tốc : 10) mét.';
  }

  if (qDe.includes('schmal') && (qDe.includes('sicht') || qDe.includes('50 m'))) {
    return 'Trên đoạn đường hẹp (schmale Straße): Quãng đường dừng xe phải nhỏ hơn hoặc bằng 1/2 tầm nhìn (50m : 2 = 25m) để cả hai xe đối đầu đều kịp dừng lại an toàn!';
  }

  return null;
}

// 3. SUY LUẬN LÝ DO PHƯƠNG ÁN ĐÚNG & BẪY PHƯƠNG ÁN SAI
function analyzeOption(opt, isCorrect, q) {
  const de = (opt.text_de || '').toLowerCase();
  const vn = (opt.text_vn || '').toLowerCase();

  if (isCorrect) {
    if (de.includes('verzögern') || de.includes('bremsbereit') || de.includes('anhalten') || de.includes('langsamer') || vn.includes('giảm tốc') || vn.includes('dừng lại')) {
      return 'Hành động chủ động giảm tốc độ hoặc rà phanh giúp tài xế kịp thời xử lý nguy hiểm và nhường quyền ưu tiên theo đúng quy định.';
    }
    if (de.includes('auf mein recht') || de.includes('nicht auf dem eigenen recht') || vn.includes('không cố chấp')) {
      return 'Lái xe phòng thủ đòi hỏi phải nhường nhịn, không khăng khăng ép người khác nhường mình để tránh va chạm.';
    }
    if (de.includes('schulterblick') || de.includes('spiegel') || de.includes('beobachten') || vn.includes('quan sát') || vn.includes('gương')) {
      return 'Quan sát gương và ngoái đầu kiểm tra điểm mù (Schulterblick) là thao tác bắt buộc để không bỏ sót người đi bộ hoặc xe đạp.';
    }
    if (de.includes('blinken') || vn.includes('xi nhan') || vn.includes('báo hiệu')) {
      return 'Bật xi-nhan sớm và rõ ràng giúp các phương tiện khác chủ động phán đoán hướng di chuyển của xe bạn.';
    }
    if (de.includes('abstand') || vn.includes('khoảng cách')) {
      return 'Giữ khoảng cách an toàn đủ rộng để có thời gian phản ứng khi xe phía trước bất ngờ phanh gấp.';
    }
    if (de.includes('warnblinker') || de.includes('warndreieck') || vn.includes('cảnh báo')) {
      return 'Cảnh báo nguy hiểm từ xa giúp bảo vệ hiện trường và tránh cho các xe đi sau đâm dồn đuôi.';
    }
    return 'Đây là hành vi đúng quy chuẩn an toàn giao thông đường bộ Đức, đảm bảo an toàn tối đa cho bản thân và người khác.';
  } else {
    // Sai (Bẫy)
    if (de.includes('beschleunigen') || de.includes('schneller') || vn.includes('tăng tốc') || vn.includes('nhanh hơn')) {
      return 'Sai lầm nguy hiểm: Tăng tốc trong tình huống này làm giảm thời gian phản ứng và dễ dẫn đến tai nạn thảm khốc.';
    }
    if (de.includes('auf mein recht bestehen') || de.includes('auf mein vorfahrt') || vn.includes('cố chấp')) {
      return 'Bẫy tâm lý: Cố chấp đòi quyền ưu tiên ("auf mein Recht bestehen") là nguyên nhân hàng đầu gây tai nạn tại các ngã tư.';
    }
    if (de.includes('hupen') || vn.includes('bấm còi')) {
      return 'Hành vi sai luật: Bấm còi bừa bãi có thể làm người đi bộ hoặc người đi xe đạp giật mình ngã ra đường.';
    }
    if (de.includes('ohne weiteres') || de.includes('einfach') || vn.includes('bỏ đi') || vn.includes('không cần')) {
      return 'Vi phạm pháp luật nghiêm trọng: Bỏ qua các bước bảo đảm an toàn hoặc rời hiện trường sẽ bị phạt rất nặng.';
    }
    if (de.includes('spurenwechsel') || de.includes('ausweichen') || vn.includes('đánh lái gấp')) {
      return 'Nguy cơ cao: Đột ngột đánh lái lách xe khi chưa kiểm tra gương và điểm mù dễ tạt đầu xe chạy song song.';
    }
    return 'Phương án này vi phạm quy tắc an toàn hoặc là bẫy nhận thức chủ quan thường gặp của người thi.';
  }
}

// 4. HÀM CHÍNH SINH GIẢI THÍCH CHO TỪNG CÂU HỎI
export function getQuestionExplanation(question) {
  if (!question) return null;

  const qDe = (question.question_de || '').toLowerCase();
  const qVn = (question.question_vn || '').toLowerCase();
  const topic = (question.topic || '').trim();
  const code = (question.code || '').trim();
  const prefix = code.split('-')[0];
  const isCrucial = question.points === 5;

  let ruleName = 'Quy tắc an toàn giao thông CHLB Đức (StVO)';
  let content = '';
  let keyTakeaway = '';

  // 1. Kiểm tra khớp theo mã danh mục BMVI trước, nếu chưa có thì kiểm tra theo chủ đề thi (Topic)
  if (CATALOG_REGISTRY[prefix]) {
    ruleName = CATALOG_REGISTRY[prefix].ruleName;
    content = CATALOG_REGISTRY[prefix].content;
    keyTakeaway = CATALOG_REGISTRY[prefix].takeaway;
  } else if (TOPIC_REGISTRY[topic]) {
    ruleName = TOPIC_REGISTRY[topic].ruleName;
    content = TOPIC_REGISTRY[topic].content;
    keyTakeaway = TOPIC_REGISTRY[topic].takeaway;
  }

  // 2. Kiểm tra các tình huống đặc biệt cụ thể (Specific Scenario Overrides)
  if (qDe.includes('kreisverkehr') || qVn.includes('vòng xuyến')) {
    ruleName = 'Quy tắc tại vòng xuyến (Kreisverkehr - § 8a StVO)';
    content = 'Quy chuẩn tại vòng xuyến có biển báo: (1) Xe đang chạy trong vòng xuyến có quyền ưu tiên, xe chuẩn bị vào phải nhường đường; (2) Khi ĐI VÀO vòng xuyến KHÔNG ĐƯỢC bật xi-nhan; (3) Bắt buộc bật xi-nhan phải khi CHUẨN BỊ RỜI KHỎI vòng xuyến; (4) Cấm dừng đỗ trên đảo xuyến.';
    keyTakeaway = 'Vào vòng xuyến: KHÔNG bật xi-nhan, nhường xe bên trong. Ra khỏi xuyến: BẮT BUỘC bật xi-nhan phải.';
  } else if (qDe.includes('reißverschluss') || qVn.includes('kéo khóa') || qVn.includes('phéc mơ tuya')) {
    ruleName = 'Quy tắc kéo khóa phéc-mơ-tuya (Reißverschlussverfahren - § 7 StVO)';
    content = 'Khi một làn đường kết thúc hoặc bị chặn: Xe ở làn bị chặn phải chạy tiếp đến sát điểm kết thúc làn đường rồi mới lần lượt xen kẽ nhập vào làn thông suốt. Các xe ở làn thông suốt có nghĩa vụ tạo khoảng trống cho từng xe một nhập làn.';
    keyTakeaway = 'Chạy đến sát điểm kết thúc làn mới lần lượt xen kẽ nhập làn; không chuyển làn quá sớm gây tắc nghẽn.';
  } else if (qDe.includes('rettungsgasse') || qVn.includes('làn cứu nạn') || qVn.includes('cứu hộ')) {
    ruleName = 'Tạo làn cứu nạn khẩn cấp khi tắc đường (Rettungsgasse - § 11 StVO)';
    content = 'Khi xe chạy chậm dần hoặc kẹt xe (Stau) trên đường cao tốc hoặc đường ngoài đô thị có từ 2 làn trở lên: Tất cả xe ở làn ngoài cùng bên trái phải ép sát sang trái; xe ở tất cả các làn còn lại ép sát sang phải để tạo khoảng trống ở giữa cho xe cấp cứu. Làn khẩn cấp bên phải (Seitenstreifen) không được dùng làm Rettungsgasse.';
    keyTakeaway = 'Xe làn trái ép sát trái, tất cả xe các làn khác ép sang phải để mở làn khẩn cấp ở giữa.';
  } else if (qDe.includes('grünpfeil') || qVn.includes('mũi tên xanh')) {
    ruleName = 'Biển phụ mũi tên xanh rẽ phải khi đèn đỏ (Grünpfeil - § 37 StVO)';
    content = 'Biển mũi tên xanh bằng kim loại gắn cạnh đèn đỏ cho phép bạn rẽ phải khi đèn đang đỏ. Tuy nhiên, quy tắc bắt buộc là: BẠN PHẢI DỪNG HẲN XE TẠI VẠCH DỪNG (Haltlinie) giống như biển STOP, quan sát người đi bộ qua đường và xe có quyền ưu tiên, khi thật an toàn mới được rẽ.';
    keyTakeaway = 'Gặp biển kim loại Grünpfeil: Bắt buộc dừng hẳn xe trước khi rẽ phải khi đèn đỏ (khác với đèn mũi tên xanh phát sáng).';
  } else if (qDe.includes('parkscheibe') || qVn.includes('đồng hồ đỗ xe')) {
    ruleName = 'Quy định sử dụng bảng đĩa đỗ xe (Parkscheibe - § 13 StVO)';
    content = 'Khi đỗ xe ở khu vực yêu cầu Parkscheibe: Tài xế phải chỉnh vạch mũi tên của đĩa đỗ xe chỉ vào vạch nửa giờ tiếp theo của thời điểm bắt đầu đỗ (Ví dụ: Đỗ lúc 10:05 thì chỉnh mũi tên vào 10:30; đỗ lúc 14:32 thì chỉnh vào 15:00). Không được phép quay lại vặn lại giờ.';
    keyTakeaway = 'Parkscheibe: Chỉnh mũi tên làm tròn lên mốc nửa giờ tiếp theo của thời điểm đỗ.';
  } else if (qDe.includes('aquaplaning') || qVn.includes('trượt nước')) {
    ruleName = 'Hiện tượng trượt nước trên mặt đường (Aquaplaning - § 3 StVO)';
    content = 'Hiện tượng Aquaplaning xảy ra khi rãnh gai lốp không thoát kịp nước ngập trên mặt đường khiến bánh xe bị tách rời mặt đường, nổi trên màng nước và mất hoàn toàn lái. Xử lý đúng: Nhả chân ga từ từ, giữ thẳng tay lái, tuyệt đối KHÔNG phanh gấp và KHÔNG đánh lái mạnh.';
    keyTakeaway = 'Gặp Aquaplaning -> Nhả ga, cắt côn (nếu số sàn), giữ thẳng tay lái; cấm phanh gấp hay giật lái!';
  } else if (qDe.includes('reaktionsweg') || qDe.includes('bremsweg') || qDe.includes('anhalteweg') || qDe.includes('faustformel')) {
    ruleName = 'Công thức tính phanh & Khoảng cách dừng xe (Faustformeln)';
    content = 'Các công thức tính nhẩm chuẩn của Luật Giao thông Đức: ' +
      'Đoạn đường phản ứng (Reaktionsweg) = (Vận tốc : 10) x 3. ' +
      'Đoạn đường phanh thường (Bremsweg) = (Vận tốc : 10) x (Vận tốc : 10). ' +
      'Đoạn đường phanh khẩn cấp (Gefahrbremsung) = [(Vận tốc : 10) x (Vận tốc : 10)] : 2. ' +
      'Tổng quãng đường dừng hẳn (Anhalteweg) = Quãng đường phản ứng + Quãng đường phanh.';
    keyTakeaway = 'Reaktionsweg = (V:10)x3; Bremsweg = (V:10)²; Phanh khẩn cấp = Bremsweg chia đôi.';
  }

  // Nếu content vẫn trống, bổ sung từ topic
  if (!content) {
    content = `Theo quy chuẩn sát hạch lái xe CHLB Đức đối với chuyên đề "${topic || 'Quy tắc an toàn'}": Người điều khiển phương tiện phải nắm vững quy tắc nhường đường, giữ khoảng cách và dự tính trước mọi yếu tố bất ngờ để đảm bảo an toàn tuyệt đối.`;
    keyTakeaway = 'Nắm chắc điều luật, quan sát kỹ tình huống và tuân thủ các quy tắc lái xe phòng thủ.';
  }

  // 3. Tính toán công thức toán học nếu có
  const formulaCalculation = calculateFormula(question);

  // 4. Phân tích chi tiết từng phương án đúng
  const correctBreakdown = (question.options || [])
    .filter(o => o.isCorrect)
    .map(o => ({
      de: o.text_de,
      vn: o.text_vn,
      reason: analyzeOption(o, true, question)
    }));

  // 5. Phân tích bẫy trong các phương án sai
  const trapBreakdown = (question.options || [])
    .filter(o => !o.isCorrect)
    .map(o => ({
      de: o.text_de,
      vn: o.text_vn,
      trap: analyzeOption(o, false, question)
    }));

  return {
    title: 'Tại sao đáp án này đúng?',
    ruleName,
    content,
    formulaCalculation,
    correctBreakdown,
    trapBreakdown,
    keyTakeaway,
    isCrucial
  };
}
