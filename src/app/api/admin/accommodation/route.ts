import { NextResponse } from "next/server";
import { connectDB } from "../../../../db/connect";
import { Accommodation } from "../../../../models/Accommodation";

export async function GET() {
  try {
    await connectDB();

    const data = await Accommodation.find().sort({ createdAt: -1 });

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch accommodation data" },
      { status: 500 }
    );
  }
}
