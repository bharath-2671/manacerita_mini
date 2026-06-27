"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — fades + lifts + un-blurs its children when scrolled into view.
 * The signature entrance motion used across every section.
 */
export function Reveal({ children, delay = 0, y = 34, className = "", style, once = true }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionHeader — the eyebrow label + display title with an emphasized word.
 */
export function SectionHeader({ eyebrow, title, titleEm, lead }) {
  return (
    <header>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="section-title">
          {title} {titleEm && <em>{titleEm}</em>}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="section-lead">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}

/**
 * GlassCard — frosted card with a soft top sheen and an optional hover-lift.
 */
export function GlassCard({ children, className = "", lift = true, ...rest }) {
  const reduced = useReducedMotion();
  const Comp = lift && !reduced ? motion.div : "div";
  const motionProps =
    lift && !reduced
      ? {
          whileHover: { y: -6, boxShadow: "0 36px 70px -30px rgba(90,74,63,0.5), 0 10px 24px -14px rgba(90,74,63,0.22)" },
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        }
      : {};
  return (
    <Comp className={`glass ${className}`} {...motionProps} {...rest}>
      {children}
    </Comp>
  );
}
