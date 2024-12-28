import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/Loading";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./components/PurchaseSuccessPage";
import CancelPurchase from "./components/CancelPurchase";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth)
    return (
      <>
        <LoadingSpinner />
      </>
    );
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(34,193,195,0.3)_0%,rgba(253,187,45,0.2)_50%,rgba(255,69,125,0.1)_100%)]" />
          </div>
        </div>

        <div className="relative z-50 pt-20">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={user ? <Home /> : <Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/secret-dashboard"
              element={user?.role === "admin" ? <AdminPage /> : <Home />}
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route
              path="/purchase-success"
              element={
                user ? <PurchaseSuccessPage /> : <Navigate to={"/login"} />
              }
            /> 
              <Route
              path="/purchase-cancel"
              element={
                user ? <CancelPurchase /> : <Navigate to={"/login"} />
              }
            /> 
            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to={"/login"} />}
            />
          </Routes>
        </div>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
