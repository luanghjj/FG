/**
 * Module sinh giải thích chi tiết cho từng câu hỏi lý thuyết bằng lái xe Đức (Klasse B)
 * Dựa trên Luật Giao Thông Đường Bộ CHLB Đức (StVO), quy chuẩn kỹ thuật và nguyên tắc lái xe an toàn.
 */

export function getQuestionExplanation(question) {
  if (!question) return null

  const qDe = (question.question_de || '').toLowerCase()
  const qVn = (question.question_vn || '').toLowerCase()
  const topic = (question.topic || '').toLowerCase()
  const category = (question.category_full || '').toLowerCase()
  const code = question.code || ''

  // Danh sách các đáp án đúng của câu này
  const correctOptions = (question.options || []).filter(o => o.isCorrect)
  const correctTextsVn = correctOptions.map(o => o.text_vn || o.text_de).join('; ')
  const correctTextsDe = correctOptions.map(o => o.text_de).join('; ')

  let explanation = {
    title: 'Tại sao đáp án này đúng?',
    ruleName: 'Quy tắc giao thông StVO Đức',
    content: '',
    keyTakeaway: ''
  }

  // 1. CÔNG THỨC TÍNH PHANH VÀ DỪNG XE (Bremsweg, Reaktionsweg, Anhalteweg)
  if (qDe.includes('faustformel') || qDe.includes('bremsweg') || qDe.includes('anhalteweg') || qDe.includes('reaktionsweg')) {
    explanation.ruleName = 'Công thức tính toán chuẩn StVO (Faustformeln)'
    if (qDe.includes('gefahrbremsung')) {
      explanation.content =
        'Khi phanh khẩn cấp (Gefahrbremsung), tài xế đạp hết lực phanh nên quãng đường phanh giảm đi một nửa so với phanh thường. ' +
        'Công thức chuẩn: [(Vận tốc : 10) x (Vận tốc : 10)] : 2. ' +
        'Ví dụ: Ở 50 km/h, phanh thường mất 25m, nhưng phanh khẩn cấp chỉ mất 12,5m.'
      explanation.keyTakeaway = 'Phanh khẩn cấp = Phanh thường chia 2 (Bremsweg / 2).'
    } else if (qDe.includes('reaktionsweg')) {
      explanation.content =
        'Đoạn đường phản ứng (Reaktionsweg) là quãng đường xe chạy trong khoảng 1 giây tài xế nhận biết nguy hiểm và chuyển chân sang bàn đạp phanh. ' +
        'Công thức tính nhẩm: (Vận tốc : 10) x 3. Ví dụ: Ở 50 km/h là (50:10) x 3 = 15 mét.'
      explanation.keyTakeaway = 'Reaktionsweg = (V : 10) x 3.'
    } else if (qDe.includes('anhalteweg')) {
      explanation.content =
        'Tổng quãng đường dừng xe (Anhalteweg) = Đoạn đường phản ứng + Đoạn đường phanh. ' +
        'Ví dụ ở 50 km/h: Phản ứng (15m) + Phanh thường (25m) = 40m dừng hẳn.'
      explanation.keyTakeaway = 'Anhalteweg = Reaktionsweg + Bremsweg.'
    } else {
      explanation.content =
        'Đoạn đường phanh thường (Bremsweg) tỷ lệ thuận với bình phương vận tốc: (Vận tốc : 10) x (Vận tốc : 10). ' +
        'LƯU Ý QUAN TRỌNG: Khi vận tốc tăng gấp đôi, quãng đường phanh tăng GẤP 4 LẦN (2² = 4).'
      explanation.keyTakeaway = 'Vận tốc gấp đôi -> Quãng đường phanh gấp 4 lần!'
    }
    return explanation
  }

  // 2. KHOẢNG CÁCH AN TOÀN (Abstand)
  if (topic.includes('abstand') || qDe.includes('abstand') || qVn.includes('khoảng cách')) {
    explanation.ruleName = 'Khoảng cách an toàn (§ 4 StVO)'
    explanation.content =
      'Theo luật Đức, ngoài đô thị khi điều kiện đường khô ráo, khoảng cách an toàn tối thiểu với xe đi trước phải bằng ít nhất một nửa số đo đồng hồ tốc độ (Quy tắc "Halber Tacho"). ' +
      'Ví dụ: Đang chạy 100 km/h thì phải giữ khoảng cách tối thiểu 50m (tương đương khoảng cách giữa 2 cọc tiêu Leitpfosten trên đường).'
    explanation.keyTakeaway = 'Khoảng cách ngoài phố = Vận tốc chia 2 (Halber Tacho) hoặc quy tắc 2 giây.'
    return explanation
  }

  // 3. THỨ TỰ ƯU TIÊN VÀ NHƯỜNG ĐƯỜNG (Vorfahrt, Vorrang, Kreuzung)
  if (topic.includes('vorfahrt') || topic.includes('abbiegen') || qDe.includes('vorfahrt') || qDe.includes('kreuzung') || qVn.includes('ngã tư') || qVn.includes('nhường đường')) {
    explanation.ruleName = 'Quy tắc nhường đường (§ 8 & § 9 StVO)'
    if (qDe.includes('polizei') || qVn.includes('cảnh sát')) {
      explanation.content =
        'Chỉ dẫn của cảnh sát có hiệu lực cao nhất trong mọi trường hợp, ghi đè cả đèn giao thông và biển báo. ' +
        'Quy tắc nhớ: Thấy Lưng hoặc Ngực cảnh sát = Dừng lại; Thấy Sườn hoặc Tay giang ngang = Được phép đi.'
      explanation.keyTakeaway = 'Cảnh sát đè Đèn, Đèn đè Biển báo, Biển báo đè Rechts vor Links.'
    } else if (qDe.includes('rechts vor links') || (!qDe.includes('zeichen') && !qDe.includes('ampel'))) {
      explanation.content =
        'Tại ngã tư không có đèn, không có biển báo và không có cảnh sát điều khiển, quy tắc "Rechts vor Links" (Phải trước, Trái sau) luôn có hiệu lực: ' +
        'Xe đến từ bên tay phải của bạn luôn được đi trước bạn. Khi bạn muốn rẽ trái, bạn phải nhường đường cho xe đi thẳng và xe rẽ phải đối diện.'
      explanation.keyTakeaway = 'Không biển báo -> Nhường xe bên phải (Rechts vor Links).'
    } else {
      explanation.content =
        'Tuân thủ theo thứ tự biển báo: Biển hình thoi viền vàng (đường ưu tiên) được đi trước; biển tam giác ngược viền đỏ phải nhường đường; ' +
        'biển bát giác STOP bắt buộc phải dừng hẳn bánh xe 3 giây tại vạch dừng (Haltlinie) rồi mới quan sát đi tiếp.'
      explanation.keyTakeaway = 'Nhìn kỹ biển ưu tiên và thứ tự rẽ: Đi thẳng -> Rẽ phải -> Rẽ trái đi cuối cùng.'
    }
    return explanation
  }

  // 4. VƯỢT XE (Überholen)
  if (topic.includes('überholen') || qDe.includes('überholen') || qVn.includes('vượt')) {
    explanation.ruleName = 'Quy tắc vượt xe an toàn (§ 5 StVO)'
    explanation.content =
      'Chỉ được phép vượt khi: (1) Tầm nhìn phía trước hoàn toàn thông suốt, (2) Xe của bạn có tốc độ cao hơn đáng kể so với xe bị vượt, ' +
      '(3) Không có biển cấm vượt (Zeichen 276) hoặc vạch liền (durchgezogene Linie), và (4) Giữ khoảng cách sườn xe tối thiểu 1,5m trong đô thị và 2,0m ngoài đô thị khi vượt người đi bộ/xe đạp.'
    explanation.keyTakeaway = 'Không vượt tại nơi khuất tầm nhìn, khúc cua, hoặc khi xe phía trước đang giảm tốc độ nhường vạch Zebrastreifen.'
    return explanation
  }

  // 5. RƯỢU BIA, CHẤT KÍCH THÍCH (Alkohol, Drogen, Medikamente)
  if (topic.includes('alkohol') || topic.includes('drogen') || qDe.includes('alkohol') || qVn.includes('rượu') || qVn.includes('cồn')) {
    explanation.ruleName = 'Nồng độ cồn và chất kích thích (§ 24a StVG)'
    explanation.content =
      'Đối với người đang trong thời gian thử thách (Probezeit) và người lái xe dưới 21 tuổi, luật quy định nồng độ cồn tuyệt đối là 0,0 ‰. ' +
      'Rượu bia làm giảm thị lực (hiệu ứng đường hầm Tunnelblick), ước tính sai khoảng cách và kéo dài đáng kể thời gian phản ứng.'
    explanation.keyTakeaway = 'Thời gian thử thách (Probezeit): 0,0 ‰ tuyệt đối. Không được uống dù chỉ một ngụm.'
    return explanation
  }

  // 6. DỪNG VÀ ĐỖ XE (Halten und Parken)
  if (topic.includes('halten') || topic.includes('parken') || qDe.includes('parken') || qDe.includes('halten') || qVn.includes('đỗ xe')) {
    explanation.ruleName = 'Quy định dừng đỗ xe (§ 12 StVO)'
    explanation.content =
      'Các khoảng cách cấm đỗ xe quan trọng: (1) Cách ngã tư/ngã ba tối thiểu 5m (hoặc 8m nếu có làn xe đạp song song), ' +
      '(2) Trước vạch người đi bộ qua đường (Zebrastreifen) tối thiểu 5m, (3) Trước và sau biển trạm dừng xe buýt (Haltestelle) tối thiểu 15m. ' +
      'Dừng xe (Halten) là việc dừng tự nguyện dưới 3 phút mà không rời khỏi xe.'
    explanation.keyTakeaway = '5m trước ngã tư & vạch Zebrastreifen; 15m quanh biển trạm xe buýt.'
    return explanation
  }

  // 7. TRẺ EM VÀ NGƯỜI ĐI BỘ (Fußgänger, Kinder, Radfahrer)
  if (topic.includes('fußgänger') || qDe.includes('kind') || qDe.includes('radfahr') || qVn.includes('trẻ em') || qVn.includes('người đi bộ')) {
    explanation.ruleName = 'Hành vi đối với người đi bộ và trẻ em (§ 3 & § 26 StVO)'
    explanation.content =
      'Trẻ em và người cao tuổi cần được bảo vệ đặc biệt. Trẻ em thường hành động theo cảm tính, tầm nhìn hạn chế và chưa nhận thức được tốc độ xe, ' +
      'có thể bất ngờ chạy băng qua đường hoặc quay đầu lại. Người lái xe bắt buộc phải giảm tốc độ tối đa và chuẩn bị sẵn sàng phanh (Bremsbereitschaft).'
    explanation.keyTakeaway = 'Thấy trẻ em hoặc người già -> Giảm tốc độ ngay và sẵn sàng rà phanh!'
    return explanation
  }

  // 8. ĐƯỜNG CAO TỐC (Autobahn, Kraftfahrstraße)
  if (topic.includes('autobahn') || qDe.includes('autobahn') || qVn.includes('cao tốc')) {
    explanation.ruleName = 'Quy tắc lái xe trên Autobahn (§ 18 StVO)'
    explanation.content =
      'Trên Autobahn: (1) Chỉ phương tiện có tốc độ thiết kế trên 60 km/h mới được phép đi vào, (2) Tốc độ khuyến nghị chung là 130 km/h (Richtgeschwindigkeit), ' +
      '(3) Nghiêm cấm quay đầu xe (Wenden), đi lùi (Rückwärtsfahren) hoặc dừng đỗ trên làn xe chạy và làn khẩn cấp (Seitenstreifen), ' +
      '(4) Bắt buộc tuân thủ nguyên tắc đi làn bên phải (Rechtsfahrgebot).'
    explanation.keyTakeaway = 'Cấm dừng, cấm quay đầu, cấm đi lùi trên toàn bộ đường cao tốc.'
    return explanation
  }

  // 9. BẢO VỆ MÔI TRƯỜNG & TIẾT KIỆM NHIÊN LIỆU (Umweltschutz)
  if (topic.includes('umwelt') || qDe.includes('umwelt') || qDe.includes('kraftstoff') || qVn.includes('môi trường') || qVn.includes('nhiên liệu')) {
    explanation.ruleName = 'Lái xe thân thiện môi trường & Tiết kiệm nhiên liệu'
    explanation.content =
      'Để giảm khí thải và tiết kiệm xăng: (1) Chuyển số sớm ở vòng tua thấp (dưới 2000 vòng/phút), ' +
      '(2) Tắt máy khi dừng chờ lâu trên 20-30 giây (ví dụ trước rào chắn tàu hỏa Bahnübergang), ' +
      '(3) Tháo giá chở đồ trên nóc xe (Dachgepäckträger) khi không sử dụng để giảm cản gió, ' +
      '(4) Duy trì áp suất lốp đúng tiêu chuẩn của nhà sản xuất.'
    explanation.keyTakeaway = 'Chuyển số sớm, tắt máy khi đỗ lâu, tháo giá nóc xe thừa để giảm tiêu hao nhiên liệu.'
    return explanation
  }

  // 10. KỸ THUẬT XE, LỐP XE, HỆ THỐNG PHANH (Technik, Reifen, Bremsen)
  if (topic.includes('technik') || topic.includes('reifen') || topic.includes('brems') || qDe.includes('profiltiefe') || qVn.includes('lốp')) {
    explanation.ruleName = 'Quy chuẩn an toàn kỹ thuật ô tô (StVZO)'
    explanation.content =
      'Theo luật giao thông Đức: Độ sâu gai lốp tối thiểu theo luật định là 1,6 mm trên toàn bộ chu vi bánh xe. ' +
      'Áp suất lốp phải kiểm tra định kỳ khi lốp đang nguội. Lốp xe quá mòn hoặc áp suất không chuẩn sẽ làm tăng đoạn đường phanh và dễ gây trượt nước (Aquaplaning).'
    explanation.keyTakeaway = 'Gai lốp tối thiểu 1,6 mm. Lốp mùa đông phải có biểu tượng ngọn núi tuyết (Alpine-Symbol).'
    return explanation
  }

  // 11. ĐIỀU KIỆN THỜI TIẾT, MƯA, SƯƠNG MÙ, BĂNG TUYẾT (Witterung, Nebel, Aquaplaning)
  if (topic.includes('witterung') || qDe.includes('nebel') || qDe.includes('aquaplaning') || qDe.includes('regen') || qVn.includes('sương mù') || qVn.includes('mưa')) {
    explanation.ruleName = 'Lái xe trong điều kiện thời tiết khắc nghiệt (§ 3 StVO)'
    explanation.content =
      'Khi trời sương mù hoặc mưa tuyết tầm nhìn dưới 50m: Tốc độ tối đa được phép chạy là 50 km/h (kể cả trên Autobahn), ' +
      'và chỉ khi tầm nhìn dưới 50m mới được bật đèn sương mù sau (Nebelschlussleuchte). ' +
      'Khi gặp hiện tượng trượt nước (Aquaplaning): Nhả ga từ từ, không được phanh gấp và không đánh lái mạnh.'
    explanation.keyTakeaway = 'Tầm nhìn < 50m -> Chạy tối đa 50 km/h. Khi Aquaplaning -> Nhả ga, giữ thẳng lái.'
    return explanation
  }

  // 12. NGUYÊN TẮC LÁI XE PHÒNG THỦ & AN TOÀN (Gefahrenlehre, Defensives Fahren)
  explanation.ruleName = 'Nguyên tắc vàng của lái xe an toàn (§ 1 StVO)'
  explanation.content =
    `Theo Điều 1 Luật Giao Thông Đường Bộ Đức (StVO): Việc tham gia giao thông đòi hỏi sự thận trọng liên tục và tôn trọng lẫn nhau. ` +
    `Phương án đúng: "${correctTextsVn}". ` +
    `Bạn không bao giờ được cố chấp theo luật (không "auf mein Recht bestehen") mà luôn phải sẵn sàng rà phanh, nhường nhịn và dự đoán trước sai sót của người khác.`
  explanation.keyTakeaway = 'Luôn lái xe phòng thủ, sẵn sàng phanh và tôn trọng mọi người trên đường.'

  return explanation
}
