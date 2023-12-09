import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import LoginGoogle from "./pages/LoginGoogle";
import Perfil from "./pages/Perfil";
import io from "socket.io-client";


// const socket = io("http://localhost:3000");

//backend 4000 - 3000
//frontend 5173

 const socket = io("http://localhost:5173");

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