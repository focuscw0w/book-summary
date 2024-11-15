import { ReactNode } from "react";
import TanStackProvider from "../features/search/provider/TanstackProvider";
import NavBar from "../components/layout/Navbar/NavBar";
import Footer from "../components/layout/Footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <TanStackProvider>
      <div className="container">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </TanStackProvider>
  );
}
