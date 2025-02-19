import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
function Logout({ setIsAuthenticated }) {
    const redirect = useNavigate();

    // Call backend logout API
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                // Call the backend logout API
                await fetch("https://localhost:7030/api/Auth/Logout", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            }

            // Clear token from local storage
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            // Redirect user to the login page
            redirect("/");
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    // Automatically log out when this component is rendered
    handleLogout();

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
}

Logout.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired
};
export default Logout;


