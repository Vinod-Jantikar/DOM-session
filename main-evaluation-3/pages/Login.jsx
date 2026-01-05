import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const result = login(email, password);

        if (!result.status) {
            alert(result.message); // proper alert
            return;
        }

        if (result.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/customers/dashboard");
        }
    };


    return (
        <div className="login-container">
            <h1>Login Page</h1>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
