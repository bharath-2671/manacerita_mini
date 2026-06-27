"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content";
import { SectionHeader, GlassCard, Reveal } from "./primitives";

function parseDur(d) {
  const [m, s] = d.split(":").map(Number);
  return m * 60 + s;
}
function fmt(s) {
  s = Math.floor(s);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ─── Security helper ─────────────────────────────────────────────────────────
// Only allow relative paths or blob: URLs as audio sources.
function isSafeAudioSrc(src) {
  if (!src || typeof src !== "string") return false;
  if (src.startsWith("/")) return true;
  if (src.startsWith("blob:")) return true;
  return false;
}

export default function Music() {
  const { eyebrow, title, titleEm, lead, track } = content.music;
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const durSec = parseDur(track.duration);

  const safeAudioSrc = isSafeAudioSrc(track.audioSrc) ? track.audioSrc : null;

  useEffect(() => {
    if (safeAudioSrc) audioRef.current = new Audio(safeAudioSrc);
    return () => {
      audioRef.current?.pause();
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    if (playing) {
      setPlaying(false);
      audioRef.current?.pause();
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
        timerRef.current = setInterval(() => {
          setElapsed(audioRef.current.currentTime);
          if (audioRef.current.ended) {
            setPlaying(false);
            clearInterval(timerRef.current);
          }
        }, 250);
      } else {
        // simulate playback when no audio file is provided
        timerRef.current = setInterval(() => {
          setElapsed((e) => {
            if (e >= durSec) {
              setPlaying(false);
              clearInterval(timerRef.current);
              return 0;
            }
            return e + 1;
          });
        }, 1000);
      }
    }
  };

  const pct = Math.min(100, (elapsed / durSec) * 100);

  return (
    <section className="section-pad">
      <div className="wrap">
        <SectionHeader eyebrow={eyebrow} title={title} titleEm={titleEm} lead={lead} />

        <Reveal delay={0.1} className="mt-[30px]">
          <GlassCard className="flex flex-col gap-[18px] p-[22px]">
            <div className="flex items-center gap-4">
              <div
                className="relative flex h-[76px] w-[76px] flex-none items-center justify-center overflow-hidden rounded-[16px]"
                style={{
                  background: "linear-gradient(135deg, var(--blush) 0%, var(--lavender) 55%, var(--sage) 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,.4), 0 10px 22px -10px rgba(90,74,63,.4)",
                }}
              >
                <span className="absolute h-[26px] w-[26px] rounded-full border-2 border-white/50" />
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.5" className="h-[34px] w-[34px]">
                  <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">Now playing</div>
                <div className="truncate font-display text-[24px] font-semibold leading-tight text-ink">
                  {track.title}
                </div>
                <div className="text-[13.5px] text-ink-soft">{track.artist}</div>
              </div>

              <button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full bg-ink text-cream transition-transform duration-300 hover:scale-105"
                style={{ boxShadow: "0 10px 22px -8px rgba(90,74,63,.6)" }}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            <div>
              <div className="h-[5px] overflow-hidden rounded-[6px] bg-ink/15">
                <div
                  className="h-full rounded-[6px] transition-[width] duration-200"
                  style={{
                    width: `${pct}%`,
                    background: "linear-gradient(90deg,var(--blush-deep),var(--lavender-deep))",
                  }}
                />
              </div>
              <div className="mt-[7px] flex items-center justify-between text-[11px] text-ink-faint">
                <span>{fmt(elapsed)}</span>
                <span className="flex h-[18px] items-end gap-[3px]" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-[2px] bg-blush-deep"
                      style={{
                        height: playing ? undefined : "30%",
                        animation: playing ? `eq 0.9s ease-in-out ${i * 0.12}s infinite` : "none",
                      }}
                    />
                  ))}
                </span>
                <span>{track.duration}</span>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
