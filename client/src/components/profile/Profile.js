
import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/spinner';
import { getProfileById } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = (props) => {
    const dispatch = useDispatch();
    const profileState = useSelector(state => state.profile);
    const { profile, loading } = profileState;
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getProfileById(props.match.params.id))
    }, [dispatch, getProfileById, props.match.params.id]);  // eslint-disable-next-line react-hooks/exhaustive-deps
    //will run immediately when profile mounts

    return (
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
                    <div className='profile-exp bg-white p-2'>
                        <h2 className='text-primary'>Experience</h2>
                        {profile.experience.length > 0 ? (
                            <Fragment>
                                {profile.experience.map(experience => (
                                    <ProfileExperience
                                        key={experience._id}
                                        experience={experience}
                                    />
                                ))}
                            </Fragment>
                        ) : (
                            <h4>No experience credentials</h4>
                        )}
                    </div>
                    <div className='profile-edu bg-white p-2'>
                        <h2 className='text-primary'>Education</h2>
                        {profile.education.length > 0 ? (
                            <Fragment>
                                {profile.education.map(education => (
                                    <ProfileEducation
                                        key={education._id}
                                        education={education}
                                    />
                                ))}
                            </Fragment>
                        ) : (
                            <h4>No Education credentials</h4>
                        )}
                    </div>

                    {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername} />
                    )}
                </div>
            </Fragment>}
        </Fragment>

    )
}

export default Profile;