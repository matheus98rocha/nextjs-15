import { HeroSection, SearchForm } from "../components";

export default function Home() {
  return (
    <div>
      <HeroSection
        highlightText="PITCH, VOTE, AND GROW"
        headingText="Pitch your startup"
      >
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm />
      </HeroSection>
    </div>
  );
}
