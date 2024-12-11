import React, { FormEvent } from "react";
import Form from "next/form";
import { ButtonResetForm } from "./components";
import { Search } from "lucide-react";

type SearchForm = {
  query?: string | undefined;
};

export const SearchForm = ({ query }: SearchForm) => {
  return (
    <Form action={"/"} className="search-form fade-in-bottom-700">
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-slate-300-100 w-full h-auto outline-none"
      />
      <div className="flex gap-2">
        {query && <ButtonResetForm querySelectorForm=".search-form" />}
        <button className="search-btn text-white" type="submit">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};
