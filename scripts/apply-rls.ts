import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const statements = [
  `ALTER TABLE user_profiles    ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE user_progress    ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE user_badges      ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE coach_messages   ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE notifications    ENABLE ROW LEVEL SECURITY`,
  `DROP POLICY IF EXISTS "user_profiles_self"   ON user_profiles`,
  `DROP POLICY IF EXISTS "leaderboard_read"     ON user_profiles`,
  `DROP POLICY IF EXISTS "user_progress_self"   ON user_progress`,
  `DROP POLICY IF EXISTS "user_badges_self"     ON user_badges`,
  `DROP POLICY IF EXISTS "coach_messages_self"  ON coach_messages`,
  `DROP POLICY IF EXISTS "notifications_self"   ON notifications`,
  `CREATE POLICY "leaderboard_read" ON user_profiles FOR SELECT USING (true)`,
  `CREATE POLICY "user_profiles_self" ON user_profiles FOR ALL USING (auth.uid()::text = id) WITH CHECK (auth.uid()::text = id)`,
  `CREATE POLICY "user_progress_self" ON user_progress FOR ALL USING (auth.uid()::text = "userId") WITH CHECK (auth.uid()::text = "userId")`,
  `CREATE POLICY "user_badges_self" ON user_badges FOR ALL USING (auth.uid()::text = "userId") WITH CHECK (auth.uid()::text = "userId")`,
  `CREATE POLICY "coach_messages_self" ON coach_messages FOR ALL USING (auth.uid()::text = "userId") WITH CHECK (auth.uid()::text = "userId")`,
  `CREATE POLICY "notifications_self" ON notifications FOR ALL USING (auth.uid()::text = "userId") WITH CHECK (auth.uid()::text = "userId")`,
];

async function main() {
  console.log("🔒 Application du RLS...");
  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt);
      console.log(`  ✓ ${stmt.slice(0, 65)}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("already exists")) {
        console.log(`  ~ déjà existant: ${stmt.slice(0, 50)}`);
      } else {
        console.error(`  ✗ ${msg}\n    > ${stmt}`);
      }
    }
  }
  console.log("\n✅ RLS configuré.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
