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
}
export default function Week(props:{id:number}): JSX.Element{
    const apiKey: String = "7796135672a1ef998330890d3fb9eb22"
    const [weekWeather, setWeekWeather] = useState<DayData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${props.id}&appid=${apiKey}&units=metric&cnt=7`)
        .then(response => response.json())
        .then(data => {
            setWeekWeather(data.list);
            setIsLoading(false);
        })
        .catch(error => console.log(error));
    }, [props.id]);
    console.log(props.id);
    return (
        <div>
            <h1>Week</h1>
            {isLoading ? <p>Loading...</p> : 
            <div>
                {weekWeather.map(day => (
                    <div key={day.dt}>
                        <p>{day.main.temp}</p>
                        <p>{day.weather[0].description}</p>
                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}/>
                    </div>
                ))}
            </div>
            }
        </div>
    );
}