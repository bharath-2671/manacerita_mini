"use client";

import content from "@/data/content";
import { Reveal } from "./primitives";

/**
 * Letter — the note paper sticks out of a drawn (CSS) envelope, always visible.
 * No envelope photo asset used here; the envelope is pure CSS.
 */
export default function Letter() {
  const { eyebrow, title, titleEm, salutation, paragraphs, sign } = content.letter;

  return (
    <section className="section-pad">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            {title} <em>{titleEm}</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-[34px]">
            {/* envelope body */}
            <div
              className="relative rounded-[20px] pt-[132px]"
              style={{
                background: "linear-gradient(160deg, #efe4cf 0%, #e7d9bf 100%)",
                boxShadow: "0 30px 60px -30px rgba(106,82,71,.5), inset 0 1px 0 rgba(255,255,255,.5)",
              }}
            >
              {/* note paper peeking out the top */}
              <div
                className="relative z-[2] -mt-[108px] mx-[18px] rounded-t-[14px] bg-white-warm"
                style={{
                  padding: "clamp(26px,6vw,44px) clamp(22px,5.5vw,40px) clamp(60px,12vw,90px)",
                  boxShadow: "0 -10px 30px -16px rgba(106,82,71,.3), 0 1px 0 rgba(0,0,0,.03)",
                }}
              >
                <p className="font-display font-semibold text-blush-deep" style={{ fontSize: "clamp(24px,6.5vw,32px)" }}>
                  {salutation}
                </p>
                <div className="mt-[14px] font-body font-medium text-ink" style={{ fontSize: "clamp(15.5px,4vw,18px)", lineHeight: 1.85 }}>
                  {paragraphs.map((p, i) => (
                    <p key={i} className="mb-[14px]">
                      {p}
                    </p>
                  ))}
                </div>
                <p className="mt-[18px] font-hand text-[30px] font-semibold text-gold-deep">
                  {sign} {content.fromName}
                </p>
              </div>

              {/* envelope front pocket (triangle flap) overlapping the note */}
              <div
                className="relative z-[3] -mt-[40px] rounded-b-[20px]"
                style={{
                  height: "clamp(120px, 30vw, 180px)",
                  background: "linear-gradient(160deg, #e7d9bf 0%, #ddcdb0 100%)",
                  clipPath: "polygon(0 38%, 50% 0, 100% 38%, 100% 100%, 0 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.4)",
                }}
              >
                {/* wax seal */}
                <div
                  className="absolute left-1/2 top-[54%] h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 38% 32%, #C97B57, #9E4F31 62%, #843c22)",
                    boxShadow: "inset 0 -4px 8px rgba(0,0,0,.25), 0 6px 12px -5px rgba(90,40,20,.5)",
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
