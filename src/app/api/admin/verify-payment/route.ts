import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";
import { Accommodation } from "@/models/Accommodation";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    // Try update in Registration
    const eventUpdate = await Registration.findByIdAndUpdate(
      id,
      { verified: true }
    );

    if (eventUpdate) {
      return NextResponse.json({ success: true });
    }

    // If not found, try accommodation
    const accUpdate = await Accommodation.findByIdAndUpdate(
      id,
      { verified: true }
    );

    if (accUpdate) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false },
      { status: 404 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
