import React from 'react';
import { Link } from 'react-router-dom';    //to be used in place of anchor tag

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i class="fas fa-link"></i> Dev-Link</Link>
      </h1>
      <ul>
        <li><Link to="profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
