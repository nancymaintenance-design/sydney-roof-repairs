# Sydney Roof Repairs 本地验收报告 R4

日期：2026-09-18  
批次：`SYD-ROOF-FLOW-B-FOUNDATION-01A`  
状态：`READY FOR OWNER REVIEW — DO NOT PUBLISH`

## 1. 本轮范围

本轮只修改 `E:\codex dev\melone-geo-seo\sites\sydney-roof-repairs-flow-b` 本地正式源，处理以下三项 Owner 反馈：

1. 六个服务详情页的 FAQ 必须真实可见、专属且可直接到达；
2. 14 篇双语 Blog 单篇不能停留在短正文，需具备完整阅读、判断和转化结构；
3. Home 继续参考悉尼同业的信息组织机制，减少平铺感并提高视觉完成度。

本轮未创建 Vercel Preview、未部署 Production、未修改域名、DNS、GSC、GA4、GBP、环境变量或询盘提供商配置，未提交真实表单。

## 2. 竞品页面核对与采用边界

当前实际打开并核对：

- `https://www.sydneyroofrepairsandrestorations.com.au/?loaded`
- `https://www.sydneyroofrepairsandrestorations.com.au/blog/`
- `https://www.sydneyroofrepairsandrestorations.com.au/blog/roof-cleaning-and-restoration-is-important-for-any-home`

可采用机制：顶部电话/邮箱/平台入口、Home 六入口门户、About/commitment 的图片与正文节奏、Blog 时间归档、单篇 H2 分层、上一篇/下一篇及明确 Contact 收口。

未采用内容：折扣、经验年限、牌照、客户数量、保证、价格优势和“冰坝”等不适合当前事实或悉尼语境的原文；未复制竞品图片、文案、企业身份或项目结果。竞品页面只作为本次可见结构样本，不据此声明稳定 Google 排名。

## 3. 服务详情 FAQ 封口

- 六个英文详情页与六个中文详情页均渲染独立 FAQ；
- 每个服务从 2 问扩充到 5 问，共 `6 × 5 × 2` 个双语可见问答；
- Hero 新增 `Read service FAQs / 查看服务FAQ` 直达入口；
- Hero 后新增本页目录：可见信号、评估信息、服务 FAQ、相关照片、提交咨询；
- FAQ 使用 `#service-faq`，并保留详情页对应 Projects 与带服务参数的 Contact 链路；
- validator 新增硬门：六个服务任一少于 5 问，或详情页缺 FAQ 锚点即失败。

桌面真实 Chrome 已检查英文 Roof Leak Repairs 和中文 Metal Roof Repairs；390px 环境中中文 Metal Roof Repairs 为 `innerWidth=390 / scrollWidth=390`，5 个问答均存在，第二问可展开，首问与第二问同时为 open，底部移动 CTA 未遮挡问答标题。

## 4. Blog 单篇完整结构

14 篇英文与14篇中文文章均保留真实首发日期 `2026-09-18`，没有伪造历史时间轴。每篇现包含：

1. 分类、日期、预计阅读时间和直接摘要；
2. `Guide at a glance / 指南摘要` 三项要点；
3. 可抓取文章目录；
4. 原有 3–4 个主题正文段落与记录清单；
5. 逐文章独立的悉尼住宅语境；
6. 逐文章独立的“何时从观察转为咨询”判断段；
7. 相关服务说明卡及服务详情/FAQ入口；
8. 上一篇/下一篇导航；
9. 4 个文章级 FAQ；
10. Contact 收口。

Blog Hub 继续保留 `2026 → September/九月 → 14篇` 的真实归档和主题计数。validator 新增硬门：14篇必须都有独立补充层，单篇必须出现目录、悉尼语境、咨询判断和文章 FAQ 锚点。

## 5. Home 精修

- 首屏主 Hero、品牌视觉和核心 Query Owner 保持不变；
- 首屏后的六入口由小按钮重构成带图标、说明和序号的任务门户；
- 服务卡、对应 Projects 证据内链继续保留；
- 原有四张流程卡和独立费用横条合并为一块屋顶照片主视觉；
- 新模块同时表达四步承接方式、照片不能替代检查、报价前需确认的五类因素，以及 About/Contact 下一步；
- 模块语义对应竞品的 About/commitment 节奏，但全部换成 Ellis 当前可证实的承接边界，没有添加保证、折扣、资质或经验年限。

390px 调整：中文 Hero 强调短语独立换行，主 CTA 纵向全宽；Blog 和 Home 标题支持安全断行；目录网格使用 `minmax(0,1fr)`；页面 `innerWidth=390 / scrollWidth=390`。

## 6. 验证结果

- `pnpm run typecheck`：PASS
- `pnpm run lint`：PASS
- `pnpm run validate:review`：PASS
- `pnpm run build`：PASS
- 英中服务详情 + 英中 Blog 单篇 + 英中 Home SSR：42/42 检查通过
- 桌面 Chrome：英文详情FAQ、中文详情FAQ、中文Blog单篇、中文Home通过
- 390px Chrome CDP：Home、Blog、服务FAQ均无横向滚动；服务FAQ展开交互通过
- Release validator：按预期 BLOCKED

Release 阻断项仍为：缺少明确 Production 批准、域名所有权未验证、正式站点 URL 未显式配置、公开索引未启用、`QUOTE_DELIVERY_URL`、`QUOTE_DELIVERY_TOKEN`、`QUOTE_RECIPIENT` 未配置。

## 7. 交付结论

本轮三个反馈项已经完成本地返工与可见页面验证。候选仍为 noindex 本地实施状态，不得发布。下一门禁保持：

`批准noindex Preview + Sydney Roof Repairs + SYD-ROOF-FLOW-B-FOUNDATION-01A`
