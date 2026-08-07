#!/bin/bash
# ============================================================
#  Khởi động opencode serve cho chatbox /ai
#  Chatbox gọi AI tại http://127.0.0.1:4096 (mặc định).
#
#  Cách dùng:
#    - Bấm đúp file này (macOS), hoặc chạy:
#      bash start-ai-server.command
#
#  1. Lần đầu, cần cấu hình provider/model:
#       opencode /connect
#  2. Chạy script này rồi mở app. Chatbox /ai sẽ hoạt động.
#
#  Nếu app mở từ origin khác (không phải http://localhost:8080),
#  thêm origin vào sau lệnh, ví dụ:
#       bash start-ai-server.command http://localhost:5500
# ============================================================

set -e

OPENCODE=$(command -v opencode || true)
if [ -z "$OPENCODE" ]; then
  echo "❌ Không tìm thấy 'opencode'. Cài qua: npm i -g opencode-ai  (xem https://opencode.ai/docs/)"
  read -r -p "Nhấn Enter để đóng..." _
  exit 1
fi

ORIGIN="${1:-http://localhost:8080}"
PORT="${2:-4096}"

echo "🚀 Bắt đầu opencode serve:"
echo "   Port   : $PORT"
echo "   CORS   : $ORIGIN"
echo "   Base   : http://127.0.0.1:$PORT"
echo "   (Chatbox /ai mặc định dùng base này; Ctrl+C để dừng.)"
echo ""

exec "$OPENCODE" serve --port "$PORT" --cors "$ORIGIN"