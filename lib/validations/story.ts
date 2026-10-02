/**
 * lib/validations/story.ts
 *
 * Zod schema for Surabi Stories post creation and editing.
 */
import { z } from "zod";

export const storySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title is too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(3000, "Description is too long"),

  category: z.enum([
    "achievement",
    "client_success",
    "property_update",
    "business_update",
    "event",
    "client_appreciation",
  ]),

  image_url: z.string().url().optional().or(z.literal("")).nullable(),

  status: z.enum(["draft", "published"]).default("draft"),
});

export type StoryInput = z.infer<typeof storySchema>;
