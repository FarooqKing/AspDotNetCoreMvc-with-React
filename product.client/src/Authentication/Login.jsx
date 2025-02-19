
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import PropTypes from "prop-types";

function Login({ setIsAuthenticated }) {

    const token = localStorage.getItem("token");
    console.log(token)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const redirect = useNavigate();
    const handleInput = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://localhost:7030/api/UserAuth/Login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            localStorage.setItem("token", result.token);
            setIsAuthenticated(true);
            console.log("Token:", result.token);
            console.log("Login successFully:", result);
        } catch (error) {
            console.error("Error:", error);
        }
        redirect("/product-list");
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="w-40 mt-5">
            <div className="card">
            <div className="card-body">
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInput} className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 mt-3"><button type="submit" className="btn btn-primary">Submit</button></div>
                        </form>
                        <div className="mt-3">
                            Don`t Have Account  <Link to="/register">Register</Link></div>
        </div>
            </div>
            </div>
            </div>
    )
}
Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired
};
export default Login;