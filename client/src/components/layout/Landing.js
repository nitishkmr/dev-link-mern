import React from 'react';
import { Link } from 'react-router-dom';    //to be used in place of anchor tag

const Landing = () => {
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
