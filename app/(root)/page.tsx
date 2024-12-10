import SearchForm from "../components/SearchForm/SearchForm";

export default function Home() {
  return (
    <div>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup, <br /> connect with entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm />
      </section>
    </div>
  );
}
