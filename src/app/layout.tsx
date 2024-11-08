"use client";
import "./globals.css";
import NavBar from "./components/layout/Navbar/NavBar";
import Footer from "./components/layout/Footer/Footer";
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
          <NavBar />
          <TanStackProvider>
            <div>{children}</div>
          </TanStackProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
