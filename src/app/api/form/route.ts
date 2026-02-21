import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (typeof body.eventType === "string") {
      body.eventType = body.eventType.replace(/^=+/, "");
    }

    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: string };

    const userId = decoded.userId;

    // ✅ Update user profile (Single Source of Truth)
    await User.findByIdAndUpdate(
      userId,
      {
        name: body.name,
        college: body.college,
        mobile: body.mobile,
      },
      { new: true }
    );

    // ✅ Create registration WITHOUT duplicated fields
    const doc = await Registration.create({
      userId,
      eventTitle: body.eventTitle,
      eventType: body.eventType,
      utr: body.utr,
      amount: body.amount,
    });

    return NextResponse.json({ success: true, data: doc });

  }catch (error: any) {

  // 🔴 Duplicate UTR Error
  if (error.code === 11000) {
    return NextResponse.json(
      {
        success: false,
        message: "This UTR has already been used. Please enter a valid transaction ID."
      },
      { status: 400 }
    );
  }

  console.error(error);

  return NextResponse.json(
    { success: false, message: "Something went wrong" },
    { status: 500 }
  );
}
}
