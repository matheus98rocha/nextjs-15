import { Session } from "next-auth";

import { auth, signOut, signIn } from "@/auth";

export function useUser(session: Session | null) {
  const isUserLoggedIn = session && session.user;

  const user = {
    id: session?.user?.id,
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  };

  return {
    isUserLoggedIn,
    user,
  };
}
