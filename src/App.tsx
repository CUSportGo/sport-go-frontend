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
import AdminPage from "./pages/AdminPage/AdminPage";
import SportAreaPage from "./pages/SportAreaPage/SportAreaPage";
import { useAuth } from "./context/AuthProvider";
import { UserType } from "./utils/enums/usertype.enums";
import RequireAuth from "./components/RequireAuth";

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      <Routes>
        {/* public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/resetsuc" element={<ResetPasswordSuccessfully />} />
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        {/* protected */}
        <Route
          element={<RequireAuth roles={[UserType.USER, UserType.SPORTAREA]} />}
        >
          <Route
            path="/"
            element={
              user?.role === UserType.USER ? (
                <HomePage />
              ) : (
                <div>Sport Area Home</div>
              )
            }
          />
        </Route>
        <Route element={<RequireAuth roles={[UserType.USER]} />}>
          <Route path="/sportarea/:id" element={<SportAreaPage />} />
        </Route>
        <Route element={<RequireAuth roles={[UserType.SPORTAREA]} />}>
          <Route path="/create-sportarea" element={<CreateSportAreaPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
