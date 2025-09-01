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

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({ success: { accessToken, refreshToken } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const refeshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ error: "No refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({ success: newAccessToken });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) return res.status(400).json({ error: "No ID found." });
    // To only select the fields, and we won't expose data...
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
      },
    });

    if (!user) return res.status(400).json({ error: "No user found." });

    return res.status(200).json({ success: user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profilePic = req.file?.filename;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Please provide name." });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        profilePic,
        name,
      },
    });

    return res.status(200).json({ success: "Successfully updated" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const postTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ error: "Insufficient amount" });
    }

    if (amount % 1 !== 0) {
      return res.status(400).json({ error: "Invalid Amount" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    let tickets = amount * 50;

    // Apply 20% promo automatically if amount > 20
    if (amount > 20) {
      tickets += tickets * 0.2;
    }

    const totalTickets = user.ticket + Math.floor(tickets);

    await prisma.user.update({
      where: { id: userId },
      data: { ticket: totalTickets },
    });

    return res.status(200).json({ success: "Tickets added successfully." });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};


const getTicket = async (req, res) => {
  try {
    const userId = req.user.id;

    const ticketCount = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return res.status(200).json({ success: ticketCount.ticket });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = {
  verificationGoogleToken,
  getProfile,
  updateProfile,
  postTicket,
  getTicket,
  refeshToken
};
