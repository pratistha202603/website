import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";
import { Accommodation } from "@/models/Accommodation";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const user = await User.findById(decoded.userId).select(
      "name email rollNo mobile"
    );

    const registrations = await Registration.find({
      userId: decoded.userId,
    }).select("eventTitle eventType paid verified utr");

    const accommodation = await Accommodation.findOne({
      userId: decoded.userId,
    });

    return NextResponse.json({
      success: true,
      user,
      registrations,
      accommodation,
    });

  } catch (err) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
