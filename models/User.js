const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    funds: {
        type: Number, 
        required: true
    }, 
    isReciever: {
        type: Boolean, 
        required: true
    }, 
    finStatus: {
        type: Number,
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);