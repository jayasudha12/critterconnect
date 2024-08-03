const express = require('express');
const router = express.Router();
const petcontroller = require('../controller/PetController');

router.post('/register',petontroller.register);


module.exports = router;