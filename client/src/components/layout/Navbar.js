import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';    //to be used in place of anchor tag
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../actions/auth';

const Navbar = () => {

  const dispatch = useDispatch();                 //now we can use dispatch to dispatch actions 
  const { isAuthenticated, loading } = useSelector(state => state.auth);    // extract isAuthenticated and loading vars from Global Store 

  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
        <i className='fas fa-user' />{' '}
        <span className='hide-sm'>Dashboard</span>   {/*this span will allow to hide the text on smaller screens */}
        </Link>
      </li>
      <li><Link to='#!' onClick={() => dispatch(logout())}> {/* and not onClick={dispatch(logout())} */}
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className='hide-sm'>Logout</span>   
      </Link></li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="#!">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-link"></i> Dev-Link</Link>
      </h1>
      { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
  );
};

export default Navbar;
