import axios from 'axios';
import { useEffect, useState } from 'react';

const useLocation = () => {

    const [ weatherInfo , setWeatherInfo ] = useState({})
    const [ temp, setTemp ] = useState(0)

    useEffect(() => {
        function success(pos){
            var crd = pos.coords
            const myApi = "050cbfec9ad0f4fe20d51d885442025f"

            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${myApi}`)
                .then(res => {
                    setWeatherInfo(res.data)
                    setTemp(res.data.main?.temp-273.15)
                })
        }

        function error(err){
            console.warn(`ERROR(${err.code}): ${err.message}`)
        }

        navigator.geolocation.getCurrentPosition(success, error)
    }, [])

    return { weatherInfo, setWeatherInfo, temp, setTemp }
};

export default useLocation;