import { Map } from "leaflet";

const MAX_ZOOM = 10;
const MIN_ZOOM = 6;
const ZOOM_STEP = 2;

const configureMap = (map: Map) => {
  if (!map) {
    throw Error("configureMap: Map was not provided");
  }
  map.setMaxZoom(MAX_ZOOM);
  map.setMinZoom(MIN_ZOOM);
  map.options.zoomSnap = ZOOM_STEP;
  map.options.zoomDelta = ZOOM_STEP;
};

export { configureMap, MAX_ZOOM, MIN_ZOOM, ZOOM_STEP };
