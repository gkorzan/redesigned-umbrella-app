import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngTuple, Map } from "leaflet";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { CityPinsLayer } from "./components/MapLayers/CItyPinsLayer/CityPinsLayer";
import { City } from "./models/City";
import { configureMap, MAX_ZOOM, MIN_ZOOM } from "./utils/mapUtils";
import { MapControls } from "./components/MapControls";
import { BriefInfoLayer } from "./components/MapLayers/CItyPinsLayer/BriefInfoLayer";
import MOCKED_DATA from "./mocked_data.json";
import { isEmpty } from "./utils/isEmpty";

const style = {
  height: "100vh",
  width: "100vw",
  // maxWidth: "100vw",
  // maxHeight: "100vh",
};

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
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
    // console.log(API_URL + "/api/v1/weather");
    const res = await fetch(API_URL + "/api/v1/weather");
    const body = await res.json();
    if (isEmpty(body)) {
      setCities(MOCKED_DATA);
      return;
    }
    setCities(body);
    // console.log(body);
  };

  const onMapLoad = () => {
    const id = toast.info("?????????????? ???????????? ?? ????????????...", {
      hideProgressBar: true,
    });
    fetchWeatherData()
      .then(() => {
        toast.dismiss(id);
        toast.success("???????????? ?????????????? ??????????????????!", { hideProgressBar: true });
      })
      .catch((e) => {
        toast.dismiss(id);
        toast.error(
          "???????????? ???? ????????????????, ????????????????????, ?????????????????? ?? ??????????????????????????: gleb0002@gmail.com",
          { hideProgressBar: true }
        );
        setCities(MOCKED_DATA);
      });
  };

  return (
    <>
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
        {isBriefLayoutShowing ? (
          <BriefInfoLayer cityList={cities ?? []} />
        ) : null}

        <MapControls />
      </MapContainer>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
