"use server";

import { auth } from "@/auth/auth";
import { parseServerActionResponse } from "./utils";
import { StartupSchema } from "@/app/(pages)/startup/create/validations/create";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createStartup = async (form: FormData) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      status: "ERROR",
      error: "You must be logged in to create a startup",
    });
  }

  const { category, description, link, pitch, title } = Object.fromEntries(
    form.entries()
  ) as unknown as StartupSchema;

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // Generating the database entry
    const startup = {
      title,
      description,
      category,
      image: link,
      views: 0,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    // Creating the database entry
    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    });
    return parseServerActionResponse({
      error: "",
      ...result,
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      status: "ERROR",
      error: JSON.stringify(error),
    });
  }
};
