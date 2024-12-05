import * as z from "zod";

export const locksmithSchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le téléphone est requis"),
  description: z.string().min(1, "La description est requise"),
  cities: z.array(z.string()).min(1, "Sélectionnez au moins une ville"),
  services: z.array(z.string()).min(1, "Sélectionnez au moins un service"),
  workingHours: z.object({
    is24h: z.boolean(),
    schedule: z.object({
      monday: z.string(),
      tuesday: z.string(),
      wednesday: z.string(),
      thursday: z.string(),
      friday: z.string(),
      saturday: z.string(),
      sunday: z.string(),
    }).optional(),
  }),
});

export type LocksmithFormData = z.infer<typeof locksmithSchema>;