import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
} from "react-leaflet";

import "./App.css";
import { CityPinsLayer } from "./components/MapLayers/CItyPinsLayer/CityPinsLayer";
import City from "./models/City";

const style = {
  height: "100vh",
  width: "100vw",
  // maxWidth: "100vw",
  // maxHeight: "100vh",
};

function App() {
  const [cities, setCities] = useState<Array<City>>();

  useEffect(() => {}, []);

  const fetchWeatherData = async () => {
    const res = await fetch("http://localhost:3001/api/v1/weather");
    const body = await res.json();
    setCities(body);
    console.log(body);
  };

  const onMapLoad = () => {
    fetchWeatherData().catch(console.error);
  };

  return (
    <MapContainer
      style={style}
      center={[55.753215, 37.622504]}
      zoom={9}
      scrollWheelZoom={true}
      whenReady={onMapLoad}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CityPinsLayer cityList={cities ?? []} />
      <SVGOverlay
        attributes={{ stroke: "red" }}
        bounds={[
          [51.49, -0.08],
          [51.5, -0.06],
        ]}
      >
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <circle r="5" cx="10" cy="10" fill="red" />
        <text x="50%" y="50%" stroke="white">
          text
        </text>
      </SVGOverlay>
    </MapContainer>
  );
}

export default App;
