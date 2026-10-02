/**
 * lib/validations/property.ts
 *
 * Zod schema for property creation and editing.
 */
import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title is too long"),

  property_type: z.enum([
    "plot",
    "apartment",
    "house",
    "commercial",
    "agricultural",
    "other",
  ]),

  location: z
    .string()
    .min(2, "Location is required")
    .max(300, "Location is too long"),

  city: z.string().min(2, "City is required").max(100, "City name is too long"),

  area_sqft: z.coerce
    .number()
    .positive("Area must be a positive number")
    .optional()
    .nullable(),

  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .optional()
    .nullable(),

  price_label: z.string().max(100).optional().or(z.literal("")),

  description: z.string().max(5000, "Description is too long").optional().or(z.literal("")),

  features: z.array(z.string().max(200)).max(20).default([]),

  status: z.enum(["available", "reserved", "sold", "inactive"]).default("available"),

  is_featured: z.boolean().default(false),

  cover_image_url: z.string().url().optional().or(z.literal("")).nullable(),
});

export type PropertyInput = z.infer<typeof propertySchema>;
