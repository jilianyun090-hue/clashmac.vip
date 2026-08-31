#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""全站内链日期修复脚本"""

import os
import re

# 客户端教程的正确日期映射
CORRECT_DATES = {
    'clash-verge-rev-tutorial': '2026/03/29',
    'clash-meta-android-tutorial': '2026/03/29',
    'shadowrocket-v2-tutorial': '2026/03/29',
    'v2rayn-v2-tutorial': '2026/03/29',
    'flclash-tutorial': '2026/03/29',
    'clashmi-tutorial': '2026/03/29',
    'clash-party-tutorial': '2026/03/29',
    'nekobox-tutorial': '2026/03/29',
    'quantumult-x-tutorial': '2026/03/29',
    'egern-tutorial': '2026/03/29',
}

def fix_links_in_file(filepath):
    """修复单个文件中的所有链接"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # 对每个教程进行检查和修正
        for tutorial, correct_date in CORRECT_DATES.items():
            # 匹配所有可能的错误日期格式
            pattern = r'/2026/\d{2}/\d{2}/' + tutorial + r'/'

            def replace_func(match):
                old_link = match.group(0)
                correct_link = f'/{correct_date}/{tutorial}/'
                if old_link != correct_link:
                    print(f"  修正: {old_link} → {correct_link}")
                    return correct_link
                return old_link

            content = re.sub(pattern, replace_func, content)

        # 如果有修改，写回文件
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False

    except Exception as e:
        print(f"  ✗ 错误: {e}")
        return False

def main():
    print("=" * 60)
    print("全站内链日期修复")
    print("=" * 60)
    print()

    posts_dir = "source/_posts"
    files = [f for f in os.listdir(posts_dir) if f.endswith('.md')]

    fixed_count = 0

    for filename in sorted(files):
        filepath = os.path.join(posts_dir, filename)
        print(f"检查: {filename}")

        if fix_links_in_file(filepath):
            print(f"  ✓ {filename} 已修复")
            fixed_count += 1

    print()
    print("=" * 60)
    print(f"完成：共修复 {fixed_count} 个文件")
    print("=" * 60)

if __name__ == "__main__":
    main()
