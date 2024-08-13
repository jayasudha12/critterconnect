const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    pets: [{
        petid: String,
        quantityofpets: Number
    }],
    totalamount: {
        type: Number,
        required: true
    },
    orderdate: {
        type: Date,
        default: Date.now
    },
    estimatedate: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days from now
        }
    },
    orderstatus: {
        type: String,
        default: "In progress"
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
