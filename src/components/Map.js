import React from 'react'
import './Map.css'
import { Map as LeafletMap , Marker, Popup, TileLayer } from 'react-leaflet'
import { showDataOnMap } from '../utils/utils'

function Map( { countries, caseTypes, center, zoom} ) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/*  loop throughh and draw the bunch of circles */}
                {showDataOnMap (countries, caseTypes="recovered")}
            </LeafletMap>
        </div>
    ) 
}

export default Map
