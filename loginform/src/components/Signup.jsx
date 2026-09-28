import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        setError("");

        // Gmail validation
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!gmailRegex.test(email)) {
            setError("Please enter a valid Gmail address.");
            return;
        }

        // Check password
        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        // Create user object
        const user = {
            username,
            email,
            password,
            phone,
        };

        // Save user
        localStorage.setItem("user", JSON.stringify(user));

        // Automatically login user
        localStorage.setItem("isLoggedIn", "true");

        // Go to dashboard
        navigate("/dashboard");
    };

    return (
        <div className="page-container">
            <div className="auth-card signup-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Sign up to get started</p>
                </div>

                <form onSubmit={handleSignup}>
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
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <div className="input-group">
                        <label>
                            Phone Number <span>(Optional)</span>
                        </label>

                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="main-button">
                        Sign Up
                    </button>
                </form>

                <div className="switch-text">
                    <span>Already have an account?</span>

                    <button
                        type="button"
                        className="link-button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;