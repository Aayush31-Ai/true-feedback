import userModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnection";
import authOptions from "../auth/[...nextauth]/option";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User is not authorized",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const userData = await userModel
      .aggregate([
        { $match: { _id: userId } },
        { $unwind: "$messages" },
        { $sort: { "messages.createdAt": -1 } },
        { $group: { _id: "$_id", messages: { $push: "$messages" } } },
      ])
      .exec();

    if (!userData || userData.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No messages found for this user",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: userData[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return Response.json(
      {
        success: false,
        message: "There was an error fetching messages from DB",
      },
      { status: 500 }
    );
  }
}
