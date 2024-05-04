import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
import Cart from "./pages/cart/cart";
import { fetchUserData } from "./features/authSlice";
import { fetchTopProductData } from "./features/topProductSlice";
import Profile from "./pages/profile/profile";
import Chat from "./components/chatbot/chat";
import AccountSettings from "./pages/profile/components/AccountSettings";
import Favourites from "./pages/profile/components/Favourites";
import Orders from "./pages/profile/components/Orders";
import CreatePost from "./pages/blog/createPost";
import BlogDetails from "./pages/blog/blogDetails";
import OTPInput from "./pages/otpverification/OTPInput";
import Shipping from "./pages/cart/shipping";
import Invoice from "./pages/profile/components/Invoice";
import ResetPassword from "./pages/otpverification/resetPassword";
import Product from "./pages/admin/contents/Product";
import Genre from "./pages/admin/contents/Genre";
import Author from "./pages/admin/contents/Author";
import AdminOrders from "./pages/admin/contents/AdminOrders";
import AdminBlogs from "./pages/admin/contents/AdminBlogs";
import Dashboard from "./pages/admin/contents/Dashboard";
import UserBlog from "./pages/profile/components/UserBlog";

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
    dispatch(fetchTopProductData());
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
      user.data.role === "admin" ? navigate("/admin") : navigate("/");
    }
  }, []);

  return (
    <div>
      <Toaster richColors={true} />
      {navbarVisible && <Navbar />}
      <Routes>
        <Route exact path="/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Product />} />
          <Route path="genre" element={<Genre />} />
          <Route path="author" element={<Author />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="blogs" element={<AdminBlogs />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/shop/:filter" element={<Shop />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/createPost" element={<CreatePost />} />
        <Route path="/blog/blogDetails/:blogId" element={<BlogDetails />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/otpVerification" element={<OTPInput />} />
        <Route exact path="/shippingDetails" element={<Shipping />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
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
          <Route path="/profile/blogs" element={<UserBlog />} />
          <Route path="/profile/orders/details" element={<Invoice />} />
        </Route>
      </Routes>
      {/* <Chat /> */}
    </div>
  );
}

export default App;
