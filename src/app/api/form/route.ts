import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (typeof body.eventType === "string") {
      body.eventType = body.eventType.replace(/^=+/, "");
    }

    await connectDB();

   const cookieStore = await cookies();
const userId = cookieStore.get("userId")?.value;


    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }

    const doc = await Registration.create({
      ...body,
      userId,
    });

    return NextResponse.json({ success: true, data: doc });

  } catch (err: any) {
    console.error("FORM ERROR =>", err);

    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, message: "You already registered for this event" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to register",
      },
      { status: 500 }
    );
  }
}
