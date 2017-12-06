import React from 'react'
import history from './History'
import {Row, Col, Card, CardTitle} from 'react-materialize'

const Membership = ({membership, gyms, dates}) => {

  let gym = gyms.filter(gym => gym.id === membership.gym_id);
  const imageUrl = gym[0].image

  const returnLink = () => {
    history.push("/membership/" + membership.id)
  }

  return (

    // <Col m={2} s={2}>
    <li style={{'marginRight': '10px'}}>
    		<Card onClick={returnLink} className='blue-grey darken-1' textClassName='white-text' header={<CardTitle image={imageUrl}></CardTitle>}
        title={gym[0].name}>
    		</Card>
    </li>
    // </Col>

  )

}

export default Membership
