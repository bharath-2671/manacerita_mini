# A Letter For You — Next.js edition 💌

A premium, mobile-first interactive digital love letter, built as a clean,
reusable **Next.js 14 + Tailwind + Framer Motion** app. Make a brand-new gift
by editing one content file and dropping in your own photos, songs, and videos
— no component changes needed.

This is the **production version**. If you just want to open something right
now without a build step, use the standalone HTML version instead.

---

## 🚀 Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

To build for production:

```bash
npm run build
npm run start
```

Deploy anywhere that runs Next.js — **Vercel** is one command (`npx vercel`)
and is the easiest way to get a shareable link for your phone.

---

## ✏️ Make it yours — edit ONE file

Everything the page says lives in **`data/content.js`**. Open it, change the
text, save. That's the whole customization surface.

```js
const content = {
  fromName: "Your Name",
  toName: "Their Name",
  hero: { kicker: "...", names: "...", tapHint: "tap to open" },
  letter: { salutation: "My love,", paragraphs: [ ... ], sign: "Always yours," },
  music: { track: { title, artist, duration, audioSrc } },
  gallery: { photos: [ { img, caption }, ... ] },
  timeline: { items: [ { date, title, text }, ... ] },
  voice: { notes: [ { title, duration, audioSrc }, ... ] },
  video: { clips: [ { label, thumb, videoSrc }, ... ] },
  reasons: { items: [ { title, text }, ... ] },
  final: { message, messageEm, sub, cta, ps },
};
```

Each section title has a normal part and an emphasized part (`title` +
`titleEm`) — the emphasized word renders in italic blush.

### Add your own media

Drop files into **`public/assets/`** and point to them in `content.js`:

| What            | Field                      | Example                       |
|-----------------|----------------------------|-------------------------------|
| Song            | `music.track.audioSrc`     | `"/assets/our-song.mp3"`      |
| Photos          | `gallery.photos[n].img`    | `"/assets/photo1.jpg"`        |
| Voice notes     | `voice.notes[n].audioSrc`  | `"/assets/voice1.m4a"`        |
| Video thumbnail | `video.clips[n].thumb`     | `"/assets/clip1.jpg"`         |
| Video file      | `video.clips[n].videoSrc`  | `"/assets/clip1.mp4"`         |

Leave any media field as `""` to keep the elegant placeholder. The music player
and voice notes still animate without audio (they simulate playback), and video
cards show a styled poster until a real file is added. When a `videoSrc` is set,
the card plays the clip inline on tap.

### Re-skin the whole thing

Swap the files referenced in **`data/assets.js`** (they live in
`public/assets/`):

- `bg-main.jpg` — the watercolor backdrop
- `flower_pink/white/yellow.png` — floating + garland flowers
- `envelope_closed/open.jpg` — the envelope animation frames
- `bg-pattern.jpg` — the line-art used in section dividers

Colors, fonts, radii, and shadows are design tokens in
**`tailwind.config.js`** and **`app/globals.css`** — change them once, applied
everywhere.

---

## 🧱 Architecture

```
app/
  layout.jsx          root layout + font links + metadata
  page.jsx            assembles all sections inside the providers
  globals.css         design tokens + component classes (.glass, .eyebrow…)
components/
  Background.jsx          parallax watercolor backdrop
  FloatingBotanicals.jsx  slow ambient flowers + sparkles
  primitives.jsx          Reveal, SectionHeader, GlassCard (reused everywhere)
  Hero.jsx                opening envelope + petal burst + scroll unlock
  Letter.jsx              the personal letter
  Music.jsx               Spotify-style player
  Gallery.jsx             scrapbook photo wall
  Timeline.jsx            story timeline
  Voice.jsx               voice-note cards w/ animated waveforms
  Video.jsx               video memory cards
  Reasons.jsx             "reasons I love you" cards
  Final.jsx               blooming garland + CTA
  PatternDivider.jsx      faded floral divider band
lib/
  SmoothScroll.jsx    Lenis provider + lock/unlock (keeps the page on the
                      hero until the envelope is opened)
data/
  content.js          ← the file you edit
  assets.js           asset path registry
public/assets/        all images + media
```

**Why it's reusable:** every component reads from `content.js` and
`assets.js`. The visual building blocks (`Reveal`, `SectionHeader`,
`GlassCard`) are shared, so a new gift = new content + new assets, and the
section order is a simple list in `app/page.jsx`.

---

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` — animations are skipped, the envelope and
  all content show immediately, and scroll is never locked for those users.
- Keyboard support: Tab to the envelope, Enter/Space to open.
- Lazy-loaded gallery images; lean ~141 kB First Load JS.
- Mobile-first; scales up to tablet/desktop.

## Notes on `<img>` vs `next/image`

Components use plain `<img>` on purpose so the project also works as a static
export and when re-skinning with arbitrary asset paths. If you'd rather use
`next/image` for automatic optimization, swap them in `Hero.jsx`, `Gallery.jsx`,
`FloatingBotanicals.jsx`, and `Final.jsx`.
