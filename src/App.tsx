import React from "react";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import "./App.css";
import ResetPasswordSuccessfully from "./pages/ResetPasswordPage/ResetPasswordSuccessfully";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import CreateSportAreaPage from "./pages/CreateSportAreaPage/CreateSportAreaPage";
import SportAreaPage from "./pages/SportAreaPage/SportAreaPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/resetsuc" element={<ResetPasswordSuccessfully />} />
        <Route path="/create-sportarea" element={<CreateSportAreaPage/>} />
        <Route path="/sportarea/:id" element={<SportAreaPage />} />
      </Routes>
    </div>
  );
}

export default App;
