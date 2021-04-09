// for registering users
const express = require('express');

const router = express.Router();    //Router class can be used to create modular mountable route handlers. A Router instance is a complete middleware and routing system; for this reason it is often referred to as a “mini-app”.
                                    // Basically for large apps, if we are separating out the modules (and the .get .post routes etc) then Router is used

// @route   GET api/users
// @desc    Test Route
// @access  Public (no need of token to be passed here for auth)
router.get('/', (req, res) => res.send('User Route'))

module.exports = router;