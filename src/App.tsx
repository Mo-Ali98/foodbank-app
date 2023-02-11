import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./auth/login";
import { SignUp } from "./auth/signup";
import { Dashboard } from "./dashboard/dashboard";
import { PrivateRoute } from "./privateRouter";
import { Volunteer } from "./pages/Volunteer";
import { DashBoardProvider } from "./contexts/dashboard-context";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashBoardProvider>
              <Dashboard />
            </DashBoardProvider>
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/volunteer/*" element={<Volunteer />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
