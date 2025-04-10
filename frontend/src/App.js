// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BikeList from './components/BikeList';
import BikeForm from './components/BikeForm';
import BikeDetails from './components/BikeDetails';
import ShortlistedBikes from './components/ShortlistedBikes';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BikeList />} />
        <Route path="/add" element={<BikeForm />} />
        <Route path="/bike/:id" element={<BikeDetails />} />
        <Route path="/shortlisted" element={<ShortlistedBikes />} />
      </Routes>
    </Router>
  );
};

export default App;