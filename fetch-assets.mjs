// Downloads every image/video used by the original Framer site into public/media.
// Files that already exist are skipped, so after the first run (and a commit) the
// site no longer depends on Framer's CDN at all.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "media");
mkdirSync(outDir, { recursive: true });

const CDN = "https://framerusercontent.com";
// [local file name, remote path]
const ASSETS = [
  ["logo.png", "/images/2x1iGKbZu9Mpekhn9c4IrsIdA.png?scale-down-to=512"],
  ["hero.mp4", "/assets/UNeHM2ywmQY25Fugs9oOTwPixa4.mp4"],
  ["cta.mp4", "/assets/KTAAPBAgtUUisqNeh39FAKQ.mp4"],
  ["about-1.jpg", "/images/hwyH2f2NmsFZVmDsrFWAjMHizTs.jpg?scale-down-to=1024"],
  ["about-2.png", "/images/ZlkaAK4wEc8rGMTVXV5Gj4Z3E.png?scale-down-to=1024"],
  ["product-predictax.jpg", "/images/8nlE5Aui2cIlIa1r0aTwgW9xD8.jpg?scale-down-to=2048"],
  ["product-geniehire.png", "/images/X3dY3C5Y8ha2GBZIwYnVguqQeNQ.png?scale-down-to=2048"],
  ["product-pass98.jpg", "/images/zzOBgP9exBc9WQOZSQgQKLl6SPI.jpg?scale-down-to=2048"],
  ["avatar-lucas.png", "/images/tKsNhbkJx6CCsVhCrpVpj9tZI.png"],
  ["avatar-matteo.jpg", "/images/nJsCy1CdYe4jdgGpYPw2qBNASx4.jpg"],
  // PredictaX page
  ["px/logo.png", "/images/s0NR09Ca0Z9dq2nDxuZuhkEM9qo.png"],
  ["px/hero.mp4", "/assets/2bnJ3numzbS1cTruCFeB1RiQ6k.mp4"],
  ["px/compare-icon.png", "/images/WqEZfwT2iMHCHtSNNtIWWzSn0s.png"],
  ["px/icon-without.svg", "/images/jdzexwVUUG0v9Tn88L57oI3V28w.svg"],
  ["px/icon-with.svg", "/images/dGO7W1b7kAcYFMMZtWk6Qz0N4Zw.svg"],
  ["px/badge-partners.png", "/images/lTSId7AAeRrPvofXskKu4N5IoXI.png"],
  ["px/badge-cert.png", "/images/7Imqm26fmIsq8U4XmLkmBgwA1tQ.png"],
  ["px/background-lines.svg", "/images/AdPfwI4laWSMfyInnvNTBjrcR0.svg"],
];

let failed = 0;
for (const [name, path] of ASSETS) {
  const file = join(outDir, name);
  mkdirSync(dirname(file), { recursive: true });
  if (existsSync(file)) continue;
  try {
    const res = await fetch(CDN + path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.warn(`  ✗ ${name} (${err.message})`);
  }
}
if (failed) console.warn(`\n${failed} asset(s) could not be downloaded. Re-run "npm run fetch-assets".`);
else console.log("All assets present in public/media");
