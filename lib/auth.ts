import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./primsa";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/signUp",
  },
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: process.env.GitHub_CLIENT_ID as string,
      clientSecret: process.env.GitHub_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(`🚀 ~ credentials:`, { credentials });
        if (!credentials?.email || !credentials?.password) {
          // Any object returned will be saved in `user` property of the JWT
          return null;
        } else {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user) {
            return null;
          } else {
            const comparePassword = await compare(
              credentials.password,
              user.password as string
            );
            if (comparePassword) {
              return user;
            }
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session }) {
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log(`🚀 ~ user, account, profile, email, credentials:`, {
        user,
        account,
        profile,
        email,
        credentials,
      });
      return true;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          email: token.email as string,
        },
      });
      user!.password = null;
      session.user = user!;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
