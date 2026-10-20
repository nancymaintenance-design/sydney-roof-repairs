# Sydney Roof Repairs 本地验收报告 R6

日期：2026-09-18  
批次：`SYD-ROOF-FLOW-B-FOUNDATION-01A`  
状态：`READY FOR OWNER REVIEW — DO NOT PUBLISH`

## 本轮范围

本轮仅修改 Sydney Roof Repairs 本地源码，处理 Home 服务卡过于笨重，以及 Projects 分组左侧被硬推到底后出现大面积空白的问题。未触碰 Vercel Preview、Production、域名、DNS、GSC、GA4、GBP、表单投递配置或公开内容。

## 竞品与十站对照

- 真实 Chrome 可见样本 `https://www.sydneyroofrepairsandrestorations.com.au/?loaded`：Home 使用 3×2 图片任务门户，短标题、短说明和单一底部动作条。
- 真实 Chrome 可见样本 `https://sydneyroofingrepairs.com.au/`：Services 使用紧凑多列图片瓦片，图片与服务名为主，卡内文字很少。
- 十站本地源码再次核对后，Projects 成熟模式均让图片服从内容节奏，或采用上文下图的等比例图集；没有用空白把 CTA 推到底的合理模板。
- 以上只作为本轮可见结构样本，不证明竞品稳定 Google 排名，也未复制其品牌、文案、图片、资质或服务声明。

## Home 服务卡修正

- 六个服务 Owner 保持不变，桌面由两列长横卡改为六列紧凑图片瓦片；中屏 3 列、移动端单列。
- 每张卡保留短说明、Service Detail 入口和 Projects 对应证据锚点；不再重复上方 3×2 站内任务门户的构图。
- 1680px 实测为 6 列，每列约 219px；390px 实测为单列，`scrollWidth 375 < innerWidth 390`。

## Projects 空白修正

- 删除 `project-actions mt-auto` 机制，服务标签和咨询 CTA 现在紧跟限制说明，处于正常文档流。
- 三条可见事实改为独立轻量信息行，阅读层级更清楚。
- 桌面右侧图库固定为两行并绝对贴合左侧自然内容高度；移动端恢复普通单列文档流。
- 四个项目组实测左右高度差均为 `0px`，CTA 到左栏底部均为正常 `40px` 内边距；旧版的 473–1486px 空白已消除。

## 验证结果

- `pnpm run validate:review`：PASS
- `pnpm run typecheck`：PASS
- `pnpm run lint`：PASS
- `pnpm run build`：PASS
- Chrome 桌面与 390px：无横向溢出，Console `warn/error = 0`
- 本地中文 Home 已保留为预览标签；当前批次仍未授权发布。
