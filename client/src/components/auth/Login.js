import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../actions/auth';

const Login = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }  //spread op + e.target = 'name' if onChange called from Name, 'email' if from email input and so on

    async function onSubmit(e) {
        e.preventDefault();
        dispatch(login(email, password));
    }
    
    //Redirect if logged in
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);   //useSelector for using values from Store
    if(isAuthenticated){    
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login;