import nodemailer from "nodemailer";
import { emailTemplate } from "./email";
const sendVerificationCode=async(email:string,code:string):Promise<void>=>{
    const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})

const mailOptions = {
    // Kahan se email jaa raha hai
    from: process.env.EMAIL, 
    // Kisko email bhejna hai
    to: email, 
    // Email ka subject
    subject: 'TrueFeedback Verification Code', 
    // Plain text body (agar HTML support na ho toh yeh dikhega)
    text: 'Verification code from TrueFeedback: '+code, 
    // HTML body (for richer content)
    html: emailTemplate.replace("{{VERIFICATION_CODE}}",code) 
}

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        // Agar koi error aaye toh console mein dikhao
        console.log('Error occurred:', error);
    } else {
        // Agar successfully send ho jaaye toh confirmation do
        console.log('Email sent successfully!');
        // 'info.response' mein server ka response hota hai
        console.log('Response:', info.response); 
    }
});
}

export default sendVerificationCode