import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css"
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_NOTIFY } from '../../utils/mutations';
import { QUERY_ME} from "../../utils/queries";


import Auth from "../../utils/auth";

const AppNavbar = () => {
  const notify = useMutation(UPDATE_NOTIFY);
  const { loading, data } = useQuery(QUERY_ME);

  function checkNotify() {
    if(data.me.notify) {
      return true;
    } else { return false}
  }

  function changeNotify(event) {
    console.log(data.me.notify);
    console.log('I clicked the box');
  }

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
                  <Nav.Link as={Link} to="/tips">
                    Tips
                  </Nav.Link>
                  
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>

                  <label className="navbar-check">
                    Notifications
                    {loading?"" : (<input
                    type="checkbox"
                    defaultChecked={checkNotify()}
                    onChange = {changeNotify}
                   ></input>)}
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
