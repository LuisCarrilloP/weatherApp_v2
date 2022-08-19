import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import cloudy from './images/cloudy.jpg'
import clear from './images/clear.jpg'
import rain from './images/rain.jpg'
import thunder from './images/thunder.jpg'
import drizzly from './images/drizzly.jpg'


function App() {

  const [ weatherInfo , setWeatherInfo ] = useState({})
  const [ temp, setTemp ] = useState(0)
  const [ toggleKC, setToggleKC ] = useState(true)

  const weatherCondition = `${weatherInfo.weather?.[0].main}`
  const [ changeBg, setChangeBg ] = useState(weatherCondition) 

  const myApi = "050cbfec9ad0f4fe20d51d885442025f"
  //const apiExtra = "8c1743e8bb31396e83e27d5f01d73dfc"



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
  }

  /* console.log(changeBg); */


  
  useEffect(() => {
    function success(pos) {
      const crd = pos.coords;
  
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${myApi}`)
          .then(res => {
            setWeatherInfo(res.data)
            setTemp((res.data.main.temp - 273.15).toFixed(1))
            setChangeBg(res.data.weather?.[0].main)
          })  
    }
    
    function error(err) {
      alert("Necesario el permiso de ubicación")
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  //console.log(weatherInfo);

  const toggleUnit = () => {
    if(toggleKC){
      setTemp(((temp - 32) * 5/9).toFixed(1))
      setToggleKC(false)
    }else{
      setTemp(((temp * 9/5) + 32).toFixed(1))
      setToggleKC(true)
    }
  }

  return (
    <div className="App">
      <section>
        <div className="glass">
          <h2>Weather App</h2>
          <h4>{weatherInfo.name}, {weatherInfo.sys?.country}</h4>
          

          <div className="weather-first">
            <div className='weather-icon'>
              
                <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather?.[0].icon}@2x.png`} alt="" width="180px"/>
                <h5>{temp} {!toggleKC ? "ºC" : "ºF"}</h5>
              
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
}

export default App;
