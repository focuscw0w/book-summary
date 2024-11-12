import "../globals.css"; 
import type { AppProps } from "next/app";

import TanStackProvider from "../providers/TanstackProvider";
import NavBar from "../components/layout/Navbar/NavBar";
import Footer from "../components/layout/Footer/Footer";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="container">
      <NavBar />
      <TanStackProvider>
        <Component {...pageProps} />
      </TanStackProvider>
      <Footer />
    </div>
  );
};

export default App;
