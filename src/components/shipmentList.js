import React, { useState, useEffect } from "react";
import axios from "axios";
import ShipmentMap from "./shipmentMap";
import "./shipmentList.css";

const ShipmentList = ({ onAddShipment }) => {  // Accepting onAddShipment prop
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5001/api/shipments")
      .then((response) => {
        console.log(response.data);  // Log data to inspect the structure
        setShipments(response.data);
      })
      .catch((error) => console.error("Error fetching shipments:", error));
  }, []);

  return (
    <div className="shipment-list">
      <h2>Shipment Dashboard</h2>
      <button onClick={onAddShipment} className="add-shipment-btn">
        Add Shipment
      </button>  {/* Add the button here */}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Container</th>
            <th>Route</th>
            <th>Current Location</th>
            <th>ETA (Days)</th>
            <th>Map</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment._id}>
              <td>{shipment._id}</td>
              <td>{shipment.containerId}</td>
              <td>{shipment.route.map((city) => city.name).join(" → ")}</td>
              <td>{shipment.currentLocation}</td>
              <td>{shipment.eta}</td>
              <td>
                <button onClick={() => setSelectedShipment(shipment)}>View Map</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Map When a Shipment is Selected */}
      {selectedShipment && (
        <div className="map-popup">
          <button className="close-btn" onClick={() => setSelectedShipment(null)}>×</button>
          <ShipmentMap shipment={selectedShipment} />
        </div>
      )}
    </div>
  );
};

export default ShipmentList;
