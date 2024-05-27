// models/book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    publishDate: { type: Date, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Book', BookSchema);
