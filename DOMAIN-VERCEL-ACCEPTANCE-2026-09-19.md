# Sydney Roof Repairs 域名与 Vercel 上线验收

- 日期：2026-09-19（Australia/Sydney）
- 授权：用户明确要求配置 `sydneyroofrepairservices.com.au` 并同步到 Vercel。
- 上线边界：域名与 Vercel 生产槽已上线；搜索索引、GSC、GA4 与邮件投递仍未开放。

## Vercel 项目与部署

- Team：`nancymaintenance-8624s-projects`
- Project：`sydney-roof-repairs-flow-b`
- Project ID：`prj_m9fq0Lb9aHy3EPIAUwYpmInBHgDi`
- Org ID：`team_HgQsqT9oDcIK0DwS4mIs4L0W`
- Deployment ID：`dpl_952A4R4ShdyyT3MiUZvvBKEesxxX`
- Deployment URL：`https://sydney-roof-repairs-flow-pbtazd308.vercel.app`
- Rollback deployment ID：`dpl_B84G4bLKetcX3mt23WLHW9EpGTRV`
- Canonical production URL：`https://sydneyroofrepairservices.com.au`
- Vercel state：`READY`

## DNS 变更与回滚基线

权威 DNS 继续保留在 GoDaddy：`ns55.domaincontrol.com`、`ns56.domaincontrol.com`。

变更前：

- Apex A：`76.223.105.230`、`13.248.243.5`（GoDaddy DPS）
- `www` CNAME：`sydneyroofrepairservices.com.au.`

变更后：

- Apex A：`216.198.79.1`
- Apex A：`64.29.17.1`
- `www` CNAME：`3b93bbf88bc79512.vercel-dns-017.com.`
- 保留：NS、`_domainconnect` 与 `_dmarc`。

如需 DNS 回滚，可恢复上述变更前的两条 Apex A 与 `www` CNAME；如仅需回滚应用，可在 Vercel 将 `dpl_3YJTULLwpbkVijeZYBRH3UZTEAdQ` 重新提升为 Production。

## 验证结果

- `pnpm run validate:review`：PASS
- `pnpm run typecheck`：PASS
- `pnpm run lint`：PASS
- `pnpm run build`：PASS
- Vercel apex：`configured-correctly`、`verified`、无 issues
- Vercel `www`：`configured-correctly`、`verified`、无 issues
- Cloudflare DNS：apex 双 A 与 `www` 项目专属 CNAME 已生效
- Google DNS：apex 双 A 与 `www` 项目专属 CNAME 已生效
- Apex HTTPS：`200 OK`，`Server: Vercel`
- `www` HTTPS：当前直接返回 `200 OK`，与 apex 指向同一 Production deployment；全站仍为 noindex，开放索引前必须补回 `www → apex` 308。
- 中英文 Home、Services、Projects、Blog、Contact 共 10 条核心路由直连 Vercel edge 均为 `200 OK`
- 页面标题：`Sydney Roof Repairs | Ellis Services`
- 页面 robots meta：`noindex,nofollow,noarchive`
- `robots.txt`：`User-agent: *` / `Disallow: /`
- Canonical：`https://sydneyroofrepairservices.com.au/`

公共 DNS 与 Vercel 已一致，但本机默认解析器在 TTL 窗口内仍偶发命中旧 GoDaddy DPS 缓存；因此最终路由验收使用 Vercel 项目状态、Cloudflare/Google DNS 与 `--resolve` 直连新 edge 三方交叉验证。本机缓存未完全收敛不等于权威 DNS 回滚。

## 当前未开放项

- `VITE_SITE_INDEXABLE=false`，未授权索引。
- GSC 与 GA4 未配置。
- Quote delivery provider 未配置；表单继续 fail-closed，不会伪报发送成功。
- `validate:release` 仍应在索引、邮件投递和最终 Production release 批次获批前保持阻断。

## 2026-09-19 Home 视觉与内容流 Production 更新

- Owner 明确批准完成 Home 首屏与内容流调整后发布上线；本次只更新现有 Vercel Production 代码和 alias，不修改 DNS、GSC、GA4、邮件投递或索引开关。
- Home 桌面首屏实测：Hero 起点 `249px`、Hero 高度 `715px`、悬浮 CTA 高度 `196px`；相对上一候选约增加 30%，横向溢出为 0。
- Home 已移除 `START HERE / START WITH THE ROOF ISSUE / RELATED ROOF PHOTOS / OUR WORKING APPROACH / LATEST ROOF GUIDES / DO YOU HAVE A ROOF QUESTION?` 及对应中文内部引导标签；中英文公开 DOM 命中均为 0。
- 模块顺序保持为 Hero → 主要入口 → 服务 → 项目照片 → 咨询方式 → 指南 → FAQ → 询盘；段首改为客户可读主标题，不再显示内部编排话术和装饰性编号。
- 390×844 Production 实测：Hero `490px`、CTA `188px`、入口区宽 `380px`、横向溢出为 0；临时 viewport 已恢复。
- `typecheck`、Lint、Build、Review Validation 全部通过；8 条中英文核心路由、robots 和 sitemap 均为 200，未知路径返回 404，Production 部署错误日志为空。
- 新 Production：`dpl_952A4R4ShdyyT3MiUZvvBKEesxxX / READY / https://sydney-roof-repairs-flow-pbtazd308.vercel.app`；正式域名：`https://sydneyroofrepairservices.com.au`。
- 回滚点：`dpl_B84G4bLKetcX3mt23WLHW9EpGTRV`。当前状态：`LIVE — POST-PUBLISH VALIDATION COMPLETE / NOINDEX`。
