import { auth } from "@/auth";
import { AdminDashLink } from "@/components/frontend/AdminNavLink";
import Footer from "@/components/frontend/Footer";
import { Navbar } from "@/components/frontend/Navbar";
import TopNavbar from "@/components/frontend/banner-navbar";
import { BottomNavbar } from "@/components/frontend/bottom-navbar";

export default async function RootLayout({ children }) {
  const data = await auth();
  return (
    <div className="bg-gray-100">
        <TopNavbar />

      <Navbar />
      <div className="mt-[3.8em] md:mt-[4.5em] ">
      {data?.user.role === "ADMIN" && <AdminDashLink />}
      {children}
      </div>
      <Footer />
      <BottomNavbar />
    </div>
  );
}
