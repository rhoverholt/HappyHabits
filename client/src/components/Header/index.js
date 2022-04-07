import React from "react";
import { Link } from "react-router-dom";
import './header.css'
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="container header__container">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div> 
          <h5>Welcome to</h5>
          <Link className="text-light" to="/">
            <h1 className="m-0">Happy Habits</h1>
          </Link>
          <p className="m-0">
            Little changes, big results.
          </p>
        </div>
        <div className= "cta">
          {Auth.loggedIn() ? (
            <>
              <span>Hey there, {Auth.getProfile().data.username}!</span>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn" id="loginbtn" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
