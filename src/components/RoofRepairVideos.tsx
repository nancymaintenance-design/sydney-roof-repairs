import type { Locale } from "@/data/content";

export function RoofRepairVideos({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const clips = [
    {
      id: "metal-roof-junction-video",
      file: "metal-roof-junction",
      title: zh ? "金属屋顶接缝局部处理" : "Local treatment at a metal roof junction",
      text: zh
        ? "片段展示金属屋顶交接处的局部涂覆处理。这类维修应结合接缝、固定点及周边屋面状况评估；需要更换的材料，也应在报价时说明。"
        : "This clip shows local coating work at a metal roof junction. The repair scope should account for the joint, fixings and surrounding roof condition, with any material replacement explained in the quote.",
    },
    {
      id: "tile-ridge-valley-video",
      file: "tile-ridge-valley",
      title: zh ? "瓦屋顶屋脊与天沟细节" : "Tile roof ridge and valley details",
      text: zh
        ? "片段记录瓦屋顶屋脊、交接位置及局部修补的可见细节。评估时应区分适合修补的部位、损坏瓦片及需要进一步检查的基层，按实际状况比较维修和更换方案。"
        : "This footage records visible ridge, junction and local repair details on a tiled roof. An assessment should distinguish repairable areas, damaged tiles and underlying conditions that need checking, so repair and replacement options reflect the actual roof.",
    },
  ];

  return (
    <section id="roof-repair-videos" className="card scroll-mt-32 p-7 md:p-10">
      <p className="eyebrow">{zh ? "屋顶维修片段" : "ROOF REPAIR FOOTAGE"}</p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight">
        {zh ? "从画面了解不同的局部维修" : "See different local repair approaches"}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
        {zh
          ? "以下为另外的维修片段，与上方商用金属屋顶照片分开展示。适合修补还是需要换新，应依据现场检查、材料状况与预算决定。"
          : "These additional repair clips are presented separately from the commercial metal-roof photographs above. Inspection, material condition and budget determine whether a local repair or replacement is appropriate."}
      </p>
      <div className="mt-8 grid gap-7 md:grid-cols-2">
        {clips.map((clip) => (
          <figure
            id={clip.id}
            key={clip.id}
            className="scroll-mt-32 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <video
              controls
              playsInline
              preload="metadata"
              aria-label={clip.title}
              className="aspect-[3/4] max-h-[600px] w-full bg-black object-contain"
              src={`/videos/${clip.file}-${zh ? "zh" : "en"}.mp4`}
            />
            <figcaption className="p-5">
              <h3 className="text-lg font-bold">{clip.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{clip.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
