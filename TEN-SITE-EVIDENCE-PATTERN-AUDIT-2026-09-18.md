# Sydney Roof Repairs｜十站证据链与图标机制对照

## 范围与边界

- 日期：2026-09-18（Australia/Sydney）
- 范围：逐一读取十个既有新站源码中的 Home、Projects、图集、服务映射和 Contact/Footer 机制；另以真实 Chrome 打开 Brisbane Appliance Repairs 参考页核对在线图标机制。
- 用途：只提炼可复用的页面结构与交互，不推断任何站点当前排名、流量、询盘或正式发布状态。
- 本批：仅实施到 Sydney Roof Repairs 本地源码；未触碰 Preview、Production、DNS、GSC、GA4 或 GBP。

## 十站逐一核对

|   # | 站点/源码                        | Projects 与证据链现状                                                                                  | 可复用结论                                                                     |
| --: | -------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
|   1 | Melbourne Bathroom Waterproofing | 没有独立 `/projects` Owner；有图集/灯箱相关实现，但没有服务卡到分组证据的完整映射。                    | 仅参考图片浏览，不作为三级证据链模板。                                         |
|   2 | Brisbane Appliance Repairs       | 十站中数据结构最完整：服务到项目组映射、可见事实、咨询用途、限制条件、分组图片及完整灯箱均有明确承接。 | 采用其“服务 → 证据组 → 图片/说明”的数据契约，但将文案改写为 Roofing 客户语言。 |
|   3 | Brisbane Curtains Online         | 没有独立 `/projects` Owner；以产品/细节图库为主。                                                      | 参考图片卡密度，不套用为 Roofing 项目证据。                                    |
|   4 | Brisbane Electrical              | 有 Projects 与灯箱，但缺少统一的服务到证据字段映射。                                                   | 参考 Projects 路由和图片交互，补足字段层。                                     |
|   5 | Brisbane Plumbing Experts        | 有 Projects，并有少量上下文/限制说明。                                                                 | 参考“可见内容与未确认事项分开写”的表达。                                       |
|   6 | Brisbane Roof Repairs            | 有 Projects 和 Home 项目入口，但证据字段较少。                                                         | 参考同品类服务到项目入口，不复用宽泛成果暗示。                                 |
|   7 | Melbourne Carpentry Services     | 有 Projects/Carousel，社交链接机制为局部实现。                                                         | 参考图库入口，不作为完整证据 Owner 模板。                                      |
|   8 | Melbourne Home Renovations       | 有 Projects 和较完整灯箱交互，但无统一证据等级字段。                                                   | 参考键盘与放大浏览交互。                                                       |
|   9 | Melbourne Roof Repairs           | 有 Projects/Carousel，并有少量现场上下文。                                                             | 参考同品类可见部位组织，不推断原因或维修结果。                                 |
|  10 | Melbourne Fix It                 | 当前核对候选中没有独立 `/projects` Owner。                                                             | 不作为证据链模板。                                                             |

## 在线参考页核对

`https://brisbane-appliance-repairs-flow-p3146b4qm.vercel.app/contact` 的普通文本读取被 Vercel Protection 拦截，但同一既有 Chrome Profile 可正常打开实际页面。真实 DOM 与页面截图确认：

- Contact：LinkedIn、Facebook、Instagram、Google Business Profile 四个纯图标入口。
- Footer：重复四个纯图标入口。
- Payments：Visa、Mastercard、American Express、EFTPOS、Bank transfer、Cash 六个纯图标/标志，无文字徽章卡片。
- Google 链接指向 Ellis Services Brisbane 资料；Sydney 站只标示为 Ellis Services Group 在线平台，不把它描述为 Sydney 办公室或 Sydney GBP。

## Sydney Roof Repairs 本批采用机制

1. Home 英文和中文六张服务卡均保留服务详情入口，并增加直达 Projects 对应锚点的证据内链。
2. Projects 以四个可辨识屋面部位组承接六个服务：瓦面、屋脊/开放部位、天沟谷/墙边泛水、金属屋面/箱式天沟。
3. 每个项目组同时提供：可见细节、咨询时怎么用、仍需确认的限制、相关服务 Owner、预选服务的 Contact CTA。
4. 15 张图片逐张提供独立标题、说明和替代文本；移动端单列，桌面端按组排布。
5. 灯箱支持上一张、下一张、左右方向键、Escape、焦点约束与关闭后焦点返回。
6. Contact 和 Footer 使用 Ellis Services Group 四个平台纯图标；Footer 使用六种支付方式纯图标。

## 证据等级与声明边界

- 当前公开图片仅作为 Level 2 可见部位资料：说明画面能看见什么，以及客户询盘时可提供哪些对应照片。
- 不把图片表述为 Sydney 特定客户、具体地址、施工日期、故障原因、维修完成、维修结果或性能证明。
- 地址、客户身份、隐藏结构、漏水来源、排水性能和维修结果均需另行核实。
- 本地实现通过不等于 Preview/Production 发布，也不等于索引、排名、询盘或成交。
