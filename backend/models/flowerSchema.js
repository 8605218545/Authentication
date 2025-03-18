const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flowerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes extra spaces
    },
    image: {
        type: String,
        // required: true,
    },
    details: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const Flower = mongoose.model("Flower", flowerSchema);
module.exports = Flower;
