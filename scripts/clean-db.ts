/**
 * Vide toutes les tables utilisateur + supprime les comptes Supabase Auth.
 * Utilise: npx tsx scripts/clean-db.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createClient } from "@supabase/supabase-js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // service role = accès admin Auth
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function main() {
  console.log("🗑️  Nettoyage des tables...\n");

  const notifications = await prisma.notification.deleteMany();
  console.log(`  ✓ notifications       — ${notifications.count} supprimées`);

  const badges = await prisma.userBadge.deleteMany();
  console.log(`  ✓ user_badges         — ${badges.count} supprimés`);

  const messages = await prisma.coachMessage.deleteMany();
  console.log(`  ✓ coach_messages      — ${messages.count} supprimés`);

  const progress = await prisma.userProgress.deleteMany();
  console.log(`  ✓ user_progress       — ${progress.count} supprimés`);

  const profiles = await prisma.userProfile.deleteMany();
  console.log(`  ✓ user_profiles       — ${profiles.count} supprimés`);

  // Supprimer aussi les comptes Supabase Auth pour éviter les conflits d'email
  // lors de la recréation de compte (unique constraint sur email).
  console.log("\n  Suppression des comptes Auth Supabase...");
  const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) {
    console.warn(`  ⚠️  Impossible de lister les utilisateurs Auth: ${error.message}`);
  } else {
    for (const u of users.users) {
      const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(u.id);
      if (delErr) {
        console.warn(`  ⚠️  Erreur suppression ${u.email}: ${delErr.message}`);
      } else {
        console.log(`  ✓ auth user supprimé  — ${u.email}`);
      }
    }
  }

  console.log("\n✅ Base vidée. Crée un nouveau compte sur /signup.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
