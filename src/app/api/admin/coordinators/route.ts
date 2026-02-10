import { NextResponse } from "next/server";
import { connectDB } from "../../../../db/connect";
import { Coordinator } from "../../../../models/Coordinator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const doc = await Coordinator.create({
      name: body.name,
      userId: body.userId,
      events: body.events,
    });

    return NextResponse.json({ success: true, data: doc });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to create coordinator" },
      { status: 500 }
    );
  }
}
