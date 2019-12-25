import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux'
import { AppBar, Toolbar, Typography, Avatar, Menu } from '@material-ui/core'

class NavBar extends React.Component {
  constructor() {
    super()
    this.state = {anchorEl: null}
    this.handleLogout = this.handleLogout.bind(this)
    this.handleClickAvatar = this.handleClickAvatar.bind(this)
  }

  handleClickAvatar(event) {
    const anchorEl = this.state.anchorEl
    this.setState({anchorEl: anchorEl ? null : event.currentTarget})
  }

  handleLogout() {
    this.props.logoutActionCreator(this.props.history)
  }

  componentDidUpdate() {
    console.log('state', this.state)
  }

  render() {
    const { user, isLoggedIn } = this.props
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'avatar-menu' : undefined;

    return (
      <div id="navbar-component">
        <AppBar position="static">
          <Toolbar id="nav-content">
            <Typography variant="h6" color="inherit">
              Time Garden
            </Typography>
            {isLoggedIn ? (
              <div>
                <NavLink to="/home">Home</NavLink>
                <a href="#" onClick={this.handleLogout}>Logout</a>
                <Avatar src={user.imageUrl} style={{ width: '3rem' }} alt="User's profile photo." onClick={this.handleClickAvatar} />
                <Menu
                  id={id}
                  open={open}
                  anchorEl={this.state.anchorEl}
                  onClose={this.handleClickAvatar}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  Sample Menu Joy!!
                </Menu>
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
