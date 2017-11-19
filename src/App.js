import React, { Component } from 'react';
import {Route, Router, Switch } from 'react-router-dom'
// import $ from 'jquery'
import {Toast} from 'react-materialize'

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
    const gymsResponse = await fetch(`http://localhost:3000/gyms`)
    const gymsJson = await gymsResponse.json()

    const membershipsResponse = await fetch(`http://localhost:3000/memberships`)
    const membershipsJson = await membershipsResponse.json()

    const tokenResponse = await fetch(`http://localhost:3000/token`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const tokenJson = await tokenResponse.json()

    this.setState({
      ...this.state,
      memberships: membershipsJson,
      gyms: gymsJson,
      isLoggedIn: tokenJson,
      loading: false
    })
  }

  changeModalState = (string) => {
    console.log('state change')
    this.setState({
      ...this.state,
      modal: {
        name: string
      }
    })
    console.log(this.state)
  }

  createUser = async(info) => {

    await fetch(`http://localhost:3000/users`, {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

  }

  userLogin = async(info) => {
    let response = await fetch(`http://localhost:3000/token`, {
      method: 'POST',
      body: JSON.stringify(info),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    if (response.status != 400) {
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
    const response = await fetch(`http://localhost:3000/token`, {
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
    await fetch(`http://localhost:3000/token`, {
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

  sendNewMembership = () => {
    const selectGyms = this.state.gym
    const selectDays = this.state.selectedDays
    console.log(selectGyms)
    console.log(selectDays)
    // const response = await fetch(`http://localhost:3000/token`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   }
    // })
  }

  createNewMembership = async(data) => {
    let response = await fetch(`http://localhost:3000/memberships`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const newMembership = await response.json()
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
    const dates_available = this.state.selectedDays
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

  deleteMembership = async(membership) => {
    console.log(membership)
    let response = await fetch(`http://localhost:3000/memberships/${membership.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const newMembership = await response.json()
    const items = this.state.memberships
    const clone = items.filter(item => item !== membership)
    this.setState({
      ...this.state,
      memberships: clone
    })
  }


  render() {


    const { loading } = this.state;

    if(loading) { // if your app get render immediately, remove this block
      return null; // render null when app is not ready
    }

    return (


      <div>

        {console.log('re-rendering')}

        <Header logoutUser={this.logoutUser} isLoggedIn={this.isLoggedIn} state={this.state} modal={this.state.modal} changeModalState={this.changeModalState} createUser={this.createUser} userLogin={this.userLogin}/>
        <Router history={history}>
          <Switch>
            <Route path="/membership/:id" render= {({match}) => <MembershipPage deleteMembership={this.deleteMembership} match={match} gyms={this.state.gyms} memberships={this.state.memberships}/>} />
            <Route path="/payment" render= {() => <Checkout modal={this.state.modal}/>} />
            <Route path="/list" render= {() => <List createNewMembership={this.createNewMembership} gyms={this.state.gyms} sendNewMembership={this.sendNewMembership} sendGym={this.sendGym} modal={this.state.modal} sendSelectedDays={this.sendSelectedDays}/>} />
            <Route path="/search" render= {() => <Search search={this.state.search} gyms={this.state.gyms} memberships={this.state.memberships} modal={this.state.modal} />} />
            <Route path="/:id" render= {() => <ErrorPage modal={this.state.modal}/>} />
            <HomePage updateSearchState={this.updateSearchState} modal={this.state.modal} changeModalState={this.changeModalState} createUser={this.createUser}/>
          </Switch>
        </Router>


      </div>

    );
  }
}

export default App;
