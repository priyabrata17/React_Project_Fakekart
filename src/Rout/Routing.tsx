import Home from "../components/pages/home";
import LoginPage from "../components/auth/loginPage";
import SignupPage from "../components/auth/signupPage";
import RootLayout from "../layout/rootLayout";
import Dashboard from "../components/auth/dashboard";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import CreateProduct from "../components/pages/createProduct";
import ShowProductDetails from "../components/pages/showProductDetails";
import UpdateProduct from "../components/pages/updateProduct";
import Cart from "../components/pages/cart";
const PublicWrapper = () => {
  const fakekartToken =
    localStorage.getItem("fakekartToken") ||
    sessionStorage.getItem("fakekartToken");
  return !fakekartToken ? <Outlet /> : <Navigate to={"/"} replace />;
};

const PrivateWrapper = () => {
  const fakekartToken =
    localStorage.getItem("fakekartToken") ||
    sessionStorage.getItem("fakekartToken");
  return fakekartToken ? <Outlet /> : <Navigate to={"/login"} replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <PublicWrapper />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <SignupPage /> },
        ],
      },
      {
        element: <PrivateWrapper />,
        children: [
          { path: "/create-product", element: <CreateProduct /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/cart", element: <Cart/> },
          { path: "/details/:productId", element: <ShowProductDetails /> },
          { path: "/update-product/:productId", element: <UpdateProduct /> },
        ],
      },
    ],
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}
