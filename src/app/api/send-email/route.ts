import sendVerificationCode from "@/helper/Email/SendVerificationCode";
import { dbConnect } from "@/lib/dbConnection";
import userModel from "@/models/user.model";
import { NextResponse } from "next/server";


export async function POST(req:Request){
await dbConnect()
    const {username}=await req.json()
      const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
 try {
      const email = await gettingEmailFromDb(username).catch((err) => {
        console.error("Failed to get email from database", err);      
        return NextResponse.json(
          {
            success: false,
            message: "Failed to get email from database.",
          },
          { status: 500 }
        )
      })
      if(typeof email=="string"){
  await sendVerificationCode(email!, verificationCode);
      }
    } catch (err) {
      console.error("Failed to send verification email for new user", err);
      return NextResponse.json(
        {
          success: false,
          message: "User registered, but failed to send verification email.",
        },
        { status: 500 }
      );
    }
}

export async function gettingEmailFromDb(username:string):Promise<string|undefined>{
const user=await userModel.findOne({username})
return user?.email
}