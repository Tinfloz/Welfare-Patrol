const express = require("express");

const users = require('../controllers/users.controller');

const router = express.Router();

router.route('/signIn').post(users.signIn);
router.route('/signUp').post(users.signUp);

module.exports = router;