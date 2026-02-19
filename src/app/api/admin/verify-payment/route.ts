import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";
import { Accommodation } from "@/models/Accommodation";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    // ✅ FIX 1: Await cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Verify JWT
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const user = await User.findById(decoded.userId);

    // ✅ Only finance role allowed
    if (!user || user.role !== "finance") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { id, type } = await req.json();

    if (!id || !type) {
      return NextResponse.json(
        { success: false, message: "Missing id or type" },
        { status: 400 }
      );
    }

    // ✅ Update based on type
    if (type === "event") {
      await Registration.findByIdAndUpdate(id, { verified: true });
    } else if (type === "accommodation") {
      await Accommodation.findByIdAndUpdate(id, { verified: true });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid type" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Finance Verify Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
