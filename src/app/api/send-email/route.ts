import sendVerificationCode from "@/helper/Email/SendVerificationCode";
import { dbConnect } from "@/lib/dbConnection";
import userModel from "@/models/user.model";
import { NextResponse } from "next/server";

async function gettingEmailFromDb(username: string): Promise<string | undefined> {
  const user = await userModel.findOne({ username });
  return user?.email;
}

export async function POST(req: Request) {
  await dbConnect();
  const { username } = await req.json();

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const email = await gettingEmailFromDb(username);

    if (typeof email === "string") {
      await sendVerificationCode(email, verificationCode);
      return NextResponse.json({ success: true, message: "Verification email sent successfully!" });
    }

    return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
  } catch (err) {
    console.error("Error in POST /send-email:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
