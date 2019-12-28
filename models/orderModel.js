const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema({
    id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({
    orders: [order]
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

