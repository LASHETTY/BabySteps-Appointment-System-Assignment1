
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <>
      <Toaster />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
