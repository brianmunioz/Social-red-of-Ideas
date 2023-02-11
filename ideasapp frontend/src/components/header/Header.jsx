import React, { useState } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logout from '../../helpers/logout';

export default () => <Header></Header>


function Header() {
  let token = document.cookie.replace('token=', '');
  const [collapsed, setCollapsed] = useState(true)


  return (
    <Navbar collapseOnSelect expand="lg" className='header shadow' variant="dark">
      <Container>
        <Link to="/" className='navbar-brand'><img src="/logo.png" style={{ height: '50px' }} alt="logo" /></Link>

        <button  class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="35" height="35"
            viewBox="0 0 48 48">
            <linearGradient id="9iHXMuvV7brSX7hFt~tsna_Rdp3AydLFY2A_gr1" x1="12.066" x2="34.891" y1=".066" y2="22.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stop-color="#3bc9f3"></stop><stop offset=".85" stop-color="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsna_Rdp3AydLFY2A_gr1)" d="M43,15H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,14.1,44.1,15,43,15z"></path><linearGradient id="9iHXMuvV7brSX7hFt~tsnb_Rdp3AydLFY2A_gr2" x1="12.066" x2="34.891" y1="12.066" y2="34.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stop-color="#3bc9f3"></stop><stop offset=".85" stop-color="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsnb_Rdp3AydLFY2A_gr2)" d="M43,27H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,26.1,44.1,27,43,27z"></path><linearGradient id="9iHXMuvV7brSX7hFt~tsnc_Rdp3AydLFY2A_gr3" x1="12.066" x2="34.891" y1="24.066" y2="46.891" gradientUnits="userSpaceOnUse"><stop offset=".237" stop-color="#3bc9f3"></stop><stop offset=".85" stop-color="#1591d8"></stop></linearGradient><path fill="url(#9iHXMuvV7brSX7hFt~tsnc_Rdp3AydLFY2A_gr3)" d="M43,39H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,38.1,44.1,39,43,39z"></path>
          </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="35" height="35"
            viewBox="0 0 35 48">
            <linearGradient id="hbE9Evnj3wAjjA2RX0We2a_OZuepOQd0omj_gr1" x1="7.534" x2="27.557" y1="7.534" y2="27.557" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#hbE9Evnj3wAjjA2RX0We2a_OZuepOQd0omj_gr1)" d="M42.42,12.401c0.774-0.774,0.774-2.028,0-2.802L38.401,5.58c-0.774-0.774-2.028-0.774-2.802,0	L24,17.179L12.401,5.58c-0.774-0.774-2.028-0.774-2.802,0L5.58,9.599c-0.774,0.774-0.774,2.028,0,2.802L17.179,24L5.58,35.599	c-0.774,0.774-0.774,2.028,0,2.802l4.019,4.019c0.774,0.774,2.028,0.774,2.802,0L42.42,12.401z"></path><linearGradient id="hbE9Evnj3wAjjA2RX0We2b_OZuepOQd0omj_gr2" x1="27.373" x2="40.507" y1="27.373" y2="40.507" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a8142e"></stop><stop offset=".179" stop-color="#ba1632"></stop><stop offset=".243" stop-color="#c21734"></stop></linearGradient><path fill="url(#hbE9Evnj3wAjjA2RX0We2b_OZuepOQd0omj_gr2)" d="M24,30.821L35.599,42.42c0.774,0.774,2.028,0.774,2.802,0l4.019-4.019	c0.774-0.774,0.774-2.028,0-2.802L30.821,24L24,30.821z"></path>
          </svg>
          )}
        </button>

        <Navbar.Collapse id="navbarNav">
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
                <Link to="/search" className=' nav-link'>  <img alt='search' src="https://cdn-icons-png.flaticon.com/512/8042/8042338.png" style={{ width: '25px', color: 'white', borderRight: '24px' }} />
                  &nbsp;Search</Link>
              </Nav> :
              <Nav className="align-items-center">
                <Link className=' nav-link' to="/login">Log In</Link>
                <Link eventKey={2} className=' nav-link' to="/register">
                  Register!
                </Link>
                <Link to="/search" className=' nav-link'>  <img alt='search' src="https://cdn-icons-png.flaticon.com/512/8042/8042338.png" style={{ width: '25px', color: 'white', borderRight: '24px' }} />
                  &nbsp;Search</Link>
              </Nav>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

