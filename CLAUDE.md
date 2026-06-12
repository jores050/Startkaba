# CLAUDE.md — Règles de développement StartKaba

## Règle : alignement micro_input / exercice précédent

Un exercice `micro_input` ne suit **que** l'exercice qui enseigne **explicitement** le concept demandé dans son `prompt`.

**Règle stricte :** ne jamais associer un `micro_input` à un exercice dont le contenu ne correspond pas directement à la question posée.

**Exemples corrects :**
- MCQ qui enseigne "un client précis = âge/lieu/situation" → `micro_input` "Décris ton client aussi précisément" (storageKey: "qui")
- Scénario qui enseigne "symptôme vs vrai problème" → `micro_input` "Quel est le vrai problème de ton client ?" (storageKey: "probleme")
- Scénario qui enseigne "bénéfice unique concret + différenciant" → `micro_input` "Quel est ton bénéfice unique ?" (storageKey: "benefice")

**Exemples incorrects :**
- Un `micro_input` sur "ton client" placé après un exercice sur les caractéristiques d'une UVP → l'exercice n'enseigne pas comment décrire un client
- Un `micro_input` sur "ton bénéfice" placé après un exercice sur le vrai problème → saut de concept

**Test de validation avant d'ajouter un micro_input :**
> "Est-ce que l'exercice précédent enseigne EXACTEMENT ce concept, ou enseigne-t-il autre chose dont ce concept découle indirectement ?"
> Si "indirectement" → ne pas ajouter le micro_input ici, trouver l'exercice qui enseigne directement.

---

## Architecture exercices (types disponibles)

| Type | Usage | XP typique |
|------|-------|-----------|
| `info` | Apport de concept, lecture | 5 |
| `mcq` | QCM, enseigne un concept via choix | 8–10 |
| `scenario` | Cas pratique contextuel, enseigne via exemple africain | 8–10 |
| `true_false` | Vrai/Faux sur un concept | 5 |
| `fill_blank` | Compléter une phrase (fermé ou ouvert) | 8 |
| `match` | Associer des paires | 8 |
| `reorder` | Remettre dans l'ordre | 8 |
| `micro_input` | Saisie courte, crée une "brique" (storageKey) | 2–3 |
| `reflection` | Texte libre long, sauvegardé dans `task_reflections` | 5–10 |
| `reflection_template` | Assemblage de briques micro_input, éditable, sauvegardé dans `task_reflections` | 5–10 |

## Flux de données micro_input → reflection_template

1. Chaque `micro_input` est collecté dans `microInputsRef` (Map storageKey → value) pendant la leçon
2. Quand l'index atteint un exercice `reflection_template`, le template est pré-rempli via `exercise.template.replace(/\{(\w+)\}/g, key => microInputsRef.current.get(key))`
3. L'utilisateur peut éditer le texte assemblé
4. À la complétion de la leçon, `microInputs` et `reflections` sont envoyés à `/api/tasks/[id]/complete-lesson`
5. En prod → `user_micro_inputs` table (briques) + `task_reflections` table (texte final)
6. En dev → `mockMicroInputs` + `mockReflections` (singletons globalThis)

## Récap de niveau (`/parcours/[niveau]/recap`)

Les cards "Ce que tu as construit" sont définies dans `LEVEL_RECAP_CARDS` (`src/data/level-meta.ts`).
Pour chaque tâche ayant une `reflection` ou `reflection_template`, ajouter une entrée avec le bon `exerciseIndex` (0-based dans `lesson.exercises`).

**Tâche 101 :** `reflection_template` à l'index 9.

## Conventions XP tâche 101 (modèle pour les autres tâches niveau 1)

Total 50 XP répartis :
- info × 2 : 5 + 5 = 10
- mcq × 1 : 8
- scenario × 2 : 8 + 8 = 16
- micro_input × 3 : 2 + 2 + 2 = 6
- true_false × 1 : 5
- reflection_template × 1 : 5

## RÈGLE OBLIGATOIRE — Vérification post-modification

Après **TOUTE** modification de code (nouveau composant, nouveau type, nouvelle page, modification de données), avant de considérer la tâche terminée :

1. Lance `npx tsc --noEmit` — doit retourner 0 erreur
2. Si erreur TS : corrige avant de continuer
3. Relance `npm run dev` (ou vérifie qu'il tourne déjà sans erreur dans les logs)
4. Vérifie dans les logs serveur qu'il n'y a pas d'erreur de compilation
5. Si le CSS/Tailwind semble ne plus charger (page sans style, HTML brut) :
   - `rm -rf .next node_modules/.cache`
   - Relance `npm run dev`
   - Vérifie que `globals.css` est bien importé dans `layout.tsx`

Ne signaler une tâche comme "terminée" qu'après avoir confirmé que l'app tourne **sans erreur** ET que le style StartKaba (couleurs `#0722AB`, `#F77E2D`, etc.) s'affiche correctement.

> **Cause récurrente connue :** quand le serveur crashe (EPIPE, Ctrl+C partiel), le processus Node reste accroché sur le port 3000. Le prochain `npm run dev` bascule silencieusement sur 3001 — le navigateur sur `localhost:3000` frappe l'ancien serveur mort → HTML sans style. Corriger : `Get-Process node | Stop-Process -Force`, puis `rm -rf .next`, puis relancer.

---

## Règles générales

- `npm run dev` doit démarrer sans erreur ESLint ni TypeScript
- Après tout changement de `prisma/schema.prisma` : `npx prisma generate`
- Le mock dev (`src/lib/dev/mock-progress.ts`) doit toujours refléter les nouvelles tables Prisma
