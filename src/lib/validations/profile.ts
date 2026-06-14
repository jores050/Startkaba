import { z } from "zod";

export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .min(2, "Le nom complet doit contenir au moins 2 caractères")
    .max(100, "Le nom complet est trop long"),
  city: z.enum(["COTONOU", "ABIDJAN", "DAKAR", "LOME", "BAMAKO", "OTHER"]),
  bio: z
    .string()
    .max(200, "La bio ne peut pas dépasser 200 caractères")
    .optional()
    .or(z.literal("")),
  projectName: z
    .string()
    .max(100, "Le nom du projet est trop long")
    .optional()
    .or(z.literal("")),
  projectDescription: z
    .string()
    .max(1000, "La description du projet est trop longue")
    .optional()
    .or(z.literal("")),
  skills: z
    .array(z.string().min(1).max(30))
    .max(15, "Maximum 15 compétences"),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  isOpenToCofounder: z.boolean().optional(),
  lookingFor: z.array(z.string().max(50)).max(6).optional(),
  publicBio: z.string().max(200).optional().or(z.literal("")),
  showcaseOptIn: z.boolean().optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
