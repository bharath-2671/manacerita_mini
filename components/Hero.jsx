"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import content from "@/data/content";
import assets from "@/data/assets";
import { useSmoothScroll } from "@/lib/SmoothScroll";

// One big flower in the burst: explodes outward to fill the screen, then falls.
function BurstFlower({ index, total, origin, src }) {
  const cfg = useMemo(() => {
    const angle = (index / total) * Math.PI * 2 + Math.random() * 0.5;
    const reach = 0.35 + Math.random() * 0.65;
    const size = 90 + Math.random() * 150; // BIG
    const tx = Math.cos(angle) * (typeof window !== "undefined" ? window.innerWidth : 400) * reach;
    const ty = Math.sin(angle) * (typeof window !== "undefined" ? window.innerHeight : 800) * reach;
    const fallY = (typeof window !== "undefined" ? window.innerHeight : 800) + 300;
    return { size, tx, ty, fallY, rot1: Math.random() * 120 - 60, rotFall: Math.random() * 220 - 110, fallDur: 1.6 + Math.random() * 0.9, fallDelay: Math.random() * 0.4 };
  }, [index, total]);

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      className="fixed z-[45] pointer-events-none"
      style={{ width: cfg.size, left: origin.x - cfg.size / 2, top: origin.y - cfg.size / 2, filter: "drop-shadow(0 12px 22px rgba(106,82,71,0.18))" }}
      initial={{ opacity: 0, scale: 0.2, x: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 1, 0],
        scale: [0.2, 1, 1, 1, 0.9],
        x: [0, cfg.tx, cfg.tx, cfg.tx + (Math.random() * 120 - 60), cfg.tx + (Math.random() * 120 - 60)],
        y: [0, cfg.ty, cfg.ty, cfg.ty + cfg.fallY * 0.5, cfg.ty + cfg.fallY],
        rotate: [0, cfg.rot1, cfg.rot1, cfg.rot1 + cfg.rotFall * 0.5, cfg.rot1 + cfg.rotFall],
      }}
      transition={{
        duration: 0.9 + 0.55 + cfg.fallDur,
        times: [0, 0.34, 0.55, 0.78, 1],
        ease: "easeInOut",
        delay: index * 0.012,
      }}
    />
  );
}

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const { unlock, reveal } = useSmoothScroll();
  const reduced = useReducedMotion();
  const total = typeof window !== "undefined" && window.innerWidth < 600 ? 26 : 38;

  const handleOpen = useCallback(
    (e) => {
      if (open) return;
      setOpen(true);

      if (reduced) {
        reveal();
        unlock();
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.5 });

      // flap lifts (CSS), then burst begins
      setTimeout(() => setBursting(true), 520);
      // swap background mid-burst
      setTimeout(() => reveal(), 1270);
      // unlock once flowers have fallen
      setTimeout(() => unlock(), 3400);
    },
    [open, reduced, reveal, unlock]
  );

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen(e);
    }
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-[22px] py-10 text-center">
      <AnimatePresence>
        {!open && (
          <>
            <motion.p
              key="kicker"
              className="font-hand text-[26px] font-semibold text-gold-deep"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.hero.kicker}
            </motion.p>
            <motion.p
              key="names"
              className="mt-1 font-display font-semibold text-ink"
              style={{ fontSize: "clamp(24px,6.5vw,34px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.hero.names}
            </motion.p>
          </>
        )}
      </AnimatePresence>

      {/* Envelope */}
      <AnimatePresence>
        {!(open && !reduced && bursting) && (
          <motion.div
            key="envelope"
            role="button"
            tabIndex={0}
            aria-label="Open your letter"
            onClick={handleOpen}
            onKeyDown={onKey}
            className="relative mx-auto mb-[10px] mt-8 cursor-pointer select-none"
            style={{ width: "min(78vw, 320px)", aspectRatio: "677 / 550", WebkitTapHighlightColor: "transparent" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 10, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 1.1, delay: open ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              animate={open || reduced ? {} : { y: [0, -7, 0], rotate: [0, -0.6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={assets.envelopeClosed}
                alt="A sealed letter"
                className="absolute inset-0 h-full w-full rounded-[14px] object-contain transition-transform duration-700"
                style={{ filter: "drop-shadow(0 26px 40px rgba(106,82,71,0.32))", transform: open ? "scale(.96)" : "none" }}
              />
              {/* lifting flap */}
              <div
                aria-hidden
                className="absolute transition-transform duration-700 ease-out"
                style={{
                  left: "6%",
                  right: "6%",
                  top: "4%",
                  height: "52%",
                  transformOrigin: "top center",
                  transform: open ? "rotateX(165deg)" : "rotateX(0deg)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, #e9dcc2, #ddcdac)",
                  borderRadius: "12px 12px 0 0",
                  opacity: open ? 1 : 0,
                  boxShadow: "0 8px 14px -6px rgba(0,0,0,.18)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap hint */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="inline-flex items-center gap-[9px] font-body text-[12px] font-bold uppercase text-ink-faint"
            style={{ letterSpacing: "0.18em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-blush-deep animate-pulse" />
            {content.hero.tapHint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll cue */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-[26px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-bold uppercase text-ink-faint"
            style={{ letterSpacing: "0.26em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <span>scroll</span>
            <span className="relative h-[34px] w-[22px] rounded-[12px] border-2 border-ink-faint">
              <span className="absolute left-1/2 top-[6px] h-[7px] w-[3px] -translate-x-1/2 rounded-[2px] bg-ink-faint animate-wheel" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flower burst */}
      {bursting &&
        Array.from({ length: total }, (_, i) => (
          <BurstFlower key={i} index={i} total={total} origin={origin} src={assets.flowers[i % assets.flowers.length]} />
        ))}
    </section>
  );
}
