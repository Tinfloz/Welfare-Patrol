const express = require("express");

const users = require('../controllers/users.controller');
let { checkToken } = require('../utils/middleware.js');

const router = express.Router();

router.route('/signIn').post(users.signIn);
router.route('/signUp').post(users.signUp);
router.route('/profile').post(checkToken, users.profile);
router.route('/reverseGeoCode').get(checkToken, users.reverseGeoCode);

module.exports = router;