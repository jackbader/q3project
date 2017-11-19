import React from 'react'
import {Button, Row, Input} from 'react-materialize'
import './List.css';
import DatePicker from './DatePicker'

const List = ({sendSelectedDays, sendGym, sendNewMembership}) => {
  let gym;
  const getValue = (e) => {
    console.log(e.target.value)
    sendGym(e.target.value)
  }

  return (
<div>

  <div className="genaslistpage">
<div className="center">

    <h5>LIST YOUR MEMBERSHIP RENTAL HERE</h5>
  </div>
  <form>
    <Row>
      <div className="genas-input">
      	<Input onChange={getValue} className="selectgym" type='select' label="Select your gym">
      		<option>Colorado Athletic Club</option>
      		<option>24 Hour Fitness</option>
      		<option>Boulder One Fitness</option>
      	</Input>
      </div>
    </Row>
<div>
  <p className="center">Select the days you want to list</p>
  <DatePicker
    sendSelectedDays={sendSelectedDays}
  />

</div>
<div>
		<Button onClick={sendNewMembership} id="submitlist" waves='light' node='a' > Submit </Button>
</div>
</form>
</div>
</div>
)
}

export default List
