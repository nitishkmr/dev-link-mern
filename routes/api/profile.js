// adding fetching updating of profiles
const express = require('express');

const router = express.Router();   

// @route   GET api/profile
// @desc    Test Route
// @access  Public (no need of token to be passed here for auth)
router.get('/', (req, res) => res.send('Profile Route'))

module.exports = router;