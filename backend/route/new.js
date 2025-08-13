const express= require('express');
const {register} = require('../controller/new.js');
const router = express.Router();
router.post('/teachear/register', register);





module.exports = router;