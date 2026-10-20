export function ClarityPrivacy({ locale }: { locale: "en" | "zh" }) {
  const zh = locale === "zh";
  return (
    <section data-clarity-notice>
      <h2>{zh ? "可自行选择的 Microsoft Clarity 分析" : "Optional Microsoft Clarity analytics"}</h2>
      <p>
        {zh
          ? "只有你允许后，Microsoft Clarity 才会记录遮罩后的页面阅读、滚动与点击，制作热图和会话录像，并可能处理设备、连接与第一方分析标识符。页面文字会遮罩；联系、确认及员工页，以及网址包含查询参数或井号的浏览不会录制。"
          : "Only with your permission, Microsoft Clarity records masked page reading, scrolling and clicks for heatmaps and session recordings, and may process device, connection and first-party analytics identifiers. Page text is masked. Contact, confirmation and staff pages, and visits containing query strings or fragments, are excluded."}
      </p>
      <p>
        {zh
          ? "开始操作表单或可编辑字段时即停止录像，不录制表单内容与未发送的草稿。你可在页面底部的 Clarity 分析偏好随时关闭它；拒绝不影响浏览或使用网站。我们尊重浏览器的停止追踪信号。这个偏好只控制 Clarity。"
          : "Recording stops when you begin using a form or editable field. Form content and unsent drafts are excluded. Use Clarity preferences at the foot of the page to turn it off at any time; refusing does not affect browsing or using the website. We respect browser no-tracking signals. This preference controls Clarity only."}
      </p>
      <p>
        {zh
          ? "Microsoft 可能在澳大利亚以外处理分析数据。撤回允许会停止后续记录，并清除此网站的 Clarity Cookies；不会自动删除已有记录。"
          : "Microsoft may process analytics data outside Australia. Withdrawing permission stops future recording and clears this website’s Clarity cookies; it does not automatically delete earlier records."}
      </p>
      <p>
        <a href="https://privacy.microsoft.com/privacystatement">
          {zh ? "Microsoft 隐私声明" : "Microsoft Privacy Statement"}
        </a>
      </p>
    </section>
  );
}
