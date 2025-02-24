
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
