import React, { useState } from "react";
import ShipmentList from "./components/shipmentList";
import ShipmentForm from "./components/shipmentForm";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <ShipmentList onAddShipment={() => setIsModalOpen(true)} />  {/* Pass onAddShipment prop */}
      <ShipmentForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
