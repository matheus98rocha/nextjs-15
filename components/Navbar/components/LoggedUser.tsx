import { signOut } from "@/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const popoverItem =
    "w-full hover:bg-slate-400 hover:text-white cursor-pointer flex items-center justify-center p-2";
  return (
    <>
      <Link href="/startup/create">
        <span>Create</span>
      </Link>

      {/* <Link href={`/user/${user.id}`}>
      </Link> */}
      <Popover>
        <PopoverContent className="bg-white flex items-center justify-center flex-col gap-4 px-0">
          <Link href={`/user/${user.id}`} className={popoverItem}>
            <button type="submit">
              <span>Meu Perfil</span>
            </button>
          </Link>
          <form
            className={popoverItem}
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/",
              });
            }}
          >
            <button type="submit">Logout</button>
          </form>
        </PopoverContent>
        <PopoverTrigger>
          <Image
            alt="user-image"
            src={user.image as string}
            width={30}
            height={30}
            className="rounded-full"
          />
        </PopoverTrigger>
      </Popover>
    </>
  );
};
