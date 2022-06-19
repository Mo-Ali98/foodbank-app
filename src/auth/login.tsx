import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthLayoutPage } from "./auth-layout";

export const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, seterror] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    try {
      setLoading(true);
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      seterror("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayoutPage login={true}>
      <form onSubmit={submitForm}>
        <h2 className="text-center mb-3">Log In</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            required
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="d-flex flex-column align-items-center justify-content-between">
          <button
            type="submit"
            className="btn btn-primary my-2"
            disabled={loading}
          >
            Sign in
          </button>
        </div>
      </form>
      {error && <p className="my-3 text-danger">{error}</p>}
    </AuthLayoutPage>
  );
};
