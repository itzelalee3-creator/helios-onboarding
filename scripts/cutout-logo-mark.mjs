import sharp from "sharp";

const SRC = "helios aerodesign logo.jpg";
const OUT = "public/images/logo-mark.png";

// Crop just the emblem (circle + wings), excluding the wordmark text below it.
const crop = { left: 50, top: 2, width: 348, height: 232 };

const { data, info } = await sharp(SRC)
  .extract(crop)
  .raw()
  .ensureAlpha()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const brightness = Math.max(r, g, b);
  if (brightness <= 18) {
    data[i + 3] = 0;
  } else if (brightness <= 46) {
    const t = (brightness - 18) / (46 - 18);
    data[i + 3] = Math.round(255 * t);
  }
}

await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT);
const outMeta = await sharp(OUT).metadata();
console.log("wrote", OUT, outMeta.width, outMeta.height);
