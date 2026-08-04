const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// Custom GEO intros for specific key posts (optimized to answer search questions under 500 chars with keywords)
const customIntros = {
    'airport-recommendations.md': `**2026年有哪些好用且稳定的便宜翻墙机场和VPN梯子推荐？**挑选科学上网机场的核心原则是选择月付订阅、认准 IPLC/IEPL 国际专线和 BGP 中转网络。通过对国内主流机场在下载速度、晚高峰稳定度、流媒体解锁（Netflix/Disney+）以及 AI 工具（ChatGPT/Gemini）连通性等多维度深度实测，本文精选出了极连云、光速云、飞猫云等性价比高、靠谱不跑路的稳定机场推荐，并提供 Clash Verge/Shadowrocket 等客户端下载配置教程。`,
    
    'airport-routes-difference.md': `**科学上网常见的机场线路（IPLC/IEPL 国际专线、CN2 GIA 优化线路、BGP 中转、公网直连）有什么区别？哪种网络更好用？**简单来说，**IPLC/IEPL 专线完全不经过国家防火墙（GFW），晚高峰零丢包、低延迟，是追求极致稳定性用户的最佳选择；BGP 中转则性价比最高，是绝大多数翻墙用户的首选；而直连机场价格极低但线路质量差且极易被封锁。**本文将为您科普各大线路的底层技术与优缺点，帮您买机场不踩坑。`,
    
    'determine-line-type.md': `**如何准确判断翻墙机场的真实线路类型（如 IPLC 专线、CN2 GIA 或 BGP 中转）？**很多机场商家的宣传存在虚标或注水，要识破这些套路，最有效的方法是：**通过 Traceroute 路由追踪工具检测网络跳数与 IP 骨干网（如 59.43 段），结合晚高峰丢包率实测，以及查询节点入口和出口的真实 IP 归属地。**本文将从基础到进阶，教您一套切实可行的翻墙机场真实线路鉴别与防坑技巧。`,
    
    'how-to-choose-airport.md': `**新手如何挑选适合自己的科学上网机场？购买翻墙机场怎么规避跑路和卡顿风险？**选择靠谱机场的核心原则是：**一律首选月付订阅、认准 BGP 中转或专线节点、远离价格异常低廉的“一元机场”。**本文为您提供一套系统性的三步实测评估法，手把手带你检测晚高峰稳定度和丢包率，并提供备用机场防失联配置，让您花最少的钱享受最高效的翻墙体验。`,
    
    'airport-vs-vpn.md': `**翻墙机场和 VPN 有什么区别？科学上网时哪种工具更适合你？**虽然两者的目的都是为了突破网络封锁（科学上网），但其底层协议与应用场景截然不同：**机场通常采用 Shadowsocks/VLESS/Hysteria2 等轻量化专有协议，针对网络加速进行了极大的优化，适合看视频、日常冲浪与解除流媒体地域限制；而传统 VPN 采用 OpenVPN/WireGuard 等全局加密协议，更侧重于数据隐私保护与企业级安全传输。**本文为您深度剖析二者区别，帮助您按需做出最正确的选择。`,
    
    'best-budget-airport-for-students.md': `**学生党怎么买到便宜靠谱的翻墙机场？预算有限的轻度用户有什么高性价比选择？**对于不常看 4K 视频、预算有限的用户，购买机场的最甜点方案是：**选择大牌机场的入门低配套餐（如 8-15 元/月）或购买永不过期的按量付费订阅作为防失联备用。**本文将为您盘点 2026 最新适合学生党的高性价比低价便宜机场，并划出三条必须坚守的防坑底线。`,
    
    'is-100gb-airport-data-enough.md': `**购买翻墙机场套餐时，100GB 流量够用吗？不同网络行为的真实流量消耗是多少？**其实，日常纯网页和学术查阅非常省流量（50G完全足够）；刷抖音/TikTok、刷推特图文则属于中度消耗；而 YouTube 4K/Netflix 流媒体则是真正的流量黑洞。**本文为您详细折算 100G 流量在不同场景下的可用时长，并提醒您警惕机场的“节点倍率”扣费潜规则**，帮您挑选最划算的流量套餐。`,
    
    'letsvpn-shutdown-2026.md': `**2026年 LetsVPN (快连 VPN) 停止服务事件是怎么回事？面对大厂 VPN 和机场关停潮，普通翻墙用户如何自保防跑路？**2026年4月广东各大机房遭遇大面积物理拔线整顿，与之同步的是 LetsVPN 正式宣布停止向大陆提供服务。这标志着传统“中心化”VPN 在国家级流量识别面前愈发脆弱。**本文为您深度还原 LetsVPN 停服风暴始末，分析其技术倒下的深层逻辑，并提供五条实用防跑路与备用机场配置指南。**`,
    
    'airport-network-incident-2026.md': `**2026年4月机场大面积节点超时、断流、甚至商家跑路是怎么回事？**2026年4月，我国珠三角三大核心机房遭遇大范围“物理断网” and 拔线整顿，导致众多使用公网中转的翻墙机场瞬间瘫痪。随着防火墙（GFW）“溯源倒查”机制的升级，传统的混淆技术面临巨大挑战。**本文为您深度复盘此次跨境网络风暴的真实原因，解析技术层面的变动，并提供寒冬之下的机场选择与防坑自保建议。**`,
    
    'airport-routes-selection.md': `**直连、中转、专线这三大出海路径有什么区别？翻墙机场套餐价格相差 6 倍该怎么选择？**从本地网络到访问境外网站，您的翻墙数据必须经过本地网络、出境中转和落地节点三段链路。其中**第 2 段“出境中转”是核心成本所在**。普通的直连公网线路便宜但极易卡顿；BGP 中转性价比高；而 IEPL 企业级专线则速度飞快、价格昂贵。**本文将以通俗易懂的语言，为您拆解这三条路径，教您如何按需选购机场。**`,
    
    'airport-speed-analysis.md': `**为什么有些机场测速图“满屏跑绿”看着有几百兆，但晚上实际看 4K 视频却卡顿转圈？**这涉及到**单线程下载速度与多线程测速数据**的本质区别。很多机场商家通过多线程超售来粉饰测速结果，而实际看视频等应用极度依赖单线程的网络连接质量与丢包率。**本文为您科普单/多线程测速的真相，教您如何排查网络拥堵，挑选出真正低延迟、高带宽的科学上网节点。**`
};

// Map of heading rewrites for specific files
const customHeadings = {
    'airport-routes-difference.md': {
        '## 墙是什么？': '## 什么是 GFW 防火长城？它是如何封锁翻墙流量的？',
        '## 直连机场': '## 什么是直连机场？直连线路有哪些优缺点？',
        '## 中转机场（公网中转）': '## 什么是中转机场（公网中转）？它比直连好在哪里？',
        '## 国际专线机场（IPLC / IEPL）': '## 什么是 IPLC/IEPL 国际专线机场？为什么专线机场最稳定？',
        '## 三大线路横向对比': '## 直连、中转、IPLC 专线机场有什么区别？三大线路对比',
        '## 简单总结': '## 翻墙机场线路选购怎么选？一句话选购建议'
    },
    'determine-line-type.md': {
        '## 一、基础判断：官方信息与用户反馈': '## 一、如何通过官网信息与用户评价对机场进行基础判断？',
        '## 二、技术判断：路由与 IP 分析（核心）': '## 二、如何通过 Traceroute 路由追踪和 IP 归属地判断真实线路？',
        '## 三、性能表现：延迟、丢包率与速度': '## 三、如何通过晚高峰测试丢包率 and 速度来鉴别机场性能？',
        '## 四、高级进阶：协议与流量特征（可选补充）': '## 四、极客玩家如何通过抓包和协议特征深度鉴别线路类型？',
        '## 五、重要提醒（避坑避雷指南针）': '## 五、购买专线机场有哪些重要的防坑和鉴别技巧？'
    },
    'how-to-choose-airport.md': {
        '## 核心原则：建立正确的消费观': '## 挑选翻墙机场有哪些核心防坑消费原则？',
        '## 筛选阶段：什么样的机场值得试？': '## 怎么初步筛选出性价比高、不跑路的优质机场？',
        '## 实战测试：三天评估法': '## 如何通过“三天评估法”测试机场的真实性能与晚高峰稳定性？',
        '## 风险预警：跑路的几个征兆': '## 翻墙机场跑路有哪些常见征兆？如何规避财产损失？',
        '## 进阶使用建议': '## 机场用户有哪些进阶使用和分流规则优化建议？',
        '## 高频问答（FAQ）': '## 科学上网机场选购有哪些高频常见问题？FAQ 汇总'
    },
    'airport-vs-vpn.md': {
        '## 什么是“机场”？': '## 什么是翻墙机场？它的技术核心是什么？',
        '## 什么是VPN？': '## 什么是传统 VPN？它的工作原理与劣势分析',
        '## 深度对比：如何选择适合你的？': '## 机场和 VPN 有什么区别？科学上网该怎么选择？',
        '## 常见误区与安全建议': '## 翻墙工具使用有哪些常见误区和隐私安全建议？'
    },
    'best-budget-airport-for-students.md': {
        '## 一、摆正心态：轻度用户真正需要的是什么？': '## 预算有限的学生党和轻度翻墙用户真正需要什么样的机场？',
        '## 二、极致性价比的两大"神仙方案"': '## 极致性价比：适合学生党的高性价比低价机场选购方案',
        '## 三、三条防坑底线，低价用户必须死守': '## 购买便宜一元机场时必须死守的防坑底线有哪些？',
        '## 四、推荐选购策略': '## 便宜好用机场推荐选购步骤与双机场备用策略'
    },
    'is-100gb-airport-data-enough.md': {
        '## 一、不同上网行为的真实流量消耗': '## 刷网页、看 YouTube 4K、打游戏分别消耗多少流量？',
        '## 二、三类用户画像，对号入座': '## 100GB 机场流量够吗？不同用户场景流量选购画像分析',
        '## 三、必须警惕的\"节点倍率\"黑洞': '## 什么是机场“节点倍率”扣费？怎么避开流量翻倍黑洞？',
        '## 四、最稳妥的流量策略：先买最小的，不够再补': '## 机场新手最稳妥的流量套餐选购策略推荐'
    },
    'letsvpn-shutdown-2026.md': {
        '## 风暴前夜：那根被物理拔掉的网线': '## 2026年广东机房大规模断网事件是怎么回事？',
        '## 快连VPN：第一块倒下的多米诺骨牌': '## 快连 VPN (LetsVPN) 为什么宣布停止中国区服务？',
        '## 解剖：快连为何是第一个倒下的？': '## LetsVPN 等大厂 VPN 首先倒下的技术和运营原因分析',
        '## 这场地震，对普通用户意味着什么？': '## 机房清退和 VPN 停服对普通翻墙用户有什么直接影响？',
        '## 五条实用自保建议': '## 面对翻墙寒冬，用户有哪五条实用的防跑路自保建议？',
        '## 尾声：一个时代的终结与新选择': '## LetsVPN 停服后，翻墙用户有哪些新的更稳定的替代选择？'
    },
    'airport-network-incident-2026.md': {
        '## 一、 震中广东：一场没有硝烟的“物理断网”': '## 2026年4月广东机房“物理拔线”整顿事件始末',
        '## 二、 技术升级：为什么你买的“高科技混淆”失效了？': '## 防火墙技术升级：为什么普通机场混淆协议突然失效？',
        '## 三、 用户困局：你的钱、你的流量与你的耐心': '## 节点卡顿、断流与机场跑路潮，翻墙用户面临什么困局？',
        '## 四、 避坑指南：如何在“寒冬”中自保？': '## 面对机场大规模维护与跑路，如何实现安全翻墙自保？'
    },
    'airport-routes-selection.md': {
        '## 本文能帮你解决什么问题？': '## 购买机场看什么？本文能帮你解决哪些选购难题？',
        '## 从你家到国外网络：必经的三段链路': '## 从本地到国外：决定科学上网速度的三段链路是什么？',
        '## 第 2 段链路：“怎么出海的”三大路径拆解': '## 直连、中转、专线这三大出海路径有什么技术区别？',
        '## 三大线路一句话总结，教你按需选择': '## 翻墙机场线路怎么选？三大线路一句话选购建议'
    },
    'airport-speed-analysis.md': {
        '## 一、 核心概念：单线程 vs 多线程': '## 什么是单线程测速和多线程测速？它们有什么本质区别？',
        '## 二、 为什么多线程测速数据更高？': '## 为什么机场多线程测速数据看着很高，实际使用却卡顿？',
        '## 三、 实战分析：常见测速环境举例': '## 日常看视频、下载、网页浏览分别对应什么测速模式？',
        '## 四、 如何挑选真正稳定的“科学上网”节点？': '## 怎么辨别假测速？如何挑选真正快速稳定的翻墙节点？'
    },
    'airport-recommendations.md': {
        '## 2026年翻墙机场推荐一览表': '## 2026年热门翻墙机场推荐一览表（包含官网与价格对比）',
        '## 好用的机场详细评测与套餐价格': '## 2026年好用且稳定的翻墙机场详细评测与套餐价格',
        '## 什么是VPN和机场？如何选择科学上网工具？': '## 什么是传统 VPN 和科学上网机场？如何挑选合适的工具？',
        '## 一元机场与低价机场推荐标准': '## 便宜低价的一元机场靠谱吗？有什么推荐与避坑标准？',
        '## 科学上网常见问题解答 (FAQ)': '## 科学上网机场使用常见问题与解决方法 FAQ',
        '## 本文机场推荐说明 (核心收录标准)': '## clashmac.vip 机场推荐说明与核心防跑路收录标准'
    },
    'chatgpt-mirrors-guide.md': {
        '## 什么是 ChatGPT 镜像网站？': '## 什么是 ChatGPT 镜像网站？国内直连能用吗？',
        '## 为什么要使用 ChatGPT 镜像站？': '## 为什么很多人选择使用 ChatGPT 镜像站？有哪些好处？',
        '## 2025年优质 ChatGPT 镜像网站推荐': '## 2026年有哪些好用稳定的 ChatGPT 镜像网站推荐？',
        '## 如何选择合适的 ChatGPT 镜像站？': '## 怎么挑选靠谱的 ChatGPT 镜像站？选择标准是什么？',
        '## ChatGPT 镜像网站使用教程': '## ChatGPT 镜像网站怎么使用？快速上手保姆级教程',
        '## 官网 vs 镜像站：全面对比分析': '## ChatGPT 官方原版与国内镜像站有什么区别？对比分析',
        '## ChatGPT 镜像站常见问题解答': '## ChatGPT 镜像站有哪些常见问题？FAQ 汇总',
        '## 使用镜像网站的安全注意事项': '## 使用 ChatGPT 镜像站有哪些隐私安全注意事项？',
        '## 镜像站稳定性维护与更新': '## 镜像站如果打不开了怎么办？备份更新说明'
    },
    'claude-guide.md': {
        '## Claude 是什么？核心优势解析': '## 什么是 Claude？相比 ChatGPT 有什么核心优势？',
        '## 国内如何访问 Claude？': '## 国内如何注册 and 访问 Claude 官方版与镜像站？',
        '## Claude vs ChatGPT：如何选择？': '## Claude 与 ChatGPT 哪个更适合你的工作？怎么选？',
        '## Claude 使用技巧': '## 怎么让 Claude 的输出质量更高？实用 Prompt 提示词技巧'
    },
    'gemini-in-china.md': {
        '## Gemini AI 的功能有哪些？': '## 谷歌 Gemini AI 有哪些核心功能？',
        '## 我该选哪个账户？Gemini 版本大盘点': '## 谷歌 Gemini 各版本有什么区别？我该选择哪个版本？',
        '## 为什么在中国使用 Gemini 这么难？': '## 为什么国内无法直接使用谷歌 Gemini？限制原因分析',
        '## 如何在中国使用 Gemini？': '## 国内怎么访问和使用谷歌 Gemini？免翻墙镜像与代理教程',
        '## 在中国使用 Gemini 的常见问题解答': '## 国内使用 Gemini 常见问题及解决方法 FAQ'
    },
    'grok-4-tutorial.md': {
        '## 一、Grok 4 新模型亮点有哪些': '## 埃隆马斯克的 Grok 4 模型有哪些技术亮点？',
        '## 二、Grok 4 如何抢先体验？': '## 如何抢先体验最新版 Grok 4？',
        '## 三、Grok AI 国内怎么使用': '## 国内如何使用 Grok AI？免翻墙镜像与账号直连方法'
    }
};

let modifiedCount = 0;

for (const file of files) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Normalize CRLF to LF
    content = content.replace(/\r\n/g, '\n');
    
    // Parse front matter and body
    const parts = content.split('---');
    if (parts.length < 3) continue;
    
    const yaml = parts[1];
    let body = parts.slice(2).join('---');
    
    // Get title from yaml
    const titleMatch = yaml.match(/^title:\s*(.*)$/m);
    const title = titleMatch ? titleMatch[1].replace(/['"]/g, '').trim() : '';
    
    let isModified = false;
    
    // 1. First Paragraph GEO optimization
    let bodyTrim = body.trimStart();
    let paragraphs = bodyTrim.split(/\n\s*\n/);
    
    if (customIntros[file]) {
        // We replace the first paragraph (if it's not already our customized one)
        if (paragraphs.length > 0 && !paragraphs[0].includes('**')) {
            paragraphs[0] = customIntros[file];
            body = '\n\n' + paragraphs.join('\n\n') + '\n';
            isModified = true;
        }
    } else {
        // Heuristic-based rewrite for tutorials and general tools
        if (paragraphs.length > 0 && !paragraphs[0].includes('**')) {
            let toolName = '';
            
            if (file.endsWith('-tutorial.md')) {
                // Extract software name from file name (e.g. clash-verge-rev-tutorial.md -> Clash Verge Rev)
                let base = file.replace('-tutorial.md', '');
                toolName = base.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                if (toolName === 'Clash Verge Rev') toolName = 'Clash Verge Rev';
                if (toolName === 'Shadowrocket V2') toolName = 'Shadowrocket (小火箭)';
                if (toolName === 'V2rayn V2') toolName = 'v2rayN';
                if (toolName === 'Quantumult X') toolName = 'Quantumult X (圈X)';
                if (toolName === 'Nekobox') toolName = 'NekoBox (猫盒)';
                if (toolName === 'Router Vpn Setup 2026') toolName = '路由器/旁路由翻墙';
                if (toolName === 'Soft Router Guide 2026') toolName = '软路由 OpenWrt';
                if (toolName === 'Clash Meta Android') toolName = 'Clash Meta (Android)';
                
                paragraphs[0] = `**${toolName} 客户端怎么下载？订阅链接怎么导入？** ${toolName} 是目前最流行且高效的科学上网工具之一，支持 VLESS、Reality、Hysteria2、Shadowsocks 等最新翻墙协议。**本文提供 2026 最新 ${toolName} 官方安全下载地址、保姆级图文订阅配置教程，以及常见连不上网的排查方法**，帮您轻松搞定全平台设备的科学上网配置，实现高速稳定的网络访问。`;
                body = '\n\n' + paragraphs.join('\n\n') + '\n';
                isModified = true;
            } else if (file.endsWith('-guide.md')) {
                let base = file.replace('-guide.md', '');
                toolName = base.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                if (toolName === 'Claude') toolName = 'Claude AI';
                if (toolName === 'Midjourney') toolName = 'Midjourney AI 绘图';
                if (toolName === 'Netflix') toolName = 'Netflix (奈飞)';
                if (toolName === 'Spotify') toolName = 'Spotify Premium';
                if (toolName === 'Telegram') toolName = 'Telegram (电报/纸飞机)';
                if (toolName === 'Telegram Search') toolName = 'Telegram 中文资源搜索';
                
                paragraphs[0] = `**国内怎么注册和使用 ${toolName}？有哪些免翻墙的国内镜像站？** ${toolName} 是目前世界上最火爆的服务之一。**本文为您汇总 2026 最新国内直接可用、无需翻墙的 ${toolName} 镜像网站，并提供共享账号与官方直连订阅的保姆级上车教程**，解答常见的使用问题，助您零门槛高效体验全球优质服务。`;
                body = '\n\n' + paragraphs.join('\n\n') + '\n';
                isModified = true;
            }
        }
    }
    
    // 2. Heading Optimization
    // Apply custom heading rewrites for this file if available
    if (customHeadings[file]) {
        for (const [oldHeading, newHeading] of Object.entries(customHeadings[file])) {
            if (body.includes(oldHeading)) {
                body = body.replace(oldHeading, newHeading);
                isModified = true;
            }
        }
    } else {
        // Generic heading rewrites (e.g. standard subheadings in tutorials)
        let toolName = title.split(' ')[0] || '';
        // If it ends with "使用教程" or similar, clean it
        toolName = toolName.replace(/使用教程/g, '').replace(/教程/g, '').replace(/（.*）/g, '').replace(/\(.*\)/g, '');
        
        const genericHeadingRewrites = {
            '## 什么是': `## 什么是 ${toolName}？它的核心功能与优势是什么？`,
            '## 📥 软件下载': `## 📥 ${toolName} 怎么下载？官方安全下载渠道汇总`,
            '## 📥 如何获取与下载': `## 📥 ${toolName} 怎么下载？官方安全下载渠道汇总`,
            '## 📥 软件获取': `## 📥 ${toolName} 怎么下载？官方安全下载渠道汇总`,
            '## ⚙️ 添加订阅教程': `## ⚙️ ${toolName} 订阅链接如何导入？快速上手配置指南`,
            '## ⚙️ 快速上手教程': `## ⚙️ ${toolName} 订阅链接如何导入？快速上手配置指南`,
            '## ⚙️ 添加节点（推荐订阅方式）': `## ⚙️ ${toolName} 订阅链接如何导入？快速上手配置指南`,
            '## 🚀 启动代理连接': `## 🚀 ${toolName} 怎么开启代理连接和测试节点？`,
            '## 🚀 启动代理': `## 🚀 ${toolName} 怎么开启代理连接和测试节点？`,
            '## 🔗 节点测试与启用代理': `## 🚀 ${toolName} 怎么开启代理连接和测试节点？`,
            '## 🔄 节点切换方法': `## 🔄 ${toolName} 怎么切换不同国家的代理节点？`,
            '## 🔄 节点切换': `## 🔄 ${toolName} 怎么切换不同国家的代理节点？`,
            '## 💡 使用建议': `## 💡 ${toolName} 进阶优化配置与日常使用建议`,
            '## 💡 进阶优化建议': `## 💡 ${toolName} 进阶优化配置与日常使用建议`,
            '## 常见问题排查': `## ❓ ${toolName} 无法连接或连上没网怎么解决？常见问题排查`,
            '## 常见问题及进阶技巧 (FAQ)': `## ❓ ${toolName} 无法连接或连上没网怎么解决？常见问题排查`,
            '## 故障排查与代理设置': `## ❓ ${toolName} 无法连接或连上没网怎么解决？常见问题排查`,
            '## 💡 路由模式说明': '## 💡 什么是全局/规则/直连路由模式？怎么选择？',
            '## 💡 全局路由模式说明（重点）': '## 💡 什么是全局/规则/直连路由模式？怎么选择？'
        };
        
        for (const [oldHeading, newHeading] of Object.entries(genericHeadingRewrites)) {
            if (body.includes(oldHeading)) {
                let lines = body.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].trim() === oldHeading) {
                        lines[i] = newHeading;
                        isModified = true;
                    } else if (lines[i].trim().startsWith('## 什么是') && oldHeading === '## 什么是') {
                        // Prevent mapping already rewritten headings: check if it already has more than 15 chars or contains question mark
                        if (lines[i].length < 15 && !lines[i].includes('？')) {
                            lines[i] = `## 什么是 ${toolName}？它的核心功能与优势是什么？`;
                            isModified = true;
                        }
                    }
                }
                body = lines.join('\n');
            }
        }
    }
    
    // Clean up empty lines at the very beginning of the body
    body = body.replace(/^\s+/, '\n\n');
    
    if (isModified) {
        fs.writeFileSync(filePath, `---${yaml}---${body}`, 'utf-8');
        modifiedCount++;
        console.log(`Optimized ${file}`);
    }
}

console.log(`Total optimized files: ${modifiedCount}`);
