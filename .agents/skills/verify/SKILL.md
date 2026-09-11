---
name: verify
summary: Chạy và kiểm tra app ôn thi tĩnh bằng Chrome CDP
---

# Verify app ôn thi

1. Chạy server:
   `python3 -m http.server 8765 --directory "/Users/nguyenchilinh/Desktop/ôn thi"`
2. Chạy Chrome headless với remote debugging:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --remote-debugging-port=9223 --user-data-dir=/tmp/Codex-on-thi-chrome about:blank`
3. Dùng Node + WebSocket CDP tại `http://127.0.0.1:9223/json/list` để:
   - mở trang cần kiểm tra;
   - đặt `localStorage.learn_player_name` trước khi mở trang cần login;
   - click luồng UI thật;
   - đọc DOM và `Page.captureScreenshot` làm bằng chứng.
4. Với Challenge, kiểm tra từng `ChallengeData.SUBJECT_META`, `pickQuestions()`, chọn nhiều môn và tạo room tới Lobby.

Lưu ý: app dùng Supabase thật; tạo Challenge room sẽ ghi một room kiểm tra lên backend.
