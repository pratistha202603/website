import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FormPageClient from "./FormPageClient";

export default async function FormPage() {
  const cookieStore = await cookies();   // ✅ important
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/signup");
  }

  return <FormPageClient />;
}
