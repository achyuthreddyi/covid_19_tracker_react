import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  // const [state, setstate] = useState(initialState)
  const [countries, setCountries] = useState([])

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
        setCountries(countries)
      })
    }
    getCountriesData()
  }, [countries])


  return (
    // Bem naming convention !!!
    <div className="app">
      <div className="app__header">
        <h1>Covid 19 tracker !!!!</h1>
          <FormControl className="app__dropdown">
            <Select 
              variant = "outlined"
              value="abc"
            >
              {/* loop through all the countries  */}

              {
                countries.map(country =>(
                  <MenuItem value={'country.value'}>{country.name}</MenuItem>
                ))
              }

              {/* <MenuItem value="worldwide">WorldWide</MenuItem>
              <MenuItem value="worldwide">option2</MenuItem>
              <MenuItem value="worldwide">option 4 </MenuItem>
              <MenuItem value="worldwide">Wofdfsd</MenuItem> */}

            </Select>

        </FormControl>
        
      </div>     
      

       

       {/*Header  */}
       {/* Title + select input dropdown */}

       {/* infoboxes */}
       {/* infoboxes */}
       {/* infoboxes */}

       {/* table  */}
       {/*  Graph */}

       {/* Map  */}



    </div>
  );
}

export default App;
