import assets from "@/data/assets";

/**
 * PatternDivider — a whisper-thin band of the floral line-art, faded at both
 * edges. Used between sections per the brief ("pattern only as dividers").
 */
export default function PatternDivider() {
  return (
    <div
      aria-hidden
      className="h-[90px]"
      style={{
        backgroundImage: `url(${assets.bgPattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.22,
        WebkitMaskImage: "linear-gradient(180deg, transparent, #000 35%, #000 65%, transparent)",
        maskImage: "linear-gradient(180deg, transparent, #000 35%, #000 65%, transparent)",
      }}
    />
  );
}
