const express = require('express');
const router = express.Router();
const petcontroller = require('../controller/PetController');
const auth = require("../middleware/auth")

router.post('/addpet',auth,petcontroller.addpet);
router.get('/getpet/:pettype',petcontroller.getpet);
router.patch('/editpet/:id',auth,petcontroller.editpet);
router.get('/getpetsuser',auth,petcontroller.getPetsByUser);
router.delete('/deletepet/:id',auth,petcontroller.deletepet)

module.exports = router;