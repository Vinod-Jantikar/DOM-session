import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.trim().length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (!email.includes('@')) {
            alert("Invalid email");
            return;
        }

        login(email, password);
        navigate('/products');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login </h2>
                <input type="text" name="email" value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />

                <input type="text" name="password" value={password} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
