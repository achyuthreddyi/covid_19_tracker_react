import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import './App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map'
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import { sortData } from './utils/utils';
import "leaflet/dist/leaflet.css"
// import {sortData} from './utils/utils'

function App() {
  // const [state, setstate] = useState(initialState)
  const [countries, setCountries] = useState([])
  const [country, setCountry ] = useState('worldwide')
  const [tableData, setTableData ] = useState([])
  const [countryInfo, setCountryInfo] = useState({})
  const [mapCenter, setMapCenter] = useState({ lat:34.80746, lng: -40.4796})
  const [mapZoom,setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesTypes,setCasesTypes] = useState("cases")

  useEffect(() =>{
    fetch(`https://disease.sh/v3/covid-19/all`)
    .then(response => response.json())
    .then( data =>{
      setCountryInfo(data)
    })
  },[])


  useEffect(() =>{
    const getCountriesData = async () =>{
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then( (response) => response.json())

      .then((data) =>{
        const countries = data.map((country) => (
         {
          name:country.country,
          value:country.countryInfo.iso2
          }
        ))
        
        const sortedData = sortData(data)
        // console.log('hello babe',sortedData[0]);
        setTableData(sortedData)
        setMapCountries(data)
        setCountries(countries)
      })
    }
    getCountriesData()
  }, [countries])

  const onCountryChange = async(event) =>{
    const countrycode = event.target.value
    // https://disease.sh/v3/covid-19/all

    const url = 
    countrycode === 'worldwide' ? 
      `https://disease.sh/v3/covid-19/all` : 
      `https://disease.sh/v3/covid-19/countries/${countrycode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countrycode)
      setCountryInfo(data)
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4)
      
    })      
    
  }
  // console.log(countryInfo);


  return (
    // Bem naming convention !!!
    <div className="app">

      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 tracker !!!!</h1>
            <FormControl className="app__dropdown">
              <Select 
              variant = "outlined"
              onChange = {onCountryChange} 
              value={country} >
                <MenuItem value = "worldwide">WorldWide</MenuItem> 
                {
                  countries.map(country =>(
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>          
          </FormControl>         
        </div>  
      
        <div className = "app_stats"> 
        <InfoBox 
        onClick = {e => setCasesTypes('cases')}
        title ="Corona Cases" 
        cases = {countryInfo.todayCases} 
        total = {countryInfo.cases} 
        />
        <InfoBox 
        onClick = {e => setCasesTypes('recovered')}
        title ="Recovered" 
        cases = { countryInfo.todayRecovered} 
        total = {countryInfo.recovered}
        /> 
        <InfoBox 
        onClick = {e => setCasesTypes('deaths')}
        title ="deaths" 
        cases = { countryInfo.todayDeaths} 
        total = {countryInfo.deaths}
        /> 
        </div>
        {/* Map  */}
        <Map 
        caseTypes= {casesTypes}
        countries = {mapCountries}
        center = {mapCenter}
        zoom = {mapZoom}
        
        />

      </div>
      
      <Card className="app_right">
        
        <CardContent className="cardContent">
          <h3> Live Cases by country</h3>
          <Table countries={tableData} />         
          <h3>world wide New Content </h3>
          <LineGraph />

        </CardContent>        
      </Card>
  
    </div>
  );
}

export default App;
