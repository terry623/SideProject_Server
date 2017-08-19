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
        username,
        password
    } = req.body;
    if (!email || !username || !password) {
        const err = new Error('Somethings are required!');
        err.status = 400;
        throw err;
    }
    signupModel.create(email, username, password).then(infor => {
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
        if(infor[0].password == password){
            res.json({
                text:"Success!"
            });
        }else{
            res.json({
                text:"Fail!"
            });
        }
    }).catch(next);
});

module.exports = router;