import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Layout from "./Layout/Layout.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Bookmarks from "./Pages/Bookmarks.jsx";
import Favourites from "./Pages/Favourites.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
