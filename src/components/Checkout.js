import React from 'react'
import Payment from './Payment'
import './Checkout.css';

const Checkout = ({match, history, dates, memberships}) =>{

  console.log(match.params.id)

  return(

    <div className="checkout-container">

      <h1 className="checkout-h1">Checkout</h1>

      <div className="checkout-body">
        <Payment dates={dates} memberships={memberships} match={match} history={history}/>
      </div>
    </div>
  )
}

export default Checkout
