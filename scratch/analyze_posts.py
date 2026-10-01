import os
import glob
import re

posts_dir = r'd:\桌面文件\clashmac.cn.com\source\_posts'
files = glob.glob(os.path.join(posts_dir, '*.md'))

print(f"Total posts found: {len(files)}")

key_posts = [
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
]

print("\n--- Key Core Traffic Posts Info ---")
for f in files:
    fname = os.path.basename(f)
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    title_match = re.search(r'^title:\s*(.+)$', content, re.M)
    title = title_match.group(1).strip() if title_match else ''
    updated_match = re.search(r'^updated:\s*(.+)$', content, re.M)
    updated = updated_match.group(1).strip() if updated_match else ''
    date_match = re.search(r'^date:\s*(.+)$', content, re.M)
    date = date_match.group(1).strip() if date_match else ''
    
    has_sept = '9月' in title or '9月' in content[:500] or '2026-09' in updated
    
    if fname in key_posts or has_sept:
        print(f"File: {fname}")
        print(f"  Title: {title}")
        print(f"  Date: {date} | Updated: {updated}")
        print(f"  Has September references in title/intro: {has_sept}")
        print("-" * 50)
