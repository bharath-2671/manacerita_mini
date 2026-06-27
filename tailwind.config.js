/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EFE2",
        "cream-deep": "#EDE3D0",
        blush: "#E7C4C4",
        "blush-deep": "#D9A7AE",
        lavender: "#CBBCDD",
        "lavender-deep": "#B3A0CC",
        sage: "#A9BBA4",
        gold: "#C2A878",
        "gold-deep": "#A98B5B",
        ink: "#5A4A3F",
        "ink-soft": "#7C6A5C",
        "ink-faint": "#9C8B7C",
        "white-warm": "#FFFDF8",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        body: ["var(--font-quicksand)", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      borderRadius: {
        sm: "18px",
        md: "24px",
        lg: "32px",
      },
      boxShadow: {
        glass: "0 24px 60px -28px rgba(90,74,63,0.40), 0 6px 18px -12px rgba(90,74,63,0.18)",
        "glass-lift": "0 36px 70px -30px rgba(90,74,63,0.5), 0 10px 24px -14px rgba(90,74,63,0.22)",
        photo: "0 18px 36px -20px rgba(90,74,63,.5), 0 4px 10px -6px rgba(90,74,63,.2)",
      },
      maxWidth: {
        read: "620px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        breathe: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-7px) rotate(-0.6deg)" },
        },
        pulse: {
          "0%,100%": { transform: "scale(1)", opacity: ".55" },
          "50%": { transform: "scale(1.5)", opacity: "1" },
        },
        wheel: {
          "0%": { opacity: "0", transform: "translate(-50%,0)" },
          "30%": { opacity: "1" },
          "60%": { opacity: "0", transform: "translate(-50%,8px)" },
          "100%": { opacity: "0" },
        },
        eq: {
          "0%,100%": { height: "25%" },
          "50%": { height: "95%" },
        },
      },
      animation: {
        breathe: "breathe 5.5s cubic-bezier(0.22,1,0.36,1) infinite",
        pulse: "pulse 2.2s ease-in-out infinite",
        wheel: "wheel 1.8s ease-in-out infinite",
        eq: "eq 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
