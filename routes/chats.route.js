const express = require("express");

const chats = require('../controllers/chats.controller');

let { checkToken } = require('../utils/middleware.js');

const router = express.Router();

router.route('/').get(checkToken, chats.getChats);

module.exports = router;