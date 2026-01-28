import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ProtectRoute from "./components/ProtectRoute";
import Profile from "./components/Profile";
import CreateProducts from "./pages/CreateProducts";
import Products from "./pages/Products";
import EditProducts from "./pages/EditProducts";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const privateRoute = ({ element }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />;
  // };
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />

        <Route element={<ProtectRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addproduct" element={<CreateProducts />} />
          <Route path="/editproduct/:id" element={<EditProducts />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
