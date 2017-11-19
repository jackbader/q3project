import React from 'react'
import history from './History'
import {Col, Card} from 'react-materialize'


const Membership = ({membership, gyms}) => {

  console.log(membership.gym_id)
  console.log(gyms)

  let test = gyms.filter(gym => gym.id === membership.gym_id);
  console.log(test[0].name)

  const returnLink = () => {
    history.push("/membership/" + membership.id)
  }

  return (
    <Col m={6} s={3}>
    		<Card onClick={returnLink} className='blue-grey darken-1' textClassName='white-text' title={test[0].name}  actions={[<a href='/memberships'>This is a link</a>]}>
    		{membership.id}
    		</Card>
    </Col>
  )
}

export default Membership
