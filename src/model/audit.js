/**
 * Schema for the Audit object in MongoDB.  This collection is capped so that only a certain number of documents
 * can exist in it at a time.  Documents also have a set time to live so they will be deleted after a certain time.
 * @author Andrew Jarombek
 * @since 2/27/2018
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditSchema = new Schema({
    time: {
        type: Date,
        default: Date.now(),
        expires: 604800 // Expires after a week
    },
    object: Schema.Types.ObjectId,
    type: {
        type: String,
        required: true,
        enum: ['user', 'post']
    },
    message: {
        type: String,
        required: true
    },
    source: String
}, { capped: { size: 8192, max: 100, autoIndexId: true }});

AuditSchema.index({time: 1});
AuditSchema.index({object: 1});

module.exports = mongoose.model('Audit', AuditSchema, 'audit');