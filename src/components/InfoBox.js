import React from 'react'
import './InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core'
import { prettyPrintStat } from "../utils/utils"

function InfoBox( {title, cases, total, ...props} ) {
    return (
        <Card 
        onClick = {props.onClick}
        className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color = "textSecondary">
                    { title }
                </Typography>
                <h2 className="infoBox__cases">{prettyPrintStat(cases)}</h2>
                <Typography className="infoBox__total" color = "textSecondary">
                    {prettyPrintStat(total)} Total
                </Typography>
                

                {/* Title */}
                {/* Number of cases */}
                {/* Total  */}
            </CardContent>
            
        </Card>
    )
}

export default InfoBox
