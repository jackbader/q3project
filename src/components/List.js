import React from 'react'
import {Button, Row, Input} from 'react-materialize'
import './List.css';
import DatePicker from './DatePicker'

const List = ({modal}) => {
  return (
<div>

  <div className="genaslistpage">
<div className="center">

    <h5>LIST YOUR MEMBERSHIP RENTAL HERE</h5>
  </div>
  <form>
    <Row>
      <div className="genas-input">
      	<Input className="selectgym" type='select' label="Select your gym">
      		<option value='1'>Colorado Athletic Club</option>
      		<option value='2'>24 Hour Fitness</option>
      		<option value='3'>Boulder One Fitness</option>
      	</Input>
      </div>
    </Row>
<div>
  <p className="center">Select the days you want to list</p>
  <DatePicker />

</div>
<div>
		<Button id="submitlist" waves='light' node='a' href='http://www.google.com'> Submit </Button>
</div>
</form>
</div>
</div>
)
}

export default List
