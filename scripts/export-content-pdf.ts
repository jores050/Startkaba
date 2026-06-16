/**
 * Export PDF du contenu pédagogique StartKaba — Niveaux 1, 2 et 3.
 * Usage : npx tsx scripts/export-content-pdf.ts
 */

import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "fs";
import path from "path";
import { tasks } from "../src/data/tasks";
import { levels } from "../src/data/levels";
import { BADGE_TASKS } from "../src/lib/utils/badges";
import { badges } from "../src/data/badges";
import type { Exercise } from "../src/types";

// ─── Config ──────────────────────────────────────────────────────────────────

const LEVELS_TO_EXPORT = [1, 2, 3];
const OUTPUT_DIR = path.join(process.cwd(), "exports");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "startkaba-niveaux-1-2-3.pdf");

mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Helpers badges ──────────────────────────────────────────────────────────

function getBadgeForTask(taskId: number): string | null {
  for (const [key, id] of Object.entries(BADGE_TASKS)) {
    if (id === taskId) {
      const badge = badges.find((b) =>
        b.condition.includes(key.toLowerCase())
      );
      if (badge) return `${badge.icon} Badge débloqué : ${badge.name} — ${badge.description}`;
    }
  }
  return null;
}

// ─── PDF setup ───────────────────────────────────────────────────────────────

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 50, bottom: 50, left: 55, right: 55 },
  info: {
    Title: "StartKaba — Contenu pédagogique Niveaux 1-2-3",
    Author: "StartKaba",
    Subject: "Relecture externe du contenu pédagogique",
    Creator: "scripts/export-content-pdf.ts",
  },
});

const stream = createWriteStream(OUTPUT_FILE);
doc.pipe(stream);

const W = doc.page.width - 110; // largeur utile

// ─── Couleurs & polices ───────────────────────────────────────────────────────

const C = {
  blue: "#0722AB",
  orange: "#F77E2D",
  dark: "#1A1B2E",
  gray: "#6B7280",
  lightGray: "#F3F4F6",
  green: "#16A34A",
  purple: "#7C3AED",
  red: "#DC2626",
  bg: "#F9FAFB",
};

const TYPE_COLORS: Record<string, string> = {
  info: C.blue,
  mcq: C.orange,
  scenario: C.purple,
  true_false: C.green,
  micro_input: "#D97706",
  reflection_template: C.blue,
  fill_blank: "#0891B2",
  match: "#059669",
  reorder: "#7C3AED",
  self_check: C.gray,
};

const TYPE_LABELS: Record<string, string> = {
  info: "INFO",
  mcq: "QCM",
  scenario: "SCENARIO",
  true_false: "VRAI / FAUX",
  micro_input: "MICRO-INPUT (brique)",
  reflection_template: "REFLECTION TEMPLATE",
  fill_blank: "TEXTE A TROU",
  match: "ASSOCIATION",
  reorder: "REMISE EN ORDRE",
  self_check: "AUTO-EVALUATION",
};

// ─── Utilitaires de rendu ─────────────────────────────────────────────────────

function checkNewPage(neededHeight = 80) {
  if (doc.y > doc.page.height - doc.page.margins.bottom - neededHeight) {
    doc.addPage();
  }
}

function hLine(color = "#E5E7EB", width = 1) {
  doc
    .moveTo(55, doc.y)
    .lineTo(55 + W, doc.y)
    .strokeColor(color)
    .lineWidth(width)
    .stroke();
  doc.moveDown(0.4);
}

function tag(text: string, color: string) {
  const padding = 5;
  const textWidth = doc.widthOfString(text, { width: 8 });
  const tagW = textWidth + padding * 2;
  const tagH = 14;
  const x = 55;
  const y = doc.y;
  doc.roundedRect(x, y, tagW, tagH, 3).fill(color);
  doc.fillColor("white").fontSize(8).font("Helvetica-Bold")
    .text(text, x + padding, y + 3, { lineBreak: false });
  doc.moveDown(0.1);
  doc.y = y + tagH + 6;
}

function xpBadge(xp: number) {
  const text = `+${xp} XP`;
  const x = 55 + W - doc.widthOfString(text, { width: 8 }) - 12;
  const y = doc.y - 20;
  doc.roundedRect(x, y, doc.widthOfString(text, { width: 8 }) + 10, 14, 3)
    .fill(C.orange);
  doc.fillColor("white").fontSize(8).font("Helvetica-Bold")
    .text(text, x + 5, y + 3, { lineBreak: false });
}

function bodyText(text: string, opts?: { indent?: number; color?: string }) {
  const indent = opts?.indent ?? 0;
  doc
    .fillColor(opts?.color ?? C.dark)
    .fontSize(9.5)
    .font("Helvetica")
    .text(text, 55 + indent, doc.y, { width: W - indent, lineBreak: true });
  doc.moveDown(0.3);
}

function label(text: string) {
  doc.fillColor(C.gray).fontSize(8).font("Helvetica-Bold")
    .text(text.toUpperCase(), 55, doc.y, { width: W });
  doc.moveDown(0.2);
}

// ─── Page de garde ───────────────────────────────────────────────────────────

doc.rect(0, 0, doc.page.width, 200).fill(C.blue);
doc.fillColor("white").fontSize(28).font("Helvetica-Bold")
  .text("StartKaba", 55, 60, { width: W });
doc.fontSize(14).font("Helvetica")
  .text("Contenu pedagogique — Niveaux 1, 2 et 3", 55, 100, { width: W });
doc.fontSize(10).fillColor("rgba(255,255,255,0.7)")
  .text("Document de relecture externe — Export auto-genere", 55, 130, { width: W });

doc.fillColor(C.dark).fontSize(10).font("Helvetica")
  .text(`Genere le : ${new Date().toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  })}`, 55, 230);

doc.moveDown(1);
doc.fillColor(C.gray).fontSize(9).font("Helvetica")
  .text(
    "Ce document presente l'integralite du contenu pedagogique des 3 premiers niveaux de StartKaba, " +
    "incluant tous les exercices, questions, scenarios, micro-inputs et templates de reflexion. " +
    "Il est destine a une relecture humaine pour validation pedagogique.",
    55, doc.y, { width: W }
  );

// Sommaire
doc.moveDown(2);
doc.fillColor(C.blue).fontSize(13).font("Helvetica-Bold")
  .text("Sommaire", 55, doc.y);
doc.moveDown(0.5);
hLine(C.blue, 1.5);

const levelSummary = LEVELS_TO_EXPORT.map((lId) => {
  const level = levels.find((l) => l.id === lId)!;
  const levelTasks = tasks.filter((t) => t.levelId === lId);
  return { level, tasks: levelTasks };
});

for (const { level, tasks: lTasks } of levelSummary) {
  doc.fillColor(C.blue).fontSize(10).font("Helvetica-Bold")
    .text(`Niveau ${level.id} — ${level.title}`, 55, doc.y);
  doc.fillColor(C.gray).fontSize(8.5).font("Helvetica")
    .text(`${lTasks.length} taches • ${level.totalXp} XP total`, 55, doc.y);
  for (const t of lTasks) {
    const exCount = (t.lesson?.exercises?.length ?? 0);
    doc.fillColor(C.dark).fontSize(8.5).font("Helvetica")
      .text(`  • Tache ${t.id} — ${t.title} (${t.xp} XP, ${exCount} exercices)`,
        65, doc.y, { width: W - 10 });
  }
  doc.moveDown(0.4);
}

// ─── Rendu exercice ──────────────────────────────────────────────────────────

function renderExercise(ex: Exercise, index: number) {
  checkNewPage(100);

  const color = TYPE_COLORS[ex.type] ?? C.gray;
  const typeLabel = TYPE_LABELS[ex.type] ?? ex.type.toUpperCase();

  // Bandeau exercice
  const bandeauY = doc.y;
  doc.rect(55, bandeauY, W, 22).fill("#F3F4F6");
  doc.fillColor(color).fontSize(8).font("Helvetica-Bold")
    .text(`Ex. ${index + 1} — ${typeLabel}`, 60, bandeauY + 7, { lineBreak: false });
  doc.fillColor(C.gray).fontSize(8).font("Helvetica")
    .text(`+${ex.xp} XP`, 55 + W - 40, bandeauY + 7, { lineBreak: false });
  doc.y = bandeauY + 26;

  // ── info ──────────────────────────────────────────────────────────────────
  if (ex.type === "info") {
    doc.fillColor(C.dark).fontSize(10.5).font("Helvetica-Bold")
      .text(ex.title, 55, doc.y, { width: W });
    doc.moveDown(0.3);
    bodyText(ex.content);
  }

  // ── mcq ───────────────────────────────────────────────────────────────────
  else if (ex.type === "mcq") {
    label("Question");
    bodyText(ex.question);
    label("Options");
    ex.options.forEach((opt, i) => {
      const isCorrect = i === ex.correctIndex;
      const prefix = isCorrect ? "✓" : String.fromCharCode(65 + i);
      doc.fillColor(isCorrect ? C.green : C.dark)
        .fontSize(9.5).font(isCorrect ? "Helvetica-Bold" : "Helvetica")
        .text(`${prefix}. ${opt}`, 65, doc.y, { width: W - 10 });
      doc.moveDown(0.2);
    });
    doc.moveDown(0.2);
    label("Explication");
    bodyText(ex.explanation, { color: C.gray });
  }

  // ── scenario ──────────────────────────────────────────────────────────────
  else if (ex.type === "scenario") {
    label("Contexte");
    bodyText(ex.context);
    label("Question");
    bodyText(ex.question);
    label("Options");
    ex.options.forEach((opt, i) => {
      const isCorrect = i === ex.correctIndex;
      const prefix = isCorrect ? "✓" : String.fromCharCode(65 + i);
      doc.fillColor(isCorrect ? C.green : C.dark)
        .fontSize(9.5).font(isCorrect ? "Helvetica-Bold" : "Helvetica")
        .text(`${prefix}. ${opt}`, 65, doc.y, { width: W - 10 });
      doc.moveDown(0.2);
    });
    doc.moveDown(0.2);
    label("Explication");
    bodyText(ex.explanation, { color: C.gray });
  }

  // ── true_false ────────────────────────────────────────────────────────────
  else if (ex.type === "true_false") {
    label("Affirmation");
    bodyText(ex.statement);
    label("Reponse correcte");
    bodyText(ex.isTrue ? "VRAI" : "FAUX", { color: ex.isTrue ? C.green : C.red });
    label("Explication");
    bodyText(ex.explanation, { color: C.gray });
  }

  // ── fill_blank ────────────────────────────────────────────────────────────
  else if (ex.type === "fill_blank") {
    label("Template (avec trous)");
    bodyText(ex.template);
    label("Reponses attendues");
    ex.blanks.forEach((b, i) => {
      bodyText(`{${i}} → ${b}`, { indent: 10 });
    });
    label("Type de reponse");
    bodyText(ex.isOpenAnswer ? "Reponse ouverte (libre)" : "Reponse fermee (choix unique)");
  }

  // ── match ─────────────────────────────────────────────────────────────────
  else if (ex.type === "match") {
    label("Paires a associer");
    ex.pairs.forEach((p) => {
      doc.fillColor(C.dark).fontSize(9.5).font("Helvetica")
        .text(`${p.left}`, 65, doc.y, { width: (W - 30) / 2, lineBreak: false });
      doc.fillColor(C.blue).font("Helvetica-Bold")
        .text(" ↔  " + p.right, 65 + (W - 30) / 2, doc.y, { width: (W - 30) / 2 });
      doc.moveDown(0.3);
    });
  }

  // ── reorder ───────────────────────────────────────────────────────────────
  else if (ex.type === "reorder") {
    label("Items dans l'ordre correct");
    ex.items.forEach((item, i) => {
      bodyText(`${i + 1}. ${item}`, { indent: 10 });
    });
  }

  // ── micro_input ───────────────────────────────────────────────────────────
  else if (ex.type === "micro_input") {
    label(`Brique stockee sous : "${ex.storageKey}"`);
    bodyText(ex.prompt);
    label("Exemple de reponse");
    doc.rect(55, doc.y, W, 1).fill("#E5E7EB");
    doc.moveDown(0.3);
    bodyText(ex.placeholder, { color: C.gray, indent: 8 });
    doc.rect(55, doc.y, W, 1).fill("#E5E7EB");
    doc.moveDown(0.3);
  }

  // ── reflection_template ───────────────────────────────────────────────────
  else if (ex.type === "reflection_template") {
    label("Introduction");
    bodyText(ex.intro, { color: C.gray });
    label("Template (avec briques pre-remplies)");
    doc.rect(55, doc.y, W, 1).fill(C.blue);
    doc.moveDown(0.3);
    const templateLines = ex.template.split("\\n");
    for (const line of templateLines) {
      if (line.trim() === "") { doc.moveDown(0.3); continue; }
      doc.fillColor(C.dark).fontSize(9).font("Helvetica")
        .text(line, 65, doc.y, { width: W - 10 });
      doc.moveDown(0.25);
    }
    doc.rect(55, doc.y, W, 1).fill(C.blue);
    doc.moveDown(0.4);
    label("Variables injectees");
    bodyText(ex.variables.join(", "), { color: C.purple });
  }

  // ── self_check ────────────────────────────────────────────────────────────
  else if (ex.type === "self_check") {
    label("Titre");
    bodyText(ex.title);
    label("Description");
    bodyText(ex.description);
    if (ex.checklist?.length) {
      label("Checklist");
      ex.checklist.forEach((item) => {
        bodyText(`☐  ${item.label}`, { indent: 10 });
      });
    }
  }

  doc.moveDown(0.6);
}

// ─── Rendu principal ─────────────────────────────────────────────────────────

for (const levelId of LEVELS_TO_EXPORT) {
  const level = levels.find((l) => l.id === levelId)!;
  const levelTasks = tasks.filter((t) => t.levelId === levelId);

  // ── En-tête niveau ────────────────────────────────────────────────────────
  doc.addPage();
  doc.rect(0, 0, doc.page.width, 120).fill(C.blue);
  doc.fillColor("white").fontSize(11).font("Helvetica")
    .text(`NIVEAU ${level.id}`, 55, 40);
  doc.fontSize(22).font("Helvetica-Bold")
    .text(level.title, 55, 58);
  doc.fontSize(10).font("Helvetica")
    .text(level.subtitle, 55, 88);

  doc.y = 140;
  doc.fillColor(C.gray).fontSize(9).font("Helvetica")
    .text(level.description, 55, doc.y, { width: W });
  doc.moveDown(0.5);

  // Stats niveau
  const totalExercises = levelTasks.reduce(
    (n, t) => n + (t.lesson?.exercises?.length ?? 0), 0
  );
  doc.fillColor(C.blue).fontSize(9).font("Helvetica-Bold")
    .text(
      `${levelTasks.length} taches   •   ${totalExercises} exercices   •   ${level.totalXp} XP total`,
      55, doc.y
    );
  doc.moveDown(1.2);
  hLine(C.blue, 2);

  // ── Tâches ────────────────────────────────────────────────────────────────
  for (const task of levelTasks) {
    checkNewPage(120);

    // Titre tâche
    doc.rect(55, doc.y, W, 36).fill("#EFF6FF");
    const taskY = doc.y + 8;
    doc.fillColor(C.blue).fontSize(12).font("Helvetica-Bold")
      .text(`Tache ${task.id} — ${task.title}`, 62, taskY, { width: W - 80, lineBreak: false });
    doc.fillColor(C.orange).fontSize(10).font("Helvetica-Bold")
      .text(`${task.xp} XP`, 55 + W - 55, taskY, { lineBreak: false });
    doc.y = doc.y + 36 + 8;

    // Description + meta
    if (task.description) {
      bodyText(task.description, { color: C.gray });
    }

    if (task.recapLabel) {
      doc.fillColor(C.purple).fontSize(8.5).font("Helvetica-Bold")
        .text(`Recap card : ${task.recapLabel}`, 55, doc.y);
      doc.moveDown(0.3);
    }

    const badge = getBadgeForTask(task.id);
    if (badge) {
      doc.fillColor(C.orange).fontSize(8.5).font("Helvetica-Bold")
        .text(badge, 55, doc.y);
      doc.moveDown(0.3);
    }

    // Leçon
    if (task.lesson) {
      doc.moveDown(0.3);
      doc.fillColor(C.blue).fontSize(9.5).font("Helvetica-Bold")
        .text(`Lecon : ${task.lesson.title}`, 55, doc.y);
      doc.moveDown(0.5);
      hLine("#DBEAFE");

      const exercises = task.lesson.exercises ?? [];
      for (let i = 0; i < exercises.length; i++) {
        checkNewPage(80);
        renderExercise(exercises[i], i);
        if (i < exercises.length - 1) {
          doc.moveDown(0.2);
          hLine("#F3F4F6");
        }
      }
    }

    doc.moveDown(1);
    hLine(C.blue, 1.5);
    doc.moveDown(0.5);
  }
}

// ─── Page de fin ─────────────────────────────────────────────────────────────

doc.addPage();
doc.rect(0, 0, doc.page.width, 150).fill(C.blue);
doc.fillColor("white").fontSize(20).font("Helvetica-Bold")
  .text("Fin du document", 55, 60);
doc.fontSize(10).font("Helvetica")
  .text("StartKaba — Contenu pedagogique Niveaux 1, 2 et 3", 55, 95);

doc.y = 180;
doc.fillColor(C.gray).fontSize(9).font("Helvetica")
  .text(
    "Ce document a ete genere automatiquement depuis src/data/tasks.ts. " +
    "Pour toute remarque pedagogique, merci d'annoter directement ce PDF " +
    "ou de creer une issue sur le repository StartKaba.",
    55, doc.y, { width: W }
  );

// ─── Numérotation pages ───────────────────────────────────────────────────────

const pageRange = doc.bufferedPageRange();
for (let i = pageRange.start; i < pageRange.start + pageRange.count; i++) {
  doc.switchToPage(i);
  doc.fillColor(C.gray).fontSize(8).font("Helvetica")
    .text(
      `StartKaba — Niveaux 1-2-3    |    Page ${i + 1} / ${pageRange.count}`,
      55, doc.page.height - 35,
      { width: W, align: "center" }
    );
}

// ─── Fin ─────────────────────────────────────────────────────────────────────

doc.end();
stream.on("finish", () => {
  console.log(`\n✅ PDF genere avec succes :\n   ${OUTPUT_FILE}\n`);
});
stream.on("error", (err) => {
  console.error("Erreur génération PDF :", err);
  process.exit(1);
});
