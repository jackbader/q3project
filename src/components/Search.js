import React from 'react'
import {Input} from 'react-materialize'
import SimpleForm from './SimpleForm'
import './Search.css';

const Search = ({modal, createUser}) => {

  return (
    <div className="search">
      <div className="search-bar">
        <div className="search-inputs">
          <div className="when-where">
            <SimpleForm />
            <Input label="When" name='on' type='date' onChange={function(e, value) {}} />
          </div>
        </div>
      </div>
    </div>

  )

}

export default Search
