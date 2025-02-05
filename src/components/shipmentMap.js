import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ShipmentMap = ({ shipment }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [formattedRoute, setFormattedRoute] = useState([]);

  useEffect(() => {
    if (shipment && shipment.currentLocation) {
      const fetchLocation = async () => {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${shipment.currentLocation}&key=OPEN_CAGE_API`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const location = {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng,
          };
          setCurrentLocation(location);
        } else {
          setCurrentLocation(null); // Handle error case
        }
      };

      fetchLocation();
    }

    if (shipment && shipment.route) {
      const fetchRoute = async () => {
        const routeData = await Promise.all(
          shipment.route.map(async (location) => {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=OPEN_CAGE_API`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              return {
                lat: data.results[0].geometry.lat,
                lng: data.results[0].geometry.lng,
              };
            }
            return null;
          })
        );
        setFormattedRoute(routeData.filter((loc) => loc !== null));
      };

      fetchRoute();
    }
  }, [shipment]);

  // Check if currentLocation and formattedRoute are available
  if (!currentLocation || formattedRoute.length === 0) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer
      center={[currentLocation.lat, currentLocation.lng]}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[currentLocation.lat, currentLocation.lng]} />
      {formattedRoute.length > 0 && <Polyline positions={formattedRoute} color="blue" />}
    </MapContainer>
  );
};

export default ShipmentMap;
