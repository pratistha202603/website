import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    // ✅ Get cookie from request headers manually
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const token = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

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

    const user = await User.findById(decoded.userId);

    if (!user || user.role !== "finance") {
      return NextResponse.json(
        { success: false },
        { status: 403 }
      );
    }

    const list = await Registration.find({
      paid: true,
      verified: false,
    })
      .populate("userId", "name college mobile email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: list,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
