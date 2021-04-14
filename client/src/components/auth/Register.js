import React, { Fragment, useState } from 'react';
// import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
// To connect to redux
// import {connect} from 'react-redux';
// import { PropTypes } from "prop-types";
import { useDispatch, useSelector } from "react-redux";          
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';


const Register = () => {
    
    const dispatch = useDispatch();                 //now we can use dispatch to dispatch actions
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }  //spread op + e.target = 'name' if onChange called from Name, 'email' if from email input and so on

   /* This code was working fine with the backened, commented since it has to be used with Redux
    async function onSubmit(e) {
        //connecting to backened and there async-await is being used
        // header, body of the login details will be created in this function and send to backend at /api/users.js
        // -as a post request, there the .post() requires name, email and password 
        // axios will make a post request and in response returns a promise with the "TOKEN-JWT"
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
        } else {
            const newUser = {
                name,
                email,
                password
            }
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/users', body, config);       // we've used a proxy of localhost so we can directly write /api/users
                console.log(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        }
    }*/

    async function onSubmit(e){
        e.preventDefault();
        if(password !== password2){
            dispatch(setAlert('Passwords do not match', 'danger')); //will ensure the that the action is being dispatched to the reducer.
        }else{
            dispatch(register({name, email, password}));      //extracted from the formData component state
        }
    }

    //Redirect if logged in
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(isAuthenticated){
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        />
                </div>
                <div className="form-group">
                    <input type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange} />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
};

// Register.propTypes ={
//     setAlert: PropTypes.func.isRequired
// }

export default (Register);