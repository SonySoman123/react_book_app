// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Assuming you have a Book model

router.get('/books', async (req, res) => {
    // try {
    //     const { search = '', page = 0, limit = 5 } = req.query;
    //     const searchQuery = search ? { $or: [{ name: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }] } : {};
    //     const skip = parseInt(page) * parseInt(limit);
    //     const [books, totalBooks] = await Promise.all([
    //         Book.find(searchQuery).skip(skip).limit(parseInt(limit)),
    //         Book.countDocuments(searchQuery)
    //     ]);
    //     const pageCount = Math.ceil(totalBooks / limit);
    //     res.json({ books, pageCount });
    // } catch (error) {
    //     console.error('Error fetching books:', error);
    //     res.status(500).json({ message: 'Server error' });
    // }
});

router.post('/bulk-delete', async (req, res) => {
    try {
        console.log("req starts");
        console.log(req);
        console.log("req ends");
        console.log("res starts");
        console.log(res);
        console.log("res ends");
        const { ids } = req.body;
        await Book.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Books deleted' });
    } catch (error) {
        console.error('Error deleting books3333:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
