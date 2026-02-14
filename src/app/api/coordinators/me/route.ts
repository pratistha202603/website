import { NextResponse } from "next/server";
import { connectDB } from "../../../../db/connect";
import { Registration } from "../../../../models/Registrations";
import { Coordinator } from "../../../../models/Coordinator";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const loggedInUserId =
      searchParams.get("userId") || "demo-user-1";

    const coordinator = await Coordinator.findOne({
      userId: loggedInUserId,
    });

    if (!coordinator) {
      return NextResponse.json({
        name: "Unknown",
        events: [],
      });
    }

    const eventsData = [];

    for (const title of coordinator.events) {
      const candidates = await Registration.find({
        eventTitle: title,
      }).select(
        "name rollNo email mobile utr verified -_id"
      );

      eventsData.push({
        title,
        candidates,
      });
    }

    return NextResponse.json({
      name: coordinator.name,
      events: eventsData,
    });

  } catch (error) {
    console.error("Coordinator API Error:", error);

    return NextResponse.json(
      { message: "Failed to load coordinator data" },
      { status: 500 }
    );
  }
}
