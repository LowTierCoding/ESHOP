import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      return navigate('/');
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      navigate(0);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="loginScreenContainer">

      <div className="loginScreen">
        <form onSubmit={loginHandler} className="loginScreenForm">
          <h3 className="loginScreenTitle">Login</h3>
          {error && <span className="errorMessage">{error}</span>}
          <div className="formGroup">
            <label className="label" htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              tabIndex={1}
            />
          </div>
          <div className="formGroup">
            <label className="label" htmlFor="password">
              Password:{" "}
              <Link
                to="/forgotpassword"
                className="loginScreenForgotpassword"
                tabIndex={4}
              >
                Forgot Password?
              </Link>
            </label>
            <input
              className="label"
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              tabIndex={2}
            />
          </div>
          <button type="submit" className="btn buttonPrimary" tabIndex={3}>
            Login
          </button>

          <span className="loginScreenSubtext">
            Don't have an account?
            <Link to="/register" className="loginScreenLink">
              Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;