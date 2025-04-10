import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BikeList.css';

const BikeList = () => {
  const [bikes, setBikes] = useState([]);
  const [filters, setFilters] = useState({ brand: '', year: '' });

  const fetchBikes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bikes/getbikes");
      setBikes(res.data);
    } catch (err) {
      console.error("Error fetching bikes:", err);
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

  const filteredBikes = bikes.filter(bike =>
    (filters.brand === '' || bike.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
    (filters.year === '' || bike.year.toString().includes(filters.year))
  );

  return (
    <div className="bike-list-container">
      <h1>Bike Listings</h1>
      <div className="nav-links">
        <Link to="/add">Add New Bike</Link>
        <Link to="/shortlisted">View Shortlisted</Link>
      </div>
      <div className="filters">
        <input placeholder="Brand" value={filters.brand} onChange={e => setFilters({ ...filters, brand: e.target.value })} />
        <input placeholder="Year" value={filters.year} onChange={e => setFilters({ ...filters, year: e.target.value })} />
      </div>
      <ul className="bike-list">
        {filteredBikes.length === 0 ? (
          <p>No bikes match the criteria.</p>
        ) : (
          filteredBikes.map(bike => (
            <li key={bike._id}>
              <img src={bike.image} alt={bike.name} height="100" />
              <h3>{bike.name} ({bike.year})</h3>
              <p>{bike.brand} - ₹{bike.price} - {bike.mileage} kmpl</p>
              <Link to={`/bike/${bike._id}`}>View Details</Link>
              <button
                className={bike.shortlisted ? 'shortlisted-btn' : 'not-shortlisted-btn'}
                onClick={() => handleShortlist(bike._id, bike.shortlisted)}
              >
              {bike.shortlisted ? 'Unshortlist' : 'Shortlist'}
            </button>

            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BikeList;

