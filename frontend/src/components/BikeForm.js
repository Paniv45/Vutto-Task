import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BikeForm.css';

const BikeForm = () => {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: '',
    year: '',
    mileage: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (key, value) => {
    let error = '';
    const currentYear = new Date().getFullYear();

    switch (key) {
      case 'name':
      case 'brand':
        if (!value.trim()) error = `${key} is required`;
        break;

      case 'price':
      case 'mileage':
        if (!value.trim()) {
          error = `${key} is required`;
        } else if (!/^\d*\.?\d*$/.test(value)) {
          error = 'Must be a valid number';
        }
        break;

      case 'year':
        if (!value.trim()) {
          error = `${key} is required`;
        } else if (!/^\d{4}$/.test(value)) {
          error = 'Must be a 4-digit year';
        } else if (Number(value) < 1990 || Number(value) > currentYear) {
          error = `Year must be between 1990 and ${currentYear}`;
        }
        break;

      case 'image':
        if (!value.trim()) error = 'Image URL is required';
        break;

      default:
        break;
    }

    setErrors(prev => ({ ...prev, [key]: error }));
    return error;
  };

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    validateField(key, value);
  };

  const isFormValid = () => {
    const keys = Object.keys(form);
    let hasErrors = false;
    const newErrors = {};

    keys.forEach(key => {
      const error = validateField(key, form[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      await axios.post('http://localhost:5000/api/bikes/addbike', form);
      navigate('/');
    } catch (error) {
      console.error('Error adding bike:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bike-form">
      <h2>Add Bike</h2>
      {Object.entries(form).map(([key, value]) => (
        <div key={key} className="form-group">
          <label htmlFor={key} style={{ display: 'block', marginBottom: '4px' }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>
          <input
            id={key}
            type="text"
            placeholder={`Enter ${key}`}
            value={value}
            onChange={e => handleChange(key, e.target.value)}
          />
          {errors[key] && <small style={{ color: 'red' }}>{errors[key]}</small>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BikeForm;
