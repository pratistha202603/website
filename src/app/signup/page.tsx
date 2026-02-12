import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignupClient from "./SignupClient";

export default async function SignupPage() {

  const cookieStore = await cookies();   // ✅ important
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/home");
  }

  return <SignupClient />;
}
