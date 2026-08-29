#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""为其他客户端教程添加内链"""

import os
import re

BASE_DIR = "source/_posts"

# 其他客户端教程的内链配置
ADDITIONAL_LINKS = {
    "quantumult-x-tutorial.md": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [Shadowrocket使用教程](/2026/03/29/shadowrocket-v2-tutorial/) - iOS另一款优秀客户端
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点
- [手机翻墙指南](/2026/03/01/mobile-vpn-guide/) - iOS/Android完整方案

---

**本文最后更新**：2026年8月29日
""",

    "nekobox-tutorial.md": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [Clash Meta教程](/2026/03/29/clash-meta-android-tutorial/) - 安卓首选Clash客户端
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点
- [手机翻墙指南](/2026/03/01/mobile-vpn-guide/) - iOS/Android完整方案

---

**本文最后更新**：2026年8月29日
""",

    "flclash-tutorial.md": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [Clash Verge Rev教程](/2026/03/29/clash-verge-rev-tutorial/) - 桌面端首选
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点
- [机场连不上怎么办？](/2026/08/25/airport-connection-troubleshooting/) - 常见问题排查

---

**本文最后更新**：2026年8月29日
""",

    "egern-tutorial.md": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [Shadowrocket使用教程](/2026/03/29/shadowrocket-v2-tutorial/) - iOS经典客户端
- [Quantumult X教程](/2026/03/29/quantumult-x-tutorial/) - iOS高级客户端
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点

---

**本文最后更新**：2026年8月29日
""",

    "clashmi-tutorial.md": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [Clash Verge Rev教程](/2026/03/29/clash-verge-rev-tutorial/) - 另一款优秀Clash客户端
- [Clash停更迁移指南](/2026/08/24/clash-to-mihomo-migration-2026/) - Mihomo核心介绍
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点

---

**本文最后更新**：2026年8月29日
""",

    "clash-party-tutorial.md": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [Clash Verge Rev教程](/2026/03/29/clash-verge-rev-tutorial/) - 功能更强大的选择
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点
- [机场连不上怎么办？](/2026/08/25/airport-connection-troubleshooting/) - 常见问题排查

---

**本文最后更新**：2026年8月29日
""",

    "mobile-vpn-guide.md": """
---

## 相关推荐

### iOS教程
- [Shadowrocket使用教程](/2026/03/29/shadowrocket-v2-tutorial/) - 小火箭详细配置
- [Shadowrocket完整指南](/2026/08/25/shadowrocket-complete-guide-2026/) - 从入门到精通
- [Quantumult X教程](/2026/03/29/quantumult-x-tutorial/) - 高级用户首选

### Android教程
- [Clash Meta教程](/2026/03/29/clash-meta-android-tutorial/) - 安卓首选
- [Nekobox教程](/2026/03/29/nekobox-tutorial/) - 猫盒使用指南

### 机场推荐
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 全平台稳定机场
- [学生党机场推荐](/2026/04/25/best-budget-airport-for-students/) - 低价高性价比
- [如何选择机场？](/2026/03/01/how-to-choose-airport/) - 新手避坑指南

---

**本文最后更新**：2026年8月29日
""",

    "claude-guide.md": """
---

## 相关推荐

- [ChatGPT镜像站推荐](/2026/03/01/chatgpt-mirrors-guide/) - 国内直连ChatGPT
- [Gemini使用教程](/2026/03/01/gemini-in-china/) - Google AI工具
- [Grok 4使用教程](/2026/03/01/grok-4-tutorial/) - X平台AI助手
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 支持AI工具的机场

---

**本文最后更新**：2026年8月29日
""",

    "gemini-in-china.md": """
---

## 相关推荐

- [ChatGPT镜像站推荐](/2026/03/01/chatgpt-mirrors-guide/) - 国内直连ChatGPT
- [Claude使用教程](/2026/03/01/claude-guide/) - Anthropic AI助手
- [Grok 4使用教程](/2026/03/01/grok-4-tutorial/) - X平台AI工具
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 支持AI工具的机场

---

**本文最后更新**：2026年8月29日
""",

    "telegram-guide.md": """
---

## 相关推荐

- [Telegram搜索指南](/2026/03/01/telegram-search-guide/) - 极搜使用教程
- [接码平台推荐](/2026/03/01/sms-verification-platforms/) - 注册Telegram必备
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 稳定翻墙访问Telegram

---

**本文最后更新**：2026年8月29日
""",
}

def add_links_to_file(filename, links_content):
    """为文件添加内链"""
    filepath = os.path.join(BASE_DIR, filename)

    if not os.path.exists(filepath):
        return False, "文件不存在"

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否已有相关链接
        if re.search(r'##\s*(相关阅读|相关推荐|相关内容)', content):
            return False, "已存在"

        if "本文最后更新" in content:
            return False, "已添加"

        # 在文件末尾添加
        content = content.rstrip() + "\n" + links_content

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        return True, "成功"

    except Exception as e:
        return False, str(e)

def main():
    print("=" * 60)
    print("添加其他客户端教程内链")
    print("=" * 60)
    print()

    success = 0
    skip = 0

    for filename, links in ADDITIONAL_LINKS.items():
        ok, msg = add_links_to_file(filename, links)

        if ok:
            print(f"✓ {filename:<45} 添加成功")
            success += 1
        else:
            print(f"⊙ {filename:<45} {msg}")
            skip += 1

    print()
    print("=" * 60)
    print(f"统计：成功 {success} | 跳过 {skip}")
    print("=" * 60)

if __name__ == "__main__":
    main()
