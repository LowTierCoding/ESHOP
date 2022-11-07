import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterScreen.css';

const RegisterScreen = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            return navigate('/');
        }
    }, [navigate]);

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type:": "application/json"
            }
        }

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("")
            }, 5000)
            return setError("Passwords do not match")
        }
        try {
            const { data } = await axios.post("/api/auth/register", { username, email, password },
                config);
            localStorage.setItem("authToken", data.token);

            return navigate('/');
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    return (

        <div className='registerScreenContainer'>

        <div className='registerScreen'>
            <form onSubmit={registerHandler} className='registerScreenForm'>
                <h3 className='registerScreenTitle'>Register</h3>
                {error && <span className='errorMessage'>{error}</span>}
                <div className='formGroup'>
                    <label className="label" htmlFor='name'>Username:</label>
                    <input type="text" required id="name" placeholder="Enter username" value=
                        {username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='formGroup'>
                    <label className="label" htmlFor='email'>Email:</label>
                    <input className="label" type="email" required id="email" placeholder="Enter email" value=
                        {email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='formGroup'>
                    <label className="label" htmlFor='password'>Password:</label>
                    <input type="password" required id="password" placeholder="Enter password" value=
                        {password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='formGroup'>
                    <label className="label" htmlFor='confirmPassword'>Password:</label>
                    <input type="password" required id="password" placeholder="Confirm password" value=
                        {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button type='submit' className='btn buttonPrimary'>Register</button>

                <span className='registerScreenSubtext'>
                    Already have an account
                    <Link to="/login">Login</Link>
                </span>
            </form>
                        </div>
        </div>
    )
}
export default RegisterScreen;