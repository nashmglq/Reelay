const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verificationGoogleToken = async (req, res) => {
  try {
    const { credentials } = req.body;

    if (!credentials)
      return res.status(400).json({ error: "Credentaials are not provided." });

    // Remembering things: verifyIdToken is to check creds
    // representValue : value
    // because this package is finding idToken and audience only
    const ticket = await client.verifyIdToken({
      idToken: credentials,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // get payload, the value after creds
    const payload = ticket.getPayload();

    // destructure the creds from ticket, returns (sub, email, name, picture, and more)
    // key : value, key will return value, value wont return key
    // key : representTheOriginalValue
    const { sub: googleId, email, name, picture: profilePic } = payload;

    if (!email) return res.status.json({ error: "Email is not provided." });

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId,
          email,
          name,
          profilePic,
        },
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    return res.status(200).json({ success: token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id)
    if (!id) return res.status(400).json({ error: "No ID found." });

    const user = await prisma.user.findUnique({ where: {id} });

    if (!user) return res.status(400).json({ error: "No user found." });

    return res
      .status(200)
      .json({ success: [user.id, user.name, user.email, user.profilePic] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



module.exports = { verificationGoogleToken, getProfile };
