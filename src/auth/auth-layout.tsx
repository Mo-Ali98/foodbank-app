import React from "react";
import logoLarge from "../assets/logo-small.png";
import "./auth-layout.css";

interface Props {
  children: React.ReactNode;
  login: boolean;
}

export const AuthLayoutPage: React.FC<Props> = ({ children, login }) => {
  return (
    <div className="auth-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-white p-4">
        <div className="container-fluid">
          <div className="navbar-nav ms-auto d-flex align-items-center">
            <a
              className="mx-2 p-1 link-tag"
              href={login ? "/signup" : "/login"}
            >
              {login ? "Register" : "Login"}
            </a>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="child-container ">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img
              src={logoLarge}
              className="logo"
              alt="Volunteria"
              loading={"lazy"}
            />
          </div>

          <div className="form-container">{children}</div>
        </div>
      </div>
    </div>
  );
};
