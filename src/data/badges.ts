import type { Badge } from "@/types";

export const badges: Badge[] = [
  { id: 1, name: "Premier Pas", description: "Compléter sa première tâche", icon: "👣", condition: "first_task" },
  { id: 2, name: "Idée Forgée", description: "Compléter le Niveau 1", icon: "🔥", condition: "level_1_complete" },
  { id: 3, name: "Ethnographe", description: "Compléter la tâche 5 interviews", icon: "🎙️", condition: "task_interviews" },
  { id: 4, name: "Marché Validé", description: "Compléter le Niveau 2", icon: "✅", condition: "level_2_complete" },
  { id: 5, name: "Architecte", description: "Compléter la tâche BMC", icon: "🏗️", condition: "task_bmc" },
  { id: 6, name: "Modèle Ancré", description: "Compléter le Niveau 3", icon: "📐", condition: "level_3_complete" },
  { id: 7, name: "Bâtisseur", description: "Soumettre le lien MVP", icon: "🔨", condition: "task_mvp_link" },
  { id: 8, name: "Premier Client", description: "Tâche 10 utilisateurs", icon: "🤝", condition: "task_10_users" },
  { id: 9, name: "MVP Livré", description: "Compléter le Niveau 4", icon: "🚀", condition: "level_4_complete" },
  { id: 10, name: "Fan de Kaba", description: "20 messages avec Kaba", icon: "🤖", condition: "kaba_20_messages" },
  { id: 11, name: "Top 10 Ville", description: "Entrer dans le top 10 de sa ville", icon: "🏆", condition: "top_10_city" },
  { id: 12, name: "Premier Cercle", description: "Construire sa liste de 50 contacts chauds", icon: "📣", condition: "task_50_contacts" },
  { id: 13, name: "Acquisition Lancée", description: "Compléter le Niveau 5", icon: "🎯", condition: "level_5_complete" },
  { id: 14, name: "Structuré", description: "Choisir son statut juridique OHADA", icon: "⚖️", condition: "task_statut_juridique" },
  { id: 15, name: "Cadre Légal Posé", description: "Compléter le Niveau 6", icon: "📋", condition: "level_6_complete" },
  { id: 16, name: "Pitch Prêt", description: "Créer son pitch deck", icon: "💰", condition: "task_pitch_deck" },
  { id: 17, name: "Financement Structuré", description: "Compléter le Niveau 7", icon: "🏦", condition: "level_7_complete" },
  { id: 18, name: "Lancé !", description: "Effectuer son lancement officiel", icon: "🚀", condition: "task_lancement_officiel" },
  { id: 19, name: "Entrepreneur StartKaba", description: "Compléter les 8 niveaux du parcours", icon: "🏆", condition: "level_8_complete" },
];

export function getBadgeById(id: number): Badge | undefined {
  return badges.find((b) => b.id === id);
}
