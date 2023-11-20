const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const blackListSchema = new Schema({
    token: {
        type: String,
        required: true,
        ref: 'User',
    }
});

module.exports = mongoose.model('Blacklist', blackListSchema);