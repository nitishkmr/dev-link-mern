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
        // ****more about populate later in this file

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
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
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


// @route   GET api/profile
// @desc    Get all the profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        //.find() will send all the profiles and there will be a 'user' field as defined in Profile Schema 
        // but it will contain like this "user": "6071ee918bd86b31f8102143" as user is defined with ObjectID in the Profile Schema

        //.populate('user') uses the ref: 'user' defined in Profile model, and the ['name', 'avatar'] will ensure that
        // only name and avatar is sent back in user: {} so now 
        // "user": {
        //     "_id": "6071ee918bd86b31f8102143",
        //     "name": "Nitish",
        //     "avatar": "//www.gravatar.com/avatar/4adcca49b3b1e5a08ac202f5d5a9e688?s=200&r=pg&d=mm"
        // },
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (error) {
        // console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    Delete profile, user and posts
// @access  Private - token will be required (private and protected route)
router.delete('/', auth, async (req, res) => {
    try {
        // token will have the user's _id
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});


// Experience -> can be multiple experience, so it's created as an array in Profile Model

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private - token will be required (private and protected route)

router.put('/experience',
    [
        auth,
        [
            check('title', 'Title is required')
                .not().isEmpty(),
            check('company', 'Company is required')
                .not().isEmpty(),
            check('from', 'From date is required')
                .not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, company, location, from, to, current, description } = req.body;

        const newExp = {
            title,          // same as title: title
            company,
            location,
            from,
            to,
            current,
            description
        };

        //Now connect to DB
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);     //same as profile.experience.push(newExp).. 
            // just this one pushes from the start so the latest ones are at the top
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });


// @route   DELETE (could've been PUT also) api/profile/experience/:exp_id
// @desc    Delete experience from a profile
// @access  Private - token will be required (private and protected route)

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id});
        
        //Get the index of the exp to be removed
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
});

module.exports = router;