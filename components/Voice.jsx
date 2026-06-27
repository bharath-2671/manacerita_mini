"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import content from "@/data/content";
import { SectionHeader, GlassCard, Reveal } from "./primitives";
import { getSafeMediaSrc } from "@/lib/security";

function Waveform({ active }) {
  // stable base heights; jitter only while playing
  const base = useMemo(() => Array.from({ length: 34 }, () => 20 + Math.random() * 80), []);
  const [heights, setHeights] = useState(base);

  useEffect(() => {
    if (!active) {
      setHeights(base);
      return;
    }
    const id = setInterval(() => {
      setHeights(Array.from({ length: 34 }, () => 20 + Math.random() * 80));
    }, 140);
    return () => clearInterval(id);
  }, [active, base]);

  return (
    <div className="mt-[6px] flex h-[30px] items-center gap-[2.5px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-[3px] bg-lavender-deep"
          style={{ height: `${h}%`, opacity: 0.55, transition: "height 0.14s ease" }}
        />
      ))}
    </div>
  );
}

function VoiceCard({ note }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const safeAudioSrc = getSafeMediaSrc(note.audioSrc);

  useEffect(() => {
    if (safeAudioSrc) audioRef.current = new Audio(safeAudioSrc);
    return () => audioRef.current?.pause();
  }, [safeAudioSrc]);

  const toggle = () => {
    const next = !playing;
    setPlaying(next);
    if (audioRef.current) {
      if (next) {
        audioRef.current.play();
        audioRef.current.onended = () => setPlaying(false);
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <GlassCard className="flex items-center gap-4 p-[18px_20px]">
      <button
        onClick={toggle}
        aria-label={playing ? `Pause ${note.title}` : `Play ${note.title}`}
        className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-105"
        style={{
          background: "linear-gradient(135deg,var(--lavender-deep),var(--blush-deep))",
          boxShadow: "0 8px 18px -8px rgba(179,160,204,.7)",
        }}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <div className="font-display text-[18px] font-semibold text-ink">{note.title}</div>
        <Waveform active={playing} />
      </div>
      <div className="flex-none text-[12px] text-ink-faint">{note.duration}</div>
    </GlassCard>
  );
}

export default function Voice() {
  const { eyebrow, title, titleEm, notes } = content.voice;

  return (
    <section className="section-pad">
      <div className="wrap">
        <SectionHeader eyebrow={eyebrow} title={title} titleEm={titleEm} />
        <div className="mt-[32px] flex flex-col gap-4">
          {notes.map((note, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <VoiceCard note={note} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
