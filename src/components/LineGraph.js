import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2"

function LineGraph() {
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
    const [data,setData] = useState({})

    useEffect(() =>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json() )
        .then ( data =>{
            setData(data)
            console.log('data in line graph',data);
        } )
        .then( _ => console.log('data in the linegraph',data))
    })
    return (
        <div>
            <h1> I am a graph</h1>
            {/* <Line 
                data
                options
            />           */}
            
        </div>
    )
}

export default LineGraph
