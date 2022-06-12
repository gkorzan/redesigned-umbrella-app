import React, { FC, useEffect } from "react";
import { LayerGroup, Marker, Popup, useMap } from "react-leaflet";
import { City } from "../../../models/City";
import { BriefInfo } from "../../BriefInfo/BriefInfo";
import { CityPin } from "../../CityPin/CityPin";
interface BriefInfoLayerProps {
  cityList: Array<City>;
}

export const BriefInfoLayer: FC<BriefInfoLayerProps> = ({ cityList }) => {
  return (
    <LayerGroup>
      {cityList.map((city: City) => {
        return <BriefInfo key={city.id} city={city} />;
      })}
    </LayerGroup>
  );
};
