import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

import { after } from "next/server";

export async function useViews({ id }: { id: string }) {
  const { views: totalViews } = await client
    .withConfig({
      useCdn: false,
    })
    .fetch(STARTUP_VIEWS_QUERY, {
      id,
    });
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({
          views: totalViews + 1,
        })
        .commit()
  );

  const totalViewsString =
    totalViews > 1 ? `${totalViews} views` : `${totalViews} view`;

  return {
    totalViewsString,
  };
}
