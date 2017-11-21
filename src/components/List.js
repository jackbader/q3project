import React, { Component } from 'react'
import {Row, Input, Toast} from 'react-materialize'
import './List.css';
import DatePicker from './DatePicker'
declare var $: any;

const List = ({isLoggedIn, sendSelectedDays, sendGym, sendNewMembership, gyms, createNewMembership, selectedDays, changeModalState}) => {

  console.log('list page re-rendered')

  let string = ""
  if (typeof selectedDays === 'undefined') {
      console.log('selected days is undefined');

      string = "You must select a day!"
  }
  if (isLoggedIn === false) {
    console.log('user is not logged in')
    string = ""
  }



  // else {
  //   console.log('else setting to nothing')
  //   string = ""
  // }

  const Gym = ({gym}) => {
    return (
      <option value={gym.id}>
        {gym.name}
      </option>
    )
  }



  const submitForm = (e) => {
    e.preventDefault()

    if (typeof localStorage.user === 'undefined') {
      console.log('user is not logged in!')
      //open up signup modals
      changeModalState("Welcome to Flex")
      $('#signupmodal').modal('open')
    } else {

      console.log(selectedDays)

      if (typeof selectedDays === 'undefined') {
        console.log('hi')

      } else {
        let gym_id = e.target.gym.value

        let user = JSON.parse(localStorage.user)
        let user_id = user.id

        let object = {
          gym_id: parseInt(gym_id, 10),
          user_id: user_id
        }

        createNewMembership(object)
      }
    }


  }

  return (
    <div>
      {/* <Toast toast="here you go!">

      </Toast> */}
      <div className="genaslistpage">
          <div>
            <div>
              {/* <img alt className="background-img" src="https://static1.squarespace.com/static/5995d96dbf629ab9fc226638/t/59d29e3912abd95b114165e0/1506977910596/Equinox.jpg"></img> */}
              <h3 className="floatoverbackground"> List Your Gym</h3>
              <h3 className="floatoverbackgroundlower">Membership</h3>
            </div>
          </div>
      </div>
      <form onSubmit={submitForm} >
      <div className="row">
        {/* <div className="col s4 push s4"> */}
          <div className="genas-input">
            <Input id="gym" className="selectgym" type='select' label="Select your gym">
              { gyms.map((gym, i) => <Gym key={ i } gym={ gym } />) }
            </Input>
          </div>
        <div className="row">
          <div className="center-me">
            <p className="almost-centered">Select the days you want to list</p>
              <DatePicker id="datePicker" sendSelectedDays={sendSelectedDays}/>
            <Toast type="submit" value="Send" className="btn btn-primary" toast={string}></Toast>
            <div className='center-align'>
              <input type="submit" value="Send" className="btn btn-primary"></input>
            </div>
        </div>
      </div>
    </form>
  </div>
  )
}

export default List
