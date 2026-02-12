import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Accommodation } from "@/models/Accommodation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const doc = await Accommodation.create(body);

    return NextResponse.json({ success: true, data: doc });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Accommodation registration failed" },
      { status: 500 }
    );
  }
}

/* ✅ Auto-fill logged in user */
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // ✅ FIXED: use userId (not id)
    const user = await User.findById(decoded.userId).select(
      "name email mobile rollNo"
    );

    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
