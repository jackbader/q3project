import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import EnterLocation from './PlacesAutocomplete'
// import PlacesAutocomplete from 'react-places-autocomplete'
// import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

export class MapContainer extends Component {

render() {
  let latLong = []
  // console.log(this.props.latAndLong)
  let coordinants = this.props.latAndLong
  for(var i in coordinants) {
    latLong = Object.values(coordinants)
  }
  // console.log(latLong)
  let latitude
  let longitude
  for(var a=0; a<2; a++) {
    latitude=latLong[0]
    longitude=latLong[1]
  }
  console.log(latLong[0])
  console.log(latLong[1])
  console.log(latitude)
  console.log(longitude)
  console.log("this is special " + latitude, longitude)

  const coord = {
    lati : latitude,
    longi : longitude
  }
  console.log("&&&&&&&&&" + JSON.stringify(coord))

    return (
      <Map google={window.google} zoom={14}
        style={{"width":"75%", "height":"75%"}}
        initialCenter={{
          lat: 40.014986,
          lng: -105.270546
        }}>


        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                position={{
                  lat: coord.lati,
                  lng: coord.longi
                }}/>

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default MapContainer
