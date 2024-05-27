// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Book = require('../models/book'); // Import the Book model
const {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
    bulkDeleteBooks
} = require('../controllers/bookController');

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

router.post('/', auth, createBook);
router.get('/', auth, getBooks);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);
router.delete('/', auth, bulkDeleteBooks);

module.exports = router;
