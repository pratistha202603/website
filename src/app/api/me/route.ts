import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: string };

    await connectDB();

    const user = await User.findById(decoded.userId).select(
      "name rollNo email mobile"
    );

    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (err) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
