import os
import json
import urllib.parse
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://nguyenron.com"
OUTPUT_DIR = "/Users/nguyenchilinh/Desktop/furerschein"
DATA_DIR = os.path.join(OUTPUT_DIR, "data")
IMAGES_DIR = os.path.join(OUTPUT_DIR, "images")
PAGES_DIR = os.path.join(OUTPUT_DIR, "pages_html")

for d in [DATA_DIR, IMAGES_DIR, PAGES_DIR]:
    os.makedirs(d, exist_ok=True)

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

def download_file(url, folder):
    try:
        full_url = urllib.parse.urljoin(BASE_URL, url)
        rel_path = url.lstrip('/')
        local_path = os.path.join(folder, os.path.basename(rel_path))
        r = session.get(full_url, timeout=15)
        if r.status_code == 200:
            with open(local_path, "wb") as f:
                f.write(r.content)
            print(f"Downloaded: {url} -> {local_path}")
            return local_path
        else:
            print(f"Failed to download ({r.status_code}): {url}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return None

print("=== 1. Crawling Homepage & Core Info ===")
r_home = session.get(f"{BASE_URL}/index.php")
with open(os.path.join(PAGES_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(r_home.text)

soup_home = BeautifulSoup(r_home.text, "html.parser")

site_data = {
    "title": soup_home.title.string if soup_home.title else "",
    "meta_description": (soup_home.find("meta", {"name": "description"}) or {}).get("content", ""),
    "hero": {},
    "services": [],
    "licenses": [],
    "packages": [],
    "process": [],
    "faqs": [],
    "blogs": [],
    "contact": {
        "whatsapp": "015253218333",
        "email": "info@nguyenron.com",
        "address": "Möllendorffstraße 44 Lichtenberg 10367 Berlin",
        "working_hours": "06:00 – 20:00 hằng ngày"
    }
}

# Hero
hero_copy = soup_home.find("div", class_="hero-copy")
if hero_copy:
    h1 = hero_copy.find("h1")
    p = hero_copy.find("p")
    rating = hero_copy.find("div", class_="rating")
    site_data["hero"] = {
        "heading": h1.text.strip() if h1 else "",
        "subheading": p.text.strip() if p else "",
        "rating": rating.text.strip() if rating else ""
    }

# Licenses
for card in soup_home.find_all("article", class_="license-card"):
    h3 = card.find("h3")
    p = card.find("p")
    img = card.find("img")
    site_data["licenses"].append({
        "type": h3.text.strip() if h3 else "",
        "description": p.text.strip() if p else "",
        "icon": img.get("src") if img else ""
    })

# Services
service_row = soup_home.find("div", class_="service-row")
if service_row:
    for art in service_row.find_all("article"):
        h3 = art.find("h3")
        p = art.find("p")
        site_data["services"].append({
            "service": h3.text.strip() if h3 else "",
            "description": p.text.strip() if p else ""
        })

# Process
for step in soup_home.find_all("div", class_="process-row"):
    for div in step.find_all("div", recursive=False):
        num = div.find("span")
        title = div.find("b")
        p = div.find("p")
        site_data["process"].append({
            "step": num.text.strip() if num else "",
            "title": title.text.strip() if title else "",
            "description": p.text.strip() if p else ""
        })

# Pricing Packages
for card in soup_home.find_all("article", class_="price-card"):
    h3 = card.find("h3")
    price = card.find("strong")
    notes = card.find("small")
    features = [li.text.strip() for li in card.find_all("li")]
    site_data["packages"].append({
        "name": h3.text.strip() if h3 else "",
        "price": price.text.strip() if price else "",
        "notes": notes.text.strip() if notes else "",
        "features": features
    })

# FAQs
faq_div = soup_home.find("div", class_="faq-blog-grid")
if faq_div:
    for details in faq_div.find_all("details"):
        q = details.find("summary")
        a = details.find("p")
        site_data["faqs"].append({
            "question": q.text.strip() if q else "",
            "answer": a.text.strip() if a else ""
        })

print("=== 2. Crawling Blog Posts ===")
r_blog = session.get(f"{BASE_URL}/blog.php")
with open(os.path.join(PAGES_DIR, "blog.html"), "w", encoding="utf-8") as f:
    f.write(r_blog.text)

soup_blog = BeautifulSoup(r_blog.text, "html.parser")
for art in soup_blog.find_all("article"):
    h3 = art.find("h3")
    p = art.find("p")
    link = art.find("a")
    slug = link.get("href") if link else ""
    post_item = {
        "title": h3.text.strip() if h3 else "",
        "summary": p.text.strip() if p else "",
        "url": slug,
        "content": "",
        "date": ""
    }
    if slug:
        post_url = urllib.parse.urljoin(BASE_URL, slug)
        r_post = session.get(post_url)
        soup_post = BeautifulSoup(r_post.text, "html.parser")
        date_el = soup_post.find("section", class_="page-hero")
        if date_el and date_el.find("p"):
            post_item["date"] = date_el.find("p").text.strip()
        body_el = soup_post.find("div", class_="appointment-card") or soup_post.find("section", class_="section")
        if body_el:
            post_item["content"] = body_el.text.strip()
    site_data["blogs"].append(post_item)

# Save JSON data
with open(os.path.join(DATA_DIR, "driving_school_data.json"), "w", encoding="utf-8") as f:
    json.dump(site_data, f, ensure_ascii=False, indent=2)
print("Saved data to data/driving_school_data.json")

print("=== 3. Downloading Images & Media Assets ===")
images_to_download = [
    "uploads/20260704021339_b2cddb94.png",
    "uploads/20260704021512_f8f77a39.png",
    "uploads/20260704021512_2e0e0bb5.png",
    "assets/img/license-a.png",
    "assets/img/license-b.png",
    "assets/img/license-b78.png",
    "assets/img/license-b197.png",
    "assets/img/hero-car-night.png"
]

for img_path in images_to_download:
    download_file(img_path, IMAGES_DIR)

print("=== Scraping Completed Successfully ===")
