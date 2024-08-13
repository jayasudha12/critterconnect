const express = require('express');
const router = express.Router();
const cartcontroller = require('../controller/CartController');
const auth = require("../middleware/auth")

router.post('/addtocart',auth,cartcontroller.addtocart);
router.get('/getcart',auth,cartcontroller.getcart);
router.delete('/deletecart/:petid',auth,cartcontroller.deletecart);
module.exports = router;