export type City = "COTONOU" | "ABIDJAN" | "DAKAR" | "LOME" | "BAMAKO" | "OTHER";
export type SubscriptionStatus = "FREE" | "PREMIUM";
export type ProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type MissionStatus = "LEARNING" | "MISSION_IN_PROGRESS" | "CAPTURING" | "COMPLETED";
export type MessageRole = "USER" | "ASSISTANT";
export type NotificationType =
  | "BADGE_EARNED"
  | "LEVEL_UNLOCKED"
  | "TASK_COMPLETED"
  | "MESSAGE_RECEIVED"
  | "CONNECTION_REQUEST"
  | "SYSTEM";

export type MentorStatus = "PENDING" | "APPROVED" | "REJECTED";
export type ContactMethod = "WHATSAPP" | "EMAIL" | "CALENDLY";
export type ConnectionStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export interface Mentor {
  id: string;
  userId: string | null;
  name: string;
  title: string;
  expertise: string[];
  bio: string;
  avatarUrl: string | null;
  contactMethod: ContactMethod;
  contactValue: string;
  availability: string;
  city: string;
  status: MentorStatus;
  createdAt: string;
}

export interface CommunityProfile {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  city: string;
  projectName: string | null;
  projectDescription: string | null;
  skills: string[];
  currentLevelId: number;
  lookingFor: string[];
  publicBio: string | null;
}

export interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string | null;
  status: ConnectionStatus;
  createdAt: string;
  fromUser?: { id: string; fullName: string; avatarUrl: string | null; email: string };
  toUser?: { id: string; fullName: string; avatarUrl: string | null; email: string };
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  city: City;
  bio?: string;
  projectName?: string;
  projectDescription?: string;
  skills: string[];
  currentLevelId: number;
  totalXp: number;
  subscriptionStatus: SubscriptionStatus;
  isAdmin: boolean;
  onboardingCompleted?: boolean;
  sector?: string | null;
  stage?: string | null;
  initialChallenge?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  taskId: number;
  levelId: number;
  status: ProgressStatus;
  quizScore?: number;
  completedAt?: Date;
  xpEarned: number;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: number;
  earnedAt: Date;
}

export interface CoachMessage {
  id: string;
  userId: string;
  levelId: number;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizAnswer {
  questionId: number;
  selectedIndex: number;
}

// ─── Lesson / Exercise (système Duolingo) ────────────────────────────────────

export type Exercise =
  | { type: "info"; icon: string; title: string; content: string; xp: number }
  | { type: "mcq"; question: string; options: string[]; correctIndex: number; explanation: string; xp: number }
  | { type: "true_false"; statement: string; isTrue: boolean; explanation: string; xp: number }
  | { type: "fill_blank"; template: string; blanks: string[]; isOpenAnswer: boolean; xp: number }
  | { type: "match"; pairs: { left: string; right: string }[]; xp: number }
  | { type: "reorder"; items: string[]; xp: number }
  | { type: "scenario"; context: string; question: string; options: string[]; correctIndex: number; explanation: string; xp: number }
  // Reflection simple (texte libre — format historique tâches 102-105+)
  | { type: "reflection"; icon: string; question: string; placeholder: string; xp: number }
  // Reflection template (assemblage de micro_inputs — format tâche 101+)
  | { type: "reflection_template"; intro: string; template: string; variables: string[]; xp: number }
  // Micro-input : saisie courte attachée à l'exercice précédent, crée une "brique"
  | { type: "micro_input"; prompt: string; placeholder: string; storageKey: string; xp: number }
  // Self-check : auto-évaluation par checklist (non bloquant, xp bonus optionnel)
  | { type: "self_check"; title: string; description: string; checklist: { id: string; label: string }[]; xp: number };

export interface Lesson {
  title: string;
  exercises: Exercise[];
}

// ─── Mission Config (système data-driven pour MissionPlayer) ─────────────────

export type CaptureFieldType = "texte_court" | "texte_moyen" | "oui_non_texte";

export interface CaptureFieldDef {
  id: string;
  label: string;
  type: CaptureFieldType;
  placeholder?: string;
  required: boolean;
}

export interface MissionConfig {
  type: "interviews" | "build" | "outreach" | "field_research";
  title: string;
  brief: string;
  icon: string;
  checkpointQuestion: string;
  checkpointMinLabel: string;
  checkpointCta: string;
  briefingPanels?: { title: string; items: string[] }[];
  ctaLabel: string;
  coachNiveau: number;
  hasRawNotes: boolean;
  rawNotesLabel?: string;
  rawNotesPlaceholder?: string;
  captureFields: CaptureFieldDef[];
  captureXP: number;
  completeSummary: string;
  completeContextLabel: string;
}

// ─── Task ─────────────────────────────────────────────────────────────────────

export interface Task {
  id: number;
  levelId: number;
  title: string;
  description: string;
  xp: number;
  recapLabel?: string;
  quiz?: QuizQuestion[];
  lesson?: Lesson;
  taskType?: "reflexion" | "mission";
  missionCaptureIndexes?: number[];  // exercise indexes shown only in Phase C
  missionConfig?: MissionConfig;
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tasks: Task[];
  badgeIds: number[];
  totalXp: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  fileKey: string;
  levelId?: number;
}
