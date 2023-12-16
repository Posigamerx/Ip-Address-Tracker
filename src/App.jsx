// src/App.js
import  { useState } from 'react';
import Tracker from './components/Tracker';
import Map from './components/Map';
import './App.css'

const App = () => {
  const [coordinates, setCoordinates] = useState(null);

  const updateCoordinates = (latitude, longitude) => {
    setCoordinates({ loc: [latitude, longitude] });
  };

  return (
    <div>
      <h1 className='header'>IP Address Tracker</h1>
      <Tracker onCoordinatesUpdate={updateCoordinates} />
      {coordinates && <Map location={coordinates} />}
    </div>
  );
};

export default App;
