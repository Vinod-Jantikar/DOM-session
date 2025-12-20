import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = () => {
        if (email === "admin@gmail.com" && password === "admin@123") {
            localStorage.setItem("isLoggedIn", true);
            navigate("/todos")
        } else {
            setError("Invalid email or password")
        }
    }


    return (
        <div style={{width: "40%", margin: "auto", marginTop: 100}}>
            <h3>Login </h3>
            <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            {
                error && <p style={{ color: "red", fontSize: 20 }}>{error}</p>
            }
        </div>
    )
}

export default Login
