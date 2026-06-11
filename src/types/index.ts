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

export interface Task {
  id: number;
  levelId: number;
  title: string;
  description: string;
  xp: number;
  quiz: QuizQuestion[];
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
