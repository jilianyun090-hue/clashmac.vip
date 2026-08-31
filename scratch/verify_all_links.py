#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""全站链接验证 - 检查所有内部链接是否有效"""

import os
import re
from urllib.parse import unquote
from collections import defaultdict

PUBLIC_DIR = "public"

def get_all_html_files():
    """获取所有HTML文件"""
    files = []
    for root, dirs, filenames in os.walk(PUBLIC_DIR):
        for fn in filenames:
            if fn.endswith('.html'):
                files.append(os.path.join(root, fn))
    return files

def path_exists(link):
    """检查链接对应的文件是否存在"""
    # 去掉query和anchor
    link = link.split('#')[0].split('?')[0]
    if not link or link == '/':
        return os.path.exists(os.path.join(PUBLIC_DIR, 'index.html'))

    # 跳过外部链接
    if link.startswith('//') or link.startswith('http'):
        return True

    link = unquote(link).strip('/')
    # 尝试 link/index.html 或 link
    candidates = [
        os.path.join(PUBLIC_DIR, link, 'index.html'),
        os.path.join(PUBLIC_DIR, link),
    ]
    return any(os.path.exists(c) for c in candidates)

def main():
    print("=" * 70)
    print("全站链接验证 - 检测死链")
    print("=" * 70)

    if not os.path.exists(PUBLIC_DIR):
        print(f"❌ {PUBLIC_DIR} 目录不存在，请先运行 hexo generate")
        return

    files = get_all_html_files()
    print(f"扫描 {len(files)} 个HTML文件\n")

    broken = defaultdict(set)  # broken_link -> set of source files
    checked = set()
    total_links = 0

    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 提取所有 href="/..." 的内部链接
        links = re.findall(r'href="(/[^"]*)"', content)

        for link in links:
            total_links += 1
            # 跳过资源文件
            base_link = link.split('#')[0].split('?')[0]
            if any(base_link.endswith(ext) for ext in [
                '.css', '.js', '.png', '.jpg', '.jpeg', '.webp',
                '.svg', '.ico', '.gif', '.xml', '.txt', '.json',
                '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.pdf'
            ]):
                continue

            # 跳过纯锚点
            if link.startswith('/#'):
                continue

            key = base_link
            if key in checked:
                if key in broken:
                    broken[key].add(os.path.relpath(filepath, PUBLIC_DIR))
                continue

            checked.add(key)

            if not path_exists(link):
                broken[key].add(os.path.relpath(filepath, PUBLIC_DIR))

    print(f"总链接数: {total_links}")
    print(f"唯一链接: {len(checked)}")
    print()

    if broken:
        print(f"❌ 发现 {len(broken)} 个死链：\n")
        for link, sources in sorted(broken.items()):
            print(f"  ✗ {link}")
            source_list = sorted(list(sources))
            if len(source_list) <= 3:
                for src in source_list:
                    print(f"      - {src}")
            else:
                print(f"      出现在 {len(source_list)} 个页面:")
                for src in source_list[:3]:
                    print(f"      - {src}")
                print(f"      ... 及其他 {len(source_list)-3} 个页面")
            print()
    else:
        print("✅ 所有内部链接均有效！")

    print("=" * 70)
    print(f"检查完成：{len(checked)} 个唯一链接，{len(broken)} 个死链")
    print("=" * 70)

    return len(broken) == 0

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
