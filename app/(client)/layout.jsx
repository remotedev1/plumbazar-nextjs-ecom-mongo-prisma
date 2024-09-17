import { Navbar } from "@/components/frontend/Navbar";
import TopNavbar from "@/components/frontend/banner-navbar";
import Footer from "@/components/frontend/homepage/Footer";
import { BottomNavbar } from "@/components/frontend/homepage/bottom-navbar";

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
