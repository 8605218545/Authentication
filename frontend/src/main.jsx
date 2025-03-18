
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import SignUp from './LandingPage/User/SignUp.jsx';
import Login from './LandingPage/User/Login.jsx';
import Navbar from './LandingPage/Navbar.jsx';
import Footer from './LandingPage/Footer.jsx';
import Home from './LandingPage/Home/Home.jsx';
import About from './LandingPage/Home/About.jsx';
import Support from './LandingPage/Home/Support.jsx';
import Details from './LandingPage/Home/Details.jsx'

function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    return (
        <StrictMode>
            <BrowserRouter>
                <Navbar />
                    <Routes>
                        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route
                            path="/home"
                            element={
                                isLoggedIn ? (
                                    <Home />
                                ) : (
                                    <Navigate to="/login" /> // Redirect to login if not logged in
                                )
                            }
                        />

                        <Route path="/about"  element={
                                isLoggedIn ? (
                                    <About />
                                ) : (
                                    <Navigate to="/login" /> // Redirect to login if not logged in
                                )
                        } />
                        <Route path="/support"  element={
                                isLoggedIn ? (
                                    <Support />
                                ) : (
                                    <Navigate to="/login" /> // Redirect to login if not logged in
                                )
                        } />

                        <Route path="/details/:id" element={
                                isLoggedIn ? (
                                    <Details />
                                ) : (
                                    <Navigate to="/login" /> // Redirect to login if not logged in
                                )
                        } /> 
                        
                    </Routes>
                <Footer />
            </BrowserRouter>
        </StrictMode>
    );
}

createRoot(document.getElementById('root')).render(<Root />);