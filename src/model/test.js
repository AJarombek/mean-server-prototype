/**
 * Schema for the User object in MongoDB
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    time: Date
});

module.exports = mongoose.model('Test', TestSchema, 'test');