import { HeroSection } from "@/components/HeroSection/HeroSection";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { Button } from "../../components/ui/button";
import {
  StartupCard,
  StartupTypeCard,
} from "@/components/StartupCard/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

type HomeProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);

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
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no results">No startups found</p>
          )}
        </ul>
      </section>
    </div>
  );
}
