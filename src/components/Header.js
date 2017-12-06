import React from 'react'
import {Navbar, NavItem, Modal} from 'react-materialize'
import './Header.css';
import history from './History'
import {Route, Router, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import { GeolocatedProps, geolocated } from 'react-geolocated';

// import $ from 'jquery';
declare var $: any;

const Header = ({users, logoutUser, isLoggedIn, state, modal, changeModalState, createUser, userLogin, hitFacebookRoute}) => {
  function pickModalHtml() {
    if (modal.name === "Welcome to Flex") {
      return <SignUpButtons />
    } else if (modal.name === "Welcome back") {
      return <SignInForm />
    }
    else {
      return <SignUpForm />
    }
  }

  const preChangeModalState = (string) => {
    console.log('premodalstates=change fired')
    changeModalState(string)
  }

  function errorMessageClasses() {
    let classes = "errorMessage u-hidden"
    if (!!modal.loginFailed) {
      classes = "errorMessage"
    }
    return classes
  }


  function SignInForm() {
    return (
      <div>
        <form onSubmit={getToken}>
          <div>
            <label className="email-label">
              Email
            </label>
            <input name="email" className="email-input">

            </input>
          </div>
          <div>
            <label className="password-label">
              Password
            </label>
            <input name="password" type="password" className="password-input">

            </input>
          </div>
          <input id="email-btn" type="submit" value="Sign in" className="btn btn-primary"></input>
        </form>
        <div className={errorMessageClasses()}>
          Please check your email and password.
        </div>
        <span className="signup-already-have-an-account-span">
          Don't have an account?
          <button onClick={() => preChangeModalState("Welcome to Flex")} className="signin-modal-login-btn">Sign up</button>
        </span>
      </div>
    )
  }

  const preHitFacebookRoute = () => {
    hitFacebookRoute()
  }

  function SignUpButtons() {
    return (
      <div>
        <div className="button-container">

          <a href="http://localhost:3131/auth/facebook" id="facebook-btn" ><img alt="" className="facebook-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/F_icon_reversed.svg/1000px-F_icon_reversed.svg.png"></img>Sign up with Facebook</a>
          <a id="google-btn" ><img alt="" className="google-logo" src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"></img>Sign up with Google</a>

        </div>
        <p className="signup-or-p">or</p>
        <a id="email-btn" onClick={() => preChangeModalState("Let's get Started")} >Sign up with email</a>
        <span className="signup-already-have-an-account-span">
          Already have an account?
          <button onClick={() => preChangeModalState("Welcome back")} className="signin-modal-login-btn">Log in</button>
        </span>
      </div>
    )
  }

  const registerUser = (e) => {
    e.preventDefault()
    createUser({
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value
    })
  }

  const getToken = (e) => {
    e.preventDefault()
    userLogin({
      email: e.target.email.value,
      password: e.target.password.value
    })
  }

  function SignUpForm() {
    return (
      <div>
        <form onSubmit={registerUser}>
          <div className="main-name-div">
            <div className="name-input-div-left">
              <label className="name-label">
                First name
              </label>
              <input required name="first_name" className="name-input">

              </input>
            </div>
            <div className="name-input-div-right">
              <label className="name-label">
                Last name
              </label>
              <input required name="last_name" className="name-input">

              </input>
            </div>
          </div>
          <div>
            <label className="email-label">
              Email
            </label>
            <input required name="email" className="email-input">

            </input>
          </div>
          <div>
            <label className="password-label">
              Choose a password
            </label>
            <input required type="password" name="password" className="password-input">

            </input>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary"></input>
        </form>
      </div>
    )
  }

  const loginNavItem = () => {
    if (typeof localStorage.user !== 'undefined') {
      console.log('local storage isnt undefined returning log out')
      return "Log out"
    } else {
      return "Log in"
    }
  }

  const pickInOrOut = () => {
    if (typeof localStorage.user !== 'undefined') {
      return (
        <span>
        <NavItem className="u-hidden" onClick={(e) => {
          preChangeModalState("Welcome to Flex")
          e.preventDefault()
          $('#signupmodal').modal('open')
        }}>Sign up</NavItem>
        <Modal
          id='signupmodal'
          header={modal.name}>
          {pickModalHtml()}
        </Modal>
      </span>
      )
    } else {
      return (
        <span>
        <NavItem className="" onClick={(e) => {
          preChangeModalState("Welcome to Flex")
          e.preventDefault()
          $('#signupmodal').modal('open')
        }}>Sign up</NavItem>
        <Modal
          id='signupmodal'
          header={modal.name}>
          {pickModalHtml()}
        </Modal>
      </span>
      )
    }
  }

  function loginButton() {
    if (typeof localStorage.user !== 'undefined') {
      console.log('logout')
      logoutUser()
    } else {
      $('#loginmodal').modal('open')
      console.log('login')
    }
  }

  const pushSearch = (e) => {
    e.preventDefault()
    history.push('/search')
  }

  const pushList = (e) => {
    e.preventDefault()
    history.push('/list')
  }

  const goToProfilePage = (e) => {
    e.preventDefault()
    let loggedInUser = JSON.parse(localStorage.user)
    let user_id = loggedInUser.id
    history.push(`/profile/${user_id}`)
  }

  return (

    <div className="header">

      <Navbar brand='FLEX' right>
        <NavItem onClick={pushList}>List</NavItem>
        <NavItem onClick={pushSearch}>Rent</NavItem>

        {pickInOrOut()}

      	<NavItem onClick={(e) => {
          loginButton()
          preChangeModalState("Welcome back")
          e.preventDefault()
      	}}>{loginNavItem()}</NavItem>
      	<Modal
      		id='loginmodal'
      		header={modal.name}>
      		{pickModalHtml()}
      	</Modal>

        {typeof localStorage.user !== 'undefined' ? <NavItem onClick={goToProfilePage}>Profile</NavItem> : null}

        {/* <Router history={history}>
          <Route render={(props) => {
            console.log("Look at this "+JSON.stringify(props.location))
          }} />

          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router> */}

      </Navbar>




   </div>


  )

}

export default Header
