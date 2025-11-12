import userModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnection";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import authOptions from "../../auth/[...nextauth]/option";
import { NextResponse } from "next/server"; 

export async function DELETE(
  req: Request,
  context: { params: Record<string, string> }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user as User | undefined;

  // Extract messageId from params
  const { messageId } = context.params;

  // ✅ Authorization check
  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "User is not authorized, please login first",
      },
      { status: 401 }
    );
  }

  try {
    const userId = new mongoose.Types.ObjectId(user._id);
    const updatedMessage = await userModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: new mongoose.Types.ObjectId(messageId) } } }
    );

    if (updatedMessage.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("There was an error deleting the message from DB:", error);
    return NextResponse.json(
      {
        success: false,
        message: "There was an error deleting the message from DB",
      },
      { status: 500 }
    );
  }
}
