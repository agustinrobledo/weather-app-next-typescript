import { useEffect, useState } from "react";
import Link from "next/link";
type inputEvent = React.ChangeEvent<HTMLInputElement>;
type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
interface CityData {
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
const apiKey: String = "7796135672a1ef998330890d3fb9eb22"
export default function HomePage(): JSX.Element {
    const [city, setCity] = useState<string> ("");
    const onChange = (e: inputEvent) => {
        setCity(e.target.value);
    }
    const [cities, setCities] = useState<CityData[]>([]);
    const onSubmit = (e: FormSubmitEvent) => {
        e.preventDefault();
        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                .then(res => res.json())
                .then(data => {
                    setCities([...cities, data]);
                    setCity("");
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
  return (
    <div>
        <h1>
          Home
        </h1>
        <form
        onSubmit={onSubmit}
        >
            <input 
            placeholder="Busca tu ciudad"
            type="search"
            value={city}
            onChange={onChange}
            />
        </form>
        <div>
            {cities.map((city, index) => (
                <div 
                key={city.id}
                >
                    <h2>
                        <Link href={`/${city.id}`}>
                            {city.name}
                        </Link>
                    </h2>
                    <p>Temperatura actual: {city.main.temp}</p>
                    <p>Min: {city.main.temp_min}</p>
                    <p>Max: {city.main.temp_max}</p>
                    <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}/>
                </div>
            ))}
      </div>
    </div>
  );
}
