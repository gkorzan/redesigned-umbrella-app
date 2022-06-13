import React, { FC } from "react";
interface TempWithIcon {
  imgUrl: string;
  temp: number;
}

export const TempWithIcon: FC<TempWithIcon> = ({ imgUrl, temp }) => {
  return (
    <svg width="10em" height="5em">
      {/* <circle r="1em" cx="20%" cy="50%" fill="red" /> */}
      <image x="10%" y="30%" href={imgUrl} />
      <text x="60%" y="60%" textAnchor="middle" fontSize="1.5em" stroke="none">
        {temp}°C
      </text>
    </svg>
  );
};
