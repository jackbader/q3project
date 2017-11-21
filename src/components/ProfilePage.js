import React from 'react'

const ProfilePage = ({match}) => {
  return (
    <div>
      <h1>Profile Page for: {match.params.id}</h1>
    </div>
  )
}

export default ProfilePage
