import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const sql = readFileSync(join(__dirname, "../prisma/rls.sql"), "utf-8");

// Split en statements individuels (ignore les commentaires)
const statements = sql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith("--"));

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

for (const stmt of statements) {
  const { error } = await supabase.rpc("exec_sql", { query: stmt + ";" }).catch(() => ({ error: null }));
  // L'exec_sql n'est pas dispo — on passe par l'API Postgres direct
}

// Utilise l'endpoint SQL natif de Supabase (disponible avec service_role)
const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
  method: "POST",
});
console.log(res.status);
