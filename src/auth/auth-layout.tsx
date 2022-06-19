import React from "react";
import logo from "../assets/logo-small.png";
import logoLarge from "../assets/logo-small.png";

import "./auth-layout.css";

interface Props {
  children: React.ReactNode;
  login: boolean;
}

export const AuthLayoutPage: React.FC<Props> = ({ children, login }) => {
  return (
    <div className="auth-container">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white px-2  navbar-additional">
          <div className="container-fluid">
            <div className="mx-2">
              <div className="d-flex align-items-center">
                <img
                  className="mx-2"
                  src={logo}
                  alt="Volunteria"
                  width={"55px"}
                  height={"55px"}
                />
              </div>
            </div>
            <div className="navbar-nav ms-auto d-flex align-items-center mx-4">
              {login ? (
                <a
                  className="mx-2"
                  href="/signup"
                  style={{ textDecoration: "none", color: "#7d57c2" }}
                >
                  Sign up
                </a>
              ) : (
                <a
                  className="mx-2"
                  href="/login"
                  style={{ textDecoration: "none", color: "#7d57c2" }}
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </nav>
      </div>

      <div
        className="container d-flex flex-column align-content-center justify-content-center"
        style={{ maxWidth: "600px", maxHeight: "80vh" }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img src={logoLarge} className="logo" alt="Volunteria" />
        </div>

        {children}
      </div>
    </div>
  );
};

<nav className="navbar navbar-light bg-light">
  <div className="mx-4">
    <div className="d-flex align-items-center">
      <img
        src="https://i.pinimg.com/564x/be/d3/0d/bed30ddfa5d434e827c775ac9a3b0d38.jpg"
        width="30"
        height="30"
        className="d-inline-block align-top mx-2"
        alt="Logo here"
      />
      Volunteria
    </div>
  </div>
</nav>;
