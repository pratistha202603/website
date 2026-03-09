import { NextResponse } from "next/server";
import {Registration} from "@/models/Registrations";
import { connectDB } from "@/models/lib/mongodb";

export async function GET() {

  await connectDB();

  const data = await Registration.find({}, {
    attendance: 1
  });

  return NextResponse.json(data);

}