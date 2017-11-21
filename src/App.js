import React, { Component } from 'react';
import {Route, Router, Switch } from 'react-router-dom'
// import $ from 'jquery'

import HomePage from './components/HomePage'
import Checkout from './components/Checkout'
import List from './components/List'
import history from './components/History'
import ErrorPage from './components/ErrorPage'
import Search from './components/Search'
import Header from './components/Header'
import MembershipPage from './components/MembershipPage'

declare var $: any;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        gyms: [],
        memberships: [],
        user: {},
        modal: {
          name: 'Welcome to Flex'
        },
        loading: true,
        search: {}
    }
  }

  async componentDidMount() {
    const gymsResponse = await fetch(`${process.env.REACT_APP_API_URL}/gyms`)
    console.log(gymsResponse)
    const gymsJson = await gymsResponse.json()

    const membershipsResponse = await fetch(`${process.env.REACT_APP_API_URL}/memberships`)
    const membershipsJson = await membershipsResponse.json()

    const tokenResponse = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const tokenJson = await tokenResponse.json()

    let datesResponse = await fetch(`${process.env.REACT_APP_API_URL}/dates`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const datesJson = await datesResponse.json()

    this.setState({
      ...this.state,
      memberships: membershipsJson,
      gyms: gymsJson,
      isLoggedIn: tokenJson,
      loading: false,
      dates: JSON.stringify(datesJson)
    })
  }

  changeModalState = (string) => {
    this.setState({
      ...this.state,
      modal: {
        name: string
      }
    })
  }

  createUser = async(info) => {
    await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    $('#signupmodal').modal('close')
  }

  userLogin = async(info) => {
    console.log(info)
    let response = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
      method: 'POST',
      body: JSON.stringify(info),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    console.log(response)
    if (response.status !== 400) {
      const userInfo = await response.json()
      this.setState({
        ...this.state,
        isLoggedIn: true
      })
      localStorage.setItem("user", JSON.stringify(userInfo));
      $('#loginmodal').modal('close')
      $('#signupmodal').modal('close')
    } else {
      this.setState({
        ...this.state,
        modal: {
          loginFailed: true,
          ...this.state.modal
        }
      })
    }
  }

  sendSelectedDays=(selectedDays)=>{
    this.setState({
      ...this.state,
      selectedDays: selectedDays
    })
    console.log(selectedDays)
  }

  sendGym = (gym) => {
    this.setState({
      ...this.state,
      gym: gym
    })
    console.log(gym)
  }

  isLoggedIn = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const userInfo = await response.json()
    if (userInfo === true) {
      console.log('isLoggedIn is returning true')
      this.setState({
        ...this.state,
        isLoggedIn: true
      })
      return true
    } else {
      console.log('isLoggedIn is returning false')
      this.setState({
        ...this.state,
        isLoggedIn: false
      })
      return false
    }
  }

  logoutUser = async() => {
    await fetch(`${process.env.REACT_APP_API_URL}/token`, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.setState({
      ...this.state,
      isLoggedIn: false
    })
    $('#loginmodal').modal('close')
  }

  sendNewMembership = async() => {
    const selectGyms = this.state.gym
    const selectDays = this.state.selectedDays
    console.log(selectGyms)
    console.log(selectDays)

  }

  createNewMembership = async(data) => {
    console.log(data)
    let response = await fetch(`${process.env.REACT_APP_API_URL}/memberships`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    console.log(response)
    const newMembership = await response.json()
    console.log(newMembership)
    const items = this.state.memberships
    const clone = [
      ...items,
      newMembership,
    ]
    console.log(clone)
    this.setState({
      ...this.state,
      memberships: clone
    })
    history.push(`/membership/${newMembership.id}`)

    const membership_id = newMembership.id
    const date_available = this.state.selectedDays
    let newArr = []
    for(var i in date_available) {
      newArr.push({
        date_available: date_available[i],
        membership_id: membership_id,
        booked: false
      })
    }

    let dateResponse = await fetch(`${process.env.REACT_APP_API_URL}/dates`, {
      method: 'POST',
      body: JSON.stringify({arr: newArr}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    console.log(dateResponse)
    let newDates = await dateResponse.json()
    const oldDates = this.state.dates
    let copy = oldDates.slice(0)
    console.log(copy)
    let copy2 = JSON.parse(copy)
    newDates.map((newDate, i)=> copy2.push(newDate))
    // console.log(copy2)
    this.setState({
      ...this.state,
        dates: JSON.stringify(copy2)
    })
    console.log(this.state.dates)


    // const newDatesJson = newDates.json
    // console.log("LOOK HERE "+newDatesJson)
    //
    // for (let i = 0; i<newDates.length; i++) {
    //   console.log(newDates[i])
    //   // clone2.push(newDates[i])
    //
    // }
    // this.setState({
    //   ...this.state
    //   dates:
    // })

    // let datesResponse = await fetch(`http://localhost:3000/dates`, {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   }
    // })

    // const datesJson = await datesResponse.json()

    // this.setState({
    //   ...this.state,
    //   dates: datesJson
    // })
    //
    // console.log(this.state)

    // const datejson = await dateResponse.json()
    //   console.log(datejson)
    //   const newDateInfo = [...this.state.dates]
    //   for(i=0; i<newDateInfo.length; i++) {
    //     newDateInfo.push(datejson[i])
    //   }
    //   console.log(newDateInfo)
    //   this.setState({
    //     ...this.state,
    //       dates: JSON.stringify(newDateInfo)
    //   })
  }





  updateSearchState = (date, where) => {
    this.setState({
      ...this.state,
      search: {
        date: date,
        where: where
      }
    })
  }

  updateSearchStateDate = (date) => {
    console.log(date)
    this.setState({
      ...this.state,
      search: {
        ...this.state.search,
        date: date
      }
    })
  }

  deleteMembership = async(membership) => {
    await fetch(`${process.env.REACT_APP_API_URL}/memberships/${membership.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const items = this.state.memberships
    const clone = items.filter(item => item !== membership)
    this.setState({
      ...this.state,
      memberships: clone
    })
  }

  hitFacebookRoute = async() => {
    // window.location.replace("http://localhost:3000/auth/facebook");
    // let response = await fetch(`http://localhost:3000/auth/facebook`, {
    //   method: 'GET',
    //   mode: 'no-cors'
    // })
    // console.log(response)
    // //const itemsJson = await response.json()
    // // console.log(itemsJson)
  }


  render() {


    const { loading } = this.state;

    if(loading) { // if your app get render immediately, remove this block
      return null; // render null when app is not ready
    }

    return (


      <div>

        <Header hitFacebookRoute={this.hitFacebookRoute} logoutUser={this.logoutUser} isLoggedIn={this.isLoggedIn} state={this.state} modal={this.state.modal} changeModalState={this.changeModalState} createUser={this.createUser} userLogin={this.userLogin}/>
        <Router history={history}>
          <Switch>
            <Route path="/membership/:id" render= {({match}) => <MembershipPage deleteMembership={this.deleteMembership} match={match} gyms={this.state.gyms} memberships={this.state.memberships}/>} />
            <Route path="/checkout/:id" render= {({match}) => <Checkout match={match} history={history}/>} />
            <Route path="/list" render= {() => <List createNewMembership={this.createNewMembership} gyms={this.state.gyms} sendNewMembership={this.sendNewMembership} sendGym={this.sendGym} modal={this.state.modal} sendSelectedDays={this.sendSelectedDays}/>} />
            <Route path="/search" render= {() => <Search updateSearchStateDate={this.updateSearchStateDate} dates={this.state.dates} search={this.state.search} gyms={this.state.gyms} memberships={this.state.memberships} modal={this.state.modal} />} />
            <Route path="/:id" render= {() => <ErrorPage modal={this.state.modal}/>} />
            <HomePage updateSearchState={this.updateSearchState} modal={this.state.modal} changeModalState={this.changeModalState} createUser={this.createUser}/>
          </Switch>
        </Router>


      </div>

    );
  }
}

export default App;
