//middleware has access to req and res and then a callback 'next' to move to next piece of middleware 

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get the token from the header
    const token = req.header('x-auth-token');

    //Check if no token
    // (if the route is protected and is using this middleware)
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //If token is there, verify
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')); //decode the token
        req.user = decoded.user;       // => now the user can be used / allowed to access the route, user profile etc
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}