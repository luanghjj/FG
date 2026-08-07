# Issues Checklist · Floating Chatbox

## Pre-Creation

- [x] Feature artifacts: yêu cầu user, mã nguồn hiện tại, kỹ thuật (supabase polling, opencode API) — đã nghiên cứu
- [x] Backlog chores: skills `ont-thi-fach` + `breakdown-plan` đã đọc và áp dụng quy ước

## Enabler / Backend (`supabase.js`)

- [x] `CHAT_DEFAULT_ROOMS` (tong-hop, bfk1, englisch, gk) + seed qua `chatEnsureDefaults`
- [x] `chatListRooms` / `chatCreateRoom` / `chatGetRoom` / `chatTouchPresence`
- [x] `chatSendMessage` (mỗi tin 1 row, id unique) / `chatListMessages` (order key asc)
- [x] `subscribeChatRoom` polling ~1s + diff bằng `seen` set; first pull báo history
- [x] Optimistic-concurrency `withChatRoom` cho presence
- [x] Export: đủ 8 helpers vào `LearnDB` (test node đã chạy)

## Frontend (`chatbox.js`)

- [x] Bubble 52px SF-style, drag `chat_x/chat_y`, unread badge
- [x] Panel iOS (380×540, bo 22px), tự-boot DOM + CSS fallback variables
- [x] Rooms list + tạo phòng + presence online + thread iMessage-style
- [x] Unread: đếm khi panel đóng / đang ở phòng khác; clear khi mở đúng phòng
- [x] Voice: `getUserMedia` → MediaRecorder ≤60s → base64; play waveform
- [x] AI: `/ai` → thread riêng; session id lưu localStorage; reset AI; báo lỗi offline
- [x] Chống lỗi: `esc()`, catch promise, `showToast` bug không phụ thuộc

## RAG – Kiến thức nội bộ

- [x] `wissen.js`: index toàn bộ faecher/bfk1-{lf2,lf3,lf6,lf9,extra}/BfK2/Deutsch/GK/GK-GLE quiz + vocab
- [x] `stripHtml` giữ `.term` (DE→VI), fallback plain khi thiếu DOM
- [x] Search: token hoá + boost tiêu đề + ưu tiên chunk ngắn; `vocabLookup` tra từ điển
- [x] Wire vào `/ai`: `system` có "TÀI LIỆU ÔN THI" trích context → AI trả lời từ tài liệu trước
- [x] Veritest với dữ liệu thật: Mahlgrade→Getreide, Bewirtungsvertrag→LS03 Recht, Umsatzsteuer, Filet Rind, Kartoffel ✓

## Deploy / Cache

- [x] Script tag `<script src="./wissen.js?v=1">` trước `chatbox.js?v=2` trên 26 trang (loại admin/challenge)
- [x] `supabase.js?v=16` trên mọi trang có supabase
- [x] `sw.js`: thêm `./wissen.js` `./chatbox.js`, cache name `h2fo3t-v91`
- [x] `start-ai-server.command` (chmod +x) — hướng dẫn `/connect` + `serve --cors`

## Sẵn sàng QA (cần user)

- [ ] Mở app (server local có CORS) → đăng nhập 2 tài khoản khác nhau → chat realtime
- [ ] Gửi voice + phát lại
- [ ] Gõ `/ai` với `opencode serve` đang chạy → nhận trả lời
- [ ] Tắt AI server → thấy lỗi thân thiện
- [ ] Kiểm tra PWA offline vẫn nạp `chatbox.js`