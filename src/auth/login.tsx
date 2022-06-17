import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
    <div
      className="container d-flex flex-column align-content-center justify-content-center"
      style={{ maxWidth: "400px" }}
    >
      {!loading ? (
        <>
          <form onSubmit={submitForm} className="p-5 border">
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
              />
            </div>

            <div className="d-flex justify-content-around">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          </form>
          {error && <h3>{error}</h3>}
        </>
      ) : (
        <>
          <h2>loading</h2>
        </>
      )}
    </div>
  );
};
