"use client"; // Add this to make the component a client component

import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavouriteProvider } from "@/contexts/FavouriteContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add any additional meta tags or links for fonts */}
      </head>
      <body className="bg-gray-100 text-gray-900">
        <AuthProvider>
          <FavouriteProvider>
            <div className="layout min-h-screen flex flex-col">
              {!isAdminRoute && <Header />}
              <main className="flex-grow">{children}</main>
              {!isAdminRoute && <Footer />}
            </div>
          </FavouriteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
