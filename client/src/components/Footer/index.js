import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './footer.css'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="madewith">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4>
          Made with{" "}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{" "}
          by your Happy Habits Development team.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
