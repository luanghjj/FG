/**
 * Bộ 41 hiệu lệnh thường gặp của giám khảo DEKRA & TÜV trong kỳ thi thực hành lái xe tại Đức
 * Kèm 7 thao tác kết thúc bài thi, 7 chủ đề kiểm tra kỹ thuật (Abfahrkontrolle) và lời khuyên thực chiến.
 */

export const PRACTICAL_GROUPS = [
  {
    id: 'start',
    number: 1,
    title: 'Lời giám khảo nói khi bắt đầu bài thi',
    titleDe: 'Zu Beginn der Prüfung',
    icon: 'navigation',
    commands: [
      {
        id: 1,
        de: 'Ich sage Ihnen die Fahrtrichtung an. Wenn ich nichts sage, fahren Sie bitte geradeaus weiter.',
        vi: 'Tôi sẽ thông báo hướng đi cho bạn. Nếu tôi không nói gì, vui lòng tiếp tục đi thẳng.',
        action: 'straight',
        keywords: ['Fahrtrichtung', 'geradeaus weiter'],
      },
      {
        id: 2,
        de: 'Wenn ein Verkehrszeichen ein Rechtsabbiegen oder Linksabbiegen anordnet, biegen Sie bitte selbstständig ab.',
        vi: 'Nếu biển báo giao thông bắt buộc rẽ phải hoặc rẽ trái, bạn hãy tự thực hiện theo biển báo mà không cần chờ giám khảo nhắc.',
        action: 'rule',
        keywords: ['Verkehrszeichen', 'selbstständig'],
      },
      {
        id: 3,
        de: 'Wenn es geradeaus nicht weitergeht und Sie sowohl rechts als auch links abbiegen können, fragen Sie mich bitte kurz: „Rechts oder links?“',
        vi: 'Nếu không thể tiếp tục đi thẳng và có thể rẽ phải hoặc rẽ trái, hãy hỏi ngắn gọn giám khảo: “Rẽ phải hay rẽ trái?”',
        action: 'ask',
        keywords: ['Rechts oder links?'],
      },
    ],
  },
  {
    id: 'turns',
    number: 2,
    title: 'Rẽ phải, rẽ trái và đi thẳng',
    titleDe: 'Abbiegen & Geradeaus',
    icon: 'arrows',
    commands: [
      {
        id: 4,
        de: 'Rechts abbiegen, bitte.',
        vi: 'Vui lòng rẽ phải.',
        action: 'turn-right',
        keywords: ['Rechts abbiegen'],
      },
      {
        id: 5,
        de: 'Links abbiegen, bitte.',
        vi: 'Vui lòng rẽ trái.',
        action: 'turn-left',
        keywords: ['Links abbiegen'],
      },
      {
        id: 6,
        de: 'Nächste Straße rechts abbiegen, bitte.',
        vi: 'Đến đường tiếp theo, vui lòng rẽ phải.',
        action: 'turn-right',
        keywords: ['Nächste Straße', 'rechts'],
      },
      {
        id: 7,
        de: 'Nächste Straße links abbiegen, bitte.',
        vi: 'Đến đường tiếp theo, vui lòng rẽ trái.',
        action: 'turn-left',
        keywords: ['Nächste Straße', 'links'],
      },
      {
        id: 8,
        de: 'Wir fahren bitte geradeaus weiter.',
        vi: 'Chúng ta tiếp tục đi thẳng.',
        action: 'straight',
        keywords: ['geradeaus weiter'],
      },
    ],
  },
  {
    id: 'traffic-lights',
    number: 3,
    title: 'Rẽ tại đèn giao thông',
    titleDe: 'An der Ampel abbiegen',
    icon: 'ampel',
    commands: [
      {
        id: 9,
        de: 'Nächste Ampel rechts abbiegen, bitte.',
        vi: 'Đến đèn giao thông tiếp theo, vui lòng rẽ phải.',
        action: 'turn-right',
        keywords: ['Nächste Ampel', 'rechts'],
      },
      {
        id: 10,
        de: 'Nächste Ampel links abbiegen, bitte.',
        vi: 'Đến đèn giao thông tiếp theo, vui lòng rẽ trái.',
        action: 'turn-left',
        keywords: ['Nächste Ampel', 'links'],
      },
      {
        id: 11,
        de: 'Zweite Ampel rechts abbiegen, bitte.',
        vi: 'Đến đèn giao thông thứ hai, vui lòng rẽ phải.',
        action: 'turn-right',
        keywords: ['Zweite Ampel', 'rechts'],
      },
      {
        id: 12,
        de: 'Zweite Ampel links abbiegen, bitte.',
        vi: 'Đến đèn giao thông thứ hai, vui lòng rẽ trái.',
        action: 'turn-left',
        keywords: ['Zweite Ampel', 'links'],
      },
      {
        id: 13,
        de: 'Dritte Ampel rechts abbiegen, bitte.',
        vi: 'Đến đèn giao thông thứ ba, vui lòng rẽ phải.',
        action: 'turn-right',
        keywords: ['Dritte Ampel', 'rechts'],
      },
      {
        id: 14,
        de: 'Dritte Ampel links abbiegen, bitte.',
        vi: 'Đến đèn giao thông thứ ba, vui lòng rẽ trái.',
        action: 'turn-left',
        keywords: ['Dritte Ampel', 'links'],
      },
    ],
    callout: {
      type: 'tip',
      title: 'Hãy ghi nhớ thứ tự đèn giao thông',
      ordinals: [
        { de: 'Erste', num: '1', vi: 'Thứ nhất' },
        { de: 'Zweite', num: '2', vi: 'Thứ hai' },
        { de: 'Dritte', num: '3', vi: 'Thứ ba' },
      ],
      points: [
        'Giám khảo có thể thông báo sớm hướng rẽ tại đèn giao thông thứ hai hoặc thứ ba để bạn có đủ thời gian quan sát, chuyển làn và đi vào đúng làn đường.',
        'Không được đợi đến sát ngã tư mới đột ngột chuyển làn!',
      ],
    },
  },
  {
    id: 'priority-road',
    number: 4,
    title: 'Đường ưu tiên đổi hướng',
    titleDe: 'Vorfahrtsstraße',
    icon: 'priority',
    commands: [
      {
        id: 15,
        de: 'Wir verlassen die Vorfahrtsstraße.',
        vi: 'Chúng ta sẽ rời khỏi đường ưu tiên.',
        action: 'priority',
        keywords: ['verlassen', 'Vorfahrtsstraße'],
      },
      {
        id: 16,
        de: 'Wir bleiben auf der Vorfahrtsstraße.',
        vi: 'Chúng ta tiếp tục đi theo đường ưu tiên.',
        action: 'priority',
        keywords: ['bleiben', 'Vorfahrtsstraße'],
      },
      {
        id: 17,
        de: 'Bitte der Vorfahrtsstraße folgen.',
        vi: 'Vui lòng đi theo hướng của đường ưu tiên.',
        action: 'priority',
        keywords: ['Vorfahrtsstraße folgen'],
      },
    ],
    callout: {
      type: 'warn',
      title: 'Lưu ý tự quan sát hướng đường ưu tiên',
      points: [
        'Giám khảo không nhất thiết nói cho các bạn biết đường ưu tiên đổi hướng sang trái hay sang phải. Các bạn phải tự quan sát biển báo, nhận biết hướng đi và sử dụng đèn xi nhan đúng quy định.',
      ],
    },
  },
  {
    id: 'moeglichkeit',
    number: 5,
    title: 'Từ đặc biệt quan trọng: „Möglichkeit“',
    titleDe: 'Nächste Möglichkeit',
    icon: 'alert',
    commands: [
      {
        id: 18,
        de: 'Nächste Möglichkeit links abbiegen.',
        vi: 'Rẽ trái tại vị trí tiếp theo được phép rẽ trái.',
        action: 'turn-left',
        keywords: ['Nächste Möglichkeit', 'links'],
      },
      {
        id: 19,
        de: 'Nächste Möglichkeit rechts abbiegen.',
        vi: 'Rẽ phải tại vị trí tiếp theo được phép rẽ phải.',
        action: 'turn-right',
        keywords: ['Nächste Möglichkeit', 'rechts'],
      },
    ],
    callout: {
      type: 'warn',
      title: 'Chú ý đặc biệt với từ „Möglichkeit“!',
      points: [
        'Khi giám khảo sử dụng từ „Möglichkeit“, các bạn phải đặc biệt chú ý đến biển báo giao thông.',
        'Ví dụ: Giám khảo yêu cầu rẽ trái tại vị trí tiếp theo được phép rẽ trái. Nhưng ở ngã tư tiếp theo có biển báo bắt buộc đi thẳng hoặc biển cấm rẽ trái. Lúc này bạn KHÔNG được rẽ trái — hãy tiếp tục đi thẳng và rẽ tại vị trí tiếp theo được phép rẽ, khi bảo đảm an toàn.',
        'Quan trọng: Từ „Möglichkeit“ không có nghĩa là ngã tư tiếp theo chắc chắn bị cấm rẽ. Các bạn phải tự quan sát và quyết định đúng.',
      ],
    },
  },
  {
    id: 'lane-autobahn',
    number: 6,
    title: 'Chuyển làn đường và đường cao tốc',
    titleDe: 'Fahrstreifen & Autobahn',
    icon: 'highway',
    commands: [
      {
        id: 20,
        de: 'Einmal den Fahrstreifen bitte nach links wechseln.',
        vi: 'Vui lòng chuyển một làn đường sang bên trái.',
        action: 'turn-left',
        keywords: ['Fahrstreifen', 'nach links wechseln'],
      },
      {
        id: 21,
        de: 'Einmal den Fahrstreifen bitte nach rechts wechseln.',
        vi: 'Vui lòng chuyển một làn đường sang bên phải.',
        action: 'turn-right',
        keywords: ['Fahrstreifen', 'nach rechts wechseln'],
      },
      {
        id: 22,
        de: 'Wir fahren bitte auf die Autobahn.',
        vi: 'Chúng ta sẽ đi vào đường cao tốc.',
        action: 'highway',
        keywords: ['auf die Autobahn'],
      },
      {
        id: 23,
        de: 'Wir verlassen die Autobahn an der nächsten Ausfahrt.',
        vi: 'Chúng ta sẽ ra khỏi đường cao tốc tại lối ra tiếp theo.',
        action: 'highway',
        keywords: ['verlassen', 'nächsten Ausfahrt'],
      },
    ],
  },
  {
    id: 'roundabout',
    number: 7,
    title: 'Vòng xuyến',
    titleDe: 'Kreisverkehr',
    icon: 'roundabout',
    commands: [
      {
        id: 24,
        de: 'Bitte verlassen Sie den Kreisverkehr an der ersten Ausfahrt.',
        vi: 'Vui lòng ra khỏi vòng xuyến tại lối ra thứ nhất.',
        action: 'roundabout',
        keywords: ['Kreisverkehr', 'ersten Ausfahrt'],
      },
      {
        id: 25,
        de: 'Bitte verlassen Sie den Kreisverkehr an der zweiten Ausfahrt.',
        vi: 'Vui lòng ra khỏi vòng xuyến tại lối ra thứ hai.',
        action: 'roundabout',
        keywords: ['Kreisverkehr', 'zweiten Ausfahrt'],
      },
      {
        id: 26,
        de: 'Bitte verlassen Sie den Kreisverkehr an der dritten Ausfahrt.',
        vi: 'Vui lòng ra khỏi vòng xuyến tại lối ra thứ ba.',
        action: 'roundabout',
        keywords: ['Kreisverkehr', 'dritten Ausfahrt'],
      },
    ],
    callout: {
      type: 'tip',
      title: 'Kinh nghiệm đi vòng xuyến an toàn',
      points: [
        'Hãy đếm chính xác các lối ra của vòng xuyến. Khi chuẩn bị ra khỏi vòng xuyến, phải bật xi nhan phải đúng lúc và chú ý người đi bộ, người đi xe đạp.',
      ],
    },
  },
  {
    id: 'uturn',
    number: 8,
    title: 'Quay đầu xe',
    titleDe: 'Umkehren',
    icon: 'uturn',
    commands: [
      {
        id: 27,
        de: 'Wir wollen bitte umkehren.',
        vi: 'Chúng ta sẽ quay đầu xe.',
        action: 'uturn',
        keywords: ['umkehren'],
      },
      {
        id: 28,
        de: 'Suchen Sie sich bitte eine geeignete Möglichkeit zum Umkehren.',
        vi: 'Vui lòng tự tìm một vị trí thích hợp để quay đầu xe.',
        action: 'uturn',
        keywords: ['geeignete Möglichkeit zum Umkehren'],
      },
    ],
    callout: {
      type: 'warn',
      title: 'Lưu ý khi quay đầu xe',
      points: [
        'Các bạn phải tự tìm vị trí được phép quay đầu và bảo đảm an toàn. Giám khảo không nhất thiết chỉ cho các bạn vị trí quay đầu.',
      ],
    },
  },
  {
    id: 'parking',
    number: 9,
    title: 'Đỗ xe và lùi xe',
    titleDe: 'Einparken & Rückwärtsfahren',
    icon: 'parking',
    commands: [
      {
        id: 29,
        de: 'Wir suchen bitte einen Parkplatz.',
        vi: 'Chúng ta sẽ tìm một chỗ đỗ xe.',
        action: 'parking',
        keywords: ['Parkplatz'],
      },
      {
        id: 30,
        de: 'Suchen Sie sich bitte eine geeignete Parkmöglichkeit.',
        vi: 'Vui lòng tự tìm một vị trí đỗ xe thích hợp.',
        action: 'parking',
        keywords: ['Parkmöglichkeit'],
      },
      {
        id: 31,
        de: 'Wir wollen bitte rückwärts längs einparken.',
        vi: 'Chúng ta sẽ lùi xe vào chỗ đỗ song song với lề đường.',
        action: 'parking',
        keywords: ['rückwärts längs einparken'],
      },
      {
        id: 32,
        de: 'Wir wollen bitte rückwärts quer einparken.',
        vi: 'Chúng ta sẽ lùi xe vào chỗ đỗ vuông góc với lề đường.',
        action: 'parking',
        keywords: ['rückwärts quer einparken'],
      },
      {
        id: 33,
        de: 'Bitte fahren Sie rückwärts um die Ecke in eine Seitenstraße.',
        vi: 'Vui lòng lùi xe vòng qua góc đường vào một con đường nhánh.',
        action: 'parking',
        keywords: ['rückwärts um die Ecke', 'Seitenstraße'],
      },
    ],
    callout: {
      type: 'tip',
      title: 'An toàn quan trọng hơn tốc độ',
      points: [
        'Trong khi lùi xe và đỗ xe, phải liên tục quan sát xung quanh, đặc biệt là điểm mù, người đi bộ, người đi xe đạp và các phương tiện khác.',
        'An toàn luôn quan trọng hơn tốc độ thực hiện bài thi.',
      ],
    },
  },
  {
    id: 'emergency-brake',
    number: 10,
    title: 'Bài thi phanh khẩn cấp',
    titleDe: 'Gefahrenbremsung',
    icon: 'brake',
    commands: [
      {
        id: 34,
        de: 'Wir machen jetzt die Grundfahraufgabe Gefahrenbremsung.',
        vi: 'Bây giờ chúng ta sẽ thực hiện bài thi kỹ năng cơ bản: phanh khẩn cấp.',
        action: 'brake',
        keywords: ['Grundfahraufgabe', 'Gefahrenbremsung'],
      },
      {
        id: 35,
        de: 'Die Anweisung kommt von Ihrem Fahrlehrer.',
        vi: 'Hiệu lệnh sẽ do giáo viên dạy lái xe của bạn đưa ra.',
        action: 'brake',
        keywords: ['Anweisung', 'Fahrlehrer'],
      },
      {
        id: 36,
        de: 'Gefahrenbremsung!',
        vi: 'Phanh khẩn cấp!',
        action: 'brake',
        keywords: ['Gefahrenbremsung'],
      },
      {
        id: 37,
        de: 'Das haben Sie sehr gut gemacht.',
        vi: 'Bạn đã thực hiện rất tốt.',
        action: 'ok',
        keywords: ['sehr gut gemacht'],
      },
      {
        id: 38,
        de: 'Wir fahren bitte weiter.',
        vi: 'Chúng ta tiếp tục lái xe.',
        action: 'straight',
        keywords: ['fahren bitte weiter'],
      },
    ],
  },
  {
    id: 'finish',
    number: 11,
    title: 'Dừng xe và kết thúc bài thi',
    titleDe: 'Anhalten & Prüfungsende',
    icon: 'finish',
    commands: [
      {
        id: 39,
        de: 'Bitte rechts anhalten.',
        vi: 'Vui lòng dừng xe bên phải.',
        action: 'stop',
        keywords: ['rechts anhalten'],
      },
      {
        id: 40,
        de: 'Fahrzeug bitte parkfertig abstellen.',
        vi: 'Vui lòng đỗ xe và thực hiện đầy đủ các thao tác để bảo đảm xe an toàn.',
        action: 'stop',
        keywords: ['parkfertig abstellen'],
      },
      {
        id: 41,
        de: 'Steigen Sie bitte aus.',
        vi: 'Vui lòng ra khỏi xe.',
        action: 'stop',
        keywords: ['Steigen Sie bitte aus'],
      },
    ],
  },
]

export const PRACTICAL_ALL_COMMANDS = PRACTICAL_GROUPS.flatMap((group) =>
  group.commands.map((cmd) => ({
    ...cmd,
    groupId: group.id,
    groupNumber: group.number,
    groupTitle: group.title,
    groupTitleDe: group.titleDe,
  }))
)

export const FINISH_STEPS = [
  {
    step: 1,
    title: 'Đạp phanh & về số P',
    deHint: 'Bremse treten & Wählhebel auf P (Automatik)',
    detail: 'Đạp phanh và chuyển cần số tự động về vị trí P.',
  },
  {
    step: 2,
    title: 'Kích hoạt phanh đỗ xe',
    deHint: 'Feststellbremse / Handbremse anziehen',
    detail: 'Kích hoạt phanh đỗ xe để bảo đảm xe không bị tự trôi.',
  },
  {
    step: 3,
    title: 'Tắt động cơ & rút chìa khóa',
    deHint: 'Motor abstellen & Zündschlüssel abziehen',
    detail: 'Tắt động cơ. Nếu xe sử dụng chìa khóa cơ, xoay chìa khóa về vị trí tắt và rút chìa khóa ra.',
  },
  {
    step: 4,
    title: 'Khóa vô lăng (nếu phù hợp)',
    deHint: 'Lenkradschloss einrasten lassen',
    detail: 'Khóa vô lăng nếu xe có chức năng này và thao tác đó phù hợp với loại xe.',
  },
  {
    step: 5,
    title: 'Mở cửa bằng tay phải (Holländischer Griff)',
    deHint: 'Mit der rechten Hand den Türgriff fassen',
    detail: 'Khi giám khảo yêu cầu ra khỏi xe, dùng tay phải cầm tay nắm cửa bên người lái.',
  },
  {
    step: 6,
    title: 'Quan sát qua vai trái (Schulterblick)',
    deHint: 'Schulterblick nach links hinten',
    detail: 'Xoay đầu và phần thân trên sang bên trái, quan sát phía sau qua vai trái để kiểm tra xe đạp, xe máy và các phương tiện khác.',
  },
  {
    step: 7,
    title: 'Chỉ mở cửa khi chắc chắn an toàn',
    deHint: 'Tür erst öffnen, wenn alles frei ist',
    detail: 'Chỉ mở cửa và bước ra ngoài khi đã chắc chắn an toàn.',
  },
]

export const FINISH_WARNINGS = [
  'Không được mở cửa bất ngờ khi có xe đạp, xe máy hoặc phương tiện khác đang đi tới.',
  'Đối với xe sử dụng nút Start/Stop và chìa khóa thông minh, thao tác tắt xe và khóa vô lăng có thể khác với xe sử dụng chìa khóa cơ.',
]

export const ABFAHRKONTROLLE_TOPICS = [
  {
    id: 'tires',
    title: 'Lốp xe và độ sâu gai lốp',
    de: 'Reifen und Profiltiefe',
    speakDe: 'Bitte prüfen Sie die Reifen und die Profiltiefe.',
    summary: 'Kiểm tra tình trạng lốp không bị phồng/nứt và rãnh gai lốp đạt chuẩn luật định.',
    checks: [
      'Độ sâu gai lốp tối thiểu theo luật: 1,6 mm (mùa đông khuyến nghị từ 4 mm).',
      'Quan sát thành lốp không nứt, rách, phồng rộp hoặc dính đinh.',
      'Kiểm tra áp suất lốp đúng thông số (xem tem ở khung cửa lái hoặc nắp bình xăng).',
    ],
  },
  {
    id: 'lights',
    title: 'Đèn chiếu sáng và đèn tín hiệu',
    de: 'Beleuchtung und Blinker',
    speakDe: 'Bitte zeigen Sie mir die Beleuchtung und den Blinker.',
    summary: 'Biết vị trí bật/tắt và nhận biết đèn báo trên bảng đồng hồ táp-lô.',
    checks: [
      'Đèn định vị (Standlicht), đèn chiếu gần (Abblendlicht), đèn chiếu xa (Fernlicht).',
      'Đèn xi nhan trái/phải (Blinker) và đèn cảnh báo nguy hiểm (Warnblinkanlage).',
      'Đèn sương mù sau (Nebelschlussleuchte — chỉ bật khi tầm nhìn dưới 50m) & đèn phanh (Bremslicht).',
    ],
  },
  {
    id: 'oil',
    title: 'Dầu động cơ',
    de: 'Motoröl',
    speakDe: 'Wo prüfen Sie den Motorölstand?',
    summary: 'Biết vị trí nắp châm dầu, que thăm dầu (Ölmessstab) trong khoang máy và cách đo chuẩn.',
    checks: [
      'Đỗ xe trên mặt phẳng, tắt máy và chờ động cơ nguội bớt.',
      'Rút que thăm dầu lau sạch, cắm lại hết cỡ rồi rút ra xem mức dầu phải nằm giữa vạch Min và Max.',
    ],
  },
  {
    id: 'coolant',
    title: 'Nước làm mát',
    de: 'Kühlmittel',
    speakDe: 'Wo befindet sich der Behälter für das Kühlmittel?',
    summary: 'Nhận biết bình giãn nở nước làm mát (Kühlmittelausgleichsbehälter) bằng mắt thường.',
    checks: [
      'Mức nước khi máy nguội phải nằm giữa vạch Min và Max bên thành bình trong suốt.',
      'Tuyệt đối KHÔNG mở nắp bình khi động cơ đang nóng (nguy cơ bỏng do áp suất cao).',
    ],
  },
  {
    id: 'brake-fluid',
    title: 'Dầu phanh',
    de: 'Bremsflüssigkeit',
    speakDe: 'Wo kontrollieren Sie die Bremsflüssigkeit?',
    summary: 'Kiểm tra bình chứa dầu phanh nằm gần vách khoang máy và cảnh báo khi tụt mức.',
    checks: [
      'Mức dầu phải nằm giữa Min và Max; không tự châm bừa nếu tụt thấp bất thường.',
      'Nếu mức dầu xuống dưới Min hoặc đèn báo phanh sáng → đưa xe đến xưởng kiểm tra rò rỉ hoặc mòn má phanh.',
    ],
  },
  {
    id: 'washer',
    title: 'Nước rửa kính',
    de: 'Scheibenwaschanlage',
    speakDe: 'Wo füllen Sie das Scheibenwaschwasser nach?',
    summary: 'Nhận biết nắp màu xanh có biểu tượng kính chắn gió và vòi phun nước.',
    checks: [
      'Mở nắp nhựa màu xanh có biểu tượng tia nước xịt lên kính chắn gió.',
      'Châm nước sạch pha dung dịch rửa kính; mùa đông phải pha thêm chất chống đông (Frostschutz).',
    ],
  },
  {
    id: 'controls',
    title: 'Các bộ phận điều khiển quan trọng trong xe',
    de: 'Wichtige Bedienelemente',
    speakDe: 'Bitte erklären Sie die wichtigen Bedienelemente im Fahrzeug.',
    summary: 'Thao tác thuần thục còi xe, gạt mưa, sưởi kính chắn gió/kính hậu và chỉnh gương/ghế.',
    checks: [
      'Điều chỉnh ghế ngồi, tựa đầu, vô lăng, gương chiếu hậu trong & ngoài trước khi nổ máy.',
      'Cần gạt mưa trước/sau (Scheibenwischer), nút sưởi kính trước/sau (Heckscheibenheizung), nút sưởi/chỉnh gương.',
      'Còi xe (Hupe) và đèn cảnh báo nguy hiểm (Warnblinkanlage).',
    ],
  },
]

export const INSTRUCTOR_ADVICE = {
  author: 'Fahrlehrer Bülent',
  org: 'DEKRA & TÜV',
  pillars: [
    { key: 'schauen', vi: 'QUAN SÁT', de: 'Schauen' },
    { key: 'denken', vi: 'SUY NGHĨ', de: 'Denken' },
    { key: 'handeln', vi: 'HÀNH ĐỘNG', de: 'Handeln' },
  ],
  notes: [
    'Các bạn hãy học thuộc những hiệu lệnh tiếng Đức này ngay trong các buổi học lái xe. Đừng đợi đến ngày thi mới bắt đầu học!',
    'Giám khảo hướng dẫn đường đi, nhưng chính các bạn phải tự quan sát biển báo, tuân thủ luật giao thông và đưa ra quyết định an toàn.',
    'Trước kỳ thi, hãy chuẩn bị kỹ 3 câu hỏi hoặc yêu cầu kiểm tra kỹ thuật (Abfahrkontrolle) và luyện tập trực tiếp trên xe học lái.',
  ],
}
