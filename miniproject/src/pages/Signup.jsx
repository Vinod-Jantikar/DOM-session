import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@')) {
            alert("Invalid email");
            return;
        }

         if (password.trim().length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        await signUp(email, password);
        navigate('/login');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <input type="text" name="email" value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />


                <input type="text" name="password" value={password} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default Signup
