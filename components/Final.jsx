"use client";

import content from "@/data/content";
import assets from "@/data/assets";
import { Reveal } from "./primitives";
import { motion, useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "@/lib/SmoothScroll";

const FLOWER_SPECS = [
  { srcIndex: 1, x: -128, rot: -16, w: 62, delay: 0 },
  { srcIndex: 0, x: -66, rot: -7, w: 76, delay: 0.1 },
  { srcIndex: 2, x: 0, rot: 0, w: 84, delay: 0.2 },
  { srcIndex: 1, x: 66, rot: 7, w: 76, delay: 0.3 },
  { srcIndex: 0, x: 128, rot: 16, w: 62, delay: 0.4 },
];

export default function Final() {
  const { message, messageEm, sub, cta, ps } = content.final;
  const reduced = useReducedMotion();
  const { lenis } = useSmoothScroll();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 2.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative pb-[clamp(70px,14vw,120px)] pt-[clamp(80px,18vw,160px)] text-center">
      <div className="wrap">
        {/* blooming garland */}
        <div className="relative mb-2 h-[120px]">
          {FLOWER_SPECS.map((s, i) => (
            <motion.img
              key={i}
              src={assets.flowers[s.srcIndex]}
              alt=""
              aria-hidden
              className="absolute left-1/2 top-0"
              style={{ width: s.w, marginLeft: s.x - s.w / 2 }}
              initial={reduced ? { opacity: 1, rotate: s.rot } : { opacity: 0, scale: 0.2, y: 30, rotate: s.rot - 30 }}
              whileInView={reduced ? {} : { opacity: 1, scale: 1, y: 0, rotate: s.rot }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1.1, delay: s.delay, ease: [0.34, 1.56, 0.64, 1] }}
            />
          ))}
        </div>

        <Reveal>
          <p
            className="mx-auto font-display text-ink"
            style={{ fontStyle: "italic", fontWeight: 500, fontSize: "clamp(28px,8vw,46px)", lineHeight: 1.18, maxWidth: "16ch" }}
          >
            {message} <em className="text-blush-deep" style={{ fontStyle: "italic" }}>{messageEm}</em>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-[34ch] text-[14px] text-ink-soft">{sub}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            onClick={toTop}
            className="mt-8 inline-flex items-center gap-[11px] rounded-full bg-ink px-[30px] py-4 font-body text-[15px] font-medium text-cream transition-transform duration-300 hover:-translate-y-[3px]"
            style={{ boxShadow: "0 16px 34px -14px rgba(90,74,63,.7)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[17px] w-[17px]">
              <path d="M12 21s-7-4.5-9.5-9A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" strokeLinejoin="round" />
            </svg>
            {cta}
          </button>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-[46px] font-hand text-[20px] text-gold-deep opacity-90">{ps}</p>
        </Reveal>
      </div>
    </section>
  );
}
