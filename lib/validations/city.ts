import * as z from "zod";

export const citySchema = z.object({
  // SEO Fields
  metaTitle: z.string().min(1, "Le titre meta est requis"),
  metaDescription: z.string().min(1, "La description meta est requise"),
  imageUrl: z.string().url("L'URL de l'image n'est pas valide"),
  imageAlt: z.string().min(1, "Le texte alternatif de l'image est requis"),

  // Page Content
  name: z.string().min(1, "Le nom est requis"),
  introduction: z.string().min(1, "L'introduction est requise"),
  mainContent: z.string().min(1, "Le contenu principal est requis"),
  
  // City Data
  count: z.string().min(1, "Le nombre de serruriers est requis"),
  linkedCities: z.array(z.string()).default([]),
  showInMenu: z.boolean().default(false),
  
  // Additional Content
  content: z.object({
    services: z.array(z.string()),
    prices: z.array(
      z.object({
        service: z.string(),
        price: z.string(),
        details: z.string(),
      })
    ),
    testimonial: z.object({
      text: z.string(),
      author: z.string(),
    }),
  }).default({
    services: [],
    prices: [],
    testimonial: { text: "", author: "" },
  }),
});

export type CityFormData = z.infer<typeof citySchema>;