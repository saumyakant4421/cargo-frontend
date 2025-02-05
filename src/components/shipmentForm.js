import React, { useState, useEffect } from "react";
import axios from "axios";
import "./shipmentForm.css";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune",
  "Ahmedabad", "Jaipur", "Lucknow", "Indore", "Bhopal", "Patna", "Nagpur", "Coimbatore"
];

const ShipmentForm = ({ onClose, isOpen }) => {
  const [containerId, setContainerId] = useState("");
  const [route, setRoute] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [eta, setEta] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const addRouteLocation = (e) => {
    const selectedCity = e.target.value;
    if (selectedCity && !route.includes(selectedCity)) {
      setRoute([...route, selectedCity]);
    }
  };

  const removeRouteLocation = (city) => {
    setRoute(route.filter((loc) => loc !== city));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/shipment", {
      containerId,
      route,
      currentLocation,
      eta: `${eta} days`
    });
    alert("Shipment Added!");
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for fade-out animation
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleOverlayClick}>
      <div className={`modal-content ${isVisible ? 'visible' : ''}`}>
        <div className="shipment-form">
          <h2>Add New Shipment</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input type="text" value={containerId} onChange={(e) => setContainerId(e.target.value)} required />
              <label>Container ID</label>
            </div>

            <div className="input-container">
              <select value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} required>
                <option value="">Select Current Location</option>
                {cities.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
              <label>Current Location</label>
            </div>

            <div className="input-container">
              <select onChange={addRouteLocation}>
                <option value="">Select Route Locations</option>
                {cities.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
              <label>Route Locations</label>
              <div className="selected-route">
                {route.map((city) => (
                  <span className="route-box" key={city}>
                    {city} <span className="remove-icon" onClick={() => removeRouteLocation(city)}>×</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="input-container">
              <input type="number" value={eta} onChange={(e) => setEta(e.target.value)} required />
              <label>ETA (Days)</label>
            </div>

            <div className="btn-group">
              <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
              <button type="submit" className="submit-btn">Add Shipment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShipmentForm;