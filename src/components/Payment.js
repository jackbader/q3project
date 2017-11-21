import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Table, Nav, Input} from 'react-materialize'
import history from './History'
import moment from 'moment';


const Payment = ({match, dates, memberships}) => {

  // console.log(history)

  //find membership
  let membership = memberships.filter((membership) => membership.id == match.params.id)

  //find dates
  dates = JSON.parse(dates)
  let filteredDates = dates.filter((date) => date.membership_id == membership[0].id)

  //remove dates from filteredDates
  let formattedDates = []
  for (let i = 0; i<filteredDates.length; i++) {
    let unformattedDate = filteredDates[i].date_available
    let formattedDate = moment(unformattedDate).format('YYYY-MM-DD')
    formattedDates.push(formattedDate)
  }

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

  const DateOption = ({date}) => {
    return (
      <option>
        {date}
      </option>
    )
  }

   return (
     <div className="copy-of-accordian">
       <div className="accordian">
          <section className="accordianSection">
            <div className="accordianSectionHeader">
              <div className="accordianSectionHeader-title">Select Date</div>
            </div>
            <div>
              <div className="accordianSection-body">
                <div>
                  <p>Please select the date you wish to rent this membership for.</p>
                  <label for="date-selector">Date:</label>
                  <Input name="date-selector" type='select'>
                    {formattedDates.map((date) => <DateOption date={date}/>)}
                  </Input>
                </div>
              </div>
            </div>
          </section>
          {/* <section className="accordianSection"></section>
          <section className="accordianSection"></section> */}
       </div>
       <div className="summary-container">
         <div className="summary-header">
           <div className="summary-gymdetails">
             <div className="summary-imagecontainer">
               <img className="summary-gymimage" src="https://s3-media3.fl.yelpcdn.com/bphoto/2H4QS8mT2dTd6eEqkcuV-g/ls.jpg"></img>
               <img className="summary-ownerimage" src="https://scontent.fapa1-1.fna.fbcdn.net/v/t1.0-9/404578_594526853891268_555244975_n.jpg?oh=389bb73c7b7ec3a49bd05e9394db6ed3&oe=5A8F1DB3"></img>
             </div>
             <div className="summary-gymnamecontainer">
               <h6>Gym name:</h6>
               <h5>CAC</h5>
             </div>
           </div>
           <div className="summary-datedetails">
             <div className="rent-date">
               <div className="schedule-date">Tue, Nov 21</div>
             </div>
           </div>
         </div>
         <div className="summary-gymlocation">
           <div className="summary-icon-home"></div>
           <div className="summary-addressContainer">
             <h6>Gym Location</h6>
             <p>Boulder, CO 80305</p>
           </div>
         </div>
       </div>
     </div>
         /* <div id="user-order">
           <Input type='select' label="Select which date you want to rent this membership for!">
             {formattedDates.map((date) => <DateOption date={date}/>)}
           </Input>
           <h1>Price: $7</h1>
         </div>

         <div id="payment">
           <StripeCheckout token={this.onToken} stripeKey="pk_test_HV5svf5kd921ZDOCCswnRS0h" />
         </div> */

    )
}




export default Payment
