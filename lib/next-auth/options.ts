import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../prisma";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function getAllowedEmails() {
  const allowedEmails = await prismaClient.dobocreate.findMany({
    select: {
      email: true,
    },
  });
  return allowedEmails.map((record) => record.email);
}

export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      if (user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
          },
        };
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.email) {
        return false;
      }
      const allowedEmails = await getAllowedEmails();
      if (allowedEmails.includes(user.email)) {
        return true;
      } else {
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
