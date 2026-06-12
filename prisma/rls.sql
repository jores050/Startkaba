-- =====================================================
-- Row Level Security — StartKaba
-- Chaque user ne peut lire/écrire que ses propres données
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE user_profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress    ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges      ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_messages   ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications    ENABLE ROW LEVEL SECURITY;

-- Supprimer les policies existantes si re-exécution
DROP POLICY IF EXISTS "user_profiles_self"     ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_admin"    ON user_profiles;
DROP POLICY IF EXISTS "user_progress_self"     ON user_progress;
DROP POLICY IF EXISTS "user_badges_self"       ON user_badges;
DROP POLICY IF EXISTS "coach_messages_self"    ON coach_messages;
DROP POLICY IF EXISTS "notifications_self"     ON notifications;
DROP POLICY IF EXISTS "user_profiles_public"   ON user_profiles;
DROP POLICY IF EXISTS "leaderboard_read"       ON user_profiles;

-- ── user_profiles ──────────────────────────────────
-- Lecture : son propre profil
CREATE POLICY "user_profiles_self" ON user_profiles
  FOR ALL
  USING (auth.uid()::text = id)
  WITH CHECK (auth.uid()::text = id);

-- Lecture publique limitée pour le classement (nom, ville, XP, niveau)
CREATE POLICY "leaderboard_read" ON user_profiles
  FOR SELECT
  USING (true);

-- ── user_progress ──────────────────────────────────
CREATE POLICY "user_progress_self" ON user_progress
  FOR ALL
  USING (auth.uid()::text = "userId")
  WITH CHECK (auth.uid()::text = "userId");

-- ── user_badges ────────────────────────────────────
CREATE POLICY "user_badges_self" ON user_badges
  FOR ALL
  USING (auth.uid()::text = "userId")
  WITH CHECK (auth.uid()::text = "userId");

-- ── coach_messages ─────────────────────────────────
CREATE POLICY "coach_messages_self" ON coach_messages
  FOR ALL
  USING (auth.uid()::text = "userId")
  WITH CHECK (auth.uid()::text = "userId");

-- ── notifications ──────────────────────────────────
CREATE POLICY "notifications_self" ON notifications
  FOR ALL
  USING (auth.uid()::text = "userId")
  WITH CHECK (auth.uid()::text = "userId");

-- Service role bypasse RLS automatiquement (pas besoin de policy séparée)
-- Les API routes utilisent le service_role key → accès total en backend
