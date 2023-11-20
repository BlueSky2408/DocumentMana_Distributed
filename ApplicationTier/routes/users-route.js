const express = require('express');
const { check } = require('express-validator');
const { Validate } = require('../middleware/validate');
const { Verify } = require('../middleware/verify');
// const getAllUsers = require('../controllers/users-controller');
// const signup = require('../controllers/users-controller');
const { getAllUsers, signup, login, logout, loggedInInfo } = require('../controllers/users-controller');
const router = express.Router();

router.get('/', getAllUsers);
router.post(
    '/signup',
    check('username').not().isEmpty().withMessage('Your username is required').trim().escape(),
    check('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
    check('password').notEmpty().isLength({ min: 8 }).withMessage('Must be at least 8 character long'),
    Validate,
    signup
);
router.post(
    '/login',
    check('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
    check('password').not().isEmpty(),
    Validate,
    login
);
router.get('/info', Verify, loggedInInfo);
router.post('/logout', logout);

module.exports = router;