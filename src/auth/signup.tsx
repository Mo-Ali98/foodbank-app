import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [OrginisationName, setOrginisationName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    try {
      setLoading(true);
      await signUp(email, password, OrginisationName);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
      </nav>
      <div
        className="container d-flex flex-column align-content-center justify-content-center"
        style={{ maxWidth: "600px", maxHeight: "80vh" }}
      >
        <div className="mb-5">
          <h1 className="text-center mb-3">
            Create an account for your organisation
          </h1>
        </div>
        <div></div>
        <form onSubmit={submitForm}>
          <div className="mb-3">
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

          <div className="mb-3">
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
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">
                By continuing, you agree to the Terms of Use, Community
                Guidelines and Privacy Policy
              </label>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn btn-primary p-2"
              type="submit"
              disabled={loading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
