const fs = require('fs');
const path = require('path');

const PROXY_DIR = path.join(__dirname, '../source/docs/proxy');

const NEW_MENUS_ITEMS = `<div class="menus_items"><div class="menus_item"><a class="site-page" href="/"><i class="fa-fw fas fa-home"></i><span> 首页</span></a></div><div class="menus_item"><a class="site-page" href="/2026/02/20/airport-recommendations/"><i class="fa-fw fas fa-plane"></i><span> 机场推荐导航</span></a></div><div class="menus_item"><a class="site-page" href="/software/"><i class="fa-fw fas fa-download"></i><span> 软件下载教程</span></a></div><div class="menus_item"><a class="site-page" href="/2026/03/01/how-to-choose-airport/"><i class="fa-fw fas fa-book"></i><span> 科学上网知识库</span></a></div><div class="menus_item"><a class="site-page" href="/categories/AI%E5%B7%A5%E5%85%B7/"><i class="fa-fw fas fa-robot"></i><span> AI工具</span></a></div><div class="menus_item"><a class="site-page" href="/2026/03/01/streaming-accounts-guide/"><i class="fa-fw fas fa-play-circle"></i><span> 流媒体专区</span></a></div></div>`;

const NEW_ADS_WRAP = `<div class="card-widget ads-wrap"><div class="card-widget card-ad" style="order: 0; padding: 20px 15px;"><div class="item-headline"><i class="fas fa-plane"></i><span> 机场推荐</span></div><div class="card-ad-content" style="display: flex; flex-direction: column; gap: 10px;"><a href="https://5844993lb01.jlcvipaff.cc/#/register?code=KUkfOY13" target="_blank" style="display: flex; align-items: center; padding: 10px 0; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'"><img src="https://jichangdaohang.cc/zb_users/upload/2025/12/20251215221131176580789158628.jpg" alt="极连云特惠专线" style="width: 45px; height: 45px; border-radius: 8px; margin-right: 10px; object-fit: cover;"><div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.4;"><div style="font-size: 15px; font-weight: bold; color: #8e82fe; margin-bottom: 2px;">极连云特惠专线</div><div style="font-size: 13px; color: #666;">全场 <span style="color: #1a7b4c; font-weight: bold;">8折: JLY888</span></div><div style="font-size: 13px; color: #666;">3年付享 <span style="color: #1a7b4c; font-weight: bold;">48折</span></div></div></a><a href="https://gnt001.gntvipaff.cc/#/?code=j1ufpE44" target="_blank" style="display: flex; align-items: center; padding: 10px 0; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'"><img src="https://i.ibb.co/Gv8rp8rk/photo-2026-04-15-13-24-38.jpg" alt="光年梯" style="width: 45px; height: 45px; border-radius: 8px; margin-right: 10px; object-fit: cover; flex-shrink: 0;"><div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.4;"><div style="font-size: 15px; font-weight: bold; color: #f39c12; margin-bottom: 2px;">光年梯</div><div style="font-size: 13px; color: #666;">IEPL专线 高速稳定</div><div style="font-size: 13px; color: #666;">月付最低 <span style="color: #e67e22; font-weight: bold;">7.5元</span></div></div></a><a href="https://ccc.jichang.best/#/register?code=o4I4kToe" target="_blank" style="display: flex; align-items: center; padding: 10px 0; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'"><img src="https://i.ibb.co/DHLgNf1d/Gemini-Generated-Image-7oufv07oufv07ouf-1.png" alt="瞬云机场" style="width: 45px; height: 45px; border-radius: 8px; margin-right: 10px; object-fit: cover; flex-shrink: 0;"><div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.4;"><div style="font-size: 15px; font-weight: bold; color: #1565c0; margin-bottom: 2px;">瞬云机场</div><div style="font-size: 13px; color: #666;">ANYCAST高速节点 低延迟</div><div style="font-size: 13px; color: #666;">月付最低 <span style="color: #0d47a1; font-weight: bold;">8.25元</span></div></div></a><a href="https://vip.ytjcok.org/#/register?code=qPHQtI9a" target="_blank" style="display: flex; align-items: center; padding: 10px 0; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'"><img src="https://i.ibb.co/1Gt7M65h/yuntu-1-3.png" alt="云图" style="width: 45px; height: 45px; border-radius: 8px; margin-right: 10px; object-fit: cover; flex-shrink: 0;"><div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.4;"><div style="font-size: 15px; font-weight: bold; color: #0288d1; margin-bottom: 2px;">云图</div><div style="font-size: 13px; color: #666;">金融级专线 稳定高速</div><div style="font-size: 13px; color: #666;">月付最低 <span style="color: #0277bd; font-weight: bold;">25元</span></div></div></a><a href="https://w2.whengdl.com/#/register?code=BIGc8qrQ" target="_blank" style="display: flex; align-items: center; padding: 10px 0; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'"><img src="/img/jinyun_logo.png" alt="锦云" style="width: 45px; height: 45px; border-radius: 8px; margin-right: 10px; object-fit: cover; flex-shrink: 0;"><div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.4;"><div style="font-size: 15px; font-weight: bold; color: #d4af37; margin-bottom: 2px;">锦云</div><div style="font-size: 13px; color: #666;">公网中转与直连 灵活特惠</div><div style="font-size: 13px; color: #666;">月付最低 <span style="color: #c5a028; font-weight: bold;">6元</span></div></div></a><a href="https://www.lvpn.cc/r/6UQDZT" target="_blank" style="display: flex; align-items: center; padding: 10px 0; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'"><img src="/img/bianjieyun_logo.png" alt="边界云" style="width: 45px; height: 45px; border-radius: 8px; margin-right: 10px; object-fit: cover; flex-shrink: 0;"><div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.4;"><div style="font-size: 15px; font-weight: bold; color: #27ae60; margin-bottom: 2px;">边界云</div><div style="font-size: 13px; color: #666;">优质IEPL企业专线 高速稳定</div><div style="font-size: 13px; color: #666;">月付最低 <span style="color: #218838; font-weight: bold;">12.33元</span></div></div></a></div></div></div>`;

const logoNameMap = {
    'clash-meta-for-android': 'Clash Meta for Android',
    'clashmi': 'Clash Mi',
    'clash-party': 'Clash Party',
    'clash-verge-rev': 'Clash Verge Rev',
    'egern': 'Egern',
    'flclash': 'FlClash',
    'nekobox': 'NekoBox',
    'qx': 'Quantumult X',
    'shadowrocket': 'Shadowrocket',
    'v2rayn': 'v2rayN'
};

function processFile(filepath) {
    console.log(`Processing ${filepath}...`);
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Sync Navigation Menu
    // Sidebar
    content = content.replace(
        /<div class="menus_items">[\s\S]*?<\/div><\/div><\/div><div class="page" id="body-wrap">/,
        NEW_MENUS_ITEMS + '</div></div></div><div class="page" id="body-wrap">'
    );
    
    // Top Menu
    content = content.replace(
        /<div id="menus"><div class="menus_items">[\s\S]*?<\/div><div id="toggle-menu">/,
        `<div id="menus">${NEW_MENUS_ITEMS}<div id="toggle-menu">`
    );

    // 2. Replace the Ads widget
    content = content.replace(
        /<div class="card-widget ads-wrap">[\s\S]*?<\/div>\s*<\/div>\s*<\/div><\/main>/,
        NEW_ADS_WRAP + '</div></div></main>'
    );

    // 3. Add Alt attribute to Software Logo image
    content = content.replace(/<img src="https:\/\/i\.theojs\.cn\/logo\/([^"]+)\.(webp|svg|png)"([^>]*)>/gi, (match, name, ext, rest) => {
        if (match.toLowerCase().includes('alt=')) return match;
        const key = name.toLowerCase();
        const altText = logoNameMap[key] || name;
        return `<img src="https://i.theojs.cn/logo/${name}.${ext}" alt="${altText} Logo"${rest}>`;
    });

    // 4. Canonical URLs and og:url cleanup (remove trailing index.html)
    content = content.replace(/<link rel="canonical" href="https:\/\/clashmac\.vip\/docs\/proxy\/([^/]+)\/index\.html">/gi, '<link rel="canonical" href="https://clashmac.vip/docs/proxy/$1/">');
    content = content.replace(/<meta property="og:url" content="https:\/\/clashmac\.vip\/docs\/proxy\/([^/]+)\/index\.html">/gi, '<meta property="og:url" content="https://clashmac.vip/docs/proxy/$1/">');

    // 5. Clean internal links pointing to index.html under docs/proxy/
    content = content.replace(/href="\/docs\/proxy\/([^/]+)\/index\.html"/gi, 'href="/docs/proxy/$1/"');

    // 6. Fix inner broken links for software itself
    const softwarePattern = /<p>\[<img src="([^"]+)">(.*?)<\/p>\s*<p>(.*?)<\/p>\s*<p>\]\(&#x2F;serve&#x2F;antiwall&#x2F;.*?\)<\/p>/g;
    content = content.replace(softwarePattern, (match, p1, p2, p3) => {
        return `<div style="padding:15px; background:#f8f9fa; border-radius:8px; display:flex; align-items:center; margin-bottom: 20px;"><img src="${p1}" alt="${p2} Logo" style="width:40px; height:40px; margin-right:15px; border-radius:8px;"><div><strong>${p2}</strong><br><span style="font-size:13px; color:#666;">${p3}</span></div></div>`;
    });

    // 7. Fix broken links for Airport Summary
    const airportPattern = /<p>\[优质机场汇总<\/p>\s*<p>(.*?)<\/p>\s*<p>立即购买<\/p>\s*<p>\]\(&#x2F;serve&#x2F;airport&#x2F;summary\)<\/p>/g;
    content = content.replace(airportPattern, (match, p1) => {
        return `<div style="padding:15px; background:#e8f4fd; border-left:4px solid #2196f3; border-radius:4px; margin-bottom: 20px;"><strong>🚀 优质机场汇总</strong><br><span style="font-size:14px; color:#555;">${p1}</span><br><br><a href="/2026/02/20/airport-recommendations/" style="display:inline-block; padding:8px 15px; background:#2196f3; color:#fff; border-radius:4px; text-decoration:none;">立即购买</a></div>`;
    });

    // 8. Clean any residual stray broken format blocks
    content = content.replace(/<p>\]\(&#x2F;serve.*?\)<\/p>/g, '');

    fs.writeFileSync(filepath, content, 'utf8');
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('index.html')) {
            processFile(fullPath);
        }
    }
}

// Execute pre-render fix
traverseDir(PROXY_DIR);
console.log('Static docs pre-render fix completed.');

if (typeof hexo !== 'undefined') {
    hexo.extend.filter.register('after_generate', function() {
        console.log('[Sitemap Injector] after_generate hook called.');
    });

    hexo.on('exit', function() {
        console.log('[Sitemap Injector] hexo exit detected. Running final sitemap update...');
        const sitemapPath = path.join(hexo.public_dir, 'sitemap.xml');
        if (fs.existsSync(sitemapPath)) {
            let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

            const extraDirs = [
                'docs/proxy/clash-meta-for-android',
                'docs/proxy/clash-mi',
                'docs/proxy/clash-party',
                'docs/proxy/clash-verge-rev',
                'docs/proxy/egern',
                'docs/proxy/flclash',
                'docs/proxy/nekobox',
                'docs/proxy/quantumult-x',
                'docs/proxy/shadowrocket',
                'docs/proxy/v2rayn'
            ];

            let xmlToInject = '';
            for (const dir of extraDirs) {
                const prettyUrl = `https://clashmac.vip/${dir}/`;
                if (sitemapContent.includes(`<loc>${prettyUrl}</loc>`) || sitemapContent.includes(`<loc>https://clashmac.vip/${dir}/index.html</loc>`)) {
                    continue;
                }

                const htmlFile = path.join(hexo.source_dir, dir, 'index.html');
                let lastmod = new Date().toISOString().split('T')[0];
                if (fs.existsSync(htmlFile)) {
                    lastmod = fs.statSync(htmlFile).mtime.toISOString().split('T')[0];
                }

                xmlToInject += `  <url>\n    <loc>${prettyUrl}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
            }

            if (xmlToInject) {
                sitemapContent = sitemapContent.replace('</urlset>', xmlToInject + '</urlset>');
                fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
                console.log('[Sitemap Injector] Successfully injected extra paths into sitemap.xml');
            } else {
                console.log('[Sitemap Injector] Extra paths already present or nothing to inject.');
            }
        } else {
            console.log('[Sitemap Injector] sitemap.xml not found on disk at exit.');
        }
    });
}
