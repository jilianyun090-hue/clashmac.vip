#!/bin/bash
# 批量更新文章的 updated 时间和添加内链

# 定义更新日期
UPDATE_DATE="2026-08-29 17:00:00"

# 中层核心文章列表
MIDDLE_TIER_ARTICLES=(
  "airport-routes-difference.md"
  "airport-routes-selection.md"
  "determine-line-type.md"
  "airport-speed-analysis.md"
  "airport-vs-vpn.md"
  "mobile-vpn-guide.md"
  "clash-verge-rev-tutorial.md"
  "clash-meta-android-tutorial.md"
  "shadowrocket-v2-tutorial.md"
  "v2rayn-v2-tutorial.md"
)

# 其他重要文章
OTHER_ARTICLES=(
  "chatgpt-mirrors-guide.md"
  "claude-guide.md"
  "gemini-in-china.md"
  "netflix-guide.md"
  "telegram-guide.md"
  "quantumult-x-tutorial.md"
  "nekobox-tutorial.md"
  "flclash-tutorial.md"
)

cd source/_posts

echo "开始批量更新文章..."

# 更新中层核心文章
for article in "${MIDDLE_TIER_ARTICLES[@]}"; do
  if [ -f "$article" ]; then
    echo "处理: $article"

    # 检查是否已有 updated 字段
    if grep -q "^updated:" "$article"; then
      # 更新现有的 updated 字段
      sed -i '' "s/^updated:.*/updated: $UPDATE_DATE/" "$article"
    else
      # 在 date 后添加 updated 字段
      sed -i '' "/^date:/a\\
updated: $UPDATE_DATE
" "$article"
    fi

    echo "✓ $article 时间已更新"
  else
    echo "✗ $article 不存在"
  fi
done

echo ""
echo "中层文章更新完成！"
echo ""
echo "更新其他文章..."

# 更新其他文章
for article in "${OTHER_ARTICLES[@]}"; do
  if [ -f "$article" ]; then
    echo "处理: $article"

    if grep -q "^updated:" "$article"; then
      sed -i '' "s/^updated:.*/updated: $UPDATE_DATE/" "$article"
    else
      sed -i '' "/^date:/a\\
updated: $UPDATE_DATE
" "$article"
    fi

    echo "✓ $article 时间已更新"
  fi
done

echo ""
echo "全部更新完成！"
