import { z } from "zod";

export const schema = z.object({
    name: z.string().trim().min(1, "Le nom est obligatoire"),
    reference: z.string().trim().min(1, "La référence est obligatoire"),
    categoryId: z.string({ message: "Choisis une catégorie" }),
    quantity: z.string().regex(/^\d+$/, "Nombre entier, 0 ou plus").transform(Number),
    alertThreshold: z.string().regex(/^\d+$/, "Nombre entier, 0 ou plus").transform(Number),
    description: z.string().trim().max(1000, "1000 caractères maximum"),
});

export const productUpdateSchema = schema.omit({ quantity: true });