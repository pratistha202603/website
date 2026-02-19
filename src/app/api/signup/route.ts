import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { name, email, password, college, mobile, gender } =
      await req.json();

    // ✅ Validation
    if (!name || !email || !password || !college || !mobile || !gender) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      college,
      mobile,
      gender, // ✅ Added
    });

    // ✅ Auto login
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({
      success: true,
      userId: user._id,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;

  } catch (err: any) {
    console.error("SIGNUP ERROR =>", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Signup failed",
      },
      { status: 500 }
    );
  }
}
