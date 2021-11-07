import { GetServerSideProps } from "next";
import Week from "../components/Week";
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
    <div>
      <h1>City</h1>
      <p>{weather.name}</p>
      <p>{weather.weather[0].description}</p>
      <p>{weather.main.temp}</p>
      <p>{weather.main.temp_min}</p>
      <p>{weather.main.temp_max}</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <Week id={weather.id}/>
    </div>
  );
}



