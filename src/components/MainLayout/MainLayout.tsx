import { Outlet } from "react-router";
import { MenuNav } from "../MenuNav/MenuNav";
import { Search } from "../Search/Search";
import { Footer } from "../Footer/Footer";

export function MainLayout() {
  return (
    <>
      <MenuNav />
      <Search />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}