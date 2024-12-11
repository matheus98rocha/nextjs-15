"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

type ButtonResetFormProps = {
  querySelectorForm: string;
};

export const ButtonResetForm = ({
  querySelectorForm,
}: ButtonResetFormProps) => {
  const handleResetForm = () => {
    const form = document.querySelector(querySelectorForm) as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button
      type="reset"
      onClick={handleResetForm}
      className="hover:animate-in fade-in"
    >
      <Link href="/" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
};
