import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Membership from './Membership'
import {Row, Col, Card, CardTitle, Nav} from 'react-materialize'





export class MapContainer extends Component {


  constructor(props) {
    super(props)
    this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {}
        }
  }

  onMarkerClick = (props, marker, e) => {
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
    return (
      <ul style={{'z-index': '10', 'marginTop': '600px', 'position': 'absolute', 'listStyleType': 'none', 'display': 'inline-flex'}}>
        {this.props.memberships.map((membership, i) => this.state.selectedPlace.id === membership.gym_id ? <Membership dates={this.props.dates} key={ membership.id } gyms={this.props.gyms} membership={ membership } /> : <div></div>) }
      </ul>
    )
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
      return (
        <div></div>
      )
    }
    let latitude
    let longitude
    let coordinants = this.props.latAndLong
    let newArr = []
    for(var i in coordinants) {
      newArr.push(coordinants[i])
    }

    let jacksInitialCenter = {
      lat: newArr[0],
      lng: newArr[1]
    }

const test = () => {
  return this.props.latAndLong
}

    return (

    <div>

      <Map
        google={window.google}
        initialCenter=
        {jacksInitialCenter}
        style={{"width":"800px", "height":"500px"}}
        zoom={12}
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
      {this.state.selectedPlace.length === 0  ? <div></div> : this.membershipHtml() }

    </div>
    );
  }
}

export default MapContainer
