import React from "react";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth/auth";

import { useUser } from "./Navbar.hooks";
import { LoggedUser, NotLoggedUser } from "./components";

export const Navbar = async () => {
  const session = await auth();
  const { isUserLoggedIn, user } = useUser(session);

  return (
    <div className="px-5 py-3 shadow-sm bg-white font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={144}
            height={30}
            loading="lazy"
          />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {isUserLoggedIn ? <LoggedUser user={user} /> : <NotLoggedUser />}
        </div>
      </nav>
    </div>
  );
};
