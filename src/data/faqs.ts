import type { Locale } from "./content";

export type LocalizedText = { en: string; zh: string };

export type FaqItem = {
  question: LocalizedText;
  answer: LocalizedText;
};

export const faqText = (value: LocalizedText, locale: Locale) => value[locale];

export const pageFaqs = {
  home: [
    {
      question: {
        en: "What information should I include in a roof repair enquiry?",
        zh: "提交屋顶维修咨询时应提供哪些信息？",
      },
      answer: {
        en: "Include the suburb or postcode, roof material if known, where the issue appears, when it occurs, property height and access details. Safely taken photos can help explain the visible condition, but they do not confirm the cause or repair scope by themselves.",
        zh: "请提供 suburb 或邮编、已知的屋顶材料、问题出现位置和时间、房屋高度及通道情况。可安全拍摄的照片有助于说明可见状况，但不能单独确认原因或维修范围。",
      },
    },
    {
      question: {
        en: "Can a roof repair price be confirmed from one photo?",
        zh: "只凭一张照片可以确认屋顶维修价格吗？",
      },
      answer: {
        en: "Not reliably. Pricing depends on the defect, affected area, safe access, roof material and the repair method required. The first step is to confirm service fit and what needs to be inspected.",
        zh: "通常不能。价格取决于缺陷、受影响范围、安全通道、屋顶材料及所需维修方法。第一步是先确认是否适合承接，以及哪些部位需要检查。",
      },
    },
    {
      question: {
        en: "Does Ellis Services receive enquiries across Sydney?",
        zh: "Ellis Services 是否接收悉尼各区的咨询？",
      },
      answer: {
        en: "The website receives Sydney roof repair enquiries. Share the suburb or postcode so current service fit, access and availability can be confirmed before any work is agreed.",
        zh: "本网站接收悉尼屋顶维修咨询。请提供 suburb 或邮编，以便在约定任何工作前确认当前承接范围、通道和可用性。",
      },
    },
    {
      question: {
        en: "Which roof repair service should I choose?",
        zh: "我应该选择哪一种屋顶维修服务？",
      },
      answer: {
        en: "Choose the service closest to the visible symptom or roof component. If you are unsure, use the general contact form and describe what you can see without trying to diagnose the cause.",
        zh: "请选择最接近可见症状或屋顶构件的服务。如果无法判断，可使用通用联系表单，说明您看到的情况即可，无需自行诊断原因。",
      },
    },
  ],
  services: [
    {
      question: {
        en: "What roof repair services are listed here?",
        zh: "这里列出了哪些屋顶维修服务？",
      },
      answer: {
        en: "The service paths cover roof leaks, storm damage, tile roofs, metal roofs, flashing and valleys, plus ridge capping and repointing. Each page explains visible signs, useful enquiry details and the next-step process.",
        zh: "服务路径包括屋顶漏水、风暴损坏、瓦屋顶、金属屋顶、泛水与天沟谷，以及屋脊封顶和重新勾缝。每个页面都会说明可见信号、咨询所需信息和下一步流程。",
      },
    },
    {
      question: {
        en: "What if the issue appears to involve more than one roof component?",
        zh: "如果问题似乎涉及多个屋顶构件怎么办？",
      },
      answer: {
        en: "Start with the most obvious symptom and mention the adjoining components in your enquiry. The service path is an enquiry owner, not a restriction on discussing connected roof areas.",
        zh: "可以先从最明显的症状进入，并在咨询中说明相邻构件。服务路径用于承接咨询，不会限制对相关屋顶部位的沟通。",
      },
    },
    {
      question: {
        en: "Do the service pages diagnose a roof fault online?",
        zh: "服务详情页会在线诊断屋顶故障吗？",
      },
      answer: {
        en: "No. They help you organise observable information. The underlying cause, safe access requirements and suitable repair method still need confirmation.",
        zh: "不会。页面用于帮助整理可观察的信息；根本原因、安全通道要求和合适的维修方法仍需进一步确认。",
      },
    },
    {
      question: {
        en: "Can I view related roof photos before enquiring?",
        zh: "咨询前可以查看相关屋顶照片吗？",
      },
      answer: {
        en: "Yes. Every service card and service detail page links to the relevant Projects section, where the visible roof component and the limits of the photo are described.",
        zh: "可以。每张服务卡和服务详情页都链接到对应的 Projects 板块，其中会说明可见屋顶构件以及照片本身的局限。",
      },
    },
  ],
  projects: [
    {
      question: {
        en: "What do the Projects photos prove?",
        zh: "Projects 照片可以证明什么？",
      },
      answer: {
        en: "They show visible roof areas, materials and work details that can help a customer describe a similar enquiry. A photo does not prove the cause of another property's issue, the final scope or the result of a future repair.",
        zh: "照片展示可见的屋顶部位、材料和作业细节，可帮助客户描述类似咨询。照片不能证明另一处房屋问题的原因、最终范围或未来维修结果。",
      },
    },
    {
      question: {
        en: "How are the photo groups connected to services?",
        zh: "照片组如何与服务页面关联？",
      },
      answer: {
        en: "Each group has direct links to the most relevant service pages and a service-selected enquiry link. The same relationship is available in reverse from the Home and service pages.",
        zh: "每个照片组都直接链接到最相关的服务页面，并提供已选服务的咨询入口；首页和服务页也可反向进入相应照片组。",
      },
    },
    {
      question: {
        en: "Can I send my own roof photos?",
        zh: "我可以发送自己的屋顶照片吗？",
      },
      answer: {
        en: "Yes, if they can be taken safely. Useful images may include a wider roof view, the visible issue and nearby components. Do not climb onto a roof to take photos for an enquiry.",
        zh: "可以，前提是能够安全拍摄。较有帮助的画面包括屋顶整体、可见问题和附近构件。请勿为了咨询而攀爬屋顶拍照。",
      },
    },
    {
      question: {
        en: "Why does each photo group include a limitation note?",
        zh: "为什么每组照片都包含局限说明？",
      },
      answer: {
        en: "The note separates what is genuinely visible from what still needs inspection. This helps keep the enquiry useful without turning an image into an unsupported diagnosis or promise.",
        zh: "说明用于区分照片中真正可见的内容和仍需检查的事项，让照片能够辅助咨询，同时避免把画面误当成无依据的诊断或承诺。",
      },
    },
  ],
  areas: [
    {
      question: {
        en: "Which Sydney suburbs are serviced?",
        zh: "服务覆盖悉尼哪些 suburb？",
      },
      answer: {
        en: "Service fit is confirmed from each enquiry rather than an unverified suburb list. Send the suburb or postcode, property type, access details and the roof issue so current availability can be checked.",
        zh: "承接范围根据每次咨询确认，而不是依赖未经核实的 suburb 清单。请提供 suburb 或邮编、房屋类型、通道情况和屋顶问题，以便核对当前可用性。",
      },
    },
    {
      question: {
        en: "Does a Sydney address guarantee availability?",
        zh: "位于悉尼是否就能保证可安排服务？",
      },
      answer: {
        en: "No. Availability also depends on the service required, access, property conditions and current scheduling. These details are confirmed before any scope is agreed.",
        zh: "不能。可用性还取决于所需服务、现场通道、房屋条件和当前排期，这些都会在约定工作范围前确认。",
      },
    },
    {
      question: {
        en: "Why is there no long suburb-page list?",
        zh: "为什么网站没有大量 suburb 页面？",
      },
      answer: {
        en: "A long list can imply guaranteed coverage that has not been confirmed. This site uses one clear Sydney enquiry path and asks for the actual location before making a service-fit statement.",
        zh: "大量清单可能造成未经确认的覆盖承诺。本网站使用清晰的悉尼咨询入口，并在说明是否适合承接前先获取实际地点。",
      },
    },
    {
      question: {
        en: "What location details are useful?",
        zh: "哪些地点信息有帮助？",
      },
      answer: {
        en: "A suburb or postcode is the starting point. Property height, roof access, parking or access constraints and whether the issue affects an occupied area may also be relevant.",
        zh: "suburb 或邮编是起点。房屋高度、屋顶通道、停车或进场限制，以及问题是否影响有人使用的区域，也可能有帮助。",
      },
    },
    {
      question: {
        en: "What if the property is outside the Sydney metro area?",
        zh: "如果房屋位于悉尼都会区以外怎么办？",
      },
      answer: {
        en: "Send the postcode and roof issue first. The site does not promise outer-region coverage; Ellis Services will confirm whether the location and work type are suitable before any next step is agreed.",
        zh: "请先提供邮编和屋顶问题。本网站不承诺外圈区域覆盖；Ellis Services 会在约定下一步前确认地点和工作类型是否适合承接。",
      },
    },
  ],
  about: [
    {
      question: {
        en: "What company is behind the Ellis Services brand?",
        zh: "Ellis Services 品牌对应的公司主体是什么？",
      },
      answer: {
        en: "ELLIS SERVICES GROUP PTY LTD is the legal entity shown for the Ellis Services brand. Its ABN is 96 645 821 745 and the Australian Business Register lists the ABN as active from 11 November 2020. The About page links directly to the official record.",
        zh: "Ellis Services 品牌所列法律主体为 ELLIS SERVICES GROUP PTY LTD，ABN 为 96 645 821 745。Australian Business Register 显示该 ABN 自 2020 年 11 月 11 日起为 Active；关于我们页面提供官方记录直达链接。",
      },
    },
    {
      question: {
        en: "Who receives enquiries from this website?",
        zh: "谁负责接收本网站的咨询？",
      },
      answer: {
        en: "Sydney roof repair enquiries are received under the Ellis Services brand. The website is designed to collect the roof issue, location and access details needed to confirm service fit and the next step.",
        zh: "悉尼屋顶维修咨询由 Ellis Services 品牌承接。网站用于收集屋顶问题、地点和通道信息，以确认是否适合承接及下一步。",
      },
    },
    {
      question: {
        en: "Is the listed address a walk-in office?",
        zh: "页面所列地址可以直接到访吗？",
      },
      answer: {
        en: "No walk-in or storefront availability is claimed. The address is shown as contact information only, and any visit, meeting or site arrangement must be confirmed first.",
        zh: "网站未声称该地址是可直接到访的办公室或门店。该地址仅作联系资料，任何到访、会面或现场安排都需要先确认。",
      },
    },
    {
      question: {
        en: "Why are qualifications and guarantees not broadly claimed?",
        zh: "为什么网站没有笼统声称资质和保证？",
      },
      answer: {
        en: "Public claims should match evidence available for the actual service and scope. Specific qualifications, warranties or guarantees are only appropriate when they can be verified and applied to the agreed work.",
        zh: "公开声称应与实际服务和工作范围的证据一致。具体资质、保修或保证只有在能够核实并适用于已约定工作时才适合使用。",
      },
    },
    {
      question: {
        en: "What happens before work is agreed?",
        zh: "约定工作前会先确认什么？",
      },
      answer: {
        en: "The visible issue, roof material, location, access, service fit and the next assessment step are clarified first. A final scope or price is not inferred from the website alone.",
        zh: "会先了解可见问题、屋顶材料、地点、通道、承接适配和下一步评估安排。最终范围或价格不会仅凭网站内容推断。",
      },
    },
  ],
  contact: [
    {
      question: {
        en: "How can I contact Ellis Services about a roof issue?",
        zh: "如何联系 Ellis Services 咨询屋顶问题？",
      },
      answer: {
        en: "You can call 0405 878 406, email ellisservicesgroup3@gmail.com or use the enquiry form. Include your suburb or postcode and a concise description of the visible issue.",
        zh: "您可以致电 0405 878 406、发送邮件至 ellisservicesgroup3@gmail.com，或使用咨询表单。请提供 suburb 或邮编以及对可见问题的简要说明。",
      },
    },
    {
      question: {
        en: "Is the online enquiry form already delivering messages?",
        zh: "在线咨询表单现在会自动投递消息吗？",
      },
      answer: {
        en: "Online delivery remains subject to the configured production provider. If delivery is unavailable, the form will not show a false success message; use the displayed phone or email instead.",
        zh: "在线投递取决于正式环境中配置的投递服务。如果暂不可用，表单不会显示虚假的成功提示；请改用页面所列电话或邮箱。",
      },
    },
    {
      question: {
        en: "Which photos should I attach or prepare?",
        zh: "应准备或发送哪些照片？",
      },
      answer: {
        en: "Only take photos from a safe location. A wider view, the visible symptom and nearby roof components can be useful. Do not climb onto the roof or enter an unsafe area to document the issue.",
        zh: "请只从安全位置拍摄。屋顶整体、可见症状和附近构件的画面通常较有帮助；不要为记录问题而攀爬屋顶或进入危险区域。",
      },
    },
    {
      question: {
        en: "What happens after I send an enquiry?",
        zh: "提交咨询后会进入什么流程？",
      },
      answer: {
        en: "The details are used to confirm whether the request fits the service, what information is still needed and the appropriate next step. A scope, booking or price is not created automatically by submission.",
        zh: "所提交的信息用于确认是否适合承接、还需要哪些资料以及合适的下一步。提交表单不会自动形成工作范围、预约或价格。",
      },
    },
  ],
} satisfies Record<string, FaqItem[]>;
