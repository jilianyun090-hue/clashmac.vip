const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'source', '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const keyPosts = [
    'airport-recommendations.md',
    'best-ladder-vpn-recommendations-2026.md',
    'best-ladder-tools-2026.md',
    'cost-effective-airports-2026.md',
    'vpn-ladder-recommendation-2026.md',
    'kuailian-vpn-letsvpn-alternatives-2026.md',
    'kuailian-vpn-guide-2026.md',
    'letsvpn-shutdown-2026.md',
    'free-vpn-recommendation-2026.md',
    'best-budget-airport-for-students.md',
    'software.md',
    'lesvpn-alternatives-2026.md'
];

console.log(`Total posts found: ${files.length}`);
console.log('\n--- Key Core Traffic Posts Info ---');

files.forEach(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const updatedMatch = content.match(/^updated:\s*(.+)$/m);
    const updated = updatedMatch ? updatedMatch[1].trim() : '';
    const dateMatch = content.match(/^date:\s*(.+)$/m);
    const date = dateMatch ? dateMatch[1].trim() : '';
    
    const hasSept = title.includes('9月') || content.slice(0, 800).includes('9月') || updated.includes('2026-09');
    
    if (keyPosts.includes(file) || hasSept) {
        console.log(`File: ${file}`);
        console.log(`  Title: ${title}`);
        console.log(`  Date: ${date} | Updated: ${updated}`);
        console.log(`  Has September references: ${hasSept}`);
        console.log('-'.repeat(50));
    }
});
