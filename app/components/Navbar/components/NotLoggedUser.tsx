import { signIn } from "@/auth";

export const NotLoggedUser = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Login</button>
      </form>
    </>
  );
};
