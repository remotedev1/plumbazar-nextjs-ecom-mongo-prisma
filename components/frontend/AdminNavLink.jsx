import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AdminDashLink = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/login");
    }
  }, [session, router]);

  if (!session?.user) {
    return null; // or a loading spinner
  }

  return (
    <Link className="font-medium p-1 rounded" href="/dashboard">
      Dashboard
    </Link>
  );
};

export default AdminDashLink;
