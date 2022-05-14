import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import SiteLogo from '../assets/images/sitelogo.png';
import { AuthConsumer } from '../services/AuthProvider';
import {Link, NavLink} from "react-router-dom";

  function NavbarComponent() {
    return (
        <AuthConsumer>
            {({ authenticated, user, login, logout, loginModalTrigger, registerModalTrigger }) => (
                <Navbar bg="dark" variant="dark" id="site-navbar">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <img
                                src={SiteLogo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Volcano Logo"
                            />
                            <span>Volcanos</span>
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/Volcanoes" className={({ isActive }) => (isActive ? 'active' : '')}>Volcanoes</Nav.Link>
                            <Nav.Link as={NavLink} to="/About" className={({ isActive }) => (isActive ? 'active' : '')}>About</Nav.Link>
                        </Nav>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            {authenticated ? (
                                <NavDropdown className="authenticated" title={user.email} id="collasible-nav-dropdown">
                                    <NavDropdown.Item onClick={logout} className="text-danger">Logout</NavDropdown.Item>
                                </NavDropdown>
                            ):(
                                <Navbar.Text className="not-authenticated">
                                    <Button variant="link" onClick={()=>loginModalTrigger()}>
                                        Login
                                    </Button>
                                    <Button variant="link" onClick={()=>registerModalTrigger()}>
                                        Register
                                    </Button>
                                </Navbar.Text>
                            )}
                        
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
            
        </AuthConsumer>
        
      );
  }

  export default NavbarComponent;
