import { HeroSection } from "@/components/HeroSection/HeroSection";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { Button } from "../../components/ui/button";
import {
  StartupCard,
  StartupCardProps,
} from "@/components/StartupCard/StartupCard";

type HomeProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "John Doe" },
      _id: 1,
      description: "This is a description",
      image:
        "https://images.unsplash.com/photo-1634912314704-c646c586b131?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wdWxsfHx8fGVufDB8fHx8&auto=format",
      category: "Robots",
      title: "We Robots",
    },
  ];

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
            posts.map((post) => <StartupCard key={post._id} post={post} />)
          ) : (
            <p className="no results">No startups found</p>
          )}
        </ul>
      </section>
    </div>
  );
}
