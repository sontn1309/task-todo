import * as React from 'react'
import Auth from '../auth/Auth'
import { BsFillAlarmFill, BsFillPersonLinesFill } from "react-icons/bs";
import Swal from 'sweetalert2'
import { History } from 'history'
import {
  Nav,
  Navbar,
  Container,
} from 'react-bootstrap'
import {
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
} from 'mdb-react-ui-kit';

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
          <Navbar.Brand style={{ padding: '0.75em 4em 1em 4em' }} onClick={() => this.backHome()}><BsFillAlarmFill /></Navbar.Brand>
          <Nav.Link  onClick={() => this.backHome()}  style={{ padding: '0.75em 4em 0.5em 4em' }} >Home</Nav.Link>
          <MDBNavbarItem>
              <MDBDropdown >
                <MDBDropdownToggle tag='a' className='nav-link' style={{ padding: '0.75em 4em 0.5em 4em' }}>
                <BsFillPersonLinesFill/>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink onClick={this.handleLogout}>Sign out</MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
        </Nav>
      )
    } else {
      return (
        <Nav className="me-auto justify-content-md-center">
          <Navbar.Brand style={{ padding: '0.5em 4em 1em 4em' }} href="#home"><BsFillAlarmFill /></Navbar.Brand>
          <Nav.Link style={{ padding: '0.5em 4em 0em 4em' }} onClick={this.handleLogin}>Sign in</Nav.Link>
        </Nav>
      )
    }
  }

}


