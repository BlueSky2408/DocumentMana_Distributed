const Users = require('../model/users');
const jwt = require('jsonwebtoken');
const Blacklists = require('../model/blackLists');
const cookieParser = require('cookie-parser');

const jwtSecret = process.env.SECRET_ACCESS_TOKEN;

const Verify = async (req, res, next) => {
    const cookies = cookieParser.JSONCookies(req.cookies); // Parse cookies
    const token = cookies['SessionID']; // Get the token in the cookies

    if (!token) return res.sendStatus(401); //If there is no cookie from the request header, send an unauthorized response

    const checkIfBlackListed = await Blacklists.findOne({ token }); //Check if that token is blacklisted
    //If true, send an unauthorized message, asking for a re-authentication
    if (checkIfBlackListed)
        return res
            .status(401)
            .json({ message: 'This session has expired. Please re-login' });
    //If token has not been blacklisted, verify with jwt to see if it has been tampered or not.
    //that's like checking the integrity of the cookie
    jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
            //If token has been altered, return a forbidden error
            return res
                .status(403)
                .json({ message: 'Invalid token' });
        }

        const user = await Users.findById(decoded.id); // Get user by id
        if (!user) return res.status(401).json({ message: 'User not found' }); //If not found, return error

        req.user = { ...user._doc, password: undefined }; //Return user object but the password
        next();
    });
}

module.exports = { Verify };