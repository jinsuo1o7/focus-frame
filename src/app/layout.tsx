import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import AuthContext from "@/context/AuthContext";
import SwrConfigContext from "@/context/SWRConfigContext";

export const metadata = {
  title: {
    default: "Focus Frame",
    template: "Focus Frame | %s",
  },
  description: "Welcome Focus Frame",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="w-full mx-auto overflow-auto max-h-screen">
        <AuthContext>
          <main className="max-w-screen-2xl mx-auto min-h-screen bg-neutral-50">
            <div className="sticky top-0 z-10 bg-white">
              <Navbar />
            </div>
            <SwrConfigContext>{children}</SwrConfigContext>
          </main>
          <div id="portal"></div>
        </AuthContext>
      </body>
    </html>
  );
}
