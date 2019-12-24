import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../redux'
import {Typography, Button, Input, InputLabel, Link, Card} from '@material-ui/core'


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
        <Card id="login-card">
          <Typography variant="h2" color="primary">{displayName}</Typography>
          <form onSubmit={this.handleSubmit} name={name}>
            <div>
              <InputLabel htmlFor="email">
                <small>Email</small>
              </InputLabel>
              <Input name="email" type="text" />
            </div>
            <div>
              <InputLabel htmlFor="password">
                <small>Password</small>
              </InputLabel>
              <Input name="password" type="password" />
            </div>
            <div>
              <Button variant="contained" color="primary" type="submit">{displayName}</Button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <Link href="/auth/google">
            <Typography variant="body1" color="primary">
              Or, {displayName} with Google
            </Typography>
          </Link>
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
