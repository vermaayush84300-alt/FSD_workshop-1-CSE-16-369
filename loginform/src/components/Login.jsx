import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        setError("");

        // Get registered user
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            setError("User not registered. Please sign up first.");
            return;
        }

        // Check username and password
        if (
            username === storedUser.username &&
            password === storedUser.password
        ) {
            // Save login state
            localStorage.setItem("isLoggedIn", "true");

            // Go to dashboard
            navigate("/dashboard");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="page-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Login to your account</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="main-button">
                        Login
                    </button>
                </form>

                <div className="switch-text">
                    <span>Don't have an account?</span>

                    <button
                        type="button"
                        className="link-button"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;