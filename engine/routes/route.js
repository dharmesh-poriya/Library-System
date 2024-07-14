const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller");
const bookC = require("../controllers/book-controller");
const adminC = require("../controllers/admin-controller")
// const existingUserValidation = require("../middlewares/existingUserValidation")
// const { verificationAndBannedCheck, verificationAndBannedCheckForLogin } = require("../middlewares/userMiddleware")
const roleVerification = require("../middlewares/roleVerification");

// user login & signup
router.post("/auth/signup", userC.signup);
router.post("/auth/login", userC.login);
router.put("/users", auth, userC.updateUser);
router.delete("/users", auth, userC.deleteUser);
router.get("/users", auth, userC.getPublicUserData);

// public endpoints
router.get("/books/trending", bookC.getTrendingBooks);
router.get("/books/newArrivals", bookC.getNewArrivalBooks);
router.get("/books", bookC.searchBooks);

// Admin Book Routes
router.post("/admin/books", auth, roleVerification.isAdminUser, adminC.addBook);
router.put("/admin/books", auth, roleVerification.isAdminUser, adminC.editBook);
router.delete("/admin/books", auth, roleVerification.isAdminUser, adminC.deleteBook);

// Admin Librarian Routes
router.post("/admin/librarian", auth, roleVerification.isAdminUser, adminC.addLibrarian);
router.put("/admin/librarian", auth, roleVerification.isAdminUser, adminC.editLibrarian);
router.delete("/admin/librarian", auth, roleVerification.isAdminUser, adminC.deleteLibrarian);

// Librarian Route

module.exports = router;