import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup";
import Shop from "./pages/product/shop";
import { Toaster } from "sonner";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/home/home";
import AdminDashboard from "./pages/admin/adminDashboard";
import Blog from "./pages/Blog/blog";
import { jwtDecode } from "jwt-decode";
import { fetchUserData } from "./features/authslice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    if (userToken) {
      const userId = jwtDecode(userToken)._id;
      dispatch(fetchUserData(userId));
    }
    // dispatch(fetchProductData());
  }, [dispatch, userToken]);

  const pathsWithoutNavbar = ["/login", "/signup"];
  const [navbarVisible, setNavbarVisible] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    setNavbarVisible(!pathsWithoutNavbar.includes(path));
  }, [location.pathname]);

  return (
    <div>
      <Toaster richColors={true} />
      {navbarVisible && <Navbar />}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
