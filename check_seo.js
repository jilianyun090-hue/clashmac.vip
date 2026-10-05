const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function getFiles(dir, extension, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const filePath = path.join(dir, entry.name);
        if (entry.isDirectory()) getFiles(filePath, extension, fileList);
        else if (filePath.endsWith(extension)) fileList.push(filePath);
    }
    return fileList;
}

function extractAll(content, regex) {
    return Array.from(content.matchAll(regex), match => match[1].trim());
}

function addToMap(map, value, file) {
    if (!value) return;
    if (!map.has(value)) map.set(value, []);
    map.get(value).push(file);
}

function relative(file) {
    return path.relative(__dirname, file).replace(/\\/g, '/');
}

function printItems(label, items, formatter, limit = 20) {
    if (!items.length) return;
    console.log(`\n${label} (${items.length})`);
    items.slice(0, limit).forEach(item => console.log(`  - ${formatter(item)}`));
    if (items.length > limit) console.log(`  ... and ${items.length - limit} more`);
}

const htmlFiles = getFiles(publicDir, '.html');
const indexableTitles = new Map();
const indexableDescriptions = new Map();
const internalLinks = new Map();
const issues = {
    missingTitle: [],
    missingDescription: [],
    multipleDescriptions: [],
    shortDescriptions: [],
    longDescriptions: [],
    missingCanonical: [],
    missingRobots: [],
    invalidJsonLd: [],
    missingAlts: [],
    h1Count: []
};

let indexablePages = 0;
let noindexPages = 0;

for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const fileName = relative(file);
    const titles = extractAll(content, /<title>([\s\S]*?)<\/title>/gi);
    const descriptions = extractAll(content, /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/gi);
    const canonical = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i);
    const robots = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["'][^>]*>/i);
    const noindex = robots && /\bnoindex\b/i.test(robots[1]);
    const h1Count = (content.match(/<h1\b/gi) || []).length;

    if (noindex) noindexPages++;
    else indexablePages++;

    if (!titles.length) issues.missingTitle.push(fileName);
    if (!descriptions.length) issues.missingDescription.push(fileName);
    if (descriptions.length > 1) issues.multipleDescriptions.push({ file: fileName, count: descriptions.length });
    if (!canonical) issues.missingCanonical.push(fileName);
    if (!robots) issues.missingRobots.push(fileName);
    if (h1Count !== 1) issues.h1Count.push({ file: fileName, count: h1Count });

    if (!noindex) {
        addToMap(indexableTitles, titles[0], fileName);
        addToMap(indexableDescriptions, descriptions[0], fileName);
        if (descriptions[0] && descriptions[0].length < 50) {
            issues.shortDescriptions.push({ file: fileName, length: descriptions[0].length });
        }
        if (descriptions[0] && descriptions[0].length > 170) {
            issues.longDescriptions.push({ file: fileName, length: descriptions[0].length });
        }
    }

    for (const script of extractAll(content, /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
        if (!script) continue;
        try {
            JSON.parse(script);
        } catch (error) {
            issues.invalidJsonLd.push({ file: fileName, error: error.message });
        }
    }

    for (const match of content.matchAll(/<img\s+[^>]*>/gi)) {
        if (!/\salt=["'][^"']*["']/i.test(match[0])) {
            issues.missingAlts.push({ file: fileName, tag: match[0].slice(0, 120) });
        }
    }

    for (const match of content.matchAll(/href=["'](\/[^"']*)["']/gi)) {
        const href = match[1];
        if (href.startsWith('//')) continue;
        const cleanHref = href.split('#')[0].split('?')[0];
        if (!cleanHref || cleanHref === '/') continue;
        if (/\.(?:css|js|png|jpe?g|webp|svg|ico|gif|xml|txt|json|woff2?|ttf|eot|mp4|pdf)$/i.test(cleanHref)) continue;
        if (!internalLinks.has(cleanHref)) internalLinks.set(cleanHref, new Set());
        internalLinks.get(cleanHref).add(fileName);
    }
}

const duplicateTitles = Array.from(indexableTitles.entries()).filter(([, files]) => files.length > 1);
const duplicateDescriptions = Array.from(indexableDescriptions.entries()).filter(([, files]) => files.length > 1);

const sitemapPath = path.join(publicDir, 'sitemap.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    sitemapUrls = extractAll(sitemap, /<loc>([^<]+)<\/loc>/gi);
}
const thinTaxonomyInSitemap = sitemapUrls.filter(url => /\/(tags|archives)\//i.test(url));
const brokenInternalLinks = [];
for (const [href, sources] of internalLinks.entries()) {
    let decodedPath;
    try {
        decodedPath = decodeURIComponent(href).replace(/^\/+|\/+$/g, '');
    } catch {
        brokenInternalLinks.push({ href, sources: Array.from(sources), reason: 'invalid URL encoding' });
        continue;
    }
    const candidates = [
        path.join(publicDir, decodedPath, 'index.html'),
        path.join(publicDir, decodedPath)
    ];
    if (!candidates.some(candidate => fs.existsSync(candidate))) {
        brokenInternalLinks.push({ href, sources: Array.from(sources) });
    }
}

console.log('SEO audit summary');
console.log('=================');
console.log(`HTML pages: ${htmlFiles.length}`);
console.log(`Indexable pages: ${indexablePages}`);
console.log(`Noindex pages: ${noindexPages}`);
console.log(`Sitemap URLs: ${sitemapUrls.length}`);
console.log(`Duplicate titles: ${duplicateTitles.length}`);
console.log(`Duplicate descriptions: ${duplicateDescriptions.length}`);
console.log(`Pages with multiple meta descriptions: ${issues.multipleDescriptions.length}`);
console.log(`Missing descriptions: ${issues.missingDescription.length}`);
console.log(`Missing canonicals: ${issues.missingCanonical.length}`);
console.log(`Invalid JSON-LD blocks: ${issues.invalidJsonLd.length}`);
console.log(`Missing image alt attributes: ${issues.missingAlts.length}`);
console.log(`Tag/archive URLs in sitemap: ${thinTaxonomyInSitemap.length}`);
console.log(`Broken internal links: ${brokenInternalLinks.length}`);

printItems('Duplicate titles', duplicateTitles, ([title, files]) => `${title} -> ${files.join(', ')}`);
printItems('Duplicate descriptions', duplicateDescriptions, ([desc, files]) => `${desc.slice(0, 80)} -> ${files.join(', ')}`);
printItems('Multiple description tags', issues.multipleDescriptions, item => `${item.file} (${item.count})`);
printItems('Short indexable descriptions', issues.shortDescriptions, item => `${item.file} (${item.length})`);
printItems('Long indexable descriptions', issues.longDescriptions, item => `${item.file} (${item.length})`);
printItems('Missing title', issues.missingTitle, item => item);
printItems('Missing description', issues.missingDescription, item => item);
printItems('Missing canonical', issues.missingCanonical, item => item);
printItems('Missing robots meta', issues.missingRobots, item => item);
printItems('Unexpected H1 count', issues.h1Count, item => `${item.file} (${item.count})`);
printItems('Invalid JSON-LD', issues.invalidJsonLd, item => `${item.file}: ${item.error}`);
printItems('Missing image alt', issues.missingAlts, item => `${item.file}: ${item.tag}`);
printItems('Thin taxonomy URLs in sitemap', thinTaxonomyInSitemap, item => item);
printItems('Broken internal links', brokenInternalLinks, item => `${item.href} <- ${item.sources.slice(0, 3).join(', ')}`);

const criticalCount = duplicateTitles.length
    + duplicateDescriptions.length
    + issues.multipleDescriptions.length
    + issues.missingTitle.length
    + issues.missingDescription.length
    + issues.missingCanonical.length
    + issues.invalidJsonLd.length
    + thinTaxonomyInSitemap.length
    + brokenInternalLinks.length;

if (criticalCount > 0) {
    console.error(`\nSEO audit failed with ${criticalCount} critical issue(s).`);
    process.exitCode = 1;
} else {
    console.log('\nSEO audit passed: no critical metadata or sitemap issues found.');
}
