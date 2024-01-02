import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        /* console.log("Profile Github : ", profile); */
        let userRole = "Github User";
        if (profile?.email === "patryk.j.talaga@gmail.com") userRole = "Admin";
        return {
          /* ...profile, // if you want all from github */
          id: profile.id.toString(),
          name: profile.name || profile.login,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        let userRole = "Google User";
        return {
          id: profile.sub,
          name: profile.name,
          role: userRole,
          /* ...profile, //same as above */
        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        //Normally retrieve users from database, here is hard coded for a single user (admin)
        const user = {
          id: "117as23312aas1",
          name: "Patric",
          password: "22@s1za1ds4A",
          role: "Admin",
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      /* if (user) token.role = user.role; */

      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.name = user.name || "username";
      }

      return token;
    },
    async session({ session, token }) {
      /* if (session?.user) session.user.role = token.role; */

      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.name = token.name;
      }

      return session;
    },
  },
};
