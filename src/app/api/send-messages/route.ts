import userModel, { Message } from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnection";

export async function POST(req: Request) {
  await dbConnect();
  const { username, content } = await req.json();
  const user = await userModel.findOne({ username });
  if (!user) {
    return Response.json(
      {
        success: false,
        message: "user is not found",
      },
      {
        status: 404,
      }
    );
  } else if (!user?.isAcceptingMessage) {
    return Response.json(
      {
        success: false,
        message: "user is deined to accept Messages",
      },
      {
        status: 404,
      }
    );
  } else {
    try {
      const newMessage = { content, createdAt: new Date() } as Message;

      user.messages.push(newMessage);
      await user.save();
      return Response.json({
        success: true,
        message: "message is sended Successfully to the user",
      });
    } catch (error) {
      console.log("there is an error in sending the message", error);
      return Response.json(
        {
          success: false,
          message: "there is an error in sending the message",
        },
        {
          status: 500,
        }
      );
    }
  }
}
