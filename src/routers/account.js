const express = require('express');
const bodyParser = require('body-parser');

const signupModel = require('../model/signup.js');
const loginModel = require('../model/login.js');
const otherModel = require('../model/other.js');
const router = express.Router();

router.use(bodyParser.json());

// Sign Up
router.post('/signup', function (req, res, next) {

    const {
        username,
        password
    } = req.body;

    if (!username || !password) {
        const err = new Error('Somethings are required!');
        err.status = 400;
        throw err;
    }

    signupModel.create(username, password).then(infor => {
        if (!infor) {
            const err = new Error('Account Exist!');
            err.status = 400;
            throw err;
        }
        res.json(infor);

    }).catch(next);
});

// Log In
router.post('/login', function (req, res, next) {

    const {
        username,
        password
    } = req.body;

    if (!username || !password) {
        const err = new Error('Somethings are required!');
        err.status = 400;
        throw err;
    }

    loginModel.verify(username).then(infor => {

        if (!infor) {
            const err = new Error('Wrong Account!');
            err.status = 400;
            throw err;
        }

        if (infor.password == password) {
            res.json(infor);
        } else {
            const err = new Error('Wrong Password!');
            err.status = 400;
            throw err;
        }

    }).catch(next);
});

// Show All Information
router.post('/show', function (req, res, next) {
    
        otherModel.show().then(infor => {
            res.json(infor);
        }).catch(next);
    
    });

module.exports = router;