import React, { Component } from 'react';
import { BrowserRouter, Browser, Route, Link, Router, Switch } from 'react-router-dom'
import logo from './logo.svg';
// import $ from 'jquery'
import {Materialize, Button, Icon, Navbar, NavItem, Row, Input, Toast} from 'react-materialize'

import HomePage from './components/HomePage'
import Checkout from './components/Checkout'
import List from './components/List'
import history from './components/History'
import ErrorPage from './components/ErrorPage'
import Search from './components/Search'
import Header from './components/Header'

declare var $: any;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        gyms: [],
        memberships: [],
        modal: {
          name: 'Welcome to Flex'
        }
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

    console.log(tokenJson)

    this.setState({
      ...this.state,
      memberships: membershipsJson,
      gyms: gymsJson,
      isLoggedIn: tokenJson
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
  }

  createUser = async(info) => {

    const response = await fetch(`http://localhost:3000/users`, {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    // console.log(response)
  }

  test = () => {
    console.log('hey')
    return (
      <Toast toast="here you go!">
        Toast
      </Toast>
    )
  }

  userLogin = async(info) => {
    const response = await fetch(`http://localhost:3000/token`, {
      method: 'POST',
      body: JSON.stringify(info),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    try {
        const userInfo = await response.json()
        console.log('state change')
        this.setState({
          ...this.state,
          isLoggedIn: true
        })
        $('#loginmodal').modal('close')
        $('#signupmodal').modal('close')
    } catch(error) {
      console.log('state change')
      this.setState({
        ...this.state,
        modal: {
          loginFailed: true,
          ...this.state.modal
        }
      })
    }
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
    const response = await fetch(`http://localhost:3000/token`, {
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

  render() {
    return (

      <div>
        <Header logoutUser={this.logoutUser} isLoggedIn={this.isLoggedIn} state={this.state} modal={this.state.modal} changeModalState={this.changeModalState} createUser={this.createUser} userLogin={this.userLogin}/>
        <Router history={history}>
          <Switch>
            <Route path="/payment" render= {() => <Checkout modal={this.state.modal}/>} />
            <Route path="/list" render= {() => <List modal={this.state.modal}/>} />
            <Route path="/search" render= {() => <Search modal={this.state.modal} />} />
            <Route path="/:id" render= {() => <ErrorPage modal={this.state.modal}/>} />
            <HomePage modal={this.state.modal} changeModalState={this.changeModalState} createUser={this.createUser}/>
          </Switch>
        </Router>


      </div>

    );
  }
}

export default App;
