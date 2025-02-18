import { useNavigate } from "react-router-dom";

function Logout() {
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

export default Logout;
