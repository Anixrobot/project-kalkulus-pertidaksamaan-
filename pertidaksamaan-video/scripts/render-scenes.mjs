import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const SCENE_IDS = [
  "Scene01-Intro",
  "Scene02-HukumFundamental",
  "Scene03-KonsepPLSV",
  "Scene04-KonsepPLDV",
  "Scene05A-SoalPLSV",
  "Scene05B-SoalPLDV",
  "Scene06-KonsepRasional",
  "Scene07A-SoalRasional123",
  "Scene07B-SoalRasional45",
  "Scene08-KonsepIrasional",
  "Scene09A-SoalIrasional12",
  "Scene09B-SoalIrasional345",
  "Scene10-KonsepMutlak",
  "Scene11A-SoalMutlak12",
  "Scene11B-SoalMutlak345",
  "Scene12-ClosingSummary",
];

const outDir = path.resolve("out/scenes");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log("==================================================");
console.log("  RENDER MODULAR 16 SCENE PERTIDAKSAMAAN (60 MENIT)");
console.log("==================================================");
console.log(`Folder Output: ${outDir}\n`);

// 1. Render Setiap Scene Satu Per Satu
for (let i = 0; i < SCENE_IDS.length; i++) {
  const sceneId = SCENE_IDS[i];
  const targetFile = path.join(outDir, `${sceneId}.mp4`);
  console.log(`[${i + 1}/${SCENE_IDS.length}] Memulai render: ${sceneId}...`);

  const cmd = `npx remotion render ${sceneId} "${targetFile}" --concurrency=4`;
  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`✓ Selesai: ${targetFile}\n`);
  } catch (err) {
    console.error(`✗ Gagal merender ${sceneId}:`, err);
    process.exit(1);
  }
}

// 2. Buat File Daftar Concat untuk FFmpeg
const concatPath = path.join(outDir, "concat-list.txt");
const concatContent = SCENE_IDS.map((id) => `file '${id}.mp4'`).join("\n");
fs.writeFileSync(concatPath, concatContent, "utf8");

console.log("==================================================");
console.log("  SEMUA 16 SCENE BERHASIL DIRENDER!");
console.log("==================================================");
console.log(`File concat list dibuat: ${concatPath}`);
console.log("Untuk menggabungkan seluruh video secara instan tanpa re-encoding, jalankan:");
console.log("  npm run merge:youtube");
