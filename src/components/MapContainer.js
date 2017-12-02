import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'

// import EnterLocation from './PlacesAutocomplete'
// import PlacesAutocomplete from 'react-places-autocomplete'
// import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    if (!this.props.latAndLong) {
      console.log('null')
      return (
        <div></div>
      )
    }
    let latitude
    let longitude
    console.log(this.props.latAndLong)
    let coordinants = this.props.latAndLong
    let newArr = []
    for(var i in coordinants) {
      console.log(coordinants[i])
      newArr.push(coordinants[i])
    }
    console.log(newArr)

    let jacksInitialCenter = {
      lat: newArr[0],
      lng: newArr[1]
    }
  // if (!this.props.latAndLong) {
  //   console.log('nullß')
  // } else {
  //   console.log(this.props.latAndLong.lat)
  //   let {lat, lng} = this.props.latAndLong
  //   jacksInitialCenter.lat = this.props.latAndLong.lat
  //   jacksInitialCenter.lng = this.props.latAndLong.lng
  // }
  // console.log(jacksInitialCenter)

  // let latLong = []
  // let coordinants = this.props.latAndLong
  // console.log(coordinants)
  //
  // for(var i in coordinants) {
  //   latLong = Object.values(coordinants)
  // }
  //
  // let latitude
  // let longitude
  //
  // for(var a=0; a<2; a++) {
  //   latitude=latLong[0]
  //   longitude=latLong[1]
  // }
  // console.log(latLong)
  // console.log("latitude "+latitude)
  // console.log("longitude "+longitude)

// let initialCenter1 = {
//   lat: latitude,
//   lng: longitude
// }
// console.log(initialCenter1)
// console.log(this.props.latAndLong)
// const {lat, lng} = this.props.latAndLong;

const test = () => {
  console.log(this.props.latAndLong)
  return this.props.latAndLong
}

    return (
      <Map
        google={window.google}
        initialCenter=
        {jacksInitialCenter}
        style={{"width":"75%", "height":"75%"}}
        zoom={14}
        >


        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                position={this.props.latAndLong}/>

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
