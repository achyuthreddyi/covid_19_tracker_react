import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import './App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map'
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import { sortData } from './utils/utils';
// import {sortData} from './utils/utils'

function App() {
  // const [state, setstate] = useState(initialState)
  const [countries, setCountries] = useState([])
  const [country, setCountry ] = useState('worldwide')
  const [tableData, setTableData ] = useState([])
  const [countryInfo, setCountryInfo] = useState({})

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
        <InfoBox title ="Corona cases" cases = {countryInfo.todayCases} total = {countryInfo.cases}/>
        <InfoBox title ="Recovered" cases = { countryInfo.todayRecovered} total = {countryInfo.recovered}/> 
        <InfoBox title ="deaths" cases = { countryInfo.todayDeaths} total = {countryInfo.deaths}/> 
        </div>
        {/* Map  */}
        <Map/>

      </div>
      
      <Card className="app_right">
        <CardContent>
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
