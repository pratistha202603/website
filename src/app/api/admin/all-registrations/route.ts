import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";
import {Accommodation} from "@/models/Accommodation";

export async function GET() {
  try {
    await connectDB();

    const registrations = await Registration.find()
      .populate("userId", "name email mobile gender")
      .sort({ createdAt: -1 });

    const accommodations = await Accommodation.find()
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      registrations,
      accommodations,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}