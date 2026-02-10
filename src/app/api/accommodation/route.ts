import { NextResponse } from "next/server";
import { connectDB } from "../../../db/connect";
import { Accommodation } from "../../../models/Accommodation";

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
