import React from 'react'
import Membership from './Membership'
import history from './History'
import './MembershipPage.css';

const MembershipPage = ({match, memberships, gyms, deleteMembership}) => {

  console.log(memberships)
  let membership = memberships.filter(membership => membership.id == match.params.id);
  console.log(membership)
  let user_id = membership[0].user_id

  console.log(gyms)
  let gym = gyms.filter(gym => gym.id === membership[0].gym_id);
  console.log(gym)
  const imageUrl = gym[0].image

  let loggedInUser = JSON.parse(localStorage.user)
  let loggedInUser_id = loggedInUser.id

  const preDeleteMemberShip = (e) => {
    history.push('/search')
    deleteMembership(membership[0])
  }

  const bookNow = (e) => {
    history.push(`/checkout/${membership[0].id}`)
    console.log('person wants to book it')
  }

  return (
    <div className="membershippage">
      <img src={imageUrl} ></img>
      {/* <Membership membership={membership[0]} gyms={gyms}/> */}
      {(loggedInUser_id === user_id) ? <button onClick={preDeleteMemberShip} >Delete</button> : console.log('no match')}
      <button onClick={bookNow} >Book now</button>
    </div>
  )
}

export default MembershipPage
