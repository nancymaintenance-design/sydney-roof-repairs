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
    id: "tile-roof-surfaces",
    evidenceLevel: 2,
    serviceIds: ["storm-damage-roof-repairs-sydney", "tile-roof-repairs-sydney"],
    title: {
      en: "Tile roof surfaces and finished details",
      zh: "瓦屋面与完工细节",
    },
    summary: {
      en: "These wider views show tile courses, roof planes and a finished junction detail. Use them to describe the part of a tiled roof involved in your enquiry.",
      zh: "这些整体画面展示瓦片排列、屋面和一处完工连接细节，可用于说明咨询涉及的瓦屋顶部位。",
    },
    visibleDetails: {
      en: [
        "Wider tile roof planes and tile courses",
        "The relationship between adjoining roof sections",
        "A finished tile junction at close range",
      ],
      zh: ["瓦屋面整体与瓦片排列", "相邻屋面之间的位置关系", "完工瓦片连接近景"],
    },
    enquiryUse: {
      en: "Share a similar wide view plus a safe close view, then note what changed, when it appeared and whether water is entering indoors.",
      zh: "可提供相似的整体画面和安全拍摄的局部照片，并说明何时出现变化、发生了什么，以及室内是否进水。",
    },
    limitation: {
      en: "These photos do not by themselves confirm storm causation, a water-entry path, concealed underlay condition or the final repair scope.",
      zh: "这些照片本身不能确认是否由风暴造成、实际进水路径、隐藏隔水层状况或最终维修范围。",
    },
    images: [
      {
        src: "/media/tile-roof-before.jpg",
        label: { en: "Roof plane and ridge line", zh: "屋面与屋脊线" },
        caption: {
          en: "The wider angle helps locate the affected area in relation to the ridge and adjoining roof planes.",
          zh: "整体角度有助于说明受影响位置与屋脊及相邻屋面的关系。",
        },
        alt: {
          en: "Wide tiled roof plane meeting a ridge line",
          zh: "与屋脊线相接的瓦屋面整体画面",
        },
      },
      {
        src: "/media/tile-roof-after.jpg",
        label: { en: "Wider tile roof view", zh: "瓦屋面整体画面" },
        caption: {
          en: "A second wide view shows the tile courses and roof geometry from another position.",
          zh: "另一处整体角度展示瓦片排列和屋面形态。",
        },
        alt: { en: "Wide view across courses of roof tiles", zh: "瓦片排列的屋面整体画面" },
      },
      {
        src: "/media/tile-roof-finished-detail.jpg",
        label: { en: "Tile junction detail", zh: "瓦片连接细节" },
        caption: {
          en: "This close view records how several tile courses meet near the roof junction.",
          zh: "该近景记录多排瓦片在屋面连接处的交汇方式。",
        },
        alt: {
          en: "Close view of tile courses meeting at a roof junction",
          zh: "多排瓦片在屋面连接处交汇的近景",
        },
      },
    ],
  },
  {
    id: "ridge-and-open-sections",
    evidenceLevel: 2,
    serviceIds: ["ridge-capping-repointing-sydney", "tile-roof-repairs-sydney"],
    title: { en: "Ridge capping and open roof sections", zh: "屋脊瓦与开放屋面部位" },
    summary: {
      en: "These closer views show the ridge line, capping and one opened tile section. They help identify the roof area involved without assuming the cause or final repair.",
      zh: "这些近景展示屋脊线、屋脊瓦和一处打开的瓦面，可帮助说明涉及部位，但不会仅凭照片推断原因或最终维修方式。",
    },
    visibleDetails: {
      en: [
        "Continuity along the tiled ridge line",
        "Ridge tiles, bedding and visible pointing",
        "The accessible area beneath lifted roof tiles",
      ],
      zh: ["瓦屋脊线的连续状况", "屋脊瓦、垫层和可见勾缝", "掀起瓦片下方可见的开放部位"],
    },
    enquiryUse: {
      en: "Share a wider ridge view plus a safe close photo of cracking or movement, then note when the change was first noticed.",
      zh: "可提供一张屋脊整体画面和一张安全拍摄的开裂或松动近景，并说明何时首次发现变化。",
    },
    limitation: {
      en: "The extent of movement, concealed material condition, safe access and final repair scope still need confirmation.",
      zh: "松动范围、隐藏材料状况、安全通道和最终维修范围仍需确认。",
    },
    images: [
      {
        src: "/media/tile-ridge-overview.jpg",
        label: { en: "Ridge alignment", zh: "屋脊走向" },
        caption: {
          en: "This angle makes the ridge run and adjoining tile courses easier to describe in an enquiry.",
          zh: "该角度便于在咨询中说明屋脊走向和相邻瓦片排列。",
        },
        alt: { en: "Tiled roof ridge with adjoining tile courses", zh: "瓦屋脊与相邻瓦片排列" },
      },
      {
        src: "/media/ridge-capping-repair-detail.jpg",
        label: { en: "Ridge capping detail", zh: "屋脊瓦细节" },
        caption: {
          en: "The close view shows ridge tiles, bedding and the visible pointing line.",
          zh: "近景展示屋脊瓦、垫层和可见勾缝线。",
        },
        alt: {
          en: "Close view of ridge tiles, bedding and pointing",
          zh: "屋脊瓦、垫层与勾缝近景",
        },
      },
      {
        src: "/media/tile-repair-open-section.jpg",
        label: { en: "Opened tile section", zh: "瓦片开放部位" },
        caption: {
          en: "Lifted tiles reveal the accessible section beneath without establishing the condition of concealed areas.",
          zh: "掀起的瓦片显示可见开放部位，但不能据此判断其他隐藏区域。",
        },
        alt: { en: "Roof tiles lifted around an opened section", zh: "开放部位周围掀起的屋顶瓦片" },
      },
    ],
  },
  {
    id: "valley-and-abutment-details",
    evidenceLevel: 2,
    serviceIds: ["roof-leak-repairs-sydney", "flashing-valley-repairs-sydney"],
    title: { en: "Valley, gutter and abutment junctions", zh: "天沟谷、排水槽与墙边连接" },
    summary: {
      en: "Close and wider views show roof junctions where water is collected, redirected or kept away from an adjoining surface.",
      zh: "局部和整体画面展示屋面汇水、导水及与相邻表面防水连接的部位。",
    },
    visibleDetails: {
      en: [
        "Valley metal beneath adjoining tile edges",
        "Gutter transitions and the nearby roof surface",
        "Flashing where the roof meets an abutting wall",
      ],
      zh: [
        "相邻瓦片边缘下方的天沟谷金属构件",
        "排水槽过渡与附近屋面",
        "屋面与相邻墙体交接处的泛水",
      ],
    },
    enquiryUse: {
      en: "Include both a wider drainage view and the close junction, then describe where indoor staining or water appears and under which weather conditions.",
      zh: "请同时提供整体排水画面和连接处近景，并说明室内水痕或进水位置及出现时的天气条件。",
    },
    limitation: {
      en: "The images do not confirm an active leak source, concealed membrane condition, drainage performance or the result of any repair.",
      zh: "这些画面不能确认实际漏点、隐藏防水层状况、排水性能或任何维修结果。",
    },
    images: [
      {
        src: "/media/valley-flashing-repair-01.jpg",
        label: { en: "Valley junction", zh: "天沟谷连接" },
        caption: {
          en: "The valley channel and adjoining tile edges are visible together, helping locate the junction being discussed.",
          zh: "天沟谷槽与相邻瓦片边缘同框，便于定位咨询涉及的连接部位。",
        },
        alt: {
          en: "Metal roof valley between adjoining tile edges",
          zh: "相邻瓦片边缘之间的金属天沟谷",
        },
      },
      {
        src: "/media/valley-flashing-repair-02.jpg",
        label: { en: "Valley edge detail", zh: "天沟谷边缘细节" },
        caption: {
          en: "A closer angle shows the meeting line between the tile edge and valley metal.",
          zh: "更近的角度展示瓦片边缘与天沟谷金属构件的交接线。",
        },
        alt: {
          en: "Close view of tile edges beside metal valley flashing",
          zh: "瓦片边缘与金属天沟谷泛水的近景",
        },
      },
      {
        src: "/media/flashing-abutment-repair.jpg",
        label: { en: "Wall abutment flashing", zh: "墙边泛水" },
        caption: {
          en: "This view shows the flashing line where the tiled roof meets an adjoining wall.",
          zh: "该画面展示瓦屋面与相邻墙体交接处的泛水线。",
        },
        alt: {
          en: "Flashing along the junction of a tiled roof and wall",
          zh: "瓦屋面与墙体连接处的泛水",
        },
      },
      {
        src: "/media/tile-repair-underlay-detail.jpg",
        label: { en: "Tile and underlay junction", zh: "瓦片与隔水层连接" },
        caption: {
          en: "Lifted tile edges provide a limited view of the accessible underlay junction.",
          zh: "掀起的瓦片边缘显示可触及的隔水层连接局部。",
        },
        alt: {
          en: "Lifted roof tile edges beside visible underlay",
          zh: "掀起的屋顶瓦片边缘与可见隔水层",
        },
      },
    ],
  },
  {
    id: "metal-roof-box-gutter-details",
    evidenceLevel: 2,
    serviceIds: ["metal-roof-repairs-sydney"],
    title: {
      en: "Metal roof, flashing and box-gutter details",
      zh: "金属屋面、泛水与箱式天沟细节",
    },
    summary: {
      en: "These views show folded metal junctions, box-gutter edges and the wider roof area around the drainage path.",
      zh: "这些画面展示金属折边连接、箱式天沟边缘以及排水路径周围的整体屋面。",
    },
    visibleDetails: {
      en: [
        "Folded metal flashing and adjoining sheet edges",
        "Box-gutter junctions at close range",
        "Wider metal-roof drainage context",
      ],
      zh: ["金属折边泛水与相邻板材边缘", "箱式天沟连接近景", "金属屋面整体排水环境"],
    },
    enquiryUse: {
      en: "Share the roof profile, a wider view of the drainage route and a safe close-up of the affected junction, plus any indoor water marks.",
      zh: "请提供屋面板型、排水路径整体画面和受影响连接处的安全近景，并说明室内是否有水痕。",
    },
    limitation: {
      en: "The photos do not confirm water flow under rain, concealed corrosion, fastener condition or a completed repair outcome.",
      zh: "这些照片不能确认降雨时的水流、隐藏腐蚀、紧固件状况或维修完成结果。",
    },
    images: [
      {
        src: "/media/metal-roof-flashing-condition.jpg",
        label: { en: "Folded flashing line", zh: "折边泛水线" },
        caption: {
          en: "The folded flashing and adjoining sheet edge can be seen along the junction.",
          zh: "可见连接处的折边泛水和相邻板材边缘。",
        },
        alt: {
          en: "Folded metal flashing beside a roof sheet edge",
          zh: "屋面板边缘旁的金属折边泛水",
        },
      },
      {
        src: "/media/metal-roof-flashing-detail.jpg",
        label: { en: "Metal junction detail", zh: "金属连接细节" },
        caption: {
          en: "A closer angle records the fold and overlap at the metal junction.",
          zh: "更近的角度记录金属连接处的折边和搭接。",
        },
        alt: {
          en: "Close view of a folded and overlapped metal roof junction",
          zh: "金属屋面折边与搭接连接近景",
        },
      },
      {
        src: "/media/metal-box-gutter-detail.jpg",
        label: { en: "Box-gutter edge", zh: "箱式天沟边缘" },
        caption: {
          en: "The close view shows the box-gutter edge and the metal surfaces meeting beside it.",
          zh: "近景展示箱式天沟边缘和相邻金属表面的连接。",
        },
        alt: {
          en: "Close view of a metal box-gutter edge and junction",
          zh: "金属箱式天沟边缘与连接近景",
        },
      },
      {
        src: "/media/metal-box-gutter-overview.jpg",
        label: { en: "Box-gutter route", zh: "箱式天沟走向" },
        caption: {
          en: "The wider view helps describe how the box gutter sits within the surrounding roof area.",
          zh: "整体画面有助于说明箱式天沟在周围屋面中的位置。",
        },
        alt: {
          en: "Box gutter running through a wider metal roof area",
          zh: "穿过金属屋面区域的箱式天沟",
        },
      },
      {
        src: "/media/metal-roof-repair-overview.jpg",
        label: { en: "Wider metal roof context", zh: "金属屋面整体环境" },
        caption: {
          en: "This wider angle places the junctions and drainage route within the full roof plane.",
          zh: "该整体角度显示连接处和排水路径在完整屋面中的位置。",
        },
        alt: {
          en: "Wide metal roof plane with drainage junctions",
          zh: "带排水连接的金属屋面整体画面",
        },
      },
    ],
  },
];

export const projectText = (value: LocalText, locale: Locale) => value[locale];

export const findProjectForService = (serviceId: string) =>
  projects.find((project) => project.serviceIds.includes(serviceId));
