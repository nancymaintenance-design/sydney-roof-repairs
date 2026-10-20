# Sydney Roof Repairs｜本地验收报告 R2

## 结论

**READY FOR OWNER REVIEW — DO NOT PUBLISH**

- Release ID：`SYD-ROOF-FLOW-B-FOUNDATION-01A`
- 验收日期：2026-09-18（Australia/Sydney）
- 已授权层：本地实施与本地验收。
- 未授权层：noindex Preview、Production、DNS、索引、GSC、GA4、GBP、真实询盘投递。

## 本地构建与门禁

| 检查                             | 结果           | 当前证据                                                 |
| -------------------------------- | -------------- | -------------------------------------------------------- |
| `pnpm install --frozen-lockfile` | PASS           | lockfile 无漂移，407 packages 完成安装                   |
| `pnpm build`                     | PASS           | client、SSR、Nitro Vercel Build Output 全部生成          |
| `pnpm typecheck`                 | PASS           | `tsc --noEmit` exit 0                                    |
| `pnpm lint`                      | PASS           | ESLint exit 0                                            |
| `pnpm validate:review`           | PASS           | 六服务、双语、证据、媒体、表单与 fail-closed 门禁通过    |
| `pnpm validate:release`          | EXPECTED BLOCK | 仅因 Production 授权、域名、索引及询盘投递配置缺失而阻断 |

## SSR 与路由

- 英文与 zh-Hans 共 26 个公开路由：26/26 返回 200、26/26 有 H1、26/26 保持 noindex。
- 生产域名仍为 purchase-pending，因此本地 canonical 与公开索引信号不生成；这是正确门禁结果。
- 六个英文服务 Owner 与六个中文等效详情页均存在，Title、H1、URL 与 Query Owner 未迁移。

## 桌面真实点击

英文闭环在当前源码的 Chrome 中通过：

1. Home → `Services`：`/services`
2. `See related work photos`：`/projects#valley-and-abutment-details`
3. Projects → `Roof leak repairs`：`/services/roof-leak-repairs-sydney`
4. 详情页 contextual enquiry：`/contact?service=roof-leak-repairs-sydney`
5. Contact 可见提示：`Selected service: Roof leak repairs`

中文闭环通过：`/zh-hans` → 对应 Projects 锚点 → 中文服务详情 → `/zh-hans/contact?service=roof-leak-repairs-sydney`，Contact 可见提示为“已选择服务：屋顶漏水维修”。

## 390px 与 Lightbox

- Chrome viewport 设置为 390×844 后，26/26 英中路由均满足 `scrollWidth <= clientWidth`，且全部显示 H1。
- Projects 四组证据卡按 3/3/4/5 张照片呈现；移动端为单列内容流，没有人工等高造成的空白拉伸。
- 中文 Projects Lightbox 已真实点击打开；大图、关闭、上一张、下一张、居中说明和“第 1 张，共 3 张”均可见。
- 点击下一张后实际更新为“第 2 张，共 3 张”；关闭后焦点返回原图片按钮。
- 移动导航已真实点击展开与关闭；验收结束后 viewport 已恢复默认桌面尺寸。

## 证据闭环与媒体边界

- Home、Services Hub、全部 Detail 的服务入口均提供对应 Projects 证据内链；Projects 可返回相关 Service，并带具体服务语境进入 Contact。
- Projects 使用四个 Level 2 服务专属证据组，共 15 张已筛选真实屋顶部位照片；不拼接 Before/After，不把散图写成同一完工项目。
- 每组公开卡片均包含“画面可以看见 / 咨询时怎么用 / 仍需现场或进一步确认”，每张图有独立 label、caption 与 alt。
- 已筛选 public 媒体 16 张，其中 15 张用于 Projects；本批没有使用 AI 图片。

## 社媒、付款与主体边界

- Contact 与 Footer 当前只渲染 owner-supplied 的 LinkedIn、Facebook、Instagram；桌面实测共 6 个外链实例，目标 URL 全部正确。
- Sydney Google/GBP 精确 URL 未提供：配置为 `url: ""`、`candidate-not-verified`、`enabled: false`，页面实测 Google 链接 0、Brisbane 文案 0。
- 渲染器保留第二层保护：即使未来错误写入非 Sydney Google URL，也不会公开渲染。
- Footer 显示 Visa、Mastercard、American Express、EFTPOS、Bank transfer、Cash 六种纯图标付款标识。
- `9 Castlereagh St, Sydney NSW 2000` 只按 owner-supplied 联系地址显示，不声明为 walk-in office、storefront 或 GBP 地址。

## 表单与未验证项

- 表单在 provider 未配置时 fail-closed，并提供明确 503 语义；不会伪造投递成功。
- `QUOTE_DELIVERY_URL`、`QUOTE_DELIVERY_TOKEN`、`QUOTE_RECIPIENT` 未配置；真实邮件接收、收件箱、Lead、Quote、Sale、Revenue、Profit 均未验证。
- GA4、GSC、Sydney GBP、域名所有权与公开索引均未验证。

## 失败轨迹与纠正

1. 本地验证期间旧 `nitro preview` 进程继续引用上一轮资产哈希，而新的 build 已替换静态目录，导致客户端 JS 404；该状态只显示 SSR，移动菜单与 Lightbox无法 hydration。
2. 停止旧进程后，使用当前源码的 Vite dev server重跑真实交互，移动导航、Lightbox、英中证据链与 26 路由 390px 全部通过。
3. 当前 Vercel preset 的 `nitro preview` 无法读取 build info，`vite preview` 又查找不存在的 `dist/server/server.js`；因此本地交互以 dev server 验证，Vercel Runtime必须在单独获批的 noindex Preview 阶段重新实测。
4. 工作期间 Google 配置曾被外部并发写回 Brisbane URL；已改为 Sydney URL 未核实即禁用，并把 validator改为禁止任何 Brisbane donor token。短时稳定复核未再次写回。
5. 早期 `LOCAL-ACCEPTANCE-REPORT-2026-09-18.md` 已标记 superseded，不再作为当前结论。

## 当前阻断与下一审批门

- `sydneyroofrepairservices.com.au`：`OWNER-SELECTED / PURCHASE-PENDING`。
- 没有 noindex Preview、Production、DNS 或 Indexing 授权。
- 下一阶段如需继续，仅可使用：`批准noindex Preview + Sydney Roof Repairs + SYD-ROOF-FLOW-B-FOUNDATION-01A`。
- 该批准只允许建立受保护的 noindex Preview；Production、DNS、索引、投递、GA4/GSC/GBP 仍需分别审批。
