export type City = "COTONOU" | "ABIDJAN" | "DAKAR" | "LOME" | "BAMAKO" | "OTHER";
export type SubscriptionStatus = "FREE" | "PREMIUM";
export type ProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type MessageRole = "USER" | "ASSISTANT";
export type NotificationType =
  | "BADGE_EARNED"
  | "LEVEL_UNLOCKED"
  | "TASK_COMPLETED"
  | "MESSAGE_RECEIVED"
  | "SYSTEM";

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
  | { type: "reflection"; icon: string; question: string; placeholder: string; xp: number };

export interface Lesson {
  title: string;
  exercises: Exercise[];
}

// ─── Task ─────────────────────────────────────────────────────────────────────

export interface Task {
  id: number;
  levelId: number;
  title: string;
  description: string;
  xp: number;
  quiz?: QuizQuestion[];  // ancien format (niveaux 2-8 en attente de migration)
  lesson?: Lesson;        // format Duolingo
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
