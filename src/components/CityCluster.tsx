import { FC, useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PropTypes from "prop-types";
import L, { MarkerClusterGroup } from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";
import { CityPin } from "./CityPin/CityPin";
import { City } from "../models/City";
import { DetailInfoTable } from "./UI/DetailInfoTable/DetailInfoTable";
import { customMarker } from "./UI/customMarker";

interface CityClusterProps {
  cityList: Array<City>;
}

const CityCluster: FC<CityClusterProps> = ({ cityList }) => {
  const map = useMap();
  const [mcg, setMcg] = useState<MarkerClusterGroup>();

  useEffect(() => {
    setMcg(L.markerClusterGroup({ removeOutsideVisibleBounds: false }));
    return () => {
      mcg?.remove();
      setMcg(undefined);
    };
  }, []);

  useEffect(() => {
    if (!cityList || cityList.length === 0) return;
    if (!mcg) return;
    mcg.clearLayers();
    const markerList = cityList.map((city) => {
      const popup = L.popup().setContent(
        renderToStaticMarkup(<DetailInfoTable city={city} />)
      );
      const latlon: L.LatLngTuple = [city.lat, city.lon];
      const marker = L.marker(latlon);
      marker.bindPopup(popup);
      return marker;
    });
    mcg.addLayers(markerList);
    map.addLayer(mcg);
    return () => {
      mcg.remove();
    };
  }, [cityList, map]);

  return <></>;
};

export { CityCluster };
