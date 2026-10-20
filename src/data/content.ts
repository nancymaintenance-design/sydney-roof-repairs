export type Locale = "en" | "zh";

export const localePrefix = (locale: Locale) => (locale === "zh" ? "/zh-hans" : "");
export const localizedPath = (locale: Locale, path = "/") => {
  const cleanPath = path === "/" ? "" : path;
  return `${localePrefix(locale)}${cleanPath}` || "/";
};

export const ui = {
  en: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    blog: "Blog",
    areas: "Areas",
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
    call: "Call",
    enquire: "Request an assessment",
    allServices: "All roof repair services",
    language: "简体中文",
    languageLabel: "View this page in Simplified Chinese",
  },
  zh: {
    home: "首页",
    services: "服务",
    projects: "项目资料",
    blog: "屋顶指南",
    areas: "服务区域",
    about: "关于我们",
    contact: "联系我们",
    privacy: "隐私政策",
    call: "致电",
    enquire: "提交评估需求",
    allServices: "全部屋顶维修服务",
    language: "English",
    languageLabel: "View this page in English",
  },
} as const;

export const commonCopy = {
  en: {
    eyebrow: "SYDNEY ROOF REPAIR ENQUIRIES",
    fitNote:
      "Send the roof type, visible issue, suburb and any safe-to-share photos. Ellis Services will confirm service fit and the next step before any scope is agreed.",
    costNote:
      "Repair cost depends on the defect, safe access, roof material, affected area and the repair method required. A price cannot be confirmed from a keyword or a single photo alone.",
    mediaDisclosure:
      "These photos show roof areas and components that may help describe the issue. The cause and repair scope still need to be confirmed from the property details and inspection.",
  },
  zh: {
    eyebrow: "悉尼屋顶维修咨询",
    fitNote:
      "请提供屋顶类型、可见问题、所在 suburb 或邮编，以及可安全分享的照片。Ellis Services 会在约定任何工作范围前确认是否适合承接及下一步安排。",
    costNote:
      "维修费用取决于缺陷、现场安全通道、屋顶材料、受影响范围和所需修复方法，不能仅凭关键词或单张照片确认价格。",
    mediaDisclosure:
      "这些照片展示不同屋顶部位和构件，可帮助说明问题；具体原因和维修范围仍需结合房屋信息及检查确认。",
  },
} as const;
