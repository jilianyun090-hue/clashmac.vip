const fs = require('fs');
const path = require('path');
const https = require('https');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const host = 'clashmac.vip';
const key = '12a9889fbf3e4ca29d6272a042c1dc73';
const keyLocation = `https://${host}/${key}.txt`;

function getUrls() {
  if (!fs.existsSync(sitemapPath)) {
    console.log('sitemap.xml not found!');
    return [];
  }
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1].trim());
  }
  return Array.from(new Set(urls));
}

function postIndexNow(endpoint, payload) {
  return new Promise((resolve) => {
    const url = new URL(endpoint);
    const data = JSON.stringify(payload);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        console.log(`[${endpoint}] Response status: ${res.statusCode}, body: ${body || 'OK'}`);
        resolve();
      });
    });

    req.on('error', (e) => {
      console.error(`[${endpoint}] Error: ${e.message}`);
      resolve();
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  const urls = getUrls();
  console.log(`Extracted ${urls.length} URLs from sitemap.xml.`);
  
  if (urls.length === 0) {
    console.log('No URLs found to submit.');
    return;
  }

  const payload = {
    host: host,
    key: key,
    keyLocation: keyLocation,
    urlList: urls
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    await postIndexNow(endpoint, payload);
  }
}

main();
