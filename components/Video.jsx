"use client";

import { useState } from "react";
import content from "@/data/content";
import { SectionHeader, Reveal } from "./primitives";
import { motion, useReducedMotion } from "framer-motion";
import { getSafeMediaSrc } from "@/lib/security";

function VideoCard({ clip }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  const safeThumb = getSafeMediaSrc(clip.thumb);
  const safeVideoSrc = getSafeMediaSrc(clip.videoSrc);

  // If a real video file is provided, play it inline on click.
  if (safeVideoSrc && active) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={safeVideoSrc} controls autoPlay className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <motion.div
      className="relative aspect-[16/10] cursor-pointer overflow-hidden rounded-lg"
      onClick={() => safeVideoSrc && setActive(true)}
      whileHover={reduced ? {} : { y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0"
        style={
          safeThumb
            ? { backgroundImage: `url(${safeThumb})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: "linear-gradient(135deg,var(--sage),var(--lavender) 70%, var(--blush))" }
        }
      />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0) 30%, rgba(90,74,63,.22))" }} />
      <div
        className="absolute left-1/2 top-1/2 z-[2] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
        style={{ background: "rgba(255,253,248,.85)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", boxShadow: "0 12px 30px -10px rgba(90,74,63,.5)" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-[3px] h-6 w-6 text-ink">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-[18px] z-[2] font-display text-[20px] font-semibold text-white-warm" style={{ textShadow: "0 2px 10px rgba(0,0,0,.3)" }}>
        {clip.label}
      </div>
    </motion.div>
  );
}

export default function Video() {
  const { eyebrow, title, titleEm, clips } = content.video;

  return (
    <section className="section-pad">
      <div className="wrap">
        <SectionHeader eyebrow={eyebrow} title={title} titleEm={titleEm} />
        <div className="mt-[32px] flex flex-col gap-5">
          {clips.map((clip, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <VideoCard clip={clip} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
