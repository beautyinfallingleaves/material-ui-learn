import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../redux'
import {Typography, Button, Input, Link, Card} from '@material-ui/core'


class AuthForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const formName = event.target.name
    const email = event.target.email.value
    const password = event.target.password.value
    const history = this.props.history
    this.props.authThunkCreator(email, password, formName, history)
  }

  render() {
    const { name, displayName, error } = this.props

    return (
      <div id="auth-component">
        <Card id="login-card" style={{width: 340, height: 478}}>
          <Typography variant="h5" color="primary">Welcome to Time Garden!</Typography>
          <div style={{ width: '90%' }}>
            <form style={{width: '100%' }} onSubmit={this.handleSubmit} name={name}>
              <Input fullWidth={true} name="email" type="text" autoFocus={true} placeholder="Email" />
              <Input fullWidth={true} name="password" type="password" placeholder="Password" />
              <br />
              <Button variant="contained" fullWidth={true} color="primary" type="submit">{displayName}</Button>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
            <Typography variant="body1" color="primary">
              or
            </Typography>
            <Button href="/auth/google" variant="contained" fullWidth={true} color="primary">
              Continue with Google
            </Button>
            {name === 'login' ? (
              <Typography variant="body1" color="primary">
                Not a registered user? <NavLink to="/signup">Sign Up</NavLink>
              </Typography>
            ) : (
              <Typography variant="body1" color="primary">
                Already a registered user? <NavLink to="/login">Log In</NavLink>
              </Typography>
            )}
          </div>
        </Card>
      </div>
    )
  }
}

const mapLoginToProps = (state) => {
  return {
    name: 'login',
    displayName: 'Log In',
    error: state.user.error,
  }
}

const mapSignupToProps = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authThunkCreator: (email, password, formName, history) => dispatch(auth(email, password, formName, history))
  }
}

export const Login = withRouter(connect(mapLoginToProps, mapDispatchToProps)(AuthForm))
export const Signup = withRouter(connect(mapSignupToProps, mapDispatchToProps)(AuthForm))
