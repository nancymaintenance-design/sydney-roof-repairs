# QUERY → OWNER BASELINE

| Core Query Axis        | Query / variant                   | Intended Owner                               | Page role                       | Protection                                          |
| ---------------------- | --------------------------------- | -------------------------------------------- | ------------------------------- | --------------------------------------------------- |
| Generic city + service | Sydney Roof Repairs               | `/`                                          | Core transaction                | PROTECTED — no generic `/roof-repairs/` competitor  |
| Generic service + city | Roof Repairs Sydney               | `/`                                          | Core transaction                | PROTECTED — Home Title/H1/canonical owner           |
| Symptom                | roof leak repairs Sydney          | `/services/roof-leak-repairs-sydney`         | Symptom-to-service transaction  | Distinct from storm/tile pages                      |
| Event damage           | storm damage roof repairs Sydney  | `/services/storm-damage-roof-repairs-sydney` | Storm triage transaction        | Insurance decision excluded                         |
| Material               | tile roof repairs Sydney          | `/services/tile-roof-repairs-sydney`         | Tile-system transaction         | Ridge page owns repointing specifics                |
| Material               | metal roof repairs Sydney         | `/services/metal-roof-repairs-sydney`        | Metal-system transaction        | Flashing page owns junction specifics               |
| Component              | flashing repairs Sydney           | `/services/flashing-valley-repairs-sydney`   | Junction/drainage transaction   | No standalone valley duplicate                      |
| Component              | roof valley repairs Sydney        | `/services/flashing-valley-repairs-sydney`   | Junction/drainage transaction   | Same intent family                                  |
| Component              | ridge capping repairs Sydney      | `/services/ridge-capping-repointing-sydney`  | Ridge-system transaction        | No generic tile-page duplication                    |
| Component              | roof repointing Sydney            | `/services/ridge-capping-repointing-sydney`  | Ridge-system transaction        | Same intent family                                  |
| Evidence               | Sydney roof repair projects       | `/projects`                                  | Proof/documentation             | Does not replace Service pages                      |
| Area confirmation      | roof repairs service areas Sydney | `/areas`                                     | Availability confirmation       | No mass suburb pages                                |
| Brand trust            | Ellis Services roof repairs       | `/about`                                     | Entity/process trust            | No unverified legal/credential claims               |
| Action                 | contact Sydney roof repairs       | `/contact`                                   | Enquiry conversion              | No new service owner                                |
| Informational support  | roof repair enquiry guides        | `/blog` + `/blog/{slug}`                     | Education / enquiry preparation | Must link into, not replace, Home or Service owners |

## 基线条件

- 当前没有 GSC/index/ranking 数据；这些状态均为 `未验证`，不是 0。
- 竞品 SERP 只用于功能与 Query Owner 机制参考，不复制品牌、文案、代码或资产。
- Blog 标题只承接症状记录、安全观察、材料信息与咨询准备意图；不得用与 Home 或六个 Service Owner 相同的 Title/H1 主张交易型核心 Query。
- 任何未来 Title、H1、URL、canonical 或 Owner 改动，必须先保存本表与目标城市真实 SERP 条件。
