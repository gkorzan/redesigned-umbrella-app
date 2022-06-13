import { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { City } from "../../../models/City";
import { WeatherCondition } from "../../../models/WeatherConditionEnum";
import { TableBlock } from "./../TableBlock";
import "./DetailInfoTable.css";
interface DetailInfoTableProps {
  city: City;
}

export const DetailInfoTable: FC<DetailInfoTableProps> = ({ city }) => {
  const WeatherFields: any = {
    id: "Индекс",
    lat: "Широта",
    lon: "Долгота",
    temp: "Температура",
    condition: "Состояние",
    feelsLike: "Ощущается как",
    pressureMm: "Давление",
    humidity: "Влажность",
  };
  const ambiguosFields = ["name", "imgUrl", "geoid"];
  const translatedCondition = WeatherCondition[city.condition];
  return (
    <table>
      <thead>
        <th colSpan={2}>{city.name}</th>
      </thead>
      <tbody>
        {Object.entries(city).map(([key, value]) => {
          if (ambiguosFields.includes(key)) {
            return;
          }
          switch (key) {
            case "condition":
              return (
                <TableBlock
                  key={city.id + key}
                  objkey={WeatherFields[key]}
                  value={translatedCondition}
                />
              );
            case "temp":
              return (
                <TableBlock
                  key={city.id + key}
                  objkey={WeatherFields[key]}
                  value={value + "°C"}
                />
              );
            case "feelsLike":
              return (
                <TableBlock
                  key={city.id + key}
                  objkey={WeatherFields[key]}
                  value={value + "°C"}
                />
              );
            case "pressureMm":
              return (
                <TableBlock
                  key={city.id + key}
                  objkey={WeatherFields[key]}
                  value={value + " мм"}
                />
              );
            case "humidity":
              return (
                <TableBlock
                  key={city.id + key}
                  objkey={WeatherFields[key]}
                  value={value + "%"}
                />
              );
            default:
              return (
                <TableBlock
                  key={city.id + key}
                  objkey={WeatherFields[key]}
                  value={value}
                />
              );
          }
        })}
      </tbody>
    </table>
  );
};
