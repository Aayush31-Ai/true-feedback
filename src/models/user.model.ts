import mongoose ,{Schema,Document}  from "mongoose";

export interface Message extends Document{
    content:string,
    createdAt:Date,
 
}

interface User extends Document{
    username:string,
    email:string,
    password:string,
    messages:[Message],
    verifycode:string,
    verifycodeexpire:Date,
    isAcceptingMessage:boolean,
    isVerified:boolean
}

const messageSchema = new Schema<Message>({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const userSchema=new Schema<User>({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username must be unique"]
    },
    email:{
         type:String,
        required:[  true,"email is required"],
        unique:[  true,"email must be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    messages:[messageSchema],
    verifycode:String,
    verifycodeexpire:Date,
    isAcceptingMessage:Boolean,
    isVerified:Boolean
})

const userModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema)

export default userModel