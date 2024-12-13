import React, { FormEvent } from "react";
import Form from "next/form";
import { ButtonResetForm } from "./components";
import { Search } from "lucide-react";

type SearchForm = {
  query?: string;
};

export const SearchForm = ({ query }: SearchForm) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5 fade-in-bottom-700"
      id={"search-form"}
    >
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-slate-300-100 w-full h-auto outline-none"
      />
      <div className="flex gap-2">
        {query && <ButtonResetForm />}
        <button className="search-btn text-white" type="submit">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};
