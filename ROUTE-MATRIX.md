# ROUTE MATRIX

| Locale  | URL                                          | Primary owner / purpose                               | Index intent             | Alternate                                            |
| ------- | -------------------------------------------- | ----------------------------------------------------- | ------------------------ | ---------------------------------------------------- |
| en-AU   | `/`                                          | Sydney Roof Repairs / Roof Repairs Sydney             | INDEX after release gate | `/zh-hans`                                           |
| en-AU   | `/services`                                  | Roof repair services hub                              | INDEX after release gate | `/zh-hans/services`                                  |
| en-AU   | `/services/roof-leak-repairs-sydney`         | Roof leak repairs Sydney                              | INDEX after release gate | `/zh-hans/services/roof-leak-repairs-sydney`         |
| en-AU   | `/services/storm-damage-roof-repairs-sydney` | Storm damage roof repairs Sydney                      | INDEX after release gate | `/zh-hans/services/storm-damage-roof-repairs-sydney` |
| en-AU   | `/services/tile-roof-repairs-sydney`         | Tile roof repairs Sydney                              | INDEX after release gate | `/zh-hans/services/tile-roof-repairs-sydney`         |
| en-AU   | `/services/metal-roof-repairs-sydney`        | Metal roof repairs Sydney                             | INDEX after release gate | `/zh-hans/services/metal-roof-repairs-sydney`        |
| en-AU   | `/services/flashing-valley-repairs-sydney`   | Flashing and valley repairs Sydney                    | INDEX after release gate | `/zh-hans/services/flashing-valley-repairs-sydney`   |
| en-AU   | `/services/ridge-capping-repointing-sydney`  | Ridge capping and repointing Sydney                   | INDEX after release gate | `/zh-hans/services/ridge-capping-repointing-sydney`  |
| en-AU   | `/projects`                                  | Evidence/project documentation                        | INDEX after release gate | `/zh-hans/projects`                                  |
| en-AU   | `/areas`                                     | Sydney enquiry-area fit, context and service matching | INDEX after release gate | `/zh-hans/areas`                                     |
| en-AU   | `/about`                                     | Brand/process trust                                   | INDEX after release gate | `/zh-hans/about`                                     |
| en-AU   | `/contact`                                   | Enquiry action                                        | INDEX after release gate | `/zh-hans/contact`                                   |
| en-AU   | `/blog`                                      | Roof repair guide hub                                 | INDEX after release gate | `/zh-hans/blog`                                      |
| en-AU   | `/blog/{14-guide-slugs}`                     | Informational enquiry preparation                     | INDEX after release gate | `/zh-hans/blog/{same-slug}`                          |
| en-AU   | `/privacy`                                   | Privacy policy                                        | NOINDEX                  | `/zh-hans/privacy`                                   |
| zh-Hans | `/zh-hans`                                   | 悉尼屋顶维修 / Sydney Roof Repairs 中文等效           | INDEX after release gate | `/`                                                  |
| zh-Hans | `/zh-hans/services`                          | 屋顶维修服务总览                                      | INDEX after release gate | `/services`                                          |
| zh-Hans | `/zh-hans/services/{same-six-slugs}`         | 六项服务中文等效                                      | INDEX after release gate | `/services/{slug}`                                   |
| zh-Hans | `/zh-hans/projects`                          | 真实项目资料                                          | INDEX after release gate | `/projects`                                          |
| zh-Hans | `/zh-hans/areas`                             | 悉尼咨询区域适配、位置语境与服务匹配                  | INDEX after release gate | `/areas`                                             |
| zh-Hans | `/zh-hans/about`                             | 品牌与流程                                            | INDEX after release gate | `/about`                                             |
| zh-Hans | `/zh-hans/contact`                           | 咨询动作                                              | INDEX after release gate | `/contact`                                           |
| zh-Hans | `/zh-hans/blog`                              | 屋顶维修指南总览                                      | INDEX after release gate | `/blog`                                              |
| zh-Hans | `/zh-hans/blog/{same-14-guide-slugs}`        | 咨询准备信息支持                                      | INDEX after release gate | `/blog/{slug}`                                       |
| zh-Hans | `/zh-hans/privacy`                           | 隐私政策                                              | NOINDEX                  | `/privacy`                                           |
| system  | `/robots.txt`                                | Host-aware crawl control                              | N/A                      | N/A                                                  |
| system  | `/sitemap.xml`                               | Host-aware indexable URL set                          | N/A                      | N/A                                                  |
| system  | `/api/quote`                                 | Server-side enquiry acceptance                        | NOINDEX                  | N/A                                                  |
| system  | unknown URL                                  | Real 404                                              | NOINDEX                  | N/A                                                  |

## 路由门禁

- 本地、Preview、未知 host：`X-Robots-Tag: noindex, follow`，移除 canonical/og:url/JSON-LD。
- Production 只有在域名所有权、`VITE_SITE_URL` 与 `VITE_SITE_INDEXABLE` 三个门同时成立时才允许 index。
- sitemap 本地返回空 `urlset`；正式门开启后包含 54 个可索引 URL，不含两条 Privacy。
- 14 篇首发指南统一使用真实发布日期 `2026-09-18`，归档为 `2026 / September (14)`；不使用倒填历史日期。
