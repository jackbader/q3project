import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {

    if (!this.props.geocodedGyms) {
      this.props.gyms.map(gym => {
        geocodeByAddress(gym.address)
        .then(results=> getLatLng(results[0]))
        .then(( data ) => {
          console.log("gym stuff"+data.lat, data.lng)
          this.props.putGymLatLongInState(data)
        })
        .catch(error=>console.error(error))
      })
    } else {

    }


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

const test = () => {
  console.log(this.props.latAndLong)
  return this.props.latAndLong
}

   console.log(this.props.geocodedGyms)

    return (
      <Map
        google={window.google}
        initialCenter=
        {jacksInitialCenter}
        style={{"width":"75%", "height":"75%"}}
        zoom={14}
        >

        {!this.props.geocodedGyms ? null : this.props.geocodedGyms.map(gym =>
          <Marker onClick={this.onMarkerClick}
                  name={'hi'}
                  position={gym}/>
        )}

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
