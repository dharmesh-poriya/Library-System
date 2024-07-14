const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const secret_key = process.env["JWT_SECRET"];
const mongoosePaginate = require('mongoose-paginate-v2');

// User Schema
const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Admin', 'Librarian', 'User'], required: true },
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Borrow' }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    tokens: [{ token: { type: String } }],
    isVerified: { type: Boolean, required: true, default: true },
}, { timestamps: true });

userSchema.methods.generateAuthToken = async function () {
    try {
      let newtoken = jwt.sign({ _id: this._id }, secret_key, {
        expiresIn: "30d",
      });
      this.tokens = this.tokens.concat({ token: newtoken });
      await this.save();
      return newtoken;
    } catch (err) {
      console.log(err);
    }
};

userSchema.methods.getPublicProfile = function () {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      isVerified: this.isVerified,
      role: this.role,
      borrowedBooks: this.borrowedBooks,
      notifications: this.notifications,
      isVerified: this.isVerified
    };
  };

// Book Schema
const bookSchema = new Schema({
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    date: { type: Date, required: true },
    genre: { type: String, required: true },
    quantity: { type: Number, required: true },
    available: { type: Number, required: true },
    categories: { type: String, required: true },
    thumbnail: { type: String, required: true },
    previewLink: { type: String, required: true },
    rating: { type: Number, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
// Apply the pagination plugin to the schema
bookSchema.plugin(mongoosePaginate);
// Borrow Schema
const borrowSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['Borrowed', 'Returned', 'onDue'], required: true, default: "Borrowed" },
    returnDate: { type: Date },
    lateFee: { type: Number, default: 0 }
}, { timestamps: true });

// Notification Schema
const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['DueDate', 'NewArrival', 'Overdue', 'OutstandingFees', 'Notification'], required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Borrow = mongoose.model('Borrow', borrowSchema);
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { User, Book, Borrow, Notification };
