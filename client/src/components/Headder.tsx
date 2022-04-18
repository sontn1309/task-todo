import * as React from 'react'
import Auth from '../auth/Auth'
import { BsFillAlarmFill, BsFillPersonLinesFill } from "react-icons/bs";
import Swal from 'sweetalert2'
import { History } from 'history'
import {
  Nav,
  Navbar,
  Container,
  Dropdown
} from 'react-bootstrap'

export interface LogInProps {
  auth: Auth
  history: History
}

export interface LogInState {
}

export class Headder extends React.PureComponent<LogInProps, LogInState> {
  constructor(props: LogInProps) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  userInformationClick = () => {
    this.props.history.push(`/user/information`)
  }

  backHome = () => {
    this.props.history.push(`/`)
  }

  handleLogin = () => {
    this.props.auth.login()
  }

  handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Sign out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Sign out!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Sign out!',
          'Your file has been deleted.',
          'success'
        ).then(() => {
          this.props.auth.logout()
        })
      }
    })

  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
          </Nav>
          {this.checkGenerateLogoutButton()}
        </Container>
      </Navbar>
    )
  }

  checkGenerateLogoutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (

        <Nav className="me-auto justify-content-md-left">
          <Navbar.Brand style={{ padding: '0.5em 8em 1em 0em' }} onClick={() => this.backHome()}><BsFillAlarmFill /></Navbar.Brand>
          <Nav.Link  onClick={() => this.backHome()}  style={{ padding: '1em 8em 0em 0em' }} >Home</Nav.Link>
          <Nav.Link style={{ padding: '1em 8em 0em 0em' }} onClick={() => this.backHome()}>New</Nav.Link>
          <Nav.Link style={{ padding: '1em 8em 0em 0em' }} onClick={() => this.backHome()}>All task</Nav.Link>
          <Dropdown style={{ padding: '0.5em 8em 0.5em 0.5em' }}>
            <Dropdown.Toggle  id="dropdown-button-user" variant="secondary" >
            <Navbar.Brand style={{ padding: '0.5em 0em 1em 0em' }}> <BsFillPersonLinesFill /></Navbar.Brand>  Hello Button 
            </Dropdown.Toggle>

            <Dropdown.Menu variant="light">
              <Dropdown.Item  onClick={() => this.userInformationClick()} active>
                User information
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-4" onClick={this.handleLogout}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      )
    } else {
      return (
        <Nav className="me-auto justify-content-md-center">
          <Navbar.Brand style={{ padding: '0.5em 8em 1em 0em' }} href="#home"><BsFillAlarmFill /></Navbar.Brand>
          <Nav.Link style={{ padding: '1em 8em 0em 0em' }} >Home</Nav.Link>
          <Nav.Link style={{ padding: '1em 8em 0em 0em' }} onClick={this.handleLogin}>Sign in</Nav.Link>
        </Nav>
      )
    }
  }

}


