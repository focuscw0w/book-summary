"use client";
import "./globals.css";
import MainHeader from "@/app/components/MainHeader/MainHeader";
import TanStackProvider from "./providers/TanstackProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <MainHeader />
          <TanStackProvider>
            <div>{children}</div>
          </TanStackProvider>
        </div>
      </body>
    </html>
  );
}
