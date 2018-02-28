/**
 * Schema for the Post object in MongoDB
 * @author Andrew Jarombek
 * @since 2/25/2018
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: Schema.Types.ObjectId,
    picture: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        validate: [
            function (desc) {
                return desc.length < 63;
            },
            'Name must be less than 63 characters'
        ]
    },
    username: {
        type: String,
        required: true
    },
    user_id: Schema.Types.ObjectId,
    first: String,
    last: String,
    date: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
        validate: [
            function (desc) {
                return desc.length < 255;
            },
            'Description must be less than 255 characters'
        ]
    },
    up: {
        type: Number,
        default: 0
    },
    down: {
        type: Number,
        default: 0
    }
});

PostSchema.index({username: 1});

module.exports = mongoose.model('Post', PostSchema, 'post');