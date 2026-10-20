# Sydney Roof Repairs｜本地验收报告

> **已由 `LOCAL-ACCEPTANCE-REPORT-2026-09-18-R2.md` 取代。** 本文件保留早期验收轨迹，不再作为当前批次结论；其中关于 Google 链接与最终 Chrome 状态的描述已过时。

## 结论

**READY FOR OWNER REVIEW — DO NOT PUBLISH**

- Release ID：`SYD-ROOF-FLOW-B-FOUNDATION-01A`
- 验收日期：2026-09-18（Australia/Sydney）
- 验收范围：本地源码、锁定安装、静态检查、生产构建、localhost HTTP、表单失败语义、Chrome 桌面/移动视觉与交互。
- 未在范围：Vercel Preview、Production、DNS、域名控制权、GSC、GA4、GBP、真实邮件投递、收件箱、索引、排名、询盘、Lead、Quote、Sale、Revenue、Profit。

## 构建与静态检查

| 检查                             | 结果           | 证据摘要                                                        |
| -------------------------------- | -------------- | --------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` | PASS           | 407 packages，lockfile 无漂移                                   |
| `pnpm build`                     | PASS           | client + SSR + Nitro Vercel preset 全部成功                     |
| `pnpm typecheck`                 | PASS           | build 生成 route tree 后 `tsc --noEmit` exit 0                  |
| `pnpm lint`                      | PASS           | ESLint exit 0                                                   |
| `pnpm validate:review`           | PASS           | 六服务、双语、媒体、门禁、表单与 donor 污染检查全通过           |
| `pnpm validate:release`          | EXPECTED BLOCK | 明确列出授权、域名、索引、QUOTE provider/recipient/token 阻断项 |

## HTTP 验收

| 项目                     | 预期                 | 实际                          | 结果 |
| ------------------------ | -------------------- | ----------------------------- | ---- |
| 英文公开页面             | 13×200               | 13×200                        | PASS |
| zh-Hans 等效页面         | 13×200               | 13×200                        | PASS |
| 未知 URL                 | 404                  | 404                           | PASS |
| 本地 HTML `X-Robots-Tag` | 27×`noindex, follow` | 27/27                         | PASS |
| 本地 canonical           | 移除                 | 0                             | PASS |
| 本地 JSON-LD             | 移除                 | 0                             | PASS |
| 英文 SSR `html lang`     | `en-AU`              | 13 个页面 + 404 均符合        | PASS |
| 中文 SSR `html lang`     | `zh-Hans`            | 13/13                         | PASS |
| `/robots.txt`            | 200 + `Disallow: /`  | 符合                          | PASS |
| `/sitemap.xml`           | 200 + 空 urlset      | 0 URL                         | PASS |
| `/favicon.ico`           | 不再 404             | 308 → SVG 200 `image/svg+xml` | PASS |

## 询盘 API 验收

| 场景                       |                             实际状态 | 结果             |
| -------------------------- | -----------------------------------: | ---------------- |
| GET `/api/quote`           |                          405 + Allow | PASS             |
| OPTIONS                    |                          204 + Allow | PASS             |
| 非 JSON Content-Type       |                                  415 | PASS             |
| 非法 JSON                  |                                  400 | PASS             |
| 电话和邮箱均缺失           |                                  400 | PASS             |
| 非法邮箱格式               |                                  400 | PASS             |
| Honeypot 命中              |                                  400 | PASS             |
| 合法载荷但 provider 未配置 |                      503 + requestId | PASS             |
| 中文 UI 失败文案           |                    中文 5xx fallback | PASS             |
| 失败后保留内容             | 姓名、位置、服务、说明、consent 保留 | PASS             |
| 真实投递与收件             |                               未执行 | 未验证 / BLOCKED |

测试载荷均为虚构值；没有真实客户资料，也没有外部 provider。

## Chrome 视觉与交互验收

| 检查                  | 结果 | 备注                                                  |
| --------------------- | ---- | ----------------------------------------------------- |
| Desktop Home 首屏     | PASS | Header、双 CTA、Hero、媒体披露、信任条无溢出或遮挡    |
| 390×844 Home          | PASS | 单列 Hero、CTA、信任条与固定 Mobile Contact Bar 可用  |
| Mobile navigation     | PASS | 主导航、语言切换、服务入口与 Call 可访问              |
| Mobile service detail | PASS | H1、症状、流程、FAQ、相关服务、底部栏均存在           |
| Home 证据入口         | PASS | 英中六张服务卡各有直达对应 Projects 锚点的内链        |
| zh-Hans Projects      | PASS | 四组项目、15 张图片按钮、三级说明与服务承接完整       |
| Projects Lightbox     | PASS | 方向键切图、Escape、焦点约束与关闭后焦点返回通过      |
| zh-Hans Contact form  | PASS | 503 失败语义为中文且字段不清空                        |
| Contact/Footer 图标   | PASS | SSR：Contact+Footer 8 个平台入口；Footer 6 个支付图标 |
| Contact 服务预选      | PASS | Projects CTA 的 `service` 参数正确选中对应下拉项      |

Chrome Profile 对英文页面启用了浏览器层自动翻译；因此桌面英文页截图的显示文字被 Chrome 翻译，但 localhost HTTP/SSR 验收已独立确认英文源文案、`lang=en-AU`、Title 与 H1。原生 `/zh-hans` 页面未依赖该翻译机制。

## 媒体验收

- 源库盘点：39 JPG + 2 MP4，共 41 项。
- 39/39 JPG 可解码并完成联系表视觉审查。
- 16 张与 tile/ridge/valley/flashing/metal/box-gutter 直接匹配的照片进入 public。
- 2 段视频未完成画面/音轨/隐私审查，未进入站点。
- 无清晰人脸、车牌或可读地址进入所选公开图；地点/日期/客户/结果均未推断。
- Image-2 槽位缺口为 0，本批未生成 AI 图片。

## 失败轨迹（保留）

1. 首次 build 因 `seo.ts` 混用 `??` 与 `||` 缺少括号而失败；单行修复后 build 通过。
2. 首次静态检查发现动态 loader 返回 `NotFoundError` 联合类型；改为 `throw notFound()` 后 typecheck 通过。
3. 首次 review validator 对 map 生成的支付禁用项和换行后的 503 做了错误字符串判断；保持安全要求不变，修正验证器语义检测后通过。
4. Chrome 表单首次 UI 验收因前序 API 矩阵触发限流，暴露中文页直接显示英文 429；新增客户端中文状态映射，重建后以新进程验证中文 503 和字段保留通过。
5. Chrome 请求默认 `/favicon.ico` 得到 404；新增站内 308 到 SVG，最终 308→200 通过。
6. 新 favicon 文件第一次在 build 前 typecheck 时，旧 route tree 未包含该路由；按生成式路由真实顺序先 build、后 typecheck，最终通过。
7. 本批组合 `apply_patch` 曾因上下文不一致而拒绝；逐文件复读确认部分补丁存在非原子落位风险，随后改用小补丁并以哈希、构建和 validator 复核。
8. 本批工作期间 `business.ts`、`SiteChrome.tsx` 和 validator 出现外部并发版本写入；停止开发服务器后逐项合并，最终 `business.ts` 在 build/typecheck/lint/review/release 门期间 SHA-256 保持稳定。
9. Projects 灯箱首次点击发生在 hydration 完成前未打开；同一 Chrome 重试后通过右方向键、Escape 和焦点返回验收。
10. 最终重启后的 Chrome Contact 选择器连续两次超过浏览器 3 秒窗口；不再重试。重启后的 localhost SSR 已确认 Contact+Footer 8 个平台入口、6 个支付图标与服务预选；该次最终 Chrome 刷新交互标记为访问失败/未验证。

## 当前阻断项

- `sydneyroofrepairservices.com.au` 仍是 `OWNER-SELECTED / PURCHASE-PENDING`，所有权未验证。
- 没有 `批准 noindex Preview`，因此没有创建/修改 Vercel 项目或部署。
- 没有 Production/DNS/Index 授权。
- Quote delivery URL、token、recipient 与真实收件均未配置/未验证。
- Ellis Services Group 的 LinkedIn、Facebook、Instagram、Google 四个平台链接及六种支付机制已启用；Google 链接指向已核对的 Brisbane Group 资料，不声明为 Sydney GBP。
- GA4/GSC/GBP 均未配置或未验证。

## 正式源码交付

- 正式源码目录：`E:\codex dev\melone-geo-seo\sites\sydney-roof-repairs-flow-b`
- 隔离验证目录与正式源码目录各含 79 个交付文件；逐文件相对路径和 SHA-256 比对差异为 0。
- `node_modules`、`.vercel`、`.output`、`.vinxi` 与 `.env*` 均未进入正式源码目录。
- 本地敏感信息模式扫描命中为 0；正式源码目录独立执行 `node scripts/validate-review.mjs` 通过。
- 这些证据只证明本地源码副本完整，不证明任何 Preview、Production、域名、投递或索引状态。

## 下一审批门

如需进入下一阶段，使用：

`批准noindex Preview + Sydney Roof Repairs + SYD-ROOF-FLOW-B-FOUNDATION-01A`

该批准只应开启受保护的 noindex Preview；Production、DNS、索引、真实表单与 GA4/GSC 仍需分别审批和验证。
