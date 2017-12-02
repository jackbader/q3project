import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
// import EnterLocation from './PlacesAutocomplete'
// import PlacesAutocomplete from 'react-places-autocomplete'
// import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

export class MapContainer extends Component {
render() {

  let latLong = []
  let coordinants = this.props.latAndLong
  console.log(coordinants)

  for(var i in coordinants) {
    latLong = Object.values(coordinants)
  }

  let latitude
  let longitude

  for(var a=0; a<2; a++) {
    latitude=latLong[0]
    longitude=latLong[1]
  }
  console.log(latLong)
  console.log("latitude "+latitude)
  console.log("longitude "+longitude)

  let initialCenter1= {
    lat: latitude,
    lng: longitude
  }

  // map.setCenter(new google.maps.LatLng(-34, 151));

  // set(key:string, value:*)
// console.log("{}{}{}{}{}{}{}{"+this.state)
    return (
      <Map
        google={window.google} zoom={14}
        style={{"width":"75%", "height":"75%"}}
        initialCenter={{
          // initialCenter1
          lat: 40.014984,
          lng: -105.270546
          // initialCenter1
          // lat: latitude,
          // lng: longitude
          // lat: this.latitude,
          // lng: this.longitude
          // lat: Object.values(coordinants.lat)
          // coordinants
        }}>


        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                position={{
                  lat: latLong[0],
                  lng: latLong[1]
                  // lat: latitude,
                  // lng: longitude
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
