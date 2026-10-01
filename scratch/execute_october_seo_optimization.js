const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'source', '_posts');

// 1. Map of specific optimizations for core posts
const updates = [
    {
        file: 'airport-recommendations.md',
        title: '2026年梯子推荐 | 机场推荐 - 最好用的翻墙梯子精选（10月最新更新）',
        keywords: '梯子, 梯子推荐, 好用的梯子, 机场推荐, 机场梯子, 翻墙梯子, 梯子工具, 性价比机场, 快连, letsvpn, 梯子vpn, 2026机场推荐, 极连云, 飞猫云, 光速云, 最好用的梯子',
        description: '【2026年10月最新更新】最好用的梯子推荐与机场推荐：精选极连云、光速云、飞猫云等30+便宜稳定性价比机场与翻墙梯子工具，最低7元/月起。每款梯子均经深度试用验证，含IEPL/IPLC专线、全线解锁Netflix、ChatGPT，帮助你找到最适合的科学上网梯子方案。',
        replacements: [
            { from: '2026年9月更新', to: '2026年10月最新更新' },
            { from: '【2026年9月更新】', to: '【2026年10月最新更新】' },
            { from: '最近核验时间：2026年9月', to: '最近核验时间：2026年10月' },
            { from: '🔥 2026年9月最新更新', to: '🔥 2026年10月最新更新' },
            { from: '【9月更新】', to: '【10月更新】' }
        ]
    },
    {
        file: 'best-ladder-vpn-recommendations-2026.md',
        title: '2026年梯子软件哪个好用？高性价比机场梯子与翻墙梯子工具推荐指南（10月更新）',
        keywords: '梯子, 梯子软件哪个好用, 性价比机场, 梯子工具, 机场梯子, 梯子vpn, vpn梯子, 加速器梯子, 翻墙梯子, 科学上网梯子',
        description: '【2026年10月最新更新】梯子软件哪个好用？哪款翻墙梯子工具稳定高速？本文深度解析传统VPN与机场梯子的区别，提供选购高性价比机场梯子与加速器梯子的5大核心标准，并推荐2026年稳定便宜的IEPL专线梯子工具全平台配置指南。',
        replacements: [
            { from: '最近核验时间：2026年9月', to: '最近核验时间：2026年10月' }
        ]
    },
    {
        file: 'kuailian-vpn-letsvpn-alternatives-2026.md',
        title: '2026快连VPN(LetsVPN / let\'s vpn / letvpn)最新评测：快连破解版风险与高性价比梯子替代方案（10月更新）',
        keywords: '快连, letsvpn, let\'s vpn, letvpn, lets vpn, 快连VPN, 快连破解版, 快连官方下载, 梯子推荐, 性价比机场, 科学上网',
        description: '【2026年10月最新更新】快连VPN (LetsVPN / let\'s vpn / letvpn) 怎么样？好用吗？本文带来快连VPN最新下载评测，深入分析快连破解版的安全隐患与防骗指南，并对比精选IEPL专线高性价比机场梯子替代方案。',
        replacements: [
            { from: '最近核验时间：2026年9月', to: '最近核验时间：2026年10月' }
        ]
    },
    {
        file: 'cost-effective-airports-2026.md',
        title: '2026年性价比机场推荐 | 便宜又好用的高性价比机场梯子精选（10月最新）',
        keywords: '性价比机场, 高性价比机场, 便宜机场推荐, 机场梯子, 性价比最高的机场, 2026性价比机场, 便宜梯子',
        description: '【2026年10月最新更新】2026年性价比机场推荐：不只看价格，速度×稳定性÷价格才是真性价比。精选10个高性价比机场梯子，8元起，包含极连云、光年梯、飞猫云等，附详细对比表格和选择指南。',
        replacements: []
    },
    {
        file: 'free-vpn-recommendation-2026.md',
        title: '2026年免费VPN推荐 | vp 梯子 免费真的能用吗？完整测评+避坑指南（10月更新）',
        keywords: '免费vpn, 免费梯子, vp 梯子 免费, vp梯子免费, 免费翻墙, 免费科学上网, 免费vpn推荐, 永久免费vpn, 好用的免费vpn',
        description: '【2026年10月最新更新】免费VPN真的能用吗？搜 vp 梯子 免费 / 免费VPN 的梯子工具到底靠不靠谱？本文深度测评10款免费VPN，揭示免费背后的风险，并推荐真正可用的免费试用机场方案。',
        replacements: []
    },
    {
        file: 'best-ladder-tools-2026.md',
        title: '2026年最好用的梯子推荐 | 10款梯子工具与加速器梯子深度对比测评（10月更新）',
        keywords: '梯子, 梯子工具, 最好用的梯子, 梯子推荐, 加速器梯子, 翻墙梯子, 梯子软件, 科学上网工具',
        description: '【2026年10月最新更新】2026年最好用的梯子推荐：深度测评10款主流梯子工具与加速器梯子，涵盖IEPL专线机场、Clash Verge、Shadowrocket等软件配置，帮你在敏感时期稳定翻墙。',
        replacements: []
    },
    {
        file: 'vpn-ladder-recommendation-2026.md',
        title: '2026年最新梯子推荐 | 稳定翻墙梯子与vpn梯子精选（10月更新）',
        keywords: '梯子, 梯子推荐, 翻墙梯子, vpn梯子, 梯子vpn, 科学上网, 稳定梯子, 梯子教程',
        description: '【2026年10月最新更新】2026年最新梯子推荐与vpn梯子指南：精选多款低延迟、高抗封锁的企业级专线梯子，包含详细客户端下载及订阅教程。',
        replacements: []
    },
    {
        file: 'letsvpn-shutdown-2026.md',
        title: '快连VPN停运真相 | 快连(LetsVPN / let\'s vpn)是什么？为什么关停？（10月最新分析）',
        keywords: '快连, letsvpn, let\'s vpn, letvpn, 快连VPN, 快连停运, 快连替代, 梯子推荐',
        description: '【2026年10月最新分析】快连VPN (LetsVPN / let\'s vpn) 为什么突然停运？本文深度剖析快连关停真相，并为快连老用户提供安全靠谱的高性价比专线机场梯子平替方案。',
        replacements: []
    },
    {
        file: 'software.md',
        title: '2026年梯子工具下载 | 梯子软件推荐 - 全平台翻墙工具合集（10月更新）',
        keywords: '梯子工具, 梯子软件, 梯子软件哪个好用, 梯子下载, Clash Verge, Shadowrocket, Sing-box, 翻墙软件',
        description: '【2026年10月最新更新】2026全平台梯子工具与梯子软件下载大全：涵盖 Windows、Mac、iOS、Android 和路由器端最佳科学上网客户端，附免费下载与新手配置教程。',
        replacements: []
    }
];

// Execute updates
let updatedCount = 0;

updates.forEach(u => {
    const filePath = path.join(postsDir, u.file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${u.file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Update updated date tag
    content = content.replace(/^updated:\s*.*$/m, 'updated: 2026-10-02 09:00:00');

    // Update title in front matter
    if (u.title) {
        content = content.replace(/^title:\s*.*$/m, `title: ${u.title}`);
    }

    // Update keywords in front matter
    if (u.keywords) {
        if (content.match(/^keywords:\s*.*$/m)) {
            content = content.replace(/^keywords:\s*.*$/m, `keywords: ${u.keywords}`);
        } else {
            // insert keywords after tags
            content = content.replace(/^(tags:\s*\[.*\])/m, `$1\nkeywords: ${u.keywords}`);
        }
    }

    // Update description in front matter
    if (u.description) {
        content = content.replace(/^description:\s*.*$/m, `description: "${u.description.replace(/"/g, '\\"')}"`);
    }

    // Perform specific inline string replacements
    if (u.replacements) {
        u.replacements.forEach(r => {
            content = content.split(r.from).join(r.to);
        });
    }

    // Global "9月更新" replace if missed
    content = content.replace(/2026年9月/g, '2026年10月');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Successfully updated: ${u.file}`);
    updatedCount++;
});

// Batch scan remaining files to update updated date or 2026-09 references to 2026-10
const allFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
allFiles.forEach(f => {
    if (updates.find(u => u.file === f)) return; // already processed
    const filePath = path.join(postsDir, f);
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    if (content.includes('2026-09')) {
        content = content.replace(/2026-09/g, '2026-10');
        modified = true;
    }
    if (content.includes('9月更新')) {
        content = content.replace(/9月更新/g, '10月更新');
        modified = true;
    }

    if (modified) {
        content = content.replace(/^updated:\s*.*$/m, 'updated: 2026-10-02 09:00:00');
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated dates/months in: ${f}`);
        updatedCount++;
    }
});

console.log(`Total posts updated: ${updatedCount}`);
