import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup, Home } from './components'
import { me } from './redux/user'

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <div id="routes-component">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="login" />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Routes))
