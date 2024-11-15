const express = require('express');
const auth = require('../../auth');

const router = express.Router();


router.post('', auth.getAuthToken);

module.exports = router;
