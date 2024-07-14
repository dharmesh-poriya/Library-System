const database = require("../models/database")
const Book = database.Book; // Ensure the correct path to your Book model
const User = database.User; // Ensure the correct path to your User model
const Borrow = database.Borrow; // Ensure the correct path to your Borrow model
const Notification = database.Notification;

// Add Book
exports.addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        return res.status(201).json({ book, message: "Book added successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Edit Book
exports.editBook = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['isbn', 'title', 'author', 'publisher', 'date', 'genre', 'quantity', 'available', 'categories', 'thumbnail', 'previewLink', 'rating'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates!' });
        }

        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        updates.forEach((update) => book[update] = req.body[update]);
        await book.save();
        res.status(200).json({ message: "Book updated sucessfully", book });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete Book
exports.deleteBook = async (req, res) => {
    try {
        const borrowRecord = await Borrow.findOne({ book: req.params.id, returnDate: null });
        if (borrowRecord) {
            return res.status(400).json({ message: 'Book cannot be deleted as it is currently borrowed by a user' });
        }

        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// List Librarians
exports.listLibrarians = async (req, res) => {
    try {
        const librarians = await User.find({ role: 'Librarian' });
        return res.status(200).json({ message: "Librarians fetched successfully", librarians });
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add Librarian
exports.addLibrarian = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const librarian = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role: 'Librarian' 
        });

        await librarian.save();
        return res.status(201).json({ librarian: librarian.getPublicProfile() });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Edit Librarian Details
exports.editLibrarian = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        const librarian = await User.findOne({ _id: req.params.id, role: 'Librarian' });
        if (!librarian) {
            return res.status(404).json({ error: 'Librarian not found' });
        }

        updates.forEach((update) => librarian[update] = req.body[update]);
        if (req.body.password) {
            librarian.password = await bcrypt.hash(req.body.password, 8);
        }
        await librarian.save();
        res.status(200).json({ librarian: librarian.getPublicProfile() });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete Librarian
exports.deleteLibrarian = async (req, res) => {
    try {
        const librarian = await User.findOneAndDelete({ _id: req.params.id, role: 'Librarian' });
        if (!librarian) {
            return res.status(404).json({ message: 'Librarian not found' });
        }
        return res.status(200).json({ message: 'Librarian deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};