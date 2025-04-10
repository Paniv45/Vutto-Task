import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BikeDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // FA back icon

const BikeDetails = () => {
  const [bike, setBike] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bikes/getbike/${id}`).then(res => {
      setBike(res.data);
      setFormData(res.data);
    }).catch(err => console.error("Error fetching bike:", err));
  }, [id]); // What is the use of this id over here what does it state [id]

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/bikes/deletebike/${id}`);
    navigate('/');
    // navigate(`/bike/${bike._id}`);
  };

  const handleSave = async () => {
    const res = await axios.put(`http://localhost:5000/api/bikes/updatebike/${id}`, formData);
    setBike(res.data);
    setIsEditing(false);
  };

  const handleShortlist = async (id, shortlisted) => {
      try {
        await axios.put(`http://localhost:5000/api/bikes/updatebike/${id}`, { shortlisted: !shortlisted });
        
      } catch (err) {
        console.error("Error updating shortlist:", err);
      }
    };

  if (!bike) return <div>Loading...</div>;

  return (
    <div className="bike-details">
      {isEditing ? (
        <>
          {['name', 'brand', 'price', 'year', 'mileage', 'image'].map(key => (
            <div key={key} className="form-group">
            <label htmlFor={key} style={{ display: 'block', marginBottom: '4px' }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
          <input
            id={key}
            name={key}
            value={formData[key]}
            onChange={e => setFormData({ ...formData, [key]: e.target.value })}
            style={{ marginBottom: '12px', padding: '6px', width: '100%' }}
          />
        </div>
        ))}

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>

        </>
      ) : (
        <>
          <Link to="/" className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Link>
          <h2>{bike.name}</h2>
          <img src={bike.image} alt={bike.name} height="200" />
          <p><strong>Brand:</strong> {bike.brand}</p>
          <p><strong>Price:</strong> ₹{bike.price}</p>
          <p><strong>Year:</strong> {bike.year}</p>
          <p><strong>Mileage:</strong> {bike.mileage} kmpl</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button
                className={bike.shortlisted ? 'shortlisted-btn' : 'not-shortlisted-btn'}
                onClick={() => handleShortlist(bike._id, bike.shortlisted)}
              >
              {bike.shortlisted ? 'Unshortlist' : 'Shortlist'}
            </button>
        </>
      )}
    </div>
  );
};

export default BikeDetails;
