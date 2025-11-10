import userModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnection";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import authOptions from "../../auth/[...nextauth]/option";

export async function DELETE(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  const messageId = params.messageId;
  if (!session && !session!.user) {
    return Response.json(
      {
        success: false,
        message: "user is not authorized,please login first",
      },
      {
        status: 401,
      }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const updatedMessage = await userModel.updateOne(
      {
        _id: userId,
      },
      { $pull: { messages: { _id: new mongoose.Types.ObjectId(messageId) } } }
    );
    if(updatedMessage.modifiedCount==0){
      return Response.json({success:false,message:"message not found or already deleted"},{status:404})
    }
    return Response.json({success:true,message:"message deleted successfully"},{status:200})
  } catch (error) {
console.log("There was an error in deleting the username for DB",error);
Response.json({
  success:false,
  message:"There was an error in deleting the username for DB"
},{
  status:500
})
  }
}
