import os
import re
import xml.etree.ElementTree as ET
import urllib.request
import json

SITEMAP_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'sitemap.xml')
HOST = 'clashmac.vip'
KEY = '12a9889fbf3e4ca29d6272a042c1dc73'
KEY_LOCATION = f'https://{HOST}/{KEY}.txt'
INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

def get_urls_from_sitemap():
    urls = []
    if os.path.exists(SITEMAP_PATH):
        try:
            tree = ET.parse(SITEMAP_PATH)
            root = tree.getroot()
            # Namespace handling for sitemap
            ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            for loc in root.findall('.//sm:loc', ns):
                if loc.text:
                    urls.append(loc.text.strip())
        except Exception as e:
            print(f"Error parsing sitemap.xml: {e}")
    else:
        print(f"Sitemap file not found at {SITEMAP_PATH}, fallback to parsing hexo posts.")
    
    # Backup: if empty, add core URLs manually
    if not urls:
        urls = [
            f"https://{HOST}/",
            f"https://{HOST}/archives/",
            f"https://{HOST}/categories/",
            f"https://{HOST}/tags/",
            f"https://{HOST}/software/",
        ]
    return list(set(urls))

def submit_indexnow(url_list):
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": url_list
    }
    data = json.dumps(payload).encode('utf-8')
    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'IndexNowSubmitter/1.0'
    }
    
    endpoints = [
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow'
    ]
    
    print(f"Preparing to submit {len(url_list)} URLs to IndexNow...")
    for endpoint in endpoints:
        try:
            req = urllib.request.Request(endpoint, data=data, headers=headers, method='POST')
            with urllib.request.urlopen(req) as resp:
                status = resp.getcode()
                body = resp.read().decode('utf-8')
                print(f"[{endpoint}] Response status: {status}, body: {body if body else 'OK'}")
        except Exception as e:
            print(f"[{endpoint}] Failed to submit: {e}")

if __name__ == '__main__':
    urls = get_urls_from_sitemap()
    print(f"Found {len(urls)} URLs.")
    if urls:
        submit_indexnow(urls)
