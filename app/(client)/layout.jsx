import { Navbar } from "@/components/frontend/Navbar";
import TopNavbar from "@/components/frontend/banner-navbar";
import Footer from "@/components/frontend/homepage/Footer";
import { BottomNavbar } from "@/components/frontend/homepage/bottom-navbar";
import WhatsApp from "@/components/frontend/whatsApp";

export default async function RootLayout({ children }) {
  return (
    <div className="bg-white relative">
      <TopNavbar />
      <Navbar />
      {children}
      <Footer />
      <BottomNavbar />
      <WhatsApp />
    </div>
  );
}
