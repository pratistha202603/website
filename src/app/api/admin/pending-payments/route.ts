import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";

export async function GET() {
  try {
    await connectDB();

    const list = await Registration.find({
      paid: true,
      verified: false,
    });

    return NextResponse.json(list);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
