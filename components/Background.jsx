"use client";

import assets from "@/data/assets";
import { useSmoothScroll } from "@/lib/SmoothScroll";

/**
 * Background — a SINGLE fixed stage with absolute image layers inside it.
 *
 * Why this structure: on mobile browsers (notably iOS Safari), applying a
 * transform to a position:fixed element makes it stop repainting while you
 * scroll, so the background appears to vanish. We therefore fix ONE wrapper,
 * never transform it, and keep the layers as plain absolute children. Content
 * scrolls in normal flow ABOVE this stage and stays clearly readable.
 *
 *  - floral pattern: shown on the first screen
 *  - watercolor: revealed after the envelope opening sequence (cross-fade)
 */
export default function Background() {
  const { revealed } = useSmoothScroll();

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-20 overflow-hidden"
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
    >
      {/* floral pattern (first screen) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ease-out"
        style={{ backgroundImage: `url(${assets.bgFloral})`, opacity: revealed ? 0 : 1 }}
      />
      {/* watercolor (revealed) — no transform, stays still and fully visible */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ease-out"
        style={{ backgroundImage: `url(${assets.bgMain})`, opacity: revealed ? 1 : 0 }}
      />
      {/* gentle legibility wash (kept light so the art stays visible) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[1400ms] ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(245,239,226,0) 0%, rgba(245,239,226,0.22) 55%, rgba(245,239,226,0.45) 100%)",
        }}
      />
    </div>
  );
}
