const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/WishlistController');
const auth = require("../middleware/auth");

router.post('/addwishlist', auth, wishlistController.addToWishlist);
router.get('/getwishlist', auth, wishlistController.getWishlist);
router.delete('/removewishlist/:petId', auth, wishlistController.removeFromWishlist);


module.exports = router;
