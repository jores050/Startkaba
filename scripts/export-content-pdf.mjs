/**
 * Génère un PDF de relecture du contenu pédagogique StartKaba — niveaux 1, 2 et 3.
 * Usage : node scripts/export-content-pdf.mjs
 */

import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// ─── Import des données via un require dynamique transpilé ───────────────────
// On importe le JSON pré-extrait (généré ci-dessous depuis tasks.ts)
import { tasks } from '../src/data/tasks.js'; // ne marchera pas directement
// On utilise plutôt un import via tsx/register ou on embarque les données
// → Solution : on charge le contenu via une sérialisation intermédiaire.

console.error('Ce script doit être lancé via tsx. Utilisez : npx tsx scripts/export-content-pdf.mjs');
process.exit(1);
