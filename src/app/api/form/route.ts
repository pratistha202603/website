import { NextResponse } from "next/server";
import { connectDB } from "../../../db/connect";
import { Registration } from "../../../models/Registrations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

if (typeof body.eventType === "string") {
  body.eventType = body.eventType.replace(/^=+/, "");
}


    console.log("FORM BODY =>", body);

    await connectDB();

    const doc = await Registration.create(body);

    return NextResponse.json({ success: true, data: doc });
  } catch (err) {
    console.error("FORM ERROR =>", err);
    return NextResponse.json(
      { success: false, message: "Failed to register" },
      { status: 500 }
    );
  }
}
