// src/components/Tracker.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map'; 
import './Tracker.css'
const Tracker = () => {
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const [mapCoordinates, setMapCoordinates] = useState(null);

  useEffect(() => {
   
    fetchUserIP();
  }, []);

  const fetchUserIP = async () => {
    try {
      const response = await axios.get('https://api64.ipify.org?format=json');
      setInput(response.data.ip);
      trackInfo(response.data.ip);
    } catch (error) {
      console.error('Error fetching user IP:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const trackInfo = async (ip) => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}?token=10ba8d8dca97bc`);
      setData(response.data);

      const [latitude, longitude] = response.data.loc.split(',');
      setMapCoordinates({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const handleTrackButtonClick = () => {
    trackInfo(input);
  };

  return (
    <div>
      <div className='input-section'>
      <input className='input'
        type="text"
        placeholder="Enter IP address"
        value={input}
        onChange={handleInputChange }
      />
      <button onClick={handleTrackButtonClick}>Track</button>
      </div>
      {data && (
        <div className='center'>
        <div className='info-section'>
          <p>IP Address: <span> {data.ip}</span></p>
          <p>Location:<span> {data.city}, {data.region}, {data.country} </span></p>
          <p>Timezone:<span> {data.timezone}</span></p>
          <p>ISP:<span> {data.org}</span></p>
        </div></div>
      )}
     
      {mapCoordinates && <Map  location={{ loc: [mapCoordinates.lat, mapCoordinates.lng] }} />}
   </div>
  );
};

export default Tracker;
