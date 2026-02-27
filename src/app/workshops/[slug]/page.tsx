import Link from "next/link";


const workshops = [
  {
    title: "Primavera p6",
    description:
      "This hands-on program is designed to equip participants with modern AI concepts applied to construction projects, along with complete practical training in Primavera P6.",




    date: "10 & 11 March 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Seminar Hall – Block A",
    instructor: "Industry Expert",
    fee: "₹500",
  },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function WorkshopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ THIS IS THE IMPORTANT LINE
  const { slug } = await params;

  const workshop = workshops.find(
    (w) => slugify(w.title) === slug
  );

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Workshop not found
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-white mt-15">
      <h1 className="text-3xl font-bold mb-4">
        {workshop.title}
      </h1>

      <p className="text-gray-300 mb-8">
        {workshop.description}
       This hands-on program is designed to equip participants with modern AI concepts applied to construction projects, along with complete practical training in Primavera P6.

<p className="pd-2 m-3">🔹 Key Highlights: </p>
<p>✔ AI applications in construction planning & decision-making</p>
<p>✔ AI-supported project analysis concepts </p>
<p>✔ Complete Primavera P6 scheduling workflow</p>
<p>✔ WBS creation, activity sequencing & resource management</p>
<p>✔ Project monitoring and control techniques</p>
<p className="m-5"></p>


📜 Certificate issued by JNTUGV
🤝 In Association with IIT (ISM) Dhanbad ...
🏨 Accommodation available at JNTUGV Hostel for 2 days (for outstation participants)

Seats are limited. Registration confirmed only after fee payment.

      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Info label="Date" value={workshop.date} />
        <Info label="Time" value={workshop.time} />
        <Info label="Venue" value={workshop.venue} />
        <Info label="Instructor" value={workshop.instructor} />
        <Info label="Fee" value={workshop.fee} />
      </div>

      <Link
  href={`/form?event=${slugify(workshop.title)}&type=workshop`}
  className="inline-block rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-cyan-300 hover:bg-cyan-400/20 transition"
>
  Register Now
</Link>

    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
