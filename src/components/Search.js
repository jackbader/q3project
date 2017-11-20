import React from 'react'
import SimpleForm from './SimpleForm'
import Membership from './Membership'
import './Search.css';
import 'react-datepicker/dist/react-datepicker.css';
import JacksDatePicker from './JacksDatePicker'
import moment from 'moment';
declare var $: any;

const Search = ({modal, createUser, memberships, gyms, search, dates, updateSearchStateDate}) => {

  // console.log(memberships)
  dates = JSON.parse(dates)
  // console.log(dates)
  // console.log(moment(dates[0].date_available))
  // console.log(search.date)

  let membershipDate;
  let matchedIds = []

  if (typeof search.date !== 'undefined') {
    console.log('hi')
    for (let i = 0; i<dates.length; i++) {
      membershipDate = dates[i].date_available
      let newMembershipDate = moment(membershipDate).year() + "-" + (moment(membershipDate).month() + 1) + "-" + moment(membershipDate).date()
      let newSearchDate = moment(search.date).year() + '-' + (moment(search.date).month() + 1) + '-' + moment(search.date).date()
      console.log(newSearchDate)

      if (moment(newMembershipDate).diff(moment(newSearchDate)) === 0) {
        matchedIds.push(dates[i].membership_id)
      }
    }
    //use serach.date to compare to membership dates

  } else {
    //use todays date to compare to memberhsip dates
    let todaysDate = moment()

    for (let i = 0; i<dates.length; i++) {

      membershipDate = dates[i].date_available

      let newMembershipDate = moment(membershipDate).year() + "-" + (moment(membershipDate).month() + 1) + "-" + moment(membershipDate).date()
      let newTodaysDate = moment(todaysDate).year() + "-" + (moment(todaysDate).month() + 1) + "-" + moment(todaysDate).date()

      if (moment(newMembershipDate).diff(moment(newTodaysDate)) === 0) {
        matchedIds.push(dates[i].membership_id)
      }
    }

  }

  console.log('yo')

  console.log(matchedIds)
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
