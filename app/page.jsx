"use client";

import SmoothScrollProvider from "@/lib/SmoothScroll";
import Background from "@/components/Background";
import FloatingBotanicals from "@/components/FloatingBotanicals";
import Hero from "@/components/Hero";
import Letter from "@/components/Letter";
import Music from "@/components/Music";
import Gallery from "@/components/Gallery";
import Voice from "@/components/Voice";
import Video from "@/components/Video";
import Final from "@/components/Final";
import PatternDivider from "@/components/PatternDivider";

export default function Page() {
  return (
    <SmoothScrollProvider>
      <Background />
      <FloatingBotanicals />

      <main className="relative">
        <Hero />
        <Letter />
        <PatternDivider />
        <Music />
        <Gallery />
        <PatternDivider />
        <Voice />
        <Video />
        <Final />
      </main>
    </SmoothScrollProvider>
  );
}
