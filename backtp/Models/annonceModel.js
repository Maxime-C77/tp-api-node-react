const mongoose = require("mongoose");
const User = require("../Models/userModel");

const annonceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    livraison: {
        type: String,
        required: false
    },
    addresse: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    }
});

module.exports = mongoose.model("Annonce", annonceSchema);
