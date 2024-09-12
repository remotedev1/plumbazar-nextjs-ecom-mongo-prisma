import Footer from "@/components/frontend/Footer";
import { Navbar } from "@/components/frontend/Navbar";
import TopNavbar from "@/components/frontend/banner-navbar";
import { BottomNavbar } from "@/components/frontend/bottom-navbar";

export default async function RootLayout({ children }) {
  return (
    <div className="bg-white">
      <TopNavbar />
      <Navbar />
      {children}
      <Footer />
      <BottomNavbar />
    </div>
  );
}
