const express = require('express');

const router = express.Router();   

// @route   GET api/posts
// @desc    Test Route
// @access  Public (no need of token to be passed here for auth)
router.get('/', (req, res) => res.send('Posts Route'))

module.exports = router;