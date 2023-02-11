import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AuthLayoutPage } from "./auth-layout";

export const Login = () => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    try {
      setLoading(true);
      logIn(email, password);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayoutPage login={true}>
      <form
        onSubmit={submitForm}
        className="d-flex flex-column align-items-center p-2 w-100 gap-3"
      >
        <h4 className="text-center mb-1">Sign in</h4>
        <div className="col" style={{ minWidth: "300px" }}>
          <div className="row">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="row my-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <button type="submit" className="button-3" disabled={loading}>
          {loading && (
            <span
              className="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            />
          )}
          Login
        </button>
      </form>
    </AuthLayoutPage>
  );
};
