import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./ResetPasswordScreen.css";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { resetToken } = useParams();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }
    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
    return (
        <div className="resetPasswordScreenContainer">

            <div className="resetPasswordScreen">
                <form
                    onSubmit={resetPasswordHandler}
                    className="resetPasswordScreenForm"
                >
                    <h3 className="resetPasswordScreenTitle">Forgot Password</h3>
                    {error && <span className="errorMessage">{error} </span>}
                    {success && (
                        <span className="successMessage">
                            {success} <Link to="/login">Login</Link>
                        </span>
                    )}
                    <div className="formGroup">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            required
                            id="password"
                            placeholder="Enter new password"
                            autoComplete="true"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="confirmpassword">Confirm New Password:</label>
                        <input
                            type="password"
                            required
                            id="confirmpassword"
                            placeholder="Confirm new password"
                            autoComplete="true"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn buttonPrimary">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordScreen;