import mongoose, { models } from "mongoose";

const productsSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'brand'
    },
    model: {
        type: mongoose.Types.ObjectId,
        ref: 'model'
    },
    price: {
        type: Number,
        required: true
    },
    features: [String],
    description: {
        type: String,
        required: true
    },
    colors: [{
        type: String,
        required: true
    }],
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        value: { type: Number, min: 0 },
        count: { type: Number, min: 0 },
    }
});

module.exports = models.products || mongoose.model("products", productsSchema);