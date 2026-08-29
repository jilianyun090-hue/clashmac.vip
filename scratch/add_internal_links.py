#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""为关键文章添加内链策略"""

import os
import re

BASE_DIR = "source/_posts"

# 定义内链规则
INTERNAL_LINKS = {
    # 线路科普三篇文章互链
    "airport-routes-difference.md": {
        "append": """
---

## 相关阅读

- [机场线路选购指南](/2026/03/01/airport-routes-selection/) - CN2 GIA/IPLC/BGP如何选择
- [如何判断机场真实线路](/2026/03/01/determine-line-type/) - 避免被虚假宣传欺骗
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 精选IPLC/IEPL专线机场
- [如何选择机场？](/2026/03/01/how-to-choose-airport/) - 新手避坑完全指南

---

**本文最后更新**：2026年8月29日
"""
    },

    "airport-routes-selection.md": {
        "append": """
---

## 相关阅读

- [机场线路详解](/2026/03/01/airport-routes-difference/) - IPLC、CN2、BGP区别科普
- [如何判断机场真实线路](/2026/03/01/determine-line-type/) - 验证方法与检测工具
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 各类线路机场推荐
- [机场测速分析](/2026/03/25/airport-speed-analysis/) - 影响速度的关键因素

---

**本文最后更新**：2026年8月29日
"""
    },

    "determine-line-type.md": {
        "append": """
---

## 相关阅读

- [机场线路类型详解](/2026/03/01/airport-routes-difference/) - IPLC/CN2/BGP基础知识
- [机场线路选购指南](/2026/03/01/airport-routes-selection/) - 不同场景如何选择
- [如何选择机场？](/2026/03/01/how-to-choose-airport/) - 防跑路避坑指南
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 真专线机场推荐

---

**本文最后更新**：2026年8月29日
"""
    },

    # 机场对比文章
    "airport-vs-vpn.md": {
        "append": """
---

## 相关阅读

- [机场vs传统VPN深度对比](/2026/08/24/airport-vs-traditional-vpn-2026/) - 2026年最新对比分析
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 稳定高速机场精选
- [如何选择机场？](/2026/03/01/how-to-choose-airport/) - 新手避坑指南
- [快连VPN为什么停运？](/2026/04/28/letsvpn-shutdown-2026/) - 大厂VPN倒下的原因

---

**本文最后更新**：2026年8月29日
"""
    },

    # 客户端教程添加返回链接
    "clash-verge-rev-tutorial.md": {
        "append": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点
- [机场连不上怎么办？](/2026/08/25/airport-connection-troubleshooting/) - 常见问题排查
- [Clash停更迁移指南](/2026/08/24/clash-to-mihomo-migration-2026/) - Mihomo使用教程

---

**本文最后更新**：2026年8月29日
"""
    },

    "clash-meta-android-tutorial.md": {
        "append": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点
- [Nekobox使用教程](/2026/03/29/nekobox-tutorial/) - 另一款优秀安卓客户端
- [手机翻墙指南](/2026/03/01/mobile-vpn-guide/) - iOS/Android完整方案

---

**本文最后更新**：2026年8月29日
"""
    },

    "shadowrocket-v2-tutorial.md": {
        "append": """
---

## 相关推荐

- [Shadowrocket完整使用教程](/2026/08/25/shadowrocket-complete-guide-2026/) - 从入门到精通
- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点
- [Quantumult X教程](/2026/03/29/quantumult-x-tutorial/) - iOS高级客户端

---

**本文最后更新**：2026年8月29日
"""
    },

    "v2rayn-v2-tutorial.md": {
        "append": """
---

## 相关推荐

- [返回软件下载合集](/2026/03/29/software/) - 查看其他客户端
- [Clash Verge Rev教程](/2026/03/29/clash-verge-rev-tutorial/) - 更现代的选择
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 获取稳定节点
- [机场连不上怎么办？](/2026/08/25/airport-connection-troubleshooting/) - 常见问题排查

---

**本文最后更新**：2026年8月29日
"""
    },

    # AI工具文章
    "chatgpt-mirrors-guide.md": {
        "append": """
---

## 相关推荐

- [Claude使用教程](/2026/03/01/claude-guide/) - 国内直连Claude方法
- [Gemini使用教程](/2026/03/01/gemini-in-china/) - Google AI工具
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 支持ChatGPT原生IP的机场

---

**本文最后更新**：2026年8月29日
"""
    },

    "netflix-guide.md": {
        "append": """
---

## 相关推荐

- [Netflix分级制度详解](/2026/03/01/netflix-secret-classification/) - 账号限制原因
- [流媒体账号购买指南](/2026/03/01/streaming-accounts-guide/) - Netflix/Disney+/Spotify
- [2026年机场推荐](/2026/02/20/airport-recommendations/) - 支持Netflix解锁的机场

---

**本文最后更新**：2026年8月29日
"""
    },
}

def add_internal_links(filename, config):
    """为文章添加内链"""
    filepath = os.path.join(BASE_DIR, filename)

    if not os.path.exists(filepath):
        return False, "文件不存在"

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否已有"相关阅读"或"相关推荐"
        if re.search(r'##\s*(相关阅读|相关推荐|相关内容)', content):
            return False, "已存在相关链接章节"

        # 检查是否已有"本文最后更新"
        if "本文最后更新" in content:
            return False, "已添加过内链"

        # 在文件末尾添加内链
        if 'append' in config:
            # 移除末尾多余的空行
            content = content.rstrip() + "\n"
            content += config['append']

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

            return True, "添加成功"

        return False, "无配置"

    except Exception as e:
        return False, str(e)

def main():
    print("=" * 60)
    print("批量添加内链策略")
    print("=" * 60)
    print()

    success_count = 0
    skip_count = 0
    error_count = 0

    for filename, config in INTERNAL_LINKS.items():
        success, message = add_internal_links(filename, config)

        if success:
            print(f"✓ {filename:<45} 添加成功")
            success_count += 1
        elif "已存在" in message or "已添加" in message:
            print(f"⊙ {filename:<45} {message}")
            skip_count += 1
        else:
            print(f"✗ {filename:<45} {message}")
            error_count += 1

    print()
    print("=" * 60)
    print(f"完成统计：成功 {success_count} | 跳过 {skip_count} | 失败 {error_count}")
    print("=" * 60)

if __name__ == "__main__":
    main()
