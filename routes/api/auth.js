//handle getting web token for auth
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');  //used to check or validate proper email/pass etc



// @route   GET api/auth
// @desc    Test Route
// @access  Public (no need of token to be passed here for auth)
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');  //password wont be returned in the string
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    
    res.send('Auth Route')
});

//whenever want to use the functionality of a middleware, add it as the second parameter

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public (no need of token to be passed here for auth)
router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;   //Destructured
        try {

            let user = await User.findOne({ email: email });
            if (!user) {
                return
                res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password)   //password is the plain text pass entered by the user 
                                                                            //user.password is the encrypted pass requested from the DB (if user exists)

            if(!isMatch){
                  return res
                  .status(400)
                  .json({ errors: [{ msg: 'Invalid Credentials' }] });   
            }                                                       

            const payload = {
                user: {
                    id: user._id // (or user.id is also supported by mongoose)
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            ); 
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    })

module.exports = router;