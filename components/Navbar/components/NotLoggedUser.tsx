"use client";
import { useRouter } from "next/navigation";

export const NotLoggedUser = () => {
  const router = useRouter();
  return (
    <>
      <button type="button" onClick={() => router.push("/login")}>
        Login
      </button>
    </>
  );
};
