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

    return res.status(200).json({ success: { token: token } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
    return res.status(500).json({ error: err.message });
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
    return res.status(500).json({ error: err.message });
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

    const currentTickets = await prisma.user.findUnique({
      where: { id: userId },
    });

    const calculate = amount * 50 + currentTickets.ticket;

    await prisma.user.update({
      where: { id: userId },
      data: {
        ticket: calculate,
      },
    });

    return res.status(200).json({ success: "Successfully added tickets." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getTicket = async(req,res) => {
  try{
    const userId = req.user.id;

    const ticketCount = await prisma.user.findUnique({
      where: {
        id : userId
      }
    })

    return res.status(200).json({success: ticketCount.ticket})

  }catch(err){
    return res.status(200).json({error: err.message})
  }
}

module.exports = {
  verificationGoogleToken,
  getProfile,
  updateProfile,
  postTicket,
  getTicket
};
