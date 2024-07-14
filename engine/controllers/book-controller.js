const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("../models/database"); // Assuming your user model is in a models directory
const secret_key = process.env.JWT_SECRET;
const sendgrid = require("../utils/services/sendgrid");
const sendEmail = sendgrid.sendEmailWithSendGrid;

exports.getTrendingBooks = async (req, res) => {
    try {
        const topBooks = await database.Book.find().sort({ rating: -1 }).limit(5);
        return res.status(200).json({ message: "Books fetched successfully", books: topBooks });
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getNewArrivalBooks = async (req, res) => {
    try {
        // Fetch the books sorted by the date they were added, in descending order
        const newArrivals = await database.Book.find().sort({ date: -1 }).limit(5);
        res.status(200).json({ message: "Books fetched successfully", books: newArrivals });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const { field, text, page = 1, limit = 16 } = req.query;
        
        const query = {};
        if (field && text) {
            query[field] = new RegExp(text, 'i'); // Case-insensitive regex search
        }

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: field && text ? {} : { rating: -1 } // Sort by rating if no search query
        };

        const books = await database.Book.paginate(query, options);
        
        return res.status(200).json({
            message: "Books fetched successfully",
            books: books.docs,
            totalPages: books.totalPages,
            currentPage: books.page
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// getBookById
exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await database.Book.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        return res.status(200).json({ message: "Book fetched successfully", book });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};