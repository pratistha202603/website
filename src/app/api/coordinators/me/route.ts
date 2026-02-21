import { NextResponse } from "next/server";
import { connectDB } from "../../../../db/connect";
import { Registration } from "../../../../models/Registrations";
import { Coordinator } from "../../../../models/Coordinator";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const loggedInUserId = searchParams.get("userId");

    if (!loggedInUserId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const coordinator = await Coordinator.findOne({
      userId: loggedInUserId,
    });

    if (!coordinator) {
      return NextResponse.json(
        { message: "Coordinator not found" },
        { status: 401 }
      );
    }

    


    const eventsData = [];
    

const allRegs = await Registration.find();

for (const title of coordinator.events) {

  // Normalize coordinator title
  const normalizedTitle = title.replace(/-/g, "").toLowerCase();

  const candidates = await Registration.find({
    eventTitle: { 
      $regex: new RegExp(`^${normalizedTitle}$`, "i") 
    },
  })
    .populate("userId", "name college email mobile")
    .select("userId utr verified -_id");

  eventsData.push({
    title,
    candidates,
  });
}



const all = await Registration.find();

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