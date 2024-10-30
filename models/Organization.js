const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orgoanizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    funds: {
        type: Number, 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Organization', orgoanizationSchema);