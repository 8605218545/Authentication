
import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
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
        if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
            // alert("Please fill out all fields.");
            toast.error("Please fill out all fields.");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            // alert("Please enter a valid email address.");
            toast.error("Please enter a valid email address.");
            return;
        }

        // Validate mobile number format (example: 10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            // alert("Please enter a valid 10-digit mobile number.");
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }

        // Validate password strength (example: at least 8 characters)
        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }      
        
        

// connect frontend to backend
        try {
            const response = await axios.post("http://localhost:3000/signup", formData, { withCredentials: true });
            console.log("Signup Response:", response.data);
            // alert("Signup successful!");

            toast.success("Signup successful!");
            
            setTimeout(() => {
                navigate("/login"); // Navigate to login page after signup
            }, 2000);

        } catch (error) {
            alert("User already exists, please login or create a new registration!");
            console.error("Signup Error:", error);
        }

        setFormData({
            name: "",
            email: "",
            mobile: "",
            password: ""
        });
    };




    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Create Your Account</h1>
                <p>Join us and start your journey today.</p>

                <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
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
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            className="form-control"
                            placeholder="Enter your mobile number"
                            value={formData.mobile}
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
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <br />
                    <button type="submit" className="signup-button btn btn-primary">
                        Sign Up
                    </button>
                </form>

                <p className="login-link">
                    Already have an account? &nbsp; <a href="/login">Log in</a>
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

export default SignUp;