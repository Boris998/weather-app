import './App.css';
import {useState} from "react";
import axios from "axios";

const App = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('skopje');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b0f641e9820903ac2f81da7edd0838e2`;

    const searchLocation = (e) => {
        if (e.key === 'Enter') {
            axios.get(url).then(response => {
                setData(response.data);
                console.log(response.data);
            });
            setLocation('');
        }
    }

    const locationHandler = (e) => {
        e.preventDefault();
        setLocation(e.target.value);
    }

    return (
        <div className="app">
            <div className="search">
                <input
                    placeholder='Search for location'
                    type="text"
                    value={location}
                    onKeyPress={searchLocation}
                    onChange={locationHandler}
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        <h1>{data.main&&(+data.main?.temp-273).toFixed()} °C</h1>
                    </div>
                    <div className="description">
                        <p>Clouds</p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="feels">
                        <p className='bold'>{data.main&&(+data.main?.feels_like-273).toFixed()} °C</p>
                        <p>Feels like</p>
                    </div>
                    <div className="humidity">
                        <p className='bold'>{data.main&&data.main?.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        <p className='bold'>{data.main&&(+data.wind?.speed*1.6).toFixed(1)} KPH</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
