#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""批量更新文章的 updated 时间"""

import re
import os

UPDATE_DATE = "2026-08-29 17:00:00"

# 中层核心文章
MIDDLE_TIER = [
    "airport-routes-difference.md",
    "airport-routes-selection.md",
    "determine-line-type.md",
    "airport-speed-analysis.md",
    "airport-vs-vpn.md",
    "mobile-vpn-guide.md",
    "clash-verge-rev-tutorial.md",
    "clash-meta-android-tutorial.md",
    "shadowrocket-v2-tutorial.md",
    "v2rayn-v2-tutorial.md",
]

# 其他重要文章
OTHER_ARTICLES = [
    "chatgpt-mirrors-guide.md",
    "claude-guide.md",
    "gemini-in-china.md",
    "netflix-guide.md",
    "telegram-guide.md",
    "quantumult-x-tutorial.md",
    "nekobox-tutorial.md",
    "flclash-tutorial.md",
    "egern-tutorial.md",
    "clashmi-tutorial.md",
    "clash-party-tutorial.md",
]

def update_file_date(filepath):
    """更新文件的 updated 字段"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否已有 updated 字段
        if re.search(r'^updated:', content, re.MULTILINE):
            # 更新现有的 updated 字段
            content = re.sub(
                r'^updated:.*$',
                f'updated: {UPDATE_DATE}',
                content,
                flags=re.MULTILINE
            )
        else:
            # 在 date 后添加 updated 字段
            content = re.sub(
                r'^(date:.*)$',
                f'\\1\nupdated: {UPDATE_DATE}',
                content,
                flags=re.MULTILINE
            )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        return True
    except Exception as e:
        print(f"  ✗ 错误: {e}")
        return False

def main():
    base_dir = "source/_posts"

    print("=" * 60)
    print("批量更新文章时间")
    print("=" * 60)
    print()

    # 更新中层文章
    print("📝 更新中层核心文章...")
    for filename in MIDDLE_TIER:
        filepath = os.path.join(base_dir, filename)
        if os.path.exists(filepath):
            if update_file_date(filepath):
                print(f"  ✓ {filename}")
            else:
                print(f"  ✗ {filename} 更新失败")
        else:
            print(f"  ⚠ {filename} 不存在")

    print()
    print("📝 更新其他重要文章...")
    for filename in OTHER_ARTICLES:
        filepath = os.path.join(base_dir, filename)
        if os.path.exists(filepath):
            if update_file_date(filepath):
                print(f"  ✓ {filename}")
            else:
                print(f"  ✗ {filename} 更新失败")
        else:
            print(f"  ⚠ {filename} 不存在")

    print()
    print("=" * 60)
    print("✅ 批量更新完成！")
    print("=" * 60)

if __name__ == "__main__":
    main()
