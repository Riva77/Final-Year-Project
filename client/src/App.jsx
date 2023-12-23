import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup";
import Shop from "./pages/product/shop";
import { Toaster } from "sonner";
import Navbar from "./pages/navigation/Navbar";
import Home from "./pages/home/home";

function App() {
  return (
    <div>
      <Toaster richColors={true} />
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
