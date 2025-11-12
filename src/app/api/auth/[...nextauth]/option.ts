import { NextAuthOptions } from "next-auth";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/dbConnection";
import type { JWT } from "next-auth/jwt";
import type { User, Session } from "next-auth";

interface customToken extends JWT {
  _id?: string;
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
  username?: string;
}

interface customUser extends User {
  _id?: string;
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
  username?: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
     async authorize(
  credentials: Record<"email" | "password", string> | undefined
): Promise<customUser | null> {
  await dbConnect();

  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and password are required.");
  }

  const foundUser = await userModel.findOne({ email: credentials.email });
  if (!foundUser) throw new Error("User not found. Please sign up first.");

  const isPasswordCorrect = await bcrypt.compare(
    credentials.password,
    foundUser.password
  );
  if (!isPasswordCorrect) throw new Error("Password is incorrect.");

  return foundUser as unknown as customUser;
}
,
    })
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }: { token: customToken; user?: customUser }) {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: customToken }) {
      if (session.user) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
