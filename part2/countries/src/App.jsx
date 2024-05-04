import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'
import weatherService from './services/weather'


const Filter = ({value, handleChange}) =>  (
  <>
    <b>Search countries </b><input value={value} onChange={handleChange} />
  </>
)

const WeatherView = ({weather}) => (
  <>
    <p>temperature {weather.temperature} °C</p>
    <p>wind {weather.wind} km/h</p>
  </>
)

const CountryView = ({country}) => (
  <>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>languages</h3>
    <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>
      )}
    </ul>
    <img src={country.flags.png}></img>
  </>
)


const CountriesView = ({countries, handleClick}) => {
  if (countries.length === 0) {
    return <><p>Zero matches</p></>
  }
  else if (countries.length === 1) {
    if (countries[0].weather) {
      return (
        <>
          <CountryView country={countries[0]} />
          <h2>Weather in {countries[0].name.common}</h2>
          <WeatherView weather={countries[0].weather} />
        </>
      )
    }
    else {
      return <CountryView country={countries[0]} />
    }
  }
  else if (countries.length <= 10) {
    return (
      <>
        {countries.map(country => (
            <div key={country.name.official}>{country.name.common} <button onClick={() => handleClick(country.name.common)}>View</button></div>

        ))}
      </>
    )
  }
  else {
    return <><p>Too many matches</p></> 
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([]) 


  useEffect(() => {
    countryService
      .getAll()    
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  useEffect(() => {
    // We do this twice expensive operation twice when filter changes...
    const filtered = filterCountries()
    if (filtered.length === 1) {
      // Get weather info and set it as a field for the 'current' country
      const selected = filtered[0]
      weatherService
        .getWeather(selected.latlng['0'], selected.latlng['1'])
        .then(weather => {
          console.log(weather)
          setCountries(countries.map(country => {
            console.log(`selected ${selected.name} country ${country.name}`)
            if (country.name.official === selected.name.official) {
              return {...country, weather: weather}
            }
            else {
              return country
            }
          }))
        })
    }
  }, [filter])


  const handleChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const filterCountries = () => {
    return countries.filter(country => {
      const name = country.name.common.toLowerCase()
      return name.startsWith(filter.toLowerCase())
    })
  }

  return (
    <>
      <Filter 
        value={filter}
        handleChange={handleChange}/>

      <CountriesView 
        countries={filterCountries()} 
        handleClick={(countryName) => setFilter(countryName)}/>
    </>
  )
}

export default App
