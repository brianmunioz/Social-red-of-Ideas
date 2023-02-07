import React from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logout from '../../helpers/logout';

export default () =><Header></Header>


function Header() {
  let token = document.cookie.replace('token=', '');


  return (
    <Navbar collapseOnSelect expand="lg" className='header shadow' variant="dark">
      <Container>
        <Link to="/" className='navbar-brand'><img src="/logo.png" style={{ height: '50px' }} alt="logo" /></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Link to="/top" className=' nav-link'>Top´s</Link>
          </Nav>


          {
            token ?

              <Nav className="align-items-center">
                <Link className=' nav-link' to="/myideas">My ideas</Link>
                <Link className=' nav-link' to="/myaccount">My account</Link>

                <Link className=' nav-link' to="#" onClick={logout}>
                  Logout
                </Link>
                <Link to="/search" className=' nav-link'>  <img alt='search' src="https://cdn-icons-png.flaticon.com/512/8042/8042338.png" style={{width: '25px',color: 'white',borderRight: '24px'}}/>
             &nbsp;Search</Link>
              </Nav> :
              <Nav className="align-items-center">
                <Link className=' nav-link' to="/login">Log In</Link>
                <Link eventKey={2} className=' nav-link' to="/register">
                  Register!
                </Link>
                <Link to="/search" className=' nav-link'>  <img alt='search' src="https://cdn-icons-png.flaticon.com/512/8042/8042338.png" style={{width: '25px',color: 'white',borderRight: '24px'}}/>
             &nbsp;Search</Link>
              </Nav>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

