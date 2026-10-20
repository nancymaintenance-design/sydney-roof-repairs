# Sydney Roof Repairs｜本地验收报告 R3

## 结论

**READY FOR OWNER REVIEW — DO NOT PUBLISH**

- Release ID：`SYD-ROOF-FLOW-B-FOUNDATION-01A`
- 本轮本地批次：`SYD-ROOF-CONTENT-FAQ-BLOG-01B`
- 验收日期：2026-09-18（Australia/Sydney）
- 已授权层：本地实施与本地验收。
- 未授权层：noindex Preview、Production、DNS、索引、GSC、GA4、Sydney GBP、真实询盘投递。

## 本轮交付

1. Projects 3/3/4/5 图组改为内容高度布局；三图组为第一张整行、第二行两张，四图组 2×2，五图组为三列两行首图跨两列。
2. Home、Services Hub、六个 Service Detail、Projects、Areas、About、Contact、Blog Hub 与 14 个 Blog Detail 均有与页面 Owner 对应的双语 FAQ。
3. 新增 `/blog`、`/zh-hans/blog` 与 14 篇同 slug 双语详情，包含分类、真实发布日期、归档、上一篇/下一篇、相关服务和文章 FAQ。
4. 14 篇首发文章统一使用真实发布日期 `2026-09-18`，归档显示 `2026 / September (14)`；未倒填竞品 2019–2024 历史。
5. Header 上方新增联系栏：桌面显示电话、完整邮箱、Google、LinkedIn、Facebook、Instagram；移动端显示电话、邮件图标及四个平台纯图标。
6. Home 融合竞品可复用机制：六项任务入口、Blog 导航、最新指南与 FAQ；未复制竞品品牌、文案、代码、图片、折扣、25 年经验、牌照、保证或全国覆盖声称。

## Query → Owner 边界

- Home `/` 继续独占 `Sydney Roof Repairs` 与 `Roof Repairs Sydney`，Title/H1/URL 未迁移。
- 六个 Service Owner 保持不变，Blog 仅承接安全观察、症状记录、材料信息和咨询准备意图。
- Blog 页面以相关 Service 内链结束，不创建与 Home 或 Service 相同的交易型 Owner。
- Services → Projects → Service-selected Contact 的证据与询盘闭环仍保持双向连接。

## 本地构建与门禁

| 检查                    | 结果           | 当前证据                                                               |
| ----------------------- | -------------- | ---------------------------------------------------------------------- |
| `pnpm install`          | PASS           | lockfile 无改写，407 packages 从本地 store 安装                        |
| `pnpm typecheck`        | PASS           | `tsc --noEmit` exit 0                                                  |
| `pnpm lint`             | PASS           | ESLint exit 0                                                          |
| `pnpm validate:review`  | PASS           | 六服务、FAQ、14 篇 Blog、4 平台、Projects、媒体与 fail-closed 门禁通过 |
| `pnpm build`            | PASS           | client、SSR、Nitro Vercel Build Output 全部生成                        |
| `pnpm validate:release` | EXPECTED BLOCK | 仅因 Production 授权、域名、索引及询盘投递配置缺失而阻断               |

## SSR 与路由

- 英文与 zh-Hans 共 56 个公开页面路由：56/56 返回 200、56/56 有 H1、56/56 保持 noindex。
- 新增 2 个 Blog Hub 与 28 个 Blog Detail；动态 slug 路由均能渲染真实文章详情，不再回落到 Hub。
- sitemap 本地仍返回空 `urlset`；只有通过正式门后才包含 54 个可索引 URL，不含两条 Privacy。
- 生产域名仍为 `OWNER-SELECTED / PURCHASE-PENDING`，本地不生成 canonical、公开 JSON-LD 或可索引信号。

## Chrome 桌面与 390px 视觉验收

- 首页桌面首屏：顶部联系栏、4 个平台纯图标、Blog 主导航、Hero 与 CTA 均无遮挡。
- 英文与中文 Projects 第一组三图均为 `1+2` 拼图；原白色长条和三列空单元造成的深绿空洞均已消除。
- Blog Hub 可见 14 篇文章、分类计数与 `2026 / September (14)` 归档；首篇详情可见 H1、日期、三段正文、记录清单、相关服务、下一篇和 FAQ。
- 390×844 首页无横向溢出，移动导航折叠，固定 CTA 可见；联系栏同一行显示电话、邮件和四个平台入口。
- 390×844 Projects 为单列自然流，图片、说明、放大按钮和 CTA 不越界；验收后浏览器 viewport 已恢复默认。

## FAQ 与结构化内容边界

- 通用 FAQ 由单一组件呈现，首题默认展开；不同页面使用独立问答数据，不把同一组问题机械复制到全站。
- 六个 Service Detail 继续使用原服务专属 FAQ，只统一视觉样式。
- Blog 文章 FAQ 只解释观察与咨询准备，不提供远程诊断、价格、结果保证或不安全的屋顶进入建议。

## 平台、付款与主体边界

- Google、LinkedIn、Facebook、Instagram 在联系栏、Contact 和 Footer 共用同一配置并全部渲染。
- Google 当前临时使用获准的 `Google Business Profile (Ellis Services Group)` 现有资料；它不是 Sydney GBP，也不作为 Sydney 地址或排名证据，待提供 Sydney 精确 URL 后替换。
- Footer 继续显示 Visa、Mastercard、American Express、EFTPOS、Bank transfer、Cash 六个付款纯图标。
- `9 Castlereagh St, Sydney NSW 2000` 仍只按联系资料显示，不声明为 walk-in office、storefront 或 GBP 地点。

## 失败轨迹与纠正

1. 首次桌面视觉检查显示三图组虽已消除白色拉伸，但右侧仍因三列网格留下大块深绿空单元；将三图组改为两列、首图跨两列后，英中画面均通过。
2. 首次 Blog Detail 导航时 URL 已进入 slug，但页面仍显示 Hub；根因是 `blog.tsx` 被识别为父路由却未渲染 `Outlet`。改为与 Services 一致的父布局 + index 路由后通过。
3. 文章详情第一次截图返回黑画面；同一 Chrome 表面重取后确认这只是捕获异常，随后路由缺陷由完整 DOM 验证并修复。

## 仍未验证 / 下一审批门

- 域名购买与所有权、Vercel noindex Preview、Production、DNS、开放索引、GSC、GA4、Sydney GBP 均未验证。
- `QUOTE_DELIVERY_URL`、`QUOTE_DELIVERY_TOKEN`、`QUOTE_RECIPIENT` 未配置；真实邮件接收、收件箱、Lead、Quote、Sale、Revenue、Profit 均未验证。
- 下一阶段如需继续，仅可使用：`批准noindex Preview + Sydney Roof Repairs + SYD-ROOF-FLOW-B-FOUNDATION-01A`。
- 该批准只允许受保护的 noindex Preview；Production、DNS、索引、投递、GA4/GSC/GBP 仍需分别审批。
