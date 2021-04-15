import React, {Fragment, useEffect} from 'react';
import Spinner from '../layout/spinner';
import { getProfiles } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import ProfileItem from './ProfileItem';


const Profiles = () => {
    const dispatch = useDispatch();
    const {profiles, loading} = useSelector(state => state.profile)

    useEffect(() => {
        dispatch(getProfiles());
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    return <Fragment>
        { loading ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with the developers
            </p>
             <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h4>No profiles found...</h4> }
            </div>
        </Fragment> }
    </Fragment>

};

export default Profiles;