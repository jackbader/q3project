import React from 'react'
import SimpleForm from './SimpleForm'
import Membership from './Membership'
import './Search.css';
import 'react-datepicker/dist/react-datepicker.css';
import JacksDatePicker from './JacksDatePicker'
import MapContainer from './MapContainer'

import {Row} from 'react-materialize'

import moment from 'moment';

declare var $: any;

const Search = ({modal, createUser, memberships, gyms, search, dates, updateSearchStateDate}) => {
  dates = JSON.parse(dates)

  let membershipDate;
  let matchedIds = []

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

  // console.log(matchedIds)
  // console.log(membership.id)
  memberships = memberships.filter((membership) => matchedIds.includes(parseInt(membership.id)))
  console.log(memberships)


  return (

    <div className="container">
      {/* <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDv7o5b7hUu-bZhlMlSAjcbYQvMgT08iUQ&libraries=places"></script> */}
       <MapContainer />
    {/* <div className="search">
      <h3 id="membershipsh1">Available Memberships</h3>

         <Container />

        <div className="search-bar">
          <div className="search-inputs">

            <div className="where">
              <div className="row">
              <div className="col s12 m4">
                <h5>Enter City or Address:</h5>
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

      <div className="mappedmembers">
        <Row>
          { memberships.map((membership, i) => <Membership dates={dates} key={ membership.id } gyms={gyms} membership={ membership } />) }
        </Row>
      </div>
    </div> */}
    </div>
  )

}

export default Search

{/* <SimpleForm where={search.where}/> */}


{/* <iframe className="Map" style={{width:600, height:450, frameborder:0, border:0}}
  src="https://www.google.com/maps/embed/v1/place?q=Boulder%20CO&key=AIzaSyDv7o5b7hUu-bZhlMlSAjcbYQvMgT08iUQ" allowFullScreen></iframe> */}
