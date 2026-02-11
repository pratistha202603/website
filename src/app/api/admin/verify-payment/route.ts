import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Registration.findByIdAndUpdate(id, {
      verified: true,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
