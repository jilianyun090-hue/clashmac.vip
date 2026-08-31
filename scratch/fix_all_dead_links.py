#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""批量修复全站死链"""

import os
import re

# 死链到正确链接的映射
LINK_FIXES = {
    # 日期错误的链接修正
    '/2026/02/17/airport-vs-vpn/': '/2026/03/01/airport-vs-vpn/',
    '/2026/03/06/airport-vs-vpn/': '/2026/03/01/airport-vs-vpn/',
    '/2026/03/06/how-to-choose-airport/': '/2026/03/01/how-to-choose-airport/',
    '/2026/03/14/openclaw-tutorial/': '/2026/03/29/openclaw-tutorial/',
    '/2026/03/17/mobile-vpn-guide/': '/2026/03/01/mobile-vpn-guide/',
    '/2026/03/21/airport-routes-difference/': '/2026/03/01/airport-routes-difference/',
    '/2026/03/21/airport-routes-selection/': '/2026/03/01/airport-routes-selection/',

    # 不存在的文章替换为相关文章
    '/2026/03/01/streaming-accounts-guide/': '/2026/03/01/streaming-accounts-guide/',  # 保持
    '/airport-warning-signs/': '/how-to-choose-airport/',
    '/determine-airport-reliability/': '/how-to-choose-airport/',
    '/ios-vpn-complete-guide/': '/2026/03/01/mobile-vpn-guide/',
    '/shadowrocket-tutorial/': '/2026/03/29/shadowrocket-v2-tutorial/',
    '/us-apple-id-guide/': '',  # 删除链接

    # 分类链接
    '/categories/%E6%8E%A5%E7%A0%81%E5%B9%B3%E5%8F%B0/': '/2026/03/01/sms-verification-platforms/',
    '/categories/%E6%B5%81%E5%AA%92%E4%BD%93%E8%B4%A6%E5%8F%B7/': '/2026/03/01/streaming-accounts-guide/',

    # docs里的software链接
    '/software/': '/2026/03/29/software/',

    # 删除serve链接
    '/serve/sharing/acc': '',
}

def fix_file(filepath):
    """修复单个文件中的死链"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    fixed_count = 0

    for old_link, new_link in LINK_FIXES.items():
        if old_link in content:
            if new_link:
                # 替换为新链接
                content = content.replace(old_link, new_link)
            else:
                # 删除整个链接（保留文本）
                # 处理markdown格式 [text](dead_link)
                pattern = r'\[([^\]]+)\]\(' + re.escape(old_link) + r'\)'
                content = re.sub(pattern, r'\1', content)
                # 处理HTML格式 <a href="dead_link">text</a>
                pattern = r'<a[^>]*href="' + re.escape(old_link) + r'"[^>]*>([^<]*)</a>'
                content = re.sub(pattern, r'\1', content)

            if content != original:
                fixed_count += 1

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 70)
    print("批量修复全站死链")
    print("=" * 70)

    # 修复 markdown 源文件
    posts_dir = "source/_posts"
    fixed_posts = 0

    print("\n修复文章源文件...")
    for filename in sorted(os.listdir(posts_dir)):
        if not filename.endswith('.md'):
            continue
        filepath = os.path.join(posts_dir, filename)
        if fix_file(filepath):
            print(f"  ✓ {filename}")
            fixed_posts += 1

    # 修复 docs 静态文件
    docs_dir = "source/docs/proxy"
    fixed_docs = 0

    print("\n修复docs静态文件...")
    if os.path.exists(docs_dir):
        for subdir in os.listdir(docs_dir):
            html_file = os.path.join(docs_dir, subdir, 'index.html')
            if os.path.exists(html_file):
                if fix_file(html_file):
                    print(f"  ✓ {subdir}/index.html")
                    fixed_docs += 1

    print("\n" + "=" * 70)
    print(f"完成：修复 {fixed_posts} 个文章，{fixed_docs} 个docs页面")
    print("=" * 70)

if __name__ == "__main__":
    main()
