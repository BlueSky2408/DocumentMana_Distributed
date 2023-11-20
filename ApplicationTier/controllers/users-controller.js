const Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackLists = require('../model/blackLists');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users found" });
        }
        res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const signup = async (req, res) => {
    //Get the variables from the request body, using ES6 object destructing
    const { username, email, password } = req.body;
    try {
        //Check if user aleardy exists
        let existUser = await Users.findOne({ email }); // Use findOne to search for a user by email
        if (existUser) {
            return res.status(400).json({
                status: 'failed',
                data: [null],
                message: "User already exists! Login instead"
            });
        }

        //Create an instance of a user
        const newUser = new Users({
            username,
            email,
            password,
        });
        const savedUser = await newUser.save(); //Save new user into the database
        const { password: dbPassword, ...user_data } = savedUser._doc; //Return user object, but the password
        return res.status(200).json({
            status: 'success',
            data: [user_data],
            message: "User registered successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            code: 500,
            data: null,
            message: "Server error"
        });
    }
};

const login = async (req, res) => {
    //Get a variable from the login process
    const { email } = req.body;
    try {
        //Check if user exists
        const existUser = await Users.findOne({ email });
        if (!existUser) {
            return res.status(404).json({
                status: 'failed',
                data: [],
                message: "Couldn't find user! Perhaps register instead"
            });
        }

        //If user exists, validate the password
        const isPassTrue = await bcrypt.compare(req.body.password, existUser.password);
        // const isPassTrue = bcrypt.compare(`${req.body.password}`, existUser.password);
        //If not valid, return an unauthorized response
        if (!isPassTrue) {
            return res.status(401).json({
                status: 'failed',
                data: [],
                message: "Incorrect password!"
            });
        }

        let option = {
            maxTime: 20 * 60 * 1000, //The session will expires in 20 minutes
            httpOnly: true, //The cookie is only accessible by the web browser
            secure: true,
            sameSite: 'None',
        }
        //Generate session token for the user
        const token = existUser.generateAccessJWT();
        //Set the token to response header, so that the client sends it back on each subsequent request
        res.cookie('SessionID', token, option);
        const { password, ...user_data } = existUser._doc; //Return user object, but the password
        res.status(200).json({
            status: 'success',
            data: [user_data],
            accessToken: [token],
            message: "Login Successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            data: [],
            message: "Server error"
        });
    }
}

const loggedInInfo = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            data: [],
            message: "Error in fetching logged user info"
        });
    }
}

const logout = async (req, res) => {
    try {
        const auth = req.headers['cookie']; //Get the session cookie from the request header
        if (!auth) return res.sendStatus(204); //No content
        const cookie = auth.split('=')[1]; //If there is, split the cookie string to get the actual jwt token
        const accessToken = cookie.split(';')[0];
        const checkIfBlackListed = await blackLists.findOne({ token: accessToken }); //Check if that token is blacklisted
        //If true, send a no content response
        if (checkIfBlackListed) return res.sendStatus(204);
        //otherwise, blacklist the token
        const newBlacklist = new blackLists({
            token: accessToken,
        });
        await newBlacklist.save();
        //Clear request cookie on client
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');
        res.status(200).json({
            data: [newBlacklist],
            message: 'You have been loged out!'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: "Server error"
        });
    }
}

module.exports = { getAllUsers, signup, login, logout, loggedInInfo };