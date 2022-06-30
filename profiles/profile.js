const mongoose = require("mongoose");

module.exports = mongoose.model("Profile", new mongoose.Schema({
    name: String,
    salt: String,
    hash: String,
    points: Number,
    admin: Boolean
}));
