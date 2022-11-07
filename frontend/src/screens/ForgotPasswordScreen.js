import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotPasswordScreenContainer">

      <div className="forgotPasswordScreen">
        <form
          onSubmit={forgotPasswordHandler}
          className="forgotPasswordScreenForm"
        >
          <h3 className="forgotPasswordScreenTitle">Forgot Password</h3>
          {error && <span className="errorMessage">{error}</span>}
          {success && <span className="successMessage">{success}</span>}
          <div className="formGroup">
            <p className="forgotPasswordScreenSubtext">
              Please enter the email address you register your account with. We
              will send you reset password confirmation to this email
            </p>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn buttonPrimary">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;