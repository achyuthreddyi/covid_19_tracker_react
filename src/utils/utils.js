import { circle } from "leaflet"

import React from "react"
import numeral from "numeral"

import { Circle, Popup} from "react-leaflet"

const casesTypeColors = {
    cases :{
        hex:"#CC1034",
        rgb:"rgb(204, 16, 52)",
        half_op:"rgba(204, 16, 52, 0.5)",
        multiplier:800,

    },
    recovered :{
        hex:"#7dd71d",
        rgb:"rgb(125, 215, 29)",
        half_op:"rgba(125, 215, 29, 0.5)",
        multiplier:800,
    },
    deaths :{
        hex:"#fb4443",
        rgb:"rgb(251, 68, 67)",
        half_op:"rgba(251, 68, 67, 0.5)",
        multiplier:800,
    }
}


export const sortData = (data) =>{
    const sortedData = [...data]
    return  sortedData.sort((a,b) => (b.cases - a.cases ))   
   
}

export const prettyPrintStat = (stat) => (
    stat ?`+${numeral(stat).format("0.0a")}`:``

)

export const showDataOnMap = (data, caseTypes = 'cases') =>(
    data.map(country =>(
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[caseTypes].hex}
        fillColor={casesTypeColors[caseTypes].hex}
        radius = {
            Math.sqrt(country[caseTypes]) * casesTypeColors[caseTypes].multiplier
        }        
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag"
                    style= {{ backgroundImage:`url(${country.countryInfo.flag})`}}    />            
                    <div className="info-name"> {country.country}</div>
                    <div className="info-cases">Cases:{numeral(country.cases).format("0.0")} </div>
                    <div className="info-recovered">recovered: {numeral(country.recovered).format("0.0")} </div>
                    <div className="info-deaths"> deaths: {numeral(country.deaths).format("0.0")}</div>                    
                </div>
            </Popup>
        </Circle>

    ))
)