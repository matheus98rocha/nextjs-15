import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  );
};

const Views = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({
      useCdn: false,
    })
    .fetch(STARTUP_VIEWS_QUERY, {
      id,
    });

  const totalViewsString =
    totalViews > 1 ? `${totalViews} views` : `${totalViews} view`;
  return (
    <div className="view-container">
      <div className="absolute -top-2 right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{totalViewsString}</span>
      </p>
    </div>
  );
};

export default Views;