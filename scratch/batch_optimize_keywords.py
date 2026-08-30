#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""批量优化关键文章的标题和关键词"""

import re

# 优化配置
OPTIMIZATIONS = {
    "airport-vs-vpn.md": {
        "title": "机场vpn是什么？机场和VPN的区别 | 2026完整对比分析",
        "updated": "2026-08-29 18:00:00",
        "keywords": "机场vpn, 梯子vpn, vpn梯子, 机场和vpn的区别, 机场vs VPN, 机场和VPN哪个好, 科学上网",
        "description": "机场vpn是什么？机场和VPN有什么区别？本文从技术原理、使用体验、价格、稳定性等6个维度深度对比机场与VPN，帮你选择最适合的科学上网方案。"
    },

    "letsvpn-shutdown-2026.md": {
        "title": "快连VPN停运真相 | 快连是什么？为什么关停？2026完整分析",
        "keywords": "快连, 快连VPN, 快连加速器, 快连是什么, kuailian, 快连停运, 快连关停, 快连替代, letsvpn, 快连VPN怎么样",
    },
}

def update_frontmatter(filepath, config):
    """更新文章的 frontmatter"""
    try:
        with open(f"source/_posts/{filepath}", 'r', encoding='utf-8') as f:
            content = f.read()

        # 更新 title
        if 'title' in config:
            content = re.sub(
                r'^title:.*$',
                f'title: {config["title"]}',
                content,
                flags=re.MULTILINE
            )

        # 更新 updated
        if 'updated' in config:
            if re.search(r'^updated:', content, re.MULTILINE):
                content = re.sub(
                    r'^updated:.*$',
                    f'updated: {config["updated"]}',
                    content,
                    flags=re.MULTILINE
                )
            else:
                content = re.sub(
                    r'^(date:.*)$',
                    f'\\1\nupdated: {config["updated"]}',
                    content,
                    flags=re.MULTILINE
                )

        # 更新 keywords
        if 'keywords' in config:
            if re.search(r'^keywords:', content, re.MULTILINE):
                content = re.sub(
                    r'^keywords:.*$',
                    f'keywords: {config["keywords"]}',
                    content,
                    flags=re.MULTILINE
                )
            else:
                content = re.sub(
                    r'^(categories:.*)$',
                    f'\\1\nkeywords: {config["keywords"]}',
                    content,
                    flags=re.MULTILINE
                )

        # 更新 description
        if 'description' in config:
            content = re.sub(
                r'^description:.*$',
                f'description: "{config["description"]}"',
                content,
                flags=re.MULTILINE
            )

        with open(f"source/_posts/{filepath}", 'w', encoding='utf-8') as f:
            f.write(content)

        return True, "成功"

    except Exception as e:
        return False, str(e)

def main():
    print("=" * 60)
    print("批量优化关键文章")
    print("=" * 60)
    print()

    success = 0
    fail = 0

    for filename, config in OPTIMIZATIONS.items():
        ok, msg = update_frontmatter(filename, config)

        if ok:
            print(f"✓ {filename:<40} {msg}")
            success += 1
        else:
            print(f"✗ {filename:<40} {msg}")
            fail += 1

    print()
    print("=" * 60)
    print(f"完成：成功 {success} | 失败 {fail}")
    print("=" * 60)

if __name__ == "__main__":
    main()
