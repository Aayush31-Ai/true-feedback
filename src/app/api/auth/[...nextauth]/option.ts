import { NextAuthOptions } from "next-auth";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/dbConnection";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface customToken extends JWT{
    _id?:string
    isVerified?:boolean
    isAcceptingMessages?:boolean
    username?:string
}
interface user extends User{
    _id?:string
    isVerified?:boolean
    isAcceptingMessages?:boolean
    username?:string
}
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();

        try {
          // 🧩 1. Check if user exists
          const user = await userModel.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("User not found. Please sign up first.");
          }

          // 🔐 2. Validate password
          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password!,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Password is incorrect.");
          }

          // ✅ 3. Return user (NextAuth will store this in JWT/session)
          return user;
        } catch (err) {
          console.error("Authorize error:", err);
          throw new Error("Something went wrong during login.");
        }
      },
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
  })
  ],

  session: {
    strategy: "jwt",
  },

callbacks: {
  async jwt({ token, user }:{token:customToken,user:user}) {
  if(user){
    token._id=user._id?.toString()
    token.isVerified=user.isVerified
    token.isAcceptingMessages=user.isAcceptingMessages
    token.username=user.username
  }
    return token
  },
   async session({ session, token  }:{session:any,token:any}) {
    // Send properties to the client, like an access_token and user id from a provider.
   if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
    
    return session
  }
},
  pages: {
    signIn: "/sign-in", 
  },
  secret: process.env.NEXTAUTH_SECRET
}
export default authOptions