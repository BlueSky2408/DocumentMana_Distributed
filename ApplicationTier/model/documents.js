const mongoose = require('mongoose');

// Define the schema for the documents model
const Schema = mongoose.Schema;
const docSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    size: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateModified: {
        type: Date,
        default: Date.now,
    },
    isFolder: {
        type: Boolean,
        default: false,
    },
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
    },
});

module.exports = mongoose.model('Document', docSchema);
