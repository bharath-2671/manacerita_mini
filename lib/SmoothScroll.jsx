"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

// Shared Lenis instance + lock/unlock + a global "revealed" flag (used to
// cross-fade the background once the envelope opening sequence finishes).
const ScrollContext = createContext({
  lenis: null,
  unlock: () => {},
  locked: true,
  revealed: false,
  reveal: () => {},
});

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const [locked, setLocked] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setLocked(false);
      setRevealed(true); // reduced-motion: skip straight to the revealed world
      document.body.style.overflow = "";
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });
    lenisRef.current = lenis;
    lenis.stop();

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const unlock = () => {
    setLocked(false);
    document.body.style.overflow = "";
    lenisRef.current?.start();
  };

  const reveal = () => setRevealed(true);

  useEffect(() => {
    if (prefersReduced) return;
    document.body.style.overflow = locked ? "hidden" : "";
  }, [locked, prefersReduced]);

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, unlock, locked, revealed, reveal }}>
      {children}
    </ScrollContext.Provider>
  );
}
