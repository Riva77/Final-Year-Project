import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup";
import Shop from "./pages/product/shop";
import { Toaster } from "sonner";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/home/home";
import AdminDashboard from "./pages/admin/adminDashboard";
import Blog from "./pages/blog/blog";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoutes from "./utils/privateRoutes";
import { fetchProductData } from "./features/productSlice";
import ProductDetails from "./pages/product/productDetails";
import Cart from "./pages/cart/Cart";
import { fetchUserData } from "./features/authSlice";
import Profile from "./pages/profile/profile";
import Chat from "./components/chatbot/chat";
import AccountSettings from "./pages/profile/components/AccountSettings";
import Favourites from "./pages/profile/components/Favourites";
import Orders from "./pages/profile/components/Orders";
import CreatePost from "./pages/blog/createPost";
import BlogDetails from "./pages/blog/blogDetails";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (userToken) {
      const userId = jwtDecode(userToken)._id;
      dispatch(fetchUserData(userId));
    }
  }, [userToken]);

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  const pathsWithoutNavbar = ["/login", "/signup"];
  const [navbarVisible, setNavbarVisible] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    setNavbarVisible(!pathsWithoutNavbar.includes(path));
  }, [location.pathname]);

  //Fetching data from global state
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.data) {
      user.data.role === "admin" ? navigate("/adminDashboard") : navigate("/");
    }
  }, []);

  return (
    <div>
      <Toaster richColors={true} />
      {navbarVisible && <Navbar />}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/adminDashboard" element={<AdminDashboard />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/createPost" element={<CreatePost />} />
        <Route exact path="/blogDetails" element={<BlogDetails />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          path="/shop/productDetails/:productId"
          element={<ProductDetails />}
        />
        <Route exact path="/profile" element={<Profile />}>
          <Route
            path="/profile/account-settings"
            element={<AccountSettings />}
          />
          <Route path="/profile/favourites" element={<Favourites />} />
          <Route path="/profile/orders" element={<Orders />} />
        </Route>
      </Routes>
      <Chat />
    </div>
  );
}

export default App;
