"use client";

import content from "@/data/content";
import { SectionHeader, Reveal } from "./primitives";
import { motion, useReducedMotion } from "framer-motion";

// ─── Security helper ────────────────────────────────────────────────────────
// Only allow relative paths (/...) as image sources — blocks javascript: etc.
function isSafeImgSrc(src) {
  if (!src || typeof src !== "string") return false;
  if (src.startsWith("/")) return true;
  if (src.startsWith("blob:")) return true;
  return false;
}

// Per-photo layout: alternating side, rotation, width and frame ratio → zigzag.
function layoutFor(i) {
  const odd = i % 2 === 0;
  let width = "72%";
  if (i % 3 === 0) width = "64%";
  else if (i % 3 === 1) width = "78%";
  return {
    align: odd ? "flex-start" : "flex-end",
    rotate: odd ? -2.6 : 2.4,
    width,
    ratio: odd ? "4 / 5" : "5 / 4",
    tapeRotate: odd ? -3 : 4,
    tapeBg: odd ? "rgba(203,188,221,.45)" : "rgba(231,196,196,.5)",
  };
}

function PhotoFrame({ photo, index }) {
  const reduced = useReducedMotion();
  const L = layoutFor(index);

  return (
    <motion.figure
      className="relative rounded-[10px] bg-white-warm px-3 pb-[42px] pt-3 shadow-photo"
      style={{ rotate: `${L.rotate}deg` }}
      whileHover={reduced ? {} : { rotate: 0, y: -6, scale: 1.02, zIndex: 3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="absolute -top-[9px] left-1/2 h-[22px] w-[64px] -translate-x-1/2 border border-white/40"
        style={{ background: L.tapeBg, transform: `translateX(-50%) rotate(${L.tapeRotate}deg)`, boxShadow: "0 2px 6px rgba(106,82,71,.12)" }}
      />
      <div
        className="flex items-center justify-center overflow-hidden rounded-[6px] text-ink-faint"
        style={{ aspectRatio: L.ratio, background: "linear-gradient(135deg, var(--cream-deep), var(--blush) 120%)" }}
      >
        {isSafeImgSrc(photo.img) ? (
          <img src={photo.img} alt={photo.caption} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-[38px] w-[38px] opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="9" cy="9" r="2" />
            <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <figcaption className="absolute bottom-3 left-0 right-0 text-center font-hand text-[20px] font-semibold text-ink-soft">
        {photo.caption}
      </figcaption>
    </motion.figure>
  );
}

export default function Gallery() {
  const { eyebrow, title, titleEm, lead, photos } = content.gallery;

  return (
    <section className="section-pad">
      <div className="wrap">
        <SectionHeader eyebrow={eyebrow} title={title} titleEm={titleEm} lead={lead} />
        <div className="mt-9 flex flex-col gap-[30px]">
          {photos.map((photo, i) => {
            const L = layoutFor(i);
            return (
              <Reveal key={i} delay={(i % 2) * 0.05} style={{ alignSelf: L.align, width: L.width }}>
                <PhotoFrame photo={photo} index={i} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
