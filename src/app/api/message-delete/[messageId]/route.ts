import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import userModel from "@/models/user.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/option";

export async function DELETE(req: Request, context: any) {
  const { messageId } = context.params;
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || !user) {
    return NextResponse.json(
      { success: false, message: "User not authorized, please login" },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const result = await userModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: new mongoose.Types.ObjectId(messageId) } } }
    );

    if (result.modifiedCount === 0) {
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
    console.error("DB error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting message" },
      { status: 500 }
    );
  }
}
