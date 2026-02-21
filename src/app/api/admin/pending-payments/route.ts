import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Registration } from "@/models/Registrations";
import { Accommodation } from "@/models/Accommodation";

export async function GET() {
  try {
    await connectDB();

    // 🔥 Event registrations
    const eventList = await Registration.find({
      paid: true,
      verified: false,
    })
      .populate("userId", "name college mobile email")
      .sort({ createdAt: -1 });

    // 🔥 Accommodation registrations
    const accommodationList = await Accommodation.find({
      paid: true,
      verified: false,
    })
      .populate("userId", "name college mobile email")
      .sort({ createdAt: -1 });

    // 🔥 Add paymentCategory to differentiate
    const formattedEvents = eventList.map((item) => ({
      ...item.toObject(),
      paymentCategory: "event",
    }));

    const formattedAccommodation = accommodationList.map((item) => ({
      ...item.toObject(),
      paymentCategory: "accommodation",
    }));

    // 🔥 Combine both
    const combined = [
      ...formattedEvents,
      ...formattedAccommodation,
    ];

    return NextResponse.json({
      success: true,
      data: combined,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}