import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css"


import Auth from "../../utils/auth";
const AppNavbar = () => {
  return (
    <>
      <Navbar  bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {/* if user is logged in show link options and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/Dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/habit">
                    Create Habit
                  </Nav.Link>
                  
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>

                  <label className="navbar-check">
                    Notifications
                    <input
                    type="checkbox"
                   ></input>
                    </label>
                </>
                
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
