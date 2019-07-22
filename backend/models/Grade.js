const mongoose = require('mongoose');
const { Schema } = mongoose;

const Grade = new Schema({
    name: String,
    credit: Number,
    type: String,
    grade: String
});

module.exports = mongoose.model('Grade', Grade);