const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller");
const bookC = require("../controllers/book-controller");
// const existingUserValidation = require("../middlewares/existingUserValidation")
// const { verificationAndBannedCheck, verificationAndBannedCheckForLogin } = require("../middlewares/userMiddleware")

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
module.exports = router;