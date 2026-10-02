/**
 * lib/validations/lead.ts
 *
 * Zod schemas for lead/requirement form validation.
 */
import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long"),

  whatsapp: z
    .string()
    .max(15)
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  intent: z.enum(["buy", "sell", "loan", "consultation", "management"]),

  property_type: z
    .enum(["plot", "apartment", "house", "commercial", "agricultural", "other"])
    .optional()
    .or(z.literal("")),

  preferred_location: z.string().max(200).optional().or(z.literal("")),

  budget: z.string().max(100).optional().or(z.literal("")),

  message: z.string().max(1000, "Message is too long").optional().or(z.literal("")),

  source: z.string().default("website"),
});

export type LeadInput = z.infer<typeof leadSchema>;
