const express = require("express");

const welfare = require('../controllers/welfare.controller');

let { checkToken } = require('../utils/middleware.js');

const router = express.Router();

router.route('/welfare').get(checkToken, welfare.getRequests);
router.route('/welfare').post(checkToken, welfare.createRequest);

module.exports = router;