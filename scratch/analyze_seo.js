const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, fileList);
        } else if (filePath.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    console.error('public/ directory does not exist. Please run hexo generate first.');
    process.exit(1);
}

const htmlFiles = getFiles(publicDir);
const titleLengths = [];
const missingAlts = {};
const linksWithIndexHtml = [];

for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const relPath = path.relative(publicDir, file).replace(/\\/g, '/');

    // 1. Check Title Length
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (titleMatch) {
        const title = titleMatch[1];
        titleLengths.push({ file: relPath, title, length: title.length });
    }

    // 2. Check Image Alts
    const imgMatches = content.matchAll(/<img\s+[^>]*>/gi);
    for (const match of imgMatches) {
        const imgTag = match[0];
        if (!imgTag.toLowerCase().includes('alt="') && !imgTag.toLowerCase().includes("alt='") || imgTag.match(/alt=["']\s*["']/)) {
            if (!missingAlts[relPath]) {
                missingAlts[relPath] = [];
            }
            missingAlts[relPath].push(imgTag);
        }
    }

    // 3. Check Links containing index.html
    const linkMatches = content.matchAll(/href="([^"]*index\.html[^"]*)"/gi);
    for (const match of linkMatches) {
        const href = match[1];
        // Exclude external links and just focus on internal ones referencing posts/docs
        if (!href.startsWith('http') || href.includes('clashmac.vip') || href.includes('clashmac.cn.com')) {
            linksWithIndexHtml.push({ file: relPath, href });
        }
    }
}

let output = '';
const log = (msg) => { output += msg + '\n'; };

// Output Title Lengths sorted by length descending
log('=== Title Lengths ===');
titleLengths.sort((a, b) => b.length - a.length);
titleLengths.forEach(t => {
    log(`Length: ${t.length} | File: ${t.file}\nTitle: ${t.title}\n`);
});

// Output Missing Alts
log('=== Pages with Missing Alt Tags ===');
const missingAltKeys = Object.keys(missingAlts);
log(`Found ${missingAltKeys.length} pages with missing alt tags:`);
missingAltKeys.forEach(k => {
    log(`File: ${k} (${missingAlts[k].length} missing)`);
    missingAlts[k].forEach(img => log(`  ${img}`));
});

// Output Links with index.html
log('\n=== Internal links containing index.html ===');
log(`Found ${linksWithIndexHtml.length} links with index.html:`);
linksWithIndexHtml.forEach(l => {
    log(`File: ${l.file} -> Link: ${l.href}`);
});

fs.writeFileSync(path.join(__dirname, 'analyze_seo_output.txt'), output, 'utf-8');
console.log('Results written to scratch/analyze_seo_output.txt');
