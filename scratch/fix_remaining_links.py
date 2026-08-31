#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""修复所有剩余死链和双重日期问题"""

import os
import re

def fix_file(filepath):
    """修复单个文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. 修复双重日期 /2026/MM/DD/2026/MM/DD/xxx/ → /2026/MM/DD/xxx/
    content = re.sub(r'/2026/\d{2}/\d{2}(/2026/\d{2}/\d{2}/[a-z0-9\-]+/)', r'\1', content)

    # 2. 修复错误日期的具体链接
    fixes = {
        '/2026/03/15/airport-routes-difference/': '/2026/03/01/airport-routes-difference/',
        '/2026/03/21/how-to-choose-airport/': '/2026/03/01/how-to-choose-airport/',
        '/2026/03/25/airport-routes-selection/': '/2026/03/01/airport-routes-selection/',
        '/2026/09/23/how-to-choose-airport/': '/2026/03/01/how-to-choose-airport/',
        '/2026/03/14/openclaw-tutorial/': '/2026/03/01/openclaw-tutorial/',
        '/2026/03/29/openclaw-tutorial/': '/2026/03/01/openclaw-tutorial/',
    }

    for old, new in fixes.items():
        content = content.replace(old, new)

    # 3. 删除 us-apple-id-guide 链接（保留文本）
    content = re.sub(r'\[([^\]]+)\]\(/2026/\d{2}/\d{2}/us-apple-id-guide/\)', r'\1', content)

    # 4. serve/sharing/acc 链接删除
    content = re.sub(r'<a[^>]*href="/serve/sharing/acc[^"]*"[^>]*>([^<]*)</a>', r'\1', content)

    # 5. /software/ → /2026/03/29/software/ (docs文件)
    if '/docs/proxy/' in filepath:
        content = content.replace('href="/software/"', 'href="/2026/03/29/software/"')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 70)
    print("修复剩余死链和双重日期")
    print("=" * 70)

    fixed = 0

    # 修复文章
    print("\n修复文章...")
    for filename in sorted(os.listdir("source/_posts")):
        if not filename.endswith('.md'):
            continue
        filepath = os.path.join("source/_posts", filename)
        if fix_file(filepath):
            print(f"  ✓ {filename}")
            fixed += 1

    # 修复docs
    print("\n修复docs...")
    docs_dir = "source/docs/proxy"
    if os.path.exists(docs_dir):
        for subdir in os.listdir(docs_dir):
            html_file = os.path.join(docs_dir, subdir, 'index.html')
            if os.path.exists(html_file):
                if fix_file(html_file):
                    print(f"  ✓ {subdir}/index.html")
                    fixed += 1

    print("\n" + "=" * 70)
    print(f"完成：修复 {fixed} 个文件")
    print("=" * 70)

if __name__ == "__main__":
    main()
