import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
