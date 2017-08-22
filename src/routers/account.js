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

    signupModel.check_account(username).then(result => {
        if (result.length > 0) {
            const err = new Error('Account Exist!');
            err.status = 400;
            throw err;
        } else {
            signupModel.create(username, password).then(infor => {
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
            if (infor[0].password == password) {
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

// List Photos
router.get('/photos', function (req, res, next) {
    const {
        account
    } = req.query;
    photoModel.list_photos(account).then(photos => {
        res.json(photos);
    }).catch(next);
});

// Store Location
router.post('/store_location', function (req, res, next) {

    const {
        account,
        lat,
        lng
    } = req.body;

    photoModel.store_location(account, lat, lng).then(infor => {
        res.json(infor);
    }).catch(next);
});

// Get Store Location
router.post('/get_store_location', function (req, res, next) {

    const {
        account
    } = req.body;

    photoModel.get_store_location(account).then(infor => {
        res.json(infor);
    }).catch(next);
});

// Store Photo Url
router.post('/store_photo_url', function (req, res, next) {

    const {
        account,
        url
    } = req.body;

    photoModel.store_photo_url(account, url).then(infor => {
        res.json(infor);
    }).catch(next);
});

// Store Current Position
router.post('/store_current_position', function (req, res, next) {

    const {
        account,
        lat,
        lng
    } = req.body;

    photoModel.store_current_position(account, lat, lng).then(infor => {
        res.json(infor);
    }).catch(next);
});

// Show All Information
router.post('/show', function (req, res, next) {

    otherModel.show().then(infor => {
        res.json(infor);
    }).catch(next);

});

module.exports = router;