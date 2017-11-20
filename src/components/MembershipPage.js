import React from 'react'
import Membership from './Membership'
import history from './History'
import './MembershipPage.css';

const MembershipPage = ({match, memberships, gyms, deleteMembership}) => {

  console.log(memberships)
  let membership = memberships.filter(membership => membership.id == match.params.id);
  console.log(membership)
  let user_id = membership[0].user_id

  let loggedInUser = JSON.parse(localStorage.user)
  let loggedInUser_id = loggedInUser.id

  const preDeleteMemberShip = (e) => {
    history.push('/search')
    deleteMembership(membership[0])
  }

  return (
    <div className="membershippage">
      {/* <Membership membership={membership[0]} gyms={gyms}/> */}
      {(loggedInUser_id === user_id) ? <button onClick={preDeleteMemberShip} >Delete</button> : console.log('no match')}

    </div>
  )
}

export default MembershipPage
