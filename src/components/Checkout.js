import React from 'react'
import Payment from './Payment'

const Checkout = ({match, history}) =>{

  console.log(match.params.id)

  return(

    <div>

      <Payment match={match} history={history}/>

    </div>
  )
}

export default Checkout
