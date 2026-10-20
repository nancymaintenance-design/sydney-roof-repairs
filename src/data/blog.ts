import type { Locale } from "./content";
import type { FaqItem, LocalizedText } from "./faqs";

export type BlogSection = {
  heading: LocalizedText;
  paragraphs: LocalizedText[];
  checklist?: LocalizedText[];
};

export type BlogPost = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: LocalizedText;
  published: string;
  readingMinutes: number;
  image: string;
  imageAlt: LocalizedText;
  relatedServiceIds: string[];
  sections: BlogSection[];
  faq: FaqItem[];
};

const t = (en: string, zh: string): LocalizedText => ({ en, zh });

export const blogText = (value: LocalizedText, locale: Locale) => value[locale];

const sharedSafetyFaq: FaqItem = {
  question: t("Should I climb onto the roof to check the issue?", "我应该爬上屋顶检查问题吗？"),
  answer: t(
    "No. Record only what you can see from a safe location. Roof access and inspection should be discussed as part of the next-step assessment.",
    "不要。只记录您能从安全位置看到的情况；屋顶通道和检查应在下一步评估中沟通确认。",
  ),
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-to-do-when-you-notice-a-roof-leak-sydney",
    title: t("What to Do When You Notice a Roof Leak in Sydney", "在悉尼发现屋顶漏水后应该怎么做"),
    summary: t(
      "A practical first-response guide for recording the visible symptom, reducing indoor exposure and preparing a useful roof repair enquiry.",
      "一份实用的初步处理指南：记录可见症状、减少室内受影响范围，并准备有效的屋顶维修咨询。",
    ),
    category: t("Roof leaks", "屋顶漏水"),
    published: "2026-09-18",
    readingMinutes: 8,
    image: "/media/tile-repair-open-section.jpg",
    imageAlt: t("Open section of a tiled roof", "瓦屋顶开放部位细节"),
    relatedServiceIds: ["roof-leak-repairs-sydney", "tile-roof-repairs-sydney"],
    sections: [
      {
        heading: t("Start with the indoor symptom", "先从室内症状开始记录"),
        paragraphs: [
          t(
            "A ceiling mark, drip or damp smell tells you where the effect is visible, but it does not necessarily identify where water entered the roof. Note the room, the time, the intensity of rain and whether the mark changes during or after the weather event.",
            "天花板水印、滴水或潮湿气味只能说明影响在哪里可见，并不一定代表雨水从对应屋面位置进入。请记录房间、出现时间、降雨强度，以及水印是在降雨期间还是之后发生变化。",
          ),
          t(
            "Keep people and electrical items away from the affected area. If water is near electrical fittings, treat that as a separate safety concern and seek appropriate urgent assistance.",
            "让人员和电器远离受影响区域。如果水接近电气装置，应将其视为独立的安全风险并寻求适当的紧急协助。",
          ),
        ],
        checklist: [
          t("Room and exact ceiling or wall location", "房间及天花板或墙面的准确位置"),
          t("When the symptom started and whether rain was present", "症状开始时间及当时是否下雨"),
          t(
            "Safe photos showing both a wider view and the mark",
            "从安全位置拍摄整体画面和水印细节",
          ),
        ],
      },
      {
        heading: t("Avoid turning one clue into a diagnosis", "不要把单一线索当成诊断"),
        paragraphs: [
          t(
            "Water can travel along framing, underlay or adjoining components before it becomes visible inside. Tiles, penetrations, flashings, valleys and gutters can all be relevant, so a repair path should follow the evidence available for the property.",
            "雨水可能沿结构、垫层或相邻构件移动后才在室内显现。瓦片、穿透点、泛水、天沟谷和排水构件都可能相关，因此维修路径应以该房屋可获得的证据为依据。",
          ),
        ],
      },
      {
        heading: t("Prepare the first enquiry", "准备首次咨询"),
        paragraphs: [
          t(
            "Send the suburb or postcode, property height, roof material if known, visible indoor symptom and any safe exterior photos. This gives the service provider enough context to confirm fit and explain what needs to happen next without promising a scope from a single image.",
            "请提供 suburb 或邮编、房屋高度、已知的屋顶材料、室内可见症状及可安全拍摄的外部照片。这些信息有助于确认是否适合承接并说明下一步，而不是仅凭一张图片承诺维修范围。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t("Does the stain show where the roof is leaking?", "水印位置就是屋顶漏点吗？"),
        answer: t(
          "Not necessarily. It shows where moisture became visible indoors; the entry point may be elsewhere and needs confirmation.",
          "不一定。水印只说明水分在室内显现的位置，实际进入点可能在其他部位，仍需确认。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "roof-photos-that-help-explain-a-repair-enquiry",
    title: t("Roof Photos That Help Explain a Repair Enquiry", "哪些屋顶照片更有助于说明维修咨询"),
    summary: t(
      "How to create a useful set of safe, contextual photos without climbing onto the roof or assuming the cause.",
      "如何在不攀爬屋顶、不自行判断原因的前提下，准备一组安全且有上下文的照片。",
    ),
    category: t("Enquiry planning", "咨询准备"),
    published: "2026-09-18",
    readingMinutes: 7,
    image: "/media/tile-roof-finished-detail.jpg",
    imageAlt: t("Tiled roof surface and adjoining roof details", "瓦屋面及相邻构件细节"),
    relatedServiceIds: ["roof-leak-repairs-sydney"],
    sections: [
      {
        heading: t("Use a three-view sequence", "使用三种画面顺序"),
        paragraphs: [
          t(
            "A useful photo set starts wide, moves to the visible issue and finishes with nearby components. The wide view provides orientation; the closer view records the symptom; the context view shows how that area meets a ridge, valley, wall, gutter or roof penetration.",
            "一组有帮助的照片应从整体画面开始，再到可见问题，最后补充附近构件。整体画面提供方位，近景记录症状，上下文画面展示该部位如何与屋脊、天沟谷、墙体、排水沟或屋面穿透点相接。",
          ),
        ],
        checklist: [
          t(
            "One wide property or roofline view from ground level",
            "一张从地面拍摄的房屋或屋面线条整体图",
          ),
          t("One clear image of the visible symptom", "一张清晰的可见问题照片"),
          t("One view showing the nearest joint or component", "一张展示最近接缝或构件的画面"),
        ],
      },
      {
        heading: t("Add labels in your message", "在消息中补充位置说明"),
        paragraphs: [
          t(
            "Brief labels such as ‘rear bedroom ceiling’, ‘north side after heavy rain’ or ‘near the box gutter’ can be more useful than a close-up with no location. Include when the image was taken and whether the condition changes with weather.",
            "诸如“后侧卧室天花板”“大雨后北侧”“靠近箱式天沟”等简短标签，通常比没有位置背景的近景更有用。请注明拍摄时间以及状况是否随天气变化。",
          ),
        ],
      },
      {
        heading: t("Know what a photo cannot confirm", "了解照片无法确认的内容"),
        paragraphs: [
          t(
            "Photos can support triage and planning, but they do not establish hidden moisture paths, substrate condition, safe access or the final repair method. Those limits should remain explicit in any online enquiry.",
            "照片可以辅助初步分流和计划，但无法确认隐藏水路、基层状况、安全通道或最终维修方法。在线咨询中应明确保留这些限制。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t("Is a close-up enough?", "只拍近景够吗？"),
        answer: t(
          "Usually not. A wider view and nearby components provide the location context needed to understand the close-up.",
          "通常不够。整体画面和附近构件能提供理解近景所需的位置背景。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "tile-roof-or-metal-roof-repair-information-to-prepare",
    title: t(
      "Tile Roof or Metal Roof Repair: Information to Prepare",
      "瓦屋顶或金属屋顶维修：咨询前应准备的信息",
    ),
    summary: t(
      "The material, profile and adjoining components change the questions that need to be answered before a repair scope is discussed.",
      "屋顶材料、板型及相邻构件会影响维修范围沟通前需要回答的问题。",
    ),
    category: t("Roof materials", "屋顶材料"),
    published: "2026-09-18",
    readingMinutes: 8,
    image: "/media/metal-roof-repair-overview.jpg",
    imageAlt: t("Residential metal roof overview", "住宅金属屋顶整体画面"),
    relatedServiceIds: ["tile-roof-repairs-sydney", "metal-roof-repairs-sydney"],
    sections: [
      {
        heading: t("Identify the material without guessing the fault", "识别材料，但不要猜测故障"),
        paragraphs: [
          t(
            "For tile roofs, visible clues may include displaced or damaged tiles, ridge areas and valleys. For metal roofs, useful context can include the sheet profile, laps, fixings, flashings and box gutters. The material helps route the enquiry but does not diagnose the cause.",
            "瓦屋顶的可见线索可能包括移位或破损瓦片、屋脊和天沟谷；金属屋顶则可记录板型、搭接、固定件、泛水和箱式天沟。材料有助于分流咨询，但不能用来诊断原因。",
          ),
        ],
      },
      {
        heading: t("Record where materials meet", "记录材料相接的位置"),
        paragraphs: [
          t(
            "Many enquiries involve junctions rather than an isolated field of roof material. Note walls, chimneys, skylights, valleys, ridge lines and changes in roof pitch that are close to the visible symptom.",
            "许多咨询涉及构件交接处，而不是单独一片屋面材料。请记录靠近可见症状的墙体、烟囱、天窗、天沟谷、屋脊线以及坡度变化位置。",
          ),
        ],
        checklist: [
          t("Roof material and colour if known", "已知的屋顶材料和颜色"),
          t("Approximate location on the property", "问题在房屋上的大致位置"),
          t("Nearby penetrations, walls, valleys or gutters", "附近的穿透点、墙体、天沟谷或排水沟"),
        ],
      },
      {
        heading: t("Explain access and height", "说明通道和高度"),
        paragraphs: [
          t(
            "Property height, roof pitch and access constraints can influence how an assessment is planned. Include these details early so service fit and the next step can be discussed on realistic information.",
            "房屋高度、屋面坡度和通道限制都会影响评估安排。应尽早提供这些信息，以便根据实际情况确认是否适合承接及下一步。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t(
          "Do tile and metal roofs use the same repair method?",
          "瓦屋顶和金属屋顶使用相同维修方法吗？",
        ),
        answer: t(
          "No general method should be assumed. The material, defect, adjoining components and access all need to be confirmed.",
          "不能假设使用通用方法。材料、缺陷、相邻构件和通道都需要确认。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "storm-damage-roof-check-from-ground-level",
    title: t("A Ground-Level Roof Check After a Sydney Storm", "悉尼风暴后如何从地面安全查看屋顶"),
    summary: t(
      "A safe observation checklist for weather-related roof enquiries, focused on visible change rather than unsupported conclusions.",
      "一份面向天气相关屋顶咨询的安全观察清单，重点记录可见变化，不做无依据结论。",
    ),
    category: t("Storm and weather", "风暴与天气"),
    published: "2026-09-18",
    readingMinutes: 8,
    image: "/media/tile-roof-before.jpg",
    imageAlt: t("Tiled roof viewed from a safe exterior position", "从安全外部位置看到的瓦屋顶"),
    relatedServiceIds: ["storm-damage-roof-repairs-sydney", "roof-leak-repairs-sydney"],
    sections: [
      {
        heading: t("Wait until the immediate hazard has passed", "先等待即时危险过去"),
        paragraphs: [
          t(
            "Do not inspect during high winds, lightning or unsafe rain conditions. Keep clear of fallen power lines, unstable trees, loose materials and wet access areas. Emergency and electrical hazards need the appropriate emergency response before a repair enquiry.",
            "不要在大风、雷电或危险降雨条件下检查。远离倒下的电线、不稳定树木、松动材料和湿滑通道。紧急情况和电气风险应先由相应应急服务处理，再进行维修咨询。",
          ),
        ],
      },
      {
        heading: t("Compare visible changes", "对比可见变化"),
        paragraphs: [
          t(
            "From a safe location, look for obvious changes such as displaced materials, debris impact, altered ridge lines, lifted metal edges or new indoor marks. Record what changed and when rather than naming a repair method.",
            "从安全位置查看明显变化，例如材料移位、杂物撞击、屋脊线变化、金属边缘翘起或新的室内水印。记录变化内容和时间，不要直接指定维修方法。",
          ),
        ],
        checklist: [
          t("Date and approximate time of the storm", "风暴日期和大致时间"),
          t("New indoor and exterior symptoms", "新出现的室内和外部症状"),
          t("Property access or debris constraints", "房屋通道或杂物限制"),
        ],
      },
      {
        heading: t("Separate urgent safety from repair planning", "区分紧急安全与维修计划"),
        paragraphs: [
          t(
            "A roof repair enquiry can organise the assessment path, but it is not an emergency-response substitute. Clearly state if water is near electrical fittings, material is falling or an occupied area cannot be kept safe.",
            "屋顶维修咨询可以帮助安排评估路径，但不能替代紧急响应。如果水接近电气装置、有材料掉落或有人使用的区域无法保持安全，应明确说明。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t(
          "Does visible storm damage confirm the full scope?",
          "看到风暴损坏就能确认完整范围吗？",
        ),
        answer: t(
          "No. Visible change helps describe the enquiry, while hidden damage, safe access and the repair method still need confirmation.",
          "不能。可见变化有助于描述咨询，但隐藏损坏、安全通道和维修方法仍需确认。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "flashing-and-roof-valley-leaks-visible-signs",
    title: t(
      "Flashing and Roof Valley Leaks: Visible Signs to Report",
      "泛水与天沟谷漏水：咨询时应报告的可见信号",
    ),
    summary: t(
      "How to describe roof junctions, valleys and nearby moisture symptoms without claiming an unverified source.",
      "如何描述屋面交接、天沟谷和附近潮湿症状，同时避免声称未经确认的水源。",
    ),
    category: t("Roof leaks", "屋顶漏水"),
    published: "2026-09-18",
    readingMinutes: 8,
    image: "/media/valley-flashing-repair-01.jpg",
    imageAlt: t("Visible valley flashing and adjoining tiled roof", "可见天沟谷泛水及相邻瓦屋面"),
    relatedServiceIds: ["flashing-valley-repairs-sydney", "roof-leak-repairs-sydney"],
    sections: [
      {
        heading: t("Describe the junction", "描述交接部位"),
        paragraphs: [
          t(
            "Flashings and valleys manage water where roof planes or materials meet. Useful enquiry details include the type of junction, nearby wall or penetration, visible debris, movement or open edges and the indoor location below that area.",
            "泛水和天沟谷负责处理屋面或材料交接处的水流。咨询时可说明交接类型、附近墙体或穿透点、可见杂物、位移或开口边缘，以及该部位下方对应的室内位置。",
          ),
        ],
      },
      {
        heading: t("Record weather behaviour", "记录与天气的关系"),
        paragraphs: [
          t(
            "Note whether the symptom follows steady rain, wind-driven rain or a short heavy event, and whether it appears immediately or later. This pattern is useful context, but it remains one part of an assessment rather than proof of the source.",
            "请记录症状是在持续降雨、风吹雨还是短时强降雨后出现，以及是立即发生还是延后发生。这种规律是有用背景，但仍只是评估的一部分，不能直接证明水源。",
          ),
        ],
        checklist: [
          t("Junction type and nearby component", "交接类型及附近构件"),
          t("Weather conditions when the symptom appears", "症状出现时的天气条件"),
          t("Indoor location relative to the roof area", "室内位置与该屋面部位的相对关系"),
        ],
      },
      {
        heading: t("Keep drainage paths clear in the enquiry", "在咨询中说明排水路径"),
        paragraphs: [
          t(
            "If leaves or debris are visible from ground level, mention them, but do not enter the roof to clear them. The condition of the valley, flashing edges, substrate and adjoining materials may all affect the appropriate next step.",
            "如果从地面能看到树叶或杂物，请在咨询中说明，但不要上屋顶清理。天沟谷、泛水边缘、基层和相邻材料的状况都可能影响合适的下一步。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t(
          "Can a blocked valley be confirmed from the ground?",
          "从地面可以确认天沟谷堵塞吗？",
        ),
        answer: t(
          "You may be able to report visible debris, but the drainage condition and any connected defect still need a safe assessment.",
          "您可以报告可见杂物，但排水状况及相关缺陷仍需要安全评估。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "ridge-capping-and-repointing-what-to-report",
    title: t(
      "Ridge Capping and Repointing: What Changes to Report",
      "屋脊封顶与重新勾缝：哪些变化值得记录",
    ),
    summary: t(
      "A visual guide to describing ridge-line changes while keeping material condition and repair decisions separate.",
      "一份描述屋脊线变化的观察指南，同时区分材料状况与维修决定。",
    ),
    category: t("Tile roofs", "瓦屋顶"),
    published: "2026-09-18",
    readingMinutes: 7,
    image: "/media/ridge-capping-repair-detail.jpg",
    imageAlt: t("Ridge capping and pointing detail", "屋脊封顶及勾缝细节"),
    relatedServiceIds: ["ridge-capping-repointing-sydney", "tile-roof-repairs-sydney"],
    sections: [
      {
        heading: t("Look at the roofline as a whole", "先观察整体屋脊线"),
        paragraphs: [
          t(
            "A wider ground-level view can show whether a ridge line appears even and whether individual caps look displaced. Closer images, when safely available, may show visible joints or changes in pointing material.",
            "从地面拍摄的整体画面可以展示屋脊线是否平顺，以及个别脊瓦是否看起来移位。在安全可得的情况下，近景可以记录接缝或勾缝材料的可见变化。",
          ),
        ],
      },
      {
        heading: t("Separate appearance from condition", "区分外观与实际状况"),
        paragraphs: [
          t(
            "Colour variation or a line visible in a photo does not establish whether material has failed. Report movement, missing sections, recent debris or an associated indoor symptom, and leave material testing and scope decisions to the assessment.",
            "照片中的颜色差异或线条并不能证明材料已经失效。请报告位移、缺失部位、新出现的碎屑或相关室内症状，并把材料检查和范围决定留给评估。",
          ),
        ],
        checklist: [
          t("Wide view of the ridge line", "屋脊线整体画面"),
          t("Visible change and when it was noticed", "可见变化及发现时间"),
          t("Any related ceiling mark or debris", "相关天花板水印或碎屑"),
        ],
      },
      {
        heading: t("Explain nearby roof features", "说明附近屋面特征"),
        paragraphs: [
          t(
            "Hips, valleys, penetrations and changes in roof level near the ridge can be relevant to planning an inspection. A labelled photo set helps preserve this context.",
            "靠近屋脊的斜脊、天沟谷、穿透点和屋面高度变化都可能与检查计划有关。一组带位置说明的照片有助于保留这些背景。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t(
          "Does a visible crack always require repointing?",
          "看到裂纹就一定需要重新勾缝吗？",
        ),
        answer: t(
          "A photo alone should not decide the method. The material, movement, extent and adjoining roof condition need confirmation.",
          "不能只凭照片决定方法。材料、位移、范围和相邻屋面状况都需要确认。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "box-gutters-on-metal-roofs-enquiry-checklist",
    title: t("Box Gutters on Metal Roofs: An Enquiry Checklist", "金属屋顶箱式天沟：咨询信息清单"),
    summary: t(
      "The location, overflow path, adjoining sheets and timing of moisture all help frame a box-gutter enquiry.",
      "箱式天沟的位置、溢流路径、相邻屋面板以及潮湿出现时间，都有助于组织咨询。",
    ),
    category: t("Metal roofs", "金属屋顶"),
    published: "2026-09-18",
    readingMinutes: 8,
    image: "/media/metal-box-gutter-overview.jpg",
    imageAlt: t("Metal roof and box gutter overview", "金属屋顶与箱式天沟整体画面"),
    relatedServiceIds: ["metal-roof-repairs-sydney", "flashing-valley-repairs-sydney"],
    sections: [
      {
        heading: t("Map the gutter to the building", "说明天沟在建筑中的位置"),
        paragraphs: [
          t(
            "Box gutters may sit between roof planes or behind parapets, so an exterior image without orientation can be difficult to interpret. Note the building side, nearby wall, downpipe or outlet and the occupied area below.",
            "箱式天沟可能位于两个屋面之间或女儿墙后方，因此没有方位的外部照片很难理解。请说明建筑侧面、附近墙体、落水管或出水口，以及下方有人使用的区域。",
          ),
        ],
      },
      {
        heading: t("Describe the water event", "描述进水事件"),
        paragraphs: [
          t(
            "Record whether moisture appears only in intense rain, continues after rain or follows a particular wind direction. Include any safe observation of overflow, staining or debris without treating it as the confirmed cause.",
            "记录潮湿是只在强降雨中出现、雨后持续，还是与特定风向有关。可以说明从安全位置看到的溢流、水迹或杂物，但不要把它当成已确认原因。",
          ),
        ],
        checklist: [
          t("Building side and area below the gutter", "天沟所在建筑侧面及下方区域"),
          t("Nearby outlet, downpipe or roof-sheet junction", "附近出水口、落水管或屋面板交接"),
          t("Rain intensity and symptom timing", "降雨强度和症状出现时间"),
        ],
      },
      {
        heading: t("Allow for access and concealed conditions", "预留通道与隐藏状况判断"),
        paragraphs: [
          t(
            "The gutter profile, falls, outlets, substrate and adjoining flashings may not be visible online. Property height and access information are therefore important before an assessment path or price can be discussed.",
            "天沟形状、坡度、出水口、基层和相邻泛水可能无法在线查看。因此，在讨论评估路径或价格前，房屋高度和通道信息很重要。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t("Can overflow be diagnosed from one video?", "一段视频能诊断溢流原因吗？"),
        answer: t(
          "A video can record behaviour during rain, but dimensions, falls, outlets and concealed conditions still need confirmation.",
          "视频可以记录降雨时的表现，但尺寸、坡度、出水口和隐藏状况仍需确认。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "why-roof-repair-quotes-need-access-and-scope",
    title: t(
      "Why Roof Repair Quotes Need Access and Scope Details",
      "为什么屋顶维修报价需要通道和范围信息",
    ),
    summary: t(
      "A transparent explanation of why a keyword, room stain or single image cannot support a reliable repair price.",
      "清楚说明为什么一个关键词、室内水印或单张照片无法支持可靠的维修价格。",
    ),
    category: t("Enquiry planning", "咨询准备"),
    published: "2026-09-18",
    readingMinutes: 7,
    image: "/media/metal-roof-flashing-detail.jpg",
    imageAlt: t("Metal roof flashing and adjoining surface detail", "金属屋顶泛水及相邻表面细节"),
    relatedServiceIds: ["roof-leak-repairs-sydney", "metal-roof-repairs-sydney"],
    sections: [
      {
        heading: t("A symptom is not a measured scope", "症状不等于已测量的范围"),
        paragraphs: [
          t(
            "‘Roof leak’ describes a customer problem, not the size, cause or method of repair. A useful quote needs an agreed understanding of the affected components, work extent and what is excluded.",
            "“屋顶漏水”描述的是客户问题，并不说明维修的大小、原因或方法。有效报价需要对受影响构件、工作范围和不包含事项形成一致理解。",
          ),
        ],
      },
      {
        heading: t("Access changes the work plan", "通道会改变工作计划"),
        paragraphs: [
          t(
            "Height, pitch, boundaries, nearby structures and safe equipment placement can affect how the roof is assessed and worked on. That information should be gathered before price is treated as comparable.",
            "高度、坡度、边界、附近建筑和安全设备放置条件都会影响屋顶如何检查与施工。在比较价格前，应先收集这些信息。",
          ),
        ],
        checklist: [
          t("Property height and roof pitch if known", "已知的房屋高度和屋面坡度"),
          t("Driveway, side access and boundary constraints", "车道、侧面通道和边界限制"),
          t("Visible component and approximate affected area", "可见构件及大致受影响范围"),
        ],
      },
      {
        heading: t("Compare like with like", "在相同范围下比较"),
        paragraphs: [
          t(
            "Before comparing options, check that each proposed scope addresses the same roof area, material, preparation, access and exclusions. A lower number attached to a different scope is not a direct comparison.",
            "比较方案前，应确认各自针对相同屋顶部位、材料、准备工作、通道和排除项。若范围不同，较低数字也不是直接可比的报价。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t("Can I get a firm price from photos?", "可以只凭照片获得确定价格吗？"),
        answer: t(
          "Photos may help initial planning, but a firm price requires a confirmed defect, scope, access and repair method.",
          "照片可辅助初步计划，但确定价格需要确认缺陷、范围、通道和维修方法。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "safe-roof-inspection-what-not-to-do",
    title: t(
      "Safe Roof Observation: What Property Owners Should Not Do",
      "安全观察屋顶：房屋业主不应该做什么",
    ),
    summary: t(
      "Useful roof information can be collected without stepping onto wet, steep or fragile surfaces.",
      "无需踏上湿滑、陡峭或脆弱屋面，也能收集有用的屋顶信息。",
    ),
    category: t("Safety", "安全"),
    published: "2026-09-18",
    readingMinutes: 7,
    image: "/media/tile-ridge-overview.jpg",
    imageAlt: t(
      "Tiled ridge viewed without suggesting customer roof access",
      "不建议客户上屋顶情况下展示的瓦屋脊画面",
    ),
    relatedServiceIds: ["storm-damage-roof-repairs-sydney"],
    sections: [
      {
        heading: t("Do not create a second problem", "不要制造第二个问题"),
        paragraphs: [
          t(
            "Wet roofs, steep pitches, fragile materials, hidden openings and overhead services can turn a simple photo request into a serious hazard. An enquiry never requires the property owner to climb onto the roof.",
            "湿滑屋面、陡坡、脆弱材料、隐藏开口和上方线路，都可能让简单的拍照变成严重风险。提交咨询从不要求房屋业主攀爬屋顶。",
          ),
        ],
      },
      {
        heading: t("Use safe observation points", "使用安全观察位置"),
        paragraphs: [
          t(
            "Ground-level views, windows that can be used without leaning out, indoor ceiling marks and existing property documents may all provide context. State where each image was taken so its limitations are clear.",
            "地面视角、无需探身即可使用的窗户、室内天花板水印以及现有房屋资料，都可以提供背景。请注明每张照片的拍摄位置，以明确其局限。",
          ),
        ],
        checklist: [
          t(
            "Keep ladders and roof access out of the enquiry process",
            "不要为了咨询使用梯子或进入屋顶",
          ),
          t("Do not touch loose material or electrical hazards", "不要触碰松动物料或电气风险"),
          t("Record location, timing and visible change instead", "改为记录位置、时间和可见变化"),
        ],
      },
      {
        heading: t("Escalate the right hazard", "把风险交给正确的应急渠道"),
        paragraphs: [
          t(
            "Fallen lines, structural movement, active ceiling collapse or uncontrolled water near electricity require an appropriate emergency response. A routine roof repair form is not designed to manage immediate danger.",
            "倒下的电线、结构位移、正在坍塌的天花板或靠近电力设施的失控进水，需要相应的紧急响应。常规屋顶维修表单并非处理即时危险的渠道。",
          ),
        ],
      },
    ],
    faq: [
      sharedSafetyFaq,
      {
        question: t("Can I use a drone photo?", "可以使用无人机照片吗？"),
        answer: t(
          "Existing safely and lawfully obtained images may provide context, but they still do not replace an assessment of access, material condition and the repair scope.",
          "已有且以安全合法方式取得的画面可以提供背景，但仍不能代替对通道、材料状况和维修范围的评估。",
        ),
      },
    ],
  },
  {
    slug: "ceiling-stain-after-rain-what-to-record",
    title: t(
      "Ceiling Stain After Rain: What to Record Before Enquiring",
      "雨后天花板出现水印：咨询前应记录什么",
    ),
    summary: t(
      "A simple observation log can preserve timing and location details that are easy to forget once the surface dries.",
      "简单的观察记录可以保留表面干燥后容易忘记的时间和位置细节。",
    ),
    category: t("Roof leaks", "屋顶漏水"),
    published: "2026-09-18",
    readingMinutes: 7,
    image: "/media/flashing-abutment-repair.jpg",
    imageAlt: t("Roof abutment and flashing detail", "屋面交接及泛水细节"),
    relatedServiceIds: ["roof-leak-repairs-sydney", "flashing-valley-repairs-sydney"],
    sections: [
      {
        heading: t("Create a short event log", "建立简短事件记录"),
        paragraphs: [
          t(
            "Record when the mark first appeared, whether it grew, the rain conditions and how long it remained damp. A dated photo with a wider room view can help show scale and location without implying the roof entry point is directly above it.",
            "记录水印首次出现时间、是否扩大、当时降雨情况以及保持潮湿多久。带日期的整体房间画面有助于展示大小和位置，同时不会暗示屋顶进水点一定就在正上方。",
          ),
        ],
      },
      {
        heading: t("Note what is above and nearby", "说明上方和附近区域"),
        paragraphs: [
          t(
            "State whether the room is under a roof plane, valley, wall junction, balcony or another occupied level if known. Mention nearby vents, skylights or plumbing only as context, not as the diagnosed source.",
            "如已知，请说明房间上方是屋面、天沟谷、墙体交接、阳台还是另一层空间。附近的通风口、天窗或管道可以作为背景提及，但不要把它们当作已诊断水源。",
          ),
        ],
        checklist: [
          t("Dated wide and close photos", "带日期的整体和近景照片"),
          t("Rain timing and intensity", "降雨时间和强度"),
          t("Room use and any electrical fittings nearby", "房间用途及附近是否有电气装置"),
        ],
      },
      {
        heading: t("Report changes between events", "记录不同降雨事件间的变化"),
        paragraphs: [
          t(
            "If the symptom repeats, add to the same log. Patterns across several weather events can support a more informed conversation, although inspection is still needed to confirm the path and repair scope.",
            "如果症状重复出现，请继续补充同一记录。多次天气事件形成的规律可以支持更充分的沟通，但仍需检查来确认进水路径和维修范围。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t(
          "Should I repaint the stain before assessment?",
          "评估前应该把水印重新刷掉吗？",
        ),
        answer: t(
          "Preserve clear photos and timing notes first. Any immediate indoor safety or damage-control decision should be made for the actual condition, not for the enquiry record.",
          "请先保留清晰照片和时间记录。任何室内安全或损害控制决定都应根据实际状况处理，而不是为了保留咨询记录。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "how-to-choose-the-right-roof-repair-service",
    title: t("How to Choose the Right Roof Repair Service Path", "如何选择正确的屋顶维修服务路径"),
    summary: t(
      "Use the visible symptom or component to enter the site, then let the enquiry clarify connected roof areas.",
      "先按可见症状或构件进入服务页面，再通过咨询厘清相关屋顶部位。",
    ),
    category: t("Enquiry planning", "咨询准备"),
    published: "2026-09-18",
    readingMinutes: 8,
    image: "/media/tile-roof-after.jpg",
    imageAlt: t(
      "Tiled roof surface with several connected roof areas",
      "包含多个相连屋面部位的瓦屋顶",
    ),
    relatedServiceIds: [
      "roof-leak-repairs-sydney",
      "storm-damage-roof-repairs-sydney",
      "tile-roof-repairs-sydney",
      "metal-roof-repairs-sydney",
    ],
    sections: [
      {
        heading: t("Choose the closest visible issue", "选择最接近的可见问题"),
        paragraphs: [
          t(
            "Use roof leak repair for moisture symptoms, storm damage for a clear weather event, and the tile or metal paths when the material is the main context. Flashing, valley and ridge pages are useful when those components are visibly involved.",
            "出现潮湿症状时可从屋顶漏水进入；明确发生天气事件时可选择风暴损坏；以材料为主要背景时选择瓦屋顶或金属屋顶。若明显涉及泛水、天沟谷或屋脊，则使用相应页面。",
          ),
        ],
      },
      {
        heading: t("One enquiry can mention connected components", "一次咨询可以说明多个相关构件"),
        paragraphs: [
          t(
            "The page you choose is the starting owner for the enquiry, not a diagnosis. Describe every relevant symptom and component so the relationship can be clarified before a scope is discussed.",
            "您选择的页面只是咨询起点，不是诊断。请说明所有相关症状和构件，以便在讨论范围前厘清它们之间的关系。",
          ),
        ],
        checklist: [
          t("Primary symptom", "主要症状"),
          t("Roof material and visible component", "屋顶材料和可见构件"),
          t("Weather, timing and location", "天气、时间和地点"),
        ],
      },
      {
        heading: t("Use the general form when uncertain", "无法判断时使用通用表单"),
        paragraphs: [
          t(
            "If no service label fits confidently, the contact page accepts a general roof repair enquiry. Clear observations are more valuable than selecting a technical label that has not been confirmed.",
            "如果无法确定哪个服务标签最合适，可在联系页面提交通用屋顶维修咨询。清楚的观察信息比选择未经确认的技术名称更有价值。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t(
          "Will choosing the wrong service block my enquiry?",
          "选错服务会导致咨询无法处理吗？",
        ),
        answer: t(
          "No. Use the closest path and describe the issue clearly; service fit and connected components are confirmed from the details.",
          "不会。选择最接近的路径并清楚描述问题即可，承接适配和相关构件会根据资料进一步确认。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "roof-repair-enquiry-checklist-for-sydney-property-owners",
    title: t(
      "Roof Repair Enquiry Checklist for Sydney Property Owners",
      "悉尼房屋业主屋顶维修咨询清单",
    ),
    summary: t(
      "A single checklist covering location, symptom, material, access, photos and the questions to ask before scope is agreed.",
      "一份涵盖地点、症状、材料、通道、照片及范围确认前问题的完整清单。",
    ),
    category: t("Enquiry planning", "咨询准备"),
    published: "2026-09-18",
    readingMinutes: 9,
    image: "/media/metal-roof-repair-overview.jpg",
    imageAlt: t("Roof areas used to plan a repair enquiry", "用于准备维修咨询的屋顶部位画面"),
    relatedServiceIds: ["roof-leak-repairs-sydney", "storm-damage-roof-repairs-sydney"],
    sections: [
      {
        heading: t("Property and location", "房屋与地点"),
        paragraphs: [
          t(
            "Begin with the suburb or postcode, property type, approximate height and any access constraints. This information helps confirm whether the request fits the current Sydney service area and how an assessment could be approached.",
            "先提供 suburb 或邮编、房屋类型、大致高度和任何通道限制。这些信息有助于确认咨询是否符合当前悉尼承接范围，以及可如何安排评估。",
          ),
        ],
        checklist: [
          t("Suburb or postcode", "suburb 或邮编"),
          t("Single or multi-level property", "单层或多层房屋"),
          t("Side access, boundaries and parking constraints", "侧面通道、边界和停车限制"),
        ],
      },
      {
        heading: t("Symptom and timing", "症状与时间"),
        paragraphs: [
          t(
            "Describe what is visible, where it appears, when it started and how it changes with weather. Avoid naming a cause unless it has already been confirmed by an appropriate assessment.",
            "说明可见情况、出现位置、开始时间以及随天气如何变化。除非已经通过适当评估确认，否则不要直接给出原因。",
          ),
        ],
        checklist: [
          t("Indoor and exterior visible signs", "室内和外部可见信号"),
          t("First occurrence and recent changes", "首次出现时间及近期变化"),
          t("Relevant rain, wind or impact event", "相关降雨、大风或撞击事件"),
        ],
      },
      {
        heading: t("Questions before scope", "确认范围前要问的问题"),
        paragraphs: [
          t(
            "Ask what still needs inspection, what information is missing, whether the service fits the property and what the next step includes. Price should follow a sufficiently clear defect, access plan and proposed work scope.",
            "可以询问哪些部位仍需检查、还缺少哪些信息、服务是否适合该房屋，以及下一步包含什么。价格应建立在足够清楚的缺陷、通道计划和拟议工作范围之上。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t(
          "Do I need every checklist item before calling?",
          "致电前必须准备清单中的全部信息吗？",
        ),
        answer: t(
          "No. Start with the location and visible issue. The checklist helps identify useful follow-up details, not create a barrier to contact.",
          "不需要。先提供地点和可见问题即可；清单用于提示后续有帮助的信息，不是联系门槛。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "what-to-check-around-roof-penetrations",
    title: t(
      "What to Report Around Roof Penetrations and Abutments",
      "屋面穿透点与墙体交接处应报告什么",
    ),
    summary: t(
      "Skylights, vents, pipes and wall junctions need location context, weather timing and adjoining-material details.",
      "天窗、通风口、管道和墙体交接需要结合位置、天气时间及相邻材料信息。",
    ),
    category: t("Roof components", "屋顶构件"),
    published: "2026-09-18",
    readingMinutes: 7,
    image: "/media/metal-roof-flashing-condition.jpg",
    imageAlt: t(
      "Visible flashing condition beside a metal roof junction",
      "金属屋面交接旁的可见泛水状况",
    ),
    relatedServiceIds: ["flashing-valley-repairs-sydney", "metal-roof-repairs-sydney"],
    sections: [
      {
        heading: t("Name the feature and its location", "说明构件及其位置"),
        paragraphs: [
          t(
            "State whether the feature is a skylight, vent, pipe, chimney or wall junction and which part of the building it sits above. A general roof photo and an interior location note help connect the observations.",
            "说明该构件是天窗、通风口、管道、烟囱还是墙体交接，并指出它位于建筑哪个区域上方。屋顶整体照片和室内位置说明有助于连接这些观察。",
          ),
        ],
      },
      {
        heading: t("Describe adjoining materials", "描述相邻材料"),
        paragraphs: [
          t(
            "Note whether the feature meets tile, metal sheet, masonry or another surface. Visible sealant, flashing edges or staining can be reported, but the material below and the water path may not be visible.",
            "请说明该构件与瓦片、金属板、砌体还是其他表面相接。可以记录可见密封材料、泛水边缘或水迹，但下方材料和进水路径可能看不到。",
          ),
        ],
        checklist: [
          t("Feature type and building location", "构件类型和建筑位置"),
          t("Adjoining roof and wall materials", "相邻屋面和墙体材料"),
          t("Weather direction and symptom timing", "天气方向和症状时间"),
        ],
      },
      {
        heading: t("Keep recent changes in context", "说明近期变化背景"),
        paragraphs: [
          t(
            "Mention recent installation, maintenance or nearby work if known, without assuming it caused the issue. Dates and observable changes help determine what questions the assessment should answer.",
            "如果知道近期有安装、维护或附近施工，可以说明，但不要假设它就是原因。日期和可观察变化有助于确定评估需要回答哪些问题。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t("Does old sealant prove the leak source?", "旧密封材料能证明漏水来源吗？"),
        answer: t(
          "No. It is a visible condition to report; the junction, substrate and moisture path still need confirmation.",
          "不能。它只是应报告的可见状况；交接、基层和水分路径仍需确认。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
  {
    slug: "seasonal-roof-maintenance-observation-guide-sydney",
    title: t("A Seasonal Roof Observation Guide for Sydney Homes", "悉尼住宅季节性屋顶观察指南"),
    summary: t(
      "A simple, ground-level routine for recording changes before heavy weather without promising that observation prevents every leak.",
      "一套从地面记录强天气前变化的简单方法，同时不声称观察能够避免所有漏水。",
    ),
    category: t("Maintenance planning", "维护计划"),
    published: "2026-09-18",
    readingMinutes: 8,
    image: "/media/tile-roof-finished-detail.jpg",
    imageAlt: t("Tiled roof detail used for seasonal observation", "用于季节性观察的瓦屋顶细节"),
    relatedServiceIds: ["tile-roof-repairs-sydney", "storm-damage-roof-repairs-sydney"],
    sections: [
      {
        heading: t("Create a repeatable viewpoint", "建立可重复的观察位置"),
        paragraphs: [
          t(
            "Take occasional ground-level photos from the same safe locations. A consistent viewpoint can make obvious changes in roof lines, materials or nearby trees easier to notice than isolated images taken from different angles.",
            "可以偶尔从相同的安全位置拍摄地面视角照片。固定视角比从不同角度拍摄的零散照片更容易发现屋面线条、材料或附近树木的明显变化。",
          ),
        ],
      },
      {
        heading: t("Record drainage and indoor signals", "记录排水与室内信号"),
        paragraphs: [
          t(
            "From safe positions, note visible gutter overflow, debris or staining and record any new indoor marks after rain. Observation does not confirm hidden condition, but it can provide a useful before-and-after timeline.",
            "从安全位置记录可见的排水沟溢流、杂物或水迹，并记录雨后新的室内水印。观察不能确认隐藏状况，但可以形成有用的前后时间轴。",
          ),
        ],
        checklist: [
          t("Dated photos from consistent locations", "从固定位置拍摄的带日期照片"),
          t("Changes after significant wind or rain", "强风或大雨后的变化"),
          t("New indoor marks, odours or debris", "新的室内水印、气味或碎屑"),
        ],
      },
      {
        heading: t("Use the record to ask better questions", "用记录提出更准确的问题"),
        paragraphs: [
          t(
            "A simple timeline helps explain what changed and when. It should support an enquiry, not create a promise that every defect is visible or that periodic photos replace appropriate inspection and maintenance.",
            "简单时间轴有助于说明变化内容和发生时间。它用于支持咨询，而不是承诺所有缺陷都能被看到，也不能替代适当检查和维护。",
          ),
        ],
      },
    ],
    faq: [
      {
        question: t(
          "Does seasonal observation prevent roof leaks?",
          "季节性观察能防止屋顶漏水吗？",
        ),
        answer: t(
          "No guarantee can be made. It may help identify visible change and preserve useful timing information for a later enquiry.",
          "不能作此保证。它可以帮助发现可见变化，并为后续咨询保留有用的时间信息。",
        ),
      },
      sharedSafetyFaq,
    ],
  },
];

export const blogBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const blogPath = (post: BlogPost, locale: Locale) =>
  `${locale === "zh" ? "/zh-hans" : ""}/blog/${post.slug}`;

export const blogArchive = [
  {
    year: "2026",
    months: [{ label: t("September", "九月"), count: blogPosts.length }],
  },
] as const;

export const blogCategories = Array.from(
  new Map(blogPosts.map((post) => [post.category.en, post.category])).values(),
);

export function formatBlogDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00+10:00`));
}
