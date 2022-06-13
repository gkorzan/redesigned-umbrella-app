import { FC, useCallback } from "react";
import { SVGOverlay } from "react-leaflet";
import { City } from "../../models/City";
import { WeatherCondition } from "../../models/WeatherConditionEnum";
import { TempWithIcon } from "../UI/TempWithIcon";
import "./BriefInfo.css";
interface BriefInfoProps {
  city: City;
}
const OFFSET_V = 0.01;
const OFFSET_H = 0.01;
const HEIGHT = OFFSET_V + 0.5;
const WIDTH = OFFSET_H + 0.5;

const BriefInfoWrapper = ({ children }: { children: any }) => {
  return (
    <svg
      width="10em"
      height="5em"
      style={{ opacity: 0.85 }}
      className="card"
    >
      {children}
    </svg>
  );
};

const BriefInfoBackground = () => {
  return (
    <rect
      x="0"
      y="0"
      rx="1em"
      ry="1em"
      width="100%"
      height="100%"
      fill="#fff"
      style={{ stroke: "none" }}
    />
  );
};

export const BriefInfo: FC<BriefInfoProps> = ({ city }) => {
  // const textStyle = { font: "Bold 16px sans-serif" };
  return (
    <SVGOverlay
      attributes={{ stroke: "red" }}
      bounds={[
        [city.lat - OFFSET_V, city.lon + OFFSET_H],
        [city.lat - HEIGHT, city.lon + WIDTH * 2.2],
      ]}
      interactive={true}
      className="no_outline no_cursor"
    >
      {/* <rect x="0" y="0" width="100%" height="100%" fill="blue" /> debug block*/}
      <BriefInfoWrapper>
        <BriefInfoBackground />
        <TempWithIcon imgUrl={city.imgUrl} temp={city.temp} />
        {/* <text x="60%" y="60%" textAnchor="middle" stroke="none">
          {WeatherCondition[city.condition]}
        </text> */}
      </BriefInfoWrapper>
    </SVGOverlay>
  );
};
