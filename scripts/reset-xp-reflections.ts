/**
 * Finishes the reset for sokpononjores@gmail.com:
 * - Subtracts 225 XP from user_profiles
 * - Deletes task_reflections for tasks 102/103/104
 * - Deletes user_micro_inputs for tasks 102/103/104
 * (user_progress was already deleted by previous script)
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
  const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) throw error;
  const user = users.users.find((u) => u.email === TARGET_EMAIL);
  if (!user) throw new Error(`Utilisateur ${TARGET_EMAIL} introuvable`);
  const userId = user.id;
  console.log(`✓ Utilisateur trouvé : ${userId}`);

  // XP
  const profile = await prisma.userProfile.findUnique({ where: { id: userId } });
  if (!profile) throw new Error("Profil introuvable");
  const oldXp = profile.totalXp;
  const newXp = Math.max(0, oldXp - XP_TO_SUBTRACT);
  await prisma.userProfile.update({ where: { id: userId }, data: { totalXp: newXp } });
  console.log(`✓ totalXp mis à jour : ${oldXp} → ${newXp} (−${XP_TO_SUBTRACT})`);

  // Badges
  const badgesCount = await prisma.userBadge.count({ where: { userId } });
  console.log(`ℹ️  Badges actuels : ${badgesCount} (non modifiés)`);

  // Reflections
  const reflDel = await prisma.taskReflection.deleteMany({
    where: { userId, taskId: { in: TASK_IDS } },
  });
  console.log(`✓ task_reflections supprimées : ${reflDel.count}`);

  // Micro inputs
  const microDel = await prisma.userMicroInput.deleteMany({
    where: { userId, taskId: { in: TASK_IDS } },
  });
  console.log(`✓ user_micro_inputs supprimées : ${microDel.count}`);

  console.log("\n✅ Réinitialisation terminée.");
  console.log(`   XP total : ${oldXp} → ${newXp}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
