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
    });

    return NextResponse.json({ success: true, data: doc });

  } catch (err: any) {
    console.error("FORM ERROR =>", err);

    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, message: "You already registered for this event" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to register",
      },
      { status: 500 }
    );
  }
}
