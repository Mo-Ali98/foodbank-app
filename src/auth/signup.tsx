import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { AuthLayoutPage } from "./auth-layout";

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [OrginisationName, setOrginisationName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    try {
      setLoading(true);
      await signUp(email, password, OrginisationName);
      navigate("/");
    } catch (error) {
      console.error(error);
      seterror("Sign up failed - Password must be at least 8 characters long");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayoutPage login={false}>
      <form onSubmit={submitForm}>
        <div className="mb-5">
          <h3 className="text-center mb-1">
            Create an account for your organisation
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Organisation Email address
            </label>
            <input
              type="email"
              className="form-control"
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Organisation name
            </label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setOrginisationName(e.target.value)}
              disabled={loading}
            />
          </div>
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

        <div className="my-5">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" required />
            <label className="form-check-label">
              By continuing, you agree to the Terms of Use, Community Guidelines
              and Privacy Policy
            </label>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button className="button-3 my-2" type="submit" disabled={loading}>
            {loading && (
              <span
                className="spinner-border spinner-border-sm mx-2"
                role="status"
                aria-hidden="true"
              />
            )}
            Register
          </button>
        </div>
      </form>
      {error && <span className="my-3 text-danger">{error}</span>}
    </AuthLayoutPage>
  );
};
