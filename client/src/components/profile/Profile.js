
import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/spinner';
import { getProfileById } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';



const Profile = (props) => {
    const dispatch = useDispatch();
    const profileState = useSelector(state => state.profile);
    const {profile, loading} = profileState;
    
    const auth = useSelector(state => state.auth);
    
    useEffect(() => {
        dispatch(getProfileById(props.match.params.id))
    }, [dispatch, getProfileById, props.match.params.id ]);  // eslint-disable-next-line react-hooks/exhaustive-deps
         //will run immediately when profile mounts

    return(
        <Fragment>
            {profile === null || loading ? <Spinner /> : <Fragment>
                <Link to='/profiles' className='btn btn-light'>
                    Back to Profiles
                </Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                    <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}

                    <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    </div>
            </Fragment> }
        </Fragment>

    )
} 

export default Profile;