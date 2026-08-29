# 内容矩阵与内链策略规划

## 📊 当前内容分析（51篇文章）

### 顶层内容（权威页面）- 5篇
1. **airport-recommendations.md** - 2026年机场推荐（核心页面）
2. **vpn-ladder-recommendation-2026.md** - 2026年梯子推荐
3. **how-to-choose-airport.md** - 如何选择机场（避坑指南）
4. **software.md** - 翻墙软件推荐（全平台）
5. **cost-effective-airports-2026.md** - 性价比机场推荐

### 中层内容（专题页面）- 15篇

#### 机场专题
- **best-budget-airport-for-students.md** - 学生党机场
- **lesvpn-alternatives-2026.md** - lesvpn替代方案
- **airport-vs-traditional-vpn-2026.md** - 机场vs传统VPN
- **airport-vs-vpn.md** - 机场vs VPN区别

#### 知识库专题
- **airport-routes-difference.md** - 线路科普（IPLC/CN2/BGP）
- **airport-routes-selection.md** - 线路选购指南
- **determine-line-type.md** - 如何判断线路类型
- **airport-speed-analysis.md** - 测速分析

#### 事件追踪专题
- **letsvpn-shutdown-2026.md** - 快连VPN停运
- **airport-network-incident-2026.md** - 2026机场封锁事件
- **2026-iepl-enforcement-impact.md** - IEPL整改事件

#### 客户端专题
- **clash-to-mihomo-migration-2026.md** - Clash迁移Mihomo
- **shadowrocket-complete-guide-2026.md** - 小火箭完整教程
- **airport-connection-troubleshooting.md** - 连不上解决方案

#### 其他专题
- **mobile-vpn-guide.md** - 手机翻墙指南
- **router-vpn-setup-2026.md** - 路由器翻墙

### 底层内容（长尾页面）- 31篇

#### 客户端教程（10篇）
- clash-verge-rev-tutorial.md
- clash-meta-android-tutorial.md
- clash-party-tutorial.md
- clashmi-tutorial.md
- shadowrocket-v2-tutorial.md
- quantumult-x-tutorial.md
- nekobox-tutorial.md
- egern-tutorial.md
- flclash-tutorial.md
- v2rayn-v2-tutorial.md

#### 技术问题（4篇）
- is-100gb-airport-data-enough.md
- why-airports-cheap-1000g-vs-expensive-100g.md
- airport-custom-client-vs-clash-v2ray.md
- soft-router-guide-2026.md

#### AI工具（4篇）
- chatgpt-mirrors-guide.md
- claude-guide.md
- gemini-in-china.md
- grok-4-tutorial.md

#### 流媒体（5篇）
- netflix-guide.md
- netflix-secret-classification.md
- spotify-guide.md
- streaming-accounts-guide.md
- tiktok-not-working.md

#### 其他工具（8篇）
- telegram-guide.md
- telegram-search-guide.md
- midjourney-guide.md
- sms-verification-platforms.md
- openclaw-tutorial.md
- gfw-websites-guide.md
- test-post.md（需删除）

---

## 🔗 内链策略设计

### 策略1：顶层页面互链

**airport-recommendations.md** 应该链接到：
- ✅ how-to-choose-airport.md（如何选机场）
- ✅ cost-effective-airports-2026.md（性价比推荐）
- ✅ best-budget-airport-for-students.md（学生党推荐）
- ✅ letsvpn-shutdown-2026.md（快连停运）
- ➕ software.md（客户端下载）
- ➕ airport-connection-troubleshooting.md（连不上怎么办）

### 策略2：中层专题引流到顶层

**所有机场专题** → airport-recommendations.md
**所有客户端教程** → software.md
**所有线路科普** → how-to-choose-airport.md

### 策略3：底层长尾引流到中层

**客户端教程** → 对应的完整教程（如果有）→ software.md → airport-recommendations.md
**技术问题** → 相关知识库 → how-to-choose-airport.md
**AI工具** → 相关机场推荐（需解锁ChatGPT的）

### 策略4：横向相关内容互链

**线路科普三篇文章**：
- airport-routes-difference.md ↔ airport-routes-selection.md ↔ determine-line-type.md

**机场对比两篇**：
- airport-vs-traditional-vpn-2026.md ↔ airport-vs-vpn.md

**Shadowrocket两篇**：
- shadowrocket-complete-guide-2026.md ↔ shadowrocket-v2-tutorial.md

---

## 📅 更新时间策略

### 立即更新（设为 2026-08-29）

**顶层页面（5篇）**：
- ✅ airport-recommendations.md（已更新）
- vpn-ladder-recommendation-2026.md（已是8月25日）
- how-to-choose-airport.md（需更新）
- software.md（需更新）
- cost-effective-airports-2026.md（已是8月25日）

**重要中层页面（10篇）**：
- best-budget-airport-for-students.md
- airport-routes-difference.md
- airport-routes-selection.md
- determine-line-type.md
- airport-speed-analysis.md
- airport-vs-vpn.md
- mobile-vpn-guide.md
- clash-verge-rev-tutorial.md（最常用客户端）
- clash-meta-android-tutorial.md
- shadowrocket-v2-tutorial.md

### 保持原更新时间

**事件类文章（保留真实时间）**：
- letsvpn-shutdown-2026.md（4月28日事件）
- airport-network-incident-2026.md（4月13日事件）
- 2026-iepl-enforcement-impact.md（8月24日）

**新文章（8月下旬）**：
- shadowrocket-complete-guide-2026.md
- airport-connection-troubleshooting.md
- clash-to-mihomo-migration-2026.md
- lesvpn-alternatives-2026.md

---

## 🎯 执行计划

### Phase 1: 更新顶层页面（优先）
1. how-to-choose-airport.md
2. software.md

### Phase 2: 更新中层专题（核心）
3-12. 上述10篇中层页面

### Phase 3: 批量更新底层页面
13-30. 其他需要更新的文章

---

## 📝 内链插入位置规范

### 顶层页面内链位置
- 开头段落：链接到"如何选择"指南
- 推荐列表前：链接到专题推荐
- 文章结尾：相关阅读（3-5个链接）

### 中层页面内链位置
- 开头：面包屑导航 > 顶层页面
- 正文中：自然提及相关文章
- 结尾：返回顶层 + 相关阅读

### 底层页面内链位置
- 开头：返回上级（中层/顶层）
- 正文：提及相关教程
- 结尾：返回软件合集 + 机场推荐
