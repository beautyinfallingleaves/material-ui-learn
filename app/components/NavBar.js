import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserMenu } from './'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const NavBar = (props) => {
  const { user, isLoggedIn } = props

  return (
    <div id="navbar-component">
      <AppBar position="static">
        <Toolbar id="nav-content">
          <Typography variant="h6" color="inherit">
            Time Garden
          </Typography>
          {isLoggedIn ? (
            <UserMenu userImageUrl={user.imageUrl} />
          ) : (
            <React.Fragment />
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))
