const express = require('express');
const router = express.Router();
const petcontroller = require('../controller/PetController');
const auth = require("../middleware/auth")

router.post('/addpet',auth,petcontroller.addpet);


module.exports = router;