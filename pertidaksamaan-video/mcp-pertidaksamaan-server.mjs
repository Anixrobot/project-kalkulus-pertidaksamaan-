#!/usr/bin/env node
import fs from "fs";
import path from "path";

export const DESIGN_SYSTEM_V4 = {
  videoConfig: {
    width: 1920,
    height: 1080,
    fps: 30,
    aspectRatio: "16:9",
    legacyLogicalCanvas: { width: 960, height: 540, scaleFactor: 2 },
  },
  classroomLayerV3: {
    theme: "Nature Green",
    characters: {
      count: 4,
      outfit: "Jas almamater biru polos",
      groundingRule: "Karakter wajib menapak di lantai, tidak melayang atau terpotong.",
      presenters: [
        { name: "Rafie", topic: "Pertidaksamaan Linear (PtLSV & PtLDV)", v4Upgraded: true },
        { name: "Ikhsan", topic: "Pertidaksamaan Rasional", v4Upgraded: false },
        { name: "Pras", topic: "Pertidaksamaan Irasional", v4Upgraded: false },
        { name: "Dimas", topic: "Pertidaksamaan Nilai Mutlak", v4Upgraded: false },
      ],
      soloIntroRule: "Scene intro tiap pemateri menggunakan zoom-in karakter tanpa papan tulis.",
    },
    boardLayout: "2 kolom (Kiri: langkah aljabar KaTeX & kartu alert; Kanan: grafik SVG presisi).",
  },
  smartboardThemeV4: {
    mode: "Dark Mode Slate",
    palette: {
      background: "#0f172a", // slate-900
      panel: "#1e293b",      // slate-800
      border: "#334155",     // slate-700
      textPrimary: "#f8fafc",// slate-50
      textSecondary: "#cbd5e1", // slate-300
      accentPtLSV: "#38bdf8",// sky-400
      accentPtLDVAndTrue: "#10b981", // emerald-500
      accentAlertAndFalse: "#f43f5e", // rose-500
      accentHighlight: "#fbbf24", // amber-400
    },
  },
};

export const LINEAR_SCENES_V4 = {
  sourceOfTruthFiles: [
    "spesifikasi_materi_remotion_ptlsv_ptldv.md",
    "mathData.ts",
  ],
  terminologyLock: {
    required: ["PtLSV", "PtLDV"],
    forbidden: ["PLSV", "PLDV"],
  },
  baseTotalFrames: 3600,
  baseTotalSeconds: 120,
  subScenes: [
    {
      id: "LinearScene1_IntroAturanMutlak",
      title: "Intro & Aturan Mutlak Pertidaksamaan",
      durationSec: 12,
      frames: 360,
      animationRequirements: [
        "Kartu peringatan berbingkai merah (#f43f5e).",
        "Animasi simbol < berputar 180 derajat secara halus menjadi > saat label ×(-) atau ÷(-) muncul.",
      ],
    },
    {
      id: "LinearScene2_KonsepPtLSV",
      title: "Konsep PtLSV & Visualisasi Garis Bilangan",
      durationSec: 18,
      frames: 540,
      example: "2x - 4 >= 0 => x >= 2, interval [2, inf)",
      animationRequirements: [
        "Sumbu garis bilangan abu-abu rentang [-1, 6].",
        "Bulatan penuh hijau tepat di boundaryValue (x = 2), BUKAN di ujung kanan x = 6.",
        "Sinar hijau (ray) dan area sorotan meluncur dari x = 2 ke kanan lengkap dengan panah.",
      ],
    },
    {
      id: "LinearScene3_LatihanPtLSV",
      title: "Latihan Soal PtLSV (Soal 1 & Soal 2)",
      durationSec: 30,
      frames: 900,
      problems: [
        {
          id: "soal1",
          durationSec: 15,
          expression: "3(x - 2) + 4 < 5x - 6",
          solution: "x > 2",
          interval: "(2, inf)",
          range: [-2, 6],
          boundaryType: "open",
          alert: "Bagi kedua ruas dengan -2 => balik tanda < menjadi >",
        },
        {
          id: "soal2",
          durationSec: 15,
          expression: "(2x - 1)/3 - (x + 2)/2 >= 1",
          solution: "x >= 14",
          interval: "[14, inf)",
          range: [10, 18],
          boundaryType: "closed",
          alert: "Distribusi negatif -3(x + 2) => -3x - 6 (bukan +6)",
        },
      ],
    },
    {
      id: "LinearScene4_KonsepPtLDV",
      title: "Konsep PtLDV (Dua Variabel)",
      durationSec: 16,
      frames: 480,
      animationRequirements: [
        "Dua kartu berdampingan membandingkan garis utuh (solid: <=, >=) vs putus-putus (dashed: <, >).",
        "Efek ripple/ping pada titik asal (0,0) di bidang Kartesius mini.",
        "Catatan kaki: jika garis melewati (0,0), uji titik alternatif seperti (1,0) atau (0,1).",
      ],
    },
    {
      id: "LinearScene5_LatihanPtLDV",
      title: "Latihan Soal PtLDV (Soal 3 & Soal 4)",
      durationSec: 30,
      frames: 900,
      mandatorySequence: [
        "1. Munculkan bidang Kartesius sesuai viewport dari mathData.ts",
        "2. Munculkan titik potong sumbu Y dan X dengan label koordinat",
        "3. Tarik garis pembatas penuh dari lineSegmentInViewport[0] ke [1] via strokeDashoffset sesuai lineStyle",
        "4. Tampilkan uji titik (0,0), substitusi, dan lencana BENAR (#10b981) / SALAH (#f43f5e)",
        "5. Sapukan (fade/clip reveal) poligon dhpPolygon penuh hingga tepi viewport tanpa terpotong",
      ],
      problems: [
        {
          id: "soal3",
          durationSec: 15,
          expression: "2x + 5y <= 10",
          intercepts: [[0, 2], [5, 0]],
          lineStyle: "solid",
          originTest: true,
          viewport: { x: [-2, 7], y: [-2, 4] },
        },
        {
          id: "soal4",
          durationSec: 15,
          expression: "4x - 3y > 12",
          intercepts: [[0, -4], [3, 0]],
          lineStyle: "dashed",
          originTest: false,
          viewport: { x: [-2, 7], y: [-6, 5] },
          note: "Pastikan area x < 3 di bawah garis ikut terarsir penuh via dhpPolygon.",
        },
      ],
    },
    {
      id: "LinearScene6_SistemPtLDV",
      title: "Aplikasi Sistem PtLDV (Soal 5 — Pengantar Program Linear)",
      durationSec: 14,
      frames: 420,
      expression: "x + y >= 4; x >= 0; y >= 0",
      animationRequirements: [
        "Munculkan 3 arsiran bertahap dari layerPolygons dengan opacity 0.15.",
        "Redupkan area luar dan sorot tajam dhpPolygon sebagai irisan final di Kuadran I.",
      ],
    },
  ],
};

export const MATH_RENDERING_RULES = {
  graphicsEngine: {
    allowed: ["Pure SVG + React", "useCurrentFrame()", "spring()", "interpolate()"],
    forbidden: ["plotly.js", "react-plotly.js", "chart.js", "CSS @keyframes", "setTimeout/requestAnimationFrame"],
    coordinateMapping: "WAJIB gunakan helper mapMathToSvg() dari mathData.ts agar rasio aspek & kemiringan garis presisi.",
  },
  formulaEngine: {
    allowed: ["katex.renderToString() secara sinkron"],
    forbidden: ["MathJax", "better-react-mathjax", "async math rendering"],
    cssRequirement: "Import 'katex/dist/katex.min.css' di entry point atau komponen MathFormula.",
  },
  dataContractKeys: [
    "viewport",
    "boundaryValue",
    "lineStyle",
    "lineSegmentInViewport",
    "dhpPolygon",
    "layerPolygons",
    "mapMathToSvg",
  ],
};

export function validateComponentCode(code, componentType = "general") {
  const errors = [];
  const warnings = [];

  if (/plotly/i.test(code)) {
    errors.push("TERLARANG: Terdeteksi penggunaan Plotly.js. Wajib ganti dengan SVG murni + React.");
  }
  if (/mathjax/i.test(code)) {
    errors.push("TERLARANG: Terdeteksi penggunaan MathJax. Wajib gunakan katex.renderToString() secara sinkron.");
  }
  if (/\b(PLSV|PLDV)\b/.test(code)) {
    errors.push("TERMINOLOGI SALAH: Ditemukan 'PLSV' atau 'PLDV'. Wajib gunakan 'PtLSV' dan 'PtLDV'.");
  }
  if (/@keyframes|transition:|animate-/i.test(code)) {
    warnings.push("PERINGATAN ANIMASI: Terdeteksi CSS animation/transition. Pastikan seluruh animasi Remotion digerakkan oleh useCurrentFrame()/spring()/interpolate().");
  }
  if (componentType === "formula" && !/renderToString/.test(code)) {
    errors.push("KATEX: Komponen rumus wajib menggunakan katex.renderToString() secara sinkron.");
  }
  if (componentType === "ptlsv" && !/boundaryValue/.test(code)) {
    errors.push("PtLSV BUG GUARD: Komponen garis bilangan 1D wajib membaca properti 'boundaryValue' dari mathData.ts agar titik batas tidak meleset ke ujung sumbu.");
  }
  if (componentType === "ptldv") {
    if (!/mapMathToSvg/.test(code)) {
      errors.push("PtLDV BUG GUARD: Komponen Kartesius 2D wajib menggunakan helper 'mapMathToSvg()' dari mathData.ts.");
    }
    if (!/dhpPolygon/.test(code)) {
      errors.push("PtLDV BUG GUARD: Arsiran DHP wajib menggunakan koordinat 'dhpPolygon' dari mathData.ts.");
    }
    if (!/lineSegmentInViewport/.test(code)) {
      errors.push("PtLDV BUG GUARD: Garis pembatas wajib direntangkan memakai 'lineSegmentInViewport' dari mathData.ts.");
    }
  }
  if (componentType === "sistem_ptldv" && !/layerPolygons/.test(code)) {
    errors.push("SISTEM PtLDV BUG GUARD: Animasi arsiran bertahap wajib memakai 'layerPolygons' (opacity 0.15) sebelum menyorot 'dhpPolygon'.");
  }

  return {
    passed: errors.length === 0,
    errorCount: errors.length,
    warningCount: warnings.length,
    errors,
    warnings,
  };
}

// CLI Handling
const args = process.argv.slice(2);
if (args.length > 0) {
  if (args[0] === "--call") {
    const toolName = args[1];
    switch (toolName) {
      case "get_design_system_v4":
        console.log(JSON.stringify(DESIGN_SYSTEM_V4, null, 2));
        process.exit(0);
      case "get_linear_scenes_spec":
        console.log(JSON.stringify(LINEAR_SCENES_V4, null, 2));
        process.exit(0);
      case "get_math_rendering_rules":
        console.log(JSON.stringify(MATH_RENDERING_RULES, null, 2));
        process.exit(0);
      default:
        console.error(`Tool tidak dikenal: ${toolName}`);
        process.exit(1);
    }
  } else if (args[0] === "--validate") {
    const compType = args[1] || "general";
    const filePath = args[2];
    if (!filePath || !fs.existsSync(filePath)) {
      console.error(`File tidak ditemukan: ${filePath}`);
      process.exit(1);
    }
    const code = fs.readFileSync(filePath, "utf8");
    const res = validateComponentCode(code, compType);
    console.log(JSON.stringify(res, null, 2));
    process.exit(res.passed ? 0 : 1);
  }
}

// Fallback MCP Server initialization jika di-load oleh MCP client
try {
  const { Server } = await import("@modelcontextprotocol/sdk/server/index.js");
  const { StdioServerTransport } = await import("@modelcontextprotocol/sdk/server/stdio.js");
  const { CallToolRequestSchema, ListToolsRequestSchema } = await import("@modelcontextprotocol/sdk/types.js");

  const server = new Server(
    { name: "mcp-pertidaksamaan-server", version: "4.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "get_design_system_v4",
        description: "Mengambil aturan desain V4.0",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_linear_scenes_spec",
        description: "Mengambil manifest lengkap 6 sub-scene materi PtLSV & PtLDV",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_math_rendering_rules",
        description: "Mengambil aturan teknis ketat untuk engine SVG murni, KaTeX sinkron",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "validate_math_component",
        description: "Memvalidasi kode TSX komponen Remotion terhadap aturan V4.0",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string" },
            componentType: { type: "string", enum: ["general", "formula", "ptlsv", "ptldv", "sistem_ptldv"] },
          },
          required: ["code"],
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: toolArgs } = request.params;
    switch (name) {
      case "get_design_system_v4":
        return { content: [{ type: "text", text: JSON.stringify(DESIGN_SYSTEM_V4, null, 2) }] };
      case "get_linear_scenes_spec":
        return { content: [{ type: "text", text: JSON.stringify(LINEAR_SCENES_V4, null, 2) }] };
      case "get_math_rendering_rules":
        return { content: [{ type: "text", text: JSON.stringify(MATH_RENDERING_RULES, null, 2) }] };
      case "validate_math_component": {
        const result = validateComponentCode(toolArgs?.code || "", toolArgs?.componentType || "general");
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
      default:
        throw new Error(`Tool tidak dikenal: ${name}`);
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
} catch (e) {
  // Silent catch jika SDK belum terpasang saat CLI dipanggil
}