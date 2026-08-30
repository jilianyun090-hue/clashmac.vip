# Bing 流量下滑紧急诊断清单

## 立即检查项目

### 1. Bing Webmaster Tools 检查

登录：https://www.bing.com/webmasters

#### A. 检查索引状态
- 路径：Site Explorer → Pages → Indexed Pages
- **查看**：索引页面数量是否下降
- **对比**：8月16日前后的索引数量变化

#### B. 检查手动惩罚
- 路径：Security & Manual Actions
- **查看**：是否有手动惩罚通知
- **记录**：任何警告或错误

#### C. 检查爬取错误
- 路径：Diagnostics & Tools → Crawl Control
- **查看**：爬取错误数量
- **记录**：哪些页面被拒绝

#### D. 检查 Sitemap 状态
- 路径：Sitemaps
- **查看**：sitemap.xml 是否正常提交
- **检查**：提交的URL数 vs 索引的URL数

---

### 2. 网站技术检查

#### A. 检查 robots.txt
```bash
curl https://clashmac.vip/robots.txt
```
确认：
- [ ] 没有误屏蔽重要页面
- [ ] Sitemap 路径正确

#### B. 检查 Sitemap
```bash
curl https://clashmac.vip/sitemap.xml | head -50
```
确认：
- [ ] 所有URL可访问
- [ ] lastmod 日期正确

#### C. 检查关键页面状态码
```bash
# 检查首页
curl -I https://clashmac.vip

# 检查机场推荐页
curl -I https://clashmac.vip/2026/02/20/airport-recommendations/
```
确认：
- [ ] 返回 200 状态码
- [ ] 无 301/302 重定向循环

---

### 3. 竞争对手分析

#### A. 检查排名变化
在 Bing 搜索以下关键词，记录前10名：
- `机场推荐`
- `梯子推荐`
- `letsvpn`
- `快连VPN`

#### B. 分析竞争对手
对于排在你前面的网站：
- 记录域名
- 查看内容质量
- 分析更新频率

---

### 4. 内容质量检查

#### A. 检查重复标题（Bing警告）
```bash
# 生成所有页面标题列表
find 2026 archives tags categories -name "index.html" -exec grep -o '<title>[^<]*</title>' {} \; | sort | uniq -c | sort -rn | head -20
```

找出重复的标题：
- [ ] 分页标题（page/2, page/3）
- [ ] 标签页标题
- [ ] 分类页标题

#### B. 检查重复描述
```bash
find 2026 -name "index.html" -exec grep -o '<meta name="description" content="[^"]*"' {} \; | sort | uniq -c | sort -rn | head -20
```

---

## 诊断记录表

### Bing Webmaster 数据

| 项目 | 8月15日前 | 8月29日 | 变化 |
|------|----------|---------|------|
| 索引页面数 | ? | ? | ? |
| 爬取错误 | ? | ? | ? |
| Sitemap提交URL | ? | ? | ? |
| Sitemap索引URL | ? | ? | ? |

### 手动惩罚
- [ ] 无
- [ ] 有（详细记录）：

### 爬取错误 Top 5
1. 
2. 
3. 
4. 
5. 

### 竞争对手排名（关键词：机场推荐）
1. 
2. 
3. 
你的排名：

---

## 初步诊断结论

根据以上检查，流量下滑可能是因为：
- [ ] Bing 索引下降
- [ ] 手动惩罚
- [ ] 技术问题（robots.txt/sitemap）
- [ ] 竞争对手超越
- [ ] 内容质量问题
- [ ] 算法更新

---

**下一步**：根据诊断结果制定具体修复方案
