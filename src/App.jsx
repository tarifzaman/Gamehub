import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import MyProfile from "./pages/Myprofile";
import GameDetails from "./pages/GameDetails";
import Wishlist from "./pages/Wishlist";
import UpdateProfile from "./pages/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {path:"/my-profile", element:<MyProfile />},
      {path:"/game/:id", element:<GameDetails />},
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/settings", element: <UpdateProfile/> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
