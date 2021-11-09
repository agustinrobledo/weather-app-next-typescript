import { useState, useEffect } from "react";
interface DayData {
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
    }
    weather: [
        {
            description: string,
            icon: string
        }
    ]
    dt: number;
    dt_txt: string; 
}
const dayFunction = (day:string) => {
     const dayHour = new Date(day).getHours();
     return dayHour
}
export default function Week(props:{id:number}): JSX.Element{
    const apiKey: String = "7796135672a1ef998330890d3fb9eb22"
    const [weekWeather, setWeekWeather] = useState<DayData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${props.id}&appid=${apiKey}&cnt=7&units=metric`)
        .then(response => response.json())
        .then(data => {
            setWeekWeather(data.list);
            console.log(data.list);
            setIsLoading(false);
        })
        .catch(error => console.log(error));
    }, [props.id]);
    console.log(props.id);
    return (
        <div className="week">
            <h1>Weather in the next hours.</h1>
            {isLoading ? <p>Loading...</p> : 
            <div className="weather-container">
                {weekWeather.map(day => (
                    <div
                    className="weather-card" 
                    key={day.dt}>
                            <h2>{dayFunction(day.dt_txt)}:00hs.</h2>
                        <div>
                            <p><strong>Actual temp</strong>: {day.main.temp}</p>
                            <p><strong>Min</strong>: {day.main.temp_min}</p>
                            <p><strong>Max</strong>: {day.main.temp_max}</p>
                            <p><strong>{day.weather[0].description}</strong></p>
                        </div>
                        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}/>
                    </div>
                ))}
            </div>
            }
        </div>
    );
}