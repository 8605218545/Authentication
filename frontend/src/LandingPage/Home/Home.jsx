
import React, { useEffect, useState } from 'react'
import './Home.css'
// import flowers from '../Data/flowersData'
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios'

function Home() {
    const [allFlowers, setAllFlowers] = useState([])
    const navigate = useNavigate();

    // // Check if the user is logged in
    // useEffect(() => {
    //     const token = localStorage.getItem('token'); // Check for a token in localStorage
    //     if (!token) {
    //         navigate('/login'); // Redirect to login if no token is found
    //     }
    // }, [navigate]);

    useEffect(() => {
        axios.get("http://localhost:3000/home", { withCredentials: true }).then((res) => {
            console.log(res.data)
            setAllFlowers(res.data)
        })
    }, []);


    return (
        <>
            <div className="home-page">
                <h1 className="heading">Discover Beautiful Flowers</h1>
                <p className="subheading">Explore our collection of stunning flowers.</p>
                <div className="flower-grid">
                    {allFlowers.map((flower) => (
                    <div key={flower.id} className="flower-card">
                        <img src={flower.image} alt={flower.name} className="flower-image" />
                        <h2 className="flower-name">{flower.name}</h2>
                        <Link to={`/details/${flower._id}`}>
                        <button className="details-button">View Details</button>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}


export default Home;

