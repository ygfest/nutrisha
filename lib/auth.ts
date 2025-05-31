import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { data: admin, error } = await supabase
            .from("Admin")
            .select("*")
            .eq("email", credentials.email as string)
            .single();

          if (error || !admin) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            admin.password
          );

          if (!isPasswordCorrect) {
            return null;
          }

          return {
            id: admin.id,
            email: admin.email,
            name: "Admin",
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
