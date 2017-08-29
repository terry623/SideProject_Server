const express = require('express');
const bodyParser = require('body-parser');

const signupModel = require('../model/signup.js');
const loginModel = require('../model/login.js');
const photoModel = require('../model/photo.js');
const chatModel = require('../model/chat.js');
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
                otherModel.show_all_users().then(people => {
                    people.map(result => {
                        if (infor.username !== result.username) {
                            chatModel.add_friends(infor.username, result.username).then(relationship => {
                                console.log(relationship.client_1 + " & " + relationship.client_2 + " become friends");
                            }).catch(next);
                        }
                    });
                }).catch(next);
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
        pitch,
        time
    } = req.body;

    photoModel.store_current_position(account, lat, lng, heading, pitch, time).then(infor => {
        chatModel.search_friends(account).then(all_friends => {
            all_friends.map(friend => {
                var distance = get_distance_from_lat_lng(lat, lng, friend.current_lat, friend.current_lng);
                chatModel.update_distance(account, friend.username, distance).then(result => {
                    console.log(result.client_1 + " & " + result.client_2 + " distance is " + result.distance + " km");
                }).catch(next);
            });
        }).catch(next);
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

// List Photos
router.get('/list_photos', function (req, res, next) {

    const {
        account
    } = req.query;

    photoModel.get_photo_infor(account).then(infor => {
        res.json(infor);
    }).catch(next);

});

// Store Socket Id
router.post('/store_socket_id', function (req, res, next) {

    const {
        account,
        socket_id
    } = req.body;

    chatModel.store_socket_id(account, socket_id).then(infor => {
        res.json(infor);
    }).catch(next);

});

// Get Target Socket Id
router.post('/get_target_socket_id', function (req, res, next) {

    const {
        account
    } = req.body;

    chatModel.get_target_socket_id(account).then(infor => {
        res.json(infor);
    }).catch(next);

});

// Find Friends Around You
router.post('/find_friends_around_you', function (req, res, next) {
    
    const {
        account
    } = req.body;

    chatModel.find_friends_around_you(account).then(infor => {
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

// Show All Distance
router.post('/show_all_distance', function (req, res, next) {
    
        otherModel.show_all_distance().then(infor => {
            res.json(infor);
        }).catch(next);
    
    });

// Calculate Distance
function get_distance_from_lat_lng(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = router;