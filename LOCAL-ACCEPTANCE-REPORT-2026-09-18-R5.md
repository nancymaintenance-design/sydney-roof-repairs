# Sydney Roof Repairs 本地验收报告 R5

日期：2026-09-18  
批次：`SYD-ROOF-FLOW-B-FOUNDATION-01A`  
状态：`READY FOR OWNER REVIEW — DO NOT PUBLISH`

## 1. 本轮范围与授权边界

本轮只修改 `E:\codex dev\melone-geo-seo\sites\sydney-roof-repairs-flow-b` 本地正式源，落实 Owner 的三项要求：

1. 参照悉尼同业的 Areas Hub 与区域详情表达机制重构本站 Areas；
2. 结合竞品六入口门户范式精修 Home 开屏；
3. 对六个服务详情页及公共页面模块进行结构、文案、内链、桌面和移动端审计，并修复可见缺口。

未创建或修改 Vercel Preview、Production、域名、DNS、GSC、GA4、GBP、Resend、环境变量及生产表单；未提交真实询盘。

## 2. 竞品样本与采用边界

本轮核对的当前可见样本：

- `https://www.sydneyroofrepairsandrestorations.com.au/?loaded`
- `https://www.sydneyroofrepairsandrestorations.com.au/areas-serviced/`
- `https://www.sydneyroofrepairsandrestorations.com.au/penrith`
- Owner 提供的 Home 六入口和 Penrith 页面截图

采用的只是表达结构：顶部直接联系、Home 六个任务入口、Areas Hub、区域页双栏说明、服务范围/预期步骤/场景图/询盘收口。未复制其蓝色视觉、企业身份、图片、原文、suburb Owner 页面或项目结果。

明确排除：折扣、25 年经验、牌照、客户数量、材料等级、固定施工方法、数小时完成、ASAP、价格优势、保证、全悉尼及远距离区域覆盖等当前 Ellis 事实未支持的声明。竞品样本仅证明本次可见页面结构，不证明其稳定 Google 排名。

## 3. Areas 重构

Areas 由“Hero + FAQ”扩展为完整决策链：

1. 独立 Hero：suburb/邮编、屋顶材料、房屋高度和安全通道；
2. 页内导航：如何确认、区域分组、服务匹配、FAQ、提交咨询；
3. 四项承接核对：位置、问题、物业、通道；
4. 五类位置语境：内城与东部、北部与北岸、西部、南部与西南部、外圈或边界区域；
5. 六项服务匹配，每项链接到对应 Service Owner；
6. 提交前准备清单、5 条 Areas FAQ 和最终 Contact CTA。

区域分组明确写成“整理咨询的位置语境”，不是固定覆盖保证；没有创建 Area × Service、Penrith 或其他 suburb 薄门页。

## 4. Home 开屏精修

- 保留 Home 的 Sydney roof repairs 城市级核心 Owner、H1 与主 CTA；
- 主图新增瓦面、屋脊线、连接部位三类可见部位提示，图像和文案形成同一任务；
- 三个宣传式事实徽章改为真实顺序：说明问题 → 确认适配 → 约定下一步；
- 六入口已按参考图返工为带图片、说明和底部动作条的整卡入口，并进一步压缩图片比例、内距、字体和动作条高度：Services、About、FAQ、Areas、Projects、Contact；
- 桌面端为 3×2，移动端为单列；Blog 保留在导航和后续指南内容中，不占这组六张开屏门户卡；
- 删除入口上的 01–06 假顺序，仅保留箭头和清晰目标；
- 桌面三列、平板两列、移动单列的卡片栅格已在源码与构建产物中实现。
- 紧随其后的六个服务卡改为双列横向维修清单：窄图在左、说明与双路径在右，不再重复六入口的上图下文结构。

## 5. 六个服务详情页统一精修

六个英文详情和六个中文详情现在共同具备：

1. “可见信号”改为居中说明、宽屏五张同排卡片和独立边界说明带，移除非步骤型 01–05 编号；
2. 独特 Hero、主 CTA、相关照片与本服务 FAQ 辅助入口；
3. 三项首屏概览：从哪里开始、准备什么、Ellis 会确认什么；
4. 固定页内导航：可见信号、评估信息、FAQ、相关照片、咨询；
5. 每页 5 个独特可见信号，共 `6 × 5 × 2` 个双语信号；
6. 评估信息、四步确认路径与“不登屋顶拍照”安全边界；
7. 每页 5 条专属 FAQ；
8. 五项报价变量：可见问题、屋顶材料、受影响范围、安全通道、维修方法；
9. 完整相关服务卡片、Service→Projects 证据链接与预选 Contact 收口。

所有新增文字均停留在可观察情况、需确认信息和下一步，没有把照片或症状写成诊断、价格、保证或工期。

## 6. 公共模块审计结论

- Header：中英文主导航、电话、语言切换和 CTA 可达；
- Contact rail：电话、邮箱和四个平台纯图标保留；
- Footer：六项服务、四个平台、六种付款方式、联系事实和地址到访边界保留；
- Projects：每组左侧最后的“相关服务 + 咨询”动作组使用自动空间压到图库底线，并统一桌面底部内距；四个资料 Owner、15 张图片、服务反向链接及 Lightbox 结构未回退；
- Blog：14 篇双语完整文章结构未回退；
- Contact：服务预选、电话/邮箱 fallback 与未配置投递时的诚实失败保留；
- FAQ：Home、Services、Projects、Areas、About、Contact 及六个服务详情均有可见问答。

## 7. 本地验证证据

### 代码与构建

- `pnpm run typecheck`：PASS
- `pnpm run lint`：PASS
- `pnpm run build`：PASS
- `pnpm run validate:review`：PASS
- `pnpm run validate:release`：按预期 BLOCKED（Production 授权、域名、生产 URL、索引和 3 项询盘投递配置尚未满足）

### SSR 与路由

- 56 个中英文路由检查：`56/56 PASS`
- 12 个 Service Detail：200、`visible-signs`、`service-faq`、每页至少 5 个 `<details>`
- 28 个 Blog Detail：200、Sydney context、enquiry decision、article FAQ、每页至少 4 个 `<details>`
- Home、Services、Projects、Areas、About、Contact 双语路由：200
- Areas 双语 SSR：`confirm-fit / area-groups / area-services / area-faq` 完整
- 未知路由：404

### 真实 Chrome 桌面与 390px

- 中文 Home：缩小后的六图入口实际显示为桌面 3×2；后续六服务实际显示为双列横向维修清单，两套组件视觉职责不重复；
- 中文 Projects：四组左侧最后动作组与右侧最后图片卡底边逐组实测差值均为 `0px`；
- 390px 中文 Home：六入口与服务卡连续排列，`innerWidth=390 / scrollWidth=375`，无横向溢出；
- Chrome Console：`warn/error = 0`；临时 390px 视口已恢复为桌面默认视口；
- 本地预览标签页已回到中文 Home 并保留，未触碰 Preview 或 Production。

## 8. 发布阻断与结论

本批次仍是本地 noindex 候选。域名所有权、生产 URL、索引开关、Production 批准以及 `QUOTE_DELIVERY_URL / QUOTE_DELIVERY_TOKEN / QUOTE_RECIPIENT` 仍须由 release gate 独立验证；本报告不把本地通过写成部署、收录、排名或询盘送达。

下一授权门保持：

`批准noindex Preview + Sydney Roof Repairs + SYD-ROOF-FLOW-B-FOUNDATION-01A`
