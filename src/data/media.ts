import type { Locale } from "./content";

type LocalText = { en: string; zh: string };

export type ProjectImage = {
  src: string;
  label: LocalText;
  caption: LocalText;
  alt: LocalText;
};

export type ProjectStory = {
  id: string;
  evidenceLevel: 2 | 3;
  serviceIds: string[];
  title: LocalText;
  summary: LocalText;
  visibleDetails: { en: string[]; zh: string[] };
  enquiryUse: LocalText;
  limitation: LocalText;
  images: ProjectImage[];
};

export const projects: ProjectStory[] = [
  {
    id: "metal-roof-box-gutter-details",
    evidenceLevel: 3,
    serviceIds: ["metal-roof-repairs-sydney"],
    title: {
      en: "Commercial metal roof leak repairs and rust treatment",
      zh: "商用金属屋顶补漏与除锈处理",
    },
    summary: {
      en: "This commercial roof maintenance job focused on leak repairs and rust treatment while retaining existing roof materials. The photos document the original corrosion, local treatment at roof-sheet junctions and work along the box gutter.",
      zh: "这项商用屋顶维修以补漏和除锈处理为重点，在保留现有屋面材料的基础上进行局部修补。照片记录原有锈蚀、屋面板连接处的局部处理及箱式天沟处理。",
    },
    visibleDetails: {
      en: [
        "Corrosion on existing metal roof ribs before treatment",
        "Local coating and sealing around sheet junctions",
        "Grey treatment along the box gutter; existing sheets retained",
      ],
      zh: [
        "处理前原有金属屋面凸肋的锈蚀",
        "屋面板连接处的局部涂覆与密封处理",
        "箱式天沟内的灰色处理层，以及保留的原有板材",
      ],
    },
    enquiryUse: {
      en: "Repair, partial replacement or full replacement? The suitable option depends on the condition of the existing material, the source of the leak, access and your budget. A local repair may keep sound materials in service, although its appearance can differ from a new roof. We explain the scope and limitations before work starts, with the same commitment to reliable service and workmanship.",
      zh: "选择局部修补、部分更换还是整体换新，需要结合现有材料状况、漏水原因、施工通道和预算。局部修补可让状况良好的材料继续发挥使用价值，但外观可能不如整体换新。施工前说明范围和局限，对可靠服务与施工质量的要求保持一致。",
    },
    limitation: {
      en: "Visible treatment is recorded here; these photos are not a rainfall test or a ten-year service-life guarantee. Repair suitability and concealed corrosion require inspection.",
      zh: "这里记录的是可见处理情况；照片不代表已通过雨水测试，也不构成十年使用寿命保证。是否适合修补及隐藏锈蚀仍需检查。",
    },
    images: [
      {
        src: "/media/commercial-roof-corrosion.webp",
        label: {
          en: "Roof corrosion before treatment",
          zh: "处理前的屋面锈蚀",
        },
        caption: {
          en: "Surface corrosion is visible along the raised metal ribs beside the wall.",
          zh: "靠墙金属屋面凸肋可见表面锈蚀。",
        },
        alt: {
          en: "Roof corrosion before treatment — Surface corrosion is visible along the raised metal ribs beside the wall.",
          zh: "处理前的屋面锈蚀：靠墙金属屋面凸肋可见表面锈蚀。",
        },
      },
      {
        src: "/media/commercial-box-gutter-before.webp",
        label: {
          en: "Box gutter before treatment",
          zh: "处理前的箱式天沟",
        },
        caption: {
          en: "Deposits and surface discolouration are visible in the gutter beside the roof sheets.",
          zh: "屋面板旁的天沟内可见沉积物和表面变色。",
        },
        alt: {
          en: "Box gutter before treatment — Deposits and surface discolouration are visible in the gutter beside the roof sheets.",
          zh: "处理前的箱式天沟：屋面板旁的天沟内可见沉积物和表面变色。",
        },
      },
      {
        src: "/media/commercial-roof-local-repairs.webp",
        label: {
          en: "Local roof treatment",
          zh: "屋面局部处理",
        },
        caption: {
          en: "Local coating and sealing areas are visible while the surrounding roof sheets remain in place.",
          zh: "局部涂覆与密封处理区域清晰可见，周围原有屋面板保留。",
        },
        alt: {
          en: "Local roof treatment — Local coating and sealing areas are visible while the surrounding roof sheets remain in place.",
          zh: "屋面局部处理：局部涂覆与密封处理区域清晰可见，周围原有屋面板保留。",
        },
      },
      {
        src: "/media/commercial-roof-sheet-junction.webp",
        label: {
          en: "Translucent sheet junction",
          zh: "采光板连接处",
        },
        caption: {
          en: "A coating band follows the lower junction of the translucent roof sheet.",
          zh: "采光屋面板下端连接处可见一道涂覆处理带。",
        },
        alt: {
          en: "Translucent sheet junction — A coating band follows the lower junction of the translucent roof sheet.",
          zh: "采光板连接处：采光屋面板下端连接处可见一道涂覆处理带。",
        },
      },
      {
        src: "/media/commercial-roof-overview.webp",
        label: {
          en: "Commercial roof repair overview",
          zh: "商用屋顶修补整体画面",
        },
        caption: {
          en: "The wider view shows local treatment beside roof-mounted equipment and existing roof sheets.",
          zh: "整体画面展示屋顶设备旁的局部处理和保留的原有屋面板。",
        },
        alt: {
          en: "Commercial roof repair overview — The wider view shows local treatment beside roof-mounted equipment and existing roof sheets.",
          zh: "商用屋顶修补整体画面：整体画面展示屋顶设备旁的局部处理和保留的原有屋面板。",
        },
      },
      {
        src: "/media/commercial-gutter-treatment.webp",
        label: {
          en: "Box-gutter treatment",
          zh: "箱式天沟处理",
        },
        caption: {
          en: "A grey treatment layer is visible along the box gutter beside existing solar panels.",
          zh: "现有太阳能板旁的箱式天沟内可见灰色处理层。",
        },
        alt: {
          en: "Box-gutter treatment — A grey treatment layer is visible along the box gutter beside existing solar panels.",
          zh: "箱式天沟处理：现有太阳能板旁的箱式天沟内可见灰色处理层。",
        },
      },
      {
        src: "/media/commercial-gutter-overview.webp",
        label: {
          en: "Roof-edge drainage detail",
          zh: "屋顶边缘排水细节",
        },
        caption: {
          en: "The wider angle records the treated gutter and its position along the roof edge.",
          zh: "较宽角度记录处理后的天沟及其在屋顶边缘的位置。",
        },
        alt: {
          en: "Roof-edge drainage detail — The wider angle records the treated gutter and its position along the roof edge.",
          zh: "屋顶边缘排水细节：较宽角度记录处理后的天沟及其在屋顶边缘的位置。",
        },
      },
    ],
  },
  {
    id: "tile-roof-surfaces",
    evidenceLevel: 2,
    serviceIds: ["storm-damage-roof-repairs-sydney", "tile-roof-repairs-sydney"],
    title: {
      en: "Tile roof enquiry details",
      zh: "瓦屋顶咨询资料",
    },
    summary: {
      en: "Describe the affected tile area and the surrounding roof layout before a repair is scoped.",
      zh: "确定维修范围前，请说明受影响的瓦片区域及周围屋面布局。",
    },
    visibleDetails: {
      en: [
        "Broken, slipped or missing tiles",
        "Where the affected area sits on the roof",
        "Any indoor water marks and when they appear",
      ],
      zh: ["破损、移位或缺失的瓦片", "受影响区域在屋顶的位置", "室内水痕及出现时间"],
    },
    enquiryUse: {
      en: "Share a similar wide view plus a safe close view, then note what changed, when it appeared and whether water is entering indoors.",
      zh: "可提供相似的整体画面和安全拍摄的局部照片，并说明何时出现变化、发生了什么，以及室内是否进水。",
    },
    limitation: {
      en: "The property condition and repair scope need to be confirmed during assessment. Share photos only where they can be taken safely.",
      zh: "房屋实际状况和维修范围需要在评估时确认。只提供能够安全拍摄的照片。",
    },
    images: [],
  },
  {
    id: "ridge-and-open-sections",
    evidenceLevel: 2,
    serviceIds: ["ridge-capping-repointing-sydney", "tile-roof-repairs-sydney"],
    title: {
      en: "Ridge and bedding assessment",
      zh: "屋脊与砂浆基层检查",
    },
    summary: {
      en: "Ridge repairs depend on the condition of the capping, bedding and adjoining tiles.",
      zh: "屋脊维修取决于屋脊瓦、砂浆基层和相邻瓦片的状况。",
    },
    visibleDetails: {
      en: [
        "Loose or displaced ridge capping",
        "Cracking or gaps in bedding and pointing",
        "Condition of the adjoining roof tiles",
      ],
      zh: ["屋脊瓦松动或移位", "砂浆基层及勾缝的裂缝或缺口", "相邻屋面瓦片的状况"],
    },
    enquiryUse: {
      en: "Share a wider ridge view plus a safe close photo of cracking or movement, then note when the change was first noticed.",
      zh: "可提供一张屋脊整体画面和一张安全拍摄的开裂或松动近景，并说明何时首次发现变化。",
    },
    limitation: {
      en: "The property condition and repair scope need to be confirmed during assessment. Share photos only where they can be taken safely.",
      zh: "房屋实际状况和维修范围需要在评估时确认。只提供能够安全拍摄的照片。",
    },
    images: [],
  },
  {
    id: "valley-and-abutment-details",
    evidenceLevel: 2,
    serviceIds: ["roof-leak-repairs-sydney", "flashing-valley-repairs-sydney"],
    title: {
      en: "Valley and wall-junction checks",
      zh: "天沟谷与墙面交接检查",
    },
    summary: {
      en: "Roof valleys and wall junctions need to be assessed with the adjoining materials and drainage path.",
      zh: "检查天沟谷和墙面交接处时，需要同时考虑相邻材料及排水路径。",
    },
    visibleDetails: {
      en: [
        "Debris or visible restriction along the drainage route",
        "Gaps or deterioration at the wall junction",
        "The position of nearby tiles, sheets and penetrations",
      ],
      zh: [
        "排水路径上的杂物或可见阻塞",
        "墙面交接处的缝隙或老化",
        "邻近瓦片、屋面板及穿透点的位置",
      ],
    },
    enquiryUse: {
      en: "Include both a wider drainage view and the close junction, then describe where indoor staining or water appears and under which weather conditions.",
      zh: "请同时提供整体排水画面和连接处近景，并说明室内水痕或进水位置及出现时的天气条件。",
    },
    limitation: {
      en: "The property condition and repair scope need to be confirmed during assessment. Share photos only where they can be taken safely.",
      zh: "房屋实际状况和维修范围需要在评估时确认。只提供能够安全拍摄的照片。",
    },
    images: [],
  },
];

export const projectText = (value: LocalText, locale: Locale) => value[locale];
export const findProjectForService = (serviceId: string) =>
  projects.find((project) => project.serviceIds.includes(serviceId));
