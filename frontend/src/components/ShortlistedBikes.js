import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ShortlistedBikes.css';

const ShortlistedBikes = () => {
  const [bikes, setBikes] = useState([]);

  const fetchBikes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bikes/getbikes');
      setBikes(res.data.filter(bike => bike.shortlisted));
    } catch (err) {
      console.error("Error fetching shortlisted bikes:", err);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleShortlist = async (id, shortlisted) => {
    try {
      await axios.put(`http://localhost:5000/api/bikes/updatebike/${id}`, { shortlisted: !shortlisted });
      fetchBikes();
    } catch (err) {
      console.error("Error updating shortlist:", err);
    }
  };

  return (
    <div className="shortlisted-container">
      <h2>Shortlisted Bikes</h2>
      <Link to="/">← Back to Listings</Link>
      {bikes.length === 0 ? (
        <p>No bikes have been shortlisted yet.</p>
      ) : (
        <ul>
          {bikes.map(bike => (
            <li key={bike._id}>
              <img src={bike.image} alt={bike.name} height="100" />
              <h3>{bike.name}</h3>
              <p>{bike.brand} - ₹{bike.price}</p>
              <Link to={`/bike/${bike._id}`}>View Details</Link>
              <button
                className="unshortlist-btn"
                onClick={() => handleShortlist(bike._id, bike.shortlisted)}
              >
                Unshortlist
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShortlistedBikes;
