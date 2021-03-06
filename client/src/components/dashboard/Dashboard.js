// fetch all our data here from redux state and then pass it down to other components like exp and edu components
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {           // gets invoked right after a React component has been mounted aka after the first render() lifecycle
        // will run once only in the beginning due to , []
        dispatch(getCurrentProfile());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        // loading is there in profile also which is set to True when profile is loaded, untill then show Spinner
        profile.loading && profile.profile === null ? <Spinner /> :
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user" /> Welcome {auth.user && auth.user.name}
                </p>
                {profile.profile != null ?
                    <Fragment>
                        <DashboardActions />
                        <Experience experience={profile.profile.experience} />
                        <Education education={profile.profile.education} />
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                                <i className="fas fa-user-minus"></i>  Delete My Account
                            </button>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>}
            </Fragment>

    )
}

export default Dashboard;



// import React from 'react';

// const Dashboard = () => {
//     return(
//         <div>
//             Dashboard
//         </div>
//     )
// } 

// export default Dashboard;