import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {addEducation} from '../../actions/profile';

const AddEducation = (props) => {
    const dispatch = useDispatch();  
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const { school, degree, fieldofstudy, from, to, current, description } = formData;
    
    // for if current job or not, then 'to' date needs to be disabled and vice versa
    const [toDateDisabled, toggleDisabled] = useState(false);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e =>{
        e.preventDefault();
        dispatch(addEducation(formData, props.history));
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
      </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have participated in.
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={e=>onChange(e)}  required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* School or bootcamp" name="school" value={school} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={e=>onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e=>onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={e=>{
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                        }} /> Current </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e=>onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description} onChange={e=>onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
} 

export default withRouter(AddEducation);