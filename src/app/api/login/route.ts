import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
