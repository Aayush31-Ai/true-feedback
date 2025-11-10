
export const emailTemplate:string = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification Required</title>
    <style type="text/css">
        body, table, td, a { font-family: Arial, sans-serif; }
        .code-box {
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            padding: 15px 25px;
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            display: inline-block;
            letter-spacing: 5px;
            border-radius: 5px;
        }
        .main-text {
            color: #555555;
            line-height: 24px;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 0 30px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                    <tr>
                        <td align="center" style="padding: 40px 0 30px 0; border-bottom: 3px solid #007bff;">
                            <h1 style="font-size: 30px; margin: 0; color: #007bff;">TrueFeedack</h1>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="main-text" style="padding: 0 0 20px 0; font-size: 20px; font-weight: bold; color: #333333;">
                                        Action Required: Verify Your Email Address
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-text" style="padding: 0 0 20px 0; font-size: 16px;">
                                        Dear User,
                                        <br><br>
                                        Thank you for registering with **TrueFeedack**. To complete your account setup and ensure the security of your profile, please use the following verification code:
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 20px 0 30px 0;">
                                        <div class="code-box">
                                            <strong>{{VERIFICATION_CODE}}</strong> 
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-text" style="padding: 0 0 30px 0; font-size: 16px;">
                                        Kindly enter this code on the verification screen to activate your account. Please note that this code is valid for **10 minutes** only.
                                        <br><br>
                                        If you did not initiate this request, please disregard this email.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-text" style="font-size: 16px;">
                                        Sincerely,
                                        <br>
                                        The **TrueFeedack** Team
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f0f0f0" style="padding: 20px 30px 20px 30px; border-radius: 0 0 8px 8px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="font-size: 12px; color: #888888;">
                                        &copy; 2025 TrueFeedack. All rights reserved. | [Website Link]
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`