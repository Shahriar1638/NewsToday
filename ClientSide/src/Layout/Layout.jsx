import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
