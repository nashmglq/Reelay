const jwt = require("jsonwebtoken");
const multer = require("multer");
const authCheck = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(400).json({ error: "No token Found" });

    // This return payload destructure...
    const compare = jwt.verify(token, process.env.JWT_SECRET);
    if (compare) {
      req.user = compare;
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// check multer
const upload = multer({ storage });

module.exports = { authCheck, upload };
