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
  ["partner-1.png", "/images/lmhVkf7ejDqejU8t5xJ436ms00.png"],
  ["partner-2.png", "/images/dpi5VblCPsYXgR1GhlibhnX0.png"],
  ["partner-3.png", "/images/kFI4RDNHt3kDysISUe7nRAXVLE.png"],
  ["partner-4.png", "/images/vombHnvqXB6EBAzfGSNIF41DZQI.png"],
  ["partner-5.png", "/images/oMJA0IT6f7GA7AoZruWCx6aiCE.png"],
  ["product-predictax.jpg", "/images/8nlE5Aui2cIlIa1r0aTwgW9xD8.jpg?scale-down-to=2048"],
  ["product-geniehire.png", "/images/X3dY3C5Y8ha2GBZIwYnVguqQeNQ.png?scale-down-to=2048"],
  ["product-pass98.jpg", "/images/zzOBgP9exBc9WQOZSQgQKLl6SPI.jpg?scale-down-to=2048"],
  ["avatar-lucas.png", "/images/tKsNhbkJx6CCsVhCrpVpj9tZI.png"],
  ["avatar-matteo.jpg", "/images/nJsCy1CdYe4jdgGpYPw2qBNASx4.jpg"],
];

let failed = 0;
for (const [name, path] of ASSETS) {
  const file = join(outDir, name);
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
