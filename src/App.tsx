import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./auth/login";
import { SignUp } from "./auth/signup";
import { AuthProvider } from "./contexts/AuthContext";
import { Dashboard } from "./dashboard";
import { PrivateRoute } from "./privateRouter";
import { Volunteer } from "./volunteer";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volunteer/*" element={<Volunteer />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
