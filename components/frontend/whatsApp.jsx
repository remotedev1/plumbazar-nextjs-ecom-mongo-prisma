import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  return (
    <div className="fixed bottom-20 lg:bottom-5 right-5 bg-green-500 rounded-full p-2 h-12 w-12">
      <Link
        href="https://wa.me/6366019800"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="h-8 w-8 text-white"/>
      </Link>
    </div>
  );
};

export default WhatsApp;
