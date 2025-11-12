import mongoose from "mongoose";

type connectionObject={
    isConnected?:number
}

const connection:connectionObject={}

export async function dbConnect() {
    if(connection.isConnected){
        console.log("user is already connected");     
        return
    }
    try {
            const db=await mongoose.connect(process.env.MONGODB_URI||"")
    connection.isConnected=db.connections[0].readyState
    console.log("db is connected Successfully");
    
    } catch (error) {
        console.log("there is an error in connection",error);
        process.exit(1)
    }
}