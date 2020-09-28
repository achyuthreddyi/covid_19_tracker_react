import React from 'react'
import './InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core'
import { prettyPrintStat } from "../utils/utils"

function InfoBox( {isRed, title, cases, active,  total, ...props} ) {
    return (
        <Card 
        onClick = {props.onClick}
        className={ `infoBox ${active && 'infoBox--selected' } ${isRed && 'infoBox--red' }` }
        >
            <CardContent>
                <Typography className="infoBox__title" color = "textSecondary">
                    { title }
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{prettyPrintStat(cases)}</h2>
                <Typography className="infoBox__total" color = "textSecondary">
                    {prettyPrintStat(total)} Total
                </Typography>              
            </CardContent>
            
        </Card>
    )
}

export default InfoBox
