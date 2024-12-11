import React from "react";
import { HeroSextionProps } from "./HeroSection.type";

export const HeroSection = ({
  highlightText,
  headingText,
  children,
}: HeroSextionProps) => {
  return (
    <section className="animate-in fade-in w-screen bg-primary min-h-[530px] flex justify-center items-center flex-col py-10 px-6">
      {!!highlightText === true && (
        <h1 className="fade-in-bottom-150 bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri">
          {highlightText}
        </h1>
      )}
      <h1 className="fade-in-bottom-300 uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
        {headingText}
      </h1>
      {children}
    </section>
  );
};
