import React, { FC } from "react";
import { LayerGroup, Marker, Popup } from "react-leaflet";
import City from "../../../models/City";
import { CityPin } from "../../CityPin";
interface CityPinsLayerProps {
  cityList: Array<City>;
}

export const CityPinsLayer: FC<CityPinsLayerProps> = ({ cityList }) => {
  return (
    <LayerGroup>
      {cityList.map((city: City) => {
        return <CityPin key={city.id} city={city} />;
      })}
    </LayerGroup>
  );
};
