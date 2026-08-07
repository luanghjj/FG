#!/bin/bash
# ============================================================
#  Khởi động opencode serve cho chatbox /ai
#
#  Cách dùng:
#    bash start-ai-server.command                     # chỉ máy local (127.0.0.1:4096)
#    bash start-ai-server.command public              # thêm tunnel công khai (dùng từ ĐIỆN THOẠI)
#    bash start-ai-server.command public https://h2fo3t-fg.vercel.app 4096
#
#  App đang deploy tại https://h2fo3t-fg.vercel.app nên mặc định CORS cho origin đó.
#
#  Chế độ public:
#    - Gán mật khẩu (tự sinh, lưu ~/.opencode/ai-server-password)
#    - Mở tunnel cloudflare (quick tunnel) → in URL công khai
#    - Chatbox gọi server PHẢI kèm bearer token = mật khẩu đó
# ============================================================

OPENCODE=""
command -v opencode >/dev/null 2>&1 && OPENCODE="$(command -v opencode)"
if [ -z "${OPENCODE}" ] && [ -x "$HOME/.opencode/bin/opencode" ]; then
  OPENCODE="$HOME/.opencode/bin/opencode"
fi
if [ -z "$OPENCODE" ]; then
  echo "❌ Không tìm thấy 'opencode'. Cài: npm i -g opencode-ai"
  [ -t 0 ] && read -r -p "Nhấn Enter để đóng..." _
  exit 1
fi

# Load provider env từ ~/.claude/settings.json (không in mật)
CLAUDE_SETTINGS="$HOME/.claude/settings.json"
if [ -f "$CLAUDE_SETTINGS" ]; then
  ENV_SH="$(python3 - "$CLAUDE_SETTINGS" <<'PY'
import json, os, shlex, sys
try:
    d = json.load(open(sys.argv[1]))
except Exception:
    sys.exit(0)
env = d.get('env', {}) or {}
keys = set(k for k in env if k.startswith('ANTHROPIC_'))
keys |= {'ANTHROPIC_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'ANTHROPIC_BASE_URL', 'ANTHROPIC_MODEL'}
for k in sorted(keys):
    if k in env and k not in os.environ and str(env[k]):
        print('export %s=%s' % (k, shlex.quote(str(env[k]))))
PY
)"
  if [ -n "$ENV_SH" ]; then eval "$ENV_SH"; fi
fi

MODE="${1:-}"
if [ "$MODE" = "public" ]; then
  ORIGIN="${2:-https://h2fo3t-fg.vercel.app}"
  PORT="${3:-4096}"
  PUBLIC=1
else
  ORIGIN="${1:-https://h2fo3t-fg.vercel.app}"
  PORT="${2:-4096}"
  PUBLIC=0
fi

PWD_FILE="$HOME/.opencode/ai-server-password"
SERVER_PASSWORD=""
if [ "$PUBLIC" = "1" ]; then
  if [ -f "$PWD_FILE" ]; then
    SERVER_PASSWORD="$(cat "$PWD_FILE")"
  else
    mkdir -p "$HOME/.opencode"
    SERVER_PASSWORD="$(python3 - <<'PY'
import secrets
words = "cua-ca-tom-tre-re-nui-sao-troi-mua-gio-song-vang-keo-bong-meo-cau-thuyen-pho-mai".split('-')
import random
random.seed()
print('-'.join(random.sample(words, 6)))
PY
)"
    echo "$SERVER_PASSWORD" > "$PWD_FILE"
    chmod 600 "$PWD_FILE"
  fi
  export OPENCODE_SERVER_PASSWORD="$SERVER_PASSWORD"
fi

echo "🚀 opencode serve:"
echo "   Port   : $PORT   CORS: $ORIGIN"
[ "$PUBLIC" = "1" ] && echo "   Auth   : Bearer $SERVER_PASSWORD  (đã lưu $PWD_FILE)"
echo "   Local  : http://127.0.0.1:$PORT"

if [ "$PUBLIC" = "1" ]; then
  command -v cloudflared >/dev/null 2>&1 || { echo "❌ Thiếu cloudflared: brew install cloudflared"; exit 1; }
  "$OPENCODE" serve --port "$PORT" --hostname 127.0.0.1 --cors "$ORIGIN" --print-logs --log-level ERROR > /tmp/opencode-serve.log 2>&1 &
  SERVER_PID=$!
  echo "   Tunnel : đang tạo (chờ ~5s)..."
  cloudflared tunnel --url "http://127.0.0.1:$PORT" > /tmp/cloudflared.log 2>&1 &
  TF_PID=$!
  URL=""
  for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
    URL=$(grep -oE "https://[a-z0-9-]+\.trycloudflare\.com" /tmp/cloudflared.log | head -1)
    [ -n "$URL" ] && break
    sleep 2
  done
  if [ -z "$URL" ]; then
    echo "❌ Không tạo được tunnel: "; tail -5 /tmp/cloudflared.log
    kill $TF_PID $SERVER_PID 2>/dev/null
    exit 1
  fi
  echo "   📱 DÙNG URL CÔNG KHAI: $URL"
  echo "   🔑 Mật khẩu (nhập trong chatbox ⚙): $SERVER_PASSWORD"
  echo "   (Ctrl+C để dừng cả server lẫn tunnel)"
  trap 'kill $SERVER_PID $TF_PID 2>/dev/null' INT TERM EXIT
  wait $TF_PID $SERVER_PID
else
  exec "$OPENCODE" serve --port "$PORT" --hostname 127.0.0.1 --cors "$ORIGIN"
fi