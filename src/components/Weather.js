import React, { useState } from 'react';
import useLocation from '../hooks/useLocation'
import cloudy from '../images/cloudy.jpg'
import clear from '../images/clear.jpg'
import rain from '../images/rain.jpg'
import thunder from '../images/thunder.jpg'
import drizzly from '../images/drizzly.jpg'


const Weather = () => {

    const { weatherInfo, temp, setTemp } = useLocation()
    const [ toggleKC, setToggleKC ] = useState(true)

    const weatherCondition = weatherInfo.weather?.[0].main
    const [ changeBg, setChangeBg ] = useState(weatherCondition)
    
    if( changeBg === "Clouds" ) {
        setChangeBg(document.body.style.background = `url(${cloudy}) no-repeat`)
        setChangeBg(document.body.style.backgroundSize = "cover")
    }else if( changeBg === "Clear" ) {
        setChangeBg(document.body.style.background = `url(${clear}) no-repeat`)
        setChangeBg(document.body.style.backgroundSize = "cover")
    }else if( changeBg === "Rain" ) {
        setChangeBg(document.body.style.background = `url(${rain}) no-repeat`)
        setChangeBg(document.body.style.backgroundSize = "cover")
    }else if( changeBg === "Drizzle" ) {
        setChangeBg(document.body.style.background = `url(${drizzly}) no-repeat`)
        setChangeBg(document.body.style.backgroundSize = "cover")
    }else if( changeBg === "Thunder" ) {
        setChangeBg(document.body.style.background = `url(${thunder}) no-repeat`)
        setChangeBg(document.body.style.backgroundSize = "cover")
    }else{
        document.body.style.background = `url(${clear}) no-repeat`
        document.body.style.backgroundSize = "cover"
    }

    const toggleUnit = () => {
        if(toggleKC){
            setTemp(temp*1.8+32)
            setToggleKC(false)
        }else{
            setTemp((temp-32)/1.8)
            setToggleKC(true)
            }
    }

    return (
        <div>
            <section>
                <div className="glass">
                    <h2>Weather App</h2>
                    <h4>{weatherInfo.name}, {weatherInfo.sys?.country}</h4>

                    <div className="weather-first">
                        <div className='weather-icon'>

                        <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather?.[0].icon}@2x.png`} alt="" width="180px"/>
                        <h5>{Math.round(temp)} {toggleKC ? "ºC" : "ºF"}</h5>

                        </div>
                        <div className='weather-info'>
                            <p>
                                <span className='weather-des'>"{weatherInfo.weather?.[0].description}"</span>
                            </p>
                            <p>
                                <span>Wind Speed </span>{weatherInfo.wind?.speed} m/s
                            </p>
                            <p>
                                <span>Humidity </span>{weatherInfo.main?.humidity}%
                            </p>
                            <p>
                                <span>Pressure </span> {weatherInfo.main?.pressure} mb
                            </p>
                        </div>
                    </div>

                    <div className="btn">
                        <button onClick={toggleUnit}>Degrees {!toggleKC ? "ºF" : "ºC"}</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Weather;