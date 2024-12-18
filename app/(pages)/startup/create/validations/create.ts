import { z } from "zod";

export const startupSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(5, "Title must be at least 5 characters long.")
    .max(500, "Title must be at most 500 characters long."),
  description: z
    .string({ required_error: "Description is required." })
    .min(20, "Description must be at least 20 characters long.")
    .max(500, "Description must be at most 500 characters long."),

  category: z
    .string({ required_error: "Category is required." })
    .min(3, "Category must be at least 3 characters long.")
    .max(500, "Category must be at most 500 characters long."),
  link: z
    .string({ required_error: "Link is required." })
    .url("Link must be a valid URL."),
  pitch: z
    .string({ required_error: "Pitch is required." })
    .min(10, "Pitch must be at least 10 characters long."),
});

export type StartupSchema = z.infer<typeof startupSchema>;
