import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';    //to be used in place of anchor tag

const Landing = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(isAuthenticated){        // if already logged in and then if clicked on the logo to go to '/'
                                // then it will route to /dashboard
        return <Redirect to='/dashboard' />
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Link</h1>
                    <p className="lead">
                        Got stuck with a code? Connect to other developers across the globe, share posts, ask questions and make a Dev-Link.
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Landing;
