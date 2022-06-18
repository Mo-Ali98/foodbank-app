import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    try {
      setLoading(true);
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
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
        <form onSubmit={submitForm} className="p-5 border">
          <h2 className="text-center mb-3">Sign Up</h2>
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
              SignUp
            </button>
            <button className="btn btn-primary" type="submit">
              logIn
            </button>
          </div>
        </form>
      ) : (
        <>
          <div
            className="container d-flex flex-column align-content-center justify-content-center"
            style={{ maxWidth: "400px" }}
          >
            <h2>loading</h2>
          </div>
        </>
      )}
    </div>
  );
};
