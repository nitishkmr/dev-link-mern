// for registering users
const express = require('express');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');  //used to check or validate proper email/pass etc


const router = express.Router();    //Router class can be used to create modular mountable route handlers. A Router instance is a complete middleware and routing system; for this reason it is often referred to as a “mini-app”.
// Basically for large apps, if we are separating out the modules (and the .get .post routes etc) then Router is used

// @route   POST api/users
// @desc    Register user
// @access  Public (no need of token to be passed here for auth)
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;   //Destructured
        try {
            // See if the user exists (only new users are to be allowed)
            let user = await User.findOne({ email: email });
            if (user) {
                return
                res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            // Get user's gavatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name,    // same as name: name
                email,
                avatar,
                password    //at this moment pass is not encrypted.. so before .save() we've to encrypt it
            });

            // Encrypt the pass using bcrypt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();  //anything that returns a promise should be used with await or .then()


            // Return jsonwebtoken
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
            );  //now that the token will be created, we have to send it to access the protected routes, middleware will do it

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;