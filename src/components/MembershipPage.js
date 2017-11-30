import React from 'react'
import Membership from './Membership'
import history from './History'
import {Table, Button} from 'react-materialize'

const MembershipPage = ({match, memberships, gyms, deleteMembership, updateCheckoutDateState}) => {

  console.log(memberships)
  let membership = memberships.filter(membership => membership.id == match.params.id);
  console.log(membership)
  let user_id = membership[0].user_id

  console.log(gyms)
  let gym = gyms.filter(gym => gym.id === membership[0].gym_id);
  console.log(gym)
  const imageUrl = gym[0].image

  let loggedInUser
  let loggedInUser_id
  if (typeof localStorage.user === "undefined") {
    loggedInUser = '1000'
    loggedInUser_id = 1000
  } else {
    loggedInUser = JSON.parse(localStorage.user)
    loggedInUser_id = loggedInUser.id
  }


  const preDeleteMemberShip = (e) => {
    history.push('/search')
    deleteMembership(membership[0])
  }

  const bookNow = (e) => {
    history.push(`/checkout/${membership[0].id}`)
    updateCheckoutDateState('clear')
    console.log('person wants to book it')
  }

  return (
    <div className="membershippage">
    <div className="membershipimg">
      <img src={imageUrl} ></img>
      {/* <Membership membership={membership[0]} gyms={gyms}/> */}
<Table>
  <thead>
  <tr>
    <th data-field="id">Address</th>
    <th data-field="price">Price</th>
    <th data-field="price">Amenities</th>
  </tr>
  <tr>
  <td><a target="_blank" href="https://www.google.com/maps/place/ONE+Boulder+Fitness/@40.0154005,-105.2838512,15z/data=!4m5!3m4!1s0x876bec2612e40e0d:0x7803605d00be30ce!8m2!3d40.0167628!4d-105.2790516">1800 Broadway Suite 190, Boulder, CO 80302</a></td>
  <td>$7/day </td>
  <i className="material-icons">hot_tub</i>
    <i className="material-icons">fitness_center</i>
    <i className="material-icons">pool</i>
    </tr>
</thead>
</Table>
    <div className="buttonsmembership">
      {(loggedInUser_id === user_id) ? <Button className="search-button" waves='light' onClick={preDeleteMemberShip} >Delete </Button> : console.log('no match')}
      <Button className="rightbutton" onClick={bookNow} >Book now</Button>
    </div>
    </div>
  </div>
  )
}

export default MembershipPage
