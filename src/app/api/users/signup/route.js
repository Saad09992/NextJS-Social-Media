import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helper/mailer";

connectDB();

export async function POST(request) {
  const reqBody = await request.json();
  const { email, password, username } = reqBody;
  try {
    if (!email || !password || !username) {
      throw new Error("All field are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const emailVerificationToken = crypto.randomBytes(32).toString("hex");

      const addUser = new User({
        email,
        password: hashPassword,
        username,
        emailVerificationToken,
        emailVerificationExpires: Date.now() + 3600000,
      });

      const savedUser = await addUser.save();
      console.log(savedUser);
      console.log(emailVerificationToken);
      await sendMail({ email, verificationToken: emailVerificationToken });

      return NextResponse.json({
        message: "User created successfully. Check email for verification code",
        success: true,
        emailVerificationToken: emailVerificationToken,
      });
    }
  } catch (error) {
    console.log("error");
    return NextResponse.json({ error: error.message });
  }
}

// export async function POST(request) {
//   try {
//     const reqBody = await request.json();
//     const { username, password, email } = reqBody;
//     const user = await User.findOne({ email });
//     if (user) {
//       return NextResponse.json(
//         { error: "Email already exists" },
//         { status: 400 }
//       );
//     }
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     const newUser = new User({ username, password: hashedPassword, email });
//     const savedUser = await newUser.save();
//     console.log(savedUser);
//     // Verification Email

//     await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
//     return NextResponse.json({
//       message: "User created successfully",
//       success: true,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
