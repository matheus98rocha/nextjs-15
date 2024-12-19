import { Session } from "next-auth";

export function useUser(session: Session | null) {
  const isUserLoggedIn = session && session.user;
  console.log("kdlgvndklsg", session);
  const user = {
    id: session?.id,
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
