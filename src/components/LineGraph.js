import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2"
import numeral from "numeral"

const options = {
    legend : {
        display : false,
    },
    elements : {
        point : {
            radius : 0,
        },
    },
    maintainAspectRatio : false,
    tooltips : {
        mode: "index",
        intersect: false,
        callbacks:{
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales:{
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                }
            }
        ],
        yAxes:[
            {
                gridLines:{
                    display : false,
                },
                ticks:{
                    callback : function (value, index, values){
                        return numeral(value).format("0a")
                    },
                },
            },
        ]
    }


}

const casesTypeColor = {
    cases : {
        hex:"#CC1034",
        half_op:"rgba(204, 16, 52, 0.5)"
    },
    recovered:{
        hex:"#7dd71d",
        half_op:"rgba(125, 215, 29, 0.5)",
    },
    deaths:{
        hex:"#fb4443",
        half_op:"rgba(251, 68, 67, 0.5)",
    }
}

const buildChartData  = (data, caseType= 'cases') =>{
    const chartData = []
    let lastDataPoint 
    
    for(let date in data.cases ) {
        if (lastDataPoint){
            const newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }  
        lastDataPoint = data[caseType][date]                                  
    }
    return chartData
}

function LineGraph({ caseType = 'cases'}, ...props ) {
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
    const [data,setData] = useState({})

    useEffect(() =>{
        const fetchData = async() =>{
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json() )
            .then ( data =>{
                let chartData = buildChartData(data, caseType)
                console.log(chartData);
                setData(chartData)
            } )
        }
        fetchData()
               
    },[caseType])
    return (
        <div className={props.className}>
            <h1 > {caseType} </h1>
            {/* data && data.length */}
            {data?.length> 0 &&(
                 <Line 
                 options  = { options }           
                 data = {{
                     datasets : [
                         {  
                             backgroundColor : casesTypeColor[caseType].hex,
                             borderColor:casesTypeColor[caseType].half_op,
                             data: data
                         }]
                 }} 
                 /> 
            )}          
            
        </div>
    )
}

export default LineGraph
