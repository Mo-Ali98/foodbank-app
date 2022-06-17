import React from "react";
import { useAuth } from "./contexts/AuthContext";

export const Dashboard = () => {
  const { user, logOut } = useAuth();

  if (!user) {
    return <></>;
  }

  const { email, displayName, phoneNumber, uid, photoURL, emailVerified } =
    user;

  return (
    <div className="container d-flex flex-column align-content-center">
      <div className="d-flex flex-row align-content-center justify-content-between my-2 py-4">
        <h1 className="text-center">DASHBOARD</h1>
        <button className="btn btn-primary" onClick={logOut}>
          LOGOUT
        </button>
      </div>
      <div className="d-flex flex-column align-content-center justify-content-center mt-5">
        <h2 className="text-truncate">uid - {uid}</h2>
        <h3>{`name? ${displayName}`}</h3>
        <h3>email - {email}</h3>
        <h3>{`Number? ${phoneNumber}`}</h3>
        <h3>{`Verified? ${emailVerified}`}</h3>
        <img src={photoURL ?? ""} alt="" />
      </div>
    </div>
  );
};
