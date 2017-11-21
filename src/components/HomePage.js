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
              <div className="search-container-opacity">
                <h1 className="homepage-header" >FLEX</h1>
                <div className="jacks-header">
                  {/* <h5>GYM MEMBERSHIP SHARE</h5> */}
                </div>
                <div className="summary">
                  <h6>Rent short-term gym memberships.</h6>
                  <h6>Work out wherever you want.</h6>
                </div>
                <div className="jacks-inputs">
                  <form onSubmit={submitSearch}>
                    <ul>
                      <div className="elementContainer elementContainer-where">
                          <label for="on" >Where</label>
                          <SimpleForm />
                          <label for="on" >When</label>
                          <Input id="date" name='on' type='date' onChange={function(e, value) {}} />
                      </div>
                      <div className="elementContainer">

                      </div>
                      <div className="search-button-container">
                          <a href="search"><Button className="search-button" waves='light'>Search</Button></a>
                      </div>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="homepage-about">
          <p>
          </p>
        </div>
          <div className="container">
            <div className="section">

              <div className="row">
                <div className="col s12 m4">
                  <div className="image-block">
                    <h2 className="center light-blue-text"><i className="material-icons">flash_on</i></h2>
                    <h5 className="center">Rent</h5>
                    <img src="https://static1.squarespace.com/static/5995d96dbf629ab9fc226638/t/59dca061cd0f68a14032d8c2/1507631269928/Screen+Shot+2017-10-04+at+8.35.08+PM.png"></img>
                    <p className="light">Search available short-term memberships for the location and dates you want. Filter by price, amenities, reviews, and more to find the perfect workout space.</p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="image-block">
                    <h2 className="center light-blue-text"><i className="material-icons">group</i></h2>
                    <h5 className="center">List</h5>

                    <p className="light">List an existing gym membership in the marketplace and the dates it's available for others to use.</p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="image-block">
                    <h2 className="center light-blue-text"><i className="material-icons">settings</i></h2>
                    <h5 className="center">Enjoy</h5>

                    <p className="light">Renters get instant access to gyms across the country at the best prices, no long-term contracts required. Listers turn unused memberships into money-makers.</p>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
          </div>
    </div>
  )
}


export default Index
