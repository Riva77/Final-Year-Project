import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup";
import { Toaster } from "sonner";
function App() {
  return (
    <div>
      <Toaster richColors={true} />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
