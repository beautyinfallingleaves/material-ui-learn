import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../redux'
import {Avatar, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList} from '@material-ui/core'
import { withRouter } from 'react-router'

const UserMenu = (props) => {
  const { userImageUrl, history, logoutActionCreator } = props
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  function handleLogout() {
    logoutActionCreator(history)
  }

  return (
    <div>
      <Avatar
        src={userImageUrl}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      />
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutActionCreator: (history) => dispatch(logout(history))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(UserMenu))
