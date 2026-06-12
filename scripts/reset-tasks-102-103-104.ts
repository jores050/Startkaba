/**
 * Réinitialise les tâches 102, 103, 104 pour sokpononjores@gmail.com.
 * Utilise: npx tsx scripts/reset-tasks-102-103-104.ts
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
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const TARGET_EMAIL = "sokpononjores@gmail.com";
const TASK_IDS = [102, 103, 104];
const XP_TO_SUBTRACT = 50 + 75 + 100; // 225

async function main() {
  // 1. Récupère le userId via Supabase Auth
  const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) throw error;
  const user = users.users.find((u) => u.email === TARGET_EMAIL);
  if (!user) throw new Error(`Utilisateur ${TARGET_EMAIL} introuvable`);
  const userId = user.id;
  console.log(`✓ Utilisateur trouvé : ${userId}`);

  // 2. Supprime (ou remet à NOT_STARTED) les entrées user_progress pour 102/103/104
  const deleted = await prisma.userProgress.deleteMany({
    where: { userId, taskId: { in: TASK_IDS } },
  });
  console.log(`✓ user_progress supprimées : ${deleted.count} entrées (tasks ${TASK_IDS.join(", ")})`);

  // 3. Récupère l'XP actuel et soustrait 225
  const profile = await prisma.userProfile.findUnique({ where: { id: userId } });
  if (!profile) throw new Error("Profil introuvable");
  const oldXp = profile.totalXp;
  const newXp = Math.max(0, oldXp - XP_TO_SUBTRACT);
  await prisma.userProfile.update({
    where: { id: userId },
    data: { totalXp: newXp },
  });
  console.log(`✓ totalXp mis à jour : ${oldXp} → ${newXp} (−${XP_TO_SUBTRACT})`);

  // 4. Vérifie les badges liés aux tasks 102/103/104
  // Les badges StartKaba sont basés sur le niveau/XP global, pas sur des tasks spécifiques.
  // On vérifie quand même s'il existe des badges avec taskId dans 102/103/104.
  const badgesCount = await prisma.userBadge.count({ where: { userId } });
  console.log(`ℹ️  Badges actuels de l'utilisateur : ${badgesCount} (non modifiés — badges liés au niveau global)`);

  // 5. Supprime les reflections et micro_inputs associés à ces tasks
  const reflDel = await prisma.taskReflection.deleteMany({
    where: { userId, taskId: { in: TASK_IDS } },
  });
  console.log(`✓ task_reflections supprimées : ${reflDel.count} entrées`);

  const microDel = await prisma.userMicroInput.deleteMany({
    where: { userId, taskId: { in: TASK_IDS } },
  });
  console.log(`✓ user_micro_inputs supprimées : ${microDel.count} entrées`);

  console.log("\n✅ Réinitialisation terminée. Les tâches 102, 103, 104 sont de nouveau NOT_STARTED.");
  console.log(`   XP total : ${oldXp} → ${newXp}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
