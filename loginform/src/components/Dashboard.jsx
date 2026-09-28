import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (isLoggedIn !== "true" || !storedUser) {
            navigate("/login");
            return;
        }

        setUser(storedUser);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");

        navigate("/login");
    };

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-card">
                <div className="dashboard-icon">
                    👋
                </div>

                <h1>
                    Welcome, <span>{user.username}</span>!
                </h1>

                <p className="dashboard-message">
                    You have successfully logged in to your dashboard.
                </p>

                <div className="user-info">
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>

                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>

                    {user.phone && (
                        <p>
                            <strong>Phone:</strong> {user.phone}
                        </p>
                    )}
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;