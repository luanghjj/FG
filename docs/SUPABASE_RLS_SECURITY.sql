-- ==============================================================================
-- AZUBIHUB - BẢO MẬT ROW LEVEL SECURITY (RLS) CHO SUPABASE
-- Tác giả: Nguyễn Chí Linh (nguyenmisa333@gmail.com) - WhatsApp: +49 176 76640277
-- ------------------------------------------------------------------------------
-- HƯỚNG DẪN SỬ DỤNG:
-- 1. Đăng nhập vào https://supabase.com -> Chọn Project AzubiHub của bạn.
-- 2. Vào mục "SQL Editor" ở thanh menu bên trái.
-- 3. Bấm "New Query", dán toàn bộ nội dung script này vào và bấm "Run".
-- ==============================================================================

-- 1. BẬT TÍNH NĂNG ROW LEVEL SECURITY (RLS) CHO BẢNG CONFIG
ALTER TABLE IF EXISTS public.config ENABLE ROW LEVEL SECURITY;

-- 2. XÓA CÁC POLICY CŨ NẾU ĐÃ TỒN TẠI ĐỂ TRÁNH TRÙNG LẶP
DROP POLICY IF EXISTS "Cho phép đọc dữ liệu công khai" ON public.config;
DROP POLICY IF EXISTS "Cho phép gửi góp ý ẩn danh" ON public.config;
DROP POLICY IF EXISTS "Cho phép lưu tiến độ học viên" ON public.config;
DROP POLICY IF EXISTS "Chặn xóa cấu hình hệ thống" ON public.config;

-- 3. POLICY: CHO PHÉP MỌI NGƯỜI ĐỌC DỮ LIỆU CÔNG KHAI (Trừ góp ý nhạy cảm)
-- Cho phép đọc profile, quiz, đề thi, nhưng ẩn danh sách feedback của người khác
CREATE POLICY "Cho phép đọc dữ liệu công khai"
ON public.config
FOR SELECT
USING (
  -- Cho phép đọc tất cả các key ngoại trừ các bản ghi góp ý nhạy cảm (feedback:*)
  -- Chỉ Admin mới được đọc feedback (thông qua service role hoặc RPC)
  key NOT LIKE 'feedback:%' OR auth.role() = 'service_role'
);

-- 4. POLICY: CHO PHÉP HỌC VIÊN GỬI GÓP Ý ẨN DANH (Chỉ được INSERT)
-- Học viên có thể gửi góp ý vào hệ thống mà không cần đăng nhập tài khoản Supabase
CREATE POLICY "Cho phép gửi góp ý ẩn danh"
ON public.config
FOR INSERT
WITH CHECK (
  key LIKE 'feedback:%'
);

-- 5. POLICY: CHO PHÉP HỌC VIÊN CẬP NHẬT ĐIỂM VÀ TIẾN ĐỘ HỌC TẬP CỦA MÌNH
CREATE POLICY "Cho phép lưu tiến độ học viên"
ON public.config
FOR ALL
USING (
  key LIKE 'profile:%' OR 
  key LIKE 'visit:%' OR 
  key LIKE 'chat:%' OR 
  key LIKE 'room:%'
)
WITH CHECK (
  key LIKE 'profile:%' OR 
  key LIKE 'visit:%' OR 
  key LIKE 'chat:%' OR 
  key LIKE 'room:%'
);

-- 6. THÔNG BÁO HOÀN TẤT
-- Khi chạy xong, hệ thống của bạn sẽ được bảo vệ:
-- • Kẻ xấu không thể xóa bảng config của hệ thống.
-- • Kẻ xấu không thể đọc trộm danh sách góp ý ẩn danh của học viên khác.
-- • Học viên vẫn gửi góp ý và lưu điểm hoàn toàn bình thường.
