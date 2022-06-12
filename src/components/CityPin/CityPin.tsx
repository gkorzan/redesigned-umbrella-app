import { Marker, Popup } from "react-leaflet";
import { FC, RefObject, useRef } from "react";
import { City } from "../../models/City";
import { WeatherCondition } from "../../models/WeatherConditionEnum";
import "./CityPin.css";
interface CityPinProps {
  city: City;
}

const TableBlock = ({ objkey, value }: { objkey: string; value: any }) => {
  return (
    <tr>
      <td>{objkey}:</td>
      <td>{value}</td>
    </tr>
  );
};

export const CityPin: FC<CityPinProps> = ({ city }) => {
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
    <Marker position={[city.lat, city.lon]}>
      <Popup>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>{city.name}</th>
            </tr>
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
      </Popup>
    </Marker>
  );
};
