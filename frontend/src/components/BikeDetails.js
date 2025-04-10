import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BikeDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BikeDetails = () => {
  const [bike, setBike] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bikes/getbike/${id}`).then(res => {
      setBike(res.data);
      setFormData(res.data);
    }).catch(err => console.error("Error fetching bike:", err));
  }, [id]);

  const validateField = (key, value) => {
    let error = '';
    const currentYear = new Date().getFullYear();
  
    switch (key) {
      case 'name':
      case 'brand':
        if (!String(value).trim()) error = `${key} is required`;
        break;
  
      case 'price':
      case 'mileage':
        if (!String(value).trim()) {
          error = `${key} is required`;
        } else if (!/^\d*\.?\d*$/.test(value)) {
          error = 'Must be a valid number';
        }
        break;
  
      case 'year':
        if (!String(value).trim()) {
          error = `${key} is required`;
        } else if (!/^\d*$/.test(value) || String(value).length > 4) {
          error = 'Must be a valid year';
        } else if (String(value).length === 4 && (Number(value) < 1990 || Number(value) > currentYear)) {
          error = `Year must be between 1990 and ${currentYear}`;
        }
        break;
  
      case 'image':
        if (!String(value).trim()) error = 'Image URL is required';
        break;
  
      default:
        break;
    }
  
    setErrors(prev => ({ ...prev, [key]: error }));
    return error;
  };
  

  const handleSave = async () => {
    const keys = ['name', 'brand', 'price', 'year', 'mileage', 'image'];
    let hasErrors = false;

    const newErrors = {};
    keys.forEach(key => {
      const error = validateField(key, formData[key] || '');
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/bikes/updatebike/${id}`, formData);
      setBike(res.data);
      setIsEditing(false);
      setErrors({});
    } catch (err) {
      console.error("Error saving bike:", err);
    }
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/bikes/deletebike/${id}`);
    navigate('/');
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
                onChange={e => {
                  const { name, value } = e.target;
                  setFormData(prev => ({ ...prev, [name]: value }));
                  validateField(name, value);
                }}
                style={{ marginBottom: '4px', padding: '6px', width: '100%' }}
              />
              {errors[key] && <small style={{ color: 'red' }}>{errors[key]}</small>}
            </div>
          ))}

          <button onClick={handleSave} style={{ marginRight: '8px' }}>Save</button>
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
          <button onClick={() => setIsEditing(true)} style={{ marginRight: '8px' }}>Edit</button>
          <button onClick={handleDelete} style={{ marginRight: '8px' }}>Delete</button>
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
