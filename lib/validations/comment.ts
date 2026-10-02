/**
 * lib/validations/comment.ts
 *
 * Zod schema for story comment submission.
 */
import { z } from "zod";

export const commentSchema = z.object({
  post_id: z.string().uuid("Invalid post ID"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  message: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(1000, "Comment is too long"),
});

export type CommentInput = z.infer<typeof commentSchema>;
