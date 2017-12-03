import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    console.log(this.props.memberships)
    this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {}
        }
  }

  onMarkerClick = (props, marker, e) => {
    // console.log("click "+JSON.stringify(props))
    console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  membershipHtml = () => {
    console.log('hi')
    return (
      <ul style={{'z-index': '10', 'bottom': '0', 'position': 'absolute'}}>
        {this.props.memberships.map((membership, i) => this.state.selectedPlace.id === membership.gym_id ? <li>{'i like chz'}</li> : <div></div>) }
      </ul>
    )
  }

  render() {

    console.log(this.props.memberships)

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
    <div>
      <Map
        google={window.google}
        initialCenter=
        {jacksInitialCenter}
        style={{"width":"75%", "height":"75%"}}
        zoom={14}
        >

        {!this.props.geocodedGyms ? null : this.props.geocodedGyms.map((gym, i) =>
          <Marker onClick={this.onMarkerClick}
                  position={gym}
                  name={this.props.gyms[i].name}
                  address={this.props.gyms[i].address}
                  image={this.props.gyms[i].image}
                  id={this.props.gyms[i].id}
                />
        )}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
            <div>
              <h5>{this.state.selectedPlace.name}</h5>
              <h5>{this.state.selectedPlace.address}</h5>
              <img width="40%" src= {this.state.selectedPlace.image}></img>

            </div>
        </InfoWindow>
      </Map>
      {console.log(this.state.selectedPlace.id)}
      {this.state.selectedPlace.length === 0  ? <div></div> : this.membershipHtml() }

    </div>
    );
  }
}

export default MapContainer
