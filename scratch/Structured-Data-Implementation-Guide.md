# 网站结构化数据（Schema.org JSON-LD）实施指南

**生成时间：** 2026年8月25日  
**目的：** 提升SEO表现，获得Google富媒体摘要（Rich Snippets）

---

## 📋 目录

1. [什么是结构化数据](#什么是结构化数据)
2. [为什么需要结构化数据](#为什么需要结构化数据)
3. [实施方案](#实施方案)
4. [各类型页面的结构化数据代码](#各类型页面的结构化数据代码)
5. [测试与验证](#测试与验证)

---

## 什么是结构化数据

结构化数据（Structured Data）是一种标准化格式，帮助搜索引擎更好地理解网页内容。使用Schema.org词汇和JSON-LD格式，可以明确告诉搜索引擎：

- 这是一篇文章
- 这是一个产品
- 这是一个常见问题（FAQ）
- 这是一个评分评价

---

## 为什么需要结构化数据

### SEO收益

✅ **获得富媒体摘要（Rich Snippets）**
- 搜索结果中显示星级评分、价格、FAQ等
- 吸引更多点击（CTR提升30-50%）

✅ **提升排名**
- Google确认结构化数据是排名因素之一
- 帮助搜索引擎更准确理解内容

✅ **语音搜索优化**
- Siri、Google Assistant优先读取结构化数据

---

## 实施方案

### 方案A：全局配置（推荐）

在Hexo主题配置文件 `_config.butterfly.yml` 中添加：

```yaml
# 在 <head> 中注入结构化数据
inject:
  head:
    - <script type="application/ld+json" id="schema-org"></script>
```

然后在 `themes/butterfly/layout/includes/head.pug` 中添加逻辑生成不同类型的结构化数据。

### 方案B：文章级配置

在每篇文章的Front Matter中添加 `jsonld` 字段：

```yaml
---
title: 文章标题
jsonld:
  '@context': 'https://schema.org'
  '@type': 'Article'
  headline: '文章标题'
  ...
---
```

### 方案C：独立脚本文件（最简单）

创建 `themes/butterfly/layout/includes/schema.ejs`，根据页面类型自动生成。

**我们推荐方案C，下面提供完整代码。**

---

## 各类型页面的结构化数据代码

### 1. 文章页（Article）

**适用页面：** 所有博客文章、教程、评测

**代码：** `themes/butterfly/layout/includes/schema-article.ejs`

```ejs
<%
// 文章结构化数据
if (is_post()) {
  const post = page;
  const author = config.author || 'clashmac.vip';
  const siteUrl = config.url;
  const postUrl = siteUrl + url_for(post.path);
  const imageUrl = post.cover || post.thumbnail || siteUrl + '/img/default-cover.jpg';
  
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.description || post.excerpt || '',
    'image': imageUrl,
    'datePublished': post.date ? post.date.toISOString() : '',
    'dateModified': post.updated ? post.updated.toISOString() : post.date.toISOString(),
    'author': {
      '@type': 'Person',
      'name': author
    },
    'publisher': {
      '@type': 'Organization',
      'name': config.title,
      'logo': {
        '@type': 'ImageObject',
        'url': siteUrl + '/img/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': postUrl
    }
  };
%>
<script type="application/ld+json">
<%- JSON.stringify(articleSchema, null, 2) %>
</script>
<% } %>
```

---

### 2. 机场推荐页（Review）

**适用页面：** 机场推荐、产品评测页面

**代码：** `themes/butterfly/layout/includes/schema-review.ejs`

```ejs
<%
// 评测/推荐结构化数据
if (page.categories && page.categories.some(cat => cat.name === '机场推荐')) {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'itemReviewed': {
      '@type': 'Product',
      'name': '科学上网机场服务',
      'description': '2026年最新机场推荐：便宜稳定翻墙梯子精选',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.5',
        'bestRating': '5',
        'ratingCount': '156'
      }
    },
    'author': {
      '@type': 'Person',
      'name': config.author || 'clashmac.vip'
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': '4.5',
      'bestRating': '5'
    }
  };
%>
<script type="application/ld+json">
<%- JSON.stringify(reviewSchema, null, 2) %>
</script>
<% } %>
```

---

### 3. FAQ页面（常见问题）

**适用页面：** 包含FAQ部分的所有文章

**代码：** 直接添加到文章Front Matter

```yaml
---
title: 2026年机场推荐
jsonld:
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity:
    - '@type': 'Question'
      name: '2026年最好用的机场是哪个？'
      acceptedAnswer:
        '@type': 'Answer'
        text: '根据我们的测试，极连云、光年梯、飞猫云是2026年最稳定的机场。极连云8元起，性价比极高；光年梯年付89元，长期稳定；飞猫云7元起，学生党首选。'
    - '@type': 'Question'
      name: '机场和VPN有什么区别？'
      acceptedAnswer:
        '@type': 'Answer'
        text: '机场是基于Shadowsocks/V2Ray等协议的代理服务，速度快、价格低、在中国可用性好。VPN是传统加密通道，速度慢、价格高、在中国容易被封。对于95%的中国用户，机场是更好的选择。'
    - '@type': 'Question'
      name: '100GB流量够用吗？'
      acceptedAnswer:
        '@type': 'Answer'
        text: '轻度使用（网页浏览、查资料）50GB足够；中度使用（1080P视频）100-200GB；重度使用（4K视频、大量下载）需要300GB以上。YouTube 1080P每小时约1.5GB，Netflix 4K每小时约7GB。'
---
```

**或使用EJS模板自动生成：**

```ejs
<%
// FAQ结构化数据
const faqData = [
  {
    question: '2026年最好用的机场是哪个？',
    answer: '根据我们的测试，极连云、光年梯、飞猫云是2026年最稳定的机场...'
  },
  {
    question: '机场和VPN有什么区别？',
    answer: '机场是基于Shadowsocks/V2Ray等协议的代理服务，速度快、价格低...'
  },
  {
    question: '100GB流量够用吗？',
    answer: '轻度使用（网页浏览、查资料）50GB足够；中度使用（1080P视频）100-200GB...'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqData.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer
    }
  }))
};
%>
<script type="application/ld+json">
<%- JSON.stringify(faqSchema, null, 2) %>
</script>
```

---

### 4. 教程页面（HowTo）

**适用页面：** Clash教程、Shadowrocket教程等

**代码：**

```yaml
---
title: Clash Verge Rev使用教程
jsonld:
  '@context': 'https://schema.org'
  '@type': 'HowTo'
  name: 'Clash Verge Rev完整使用教程'
  description: 'Windows平台最强Clash客户端配置指南'
  image: 'https://clashmac.vip/img/clash-verge-rev.png'
  totalTime: 'PT10M'
  step:
    - '@type': 'HowToStep'
      name: '下载Clash Verge Rev'
      text: '访问GitHub Releases页面下载最新版安装包'
      url: 'https://github.com/clash-verge-rev/clash-verge-rev/releases'
    - '@type': 'HowToStep'
      name: '安装并启动'
      text: '双击exe文件安装，安装完成后启动应用'
    - '@type': 'HowToStep'
      name: '导入订阅'
      text: '复制机场订阅链接，在Clash Verge中粘贴并更新'
    - '@type': 'HowToStep'
      name: '选择节点'
      text: '从节点列表中选择合适的服务器节点'
    - '@type': 'HowToStep'
      name: '开启代理'
      text: '点击"系统代理"开关，开始科学上网'
---
```

---

### 5. 面包屑导航（BreadcrumbList）

**适用页面：** 所有页面

**代码：** `themes/butterfly/layout/includes/schema-breadcrumb.ejs`

```ejs
<%
// 面包屑导航结构化数据
const breadcrumbList = [];
const siteUrl = config.url;

// 添加首页
breadcrumbList.push({
  '@type': 'ListItem',
  'position': 1,
  'name': '首页',
  'item': siteUrl
});

// 添加分类
if (page.categories && page.categories.length > 0) {
  page.categories.forEach((cat, index) => {
    breadcrumbList.push({
      '@type': 'ListItem',
      'position': index + 2,
      'name': cat.name,
      'item': siteUrl + url_for(cat.path)
    });
  });
}

// 添加当前页面
if (is_post()) {
  breadcrumbList.push({
    '@type': 'ListItem',
    'position': breadcrumbList.length + 1,
    'name': page.title,
    'item': siteUrl + url_for(page.path)
  });
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': breadcrumbList
};
%>
<script type="application/ld+json">
<%- JSON.stringify(breadcrumbSchema, null, 2) %>
</script>
```

---

### 6. 网站信息（WebSite）

**适用页面：** 所有页面（全局）

**代码：** `themes/butterfly/layout/includes/schema-website.ejs`

```ejs
<%
// 网站结构化数据（全局）
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': config.title,
  'description': config.description,
  'url': config.url,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': config.url + '/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};
%>
<script type="application/ld+json">
<%- JSON.stringify(websiteSchema, null, 2) %>
</script>
```

---

### 7. 组织信息（Organization）

**适用页面：** 首页

**代码：**

```ejs
<%
// 组织/网站运营者信息
if (is_home()) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': config.title,
    'url': config.url,
    'logo': config.url + '/img/logo.png',
    'description': config.description,
    'sameAs': [
      'https://twitter.com/yourhandle',
      'https://t.me/yourchannel'
    ]
  };
%>
<script type="application/ld+json">
<%- JSON.stringify(organizationSchema, null, 2) %>
</script>
<% } %>
```

---

## 完整实施步骤

### 步骤1：创建结构化数据文件

在 `themes/butterfly/layout/includes/` 目录下创建以下文件：

```bash
themes/butterfly/layout/includes/
├── schema-article.ejs      # 文章结构化数据
├── schema-breadcrumb.ejs   # 面包屑导航
├── schema-website.ejs      # 网站信息
└── schema-organization.ejs # 组织信息
```

### 步骤2：在主布局文件中引入

编辑 `themes/butterfly/layout/includes/head.pug`，在 `</head>` 标签前添加：

```pug
//- 结构化数据
if theme.schema_org.enable
  !=partial('includes/schema-website')
  !=partial('includes/schema-breadcrumb')
  !=partial('includes/schema-article')
  if is_home()
    !=partial('includes/schema-organization')
```

### 步骤3：在主题配置中启用

编辑 `_config.butterfly.yml`，添加：

```yaml
# 结构化数据配置
schema_org:
  enable: true
  logo: /img/logo.png
  twitter: '@yourhandle'
  telegram: 'https://t.me/yourchannel'
```

### 步骤4：重新生成并部署

```bash
hexo clean
hexo generate
hexo deploy
```

---

## 测试与验证

### 测试工具

1. **Google Rich Results Test**  
   https://search.google.com/test/rich-results
   - 粘贴文章URL
   - 查看是否识别出结构化数据
   - 检查是否有错误或警告

2. **Schema.org Validator**  
   https://validator.schema.org/
   - 验证JSON-LD语法是否正确

3. **Google Search Console**  
   - 查看"增强功能"报告
   - 监控结构化数据错误

### 验证检查清单

- [ ] Article类型在文章页正确显示
- [ ] FAQPage在包含FAQ的页面显示
- [ ] BreadcrumbList在所有页面显示
- [ ] 没有必填字段缺失错误
- [ ] 日期格式符合ISO 8601标准
- [ ] 图片URL可访问且有效

---

## 预期SEO效果

实施结构化数据后，预期在1-3个月内看到：

✅ **搜索结果显示富媒体摘要**
- FAQ显示问题列表
- 文章显示发布日期、作者
- 面包屑导航显示在URL下方

✅ **点击率（CTR）提升**
- 预计提升30-50%
- 富媒体摘要更吸引眼球

✅ **排名轻微提升**
- 帮助搜索引擎更好理解内容
- 间接提升排名

---

## 常见问题

### Q1：结构化数据会立即生效吗？

**A：** 不会，Google需要重新爬取和索引页面，通常需要1-4周时间。

### Q2：是否所有页面都需要结构化数据？

**A：** 不是必须，但推荐：
- **必须：** 文章页、首页
- **推荐：** 分类页、标签页
- **可选：** 归档页

### Q3：JSON-LD vs Microdata，选哪个？

**A：** JSON-LD，因为：
- Google推荐
- 代码独立，不影响HTML结构
- 更容易维护

### Q4：如何知道结构化数据是否生效？

**A：** 使用Google Search Console查看"增强功能"报告，会显示：
- 有效的结构化数据页面数
- 错误和警告

---

## 下一步行动

1. **本周完成：** 创建Article和BreadcrumbList结构化数据
2. **下周完成：** 为主要文章添加FAQ结构化数据
3. **本月完成：** 为教程页面添加HowTo结构化数据
4. **持续监控：** 每周检查Google Search Console

---

**文档生成时间：** 2026年8月25日  
**适用网站：** clashmac.vip  
**下次更新：** 2026年9月25日
