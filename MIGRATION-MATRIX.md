# MIGRATION MATRIX

| Donor element                                       | Decision | Sydney implementation                                             |
| --------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| TanStack Start + Vite + Nitro/Vercel build skeleton | REUSE    | 仅复制依赖、SSR 启动、错误包装和工具配置                          |
| Host-aware noindex/canonical stripping              | ADAPT    | 改为 Sydney 域名门禁，并增加域名所有权环境门                      |
| File-route `services` parent `<Outlet />`           | REUSE    | 英文和 zh-Hans 各有独立父布局                                     |
| Phone + enquiry dual CTA                            | ADAPT    | 改为 Sydney 电话与屋顶咨询语义                                    |
| Honest form API pattern                             | ADAPT    | 增加 body/type/length/consent/honeypot/rate limit/provider 2xx 门 |
| Mobile contact bar                                  | ADAPT    | 双语 Call / Request assessment                                    |
| Electrical business config                          | REJECT   | 未复制任何 Brisbane、电工、牌照、保险、评论、GA4 或域名事实       |
| Electrical copy/routes/services                     | REJECT   | 重新建立六项 Sydney roofing 数据源                                |
| Electrical images/generated illustrations           | REJECT   | 只使用 owner 授权的屋顶素材                                       |
| Donor `.env.local`, `.vercel`, `node_modules`       | REJECT   | 未复制                                                            |
| Donor production/audit/GSC evidence                 | REJECT   | 未复制，Sydney 独立取证                                           |
| Donor legal entity/ABN/ACN                          | REJECT   | 本站保持 BLOCKED-EVIDENCE                                         |

## 复制边界证据

隔离目录最初只机械复制：package/lock、TypeScript/ESLint/Prettier/Vite 配置、router/server/start 与通用错误包装。所有 Sydney 业务配置、页面、路由、媒体和文档均在 isolated 中重新建立。
