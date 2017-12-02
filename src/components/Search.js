import React from 'react'
import SimpleForm from './SimpleForm'
import Membership from './Membership'
import './Search.css';
import 'react-datepicker/dist/react-datepicker.css';
import JacksDatePicker from './JacksDatePicker'
import MapContainer from './MapContainer'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'



import {Row} from 'react-materialize'

import moment from 'moment';

declare var $: any;

const Search = ({state, modal, createUser, memberships, gyms, search, dates, updateSearchStateDate, putLatLongInState}) => {
  // console.log("!!!!!!! " +(state.latAndLong))
  dates = JSON.parse(dates)
  let membershipDate;
  let matchedIds = []

  console.log(search.where)


  if (typeof search.date !== 'undefined') {

    //if u set a new date on the page

    for (let i = 0; i<dates.length; i++) {
      membershipDate = dates[i].date_available

      const fullMembershipDate = moment.utc(membershipDate).format('YYYY-MM-DD')
      const fullNewSearchDate = moment(search.date).format('YYYY-MM-DD');

      // console.log(fullMembershipDate, fullNewSearchDate, fullMembershipDate === fullNewSearchDate);

      if (fullMembershipDate === fullNewSearchDate) {
        console.log('membership date matches search date')
        matchedIds.push(dates[i].membership_id)
      }
    }
    //use serach.date to compare to membership dates

  } else {
    // todays date if none selected use todays date
    let todaysDate = moment()

    for (let i = 0; i<dates.length; i++) {

      membershipDate = dates[i].date_available

      const fullMembershipDate = moment.utc(membershipDate).format('YYYY-MM-DD')
      const fullNewSearchDate = moment(todaysDate).format('YYYY-MM-DD');

      if (fullMembershipDate === fullNewSearchDate) {
        matchedIds.push(dates[i].membership_id)
      }
    }

  }

  memberships = memberships.filter((membership) => matchedIds.includes(parseInt(membership.id)))

  const where = search.where

  // let latLongObject
  console.log("this is state "+ JSON.stringify(state.latAndLong))

  if(!state.latAndLong) {
    geocodeByAddress(where)
    .then(results=> getLatLng(results[0]))
    .then(( data ) => {
      console.log("*****"+data.lat, data.lng)
      putLatLongInState(data)
    })
    .catch(error=>console.error(error))
  }
console.log(state)

  return (

    <div className="container">
    <div className="search">
      <h3 id="membershipsh1">Available Memberships</h3>
        <div className="search-bar">
          <div className="search-inputs">

            <div className="where">
              <div className="row">
              <div className="col s12 m4">
                <h5>Enter City or Address:</h5>
                <SimpleForm where={search.where}/>
              </div>
            <div className="col s12 m8">
              <div className="when">
                <h5>Select date:</h5>
                <JacksDatePicker updateSearchStateDate={updateSearchStateDate} date={search.date}/>
              </div>
            </div>
            </div>
          </div>
          </div>
        </div>

      {/* <div className="mappedmembers">
        <Row>
          { memberships.map((membership, i) => <Membership dates={dates} key={ membership.id } gyms={gyms} membership={ membership } />) }
        </Row>
      </div> */}
      <div className="map-container-class">
        <MapContainer latAndLong={state.latAndLong} />
      </div>
    </div>
    </div>
  )

}

export default Search
