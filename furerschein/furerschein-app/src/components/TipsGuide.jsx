import { useState } from 'react'
import { Sparkles, Calculator, AlertTriangle, CheckCircle2, XCircle, Gauge, ArrowRight, ShieldAlert, Award, Compass, Car } from 'lucide-react'

export default function TipsGuide({ onNavigate }) {
  const [speed, setSpeed] = useState(50)

  // Calculate formulas based on current slider speed
  const v = speed
  const reaktion = Math.round((v / 10) * 3)
  const bremsen = Math.round((v / 10) * (v / 10))
  const gefahrBremsen = Math.round(bremsen / 2)
  const anhalten = reaktion + bremsen
  const anhaltenGefahr = reaktion + gefahrBremsen

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Kinh nghiệm & Bí kíp thi đỗ 100%</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            5 Bộ Mẹo Vàng Thi Lý Thuyết Đức
          </h1>
          <p className="text-orange-100 text-sm sm:text-base mt-2 leading-relaxed">
            Tổng hợp các quy tắc cốt lõi, từ khóa nhận diện đáp án, công thức tính nhẩm nhanh và chiến thuật ôn thi chuẩn TÜV / DEKRA.
          </p>
        </div>
      </div>

      {/* MẸO 1: TỪ KHÓA SIGNALWÖRTER */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 font-extrabold flex items-center justify-center text-lg">
            1
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Mẹo Từ Khóa Nhận Diện Đáp Án (Signalwörter)
            </h2>
            <p className="text-xs text-gray-500">Nhìn nhanh các cụm từ này là biết ngay khả năng ĐÚNG hay SAI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cụm từ SAI */}
          <div className="bg-red-50/60 border border-red-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
              <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>GẦN NHƯ 100% LÀ ĐÁP ÁN SAI (Falsch)</span>
            </div>
            <p className="text-xs text-red-700 leading-relaxed">
              Luật Đức bắt buộc lái xe phòng thủ (<em>defensives Fahren</em>). Mọi hành vi cố chấp giành quyền hay chủ quan đều là đáp án sai:
            </p>
            <ul className="space-y-2 text-xs text-gray-800 font-medium">
              <li className="p-2 bg-white rounded-xl border border-red-200 flex flex-col">
                <strong className="text-red-700 font-bold">auf mein Recht bestehen</strong>
                <span className="text-gray-600 text-[11px]">Cố chấp theo luật / đòi giành quyền ưu tiên</span>
              </li>
              <li className="p-2 bg-white rounded-xl border border-red-200 flex flex-col">
                <strong className="text-red-700 font-bold">ohne weiteres</strong>
                <span className="text-gray-600 text-[11px]">Cứ thế đi tiếp / không cần quan sát</span>
              </li>
              <li className="p-2 bg-white rounded-xl border border-red-200 flex flex-col">
                <strong className="text-red-700 font-bold">hupen (để hối thúc, đòi vượt)</strong>
                <span className="text-gray-600 text-[11px]">Bấm còi hối thúc người khác (Đức cấm bấm còi bừa bãi)</span>
              </li>
              <li className="p-2 bg-white rounded-xl border border-red-200 flex flex-col">
                <strong className="text-red-700 font-bold">beschleunigen (khi nghi ngờ)</strong>
                <span className="text-gray-600 text-[11px]">Nhấn ga tăng tốc khi có tình huống không rõ ràng</span>
              </li>
              <li className="p-2 bg-white rounded-xl border border-red-200 flex flex-col">
                <strong className="text-red-700 font-bold">immer... / nie / niemals...</strong>
                <span className="text-gray-600 text-[11px]">Khẳng định tuyệt đối (Luôn luôn / Không bao giờ)</span>
              </li>
            </ul>
          </div>

          {/* Cụm từ ĐÚNG */}
          <div className="bg-green-50/60 border border-green-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-green-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <span>GẦN NHƯ 100% LÀ ĐÁP ÁN ĐÚNG (Richtig)</span>
            </div>
            <p className="text-xs text-green-700 leading-relaxed">
              Các hành động thận trọng, chủ động nhường nhịn và lường trước nguy hiểm:
            </p>
            <ul className="space-y-2 text-xs text-gray-800 font-medium">
              <li className="p-2 bg-white rounded-xl border border-green-200 flex flex-col">
                <strong className="text-green-800 font-bold">Bremsbereitschaft herstellen</strong>
                <span className="text-gray-600 text-[11px]">Rà sẵn chân phanh / chuẩn bị sẵn sàng phanh</span>
              </li>
              <li className="p-2 bg-white rounded-xl border border-green-200 flex flex-col">
                <strong className="text-green-800 font-bold">Geschwindigkeit verringern / verlangsamen</strong>
                <span className="text-gray-600 text-[11px]">Giảm tốc độ / đi chậm lại</span>
              </li>
              <li className="p-2 bg-white rounded-xl border border-green-200 flex flex-col">
                <strong className="text-green-800 font-bold">Mit Fehlern anderer rechnen</strong>
                <span className="text-gray-600 text-[11px]">Tính đến sai lầm của người tham gia giao thông khác</span>
              </li>
              <li className="p-2 bg-white rounded-xl border border-green-200 flex flex-col">
                <strong className="text-green-800 font-bold">Blickkontakt aufnehmen</strong>
                <span className="text-gray-600 text-[11px]">Quan sát và giao tiếp bằng mắt với người đi bộ/lái xe khác</span>
              </li>
              <li className="p-2 bg-white rounded-xl border border-green-200 flex flex-col">
                <strong className="text-green-800 font-bold">Verzicht auf Vorfahrt</strong>
                <span className="text-gray-600 text-[11px]">Chủ động nhường quyền ưu tiên để tránh tai nạn / kẹt xe</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MẸO 2: CÔNG THỤC TÍNH TOÁN FAUSTFORMELN CÓ TƯƠNG TÁC */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-lg">
            2
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              4 Công Thức Tính Toán Thần Thánh (Faustformeln)
            </h2>
            <p className="text-xs text-gray-500">Kéo thanh trượt vận tốc dưới đây để xem kết quả tính toán tự động!</p>
          </div>
        </div>

        {/* Interactive Speed Slider */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-blue-600" /> Kéo chọn vận tốc thử nghiệm:
            </span>
            <span className="text-xl font-extrabold text-blue-700 font-mono bg-white px-3 py-0.5 rounded-xl border border-blue-300 shadow-xs">
              {speed} km/h
            </span>
          </div>

          <input
            type="range"
            min="20"
            max="130"
            step="10"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-full h-2.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>30 km/h (Khu dân cư)</span>
            <span>50 km/h (Trong phố)</span>
            <span>100 km/h (Ngoài phố)</span>
            <span>130 km/h (Autobahn)</span>
          </div>
        </div>

        {/* Calculation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">1. Đoạn đường phản ứng (Reaktionsweg)</span>
              <span className="text-sm font-extrabold text-blue-700 font-mono">{reaktion} mét</span>
            </div>
            <p className="text-xs text-blue-600 font-mono font-semibold">Công thức: (Vận tốc : 10) x 3</p>
            <p className="text-[11px] text-gray-500">
              Tính nhẩm: ({speed} : 10) x 3 = <strong>{reaktion}m</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">2. Đoạn đường phanh thường (Bremsweg)</span>
              <span className="text-sm font-extrabold text-orange-600 font-mono">{bremsen} mét</span>
            </div>
            <p className="text-xs text-orange-600 font-mono font-semibold">Công thức: (V : 10) x (V : 10)</p>
            <p className="text-[11px] text-gray-500">
              Tính nhẩm: ({speed} : 10) x ({speed} : 10) = <strong>{bremsen}m</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">3. Phanh gấp / khẩn cấp (Gefahrbremsung)</span>
              <span className="text-sm font-extrabold text-red-600 font-mono">{gefahrBremsen} mét</span>
            </div>
            <p className="text-xs text-red-600 font-mono font-semibold">Công thức: Đoạn phanh thường : 2</p>
            <p className="text-[11px] text-gray-500">
              Tính nhẩm: {bremsen}m : 2 = <strong>{gefahrBremsen}m</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-green-300 bg-green-50/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-green-900">4. Đoạn đường dừng xe (Anhalteweg)</span>
              <span className="text-sm font-extrabold text-green-700 font-mono">{anhalten} mét</span>
            </div>
            <p className="text-xs text-green-700 font-mono font-semibold">Công thức: Phản ứng + Phanh</p>
            <p className="text-[11px] text-gray-600">
              Phanh thường: {reaktion}m + {bremsen}m = <strong>{anhalten}m</strong> (Phanh gấp: <strong>{anhaltenGefahr}m</strong>)
            </p>
          </div>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
          💡 <strong>Mẹo nhân đôi vận tốc:</strong> Khi vận tốc <strong>gấp 2 lần</strong> (từ 50 lên 100 km/h):
          <br />• Đoạn đường phản ứng tăng <strong>gấp 2</strong> (15m $\rightarrow$ 30m).
          <br />• Đoạn đường phanh tăng <strong>GẤP 4 LẦN</strong> ($2^2 = 4$) (25m $\rightarrow$ 100m)!
        </div>
      </section>

      {/* MẸO 3: THỨ TỰ ƯU TIÊN SA HÌNH */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-lg">
            3
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Thứ Tự Ưu Tiên Sa Hình Ngã Tư (Vorfahrt 4 Cấp)
            </h2>
            <p className="text-xs text-gray-500">Luôn xét ngã tư theo đúng 4 cấp độ từ trên xuống dưới</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-gray-50 border-l-4 border-emerald-600 flex items-start gap-3">
            <div className="font-bold text-xs bg-emerald-600 text-white px-2 py-0.5 rounded shrink-0">Cấp 1</div>
            <div className="text-xs">
              <strong className="text-gray-900 text-sm block">Cảnh sát giao thông (Polizist) — Quyền cao nhất</strong>
              <p className="text-gray-600 mt-0.5">Cảnh sát đứng điều khiển thì <strong>bỏ qua đèn tín hiệu và biển báo</strong>.</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <span className="p-2 bg-white rounded-lg border border-gray-200 text-red-700">
                  🔴 Nhìn thấy <strong>Lưng</strong> hoặc <strong>Ngực</strong> cảnh sát $\rightarrow$ <strong>DỪNG LẠI</strong>
                </span>
                <span className="p-2 bg-white rounded-lg border border-gray-200 text-green-700">
                  🟢 Nhìn thấy <strong>Sườn</strong> hoặc <strong>Tay giang ngang</strong> $\rightarrow$ <strong>ĐƯỢC ĐI</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border-l-4 border-blue-600 flex items-start gap-3">
            <div className="font-bold text-xs bg-blue-600 text-white px-2 py-0.5 rounded shrink-0">Cấp 2</div>
            <div className="text-xs">
              <strong className="text-gray-900 text-sm block">Đèn tín hiệu giao thông (Lichtzeichen / Ampel)</strong>
              <p className="text-gray-600 mt-0.5">Khi đèn hoạt động bình thường, <strong>đèn đè bẹp biển báo</strong> (các biển báo bên dưới cột đèn chỉ có hiệu lực khi đèn bị tắt hoặc chớp vàng hỏng).</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border-l-4 border-yellow-500 flex items-start gap-3">
            <div className="font-bold text-xs bg-yellow-500 text-white px-2 py-0.5 rounded shrink-0">Cấp 3</div>
            <div className="text-xs">
              <strong className="text-gray-900 text-sm block">Biển báo giao thông (Verkehrszeichen)</strong>
              <p className="text-gray-600 mt-0.5">
                • <strong>Hình thoi viền vàng:</strong> Đường ưu tiên (Vorfahrtstraße) $\rightarrow$ Đi trước.<br />
                • <strong>Tam giác ngược viền đỏ:</strong> Nhường đường (Vorfahrt gewähren) $\rightarrow$ Đi sau.<br />
                • <strong>Bát giác đỏ (STOP):</strong> Bắt buộc dừng hẳn xe 3 giây tại vạch dừng (Haltlinie).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border-l-4 border-purple-600 flex items-start gap-3">
            <div className="font-bold text-xs bg-purple-600 text-white px-2 py-0.5 rounded shrink-0">Cấp 4</div>
            <div className="text-xs">
              <strong className="text-gray-900 text-sm block">Quy tắc "Phải trước - Trái sau" (Rechts vor Links)</strong>
              <p className="text-gray-600 mt-0.5">
                Áp dụng khi <strong>KHÔNG có cảnh sát, KHÔNG có đèn, KHÔNG có biển báo</strong>. Bất kỳ xe nào đến từ bên tay phải của bạn đều có quyền đi trước bạn!
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
          💡 <strong>Thứ tự xe rẽ tại ngã tư cùng cấp:</strong>
          <span className="font-bold"> Xe đi thẳng $\rightarrow$ Xe rẽ phải $\rightarrow$ Xe rẽ trái đi cuối cùng</span> (vì rẽ trái phải cắt qua dòng xe đối diện).
        </div>
      </section>

      {/* MẸO 4: CÁC CON SỐ NẰM LÒNG */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 font-extrabold flex items-center justify-center text-lg">
            4
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Bảng Con Số "Bất Di Bất Dịch" Cần Thuộc Lòng
            </h2>
            <p className="text-xs text-gray-500">Các mốc tốc độ, khoảng cách đỗ xe và thông số kỹ thuật xe</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Cột Tốc độ */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm text-center border-b pb-2">Tốc độ chuẩn</h3>
            <div className="space-y-1.5 text-gray-700">
              <div className="flex justify-between">
                <span>Khu dân cư (innerorts):</span>
                <strong className="text-blue-700 font-bold">50 km/h</strong>
              </div>
              <div className="flex justify-between">
                <span>Ngoài dân cư (außerorts):</span>
                <strong className="text-blue-700 font-bold">100 km/h</strong>
              </div>
              <div className="flex justify-between">
                <span>Khuyến nghị cao tốc:</span>
                <strong className="text-blue-700 font-bold">130 km/h</strong>
              </div>
              <div className="flex justify-between">
                <span>Đi bộ (Schritt):</span>
                <strong className="text-blue-700 font-bold">4 - 7 km/h</strong>
              </div>
              <div className="flex justify-between">
                <span>Kéo xe hỏng (Abschleppen):</span>
                <strong className="text-blue-700 font-bold">Tối đa 50 km/h</strong>
              </div>
            </div>
          </div>

          {/* Cột Khoảng cách đỗ xe */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm text-center border-b pb-2">Khoảng cách đỗ xe</h3>
            <div className="space-y-1.5 text-gray-700">
              <div className="flex justify-between">
                <span>Cách ngã tư thường:</span>
                <strong className="text-orange-700 font-bold">5 mét</strong>
              </div>
              <div className="flex justify-between">
                <span>Ngã tư có làn xe đạp:</span>
                <strong className="text-orange-700 font-bold">8 mét</strong>
              </div>
              <div className="flex justify-between">
                <span>Trước vạch người đi bộ:</span>
                <strong className="text-orange-700 font-bold">5 mét</strong>
              </div>
              <div className="flex justify-between">
                <span>Cách trạm xe buýt:</span>
                <strong className="text-orange-700 font-bold">15 mét</strong>
              </div>
              <div className="flex justify-between">
                <span>Ray tàu (trong / ngoài phố):</span>
                <strong className="text-orange-700 font-bold">5m / 50m</strong>
              </div>
            </div>
          </div>

          {/* Cột Kỹ thuật xe */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm text-center border-b pb-2">Kỹ thuật ô tô</h3>
            <div className="space-y-1.5 text-gray-700">
              <div className="flex justify-between">
                <span>Độ sâu gai lốp tối thiểu:</span>
                <strong className="text-green-700 font-bold">1,6 mm</strong>
              </div>
              <div className="flex justify-between">
                <span>Khoảng cách ngoài phố:</span>
                <strong className="text-green-700 font-bold">Halber Tacho</strong>
              </div>
              <div className="flex justify-between">
                <span>Nồng độ cồn lái thử thách:</span>
                <strong className="text-green-700 font-bold">0,0 ‰ (tuyệt đối)</strong>
              </div>
              <div className="flex justify-between">
                <span>Gương chiếu hậu chỉnh:</span>
                <strong className="text-green-700 font-bold">Sau khi chỉnh ghế</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MẸO 5: CHIẾN LƯỢC ÔN THI 4 BƯỚC */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-lg">
            5
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Chiến Lược Ôn Thi 4 Bước Đảm Bảo 100% Đỗ Lần Đầu
            </h2>
            <p className="text-xs text-gray-500">Lộ trình học tối ưu thời gian và công sức cho người bận rộn</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => onNavigate('high-points')}
            className="p-5 rounded-2xl bg-red-50/50 border border-red-200 hover:border-red-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded">Bước 1</span>
              <ArrowRight className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-bold text-gray-900 group-hover:text-red-700">Cày Nát 138 Câu 5 Điểm</h4>
            <p className="text-xs text-gray-600 mt-1">
              Sai 2 câu 5 điểm là TRƯỢT NGAY. Hãy học thuộc lòng 138 câu điểm liệt trước để nắm chắc 70% vé đỗ.
            </p>
          </div>

          <div
            onClick={() => onNavigate('topics')}
            className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Bước 2</span>
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-bold text-gray-900 group-hover:text-blue-700">Học Các Chuyên Đề Trọng Tâm</h4>
            <p className="text-xs text-gray-600 mt-1">
              Luyện kỹ các chuyên đề nhiều câu nhất: <em>Vorfahrt</em> (nhường đường), <em>Überholen</em> (vượt xe), <em>Geschwindigkeit</em> (tốc độ).
            </p>
          </div>

          <div
            onClick={() => onNavigate('errors')}
            className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-xs text-orange-700 bg-orange-100 px-2 py-0.5 rounded">Bước 3</span>
              <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-bold text-gray-900 group-hover:text-orange-700">Dọn Sạch "Sổ Tay Câu Sai"</h4>
            <p className="text-xs text-gray-600 mt-1">
              Trước ngày thi 3 ngày, chỉ mở tab Câu sai để làm đi làm lại những câu từng chọn sai đến khi danh sách về 0.
            </p>
          </div>

          <div
            onClick={() => onNavigate('exam')}
            className="p-5 rounded-2xl bg-green-50/50 border border-green-200 hover:border-green-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">Bước 4</span>
              <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-bold text-gray-900 group-hover:text-green-700">Thi Thử Chuỗi 10 Đề Đậu</h4>
            <p className="text-xs text-gray-600 mt-1">
              Làm 5 đến 10 đề thi thử liên tục đạt trạng thái <strong>ĐẬU (Bestanden)</strong> thì tự tin 100% đi thi thật sẽ đỗ!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
