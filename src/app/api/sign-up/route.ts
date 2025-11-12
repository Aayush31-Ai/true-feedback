import userModel from "@/models/user.model";
import sendVerificationCode from "@/helper/Email/SendVerificationCode";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";



export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const { username, email, password } = await req.json();

  const existingUserByEmail = await userModel.findOne({ email });
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const expiryDate=new Date()
   expiryDate.setHours(expiryDate.getHours() + 1);

  if (existingUserByEmail) {
    // Case 1: User exists and is already verified
    if (existingUserByEmail.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists and is verified. Please Login.",
        },
        { status: 409 }
      );
    } 
    else if(existingUserByEmail.username===username){
      return NextResponse.json(
  {
    success: false,
    message: "User already exists and is verified. Please Login.",
  },
  { status: 409 }
)
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifycode = verificationCode;
    
      existingUserByEmail.verifycodeexpire = expiryDate;
      
      existingUserByEmail.username = username; // Yahaan aap verification code ki expiry date bhi set kar sakte hain // existingUserByEmail.verificationCodeExpiry = new Date(Date.now() + 3600000);
      await existingUserByEmail.save(); // Naya code bhej do

      try {
        await sendVerificationCode(email, verificationCode);
      } catch (err) {
        console.error("Failed to send verification email during resend", err);
        return NextResponse.json(
          { success: false, message: "Failed to resend verification email." },
          { status: 500 }
        );
      }


      return NextResponse.json(
        {
          success: true,
          message: "Verification code sent again. Please verify your account.",
        },
        { status: 200 } // Status 200 for update/resend
      );
    }
  } else {
    // Case 3: New User (Original Logic)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      verifycode:verificationCode,
      verifycodeexpire : expiryDate,
      isverified: false, // verificationCodeExpiry: new Date(Date.now() + 3600000), // Expiry set karna bahut zaroori hai
    });
    await newUser.save();

    try {
      await sendVerificationCode(email, verificationCode);
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

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  }
}
