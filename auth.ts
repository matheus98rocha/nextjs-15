import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AUTHOR_BY_PROVIDER_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // async signIn({ user: { name, email, image }, profile }) {
    async signIn({ user, profile, account }) {
      const provider = account?.provider;

      if (provider === "github") {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_PROVIDER_ID_QUERY, {
            id: profile?.id,
          });
        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: String(profile?.id),
            name: user.name,
            username: profile?.login,
            email: user.email,
            image: user.image,
            bio: profile?.bio,
          });
        }
      }

      if (provider === "google") {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_PROVIDER_ID_QUERY, {
            id: user?.id,
          });
        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: user?.id,
            name: user.name,
            username: profile?.name,
            email: user.email,
            image: user.image,
            bio: "",
          });
        }
      }

      return true;
    },
    async jwt({ token, account, profile, user }) {
      if (account && profile && account.provider === "google") {
        const googleUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_PROVIDER_ID_QUERY, {
            id: user?.id,
          });

        token.id = googleUser?._id;
      }

      if (account && profile && account.provider === "github") {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_PROVIDER_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
