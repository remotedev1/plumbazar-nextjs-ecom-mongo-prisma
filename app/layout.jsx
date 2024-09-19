import { Urbanist } from "next/font/google";
import "./globals.css";
import Sessions from "@/providers/session-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "Plumbazar",
  description: "Plumbazar ecom",
};

export default async function RootLayout({ children, params: { locale } }) {
  return (
    <Sessions>
      <html lang={locale}>
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider />
            <ToastProvider />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </Sessions>
  );
}

export const viewport = {
  themeColor: "#FFFFFF",
};
