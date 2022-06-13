import L from "leaflet";
import React, { FC, useEffect } from "react";
import { LayerGroup, Marker, Popup, useMap } from "react-leaflet";
import { City } from "../../../models/City";
import { CityCluster } from "../../CityCluster";
import { CityPin } from "../../CityPin/CityPin";
interface CityPinsLayerProps {
  cityList: Array<City>;
}

// const mcg = L.markerClusterGroup();

export const CityPinsLayer: FC<CityPinsLayerProps> = ({ cityList }) => {
  return (
    <LayerGroup>
      <CityCluster cityList={cityList} />
      {/* {cityList.map((city: City) => {
        return <CityPin key={city.id} city={city} />;
      })} */}
    </LayerGroup>
  );
};
