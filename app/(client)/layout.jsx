import { auth } from "@/auth";
import { AdminDashLink } from "@/components/frontend/AdminNavLink";
import Footer from "@/components/frontend/Footer";
import { Navbar } from "@/components/frontend/Navbar";
import { BottomNavbar } from "@/components/frontend/bottom-navbar";

export default async function RootLayout({ children }) {
  const data = await auth();
  return (
    <div>
      <Navbar />
      {data?.user.role === "ADMIN" && <AdminDashLink />}
      {children}
      <Footer />
      <BottomNavbar />
    </div>
  );
}
