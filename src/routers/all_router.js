const express = require('express');
const bodyParser = require('body-parser');

const signupModel = require('../model/signup.js');
const loginModel = require('../model/login.js');
const photoModel = require('../model/photo.js');
const otherModel = require('../model/other.js');
const router = express.Router();

router.use(bodyParser.json());

// Sign Up
router.post('/signup', function (req, res, next) {

    const {
        username,
        password
    } = req.body;

    signupModel.check_username(username).then(result => {
        if (result.length > 0) {
            const err = new Error('Account Exist!');
            err.status = 400;
            throw err;
        } else {
            signupModel.create_account(username, password).then(infor => {
                res.json(infor);
            }).catch(next);
        }
    }).catch(next);

});

// Log In
router.post('/login', function (req, res, next) {

    const {
        username,
        password
    } = req.body;

    loginModel.verify(username).then(infor => {
        if (infor.length > 0) {
            if (infor[0].password === password) {
                res.json(infor);
            } else {
                const err = new Error('Wrong Password!');
                err.status = 400;
                throw err;
            }
        } else {
            const err = new Error('Wrong Account!');
            err.status = 400;
            throw err;
        }
    }).catch(next);

});

// Store Current Position
router.post('/store_current_position', function (req, res, next) {

    const {
        account,
        lat,
        lng,
        heading,
        pitch
    } = req.body;

    photoModel.store_current_position(account, lat, lng, heading, pitch).then(infor => {
        res.json(infor);
    }).catch(next);

});

// Store Photo Url
router.post('/store_photo_url', function (req, res, next) {

    const {
        account,
        photo_url
    } = req.body;

    photoModel.store_photo_url(account, photo_url).then(infor => {
        res.json(infor);
    }).catch(next);

});

// Get Last Position
router.post('/get_last_position', function (req, res, next) {

    const {
        account
    } = req.body;

    photoModel.get_user_infor(account).then(infor => {
        res.json(infor);
    }).catch(next);

});

// Store Travel Time
router.post('/store_travel_time', function (req, res, next) {

    const {
        account,
        travel_time
    } = req.body;

    photoModel.store_travel_time(account, travel_time).then(infor => {
        res.json(infor);
    }).catch(next);

});

// List Photos
router.get('/list_photos', function (req, res, next) {

    const {
        account
    } = req.query;

    photoModel.get_photo_infor(account).then(infor => {
        res.json(infor);
    }).catch(next);

});

// Show All Users
router.post('/show_all_users', function (req, res, next) {

    otherModel.show_all_users().then(infor => {
        res.json(infor);
    }).catch(next);

});

// Show All Photos
router.post('/show_all_photos', function (req, res, next) {

    otherModel.show_all_photos().then(infor => {
        res.json(infor);
    }).catch(next);

});

module.exports = router;