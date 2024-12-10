import { Session } from "next-auth";

export function useUser(session: Session | null) {
  const isUserLoggedIn = session && session.user;

  const user = {
    id: session?.user?.id,
    firstName: session?.user?.name?.split(" ")[0],
    lastName: session?.user?.name?.split(" ")[1],
    fullName: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  };

  return {
    isUserLoggedIn,
    user,
  };
}
