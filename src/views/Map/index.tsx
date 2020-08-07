import React from 'react'
import axios from 'axios'

import { Map, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";


import './styles.css'

interface Props {

}

interface State {
    data: any,
    current: any
}

class MapView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            data: null,
            current: null
        }
    }
    componentDidMount() {
        this.getGeoJSON()
    }

    async getGeoJSON() {

        const response = await axios({
            url: "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson",
            method: "GET"
        })

        const { features } = response.data

        const data = features.map((state: any) => {
            state.properties.value = Math.random() * 1000

            return state
        });

        this.setState({
            data: features
        })
    }

    findData(e: any) {

        if (this.state.current) {

            this.setState({
                ...this.state,
                current: null
            })

        } else {

            const { lat, lng } = e.latlng
            const { x, y } = e.la

            this.setState({
                ...this.state,
                current: {
                
                coords:[
                    lat,
                    lng
                ]}
            })
        }


    }


    render() {


        const positon = {
            lat: -14.4743722,
            lng: -53.0271868,
        }

        return (
            <main className="map-view">
                <Map center={positon} zoom={5} style={{ width: "100%", height: "100%" }} onclick={event => console.log(event)} >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        id="mapbox/light-v9"
                    />

                    {this.state.data &&
                        <GeoJSON
                            data={this.state.data}
                            style={function (feature: any) {

                                const { value } = feature.properties
                                var color

                                if (value > 900) {
                                    color = '#800026'
                                } else if (value > 800) {
                                    color = '#BD0026'

                                } else if (value > 700) {
                                    color = '#E31A1C'

                                } else if (value > 600) {
                                    color = '#FC4E2A'

                                } else if (value > 500) {
                                    color = '#FD8D3C'

                                } else if (value > 400) {
                                    color = '#FEB24C'

                                } else {

                                    color = '#FED976'
                                }

                                return {
                                    fillColor: color,
                                    weight: 2,
                                    opacity: 1,
                                    color: 'white',
                                    dashArray: '3',
                                    fillOpacity: 0.7
                                }
                            }}

                        />}

                    {this.state.current &&

                        <Popup position={this.state.current.coords}>
                           Minas Gerais <br />
                           23.231 casos
                        </Popup>

                    }
                </Map>
            </main>
        )
    }
}

export default MapView