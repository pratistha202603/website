import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Accommodation } from "@/models/Accommodation";

export async function GET() {
  try {
    await connectDB();

    const data = await Accommodation.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch accommodation data" },
      { status: 500 }
    );
  }
}
