import { Marker, Popup } from "react-leaflet";
import React, { FC } from "react";
import City from "../models/City";
interface CityPinProps {
  city: City;
}

export const CityPin: FC<CityPinProps> = ({ city }) => {
  return (
    <Marker position={[city.lat, city.lon]}>
      <Popup>
        <ul>
          {Object.entries(city).map(([key, value]) => {
            return (
              <li key={key}>
                {key}: {value} <br />
              </li>
            );
          })}
        </ul>
      </Popup>
    </Marker>
  );
};
