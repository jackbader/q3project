import React from 'react'
import SimpleForm from './SimpleForm'
import Membership from './Membership'
import './Search.css';
import 'react-datepicker/dist/react-datepicker.css';
import JacksDatePicker from './JacksDatePicker'
declare var $: any;

const Search = ({modal, createUser, memberships, gyms, search, dates}) => {

  console.log(memberships)
  console.log(dates)
  console.log(search.date)

  return (
    <div className="search">
      <div>
        <div className="search-bar">
          <div className="search-inputs">
            <div className="when-where">
              <SimpleForm where={search.where}/>
              <JacksDatePicker date={search.date}/>
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
