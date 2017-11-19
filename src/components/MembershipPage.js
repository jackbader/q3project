import React from 'react'
import Membership from './Membership'
import history from './History'

const MembershipPage = ({match, memberships, gyms, deleteMembership}) => {

  console.log(memberships)

  let membership = memberships.filter(membership => membership.id == match.params.id);
  console.log(membership)
  let gym_id = membership[0].gym_id

  let gym = gyms.filter(gym => gym.id == gym_id);
  gym = gym[0]

  let user_id = membership[0].user_id

  let loggedInUser = JSON.parse(localStorage.user)
  let loggedInUser_id = loggedInUser.id

  if (loggedInUser_id === user_id) {
    console.log('this matches')
  }

  const boolean = (loggedInUser_id === user_id)

  const preDeleteMemberShip = (e) => {
    history.push('/search')
    deleteMembership(membership[0])
  }

  return (
    <div>
      <h1>Membership id: {match.params.id}</h1>
      <Membership membership={membership[0]} gyms={gyms}/>
      {(loggedInUser_id === user_id) ? <button onClick={preDeleteMemberShip} >Delete</button> : console.log('no match')}

    </div>
  )
}

export default MembershipPage
