import React from 'react'
import {Button, Row, Input} from 'react-materialize'
import './HomePage.css';
import SimpleForm from '../components/SimpleForm'
import history from './History'
import moment from 'moment';


const Index = ({modal, changeModalState, createUser, updateSearchState}) => {

  // var autocomplete = new google.maps.places.Autocomplete(input);

  const submitSearch = (e) => {
    e.preventDefault()
    console.log(e.target.date.value)
    console.log(e.target.where_input.value)
    let date = e.target.date.value
    if (date === "") {
      date = moment()
    }
    const where = e.target.where_input.value
    updateSearchState(date, where)
    history.push('/search')
  }

  return (
    <div className="home">

      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=ProximaNova"></link>

      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCD_rf23mAaAl7HvGt1U6WEHByQb-WVD3M&libraries=places&callback=initMap"
              async defer></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCD_rf23mAaAl7HvGt1U6WEHByQb-WVD3M&libraries=places"></script>

        <div className="homepage-background-container">
          <div className="homepage-img-container">
            <img alt="" className="background-img" src="https://static1.squarespace.com/static/5995d96dbf629ab9fc226638/t/59c18454e3df28dbafd180ad/1505854552351/"></img>
          </div>
          <div>
            <div className="search-container">
              <div>
                <h1 className="homepage-header" >FLEX</h1>
                <div className="jacks-header">
                  <h5>GYM MEMBERSHIP SHARE</h5>
                </div>
                <div className="jacks-inputs">
                  <form onSubmit={submitSearch}>
                    <Row>
                      <SimpleForm />
                    </Row>
                    <Row>
                      <Input label="When" id="date" name='on' type='date' onChange={function(e, value) {}} />
                    </Row>
                    <Row>
                      <a href="search"><Button className="search-button" waves='light'>Search</Button></a>
                    </Row>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="homepage-about">
          <h4>
            Rent short-term gym memberships.
          </h4>
          <h4>
            Work out wherever you want.
          </h4>
        </div>
    </div>
  )
}


export default Index
