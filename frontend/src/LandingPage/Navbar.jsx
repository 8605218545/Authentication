
import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../App.css'

function Navbar () {
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
    const navigate = useNavigate();

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Handle logout functionality
    const handleLogout = () => {
        // Perform logout actions (e.g., clear user session, remove tokens, etc.)
        localStorage.removeItem('token'); // Example: Remove token from localStorage
        
        toast.success("Log Out Successfully!")
        
        setTimeout(() => {
            navigate('/login'); // Redirect to login page
        }, 2000);


       
    };
    return (
        <>
            <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "#ff6f61" }} >
                <div class="container p-2">
                
                   <Link class="navbar-brand" href="/">
                    <img
                        src="https://www.freeiconspng.com/uploads/sunflower-png-11.png"
                        style={{ width: "10%" }}
                        alt="Logo"
                    />
                    </Link> 

                    <div class="" id="navbarSupportedContent">
                        <form class="d-flex" role="search">
                            <ul class="navbar-nav  ms-auto mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to="/home" style={{ color: "white"}}>
                                    Home
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to="/login" style={{ color: "white"}}>
                                    Signup
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link active" to="/about" style={{ color: "white"}}>
                                    About
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link active" to="/support" style={{ color: "white"}}>
                                    Support
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link active"
                                        href="#"
                                        // id="navbarDropdown"
                                        role="button"
                                        onClick={toggleDropdown}
                                        aria-expanded={dropdownOpen ? "true" : "false"}
                                    >
                                        <i class="fa-solid fa-bars" style={{ color: "white"}}></i>
                                    </Link>
                                    <ul
                                        className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                                        aria-labelledby="navbarDropdown"
                                        style={{ right: 0, left: 'auto' }} // Align dropdown to the right
                                    >
                                        <li>
                                            <Link className="dropdown-item" href="#">
                                                <i class="fa-solid fa-circle-user"></i> &nbsp;
                                                User
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="#">
                                                <i class="fa-solid fa-gear"></i> &nbsp;
                                                Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                            <i class="fa-solid fa-circle-right"></i> &nbsp;
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>    
                            </ul>
                        </form>
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
            </nav>
        </>
    )
}

export default Navbar;
