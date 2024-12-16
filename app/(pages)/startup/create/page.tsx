import { HeroSection } from "@/components/HeroSection/HeroSection";
import React from "react";
import StartupForm from "./components/StartupForm/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Create = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <>
      <HeroSection headingText="Submit Your Startup" />
      <StartupForm />
    </>
  );
};

export default Create;
