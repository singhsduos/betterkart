const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Required product name"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Required product description"]
    },

    price: {
        type: Number,
        required: [true, "Required product price"],
        maxlength: [6, "Price cannot exceed more than 6 characters"]
    },

    images: [{

        public_id: {
            type: String,
            required: true,
        },

        url: {
            type: String,
            required: true,
        }

    }],

    category: {
        type: String,
        required: [true, "Product category required"],
    },

    stock: {
        type: Number,
        required: [true, "Product stock required"],
        default: 1,
        maxlength: [5, "Stock cannot exceed more than 5 characters"]
    },

    numberOfReviews: {
        type: Number,
        default: 0,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    },

    reviews: [{

        name: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        },

        comments: {
            type: String,
            required: true,
        }

    }],

    createdAt: {

        type: Date,
        default: Date.now

    }


});

module.exports = mongoose.model("Product", productSchema); 