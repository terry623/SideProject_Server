const express = require('express');
const bodyParser = require('body-parser');

const signupModel = require('../model/signup.js');
const loginModel = require('../model/login.js');

const router = express.Router();

router.use(bodyParser.json());

// Sign Up
router.post('/signup', function (req, res, next) {
    const {
        email,
        account,
        password
    } = req.body;
    if (!email || !account || !password) {
        const err = new Error('Somethings are required');
        err.status = 400;
        throw err;
    }
    signupModel.create(email, account, password).then(infor => {
        res.json(infor);
    }).catch(next);
});

// Log In
router.post('/login', function (req, res, next) {
    const {
        account,
        password
    } = req.body;
    if (!account || !password) {
        const err = new Error('Somethings are required');
        err.status = 400;
        throw err;
    }
    loginModel.verify(account,password).then(infor => {
        res.json(infor);
    }).catch(next);
});



module.exports = router;