import { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../prisma";
import { PrismaClient, Role } from "@prisma/client";

const prismaClient = new PrismaClient();

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
  interface JWT {
    id: string;
    role: Role;
  }
}

async function getAllowedEmails() {
  const allowedEmails = await prismaClient.dobocreateUser.findMany({
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
    async jwt({ token, user }) {
      if (user) {
        // DobocreateUserのIDを取得してトークンに追加
        const dobocreateUser = await prismaClient.dobocreateUser.findUnique({
          where: { email: user.email! },
        });

        if (dobocreateUser) {
          token.id = dobocreateUser.id; // DobocreateUserのIDをトークンに設定
          token.role = dobocreateUser.role as Role; // DobocreateUserのroleをトークンに設定
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
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
