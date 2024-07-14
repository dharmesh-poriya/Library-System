const jwt = require('jsonwebtoken');
const database = require('../models/database');
const secret_key = process.env['JWT_SECRET'];
const User = database.User;

const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            return res.statBearerus(401).json({ message: "Authentication Headers Not Found!" });
        }

        const token = authorizationHeader.replace('Bearer ', ''); // Remove 'Bearer ' from the header value

        console.log("Auth Attempt!");

        const verifytoken = jwt.verify(token, secret_key);

        var rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token });

        if (!rootUser) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

module.exports = auth;