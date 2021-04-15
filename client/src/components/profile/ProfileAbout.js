import React, { Fragment } from 'react';

const ProfileAbout = (props) => {

    const { profile: {
        bio,
        skills,
        user: { name }
    } } = props;

    return (
        <div className="profile-about bg-light p-2">
            {bio && (   //show only if bio is present as it's optional
                <Fragment>
                    <h2 className="text-primary">{name.split(' ')[0]}s Bio</h2>
                    <p>{bio}</p>
                </Fragment>
            )}
            <div className="line"></div>
            <h2 className='text-primary'>Skill Set</h2>
            <div className='skills'>
                {skills.map((skill, index) => (
                    <div key={index} className='p-1'>
                        <i className='fas fa-check' /> {skill}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileAbout;