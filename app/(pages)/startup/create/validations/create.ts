import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(20, "Title must be at least 20 characters long.")
    .max(500, "Title must be at most 500 characters long."),
  category: z
    .string({ required_error: "Category is required." })
    .min(3, "Category must be at least 3 characters long.")
    .max(500, "Category must be at most 500 characters long."),
  link: z
    .string({ required_error: "Link is required." })
    .url("Link must be a valid URL.")
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const contentType = res.headers.get("content-type");
          return contentType?.startsWith("image/");
        } catch (error) {
          return false;
        }
      },
      {
        message: "Link must point to a valid image.",
        path: ["link"],
      }
    ),
  pitch: z
    .string({ required_error: "Pitch is required." })
    .min(10, "Pitch must be at least 10 characters long."),
});
