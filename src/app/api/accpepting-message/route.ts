import userModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnection";
import authOptions from "../auth/[...nextauth]/option";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";


export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!session && !session!.user) {
    return Response.json(
      {
        success: false,
        message: "user is not authorized",
      },
      {
        status: 401,
      }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);

  const { acceptingMessage } = await req.json();

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    {
      isAcceptingMessage: acceptingMessage,
    },
    {
      new: true,
    }
  );

  if (!updatedUser) {
    Response.json(
      {
        success: false,
        message: "user is not found",
      },
      {
        status: 404,
      }
    );
  }

  return Response.json({
    success:true,
    message:"isAccepting message field of user is updated",
    updatedUser
  },{
    status:200
  })
  } catch (error) {
    console.log("there is an error in accepting-Message",error)
      Response.json(
      {
        success: false,
        message: "there is an error in accepting-Message",
      },
      {
        status: 500,
      }
    );
  }
  
}

export async function GET(){
   await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!session && !session!.user) {
    return Response.json(
      {
        success: false,
        message: "user is not authorized",
      },
      {
        status: 401,
      }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);

try {
    const result =await userModel.findById(userId).exec()


      if(!result){
        return Response.json({
          success:false,
          message:"user is not found"
        },
        {
          status:404
        })
      }
  return Response.json({
    success:true,
    isAcceptingMessage:result?.isAcceptingMessage
  },{
    status:200
  })
} catch (error) {
  
  console.log("user is not found in DB ",error);
  Response.json({
    success:false,
    message:"user is not found in DB",
  },{
    status:404
  })
}


}
