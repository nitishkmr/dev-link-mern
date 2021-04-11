// adding fetching updating of profiles
const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

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

module.exports = router;