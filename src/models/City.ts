import { WeatherCondition } from "./WeatherConditionEnum";

interface City {
  name: string;
  id: number;
  geoid: number;
  lat: number;
  lon: number;
  temp: number;
  imgUrl: string;
  condition: keyof typeof WeatherCondition | string;
}

export type { City };
