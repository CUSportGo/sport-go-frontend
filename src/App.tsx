import React, { useState } from "react";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import "./App.css";
import ResetPasswordSuccessfully from "./pages/ResetPasswordPage/ResetPasswordSuccessfully";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import Navbar from "./components/Navbar/Navbar";
import CreateSportAreaPage from "./pages/CreateSportAreaPage/CreateSportAreaPage";
import AdminPage from "./pages/AdminPage/AdminPage";

import SportAreaPage from "./pages/SportAreaPage/SportAreaPage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SportAreaHomePage from "./pages/SportAreaHomePage/SportAreaHomePage";
import UpdateSportAreaPage from "./pages/UpdateSportAreaPage/UpdateSportAreaPage";
import ViewPendingBookingPage from "./pages/ViewPendingBookingPage/ViewPendingBookingPage";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/forgotpassword"
    ) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <div className="app">
      {showNavbar && <Navbar></Navbar>}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/resetsuccess" element={<ResetPasswordSuccessfully />} />
        <Route path="/create-sportarea" element={<CreateSportAreaPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/sportarea/:id" element={<SportAreaPage />} />
        <Route path="/sport-home" element={<SportAreaHomePage />} />
        <Route path="/update-sportarea" element={<UpdateSportAreaPage />} />
        <Route path="/pending" element={<ViewPendingBookingPage />} />
      </Routes>
    </div>
  );
}

export default App;
