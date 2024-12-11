import React from "react";
import Form from "next/form";

export const SearchForm = () => {
  const query = "Test";

  const handleResetTextField = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) form.reset();
  };

  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input name="query" defaultValue={""} placeholder="Search Startups" />
      <div className="flex gap-2">
        {/* {query && (
          <button type="reset" onClick={handleResetTextField}>
            <span>Search</span>
          </button>
        )} */}
      </div>
    </Form>
  );
};
