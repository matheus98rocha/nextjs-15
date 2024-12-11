import { signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LoggedUserProps = {
  user: {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    fullName: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
  };
};

export const LoggedUser = ({ user }: LoggedUserProps) => {
  return (
    <>
      <Link href="/startup/create">
        <span>Create</span>
      </Link>
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <button type="submit">
          <span>Logout</span>
        </button>
      </form>
      <Link href={`/user/${user.id}`}>
        <Image
          alt="user-image"
          src={user.image as string}
          width={30}
          height={30}
          className="rounded-full"
        />
      </Link>
    </>
  );
};
