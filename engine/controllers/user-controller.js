const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("../models/database"); // Assuming your user model is in a models directory
const secret_key = process.env.JWT_SECRET;
const User = database.User;
const sendgrid = require("../utils/services/sendgrid");
const sendEmail = sendgrid.sendEmailWithSendGrid;
const generateRegistrationTemplate = require("../utils/email-templates/registrationEmail")

// User signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body.user;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "User",
    });
    await sendEmail(
      "User Registered on Libro",
      [email],
      generateRegistrationTemplate.generateRegistrationTemplate(name)
    );
    await user.save();

    const token = await user.generateAuthToken();
    return res
      .status(201)
      .json({
        message: "User Created Successfully",
        user: user.getPublicProfile(),
        token,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body.user;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ user: user.getPublicProfile(), token, message: "User logged In successfuly" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates!" });
    }

    const user = await User.findById(req.rootUser._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    updates.forEach((update) => (user[update] = req.body[update]));

    await sendEmail(
        "User Updated on Libro",
        [user.email],
        `Hey ${user.name}, Your details are updated on libro`
      );
    await user.save();
    return res.status(200).json({ user: user.getPublicProfile() });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.rootUser._id);
    // delete the notifications
    await database.Notification.deleteMany({ user: req.rootUser._id });
    // here we can add deleted user for managing the data of deleted users
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get public user data
exports.getPublicUserData = async (req, res) => {
  try {
    const user = await User.findById(req.rootUser._id)
      .populate("borrowedBooks")
      .populate("notifications");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User Fetched Successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
