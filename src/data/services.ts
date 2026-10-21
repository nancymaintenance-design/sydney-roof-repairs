import type { Locale } from "./content";

type LocalText = { en: string; zh: string };

export type RoofService = {
  id: string;
  evidenceProjectId: string;
  shortTitle: LocalText;
  title: LocalText;
  summary: LocalText;
  intro: LocalText;
  signs: { en: string[]; zh: string[] };
  assessment: LocalText;
  process: { en: string[]; zh: string[] };
  faq: { question: LocalText; answer: LocalText }[];
  image: string;
  imageAlt: LocalText;
};

export const services: RoofService[] = [
  {
    id: "roof-leak-repairs-sydney",
    evidenceProjectId: "valley-and-abutment-details",
    shortTitle: { en: "Roof leak repairs", zh: "屋顶漏水维修" },
    title: { en: "Roof Leak Repairs in Sydney", zh: "悉尼屋顶漏水维修" },
    summary: {
      en: "Trace likely water-entry points and plan a repair around the roof material and visible condition.",
      zh: "根据屋顶材料和可见状况排查可能的进水点，并规划相应维修。",
    },
    intro: {
      en: "A ceiling stain may not sit directly below the roof defect. Wind, roof pitch, underlay and flashing can move water before it appears indoors, so assessment starts with the symptom and the roof details you can safely provide.",
      zh: "室内水渍不一定正好位于屋顶缺陷下方。风向、坡度、隔水层和泛水都可能改变水流路径，因此评估会从症状和您能安全提供的屋顶信息开始。",
    },
    signs: {
      en: [
        "New ceiling stains after rain",
        "Damp roof-space timbers",
        "Cracked, displaced or missing roof material",
        "Water marks near penetrations or junctions",
        "Moisture appearing only during wind-driven rain",
      ],
      zh: [
        "下雨后出现新的天花水渍",
        "屋顶空间木结构受潮",
        "瓦片或板材开裂、移位或缺失",
        "穿透点或连接处附近出现水痕",
        "只在伴随强风的降雨中出现潮湿",
      ],
    },
    assessment: {
      en: "Useful details include when the leak appears, the rooms affected, roof material, property height and clear photos taken without climbing onto the roof.",
      zh: "有助评估的信息包括漏水出现的时间、受影响房间、屋顶材料、房屋高度，以及无需登上屋顶即可安全拍摄的清晰照片。",
    },
    process: {
      en: [
        "Review symptoms and property details",
        "Confirm service fit and safe access needs",
        "Assess likely entry points",
        "Explain an appropriate repair scope",
      ],
      zh: [
        "了解症状和房屋信息",
        "确认承接范围和安全通道需求",
        "评估可能的进水点",
        "说明合适的维修范围",
      ],
    },
    faq: [
      {
        question: { en: "Can a leak be diagnosed from a photo?", zh: "能否仅凭照片判断漏点？" },
        answer: {
          en: "Photos can help triage the issue, but a reliable repair scope may require inspection of the roof surface, junctions and the area below.",
          zh: "照片有助于初步判断，但可靠的维修范围可能仍需检查屋面、连接部位和下方区域。",
        },
      },
      {
        question: { en: "Should I climb onto the roof?", zh: "我应该自己上屋顶查看吗？" },
        answer: {
          en: "No. Share only observations and photos you can collect safely from the ground or inside the property.",
          zh: "不建议。请只提供能从地面或室内安全获得的观察和照片。",
        },
      },
      {
        question: {
          en: "What details help with a roof leak enquiry?",
          zh: "屋顶漏水咨询应提供哪些信息？",
        },
        answer: {
          en: "Share the suburb, roof material if known, where the moisture appears indoors, when it occurs and any photos taken safely from the ground or inside.",
          zh: "请提供所在 suburb、已知的屋顶材料、室内水迹位置、出现时间，以及从地面或室内安全拍摄的照片。",
        },
      },
      {
        question: {
          en: "Why can the indoor mark be away from the entry point?",
          zh: "为什么室内水印可能远离进水点？",
        },
        answer: {
          en: "Water can move along underlay, framing or adjoining roof components before it becomes visible, so both the inside symptom and roof junctions may need review.",
          zh: "雨水可能沿隔水层、结构或相邻屋面构件移动后才显现，因此室内症状和屋面连接处都可能需要检查。",
        },
      },
      {
        question: {
          en: "Can a repair price be confirmed before inspection?",
          zh: "检查前能否确认维修价格？",
        },
        answer: {
          en: "Usually not from a symptom alone. Access, roof material, the affected area and the confirmed repair method all influence scope and price.",
          zh: "通常不能仅凭症状确认。安全通道、屋顶材料、受影响范围及最终确认的维修方式都会影响范围和价格。",
        },
      },
    ],
    image: "",
    imageAlt: {
      en: "Open tile roof section documented during roof work",
      zh: "屋顶作业中记录的瓦屋顶开放部位",
    },
  },
  {
    id: "storm-damage-roof-repairs-sydney",
    evidenceProjectId: "tile-roof-surfaces",
    shortTitle: { en: "Storm damage repairs", zh: "风暴损坏维修" },
    title: { en: "Storm Damage Roof Repairs in Sydney", zh: "悉尼风暴损坏屋顶维修" },
    summary: {
      en: "Assess visible storm-related roof damage and prioritise a safe, practical repair plan.",
      zh: "评估风暴相关的可见屋顶损坏，并在确保安全的前提下制定维修计划。",
    },
    intro: {
      en: "Strong wind, rain and falling debris can affect tiles, sheet edges, flashings and penetrations. The first step is to record what changed and whether water is entering the building, without taking risks around a wet or damaged roof.",
      zh: "强风、暴雨和坠落物可能影响瓦片、金属板边缘、泛水和穿透点。第一步是安全记录变化以及是否有水进入建筑，切勿冒险接近潮湿或受损屋顶。",
    },
    signs: {
      en: [
        "Missing or displaced tiles",
        "Lifted sheet edges or loose components",
        "New indoor water entry",
        "Debris impact or damaged flashings",
        "A roofline component that changed position after the storm",
      ],
      zh: [
        "瓦片缺失或移位",
        "板材边缘翘起或构件松动",
        "室内新出现进水",
        "坠落物撞击或泛水受损",
        "风暴后屋面构件位置发生变化",
      ],
    },
    assessment: {
      en: "Share the storm date, visible changes, any indoor water entry and ground-level photos. Immediate danger, fallen powerlines or structural instability require the appropriate emergency service, not this form.",
      zh: "请提供风暴日期、可见变化、室内是否进水及地面安全拍摄的照片。如有直接危险、倒塌电线或结构不稳定，应联系相应紧急服务，而不是使用本表单。",
    },
    process: {
      en: [
        "Triage the reported damage",
        "Identify urgent safety boundaries",
        "Review roof material and affected areas",
        "Confirm repair or further assessment needs",
      ],
      zh: [
        "初步分级损坏情况",
        "明确紧急情况下的安全要求",
        "核对屋顶材料和受影响区域",
        "确认维修或进一步评估需求",
      ],
    },
    faq: [
      {
        question: { en: "Can you confirm insurance coverage?", zh: "你们能确认保险是否赔付吗？" },
        answer: {
          en: "No. Coverage and claim decisions belong to your insurer. Roof photos and inspection notes may help describe the physical condition but do not decide a claim.",
          zh: "不能。承保和理赔决定由您的保险公司作出。屋顶照片和检查记录可用于说明实际状况，但不能决定理赔结果。",
        },
      },
      {
        question: { en: "What if the roof is actively leaking?", zh: "如果屋顶正在漏水怎么办？" },
        answer: {
          en: "Keep away from unsafe areas, protect people first and call to discuss the situation. Availability and response timing must be confirmed at the time.",
          zh: "请远离不安全区域并优先保护人员，然后致电说明情况。可用性和响应时间需当时确认。",
        },
      },
      {
        question: { en: "What should I photograph after a storm?", zh: "风暴后应该拍摄哪些画面？" },
        answer: {
          en: "From a safe position, capture a wider roofline view, visible debris or displaced material and any new indoor water marks. Do not enter damaged areas or climb onto the roof.",
          zh: "请从安全位置拍摄屋面整体、可见杂物或移位材料，以及新出现的室内水迹；不要进入受损区域或攀爬屋顶。",
        },
      },
      {
        question: {
          en: "Does storm damage always appear immediately?",
          zh: "风暴损坏一定会马上显现吗？",
        },
        answer: {
          en: "Not always. Record the event date and any changes noticed during later rain so the timeline can be considered during assessment.",
          zh: "不一定。请记录风暴日期和后续降雨中出现的变化，便于评估时结合时间线判断。",
        },
      },
      {
        question: {
          en: "What situations need emergency assistance first?",
          zh: "哪些情况应先联系紧急服务？",
        },
        answer: {
          en: "Fallen powerlines, structural instability, fire or immediate danger to people require the relevant emergency service before a roof repair enquiry.",
          zh: "如有倒塌电线、结构不稳定、火灾或人员面临直接危险，应先联系相应紧急服务，再处理屋顶维修咨询。",
        },
      },
    ],
    image: "",
    imageAlt: { en: "Weathered tile and bedding detail", zh: "风化瓦片和垫层细节" },
  },
  {
    id: "tile-roof-repairs-sydney",
    evidenceProjectId: "tile-roof-surfaces",
    shortTitle: { en: "Tile roof repairs", zh: "瓦屋顶维修" },
    title: { en: "Tile Roof Repairs in Sydney", zh: "悉尼瓦屋顶维修" },
    summary: {
      en: "Repair planning for cracked, displaced or deteriorated tile roof components.",
      zh: "针对开裂、移位或老化的瓦屋顶构件制定维修方案。",
    },
    intro: {
      en: "Tile roof problems can involve individual tiles, bedding, pointing, valleys or the details where different roof sections meet. A useful scope separates the visible symptom from the component that is allowing water or movement.",
      zh: "瓦屋顶问题可能涉及单块瓦片、垫层、勾缝、天沟谷或不同屋面连接细节。合理的维修范围会区分可见症状和真正导致进水或松动的构件。",
    },
    signs: {
      en: [
        "Cracked or slipped tiles",
        "Loose ridge or hip tiles",
        "Deteriorated bedding or pointing",
        "Debris and gaps around valleys",
        "Uneven tile courses near an affected roof area",
      ],
      zh: [
        "瓦片开裂或滑移",
        "屋脊或斜脊瓦松动",
        "垫层或勾缝老化",
        "天沟谷有杂物或缝隙",
        "受影响部位附近瓦片排列不齐",
      ],
    },
    assessment: {
      en: "Photos of the overall roof plane and close details are useful when they can be taken safely. Matching material and the condition of adjoining tiles may affect the repair approach.",
      zh: "在安全拍摄的前提下，整体屋面和局部细节照片都有帮助。材料匹配以及相邻瓦片状况可能影响维修方法。",
    },
    process: {
      en: [
        "Identify the affected tile-roof component",
        "Check adjoining visible condition",
        "Plan material and access needs",
        "Confirm the repair scope before work",
      ],
      zh: [
        "识别受影响的瓦屋顶构件",
        "检查相邻可见状况",
        "规划材料和通道需求",
        "施工前确认维修范围",
      ],
    },
    faq: [
      {
        question: {
          en: "Does one broken tile always explain a leak?",
          zh: "一块破瓦一定就是漏水原因吗？",
        },
        answer: {
          en: "Not always. Water can also enter at flashings, valleys, penetrations or deteriorated bedding, so the surrounding details matter.",
          zh: "不一定。水也可能从泛水、天沟谷、穿透点或老化垫层进入，因此需要结合周边细节判断。",
        },
      },
      {
        question: { en: "Can old tiles be matched?", zh: "旧瓦能配到相同材料吗？" },
        answer: {
          en: "Material availability varies. The existing profile, colour and surrounding condition need to be checked before a match is promised.",
          zh: "材料供应情况各不相同。在承诺匹配前，需要检查现有瓦型、颜色和周边状况。",
        },
      },
      {
        question: { en: "What tile details should I record?", zh: "瓦屋顶应记录哪些细节？" },
        answer: {
          en: "Record cracked, slipped or missing tiles, the nearest ridge, valley or penetration and whether the issue is linked to rain or wind.",
          zh: "请记录开裂、移位或缺失的瓦片，最近的屋脊、天沟谷或穿透点，以及问题是否与降雨或强风有关。",
        },
      },
      {
        question: {
          en: "Is repointing included in every tile repair?",
          zh: "每次瓦屋顶维修都需要重新勾缝吗？",
        },
        answer: {
          en: "No. Repointing relates to ridge and hip details. The required work depends on which tiles, bedding, pointing or adjoining components are affected.",
          zh: "不是。重新勾缝主要涉及屋脊和斜脊细节，具体工作取决于受影响的是瓦片、垫层、勾缝还是相邻构件。",
        },
      },
      {
        question: {
          en: "Can only the visibly damaged tiles be replaced?",
          zh: "是否只需更换看起来损坏的瓦片？",
        },
        answer: {
          en: "Sometimes, but surrounding support, laps, valleys and water paths need to be considered before a local replacement is confirmed.",
          zh: "有时可以，但在确认局部更换前，还需要考虑周边支撑、搭接、天沟谷和可能的水流路径。",
        },
      },
    ],
    image: "",
    imageAlt: { en: "Wide view of a documented tile roof", zh: "真实记录的瓦屋顶整体画面" },
  },
  {
    id: "metal-roof-repairs-sydney",
    evidenceProjectId: "metal-roof-box-gutter-details",
    shortTitle: { en: "Metal roof repairs", zh: "金属屋顶维修" },
    title: { en: "Metal Roof Repairs in Sydney", zh: "悉尼金属屋顶维修" },
    summary: {
      en: "Assess sheet, flashing, gutter and junction issues on metal roofing systems.",
      zh: "评估金属屋顶板材、泛水、天沟和连接处问题。",
    },
    intro: {
      en: "Metal roof leaks may relate to sheet condition, fasteners, laps, penetrations, box gutters or the way flashings terminate. Repair planning should account for movement, drainage and compatible materials.",
      zh: "金属屋顶漏水可能与板材、紧固件、搭接、穿透点、箱式天沟或泛水收口有关。维修规划应考虑材料伸缩、排水和材料兼容性。",
    },
    signs: {
      en: [
        "Corrosion or open joints",
        "Loose or damaged flashings",
        "Water marks below box gutters",
        "Visible damage around penetrations",
        "Fasteners or sheet edges that appear raised",
      ],
      zh: [
        "腐蚀或接缝张开",
        "泛水松动或损坏",
        "箱式天沟下方有水痕",
        "穿透点周围可见损坏",
        "固定点或金属板边缘看起来翘起",
      ],
    },
    assessment: {
      en: "Share roof profile, building height, access constraints and photos of the wider junction as well as the close defect. This helps distinguish a local detail from a drainage issue.",
      zh: "请提供板型、建筑高度、通道限制，以及连接处整体和局部缺陷照片，以便区分局部细节与排水问题。",
    },
    process: {
      en: [
        "Review roof profile and symptom",
        "Assess drainage and junction context",
        "Check material compatibility needs",
        "Define a repair scope and next step",
      ],
      zh: [
        "核对屋顶板型和症状",
        "评估排水与连接环境",
        "检查材料兼容性需求",
        "确定维修范围和下一步",
      ],
    },
    faq: [
      {
        question: {
          en: "Can sealant alone fix a metal roof leak?",
          zh: "只打密封胶能修好金属屋顶漏水吗？",
        },
        answer: {
          en: "It depends on the defect. Sealant may be part of a detail, but movement, drainage or damaged metal can require a different repair.",
          zh: "取决于缺陷。密封胶可能是某个细节的一部分，但材料伸缩、排水或金属损坏可能需要其他维修方式。",
        },
      },
      {
        question: { en: "Do you need the roof profile?", zh: "需要知道屋顶板型吗？" },
        answer: {
          en: "Yes, where known. A wider photo can also help identify the sheet and adjoining flashing arrangement.",
          zh: "如已知，请提供。整体照片也有助于识别板材和相邻泛水结构。",
        },
      },
      {
        question: {
          en: "What usually affects a metal roof repair scope?",
          zh: "哪些因素会影响金属屋顶维修范围？",
        },
        answer: {
          en: "Sheet condition, fasteners, laps, penetrations, flashings, drainage and access can all change the appropriate repair method.",
          zh: "板材状况、紧固件、搭接、穿透点、泛水、排水和安全通道都可能影响合适的维修方式。",
        },
      },
      {
        question: {
          en: "Can rust seen in a photo confirm replacement is needed?",
          zh: "照片中看到锈蚀就能确认需要更换吗？",
        },
        answer: {
          en: "No. A photo records visible corrosion, but material thickness, spread, surrounding fixings and the water path still need assessment.",
          zh: "不能。照片只能记录可见锈蚀，材料厚度、扩散范围、周边固定件和水流路径仍需评估。",
        },
      },
      {
        question: { en: "Why do adjoining flashings matter?", zh: "为什么相邻泛水也很重要？" },
        answer: {
          en: "Metal sheets work as part of a drainage system. Wall, ridge, penetration and gutter flashings can influence where water is directed and where movement occurs.",
          zh: "金属板材属于整体排水系统的一部分；墙体、屋脊、穿透点和天沟泛水都会影响水流方向及材料伸缩位置。",
        },
      },
    ],
    image: "/media/commercial-roof-overview.webp",
    imageAlt: { en: "Documented metal roof and flashing work", zh: "真实记录的金属屋顶和泛水作业" },
  },
  {
    id: "flashing-valley-repairs-sydney",
    evidenceProjectId: "valley-and-abutment-details",
    shortTitle: { en: "Flashing & valley repairs", zh: "泛水与天沟谷维修" },
    title: { en: "Flashing and Valley Repairs in Sydney", zh: "悉尼泛水与天沟谷维修" },
    summary: {
      en: "Review vulnerable roof junctions where water is collected, redirected or sealed out.",
      zh: "检查屋面汇水、导水和防水的关键连接部位。",
    },
    intro: {
      en: "Flashings and valleys manage water at changes in direction, walls, penetrations and roof intersections. Small gaps, blocked flow paths or deteriorated adjacent material can create leaks away from the visible defect.",
      zh: "泛水和天沟谷负责处理转角、墙体、穿透点和屋面交汇处的雨水。小缝隙、排水受阻或相邻材料老化，都可能在远离可见缺陷的位置造成漏水。",
    },
    signs: {
      en: [
        "Water marks near roof junctions",
        "Open or lifted flashing edges",
        "Debris in a valley",
        "Cracked seal or deteriorated adjacent mortar",
        "Staining where a roof surface meets a wall or penetration",
      ],
      zh: [
        "屋面连接处附近有水痕",
        "泛水边缘张开或翘起",
        "天沟谷积有杂物",
        "密封开裂或相邻砂浆老化",
        "屋面与墙体或穿透点连接处出现污痕",
      ],
    },
    assessment: {
      en: "A wider photo showing how the junction drains is often as important as a close-up. The adjoining tile, sheet, wall or penetration must be considered together.",
      zh: "能显示连接处排水方式的整体照片通常与局部特写同样重要，需要综合考虑相邻瓦片、板材、墙体或穿透点。",
    },
    process: {
      en: [
        "Locate the junction linked to the symptom",
        "Review drainage path and adjacent material",
        "Identify compatible repair details",
        "Confirm scope and access",
      ],
      zh: [
        "定位与症状相关的连接处",
        "检查排水路径和相邻材料",
        "确定兼容的修复细节",
        "确认范围和通道",
      ],
    },
    faq: [
      {
        question: { en: "What is roof flashing?", zh: "什么是屋顶泛水？" },
        answer: {
          en: "Flashing is shaped material used to direct water away from roof junctions, walls and penetrations.",
          zh: "泛水是用于把雨水从屋面连接处、墙体和穿透点导开的成型材料。",
        },
      },
      {
        question: { en: "Why does valley context matter?", zh: "为什么要看天沟谷整体环境？" },
        answer: {
          en: "A valley carries concentrated water. Debris, adjoining tiles, underlay and the outlet path can all affect performance.",
          zh: "天沟谷会集中排水，杂物、相邻瓦片、隔水层和出口路径都会影响其工作状态。",
        },
      },
      {
        question: {
          en: "What signs should I report around a flashing?",
          zh: "泛水附近应报告哪些可见信号？",
        },
        answer: {
          en: "Note open edges, movement, staining, debris, failed sealant or water marks near the wall, penetration or ceiling area below.",
          zh: "请记录翘起边缘、移位、污迹、杂物、老化密封材料，以及墙体、穿透点或下方天花板附近的水痕。",
        },
      },
      {
        question: {
          en: "Can a blocked valley cause water to appear elsewhere?",
          zh: "天沟谷堵塞会让水在其他位置显现吗？",
        },
        answer: {
          en: "It can change the flow path, but the actual cause and entry point should not be assumed from one observation alone.",
          zh: "堵塞可能改变水流路径，但不能仅凭一次观察就确定实际原因和进水点。",
        },
      },
      {
        question: {
          en: "Does every flashing repair require replacement?",
          zh: "所有泛水维修都需要整体更换吗？",
        },
        answer: {
          en: "No. The material condition, termination, adjoining roof surface and drainage path determine whether local work or replacement is appropriate.",
          zh: "不一定。材料状况、收口方式、相邻屋面和排水路径会决定适合局部处理还是更换。",
        },
      },
    ],
    image: "",
    imageAlt: {
      en: "Close view of documented valley flashing work",
      zh: "真实记录的天沟谷泛水作业细节",
    },
  },
  {
    id: "ridge-capping-repointing-sydney",
    evidenceProjectId: "ridge-and-open-sections",
    shortTitle: { en: "Ridge capping & repointing", zh: "屋脊瓦与重新勾缝" },
    title: { en: "Ridge Capping and Repointing in Sydney", zh: "悉尼屋脊瓦与重新勾缝" },
    summary: {
      en: "Assess loose ridge tiles, weathered bedding and deteriorated pointing on tiled roofs.",
      zh: "评估瓦屋顶松动的屋脊瓦、风化垫层和老化勾缝。",
    },
    intro: {
      en: "Ridge and hip tiles sit over roof junctions. Cracked pointing or deteriorated bedding can allow movement and expose the junction below, but the condition of the tiles and surrounding roof also affects the appropriate repair.",
      zh: "屋脊瓦和斜脊瓦覆盖屋面连接处。勾缝开裂或垫层老化可能导致松动并暴露下方连接处，但合适的维修方式还取决于瓦片和周边屋面的状况。",
    },
    signs: {
      en: [
        "Cracked or missing pointing",
        "Loose ridge or hip tiles",
        "Visible bedding deterioration",
        "Fragments found in gutters or below the roof edge",
        "A visible change in the continuity of the ridge line",
      ],
      zh: [
        "勾缝开裂或缺失",
        "屋脊瓦或斜脊瓦松动",
        "垫层可见老化",
        "天沟或屋檐下发现碎片",
        "屋脊线连续性出现明显变化",
      ],
    },
    assessment: {
      en: "Clear ground-level zoom photos can help show continuity along the ridge. Safe access, tile condition and the extent of bedding deterioration need confirmation before scope.",
      zh: "从地面安全拍摄的清晰变焦照片有助于观察屋脊连续状况。确定范围前还需确认安全通道、瓦片状况和垫层老化程度。",
    },
    process: {
      en: [
        "Review ridge or hip condition",
        "Check adjacent tiles and visible bedding",
        "Confirm access and material needs",
        "Explain the suitable repair approach",
      ],
      zh: [
        "检查屋脊或斜脊状况",
        "核对相邻瓦片和可见垫层",
        "确认通道和材料需求",
        "说明合适的维修方法",
      ],
    },
    faq: [
      {
        question: {
          en: "Is repointing the same as replacing ridge tiles?",
          zh: "重新勾缝等同于更换屋脊瓦吗？",
        },
        answer: {
          en: "No. Repointing addresses the pointing layer. Damaged tiles or bedding may require additional work after assessment.",
          zh: "不是。重新勾缝处理的是勾缝层；如瓦片或垫层损坏，评估后可能需要额外工作。",
        },
      },
      {
        question: {
          en: "Can all visible cracking be patched?",
          zh: "所有可见裂缝都能直接修补吗？",
        },
        answer: {
          en: "Not necessarily. The cause, movement and condition beneath the visible surface determine whether a local patch is appropriate.",
          zh: "不一定。是否适合局部修补取决于裂缝原因、结构活动和可见表层下方的状况。",
        },
      },
      {
        question: {
          en: "What is the difference between bedding and pointing?",
          zh: "垫层和勾缝有什么区别？",
        },
        answer: {
          en: "Bedding supports the ridge or hip tile, while pointing forms the exposed finishing layer that helps secure and weather the joint.",
          zh: "垫层用于支撑屋脊瓦或斜脊瓦，勾缝则是外露的表面层，用于固定并保护连接处。",
        },
      },
      {
        question: {
          en: "What should I include in a ridge capping enquiry?",
          zh: "屋脊瓦咨询应提供哪些信息？",
        },
        answer: {
          en: "Include the roof material, where cracking or movement is visible, whether any pieces have fallen and a wider photo showing the affected ridge line.",
          zh: "请提供屋顶材料、可见开裂或移位的位置、是否有碎块掉落，以及展示受影响屋脊线的整体照片。",
        },
      },
      {
        question: {
          en: "Can ridge work be scoped from ground-level photos?",
          zh: "能否仅凭地面照片确定屋脊维修范围？",
        },
        answer: {
          en: "Ground-level photos can help locate the issue, but tile stability, bedding and nearby roof condition may require closer assessment.",
          zh: "地面照片有助于定位问题，但瓦片稳定性、垫层和附近屋面状况可能仍需进一步检查。",
        },
      },
    ],
    image: "",
    imageAlt: {
      en: "Ridge capping and pointing detail documented during roof work",
      zh: "屋顶作业中记录的屋脊瓦和勾缝细节",
    },
  },
];

export const serviceBySlug = (slug: string) => services.find((service) => service.id === slug);
export const serviceText = (value: LocalText, locale: Locale) => value[locale];
export const servicePath = (service: RoofService, locale: Locale = "en") =>
  `${locale === "zh" ? "/zh-hans" : ""}/services/${service.id}`;
export const evidencePath = (service: RoofService, locale: Locale = "en") =>
  `${locale === "zh" ? "/zh-hans" : ""}/projects#${service.evidenceProjectId}`;
export const contactPath = (service: RoofService, locale: Locale = "en") =>
  `${locale === "zh" ? "/zh-hans" : ""}/contact?service=${encodeURIComponent(service.id)}`;
