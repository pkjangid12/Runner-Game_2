const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Score",
    scoreSchema
);