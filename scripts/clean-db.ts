/**
 * Vide toutes les tables utilisateur de la base Supabase.
 * Utilise: npx tsx scripts/clean-db.ts
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

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

  console.log("\n✅ Base vidée. Tu peux créer un nouveau compte sur /signup.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
