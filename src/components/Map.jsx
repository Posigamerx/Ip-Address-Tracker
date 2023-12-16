// src/components/Map.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


import './Map.css'; // Import the stylesheet

const Map = ({ location }) => {
  const { loc } = location;


  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    
    <div className="map-container">
      <MapContainer center={loc} zoom={13} style={{ width: '100%', height: '60vh'  }}>
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        <Marker position={loc} icon={customIcon}>
          <Popup>
            A marker indicating the location.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
   
  );
};

export default Map;
