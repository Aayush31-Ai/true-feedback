import { Resend } from "resend";
import { htmlForEmailSending } from "./email";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationCode(email: string, code: string) {
  await resend.emails.send({
    from: "True Feedback <onboarding@resend.dev>",
    to: email,
    subject: "Your True Feedback Verification Code",
    html: htmlForEmailSending.replace("{code}", code),
  });
}
export default sendVerificationCode;