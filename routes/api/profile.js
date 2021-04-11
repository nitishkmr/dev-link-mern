// adding fetching updating of profiles
const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private (token needs to be passed here for auth for a user)
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile                        //  'user' is from the Schema from Profile model and corresponds to the ObjectID
            .findOne({ user: req.user.id })                  //  'req.user.id' is from the token being sent / auth on this route
            .populate('user', ['name', 'avatar']);           // here user, name, avatar came from users.js in models
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});



// @route   POST api/profile
// @desc    Create/Update user profile
// @access  Private (token needs to be passed here for auth for a user)
router.post('/',
    [
        auth,                                         // **** middlewares are inserted on the second param and since here two middlewares are req        
        [                                            // one is 'auth' and second is the 'check'
            check('status', 'Status is required')
                .not().isEmpty(),       //is not empty
            check('skills', 'Skills is required')
                .not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());    // trim to remove extra spaces
        }

        // Build social object
        profileFields.social = {}   //needs to be defined like this first else .social would be undefined
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id })  // user for Profile model is actually the _id which comes from the token

            if (profile) {
                //Update if profile exists
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields}, {new: true});   
                return res.json(profile);
            };

            // Create a new profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);


module.exports = router;