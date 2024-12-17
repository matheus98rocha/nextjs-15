import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { AUTHOR_BY_PROVIDER_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { ensureUserExists } from "./ensure-user-existis";
import { getUserIdByProvider } from "./get-user-id-by-provider";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    /**
     * Callback executado durante o login.
     * Verifica se o usuário já existe no Sanity, e cria se necessário.
     */
    async signIn({ user, profile, account }) {
      const provider = account?.provider;

      if (provider === "github") {
        await ensureUserExists("github", String(profile?.id), {
          name: user.name,
          username: profile?.login as string,
          email: user.email,
          image: user.image,
          bio: profile?.bio as string,
        });
      }

      if (provider === "google") {
        await ensureUserExists("google", String(user?.id), {
          name: user.name,
          username: profile?.name,
          email: user.email,
          image: user.image,
          bio: "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        const userId = account.provider === "google" ? user?.id : profile?.id;
        const fetchedUser = await getUserIdByProvider(
          account.provider,
          String(userId)
        );

        token.id = fetchedUser?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
