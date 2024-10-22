import Navbar from "./components/shared/Navbar";

import { Outlet, useLocation } from "react-router";

const Layout = () => {
  const path = useLocation().pathname === "/add-new-country-and-city";

  if (path) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="flex">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
