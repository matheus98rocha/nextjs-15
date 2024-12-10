import { signOut } from "@/auth";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LoggedUser = ({ user }: { user: User }) => {
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
        <span>{user.name}</span>
      </Link>
      <Image
        alt="user-image"
        src={user.image as string}
        width={30}
        height={30}
        className="rounded-full"
      />
    </>
  );
};
