import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function RootLayout() {
  return (
    <section className="w-full">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
