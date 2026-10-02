/**
 * lib/validations/contact.ts
 *
 * Zod schema for the contact form.
 */
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  phone: z
    .string()
    .max(15)
    .regex(/^[+\d\s\-()]{10,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  subject: z.string().max(200).optional().or(z.literal("")),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;
