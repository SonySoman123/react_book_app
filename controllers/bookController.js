// controllers/bookController.js
const Book = require('../models/book');

exports.createBook = async (req, res) => {
    const { name, description, publishDate, price } = req.body;
    try {
        const newBook = new Book({ name, description, publishDate, price, user: req.user.id });
        const book = await newBook.save();
        res.json(book);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getBooks = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    try {
        const books = await Book.find({
            user: req.user.id,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Book.countDocuments({
            user: req.user.id,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        });

        res.json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateBook = async (req, res) => {
    const { name, description, publishDate, price } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        book.name = name;
        book.description = description;
        book.publishDate = publishDate;
        book.price = price;

        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await book.remove();
        res.json({ message: 'Book removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.bulkDeleteBooks = async (req, res) => {
    try {
        const { ids } = req.body;
        await Book.deleteMany({ _id: { $in: ids }, user: req.user.id });
        res.json({ message: 'Books removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
