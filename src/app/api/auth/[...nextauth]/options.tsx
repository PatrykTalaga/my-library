import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../../../utils/connectMongo";
import User from "../../../../../models/userModel";

type UserType = {
  id: String;
  userName: String;
  email: String;
  password: String;
  role: String;
};

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        /* console.log("Profile Github : ", profile); */
        let userRole = "Github User";
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
        if (profile?.email === "pat2025@gmail.com") userRole = "Admin";
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
        userName: {
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
        try {
          await connectMongo();
          const user: any = await User.findOne({
            userName: credentials?.userName,
          })
            .lean()
            .exec();
          if (user) {
            console.log("Username is the database");
            const passCompare = user.password === credentials?.password;
            if (passCompare) {
              delete user.password;
              user.name = user.userName;
              user.role = user.role;
              return user;
            }
          }
        } catch (error) {
          console.error(error);
        }
        return null;
        //hard coded example for a single user (admin)
        /* const user = {
          id: "117as23312aas1",
          name: "Patrick",
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
        } */
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
