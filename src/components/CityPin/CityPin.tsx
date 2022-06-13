import { Marker, Popup } from "react-leaflet";
import { FC, RefObject, useRef } from "react";
import { City } from "../../models/City";
import { WeatherCondition } from "../../models/WeatherConditionEnum";
import "./CityPin.css";
import { DetailInfoTable } from "../UI/DetailInfoTable/DetailInfoTable";
interface CityPinProps {
  city: City;
}

export const CityPin: FC<CityPinProps> = ({ city }) => {
  return (
    <Marker position={[city.lat, city.lon]}>
      <Popup>
        <DetailInfoTable city={city} />
      </Popup>
    </Marker>
  );
};
