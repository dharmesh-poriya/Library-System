const database = require("../models/database")

const Book = database.Book;
const User = database.User;
const Borrow = database.Borrow;
const Notification = database.Notification;
const sendgrid = require("../utils/services/sendgrid");
const sendEmail = sendgrid.sendEmailWithSendGrid;
const borrowedInformationTemplate = require("../utils/email-templates/borrowedInformation")
const returnBookNotification = require("../utils/email-templates/returnBookNotification")
const generateBookOverdueTemplate = require("../utils/email-templates/returnRemeinderInformation")

// Assign Book to User
exports.assignBook = async (req, res) => {
    try {
        const { bookId, userId } = req.body;

        // Find the book and check availability
        const book = await Book.findById(bookId);
        if (!book || book.available < 1) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        // Find the user
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Create a new borrow record
        const borrow = new Borrow({
            user: userId,
            book: bookId,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now,
        });
        user.borrowedBooks.push(borrow._id);
        await user.save();
        await borrow.save();

        // Update book availability
        book.available -= 1;
        await book.save();
        
        await sendEmail(
            "You have been assigned the Book",
            [user.email],
            borrowedInformationTemplate.generateBorrowInfoEmail(book.title, Date.now(), Date(Date.now() + 14 * 24 * 60 * 60 * 1000))
        )

        return res.status(201).json({ message: "Book assigned successfully", borrow });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Take Back Book from User
exports.takeBackBook = async (req, res) => {
    try {
        const { bookId, userId } = req.body;

        // Find the borrow record
        const borrow = await Borrow.findOne({ book: bookId, user: userId, returnDate: null });
        if (!borrow) {
            return res.status(400).json({ message: 'Borrow record not found or book already returned' });
        }

        // Update the borrow record with return date
        borrow.returnDate = new Date();
        const dueDate = new Date(borrow.dueDate);
        const returnDate = new Date(borrow.returnDate);

        // Calculate late fee if any
        if (returnDate > dueDate) {
            const lateDays = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
            borrow.lateFee = lateDays * 1; // Assuming $1 per day late fee
            borrow.status = "Returned";
        }

        await borrow.save();

        // Update book availability
        const book = await Book.findById(bookId);
        book.available += 1;
        await book.save();
        await sendEmail(
            "You have returned the Book",
            [user.email],
            returnBookNotification.generateReturnBookEmail(book.title)
        );
        return res.status(200).json({ message: "Book returned successfully", borrow });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.sendNotificationsForDuedBook = async (req, res) => {
    try {
        const { bookId, userId } = req.body;

        // Find the book
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the borrow record
        const borrow = await Borrow.findOne({ book: bookId, user: userId, returnDate: null });
        if (!borrow) {
            return res.status(400).json({ message: 'Borrow record not found or book already returned' });
        }

        // Check if the book is overdue
        const dueDate = new Date(borrow.dueDate);
        const currentDate = new Date();
        if (currentDate <= dueDate) {
            return res.status(400).json({ message: 'Book is not overdue yet' });
        }

        // Send notification to the user
        const notification = new Notification({
            user: userId,
            book: bookId,
            message: `The book "${book.title}" is overdue. Please return it as soon as possible.`,
            date: new Date()
        });
        await notification.save();
        await sendEmail(
            "Remeinder to Return the Book",
            [user.email],
            generateBookOverdueTemplate.generateBookOverdueTemplate(book.title, borrow.dueDate)
        );
        return res.status(200).json({ message: 'Notification sent successfully', notification });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};