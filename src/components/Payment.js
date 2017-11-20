import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Table, Nav} from 'react-materialize'
import history from './History'


const Payment = ({match}) => {

  // console.log(history)

 let onToken = (token) => {

    fetch('/charge', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });

  }

   return (
        <section>

           {/* <Nav /> */}

           <div id="user-order">

               <Table>
                    <thead>
                        <tr>
                            <th data-field="name">Orders</th>
                        </tr>
                    </thead>

                   <tbody>

                       {/* map function that goes through what the user wants to order*/}
                        {/* <UserOrder /> */}
                        <h1>Id: {match.params.id}</h1>
                        <h1>Price: $7</h1>

                   </tbody>
                </Table>

           </div>

           <div id="payment">

     <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_HV5svf5kd921ZDOCCswnRS0h"
        />

           </div>

       </section>
    )
}




export default Payment
