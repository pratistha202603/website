import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import FormPageClient from "./FormPageClient";

export default async function Page() {
   const cookieStore = await cookies();   // ✅ await
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/signup");

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("/signup");
  }

  return <FormPageClient />;
}
