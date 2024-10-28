import nodemailer from "nodemailer";

export const sendMail = async ({ email, verificationToken }) => {
  try {
    console.log(verificationToken);
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const verificationTokenURL = `${process.env.DOMAIN}/verify/${verificationToken}`;
    const mailOptions = {
      from: "no-reply@NEXT-SM.com",
      to: email,
      subject: "Email Verification",
      html: `<h1>Email Verification</h1>
             <p>Please verify your email by clicking on the link below:</p>
             <a href="${verificationTokenURL}">${verificationTokenURL}</a>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
