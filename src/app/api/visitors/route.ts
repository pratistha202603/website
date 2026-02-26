import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import Visitor from "@/models/Visitors";

export async function GET() {
  try {
    await connectDB();

    let visitor = await Visitor.findOne();

    if (!visitor) {
      visitor = await Visitor.create({ total: 1 });
    } else {
      visitor.total += 1;
      await visitor.save();
    }

    return NextResponse.json({ total: visitor.total });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ total: 0 });
  }
}