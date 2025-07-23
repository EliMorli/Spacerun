import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({ locations }) {
  if (!locations || locations.length === 0) {
    return null;
  }

  return (
    <MapContainer center={[locations[0].latitude, locations[0].longitude]} zoom={4} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {locations.map(loc => (
        <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
          <Popup>
            <div className="text-black">
              <h4 className="font-bold">{loc.city}</h4>
              <p>{loc.address}</p>
              <a href={loc.booking_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold">Book Now</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}