import { NextResponse } from "next/server";
import {Registration} from "@/models/Registrations";
import { connectDB } from "@/models/lib/mongodb";

export async function POST(req: Request) {

  await connectDB();

  const { registrationId, day, status } = await req.json();

  console.log("Received:", registrationId, day, status);

  const field = day === 1 ? "attendance.day1" : "attendance.day2";

  const updated = await Registration.findByIdAndUpdate(
    registrationId,
    { $set: { [field]: status } },
    { new: true }
  );

  console.log("Updated doc:", updated);

  return NextResponse.json(updated);
}