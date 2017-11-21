import React from 'react'
import SimpleForm from './SimpleForm'
import Membership from './Membership'
import './Search.css';
import 'react-datepicker/dist/react-datepicker.css';
import JacksDatePicker from './JacksDatePicker'
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
    <div className="search">
      <div>
        <div className="search-bar">
          <div className="search-inputs">
            <div className="when-where">
              <SimpleForm where={search.where}/>
              <JacksDatePicker updateSearchStateDate={updateSearchStateDate} date={search.date}/>
              {/* <Input value={search.date} defaultValue="kjdslf" label="When" name='on' type='date' onChange={function(e, value) {}} /> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Memberships:</h1>
        <div>
          { memberships.map((membership, i) => <Membership dates={dates} key={ membership.id } gyms={gyms} membership={ membership } />) }
        </div>
      </div>
    </div>
  )

}

export default Search
