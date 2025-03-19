import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

function Datails() {
    const [allDetails, setAllDetails] = useState(null); // Initialize as null
    const { id } = useParams(); // Extract the id from the URL

    useEffect(() => {
        axios.get(`https://backend-km0z.onrender.com/details/${id}`).then((res) => {
                console.log(res.data);
                setAllDetails(res.data); // Set the flower details
            })
            .catch((error) => {
                console.error("Error fetching flower details:", error);
            });
    }, [id]); // Add id as a dependency

    return (
        <>
            <div className="home-page">
                <h1 className="heading">Flowers Details</h1>
                <div className="flower-grid">
                    {allDetails ? ( // Check if allDetails is not null
                        <div className="flower-card" key={allDetails._id} style={{width: "500px"}}>
                            <img src={allDetails.image} alt={allDetails.name} className="flower-image" />
                            <h2 className="flower-name">{allDetails.name}</h2>
                            <p className="flower-details">{allDetails.details}</p>
                            <Link to="/home">
                                <button className="details-button">Back</button>
                            </Link>
                        </div>
                    ) : (
                        <p>Loading...</p> // Show a loading message while data is being fetched
                    )}
                </div>
            </div>
        </>
    );
}

export default Datails;
