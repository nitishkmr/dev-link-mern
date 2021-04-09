//handle getting web token for auth
const express = require('express');

const router = express.Router();   

// @route   GET api/auth
// @desc    Test Route
// @access  Public (no need of token to be passed here for auth)
router.get('/', (req, res) => res.send('Auth Route'))

module.exports = router;