import { HeroSection } from "@/components/HeroSection/HeroSection";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { StartupCard, StartupType } from "@/components/StartupCard/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/lib/live";
import { client } from "@/sanity/lib/client";
import { auth } from "@/auth";

type HomeProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });
  return (
    <div>
      <HeroSection
        highlightText="PITCH, VOTE, AND GROW"
        headingText="Pitch your startup"
      >
        <p className="sub-heading !max-w-3xl fade-in-bottom-500">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </HeroSection>
      <section className="section_container">
        <p className="text-30-semibold fade-in-bottom">
          {query ? `Search Results for: ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartupType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </div>
  );
}
