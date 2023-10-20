import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Prices from "./pages/prices/Prices";
import Parcels from "./pages/parcels/Parcels";
import SingleParsel from "./pages/parcels/SingleParsel";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Branches from "./pages/branches/Branches";
import Profile from "./pages/profile/Profile";
import EditDetails from "./pages/profile/EditDetails";
import ChangePassword from "./pages/profile/ChangePassword";
import ChangePicture from "./pages/profile/ChangePicture";
import PendingParcels from "./pages/parcels/PendingParcels";
import CompleteParcels from "./pages/parcels/CompleteParcels";

function App() {
  const Layout = () => {
    return localStorage.getItem("rToken") ? (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <Login />
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/prices",
          element: <Prices />,
        },
        {
          path: "/branches",
          element: <Branches />,
        },
        {
          path: "/parcels",
          element: <Parcels />,
        },
        {
          path: "/parcels/:id",
          element: <SingleParsel />,
        },
        {
          path: "/pending-parcels",
          element: <PendingParcels />,
        },
        {
          path: "/complete-parcels",
          element: <CompleteParcels />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/edit-details",
          element: <EditDetails />,
        },
        {
          path: "/profile/change-picture",
          element: <ChangePicture />,
        },
        {
          path: "/profile/change-password",
          element: <ChangePassword />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
