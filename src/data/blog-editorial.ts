import type { LocalizedText } from "./faqs";

type EditorialExtension = {
  localContext: LocalizedText;
  decisionGuide: LocalizedText;
};

const t = (en: string, zh: string): LocalizedText => ({ en, zh });

export const blogEditorial: Record<string, EditorialExtension> = {
  "what-to-do-when-you-notice-a-roof-leak-sydney": {
    localContext: t(
      "In Sydney, wind direction and short periods of intense rain can make a leak appear differently from one weather event to the next. Record the rain conditions and the delay between rainfall and the indoor mark so the enquiry includes a useful timeline.",
      "在悉尼，不同风向和短时强降雨可能让同一处漏水在每次天气事件中表现不同。请记录降雨情况，以及降雨与室内水迹出现之间的时间差，让咨询包含可用的时间线。",
    ),
    decisionGuide: t(
      "Move from observation to an enquiry when the mark grows, returns with rain, appears near a light fitting or is accompanied by visible roof movement. Keep people and belongings clear of the affected area and describe any immediate safety concern when you call.",
      "当水迹扩大、随降雨反复出现、靠近灯具，或同时看到屋面构件移位时，应从观察转为咨询。请让人员和物品远离受影响区域，并在致电时说明任何即时安全风险。",
    ),
  },
  "roof-photos-that-help-explain-a-repair-enquiry": {
    localContext: t(
      "Sydney properties vary in roof pitch, neighbouring access and the distance between the street and the affected roof plane. A ground-level photo that includes a recognisable wall, gutter or ridge often provides more useful orientation than several tightly cropped images.",
      "悉尼住宅的屋顶坡度、相邻通道以及街道与受影响屋面的距离差异很大。包含墙体、天沟或屋脊等可识别参照物的地面照片，通常比多张过度裁切的近景更有定位价值。",
    ),
    decisionGuide: t(
      "Send the photo set when it shows location, visible condition and nearby components. If the only way to obtain another image involves climbing, leaning from a window or approaching damaged material, stop and explain the access limitation instead.",
      "当照片组能够说明位置、可见状况和附近构件时即可提交。如果补拍需要攀爬、探身窗外或接近受损材料，请停止拍摄并在咨询中说明通道限制。",
    ),
  },
  "tile-roof-or-metal-roof-repair-information-to-prepare": {
    localContext: t(
      "Mixed additions and later alterations can mean one Sydney property has more than one roof material or profile. Record where the materials meet and which roof plane sits above the indoor symptom rather than describing the whole property as one roof type.",
      "悉尼部分住宅经过扩建或改造后，可能同时存在多种屋顶材料或板型。请记录不同材料的交接位置，以及室内症状上方对应的屋面，而不要把整栋房屋笼统描述成一种屋顶。",
    ),
    decisionGuide: t(
      "Choose the closest material-specific service path when one system clearly dominates. If the issue sits at a junction between tile, metal, wall or gutter components, describe the junction and use the flashing or leak enquiry path rather than guessing which material failed.",
      "当问题明显集中在某一种屋面系统时，可选择对应材料的服务路径；如果问题位于瓦片、金属板、墙体或天沟的交接处，应描述该连接位置，并选择泛水或漏水咨询路径，而不是猜测哪种材料失效。",
    ),
  },
  "storm-damage-roof-check-from-ground-level": {
    localContext: t(
      "After a Sydney storm, separate what changed during that event from older weathering already visible on the roof. Event time, wind direction, fallen debris and the first sign of indoor water entry make the record more useful without claiming that every defect came from the storm.",
      "悉尼风暴过后，应把本次天气事件中出现的变化与屋顶原有风化分开记录。事件时间、风向、坠落物及首次室内进水迹象能提高记录价值，但不能据此声称所有缺陷都由风暴造成。",
    ),
    decisionGuide: t(
      "Call emergency services first for fallen powerlines, structural movement or immediate danger. For roof repair triage, send safe ground-level views and state whether the building is currently taking water; availability and attendance timing still need confirmation.",
      "如有倒塌电线、结构移动或人员面临直接危险，应先联系紧急服务。屋顶维修初步分流可提交安全的地面照片，并说明建筑是否正在进水；可用性和到场时间仍需当时确认。",
    ),
  },
  "flashing-and-roof-valley-leaks-visible-signs": {
    localContext: t(
      "Valleys and flashings concentrate or redirect water at roof changes, walls and penetrations. Leaves, fine debris and adjoining material can alter the path, so show both the visible detail and where water is expected to leave that section of roof.",
      "天沟谷和泛水会在屋面转折、墙体和穿透点集中或引导雨水。树叶、细小杂物及相邻材料都可能改变水流路径，因此应同时展示可见细节和该区域的预期排水出口。",
    ),
    decisionGuide: t(
      "Use this enquiry path when the visible concern is at a roof junction, valley, wall flashing or penetration. Include any indoor symptom below or beside that area, but keep the observed location separate from an assumed entry point.",
      "当可见问题位于屋面连接处、天沟谷、墙体泛水或穿透点时，可使用此咨询路径。请同时说明该区域下方或旁边的室内症状，但要区分观察位置与推测的进水点。",
    ),
  },
  "ridge-capping-and-repointing-what-to-report": {
    localContext: t(
      "Ridge and hip lines are visible from many Sydney streets, but distance can make surface cracks look clearer or worse than they are. A wider view of the full ridge line helps show whether the observation is localised or repeated across adjoining sections.",
      "悉尼许多住宅的屋脊和斜脊可从街道看到，但拍摄距离可能让表面裂缝显得比实际更明显或更严重。屋脊线整体照片有助于说明问题是局部出现，还是在相邻区域重复出现。",
    ),
    decisionGuide: t(
      "Start an enquiry when pieces have moved or fallen, cracking is repeated, or the ridge concern is linked to an indoor symptom. Do not try to test the tiles by hand; tile stability and the condition beneath the pointing need safe assessment.",
      "当构件出现移位或掉落、裂缝反复分布，或屋脊问题与室内症状有关时，应提交咨询。不要用手测试瓦片稳定性；瓦片及勾缝下方状况需要安全检查。",
    ),
  },
  "box-gutters-on-metal-roofs-enquiry-checklist": {
    localContext: t(
      "Box gutters may sit between roof planes or beside walls where their full path is not visible from the ground. Note where overflow, staining or an indoor mark appears and identify any accessible outlet or downpipe without entering the roof area.",
      "箱式天沟可能位于两个屋面之间或靠墙位置，从地面无法看到完整路径。请记录溢水、污迹或室内水印出现的位置，并在不进入屋面的前提下指出可见的出口或落水管。",
    ),
    decisionGuide: t(
      "Use the metal-roof or flashing-and-valley service path depending on the main visible component. If water is actively entering, explain the current condition by phone and keep the area below clear while service fit and timing are confirmed.",
      "可根据主要可见构件选择金属屋顶或泛水与天沟谷服务路径。如果水正在进入室内，请通过电话说明当前状况，并在确认承接范围和时间前保持下方区域无人无物。",
    ),
  },
  "why-roof-repair-quotes-need-access-and-scope": {
    localContext: t(
      "Two roofs with a similar visible symptom can require different access, materials and repair methods. Property height, neighbouring boundaries, roof pitch and the location of the affected plane are therefore practical quote inputs, not administrative extras.",
      "两个可见症状相似的屋顶，可能需要不同的通道、材料和维修方法。房屋高度、相邻边界、屋顶坡度及受影响屋面位置，都是实际报价依据，而不是额外的行政信息。",
    ),
    decisionGuide: t(
      "A useful first enquiry does not need a self-diagnosis. Provide the site and symptom facts you control, then ask what needs inspection before scope and price can be confirmed. Treat a photo-only figure as provisional unless its assumptions are made clear.",
      "有效的首次咨询不需要自行诊断。请提供您能确认的现场和症状信息，再询问确定范围和价格前需要检查什么。仅凭照片给出的数字，除非明确列出假设条件，否则应视为暂定信息。",
    ),
  },
  "safe-roof-inspection-what-not-to-do": {
    localContext: t(
      "Wet tiles, metal sheets, brittle materials and steep or unfamiliar access can all create risks that are not obvious from inside the property. Ground-level observation and indoor records are enough to begin an enquiry; a website guide is not permission to access a roof.",
      "湿滑瓦片、金属板、脆性材料以及陡峭或陌生的通道，都可能带来室内无法判断的风险。从地面观察并记录室内情况已经足够开始咨询；网站指南不构成登上屋顶的许可。",
    ),
    decisionGuide: t(
      "Stop immediately if an observation requires unstable ladders, leaning over an edge, walking on damaged material or approaching powerlines. Describe what prevented safe access and let that limitation form part of the assessment plan.",
      "如果观察需要使用不稳定梯具、探身越过边缘、踩踏受损材料或接近电线，请立即停止。说明是什么阻碍了安全查看，并让这一限制成为评估计划的一部分。",
    ),
  },
  "ceiling-stain-after-rain-what-to-record": {
    localContext: t(
      "A ceiling stain can change slowly after the rain has stopped because water may remain within adjoining materials. Marking the edge with the date, where safe and appropriate, or taking repeat photos from the same indoor position can show whether the visible area is changing.",
      "降雨停止后，水分可能仍滞留在相邻材料中，因此天花板水印可能继续缓慢变化。在安全且合适的情况下标注边缘日期，或从同一室内位置重复拍照，有助于说明可见范围是否变化。",
    ),
    decisionGuide: t(
      "Begin an enquiry if the stain returns, expands, becomes soft, develops active dripping or sits near electrical fittings. Report what is visible and when it changed; do not cut into the ceiling or assume the roof entry point is directly above.",
      "如果水印反复出现、扩大、变软、开始滴水或靠近电气装置，应开始咨询。请说明可见情况及变化时间；不要自行切开天花板，也不要假定进水点就在正上方。",
    ),
  },
  "how-to-choose-the-right-roof-repair-service": {
    localContext: t(
      "The best starting page is the one that matches the clearest observable component or event, not necessarily the final diagnosis. A leak after rain may begin with the leak path, while a clearly displaced ridge tile can begin with ridge capping and repointing.",
      "最合适的起始页面应匹配最明确的可见构件或事件，而不一定是最终诊断。雨后漏水可从漏水路径开始，明确移位的屋脊瓦则可从屋脊瓦与重新勾缝路径开始。",
    ),
    decisionGuide: t(
      "If more than one path seems relevant, choose the dominant symptom and list the connected components in the form. The enquiry can then be redirected after the available information is reviewed; there is no need to submit duplicate forms.",
      "如果多个路径都相关，请选择最主要的症状，并在表单中列出相关构件。资料审核后可调整咨询方向，无需重复提交多份表单。",
    ),
  },
  "roof-repair-enquiry-checklist-for-sydney-property-owners": {
    localContext: t(
      "Suburb or postcode, building height, roof material, access constraints and the weather linked to the symptom are the core context for a Sydney roof repair enquiry. These details help distinguish a suitable next step from a generic request for a price.",
      "suburb 或邮编、建筑高度、屋顶材料、通道限制以及与症状相关的天气，是悉尼屋顶维修咨询的核心背景。这些信息有助于确定合适的下一步，而不是停留在笼统询价。",
    ),
    decisionGuide: t(
      "Submit once the form explains what changed, where it is visible and what safe evidence is available. If a requested field is unknown, say so rather than guessing; unknown material or access details can be clarified during the next conversation.",
      "当表单已经说明发生了什么变化、问题在哪里可见以及有哪些安全证据时即可提交。如果某项信息未知，请直接说明而不是猜测；材料或通道信息可以在下一步沟通中确认。",
    ),
  },
  "what-to-check-around-roof-penetrations": {
    localContext: t(
      "Vents, pipes, skylights and other penetrations interrupt the roof surface and rely on adjoining flashings or seals to manage water. Photograph the whole feature and the roof plane around it so the connection can be understood in context.",
      "通风口、管道、天窗及其他穿透构件会打断连续屋面，并依赖相邻泛水或密封细节导水。请拍摄整个构件及周边屋面，以便在完整上下文中理解连接关系。",
    ),
    decisionGuide: t(
      "Use the flashing or leak path when staining, open edges or indoor symptoms are close to a penetration. Do not remove covers, lift flashings or apply temporary sealant before advice, because that can hide the original condition or redirect water.",
      "当穿透点附近出现污迹、翘边或室内症状时，可使用泛水或漏水服务路径。在获得建议前，不要拆卸盖板、掀起泛水或自行打胶，因为这可能遮盖原始状况或改变水流路径。",
    ),
  },
  "seasonal-roof-maintenance-observation-guide-sydney": {
    localContext: t(
      "A seasonal record is most useful when photos are taken from the same safe positions and linked to notable rain, wind or debris events. The goal is to notice change over time, not to declare the roof sound because no issue is visible from the ground.",
      "季节性记录在使用相同安全位置拍照，并关联明显降雨、强风或杂物事件时最有价值。目标是观察随时间发生的变化，而不是因为地面看不到问题就断言屋顶状况良好。",
    ),
    decisionGuide: t(
      "Move from routine observation to an enquiry when a new gap, displacement, overflow, repeated stain or fallen material appears. Keep the earlier image and date so the change can be described without inventing a cause.",
      "当出现新的缝隙、移位、溢水、反复水印或掉落材料时，应从日常观察转为咨询。请保留较早的照片和日期，以便说明变化而不臆测原因。",
    ),
  },
};
