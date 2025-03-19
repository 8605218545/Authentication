
import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Login.css';
import '../Toast.css';

function Login({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation
        if (!formData.email || !formData.password) {
            toast.error("Please fill out all fields.");
            return;
        }

        // Connect frontend to backend
        try {
            const response = await axios.post("https://backend-plra.onrender.com/login", formData, { withCredentials: true });
            console.log("Login Response:", response.data);

            // Show success toast
            toast.success("Login successful!");

            // Delay navigation until the toast is visible
            setTimeout(() => {
                setIsLoggedIn(true); // Update login state
                navigate("/home"); // Redirect to home page after successful login
            }, 3000); // Wait for 2 seconds (adjust as needed)

        } catch (error) {

            if (error.response) {
                // Backend responded with an error
                console.error("Backend Error:", error.response.data);
                toast.error(error.response.data.message || "Login failed. Please try again.");

            } else if (error.request) {
                // No response from the backend
                console.error("No Response:", error.request);
                toast.error("Network error. Please check your connection.");
                
            } else {
                // Other errors
                console.error("Error:", error.message);
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <p>Welcome back! Please log in to continue.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button btn btn-primary">
                        Login
                    </button>
                </form>

                <br />
                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000} // Close after 5 seconds
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            
        </div>
    );
}

export default Login;
