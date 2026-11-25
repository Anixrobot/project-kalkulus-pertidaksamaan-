#!/usr/bin/env node
import fs from "node:fs";

const DESIGN_SYSTEM_V4_1 = {
  version: "4.1.0",
  videoConfig: {
    width: 1920,
    height: 1080,
    fps: 30,
    aspectRatio: "16:9",
    legacyLogicalCanvas: { width: 960, height: 540, scaleFactor: 2 },
    footerTextLock: "30 FPS (DILARANG menulis 60 FPS)",
  },
  classroomLayerV3: {
    theme: "Nature Green",
    noBottomVoScriptBar: true,
    smartboardWidthPercent: 78,
    characters: {
      count: 4,
      outfit: "Jas almamater biru muda polos tanpa logo, celana abu-abu gelap",
      groundingRule: "Karakter wajib menapak lantai di kanan Smartboard, tidak melayang atau terpotong.",
      soloIntroRule: "Intro pemateri solo (Scene02A/06A/08A/10A) zoom-in tengah kelas tanpa papan tulis.",
      presenters: [
        {
          id: "rafie",
          name: "Rafie Armansyah",
          topic: "Pertidaksamaan Linear (PtLSV & PtLDV)",
          status: "LOCKED_V4_1_DO_NOT_MODIFY",
          visualDetail: "Rambut hitam rapi, kacamata frame bulat tipis, kemeja putih, sepatu pantofel cokelat gelap, memegang tablet.",
        },
        {
          id: "ikhsan",
          name: "Ikhsan",
          topic: "Pertidaksamaan Rasional",
          status: "UPGRADE_TO_V4_1",
          visualDetail: "Rambut berponi messy bowl cut, kacamata bulat frame tebal, kemeja bermotif/batik, sneakers hitam-putih, memegang spidol/pointer.",
        },
        {
          id: "pras",
          name: "Pras",
          topic: "Pertidaksamaan Irasional",
          status: "UPGRADE_TO_V4_1",
          visualDetail: "Rambut bergelombang/spike-messy, tanpa kacamata, kaos polo gelap, sneakers cokelat/putih, gestur tangan terbuka.",
        },
        {
          id: "dimas",
          name: "Dimas",
          topic: "Pertidaksamaan Nilai Mutlak",
          status: "UPGRADE_TO_V4_1",
          visualDetail: "Postur tegap/bulky, rambut buzz cut, tanpa kacamata, kaos oblong hitam polos, sneakers hitam-putih.",
        },
      ],
    },
  },
  smartboardThemeV4_1: {
    mode: "Dark Mode Slate",
    layout: "2 kolom (Kiri: StepStepperList KaTeX & AlertRuleCard; Kanan: Grafik SVG Presisi)",
    palette: {
      background: "#0f172a",
      panel: "#1e293b",
      border: "#334155",
      textPrimary: "#f8fafc",
      textSecondary: "#cbd5e1",
      accentBlue: "#38bdf8",
      accentGreen: "#10b981",
      accentRedAlert: "#f43f5e",
      accentAmberHighlight: "#fbbf24",
    },
    antiClippingRulesV4_1: {
      stepperWindowHeightPx: 180,
      stepperCardHeightPx: 56,
      stepperCardGapPx: 6,
      stepperMaxVisibleCards: 3,
      stepperSlideStepPx: 62,
      activeOpacity: 1,
      pastStepOpacity: 0.55,
      badgeHeaderLayout: "flex items-center gap-3 (DILARANG position: absolute)",
      formulaLineRule: "1 baris rumus penuh (white-space: nowrap) di atas + caption singkat di bawah",
      hpBadgeRule: "flex-wrap dengan padding aman >= 16px agar tidak terpotong tepi kanan",
      svgViewBoxPaddingPx: 40,
      svgPanelRecommendedDims: { width: 315, heightRange: [100, 250] },
    },
  },
};

const RASIONAL_SCENES_V4_1 = {
  presenter: "Ikhsan",
  dataFile: "src/data/rasionalData.ts",
  sourceFiles: ["Materi_Pertidaksamaan_Rasional_Lengkap.html", "Materi_Pertidaksamaan_Rasional_Lengkap.docx"],
  svgComponent: "SignChart1D.tsx",
  existingIntroId: "Scene06A-IntroIkhsan",
  scenes: [
    {
      id: "Scene06B-KonsepRasional",
      type: "concept",
      durationFrames: 1500,
      phases: [
        "Fase 1 (0-30%): Pengertian f(x)/g(x) > 0, syarat g(x) != 0, 4 tanda pertidaksamaan.",
        "Fase 2 (30-65%): Titik kritis (pembilang boleh masuk saat >= / <=, penyebut SELALU dikecualikan/bulatan kosong) + contoh (x-2)/(x+1) >= 0.",
        "Fase 3 (65-100%): Tabel uji tanda (+/+, -/-, +/-, -/+) + 5 langkah penyelesaian umum berurutan.",
      ],
    },
    {
      id: "Scene07A-Rasional-Soal1",
      type: "problem",
      label: "Contoh 1 — Dasar",
      durationFrames: 1050,
      latex: "\\frac{x - 2}{x + 1} \\ge 0",
      criticalPoints: [
        { value: -1, source: "denominator", included: false },
        { value: 2, source: "numerator", included: true },
      ],
      intervalSigns: ["+", "-", "+"],
      axisRange: [-4, 5],
      hpInterval: "(-\\infty, -1) \\cup [2, \\infty)",
    },
    {
      id: "Scene07B-Rasional-Soal2",
      type: "problem",
      label: "Contoh 2 — Tingkat Menengah",
      durationFrames: 1050,
      latex: "\\frac{x^2 - 4}{x - 1} < 0",
      criticalPoints: [
        { value: -2, source: "numerator", included: false },
        { value: 1, source: "denominator", included: false },
        { value: 2, source: "numerator", included: false },
      ],
      intervalSigns: ["-", "+", "-", "+"],
      axisRange: [-4, 4],
      hpInterval: "(-\\infty, -2) \\cup (1, 2)",
    },
    {
      id: "Scene07C-Rasional-Soal3",
      type: "problem",
      label: "Contoh 3 — Tanda <=",
      durationFrames: 1050,
      latex: "\\frac{2x + 1}{x - 3} \\le 0",
      criticalPoints: [
        { value: -0.5, label: "-1/2", source: "numerator", included: true },
        { value: 3, source: "denominator", included: false },
      ],
      intervalSigns: ["+", "-", "+"],
      axisRange: [-3, 5],
      hpInterval: "\\left[-\\frac{1}{2}, 3\\right)",
    },
    {
      id: "Scene07D-Rasional-Soal4",
      type: "problem",
      label: "Contoh 4 — Pembilang Kuadrat",
      durationFrames: 1050,
      latex: "\\frac{x^2 - 9}{x + 2} \\ge 0",
      criticalPoints: [
        { value: -3, source: "numerator", included: true },
        { value: -2, source: "denominator", included: false },
        { value: 3, source: "numerator", included: true },
      ],
      intervalSigns: ["-", "+", "-", "+"],
      axisRange: [-5, 5],
      hpInterval: "[-3, -2) \\cup [3, \\infty)",
    },
    {
      id: "Scene07E-Rasional-Soal5",
      type: "problem",
      label: "Contoh 5 — Faktor Sama (Jebakan Coret)",
      durationFrames: 1200,
      latex: "\\frac{x^2 - x - 6}{x^2 - 4} > 0",
      criticalPoints: [
        { value: -2, source: "denominator_hole", included: false, isCanceledHole: true },
        { value: 2, source: "denominator", included: false },
        { value: 3, source: "numerator", included: false },
      ],
      intervalSigns: ["+", "+", "-", "+"],
      axisRange: [-4, 5],
      hpInterval: "(-\\infty, -2) \\cup (-2, 2) \\cup (3, \\infty)",
      alertRule: "Faktor (x+2) boleh dicoret untuk uji tanda, tetapi x = -2 WAJIB tetap dikecualikan sebagai lubang (bulatan kosong merah).",
    },
    {
      id: "Scene07F-Rasional-KesalahanRingkasan",
      type: "summary",
      durationFrames: 1050,
      phases: [
        "Fase 1 (0-60%): 4 Kesalahan Umum (penyebut != 0, pembilang ikut hanya jika >=/<=, penyebut tetap keluar walau dicoret, dilarang kali silang tanpa tahu tanda penyebut).",
        "Fase 2 (60-100%): Ringkasan inti penyelesaian pertidaksamaan rasional.",
      ],
    },
  ],
};

const IRASIONAL_SCENES_V4_1 = {
  presenter: "Pras",
  dataFile: "src/data/irasionalData.ts",
  sourceFiles: ["Pertidaksamaan Irasional.docx"],
  svgComponent: "IntersectionLine1D.tsx",
  existingIntroId: "Scene08A-IntroPras",
  extensibleNote: "Sumber saat ini berisi 2 contoh soal. Gunakan komponen generik IrasionalProblemScene agar mudah menambah Soal 3-5 via data.",
  scenes: [
    {
      id: "Scene08B-KonsepIrasional",
      type: "concept",
      durationFrames: 1500,
      phases: [
        "Fase 1 (0-30%): Pengertian pertidaksamaan bentuk akar + 3 contoh bentuk.",
        "Fase 2 (30-65%): 2 Prinsip Mutlak: Syarat Numerus f(x) >= 0 dan hasil akar sqrt(f(x)) >= 0.",
        "Fase 3 (65-100%): 3 Langkah Umum (Syarat Akar -> Kuadratkan Kedua Ruas -> Irisan) + Bentuk I & Bentuk II.",
      ],
    },
    {
      id: "Scene09A-Irasional-Soal1",
      type: "problem",
      label: "Contoh 1 — Bentuk I (Satu Akar)",
      durationFrames: 1050,
      latex: "\\sqrt{2x - 4} < 4",
      axisRange: [0, 12],
      layers: [
        { label: "Daerah I (Syarat Akar)", condition: "x \\ge 2", from: 2, to: 12, includeStart: true, includeEnd: false, color: "#38bdf8" },
        { label: "Daerah II (Kuadrat)", condition: "x < 10", from: 0, to: 10, includeStart: false, includeEnd: false, color: "#fbbf24" },
      ],
      intersection: { from: 2, to: 10, includeStart: true, includeEnd: false },
      hpSet: "\\{x \\mid 2 \\le x < 10, x \\in \\mathbb{R}\\}",
      hpInterval: "[2, 10)",
    },
    {
      id: "Scene09B-Irasional-Soal2",
      type: "problem",
      label: "Contoh 2 — Bentuk II (Dua Akar)",
      durationFrames: 1200,
      latex: "\\sqrt{x - 1} \\le \\sqrt{2x - 4}",
      axisRange: [0, 6],
      layers: [
        { label: "Daerah I (Akar 1)", condition: "x \\ge 1", from: 1, to: 6, includeStart: true, includeEnd: false, color: "#38bdf8" },
        { label: "Daerah II (Akar 2)", condition: "x \\ge 2", from: 2, to: 6, includeStart: true, includeEnd: false, color: "#fbbf24" },
        { label: "Daerah III (Kuadrat)", condition: "x \\ge 3", from: 3, to: 6, includeStart: true, includeEnd: false, color: "#a78bfa" },
      ],
      intersection: { from: 3, to: 6, includeStart: true, includeEnd: false, toInfinity: true },
      hpSet: "\\{x \\mid x \\ge 3, x \\in \\mathbb{R}\\}",
      hpInterval: "[3, \\infty)",
    },
    {
      id: "Scene09C-Irasional-Ringkasan",
      type: "summary",
      durationFrames: 750,
      phases: ["Ringkasan 3 pilar: Syarat Numerus f(x) >= 0, Kuadratkan Kedua Ruas, dan Irisan Seluruh Syarat."],
    },
  ],
};

const MUTLAK_SCENES_V4_1 = {
  presenter: "Dimas",
  dataFile: "src/data/mutlakData.ts",
  sourceFiles: ["Pertidksamaan mutlak .html"],
  svgComponent: "AbsoluteDistanceLine1D.tsx",
  existingIntroId: "Scene10A-IntroDimas",
  extensibleNote: "Sumber saat ini berisi 2 contoh soal. Gunakan komponen generik MutlakProblemScene agar mudah menambah Soal 3-5 via data.",
  scenes: [
    {
      id: "Scene10B-KonsepMutlak",
      type: "concept",
      durationFrames: 1500,
      phases: [
        "Fase 1 (0-30%): Pengertian nilai mutlak |...| + Konsep Jarak dari 0 (tidak pernah negatif).",
        "Fase 2 (30-65%): Karakteristik 2 arah (< / <= mengumpul di tengah vs > / >= memencar keluar kiri-kanan) + SVG jarak.",
        "Fase 3 (65-100%): 4 Langkah Penyelesaian (Isolasi -> Ubah Linear -> Operasikan Adil -> Tulis HP).",
      ],
    },
    {
      id: "Scene11A-Mutlak-Soal1",
      type: "problem",
      label: "Contoh 1 — Tanda Kurang Dari (<)",
      durationFrames: 1050,
      latex: "|2x - 3| < 7",
      pattern: "inside_between",
      axisRange: [-4, 7],
      bounds: [
        { value: -2, included: false },
        { value: 5, included: false },
      ],
      hpSet: "\\{x \\mid -2 < x < 5\\}",
      hpInterval: "(-2, 5)",
    },
    {
      id: "Scene11B-Mutlak-Soal2",
      type: "problem",
      label: "Contoh 2 — Tanda Lebih Dari Sama Dengan (>=)",
      durationFrames: 1050,
      latex: "|3x + 2| \\ge 8",
      pattern: "outside_split",
      axisRange: [-6, 5],
      bounds: [
        { value: -10 / 3, label: "-10/3", included: true, direction: "left" },
        { value: 2, label: "2", included: true, direction: "right" },
      ],
      hpSet: "\\{x \\mid x \\le -\\frac{10}{3} \\text{ atau } x \\ge 2\\}",
      hpInterval: "\\left(-\\infty, -\\frac{10}{3}\\right] \\cup [2, \\infty)",
    },
    {
      id: "Scene11C-Mutlak-KesalahanRingkasan",
      type: "summary",
      durationFrames: 1200,
      phases: [
        "Fase 1 (0-50%): 3 Kesalahan Umum (Konstanta negatif |x| < -5 => Himpunan Kosong, tertukar rumus < vs >, lupa balik tanda saat bagi/kali negatif).",
        "Fase 2 (50-100%): Tabel Rumus Acuan Cepat (syarat a >= 0) untuk <=, <, >=, > beserta tipe grafik.",
      ],
    },
  ],
};

const MATH_RENDERING_RULES_V4_1 = {
  graphicsEngine: {
    allowed: ["Pure SVG + React", "useCurrentFrame()", "spring()", "interpolate()"],
    forbidden: ["plotly.js", "react-plotly.js", "chart.js", "CSS @keyframes", "setTimeout/requestAnimationFrame"],
  },
  formulaEngine: {
    allowed: ["katex.renderToString() melalui komponen MathFormula"],
    forbidden: ["MathJax", "better-react-mathjax", "string LaTeX mentah dengan CSS uppercase"],
  },
  layoutGuardsV4_1: [
    "Gunakan StepStepperList (sliding window max 3 kartu = 180px) di seluruh scene latihan soal.",
    "Gunakan phase-based <Sequence> di seluruh scene konsep (dilarang menumpuk semua blok dalam 1 frame).",
    "Dilarang menulis '60 FPS' pada footer; wajib '30 FPS'.",
    "Dilarang memasang bar VO / subtitle hitam di bagian bawah layar.",
    "Dilarang mengubah atau menghapus scene Rafie (Scene02 sampai Scene05E).",
  ],
};

function validateComponentCode(code, componentType = "general") {
  const errors = [];
  const warnings = [];

  if (/plotly/i.test(code)) {
    errors.push("TERLARANG: Terdeteksi Plotly.js. Wajib gunakan SVG murni + React.");
  }
  if (/mathjax/i.test(code)) {
    errors.push("TERLARANG: Terdeteksi MathJax. Wajib gunakan katex.renderToString() melalui MathFormula.");
  }
  if (/\b60\s*FPS\b/i.test(code)) {
    errors.push("FPS MISMATCH: Terdeteksi teks '60 FPS'. Wajib seragamkan ke '30 FPS'.");
  }
  if (/uppercase.*\\(ge|le|sqrt|frac|neq|infty)/i.test(code)) {
    errors.push("KATEX LEAK: Terdeteksi string LaTeX mentah di dekat kelas uppercase. Render memakai <MathFormula />.");
  }
  if (/@keyframes|transition:|animate-/i.test(code)) {
    warnings.push("ANIMASI CSS: Pastikan animasi video digerakkan oleh useCurrentFrame()/spring()/interpolate(), bukan CSS transition/keyframes.");
  }
  if (componentType === "formula" && !/renderToString/.test(code)) {
    errors.push("KATEX: Komponen rumus wajib memakai katex.renderToString() secara sinkron.");
  }
  if (componentType === "rasional") {
    if (!/criticalPoints|SignChart1D/.test(code)) {
      errors.push("RASIONAL GUARD: Scene/komponen rasional wajib memakai data criticalPoints dan komponen SVG SignChart1D.");
    }
    if (!/included|denominator/.test(code)) {
      warnings.push("RASIONAL CHECK: Pastikan titik penyebut selalu dirender bulatan kosong (included: false) termasuk saat faktor dicoret.");
    }
  }
  if (componentType === "irasional") {
    if (!/layers|intersection|IntersectionLine1D/.test(code)) {
      errors.push("IRASIONAL GUARD: Scene/komponen irasional wajib menampilkan layer syarat numerus + hasil kuadrat dan irisan via IntersectionLine1D.");
    }
  }
  if (componentType === "mutlak") {
    if (!/bounds|AbsoluteDistanceLine1D/.test(code)) {
      errors.push("MUTLAK GUARD: Scene/komponen nilai mutlak wajib memvisualisasikan pola jarak (tengah vs memencar keluar) via AbsoluteDistanceLine1D.");
    }
  }
  if (componentType === "problem_scene" && !/StepStepperList/.test(code)) {
    errors.push("STEPPER GUARD V4.1: Setiap scene contoh soal wajib memakai StepStepperList agar langkah aljabar berjalan ber-step dan tidak terpotong.");
  }
  if (componentType === "concept_scene" && !/Sequence/.test(code)) {
    errors.push("PHASE GUARD V4.1: Setiap scene konsep wajib memakai <Sequence> ber-fase agar kartu materi tidak menumpuk dalam 1 layar.");
  }

  return {
    passed: errors.length === 0,
    errorCount: errors.length,
    warningCount: warnings.length,
    errors,
    warnings,
  };
}

// CLI shortcut mode: node mcp-pertidaksamaan-server.mjs --validate <type> <filePath>
const validateIdx = process.argv.indexOf("--validate");
if (validateIdx !== -1) {
  const typeArg = process.argv[validateIdx + 1] || "general";
  const filePath = process.argv[validateIdx + 2];
  if (!filePath || !fs.existsSync(filePath)) {
    console.error("Usage: node mcp-pertidaksamaan-server.mjs --validate <type> <filePath>");
    process.exit(1);
  }
  const code = fs.readFileSync(filePath, "utf8");
  const result = validateComponentCode(code, typeArg);
  console.log(JSON.stringify({ file: filePath, type: typeArg, ...result }, null, 2));
  process.exit(result.passed ? 0 : 1);
}

// Fallback MCP Server initialization jika di-load oleh MCP client
try {
  const { Server } = await import("@modelcontextprotocol/sdk/server/index.js");
  const { StdioServerTransport } = await import("@modelcontextprotocol/sdk/server/stdio.js");
  const { CallToolRequestSchema, ListToolsRequestSchema } = await import("@modelcontextprotocol/sdk/types.js");

  const server = new Server(
    { name: "mcp-pertidaksamaan-server", version: "4.1.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "get_design_system_v4_1",
        description:
          "Mengambil aturan desain V4.1 lengkap: video 1920x1080 30fps, kelas Nature Green, Smartboard Dark Mode Slate 78%, spesifikasi karakter Ikhsan/Pras/Dimas/Rafie, dan aturan anti-clipping StepStepperList.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_rasional_scenes_spec",
        description:
          "Mengambil manifest lengkap Segmen 2 (Ikhsan — Pertidaksamaan Rasional): konsep 3 fase, 5 scene contoh soal terpisah (Scene07A-07E), dan scene kesalahan umum/ringkasan.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_irasional_scenes_spec",
        description:
          "Mengambil manifest lengkap Segmen 3 (Pras — Pertidaksamaan Irasional): konsep 3 fase, scene contoh soal terpisah (Scene09A-09B), dan scene ringkasan.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_mutlak_scenes_spec",
        description:
          "Mengambil manifest lengkap Segmen 4 (Dimas — Pertidaksamaan Nilai Mutlak): konsep 3 fase, scene contoh soal terpisah (Scene11A-11B), dan scene kesalahan umum/tabel rumus cepat.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_math_rendering_rules",
        description:
          "Mengambil aturan teknis ketat V4.1 untuk SVG murni, KaTeX sinkron, larangan Plotly/MathJax, dan guard anti-clipping.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "validate_math_component",
        description:
          "Memvalidasi kode TSX komponen/scene Remotion V4.1 terhadap aturan KaTeX, SVG, FPS 30, StepStepperList, <Sequence> ber-fase, dan visual spesifik Rasional/Irasional/Mutlak.",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string", description: "Kode sumber TSX/TS yang akan divalidasi." },
            componentType: {
              type: "string",
              enum: ["general", "formula", "rasional", "irasional", "mutlak", "problem_scene", "concept_scene"],
              description: "Kategori komponen/scene yang divalidasi.",
            },
          },
          required: ["code"],
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "get_design_system_v4_1":
        return { content: [{ type: "text", text: JSON.stringify(DESIGN_SYSTEM_V4_1, null, 2) }] };
      case "get_rasional_scenes_spec":
        return { content: [{ type: "text", text: JSON.stringify(RASIONAL_SCENES_V4_1, null, 2) }] };
      case "get_irasional_scenes_spec":
        return { content: [{ type: "text", text: JSON.stringify(IRASIONAL_SCENES_V4_1, null, 2) }] };
      case "get_mutlak_scenes_spec":
        return { content: [{ type: "text", text: JSON.stringify(MUTLAK_SCENES_V4_1, null, 2) }] };
      case "get_math_rendering_rules":
        return { content: [{ type: "text", text: JSON.stringify(MATH_RENDERING_RULES_V4_1, null, 2) }] };
      case "validate_math_component": {
        const result = validateComponentCode(args?.code || "", args?.componentType || "general");
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }
      default:
        throw new Error(`Tool tidak dikenal: ${name}`);
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
} catch (e) {
  // Silent fallback saat CLI validator dipanggil langsung
}