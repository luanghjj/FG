/* Bật Row Level Security */
ALTER TABLE IF EXISTS public.config ENABLE ROW LEVEL SECURITY;

/* Xóa các policy cũ để tránh trùng lặp */
DROP POLICY IF EXISTS "Cho phép đọc dữ liệu công khai" ON public.config;
DROP POLICY IF EXISTS "Cho phép gửi góp ý ẩn danh" ON public.config;
DROP POLICY IF EXISTS "Cho phép lưu tiến độ học viên" ON public.config;
DROP POLICY IF EXISTS "Chặn xóa cấu hình hệ thống" ON public.config;
DROP POLICY IF EXISTS "Allow anon read all except private feedback" ON public.config;
DROP POLICY IF EXISTS "Allow anon insert feedback" ON public.config;
DROP POLICY IF EXISTS "Allow anon manage learning data" ON public.config;

/* 1. Cho phép đọc dữ liệu bài học, quiz, điểm số (trừ feedback ẩn danh) */
CREATE POLICY "Allow anon read all except private feedback"
ON public.config
FOR SELECT
TO anon, authenticated
USING (
  key NOT LIKE 'feedback:%'
);

/* 2. Cho phép gửi góp ý ẩn danh (Chỉ được INSERT) */
CREATE POLICY "Allow anon insert feedback"
ON public.config
FOR INSERT
TO anon, authenticated
WITH CHECK (
  key LIKE 'feedback:%'
);

/* 3. Cho phép học viên lưu điểm, tiến độ, profile và tin nhắn chat */
CREATE POLICY "Allow anon manage learning data"
ON public.config
FOR ALL
TO anon, authenticated
USING (
  key NOT LIKE 'feedback:%'
)
WITH CHECK (
  key NOT LIKE 'feedback:%'
);
