import React, {Component} from 'react'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import EnterLocation from './PlacesAutocomplete'
// import PlacesAutocomplete from 'react-places-autocomplete'
// import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

export class MapContainer extends Component {
render() {
    return (
      <Map google={this.props.google} zoom={14}
        initialCenter={{
          lat: 40.014986,
          lng: -105.270546
        }}>


        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                position={{
                  lat: 40.014986,
                  lng: -105.270546
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDv7o5b7hUu-bZhlMlSAjcbYQvMgT08iUQ'
})(MapContainer)
