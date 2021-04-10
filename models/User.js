// models and schema for databases

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true        // same emails are not allowed to be reg
    },
    password: {
        type: String,
        required: true
    },
    avatar: {       //for gravatar
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);