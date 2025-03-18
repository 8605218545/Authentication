
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
})

// Use email as username for authentication and also get hashed form  and set username as email
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
// userSchema.plugin(passportLocalMongoose); 

const User = mongoose.model("User", userSchema);
module.exports = User;