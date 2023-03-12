import React, { useState } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link, useNavigate } from 'react-router-dom';
import logout from '../../helpers/logout';
import axios from 'axios';

export default () => <Header></Header>


function Header() {
  const [token, setToken] = useState(document.cookie.replace('token=', ''))
  const [collapsed, setCollapsed] = useState(true);
  const [isLogOut, setIsLogOut] = useState(false);
  const [typeUser, setTypeUser] = useState('none')
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  if (localStorage.getItem('user')) {
    axios.get(REACT_APP_API_URL + '/user/' + localStorage.getItem('user').replace("\"", "").replace("\"", ""))
      .then(res => {
        setTypeUser(res.data.rol);
        localStorage.setItem('rol', res.data.rol)
      })
      .catch(console.log)
  } else {
    localStorage.removeItem('rol')
  }
  if (isLogOut) {
    setIsLogOut(false)
    navigate('/')
  }
  return (
    <Navbar collapseOnSelect expand="lg" className='header shadow' variant="dark">
      <Container>
        <Link to="/" className='navbar-brand'><img src="/logo.png" style={{ height: '50px' }} alt="logo" /></Link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setCollapsed(!collapsed)}>
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

            <Link to="/top" className=' nav-link fw-bold'>
              <img src="data:image/png;base64,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" width="30px" alt="top"
                style={{ marginRight: '5px' }}
              />
              Top´s

            </Link>
            <Link to="/search" className=' nav-link fw-bold'> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAACGklEQVR4nN3U30tTYRzH8dNF9Se0XRV1FSQ47Y8IxKugcGgXlYEh0g+iSGmiIRGImELpsc2ziqjGugv6XbsLjCRX4mC53xvbmtM2XZ4d3/EcO92enYkUfe8OHHjx+T7P85Gk/35GYbcCHYqGz1Ml6FGJu1Vm5XU8dyq0Aju2BNyDFkUjomzAtAaeKrhVmFqHiZ9wuwLjq3wcKdFYF+CFbq+GZgJwqwwjPygNFzliOYEFgOEVuFlk5UaegzUBj2GXohG2CDBUgIE8b2tC9EOuAxjMgysLfVkc5oiGr24gA1dSuEyR6SpfDMA1X+LEswxjpQ0d6F+scPxpmutpVQeuxVWOPklzbn7NALgU56Ep4lZJGAla5AiHeoP0hsp6gjZ/Rv8+FfiuJzj5ZomGq0FafalNIAHnYzw3Re6qfDJWNJSo0PNhidHS5opEgtOBAgNZTV9RX0qj/VWBC2HVAOhZxGuKiJds8Qz4A0TgbJiLpoioinqBrjDamRAHTBHRRWOrzFhO8A06QyhSrSO6SK8KC0D7bBmH/2u3ZGVEF4mqqBVoeDRH0+tctTlQbLMEiS4azPHC5Ay8Tf6FTsfLnHr4/fLy3gfJz7apSIdkdURVXE7SLx6aeAfimopb1LXAfuOf5ndF5777yTm7HMM+Ga3a5ZhT2o7ZMxk9ZpejqgHVleifguxyzPl7ZdjkqHmXbQWyCWBiZue2IX9tfgEFQW3Q922jOQAAAABJRU5ErkJggg==" width="25px" alt="search" />
              &nbsp;Search</Link>

          </Nav>


          {
            token && token !== '' ?

              <Nav className="align-items-center">
                {typeUser === 'moderator' || typeUser === 'admin' ?
                  <NavDropdown title="Admin" id="basic-nav-dropdown " >
                    <NavDropdown.Item className='text-light dropdown-item' href="/reported" >Reported</NavDropdown.Item>
                    <NavDropdown.Item className='text-light dropdown-item' href="/create/report" >CreateReport</NavDropdown.Item>

                    {typeUser === 'admin' &&
                      <>
                        <NavDropdown.Item className='text-light dropdown-item' href='/suspended'>
                          Suspentions
                        </NavDropdown.Item>
                        <NavDropdown.Item className='text-light dropdown-item' href='/create/suspention/add%20userID'>
                          Create suspention
                        </NavDropdown.Item>
                        
                      </>
                    }

                  </NavDropdown>
                  : ''

                }

                <Link className=' nav-link' to="/myideas">My ideas</Link>
                <Link className=' nav-link' to="/myaccount">My account</Link>

                <Link className=' nav-link fw-bold' to="#" onClick={() => {
                  setIsLogOut(true)
                  setToken('');
                  logout();
                }}
                style={{color: '#f97272'}}>
                  Logout
                </Link>

              </Nav> :
              <Nav className="align-items-center">

                <Link className=' nav-link' to="/login">Log In</Link>
                <Link eventKey={2} className=' nav-link' to="/register">
                  Register!
                </Link>

              </Nav>
          }


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

