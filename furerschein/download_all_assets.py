import os
import requests

BASE_URL = "https://nguyenron.com"
OUTPUT_DIR = "/Users/nguyenchilinh/Desktop/furerschein"
CSS_DIR = os.path.join(OUTPUT_DIR, "assets", "css")
JS_DIR = os.path.join(OUTPUT_DIR, "assets", "js")
PAGES_DIR = os.path.join(OUTPUT_DIR, "pages_html")

for d in [CSS_DIR, JS_DIR, PAGES_DIR]:
    os.makedirs(d, exist_ok=True)

s = requests.Session()
s.headers.update({"User-Agent": "Mozilla/5.0"})

files = {
    "assets/css/style.css": os.path.join(CSS_DIR, "style.css"),
    "assets/css/video.css": os.path.join(CSS_DIR, "video.css"),
    "assets/css/document.css": os.path.join(CSS_DIR, "document.css"),
    "assets/css/auth.css": os.path.join(CSS_DIR, "auth.css"),
    "assets/js/main.js": os.path.join(JS_DIR, "main.js"),
    "login.php": os.path.join(PAGES_DIR, "login.html"),
    "register.php": os.path.join(PAGES_DIR, "register.html"),
    "appointments.php": os.path.join(PAGES_DIR, "appointments.html"),
    "post.php?slug=5-meo-hoc-ly-thuyet": os.path.join(PAGES_DIR, "post-5-meo-hoc-ly-thuyet.html"),
    "post.php?slug=kinh-nghiem-thi-thuc-hanh": os.path.join(PAGES_DIR, "post-kinh-nghiem-thi-thuc-hanh.html"),
}

for rel_url, local_path in files.items():
    url = f"{BASE_URL}/{rel_url}"
    r = s.get(url)
    if r.status_code == 200:
        with open(local_path, "wb") as f:
            f.write(r.content)
        print(f"Saved: {rel_url} -> {local_path}")
    else:
        print(f"Failed {rel_url}: {r.status_code}")
