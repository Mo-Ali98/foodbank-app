import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AuthLayoutPage } from "./auth-layout";

export const SignUp = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [OrganisationName, setOrganisationName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    try {
      setLoading(true);
      signUp(email, password, OrganisationName);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayoutPage login={false}>
      <form
        onSubmit={submitForm}
        className="d-flex flex-column align-items-center p-3 w-100 gap-3"
      >
        <h4 className="text-center mb-1">
          Register an account for your organisation
        </h4>
        <div className="col">
          <div className="row">
            <input
              type="text"
              className="form-control"
              placeholder="Organisation name"
              required
              onChange={(e) => setOrganisationName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="row my-3">
            <input
              type="email"
              className="form-control"
              placeholder="Organisation Email address"
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="row">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="row">
            <div className="form-check mt-3">
              <input className="form-check-input" type="checkbox" required />
              <label className="form-check-label" style={{ color: "#563d88" }}>
                By continuing, you agree to the Terms of Use, Community
                Guidelines and Privacy Policy
              </label>
            </div>
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
    </AuthLayoutPage>
  );
};
