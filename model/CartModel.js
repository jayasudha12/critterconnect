const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userid: {
        type: String, 
        required: true
    },
    pets: [{
        petid: {
            type: String, 
            required: true
        },
        quantityofpets: { 
            type: Number
        }
    }]
});

module.exports = mongoose.model('Cart', CartSchema);
