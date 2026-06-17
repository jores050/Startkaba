import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Le nom complet doit contenir au moins 2 caractères")
    .max(100, "Le nom complet est trop long"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  city: z.enum(["COTONOU", "ABIDJAN", "DAKAR", "LOME", "BAMAKO", "OTHER"]),
  acceptedTerms: z
    .string()
    .refine((v) => v === "on", "Tu dois accepter les CGU et la politique de confidentialité."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;

export const CITIES: { value: SignupInput["city"]; label: string }[] = [
  { value: "COTONOU", label: "Cotonou 🇧🇯" },
  { value: "ABIDJAN", label: "Abidjan 🇨🇮" },
  { value: "DAKAR", label: "Dakar 🇸🇳" },
  { value: "LOME", label: "Lomé 🇹🇬" },
  { value: "BAMAKO", label: "Bamako 🇲🇱" },
  { value: "OTHER", label: "Autre ville" },
];
