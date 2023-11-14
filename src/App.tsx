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
import { useAuth } from "./context/AuthProvider";
import { UserType } from "./utils/enums/usertype.enums";
import RequireAuth, { HomeRoute } from "./components/RequireAuth";
import BookingHistoryPage from "./pages/BookingHistoryPage/BookingHistoryPage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SportAreaHomePage from "./pages/SportAreaHomePage/SportAreaHomePage";
import UpdateSportAreaPage from "./pages/UpdateSportAreaPage/UpdateSportAreaPage";
import RequireNoAuth from "./components/RequireNoAuth";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import ViewPendingBookingPage from "./pages/ViewPendingBookingPage/ViewPendingBookingPage";

function App() {
  const { user } = useAuth();
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
        <Route path="/unauthorized" element={<UnauthorizedPage/>} />

        <Route element={<RequireNoAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/resetsuc" element={<ResetPasswordSuccessfully />} />
        </Route>

        <Route
          element={
            <RequireAuth
              roles={[UserType.USER, UserType.SPORTAREA, UserType.ADMIN]}
            />
          }
        >
          <Route path="/" element={HomeRoute(user?.role ?? "")} />
        </Route>
        <Route element={<RequireAuth roles={[UserType.USER]} />}>
          <Route path="/sportarea/:id" element={<SportAreaPage />} />
        </Route>
        <Route element={<RequireAuth roles={[UserType.SPORTAREA]} />}>
          <Route path="/create-sportarea" element={<CreateSportAreaPage />} />
          <Route path="/sport-home" element={<SportAreaHomePage />} />
          <Route path="/update-sportarea" element={<UpdateSportAreaPage />} />
          <Route path="/pending" element={<ViewPendingBookingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
