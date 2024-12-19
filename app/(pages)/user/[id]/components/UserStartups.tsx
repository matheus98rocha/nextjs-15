import { StartupCard, StartupType } from "@/components/StartupCard/StartupCard";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUPS_BY_AUTHOR_QUERY,
} from "@/sanity/lib/queries";
import React from "react";

const UserStartups = async ({ id }: { id: string }) => {
  const startups: Array<StartupType> = await client.fetch(
    STARTUPS_BY_AUTHOR_QUERY,
    { id }
  );

  console.log(startups);

  return (
    <>
      {startups.length > 0 ? (
        startups.map((post: StartupType) => (
          <StartupCard key={post._id} post={post} />
        ))
      ) : (
        <p className="no results">No startups found</p>
      )}
    </>
  );
};

export default UserStartups;
