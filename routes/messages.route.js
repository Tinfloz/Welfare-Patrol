const express = require("express");

const messages = require('../controllers/messages.controller');

let { checkToken } = require('../utils/middleware.js');

const router = express.Router();

router.route('/:id').get(checkToken, messages.getMessages);

module.exports = router;