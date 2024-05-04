import axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/forecast'




const getWeather = (latitude, longitude) => {

    const parseResponse = (response) => {
        const temperatures = response.data.hourly.temperature_2m
        const times = response.data.hourly.time

        const now = new Date()

        Object.entries(times).find(([key, value]) => {

        })

        return {
            temperature: 18,
            wind: 3.2
        }
    }

    return axios
            .get(baseUrl,
                {
                    params: {
                        latitude: latitude,
                        longitude: longitude,
                        hourly: 'temperature_2m,wind_speed_10m'
                }})
            .then(response => {
                console.log(response.data)
                return parseResponse(response)
            })
}


export default { getWeather }