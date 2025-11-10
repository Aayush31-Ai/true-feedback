import {z} from "zod";

export const usernameValidation=z
.string()
.min(3,{message:"username must be at least 3 characters long"})
.max(20,{message:"username must be at most 20 characters long"})

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.email({message:"invalid email"}),
    password:z.string().min(6,{message:"password must be at least 6 characters long"})

})