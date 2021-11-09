import { GetServerSideProps } from "next";
import Week from "../components/Week";
import Link from "next/link";
interface CityData {
    weather:{
    name: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    id: number;
    weather: [
      {
        description: string;
        icon: string;
      }
    ];
  }
}
type IntrinsicAttributes = {
  id: number;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const city = context.query.city;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  return {
    props: {
      weather: data,
    },
  };
};

const apiKey: String = "7796135672a1ef998330890d3fb9eb22"
export default function City({weather}: CityData): JSX.Element {
  console.log(weather)
  return (
    <>
    <Link href="/">
      <a className="home">Home</a>
    </Link>
    <div className="city-container">
      <h1>{weather.name}</h1>
      <p><strong>{weather.weather[0].description}</strong></p>
      <p><strong>Actual temp</strong>: {weather.main.temp}</p>
      <p><strong>Min</strong>: {weather.main.temp_min}</p>
      <p><strong>Max</strong>: {weather.main.temp_max}</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
    </div>
      <Week id={weather.id}/>
    </>
  );
}



