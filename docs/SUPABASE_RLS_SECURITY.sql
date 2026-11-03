ALTER TABLE IF EXISTS public.config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cho phép đọc dữ liệu công khai" ON public.config;
DROP POLICY IF EXISTS "Cho phép gửi góp ý ẩn danh" ON public.config;
DROP POLICY IF EXISTS "Cho phép lưu tiến độ học viên" ON public.config;
DROP POLICY IF EXISTS "Chặn xóa cấu hình hệ thống" ON public.config;
DROP POLICY IF EXISTS "Allow anon read all except private feedback" ON public.config;
DROP POLICY IF EXISTS "Allow anon insert feedback" ON public.config;
DROP POLICY IF EXISTS "Allow anon manage learning data" ON public.config;
DROP POLICY IF EXISTS "AzubiHub read access" ON public.config;
DROP POLICY IF EXISTS "AzubiHub write access" ON public.config;
DROP POLICY IF EXISTS "AzubiHub safe delete" ON public.config;

CREATE POLICY "AzubiHub read access"
ON public.config
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "AzubiHub write access"
ON public.config
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "AzubiHub update access"
ON public.config
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "AzubiHub safe delete"
ON public.config
FOR DELETE
TO anon, authenticated
USING (
  key NOT LIKE 'learn:access:%'
  AND key NOT LIKE 'learn:admin:%'
);
