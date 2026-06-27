"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import assets from "@/data/assets";
import { useSmoothScroll } from "@/lib/SmoothScroll";

/**
 * FloatingBotanicals — a few slow-drifting flowers and soft golden motes,
 * biased toward the page margins. Only appears once the watercolor world is
 * revealed (after the envelope opening sequence).
 */
export default function FloatingBotanicals() {
  const reduced = useReducedMotion();
  const { revealed } = useSmoothScroll();

  const flowers = useMemo(() => {
    const count = 6;
    return Array.from({ length: count }, (_, i) => {
      const leftSide = Math.random() < 0.5;
      return {
        src: assets.flowers[i % assets.flowers.length],
        size: 40 + Math.random() * 70,
        left: leftSide ? Math.random() * 22 : 78 + Math.random() * 22,
        top: Math.random() * 240,
        opacity: 0.07 + Math.random() * 0.1,
        dur: 30 + Math.random() * 28,
        dx: Math.random() * 40 - 20,
        dy: Math.random() * 50 - 25,
        rot: Math.random() * 24 - 12,
      };
    });
  }, []);

  const sparkles = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 240,
      dur: 1.8 + Math.random() * 2,
      delay: Math.random() * 4,
      maxOpacity: 0.7 * Math.random() + 0.15,
    }));
  }, []);

  if (reduced || !revealed) return null;

  return (
    <div aria-hidden className="pointer-events-none">
      {flowers.map((f, i) => (
        <motion.img
          key={`f${i}`}
          src={f.src}
          alt=""
          className="fixed -z-10 will-change-transform"
          style={{
            width: f.size,
            left: `${f.left}vw`,
            top: `${f.top}vh`,
            opacity: f.opacity,
            filter: "drop-shadow(0 10px 18px rgba(90,74,63,0.10))",
          }}
          animate={{ x: [0, f.dx, 0], y: [0, f.dy, 0], rotate: [0, f.rot, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {sparkles.map((s, i) => (
        <motion.div
          key={`s${i}`}
          className="fixed -z-10 rounded-full"
          style={{
            left: `${s.left}vw`,
            top: `${s.top}vh`,
            width: 6,
            height: 6,
            background:
              "radial-gradient(circle, rgba(255,250,235,0.95), rgba(194,168,120,0) 70%)",
            boxShadow: "0 0 8px 2px rgba(194,168,120,0.35)",
          }}
          animate={{ opacity: [0, s.maxOpacity, 0], y: [0, 16, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
    </div>
  );
}
