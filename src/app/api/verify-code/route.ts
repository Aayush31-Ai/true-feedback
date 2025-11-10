import userModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnection";


export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, code } = await req.json();
    const user = await userModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 400,
        }
      );
    }
    const isCodeValid = user?.verifycode === code;
     const isCOdeNotExpired=new Date(user?.verifycodeexpire)>  new Date()
    if (isCodeValid && isCOdeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "user verified",
        },
        {
          status: 200,
        }
      );
    }else if(!isCOdeNotExpired){
      return Response.json(
        {
          success: false,
          message: "code is expired",
        },
        {
          status: 400,
        }
      );
    }else{
        return Response.json({
            success:false,
            message:"invalid code"
        },{
            status:400
        }
        
        )
    }


  } catch (error) {
    console.log("error in verifying code", error);
    Response.json(
      {
        success: false,
        message: "error in verifying code",
      },
      {
        status: 400,
      }
    );
  }
}
