# StartKaba

Plateforme de formation gamifiée pour les entrepreneurs d'Afrique de l'Ouest.
De l'idée au lancement officiel, en 8 niveaux, avec **Kaba** — un coach IA ancré dans les réalités UEMOA/OHADA.

Stack : Next.js 14 (App Router) · TypeScript · Tailwind · Prisma + Supabase (PostgreSQL) · Gemini (coach IA) · Resend (emails).

## Démarrage local

1. Installe les dépendances :
   ```bash
   npm install
   ```
2. Copie `.env.local.example` vers `.env.local` et renseigne les variables (voir le fichier pour le détail).
3. Génère le client Prisma puis aligne le schéma sur ta base :
   ```bash
   npx prisma generate
   npx prisma db push     # utilise DIRECT_URL (port 5432)
   ```
4. Lance le serveur de dev :
   ```bash
   npm run dev
   ```
5. Ouvre [http://localhost:3000](http://localhost:3000).

> **Dev sans Supabase réel** : mets `DEV_BYPASS_AUTH=true` dans `.env.local`. Les routes API basculent alors sur des mocks (`src/lib/dev/*`).

## Scripts

| Commande | Rôle |
|----------|------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Vérification TypeScript (0 erreur attendu) |

## Déploiement Vercel

Le projet est prêt pour Vercel (`vercel.json` : `prisma generate && next build`, région `fra1`).

1. **Créer le projet Vercel** : connecte le repo GitHub sur [vercel.com/new](https://vercel.com/new). Framework détecté : Next.js.
2. **Variables d'environnement** : ajoute dans Vercel (Project Settings → Environment Variables) **toutes** les variables documentées dans `.env.local.example` (Supabase, `DATABASE_URL`, `DIRECT_URL`, `GEMINI_API_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`, etc.).
3. **URLs Supabase prod** : Dashboard Supabase → Project Settings → Database :
   - `DATABASE_URL` = Transaction Pooler (port **6543**)
   - `DIRECT_URL` = Direct connection (port **5432**)
4. **Aligner le schéma (une seule fois)** : en local, avec les credentials **prod** dans `.env.local`, exécute :
   ```bash
   npx prisma db push
   ```
   (utilise `DIRECT_URL` ; ne jamais utiliser le pooler 6543 pour le `db push`).
5. **OAuth Google** : Dashboard Supabase → Authentication → Providers → Google. Renseigne le client ID/secret Google, puis ajoute l'URL de callback de production :
   ```
   https://<ton-projet>.vercel.app/auth/callback
   ```
   Mets aussi `NEXT_PUBLIC_APP_URL` à `https://<ton-projet>.vercel.app` dans Vercel.
6. **Déploie** : push sur la branche connectée → Vercel build automatiquement.

> Domaine custom : non configuré pour ce soft launch — on reste sur le sous-domaine `*.vercel.app`.

## Structure

```
src/
  app/            Routes (App Router) — pages + /api
  components/     Composants UI, gamification, exercices, légal, onboarding
  data/           Contenu pédagogique statique (tasks.ts, levels.ts, badges.ts…)
  lib/            Supabase, Prisma, Gemini, Resend, mocks dev, utils
  types/          Types partagés
prisma/
  schema.prisma   Modèle de données
```

Règles de contribution : voir `CLAUDE.md`.
