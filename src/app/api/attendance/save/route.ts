import { NextResponse } from "next/server";
import {Registration} from "@/models/Registrations";
import mongoose from "mongoose";
import { connectDB } from "@/models/lib/mongodb";

export async function POST(req: Request) {

  await connectDB();

  const { registrationId, day, status } = await req.json();

  const updateField =
    day === 1 ? "attendance.day1" : "attendance.day2";

  const updated = await Registration.findByIdAndUpdate(
    registrationId,
    { $set: { [updateField]: status } },
    { new: true }
  );

  return NextResponse.json(updated);
}