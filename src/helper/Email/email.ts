export const htmlForEmailSending = `
  <!DOCTYPE html>
  <html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your True Feedback Verification Code</title>
  </head>
  <body style="margin:0;padding:0;font-family:'Inter',sans-serif;background-color:#f8f9fb;color:#000;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:auto;">
      <tr>
        <td style="padding:40px 20px;text-align:center;">
          <h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#000;">
            True Feedback
          </h1>
          <p style="color:#555;font-size:14px;margin:0;">
            Honest. Anonymous. Real.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background-color:#fff;padding:30px 25px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.08);">
          <h2 style="text-align:center;font-weight:600;color:#111;margin-top:0;">
            Verify Your Email
          </h2>
          <p style="text-align:center;color:#333;font-size:15px;line-height:1.5;">
            Hey 👋,<br/>
            Thank you for joining <strong>True Feedback</strong>!  
            Use the verification code below to complete your registration:
          </p>
          
          <div style="text-align:center;margin:28px 0;">
            <span style="
              display:inline-block;
              font-size:28px;
              font-weight:700;
              color:#111;
              background-color:#f3f3f3;
              padding:14px 32px;
              border-radius:8px;
              letter-spacing:4px;
            ">
              {code}
            </span>
          </div>

          <p style="text-align:center;color:#777;font-size:13px;margin-top:30px;line-height:1.5;">
            This code is valid for the next <strong>10 minutes</strong>.  
            Please do not share it with anyone for security reasons.
          </p>

          <hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />

          <p style="text-align:center;font-size:12px;color:#999;">
            If you didn’t request this, you can safely ignore this email.<br/>
            — The True Feedback Team 💬
          </p>
        </td>
      </tr>

      <tr>
        <td style="text-align:center;padding:25px 10px;">
          <p style="color:#999;font-size:12px;margin:0;">
            © ${new Date().getFullYear()} True Feedback. All rights reserved.<br/>
            Made with ❤️ by Aayush.
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;