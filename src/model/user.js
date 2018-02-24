/**
 * Schema for the User object in MongoDB
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        match: /^[a-zA-Z0-9]+$/,
        validate: [
            function (username) {
                return username.length <= 15;
            },
            'Username must be less than 15 characters'
        ]
    },
    first: {
        type: String,
        trim: true,
        required: true,
        match: /^[a-zA-Z-']+$/,
        validate: [
            function (first) {
                return first.length <= 31;
            },
            'First Name must be less than 31 characters'
        ]
    },
    last: {
        type: String,
        trim: true,
        required: true,
        match: /^[a-zA-Z-']+$/,
        validate: [
            function (last) {
                return last.length <= 31;
            },
            'Last Name must be less than 31 characters'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        match: /^[^\s]+$/
    }
});

UserSchema.index({username: 1});

module.exports = mongoose.model('User', UserSchema, 'user');