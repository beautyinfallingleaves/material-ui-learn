import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

class NavBar extends React.Component {
  constructor() {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.logoutActionCreator(this.props.history)
  }

  render() {
    const { user, isLoggedIn } = this.props
    return (
      <div>
        <AppBar position="static">
          <Toolbar id="nav">
            <Typography variant="h6" color="inherit">
              Site Name
            </Typography>
            {isLoggedIn ? (
              <div>
                <NavLink to="/home">Home</NavLink>
                <a href="#" onClick={this.handleLogout}>Logout</a>
                <Typography variant="body1">Logged in as {user.email}</Typography>
                <img src={user.imageUrl} style={{ width: '3rem' }} alt="User's profile photo." />
              </div>
            ) : (
              <div>
                <NavLink to="/login">
                  <Typography variant="body1">
                    Log In
                  </Typography>
                </NavLink>
                <NavLink to="/signup">
                  <Typography variant="body1">
                    Sign Up
                  </Typography>
                </NavLink>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutActionCreator: (history) => dispatch(logout(history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
