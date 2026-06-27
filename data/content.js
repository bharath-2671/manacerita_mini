// =============================================================
//  ✏️  EDIT THIS FILE TO MAKE A NEW GIFT
//  Change the text, and swap the placeholder media paths
//  (put your files in /public/assets/ and point to them here).
//  Every section reads from this object — no component edits needed.
// =============================================================

const content = {
  // Who it's from / to
  fromName: "Your Name",
  toName: "Their Name",

  // Hero (first screen)
  hero: {
    kicker: "a little something, just for you",
    names: "for Their Name, with all my heart",
    tapHint: "tap to open",
  },

  // Letter (shown inside a drawn envelope)
  letter: {
    eyebrow: "A letter",
    title: "Read this",
    titleEm: "slowly.",
    salutation: "My love,",
    paragraphs: [
      "I started writing this a dozen times and kept stopping, because no arrangement of words felt big enough. So I'll just say the true thing plainly: being far from you has only made it clearer how much closer I want to be.",
      "You are the first good thought in my morning and the one I fall asleep mid-sentence about. Distance measures miles. It has never once measured this.",
      "So here is a little world I built for you — songs, photos, a few things I'd rather say out loud. Stay a while in it.",
    ],
    sign: "Always yours,",
  },

  // Music (Spotify-style). audioSrc optional — leave "" for a silent demo.
  music: {
    eyebrow: "Our song",
    title: "The one that's",
    titleEm: "ours.",
    lead: "Press play. I picked this because it sounds like how I feel about you.",
    track: {
      title: "Our Song",
      artist: "Artist Name",
      duration: "3:42",
      audioSrc: "", // e.g. "/assets/our-song.mp3"
    },
  },

  // Gallery — zigzag. Set `img` to a photo path, or leave "" for a placeholder.
  gallery: {
    eyebrow: "Moments",
    title: "Us,",
    titleEm: "collected.",
    lead: "A little wall of the times I keep coming back to.",
    photos: [
      { img: "", caption: "that morning" },
      { img: "", caption: "your laugh" },
      { img: "", caption: "the long drive" },
      { img: "", caption: "rooftop, 2am" },
      { img: "", caption: "just because" },
    ],
  },

  // Voice notes — audioSrc optional.
  voice: {
    eyebrow: "In my voice",
    title: "Things I'd rather",
    titleEm: "say out loud.",
    notes: [
      { title: "Good morning", duration: "0:42", audioSrc: "" },
      { title: "A song stuck in my head", duration: "1:18", audioSrc: "" },
      { title: "Read this when you miss me", duration: "2:05", audioSrc: "" },
    ],
  },

  // Videos — thumb (poster) + videoSrc optional.
  video: {
    eyebrow: "On screen",
    title: "Press play on",
    titleEm: "these.",
    clips: [
      { label: "Our last call", thumb: "", videoSrc: "" },
      { label: "That silly dance", thumb: "", videoSrc: "" },
    ],
  },

  // Final
  final: {
    message: "Wherever you are,",
    messageEm: "you're home to me.",
    sub: "Until the miles between us are gone, keep this somewhere close.",
    cta: "Read it again",
    ps: "p.s. — i love you. that's the whole point.",
  },
};

export default content;
