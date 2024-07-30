import { auth } from "@/auth";
import ProfileTab from "@/components/frontend/profile";
import { FaSpinner } from "react-icons/fa";

export default async function Profile() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-between py-14 text-black">
      <ProfileTab />
    </main>
  );
}
