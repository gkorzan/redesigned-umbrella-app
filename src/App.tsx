import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngTuple, Map } from "leaflet";

import "./App.css";
import { CityPinsLayer } from "./components/MapLayers/CItyPinsLayer/CityPinsLayer";
import { City } from "./models/City";
import { configureMap, MAX_ZOOM, MIN_ZOOM } from "./utils/mapUtils";
import { MapControls } from "./components/MapControls";
import { BriefInfoLayer } from "./components/MapLayers/CItyPinsLayer/BriefInfoLayer";
import MOCKED_DATA from "./mocked_data.json";

const style = {
  height: "100vh",
  width: "100vw",
  // maxWidth: "100vw",
  // maxHeight: "100vh",
};

function App() {
  const [cities, setCities] = useState<Array<City>>();
  const [currentZoom, setCurrentZoom] = useState<number>(MAX_ZOOM);
  const [isBriefLayoutShowing, setIsBriefLayoutShowing] = useState(true);

  let mapCenter: LatLngTuple =
    //  [55.753215, 37.622504];
    [59.939098, 30.315868];

  const mapRef: React.Ref<Map> = useRef(null);

  useEffect(() => {
    if (currentZoom === MAX_ZOOM) {
      setIsBriefLayoutShowing(true);
    } else {
      setIsBriefLayoutShowing(false);
    }
  }, [currentZoom]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    const map = mapRef.current;
    configureMap(map);

    map.on("zoomstart", () => {
      setIsBriefLayoutShowing(false);
    });
    map.on("zoom", () => {
      setCurrentZoom(map.getZoom());
    });

    return () => {
      map.off("zoom");
      map.off("zoomstart");
    };
  }, [mapRef.current]);

  const fetchWeatherData = async () => {
    const res = await fetch("http://localhost:3001/api/v1/weather");
    const body = await res.json();
    setCities(body);
    console.log(body);
  };

  const onMapLoad = () => {
    fetchWeatherData().catch((e) => {
      alert(
        `
Could not fetch weather data from server
Reason:"${e}"

Please contact developer: gleb0002@gmail.com`
      );
      setCities(MOCKED_DATA);
    });
  };

  return (
    <MapContainer
      id="map"
      style={style}
      center={mapCenter}
      zoom={MAX_ZOOM}
      scrollWheelZoom={true}
      whenReady={onMapLoad}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CityPinsLayer cityList={cities ?? []} />
      {isBriefLayoutShowing ? <BriefInfoLayer cityList={cities ?? []} /> : null}

      <MapControls />
    </MapContainer>
  );
}

export default App;
