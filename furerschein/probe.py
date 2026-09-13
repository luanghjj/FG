import requests
from bs4 import BeautifulSoup
import json
import os
import re

BASE_URL = "https://nguyenron.com"
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

def check_url(path):
    url = f"{BASE_URL}/{path.lstrip('/')}"
    try:
        r = session.get(url, timeout=10, allow_redirects=False)
        return r.status_code, r.headers.get("Content-Type", ""), len(r.content), r.headers.get("Location", "")
    except Exception as e:
        return 0, str(e), 0, ""

paths_to_test = [
    "",
    "index.php",
    "robots.txt",
    "sitemap.xml",
    "tai-lieu.php",
    "videos.php",
    "blog.php",
    "appointments.php",
    "login.php",
    "register.php",
    "forgot-password.php",
    "reset-password.php",
    "profile.php",
    "post.php?slug=5-meo-hoc-ly-thuyet",
    "post.php?slug=kinh-nghiem-thi-thuc-hanh",
    "watch.php",
    "watch.php?id=1",
    "video.php",
    "video.php?id=1",
    "video-category.php",
    "video-category.php?id=1",
    "doc.php",
    "doc.php?id=1",
    "document.php",
    "document.php?id=1",
    "view-document.php",
    "view-doc.php",
    "download.php",
    "download.php?id=1",
    "cau-hoi.php",
    "thi-thu.php",
    "luyen-thi.php",
    "quiz.php",
    "exam.php",
    "de-thi.php",
    "questions.php",
    "theory.php",
    "api/",
    "api/videos.php",
    "api/documents.php",
    "api/questions.php",
    "api/appointments.php",
    "admin/",
    "admin/login.php",
    "admin/index.php",
    "admin/videos.php",
    "admin/documents.php",
    "admin/appointments.php",
    "admin/posts.php",
    "uploads/",
    "uploads/documents/",
    "uploads/videos/",
    "uploads/images/",
    "assets/js/main.js",
    "assets/css/style.css",
    "assets/css/video.css",
    "assets/css/document.css",
    "assets/css/auth.css"
]

results = {}
for p in paths_to_test:
    status, ctype, length, loc = check_url(p)
    results[p] = {"status": status, "content_type": ctype, "length": length, "redirect": loc}
    print(f"[{status}] {p:40} {ctype:30} len={length} {'-> ' + loc if loc else ''}")

with open("scan_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
