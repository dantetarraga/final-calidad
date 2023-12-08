import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import LoginGoogle from "./pages/LoginGoogle";
import Perfil from "./pages/Perfil";

// const socket = io("/");

const route = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/google",
    element: <LoginGoogle />,
  },
  {
    path: "/profile",
    element: <Perfil />,
  },

]);

export default function App() {



  return <RouterProvider router={route} />;

}