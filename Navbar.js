import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css"; // Import styles

const Navbar = () => {
  const location = useLocation(); // Get current route

  return (
    <nav className="navbar">
      <h2>Assistive Tech App</h2>
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
        </li>
        <li>
          <Link to="/sign-language" className={location.pathname === "/sign-language" ? "active" : ""}>Sign Language</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
