import React from 'react'
import SimpleForm from './SimpleForm'
import Membership from './Membership'
import './Search.css';
import 'react-datepicker/dist/react-datepicker.css';
import JacksDatePicker from './JacksDatePicker'
import {Row} from 'react-materialize'
declare var $: any;

const Search = ({modal, createUser, memberships, gyms, search, dates}) => {

  console.log(memberships)
  console.log(dates)
  console.log(search.date)

  return (
    <div className="container">
    <div className="search">
      <h3 id="membershipsh1">Available Memberships</h3>

        <div className="search-bar">
          <div className="search-inputs">

            <div className="when-where">
              <h5>Enter city or address:</h5>
              <SimpleForm where={search.where}/>
              <h5>Select date:</h5>
              <JacksDatePicker date={search.date}/>
              {/* <Input value={search.date} defaultValue="kjdslf" label="When" name='on' type='date' onChange={function(e, value) {}} /> */}
            </div>
          </div>
          </div>
        </div>
      <div>
        <Row>
          { memberships.map((membership, i) => <Membership dates={dates} key={ membership.id } gyms={gyms} membership={ membership } />) }
        </Row>
      </div>
    </div>
  )

}

export default Search
