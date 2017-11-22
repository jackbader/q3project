import React from 'react'
import './ProfilePage.css';
import Membership from './Membership'

const ProfilePage = ({match, users, findUserInfo, memberships, gyms, dates}) => {
  // console.log(users)
  // console.log(match)
  console.log("this is memberships/user_id "+JSON.stringify(memberships[0].user_id))
  console.log("this is memberships gym_id "+JSON.stringify(memberships[0].gym_id))
  console.log("this is gyms name "+JSON.stringify(gyms[0].name))
  // console.log("this is gyms "+JSON.stringify(gyms))
  let userId = users[0].id;
  let membershipsUserId = memberships[0].user_id;
  let membershipsGymId = memberships[0].gym_id;
  let gymId = gyms[0].id;
  console.log('this is gymId '+parseInt(gymId))
  let gymsName = gyms[0].name;


  let membershipsTheyMade = memberships.filter(membership => membership.user_id == match.params.id)
  // let membershipsGymId = membershipsTheyMade.map(membership => <Membership membership={membership} />)
  // let membershipsGymsName = membershipsTheyMade.filter(membership => membership.gym_id == membershipsTheyMade)
  // console.log(membershipsGymsName)

  console.log(membershipsTheyMade)



  console.log(userId, membershipsUserId, membershipsGymId, gymId, gymsName)

  if(userId===membershipsUserId) {
    console.log(gymsName[gymId])
  }

  // let gym = gyms.filter(gym => gym.id === membership.gym_id);
  let user = users.filter(user => user.id == match.params.id)
  let firstName = user[0].first_name
  let lastName = user[0].last_name
  let email = user[0].email
  let stars = user[0].stars

  console.log(firstName, lastName, email, stars)
  console.log(match.params.id)

  return (
    <div className="profile-page">
      <h1>{firstName}'s Memberships:</h1>
      <div className="ul-container">
        <ul>
          { membershipsTheyMade.map((membership, i) => <Membership dates={dates} key={ membership.id } gyms={gyms} membership={ membership } />) }
        </ul>
      </div>
      <h1>Info:</h1>
      <p>Name: {firstName + ' ' + lastName}</p>
      <p>Stars: {stars}</p>
    </div>
  )
}

export default ProfilePage
