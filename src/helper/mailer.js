import nodemailer from "nodemailer";

export const sendMail = async ({ email, verificationToken }) => {
  try {
    console.log(process.env.EMAIL);
    console.log(process.env.PASS);

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // or 465 for SSL
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false, // Ignore self-signed certificates
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
