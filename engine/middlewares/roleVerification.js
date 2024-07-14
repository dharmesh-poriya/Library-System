const isNormalUser = async (req, res, next) => {
  try {
    if (req.rootUser.role == "User") {
      next();
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "You are not allowed for this action" });
  }
};

const isAdminUser = async (req, res, next) => {
  try {
    if (req.rootUser.role == "Admin") {
      next();
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "You are not allowed for this action" });
  }
};

const isLibrarianUser = async (req, res, next) => {
  try {
    if (req.rootUser.role == "Librarian") {
      next();
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "You are not allowed for this action" });
  }
};

module.exports = { isNormalUser, isAdminUser, isLibrarianUser };
