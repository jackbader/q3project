import React from 'react'
import {Button, Row, Input} from 'react-materialize'
import './List.css';
import DatePicker from './DatePicker'

const List = ({sendSelectedDays, sendGym, sendNewMembership, gyms, createNewMembership}) => {

  console.log('asdfasdfasdf '+JSON.stringify(gyms))

  const Gym = ({gym}) => {
    return (
      <option value={gym.id}>
        {gym.name}
      </option>
    )
  }

  const submitForm = (e) => {
    e.preventDefault()
    let gym_id = e.target.gym.value

    let user = JSON.parse(localStorage.user)
    let user_id = user.id

    let object = {
      gym_id: parseInt(gym_id),
      user_id: user_id
    }

    createNewMembership(object)
  }

  return (
    <div>
      <div className="genaslistpage">
        <div className="center">
          <h5>LIST YOUR MEMBERSHIP RENTAL HERE</h5>
        </div>
        <form onSubmit={submitForm} >
          <Row>
            <div className="genas-input">
            	<Input id="gym" className="selectgym" type='select' label="Select your gym">
                { gyms.map((gym, i) => <Gym key={ i } gym={ gym } />) }
            	</Input>
            </div>
          </Row>
          <div>
            <p className="center">Select the days you want to list</p>
            <DatePicker id="datePicker" sendSelectedDays={sendSelectedDays}/>
          </div>
          <div>
      		   <input type="submit" value="Send" className="btn btn-primary"></input>
          </div>
        </form>
      </div>
    </div>
  )
}

export default List
