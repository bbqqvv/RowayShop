import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Roway Shop - Thời trang nam cao cấp",
  description: "Thương hiệu thời trang nam cao cấp với phong cách hiện đại, trẻ trung và lịch lãm.",
  openGraph: {
    title: "Roway Shop - Thời trang nam cao cấp",
    description: "Thương hiệu thời trang nam cao cấp với phong cách hiện đại, trẻ trung và lịch lãm.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="layout min-h-screen flex flex-col bg-gray-100 text-gray-900" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
