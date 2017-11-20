import React from 'react'
import history from './History'
import {Col, Card, CardTitle, imageUrl} from 'react-materialize'



const Membership = ({membership, gyms, key, dates}) => {

  console.log(membership.gym_id)
  console.log(gyms)

  let test = gyms.filter(gym => gym.id === membership.gym_id);
  console.log(test[0].name)
  console.log(test[0].image)
  const imageUrl = test[0].image

  const returnLink = () => {
    history.push("/membership/" + membership.id)
  }

// [{}, {}]
// dates = JSON.parse(dates)
// let test2 = dates.filter(date => date.membership_id === membership.id);
// console.log(test2)



  return (
    <Col m={6} s={3}>
    		<Card onClick={returnLink} className='blue-grey darken-1' textClassName='white-text' header={<CardTitle image={imageUrl}></CardTitle>}
        title={test[0].name}  actions={[<a href='/memberships'>This is a link</a>]}>
    		{membership.id}
    		</Card>
    </Col>
  )
}

export default Membership
