// Central asset registry. Swap these files in /public/assets/ to re-skin.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const assets = {
  bgFloral: `${basePath}/assets/bg-floral-soft.jpg`, // first-screen line-art pattern
  bgMain: `${basePath}/assets/bg-main.jpg`,          // dreamy watercolor (after opening)
  bgPattern: `${basePath}/assets/bg-pattern.jpg`,    // line-art used in section dividers
  envelopeClosed: `${basePath}/assets/envelope_closed.jpg`,
  flowers: [
    `${basePath}/assets/flower_pink.png`,
    `${basePath}/assets/flower_white.png`,
    `${basePath}/assets/flower_yellow.png`,
  ],
};

export default assets;
