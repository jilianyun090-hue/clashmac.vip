#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""修正机场编号：从拼好连(原16)开始所有编号+1"""

import re

filepath = "source/_posts/airport-recommendations.md"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 需要修正的编号映射（从大到小替换，避免冲突）
# 原16→17, 17→18, ... 34→35
# 但影子已经是16了（正确），拼好连需要从16改成17开始

# 找到所有 ### N. 标题
# 影子=15(新)✓, 影子后面的拼好连=16需要改成17

# 从后往前替换，避免冲突
replacements = [
    ("### 34. 花云机场", "### 35. 花云机场"),
    ("### 33. 青云梯", "### 34. 青云梯"),
    ("### 32. 飞鸟机场", "### 33. 飞鸟机场"),
    ("### 31. 龙猫云", "### 32. 龙猫云"),
    ("### 30. 大哥云", "### 31. 大哥云"),
    ("### 29. 哆啦A梦", "### 30. 哆啦A梦"),
    ("### 28. lizione", "### 29. lizione"),
    ("### 27. 山海机场", "### 28. 山海机场"),
    ("### 26. 隐云", "### 27. 隐云"),
    ("### 25. 奈云", "### 26. 奈云"),
    ("### 24. 迅达VPN", "### 25. 迅达VPN"),
    ("### 23. 可达加速器", "### 24. 可达加速器"),
    ("### 22. Edge-X", "### 23. Edge-X"),
    ("### 21. 秒秒云", "### 22. 秒秒云"),
    ("### 20. 山水云", "### 21. 山水云"),
    ("### 19. 极速云", "### 20. 极速云"),
    ("### 18. 锦云", "### 19. 锦云"),
    ("### 17. 99吧", "### 18. 99吧"),
    ("### 16. 拼好连", "### 17. 拼好连"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ 编号修正完成")

# 验证
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

numbers = re.findall(r'^### (\d+)\.', content, re.MULTILINE)
print(f"当前编号序列：{numbers}")
